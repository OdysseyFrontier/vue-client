<script setup></script>

<template>
  <div class="tab-pane fade show active profile-overview" id="main">
    <h5 class="card-title">About</h5>
    <p class="small fst-italic">
      Sunt est soluta temporibus accusantium neque nam maiores cumque
      temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure
      rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea
      saepe at unde.
    </p>

    <h5 class="card-title">Profile Details</h5>

    <div class="row">
      <div class="col-lg-3 col-md-4 label">Full Name</div>
      <div class="col-lg-9 col-md-8">Kevin Anderson</div>
    </div>

    <div class="row">
      <div class="col-lg-3 col-md-4 label">Company</div>
      <div class="col-lg-9 col-md-8">Lueilwitz, Wisoky and Leuschke</div>
    </div>

    <div class="row">
      <div class="col-lg-3 col-md-4 label">Job</div>
      <div class="col-lg-9 col-md-8">Web Designer</div>
    </div>

    <div class="row">
      <div class="col-lg-3 col-md-4 label">Country</div>
      <div class="col-lg-9 col-md-8">USA</div>
    </div>

    <div class="row">
      <div class="col-lg-3 col-md-4 label">Address</div>
      <div class="col-lg-9 col-md-8">A108 Adam Street, New York, NY 535022</div>
    </div>

    <div class="row">
      <div class="col-lg-3 col-md-4 label">Phone</div>
      <div class="col-lg-9 col-md-8">(436) 486-3538 x29071</div>
    </div>

    <div class="row">
      <div class="col-lg-3 col-md-4 label">Email</div>
      <div class="col-lg-9 col-md-8">k.anderson@example.com</div>
    </div>
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
</style>
