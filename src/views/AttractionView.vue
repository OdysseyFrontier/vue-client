<script setup>
// import { useSidebarStore } from "@/stores/sidebar.js";

// const sidebarStore = useSidebarStore();
// sidebarStore.changesSidebarState("attraction");

import SearchAttraction from "@/components/attraction/SearchingAttraction.vue";
import AttractionCategory from "@/components/attraction/AttractionCategoryList.vue";
import AttractionList from "@/components/attraction/AttractionList.vue";
import AttractionGoogleMap from "@/components/attraction/AttractionGoogleMap.vue";

</script>

<template>
    <br />
    <div>
        <div class="row fixed-top">
            <!-- Column 1 -->
            <SearchAttraction />
        </div>
        <!-- Column 2 -->
        <div class="row fixed-top">
            <AttractionCategory />
        </div>
    </div>
    <!-- Row 2 -->
    <div class="row">
        <!-- Column 1 -->
        <div class="col scrollable-column">
            <AttractionList />
        </div>
        <!-- Column 2 -->
        <div class="col">
            <AttractionGoogleMap />
        </div>
    </div>
    <router-view />
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
    max-height: calc(100vh - 200px);
    /* 최대 높이 설정 (화면 높이에서 다른 요소들의 높이 제외) */
}
</style>