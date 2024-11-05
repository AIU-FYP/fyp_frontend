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

.log-in {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(var(--main-color), var(--text-hovor-color));
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 85%;
}

.container .image-box {
  flex: 65%;
}

.container .log-in-form {
  flex: 30%;
  padding: 2rem .5rem;
  margin-top: 2rem;
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
  margin: -5rem auto 1rem;
  text-align: center;
  font-size: 5rem;
  background-color: var(--bg-color);
  color: var(--main-color);
  border: .3rem solid var(--main-color);
  border-radius: 50%;
}

.info-box > h2 {
  font-size: 1.2rem;
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

.login-form input {
  width: 100%;
  padding: 0.5rem;
  margin: .5rem 0;
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
