<script setup >

</script>

<template>
 <div>
   <div>
     HomePage
   </div>
  <ul>
    <li>
      <NuxtLink :to="{
          name:'Product__Index'
        }">
        Product Page
      </NuxtLink>
    </li>
    <li>
      <NuxtLink :to="{
          name:'News__Index'
        }">
        News Page
      </NuxtLink>
    </li>
  </ul>
 </div>
</template>

<style scoped>

</style>