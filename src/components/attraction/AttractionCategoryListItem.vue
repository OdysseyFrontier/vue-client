<script setup>
import { defineProps } from 'vue';
import { useAttractionStore } from '@/stores/attraction';
import { getSearchCategory } from '@/api/attraction';


const props = defineProps({
    attractionCategory: String
});

const store = useAttractionStore();

const searchCategory = () => {
    getSearchCategory(
        props.attractionCategory.code,
        ({ data }) => {
            store.setSearchAttractionList(data);
        },
        (error) => {
            console.log(error);
        }
    );
}

// const defalutImg = "https://a0.muscache.com/im/pictures/miso/Hosting-1050570021780851760/original/d2fdb32c-56d4-4947-b8f6-705ff5e6cc08.jpeg?im_w=720";

// const emit = defineEmits(['addCart']);

// const addToCart = () => {
// emit('addCart');
// }

</script>

<template>
    <div class="card">
        <!-- <img :src="attractionCategory.firstImage || defaultAttractionImg" class=" card-img-top" alt="..."> -->
        <!-- 좋아요 위치 -->
        <label :for="attractionCategory.code"></label>
        <button @click="searchCategory" :id="attractionCategory.code" class="btn btn-primary">
            {{ attractionCategory.name }} 검색
        </button>
    </div>
</template>
