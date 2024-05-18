<script setup></script>

<template>
  <div>
    <section id="services" class="services">
      <div class="container" data-aos="fade-up">
        <div class="section-header">
          <h2>Our Services</h2>
          <p>
            Ea vitae aspernatur deserunt voluptatem impedit deserunt magnam
            occaecati dssumenda quas ut ad dolores adipisci aliquam.
          </p>
        </div>

        <div class="row gy-5">
          <div
            class="col-xl-4 col-md-6"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div class="service-item">
              <div class="img">
                <img src="/src/assets/logo.png" class="img-fluid" alt="" />
              </div>
              <div class="details position-relative">
                <div class="icon">
                  <i class="bi bi-activity"></i>
                </div>
                <a href="#" class="stretched-link">
                  <h3>Nesciunt Mete</h3>
                </a>
                <p>
                  Provident nihil minus qui consequatur non omnis maiores. Eos
                  accusantium minus dolores iure perferendis.
                </p>
              </div>
            </div>
          </div>
          <!-- End Service Item -->

          <div
            class="col-xl-4 col-md-6"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            <div class="service-item">
              <div class="img">
                <img src="/src/assets/logo.png" class="img-fluid" alt="" />
              </div>
              <div class="details position-relative">
                <div class="icon">
                  <i class="bi bi-broadcast"></i>
                </div>
                <a href="#" class="stretched-link">
                  <h3>Eosle Commodi</h3>
                </a>
                <p>
                  Ut autem aut autem non a. Sint sint sit facilis nam iusto
                  sint. Libero corrupti neque eum hic non ut nesciunt dolorem.
                </p>
              </div>
            </div>
          </div>
          <!-- End Service Item -->

          <div
            class="col-xl-4 col-md-6"
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            <div class="service-item">
              <div class="img">
                <img src="/src/assets/logo.png" class="img-fluid" alt="" />
              </div>
              <div class="details position-relative">
                <div class="icon">
                  <i class="bi bi-easel"></i>
                </div>
                <a href="#" class="stretched-link">
                  <h3>Ledo Markt</h3>
                </a>
                <p>
                  Ut excepturi voluptatem nisi sed. Quidem fuga consequatur.
                  Minus ea aut. Vel qui id voluptas adipisci eos earum corrupti.
                </p>
              </div>
            </div>
          </div>
          <!-- End Service Item -->

          <div
            class="col-xl-4 col-md-6"
            data-aos="zoom-in"
            data-aos-delay="500"
          >
            <div class="service-item">
              <div class="img">
                <img src="/src/assets/logo.png" class="img-fluid" alt="" />
              </div>
              <div class="details position-relative">
                <div class="icon">
                  <i class="bi bi-bounding-box-circles"></i>
                </div>
                <a href="#" class="stretched-link">
                  <h3>Asperiores Commodit</h3>
                </a>
                <p>
                  Non et temporibus minus omnis sed dolor esse consequatur.
                  Cupiditate sed error ea fuga sit provident adipisci neque.
                </p>
                <a href="#" class="stretched-link"></a>
              </div>
            </div>
          </div>
          <!-- End Service Item -->

          <div
            class="col-xl-4 col-md-6"
            data-aos="zoom-in"
            data-aos-delay="600"
          >
            <div class="service-item">
              <div class="img">
                <img src="/src/assets/logo.png" class="img-fluid" alt="" />
              </div>
              <div class="details position-relative">
                <div class="icon">
                  <i class="bi bi-calendar4-week"></i>
                </div>
                <a href="#" class="stretched-link">
                  <h3>Velit Doloremque</h3>
                </a>
                <p>
                  Cumque et suscipit saepe. Est maiores autem enim facilis ut
                  aut ipsam corporis aut. Sed animi at autem alias eius labore.
                </p>
                <a href="#" class="stretched-link"></a>
              </div>
            </div>
          </div>
          <!-- End Service Item -->

          <div
            class="col-xl-4 col-md-6"
            data-aos="zoom-in"
            data-aos-delay="700"
          >
            <div class="service-item">
              <div class="img">
                <img src="/src/assets/logo.png" class="img-fluid" alt="" />
              </div>
              <div class="details position-relative">
                <div class="icon">
                  <i class="bi bi-chat-square-text"></i>
                </div>
                <a href="#" class="stretched-link">
                  <h3>Dolori Architecto</h3>
                </a>
                <p>
                  Hic molestias ea quibusdam eos. Fugiat enim doloremque aut
                  neque non et debitis iure. Corrupti recusandae ducimus enim.
                </p>
                <a href="#" class="stretched-link"></a>
              </div>
            </div>
          </div>
          <!-- End Service Item -->
        </div>
      </div>
    </section>
    <!-- End Services Section -->
  </div>
</template>

<style scoped>
/**
* Template Name: HeroBiz
* Template URL: https://bootstrapmade.com/herobiz-bootstrap-business-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

/**
* Check out variables.css for easy customization of colors, typography, and other repetitive properties
*/
/*--------------------------------------------------------------
# General
--------------------------------------------------------------*/
:root {
  scroll-behavior: smooth;
}

a {
  color: var(--color-links);
  text-decoration: none;
}

a:hover {
  color: var(--color-links-hover);
  text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-primary);
}

/*--------------------------------------------------------------
# Sections & Section Header
--------------------------------------------------------------*/
section {
  padding: 60px 0;
  overflow: hidden;
}

.section-header {
  text-align: center;
  padding-bottom: 40px;
}

.section-header h2 {
  font-size: 48px;
  font-weight: 300;
  margin-bottom: 20px;
  color: var(--color-secondary);
}

.section-header p {
  margin: 0 auto;
  color: var(--color-secondary-light);
}

@media (min-width: 1280px) {
  .section-header p {
    max-width: 80%;
  }
}

/*--------------------------------------------------------------
# Scroll top button
--------------------------------------------------------------*/
.scroll-top {
  position: fixed;
  visibility: hidden;
  opacity: 0;
  right: 15px;
  bottom: 15px;
  z-index: 995;
  background: var(--color-primary);
  width: 40px;
  height: 40px;
  border-radius: 4px;
  transition: all 0.4s;
}

.scroll-top i {
  font-size: 24px;
  color: var(--color-white);
  line-height: 0;
}

.scroll-top:hover {
  background: rgba(var(--color-primary-rgb), 0.85);
  color: var(--color-white);
}

.scroll-top.active {
  visibility: visible;
  opacity: 1;
}

/*--------------------------------------------------------------
# Disable aos animation delay on mobile devices
--------------------------------------------------------------*/
@media screen and (max-width: 768px) {
  [data-aos-delay] {
    transition-delay: 0 !important;
  }
}

/*--------------------------------------------------------------
# Header
--------------------------------------------------------------*/
.header {
  padding: 15px 0;
  transition: all 0.5s;
  z-index: 997;
}

.header.sticked {
  background: var(--color-white);
  box-shadow: 0px 2px 20px rgba(var(--color-secondary-rgb), 0.1);
}

.header .logo img {
  max-height: 40px;
  margin-right: 6px;
}

.header .logo h1 {
  font-size: 32px;
  font-weight: 300;
  color: var(--color-secondary);
  font-family: var(--font-secondary);
}

.header .logo h1 span {
  color: var(--color-primary);
  font-weight: 500;
}

.header .btn-getstarted,
.header .btn-getstarted:focus {
  font-size: 16px;
  color: var(--color-white);
  background: var(--color-primary);
  padding: 8px 23px;
  border-radius: 4px;
  transition: 0.3s;
  font-family: var(--font-secondary);
}

.header .btn-getstarted:hover,
.header .btn-getstarted:focus:hover {
  color: var(--color-white);
  background: rgba(var(--color-primary-rgb), 0.85);
}

@media (max-width: 1279px) {
  .header .btn-getstarted,
  .header .btn-getstarted:focus {
    margin-right: 50px;
  }
}

/*--------------------------------------------------------------
# Services Section
--------------------------------------------------------------*/
.services .img {
  border-radius: 8px;
  overflow: hidden;
}

.services .img img {
  transition: 0.6s;
}

.services .details {
  padding: 50px 30px;
  margin: -100px 30px 0 30px;
  transition: all ease-in-out 0.3s;
  background: var(--color-white);
  position: relative;
  background: rgba(var(--color-white-rgb), 0.9);
  text-align: center;
  border-radius: 8px;
  box-shadow: 0px 0 25px rgba(var(--color-black-rgb), 0.1);
}

.services .details .icon {
  margin: 0;
  width: 72px;
  height: 72px;
  background: var(--color-primary);
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: var(--color-white);
  font-size: 28px;
  transition: ease-in-out 0.3s;
  position: absolute;
  top: -36px;
  left: calc(50% - 36px);
  border: 6px solid var(--color-white);
}

.services .details h3 {
  color: var(--color-default);
  font-weight: 700;
  margin: 10px 0 15px 0;
  font-size: 22px;
  transition: ease-in-out 0.3s;
}

.services .details p {
  line-height: 24px;
  font-size: 14px;
  margin-bottom: 0;
}

.services .service-item:hover .details h3 {
  color: var(--color-primary);
}

.services .service-item:hover .details .icon {
  background: var(--color-white);
  border: 2px solid var(--color-primary);
}

.services .service-item:hover .details .icon i {
  color: var(--color-primary);
}

.services .service-item:hover .img img {
  transform: scale(1.2);
}

/**
* Template Name: HeroBiz
* File: variables-blue.css
* Description: Easily customize colors, typography, and other repetitive properties used in the template main stylesheet file main.css
* 
* Template URL: https://bootstrapmade.com/herobiz-bootstrap-business-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
* 
* Contents:
* 1. HeroBiz template variables 
* 2. Override default Bootstrap variables
* 3. Set color and background class names
*
* Learn more about CSS variables at https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
*/

/*--------------------------------------------------------------
# 1. HeroBiz template variables 
--------------------------------------------------------------*/
:root {
  /* Fonts */
  --font-default: "Open Sans", system-ui, -apple-system, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-primary: "Source Sans Pro", sans-serif;
  --font-secondary: "Poppins", sans-serif;

  /* Colors */
  /* The *-rgb color names are simply the RGB converted value of the corresponding color for use in the rgba() function */

  /* Default text color */
  --color-default: #1a1f24;
  --color-default-rgb: 26, 31, 36;

  /* Defult links color */
  --color-links: #3279fc;
  --color-links-hover: #4797ff;

  /* Primay colors */
  --color-primary: #3279fc;
  --color-primary-light: #4797ff;
  --color-primary-dark: #1c61e2;

  --color-primary-rgb: 50, 121, 252;
  --color-primary-light-rgb: 71, 151, 255;
  --color-primary-dark-rgb: 28, 97, 226;

  /* Secondary colors */
  --color-secondary: #5670a0;
  --color-secondary-light: #6e87b6;
  --color-secondary-dark: #3b5380;

  --color-secondary-rgb: 86, 112, 160;
  --color-secondary-light-rgb: 110, 135, 182;
  --color-secondary-dark-rgb: 59, 83, 128;

  /* General colors */
  --color-blue: #0d6efd;
  --color-blue-rgb: 13, 110, 253;

  --color-indigo: #6610f2;
  --color-indigo-rgb: 102, 16, 242;

  --color-purple: #6f42c1;
  --color-purple-rgb: 111, 66, 193;

  --color-pink: #f3268c;
  --color-pink-rgb: 243, 38, 140;

  --color-red: #df1529;
  --color-red-rgb: 223, 21, 4;

  --color-orange: #fd7e14;
  --color-orange-rgb: 253, 126, 20;

  --color-yellow: #ffc107;
  --color-yellow-rgb: 255, 193, 7;

  --color-green: #059652;
  --color-green-rgb: 5, 150, 82;

  --color-teal: #20c997;
  --color-teal-rgb: 32, 201, 151;

  --color-cyan: #0dcaf0;
  --color-cyan-rgb: 13, 202, 240;

  --color-white: #ffffff;
  --color-white-rgb: 255, 255, 255;

  --color-gray: #6c757d;
  --color-gray-rgb: 108, 117, 125;

  --color-black: #000000;
  --color-black-rgb: 0, 0, 0;
}

/*--------------------------------------------------------------
# 2. Override default Bootstrap variables
--------------------------------------------------------------*/
:root {
  --bs-blue: var(--color-blue);
  --bs-indigo: var(--color-indigo);
  --bs-purple: var(--color-purple);
  --bs-pink: var(--color-pink);
  --bs-red: var(--color-red);
  --bs-orange: var(--color-orange);
  --bs-yellow: var(--color-yellow);
  --bs-green: var(--color-green);
  --bs-teal: var(--color-teal);
  --bs-cyan: var(--color-cyan);
  --bs-white: var(--color-white);
  --bs-gray: var(--color-gray);
  --bs-gray-dark: #343a40;
  --bs-gray-100: #f8f9fa;
  --bs-gray-200: #e9ecef;
  --bs-gray-300: #dee2e6;
  --bs-gray-400: #ced4da;
  --bs-gray-500: #adb5bd;
  --bs-gray-600: #6c757d;
  --bs-gray-700: #495057;
  --bs-gray-800: #343a40;
  --bs-gray-900: #212529;
  --bs-primary: var(--color-blue);
  --bs-secondary: var(--color-blue);
  --bs-success: #198754;
  --bs-info: #0dcaf0;
  --bs-warning: #ffc107;
  --bs-danger: #dc3545;
  --bs-light: #f8f9fa;
  --bs-dark: #212529;
  --bs-primary-rgb: var(--color-primary-rgb);
  --bs-secondary-rgb: var(--color-secondary-rgb);
  --bs-success-rgb: 25, 135, 84;
  --bs-info-rgb: 13, 202, 240;
  --bs-warning-rgb: 255, 193, 7;
  --bs-danger-rgb: 220, 53, 69;
  --bs-light-rgb: 248, 249, 250;
  --bs-dark-rgb: 33, 37, 41;
  --bs-white-rgb: var(--color-white-rgb);
  --bs-black-rgb: var(--color-black-rgb);
  --bs-body-color-rgb: var(--color-default-rgb);
  --bs-body-bg-rgb: 255, 255, 255;
  --bs-font-sans-serif: var(--font-default);
  --bs-font-monospace: SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  --bs-gradient: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0)
  );
  --bs-body-font-family: var(--font-default);
  --bs-body-font-size: 1rem;
  --bs-body-font-weight: 400;
  --bs-body-line-height: 1.5;
  --bs-body-color: var(--color-default);
  --bs-body-bg: #fff;
}

/*--------------------------------------------------------------
# 3. Set color and background class names
--------------------------------------------------------------*/
/* Fonts */
.font-default {
  font-family: var(--font-default) !important;
}
.font-primary {
  font-family: var(--font-primary) !important;
}
.font-secondary {
  font-family: var(--font-secondary) !important;
}

/* Text Colors */
.color-default {
  color: var(--color-default) !important;
}
.color-links {
  color: var(--color-links) !important;
}
.color-links:hover {
  color: var(--color-links-hover) !important;
}
.color-primary {
  color: var(--color-primary) !important;
}
.color-primary-light {
  color: var(--color-primary-light) !important;
}
.color-primary-dark {
  color: var(--color-primary-dark) !important;
}
.color-secondary {
  color: var(--color-secondary) !important;
}
.color-secondary-light {
  color: var(--color-secondary-light) !important;
}
.color-secondary-dark {
  color: var(--color-secondary-dark) !important;
}
.color-blue {
  color: var(--color-blue) !important;
}
.color-indigo {
  color: var(--color-indigo) !important;
}
.color-purple {
  color: var(--color-purple) !important;
}
.color-pink {
  color: var(--color-pink) !important;
}
.color-red {
  color: var(--color-red) !important;
}
.color-orange {
  color: var(--color-orange) !important;
}
.color-yellow {
  color: var(--color-yellow) !important;
}
.color-green {
  color: var(--color-green) !important;
}
.color-teal {
  color: var(--color-teal) !important;
}
.color-cyan {
  color: var(--color-cyan) !important;
}
.color-white {
  color: var(--color-white) !important;
}
.color-gray {
  color: var(--color-gray) !important;
}
.color-black {
  color: var(--color-black) !important;
}

/* Background Colors */
.bg-default {
  background-color: var(--color-default) !important;
}
.bg-primary {
  background-color: var(--color-primary) !important;
}
.bg-primary-light {
  background-color: var(--color-primary-light) !important;
}
.bg-primary-dark {
  background-color: var(--color-primary-dark) !important;
}
.bg-secondary {
  background-color: var(--color-secondary) !important;
}
.bg-secondary-light {
  background-color: var(--color-secondary-light) !important;
}
.bg-secondary-dark {
  background-color: var(--color-secondary-dark) !important;
}
.bg-blue {
  background-color: var(--color-blue) !important;
}
.bg-indigo {
  background-color: var(--color-indigo) !important;
}
.bg-purple {
  background-color: var(--color-purple) !important;
}
.bg-pink {
  background-color: var(--color-pink) !important;
}
.bg-red {
  background-color: var(--color-red) !important;
}
.bg-orange {
  background-color: var(--color-orange) !important;
}
.bg-yellow {
  background-color: var(--color-yellow) !important;
}
.bg-green {
  background-color: var(--color-green) !important;
}
.bg-teal {
  background-color: var(--color-teal) !important;
}
.bg-cyan {
  background-color: var(--color-cyan) !important;
}
.bg-white {
  background-color: var(--color-white) !important;
}
.bg-gray {
  background-color: var(--color-gray) !important;
}
.bg-black {
  background-color: var(--color-black) !important;
}
</style>
