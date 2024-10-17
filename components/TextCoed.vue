
<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { z } from 'zod';
import { nationalities, locationIssues, roomMaintenanceIssues } from '~/utils/nationalities';


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


const previousQuestions = [
  {
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    required: true,
  },
  {
    label: "Student ID Number",
    type: "text",
    placeholder: "Enter your student ID(E.g, AIU21011234)",
    required: true,
  },
  {
    label: "Room Number",
    type: "text",
    placeholder: "Enter your room number (E.g, 25i-3-10)",
    required: true,
  },
  {
    label: "Phone Number (Local Number Only)",
    type: "text",
    placeholder: "Enter your phone number",
    required: true,
  },
  {
    label: "Email Address (Student Email Only)",
    type: "text",
    placeholder: "Enter your email address",
    required: true,
  },
  {
    label: "Gender",
    type: "select",
    id:"gender",
    options: ["Male", "Female"],
    required: true,
    placeholder: "Enter your gender",
  },
  {
    label: "Location in the Room",
    type: "select",
    id: "location",
    options:nationalities,
    required: true,
    placeholder: "Select the location in the room",
  },
  {
    label: "Location-specific Issue",
    type: "select",
    id: "location-issue",
    options:locationIssues,
    required: true,
    placeholder: "Select the issue related to the selected location",
  },
  {
    label: "Enter your Nationality",
    type: "select",
    id: "nationality",
    options: nationalities,
    placeholder: "selectNationality",
  },
  {
    label: "How frequent the damages occur?",
    type: "select",
    options: ["1 time", "2 times", "3 times", "4 times", "5 times", "More than 5 times"],
    required: true,
    placeholder: "How frequent the damages occur?",
  },
  {
    label: "Please provide photo evidence?",
    type: "file",
    required: true,
    placeholder: "Please describe the maintenance issue?",
  },
];


const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  studentId: z.string().regex(/^AIU\d{8}$/, { message: 'Invalid student ID format (e.g., AIU21011234)' }),
  roomNumber: z.string().min(1, { message: 'Room number is required' }),
  phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  nationality: z.string().min(1, { message: 'Nationality is required' })
});

const formData = reactive({
  name: '',
  studentId: '',
  roomNumber: '',
  phoneNumber: '',
  email: '',
  gender: '',
  nationality: '',
  damageType: '',
  damageFrequency: '',
  photoEvidence: null,
  detailedDescription: ''
});

const errors = ref<string[]>(Array(10).fill(''));

// Handle nationality filtering
const userNationalityInput = ref('');
const filteredNationalities = computed(() => {
  return userNationalityInput.value
      ? nationalities.filter(n =>
          n.toLowerCase().startsWith(userNationalityInput.value.toLowerCase())
      )
      : nationalities;
});

// Handle location filtering
const userLocationInput = ref('');
const filteredLocations = computed(() => {
  return userLocationInput.value
      ? locationIssues.filter(loc =>
          loc.toLowerCase().startsWith(userLocationInput.value.toLowerCase())
      )
      : locationIssues;
});

// Handle specific issue filtering
const userFilteredLocationsSpecificIssues = ref('');
const filteredLocationsSpecificIssues = computed(() => {
  return roomMaintenanceIssues.filter(issue =>
      issue.toLowerCase().startsWith(userFilteredLocationsSpecificIssues.value.toLowerCase())
  );
});

// Handle form submission
const handleSubmit = () => {
  const validationResult = formSchema.safeParse(formData);
  if (!validationResult.success) {
    errors.value = validationResult.error.errors.map((error) => error.message);
    console.log('Validation Errors:', errors.value);
  } else {
    errors.value = [];
    console.log('Form Data:', JSON.stringify(formData, null, 2));
    // Submit the form or further process it
  }
};
</script>

<template>
  <div class="maintenance-room-section">
    <div class="container">
      <div class="description">
        <img src="/images/AIU-Official-Logo.png" alt="AIU">
        <h2 class="title-maintenance-form">Form For Maintenance Room Issues</h2>
        <p class="description-maintenance-form">
          If you're experiencing any problems with your room, please fill out this form to let us know.
        </p>
        <p>Note: Before registering, make sure you have your student email.</p>
      </div>

      <div class="maintenance-room-form">
        <h2>Please fill this form</h2>
        <form @submit.prevent="handleSubmit">
          <!-- Dynamic form inputs loop -->
          <div v-for="(question, index) in previousQuestions" :key="index" class="info">
            <h2 class="label">{{ question.label }}</h2>

            <div class="input-container">
              <!-- Text inputs -->
              <template v-if="question.type === 'text'">
                <input
                    :type="question.type"
                    :name="question.label"
                    :placeholder="question.placeholder"
                    v-model="formData[camelizeLabel(question.label)]"
                    :required="question.required"
                />
                <p v-if="errors[index]" class="error">{{ errors[index] }}</p>
              </template>

              <!-- Select inputs -->
              <template v-else-if="question.type === 'select'">
                <select
                    :name="question.label"
                    v-model="formData[camelizeLabel(question.label)]"
                    :required="question.required"
                >
                  <option disabled selected>Select {{ question.placeholder }}</option>
                  <option v-for="option in question.options" :key="option" :value="option">
                    {{ option }}
                  </option>
                </select>
              </template>

              <!-- File inputs -->
              <template v-else-if="question.type === 'file'">
                <input
                    :type="question.type"
                    :name="question.label"
                    :placeholder="question.placeholder"
                    @change="formData.photoEvidence = $event.target.files[0]"
                    :required="question.required"
                />
              </template>
            </div>
          </div>

          <!-- Additional text area -->
          <div class="textarea-container">
            <h2 class="label">Explain in detail the damage mentioned above</h2>
            <textarea
                v-model="formData.detailedDescription"
                placeholder="Please describe the maintenance issue"
            />
          </div>

          <!-- Submit button -->
          <button type="submit" class="submit-maintence-form">Submit</button>
        </form>
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

.container .description {
  flex: 30%;
  background-color: #eeeeee;
  padding: 2.5rem;
  border-radius: 0;
}

.container .maintenance-room-form {
  flex: 60%;
  padding: 2.5rem;
}

@media (max-width: 800px) {
  .container div {
    display: block;
  }

  .container .description {
    padding: 1rem;
  }
}

@media (max-width: 1200px) {
  .container div {
    display: block;
  }

  .container .description {
    padding: 1rem;
  }
}

.container .description h2 {
  font-size: 1.2rem;
  padding: .5rem 0;
  font-weight: bold;
  color: var(--text-color);
  text-align: center;
}

.container .description p {
  font-size: 1rem;
  padding: 1rem 0;
  font-weight: normal;
  color: black;
  text-align: justify;
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

.error{
  color: red;
  font-size: 1rem;
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

.submit-maintence-form{
  margin-top: 1rem;
  padding: .5rem;
  display: flex;
  font-size: 1rem;
  border-radius: 1rem;
  background-color: var(--text-hovor-color);
  color: var(--text-color);
}

.submit-maintence-form:hover{
  background-color: var(--main-color);
  transition: .2s;
}

</style>