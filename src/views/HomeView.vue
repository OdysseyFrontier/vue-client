<script setup>
import Slide from '../components/item/Slide.vue'
import { useSidebarStore } from "@/stores/sidebar.js";

const sidebarStore = useSidebarStore();
sidebarStore.changesSidebarState("home");
sidebarStore.open = false;
</script>

<template>
  <main>
    <Slide/>
  </main>
</template>
