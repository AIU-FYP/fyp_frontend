<script setup lang="ts">

import {reactive} from "vue";
import {locationIssues, nationalities, roomMaintenanceIssues} from "~/utils/nationalities";

const userNationalityInput = ref('');

const filteredNationalities = computed(() => {
  if (!userNationalityInput.value) {
    return nationalities;
  }
  return nationalities.filter(n =>
      n.toLowerCase().startsWith(userNationalityInput.value.toLowerCase())
  );
});

const userLocationInput = ref('');
computed(() => {
  if (!userLocationInput.value) {
    return locationIssues;
  }
  return locationIssues.filter(n =>
      n.toLowerCase().startsWith(userLocationInput.value.toLowerCase())
  );
});
const userFilteredLocationsSpecificIssues = ref('');
computed(() => {
  if (!userLocationInput.value) {
    return roomMaintenanceIssues;
  }
  return roomMaintenanceIssues.filter(n =>
      n.toLowerCase().startsWith(userFilteredLocationsSpecificIssues.value.toLowerCase())
  );
});
const registrationQuestions = [
  {
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
    required: true,
  },
  {
    label: "Student ID Number",
    type: "text",
    placeholder: "Enter your student ID (E.g., AIU21011234)",
    required: true,
  },
  {
    label: "Gender",
    type: "select",
    id: "gender",
    options: ["Male", "Female"],
    required: true,
    placeholder: "Select your gender",
  },
  {
    label: "Date of Birth",
    type: "date",
    placeholder: "Enter your date of birth",
    required: true,
  },
  {
    label: "Nationality",
    type: "select",
    id: "nationality",
    options: filteredNationalities.value,
    placeholder: "Select your nationality",
    required: true,
  },
  {
    label: "Phone Number",
    type: "text",
    placeholder: "Enter your phone number",
    required: true,
  },
  {
    label: "Email Address",
    type: "email",
    placeholder: "Enter your student email address",
    required: true,
  },
  {
    label: "Current Year of Study",
    type: "select",
    id: "year-of-study",
    options: ["English language","1st Year", "2nd Year", "3rd Year"],
    required: true,
    placeholder: "Select your current year of study",
  },
  {
    label: "Course or Program",
    type: "text",
    placeholder: "Enter your course or program",
    required: true,
  },
  {
    label: "Allergies or Medical Conditions",
    type: "text",
    placeholder: "Enter any allergies or medical conditions",
    required: false,
  },
  {
    label: "Emergency Contact Name",
    type: "text",
    placeholder: "Enter your emergency contact's name",
    required: true,
  },
  {
    label: "Emergency Contact Relationship",
    type: "text",
    placeholder: "Enter your relationship with the emergency contact",
    required: true,
  },
  {
    label: "Emergency Contact Phone Number",
    type: "text",
    placeholder: "Enter your emergency contact's phone number",
    required: true,
  },
  {
    label: "Arrival Date",
    type: "date",
    placeholder: "Enter your expected arrival date",
    required: true,
  }
];
ref<string[]>(Array(registrationQuestions.length).fill(''));
type FormData = {
  name: string;
  studentId: string;
  roomNumber: string;
  phoneNumber: string;
  email: string;
  gender: string;
  damageType: string;
  damageFrequency: string;
  photoEvidence: File | null;
  detailedDescription: string;
};

const formData = reactive({
  name: '',
  studentId: '',
  roomNumber: '',
  phoneNumber: '',
  email: '',
  gender: '',
  nationality: '' || filteredNationalities.value[0],
  damageType: '',
  damageFrequency: '',
  photoEvidence: null,
  detailedDescription: '',
});

const handleSubmit = () => {
  console.log("Form Data:", JSON.stringify(formData, null, 2));
};


const camelizeLabel = (label: string): keyof FormData => {
  return label.replace(/\s(.)/g, (match, group1) => group1.toUpperCase()).replace(/\s/g, '').replace(/^(.)/, (match) => match.toLowerCase()) as keyof FormData;
};

</script>

<template>
  <div class="maintenance-room-section">
    <div class="container">
      <div class="maintenance-room-form">
        <h2>Please fill this Form </h2>
        <div class="form-group">
          <form @submit.prevent="handleSubmit">
            <div class="maintenance-form">
              <div class="info" v-for="(question, index) in registrationQuestions" :key="index">
                <h2 class="lable">{{ question.label }}</h2>
                <div class="input-container">
                  <UIcon class="input-icon" name="heroicons-search"/>
                  <template v-if="question.type === 'text'">
                    <input
                        :type="question.type"
                        :name="question.label"
                        :placeholder="question.placeholder"
                        v-model="formData[camelizeLabel(question.label)]"
                        :required="question.required"
                    >
                  </template>
                  <template v-else-if="question.type === 'select'">
                    <select
                        :name="question.label"
                        :required="question.required"
                        v-model="formData[camelizeLabel(question.label)]"
                    >
                      <option disabled selected>Select {{ question.placeholder }}</option>
                      <option v-for="option in question.options" :key="option" :value="option">
                        {{ option }}
                      </option>
                    </select>
                  </template>
                  <template v-else-if="question.type === 'date'">
                  <input
                      :name="question.label"
                      type="date"
                      :required="question.required"
                      v-model="formData[camelizeLabel(question.label)]"
                      :placeholder="question.placeholder"
                  />
                </template>
                  <template v-else-if="question.type === 'email'">
                    <input
                        :name="question.label"
                        type="email"
                        :required="question.required"
                        v-model="formData[camelizeLabel(question.label)]"
                        :placeholder="question.placeholder"
                    />
                  </template>
                  <template v-else-if="question.type === 'file'">
                    <input
                        :type="question.type"
                        :name="question.label"
                        :placeholder="question.placeholder"
                        :required="question.required"
                    />
                  </template>
                </div>
              </div>
            </div>
            <button type="submit" class="submit-maintence-form"> Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.maintenance-room-section {
  margin: 5rem;
  border: 2px solid #eeeeee;
  border-radius: 0 30px 30px 0;
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
}

@media (max-width: 800px) {
  .maintenance-room-section {
    margin: 0.5rem;
  }
}

.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.container .maintenance-room-form {
  flex: 80%;
  padding: 2.5rem;
}

@media (max-width: 800px) {
  .container div {
    display: block;
  }
}

@media (max-width: 1200px) {
  .container div {
    display: block;
  }
}

.maintenance-room-form > h2 {
  font-size: 1.5rem;
  color: var(--text-color);
  text-align: center;
  padding: 1rem 0;
}

.maintenance-form {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 10px;
}

.info {
  flex-basis: calc(50% - 10px);
  box-sizing: border-box;
  display: block;
}

.maintenance-form .lable {
  font-size: 1rem;
  color: var(--text-color);
  padding: .5rem 0;
}

.maintenance-form input,
.maintenance-form select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

.maintenance-form textarea {
  width: 200%;
  height: 5rem;
  max-height: 5rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

@media (max-width: 1200px) {
  .maintenance-form textarea {
    width: calc(100% - .5rem);
  }
}

@media (max-width: 800px) {
  .maintenance-form textarea {
    width: calc(100% - .5rem);
  }
}

.submit-maintence-form {
  margin-top: 1rem;
  padding: .5rem;
  display: flex;
  font-size: 1rem;
  border-radius: 1rem;
  background-color: var(--text-hovor-color);
  color: var(--text-color);
}

.submit-maintence-form:hover {
  background-color: var(--main-color);
  transition: .2s;
}

</style>