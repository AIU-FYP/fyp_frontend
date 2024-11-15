
<script setup lang="ts">
const items = [
  {
    label: 'Fill Out the Room Change Request Form',
    defaultOpen: false,
    content: 'Students must complete the designated form to request a room change, providing necessary details and supporting documentation.'
  },
  {
    label: 'Submit Supporting Documents',
    defaultOpen: false,
    content: 'For medical reasons, attach an official medical report. For issues with roommates, submit proof via email to the relevant office.'
  },
  {
    label: 'Processing of Request',
    defaultOpen: false,
    content: 'The Student Affairs (SA) team will review the submitted form and documents. Processing typically takes 7-14 working days.'
  },
  {
    label: 'Assessment and Decision by Director of Student Affairs',
    defaultOpen: false,
    content: 'The Director of Student Affairs will evaluate the necessity of the room change and check room availability. The decision is final upon approval.'
  },
  {
    label: 'Confirmation of Room Availability and Approval',
    defaultOpen: false,
    content: 'Confirmation will be sent via email once the request is approved, outlining the next steps for the room change.'
  },
  {
    label: 'Compliance with Hostel Policies',
    defaultOpen: false,
    content: 'Students acknowledge that room change approval is contingent on room availability and compliance with hostel policies.'
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
        <h2>How do students request to change room?</h2>
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
                    name="lucide-university"
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
          <router-link to="/change-room-form">
            Request To Change Room Form
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
  color: var(--main-hovor-color);
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
  color: var(--main-hovor-color);
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
