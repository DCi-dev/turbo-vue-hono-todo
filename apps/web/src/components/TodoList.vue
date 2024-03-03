<script setup lang="ts">
import DeleteTodo from '@/components/todo/modal/delete-todo.vue'
import { getTodos } from '@/stores/api/todo'
import { useQuery } from '@tanstack/vue-query'
import { columns } from './todo/table/columns'
import DataTable from './todo/table/data-table.vue'

const { isPending, isFetching, isError, data, error } = useQuery({
  queryKey: ['todos'],
  queryFn: getTodos
})
</script>

<template>
  <main>
    <span v-if="isPending">Loading...</span>
    <span v-else-if="isError">Error: {{ error?.message }}</span>
    <div v-else-if="data" class="container py-10 mx-auto">
      <DataTable :columns="columns" :data="data" />
    </div>
  </main>
</template>
