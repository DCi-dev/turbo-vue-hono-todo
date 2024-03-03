<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { deleteTodo } from '@/stores/api/todo'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

const queryClient = useQueryClient()

defineProps<{
  todo: {
    id: number
  }
}>()

const { isPending, mutate } = useMutation({
  mutationFn: (id: number) => deleteTodo(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
  }
})

function handleDelete(id: number) {
  mutate(id)
}
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <Button
        variant="ghost"
        class="w-full justify-start px-2 text-destructive bg-destructive-foreground hover:bg-destructive hover:text-destructive-foreground"
        >Delete</Button
      >
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle class="text-destructive">Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your task and remove it from
          our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          class="bg-destructive text-destructive-foreground hover:bg-destructive-foreground hover:text-destructive"
          :disabled="isPending"
          @click="handleDelete(todo.id)"
        >
          <span v-if="isPending">Creating...</span>
          <span v-else>Delete</span>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
