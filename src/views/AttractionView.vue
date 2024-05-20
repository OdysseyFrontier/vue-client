<script setup>
import { useSidebarStore } from "@/stores/sidebar.js";

const sidebarStore = useSidebarStore();
sidebarStore.changesSidebarState("attraction");

import SearchingAttraction from "@/components/attraction/SearchingAttraction.vue";
import AttractionCategory from "@/components/attraction/AttractionCategoryList.vue";
import AttractionList from "@/components/attraction/AttractionList.vue";
import AttractionGoogleMap from "@/components/attraction/AttractionGoogleMap.vue";

</script>

<template class="no-scrollbar">
    <div>
        <br />
        <div>
            <div class="row fixed-top">
                <SearchingAttraction />
            </div>
            <div class="row fixed-top">
                <AttractionCategory />
            </div>
        </div>

        <div class="row h-100" style="height: 60rem;">
            <div class="col scrollable-column flex-grow-1 ">
                <AttractionList />
            </div>
            <div class="col flex-grow-1" style="height: 60rem; ">
                <AttractionGoogleMap />
            </div>
        </div>
        <router-view />
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