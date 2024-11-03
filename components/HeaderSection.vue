<template>
  <div class="header-section">
    <div class="container">

      <div class="image-logo">
        <img src="/images/AIU-Official-Logo.png" alt="aiu-logo"/>
      </div>

      <div class="title">
        <h2>Smart AIU Management System</h2>
      </div>

      <div class="bar-icon" @click="toggleNav">
        ☰
      </div>
      <div class="menu">
        <div class="menu-links">
          <a href="#"><span class="icon"><UIcon class="bar-icon-links" name="material-symbols-contact-page"/></span>Home</a>
          <a href="#"><span class="icon"><UIcon class="bar-icon-links" name="la-university"/></span>About</a>
          <div class="dropdown" @click="toggleDropdown('student')">
            <span class="dropbtn">
              <UIcon name="ph-student-light"/>
              Student
            </span>
            <div class="dropdown-content">
              <a href="#">Maintenance Room</a>
              <a href="#">Requested to Change Room</a>
            </div>
          </div>
          <div class="dropdown" @click="toggleDropdown('learnMore')">
            <span class="dropbtn">
              <UIcon class="bar-icon-links" name="ph-student-light"/>
              Learn More
            </span>
            <div class="dropdown-content">
              <a href="#">Hostel Leave</a>
              <a href="#">Policy</a>
              <a href="#">Contact</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

// const isNavVisible = ref(false);
// const activeDropdown = ref(null);

// const toggleNav = () => {
//   isNavVisible.value = !isNavVisible.value;
// };

// const toggleDropdown = (dropdown) => {
//   activeDropdown.value = activeDropdown.value === dropdown ? null : dropdown;
// };
</script>

<style scoped>
.header-section {
  background-color: #eeeeee;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 1rem;
}

.container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
}

.image-logo img {
  width: 70px !important;
  height: 50px !important;
}


.title h2 {
  font-size: 1.5rem;
  font-weight: normal;
  text-transform: uppercase;
  text-align: center;
  color: var(--main-color);
}

.bar-icon {
  display: none;
  cursor: pointer;
  font-size: 2rem;
  color: var(--main-color);
}

.menu-links {
  display: inline-flex;
  justify-content: space-between;
  list-style: none;
}

.bar-icon-links {
  display: flex;
  justify-content: center;
  margin: .2rem;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.menu-links a,
.dropbtn {
  color: var(--main-color);
  padding: 10px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #eeeeee;
  margin-left: -3rem;
  margin-top: 0.2rem;
  min-width: 160px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: var(--main-color);
  margin: .5rem;
  font-size: 1rem;
  text-decoration: none;
  display: block;
}

@media (max-width: 1200px) {
  .dropdown-content {
    margin: 0 0 0 1.5rem;
    padding: 0;
    min-width: 100%;
    color: var(--main-color);
  }

  .dropdown-content a {
    color: var(--main-color);
    margin: 0;
  }
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #3e8e41;
  color: white;
}

@media (max-width: 1200px) {

  .container {
    display: block;
  }

  .image-logo {
    display: block;
  }

  .title h2 {
    display: none;
    font-size: 1rem;
    margin: 1rem 3.5rem;
  }

  .bar-icon {
    display: block;
  }

  .menu {
    display: block;
  }

  .menu-links,
  .menu-links div {
    display: block;
  }

  .dropdown-content {
    width: 100%;
    position: relative;
    box-shadow: none;
  }
}
</style>