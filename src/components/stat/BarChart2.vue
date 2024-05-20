<template>
  <div>
    <canvas id="barChartRegion"></canvas>
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
      new Chart(document.getElementById("barChartRegion"), {
        type: "bar",
        data: {
          labels: props.data.map(
            (item) => `${item.sido_name} ${item.gugun_name}`
          ),
          datasets: [
            {
              label: "관광지 수",
              data: props.data.map((item) => item.attraction_count),
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
  },
};
</script>
