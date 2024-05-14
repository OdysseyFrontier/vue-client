<script setup>
import { GoogleMap, Marker } from 'vue3-google-map';

const { GOOGLE_MAP_API_KEY } = import.meta.env

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
  <GoogleMap id="map" api-key=GOOGLE_MAP_API_KEY style="width: 100%; height: 500px;" :zoom="15" :center="init_center">

    <!-- <Marker :options="{ position: init_center }" /> -->
  </GoogleMap>
</template>


<style scoped></style>
