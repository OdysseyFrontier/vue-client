<script setup>
import { ref } from 'vue';
import { usePlanStore } from '@/stores/plan';

import { draggable } from 'vuedraggable';
// import { draggable } from 'vue-draggable-next';

const store = usePlanStore();
const planAttractionList = ref(store.planAttractionList);

const onDragEnd = (event) => {
    const attraction = event.item;
    store.removeAttractionFromPlan(attraction.id);
    store.searchAttractionList.push(attraction);
};
</script>

<template>
    <div>
        <h3>나의 여행 코스!!!</h3>
        <p>원하는 장소를 드래그앤 드롭으로 추가하세요</p>
        <draggable v-model="planAttractionList" group="search" @end="onDragEnd">
            <template #item="{ element }">
                <div class="list-group-item">
                    <button @click="removeAttraction(element.id)">삭제</button>
                    {{ element.title }}
                    <br />
                    {{ element.addr1 }}
                    <hr v-if="element !== planAttractionList[planAttractionList.length - 1]" />
                </div>
            </template>
        </draggable>
    </div>
</template>

<style scoped>
.list-group-item {
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 5px;
    background-color: #fff;
}
</style>