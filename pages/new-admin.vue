NewAdminFormSection<script setup lang="ts">
import {useAuth} from "~/composables/useAuth";
import NewAdminFormSection from "~/components/NewAdminFormSection.vue";

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
  <NewAdminFormSection/>
</template>

<style scoped>

</style>