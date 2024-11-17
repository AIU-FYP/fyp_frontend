

<template>

  <div class="setting-sec">
    <div class="container">
      <section class="side-bar">
        <h1>Account Setting</h1>
        <button>
          <span>
            <UIcon
                name="uiw-setting-o"
                class="icon"
            />
          </span>
          Setting
        </button>
        <div class="setting-menu">
          <ul class="links-menu">
            <li>
              <span class="icon">
                <UIcon
                    name="clarity-administrator-line"
                />
              </span>
              <router-link to=""> Admin Profile</router-link>
            </li>
            <li>
              <span class="icon">
                <UIcon
                    name="mdi-password"
                />
              </span>
              <router-link to="">Change Password</router-link>
            </li>
            <li>
              <span class="icon">
                <UIcon
                    name="subway-admin-1"
                />
              </span>
              <router-link to="">Add New Admin</router-link>
            </li>
            <li>
              <span class="icon">
                <UIcon
                    name="grommet-icons-user-admin"
                />
              </span>
              <router-link to="">See Admins</router-link>
            </li>
            <li>
              <span class="icon">
                <UIcon
                    name="eos-icons-admin"
                />
              </span>
              <router-link to="">Admin</router-link>
            </li>
            <li>
              <span class="icon">
                <UIcon
                    name="uiw-logout"
                />
              </span>
              <router-link to="">Log out</router-link>
            </li>
          </ul>
        </div>
      </section>
      <section class="content-container">
        we
      </section>
    </div>
  </div>

  <div class="settings-page container mx-auto px-4 py-6">

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Profile Settings</h2>
      <form @submit.prevent="saveProfile">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium">Name</label>
          <input
              v-model="profile.name"
              id="name"
              type="text"
              class="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium">Email</label>
          <input
              v-model="profile.email"
              id="email"
              type="email"
              class="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Profile
        </button>
      </form>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Account Preferences</h2>
      <div class="flex items-center mb-4">
        <label class="mr-2">Dark Mode</label>
        <input type="checkbox" v-model="preferences.darkMode"/>
      </div>
      <button
          @click="savePreferences"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Preferences
      </button>
    </section>

  </div>
</template>

<script setup>
import {ref} from 'vue'

// Reactive states
const profile = ref({
  name: '',
  email: ''
})

const preferences = ref({
  darkMode: false
})

const notifications = ref({
  email: true,
  sms: false
})

const saveProfile = () => {
  console.log('Profile saved:', profile.value)
  alert('Profile saved successfully!')
}

const savePreferences = () => {
  console.log('Preferences saved:', preferences.value)
  alert('Preferences saved successfully!')
}

const saveNotifications = () => {
  console.log('Notifications saved:', notifications.value)
  alert('Notifications saved successfully!')
}
</script>

<style>

.setting-sec {

}

.setting-sec .container {
  max-width: 1300px;
  display: flex;
  margin: 0 auto;
}

.side-bar {
  flex: 1;
  background-color: var(--main-color);
}

.content-container {
  flex: 5;
  background-color: var(--main-hovor-color);
}

.side-bar h1{
  font-size: 1.5rem;
  text-align: center;
  margin: 1rem;
  color: var(--text-hovor-color);
}

.side-bar ul{
  display: block;
}

.side-bar > button{
  font-size: 1.2rem;
  color: var(--text-hovor-color);
  padding: .2rem .5rem;
  margin: 0 1rem .5rem 1rem ;
  cursor: pointer;
  background-color: transparent;
}

.side-bar > button:hover{
  background-color: var(--main-hovor-color);
  color: var(--text-hovor-color);
  transition: .3s ease-in-out;
}

.side-bar ul li{
  font-size: 1rem;
  padding: .2rem .5rem;
  margin: 0 1rem .5rem 1rem ;
  cursor: pointer;
  background-color: transparent;
  color: var(--text-color);
}

.side-bar ul li:hover{
  background-color: var(--main-hovor-color);
  color: var(--text-hovor-color);
  transition: .3s ease-in-out;
}

.side-bar .icon{
  margin-right: 1rem;
}

</style>
