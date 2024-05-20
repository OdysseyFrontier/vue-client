<script setup>
import {ref, onMounted} from "vue"
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import "swiper/css"
import 'swiper/css/autoplay';
import 'swiper/css/pagination';


setTimeout(()=>{
 /**
   * Portfolio details slider
   */
   new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    modules: [Autoplay, Pagination],
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });
})


  import { useRoute, useRouter } from "vue-router";
  import { detailHotPlace, likeHotPlace, deleteLikeHotPlace, } from "@/api/hotplace";
  import { useMemberStore } from "@/stores/member"

    const route = useRoute();
    const router = useRouter();
    const memberStore = useMemberStore()

    const { contentId } = route.params;

    const hotplace = ref({});
    const category = ref("")

    const isLike = ref(false);
    const param = ref({
        memberId: useMemberStore().memberInfo.memberId,
        contentId: ""
    });


function likeToggle(flag) {
        isLike.value = !isLike.value;
        console.log(isLike.value)
        console.log(param.value)

        if(flag){
          likeHotPlace(
    param.value,
    (response) => {
        console.log(response.data);
      let msg = "좋아요 누름 처리시 문제 발생했습니다.";
      if (response.status == 201) msg = "좋아요 누름이 완료되었습니다.";
      alert(msg);
      hotplace.value.likes++;
    },
    (error) => console.error(error)
  );
        }else{
          deleteLikeHotPlace(
    param.value,
    (response) => {
        console.log(response.data);
      let msg = "좋아요 취소 누름 처리시 문제 발생했습니다.";
      if (response.status == 200) msg = "좋아요 취소 누름이 완료되었습니다.";
      alert(msg);
      hotplace.value.likes--;
    },
    (error) => console.error(error)
  );
    }}

    onMounted(() => {
        getHotplace();
    });

    const getHotplace = () => {
        detailHotPlace(
            contentId,
            ({ data }) => {
            hotplace.value = data;

            console.log(hotplace.value);
            if(hotplace.value.isLike){
            isLike.value = true;
        }

        param.value.contentId = hotplace.value.contentId;

       if(hotplace.value.contentTypeId == "12"){
            category.value = "관광지"
    }else if(hotplace.value.contentTypeId == "14"){
                category.value = "문화시설"}
    else if(hotplace.value.contentTypeId == "15"){
                category.value = "축제 / 공연 / 행사"
    }else if(hotplace.value.contentTypeId == "25"){
                category.value = "여행코스"
    }else if(hotplace.value.contentTypeId == "28"){
                category.value = "레포츠"
    }else if(hotplace.value.contentTypeId == "32"){
                category.value = "숙박"
    }else if(hotplace.value.contentTypeId == "38"){
                category.value = "쇼핑"
    }else if(hotplace.value.contentTypeId == "39"){
                category.value = "음식점"
    }else{
                category.value = "기타"
        }
            },
            (error) => {
            console.error(error);
            }
        );

        
    };

    function moveList() {
        router.push({ name: "hotPlaceList2" });
    }

    // function moveModify() {
    //     router.push({ name: "hotPlaceModify", params: { contentId } });
    // }

    // function onDeleteArticle() {
    //     deleteHotplace(
    //         contentId,
    //         (response) => {
    //         if (response.status == 200) moveList();
    //         },
    //         (error) => {
    //         console.error(error);
    //         }
    //     );
    // }
</script>


<template>
     <!-- ======= Portfolio Details Section ======= -->

     <div class="clearfix btn-wrap align-right mt30" v-if="hotplace.memberId === memberStore.memberInfo.memberId">
            <button class="table-btn btn-write btn_bbsList" @click="moveModify(true)">수정</button>
            <!-- <button class="table-btn btn-exit btn_bbsList" @click="onDeleteArticle(false)">삭제</button> -->
        </div>



     <section id="portfolio-details" class="portfolio-details">
      <div class="container">

        <div class="row gy-4">

          <div class="col-lg-8">
            <div class="portfolio-details-slider swiper">
              <div class="swiper-wrapper align-items-center">

                <div class="swiper-slide">
                  <img :src="hotplace.firstImage" alt="">
                </div>

                <div class="swiper-slide">
                  <img src="/src/assets/portfolio/portfolio-details-2.jpg" alt="">
                </div>

                <div class="swiper-slide">
                  <img src="/src/assets/portfolio/portfolio-details-3.jpg" alt="">
                </div>

              </div>
              <div class="swiper-pagination"></div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="portfolio-info">
              <div class="d-flex">
                <!-- <i class="bi bi-person-check-fill"></i> : 200
                <pre> </pre>
                <i class="bi bi-heart-fill"></i> : 12 -->
                <i v-if="!isLike" @click="likeToggle(true)" class="bi bi-heart ms-auto fs-5"></i>
                <i v-if="isLike" @click="likeToggle(false)" class="bi bi-heart-fill ms-auto fs-5"></i>
              </div>
              <h3>{{hotplace.title}}</h3>
              <pre class="a">조회수 : {{hotplace.hit}}   좋아요 : {{hotplace.likes}}</pre>
              <ul>
                <li><strong>Category</strong> : {{category}}</li>
                <li><strong>작성자</strong> : {{hotplace.name}}</li>
                <li><strong>작성일</strong> : {{hotplace.createdTime}}</li>
                <li><strong>내용</strong> : {{hotplace.overview}}</li>
                <li><strong>주소</strong> : {{hotplace.addr1}} {{hotplace.addr2}}</li>
                <li v-if="hotplace.tel"><strong>전화번호</strong> : {{hotplace.tel}}</li>
                <li v-if="hotplace.homepage"><strong>홈페이지</strong>: <a :href="hotplace.homepage">{{hotplace.homepage}}</a></li>
              </ul>
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

</style>