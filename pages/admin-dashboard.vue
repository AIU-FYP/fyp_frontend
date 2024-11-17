<script setup lang="ts">

import AdminDashboardSection from "~/components/AdminDashboardSection.vue";

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
  <AdminDashboardSection/>
</template>

<style scoped>

</style>