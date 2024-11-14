<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Popup from "~/components/PopupChangePassword.vue";
import PopupNewAdmin from "~/components/PopupNewAdmin.vue";

import {defineEmits, defineProps} from 'vue'
const props = defineProps({
  show: Boolean
})
const emit = defineEmits(['update:show'])



import {reactive,} from 'vue';
import {z} from 'zod';


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


function handleSubmit() {
  const validationResults = formSchema.safeParse(form);
  if (validationResults.success) {
    console.log("Form Data:", {...form});
    alert("Password changed successfully!");
  } else {
    alert("Please correct the errors in the form.");
  }
}

const isLinksVisible = ref(false);
const isPopupChangePasswordVisible = ref(false);
const isPopupNewAdminVisible = ref(false);
const isMobile = ref(false);

function toggleLinksVisibility() {
  isLinksVisible.value = !isLinksVisible.value;
  console.log("Links visibility toggled:", isLinksVisible.value);
}

onMounted(() => {
  isMobile.value = window.innerWidth <= 1200;
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth <= 1200;
  });
});

const auth = useAuth();

const handleLogout = () => {
  auth.logout();
  navigateTo('/login');
};

</script>

<template>
  <div class="header-admin-section">
    <div class="header-container">

      <div class="container-box">
        <div class="image-logo">
          <a href="https://aiu.edu.my/">
            <img src="/images/AIU-Official-Logo.png" alt="image-logo">
          </a>
        </div>
        <div class="bar-btn">
          <button @click="toggleLinksVisibility" v-if="isMobile">
            Setting
          </button>
        </div>
      </div>

      <div class="title">
        <h1>Admin Dashboard</h1>
      </div>
      <div class="menu-container">
        <ul class="submenu" v-if="isLinksVisible || !isMobile">
          <li>
            <a @click="isPopupNewAdminVisible = true">Add New Admin</a>
            <PopupNewAdmin :show="isPopupNewAdminVisible" @update:show="isPopupNewAdminVisible = $event" />
          </li>
          <li>
            <a style="cursor: pointer" @click="isPopupChangePasswordVisible = true">Change Password</a>
            <Popup :show="isPopupChangePasswordVisible" @update:show="isPopupChangePasswordVisible = $event" />
          </li>
          <li>
            <a @click="handleLogout">
              <router-link to="/">Log Out</router-link>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<style scoped>
.header-admin-section {
  background-color: var(--main-color);
  margin: auto;
  border-bottom: .2rem solid var(--text-color);
}

.container-box .bar-btn {
  display: none;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: .5rem;
}

.header-container .image-logo {
  margin: 0;
}

.header-container .image-logo img {
  width: 60px;
  height: 50px;
}

.title {
  font-size: 1.5rem;
  color: var(--text-color);
}

.submenu {
  display: flex;
}

.submenu li a {
  margin-left: 1rem;
  font-size: 1rem;
  color: var(--text-color);
  padding: .5rem ;
  background-color: transparent;
  text-align: start;
}

.submenu li a:hover {
  background-color: var(--main-hovor-color);
}

.submenu li a:hover {
  color: var(--text-hovor-color);
}


@media (max-width: 1200px) {
  .header-container {
    display: block;
  }

  .title {
    display: none;
  }

  .container-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .container-box .bar-btn {
    display: flex;
    font-size: 1.2rem;
    padding: .5rem;
    border-radius: .5rem;
    background-color: var(--main-color);
    color: var(--text-hovor-color);
  }

  .submenu {
    display: block;
    text-align: start;
  }

  .submenu li {
    color: var(--main-color);
    margin: .5rem 0;
    padding-bottom: .2rem;
  }

  .submenu li a {
    color: var(--text-color);
  }
}

</style>