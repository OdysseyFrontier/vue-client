<script setup>
// defineProps는 자동으로 사용할 수 있으므로 임포트 문을 제거합니다.
const props = defineProps({
    attraction: Object,
});

</script>

<template>
    <div class="timeline">
        <div class="timeline-item">
            <div class="timeline-content">
                <h3>{{ props.attraction.title }}</h3>
                <p>{{ props.attraction.addr1 }}</p>
                <p>{{ props.attraction.description }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.timeline {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}

.timeline-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px 0;
    width: 80%;
    border-radius: 5px;
    background-color: #f9f9f9;
}

.timeline-content h3 {
    margin: 0 0 10px 0;
    font-size: 1.2em;
}

.timeline-content p {
    margin: 0 0 10px 0;
}
</style>