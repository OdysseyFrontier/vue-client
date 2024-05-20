import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useHotPlaceStore = defineStore('hotplace', () => {
    // Define reactive state
    const searchHotPlaceList = ref([]);

    // Define actions
    function setSearchHotPlaceList(hotplaces) {
        searchHotPlaceList.value = hotplaces;
    }

    // Return the state and actions so they can be used in components
    return {
        searchHotPlaceList,
        setSearchHotPlaceList
    };
});