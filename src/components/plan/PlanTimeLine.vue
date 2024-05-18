<template>
    <div class="timeline-item" :class="{ 'left': isLeft, 'right': !isLeft }">
        <img :src="attraction.firstImage || defaultImg" alt="Attraction Image" class="timeline-image">
        <div class="content">
            <h3>{{ attraction.title }}</h3>
            <p>{{ attraction.addr1 }}</p>
            <textarea placeholder="간단메모..."></textarea>
        </div>
    </div>
</template>

<script setup>
  const defaultImg = "src/assets/attraction/defaultAttractionImg.png";

defineProps({
    attraction: Object,
    isLeft: Boolean
});
</script>

<style scoped>
.timeline-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1rem;
    padding: 1rem;
    border: 1px solid #ccc;
    background: #fff;
}

.timeline-image {
    width: 15rem;
    height: auto;
    margin-right: 10px;
}

.content {
    padding: 1rem;
}

h3 {
    margin-top: 0;
}

.left {
    /* justify-content: flex-end; */
}

.right {
    /* justify-content: flex-start; */
}
</style>