<template>
  <div class="bmi-page">
    <div class="bmi-container">
      <h2 class="bmi-title">BMI Calculator</h2>
      <p class="bmi-subtitle">Check your Body Mass Index</p>
 
      <form class="bmi-form" @submit.prevent="calculateBMI">
        <!-- Height Input -->
        <label class="bmi-label">
          <span>Height (cm)</span>
          <div class="bmi-input-group">
            <input class="bmi-number" type="number" v-model="height" min="100" max="250" step="0.5" />
            <input class="bmi-range" type="range" v-model="height" min="100" max="250" step="0.5" />
          </div>
        </label>
 
        <!-- Weight Input -->
        <label class="bmi-label">
          <span>Weight (kg)</span>
          <div class="bmi-input-group">
            <input class="bmi-number" type="number" v-model="weight" min="20" max="200" step="0.1" />
            <input class="bmi-range" type="range" v-model="weight" min="20" max="200" step="0.1" />
          </div>
        </label>
 
        <!-- Age Input -->
        <label class="bmi-label">
          <span>Age</span>
          <input class="bmi-number" type="number" v-model="age" min="10" max="100" step="1" />
        </label>
 
        <!-- Gender Selection -->
        <label class="bmi-label">
          <span>Gender</span>
          <select class="bmi-dropdown" v-model="gender">
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
 
        <!-- Error Message -->
        <p v-if="error" class="error-message">{{ error }}</p>
 
        <!-- BMI Result & Category -->
        <div class="bmi-result">
          <p>Your BMI is: <span>{{ bmi }}</span></p>
          <p class="bmi-category">Category: <span :class="bmiCategoryClass">{{ bmiCategory }}</span></p>
        </div>
 
        <button type="submit" class="bmi-btn" :disabled="loading">
          <span v-if="loading">Fetching AI Recommendation...</span>
          <span v-else>Get AI Recommendation</span>
        </button>
      </form>
    </div>
    <div v-if="aiRecommendation.length" class="ai-recommendation-card">
      <button class="close-btn" @click="aiRecommendation = []">&times;</button>
      <h3 class="ai-reco">AI Recommendations</h3>
      <ul class="recommendation-list">
        <li v-for="(item, index) in aiRecommendation" :key="index">
          <!-- <span class="emoji">
            <i :class="item.icon"></i>
            </span> -->
            <span :class="[' emoji icon', item.class]">
              <i :class="item.icon"></i>
            </span>
          <div>
            <h4 class="ai-category">{{ item.category }}</h4>
            <!-- Check if advice is an array -->
            <ul v-if="Array.isArray(item.advice)">
              <li v-for="(point, i) in item.advice" :key="i" class="ai-point">{{ point }}</li>
            </ul>
            <!-- If not an array, display as paragraph -->
            <p v-else>{{ item.advice }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <ChatBot />
    </div>
  </div>
</template>

<script setup>
import apiClient from '@/servers/Index';
import { ref, computed } from 'vue';
import ChatBot from "@/components/ChatBot.vue";
// Reactive variables
const height = ref(170);
const weight = ref(70);
const age = ref('');
const gender = ref('');
const aiRecommendation = ref([]);
const loading = ref(false);
const error = ref('');

// Computed BMI
const bmi = computed(() => {
  const heightMeters = height.value / 100;
  return parseFloat(weight.value / (heightMeters * heightMeters)).toFixed(2);
});

// Determine BMI Category
const bmiCategory = computed(() => {
  const value = bmi.value;
  if (value < 18.5) return 'Underweight';
  if (value >= 18.5 && value < 24.9) return 'Normal Weight';
  if (value >= 25 && value < 29.9) return 'Overweight';
  return 'Obese';
});

// Assign Category Class
const bmiCategoryClass = computed(() => {
  const category = bmiCategory.value;
  if (category === 'Underweight') return 'underweight';
  if (category === 'Normal Weight') return 'normal';
  if (category === 'Overweight') return 'overweight';
  return 'obese';
});

// Fetch AI Recommendation
const calculateBMI = async () => {
  error.value = '';
  if (!age.value) {
    error.value = 'Please enter your age.';
    return;
  }
  if (!gender.value) {
    error.value = 'Please select a gender.';
    return;
  }

  loading.value = true;
  // aiRecommendation.value = null;
  // const aiRecommendation = ref([]); // ✅ Always an array

try {
  const response = await apiClient.post('/bmi/recommendation', {
    // height: height.value,
    // weight: weight.value,
    age: age.value,
    gender: gender.value,
    bmi: bmi.value,
    // category: bmiCategory.value
  });

  // aiRecommendation.value = [
  //   { category: 'Overview', icon: '📋', advice: response.data.recommendation.overview || '' }, // ✅ Keep as string
  //   { category: 'Diet', icon: '🍏', advice: response.data.recommendation.diet || [] }, 
  //   { category: 'Workout', icon: '🏋️', advice: response.data.recommendation.workout || [] }, 
  //   { category: 'Lifestyle', icon: '🌿', advice: response.data.recommendation.lifestyle || [] }, 
  //   { category: 'Important Considerations', icon: '⚠️', advice: response.data.recommendation.important_considerations || [] }
  // ];
  // aiRecommendation.value = [
  //   { category: 'Overview', icon: 'fas fa-clipboard', advice: response.data.recommendation.overview || '' },
  //   { category: 'Diet', icon: 'fas fa-apple-alt', advice: response.data.recommendation.diet || [] },
  //   { category: 'Workout', icon: 'fas fa-dumbbell', advice: response.data.recommendation.workout || [] },
  //   { category: 'Lifestyle', icon: 'fas fa-leaf', advice: response.data.recommendation.lifestyle || [] },
  //   { category: 'Important Considerations', icon: 'fas fa-exclamation-triangle', advice: response.data.recommendation.important_considerations || [] }
  // ];
    aiRecommendation.value = [
    { category: 'Overview', icon: 'fas fa-clipboard', class: 'overview', advice: response.data.recommendation.overview || '' },
    { category: 'Diet', icon: 'fas fa-apple-alt', class: 'diet', advice: response.data.recommendation.diet || [] },
    { category: 'Workout', icon: 'fas fa-dumbbell', class: 'workout', advice: response.data.recommendation.workout || [] },
    { category: 'Lifestyle', icon: 'fas fa-leaf', class: 'lifestyle', advice: response.data.recommendation.lifestyle || [] },
    { category: 'Important Considerations', icon: 'fas fa-exclamation-triangle', class: 'important', advice: response.data.recommendation.important_considerations || [] }
  ];
} catch (err) {
  console.error('Error fetching AI recommendation:', err);
  error.value = 'Failed to fetch AI recommendations. Please try again later.';
} finally {
  loading.value = false;
}

};
</script>

<style scoped>
 .bmi-page {
  min-height: 75vh;
  display: flex;
  flex-direction: column; /* ✅ Row se column me change */
  align-items: center;
  gap: 2rem;
  background: linear-gradient(98deg, #1a426b, #3e3e20);
  /* background: linear-gradient(135deg, #003973, #E5E5BE); */
  color: white;
  font-family: 'Poppins', sans-serif;
  padding: 2rem;
  box-sizing: border-box;
}
 
 .bmi-container {
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 15px;
  width: 400px;
  height: 609px; /* Set fixed height */
  text-align: center;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 76px;
 }

 /* Title */
 .bmi-title {
  font-size: 2rem;
  font-weight: bold;
 }
 .bmi-subtitle {
  font-size: 1rem;
  opacity: 0.8;
 }

 /* Input Styling */
 .bmi-label {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-top: 1rem;
 }
 .bmi-input-group {
  display: flex;
  align-items: center;
  gap: 10px;
 }
 .bmi-number {
  width: 70px;
  padding: 8px;
  border-radius: 5px;
  border: none;
  text-align: center;
  font-size: 1rem;
 }
 .bmi-dropdown {
  padding: 8px;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
 }
 /* Error Message */
 .error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: 10px;
 }
 /* BMI Result */
 .bmi-result {
  margin-top: 1.5rem;
  font-size: 1.3rem;
 }

 .bmi-category {
  font-weight: bold;
  margin-top: 15px;
 }
 .underweight {
  color: #ff9800;
 }
 .normal {
  color: #4caf50;
 }
 .overweight {
  color: #ff5722;
 }
 .obese {
  color: #f44336;
 }
 input,select {
  color: black!important;
 }
.ai-recommendation-card {
  position: relative;
  background: rgba(255, 255, 255, 0.2);
  padding: 1.5rem;
  border-radius: 10px;
  width: 100%;
  max-width: 126vh;
  text-align: left;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
}

.recommendation-list {
  list-style: none;
  padding: 0;
}
.recommendation-list li {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
}
.emoji {
  font-size: 1.8rem;
  margin-right: 10px;
}
.bmi-btn {
  background: #ffcc00;
  color: black;
  padding: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top:15px;
 }
 .bmi-btn:disabled {
  background: gray;
  cursor: not-allowed;
 }
 .close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;  /* ✅ Increase size */
  height: 30px; /* ✅ Increase size */
  font-size: 20px; /* ✅ Make text visible */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10; /* ✅ Ensure it's above everything */
}
.close-btn {
  display: block !important;
}
.close-btn:hover {
  background: darkred;
}
.ai-reco {
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
  background: linear-gradient(135deg, #ff9800, #e65100);
  padding: 12px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: inline-block;
  margin-bottom: 15px;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
}

/* Underline Effect */
.ai-reco::after {
  content: "";
  display: block;
  width: 60px;
  height: 4px;
  background: #fff;
  margin: 8px auto 0;
  border-radius: 2px;
}

/* Category Title */
.ai-category {
  font-size: 1.4rem;
  font-weight: bold;
  color: #ffffff;
  background: linear-gradient(135deg, #007bff, #4a00e0);
  padding: 8px 15px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  display: inline-block;
  margin-bottom: 10px;
  max-width: 80%;
}

/* Points Styling */
.ai-point {
  font-size: 1rem;
  padding: 10px 15px;
  margin: 5px 0;
  background: #f1f1f1;
  border-left: 5px solid #007bff;
  border-radius: 5px;
  transition: background 0.3s ease-in-out;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Different colors for alternating points */
.ai-point:nth-child(odd) {
  border-left-color: #28a745; /* Green */
}

.ai-point:nth-child(even) {
  border-left-color: #ff9800; /* Orange */
}

/* Hover effect */
.ai-point:hover {
  background: rgba(0, 123, 255, 0.1);
}
.icon i {
  font-size: 24px;
}

.icon.overview {
  color: #ff9800; /* Orange */
}

.icon.diet {
  color: #4caf50; /* Green */
}

.icon.workout {
  color: #2196f3; /* Blue */
}

.icon.lifestyle {
  color: #9c27b0; /* Purple */
}

.icon.important {
  color: #f44336; /* Red */
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .bmi-container {
    width: 90%;
    height: auto;
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .bmi-container {
    width: 100%;
    height: auto;
    padding: 1.2rem;
  }

  .bmi-title {
    font-size: 1.8rem;
  }

  .bmi-subtitle {
    font-size: 0.9rem;
  }

  .bmi-number {
    width: 60px;
    padding: 6px;
    font-size: 0.9rem;
  }

  .bmi-btn {
    padding: 10px;
    font-size: 0.9rem;
  }
}
@media (max-width: 360px) {
  .ai-reco {
    font-size: 1.1rem;         /* Reduce font size */
    padding: 6px 8px;          /* Reduce padding */
    max-width: 100%;           /* Allow full width */
    box-sizing: border-box;    /* Ensure padding is included in width */
  }
}

@media (max-width: 480px) {
  .bmi-container {
    padding: 1rem;
    width: 100%;
  
  }

  .bmi-title {
    font-size: 1.6rem;
  }

  .bmi-subtitle {
    font-size: 0.8rem;
  }

  .bmi-number {
    width: 50px;
    font-size: 0.8rem;
  }

  .bmi-btn {
    font-size: 0.8rem;
    padding: 8px;
  }

  .ai-recommendation-card {
    width: 95%;
    padding: 1rem;
  }
  .close-btn{
    width: 21px;
    height: 21px;
    margin-top: 3px;
  }
}
@media (max-width: 768px) {
  .ai-reco {
    font-size: 1.5rem;
    padding: 10px 15px;
  }

  .ai-category {
    font-size: 1.2rem;
    padding: 6px 12px;
    max-width: 90%;
  }

  .ai-point {
    font-size: 0.95rem;
    padding: 8px 12px;
  }
}

@media (max-width: 480px) {
  .ai-reco {
    font-size: 1.3rem;
    padding: 8px 12px;
    margin-top: 20px;
  }

  .ai-category {
    font-size: 1.1rem;
    padding: 5px 10px;
    max-width: 100%;
  }

  .ai-point {
    font-size: 0.9rem;
    padding: 6px 10px;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
