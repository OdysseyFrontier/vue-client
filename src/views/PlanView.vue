<script setup>
import { useSidebarStore } from "@/stores/sidebar.js";

const sidebarStore = useSidebarStore();
sidebarStore.changesSidebarState("plan");

import SearchingBar from "@/components/plan/SearchingBar.vue";
import PlanGoogleMap from "@/components/plan/PlanGoogleMap.vue";
import AttractionZone from "@/components/plan/AttractionZone.vue";
import InputPlanning from "@/components/plan/InputPlanning.vue";
import PlanTimeLineList from "@/components/plan/PlanTimeLineList.vue";
</script>

<template class="flex-grow-1">
    <div class="d-flex flex-column">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 bg-light p-3">
                    <SearchingBar />
                </div>
            </div>
            <div class="row" style="height: 60rem;">
                <div :class="{ 'col-lg-6': true, 'col-12': $mq === 'xl' }" class="bg-white p-6" style="height: 60rem;">
                    <AttractionZone />
                </div>
                <div :class="{ 'col-lg-6': true, 'col-12': $mq === 'xl' }" class="p-3">
                    <div class="bg-white p-3" style="height: 60rem;">
                        <PlanGoogleMap />
                    </div>
                </div>
            </div>
            <div class="row bg-light p-3">
                <InputPlanning />
            </div>
            <div class="row bg-white p-3 flex-grow-1" style="height: 45rem;">
                <PlanTimeLineList />
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 기본적인 미디어 쿼리를 추가하여 더 작은 화면에서 레이아웃을 조정합니다. */
@media (max-width: 768px) {
    .row {
        flex-direction: column;
    }
    .col-12, .col-lg-6 {
        height: auto; /* 높이 자동 조정 */
    }
}

.bg-light {
    background-color: #f8f9fa !important;
}

.bg-white {
    background-color: #ffffff !important;
}

.flex-grow-1 {
    overflow-y: auto; /* 스크롤이 내부에서 발생하도록 설정 */
    height: 100%; /* 전체 높이를 부모에 맞춤 */
}

/* 스크롤이 필요한 영역에 대해 스크롤바 표시 설정 */
.flex-grow-1 {
    overflow-y: scroll;
}
</style>
