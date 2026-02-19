<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Logo & Branding -->
      <div class="footer-brand">
        <!-- <img src="@/assets/bmi.jpg" alt="BMI Logo" class="footer-logo" /> -->
        <router-link to="/"><img src="@/assets/BMI-img.png" alt="BMI Logo" class="footer-logo"/></router-link>
        <p>Track your BMI & stay fit! Health is wealth. 💪</p>
      </div>

      <!-- Quick Links -->
      <div class="footer-links">
        <h3>Quick Links</h3>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/bmi">BMI Calculator</router-link></li>
          <li><router-link to="/about">About Us</router-link></li>
        </ul>
      </div>

      <!-- Social Media -->
      <div class="footer-social">
        <h3>Follow Us</h3>
        <div class="social-icons">
          <a href="#" class="icon"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="icon"><i class="fab fa-twitter"></i></a>
          <a href="#" class="icon"><i class="fab fa-instagram"></i></a>
          <a href="#" class="icon"><i class="fab fa-linkedin-in"></i></a>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div class="footer-bottom">
      <p>&copy; {{ new Date().getFullYear() }} BMI App. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script setup>
// No logic required, just a responsive UI
</script>

<style scoped>
/* 🌟 Footer Container */
.footer {
  background: linear-gradient(135deg, #494e56, #727a85);

  /* background: linear-gradient(135deg, #1e3c72, #2a5298); */
  color: white;
  padding: 40px 20px;
  text-align: center;
}

.footer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  max-width: 1200px;
  margin: auto;
}

/* 🔹 Footer Branding */
.footer-brand {
  flex: 1;
  text-align: left;
}

.footer-logo {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-bottom: 10px;
}

/* 🔹 Quick Links */
.footer-links {
  flex: 1;
}

.footer-links h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.footer-links ul {
  list-style: none;
  padding: 0;
}

.footer-links ul li {
  margin-bottom: 8px;
}

.footer-links ul li a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  transition: 0.3s;
}

.footer-links ul li a:hover {
  text-decoration: underline;
  color: #ffcc00;
}

/* 🔹 Social Media Icons */
.footer-social {
  flex: 1;
}

.footer-social h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.social-icons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.icon {
  color: white;
  font-size: 1.5rem;
  transition: 0.3s;
}

.icon:hover {
  color: #ffcc00;
  transform: scale(1.2);
}

/* 🔹 Footer Bottom */
.footer-bottom {
  margin-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 10px;
  font-size: 0.9rem;
}

/* 🌟 Responsive Design */
@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    text-align: center;
  }

  .footer-brand,
  .footer-links,
  .footer-social {
    text-align: center;
  }
}
</style>
