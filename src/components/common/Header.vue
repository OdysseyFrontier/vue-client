<script setup>
import { useMemberStore } from "@/stores/member.js";

const memberStore = useMemberStore();

const memberInfo = memberStore.memberinfo;
</script>

<template>
<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.7.2/font/bootstrap-icons.min.css" rel="stylesheet">

  <div>
    <!-- ======= Header ======= -->
    <header id="header" class="header fixed-top d-flex align-items-center">
      <div class="d-flex align-items-center justify-content-between">
        <a href="/" class="logo d-flex align-items-center">
          <img src="/src/assets/logo.png" alt="" />
          <span class="d-none d-lg-block">OdysseyFrontiers</span>
        </a>
        
        <i class="bi bi-list toggle-sidebar-btn navbar-toggler-icon" data-bs-toggle="collapse" data-bs-target="#sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation"></i>
      </div>
      <!-- End Logo -->

      <nav class="header-nav ms-auto">
        <ul class="d-flex align-items-center">
          <li class="nav-item dropdown pe-3">
            <a
              class="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              <img
                src="/src/assets/noimg.png"
                alt="Profile"
                class="rounded-circle"
              />
              <span class="d-none d-md-block dropdown-toggle ps-2"
                >{{memberInfo.memberName }}</span
              > </a>
              <!-- End Profile Iamge Icon -->

            <ul
              class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile"
            >
              <li class="dropdown-header">
                <h6>{{memberInfo.memberName }}</h6>
                <!-- <span>등록한 내용</span> -->
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>

			  <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="/member/mypage"
                >
                  <i class="bi bi-person"></i>
                  <span>마이페이지</span>
                </a>
              </li>
              
              <li>
                <hr class="dropdown-divider" />
              </li>              

              <li>
                <RouterLink to="/"
                  class="dropdown-item d-flex align-items-center " aria-current="page"
                >
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
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="/member/logout"
                >
                  <i class="bi bi-box-arrow-right"></i>
                  <span>로그아웃</span>
                </a>
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
          <a class="nav-link collapsed" href="/">
            <i class="bi bi-grid"></i>
            <span>home</span>
          </a>
        </li>
        <!-- End home Nav -->

        <li class="nav-item">
          <RouterLink :to="{name: 'shareBoard'}" class="nav-link ${mc}" href="/board?action=list">
            <i class="bi bi-clipboard"></i>
            <span>여행 정보 공유 게시판</span>
          </RouterLink>
        </li>

        <!-- End 여행정보공유 Nav -->

       
        <li class="nav-heading">Pages</li>

        <li class="nav-item">
          <a class="nav-link ${bc}" href="/member/mypage">
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


        <li class="nav-item">
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

.header-nav > ul {
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
</style>