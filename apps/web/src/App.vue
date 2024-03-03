<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
  <VueQueryDevtools />
</template>
