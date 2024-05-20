<script setup>
import { ref, watchEffect } from "vue"
import AttractionListItem from "@/components/attraction/AttractionListItem.vue";

import { useAttractionStore } from '@/stores/attraction';

let store = useAttractionStore();

const attractionList = ref([])

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
    <ul class="row flex-grow-1">
        <AttractionListItem class="col-sm-12 col-xl-6 col-xxl-4" v-for="(attraction, index) in attractionList"
            :key="index" :attraction="attraction" />
    </ul>
</template>

<style scoped>
/* Chrome, Safari, Opera */
.flex-grow-1::-webkit-scrollbar {
    display: none;
    /* 스크롤바 영역을 숨김 */
}

/* Firefox */
.flex-grow-1 {
    scrollbar-width: none;
    /* Firefox에서 스크롤바를 숨김 */
}

/* IE, Edge */
.flex-grow-1 {
    -ms-overflow-style: none;
    /* IE와 Edge에서 스크롤바를 숨김 */
}
</style>