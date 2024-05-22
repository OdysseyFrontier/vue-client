<template>
    <div class="container mt-5">
        <div class="timeline">
            <div class="line"></div>
            <div v-for="(attraction, index) in timeLineAttractions" :key="attraction.id" class="timeline-entry"
                :class="{ 'left': index % 2 === 0, 'right': index % 2 !== 0 }">
                <PlanTimeLine :attraction="attraction" :is-left="index % 2 === 0" :index="index"
                    @update="updateAttraction" @delete="deleteAttraction" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import PlanTimeLine from '@/components/plan/PlanTimeLine.vue';
import { usePlanStore } from '@/stores/plan';

const store = usePlanStore();
const timeLineAttractions = ref([]);

const sortAttractions = () => {
    const sorted = [...timeLineAttractions.value].sort((a, b) => {
        const dateA = a.planTime ? new Date(a.planTime) : null;
        const dateB = b.planTime ? new Date(b.planTime) : null;

        if (dateA && dateB) {
            return dateA - dateB;
        } else if (!dateA) {
            return 1;
        } else if (!dateB) {
            return -1;
        }
        return 0;
    });
    timeLineAttractions.value = sorted;
    store.setPlannedAttractions(timeLineAttractions.value);
};

watch(store.updatePlan.plannedAttractions, () => {
    sortAttractions();
    timeLineAttractions.value = store.updatePlan.plannedAttractions;
}, { immediate: true });

const formatDateToLocalString = (date) => {
    return date.toLocaleDateString('en-CA');
};

const updateAttraction = (updatedAttraction) => {
    const index = updatedAttraction.index;
    if (index !== -1) {
        timeLineAttractions.value[index] = updatedAttraction;
        sortAttractions();
        const planTimes = timeLineAttractions.value.filter(attraction => attraction.planTime).map(attraction => new Date(attraction.planTime));

        if (planTimes.length) {
            const minTime = new Date(Math.min(...planTimes));
            const maxTime = new Date(Math.max(...planTimes));
            store.setStartTime(formatDateToLocalString(minTime));
            store.setEndTime(formatDateToLocalString(maxTime));
        }
    }
};

const deleteAttraction = (index) => {
    timeLineAttractions.value.splice(index, 1);
    sortAttractions();
    const planTimes = timeLineAttractions.value.filter(attraction => attraction.planTime).map(attraction => new Date(attraction.planTime));

    if (planTimes.length) {
        const minTime = new Date(Math.min(...planTimes));
        const maxTime = new Date(Math.max(...planTimes));
        store.setStartTime(formatDateToLocalString(minTime));
        store.setEndTime(formatDateToLocalString(maxTime));
    } else {
        store.setStartTime(null);
        store.setEndTime(null);
    }
};
</script>

<style scoped>
.timeline {
    position: relative;
    width: 100%;
    padding: 1rem 0;
    overflow-x: hidden;
    overflow-y: auto;
}

.line {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 5px;
    background-color: #007bff;
}

.timeline-entry {
    position: relative;
    width: 48%;
    margin: 1rem 0;
    padding: 1rem;
    border: none;
    border-radius: 15px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    background: #fff;
}

.timeline::-webkit-scrollbar {
    display: none;
}

.timeline {
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.left {}

.right {
    left: 52%;
}

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