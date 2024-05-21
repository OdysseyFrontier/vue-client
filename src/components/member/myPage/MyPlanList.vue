<template>
  <div class="container my-plan-list">
    <div class="row">
      <div class="col-12">
        <div class="tabs d-flex justify-content-center mb-3">
          <button class="btn btn-outline-primary me-2" @click="currentTab = 'myPlans'"
            :class="{ active: currentTab === 'myPlans' }">
            나의 계획
          </button>
          <button class="btn btn-outline-primary" @click="currentTab = 'likedPlans'"
            :class="{ active: currentTab === 'likedPlans' }">
            관심 계획
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <plan-item v-for="plan in plansToShow" :key="plan.id" :plan="plan" class="col-xs-12 col-sm-6 col-md-4" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, computed } from 'vue';
import PlanItem from '@/components/member/myPage/MyPlanItem.vue';
import { useMemberStore } from '@/stores/member';
import { getMyMakePlans, getMyLikePlans } from '@/api/plan';

const store = useMemberStore();
const memberId = store.memberInfo.memberId;

const state = reactive({
  myPlans: [],
  likedPlans: [],
  currentTab: 'myPlans'
});

const fetchMyPlanList = () => {
  getMyMakePlans(
    memberId,
    ({ data }) => {
      state.myPlans = data;
    },
    (error) => {
      console.error('Failed to fetch my plans:', error);
    }
  );
};

const fetchMyLikeList = () => {
  getMyLikePlans(
    memberId,
    ({ data }) => {
      state.likedPlans = data;
    },
    (error) => {
      console.error('Failed to fetch liked plans:', error);
    }
  );
};


onMounted(() => {
  fetchMyPlanList();
  fetchMyLikeList();
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