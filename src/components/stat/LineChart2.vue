<template>
  <div>
    <canvas id="lineChart"></canvas>
  </div>
</template>

<script>
import { onMounted } from "vue";
import Chart from "chart.js/auto";

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    onMounted(() => {
      new Chart(document.getElementById("lineChart"), {
        type: "line",
        data: {
          labels: props.data.map((item) => item.registration_date),
          datasets: [
            {
              label: "회원 가입 수",
              data: props.data.map((item) => item.member_count),
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
  },
};
</script>
