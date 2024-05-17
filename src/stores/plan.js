import { ref } from 'vue';
import { defineStore } from 'pinia';

export const usePlanStore = defineStore('plan', () => {

    const searchedAttractions = ref([]);
    const plannedAttractions = ref([]);
    const startDate = ref(null);
    const endDate = ref(null);

    function setStartDate(date){
        startDate.value = date;
        console.log(startDate.value)
    }

    function setEndDate(date){
        endDate.value = date;
        console.log(endDate.value)
    }
    // Define actions
    function setSearchedAttractions(attractions) {
        searchedAttractions.value = attractions;
        console.log(searchedAttractions.value);
        console.log(searchedAttractions.value.length)
    }

    function addPlannedAttraction(attraction) {
        this.plannedAttractions.push(attraction);
    }
    function removeSearchedAttraction(index) {
        this.searchedAttractions.splice(index, 1);

    }
    // Return the state and actions so they can be used in components
    return {
        startDate,
        endDate,
        searchedAttractions,
        setStartDate,
        setEndDate,
        plannedAttractions,
        setSearchedAttractions,
        addPlannedAttraction,
        removeSearchedAttraction,
    };
});
