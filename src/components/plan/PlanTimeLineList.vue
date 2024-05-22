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
            return 1; // `a` should come after `b`
        } else if (!dateB) {
            return -1; // `b` should come after `a`
        }else {
            return 1;
        }
    });
    timeLineAttractions.value = sorted;

    console.log("sort하는중:");
    console.log("Sorted attractions:");
    console.log(timeLineAttractions.value);
    store.setPlannedAttractions(timeLineAttractions.value);
};

watch(usePlanStore().plannedAttractions, () => {
    console.log("update")
    console.log(usePlanStore.plannedAttractions)
    sortAttractions();
    timeLineAttractions.value = usePlanStore().plannedAttractions;
}, { immediate: true });


const formatDateToLocalString = (date) => {
    return date.toLocaleDateString('en-CA'); // 'en-CA' 포맷은 'YYYY-MM-DD' 형식을 제공
};

const updateAttraction = (updatedAttraction) => {
    const index = updatedAttraction.index;
    if (index !== -1) {
        timeLineAttractions.value[index] = updatedAttraction;
        sortAttractions();
        console.log('Updated Attractions:', timeLineAttractions.value);

        // Calculate the minimum and maximum planTime
        const planTimes = timeLineAttractions.value
            .filter(attraction => attraction.planTime)
            .map(attraction => new Date(attraction.planTime));

        if (planTimes.length) {
            const minTime = new Date(Math.min(...planTimes));
            const maxTime = new Date(Math.max(...planTimes));
            usePlanStore().setStartTime(formatDateToLocalString(minTime));
            usePlanStore().setEndTime(formatDateToLocalString(maxTime));
            console.log(usePlanStore().startTime)
            console.log(usePlanStore().endTime)
        }
    }
};

const deleteAttraction = (index) => {
    console.log('Delete index:', index);
    console.log('Before deletion:', timeLineAttractions.value);
    timeLineAttractions.value.splice(index, 1);
    sortAttractions();

    console.log('After deletion:', timeLineAttractions.value);

    // Calculate the minimum and maximum planTime
    const planTimes = timeLineAttractions.value
        .filter(attraction => attraction.planTime)
        .map(attraction => new Date(attraction.planTime));

    if (planTimes.length) {
        const minTime = new Date(Math.min(...planTimes));
        const maxTime = new Date(Math.max(...planTimes));

        usePlanStore().setStartTime(formatDateToLocalString(minTime));
        usePlanStore().setEndTime(formatDateToLocalString(maxTime));
    } else {
        usePlanStore().setStartTime(null);
        usePlanStore().setEndTime(null);
    }
};
</script>

<style scoped>
.timeline {
    position: relative;
    width: 100%;
    padding: 1rem 0;
    overflow-x: hidden;
    /* Hide horizontal scroll */
    overflow-y: auto;
    /* Allow vertical scroll if necessary */
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
    /* Remove extra border */
    border-radius: 15px;
    /* Round the corners */
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    /* Light shadow for depth */
    background: #fff;
    /* Ensure white background for better visibility */
}

.timeline::-webkit-scrollbar {
    display: none;
}

.timeline {
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;
    /* IE and Edge */
}

.left {}

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