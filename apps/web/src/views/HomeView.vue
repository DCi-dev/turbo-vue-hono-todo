<script setup lang="ts">
import AddTodo from '@/components/todo/AddTodo.vue'
import TodoList from '@/components/todo/TodoList.vue'
</script>

<template>
  <main class="max-w-7xl mx-auto px-8">
    <header class="container pt-10 flex flex-col gap-4">
      <h1 className=" scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        The ultimate Todo App
      </h1>
      <p className="text-xl text-muted-foreground">
        This app is the culmination of years of research and development in the field of todo
        applications. It is the most advanced todo app ever created. It is the ultimate todo app.
      </p>
    </header>
    <AddTodo />
    <TodoList />
  </main>
</template>
