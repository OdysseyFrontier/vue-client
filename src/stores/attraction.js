// stores/attraction.js
import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAttractionStore = defineStore('attraction', () => {
    // Define reactive state
    const searchAttractionList = ref([]);

    // Define actions
    function setSearchAttractionList(attractions) {
        searchAttractionList.value = attractions;
        console.log(searchAttractionList.value);
        console.log(searchAttractionList.value.length)
    }

    // Return the state and actions so they can be used in components
    return {
        searchAttractionList,
        setSearchAttractionList
    };
});