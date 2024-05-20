<template>
  <div>
    <canvas id="barChart"></canvas>
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
      new Chart(document.getElementById("barChart"), {
        type: "bar",
        data: {
          labels: props.data.map((item) => item.title),
          datasets: [
            {
              label: "조회 수",
              data: props.data.map((item) => item.hit_count),
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
  },
};
</script>
