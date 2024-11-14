<script setup>
import {defineEmits, defineProps} from 'vue'
const props = defineProps({
  show: Boolean
})
const emit = defineEmits(['update:show'])

const closePopup = () => {
  emit('update:show', false)
}

import {reactive, ref, watch} from 'vue';
import {z} from 'zod';

const previousQuestions = [
  {
    label: "First Name",
    type: "text",
    placeholder: "Enter your name",
    required: true
  },
  {
    label: "Last Name",
    type: "text",
    placeholder: "Enter your name",
    required: true
  },
  {
    label: "Position Name",
    type: "text",
    placeholder: "Enter your name",
    required: true
  },
  {
    label: "Staff ID",
    type: "text", placeholder: "Enter your student ID (e.g., AIU21011234)",
    required: true
  },
  {
    label: "Phone Number (Local Number Only)",
    type: "text",
    placeholder: "Enter your phone number",
    required: true
  },
  {
    label: "Email Address (Staff Email Only)",
    type: "text",
    placeholder: "Enter your email address",
    required: true
  },
  {
    label: "New Password",
    type: "password",
    placeholder: "Enter your New Password",
    required: true
  },
  {
    label: "Confirm New Password ",
    type: "password",
    placeholder: "Confirm New Password",
    required: true
  },
];

const formSchema = z.object({
  "First Name":
      z.string().min(5, "Name must be at least 5 characters long")
          .nonempty("Name is required"),
  "Last Name":
      z.string().min(5, "Name must be at least 5 characters long")
          .nonempty("Name is required"),
  "Position":
      z.string().min(5, "Name must be at least 5 characters long")
          .nonempty("Name is required"),
  "Staff ID":
      z.string()
          .regex(/^AIU\d{8}$/, "Invalid Student ID format")
          .nonempty("Student ID is required"),
  "Phone Number (Local Number Only)":
      z.string().regex(/^\d{8,15}$/, "Invalid phone number")
          .nonempty("Phone Number is required"),
  "Email Address (Staff Email Only)":
      z.string()
          .email("Invalid email format")
          .regex(/@student\.aiu\.edu\.my$/, "Must be a student email ending with '@student.aiu.edu.my'"),
  "New Password": z.string()
      .min(12, "Password must be at least 12 characters long")
      .max(15, "Password must not exceed 15 characters")
      .regex(/[a-zA-Z]/, "Password must include at least one letter")
      .regex(/\d/, "Password must include at least one number")
      .regex(/[@$!%*?&]/, "Password must include at least one special character (@$!%*?&)")
      .nonempty("Password is required"),
  "Confirm New Password": z
      .string()
      .min(12, "Password must be at least 12 characters long")
      .max(15, "Password must not exceed 15 characters")
      .regex(/[a-zA-Z]/, "Password must include at least one letter")
      .regex(/\d/, "Password must include at least one number")
      .regex(/[@$!%*?&]/, "Password must include at least one special character (@$!%*?&)")
      .nonempty("Password is required"),
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
  <div v-if="show" class="popup-overlay" @click="closePopup">
    <div class="popup-container" @click.stop>
      <div class="admin-profile">
        <div class="log-in-form">
          <h2>Please fill with your details</h2>
          <div class="form-container">
            <form @submit.prevent="handleSubmit">
              <div class="login-form">
                <div class="info" v-for="(question, index) in previousQuestions" :key="index">
                  <label :for="question.label">{{ question.label }}</label>
                  <input
                      :type="question.type"
                      v-model="form[question.label]"
                      :placeholder="question.placeholder"
                      :id="question.label"
                  />
                  <span v-if="errors[question.label]" class="error">{{ errors[question.label] }}</span>
                </div>
              </div>
              <button class="submit" type="submit">Save change</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-container {
  max-width: 70%;
  width: 70%;
  padding: 1rem;
  max-height: 90vh;
  position: relative;
  text-align: center;
  z-index: 1001;
  border-radius: 0;
  overflow-y: auto;
  background-color: var(--text-hovor-color);
}

@media (max-width: 1200px) {
  .popup-container {
    max-width: 100%;
    width: 100%;
  }
}

.admin-profile {
  width: 100%;
  position: relative;
  text-align: center;
}

@media (max-width: 1200px) {

  .admin-profile {
    border-radius: 0;
    max-width: 100%;
    width: 100%;
  }
}

.log-in-form {
  display: block;
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
  background-color: var(--main-color);
  border-radius: 1rem;
}

.log-in-form > h2 {
  font-size: 1.5rem;
  text-align: start;
  margin: 0 1rem;
  color: var(--text-hovor-color);
}


.login-form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.login-form div {
  flex: 45%;
  margin: 0 1rem;
}

.log-in-form label {
  display: block;
  text-align: start;
  padding: .5rem 0;
  color: var(--text-color);
}

.login-form input,
.login-form select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--main-color);
  border-radius: 5px;
  outline: none;
}

.error {
  color: red;
  font-size: 1rem;
}

.submit {
  display: block;
  width: 50%;
  padding: .5rem;
  margin: 2rem auto 0;
  background-color: var(--text-color);
  color: var(--main-color);
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
}

.submit:hover {
  background-color: var(--main-hovor-color);
  color: var(--text-color);
  transition: .3s ease-in-out;
}

@media (max-width: 1200px) {

  .log-in-form > h2 {
    font-size: 1.2rem;
    text-align: start;
    margin: 0 1rem;
    color: var(--text-hovor-color);
  }

  .log-in-form label {
    font-size: 1rem;
  }
}




</style>
