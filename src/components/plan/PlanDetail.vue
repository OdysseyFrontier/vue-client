<script setup>
import { onMounted } from 'vue';

import { useSidebarStore } from "@/stores/sidebar.js";

const sidebarStore = useSidebarStore();
sidebarStore.changesSidebarState("attraction");
sidebarStore.open = false;

import PlanDetailInfo from "@/components/plan/PlanDetailInfo.vue";
import PlanDetailGoogleMap from "@/components/plan/PlanDetailGoogleMap.vue";

</script>

<template class="no-scrollbar ">
    <div class="row mt-3">
        <br />
        <div class="row h-100" style="height: 60rem;">
            <div class="col-5 scrollable-column flex-grow-1 ">
                <PlanDetailGoogleMap />
            </div>
            <div class="col-7 flex-grow-1" style="height: 60rem; ">
                <PlanDetailInfo />
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 추가된 CSS */
.fixed-top {
    position: sticky;
    top: 0;
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