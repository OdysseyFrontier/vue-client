<script setup>
import { ref, onMounted } from "vue"
import { getCategorys } from '@/api/attraction';

import AttractionCategoryListItem from "@/components/attraction/AttractionCategoryListItem.vue";

const attractionCategoryList = ref([]);

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
    console.log(attractionCategoryList.value);
});

</script>

<template>
    <div class="maphead row m-3">
        <div class="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center col-9">
            <div class="d-flex justify-content-center">
                <div class="text-center row">
                    <AttractionCategoryListItem class="col" v-for="(attractionCategory) in attractionCategoryList"
                        :key="attractionCategory.id" :attractionCategory="attractionCategory" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>