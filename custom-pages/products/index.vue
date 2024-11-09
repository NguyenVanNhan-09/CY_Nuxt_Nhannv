<script setup lang="ts">
// Cách dùng useAsyncData
// import { useAsyncData } from "#app";
// const { data: products } = useAsyncData(async () => {
//   const res = await $fetch("/api/v1/post")
//   console.log(res);
//   return res;
// })

// cách dùng useFetch
const {data:products} = await useFetch("/api/v1/post")
</script>

<template>
<div>
  {{ products }}
</div>
</template>

<style scoped>

</style>