<script setup>
import {defineEmits, defineProps} from "vue";

const props = defineProps({
  show: Boolean,
  student: Object,
});

const emit = defineEmits(["update:show"]);

const convertToLetter = (zoneNumber) => {
  return String.fromCharCode(64 + Number(zoneNumber));
};

const closePopup = () => {
  emit("update:show", false);
};
</script>

<template>
  <div v-if="show" class="popup-overlay" @click="closePopup">
    <div class="popup-container" @click.stop>

      <div class="popup-header">
        <span style="font-size: 1.5rem">{{ student.name }}</span>
        <span @click="closePopup" class="close-btn">
          <UIcon name="fontisto-close"/>
        </span>
      </div>

      <hr class="divider"/>

      <div class="popup-content">
        <div class="container">

          <div v-for="level in student.levels" :key="level.number" class="levels">

            <span class="level-label">Level {{ level.number }}</span>

            <div class="level-box">
              <div v-for="room in level.room_details" :key="room.number" class="room-box">
                <div class="box">
                  <div class="capacity-container">


                    <div
                        v-for="zone in room.capacity"
                        :key="zone"
                        class="capacity-part"
                    >

                      <UIcon
                          name="mdi-bed"
                          class="icon"
                      />
                      {{ convertToLetter(zone) }}



                    </div>

                  </div>

                  <div class="room-box">
                    <span class="room-number"> Room :{{ room.number }}</span>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      <hr class="divider"/>

      <div class="popup-footer">
        <div class="popup-bts"></div>
        <div>
          <h2>Thank you</h2>
        </div>
      </div>

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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-container {
  background: #fff;
  padding: 2rem;
  width: 90%;
  max-width: 90%;
  scroll-behavior: smooth;
  text-align: center;
  max-height: 90vh;
  position: relative;
  overflow-y: auto;
}

@media (max-width: 1200px) {
  .popup-container {
    width: 90%;
    max-width: 100%;
  }
}

@media (max-width: 800px) {
  .popup-container {
    width: 100%;
    max-width: 100%;
    border-radius: 0;
  }
}

.popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

span {
  margin: 0 5px;
}

.close-btn {
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.close-btn:hover {
  color: #ff0000;
  transition: .2s ease-in-out;
}

.divider {
  margin: 20px 0;
  border: 2px solid var(--main-color);
}

.levels{
  border: 2px solid var(--main-color);
  margin: 10px;
}

.level-label {
  font-size: 1.2rem;
  color: var(--text-hovor-color);
  background-color: var(--main-color);
  padding: 0 50px 10px 50px;
}

.level-box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px;
  max-height: 350px;
  overflow-y: auto;
  gap: 20px;

}

.level-box div {
  width: 230px;
  height: auto;
  text-align: center;
  color: black;
}

.room-number {
  font-size: 1rem;
}

.capacity-container {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.capacity-part {
  display: block;
  width:20px;
  height: 20px;
  margin-right: 5px;
  background-color: red;
  border-radius: 4px;
}

@media (max-width: 800px) {
  .box {
    display: flex;
    flex-direction: column;
  }
}

.popup-bts {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 2rem 0;
}

.popup-bts button {
  padding: .5rem;
  font-size: 1.2rem;
  text-transform: capitalize;
}

@media (max-width: 800px) {
  .popup-bts {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
  }

  .popup-bts button {
    margin: 0.5rem;
    font-size: 1rem;
  }
}

h2 {
  font-size: 1.5rem;
  text-align: center;
  text-transform: capitalize;
}

</style>
