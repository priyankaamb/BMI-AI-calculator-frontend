<template>
  <div class="about">
    <section class="about-hero">
      <div class="about-content">
        <h1>About BMI</h1>
        <p>Learn more about Body Mass Index (BMI) and why it matters for your health.</p>
      </div>
    </section>

    <section class="about-section">
      <div class="container">
        <div class="card">
          <h2>What is BMI?</h2>
          <p>
            Body Mass Index (BMI) is a simple calculation based on a person's height and weight. It
            helps determine whether someone is underweight, at a healthy weight, overweight, or
            obese.
          </p>
        </div>
      </div>
    </section>

    <section class="about-section bmi-categories">
      <div class="container">
        <h2>BMI Categories</h2>
        <div class="category-grid">
          <div class="category-card underweight">
            <h3>Underweight</h3>
            <p>BMI &lt; 18.5</p>
          </div>
          <div class="category-card normal">
            <h3>Normal</h3>
            <p>BMI 18.5 - 24.9</p>
          </div>
          <div class="category-card overweight">
            <h3>Overweight</h3>
            <p>BMI 25 - 29.9</p>
          </div>
          <div class="category-card obesity">
            <h3>Obesity</h3>
            <p>BMI ≥ 30</p>
          </div>
        </div>
      </div>
    </section>

    <section class="about-section benefits">
      <div class="container">
        <div class="card">
          <h2>Why is BMI Important?</h2>
          <p>
            BMI is a widely used tool to assess potential health risks related to weight. It helps
            identify whether an individual is at risk for conditions such as heart disease,
            diabetes, and hypertension.
          </p>
          <ul>
            <li>Quick estimate of body fat</li>
            <li>Helps assess weight-related health risks</li>
            <li>Useful for tracking fitness goals</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="cta">
      <router-link to="/bmi" class="btn">Calculate Your BMI Now</router-link>
    </section>
    <div>
      <ChatBot />
    </div>
  </div>

</template>

<script setup>
import ChatBot from "@/components/ChatBot.vue";

</script>

<style scoped>
/* General Styling */
.about {
  text-align: center;
  font-family: Arial, sans-serif;
}

.about-hero {
  width: 100%;
  height: 60vh;
  background: linear-gradient(135deg, #0288d1, #183340);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
}

.about-content h1 {
  font-size: 2.8rem;
}

.about-content p {
  font-size: 1.2rem;
  margin-top: 10px;
}

/* About Section */
.about-section {
  padding: 50px 20px;
  background: #f9f9f9;
  text-align: center;
}

.container {
  max-width: 900px;
  margin: auto;
}

.card {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 2rem;
  margin-bottom: 15px;
}

p {
  font-size: 1.1rem;
  line-height: 1.6;
}

ul {
  text-align: left;
  list-style-type: disc;
  margin: 15px auto;
  padding-left: 20px;
}

ul li {
  font-size: 1.1rem;
  margin: 10px 0;
}

/* BMI Categories */
.bmi-categories {
  background: linear-gradient(135deg, #ff9800, #f57c00);
  color: white;
}

.category-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}

.category-card {
  width: 200px;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.category-card h3 {
  margin-bottom: 5px;
}

.underweight {
  background: #4fc3f7;
}

.normal {
  background: #66bb6a;
}

.overweight {
  background: #ffeb3b;
  color: #333;
}

.obesity {
  background: #e53935;
}

/* CTA Button */
.cta {
  text-align: center;
  margin: 40px 0;
}

.btn {
  display: inline-block;
  background: #0288d1;
  color: white;
  padding: 12px 25px;
  font-size: 1.2rem;
  border-radius: 5px;
  text-decoration: none;
  transition: 0.3s;
}

.btn:hover {
  background: #02669d;
}

/* Responsive */

/* Responsive Design */
@media (max-width: 1024px) {
  .about-hero {
    height: 50vh;
    padding: 15px;
  }

  .about-content h1 {
    font-size: 2.5rem;
  }

  .about-content p {
    font-size: 1.1rem;
  }

  .card {
    padding: 25px;
  }

  .category-card {
    width: 180px;
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .about-hero {
    height: 45vh;
    padding: 10px;
  }

  .about-content h1 {
    font-size: 2rem;
  }

  .about-content p {
    font-size: 1rem;
  }

  .about-section {
    padding: 25px 10px;
  }

  h2 {
    font-size: 1.6rem;
  }

  p {
    font-size: 1rem;
  }

  .category-grid {
    flex-direction: column;
    align-items: center; 
    gap: 15px;
  }

  .category-card {
    width: 100%;
    max-width: 300px;
    padding: 12px;
    font-size: 1rem;
  }

  .btn {
    font-size: 1rem;
    padding: 10px 20px;
  }
}

@media (max-width: 480px) {
  .about-hero {
    height: 40vh;
    padding: 8px;
  }

  .about-content h1 {
    font-size: 1.8rem;
  }

  .about-content p {
    font-size: 0.9rem;
  }

  .about-section {
    padding: 20px 8px;
  }

  h2 {
    font-size: 1.4rem;
  }

  p {
    font-size: 0.9rem;
  }

  .category-card {
    max-width: 250px;
    padding: 10px;
    font-size: 0.9rem;
  }

  .btn {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
}

</style>
