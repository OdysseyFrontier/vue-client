<template>
    <div class="container mt-4" v-if="attraction">
      <div class="card">
        <img :src="attraction.firstImage" class="card-img-top" alt="Attraction Image">
        <div class="card-body">
          <h5 class="card-title">{{ attraction.title }}</h5>
          <p class="card-text">{{ attraction.addr1 }} {{ attraction.addr2 }}</p>
          <p class="card-text">{{ attraction.zipcode }}</p>
          <p class="card-text">{{ attraction.tel }}</p>
          <p class="card-text">Read Count: {{ attraction.readCount }}</p>
          <p class="card-text">Location: {{ attraction.latitude }}, {{ attraction.longitude }}</p>
          <p class="card-text">Sido Code: {{ attraction.sidoName }}</p>
          <p class="card-text">Gugun Code: {{ attraction.gugunCode }}</p>
          <p class="card-text">Scrap: {{ attraction.isScrap ? 'Yes' : 'No' }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </template>
  
  <script>
  import { useAttractionStore } from '@/stores/attraction';
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { getAttraction } from '@/api/attraction';

  const attraction = ref({});

  export default {
    name: 'AttractionDetail',
    setup() {
      const router = useRouter();
  
      onMounted(async () => {
        const contentId = router.currentRoute.value.params.contentId;
        await getAttraction(contentId, (response) => {
          attraction.value = response.data;
          console.log(attraction.value);
        }, (error) => {
          console.error('Failed to fetch attraction', error);
        });
      });
  
      return { attraction };
    }
  };
  </script>
  
  <style scoped>
  .card {
    max-width: 600px;
    margin: auto;
  }
  </style>
  