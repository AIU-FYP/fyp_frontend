<script setup lang="ts">
import {ref} from 'vue'

const isLoading = ref(false);
const router = useRouter();

async function navigateToPage(url: string) {
  isLoading.value = true;
  try {
    setTimeout(async () => {
      await router.push(url);
      isLoading.value = false;
    }, 2000);
  } catch (error) {
    console.error('Navigation error:', error);
    isLoading.value = false;
  }
}


const navigationButtons = [
  {
    name: "Student",
    icon: "ph-student",
    links: [
      {text: "Register Student", url: "/student-registration-form"},
      {text: "Manage Student", url: "/student-registration-dashboard"},
    ],
  },
  {
    name: "Maintenance",
    icon: "wpf-maintenance",
    links: [
      {text: "Maintenance Form", url: "/maintenance-room-form"},
      {text: "Manage Maintenance", url: "/maintenance-room-dashboard"},
    ],
  },
  {
    name: "Change Room",
    icon: "bx-building",
    links: [
      {text: "Change Room Form", url: "/change-room-form"},
      {text: "Manage Room Changes", url: "/change-room-dashboard"},
    ],
  },
  {
    name: "Hostels",
    icon: "bx-building",
    links: [
      {text: "Add new Hostel", url: "/new-hostel-form"},
      {text: "Manage Rooms", url: "/room-dashboard"},
      {text: "Manage Rooms", url: "/room-dashboard"},
    ],
  },
];

function toggleLinkVisibility(index: number) {
  visibleButtonIndex.value = visibleButtonIndex.value === index ? null : index;
}

const visibleButtonIndex = ref<number | null>(null);
const formData = ref<Record<string, any>>({
  hostelName: '',
  gender: '',
  levels: {
    level1: null,
    level2: null,
    level3: null,
    level4: null,
  },
});

const previousQuestions = [
  {
    label: "Hostel Name",
    type: "text",
    placeholder: "Enter Hostel Name",
    required: true,
  },
  {
    label: "Gender",
    type: "select",
    options: ["Male", "Female"],
    required: true,
    placeholder: "Select Gender",
  },
  {
    label: "How many levels",
    type: "select",
    options: ["1", "2", "3", "4"],
    required: true,
    placeholder: "Select Number of Levels",
  },
  {
    label: "Number of rooms per level",
    type: "multi-select",
    required: true,
    levels: [
      {label: "Level 1", key: "level1"},
      {label: "Level 2", key: "level2"},
      {label: "Level 3", key: "level3"},
      {label: "Level 4", key: "level4"},
    ],
    placeholder: "Select Number of Rooms for Each Level",
  },
];

function submitForm() {
  console.log("Form Submitted with Data:", formData.value);
  alert("Form submitted successfully!");
}


</script>

<template>
  <div class="admin-dashboard">
    <div class="container">

      <LoaderSection v-if="isLoading"/>

      <aside class="sidebar">
        <div v-for="(button, index) in navigationButtons" :key="index">
          <div class="btn-container">
            <button
                @click="toggleLinkVisibility(index)"
                :aria-expanded="visibleButtonIndex === index"
                class="sidebar-button"
            >
              <UIcon
                  :name="button.icon"
              />
              {{ button.name }}
            </button>
          </div>
          <ul v-if="visibleButtonIndex === index">
            <li v-for="(link, linkIndex) in button.links" :key="linkIndex">
              <a @click.prevent="navigateToPage(link.url)" style="cursor: pointer">{{ link.text }}</a>
            </li>
          </ul>
        </div>
      </aside>

      <main class="dashboard-content">
        <h1 class="title">Add New Hostel</h1>
        <form @submit.prevent="submitForm" class="hostel-form">
          <div v-for="(question, index) in previousQuestions" :key="index" class="form-group">
            <label :for="'input-' + index" class="question-title">{{ question.label }}</label>

            <input
                v-if="question.type === 'text'"
                :id="'input-' + index"
                :type="question.type"
                v-model="formData[question.label]"
                :placeholder="question.placeholder"
                :required="question.required"
                class="form-input"
            />

            <select
                v-else-if="question.type === 'select'"
                :id="'input-' + index"
                v-model="formData[question.label]"
                :required="question.required"
                class="form-input"
            >
              <option value="" disabled selected>{{ question.placeholder }}</option>
              <option v-for="option in question.options" :key="option" :value="option">
                {{ option }}
              </option>
            </select>

            <div v-else-if="question.type === 'multi-select'">
              <div v-for="(level, levelIndex) in question.levels" :key="levelIndex">
                <label :for="'level-' + level.key" class="level-title">{{ level.label }}</label>
                <select
                    :id="'level-' + level.key"
                    v-model="formData.levels[level.key]"
                    class="form-input"
                    :required="question.required"
                >
                  <option value="" disabled selected>{{ question.placeholder }}</option>
                  <option v-for="i in 20" :key="i" :value="i">{{ i }}</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" class="submit-btn">Submit</button>
        </form>

      </main>

    </div>
  </div>
</template>

<style scoped>
.admin-dashboard {
  display: block;
  background-color: var(--main-color);
}

.container {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  padding: 0;
  border-top: 3px solid var(--text-hovor-color);
  border-bottom: 3px solid var(--text-hovor-color);
  width: 100%;
  margin: 0 auto;
}

.sidebar {
  flex: 2;
  background-color: var(--main-color);
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.dashboard-content {
  flex: 6;
}

@media (max-width: 1200px) {
  .admin-dashboard {
    display: block;
  }

  .container {
    flex-direction: column;
  }

  .sidebar {
    min-height: 30vh;
  }
}


.btn-container {
  padding: .5rem;
  background-color: transparent;
}

.btn-container:hover {
  background-color: var(--main-hovor-color);
}

.sidebar-button {
  font-size: 1rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
  text-align: start;
  border-radius: .5rem;
  transition: 0.3s ease-in-out;
}

.sidebar-button:hover {
  color: var(--text-hovor-color);
}

.sidebar ul li {
  list-style: none;
  margin: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
  text-align: start;
  text-transform: capitalize;
  font-weight: normal;
  color: var(--text-hovor-color);
  background-color: transparent;
}

.sidebar li:hover {
  color: var(--text-hovor-color);
  background-color: var(--main-hovor-color);
  transition: .3s ease-in-out;
}

.dashboard-content {
  flex: 10;
  padding: 2rem;
  background-color: #eeeeee;
}

.dashboard-content .title{
  font-size: 2rem;
  color: var(--main-color);
  margin-bottom: 1rem;
}

.dashboard-content .hostel-form {
  display: block;
}

.dashboard-content .question-title {
  font-size: 1rem;
  color: var(--main-color);
}

.dashboard-content .hostel-form input,
.dashboard-content .hostel-form select {
  width: 100%;
  padding: 0.5rem;
  border: 2px solid #EEEEEE;
  border-radius: 5px;
  outline: none;
}

.submit-btn {
  margin-top: 1rem;
  padding: .5rem 2rem;
  display: flex;
  font-size: 1rem;
  border-radius: 1rem;
  background-color: var(--main-color);
  color: var(--text-color);
}

.submit-btn:hover {
  background-color: var(--main-hovor-color);
  transition: .3s ease-in-out;
}

@media (max-width: 768px) {
  .sidebar {
    flex-basis: 100%;
  }

  .dashboard-content {
    padding: 1rem;
  }
}
</style>
