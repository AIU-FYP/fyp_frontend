<script setup lang="ts">

definePageMeta({
  middleware: 'auth',
})

</script>

<template>
  <AdminHeader/>
  <AdminChangePassword/>
  <AdminFooter/>
</template>

<style scoped>

</style>