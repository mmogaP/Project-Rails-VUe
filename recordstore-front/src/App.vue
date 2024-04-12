<script setup>
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onBeforeMount(() => {
  router.push('/')
})
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>