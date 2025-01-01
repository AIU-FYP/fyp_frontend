<script setup>
import {computed, reactive, ref, watch} from 'vue';
import Popup from '~/components/AdminSubmitPopup.vue'
import {z} from 'zod';
import { religions, nationalities,} from "~/utils/nationalities";

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

const userReligionsInput = ref('');
const filteredReligions = computed(() => {
  if (!userReligionsInput.value) {
    return religions;
  }
  return religions.filter(n =>
      n.toLowerCase().startsWith(userReligionsInput.value.toLowerCase())
  );
});

const isPopupVisible = ref(false);

const previousQuestions = [
  {
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    id:"name",
  },
  {
    label: "Student ID",
    type: "text",
    placeholder: "Enter your student ID (e.g., AIU21011234)",
    id: "student_id",
  },
  {
    label: "Passport No",
    type: "text",
    placeholder: "Enter your passport No",
    id: "passport",
  },
  {
    label: "Date of Arrive",
    type: "date",
    placeholder: "Select your date of birth",
    id: "arrival_date",
  },
  {
    label: "WhatsApp No",
    type: "text",
    placeholder: "Enter your WhatsApp No",
    id : "phone",
  },
  {
    label: "Email Address (Student Email Only)",
    type: "text",
    placeholder: "Enter your email address",
    id : "email",
  },
  {
    label: "Gender",
    type: "select",
    options: [{value : "male" ,label :"Male"}, {value : "female" ,label :"Female"}],
    placeholder: "Select your gender",
    model: ref(""),
    id: "gender",
  },
  {
    label: "Religion",
    type: "select",
    options: filteredReligions.value,
    placeholder: "Select Your religion",
    id :"religion",
  },
  {
    label: "Nationality",
    type: "select",
    options: filteredNationalities.value,
    placeholder: "Select Your nationality",
    id : "nationality",
  },
  {
    label: "Program/Major",
    type: "text",
    placeholder: "Enter your program or major",
    id : "major",
  },
  {
    label: "Block Name",
    type: "text",
    placeholder: "Select Block Name (e.g., 25i)",
    model: ref(""),
    id :"block_name"
  },
  {
    label: "Level No",
    type: "text",
    placeholder: "Select Level No (e.g., Level one)",
    model: ref(""),
    id :"level_number"
  },
  {
    label: "Room No",
    type: "text",
    placeholder: "Select Room No (e.g., 02)",
    model: ref(""),
    id : "room"
  },
  {
    label: "Which Zone",
    type: "text",
    placeholder: "How many seats are in the room?",
    id :"room_zone",
  },
];

const formSchema = z.object({
  "name": z.string().min(8, "Name must be at least 8 characters long").nonempty("Name is required"),
  "student_id": z.string().regex(/^AIU\d{8}$/, "Invalid Student ID format").nonempty("Student ID is required"),
  "passport": z.string().regex(/^\d{6,15}$/, "Invalid Passport Number format").nonempty("Passport Number is required"),
  "arrival_date": z.string().nonempty("Date of Birth is required"),
  "phone": z.string().regex(/^\d{8,15}$/, "Invalid WhatsApp number format").nonempty("WhatsApp number is required"),
  "email": z.string().email("Invalid email format").regex(/@student\.aiu\.edu\.my$/, "Must be a student email ending with '@student.aiu.edu.my'").nonempty("Email address is required"),
  "gender": z.string().nonempty("Gender is required"),
  "religion": z.string().optional(),
  "nationality": z.string().optional(),
  "major": z.string().min(3, "Name must be at least 3 characters long").nonempty("Major is required"),
  "block_name": z.string().min(2, "Name must be at least 8 characters long").nonempty("Name is required"),
  "room": z.string().min(2, "Name must be at least 8 characters long").nonempty("Name is required"),
  "level_number": z.string().min(2, "Name must be at least 8 characters long").nonempty("Name is required"),
  "room_zone": z.string().min(2, "Name must be at least 8 characters long").nonempty("Name is required"),
});

previousQuestions.forEach((question) => {
  form[question.id] = "";
  errors[question.id] = "";
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
  watch(() => form[question.id], () => validateField(question.id));
});

async function handleSubmit() {
  const api = useApi();
  form.Date = new Date().toLocaleDateString("en-GB");

  const validationResults = formSchema.safeParse(form);
  console.log('Form data:', form);
  if (validationResults.success) {
    try {
      console.log("Sending API Request...");
      const response = await api.post("/students/", { ...form });
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
    }
  } else {
    console.log('Validation Errors:', validationResults.error.errors);
    isPopupVisible.value = false;
    alert("Please correct the errors in the form.");
  }
}

</script>

<template>
  <div class="new-student-sec">
    <div class="container">
      <div class="form-header">
        <h2>Student Registration Form</h2>
      </div>
      <div class="box-form">
        <form @submit.prevent="handleSubmit">
          <div class="form-container">
            <div class="info" v-for="(question, index) in previousQuestions" :key="index">
              <label class="question-title" :for="question.label">{{ question.label }}</label>

              <input
                  v-if="question.type === 'text' || question.type === 'file' ||question.type==='date'"
                  :type="question.type"
                  v-model="form[question.id]"
                  :placeholder="question.placeholder"
                  :id="question.label"
                  @input="validateField(question.id)"
              />

              <select
                  v-if="question.type === 'select'"
                  v-model="form[question.id]"
                  :id="question.label"
                  @change="validateField(question.id)"
              >
                <option value="" disabled>{{ question.placeholder }}</option>
                <option v-for="option in question.options" :key="option.label" :value="option.value">{{ option.label }}</option>
              </select>
              <span v-if="errors[question.id]" class="error">{{ errors[question.id] }}</span>

              <textarea
                  v-if="question.type === 'textarea'"
                  :id="question.id"
                  :name="question.label"
                  :placeholder="question.placeholder"
                  v-model="form[question.id]"
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

.container {
  display: block;
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 1300px;
  box-shadow: rgba(149, 157, 165, 0.3) 0 8px 24px;

}

@media (max-width: 1200px) {
  .container {
    margin: 3rem 0;
    width: 100%;
  }
}

.form-header {
  width: 100%;
  text-align: center;
  margin: 0;
  padding: .5rem 0;
  background-color: var(--text-color);
  border: none;
  outline: none;
  font-size: 1.5rem;
  color: var(--main-color);
}

.container .box-form {
  width: 90%;
  margin: 0 auto;
  padding: 1rem 0;
}

@media (max-width: 1200px) {
  .container div {
    display: block;
  }
}

.form-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 0.5rem 1rem;
}

.info {
  flex-basis: calc(50% - 10px);
  box-sizing: border-box;
  display: block;
}

.form-container .question-title {
  font-size: 1rem;
  color: var(--main-hovor-color);
}

.form-container input,
.form-container select {
  width: 100%;
  padding: .5rem 1rem;
  border: 2px solid var(--text-color);
  border-radius: 5px;
  outline: none;
}

.error {
  color: red;
  font-size: 1rem;
}

.submit {
  width: 100%;
  text-align: center;
  margin-top: 2rem;
  padding: .5rem 2rem;
  font-size: 1.2rem;
  border-radius: 1rem 0;
  background-color: var(--main-hovor-color);
  color: var(--text-hovor-color);
}

.submit:hover {
  background-color: var(--main-color);
  transition: .3s ease-in-out;
}


</style>
