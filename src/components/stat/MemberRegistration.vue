<template>
  <div class="card shadow-sm">
    <div class="card-header text-white bg-success">
      <span><i class="fas fa-user-plus"></i> 회원 가입 추이</span>
      <span class="badge badge-light">{{ registrationStatsData.length }}</span>
    </div>
    <div class="card-body">
      <canvas id="lineChart"></canvas>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
import axios from "axios";

export default {
  setup() {
    const registrationStatsData = ref([
      { registration_date: "2024-02-02", member_count: 100 },
      { registration_date: "2024-02-22", member_count: 4 },
      { registration_date: "2024-12-02", member_count: 26 },
      { registration_date: "2024-11-02", member_count: 26 },
    ]);

    onMounted(async () => {
      // const response = await axios.get("/api/members/registration-stats");
      // registrationStatsData.value = response.data;

      new Chart(document.getElementById("lineChart"), {
        type: "line",
        data: {
          labels: registrationStatsData.value.map(
            (item) => item.registration_date
          ),
          datasets: [
            {
              label: "회원 가입 수",
              data: registrationStatsData.value.map(
                (item) => item.member_count
              ),
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderColor: "rgba(153, 102, 255, 1)",
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
      registrationStatsData,
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
