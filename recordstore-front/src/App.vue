<script setup>
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import Header from './components/Header.vue';

const router = useRouter()

onBeforeMount(() => {
  router.push('/')
})
</script>

<template>
  <div id="app">
    <Header />
    <router-view class="mx-4"/>
  </div>
</template>