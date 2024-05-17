<script setup>
import { defineProps } from 'vue';

defineProps({
    attraction: Object
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
<!-- <div class="card">
        <div class="row rounded slist">
            <div role="group" class="input-group">
                <div class="input-group-prepend"><img variant="outline-secondary"
                        src="/trip_api//assets/images/map/marker/marker_12_color_round.png"
                        class="pt-1 pr-1 mx-auto d-block" style="width: 30px; height: 30px;"></div>
                        <input type="text" readonly="readonly" class="text-primary form-control" id="__BVID__454" style="border: 0px;">

                <div class="input-group-append"><button type="button" class="btn btn-outline-danger"
                        style="border: 0px;">
                        
                        <svg aria-hidden="true" focusable="false" data-prefix="fas"
                            data-icon="thumbtack" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
                            class="svg-inline--fa fa-thumbtack">
                            <path fill="currentColor"
                                d="M32 32C32 14.3 46.3 0 64 0H320c17.7 0 32 14.3 32 32s-14.3 32-32 32H290.5l11.4 148.2c36.7 19.9 65.7 53.2 79.5 94.7l1 3c3.3 9.8 1.6 20.5-4.4 28.8s-15.7 13.3-26 13.3H32c-10.3 0-19.9-4.9-26-13.3s-7.7-19.1-4.4-28.8l1-3c13.8-41.5 42.8-74.8 79.5-94.7L93.5 64H64C46.3 64 32 49.7 32 32zM160 384h64v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V384z"
                                class=""></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="m-1 p-1">{{ attraction.addr1 }} </div>
        </div>
    </div> -->

<style scoped>
.list-group-item {
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 5px;
    background-color: #fff;
}
</style>