<script setup>
import {computed, reactive, ref, watch} from 'vue';
import Popup from '~/components/StudentSubmitPopup.vue'
import {z} from 'zod';
import {nationalities, roomMaintenanceIssues} from "~/utils/nationalities";
import {useNuxtApp} from "#app";

let {$axios} = useNuxtApp()

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

const userFilteredLocationsSpecificIssues = ref('');
const filteredLocationsSpecificIssues = computed(() => {
  if (!userLocationInput.value) {
    return roomMaintenanceIssues;
  }
  return roomMaintenanceIssues.filter(n =>
      n.toLowerCase().startsWith(userFilteredLocationsSpecificIssues.value.toLowerCase())
  );
});

const previousQuestions = [
  {
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    required: true,
    id: "student",
  },
  {
    label: "Student ID",
    type: "text",
    placeholder: "Student ID (e.g., AIU21011234)",
    id: "student_id",
    required: true,
  },
  {
    label: "Room No",
    type: "text",
    placeholder: "Enter your room No (e.g., 25i-3-10)",
    required: true,
    id: "room_number",
  },
  {
    label: "WhatsApp No",
    type: "text",
    placeholder: "Enter your whatsapp No",
    id: "phone",
    required: true,
  },
  {
    label: "Email Address (Student Email Only)",
    type: "text",
    placeholder: "Enter your email address",
    id: "email",
    required: true,
  },
  {
    label: "Gender",
    type: "select",
    options: ["male", "female"],
    required: true,
    id: "gender",
    placeholder: "Enter your gender",
  },
  {
    label: "Common type Issues",
    type: "select",
    options: filteredLocationsSpecificIssues.value,
    required: true,
    placeholder: "Select the issue related to the selected location",
    id: "issue"
  },
  {
    label: "Nationality",
    type: "select",
    options: filteredNationalities.value,
    id: "nationality",
    placeholder: "Select nationality",
  },
  {
    label: "How frequent the damages occur?",
    type: "select",
    options: ["1 time", "2 times", "3 times", "4 times", "5 times", "More than 5 times"],
    required: true,
    id: "occurrence",
    placeholder: "How frequent the damages occur?",
  },
  {
    label: "Please provide photo evidence",
    type: "file",
    required: true,
    placeholder: "Please provide photo evidence",
    id: "evidence_photo",
  },
  {
    label: "Explain in detail the damage?",
    type: "textarea",
    required: true,
    id: "explanation",
    placeholder: "Explain in detail the damage in mention above",
  }
];

const formSchema = z.object({
  student: z
      .string()
      .min(8, 'Name must be at least 8 characters long')
      .nonempty('Name is required'),
  student_id: z
      .string()
      .regex(/^AIU\d{8}$/, 'Invalid Student ID format')
      .nonempty('Student ID is required'),
  room_number: z
      .string()
      .regex(/^\d+[A-Za-z]*-\d-\d+$/, 'Invalid Room Number format')
      .nonempty('Room Number is required'),
  phone: z
      .string()
      .regex(/^\d{8,15}$/, 'Invalid phone number')
      .nonempty('Phone Number is required'),
  email: z
      .string()
      .email('Invalid email format')
      .regex(/@student\.aiu\.edu\.my$/, "Must be a student email ending with '@student.aiu.edu.my'"),
  gender: z.string().nonempty('Gender is required'),
  issue: z.string().nonempty('Location-specific Issue is required'),
  nationality: z.string().optional(),
  occurrence: z.string().nonempty('Frequency of damages is required'),
  evidence_photo: z.any().optional(),
  explanation: z
      .string()
      .min(20, 'Detail must be at least 20 characters long')
      .nonempty('Detail is required'),
});

const form = reactive({});
const errors = reactive({});

previousQuestions.forEach((question) => {
  form[question.id] = "";
  errors[question.id] = "";
});

function validateField(field) {
  try {
    formSchema.shape[field].parse(form[field]);
    errors[field] = "";
  } catch (error) {
    console.error(`Validation failed for field: ${field}`, error);
    errors[field] = error.errors ? error.errors[0].message : error.message;
  }
}

previousQuestions.forEach((question) => {
  watch(() => form[question.id], () => validateField(question.id));
});

const evidence_photo = ref(null);

const handleFileUpload = (event, inputDetails) => {
  if (inputDetails.type !== 'file') {
    return;
  }
  evidence_photo.value = event.target.files[0];
};

const isPopupVisible = ref(false)

async function handleSubmit() {
  const api = useApi();
  form.Date = new Date().toLocaleDateString("en-GB");

  const validationResults = formSchema.safeParse(form);
  if (validationResults.success) {
    try {
      // console.log("Sending API Request...");
      const formDataObj = new FormData();
      for (const key in form) {
        const value = form[key];
        if (value === null || value === undefined) {
          continue;
        }
        formDataObj.append(key, value);
      }
      formDataObj.delete('evidence_photo')

      if (evidence_photo.value) {
        formDataObj.append('evidence_photo', evidence_photo.value)
      }

      const response = await api.post("/maintenance-requests/", formDataObj);
      console.log("Response Data:", response.data);
      isPopupVisible.value = true;
      Object.keys(form).forEach((key) => (form[key] = ""));
    } catch (error) {
      isPopupVisible.value = false;
      console.error("Error occurred:", error);
      if (error.response) {
        console.error("Backend Error:", error.response.data);
        alert(`Error: ${error.response.data.detail || "Unable to submit the form."}`);
        console.log("Response Data:", response.data.value);
      } else if (error.request) {
        console.error("No response from the server:", error.request);
        alert("Server is not responding. Please try again later.");
      } else {
        console.error("Request Setup Error:", error.message);
        alert("An error occurred while submitting the form. Please try again.");
      }
      isPopupVisible.value = false;
    }
  } else {
    console.log('Validation Errors:', validationResults.error.errors);
    isPopupVisible.value = false;
    alert("Please correct the errors in the form.");
  }
}

</script>

<template>
  <div class="maintenance-room-section">
    <div class="container">

      <div class="description">
        <img src="/images/AIU-Official-Logo.png" alt="AIU"/>
        <h2 class="title-maintenance-form">Form For Maintenance Room Issues</h2>
        <p class="description-maintenance-form">
          If you're experiencing any problems with your room, please fill out this form to let us know. This will help
          us quickly identify and address the issue, ensuring your living space remains comfortable and safe.
        </p>
        <p>Note: Before registering to the system, please make sure you have your student email.</p>
      </div>

      <div class="maintenance-room-form">
        <h2>Please fill this Form</h2>
        <form @submit.prevent="handleSubmit">
          <div class="maintenance-form">
            <div class="info" v-for="(question, index) in previousQuestions" :key="index">
              <label class="question-title" :for="question.label">{{ question.label }}</label>

              <input
                  v-if="question.type === 'text' || question.type === 'file'"
                  :type="question.type"
                  v-model="form[question.id]"
                  :placeholder="question.placeholder"
                  :id="question.label"
                  :accept="question.type === 'file' ? '.doc,.docx,.pdf,.jpg,.jpeg,.png,.gif' : ''"
                  @change="(e) => handleFileUpload(e, question)"
                  @input="validateField(question.id)"
              />


              <select
                  v-if="question.type === 'select'"
                  v-model="form[question.id]"
                  :id="question.label"
                  @change="validateField(question.id)"
              >
                <option value="" disabled>{{ question.placeholder }}</option>
                <option v-for="option in question.options" :key="option" :value="option">{{ option }}</option>
              </select>
              <span v-if="errors[question.id]" class="error">{{ errors[question.id] }}</span>

              <textarea
                  v-if="question.type === 'textarea'"
                  :id="question.label"
                  :name="question.label"
                  :placeholder="question.placeholder"
                  v-model="form[question.id]"
              />

            </div>
          </div>

          <div>
            <button @click.once="isPopupVisible = true" class="maintenance-submit" type="submit">Submit</button>
            <Popup :show="isPopupVisible" @update:show="isPopupVisible = $event">
            </Popup>
          </div>

        </form>
      </div>

    </div>
  </div>
</template>

<style scoped>

.maintenance-room-section {
  margin: 3rem 7rem;
  border: 2px solid var(--text-hovor-color);
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
  max-width: 1200px;
}

.container .description {
  flex: 30%;
  background-color: var(--main-color);
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
}

@media (max-width: 1200px) {
  .container {
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
  color: var(--text-color);
  text-align: justify;
}

.maintenance-room-form > h2 {
  font-size: 1.5rem;
  color: var(--main-hovor-color);
  text-align: center;
  padding: 1rem 0;
}

.maintenance-form {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 1rem;
  margin-top: 0.5rem !important;
}

.info {
  flex-basis: calc(50% - 10px);
  box-sizing: border-box;
  display: block;
}

.maintenance-form .question-title {
  font-size: 1rem;
  color: var(--main-color);
}

.maintenance-form input,
.maintenance-form select {
  width: 100%;
  padding: 0.5rem;
  border: 2px solid #EEEEEE;
  border-radius: 5px;
  outline: none;
}

.maintenance-form textarea {
  width: 205%;
  min-height: 4rem;
  max-height: 4rem;
  padding: 0.5rem;
  border: 2px solid #EEEEEE;
  border-radius: 5px;
  outline: none;
}

.error {
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

.maintenance-submit {
  margin-top: 1rem;
  padding: .5rem 2rem;
  display: flex;
  font-size: 1rem;
  border-radius: 1rem;
  background-color: var(--main-color);
  color: var(--text-color);
}

.maintenance-submit:hover {
  background-color: var(--main-hovor-color);
  transition: .3s ease-in-out;
}

</style>
