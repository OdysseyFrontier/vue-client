<template>
    <div class="container my-plan-list">
      <div class="row">
        <div class="col-12">
          <div class="tabs d-flex justify-content-center mb-3">
            <button
              class="btn btn-outline-primary me-2"
              @click="currentTab = 'myPlans'"
              :class="{ active: currentTab === 'myPlans' }"
            >
              나의 계획
            </button>
            <button
              class="btn btn-outline-primary"
              @click="currentTab = 'likedPlans'"
              :class="{ active: currentTab === 'likedPlans' }"
            >
              관심 계획
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <plan-item
          v-for="plan in plansToShow"
          :key="plan.id"
          :plan="plan"
          class="col-xs-12 col-sm-6 col-md-4"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, reactive, computed } from 'vue';
  import axios from 'axios';
  import PlanItem from '@/components/member/myPage/MyPlanItem.vue';
  
  const state = reactive({
    myPlans: [],
    likedPlans: [],
    currentTab: 'myPlans'
  });
  
  const fetchMyPlanList = async () => {
    try {
      const response = await axios.get('/api/my-plans');
      state.myPlans = response.data;
    } catch (error) {
      console.error('Failed to fetch my plans:', error);
    }
  };
  
  const fetchMyLikeList = async () => {
    try {
      const response = await axios.get('/api/liked-plans');
      state.likedPlans = response.data;
    } catch (error) {
      console.error('Failed to fetch liked plans:', error);
    }
  };
  
  onMounted(async () => {
    await fetchMyPlanList();
    await fetchMyLikeList();
  });
  
  const plansToShow = computed(() => state.currentTab === 'myPlans' ? state.myPlans : state.likedPlans);
  </script>
  
  <style scoped>
  .tabs button.active {
    border-bottom-color: blue;
  }
  
  .plan-container {
    gap: 10px;
  }
  </style>