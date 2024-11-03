<script setup>
import { reactive, ref, watch } from 'vue';
import { z } from 'zod';

const previousQuestions = [
  {
    label: "Username",
    type: "text",
    placeholder: "Enter your Username",
    required: true
  },
  {
    label: "Name",
    type: "text",
    placeholder: "Enter your Name",
    required: true
  },
  {
    label: "Admin Password",
    type: "password",
    placeholder: "Enter your Password",
    required: true
  },
];

const formSchema = z.object({
  "Username":
      z.string()
          .regex(/^AIU\d{8}$/, "Username must start with 'AIU' followed by 8 digits")
          .nonempty("Username is required"),
  "Name":
      z.string()
          .min(8, "Name must be at least 8 characters long")
          .nonempty("Name is required"),
  "Admin Password":
      z.string()
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
    errors[field] = ""; // Clear error if validation passes
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

const isPopupVisible = ref(false);

function handleSubmit() {
  const validationResults = formSchema.safeParse(form);
  if (validationResults.success) {
    console.log("Form Data:", { ...form });
    alert("Form submitted successfully!");
  } else {
    alert("Please correct the errors in the form.");
    validationResults.error.errors.forEach((err) => {
      errors[err.path[0]] = err.message;
    });
  }
}
</script>

<template>
  <div class="log-in">
    <div class="container">
      <div class="info-box">
        <h1 class="title">WELCOME TO AL BUKHARY INTERNATIONAL UNIVERSITY</h1>
        <h2>Education Makes A Difference</h2>
        <div class="socials-section">
          <!-- Social Links Omitted for Brevity -->
        </div>
      </div>
      <div class="log-in-form">
        <h2>Smart AIU Hostels Management System</h2>
        <form @submit.prevent="handleSubmit">
          <div class="login-form">
            <div class="info" v-for="(question, index) in previousQuestions" :key="index">
              <label :for="question.label">{{ question.label }}:</label>
              <input
                  :type="question.type"
                  v-model="form[question.label]"
                  :placeholder="question.placeholder"
                  :id="question.label"
              />
              <span v-if="errors[question.label]" class="error">{{ errors[question.label] }}</span>
            </div>
          </div>
          <button class="maintenance-submit" type="submit">Log In</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 75%;
  margin: 5rem auto;
  background-color: #f5f5f5;
  border-radius: 2rem;
  box-shadow: rgba(70, 70, 73, 0.2) 0 8px 24px;
}

.container .info-box {
  flex: 35%;
  background-color: var(--main-color);
  padding: 1rem;
}

.container .log-in-form {
  flex: 55%;
  padding: 1rem;
}

@media (max-width: 1200px) {
  .container {
    display: block;
    width: 100%;
    margin: 5rem auto;
    border-radius: 0;
  }
}

.title {
  color: var(--text-color);
  font-size: 1.5rem;
  text-align: center;
  margin: 3rem 0;
  font-weight: bold;
}

.info-box > h2 {
  font-size: 1.2rem;
  text-align: center;
  padding: .5rem;
  border-radius: 2rem;
  font-weight: bold;
  color: var(--text-color);
}

.log-in-form {
  margin: 5rem auto;
}

.log-in-form > h2 {
  font-size: 1.5rem;
  text-align: center;
  margin: 1rem 0;
}

.login-form {
  display: block;
  width: 50%;
  margin: 2rem auto;
}

.info {
  box-sizing: border-box;
  display: block;
  margin-bottom: 1rem;
}

.social-icons {
  margin: 2rem 5rem;
}

.social-icons ul {
  display: flex;
  justify-content: space-between;
  gap: 0 10px;
  margin: 20px 0;
}

.social-icons ul li {
  width: 3rem;
  height: 3rem;
  text-align: center;
  font-size: 1.5rem;
  padding: 5px;
  border: 2px solid var(--text-color);
  border-radius: 50%;
  color: var(--text-color);
}

.social-icons ul li:hover {
  transition: 0.4s;
  color: var(--text-hovor-color);
  border: 2px solid var(--text-hovor-color);
}

@media (max-width: 1200px) {
  .links ul li span {
    display: none;
  }

  .others-links-section ul li span {
    display: none;
  }
}

.login-form .question-title {
  font-size: 1rem;
  color: var(--text-color);
}

.login-form input,
.login-form select {
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