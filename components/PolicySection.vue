<script setup lang="ts">
const items = [
  {
    label: 'Cooking in Rooms',
    defaultOpen: true,
    content: 'Cooking inside the hostel rooms is strictly prohibited. Students are encouraged to use designated kitchen areas for preparing meals. This policy is enforced to maintain cleanliness, avoid fire hazards, and ensure the safety of all residents.'
  },
  {
    label: 'Quiet Hours',
    defaultOpen: false,
    content: 'Quiet hours must be observed from 10:00 PM to 7:00 AM. During this time, noise levels should be kept to a minimum to allow fellow residents to study and sleep without disturbances.'
  },
  {
    label: 'Room Cleanliness',
    defaultOpen: false,
    content: 'Students are responsible for maintaining cleanliness in their rooms. Regular inspections will be conducted, and failure to maintain a clean environment may result in penalties.'
  },
  {
    label: 'Use of Electrical Appliances',
    defaultOpen: false,
    content: 'Only approved electrical appliances are permitted in the rooms. Unauthorized use of heaters, electric stoves, or other high-power-consuming devices is not allowed.'
  },
  {
    label: 'Visitors',
    defaultOpen: false,
    content: 'Visitors are allowed only during specified hours and must sign in at the front desk. Overnight stays by visitors are not permitted.'
  },
  {
    label: 'Smoking and Alcohol',
    defaultOpen: false,
    content: 'Smoking and alcohol consumption are strictly prohibited within the hostel premises.'
  },
  {
    label: 'Fire Safety',
    defaultOpen: false,
    content: 'Fire safety equipment should not be tampered with. In case of fire, students must follow evacuation procedures immediately. Blocking fire exits is forbidden.'
  },
  {
    label: 'Personal Conduct',
    defaultOpen: false,
    content: 'Students are expected to show respect for other residents and staff. Harassment, theft, vandalism, or any other inappropriate behavior will result in disciplinary action.'
  },
  {
    label: 'Room Alterations',
    defaultOpen: false,
    content: 'Alterations to rooms, including painting, adding shelves, or drilling, are not allowed. Students must maintain the room as it was provided to them.'
  },
  {
    label: 'Reporting Issues',
    defaultOpen: false,
    content: 'Any maintenance or room-related issues should be promptly reported to the hostel management.'
  }
];

const activeIndex = ref(null)

const toggleFaq = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<template>
  <div class="faq-section">
    <div class="container">
      <div></div>
      <div class="faq-container">
        <h2>Student Accommodation Guidelines</h2>
        <div
            class="faq-item"
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
      </div>
      <div></div>
    </div>
  </div>
</template>

<style scoped>

.faq-section {
  padding: 5em;
  margin: 0 10rem ;
  align-items: center;
}

.faq-section h2 {
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--main-color);
  padding: 2rem;
}

@media (max-width: 820px) {
  .faq-section h2 {
    text-align: center;
    font-size: 1.5rem;
  }
  .faq-section {
    padding: 1em;
    margin: 0 1rem ;
  }
}

.faq-item {
  background-color: #f5f5f5;
  color: var(--main-color);
  margin-bottom: 1.5rem;
  border-radius: 8px;
  box-shadow: rgba(103, 103, 115, 0.28) 0 7px 29px 0;
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

</style>
