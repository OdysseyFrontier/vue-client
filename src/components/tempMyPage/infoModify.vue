<script setup></script>

<template>
  <div class="tab-pane profile-edit pt-3" id="profile-edit">
    <!-- Profile Edit Form -->
    <form id="main">
      <div class="row mb-3">
        <label for="profileImage" class="col-md-4 col-lg-3 col-form-label"
          >Profile Image</label
        >
        <div class="col-md-8 col-lg-9">
          <img src="/src/assets/noimg.png" alt="Profile" />
          <div class="pt-2">
            <a
              href="#"
              class="btn btn-primary btn-sm"
              title="Upload new profile image"
              ><i class="bi bi-upload"></i
            ></a>
            <a
              href="#"
              class="btn btn-danger btn-sm"
              title="Remove my profile image"
              ><i class="bi bi-trash"></i
            ></a>
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <label for="fullName" class="col-md-4 col-lg-3 col-form-label"
          >Full Name</label
        >
        <div class="col-md-8 col-lg-9">
          <input
            name="fullName"
            type="text"
            class="form-control"
            id="fullName"
            value="Kevin Anderson"
          />
        </div>
      </div>

      <div class="row mb-3">
        <label for="about" class="col-md-4 col-lg-3 col-form-label"
          >About</label
        >
        <div class="col-md-8 col-lg-9">
          <textarea
            name="about"
            class="form-control"
            id="about"
            style="height: 100px"
          >
Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea saepe at unde.</textarea
          >
        </div>
      </div>

      <div class="row mb-3">
        <label for="company" class="col-md-4 col-lg-3 col-form-label"
          >Company</label
        >
        <div class="col-md-8 col-lg-9">
          <input
            name="company"
            type="text"
            class="form-control"
            id="company"
            value="Lueilwitz, Wisoky and Leuschke"
          />
        </div>
      </div>

      <div class="row mb-3">
        <label for="Job" class="col-md-4 col-lg-3 col-form-label">Job</label>
        <div class="col-md-8 col-lg-9">
          <input
            name="job"
            type="text"
            class="form-control"
            id="Job"
            value="Web Designer"
          />
        </div>
      </div>

      <div class="row mb-3">
        <label for="Country" class="col-md-4 col-lg-3 col-form-label"
          >Country</label
        >
        <div class="col-md-8 col-lg-9">
          <input
            name="country"
            type="text"
            class="form-control"
            id="Country"
            value="USA"
          />
        </div>
      </div>

      <div class="row mb-3">
        <label for="Address" class="col-md-4 col-lg-3 col-form-label"
          >Address</label
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
          >Phone</label
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
        <label for="Email" class="col-md-4 col-lg-3 col-form-label"
          >Email</label
        >
        <div class="col-md-8 col-lg-9">
          <input
            name="email"
            type="email"
            class="form-control"
            id="Email"
            value="k.anderson@example.com"
          />
        </div>
      </div>

      <div class="row mb-3">
        <label for="Twitter" class="col-md-4 col-lg-3 col-form-label"
          >Twitter Profile</label
        >
        <div class="col-md-8 col-lg-9">
          <input
            name="twitter"
            type="text"
            class="form-control"
            id="Twitter"
            value="https://twitter.com/#"
          />
        </div>
      </div>

      <div class="row mb-3">
        <label for="Facebook" class="col-md-4 col-lg-3 col-form-label"
          >Facebook Profile</label
        >
        <div class="col-md-8 col-lg-9">
          <input
            name="facebook"
            type="text"
            class="form-control"
            id="Facebook"
            value="https://facebook.com/#"
          />
        </div>
      </div>

      <div class="row mb-3">
        <label for="Instagram" class="col-md-4 col-lg-3 col-form-label"
          >Instagram Profile</label
        >
        <div class="col-md-8 col-lg-9">
          <input
            name="instagram"
            type="text"
            class="form-control"
            id="Instagram"
            value="https://instagram.com/#"
          />
        </div>
      </div>

      <div class="row mb-3">
        <label for="Linkedin" class="col-md-4 col-lg-3 col-form-label"
          >Linkedin Profile</label
        >
        <div class="col-md-8 col-lg-9">
          <input
            name="linkedin"
            type="text"
            class="form-control"
            id="Linkedin"
            value="https://linkedin.com/#"
          />
        </div>
      </div>

      <div class="row mb-3">
        <label for="Email" class="col-md-4 col-lg-3 col-form-label"
          >이메일</label
        >
        <div class="col-md-8 col-lg-9 d-flex">
          <input
            name="emailId"
            type="text"
            class="form-control"
            id="Email"
            value="회원 emailId"
            required
          />
          @
          <select
            class="form-select"
            id="emaildomain"
            name="emailDomain"
            aria-label="이메일 도메인 선택"
            required
          >
            <option value="ssafy.com">싸피</option>
            <option value="google.com">구글</option>
            <option value="naver.com">네이버</option>
            <option value="kakao.com">카카오</option>
          </select>
        </div>
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-primary">Save Changes</button>
      </div>
    </form>
    <!-- End Profile Edit Form -->
  </div>
</template>

<style scoped>
/**
* Template Name: NiceAdmin
* Template URL: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/
* Updated: Apr 20 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

/*--------------------------------------------------------------
# General
--------------------------------------------------------------*/
:root {
  scroll-behavior: smooth;
}

body {
  font-family: "Open Sans", sans-serif;
  background: #f6f9ff;
  color: #444444;
}

a {
  color: #4154f1;
  text-decoration: none;
}

a:hover {
  color: #717ff5;
  text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Nunito", sans-serif;
}

/*--------------------------------------------------------------
# Main
--------------------------------------------------------------*/
#main {
  /* margin-top: 60px; */
  padding: 20px 30px;
  transition: all 0.3s;
}

@media (max-width: 1199px) {
  #main {
    padding: 20px;
  }
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

/*--------------------------------------------------------------
# Profie Page
--------------------------------------------------------------*/
.profile-card img {
  max-width: 120px;
}

.profile-card h2 {
  font-size: 24px;
  font-weight: 700;
  color: #2c384e;
  margin: 10px 0 0 0;
}

.profile-card h3 {
  font-size: 18px;
}

.profile-card .social-links a {
  font-size: 20px;
  display: inline-block;
  color: rgba(1, 41, 112, 0.5);
  line-height: 0;
  margin-right: 10px;
  transition: 0.3s;
}

.profile-card .social-links a:hover {
  color: #012970;
}

.profile-overview .row {
  margin-bottom: 20px;
  font-size: 15px;
}

.profile-overview .card-title {
  color: #012970;
}

.profile-overview .label {
  font-weight: 600;
  color: rgba(1, 41, 112, 0.6);
}

.profile-edit label {
  font-weight: 600;
  color: rgba(1, 41, 112, 0.6);
}

.profile-edit img {
  max-width: 120px;
}
</style>
