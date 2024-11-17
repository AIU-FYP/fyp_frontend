<script setup lang="ts">

import RoomDashboardSection from "~/components/RoomDashboardSection.vue";

import {useAuth} from "~/composables/useAuth";

definePageMeta({
  middleware: 'auth'
})

const auth = useAuth()

</script>

<template>
  <AdminHeaderSection/>
  <RoomDashboardSection/>
  <AdminFooterSection/>
</template>

<style scoped>

</style>