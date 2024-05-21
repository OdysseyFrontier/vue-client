<template>
  <div class="card shadow-sm">
    <div class="card-header text-white bg-warning">
      <span><i class="fas fa-map-marked-alt"></i> 지역별 관광지 수</span>
      <span class="badge badge-light">{{
        regionAttractionCountData.length
      }}</span>
    </div>
    <div class="card-body">
      <canvas id="barChartRegion"></canvas>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

import { reginonCount } from "@/api/stat";
import { httpStatusCode } from "@/util/http-status"

export default {
  setup() {
    const regionAttractionCountData = ref([]);

    // { sido_name: "안녕", gugun_name: "서구", attraction_count: 5 },
    //   { sido_name: "안녕\ㅇ", gugun_name: "달서구", attraction_count: 10 },

    onMounted(async () => {
      await reginonCount(
      (response) => {
        if (response.status === httpStatusCode.OK) {
          regionAttractionCountData.value = response.data;
        } else {
          console.error("통계 없음!!!!")
        }
      },
      (error) => {
        console.log(error)
      }
    )

      new Chart(document.getElementById("barChartRegion"), {
        type: "bar",
        data: {
          labels: regionAttractionCountData.value.map(
            (item) => `${item.sido_name} ${item.gugun_name}`
          ),
          datasets: [
            {
              label: "관광지 수",
              data: regionAttractionCountData.value.map(
                (item) => item.attraction_count
              ),
              backgroundColor: "rgba(255, 206, 86, 0.2)",
              borderColor: "rgba(255, 206, 86, 1)",
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
      regionAttractionCountData,
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
