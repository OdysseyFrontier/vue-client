<template>
    <div class="container mt-5">
        <h3> 타임라인 </h3>
        <div class="timeline">
            <div class="line"></div>
            <div v-for="(attraction, index) in store.plannedAttractions" :key="attraction.id" class="timeline-entry"
                :class="{ 'left': index % 2 === 0, 'right': index % 2 !== 0 }">
                <PlanTimeLine :attraction="attraction" :is-left="index % 2 === 0" :index="index"
                    @update="updateAttraction" @delete="deleteAttraction" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import PlanTimeLine from '@/components/plan/PlanTimeLine.vue';
import { usePlanStore } from '@/stores/plan';

const store = usePlanStore();
const timeLineAttractions = ref([]);

const sortAttractions = () => {
    const sorted = [...store.plannedAttractions].sort((a, b) => {
        const dateA = a.planTime ? new Date(a.planTime) : null;
        const dateB = b.planTime ? new Date(b.planTime) : null;

        if (dateA && dateB) {
            return dateA - dateB;
        } else if (!dateA) {
            return 1;
        } else if (!dateB) {
            return -1;
        } else {
            return 1;
        }
    });
    console.log(sorted)
    store.plannedAttractions = sorted;
    console.log(store.plannedAttractions);
};

// watch(usePlanStore().plannedAttractions, () => {
//     console.log("update")
//     console.log(usePlanStore.plannedAttractions)
//     sortAttractions();
//     timeLineAttractions.value = usePlanStore().plannedAttractions;
// }, { immediate: true });


const formatDateToLocalString = (date) => {
    return date.toLocaleDateString('en-CA'); // 'en-CA' 포맷은 'YYYY-MM-DD' 형식을 제공
};

const updateAttraction = (updatedAttraction) => {
    console.log(store.plannedAttractions)
    console.log("업데이트")
    console.log(updatedAttraction);
    const index = updatedAttraction.index;
    console.log(updatedAttraction.index);

    if (index !== -1) {
        // store.plannedAttractions[index] = updatedAttraction;
        store.plannedAttractions[index] = JSON.parse(JSON.stringify(updatedAttraction));

        sortAttractions();

        console.log("1123")
        const planTimes = store.plannedAttractions
            .filter(attraction => attraction.planTime)
            .map(attraction => new Date(attraction.planTime));

        if (planTimes.length) {
            const minTime = new Date(Math.min(...planTimes));
            const maxTime = new Date(Math.max(...planTimes));
            store.setStartTime(formatDateToLocalString(minTime));
            store.setEndTime(formatDateToLocalString(maxTime));
        }
        else {
            store.setStartTime(null);
            store.setEndTime(null);
        }
        console.log("1231241")
    }
    console.log(store.plannedAttractions);
};

const deleteAttraction = (index) => {
    store.plannedAttractions.splice(index, 1);

    const planTimes = store.PlannedAttractions
        .filter(attraction => attraction.planTime)
        .map(attraction => new Date(attraction.planTime));

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