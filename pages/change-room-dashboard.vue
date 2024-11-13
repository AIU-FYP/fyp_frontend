<script setup lang="ts">
import {useAuth} from "~/composables/useAuth";
import ChangeRoomDashboardSection from "~/components/ChangeRoomDashboardSection.vue";

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
  <ChangeRoomDashboardSection/>
  <AdminFooterSection/>
</template>

<style scoped>

</style>