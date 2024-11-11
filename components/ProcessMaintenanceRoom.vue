
<script setup lang="ts">
const items = [
  {
    label: 'Fill Out the Complaint Form',
    defaultOpen: false,
    content: 'Students must complete the designated complaint form to report the issue.'
  },
  {
    label: 'Submit the Complaint',
    defaultOpen: false,
    content: 'The Student Affairs (SA) will submit the complaint regarding the room issue.'
  },
  {
    label: 'Assessment and Resolution',
    defaultOpen: false,
    content: 'The Property and Facilities (PPK) team will visit the room to assess and address the reported issue.'
  },
  {
    label: 'Confirmation of Resolution',
    defaultOpen: false,
    content: 'An email will be sent to confirm that the problem has been resolved.'
  }
];


const activeIndex = ref(null)

const toggleFaq = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>
<template>
  <div class="process-maintenance-room">
    <div class="container">
      <div></div>
      <div class="process-maintenance-room-section">
        <h2>How do students complain about room issues?</h2>
        <div
            class="process-item"
            v-for="(item, index) in items"
            :key="index"
            @click="toggleFaq(index)"
        >
          <div class="info">
            <h3 class="title">
              <span>
                <UIcon
                    name="i-heroicons-square-3-stack-3d"
                />
              </span>
              {{ item.label }}
            </h3>
            <h3>
              <UIcon v-if="activeIndex === index" name="ep-arrow-up-bold" />
              <UIcon v-else name="ep-arrow-down-bold" />
            </h3>
          </div>
          <p class="description" v-if="activeIndex === index">{{ item.content }}</p>
        </div>
        <a class="link-btn">
          <router-link to="/maintenance-room">
            Maintenance Room Form
          </router-link>
        </a>
      </div>
      <div></div>
    </div>
  </div>
</template>

<style scoped>

.process-maintenance-room {
  padding: 1rem 0;
  margin: 0 10rem ;
  align-items: center;
}

.process-maintenance-room h2 {
  text-align: center;
  font-size: 2rem;
  font-weight: normal;
  color: var(--main-color);
  padding: 2rem;
  margin: 2rem 0;
}

@media (max-width: 820px) {
  .process-maintenance-room h2 {
    text-align: center;
    font-size: 1.5rem;
  }
  .process-maintenance-room {
    padding: 1em;
    margin: 0 1rem ;
  }
}

.process-item {
  background-color: #f5f5f5;
  color: var(--main-color);
  margin-bottom: 1.5rem;
  border-radius: 8px;
}

.info {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: .5rem 1rem;
  cursor: pointer;
}

.title {
  font-size: 1.5rem;
}

.description {
  padding: .5rem 1rem;
  font-size: 1rem;
  font-weight: normal;
  color: var(--text-color);
  text-align: justify;
}

@media (max-width: 800px) {
  .title {
    font-size: 1rem;
  }
  .description{
    font-size: .8rem;
  }
}

.link-btn{
  display: flex;
  font-size: 1.2rem;
  color: var(--main-color);
  margin: 1rem 0;
}

</style>
