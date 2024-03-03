import DropdownAction from '@/components/todo/table/data-table-dropdown.vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

export const columns: ColumnDef<Todo>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'text-right' }, 'Id'),
    cell: ({ row }) => {
      return h('div', { class: 'text-right font-medium' }, row.original.id)
    }
  },
  {
    accessorKey: 'title',
    header: () => h('div', { class: 'text-right' }, 'Title'),
    cell: ({ row }) => {
      return h('div', { class: 'text-right font-medium' }, row.original.title)
    }
  },
  {
    accessorKey: 'description',
    header: () => h('div', { class: 'text-right' }, 'Description'),
    cell: ({ row }) => {
      return h('div', { class: 'text-right font-medium' }, row.original.description)
    }
  },
  {
    accessorKey: 'done',
    header: () => h('div', { class: 'text-right' }, 'Status'),
    cell: ({ row }) => {
      return h('div', { class: 'text-right font-medium' }, row.original.done ? 'Done' : 'Not done')
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const todo = row.original

      return h(
        'div',
        { class: 'relative' },
        h(DropdownAction, {
          todo
        })
      )
    }
  }
]
