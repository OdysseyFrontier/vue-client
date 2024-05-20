<script setup>
import MyInfo from "@/components/member/myPage/MyInfo.vue";
import { useSidebarStore } from "@/stores/sidebar.js";

const sidebarStore = useSidebarStore();
sidebarStore.changesSidebarState("mypage");
</script>

<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 section top-section">
          <MyInfo />
        </div>
      </div>
      <div class="row">
        <div class="col-12 section bottom-section">
          <ul class="nav nav-tabs nav-tabs-bordered">
            <li class="nav-item">
              <RouterLink :to="{ name: 'MyPlanList' }" class="nav-link">
                계획
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink :to="{ name: 'MyPlanList' }" class="nav-link">
                핫플레이스
              </RouterLink>
            </li>

            <li class="nav-item">
              <RouterLink :to="{ name: 'myInfo' }" class="nav-link">
                회원 정보 조회
              </RouterLink>
            </li>

            <li class="nav-item">
              <RouterLink :to="{ name: 'myInfoModify' }" class="nav-link">
                회원 정보 수정
              </RouterLink>
            </li>
          </ul>

          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.section {
  padding: 20px;
}

.top-section {
  background-color: #f2f2f2;
}

.bottom-section {
  background-color: #f8f9fa;
}

/* Bordered Tabs */
.nav-tabs-bordered {
  border-bottom: 2px solid #ebeef4;
}

.nav-tabs-bordered .nav-link {
  margin-bottom: -2px;
  border: none;
  color: #2c384e;
}

.nav-tabs-bordered .nav-link:hover,
.nav-tabs-bordered .nav-link:focus {
  color: #4154f1;
}

.nav-tabs-bordered .nav-link.active {
  background-color: #fff;
  color: #4154f1;
  border-bottom: 2px solid #4154f1;
}
</style>
