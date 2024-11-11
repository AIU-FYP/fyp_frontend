<script setup>
import {computed, reactive, ref, watch} from 'vue';
import Popup from '~/components/PopupAdminSubmit.vue'
import {z} from 'zod';
import {nationalities,} from "~/utils/nationalities";

const form = reactive({});
const errors = reactive({});

const userNationalityInput = ref('');
const filteredNationalities = computed(() => {
  if (!userNationalityInput.value) {
    return nationalities;
  }
  return nationalities.filter(n =>
      n.toLowerCase().startsWith(userNationalityInput.value.toLowerCase())
  );
});


const isPopupVisible = ref(false);

const gender = ref('');

const blockOptions = ref([]); // To hold options for Block Name
watch(gender, () => {
  form["Block Name"] = "";
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
    type: "text",
    placeholder: "Enter your student ID (e.g., AIU21011234)",
    required: true
  },
  {
    label: "Passport NO",
    type: "text",
    placeholder: "Enter your passport NO",
    required: true
  },
  {
    label: "Date of Birth",
    type: "date",
    placeholder: "Select your date of birth",
    required: true
  },
  {
    label: "WhatsApp NO",
    type: "text",
    placeholder: "Enter your WhatsApp NO",
    required: true
  },
  {
    label: "Phone NO",
    type: "text",
    placeholder: "Enter your phone NO",
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
    placeholder: "Enter your gender",
  },
  {
    label: "Nationality",
    type: "select",
    options: filteredNationalities.value,
    placeholder: "Select nationality"
  },
  {
    label: "Country of Residence",
    type: "select",
    options: filteredNationalities.value,
    placeholder: "Enter your country of residence",
    required: true
  },
  {
    label: "Current Level of Education",
    type: "select",
    options: ["Freshman", "Sophomore", "Junior", "Senior"],
    required: true,
    placeholder: "Select your level of education"
  },
  {
    label: "Program/Major",
    type: "select",
    options: ["Freshman", "Sophomore", "Junior", "Senior"],
    placeholder: "Enter your program or major",
    required: true
  },
  {
    label: "Expected Graduation Year",
    type: "text",
    placeholder: "Enter your expected graduation year",
    required: true
  },
  {
    label: "Block Name",
    type: "select",
    options: blockOptions.value,
    placeholder: "Enter Block Name (e.g., 25i)",
    required: true
  },
  {
    label: "Room NO",
    type: "select",
    options: ["01", "02"],
    placeholder: "Enter Room No (e.g., 25H-2-2)",
    required: true
  },
  {
    label: "Which Zone?",
    type: "select",
    options: ["Zone A", "Zone B", "Zone C", "Zone C"],
    required: true,
    placeholder: "How many seats are in the room?"
  },
];

const formSchema = z.object({
  "Name": z.string().min(8, "Name must be at least 8 characters long").nonempty("Name is required"),
  "Student ID NO": z.string().regex(/^AIU\d{8}$/, "Invalid Student ID format").nonempty("Student ID is required"),
  "Passport NO": z.string().regex(/^\d{6,15}$/, "Invalid Passport Number format").nonempty("Passport Number is required"),
  "Date of Birth": z.string().nonempty("Date of Birth is required"),
  "WhatsApp NO": z.string().regex(/^\d{8,15}$/, "Invalid WhatsApp number format").nonempty("WhatsApp number is required"),
  "Phone NO": z.string().regex(/^\d{8,15}$/, "Invalid phone number format").nonempty("Phone number is required"),
  "Email Address (Student Email Only)": z.string().email("Invalid email format").regex(/@student\.aiu\.edu\.my$/, "Must be a student email ending with '@student.aiu.edu.my'").nonempty("Email address is required"),
  "Gender": z.string().nonempty("Gender is required"),
  "Nationality": z.string().optional(),
  "Country of Residence": z.string().optional(),
  "Current Level of Education": z.string().optional(),
  "Program/Major": z.string().optional(),
  "Expected Graduation Year": z.string().regex(/^\d{4,4}$/, "Invalid Passport Number format").nonempty("Passport Number is required"),
  "Block Name": z.string().nonempty("Block Name is required"),
  "Room NO": z.string().optional(),
  "Which Zone?": z.string().optional(),
  "How many Seater?": z.string().nonempty("Seating capacity is required").refine((value) => ["1 Seater", "2 Seater", "3 Seater", "4 Seater"].includes(value), {message: "Please select a valid seating capacity"}),
});

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
  watch(() => form[question.label], () => validateField(question.label));
});

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
      <div class="form-header">
        <h2>Registration New Student</h2>
      </div>
      <div class="maintenance-room-form">
        <form @submit.prevent="handleSubmit">
          <div class="maintenance-form">
            <div class="info" v-for="(question, index) in previousQuestions" :key="index">
              <label class="question-title" :for="question.label">{{ question.label }}:</label>

              <input
                  v-if="question.type === 'text' || question.type === 'file' ||question.type==='date'"
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
            <button @click.once="isPopupVisible = true" class="submit" type="submit">Submit</button>
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
  margin: 5rem 10rem;
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
  flex-direction: column;
  flex-wrap: wrap;
}

.form-header {
  width: 100%;
  text-align: center;
  margin: 0;
  padding: .5rem 0;
  border-radius: 0 1rem 0 0;
  background-color: var(--main-color);
}

.form-header h2 {
  font-size: 1.5rem;
  color: var(--secondary-hovor-color);
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
  .container {
    display: block;
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

.submit {
  width: 100%;
  text-align: center;
  margin-top: 2rem;
  padding: .5rem 2rem;
  font-size: 1.2rem;
  border-radius: 1rem 0;
  background-color: var(--main-color);
  color: var(--secondary-hovor-color);
}

.submit:hover {
  background-color: var(--text-color);
  transition: .3s ease-in-out;
}

</style>
