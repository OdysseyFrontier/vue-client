
<script setup>
import Isotope from "isotope-layout"
import GLightbox from "glightbox"

import { ref, onMounted, watchEffect } from 'vue'
import { useRouter, useRoute } from "vue-router";
import HotPlaceListItem from '@/components/hotplace/item/HotPlaceListItem.vue'
import { MemberLikeHotPlaceList } from "@/api/member.js";
import { useMemberStore } from '@/stores/member';

const store = useMemberStore();

const router = useRouter();
const route = useRoute();

const hotPlaces = ref([])

let { memberId } = route.params;
if(memberId == "me"){
    memberId = store.memberInfo.memberId
}


onMounted(() => {
  getHotPlaceList();
});


const param = ref({});

const getHotPlaceList = () => {
  console.log("서버에서 회원의 핫플레이스 리스트 얻어오자!!!", memberId);
  MemberLikeHotPlaceList(
    memberId,
    ( response ) => {
      hotPlaces.value = response.data;
    },
    (error) => {
      console.log(error);
    }
  );
};




setTimeout(()=>{
(function() {
  "use strict";

/**
   * Porfolio isotope and filter
   */
  let portfolioContainer = document.querySelector('.portfolio-container');
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
        <!-- <div class="align-right">
          <button class="btn btn-outline-primary btn-sm" @click="moveWrite">핫플등록</button>
        </div> -->

        <!-- <div class="section-title">
          <span>Hot Place</span>
          <h2>Hot Place</h2>
          <p>자신만의 장소를 공유해보세요!</p>
        </div> -->

        <!-- <SearchHotPlace/> -->

        <ul id="portfolio-flters" class="d-flex justify-content-center" v-if="hotPlaces.length != 0">
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

        <div v-if="hotPlaces.length == 0" style="text-Align: center"> 좋아요한 핫플레이스가 없습니다. </div>
        
        <div class="row portfolio-container" v-if="hotPlaces.length != 0">
          <HotPlaceListItem v-for="hotplace in hotPlaces" :key="hotplace.contentId" :hotplace="hotplace" />
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
  padding: 40px 0 20px;
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