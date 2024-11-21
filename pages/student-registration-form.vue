<script setup lang="ts">

import {useAuth} from "~/composables/useAuth";

definePageMeta({
  middleware: 'auth'
})

const auth = useAuth()
</script>

<template>
  <AdminHeaderSection/>
  <StudentRegistrationFormSection/>
  <AdminFooterSection/>
</template>

<style scoped>

</style>