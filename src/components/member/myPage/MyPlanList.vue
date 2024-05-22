<template>
  <div class="container my-plan-list">
    <div class="row">
      <div class="col-12">
        <div class="tabs d-flex justify-content-center mb-3">
          <button class="btn btn-outline-primary me-2" @click="state.currentTab = 'myPlans'"
            :class="{ active: state.currentTab === 'myPlans' }">
            나의 계획
          </button>
          <button class="btn btn-outline-primary" @click="state.currentTab = 'likedPlans'"
            :class="{ active: state.currentTab === 'likedPlans' }">
            관심 계획
          </button>
        </div>
      </div>
    </div>
    <div class="row p-3 m-3">
      <plan-item v-for="plan in plansToShow" :key="plan.planId" :plan="plan" class="col-xs-12 col-sm-6 col-md-4 p-1">
        <h6 class="card-subtitle mb-2 text-muted ">{{ formatPlanTime(plan.planTime) }}</h6>
      </plan-item>
      <div v-if="plansToShow.length == 0" style="text-Align: center"> 계획이 없습니다. </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, computed } from 'vue';
import PlanItem from '@/components/member/myPage/MyPlanItem.vue';
import { getMyMakePlans, getMyLikePlans } from '@/api/plan';
import { useRoute } from "vue-router";

const route = useRoute();
let { memberId } = route.params;
console.log(memberId);

const state = reactive({
  myPlans: [],
  likedPlans: [],
  currentTab: 'myPlans'
});

const fetchMyPlanList = () => {
  console.log("123213")
  getMyMakePlans(
    memberId,
    ({ data }) => {
      console.log("1234")
      state.myPlans = data;
      console.log(state.myPlans);
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
      console.log("123")
      state.likedPlans = data;
      console.log(state.likedPlans);
    },
    (error) => {
      console.error('Failed to fetch liked plans:', error);
    }
  );
};

onMounted(async() => {
  await fetchMyPlanList();
  await fetchMyLikeList();
});

const plansToShow = computed(() => state.currentTab === 'myPlans' ? state.myPlans : state.likedPlans);

const formatPlanTime = (planTimeArray) => {
  const [year, month, day, hour, minute] = planTimeArray;
  const date = new Date(year, month - 1, day, hour, minute);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
</script>

<style scoped>
.tabs button.active {
  border-bottom-color: blue;
}

.plan-container {
  gap: 10px;
}
</style>
