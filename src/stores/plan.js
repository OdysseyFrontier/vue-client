import { ref } from 'vue';
import { defineStore } from 'pinia';

export const usePlanStore = defineStore('plan', () => {

    const searchAttractionList = ref([]);
    const planAttractionList = ref([]);

    // Define actions
    function setSearchAttractionList(attractions) {
        searchAttractionList.value = attractions;
        console.log(searchAttractionList.value);
        console.log(searchAttractionList.value.length)
    }

    function addAttractionToPlan(attraction) {
        planAttractionList.value.push(attraction);
    }
    function removeAttractionFromPlan(attractionId) {
        planAttractionList.value =
            planAttractionList.value.filter(attr => attr.id !== attractionId);
    }
    // Return the state and actions so they can be used in components
    return {
        searchAttractionList,
        planAttractionList,
        setSearchAttractionList,
        addAttractionToPlan,
        removeAttractionFromPlan
    };
});
