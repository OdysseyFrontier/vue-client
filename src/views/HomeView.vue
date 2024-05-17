<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import Slide from '../components/item/Slide.vue'
import { useSidebarStore } from "@/stores/sidebar.js";

const sidebarStore = useSidebarStore();
sidebarStore.changesSidebarState("home");
</script>

<template>
  <main>
    <TheWelcome />
    <Slide/>
  </main>
</template>
