<script setup>
import { ref, watchEffect } from "vue"
import { GoogleMap, Marker, MarkerCluster } from 'vue3-google-map'
const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env;

import { usePlanStore } from '@/stores/plan';

// const store = usePlanStore();

const center = ref({ lat: 36.1061824, lng: 128.4227797 })
const zoom = ref(15)
const markers = ref([])
const currentLocation = ref([]);
watchEffect(() => {
  // searchedAttractions 값 가져오기

  const searchedAttractions = usePlanStore().searchedAttractions;

  // searchedAttractions가 비어 있는 경우 처리
  if (!usePlanStore().searchedAttractions || usePlanStore().searchedAttractions.length == 0) {
    return;
  }

  // Find the minimum and maximum latitude and longitude
  const minLat = Math.min(...searchedAttractions.map(plan => plan.latitude))
  const maxLat = Math.max(...searchedAttractions.map(plan => plan.latitude))
  const minLng = Math.min(...searchedAttractions.map(plan => plan.longitude))
  const maxLng = Math.max(...searchedAttractions.map(plan => plan.longitude))
  const centerLat = (minLat - maxLat) / 2
  const centerLng = (minLng - maxLng) / 2
  const center = Math.abs(centerLat / 2 + centerLng) * 100
  // center.value = { lat: (minLat + maxLat) / 2, lng: (minLng + maxLng) / 2 }

  const totalLat = searchedAttractions.reduce((acc, curr) => acc + curr.latitude, 0)
  const totalLng = searchedAttractions.reduce((acc, curr) => acc + curr.longitude, 0)
  const avgLat = totalLat / searchedAttractions.length
  const avgLng = totalLng / searchedAttractions.length

  center.value = { lat: avgLat, lng: avgLng }

  if (center < 10) {
    zoom.value = 11
  } else if (center < 15) {
    zoom.value = 9
  } else {
    zoom.value = 7
  }
  console.log(zoom.value)
  console.log(center)

  // 기존 마커 제거
  markers.value = []

  // attractionList의 각 항목에 대해 마커를 생성합니다.
  searchedAttractions.forEach(plan => {
    const marker = {
      options: {
        position: { lat: plan.latitude, lng: plan.longitude },
        title: plan.title,
      }
    }
    markers.value.push(marker)
  })
})


const getCurrentLocation = () => {
  if (confirm('현재 위치를 사용하시겠습니까?')) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(latitude, longitude);
          currentLocation.value = { lat: latitude, lng: longitude };
          center.value = { lat: latitude, lng: longitude };
          console.log(center.value);
          zoom.value = 12;
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
};

// setMarkers() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/todos/");
//   const data = await response.json();

//   data.forEach((obj) => {
//     Object.entries(obj).forEach(([key, value]) => {
//       const priceTag = document.createElement("div");
//       priceTag.className = "price-tag";
//       priceTag.textContent = "$2.5M";

//       // -- Advanced markers ——
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

<!-- test map -->
<!-- 안 될 시에 이 코드 한번 실행해서 되는지 확인하고 해봐. -->

<!-- <template>
  <GoogleMap 
  :api-key="VITE_GOOGLE_MAP_API_KEY"
  id="map" 
  style="width: 100%; height: 500px;" 
  :zoom="17" 
  :center="center">
  </GoogleMap>

</template> -->


<template>
  <GoogleMap :api-key="VITE_GOOGLE_MAP_API_KEY" id="map" style="width: 100%; height: 100%;" :zoom="zoom"
    :center="center">

    <MarkerCluster>
      <Marker v-for="(marker, index) in markers" :key="index" :options="marker.options" />
    </MarkerCluster>
  </GoogleMap>
</template>

<style scoped></style>
