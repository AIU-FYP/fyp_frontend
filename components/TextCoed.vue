<template>
  <div>
    <button @click="isPopupVisible = true">Open Popup</button>
    <Popup :show="isPopupVisible" @update:show="isPopupVisible = $event">
    </Popup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import Popup from '~/components/PopupStudentInfo.vue'
import  Popup from '~/components/PopupSubmit.vue'
const isPopupVisible = ref(false)
</script>
