<template>
    <div>
      <div class="chat-ai-sec" @click="toggleChat">
        <img src="@/assets/chatbot-icon.webp" class="chat-ai" alt="Chat AI" />
      </div>
      <div class="chat-ai-section" v-if="showChat">
        <div class="chat-header">
          <span class="back-icon" @click="toggleChat">&#x276E;</span>
          <h3>Hi there!</h3>
        </div>
        <div class="chat-status">
          <span class="status-dot"></span> We are online
        </div>
        <div class="chat-container" ref="chatBox">
          <div v-for="(message, index) in messages" :key="index" :class="['message', message.sender]">
            <p>{{ message.text }}</p>
          </div>
        </div>
        <div class="chat-input">
          <input v-model="userMessage" @keyup.enter="sendMessage" :disabled="isLoading" placeholder="Type your message..." />
          <button @click="sendMessage" :disabled="isLoading">
            <svg v-if="!isLoading" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            <span v-else class="loader"></span>
          </button>
        </div>
      </div>
    </div>
  </template>
<script setup>
  import { ref, nextTick } from 'vue';
  import apiClient from '@/servers/Index';
  const showChat = ref(false);
//   const messages = ref([]);
  const userMessage = ref('');
  const chatBox = ref(null);
  const isLoading = ref(false);
  const toggleChat = () => {
    showChat.value = !showChat.value;
   };
    const messages = ref([{
            text: "Hi",
            sender: "ai"
        },
    ]);
  const sendMessage = async () => {
        if (!userMessage.value.trim() || isLoading.value) return;

        isLoading.value = true;
        messages.value.push({ text: userMessage.value, sender: 'user' });
        const userInput = userMessage.value;
        userMessage.value = '';

        await nextTick();
        chatBox.value.scrollTop = chatBox.value.scrollHeight;

        try {
            const response = await apiClient.post('chat-with-ai', { message: userInput });
            messages.value.push({ text: response.data.response, sender: 'ai' });

            await nextTick();
            chatBox.value.scrollTop = chatBox.value.scrollHeight;
        } catch (error) {
            messages.value.push({ text: 'Error communicating with AI.', sender: 'ai' });

            await nextTick();
            chatBox.value.scrollTop = chatBox.value.scrollHeight;
        } finally {
            isLoading.value = false;
        }
    };

</script>
  
  <style scoped>
  @import "@/assets/chatbot.css";
  </style>
  