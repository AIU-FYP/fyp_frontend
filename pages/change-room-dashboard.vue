<script setup lang="ts">
import {useAuth} from "~/composables/useAuth";
import ChangeRoomDashboardSection from "~/components/ChangeRoomDashboardSection.vue";

const auth = useAuth()

definePageMeta({
  middleware: 'auth',
})


</script>

<template>
  <AdminHeaderSection/>
  <ChangeRoomDashboardSection/>
  <AdminFooterSection/>
</template>

<style scoped>

</style>