<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { updateTodo } from '@/stores/api/todo'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

const queryClient = useQueryClient()

const props = defineProps<{
  todo: {
    id: number
    done: boolean
  }
}>()

const { mutate } = useMutation({
  mutationFn: (status: boolean) => updateTodo({ id: props.todo.id, done: status }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
  }
})

function handleUpdate(status: boolean) {
  mutate(status)
}

function handleSelectionChange(status: boolean) {
  handleUpdate(status)
}
</script>

<template>
  <Select>
    <SelectTrigger class="w-fit ml-auto">
      <SelectValue :placeholder="todo.done === true ? 'Done' : 'Not done'" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Status</SelectLabel>
        <SelectItem value="true" @click="handleSelectionChange(true)"> Done </SelectItem>
        <SelectItem value="false" @click="handleSelectionChange(false)"> Not done </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
