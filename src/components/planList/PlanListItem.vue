<script setup>
import { defineProps, computed } from 'vue';
const defaultImg = "src/assets/attraction/defaultAttractionImg.png";

const props = defineProps({
  plan: Object
});

// 기본 이미지를 사용하기 위해 컴퓨티드 속성 사용
const imageUrl = computed(() => {
  return props.plan.image ? props.plan.image : defaultImg;
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
  </div>
</template>

<style scoped>
.plan-item {
  width: 31%;
  margin-bottom: 20px;
}
.plan-item img {
  width: 100%;
  height: auto;
}
</style>