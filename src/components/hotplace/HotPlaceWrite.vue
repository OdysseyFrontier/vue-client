<script setup>

</script>

<template>
     <!-- ======= Portfolio Details Section ======= -->

     <div class="clearfix btn-wrap align-right mt30">
            <button class="table-btn btn-write btn_bbsList" @click="moveModify(true)">수정</button>
            <button class="table-btn btn-exit btn_bbsList" @click="onDeleteArticle(false)">삭제</button>
        </div>



     <section id="portfolio-details" class="portfolio-details">
      <div class="container">

        <div class="row gy-4">

          <div class="col-lg-5">
            <!-- 지도 -->
            <div>위치</div>
          </div>

          <div class="col-lg-7">
            <div class="portfolio-info">
              <h3><input type="text"/></h3>
              <ul>
                <li><strong>Category</strong> : category</li>
                <li><strong>작성자</strong> : hotplace.name</li>
                <li><strong>작성일</strong> : hotplace.createdTime</li>
                <li><strong>내용</strong> : hotplace.overview</li>
                <li><strong>주소</strong> : hotplace.addr1 hotplace.addr2</li>
                <li><strong>전화번호</strong> : hotplace.tel</li>
                <li><strong>Project URL</strong>: <a href="#">otplace.homepage</a></li>
              </ul>


              <div class="profile-edit pt-3" id="profile-edit">
    <!-- Profile Edit Form -->
    <form>
        
      <div class="row mb-3">
        <label for="Image" class="col-md-4 col-lg-3 col-form-label"
          >Image</label
        >
        <div class="col-md-8 col-lg-9">
          <input
            name="Image"
            type="file"
            class="form-control"
            id="Image"
          />
        </div>
      </div>

      <div class="row mb-3">
        <label for="category" class="col-md-4 col-lg-3 col-form-label"
          >카테고리</label
        >
        <div class="col-md-8 col-lg-9 d-flex">

          <select
            class="form-select"
            id="category"
            name="category"
            aria-label="카테고리 선택"
            required
          >
            <option value="12">관광지</option>
                            <option value="14">문화시설</option>
                            <option value="15">축제 / 공연 / 행사</option>
                            <option value="25">여행코스</option>
                            <option value="28">레포츠</option>
                            <option value="32">숙박</option>
                            <option value="38">쇼핑</option>
                            <option value="39">음식점</option>
          </select>
        </div>
      </div>

      <div class="row mb-3">
        <label for="content" class="col-md-4 col-lg-3 col-form-label"
          >내용</label
        >
        <div class="col-md-8 col-lg-9">
          <textarea
            name="content"
            class="form-control"
            id="content"
            style="height: 100px"
          >
Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea saepe at unde.</textarea
          >
        </div>
      </div>


      <div class="row mb-3">
        <label for="Address" class="col-md-4 col-lg-3 col-form-label"
          >주소</label
        >
        <div class="col-md-8 col-lg-9">
          <input
            name="address"
            type="text"
            class="form-control"
            id="Address"
            value="A108 Adam Street, New York, NY 535022"
          />
        </div>
      </div>

      <div class="row mb-3">
        <label for="Phone" class="col-md-4 col-lg-3 col-form-label"
          >전화번호</label
        >
        <div class="col-md-8 col-lg-9">
          <input
            name="phone"
            type="text"
            class="form-control"
            id="Phone"
            value="(436) 486-3538 x29071"
          />
        </div>
      </div>


      <div class="row mb-3">
        <label for="Homepage" class="col-md-4 col-lg-3 col-form-label"
          >홈페이지</label
        >
        <div class="col-md-8 col-lg-9">
          <input
            name="Homepage"
            type="text"
            class="form-control"
            id="Homepage"
            value="https://Homepage.com/#"
          />
        </div>
      </div>


      
    </form>
    <!-- End Profile Edit Form -->
  </div>

            </div>
            <div class="portfolio-description">
              <h2>This is an example of portfolio detail</h2>
              <p>
                Autem ipsum nam porro corporis rerum. Quis eos dolorem eos itaque inventore commodi labore quia quia. Exercitationem repudiandae officiis neque suscipit non officia eaque itaque enim. Voluptatem officia accusantium nesciunt est omnis tempora consectetur dignissimos. Sequi nulla at esse enim cum deserunt eius.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section><!-- End Portfolio Details Section -->

</template>

<style scoped>
i {cursor: pointer;}

/**
* Template Name: Laura
* Template URL: https://bootstrapmade.com/laura-free-creative-bootstrap-theme/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

/*--------------------------------------------------------------
# General
--------------------------------------------------------------*/
section{
  font-family: "Open Sans", sans-serif;
  color: #444444;
}

a {
  color: #ffb727;
  text-decoration: none;
}

a:hover {
  color: #ffc85a;
  text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6,pre {
  font-family: "Raleway", sans-serif;
}




/*--------------------------------------------------------------
# Sections General
--------------------------------------------------------------*/
section {
  padding: 60px 0;
}





/*--------------------------------------------------------------
# Portfolio Details
--------------------------------------------------------------*/
.portfolio-details {
  padding-top: 40px;
}

.portfolio-details .portfolio-details-slider img {
  width: 100%;
}

.portfolio-details .portfolio-details-slider .swiper-pagination {
  margin-top: 20px;
  position: relative;
}

.portfolio-details .portfolio-details-slider .swiper-pagination .swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  background-color: #fff;
  opacity: 1;
  border: 1px solid #ffb727;
}

.portfolio-details .portfolio-details-slider .swiper-pagination .swiper-pagination-bullet-active {
  background-color: #ffb727;
}

.portfolio-details .portfolio-info {
  padding: 30px;
  box-shadow: 0px 0 30px rgba(59, 67, 74, 0.08);
}

.portfolio-details .portfolio-info h3 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
  /* padding-bottom: 20px; */
  /* border-bottom: 1px solid #eee; */
}

pre{
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
  padding-bottom: 10px;
}

.portfolio-details .portfolio-info ul {
  list-style: none;
  padding: 0;
  font-size: 15px;
}

.portfolio-details .portfolio-info ul li+li {
  margin-top: 10px;
}

.portfolio-details .portfolio-description {
  padding-top: 30px;
}

.portfolio-details .portfolio-description h2 {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 20px;
}

.portfolio-details .portfolio-description p {
  padding: 0;
}



/* wkatlaks */

:root {
  scroll-behavior: smooth;
}

body {
  font-family: "Open Sans", sans-serif;
  background: #f6f9ff;
  color: #444444;
}

/* a {
  color: #4154f1;
  text-decoration: none;
}

a:hover {
  color: #717ff5;
  text-decoration: none;
} */

/* h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Nunito", sans-serif;
} */

/*--------------------------------------------------------------
# Main
--------------------------------------------------------------*/
#main {
  margin-top: 60px;
  padding: 20px 30px;
  transition: all 0.3s;
}

@media (max-width: 1199px) {
  #main {
    padding: 20px;
  }
}

/*--------------------------------------------------------------
# Page Title
--------------------------------------------------------------*/
.pagetitle {
  margin-bottom: 10px;
}

.pagetitle h1 {
  font-size: 24px;
  margin-bottom: 0;
  font-weight: 600;
  color: #012970;
}

/* Card */
.card {
  margin-bottom: 30px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0 30px rgba(1, 41, 112, 0.1);
}

.card-header,
.card-footer {
  border-color: #ebeef4;
  background-color: #fff;
  color: #798eb3;
  padding: 15px;
}

.card-title {
  padding: 20px 0 15px 0;
  font-size: 18px;
  font-weight: 500;
  color: #012970;
  font-family: "Poppins", sans-serif;
}

.card-title span {
  color: #899bbd;
  font-size: 14px;
  font-weight: 400;
}

.card-body {
  padding: 0 20px 20px 20px;
}

.card-img-overlay {
  background-color: rgba(255, 255, 255, 0.6);
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

/*--------------------------------------------------------------
# Profie Page
--------------------------------------------------------------*/
.profile .profile-card img {
  max-width: 120px;
}

.profile .profile-card h2 {
  font-size: 24px;
  font-weight: 700;
  color: #2c384e;
  margin: 10px 0 0 0;
}

.profile .profile-card h3 {
  font-size: 18px;
}

.profile .profile-card .social-links a {
  font-size: 20px;
  display: inline-block;
  color: rgba(1, 41, 112, 0.5);
  line-height: 0;
  margin-right: 10px;
  transition: 0.3s;
}

.profile .profile-card .social-links a:hover {
  color: #012970;
}

.profile .profile-overview .row {
  margin-bottom: 20px;
  font-size: 15px;
}

.profile .profile-overview .card-title {
  color: #012970;
}

.profile .profile-overview .label {
  font-weight: 600;
  color: rgba(1, 41, 112, 0.6);
}

.profile .profile-edit label {
  font-weight: 600;
  color: rgba(1, 41, 112, 0.6);
}

.profile .profile-edit img {
  max-width: 120px;
}
</style>
