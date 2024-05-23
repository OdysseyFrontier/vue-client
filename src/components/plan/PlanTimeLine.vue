<template>
    <div class="timeline-item" :class="{ 'left': isLeft, 'right': !isLeft }">
        <img :src="attraction.firstImage || defaultImg" alt="Attraction Image" class="timeline-image">
        <div class="content">
            <h3>{{ attraction.title }}</h3>
            <p>{{ attraction.addr1 }}</p>
            <input type="datetime-local" class="form-control mb-2" v-model="attractionPlanTime"
                @change="updateAttraction" />
            <textarea placeholder="간단메모..." class="form-control mb-2 custom-textarea" v-model="attractionDescription"
                @input="updateAttraction"></textarea>
            <button class="btn btn-danger w-100" @click="deleteAttraction">삭제하기</button>
        </div>
    </div>
</template>

<script setup>
import { usePlanStore } from '@/stores/plan';
const store = usePlanStore();



import { ref, watchEffect, onMounted } from 'vue';

const defaultImg = "src/assets/attraction/defaultAttractionImg.png";

const props = defineProps({
    attraction: Object,
    isLeft: Boolean,
    index: Number,
});

const emits = defineEmits(['update', 'delete']);

const attractionPlanTime = ref('');
const attractionDescription = ref('');


watchEffect(() => {
    console.log("line watch description")
    attractionDescription.value = props.attraction.description;
});

watchEffect(() => {
    console.log("line watch planTime")
    attractionPlanTime.value = props.attraction.planTime;
});

const updateAttraction = () => {
    console.log(props.index)
    console.log(props.attraction)
    console.log("--------------------------------")

    const updatedAttraction = JSON.parse(JSON.stringify(props.attraction));
    updatedAttraction.planTime = attractionPlanTime.value;
    updatedAttraction.description = attractionDescription.value;
    emits('update', {
        // ...props.attraction,
        // planTime: attractionPlanTime.value,
        ...updatedAttraction,
        index: props.index,
    });

    attractionPlanTime.value = ""
    // props.attraction.description = ""
    // attraction.description = " "
};

onMounted(() => {
    attractionPlanTime.value = props.attraction.planTime;
    attractionDescription.value = props.attraction.description;
})
const deleteAttraction = () => {
    console.log("delete")
    emits('delete', props.index);
};
</script>

<style scoped>
.timeline-item {
    display: flex;
    flex-direction: row;
    /* Align items in a row */
    align-items: flex-start;
    margin-bottom: 1rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 15px;
    background: #fff;
}

.timeline-image {
    width: 45%;
    height: auto;
    border-radius: 15px;
    margin-right: 20px;
    /* Add margin to the right to separate the image from the content */
}

.content {
    width: 55%;
    /* Adjust the width to accommodate the image */
}

.custom-textarea {
    min-height: 10rem;
    /* Set the minimum height for the textarea */
}

h3 {
    margin-top: 0;
}

@media (max-width: 1200px) {
    .timeline-item {
        flex-direction: column;
        /* Stack items vertically on smaller screens */
        align-items: center;
    }

    .timeline-image {
        width: 100%;
        /* Full width on smaller screens */
        margin-right: 0;
        margin-bottom: 10px;
    }

    .content {
        width: 100%;
        /* Full width on smaller screens */
        text-align: center;
    }
}
</style>
