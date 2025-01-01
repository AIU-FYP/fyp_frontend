<script setup>
import {computed, reactive, ref, watch} from 'vue';
import {z} from 'zod';
import {dropdownOptions,} from "~/utils/dropdownOptions.js";
import Popup from "~/components/StudentSubmitPopup.vue";

const userNationalityInput = ref('');
const filteredNationalities = computed(() => {
  if (!userNationalityInput.value) {
    return dropdownOptions;
  }
  return dropdownOptions.filter(n =>
      n.toLowerCase().startsWith(userNationalityInput.value.toLowerCase())
  );
});

const previousQuestions = [
  {
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    required: true,
    id:'student'
  },
  {
    label: "Student ID",
    type: "text", placeholder: "Enter your student ID (e.g., AIU21011234)",
    required: true,
    id :'student_id'
  },
  {
    label: "Room No",
    type: "text",
    placeholder: "Enter your room No (e.g., 25i-3-10)",
    required: true,
    id :"room_number"
  },
  {
    label: "Phone No (Local No Only)",
    type: "text",
    placeholder: "Enter your phone No",
    required: true,
    id :'phone'
  },
  {
    label: "Email Address (Student Email Only)",
    type: "text",
    placeholder: "Enter your email address",
    required: true,
    id :'email'
  },
  {
    label: "Gender",
    type: "select",
    options: ["male", "female"],
    required: true,
    placeholder: "Enter your gender",
    id :"gender"
  },
  {
    label: "Enter your Nationality",
    type: "select",
    options: filteredNationalities.value,
    placeholder: "Select nationality",
    id :"nationality"
  },
  {
    label: "Other supporting docs",
    type: "file",
    required: true,
    placeholder: "Other supporting docs",
    id :"supporting_doc"
  },
  {
    label: "Explain your reason for room change?",
    type: "textarea",
    required: true,
    placeholder: "Explain in detail the reason for room change?",
    id :"reason"
  }
];

const formSchema = z.object({
  "student":
      z.string().min(8, "Name must be at least 8 characters long")
          .nonempty("Name is required"),
  "student_id":
      z.string()
          .regex(/^AIU\d{8}$/, "Invalid Student ID format")
          .nonempty("Student ID is required"),
  "room_number":
      z.string().regex(/^\d+[A-Za-z]*-\d-\d+$/, "Invalid Room Number format")
          .nonempty("Room Number is required"),
  "phone":
      z.string().regex(/^\d{8,15}$/, "Invalid phone number")
          .nonempty("Phone Number is required"),
  "email":
      z.string()
          .email("Invalid email format")
          .regex(/@student\.aiu\.edu\.my$/, "Must be a student email ending with '@student.aiu.edu.my'"),
  "gender":
      z.string()
          .nonempty("Gender is required"),
  "nationality":
      z.string()
          .optional(),
  "supporting_doc":
      z.any()
          .optional(),
  "reason":
      z.string().min(20, "Name must be at least 20 characters long")
          .nonempty("Name is required"),
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
    errors[field] = error.errors ? error.errors[0].message : error.message;
  }
}

previousQuestions.forEach((question) => {
  watch(() => form[question.id], (newValue) => validateField(question.id, newValue));
});

const supporting_doc = ref(null);

const handleFileUpload = (event, inputDetails) => {
  if (inputDetails.type !== 'file') {
    return;
  }
  supporting_doc.value = event.target.files[0];
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

      formDataObj.delete('supporting_doc')

      if (supporting_doc.value) {
        formDataObj.append('supporting_doc', supporting_doc.value)
      }

      const response = await api.post("/change-room-requests/", formDataObj);
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
  <div class="change-room-section">
    <div class="container">
      <div class="description">
        <img src="/images/AIU-Official-Logo.png" alt="AIU">
        <h2 class="title-maintenance-form">Form for request to change room </h2>
        <p class="description-maintenance-form">If you need to request a room change, please fill out this form with
          your reason for the request. Be sure to provide any necessary documentation, such as a medical report if
          applicable. This will help us assess your request and find a suitable room for you, subject to availability
          and approval.
        </p>
        <p> Note: For medical reasons, attach an official medical report.</p>
      </div>

      <div class="change-room-form">
        <h2>Please fill this Form</h2>
        <form @submit.prevent.once="handleSubmit">
          <div class="maintenance-form">
            <div class="info" v-for="(question, index) in previousQuestions" :key="index">
              <label class="question-title" :for="question.label">{{ question.label }}</label>

              <input
                  v-if="question.type === 'text' || question.type === 'file'"
                  :type="question.type"
                  v-model="form[question.id]"
                  :placeholder="question.placeholder"
                  :id="question.id"
                  @change="(e) => handleFileUpload(e, question)"
                  @input="validateField(question.id)"
              />

              <select
                  v-if="question.type === 'select'"
                  v-model="form[question.id]"
                  :id="question.id"
                  @change="validateField(question.id)"
              >
                <option value="" disabled>{{ question.placeholder }}</option>
                <option v-for="option in question.options" :key="option" :value="option">{{ option }}</option>
              </select>
              <span v-if="errors[question.id]" class="error">{{ errors[question.id] }}</span>

              <textarea
                  v-if="question.type === 'textarea'"
                  :id="question.id"
                  :name="question.label"
                  :placeholder="question.placeholder"
                  v-model="form[question.id]"
                  @input="validateField(question.label)"
              />


            </div>
          </div>

          <button @click.once="isPopupVisible = true" class="maintenance-submit" type="submit">Submit</button>
          <popup :show="isPopupVisible" @update:show="isPopupVisible = $event">
          </popup>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

.change-room-section {
  margin: 3rem 7rem;
  border: 2px solid #eeeeee;
  border-radius: 0 30px 30px 0;
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
}

@media (max-width: 800px) {
  .change-room-section {
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
  background-color: var(--main-color);
  padding: 2.5rem;
  border-radius: 0;
}

.container .change-room-form {
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
  color: black;
  text-align: justify;
}

.change-room-form > h2 {
  font-size: 1.5rem;
  color: var(--main-color);
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
  flex-basis: calc(100% - 10px);
  box-sizing: border-box;
  display: block;
}

.maintenance-form .question-title {
  font-size: 1rem;
  color: var(--main-color);
  padding: .5rem 0;
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
  width: 100%;
  height: 4rem;
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
  padding: .5rem;
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
