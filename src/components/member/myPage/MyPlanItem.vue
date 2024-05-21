<script setup>
  const defaultImg = "src/assets/attraction/defaultAttractionImg.png";

    defineProps({
      plan: Object
    });
</script>


<template>
  <div class="plan-item">
    <img :src="defaultImg" alt="Plan Thumbnail" class="plan-image">
    <div class="plan-details">
      <h3>{{ plan.title }}</h3>
      <p>{{ plan.description }}</p>
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