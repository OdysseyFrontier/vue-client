<script setup>
import { ref, onMounted } from "vue";
import { getCategorys } from '@/api/attraction';
import AttractionCategoryListItem from "@/components/attraction/AttractionCategoryListItem.vue";

const attractionCategoryList = ref([]);
const scrollIndex = ref(0);
const scrollContainer = ref(null);

const fetchCategorys = () => {
    getCategorys(
        ({ data }) => {
            attractionCategoryList.value = data;
        },
        (error) => {
            console.log(error);
        }
    );
}

onMounted(() => {
    fetchCategorys();
});

const scrollLeft = () => {
    if (scrollIndex.value > 0) {
        scrollIndex.value--;
        scrollContainer.value.scrollTo({
            left: scrollContainer.value.offsetWidth * scrollIndex.value,
            behavior: "smooth"
        });
    }
};

const scrollRight = () => {
    if (scrollIndex.value < 2) {
        scrollIndex.value++;
        scrollContainer.value.scrollTo({
            left: scrollContainer.value.offsetWidth * scrollIndex.value,
            behavior: "smooth"
        });
    }
}
</script>

<template>
    <div class="maphead row m-3">
        <div
            class="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center col-9 position-relative">
            <button @click="scrollLeft"
                class="btn btn-secondary position-absolute start-0 top-50 translate-middle-y">〈</button>
            <div class="d-flex justify-content-center overflow-hidden scroll-container" ref="scrollContainer">
                <div class="text-center d-flex row flex-nowrap">
                    <AttractionCategoryListItem class="col-auto" v-for="(attractionCategory) in attractionCategoryList"
                        :key="attractionCategory.id" :attractionCategory="attractionCategory" />
                </div>
            </div>
            <button @click="scrollRight"
                class="btn btn-secondary position-absolute end-0 top-50 translate-middle-y">〉</button>
        </div>
    </div>
</template>

<style scoped>
.scroll-container {
    overflow-x: auto;
    white-space: nowrap;
}

.maphead .btn {
    z-index: 1; /* 버튼이 다른 요소 위에 표시되도록 z-index를 높입니다 */
}
</style>
