<template>
  <div>
    <canvas id="lineChartActivity"></canvas>
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
      new Chart(document.getElementById("lineChartActivity"), {
        type: "line",
        data: {
          labels: props.data.map((item) => `${item.activity_hour}시`),
          datasets: [
            {
              label: "활동 수",
              data: props.data.map((item) => item.activity_count),
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
  },
};
</script>
