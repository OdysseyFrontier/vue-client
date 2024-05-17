<script setup>
defineProps({
    attraction: Object,
});


const truncateDescription = (description) => {
    const maxLength = 10; // 최대 길이 설정
    if (!description) return "등록된 설명이 없습니다."
    if (description.length > maxLength) {
        return description.slice(0, maxLength) + '...';
    } else {
        return description;
    }
};

// const deleteItem = () => {
//     emits('deleteAttraction', props.index);
// };

// const defalutImg = "https://a0.muscache.com/im/pictures/miso/Hosting-1050570021780851760/original/d2fdb32c-56d4-4947-b8f6-705ff5e6cc08.jpeg?im_w=720";


</script>

<template>
    <!-- <button @click="deleteItem" class="btn btn-danger btn-sm">Delete</button> -->

    {{ attraction.title }}
    <br />
    {{ attraction.addr1 }}

</template>

<style scoped>
/* .list-group-item {
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 5px;
    background-color: #fff;
} */
</style>