<script setup lang="ts">
import {useAuth} from "~/composables/useAuth";

const auth = useAuth()

definePageMeta({
  middleware: 'auth',
})


</script>

<template>
  <AdminHeader/>
  <RoomChangeDashboard/>
  <AdminFooter/>
</template>

<style scoped>

</style>