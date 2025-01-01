<script setup>
import {defineEmits, defineProps} from 'vue'

const props = defineProps({
  show: Boolean
})
const emit = defineEmits(['update:show'])

const closePopup = () => {
  emit('update:show', false)
}
const today = new Date();
const fullDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
</script>

<template>
  <div v-if="show" class="popup-overlay" @click="closePopup">
    <div class="popup-container" @click.stop>
      <div class="notification">
        <div class="logo-box">
          <img src="/images/AIU-Official-Logo.png" alt="aiu-logo">
        </div>
        <div class="thank-info">
          <p>
            Dear Student, Thank you for submitting your request. We have successfully received your
            application, and our team will review it within the next 7 days. We will keep you informed about the
            progress and let you know if any further information is needed.
            {{fullDate}}
          </p>
          <h2>Thank you for your patience.</h2>
        </div>
      </div>
      <hr class="divider">
    </div>
  </div>
</template>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-container {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 50%;
  width: 80%;
  position: relative;
  text-align: center;
  z-index: 1001;
}

@media (max-width: 1200px) {
  .popup-container {
    border-radius: 0;
    max-width: 100%;
    width: 100%;
  }
}


.logo-box {
  width: 200px;
  margin: 0 auto 5rem auto;
}
span {
  margin: 0 5px;
}

.thank-info {
  margin-top: -5rem;
}

h2 {
  font-size: 1.5rem;
  color: var(--main-color);
  line-height: 2.5rem;
}

p {
  font-size: 1.2rem;
  line-height: 2rem;
  color: var(--main-color);
  text-align: justify;
  margin: 5% 3%;

}

.divider {
  margin: 5% 3%;
  border: 1px solid var(--main-color);;
}


</style>
