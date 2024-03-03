<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CreateTodo, type CreateTodoType } from '@/stores/api/schemas'
import { createTodo } from '@/stores/api/todo'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { reactive, ref } from 'vue'
import type { z } from 'zod'

const queryClient = useQueryClient()

const { isPending, mutate } = useMutation({
  mutationFn: (todo: CreateTodoType) => createTodo(todo),
  onSuccess: () => {
    // Invalidate the todos query to refetch it
    queryClient.invalidateQueries({ queryKey: ['todos'] })
    // Reset form fields
    title.value = ''
    description.value = ''
  }
})

// Reactive state for form errors
const formErrors = reactive<{ [key: string]: string | null }>({
  title: null,
  description: null
})

const title = ref('')
const description = ref('')

function handleValidationErrors(issues: z.ZodIssue[]) {
  // Reset current errors
  Object.keys(formErrors).forEach((key) => {
    formErrors[key as keyof typeof formErrors] = null
  })

  // Assign new errors from validation issues
  issues.forEach((issue) => {
    const key = issue.path[0]
    if (typeof key === 'string' && key in formErrors) {
      formErrors[key as keyof typeof formErrors] = issue.message
    }
  })
}

function handleCreate() {
  // Reset errors
  formErrors.title = null
  formErrors.description = null

  const result = CreateTodo.safeParse({
    title: title.value,
    description: description.value
  })

  if (!result.success) {
    handleValidationErrors(result.error.issues)
    return
  }

  mutate(result.data)
}
</script>

<template>
  <div class="container pt-5">
    <Card class="w-full">
      <CardHeader>
        <CardTitle>Add a new Task</CardTitle>
        <CardDescription
          >After adding a new task you can already forget about it. The only thing you need to
          remember is that this app, is the ultimate todo app. And it's blazingly
          fast!</CardDescription
        >
      </CardHeader>
      <CardContent>
        <form>
          <div class="grid items-center w-full gap-4">
            <div class="flex flex-col space-y-1.5">
              <Label for="title">Title</Label>
              <Input id="title" placeholder="Title of your task" v-model="title" />
            </div>
            <div class="flex flex-col space-y-1.5">
              <Label for="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your task or not..."
                v-model="description"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter class="flex justify-between px-6 pb-6">
        <Button @click.prevent="handleCreate" :disabled="isPending">
          <span v-if="isPending">Creating...</span>
          <span v-else>Create</span>
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
