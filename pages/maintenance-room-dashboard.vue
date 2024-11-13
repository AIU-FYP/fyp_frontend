<script setup lang="ts">
import {useAuth} from "~/composables/useAuth";
import MaintenanceDashboardSection from "~/components/MaintenanceDashboardSection.vue";

definePageMeta({
  middleware: 'auth'
})

const auth = useAuth()

const handleLogout = () => {
  auth.logout()
  navigateTo('/log-in')
}

</script>

<template>
  <AdminHeaderSection/>
  <MaintenanceDashboardSection/>
  <AdminFooterSection/>
</template>

<style scoped>

</style>