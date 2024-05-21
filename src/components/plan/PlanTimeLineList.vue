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
    overflow-x: hidden; /* Hide horizontal scroll */
    overflow-y: auto;   /* Allow vertical scroll if necessary */

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
    margin: 1rem 0;
    padding: 1rem;
    border: 1px solid #ccc; /* Thin border for visual appeal */
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); /* Light shadow for depth */
}

.timeline::-webkit-scrollbar {
    display: none;
}
.timeline {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
}

.left {

}

.right {
    left: 52%;
    
}

/* Media query for responsiveness */
@media (max-width: 800px) {
    .line {
        display: none;
    }
    .timeline-entry {
        width: 90%;
        left: 5%;
        display: block;
        clear: both;
    }
    .left,
    .right {
        left: 5%;
    }
}
</style>