<script setup>

import SearchAttraction from "@/components/attraction/SearchingAttraction.vue";
import AttractionCategory from "@/components/attraction/AttractionCategory.vue";
import AttractionGoogleMap from "@/components/attraction/AttractionGoogleMap.vue";

</script>


<template>
    <div class="container text-center mt-3">
        <div class="alert alert-info" role="alert">관광지를 찾아보세요!</div>
        <SearchAttraction />
        <AttractionCategory />
        <AttractionGoogleMap />
        <router-view />
    </div>
</template>
<style scoped></style>