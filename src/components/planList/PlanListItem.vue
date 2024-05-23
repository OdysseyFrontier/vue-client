<script setup>
import { defineProps, computed } from 'vue';
const defaultImg = "src/assets/attraction/defaultAttractionImg.png";

const props = defineProps({
  plan: Object
});

// 기본 이미지를 사용하기 위해 컴퓨티드 속성 사용
const imageUrl = computed(() => {
  return props.plan.images ? props.plan.images[0] : defaultImg;
});

// 설명이 50자 이상일 경우 자르기
const truncatedDescription = computed(() => {
  const desc = props.plan.description;
  return desc.length > 35 ? desc.substring(0, 35) + '...' : desc;
});


</script>

<template>
  <div class="plan-item">
    <img :src="imageUrl" :alt="plan.title" />
    <h3>{{ plan.title }}</h3>
    <p>{{ truncatedDescription }}</p>
    <RouterLink :to="{ name: 'PlanDetail', params: { planId: props.plan.planId } }" class="btn btn-primary mt-2">
      상세보기
    </RouterLink>
  </div>
</template>

<style scoped>
.plan-item {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* Optional: add shadow for better focus */
  border-radius: 15px;
  /* Rounded corners */
  overflow: hidden;
  /* Ensures child elements adhere to border-radius */
  background: #fff;
  /* Optional: set a background color */
}

.plan-item img {
  width: 100%;
  height: auto;
  object-fit: cover;
  /* Ensures the image covers the area nicely */
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.plan-item h3 {
  font-size: 1.5rem;
  /* Larger font size for headers */
  margin-top: 0.5rem;
  padding: 0 1rem;
  /* Padding for text */
}

.plan-item p {
  font-size: 1rem;
  /* Larger font size for descriptions */
  padding: 0 1rem 1rem;
  /* Padding to not let the text touch the edges */
}
</style>