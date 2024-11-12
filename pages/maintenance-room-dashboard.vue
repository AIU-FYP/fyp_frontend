<script setup lang="ts">
import {useAuth} from "~/composables/useAuth";

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
  <AdminHeaderSec/>
  <MaintenanceRoomDashboard/>
  <AdminFooterSec/>
</template>

<style scoped>

</style>