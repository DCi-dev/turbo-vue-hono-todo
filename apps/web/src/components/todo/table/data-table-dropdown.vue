<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import type { Todo } from '@/types/todo'
import { MoreHorizontal } from 'lucide-vue-next'
import DeleteTodo from '../modal/delete-todo.vue'
import UpdateTodo from '../modal/update-todo.vue'

defineProps<{
  todo: Todo
}>()

function copy(id: number) {
  navigator.clipboard.writeText(String(id))
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="copy(todo.id)"> Copy todo ID </DropdownMenuItem>
      <DropdownMenuSeparator />
      <UpdateTodo :todo="todo" />
      <DeleteTodo :todo="todo" />
    </DropdownMenuContent>
  </DropdownMenu>
</template>
