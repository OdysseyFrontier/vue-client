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
            <div class="row">
                <div :class="{ 'col-lg-6': true, 'col-12': $mq === 'xl' }" class="bg-white p-6">
                    <AttractionZone />
                </div>
                <div :class="{ 'col-lg-6': true, 'col-12': $mq === 'xl' }" class="p-3">
                    <div class="bg-white p-3" style="height: 45rem;">
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
/* 필요한 추가 스타일링이 있다면 여기에 작성합니다. */
.bg-light {
    background-color: #f8f9fa !important;
}

.bg-white {
    background-color: #ffffff !important;
}

.flex-grow-1 {
    overflow-y: auto;
    /* 스크롤이 내부에서 발생하도록 설정 */
}
</style>