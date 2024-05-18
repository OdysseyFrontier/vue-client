<template>
    <div class="container mt-5">
        <div class="timeline">
            <div class="line"></div>
            <div v-for="(attraction, index) in timeLineAttractions" :key="attraction.id" class="timeline-entry"
                :class="{ 'left': index % 2 === 0, 'right': index % 2 !== 0 }">
                <PlanTimeLine :attraction="attraction" :is-left="index % 2 === 0" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import PlanTimeLine from '@/components/plan/PlanTimeLine.vue';
import { usePlanStore } from '@/stores/plan';

const store = usePlanStore();
const timeLineAttractions = ref([]);

onMounted(() => {
    timeLineAttractions.value = store.plannedAttractions;
});
</script>

<style scoped>
.timeline {
    position: relative;
    width: 100%;
    padding: 1rem 0;
}

.line {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    background-color: #007bff;
}

.timeline-entry {
    position: relative;
    width: 48%;
}

.left {
    
}

.right {
    left: 52%;
    
}
</style>