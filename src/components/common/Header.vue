<script setup>
import { ref, computed } from 'vue'
import { useMemberStore } from "@/stores/member.js";
import { useSidebarStore } from "@/stores/sidebar.js";

const memberStore = useMemberStore();
const sidebarStore = useSidebarStore();

const memberInfo =  memberStore.memberInfo;

const sidebarList = ref(sidebarStore.sidebarList);


const logout = () => {
  memberStore.memberLogout();
};
</script>

<template>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.7.2/font/bootstrap-icons.min.css"
    rel="stylesheet">

  <div class="fixed-top">
    <!-- ======= Header ======= -->
    <header id="header" class="header  d-flex align-items-center">
      <div class="d-flex align-items-center justify-content-between">
        <a href="/" class="logo d-flex align-items-center">
          <img src="/src/assets/logo.png" alt="" />
          <span class="d-none d-lg-block">OdysseyFrontiers</span>
        </a>

        <i class="bi bi-list toggle-sidebar-btn navbar-toggler-icon" data-bs-toggle="collapse" data-bs-target="#sidebar"
          aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation"></i>
      </div>
      <!-- End Logo -->

      <nav class="header-nav ms-auto" v-if="memberStore.isLogin">
        <ul class="d-flex align-items-center">
          <li class="nav-item dropdown pe-3">
            <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
              <img src="/src/assets/noimg.png" alt="Profile" class="rounded-circle" />
              <span class="d-none d-md-block dropdown-toggle ps-2">{{memberStore.memberInfo != null ? memberStore.memberInfo.name : "null"}}</span> </a>
            <!-- End Profile Iamge Icon -->

            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li class="dropdown-header">
                <h6>{{ memberStore.memberInfo != null ? memberStore.memberInfo.name : "null" }}</h6>
                <!-- <span>등록한 내용</span> -->
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>

              <li>
                <a class="dropdown-item d-flex align-items-center" href="/member/mypage">
                  <i class="bi bi-person"></i>
                  <span>마이페이지</span>
                </a>
              </li>

              <li>
                <hr class="dropdown-divider" />
              </li>

              <li>
                <RouterLink to="/" class="dropdown-item d-flex align-items-center " aria-current="page">
                  <i class="bi bi-house"></i>
                  <span>home</span>
                </RouterLink>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>

              <li>
                <a class="dropdown-item d-flex align-items-center" href="#">
                  <i class="bi bi-question-circle"></i>
                  <span>문의사항</span>
                </a>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>

              <li>
                <router-link to="/"  @click.prevent="logout" class="dropdown-item d-flex align-items-center" href="/member/logout">
                  <i class="bi bi-box-arrow-right"></i>
                  <span>로그아웃</span>
                </router-link>
              </li>
            </ul>
            <!-- End Profile Dropdown Items -->
          </li>
          <!-- End Profile Nav -->
        </ul>
      </nav>
      <!-- End Icons Navigation -->
    </header>
    <!-- End Header -->


    <!-- ======= Sidebar ======= -->
    <aside id="sidebar" class="collapse navbar-collapse sidebar">
      <ul class="sidebar-nav navbar-nav" id="sidebar-nav">
        <li class="nav-item">
          <RouterLink :to="{ name: 'home' }" class="nav-link" :class="sidebarList.home">
            <i class="bi bi-grid"></i>
            <span>home</span>
          </RouterLink>
        </li>
        <!-- End home Nav -->

        <!-- 관광지 조회 Nav -->

        <li class="nav-item">
          <RouterLink :to="{ name: 'boardList' }" class="nav-link" :class="sidebarList.board" href="/board?action=list">
            <i class="bi bi-clipboard"></i>
            <span>여행 정보 공유 게시판</span>
          </RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink :to="{ name: 'plan' }" class="nav-link" :class="sidebarList.plan" href="/plan">
            <i class="bi bi-calendar-event"></i>
            <span>여행 계획</span>
          </RouterLink>
        </li>
        
        <li class="nav-item">
          <RouterLink :to="{ name: 'attraction' }" class="nav-link" :class="sidebarList.attraction" href="/attraction">
            <i class="bi bi-search"></i>
            <span>관광지 검색</span>
          </RouterLink>
        </li>

        <!-- End 여행정보공유 Nav -->



        <li class="nav-heading">Pages</li>


        <li class="nav-item" v-if="memberStore.isLogin">
          <a class="nav-link collapsed" href="/member/mypage">
            <i class="bi bi-person"></i>
            <span>마이페이지</span>
          </a>
        </li>
        <!-- End Profile Page Nav -->

        <li class="nav-item">
          <a class="nav-link collapsed" href="#">
            <i class="bi bi-question-circle"></i>
            <span>문의사항</span>
          </a>
        </li>
        <!-- End F.A.Q Page Nav -->


        <li class="nav-item" v-if="!memberStore.isLogin">
          <RouterLink :to="{ name: 'memberLogin' }" class="nav-link" :class="sidebarList.login">
            <i class="bi bi-box-arrow-in-right"></i>
            <span>로그인</span>
          </RouterLink>
        </li>
        <!-- End Login Page Nav -->

        <li class="nav-item" v-if="!memberStore.isLogin">
          <RouterLink :to="{ name: 'memberJoin' }" class="nav-link" :class="sidebarList.join">
            <i>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-person-add" viewBox="0 0 16 16">
                <path
                  d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                <path
                  d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
              </svg></i>
            <!-- <i class="bi bi-person-add"></i> -->
            <span>회원가입</span>
          </RouterLink>
        </li>
        <!-- End Join Page Nav -->



        <li class="nav-item" v-if="memberStore.isLogin">
          <a class="nav-link collapsed" href="/member/delete">
            <i class="bi bi-person-dash"></i>
            <span>회원탈퇴</span>
          </a>
        </li>
        <!-- End 회원탈퇴 Page Nav -->
      </ul>
    </aside>
    <!-- End Sidebar-->
  </div>

  <div style="height: 50px;"></div>
</template>



<style scoped>
.logo {
  line-height: 1;
}

@media (min-width: 1200px) {
  .logo {
    width: 280px;
  }
}

.logo img {
  max-height: 26px;
  margin-right: 6px;
}

.logo span {
  font-size: 26px;
  font-weight: 700;
  color: #012970;
  font-family: "Nunito", sans-serif;
}

.header {
  transition: all 0.5s;
  z-index: 997;
  box-shadow: 0px 2px 20px rgba(1, 41, 112, 0.1);
  background-color: #fff;
  padding-left: 20px;
  height: 50px;
  /* Toggle Sidebar Button */
  /* Search Bar */
}

/* Dropdown menus */
.dropdown-menu {
  border-radius: 4px;
  padding: 10px 0;
  animation-name: dropdown-animate;
  animation-duration: 0.2s;
  animation-fill-mode: both;
  border: 0;
  box-shadow: 0 5px 30px 0 rgba(82, 63, 105, 0.2);
}

.dropdown-menu .dropdown-header,
.dropdown-menu .dropdown-footer {
  text-align: center;
  font-size: 15px;
  padding: 10px 25px;
}

.dropdown-menu .dropdown-footer a {
  color: #444444;
  text-decoration: underline;
}

.dropdown-menu .dropdown-footer a:hover {
  text-decoration: none;
}

.dropdown-menu .dropdown-divider {
  color: #a5c5fe;
  margin: 0;
}

.dropdown-menu .dropdown-item {
  font-size: 14px;
  padding: 10px 15px;
  transition: 0.3s;
}

.dropdown-menu .dropdown-item i {
  margin-right: 10px;
  font-size: 18px;
  line-height: 0;
}

.dropdown-menu .dropdown-item:hover {
  background-color: #f6f9ff;
}

@media (min-width: 768px) {
  .dropdown-menu-arrow::before {
    content: "";
    width: 13px;
    height: 13px;
    background: #fff;
    position: absolute;
    top: -7px;
    right: 20px;
    transform: rotate(45deg);
    border-top: 1px solid #eaedf1;
    border-left: 1px solid #eaedf1;
  }
}

@keyframes dropdown-animate {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }

  0% {
    opacity: 0;
  }
}

.header-nav ul {
  list-style: none;
}

.header-nav>ul {
  margin: 0;
  padding: 0;
}

.header-nav .nav-icon {
  font-size: 22px;
  color: #012970;
  margin-right: 25px;
  position: relative;
}

.header-nav .nav-profile {
  color: #012970;
}

.header-nav .nav-profile img {
  max-height: 36px;
}

.header-nav .nav-profile span {
  font-size: 14px;
  font-weight: 600;
}

.header-nav .profile {
  min-width: 240px;
  padding-bottom: 0;
  top: 8px !important;
}

/* 프로필 눌렸을 때 드롭다운되는 곳의 제일 상단 이름부분 */
.header-nav .profile .dropdown-header h6 {
  font-size: 18px;
  margin-bottom: 0;
  font-weight: 600;
  color: #444444;
}

.header-nav .profile .dropdown-header span {
  font-size: 14px;
}

.header-nav .profile .dropdown-item {
  font-size: 14px;
  padding: 10px 15px;
  transition: 0.3s;
}

.header-nav .profile .dropdown-item i {
  margin-right: 10px;
  font-size: 18px;
  line-height: 0;
}

.header-nav .profile .dropdown-item:hover {
  background-color: #f6f9ff;
}


/* 추가 */
/*--------------------------------------------------------------
# Sidebar
--------------------------------------------------------------*/
.sidebar {
  /* top: 10; */
  left: 0;
  bottom: 0;
  /* width: 300px; */
  /* z-index: 996; */
  /* transition: all 0.3s; */
  /* padding: 20px; */
  padding-right: 20px;
  padding-left: 20px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #aab7cf transparent;
  box-shadow: 0px 0px 20px rgba(1, 41, 112, 0.1);
  background-color: #fff;
}

@media (max-width: 1199px) {
  .sidebar {
    left: -300px;
  }
}

.sidebar::-webkit-scrollbar {
  width: 5px;
  height: 8px;
  background-color: #fff;
}

.sidebar::-webkit-scrollbar-thumb {
  background-color: #aab7cf;
}

@media (min-width: 1200px) {

  #main,
  #footer {
    margin-left: 300px;
  }
}

@media (max-width: 1199px) {
  .toggle-sidebar .sidebar {
    left: 0;
  }
}

@media (min-width: 1200px) {

  .toggle-sidebar #main,
  .toggle-sidebar #footer {
    margin-left: 0;
  }

  .toggle-sidebar .sidebar {
    left: -300px;
  }
}

.sidebar-nav {
  padding: 0;
  margin: 0;
  list-style: none;
}

.sidebar-nav li {
  padding: 0;
  margin: 0;
  list-style: none;
}

/* .sidebar-nav .nav-item {
  margin-bottom: 5px;
} */

.sidebar-nav .nav-heading {
  font-size: 11px;
  text-transform: uppercase;
  color: #899bbd;
  font-weight: 600;
  /* margin: 10px 0 5px 15px; */
}

.sidebar-nav .nav-link {
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 600;
  color: #4154f1;
  transition: 0.3;
  background: #f6f9ff;
  padding: 10px 15px;
  border-radius: 4px;
}

.sidebar-nav .nav-link i {
  font-size: 16px;
  margin-right: 10px;
  color: #4154f1;
}

.sidebar-nav .nav-link.collapsed {
  color: #012970;
  background: #fff;
}

.sidebar-nav .nav-link.collapsed i {
  color: #899bbd;
}

.sidebar-nav .nav-link:hover {
  color: #4154f1;
  background: #f6f9ff;
}

.sidebar-nav .nav-link:hover i {
  color: #4154f1;
}

.sidebar-nav .nav-link .bi-chevron-down {
  margin-right: 0;
  transition: transform 0.2s ease-in-out;
}

.sidebar-nav .nav-link:not(.collapsed) .bi-chevron-down {
  transform: rotate(180deg);
}

.sidebar-nav .nav-content {
  padding: 5px 0 0 0;
  margin: 0;
  list-style: none;
}

.sidebar-nav .nav-content a {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: #012970;
  transition: 0.3;
  padding: 10px 0 10px 40px;
  transition: 0.3s;
}

.sidebar-nav .nav-content a i {
  font-size: 6px;
  margin-right: 8px;
  line-height: 0;
  border-radius: 50%;
}

.sidebar-nav .nav-content a:hover,
.sidebar-nav .nav-content a.active {
  color: #4154f1;
}

.sidebar-nav .nav-content a.active i {
  background-color: #4154f1;
}
</style>