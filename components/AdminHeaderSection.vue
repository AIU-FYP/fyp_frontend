<script setup lang="ts">

const auth = useAuth();

const handleLogout = () => {
  auth.logout();
   navigateTo('/login');
};
</script>

<template>
  <div class="header-admin-section">
    <div class="container">
      <div class="container-box">

        <div class="image-logo">
          <a href="https://aiu.edu.my/">
            <img src="/images/AIU-Official-Logo.png" alt="image-logo">
          </a>
        </div>

        <div class="title">
          <h1>Admin Dashboard</h1>
        </div>

        <div class="bar-btn">
          <a class="nav-item">
            <router-link to="/setting">
            <span class="icon">
              <UIcon
                  name="uil-setting"
              />
            </span>
              Setting
            </router-link>
          </a>
          <a class="nav-item" @click="handleLogout">
            <span class="icon">
              <UIcon
                  name="material-symbols-logout-sharp"
              />
            </span>
              Log Out
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-admin-section {
  background-color: var(--main-color);
}

.container {
  max-width: 1300px;
  align-items: center;
  margin: 0 auto;
}

.container-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  padding: .5rem;
}

.container-box .image-logo img {
  width: 60px;
  height: 50px;
}

.title {
  font-size: 1.5rem;
  color: var(--text-color);
}

.bar-btn {
  position: relative;
}

.bar-btn a {
  font-size: 1rem;
  color: var(--text-hovor-color);
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  align-items: center;

}

.icon {
  margin-right: 0.5rem;
  align-items: center;
  text-align: center;
}

.bar-btn a:hover {
  background-color: var(--main-hovor-color);
  transition: .3s ease-in-out;
}

.nav-item {
  position: relative;
}

@media (max-width: 1200px) {
  .container {
    display: block;
  }

  .title {
    display: none;
  }

  .bar-btn {
    margin: 0;
    border-radius: 0.5rem;
    background-color: var(--main-color);
    color: var(--text-hovor-color);
  }


  .sublist a {
    display: block;
    padding: .3rem .5rem;
    white-space: nowrap;
  }

  .sublist a:hover {
    background-color: var(--main-hovor-color);
  }



  .container-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .5rem;
  }

  .header-container .image-logo img {
    width: 60px;
    height: 50px;
  }

  .title {
    font-size: 1.5rem;
    color: var(--text-color);
  }

  .bar-btn {
    position: relative;
  }

  .bar-btn button {
    font-size: 1.2rem;
    color: var(--text-hovor-color);
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
  }

  .bar-btn button:hover {
    background-color: var(--main-hovor-color);
    transition: .3s ease-in-out;
  }

  .nav-item {
    position: relative;
  }

}
</style>
