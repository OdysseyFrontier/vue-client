<script setup>
import { defineProps } from 'vue';

defineProps({
    attraction: Object,
    index: Number
});

// const defaultAttractionImg = "src/assets/attraction/defaultAttractionImg.png";

const truncateDescription = (description) => {
    const maxLength = 35; // 최대 길이 설정
    if (!description) return "등록된 설명이 없습니다."
    if (description.length > maxLength) {
        return description.slice(0, maxLength) + '...';
    } else {
        return description;
    }
};

// const defalutImg = "https://a0.muscache.com/im/pictures/miso/Hosting-1050570021780851760/original/d2fdb32c-56d4-4947-b8f6-705ff5e6cc08.jpeg?im_w=720";

// const emit = defineEmits(['addCart']);

// const addToCart = () => {
// emit('addCart');
// }

</script>

<template>
    <div class="list-group-item">
        {{ attraction.title }}
        <br />
        {{ attraction.addr1 }}
    </div>
</template>

<style scoped>
/* .list-group-item {
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 5px;
    background-color: #fff;
} */
</style>