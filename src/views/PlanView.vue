<script setup>
import { useSidebarStore } from "@/stores/sidebar.js";

const sidebarStore = useSidebarStore();
sidebarStore.changesSidebarState("plan");

import SearchingBar from "@/components/plan/SearchingBar.vue";

import PlanningAttractionList from "@/components/plan/PlanningAttractionList.vue";
import SearchedAttractionList from "@/components/plan/SearchedAttractionList.vue";
import AttractionGoogleMap from "@/components/attraction/AttractionGoogleMap.vue";
import AttractionZone from "@/components/plan/AttractionZone.vue";

import InputPlanning from "@/components/plan/InputPlanning.vue";
import PlanTimeLine from "@/components/plan/PlanTimeLine.vue";
</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 bg-light p-3">
                <SearchingBar />
            </div>
        </div>
        <div class="row">

            <div class="col-4 bg-white p-6" style="height: 100vh;">
                <AttractionZone />
            </div>

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


<!-- <template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 bg-light p-3">
                <SearchingBar />
            </div>
        </div>
        <div class="row">
            <div class="col-2 bg-white p-3" style="height: 100vh;">
                <SearchedAttractionList />
            </div>
            <div class="col-2 bg-light p-3" style="height: 100vh;">
                <PlanningAttractionList />
            </div>
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
</template> -->


<style scoped>
/* 필요한 추가 스타일링이 있다면 여기에 작성합니다. */
.bg-light {
    background-color: #f8f9fa !important;
}

.bg-white {
    background-color: #ffffff !important;
}
</style>