<template>
    <div class="chat-ai-section">
      <div class="chat-container">
        <div class="chat-box" ref="chatBox">
          <div v-for="(message, index) in messages" :key="index" :class="['message', message.sender]">
            <span v-if="message.sender === 'user'" class="user-label">You:</span>
            <span v-else class="ai-label">AI:</span>
            <p>{{ message.text }}</p>
          </div>
        </div>
        <div class="chat-input">
          <input v-model="userMessage" @keyup.enter="sendMessage" :disabled="isLoading" placeholder="Type your message..." />
          <button @click="sendMessage" :disabled="isLoading">
            <svg v-if="!isLoading" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            <span v-else class="loader"></span> <!-- Loading animation -->
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, nextTick } from 'vue';
  import apiClient from '@/servers/Index';
  
  const messages = ref([]);
  const userMessage = ref('');
  const chatBox = ref(null);
  const isLoading = ref(false); // Track button loading state
const sendMessage = async () => {
  if (!userMessage.value.trim() || isLoading.value) return;

  isLoading.value = true; // Disable button
  messages.value.push({ text: userMessage.value, sender: 'user' });
  const userInput = userMessage.value;
  userMessage.value = '';

  await nextTick(); // Ensure DOM updates before scrolling
  chatBox.value.scrollTop = chatBox.value.scrollHeight;

  try {
    const response = await apiClient.post('chat-with-ai', { message: userInput });
    messages.value.push({ text: response.data.response, sender: 'ai' });

    await nextTick(); // Ensure AI message is rendered before scrolling
    chatBox.value.scrollTop = chatBox.value.scrollHeight;
  } catch (error) {
    messages.value.push({ text: 'Error communicating with AI.', sender: 'ai' });

    await nextTick();
    chatBox.value.scrollTop = chatBox.value.scrollHeight;
  } finally {
    isLoading.value = false; // Enable button after response
  }
};

  </script>
  
  <style scoped>
  /* Chat container */
  .chat-ai-section {
    height: 75vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #0288d1, #848688);
    padding: 20px;
  } 
  .chat-container {
    width: 100%;
    max-width: 600px;
    height: 60vh;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    overflow: hidden;
    margin-top: 49px;
  }
  .chat-box {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
  }
  
  .message {
    max-width: 75%;
    padding: 12px 16px;
    border-radius: 18px;
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 10px;
    animation: fadeIn 0.3s ease-in-out;
  }
  
  .user {
    align-self: flex-end;
    background: linear-gradient(135deg, #007bff, #0056b3);
    color: white;
    border-bottom-right-radius: 4px;
  }
  
  .ai {
    align-self: flex-start;
    background: linear-gradient(135deg, #e1e5ea, #b0bec5);
    color: black;
    border-bottom-left-radius: 4px;
  }
  
  .chat-input {
    display: flex;
    align-items: center;
    padding: 15px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  /* Input field */
  .chat-input input {
    flex: 1;
    padding: 12px;
    border: none;
    border-radius: 30px;
    outline: none;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    font-size: 14px;
    padding-left: 15px;
    transition: 0.3s;
  }
  
  .chat-input input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  .chat-input input:focus {
    background: rgba(255, 255, 255, 0.3);
  }
  
  /* Send button */
  .chat-input button {
    margin-left: 10px;
    padding: 10px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    transition: 0.3s;
  }
  
  /* Disable button */
  .chat-input button:disabled {
    background: #444;
    cursor: not-allowed;
  }
  
  /* Hover effect */
  .chat-input button:hover:not(:disabled) {
    background: #0056b3;
    transform: scale(1.1);
  }
  
  /* SVG icon */
  .icon {
    width: 22px;
    height: 22px;
  }
  
  /* Loading animation */
  .loader {
    width: 20px;
    height: 20px;
    border: 3px solid transparent;
    border-top: 3px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  /* Spin animation */
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  