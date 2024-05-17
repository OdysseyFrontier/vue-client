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

</script>

<template>
    <div class="row">
        <div class="">
            <h3>Draggable 1</h3>
            <draggable class="dragArea list-group" :list="searchedAttractions"
                :group="{ name: 'people', pull: 'clone', put: false }" @change="log" item-key="name">
                <template #item="{ element }">
                    <div class="list-group-item">
                        {{ element.title }}
                    </div>
                </template>
            </draggable>
        </div>


        <!-- <AttractionItem v-for="(attraction, index) in searchedAttractions" 
                :key="index" :attraction="attraction" /> -->

    </div>

    <h3>Draggable 2</h3>
    <draggable class="dragArea list-group" :list="plannedAttractions" group="people" @change="log" item-key="name">
        <template #item="{ element }">
            <div class="list-group-item">
                {{ element }}
            </div>
        </template>
    </draggable>
</template>

<!-- <template>
    <h3>Draggable 2</h3>
    <draggable class="dragArea list-group" :list="plannedAttractions" group="people" @change="log" item-key="name">
        <template #item="{ element }">
            <div class="list-group-item">
                {{ element }}
            </div>
        </template>
    </draggable>
</template> -->
<style scoped>
/* Styles here */
</style>
