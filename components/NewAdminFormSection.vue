
<script setup>
import {reactive, watch} from 'vue';
import {z} from 'zod';

const previousQuestions = [
  {
    label: "Username",
    type: "text",
    placeholder: "Enter your username",
    required: true,
    id: "username"
  },
  {
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    required: true,
    id: "name"
  },
  {
    label: "Position",
    type: "text",
    placeholder: "Enter your position",
    required: true,
    id: "position"
  },
  {
    label: "Staff ID",
    type: "text",
    placeholder: "Enter your staff ID (e.g., AIU21011234)",
    required: true,
    id: "staff_ID"
  },
  {
    label: "Phone Number",
    type: "text",
    placeholder: "Enter your phone number",
    required: true,
    id: "phone"
  },
  {
    label: "Email Address (Staff Email Only)",
    type: "text",
    placeholder: "Enter your email address",
    required: true,
    id: "email"
  },
  {
    label: "Admin type (admin or super admin)",
    type: "select",
    options: ["Admin", "Super Admin"],
    placeholder: "Select admin type",
    required: true,
    id: "staff_type"
  },
  {
    label: "Password",
    type: "password",
    placeholder: "Enter your new password",
    required: true,
    id: "password"
  },
  {
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm your password",
    required: true,
    id: "confirm_password"
  }
];

const formSchema = z.object({
  "username": z.string().min(4, "Name must be at least 4 characters long").nonempty("Name is required"),
  "name": z.string().min(4, "Name must be at least 4 characters long").nonempty("Name is required"),
  "position": z.string().min(5, "Position must be at least 5 characters long").nonempty("Position is required"),
  "staff_ID": z.string().regex(/^AIU\d{8}$/, "Invalid Staff ID format").nonempty("Staff ID is required"),
  "phone": z.string().regex(/^\d{8,15}$/, "Invalid phone number").nonempty("Phone Number is required"),
  "email": z
      .string()
      .email("Invalid email format")
      .regex(/@aiu\.edu\.my$/, "Must be a staff email ending with '@aiu.edu.my'"),
  "staff_type": z.string().nonempty("Admin type is required"),
  "password": z
      .string()
      .min(12, "Password must be at least 12 characters long")
      .max(15, "Password must not exceed 15 characters")
      .regex(/[a-zA-Z]/, "Password must include at least one letter")
      .regex(/\d/, "Password must include at least one number")
      .regex(/[@$!%*?&]/, "Password must include at least one special character"),
  "confirm_password": z
      .string()
      .min(12, "Password must be at least 12 characters long")
      .max(15, "Password must not exceed 15 characters")
      .regex(/[a-zA-Z]/, "Password must include at least one letter")
      .regex(/\d/, "Password must include at least one number")
      .regex(/[@$!%*?&]/, "Password must include at least one special character"),
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
  watch(
      () => form[question.id],
      () => validateField(question.id)
  );
});


// function handleSubmit() {
//   form.Date = new Date().toLocaleDateString("en-GB");
//   const validationResults = formSchema.safeParse(form);
//   if (validationResults.success) {
//     console.log("Form Data:", { ...form });
//     alert("Form submitted successfully!");
//   } else {
//     alert("Please correct the errors in the form.");
//     validationResults.error.errors.forEach((err) => {
//       if (err.path) errors[err.path[0]] = err.message;
//     });
//   }
// }

async function handleSubmit() {
  const api = useApi();
  form.Date = new Date().toLocaleDateString("en-GB");

  const validationResults = formSchema.safeParse(form);
  console.log("Form data:", form);

  if (validationResults.success) {
    try {
      const payload = {
        user: {
          username: form.user.username || form.staff_ID,
          email: form.user.email,
          password: form.user.password,
        },
        position: form.position,
        staff_ID: form.staff_ID,
        phone: form.phone,
        staff_type: form.staff_type,
      };

      console.log("Sending API Request...", payload);

      const response = await api.post("/users/", payload);
      console.log("Response Data:", response.data);

      Object.keys(form).forEach((key) => {
        if (typeof form[key] === "object") {
          Object.keys(form[key]).forEach((nestedKey) => (form[key][nestedKey] = ""));
        } else {
          form[key] = "";
        }
      });

      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error occurred:", error);
      if (error.response) {
        console.error("Backend Error:", error.response.data);
        alert(`Error: ${error.response.data.detail || "Unable to submit the form."}`);
      } else if (error.request) {
        console.error("No response from the server:", error.request);
        alert("Server is not responding. Please try again later.");
      } else {
        console.error("Request Setup Error:", error.message);
        alert("An error occurred while submitting the form. Please try again.");
      }
    }
  } else {
    console.log("Validation Errors:", validationResults.error.errors);
    alert("Please correct the errors in the form.");
  }
}

</script>

<template>
  <div class="settings-page">
    <div class="container">
      <aside class="sidebar">
        <h1>Account Settings</h1>
        <nav>
          <ul class="menu">
            <li>
              <UIcon name="mdi-password" class="icon"/>
              <router-link to="change-admin-password">Change Password</router-link>
            </li>
            <li>
              <UIcon name="subway-admin-1" class="icon"/>
              <router-link to="new-admin">Add New Admin</router-link>
            </li>
            <li>
              <UIcon name="grommet-icons-user-admin" class="icon"/>
              <router-link to="admin-dashboard">Admin dashboard</router-link>
            </li>
            <li>
              <UIcon name="eos-icons-admin" class="icon"/>
              <router-link to="admin">Admin</router-link>
            </li>
            <li>
              <UIcon name="uiw-logout" class="icon"/>
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
              <label class="question-title" :for="question.label">{{ question.label }}:</label>

              <input
                  v-if="question.type === 'text' || question.type === 'password'"
                  :type="question.type"
                  v-model="form[question.id]"
                  :placeholder="question.placeholder"
                  :id="question.id"
              />

              <select
                  v-if="question.type === 'select'"
                  v-model="form[question.id]"
                  :id="question.id"
              >
                <option value="" disabled>{{ question.placeholder }}</option>
                <option v-for="option in question.options" :key="option" :value="option">{{ option }}</option>
              </select>

              <span v-if="errors[question.id]" class="error">{{ errors[question.id] }}</span>
            </div>
          </div>
          <button type="submit" class="submit-btn">Save Changes</button>
        </form>
      </main>
    </div>
  </div>
</template>

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
  min-height: 81vh;
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

.form-group input,
.form-group select{
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
