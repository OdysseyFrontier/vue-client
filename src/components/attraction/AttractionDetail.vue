<template>
    <div class="container mt-4" v-if="attraction">
        <div class="card">
            <div class="position-relative">
                <img :src="currentImage" class="card-img-top" alt="Attraction Image">
                <button @click="prevImage" class="btn btn-primary position-absolute start-0 top-50">‹</button>
                <button @click="nextImage" class="btn btn-primary position-absolute end-0 top-50">›</button>
            </div>
            <div class="card-body">
                <h5 class="card-title">{{ attraction.title }}</h5>
                <p class="card-text">{{ attraction.addr1 }} {{ attraction.addr2 }}</p>
                <p class="card-text">{{ attraction.zipcode }}</p>
                <p class="card-text">{{ attraction.tel }}</p>
                <p class="card-text">Read Count: {{ attraction.readCount }}</p>
                <p class="card-text"> {{ attraction.description }}</p>
                <!-- <p class="card-text">Sido: {{ attraction.sidoName }}</p>
          <p class="card-text">Gugun: {{ attraction.gugunName }}</p> -->
            </div>
        </div>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getAttraction } from '@/api/attraction';

const attraction = ref({});
// const currentImage = ref();
// const nextImage = ref();
// const prevImage = ref();

export default {
    name: 'AttractionDetail',
    setup() {
        const router = useRouter();
        const currentImageIndex = ref(0);
        const images = ref([]);

        const currentImage = computed(() =>
            images.value[currentImageIndex.value]
        );
        console.log(currentImage)

        const prevImage = () => {
            currentImageIndex.value = (currentImageIndex.value - 1 + images.value.length) % images.value.length;
        };

        const nextImage = () => {
            currentImageIndex.value = (currentImageIndex.value + 1) % images.value.length;
        };

        console.log("detail")

        onMounted(async () => {
            const contentId = router.currentRoute.value.params.contentId;
            await getAttraction(contentId, (response) => {
                attraction.value = response.data;
                console.log(attraction.value);
                images.value = [response.data.firstImage, response.data.firstImage2].filter(Boolean);
            }, (error) => {
                console.error('Failed to fetch attraction', error);
            });
        });

        console.log(images);
        return {
            attraction,
            currentImage,
            nextImage,
            prevImage,
        };
    }
};
</script>

<style scoped>
.card {
    max-width: 600px;
    margin: auto;
}
</style>