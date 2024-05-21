<script setup>
import { ref, watch } from "vue";
import { usePlanStore } from '@/stores/plan';
import AttractionItem from "@/components/plan/AttractionItem.vue";
import draggable from 'vuedraggable';

const store = usePlanStore();
const searchedAttractions = ref([]);
const plannedAttractions = ref([]);

// Synchronize searchedAttractions with the store
watch(() => store.searchedAttractions, (newVal) => {
    searchedAttractions.value = newVal;
}, { immediate: true });

// Synchronize plannedAttractions with the store
watch(() => store.plannedAttractions, (newVal) => {
    console.log("pinia -> 1")
    plannedAttractions.value = newVal;
}, { immediate: true });

// Update the store whenever plannedAttractions changes
watch(plannedAttractions, (newVal) => {
    console.log("attractionzone updated")
    // store.setPlannedAttractions(newVal);
    // 왜 자동으로 되고 한번 더 되는거 같지?
}, { deep: true });


const deleteAttraction = (index) => {
    plannedAttractions.value.splice(index, 1);
    console.log("attractionzone deleted")
    // store.setPlannedAttractions(plannedAttractions.value);
};

// watchEffect(() => {
//     // searchAttractionList 값 가져오기
//     searchedAttractions.value = usePlanStore().searchedAttractions;
// });

// watchEffect(() => {
//     plannedAttractions.value = usePlanStore().plannedAttractions;
//     usePlanStore().setplannedAttractions(plannedAttractions.value);
//     console.log(plannedAttractions.value)
// });



</script>

<template>

    <div class="d-flex flex-column">
        <div class="container">
            <div class="row min-vh-100">
                <div class="col-6 flex-grow-1" style="height: 60rem;">
                    <h3>검색 된 장소</h3>
                    <p>드래그로 옮겨 보세요.</p>
                    <draggable class="dragArea list-group custom-border flex-grow-1" :list="searchedAttractions"
                        :group="{ name: 'people', pull: 'clone', put: false }" @change="log" item-key="name">
                        <template #item="{ element }">
                            <div class="list-group-item">
                                <AttractionItem :attraction="element" />
                            </div>
                        </template>
                    </draggable>
                </div>
                <div class="col-6 flex-grow-1" style="height: 60rem;">
                    <h3>계획 장소</h3>
                    <p>아래에 추가 됩니다.</p>
                    <draggable class="dragArea list-group custom-border flex-grow-1" :list="plannedAttractions"
                        :group="{ name: 'people', pull: true, put: true }" @change="log" item-key="name">
                        <template #item="{ element }">
                            <div class="list-group-item">
                                <button @click="deleteAttraction(index)" class="btn btn-danger btn-sm">Delete</button>
                                <AttractionItem :attraction="element" />
                            </div>
                        </template>
                    </draggable>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-border {
    border: 2px solid rgb(174, 167, 167);
    border-radius: 5px;
    padding: 10px;
    overflow-y: auto;
    /* Ensure scroll only if content overflows */
}

/* Hide scrollbar */
.dragArea::-webkit-scrollbar {
    display: none;
}

.dragArea {
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;
    /* IE and Edge */
}

/* Flexbox adjustments */
.flex-grow-1 {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}
</style>