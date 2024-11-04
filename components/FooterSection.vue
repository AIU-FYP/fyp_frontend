<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <div class="footer">
    <div class="container">
      <div class="info-container">
        <div class="box">
          <span class="icon"><UIcon name="mdi-location"/></span>
          <p class="info"><a
              href="https://www.google.com/maps/place/Albukhary+International+University+(AIU)/@6.1336498,100.3863971,15z/data=!4m6!3m5!1s0x304b5ac489a998b9:0x3fa53e13f07fbb01!8m2!3d6.1336498!4d100.3863971!16s%2Fg%2F1216lnq4?entry=ttu&g_ep=EgoyMDI0MTAwOS4wIKXMDSoASAFQAw%3D%3D">Jalan
            Tun Abdul Razak,
            05200, Alor Setar,
            Kedah Darul Aman, Malaysia.</a></p>
        </div>
        <div class="box">
          <span class="icon"><UIcon name="ic-baseline-email"/></span>
          <p class="info"><a href="tel:+604774 7300">(60) 4774 7300</a></p>
        </div>
        <div class="box">
          <span class="icon"><UIcon name="ic-baseline-email"/></span>
          <p class="info"><a href="mailto:info@aiu.edu.my">info@aiu.edu.my</a></p>
        </div>
        <div class="box">
          <span class="icon"><UIcon name="mdi-university"/></span>
          <p class="info"><a href="https://aiu.edu.my/">Al Bukhary International University </a></p>
        </div>
      </div>
      <hr class="divider">
      <div class="links-container">
        <div class="links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="http://">
              <span>
                <UIcon name="material-symbols-contact-page"
                />
              </span>
              Home
            </a></li>
            <li><a href="http://">
              <span>
                <UIcon name="la-university"
                />
              </span>
              About</a></li>
            <li><a href="http://">
              <span>
                <UIcon name="ph-student-bold"
                />
              </span>
              Students</a></li>
            <li><a href="http://">
              <span>
                <UIcon name="pepicons-pop-info-circle"
                />
              </span>
              Learn more </a></li>
          </ul>
        </div>
        <div class="others-links-section">
          <h2>Others</h2>
          <ul>
            <li>
              <a href="http://aiustudenthostelleavesystem.net">
              <span><UIcon name="la-university"/>
              </span>
                Hostel leave</a></li>

            <li>
              <router-link to="/faq">
              <span><UIcon name="material-symbols-policy-outline"/>
              </span>
                Policy
              </router-link></li>
          </ul>
        </div>
        <div class="subscribe-section">
          <h1 class="subscribe-title">Subscribe</h1>
          <div class="container-form">
            <div class="subscribe-input">
              <input type="email" placeholder="Enter your email"/>
            </div>
            <div class="subscribe-button">
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <hr class="divider">
      <div class="socials-section">
        <div class="socials-container">
          <div></div>
          <div class="social-icons">
            <ul>
              <li>
                <a href="https://www.facebook.com/AIUedu/" target="_blank" rel="noopener">
                  <UIcon name="ic-baseline-facebook"/>
                </a>
              </li>
              <li>
                <a href="https://x.com/aiu_edu?mx=2" target="_blank" rel="noopener">
                  <UIcon name="mdi-twitter"/>
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/channel/UCsQmePdrH9GHXEf-afj_Tng" target="_blank" rel="noopener">
                  <UIcon name="mdi-youtube"/>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/aiuedu/" target="_blank" rel="noopener">
                  <UIcon name="mdi-instagram"/>
                </a>
              </li>
            </ul>
          </div>
          <div></div>
        </div>
        <div class="footer-bottom">
          <p>&copy; Copyright <a href="https://aiu.edu.my/">Albukhary International University {{ currentYear }}</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.footer {
  padding: 1em 0;
  background-color: #f5f5f5;
}

.container {
  display: block;
  padding: 0 100px;
}

@media (max-width: 800px) {
  .container {
    padding: 0;
  }
}

.info-container,
.links-container {
  display: flex;
  flex-direction: row;
}

.info-container div {
  flex: 25%;
}

.info-container div,
.links-container div {
  flex: 30%;
}

@media (max-width: 800px) {
  .info-container {
    display: block;
  }

  .links-container {
    display: block;
  }
}

.box {
  display: block;
  text-align: center;
  margin: 20px;
}

.box span {
  font-size: 3rem;
  color: var(--main-color);
}

.divider {
  margin: 1rem 0;
  border: 1px solid var(--main-color);
}

.links,
.others-links-section {
  margin: 0 5rem;
}

.links h2,
.subscribe-section h2,
.others-links-section h2 {
  color: var(--main-color);
  font-size: 1.5rem;
  margin: 15px 0;
}

.links ul li,
.others-links-section ul li {
  list-style: none;
  font-size: 1.2rem;
}

.links ul li a span,
.others-links-section li a span {
  color: var(--main-color);
  margin-right: .5rem;
}

.subscribe-section {
  text-align: start;
  padding: 2rem;
}

.container-form {
  display: flex;
  justify-content: space-around;
  gap: 20px;
}

@media (max-width: 800px) {
  .container-form {
    display: block;
    margin: 0 auto;
  }

  .container-form div {
    margin: 3rem 0;
  }
}

.subscribe-title {
  color: var(--main-color);
  margin-bottom: 40px;
  font-size: 1.5rem;
}

.subscribe-input input {
  padding: .5rem;
  font-size: 1rem;
  width: 12rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.subscribe-button button {
  padding: .5rem;
  font-size: 1rem;
  background-color: var(--main-color);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.subscribe-button button:hover {
  background-color: var(--text-hovor-color);
}

.socials-container {
  display: flex;
  justify-content: space-between;
}

.social-icons ul {
  display: flex;
  justify-content: space-between;
  gap: 0 10px;
  margin: 20px 0;
}

.social-icons ul li {
  width: 3rem;
  height: 3rem;
  text-align: center;
  font-size: 1.5rem;
  padding: 5px;
  border: 2px solid var(--main-color);
  border-radius: 50%;
  color: var(--main-color);
}

.social-icons ul li:hover {
  transition: 0.4s;
  color: var(--text-hovor-color);
  border: 2px solid var(--text-hovor-color);
}

@media (max-width: 1200px) {
  .links ul li span {
    display: none;
  }

  .others-links-section ul li span {
    display: none;
  }
}

.footer-bottom {
  text-align: start;
  font-size: 1.2rem;
  color: var(--text-color);
  padding: 2rem 0;
}

.footer-bottom a {
  color: var(--main-color);
}

a:hover {
  color: var(--text-hovor-color);
}


</style>