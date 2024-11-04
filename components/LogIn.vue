<script setup>
import {reactive, watch} from 'vue';
import {z} from 'zod';

const previousQuestions = [
  {
    label: "Username",
    type: "text",
    placeholder: "Enter your Username",
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
    alert("Login successfully!");
  } else {
    alert("Please correct the errors in the form.");
  }
}

</script>

<template>
  <div class="log-in">
    <div class="container">
      <div class="image-box">
      </div>
      <div class="log-in-form">
        <span class="user-icon">
          <UIcon
              name="mdi-user-outline"
          />
        </span>
        <h2 class="form-title">Smart AIU Hostels Management System</h2>
        <div class="form-container">
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
  </div>
</template>

<style scoped>
body {
  height: 100%;
}

.log-in {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(var(--main-color), var(--text-hovor-color));
}

.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 80%;
  height: 60vh;
  padding: 3rem 0;
}

.container .image-box {
  flex: 70%;
}

.container .log-in-form {
  flex: 30%;
  margin-top: -4rem;
  padding: 2rem 1rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
  background-color: var(--main-color);
}

@media (max-width: 1200px) {
  .container {
    display: block;
    width: 100%;
    margin: 5rem auto;
    border-radius: 0;
  }
}

.log-in-form .user-icon {
  display: flex;
  padding: 1rem;
  width: fit-content;
  margin: -6rem auto 1rem auto;
  text-align: center;
  font-size: 5rem;
  background-color: var(--bg-color);
  color: var(--main-color);
  border-radius: 50%;
}

.info-box > h2 {
  font-size: 1.3rem;
  text-align: center;
  padding: .5rem;
  color: var(--bg-color);
}

.log-in-form > h2 {
  font-size: 1.5rem;
  text-align: center;
  color: var(--bg-color);
}

.login-form {
  display: block;
  width: 90%;
  margin: 3rem auto;
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
  display: block;
  width: 90%;
  padding: .5rem;
  margin: 0 auto;
  background-color: var(--bg-color);
  color: var(--text-color);
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
}

.maintenance-submit:hover {
  background-color: var(--text-hovor-color);
  transition: .2s;
}

</style>
