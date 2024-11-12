<script setup lang="ts">
import AdminFooter from "~/components/AdminFooterSec.vue";
import AdminHeader from "~/components/AdminHeaderSec.vue";

import { useAuth } from '~/composables/useAuth'

definePageMeta({
  middleware: 'auth'
})

</script>

<template>
  <div class="admin-container">
    <AdminHeader/>
    <Admin/>
    <AdminFooter/>
  </div>
</template>

<style scoped></style>
