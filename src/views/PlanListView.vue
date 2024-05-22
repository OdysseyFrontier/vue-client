<script setup>
import SearchPlan from "@/components/planList/SearchPlan.vue";
import PlanList from "@/components/planList/PlanList.vue";
import { useSidebarStore } from "@/stores/sidebar.js";

const sidebarStore = useSidebarStore();
sidebarStore.changesSidebarState("planList");
sidebarStore.open = false;
</script>

<template>
  <div>
    <h1>여행 계획 리스트</h1>
    <div class="row">
      <SearchPlan />
    </div>
    <PlanList />
  </div>
</template>

<style scoped>
/* 여기에 필요한 추가 스타일을 작성하세요 */
</style>
