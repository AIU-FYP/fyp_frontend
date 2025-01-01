<script setup lang="ts">

definePageMeta({
  middleware: 'auth'
})

const auth = useAuth()

</script>

<template>
  <AdminHeader/>
  <AdminForm/>
  <AdminFooter/>
</template>

<style scoped>

</style>
