<script setup lang="ts">

import AdminDashboardSection from "~/components/AdminDashboardSection.vue";

import {useAuth} from "~/composables/useAuth";

definePageMeta({
  middleware: 'auth'
})

const auth = useAuth()


</script>

<template>
  <AdminHeaderSection/>
  <AdminDashboardSection/>
  <AdminFooterSection/>
</template>

<style scoped>

</style>