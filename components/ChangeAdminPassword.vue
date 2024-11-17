<template>
  <div class="settings-page">
    <div class="container">
      <aside class="sidebar">
        <h1>Account Settings</h1>
        <nav>
          <ul class="menu">
            <li>
              <UIcon name="clarity-administrator-line" class="icon" />
              <router-link to="setting">Admin Profile</router-link>
            </li>
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
        <h2>Change Password</h2>
        <form @submit.prevent="handleSubmit">
          <div v-for="(field, index) in fields" :key="index" class="form-group">
            <label :for="field.label">{{ field.label }}</label>
            <input
                :id="field.label"
                :type="field.type"
                :placeholder="field.placeholder"
                v-model="form[field.label]"
            />
            <span v-if="errors[field.label]" class="error">{{ errors[field.label] }}</span>
          </div>
          <button type="submit" class="submit-btn">Save Changes</button>
        </form>
      </main>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";
import { z } from "zod";

const fields = [
  { label: "Current Password", type: "password", placeholder: "Enter Current Password" },
  { label: "New Password", type: "password", placeholder: "Enter New Password" },
  { label: "Confirm New Password", type: "password", placeholder: "Confirm New Password" },
];

const schema = z.object({
  "Current Password": z
      .string()
      .min(12, "Must be at least 12 characters")
      .regex(/[a-zA-Z]/, "Must include at least one letter")
      .regex(/\d/, "Must include at least one number")
      .regex(/[@$!%*?&]/, "Must include at least one special character (@$!%*?&)"),
  "New Password": z
      .string()
      .min(12, "Must be at least 12 characters")
      .regex(/[a-zA-Z]/, "Must include at least one letter")
      .regex(/\d/, "Must include at least one number")
      .regex(/[@$!%*?&]/, "Must include at least one special character (@$!%*?&)"),
  "Confirm New Password": z
      .string()
      .refine(value => value === form["New Password"], "Passwords must match"),
});

const form = reactive({});
const errors = reactive({});

fields.forEach((field) => {
  form[field.label] = "";
  errors[field.label] = "";
});

function validateField(field) {
  try {
    schema.shape[field].parse(form[field]);
    errors[field] = "";
  } catch (e) {
    errors[field] = e.errors?.[0]?.message || "Invalid input";
  }
}

fields.forEach((field) => {
  watch(() => form[field.label], () => validateField(field.label));
});

function handleSubmit() {
  const result = schema.safeParse(form);
  if (result.success) {
    alert("Password changed successfully!");
  } else {
    alert("Please fix the errors before submitting.");
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
  border-radius: 10px;
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
  border-radius: 10px;
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
