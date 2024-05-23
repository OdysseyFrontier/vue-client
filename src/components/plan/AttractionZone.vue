<script setup>
import { ref, watch } from "vue";
import { usePlanStore } from '@/stores/plan';
import AttractionItem from "@/components/plan/AttractionItem.vue";
import draggable from 'vuedraggable';

const store = usePlanStore();
const searchedAttractions = ref([]);
// const plannedAttractions = ref([]);
let idNum = 0;

watch(() => usePlanStore().searchedAttractions, (newVal) => {
    idNum = 0
    searchedAttractions.value = newVal;
    console.log("search attraction watch")
}, { immediate: true });

// watch(plannedAttractions.value, (newVal) => {
//     idNum = 0;
//     store.plannedAttractions = newVal;
//     console.log("pinia -> 2")
// }, { deep: true });

// watch(() => store.plannedAttractions, (newVal) => {
//     idNum = 0;
//     console.log("pinia -> 1")
// }, { immediate: true });

watch(store, () => {
    console.log("store.plannedAttractions 바뀜")
    idNum = 0;
    console.log(store.plannedAttractions);
}, { deep: true });

const log = () => {
    console.log("부름 : " + idNum);
    idNum = 0;
    // console.log(index)
    // store.plannedAttractions.splice(index, 1);
};

const deleteAttraction = (index) => {
    idNum = 0
    console.log(index)
    store.plannedAttractions.splice(index, 1);
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
                    <draggable class="dragArea list-group custom-border flex-grow-1" :list="store.plannedAttractions"
                        :group="{ name: 'people', pull: true, put: true }" item-key="item" @change="log" @end="log"
                        @start="log" @remove="log" @update="log">
                        <template #item="{ element }">
                            <div class="list-group-item">
                                <AttractionItem :attraction="element" :index=idNum++
                                    @deleteAttraction="deleteAttraction" />
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