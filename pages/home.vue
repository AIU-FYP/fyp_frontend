<script setup lang="ts">

import ProcessChangeRoomSection from "~/components/ProcessChangeRoomSection.vue";
import ProcessMaintenanceSection from "~/components/ProcessMaintenanceSection.vue";
</script>

<template>
  <HeaderSection/>
  <LandingSection/>
  <ProcessMaintenanceSection/>
  <div class="divider-diagonal"></div>
  <ProcessChangeRoomSection/>
  <FooterSection/>
</template>

<style scoped>

.divider-diagonal {
  width: 100%;
  height: 20px;
  background: linear-gradient(to right, #133E87FF, #4B8AE6, #82B4F9, #133E87FF);
  transform: skewY(-2deg);
  margin: -1px 0;
}


</style>