<script setup>
import { ref, watchEffect } from 'vue';
import { usePlanStore } from '@/stores/plan';
import PlanTimeLine from '@/components/plan/PlanTimeLine.vue';

const timeLineAttractions = ref([]);
const startDate = ref();
const endDate = ref();

const store = usePlanStore();

watchEffect(() => {
    // searchAttractionList 값 가져오기
    console.log(usePlanStore().plannedAttractions);

    if (!usePlanStore().plannedAttractions) {
        return;
    }
    timeLineAttractions.value = usePlanStore().plannedAttractions;
    console.log(timeLineAttractions.value);
});

watchEffect(() => {
    if (usePlanStore().startDate && usePlanStore().endDate) {
        startDate = usePlanStore().startDate;
        endDate = usePlanStore().endDate;
        // make date line
    }
});

</script>

<template>
    <div class="container px-4 px-lg-5 h-100 align-items-center justify-content-center col-9">
        <div class="d-flex flex-column align-items-center justify-content-center">
            <h3>타임 라인</h3>
            <div class="timeline-container">
                <PlanTimeLine v-for="(attraction, index) in timeLineAttractions" :key="index" :attraction="attraction" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.timeline-container {
    display: flex;
    flex-direction: column;
    width: 100%;
}</style>