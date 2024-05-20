<script setup>
import { defineProps } from 'vue';

defineProps({
    attraction: Object
});

const defaultAttractionImg = "src/assets/attraction/defaultAttractionImg.png";

const truncateDescription = (description) => {
    const maxLength = 20; // 최대 길이 설정
    if (!description) return "등록된 설명이 없습니다."
    if (description.length > maxLength) {
        return description.slice(0, maxLength) + '...';
    } else {
        return description;
    }
};

// const defalutImg = "https://a0.muscache.com/im/pictures/miso/Hosting-1050570021780851760/original/d2fdb32c-56d4-4947-b8f6-705ff5e6cc08.jpeg?im_w=720";

// const emit = defineEmits(['addCart']);

// const addToCart = () => {
// emit('addCart');
// }

</script>

<template>
    <div class="card">
        <img :src="attraction.firstImage || defaultAttractionImg" class=" card-img-top" alt="...">
        <!-- 좋아요 위치 -->
        <div class="card-body">
            <h5 class="card-title">{{ attraction.title }}</h5>
            <!-- <p class="card-text"> -->
            <!-- 하트그림 -->
            <!-- 좋아요 몇개 인지</p> -->
            <p class="card-text">{{ attraction.addr1 }}</p>
            <p class="card-text" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                {{ truncateDescription(attraction.description) }}
            </p>
            <a href="#" class="btn btn-primary">상세 보기</a>
        </div>
    </div>
</template>


<!-- <div>
    <div>
     <div>
     </div>
</div>
</div>
<div style="--transition-element_transition-delay: 0ms; --transition-element_transition-duration: 200ms;">
    <div itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">
     <meta content="엘리 &amp; 케임브리지 근처의 독특한 글램핑 체험" itemprop="name"/>
     <meta content="2" itemprop="position"/>
     <meta content="www.airbnb.co.kr/rooms/35134577?adults=1&amp;category_tag=Tag%3A8226&amp;children=0&amp;enable_m3_private_room=true&amp;infants=0&amp;pets=0&amp;photo_id=821615651&amp;search_mode=regular_search&amp;check_in=2024-09-04&amp;check_out=2024-09-09&amp;source_impression_id=p3_1715828941_uva%2BsrWnO8XDfTuF&amp;previous_page_section_name=1000" itemprop="url"/>
     <div>
      <div>
       <div aria-labelledby="title_35134577" data-testid="card-container" role="group">
        <a aria-labelledby="title_35134577" href="/rooms/35134577?adults=1&amp;category_tag=Tag%3A8226&amp;children=0&amp;enable_m3_private_room=true&amp;infants=0&amp;pets=0&amp;photo_id=821615651&amp;search_mode=regular_search&amp;check_in=2024-09-04&amp;check_out=2024-09-09&amp;source_impression_id=p3_1715828941_uva%2BsrWnO8XDfTuF&amp;previous_page_section_name=1000&amp;federated_search_id=a5faa8bd-7613-4b4f-839b-24345497d2c4" rel="noopener noreferrer nofollow" target="listing_35134577">
        </a>
        <div>
         <div>
          <div>
           <div aria-describedby="carousel-description" role="group">
            <div>
             <div>
              <div>
<div>
                <div>
                 <button aria-label="위시리스트에 추가: 영국 Sutton의 오두막" data-testid="listing-card-save-button" type="button">
                  <svg aria-hidden="true" focusable="false" role="presentation" style="display: block; fill: rgba(0, 0, 0, 0.5); height: 24px; width: 24px; stroke: var(--linaria-theme_palette-icon-primary-inverse); stroke-width: 2; overflow: visible;" viewbox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                   <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z">
                   </path>
                  </svg>
                 </button>
                </div>
</div>
</div>
<div>
               <div>
                <div>
                 <button aria-disabled="true" aria-hidden="true" aria-label="이전 사진: 영국 Sutton의 오두막" data-is-hidden="true" tabindex="-1" type="button">
                  <span>
                   <svg aria-hidden="true" focusable="false" role="presentation" style="display: block; fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 4; overflow: visible;" viewbox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4" fill="none">
                    </path>
                   </svg>
                  </span>
                 </button>
                </div>
</div>
<div>
                <div>
                 <button aria-disabled="false" aria-hidden="true" aria-label="다음 사진: 영국 Sutton의 오두막" tabindex="0" type="button">
                  <span>
                   <svg aria-hidden="true" focusable="false" role="presentation" style="display: block; fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 4; overflow: visible;" viewbox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28" fill="none">
                    </path>
                   </svg>
                  </span>
                 </button>
                </div>
</div>
</div>
<div>
               <div>
               </div>
<div>
                <div aria-label="전체 6장 중 1번째 사진" role="img">
                 <div>
                  <div style="--dls-indicatordots-container-transform: translateX(0px);">
                   <span style="--dls-indicatordots-dot-transform: scale(1);">
                   </span>
                   <span style="--dls-indicatordots-dot-transform: scale(1);">
                   </span>
                   <span style="--dls-indicatordots-dot-transform: scale(1);">
                   </span>
                   <span style="--dls-indicatordots-dot-transform: scale(0.8333333333333334);">
                   </span>
                   <span style="--dls-indicatordots-dot-transform: scale(0.6666666666666666);">
                   </span>
                   <span style="--dls-indicatordots-dot-transform: scale(0.6666666666666666);">
                   </span>
                  </div>
</div>
</div>
</div>
<div>
               </div>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="a">
          <div data-testid="listing-card-title" id="title_35134577">
           영국 Sutton의 오두막
          </div>
<div>
           <span>
            <span>
             평점 4.91점(5점 만점), 후기 468개
            </span>
            <svg aria-hidden="true" focusable="false" role="presentation" style="display: block; height: 12px; width: 12px; fill: currentcolor;" viewbox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
             <path d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z" fill-rule="evenodd">
             </path>
            </svg>
            <span aria-hidden="true">
             4.91 (468)
            </span>
           </span>
           <div inert="true">
           </div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div> -->