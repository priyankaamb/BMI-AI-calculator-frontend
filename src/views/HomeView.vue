<template>
<div class="home">
    <section class="hero">
        <div class="hero-content">
            <h1>Welcome to the BMI Calculator</h1>
            <p>Calculate your Body Mass Index (BMI) easily.</p>
            <router-link to="/bmi" class="btn">Get Started</router-link>
            <div>
              <ChatBot />
            </div>
        </div>
    </section>
</div>
</template>

<script setup>
import ChatBot from "@/components/ChatBot.vue";
</script>

<style scoped>
.home {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.hero {
    width: 100%;
    height: 75vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #0288d1, #183340);
    color: white;
    text-align: center;
}

.hero-content {
    max-width: 600px;
}

.hero h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.hero p {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
}

.btn {
    display: inline-block;
    background: white;
    color: #42a5f5;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1rem;
    text-decoration: none;
    transition: 0.3s;
}

.btn:hover {
    background: #ffffffcc;
}

</style>
