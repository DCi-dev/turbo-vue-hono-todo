<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { UpdateTodo, type UpdateTodoType } from '@/stores/api/schemas'
import { updateTodo } from '@/stores/api/todo'
import type { Todo } from '@/types/todo'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { reactive, ref } from 'vue'
import type { z } from 'zod'

const queryClient = useQueryClient()

const props = defineProps<{
  todo: Todo
}>()

const dialogOpen = ref(false)

const { isPending, mutate } = useMutation({
  mutationFn: (todo: UpdateTodoType) => updateTodo(todo),
  onSuccess: () => {
    // Invalidate the todos query to refetch it
    queryClient.invalidateQueries({ queryKey: ['todos'] })

    dialogOpen.value = false
  }
})

// Reactive state for form errors
const formErrors = reactive<{ [key: string]: string | null }>({
  id: null,
  title: null,
  description: null,
  done: null
})

const title = ref(props.todo.title)
const description = ref(props.todo.description)

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

function handleUpdate() {
  formErrors.title = null
  formErrors.description = null
  formErrors.done = null

  const result = UpdateTodo.safeParse({
    id: props.todo.id,
    title: title.value,
    description: description.value,
    done: props.todo.done || false
  })

  if (!result.success) {
    handleValidationErrors(result.error.issues)
    return
  }

  mutate(result.data)
}
</script>

<template>
  <Dialog v-model:open="dialogOpen">
    <DialogTrigger as-child>
      <Button variant="ghost" class="w-full justify-start px-2" @click="dialogOpen = true"
        >Edit Task</Button
      >
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="title" class="col-span-1">Title</Label>
          <Input id="title" placeholder="Title of your task" v-model="title" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="description" class="col-span-1">Description</Label>
          <Textarea
            id="description"
            class="col-span-3"
            placeholder="Describe your task or not..."
            v-model="description"
          />
        </div>
      </div>
      <DialogFooter>
        <Button @click.prevent="handleUpdate" :disabled="isPending">
          <span v-if="isPending">Updating...</span>
          <span v-else>Update</span>
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
