<script setup>
import { ref, watchEffect } from "vue";
import { usePlanStore } from '@/stores/plan';
import AttractionItem from "@/components/plan/AttractionItem.vue";

const store = usePlanStore();
const plannedAttractions = ref([]);

watchEffect(() => {
    console.log(usePlanStore().plannedAttractions);

    if (!usePlanStore().plannedAttractions) {
        return;
    }

    plannedAttractions.value = usePlanStore().plannedAttractions;
});


</script>
<template>
    <h3>Draggable 2</h3>
    <draggable class="dragArea list-group" :list="plannedAttractions" group="people" @change="log" item-key="name">
        <template #item="{ element }">
            <div class="list-group-item">
                {{ element }}
            </div>
        </template>
    </draggable>
</template>

<!-- <AttractionItem v-for="(attraction, index) in plannedAttractions" :key="index" :attraction="attraction" /> -->

<style scoped>
/* Styles here */
</style>
