<template>
  <div class="img-ai-sec">
    <!-- Image Upload Section -->
    <div class="health-chat-container">
      <h2>Upload Image & Get AI Health Insights</h2>

      <!-- Image Upload & Analyze Button -->
      <div class="form-section">
        <label class="custom-file-upload">
          <input type="file" @change="handleFileUpload" accept="image/*" />
          Choose Image
        </label>
        <button @click="sendToAI" :disabled="isLoading || !file" class="anal-btn">Analyze</button>
      </div>

      <!-- Display Selected Image -->
      <div v-if="filePreview" class="image-preview">
        <img :src="filePreview" alt="Selected Image" />
      </div>

      <!-- Loading Animation -->
      <div v-if="isLoading" class="loading">
        <div class="spinner"></div>
        <p>Processing...</p>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="error-message">
        <p>{{ errorMessage }}</p>
      </div>
    </div>

    <!-- AI Response Section -->
    <div v-if="aiRecommendation.length" class="ai-recommendation-card">
      <button class="close-btn" @click="aiRecommendation = []">&times;</button>
      <h3 class="ai-reco">AI Health Recommendations</h3>
      <ul class="recommendation-list">
        <li v-for="(item, index) in aiRecommendation" :key="index">
          <span :class="['emoji icon', item.class]">
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
import { ref } from "vue";
import apiClient from "@/servers/Index";
import ChatBot from "@/components/ChatBot.vue";

const file = ref(null);
const filePreview = ref(null);
const isLoading = ref(false);
const errorMessage = ref("");
const aiRecommendation = ref([]);

// Handle File Upload
const handleFileUpload = (event) => {
  const uploadedFile = event.target.files[0];
  if (!uploadedFile) return;

  // Validate File Type
  if (!["image/jpeg", "image/png", "image/webp"].includes(uploadedFile.type)) {
    errorMessage.value = "Invalid image format. Only JPG, PNG, and WEBP are allowed.";
    return;
  }

  file.value = uploadedFile;
  errorMessage.value = "";

  // Preview Image
  const reader = new FileReader();
  reader.onload = (e) => {
    filePreview.value = e.target.result;
  };
  reader.readAsDataURL(uploadedFile);
};

// Send Image to AI
const sendToAI = async () => {
  if (!file.value) {
    errorMessage.value = "Please select an image before analyzing.";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";  // Reset error message before sending
  let formData = new FormData();
  formData.append("image", file.value);

  try {
    
    const response = await apiClient.post("/health-image-recommendation", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }); 
    // const response = await apiClient.post("/test", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });

    aiRecommendation.value = [
      { category: 'BMI', icon: 'fas fa-weight', class: 'bmi', advice: response.data.recommendation.estimated_bmi || 'N/A' },
      { category: 'Overview', icon: 'fas fa-clipboard', class: 'overview', advice: response.data.recommendation.overview || '' },
      { category: 'Diet', icon: 'fas fa-apple-alt', class: 'diet', advice: response.data.recommendation.diet || [] },
      { category: 'Workout', icon: 'fas fa-dumbbell', class: 'workout', advice: response.data.recommendation.workout || [] },
      { category: 'Lifestyle', icon: 'fas fa-leaf', class: 'lifestyle', advice: response.data.recommendation.lifestyle || [] },
      { category: 'Important Considerations', icon: 'fas fa-exclamation-triangle', class: 'important', advice: response.data.recommendation.important_considerations || [] }
    ];
  } catch (error) {
      // Check for error details from the backend and display it
      if (error.response?.data?.error) {
          errorMessage.value = error.response.data.error;  // Display the main error
          if (error.response.data.details) {
              errorMessage.value += ` - ${error.response.data.details.error}: ${error.response.data.details.details}`;  // Display nested details
          }
      }
      // Handle Laravel Validation Errors (422)
      else if (error.response && error.response.status === 422) {
          errorMessage.value = error.response.data.message;  // Corrected this line
      } 
      // General Error Handling
      else {
          errorMessage.value = "Something went wrong. Please try again.";
      }

      // Clear AI recommendations in case of error
      aiRecommendation.value = [];
  } finally {
      isLoading.value = false;
  }

};
</script>


<style scoped>
/* Main Container - Prevent Navbar Overlap */
.img-ai-sec {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    /* Ensure Full Height */
    gap: 20px;
    padding: 100px 30px 30px;
    /* Add Padding to Prevent Overlap */
    background: linear-gradient(98deg, #1a426b, #3e3e20);
    overflow: auto;
    /* Allow Scrolling if Needed */
}

/* Health Chat Container */
.health-chat-container {
    max-width: 500px;
    padding: 25px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(15px);
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 300px;
    width: 100%;
    
    /* Center it properly when no image or AI response */
    margin: auto;
    display: flex;
    justify-content: center;
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
  width: 35px;  /* Slightly larger for better alignment */
  height: 35px;
  font-size: 20px; /* Ensures text is visible */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  line-height: 0; /* Fixes vertical misalignment */
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
  /* max-width: 80%; */
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

/* Heading */
h2 {
    font-size: 1.8em;
    color: #fff;
    font-weight: bold;
    margin-bottom: 15px;
}

/* Form Section */
.form-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}

/* Custom File Upload */
.custom-file-upload {
    padding: 12px 20px;
    background: linear-gradient(135deg, #007bff, #0056b3);
    color: white;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.3s ease-in-out;
}

.custom-file-upload:hover {
    background: linear-gradient(135deg, #0056b3, #003580);
}

.custom-file-upload input {
    display: none;
}

/* Submit Button */
.anal-btn {
    background: linear-gradient(135deg, #28a745, #1e7e34);
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.3s ease-in-out;
    border: none;
}

/* .anal-btn:hover {
    background: linear-gradient(135deg, #1e7e34, #145622);
} */

button:disabled {
    background: #ccc;
    cursor: not-allowed;
}

/* Image Preview */
.image-preview img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    margin-top: 15px;
}

/* Loading Animation */
.loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: bold;
    color: #007bff;
    margin-top: 20px;
}

.spinner {
    width: 35px;
    height: 35px;
    border: 4px solid rgba(0, 0, 0, 0.2);
    border-top: 4px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}
.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: 10px;
 }
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* Response Section */


/* Mobile Responsive */
@media (max-width: 600px) {

    .health-chat-container,
    .response-section {
        max-width: 90%;
        padding: 20px;
    }

    .img-ai-sec {
        padding: 100px 20px 20px;
        /* Maintain Padding for Navbar */
    }
}
@media  (max-width: 320px) {
    .ai-reco {
    font-size: 1.3rem;
    padding: 8px 12px;
    margin-top: 20px;
  }
}
</style>
