<script setup>
import {computed, reactive, ref, watch} from 'vue';
import  Popup from '~/components/PopupSubmit.vue'
import {z} from 'zod';
import { nationalities, locationIssues, roomMaintenanceIssues } from "~/utils/nationalities";

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
const filteredLocations = computed(() => {
  if (!userLocationInput.value) {
    return locationIssues;
  }
  return locationIssues.filter(n =>
      n.toLowerCase().startsWith(userLocationInput.value.toLowerCase())
  );
});

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
    required: true
  },
  {
    label: "Student ID NO",
    type: "text", placeholder: "Enter your student ID (e.g., AIU21011234)",
    required: true
  },
  {
    label: "Room NO",
    type: "text",
    placeholder: "Enter your room NO (e.g., 25i-3-10)",
    required: true
  },
  {
    label: "WhatsApp NO",
    type: "text",
    placeholder: "Enter your whatsapp NO",
    required: true
  },
  {
    label: "Email Address (Student Email Only)",
    type: "text",
    placeholder: "Enter your email address",
    required: true
  },
  {
    label: "Gender",
    type: "select",
    options: ["Male", "Female"],
    required: true,
    placeholder: "Enter your gender"
  },
  {
    label: "Common type Issues",
    type: "select",
    options: filteredLocationsSpecificIssues.value,
    required: true,
    placeholder: "Select the issue related to the selected location"
  },
  {
    label: "Nationality",
    type: "select",
    options: filteredNationalities.value,
    placeholder: "Select nationality"
  },
  {
    label: "How frequent the damages occur?",
    type: "select",
    options: ["1 time", "2 times", "3 times", "4 times", "5 times", "More than 5 times"],
    required: true,
    placeholder: "How frequent the damages occur?"
  },
  {
    label: "Please provide photo evidence",
    type: "file",
    required: true,
    placeholder: "Please provide photo evidence"
  },
  {
    label: "Explain in detail the damage?",
    type: "textarea",
    required: true,
    placeholder: "Explain in detail the damage in mention above"
  }
];

const formSchema = z.object({
  "Name":
      z.string().min(8, "Name must be at least 8 characters long")
          .nonempty("Name is required"),
  "Student ID NO":
      z.string()
          .regex(/^AIU\d{8}$/, "Invalid Student ID format")
          .nonempty("Student ID is required"),
  "Room NO":
      z.string().regex(/^\d+[A-Za-z]*-\d-\d+$/, "Invalid Room Number format")
          .nonempty("Room Number is required"),
  "WhatsApp NO":
      z.string().regex(/^\d{8,15}$/, "Invalid phone number")
          .nonempty("Phone Number is required"),
  "Email Address (Student Email Only)":
      z.string()
          .email("Invalid email format")
          .regex(/@student\.aiu\.edu\.my$/, "Must be a student email ending with '@student.aiu.edu.my'"),
  "Gender":
      z.string()
          .nonempty("Gender is required"),
  "Common type Issues":
      z.string()
          .nonempty("Location-specific Issue is required"),
  "Nationality":
      z.string()
          .optional(),
  "How frequent the damages occur?":
      z.string()
          .nonempty("Frequency of damages is required"),
  "Please provide photo evidence":
      z.any()
          .optional(),
  "Explain in detail the damage?":
      z.string().min(20, "Name must be at least 20 characters long")
          .nonempty("Name is required"),
});

const form = reactive({});
const errors = reactive({});

previousQuestions.forEach((question) => {
  form[question.label] = "";
  errors[question.label] = "";
});

function validateField(field) {
  try {
    formSchema.shape[field].parse(form[field]);
    errors[field] = "";
  } catch (error) {
    errors[field] = error.errors ? error.errors[0].message : error.message;
  }
}

previousQuestions.forEach((question) => {
  watch(() => form[question.label], (newValue) => validateField(question.label, newValue));
});

const isPopupVisible = ref(false)

function handleSubmit() {
  form.Date = new Date().toLocaleDateString("en-GB");
  const validationResults = formSchema.safeParse(form);
  if (validationResults.success) {
    console.log("Form Data:", {...form});
    alert("Form submitted successfully!");
  } else {
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
              <label class="question-title" :for="question.label">{{ question.label }}:</label>

              <input
                  v-if="question.type === 'text' || question.type === 'file'"
                  :type="question.type"
                  v-model="form[question.label]"
                  :placeholder="question.placeholder"
                  :id="question.label"
                  @input="validateField(question.label)"
              />

              <select
                  v-if="question.type === 'select'"
                  v-model="form[question.label]"
                  :id="question.label"
                  @change="validateField(question.label)"
              >
                <option value="" disabled>{{ question.placeholder }}</option>
                <option v-for="option in question.options" :key="option" :value="option">{{ option }}</option>
              </select>
              <span v-if="errors[question.label]" class="error">{{ errors[question.label] }}</span>

              <textarea
                  v-if="question.type === 'textarea'"
                  :id="question.label"
                  :name="question.label"
                  :placeholder="question.placeholder"
                  v-model="form[question.label]"
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
  margin: 7rem;
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
}

@media (max-width: 1200px) {
  .container  {
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
  color: var(--text-color);
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
  width: 205%;
  min-height: 4rem;
  max-height: 4rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
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
  background-color: var(--text-hovor-color);
  transition: .2s;
}

</style>
