<script setup lang="ts">

definePageMeta({
  middleware: 'auth',
})

</script>

<template>
  <AdminHeaderSection/>
  <ChangeAdminPassword/>
  <AdminFooterSection/>
</template>

<style scoped>

</style>