<script setup lang="ts">

definePageMeta({
  middleware: 'auth'
})

</script>

<template>
  <div class="admin-container">
    <AdminHeaderSec/>
    <AdminSec/>
    <AdminFooterSec/>
  </div>
</template>

<style scoped></style>
