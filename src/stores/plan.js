import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

export const usePlanStore = defineStore('plan', () => {
    const searchedAttractions = ref([]);
    const plannedAttractions = ref([]);
    const startTime = ref(null);
    const endTime = ref(null);
    const title = ref(null);
    const description = ref(null);
    const planDetails = ref([]);
    const updatePlan = ref([]);

    watch(plannedAttractions, (newVal, oldVal) => {
        console.log(newVal);
        console.log(oldVal);
    });

    function setPlanDetails(details) {
        planDetails.value = details;
    }

    function setStartTime(date) {
        startTime.value = date;
        console.log(startTime.value);
    }

    function setEndTime(date) {
        endTime.value = date;
        console.log(endTime.value);
    }

    function setSearchedAttractions(attractions) {
        searchedAttractions.value = attractions;
    }

    function setPlannedAttractions(attractions) {
        console.log(attractions);
        plannedAttractions.value = attractions;
        console.log(plannedAttractions.value);
    }

    function addPlannedAttraction(attraction) {
        plannedAttractions.value.push(attraction);
    }

    function removeSearchedAttraction(index) {
        searchedAttractions.value.splice(index, 1);
    }

    function updatePlannedAttraction(updatedAttraction) {
        const index = plannedAttractions.value.findIndex(a => a.id === updatedAttraction.id);
        if (index !== -1) {
            plannedAttractions.value[index] = updatedAttraction;
        }
    }

    return {
        startTime,
        endTime,
        searchedAttractions,
        planDetails,
        setStartTime,
        setEndTime,
        updatePlan,
        title,
        description,
        plannedAttractions,
        setSearchedAttractions,
        setPlannedAttractions,
        setPlanDetails,
        addPlannedAttraction,
        removeSearchedAttraction,
        updatePlannedAttraction,
    };
});
