<script setup lang="ts">

import {useAuth} from "~/composables/useAuth";

definePageMeta({
  middleware: 'auth'
})

const auth = useAuth()
</script>

<template>
  <AdminHeader/>
  <StudentRegistrationFormSubmit/>
  <AdminFooter/>
</template>

<style scoped>

</style>