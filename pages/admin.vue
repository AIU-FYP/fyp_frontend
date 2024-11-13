<script setup lang="ts">

import AdminHeaderSection from "~/components/AdminHeaderSection.vue";
import AdminFooterSection from "~/components/AdminFooterSection.vue";

definePageMeta({
  middleware: 'auth'
})

</script>

<template>
  <AdminHeaderSection/>
  <AdminSection/>
  <AdminFooterSection/>
</template>

<style scoped></style>
