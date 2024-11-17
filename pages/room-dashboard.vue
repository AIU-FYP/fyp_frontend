<script setup lang="ts">

import RoomDashboardSection from "~/components/RoomDashboardSection.vue";

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
  <AdminHeaderSection/>
  <RoomDashboardSection/>
  <AdminFooterSection/>
</template>

<style scoped>

</style>