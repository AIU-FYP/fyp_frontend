<script setup lang="ts">


definePageMeta({
  middleware: 'auth'
})

</script>

<template>
  <AdminHeader/>
  <RoomDashboard/>
  <AdminFooter/>
</template>

<style scoped>

</style>