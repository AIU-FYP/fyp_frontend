<script setup>
const members = [
  {
    name: "Nidhoil Mohamed Ibrahim",
    position: "DIRECTOR OF STUDENT AFFAIRS",
    photoURL: "/images/Nidhoil-200x200.jpg",
    alt: "Nidhoil Mohamed Ibrahim"
  },
  {
    name: "Nurul Huda Bt Hassan Bakri",
    position: "Deputy Director of Student Affairs",
    photoURL: "/images/Nurul-Huda-Hassan-01-200x200.jpg",
    alt: "Nurul Huda Bt Hassan Bakri"
  },
  {
    name: "Fazlia Binti Azhari",
    position: "Counsellor",
    photoURL: "/images/fazlia-200x200.jpg",
    alt: "Fazlia Binti Azhari"
  },
  {
    name: "Mohammad Hafis Shafiq Bin Mohammad Sopian",
    position: "Counsellor",
    photoURL: "/images/hafis-shafiq-200x200.png",
    alt: "Mohammad Hafis Shafiq Bin Mohammad Sopian"
  },
  {
    name: "Ahmad Muaz Azizan",
    position: "Executive cum Warden",
    photoURL: "/images/Muaz-240x300-1-200x200.png",
    alt: "Ahmad Muaz Azizan"
  },
  {
    name: "Nurul Elina Afiqah Binti Badrulhisham",
    position: "Executive cum Warden",
    photoURL: "/images/Elina-200x200.jpg",
    alt: "Nurul Elina Afiqah Binti Badrulhisham"
  },
  {
    name: "Hazween Eyzwann Bin Sharif",
    position: "Executive cum Warden",
    photoURL: "/images/Hazween-200x200.jpg",
    alt: "Hazween Eyzwann Bin Sharif"
  },
  {
    name: "Nurul Izzati Binti Ramli",
    position: "Executive cum Warden",
    photoURL: "/images/izzati-200x200.jpg",
    alt: "Nurul Izzati Binti Ramli"
  },
  {
    name: "Ainun Nadiah Binti Samsudin",
    position: "Executive (Career & Alumni)",
    photoURL: "/images/ainun-200x200.jpg",
    alt: "Ainun Nadiah Binti Samsudin"
  },
  {
    name: "Muhammad Zhafran Bin Jasmi",
    position: "Sport Officer",
    photoURL: "/images/zhafran.jasmi@aiu.edu_.my_-200x200.jpg",
    alt: "Muhammad Zhafran Bin Jasmi"
  },
  {
    name: "Mohamad Nor Hisyam Bin Musa",
    position: "Warden",
    photoURL: "/images/Hisyam-Musa-1-200x200.jpg",
    alt: "Mohamad Nor Hisyam Bin Musa"
  },
  {
    name: "Farah Nadiah Binti Abdul Kudus",
    position: "Warden",
    photoURL: "/images/Fatin-Nadiah.jpg",
    alt: "Farah Nadiah Binti Abdul Kudus"
  },
  {
    name: "Nadia Affiqa Abdul Nasir",
    position: "Warden",
    photoURL: "/images/nadia-200x200.jpg",
    alt: "Nadia Affiqa Abdul Nasir"
  },

];

</script>


<template>
  <div class="team">
    <div class="team-container">
      <h2>Members of Staff</h2>
      <hr class="divider">
      <div class="team-content">
        <div class="team-member" v-for="member in members" :key="member.photoURL">
          <img :src="member.photoURL" :alt="member.alt">
          <div class="info">
            <h3>{{ member.name }}</h3>
            <h5>{{ member.position }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.team-container {
  padding: 5rem;
}

@media (max-width: 800px) {
  .team-container{
    padding: 0 1rem;
  }
}

.team h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-color);
  padding: 0 2rem;
}

.divider{
  margin: 1rem auto;
  border: 2px solid var(--main-color);
  width: 100%;
}

.team-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.team-member {
  flex: 1 1 20%;
  box-sizing: border-box;
  padding: 1.5em 0;
  text-align: center;
  max-width: 20%;
  text-align: center;
}

@media (max-width: 800px){
  .team-content{
    display: block;
  }
  .team-member{
    flex-direction: column;
    width: 100%;
    text-align: center;
    max-width: 100%;
  }
}

.team-member img {
  margin: 10px auto !important;
  width: 200px;
  height: 200px;
  align-items: center;
  border-radius: 50%;
}

.team-member h3 {
  font-size: 1rem;
  padding: .5rem 0;
  color: var(--main-color);
}

.team-member h5 {
  font-size: 1rem;
  color: var(--text-color);
}

@media (max-width: 800px) {
  .team-member {
    display: block;
    margin-bottom: 1rem;
  }
  .team-member img {
    margin: 0;
  }
}




</style>