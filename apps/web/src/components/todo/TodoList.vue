<script setup lang="ts">
import { getTodos } from '@/stores/api/todo'
import { useQuery } from '@tanstack/vue-query'
import { columns } from './table/columns'
import DataTable from './table/data-table.vue'

const { isPending, isFetching, isError, data, error } = useQuery({
  queryKey: ['todos'],
  queryFn: getTodos
})
</script>

<template>
  <span v-if="isPending">Loading...</span>
  <span v-else-if="isError">Error: {{ error?.message }}</span>
  <div v-else-if="data" class="container py-10 mx-auto">
    <DataTable :columns="columns" :data="data" />
  </div>
</template>
