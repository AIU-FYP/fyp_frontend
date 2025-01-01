<script setup lang="ts">

import RoomDashboardSection from "~/components/RoomDashboard.vue";

import {useAuth} from "~/composables/useAuth";

definePageMeta({
  middleware: 'auth'
})

const auth = useAuth()

</script>

<template>
  <AdminHeader/>
  <RoomDashboard/>
  <AdminFooter/>
</template>

<style scoped>

</style>