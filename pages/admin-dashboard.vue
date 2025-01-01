<script setup lang="ts">

import AdminDashboardSection from "~/components/AdminDashboard.vue";

import {useAuth} from "~/composables/useAuth";
import AdminHeader from "~/components/AdminHeader.vue";
import AdminFooter from "~/components/AdminFooter.vue";

definePageMeta({
  middleware: 'auth'
})

const auth = useAuth()


</script>

<template>
  <AdminHeader/>
  <AdminDashboard/>
  <AdminFooter/>
</template>

<style scoped>

</style>