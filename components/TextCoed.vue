<script setup lang="ts">
const hostels = [
  {
    hostel25A: "Female Hostel 25 A",
    hostel25B: "Female Hostel 25 B",
    hostel25C: "Female Hostel 25 C",
    hostel25D: "Female Hostel 25 D",
    hostel25E: "Female Hostel 25 E",
    hostel25F: "Female Hostel 25 F",
    hostel25G: "Female Hostel 25 G",
  },
];

const levels = [
  {
    levelOne: "Level One",
    levelTwo: "Level Two",
    levelThree: "Level Three",
    levelFour: "Level Four",
  },
];

const rooms = [
  {
    roomOne: "Room One",
    roomTwo: "Room Two",
    roomThree: "Room Three",
    roomFour: "Room Four",
    roomFive: "Room Five",
  },
];

const zones = [
  {
    zoneOne: "Zone A",
    zoneTwo: "Zone B",
    zoneThree: "Zone C",
    zoneFour: "Zone D",
  },
];
</script>

<template>
  <div class="hostel-system-section">
    <div class="container">
      <div class="hostels-content">
        <div
            class="hostel-block"
            v-for="(hostel, hostelIndex) in Object.values(hostels[0])"
            :key="`hostel-${hostelIndex}`"
        >
          <h2 class="hostels-title">{{ hostel }}</h2>
          <div class="levels-content">
            <div
                class="level-content"
                v-for="(level, levelIndex) in Object.values(levels[0])"
                :key="`level-${levelIndex}`"
            >
              <h3 class="level-title">{{ level }}</h3>
              <div
                  class="rooms"
                  v-for="(room, roomIndex) in Object.values(rooms[0])"
                  :key="`room-${roomIndex}`"
              >
                <h4 class="room-title">{{ room }}</h4>
                <div
                    class="room-content"
                    v-for="(zone, zoneIndex) in Object.values(zones[0])"
                    :key="`zone-${zoneIndex}`"
                >
                  <div>{{ zone }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hostel-system-section {
  margin: 5rem 0;
}

.container {
  display: block;
  width: 100%;
  margin: 5rem auto;
}

.hostels-content {
  display: flex;
  padding: 1rem;
}

.hostel-block{
  flex: 25%;
}

.hostels-title {
  font-size: 1.5rem;
  text-align: center;
  font-weight: normal;
  padding: 1rem 0;
  color: var(--main-color);
}

.levels-content {
  margin-top: 1rem; /* Space between hostel title and levels */
}

.level-title {
  font-size: 1.5rem;
  text-align: center;
  font-weight: normal;
  padding: 1rem 0;
  color: var(--text-color);
}

.rooms {
  margin-top: 1rem;
}

.room-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0.5rem 0;
}

.room-content {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
</style>
