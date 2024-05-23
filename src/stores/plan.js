import { ref, watchEffect } from 'vue';
import { defineStore } from 'pinia';

export const usePlanStore = defineStore('plan', () => {
    const searchedAttractions = ref([]);
    const plannedAttractions = ref([]);

    const startTime = ref(null);
    const endTime = ref(null);
    const title = ref(null);
    const description = ref(null);
    const planDetails = ref([]);
    const isUpdate = ref(false);

    const updatePlan = ref([]);

    watchEffect(plannedAttractions, (newVal, oldVal) => {
        console.log("New Value:", newVal);
        console.log("Old Value:", oldVal);
        console.log(plannedAttractions.value);
    }, { deep: true });

    function setUpdatePlan(plan) {
        updatePlan.value = plan;
    }
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

    function reset() {
        searchedAttractions.value = [];
        plannedAttractions.value = [];
        startTime.value = null;
        endTime.value = null;
        title.value = null;
        description.value = null;
        planDetails.value = [];
        isUpdate.value = false;
        updatePlan.value = [];
    }

    return {
        isUpdate,
        startTime,
        endTime,
        searchedAttractions,
        planDetails,
        updatePlan,
        title,
        description,
        plannedAttractions,
        setStartTime,
        setEndTime,
        setSearchedAttractions,
        setPlannedAttractions,
        setPlanDetails,
        setUpdatePlan,
        addPlannedAttraction,
        removeSearchedAttraction,
        updatePlannedAttraction,
        reset

    };
});
