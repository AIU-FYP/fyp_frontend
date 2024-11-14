<script setup>
import {defineEmits, defineProps} from 'vue'

const props = defineProps({
  show: Boolean
})
const emit = defineEmits(['update:show'])

const closePopup = () => {
  emit('update:show', false)
}

import {reactive, watch} from 'vue';
import {z} from 'zod';

const previousQuestions = [
  {
    label: "Current Password",
    type: "password",
    placeholder: "Enter your Current Password",
    required: true
  },
  {
    label: "New Password",
    type: "password",
    placeholder: "Enter your New Password",
    required: true
  },
  {
    label: "Confirm New Password",
    type: "password",
    placeholder: "Confirm New Password",
    required: true
  },
];

const formSchema = z.object({
  "Current Password":
      z.string()
          .min(12, "Password must be at least 12 characters long")
          .max(15, "Password must not exceed 15 characters")
          .regex(/[a-zA-Z]/, "Password must include at least one letter")
          .regex(/\d/, "Password must include at least one number")
          .regex(/[@$!%*?&]/, "Password must include at least one special character (@$!%*?&)")
          .nonempty("Password is required"),
  "New Password": z.string()
      .min(12, "Password must be at least 12 characters long")
      .max(15, "Password must not exceed 15 characters")
      .regex(/[a-zA-Z]/, "Password must include at least one letter")
      .regex(/\d/, "Password must include at least one number")
      .regex(/[@$!%*?&]/, "Password must include at least one special character (@$!%*?&)")
      .nonempty("Password is required"),
  "Confirm New Password ": z
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
  watch(
      () => form[question.label],
      () => validateField(question.label)
  );
});


function handleSubmit() {
  const validationResults = formSchema.safeParse(form);
  if (validationResults.success) {
    console.log("Form Data:", {...form});
    alert("Password changed successfully!");
  } else {
    alert("Please correct the errors in the form.");
  }
}

</script>

<template>
  <div v-if="show" class="popup-overlay" @click="closePopup">
    <div class="popup-container" @click.stop>
      <div class="log-in-form">
        <div class="form-container">
          <form @submit.once="handleSubmit">
            <div class="login-form">
              <div class="info" v-for="(question, index) in previousQuestions" :key="index">
                <label :for="question.label">{{ question.label }} :</label>
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
  max-width: 40%;
  width: 40%;
text-align: center;
  z-index: 1001;
  padding: 1rem;
  background-color: var(--main-color);
}

@media (max-width: 1200px) {
  .popup-container {
    max-width: 100%;
    width: 100%;
  }
}

.log-in-form {
  display: block;
  background-color: transparent;
}

.login-form {
  display: block;
  width: 90%;
  margin: 3rem auto;
}

.log-in-form label {
  display: block;
  text-align: start;
  padding: 1rem 0;
  color: var(--text-color);
}

.login-form input,
.login-form select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--text-hovor-color);
  border-radius: 5px;
  outline: none;
}

.error {
  color: red;
  font-size: 1rem;
}

.submit {
  display: block;
  width: 90%;
  padding: .5rem;
  margin: 0 auto;
  background-color: var(--text-color);
  color: var(--main-color);
  font-size: 1.2rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0 5px 15px;
}

.submit:hover {
  background-color: var(--main-hovor-color);
  color: var(--text-hovor-color);
  transition: .3s ease-in-out;
}


</style>
