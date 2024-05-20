<template>
  <div class="card shadow-sm">
    <div class="card-header text-white bg-info">
      <span><i class="fas fa-star"></i> 인기 관광지</span>
      <span class="badge badge-light">{{ popularAttractionsData.length }}</span>
    </div>
    <div class="card-body">
      <canvas id="barChart"></canvas>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
import axios from "axios";

export default {
  setup() {
    const popularAttractionsData = ref([
      { title: "제목", hit_count: 5 },
      { title: "제목2", hit_count: 35 },
      { title: "제목3", hit_count: 25 },
      { title: "제목4", hit_count: 15 },
      { title: "제목5", hit_count: 5 },
      { title: "제목6", hit_count: 25 },
      { title: "제목7", hit_count: 70 },
    ]);

    onMounted(async () => {
      // const response = await axios.get("/api/attractions/popular");
      // popularAttractionsData.value = response.data;

      new Chart(document.getElementById("barChart"), {
        type: "bar",
        data: {
          labels: popularAttractionsData.value.map((item) => item.title),
          datasets: [
            {
              label: "조회 수",
              data: popularAttractionsData.value.map((item) => item.hit_count),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });

    return {
      popularAttractionsData,
    };
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 20px;
  border: none;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.card-body {
  padding: 20px;
}
</style>
