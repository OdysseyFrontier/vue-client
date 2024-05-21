<template>
  <div class="card shadow-sm">
    <div class="card-header text-white bg-danger">
      <span><i class="fas fa-clock"></i> 시간대별 활동</span>
      <span class="badge badge-light">{{ activityByTimeData.length }}</span>
    </div>
    <div class="card-body">
      <canvas id="lineChartTime"></canvas>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
import { time } from "@/api/stat";
import { httpStatusCode } from "@/util/http-status";

export default {
  setup() {
    const activityByTimeData = ref([]);

    //  { time_slot: 2, activity_count: 4 },
    // { time_slot: 4, activity_count: 40 },
    // { time_slot: 6, activity_count: 24 },
    // { time_slot: 7, activity_count: 35 },
    // { time_slot: 10, activity_count: 6 },
    // { time_slot: 12, activity_count: 50 },

    onMounted(async () => {
      // const response = await axios.get("/api/stat/time");
      // activityByTimeData.value = response.data;
      await time(
        (response) => {
          if (response.status === httpStatusCode.OK) {
            activityByTimeData.value = response.data;
          } else {
            console.error("통계 없음!!!!");
          }
        },
        (error) => {
          console.log(error);
        }
      );

      new Chart(document.getElementById("lineChartTime"), {
        type: "line",
        data: {
          labels: activityByTimeData.value.map((item) => item.time_slot),
          datasets: [
            {
              label: "활동 수",
              data: activityByTimeData.value.map((item) => item.activity_count),
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
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
      activityByTimeData,
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
