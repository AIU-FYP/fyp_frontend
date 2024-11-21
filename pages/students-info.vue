<script setup lang="ts">

import {useAuth} from "~/composables/useAuth";

definePageMeta({
  middleware: 'auth'
})

const auth = useAuth()


</script>

<template>
<StudentsInfo/>
</template>

<style scoped>

</style>