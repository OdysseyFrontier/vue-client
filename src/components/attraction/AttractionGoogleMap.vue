<script setup>

import { GoogleMap } from 'vue3-google-map'

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env;
const { VITE_ARTICLE_LIST_SIZE } = import.meta.env;

// GOOGLE_MAP_API_KEY = AIzaSyDHeUJPtnDJ_NHtP9HvnzVvbKTcHNqa9WQ

console.log(VITE_ARTICLE_LIST_SIZE)
console.log(VITE_GOOGLE_MAP_API_KEY);

const init_center = { lat: 36.1061824, lng: 128.4227797 }

// setMarkers() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/todos/");
//   const data = await response.json();

//   data.forEach((obj) => {
//     Object.entries(obj).forEach(([key, value]) => {
//       const priceTag = document.createElement("div");
//       priceTag.className = "price-tag";
//       priceTag.textContent = "$2.5M";

//       // -- Advanced markers —— DON'T WORK ?!
//       // from https://developers.google.com/maps/documentation/javascript/advanced-markers/html-markers#simple_html_marker
//       const newMarker = new google.maps.marker.AdvancedMarkerView({
//         map: map.value,
//         position: { lat: 47.615, lng: -122.33 },
//         content: priceTag,
//       });

//       // -- Old style markers —— WORK
//       const oldMarker = new google.maps.Marker({
//         map: map.value,
//         position: { lat: 47.605, lng: -122.304 },
//       });
//     });
//   });
// }
</script>

<template>
  <GoogleMap 
  :api-key="VITE_GOOGLE_MAP_API_KEY"
  id="map" 
  style="width: 100%; height: 500px;" 
  :zoom="17" 
  :center="init_center">

    <!-- <Marker :options="{ position: init_center }" /> -->
  </GoogleMap>
  {{VITE_GOOGLE_MAP_API_KEY}}

</template>

<style scoped></style>
