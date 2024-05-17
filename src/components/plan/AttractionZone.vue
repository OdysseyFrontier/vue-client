<script setup>
import { ref, watchEffect } from "vue";
import { usePlanStore } from '@/stores/plan';
import AttractionItem from "@/components/plan/AttractionItem.vue";
import draggable from 'vuedraggable';

const store = usePlanStore();
const searchedAttractions = ref([]);
const plannedAttractions = ref([]);

watchEffect(() => {
    // searchAttractionList 값 가져오기
    console.log(usePlanStore().searchedAttractions);

    if (!usePlanStore().searchedAttractions) {
        return;
    }

    searchedAttractions.value = usePlanStore().searchedAttractions;
});

// watchEffect(() => {
//     console.log(usePlanStore().plannedAttractions);

//     if (!usePlanStore().plannedAttractions) {
//         return;
//     }

//     plannedAttractions.value = usePlanStore().plannedAttractions;
// });

</script>

<template>

    <div class="col-2 bg-light p-3" style="height: 100vh;">
        <div class="row">
            <div>
                <h3>Draggable 1</h3>
                <draggable class="dragArea list-group" :list="searchedAttractions"
                    :group="{ name: 'people', pull: 'clone', put: false }" @change="log" item-key="name">
                    <template #item="{ element }">
                        <div class="list-group-item">
                            <AttractionItem :attraction="element" />
                        </div>
                    </template>
                </draggable>
            </div>
        </div>
    </div>

    <div class="col-2 bg-white p-3" style="height: 100vh;">
        <div class="row">
            <div>
                <h3>Draggable 2</h3>
                <draggable class="dragArea list-group" :list="plannedAttractions" group="people" @change="log"
                    item-key="name">
                    <template #item="{ element }">
                        <div class="list-group-item">
                            <AttractionItem :attraction="element" />
                        </div>
                    </template>
                </draggable>
            </div>
        </div>
    </div>

</template>

<style scoped>
/* Styles here */
</style>
