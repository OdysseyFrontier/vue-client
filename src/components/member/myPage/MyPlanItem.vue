<script setup>
const defaultImg = "src/assets/attraction/defaultAttractionImg.png";

defineProps({
  plan: Object
});
</script>


<template>
  <div class="plan-item">
    <template v-if="plan.images.length == 0">
      <img :src="defaultImg" alt="Plan Thumbnail" class="plan-image">
    </template>
    <template v-else>
      <img :src="plan.images[0]" alt="Plan Thumbnail" class="plan-image">
    </template>
    <div class="plan-details">
      <h3>{{ plan.title }}</h3>
      <p>{{ plan.description }}</p>
      <RouterLink :to="{ name: 'PlanDetail', params: { planId: plan.planId } }" class="btn btn-primary mt-2">
        상세보기
      </RouterLink>
    </div>
  </div>
</template>


<style scoped>
.plan-item {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
}

.plan-image {
  width: 100%;
  height: auto;
  border-radius: 5px;
}
</style>