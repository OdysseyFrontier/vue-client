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
    if (!usePlanStore().isUpdate) return;
    flag.value = false;

    if (!usePlanStore().plannedAttractions || usePlanStore().plannedAttractions.length == 0) {
        return;
    }

    console.log(usePlanStore().plannedAttractions)

    // Calculate center and markers
    const totalLat = usePlanStore().plannedAttractions.reduce((acc, curr) => acc + curr.latitude, 0);
    const totalLng = usePlanStore().plannedAttractions.reduce((acc, curr) => acc + curr.longitude, 0);
    const avgLat = totalLat / usePlanStore().plannedAttractions.length;
    const avgLng = totalLng / usePlanStore().plannedAttractions.length;

    init_center.value = { lat: avgLat, lng: avgLng };

    const minLat = Math.min(...usePlanStore().plannedAttractions.map(attraction => attraction.latitude));
    const maxLat = Math.max(...usePlanStore().plannedAttractions.map(attraction => attraction.latitude));
    const minLng = Math.min(...usePlanStore().plannedAttractions.map(attraction => attraction.longitude));
    const maxLng = Math.max(...usePlanStore().plannedAttractions.map(attraction => attraction.longitude));
    const centerLat = (minLat - maxLat) / 2;
    const centerLng = (minLng - maxLng) / 2;
    const center = Math.abs(centerLat / 2 + centerLng) * 100;

    if (center < 10) {
        zoom.value = 14;
    } else if (center < 15) {
        zoom.value = 10;
    } else {
        zoom.value = 8;
    }

    markers.value = usePlanStore().plannedAttractions.map(attraction => ({
        options: {
            position: { lat: attraction.latitude, lng: attraction.longitude },
            title: attraction.title,
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
