<script setup lang="ts">

definePageMeta({
  middleware: 'auth'
})

</script>

<template>
  <AdminHeader/>
  <MaintenanceDashboard/>
  <AdminFooter/>
</template>

<style scoped>

</style>