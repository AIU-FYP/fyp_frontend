<template>
  <div class="settings-page">
    <div class="container">
      <aside class="sidebar">
        <h1>Account Settings</h1>
        <nav>
          <ul class="menu">
            <li>
              <UIcon name="mdi-password" class="icon" />
              <router-link to="change-admin-password">Change Password</router-link>
            </li>
            <li>
              <UIcon name="subway-admin-1" class="icon" />
              <router-link to="new-admin">Add New Admin</router-link>
            </li>
            <li>
              <UIcon name="grommet-icons-user-admin" class="icon" />
              <router-link to="admin-dashboard">Admin dashboard</router-link>
            </li>
            <li>
              <UIcon name="eos-icons-admin" class="icon" />
              <router-link to="admin">Admin</router-link>
            </li>
            <li>
              <UIcon name="uiw-logout" class="icon" />
              <router-link to="login">Log Out</router-link>
            </li>
          </ul>
        </nav>
      </aside>
      <main class="content">
        <h2>Add new admin</h2>
        <form @submit.prevent="handleSubmit">
          <div v-for="(question, index) in previousQuestions" :key="index" class="form-group">
            <div class="form-control">
              <label :for="question.label">{{ question.label }}</label>
              <input
                  :id="question.label"
                  :type="question.type"
                  :placeholder="question.placeholder"
                  v-model="form[question.label]"
              />
              <span v-if="errors[question.label]" class="error">{{ errors[question.label] }}</span>
            </div>
          </div>
          <button type="submit" class="submit-btn">Save Changes</button>
        </form>
      </main>
    </div>
  </div>
</template>

<script setup>
import {reactive, watch} from 'vue';
import {z} from 'zod';

const previousQuestions = [
  {
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    required: true
  },
  {
    label: "Position",
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
    label: "Phone Number",
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
  "Name":
      z.string().min(4, "Name must be at least 4 characters long")
          .nonempty("Name is required"),
  "Position":
      z.string().min(5, "It must be at least 5 characters long")
          .nonempty("Name is required"),
  "Staff ID":
      z.string()
          .regex(/^AIU\d{8}$/, "Invalid Staff ID format")
          .nonempty("Staff ID is required"),
  "Phone Number":
      z.string().regex(/^\d{8,15}$/, "Invalid phone number")
          .nonempty("Phone Number is required"),
  "Email Address (Staff Email Only)":
      z.string()
          .email("Invalid email format")
          .regex(/@aiu\.edu\.my$/, "Must be a Staff email ending with '@aiu.edu.my'"),
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

<style scoped>
.settings-page {
  display: flex;
  padding: 20px;
}

.container {
  display: flex;
  gap: 20px;
  width: 100%;
  margin: 0 auto;
}

.sidebar {
  flex: 1;
  background-color: var(--main-color);
  padding: 20px;
  color: var(--text-color);
  border-radius: 1rem;
}

.sidebar h1 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.menu {
  list-style: none;
  padding: 0;
}

.menu li {
  display: flex;
  align-items: center;
  padding: .5rem;
  margin-bottom: 15px;
  font-size: 1rem;
  cursor: pointer;
  background-color: transparent;
}

.menu li:hover {
  background-color: var(--main-hovor-color);
  transition: .3s ease-in-out;
}

.menu li .icon {
  margin-right: 10px;
}

.menu li a {
  text-decoration: none;
}

.content {
  flex: 3;
  background-color: #ecf0f1;
  padding: 20px;
  border-radius: 1rem;
}

.content h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--main-hovor-color);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 2px solid var(--text-color);
  border-radius: 5px;
  outline: none;
}

.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
}

.submit-btn {
  padding: 10px 20px;
  background-color: var(--main-hovor-color);
  color: var(--text-color);
  border: none;
  border-radius: .5rem;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: var(--main-color);
  color: var(--text-hovor-color);
  transition: .3s ease-in-out;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .sidebar {
    margin-bottom: 20px;
  }
}
</style>
