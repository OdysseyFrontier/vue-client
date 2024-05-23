<script setup>
import Slide from '../components/item/Slide.vue';
import { useSidebarStore } from "@/stores/sidebar.js";
import axios from 'axios';
import { ref, watch, nextTick, onMounted } from 'vue';
import { useMemberStore } from "@/stores/member";
import 'bootstrap-icons/font/bootstrap-icons.css';  // Bootstrap Icons CSS 불러오기

const { VITE_VUE_APP_KAKAO_REST_API_KEY } = import.meta.env;

const memberStore = useMemberStore();

const sidebarStore = useSidebarStore();
sidebarStore.changesSidebarState("home");
sidebarStore.open = false;

const messages = ref([]);
const userMessage = ref("");
const isLoading = ref(false);
const messagesContainer = ref(null);

let memberName = memberStore.memberName;

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

const sendMessage = async () => {
  if (userMessage.value.trim() === '') return;

  messages.value.push({ sender: memberStore.memberName, text: userMessage.value });
  const messageToSend = userMessage.value;
  userMessage.value = '';
  isLoading.value = true;

  await nextTick();
  scrollToBottom();

  try {
    const response = await axios.post('http://localhost/api/chat/message', { message: messageToSend });
    const chatGPTResponse = response.data.choices[0].message.content;
    messages.value.push({ sender: 'ChatGPT', text: chatGPTResponse });
  } catch (error) {
    console.error("메시지를 보내는 동안 오류가 발생했습니다:", error);
    messages.value.push({ sender: 'ChatGPT', text: "요청을 처리하는 동안 오류가 발생했습니다." });
  } finally {
    isLoading.value = false;
    await nextTick();
    scrollToBottom();
  }
};

watch(messages, async () => {
  await nextTick();
  scrollToBottom();
});

const weather = ref(null);
const hourlyWeather = ref([]);

const fetchWeather = async (location) => {
  try {
    const response = await axios.get(`https://wttr.in/${location}?format=j1`);
    const weatherData = response.data;
    weather.value = {
      temperature: `${weatherData.current_condition[0].temp_C}°C`,
      description: weatherData.current_condition[0].weatherDesc[0].value,
      icon: getWeatherIcon(weatherData.current_condition[0].weatherDesc[0].value),
      humidity: weatherData.current_condition[0].humidity,
      feelsLike: weatherData.current_condition[0].FeelsLikeC,
      windSpeed: weatherData.current_condition[0].windspeedKmph,
      uvIndex: weatherData.current_condition[0].uvIndex,
      sunset: weatherData.weather[0].astronomy[0].sunset,
      airQuality: "보통",  // 예시 데이터
      pm10: "보통"        // 예시 데이터
    };
    hourlyWeather.value = weatherData.weather[0].hourly;
  } catch (error) {
    console.error("날씨 데이터를 가져오는 동안 오류가 발생했습니다:", error);
    weather.value = {
      temperature: "",
      description: "날씨 정보를 가져오는 동안 오류가 발생했습니다.",
      icon: "bi-exclamation-circle",
      humidity: "--",
      feelsLike: "--",
      windSpeed: "--",
      uvIndex: "--",
      sunset: "--",
      airQuality: "오류",
      pm10: "오류"
    };
  }
};

const fetchCityName = async (lat, lon) => {
  const apiKey = VITE_VUE_APP_KAKAO_REST_API_KEY;
  try {
    const response = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}`, {
      headers: {
        Authorization: `KakaoAK ${apiKey}`
      }
    });
    const city = response.data.documents[0].address.region_2depth_name;
    return city;
  } catch (error) {
    console.error("도시 이름을 가져오는 동안 오류가 발생했습니다:", error);
    return null;
  }
};

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const city = await fetchCityName(lat, lon);
      if (city) {
        fetchWeather(city);
      } else {
        fetchWeather("Seoul");
      }
    }, (error) => {
      console.error("위치를 가져오는 동안 오류가 발생했습니다:", error);
      // 기본 위치 (서울)로 대체
      fetchWeather("Seoul");
    });
  } else {
    console.error("이 브라우저는 지리적 위치를 지원하지 않습니다.");
    // 기본 위치 (서울)로 대체
    fetchWeather("Seoul");
  }
};

const getWeatherIcon = (description) => {
  switch (description.toLowerCase().trim()) {
    case 'clear':
    case 'sunny':
      return 'bi-brightness-high';
    case 'partly cloudy':
      return 'bi-cloud-sun';
    case 'cloudy':
      return 'bi-cloud';
    case 'overcast':
      return 'bi-clouds';
    case 'mist':
    case 'fog':
      return 'bi-cloud-fog';
    case 'patchy rain possible':
    case 'patchy snow possible':
    case 'patchy sleet possible':
    case 'patchy freezing drizzle possible':
      return 'bi-cloud-drizzle';
    case 'thundery outbreaks possible':
      return 'bi-cloud-lightning';
    case 'blowing snow':
    case 'blizzard':
      return 'bi-snow';
    case 'freezing fog':
      return 'bi-cloud-hail';
    case 'patchy light drizzle':
    case 'light drizzle':
      return 'bi-cloud-drizzle';
    case 'light rain':
      return 'bi-cloud-rain';
    case 'moderate rain at times':
    case 'moderate rain':
      return 'bi-cloud-rain-heavy';
    case 'heavy rain at times':
    case 'heavy rain':
      return 'bi-cloud-rain-heavy';
    case 'light snow':
      return 'bi-cloud-snow';
    case 'moderate snow':
      return 'bi-cloud-snow';
    case 'heavy snow':
      return 'bi-cloud-snow-heavy';
    case 'ice pellets':
      return 'bi-cloud-hail';
    case 'light sleet':
      return 'bi-cloud-sleet';
    case 'moderate or heavy sleet':
      return 'bi-cloud-sleet';
    default:
      return 'bi-question-circle';
  }
};

onMounted(() => {
  getLocation();
});
</script>


<template>
    <Slide />
  <main class = "container">

    <div class="weather-banner">
      <div v-if="weather" class="current-weather">
        <i :class="`bi ${weather.icon} weather-icon`"></i>
        <div class="weather-details">
          <div class="temperature">{{ weather.temperature }}</div>
          <div class="description">{{ weather.description }}</div>
          <div class="additional-info">
            <span>습도 {{ weather.humidity }}%</span> • 
            <span>체감 {{ weather.feelsLike }}°</span> • 
            <span>서풍 {{ weather.windSpeed }}m/s</span>
          </div>
          <div class="additional-info">
            <span>미세 {{ weather.airQuality }}</span> • 
            <span>초미세 {{ weather.pm10 }}</span> • 
            <span>일몰 {{ weather.sunset }}</span>
          </div>
        </div>
      </div>

      <div class="hourly-weather-container" v-if="hourlyWeather.length">
        <div class="hourly-weather" v-for="(hour, index) in hourlyWeather.slice(0, 8)" :key="index">
          <div class="hourly-time">{{ index === 0 ? '0' : `${hour.time.slice(0, -2)}:00` }}</div>
          <div class="hourly-icon">
            <i :class="`bi ${getWeatherIcon(hour.weatherDesc[0].value)}`"></i>
          </div>
          <div class="hourly-temp">{{ `${hour.tempC}°C` }}</div>
        </div>
      </div>
    </div>

    <div class="chat-container">
      <div class="chat-header">ChatGPT와 소통해보세요!</div>
      <div ref="messagesContainer" class="messages">
        <div v-for="(msg, index) in messages" :key="index" :class="{'message user': msg.sender === memberStore.memberName, 'message chatgpt': msg.sender === 'ChatGPT'}">
          <strong>{{ msg.sender }}:</strong> {{ msg.text }}
        </div>
      </div>
      <div class="input-container">
        <input v-model="userMessage" @keyup.enter="sendMessage" placeholder="메시지를 입력하세요" />
        <button @click="sendMessage" :disabled="isLoading">
          <span v-if="isLoading">전송 중...</span>
          <span v-else>전송</span>
        </button>
      </div>
    </div>
  </main>
</template>






<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');
.card {
  margin-bottom: 30px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0 30px rgba(1, 41, 112, 0.1);
}


body {
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #f0f2f5;
  margin: 0;
  padding: 0;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.weather-banner {
  background: linear-gradient(90deg, #4facfe, #00f2fe);
  padding: 20px;
  text-align: center;
  color: white;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  /* max-width: 800px; */
}

.current-weather {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.weather-icon {
  font-size: 4em;
  color: #ffec3d;
}

.weather-details {
  text-align: left;
}

.temperature {
  font-size: 3em;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.description {
  font-size: 1.5em;
  color: #666;
  margin: 0;
}

.additional-info {
  font-size: 1.1em;
  color: #666;
  margin: 5px 0;
}

.hourly-weather-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.hourly-weather {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  width: 80px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.hourly-time {
  font-size: 1.2em;
  margin-bottom: 5px;
  color: #333;
}

.hourly-icon {
  font-size: 2em;
  margin-bottom: 5px;
  color: #007bff;
}

.hourly-temp {
  font-size: 1.2em;
  color: #333;
}

.chat-container {
  /* max-width: 800px; */
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.chat-header {
  font-size: 2em;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}

.messages {
  height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
  border: 1px solid #eee;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 10px;
}

.message {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  transition: background-color 0.3s ease;
}

.message.user {
  background-color: #e3f2fd;
  border: 1px solid #90caf9;
  text-align: right;
  color: #0d47a1;
}

.message.chatgpt {
  background-color: #e8f5e9;
  border: 1px solid #a5d6a7;
  text-align: left;
  color: #1b5e20;
}

.input-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

input {
  flex-grow: 1;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
  transition: border-color 0.3s ease;
  font-size: 1em;
}

input:focus {
  border-color: #667eea;
  outline: none;
}

button {
  padding: 12px 20px;
  border: none;
  background-color: #667eea;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1em;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:enabled {
  background-color: #5a67d8;
}
</style>
