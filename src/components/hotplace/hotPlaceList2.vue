
<script setup>
import { useSidebarStore } from "@/stores/sidebar.js";

const sidebarStore = useSidebarStore();
sidebarStore.changesSidebarState("hotplace");

import SearchHotPlace from "@/components/hotplace/SearchHotPlace.vue";

import Isotope from "isotope-layout"
import GLightbox from "glightbox"



import { ref, onMounted, watchEffect } from 'vue'
import { useRouter } from "vue-router";
import { useHotPlaceStore } from '@/stores/hotplace.js';
import HotPlaceListItem from '@/components/hotplace/item/HotPlaceListItem.vue'
import { listHotPlace } from "@/api/hotplace.js";

const router = useRouter();
let store = useHotPlaceStore();

const hotPlaces = ref([])

watchEffect(() => {
    if (!useHotPlaceStore().searchAttractionList) {
        return;
    }

    hotPlaces.value = useHotPlaceStore().searchAttractionList;
});

onMounted(() => {
  getHotPlaceList();
});


const param = ref({});

const getHotPlaceList = () => {
  console.log("서버에서 글목록 얻어오자!!!", param.value);
  listHotPlace(
    param.value,
    ( response ) => {
      console.log(response.data)
      hotPlaces.value = response.data;
      console.log(hotPlaces.value)
    },
    (error) => {
      console.log(error);
    }
  );
};


const moveWrite = () => {
  router.push({ name: "hotPlaceWrite" });
};

setTimeout(()=>{
/**
* Template Name: Laura
* Template URL: https://bootstrapmade.com/laura-free-creative-bootstrap-theme/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

/**
   * Porfolio isotope and filter
   */
  let portfolioContainer = document.querySelector('.portfolio-container');
    console.log("1")
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = document.querySelectorAll('#portfolio-flters li');


      portfolioFilters.forEach(e => e.addEventListener('click', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

      }))
    }

 

  // /**
  //  * Initiate portfolio lightbox 
  //  */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });


})()
})

</script>


<template>
    <!-- ======= My Portfolio Section ======= -->
    <section id="portfolio" class="portfolio">
      <div class="container">
        <div class="align-right">
          <button class="btn btn-outline-primary btn-sm" @click="moveWrite">핫플등록</button>
        </div>

        <div class="section-title">
          <span>Hot Place</span>
          <h2>Hot Place</h2>
          <p>자신만의 장소를 공유해보세요!</p>
        </div>

        <!-- <SearchHotPlace/> -->

        <ul id="portfolio-flters" class="d-flex justify-content-center">
          <li data-filter="*" class="filter-active">All</li>
          <li data-filter=".filter-12">관광지</li>
          <li data-filter=".filter-14">문화시설</li>
          <li data-filter=".filter-15">축제 / 공연 / 행사</li>
          <li data-filter=".filter-25">여행코스</li>
          <li data-filter=".filter-28">레포츠</li>
          <li data-filter=".filter-32">숙박</li>
          <li data-filter=".filter-38">쇼핑</li>
          <li data-filter=".filter-39">음식점</li>
        </ul>

        <div class="row portfolio-container">
          <div v-if="hotPlaces == null"> 게시글이 없습니다. </div>
          <HotPlaceListItem v-for="hotplace in hotPlaces" :key="hotplace.contentId" :hotplace="hotplace" />


          <div class="col-lg-4 col-md-6 portfolio-item fitter-12">
            <a href="/src/assets/portfolio/portfolio-1.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox preview-link" title="사진을 누를시 뭐가 된다던디">
            <div class="portfolio-img"><img src="/src/assets/portfolio/portfolio-1.jpg" class="img-fluid" alt=""></div>
          </a>
          <div class="portfolio-2">
              <i class="bi bi-person-check-fill"></i> : 200
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-square-heart-fill" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6 3.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
</svg> : 12
            </div>
            <div class="portfolio-info">
              <h4>App 1</h4>
              <p>App</p>
              <!-- <a href="/src/assets/portfolio/portfolio-1.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox preview-link" title="App 1"><i class="bi bi-plus"></i></a> -->

              <RouterLink
                  :to="{name: 'hotPlaceDetail',params: {contentId: '1'} }"
                  class="details-link"
                  title="자세히 보기"
                >
                <i class="bi bi-info-circle"></i>
                </RouterLink>
            </div>
            
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-web">
            <div class="portfolio-img"><img src="/src/assets/portfolio/portfolio-2.jpg" class="img-fluid" alt=""></div>
            <div class="portfolio-info">
              <h4>Web 3</h4>
              <p>Web</p>
              <a href="assets/img/portfolio/portfolio-2.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox preview-link" title="Web 3"><i class="bi bi-plus"></i></a>
              <RouterLink
                  :to="{name: 'hotPlaceDetail',params: {contentId: '1'} }"
                  class="details-link"
                  title="자세히 보기"
                >
                <i class="bi bi-link"></i>
                </RouterLink>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-app">
            <div class="portfolio-img"><img src="/src/assets/portfolio/portfolio-3.jpg" class="img-fluid" alt=""></div>
            <div class="portfolio-info">
              <h4>App 2</h4>
              <p>App</p>
              <a href="assets/img/portfolio/portfolio-3.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox preview-link" title="App 2"><i class="bi bi-plus"></i></a>
              <RouterLink
                  :to="{name: 'hotPlaceDetail',params: {contentId: '1'} }"
                  class="details-link"
                  title="자세히 보기"
                >
                <i class="bi bi-link"></i>
                </RouterLink>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-card">
            <div class="portfolio-img"><img src="/src/assets/portfolio/portfolio-4.jpg" class="img-fluid" alt=""></div>
            <div class="portfolio-info">
              <h4>Card 2</h4>
              <p>Card</p>
              <a href="assets/img/portfolio/portfolio-4.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox preview-link" title="Card 2"><i class="bi bi-plus"></i></a>
              <RouterLink
                  :to="{name: 'hotPlaceDetail',params: {contentId: '1'} }"
                  class="details-link"
                  title="자세히 보기"
                >
                <i class="bi bi-link"></i>
                </RouterLink>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-web">
            <div class="portfolio-img"><img src="/src/assets/portfolio/portfolio-5.jpg" class="img-fluid" alt=""></div>
            <div class="portfolio-info">
              <h4>Web 2</h4>
              <p>Web</p>
              <a href="assets/img/portfolio/portfolio-5.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox preview-link" title="Web 2"><i class="bi bi-plus"></i></a>
              <RouterLink
                  :to="{name: 'hotPlaceDetail',params: {contentId: '1'} }"
                  class="details-link"
                  title="자세히 보기"
                >
                <i class="bi bi-link"></i>
                </RouterLink>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-app">
            <div class="portfolio-img"><img src="/src/assets/portfolio/portfolio-6.jpg" class="img-fluid" alt=""></div>
            <div class="portfolio-info">
              <h4>App 3</h4>
              <p>App</p>
              <a href="assets/img/portfolio/portfolio-6.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox preview-link" title="App 3"><i class="bi bi-plus"></i></a>
              <RouterLink
                  :to="{name: 'hotPlaceDetail',params: {contentId: '1'} }"
                  class="details-link"
                  title="자세히 보기"
                >
                <i class="bi bi-link"></i>
                </RouterLink>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-card">
            <div class="portfolio-img"><img src="/src/assets/portfolio/portfolio-7.jpg" class="img-fluid" alt=""></div>
            <div class="portfolio-info">
              <h4>Card 1</h4>
              <p>Card</p>
              <a href="/src/assets/portfolio/portfolio-7.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox preview-link" title="Card 1"><i class="bi bi-plus"></i></a>
              <RouterLink
                  :to="{name: 'hotPlaceDetail',params: {contentId: '1'} }"
                  class="details-link"
                  title="자세히 보기"
                >
                <i class="bi bi-link"></i>
                </RouterLink>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-card">
            <div class="portfolio-img"><img src="/src/assets/portfolio/portfolio-8.jpg" class="img-fluid" alt=""></div>
            <div class="portfolio-info">
              <h4>Card 3</h4>
              <p>Card</p>
              <a href="/src/asset/portfolio/portfolio-8.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox preview-link" title="Card 3"><i class="bi bi-zoom-in"></i></a>
              <RouterLink
                  :to="{name: 'hotPlaceDetail',params: {contentId: '1'} }"
                  class="details-link"
                  title="자세히 보기"
                >
                <i class="bi bi-info-square"></i>
                </RouterLink>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-web">
            <div class="portfolio-img"><img src="/src/assets/portfolio/portfolio-9.jpg" class="img-fluid" alt=""></div>
            <div class="portfolio-2">
              <i class="bi bi-eye"></i> : 200
              <i class="bi bi-chat-square-heart-fill"></i> : 12
            </div>
            <div class="portfolio-info">
              <h4>Web 3</h4>
              <p>Web</p>
              <a href="/src/asset/portfolio/portfolio-9.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox preview-link" title="Web 3"><i class="bi bi-zoom-in"></i></a>
              <RouterLink
                  :to="{name: 'hotPlaceDetail',params: {contentId: '1'} }"
                  class="details-link"
                  title="자세히 보기"
                >
                <i class="bi bi-info-circle"></i>
                </RouterLink>
            </div>
          </div>

        </div>

      </div>
    </section><!-- End My Portfolio Section -->
    
</template>

<style scoped>
.align-right{text-align:right !important;}

.portfolio .portfolio-item .portfolio-2 {
  /* opacity: 0;
  left: 15px;
  bottom: 0;
  z-index: 3;
  right: 15px;
  transition: all ease-in-out 0.3s;
  padding: 10px 15px; */

  position: absolute;
  right: 15px;
  font-size: 24px;
  top: 0;
  color: rgb(75, 75, 77);
  /* transition: 0.3s; */

  /* opacity: 1; */
}
/* .portfolio .portfolio-item:hover .portfolio-2 {
  opacity: 0;

} */
@media (max-width: 1199px) {
  .portfolio .portfolio-item .portfolio-2 {
    font-size: 22px;
  }
}

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
body {
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
h6 {
  font-family: "Raleway", sans-serif;
}


/*--------------------------------------------------------------
# Sections General
--------------------------------------------------------------*/
section {
  padding: 60px 0;
}

.section-bg {
  background-color: white;
}

.section-title {
  text-align: center;
  padding: 30px 0;
  position: relative;
}

.section-title h2 {
  font-size: 32px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 20px;
  padding-bottom: 0;
  color: #3b434a;
  position: relative;
  z-index: 2;
}

.section-title span {
  position: absolute;
  top: 30px;
  color: #eef0f2;
  left: 0;
  right: 0;
  z-index: 1;
  font-weight: 700;
  font-size: 52px;
  text-transform: uppercase;
  line-height: 0;
}

.section-title p {
  margin-bottom: 0;
  position: relative;
  z-index: 2;
}

@media (max-width: 575px) {
  .section-title h2 {
    font-size: 28px;
    margin-bottom: 15px;
  }

  .section-title span {
    font-size: 38px;
  }
}

/*--------------------------------------------------------------
# My Portfolio
--------------------------------------------------------------*/
.portfolio #portfolio-flters {
  list-style: none;
  margin-bottom: 20px;
}

.portfolio #portfolio-flters li {
  cursor: pointer;
  display: inline-block;
  margin: 0 10px 10px 10px;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  padding: 7px 10px;
  text-transform: uppercase;
  color: #444444;
  transition: all 0.3s ease-in-out;
  border: 2px solid #fff;
}

.portfolio #portfolio-flters li:hover,
.portfolio #portfolio-flters li.filter-active {
  color: #f3a200;
  border-color: #ffb727;
}

.portfolio .portfolio-item {
  margin-bottom: 30px;
}

.portfolio .portfolio-item .portfolio-img {
  overflow: hidden;
}

.portfolio .portfolio-item .portfolio-img img {
  transition: all 0.8s ease-in-out;
}

.portfolio .portfolio-item .portfolio-info {
  opacity: 0;
  position: absolute;
  left: 15px;
  bottom: 0;
  z-index: 3;
  right: 15px;
  transition: all ease-in-out 0.3s;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px 15px;
}

.portfolio .portfolio-item .portfolio-info h4 {
  font-size: 18px;
  color: #fff;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0px;
}

.portfolio .portfolio-item .portfolio-info p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  margin-bottom: 0;
}

.portfolio .portfolio-item .portfolio-info .preview-link,
.portfolio .portfolio-item .portfolio-info .details-link {
  position: absolute;
  right: 40px;
  font-size: 24px;
  top: calc(50% - 18px);
  color: #fff;
  transition: 0.3s;
}

.portfolio .portfolio-item .portfolio-info .preview-link:hover,
.portfolio .portfolio-item .portfolio-info .details-link:hover {
  color: #ffc041;
}

.portfolio .portfolio-item .portfolio-info .details-link {
  right: 10px;
}

.portfolio .portfolio-item:hover .portfolio-img img {
  transform: scale(1.2);
}

.portfolio .portfolio-item:hover .portfolio-info {
  opacity: 1;
}

</style>