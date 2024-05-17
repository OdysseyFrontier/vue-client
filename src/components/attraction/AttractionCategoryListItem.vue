<script setup>
import { defineProps } from 'vue';
import { useAttractionStore } from '@/stores/attraction';
import { getSearchCategory } from '@/api/attraction';


const props = defineProps({
    attractionCategory: Object
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

    <button @click="searchCategory" :id="attractionCategory.code" class="btn btn-primary mx-1">
        {{ attractionCategory.name }}
    </button>
</template>

<style scoped>
/* @media screen and (max-width:1023px) {
	button{
		font-size:12px;
	}

	select {padding: 0 2rem 0 0.8rem;}

	.ml10 {margin-left: 0.7rem !important;}

}
@media screen and (max-width:720px) {
	button{
		font-size:15px;
	}
}

@media screen and (max-width:580px) {
	button {
		font-size:15px;
	}
} */
</style>