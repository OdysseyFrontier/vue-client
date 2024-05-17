<script setup>
import { ref, watchEffect } from "vue"
import SearchedAttractionListItem from "@/components/plan/SearchedAttractionListItem.vue";

import { draggable } from 'vuedraggable';
// import { draggable } from 'vue-draggable-next';

import { usePlanStore } from '@/stores/plan';

const store = usePlanStore();

const searchAttractionList = ref([]);

//  1213
watchEffect(() => {    // searchAttractionList 값 가져오기
    console.log(usePlanStore().searchAttractionList);
    // searchAttractionList가 비어 있는 경우 처리
    if (!usePlanStore().searchAttractionList) {
        return;
    }
    console.log(usePlanStore().searchAttractionList);
    searchAttractionList.value = usePlanStore().searchAttractionList;
});


const onDragEnd = (event) => {
    const attraction = event.item._underlying_vm_.attraction;
    store.addAttractionToPlan(attraction);
    store.searchAttractionList = store.searchAttractionList.filter(attr => attr.id !== attraction.id);
};

</script>

<template>
    <h3>검색 된 장소!!!</h3>
    <p>원하는 장소를 검색하세요</p>
    <div>
        <draggable v-model="searchAttractionList" group="search" @end="onDragEnd">
            <!-- <AttractionListItem v-for="(attraction, index) in searchAttractionList" 
            :key="index" :attraction="element"
                #item="{ element }" /> -->


            <template #item="{ element }">
                <SearchedAttractionListItem :attraction="element" />
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