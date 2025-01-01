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
        <h2>Admin Dashboard</h2>
        <AdminsDashboard/>
      </main>

    </div>
  </div>
</template>

<script setup>

definePageMeta({
  middleware: 'auth',
})

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
  border-radius: 10px;
}

.content h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--main-hovor-color);
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
