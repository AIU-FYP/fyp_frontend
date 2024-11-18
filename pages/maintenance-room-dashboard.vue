<script setup lang="ts">
import MaintenanceDashboardSection from "~/components/MaintenanceDashboardSection.vue";

definePageMeta({
  middleware: 'auth'
})

</script>

<template>
  <AdminHeaderSection/>
  <MaintenanceDashboardSection/>
  <AdminFooterSection/>
</template>

<style scoped>

</style>