<script setup>
import { ref, watchEffect } from "vue"
import { GoogleMap, Marker, MarkerCluster } from 'vue3-google-map'
const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env;

import { usePlanStore } from '@/stores/plan';

const init_center = ref({ lat: 36.1061824, lng: 128.4227797 });
const zoom = ref(15);
const markers = ref([]);
const flag = ref(false);

watchEffect(() => {
    flag.value = false;
    const store = usePlanStore();
    const planDetails = store.planDetails;

    if (!planDetails.value || planDetails.value.length === 0) {
        return;
    }

    console.log(planDetails.value);
    console.log("1111111");

    // Calculate center and markers
    const totalLat = planDetails.value.reduce((acc, curr) => acc + curr.attractionInfo.latitude, 0);
    const totalLng = planDetails.value.reduce((acc, curr) => acc + curr.attractionInfo.longitude, 0);
    const avgLat = totalLat / planDetails.value.length;
    const avgLng = totalLng / planDetails.value.length;

    init_center.value = { lat: avgLat, lng: avgLng };

    const minLat = Math.min(...planDetails.value.map(detail => detail.attractionInfo.latitude));
    const maxLat = Math.max(...planDetails.value.map(detail => detail.attractionInfo.latitude));
    const minLng = Math.min(...planDetails.value.map(detail => detail.attractionInfo.longitude));
    const maxLng = Math.max(...planDetails.value.map(detail => detail.attractionInfo.longitude));
    const centerLat = (minLat - maxLat) / 2;
    const centerLng = (minLng - maxLng) / 2;
    const center = Math.abs(centerLat / 2 + centerLng) * 100;

    if (center < 10) {
        zoom.value = 11;
    } else if (center < 15) {
        zoom.value = 9;
    } else {
        zoom.value = 7;
    }

    markers.value = planDetails.value.map(detail => ({
        options: {
            position: { lat: detail.attractionInfo.latitude, lng: detail.attractionInfo.longitude },
            title: detail.attractionInfo.title,
        }
    }));

    flag.value = true;
});
</script>

<template>
    <GoogleMap v-if="flag" :api-key="VITE_GOOGLE_MAP_API_KEY" id="map" style="width: 100%; height: 100%;" :zoom="zoom"
        :center="init_center">
        <MarkerCluster>
            <Marker v-for="(marker, index) in markers" :key="index" :options="marker.options" />
        </MarkerCluster>
    </GoogleMap>
</template>

<style scoped></style>
