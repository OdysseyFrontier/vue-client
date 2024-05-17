<script setup>
// 필요한 Vue 설정이나 데이터가 있다면 여기에 작성합니다.
// import { useSidebarStore } from "@/stores/sidebar.js";

// const sidebarStore = useSidebarStore();
// sidebarStore.changesSidebarState("attraction");

import SearchedAttractionList from "@/components/plan/SearchedAttractionList.vue";
import InputPlanning from "@/components/plan/InputPlanning.vue";
import PlanningAttraction from "@/components/plan/PlanningAttraction.vue";
import PlanTimeLine from "@/components/plan/PlanTimeLine.vue";
import AttractionGoogleMap from "@/components/attraction/AttractionGoogleMap.vue";
import SearchingBar from "@/components/plan/SearchingBar.vue";
</script>


<template>
    <div class="container-fluid">
        <!-- 상단 검색 영역 -->
        <div class="row">
            <div class="col-12 bg-light p-3">
                <SearchingBar />
            </div>
        </div>
        <div class="row">
            <!-- 좌측 계획 입력 영역 -->
            <div class="col-2 bg-white p-3" style="height: 100vh;">
                <SearchedAttractionList />
            </div>
            <!-- 중간 타임라인 영역 -->
            <div class="col-2 bg-light p-3" style="height: 100vh;">
                <PlanningAttraction />
            </div>
            <!-- 지도 및 하단 계획 입력 수신 영역 -->
            <div class="col-8 p-3">
                <div class="bg-white p-3" style="height: 70vh;">
                    <AttractionGoogleMap />
                </div>
                <div class="bg-light p-3" style="height: 10vh;">
                    <InputPlanning />
                </div>
                <div class="bg-white p-3" style="height: 20vh;">
                    <PlanTimeLine />
                </div>
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
</style>