<script setup>
import { ref, watchEffect } from "vue"
import AttractionListItem from "@/components/attraction/AttractionListItem.vue";

import { useAttractionStore } from '@/stores/attraction';

let store = useAttractionStore();

const attractionList = ref([])
//  1213
watchEffect(() => {
    // searchAttractionList 값 가져오기
    console.log(useAttractionStore().searchAttractionList);
    // searchAttractionList가 비어 있는 경우 처리
    if (!useAttractionStore().searchAttractionList) {
        return;
    }

    attractionList.value = useAttractionStore().searchAttractionList;
});

</script>

<template>
    <ul class="row">
        <AttractionListItem class="col-sm-12 col-xl-6 col-xxl-4" v-for="(attraction, index) in attractionList"
            :key="index" :attraction="attraction" />
    </ul>
</template>

<style scoped></style>