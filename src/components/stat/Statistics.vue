<template>
  <div id="app">
    <!-- <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" href="#">통계 대시보드</a>
    </nav> -->

    <div class="container mt-4">
      <ul class="nav nav-pills mb-3">
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: currentTab === 'popular-attractions' }"
            @click="currentTab = 'popular-attractions'"
          >
            <i class="fas fa-star"></i> 인기 관광지
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: currentTab === 'member-registration' }"
            @click="currentTab = 'member-registration'"
          >
            <i class="fas fa-user-plus"></i> 회원 가입 추이
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: currentTab === 'region-attraction-count' }"
            @click="currentTab = 'region-attraction-count'"
          >
            <i class="fas fa-map-marked-alt"></i> 지역별 관광지 수
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: currentTab === 'activity-by-time' }"
            @click="currentTab = 'activity-by-time'"
          >
            <i class="fas fa-clock"></i> 시간대별 활동
          </a>
        </li>
      </ul>

      <div class="tab-content mt-4">
        <div v-if="currentTab === 'popular-attractions'">
          <PopularAttractions />
        </div>
        <div v-if="currentTab === 'member-registration'">
          <MemberRegistration />
        </div>
        <div v-if="currentTab === 'region-attraction-count'">
          <RegionAttractionCount />
        </div>
        <div v-if="currentTab === 'activity-by-time'">
          <ActivityByTime />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import PopularAttractions from "@/components/stat/PopularAttractions.vue";
import MemberRegistration from "@/components/stat/MemberRegistration.vue";
import RegionAttractionCount from "@/components/stat/RegionAttractionCount.vue";
import ActivityByTime from "@/components/stat/ActivityByTime.vue";
import { useSidebarStore } from "@/stores/sidebar.js";

export default {
  components: {
    PopularAttractions,
    MemberRegistration,
    RegionAttractionCount,
    ActivityByTime,
  },
  setup() {
    const sidebarStore = useSidebarStore();
    sidebarStore.changesSidebarState("stat");
    sidebarStore.open = false;

    const currentTab = ref("popular-attractions");
    return { currentTab };
  },
};
</script>

<style>
a {
  cursor: pointer;
}


.navbar {
  margin-bottom: 20px;
}

.navbar-brand {
  font-size: 1.5rem;
}

.container {
  max-width: 1200px;
}

.nav-pills .nav-link {
  border-radius: 30px;
  margin-right: 10px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-pills .nav-link.active {
  background-color: #007bff;
  color: white;
}

.tab-content {
  padding-top: 20px;
}

.card {
  margin-bottom: 20px;
  border: none;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-body {
  padding: 20px;
}

.badge {
  font-size: 1rem;
  padding: 5px 10px;
}
</style>
