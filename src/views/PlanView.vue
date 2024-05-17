<script setup>
import { useSidebarStore } from "@/stores/sidebar.js";

const sidebarStore = useSidebarStore();
sidebarStore.changesSidebarState("plan");

import SearchedAttractionList from "@/components/plan/SearchedAttractionList.vue";
import InputPlanning from "@/components/plan/InputPlanning.vue";
import PlanningAttraction from "@/components/plan/PlanningAttraction.vue";
import PlanTimeLine from "@/components/plan/PlanTimeLine.vue";
import AttractionGoogleMap from "@/components/attraction/AttractionGoogleMap.vue";
 
</script>

<template class="no-scrollbar">
    <br />
    <div class="row">
        <div class="col-3">
            <SearchedAttractionList />
        </div>
        <div class="col-3">
            <PlanningAttraction />
        </div>
        <div class="col">
            <AttractionGoogleMap/>
        </div>
    </div>
    <div class="row">
        <InputPlanning />
    </div>
    <div class="col">
        <PlanTimeLine />
    </div>
</template>
<style scoped>
/* 추가된 CSS */
.fixed-top {
    position: fixed;
    z-index: 1000;
    /* 다른 내용 위에 고정되도록 z-index 설정 */
    background-color: white;
    /* 배경색 지정 */
}

.scrollable-column {
    overflow-y: auto;
    /* 세로 스크롤 적용 */
    max-height: 1000px;
    /* 최대 높이 설정 (화면 높이에서 다른 요소들의 높이 제외) */
}
</style>