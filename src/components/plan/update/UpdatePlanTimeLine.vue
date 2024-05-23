<template>
    <div class="container mt-5">
        <h3> 타임라인 </h3>
        <div class="timeline">
            <div class="line"></div>
            <div v-for="(attraction, index) in store.plannedAttractions" :key="index" class="timeline-entry"
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
//     updateAttraction(usePlanStore().plannedAttractions)
// })
// watch([usePlanStore().plannedAttractions] () => {
//     console.log("watch plan")
//     if (!store.isUpdate) return;
//     console.log("update")
//     console.log(usePlanStore().plannedAttractions)
//     timeLineAttractions.value = usePlanStore().plannedAttractions;
//     sortAttractions(); 
// timeLineAttractions.value = usePlanStore().plannedAttractions;
// console.log(timeLineAttractions.value); // 변환된 배열 출력

// timeLineAttractions.value = timeLineAttractions.value.map(attraction => {
//     // Check if attractionInfo is null or undefined
//     if (!attraction.attractionInfo) {
//         return attraction; // or return an empty object {}, depending on what's expected
//     }

//     // If attractionInfo is valid, return the formatted object
//     return {
//         firstImage: attraction.attractionInfo.firstImage,
//         title: attraction.attractionInfo.title,
//         add1: attraction.attractionInfo.add1,
//         description: attraction.description,
//         planTime: attraction.planTime ? formatDateTimeLocal(attraction.planTime) : null,
//     };
// });


// }, { immediate: true });

// function formatDateTimeLocal(dateArray) {
//     if (dateArray.length !== 5) {
//         console.error("Invalid date array length:", dateArray.length);
//         return ''; // Return empty if the dateArray is not valid
//     }

//     // Extracting each component from the dateArray
//     const [year, month, day, hour, minute] = dateArray;

//     // and concatenating them into a datetime-local compatible string
//     const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
//     const formattedTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

//     // Combining date and time with 'T' as required by the datetime-local input type
//     return `${formattedDate}T${formattedTime}`;
// }


// 우리나라 시각으로 바꿔주는 코드
const formatDateToLocalString = (date) => {
    return date.toLocaleDateString('en-CA');
};

const updateAttraction = (updatedAttraction) => {
    console.log("업데이트")
    console.log(updatedAttraction);
    const index = updatedAttraction.index;
    console.log(updatedAttraction.index);

    if (index !== -1) {
        console.log(store.plannedAttractions)
        store.plannedAttractions[index] = updatedAttraction;

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