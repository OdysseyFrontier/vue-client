<template>
    <div class="d-flex align-items-center mb-2">
      <img :src="defaultImg" alt="Member's profile picture" class="rounded-circle me-2" style="width: 50px; height: 50px;">
      <div class="flex-grow-1">멤버 이름{{ member.name }}</div>
      <button class="btn btn-danger">삭제</button>
    </div>
  </template>
  
  <script setup>
  const defaultImg = "src/assets/attraction/defaultAttractionImg.png";

  defineProps(['member']);
  </script>
  
  <style scoped>
  /* 추가적인 스타일링 필요 없음, 부트스트랩 클래스로 충분 */
  </style>