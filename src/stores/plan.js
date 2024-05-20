import { ref } from 'vue';
import { defineStore } from 'pinia';

export const usePlanStore = defineStore('plan', () => {

    const searchedAttractions = ref([]);
    const plannedAttractions = ref([]);
    const startDate = ref(null);
    const endDate = ref(null);
    // const plannedAttractionsByDate = ref({});

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
        updateAttractionsByDate();

    }
    function removeSearchedAttraction(index) {
        this.searchedAttractions.splice(index, 1);

    }

    function updateAttractionsByDate() {
        const start = new Date(startDate.value);
        const end = new Date(endDate.value);
        const date = new Date(start);

        attractionsByDate.value = {};

        while (date <= end) {
            const dateString = date.toISOString().split('T')[0];
            attractionsByDate.value[dateString] = [];
            date.setDate(date.getDate() + 1);
        }
        plannedAttractions.value.forEach(attraction => {
            const dateString = new Date(attraction.date).toISOString().split('T')[0];
            if (attractionsByDate.value[dateString]) {
                attractionsByDate.value[dateString].push(attraction);
            }
        });
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