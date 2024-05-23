<script setup>
import { ref, watchEffect, reactive } from "vue";
import { GoogleMap, Marker, MarkerCluster, InfoWindow } from "vue3-google-map";
import axios from "axios";
import EXIF from "exif-js";
import { useMemberStore } from "@/stores/member";
import { useRouter } from "vue-router";
const { VITE_VUE_APP_KAKAO_REST_API_KEY, VITE_GOOGLE_MAP_API_KEY } = import.meta.env;

const router = useRouter();
const memberStore = useMemberStore();

const params = ref({
  memberId : memberStore.memberInfo.memberId,
  contentTypeId: 0,
  title: "",
  addr1: "",
  tel: "",
  latitude: "",
  longitude: "",
  homepage: "",
  overview: "",
  sidoCode: 1,
  gugunCode: 1,
});
const selectedFile = ref(null);
const location = ref({
  latitude: "",
  longitude: "",
});
const locationAvailable = ref(false);
const mapCenter = ref({ lat: 36.1061824, lng: 128.4227797 }); // Default to London
const address = ref("");
const markerKey = ref(0);

let options = reactive({
  position: mapCenter.value,
  title: "위치를 선택해주세요",
  draggable:true,
  // animation: google.maps.Animation.BOUNCE,
});

const previewUrl = ref(null); // 미리보기 URL 상태 추가
const onFileChange = (event) => {
  if (!event.target.files.length) {
    previewUrl.value = ""
    return;
  }

  selectedFile.value = event.target.files[0];
  extractLocation(selectedFile.value);
  
  // 파일 읽기 및 미리보기 URL 생성
  const reader = new FileReader();
  reader.onload = (e) => {
    previewUrl.value = e.target.result; // 미리보기 URL 설정
  };
  reader.readAsDataURL(selectedFile.value);
};

const extractLocation = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const arrayBuffer = e.target.result;
    EXIF.getData(arrayBuffer, function () {
      const lat = EXIF.getTag(this, "GPSLatitude");
      const lon = EXIF.getTag(this, "GPSLongitude");
      const latRef = EXIF.getTag(this, "GPSLatitudeRef");
      const lonRef = EXIF.getTag(this, "GPSLongitudeRef");

      if (lat && lon && latRef && lonRef) {
        const latitude =
          (latRef === "N" ? 1 : -1) * (lat[0] + lat[1] / 60 + lat[2] / 3600);
        const longitude =
          (lonRef === "E" ? 1 : -1) * (lon[0] + lon[1] / 60 + lon[2] / 3600);
        location.value = { latitude, longitude };
        locationAvailable.value = true;
        mapCenter.value = { lat: latitude, lng: longitude };
        markerKey.value++; // Increase the marker key to force Vue to re-render the Marker component
        options.position = { lat: latitude, lng: longitude };
      } else {
        alert("No GPS data found in image.");
        locationAvailable.value = false;
      }
    });
  };
  reader.readAsArrayBuffer(file);
};

//다음 주소 검색
function execDaumPostcode() {
  new window.daum.Postcode({
    oncomplete: (data) => {
      console.log("주소검색");
      if(data.jibunAddress)
        params.value.addr1 = data.jibunAddress
      if(data.roadAddress)
        params.value.addr1 = data.roadAddress

      params.value.sidoCode = data.sidoCode

      console.log(data);
      kakaoAddress(data.roadAddress);
    },
  }).open();

  //  markerKey.value++; // Increase the marker key to force Vue to re-render the Marker component
  //       options.position =mapCenter.value
}

//주소를 기준으로 위도, 경도 정보 가져오기
function kakaoAddress(address) {
  axios
    .get("https://dapi.kakao.com/v2/local/search/address", {
      params: {
        query: address,
      },
      headers: {
        Authorization: "KakaoAK " + VITE_VUE_APP_KAKAO_REST_API_KEY,
      },
    })
    .then((res) => {
      const roadAddress = res.data.documents[0].address;

      console.log(roadAddress)

      
      // mapCenter.value.lat = Number(roadAddress.x);
      // mapCenter.value.lng = Number(roadAddress.y);
      const lat = Number(roadAddress.y);
      const lng = Number(roadAddress.x);

      mapCenter.value = { lat: Number(roadAddress.y), lng : Number(roadAddress.x) };
      location.value = { latitude: roadAddress.y, longitude: roadAddress.x };
      locationAvailable.value = true;

      options.position = { lat, lng };

      console.log("주소검색하고 온곳")
      // console.log(mapCenter)

      triggerRerender();
    })
    .catch((err) => {
      alert("주소를 불러오는데 실패했습니다...");
      console.log(err);
    });
}

const triggerRerender = () => {
  markerKey.value++;
};

// 맵클릭했을 때 마커 움직이는 함수
const onMapClick = (event) => {
  const { latLng } = event;
  const lat = latLng.lat();
  const lng = latLng.lng();
  location.value = { latitude: lat, longitude: lng };
  mapCenter.value = { lat, lng };
  locationAvailable.value = true;

  markerKey.value++; // Increase the marker key to force Vue to re-render the Marker component
  options.position = { lat, lng };
  //   options.value.position = { lat: lat, lng: lng };
  reverseGeocode(lat, lng);
};


// 마커를 드래그해서 놓았을 때 호출되는 함수
const onMarkerDragEnd = (event) => {
  const newPosition = event.latLng; // 새로운 위치 정보를 가져옴
  const lat = newPosition.lat();
  const lng = newPosition.lng();
  // 여기서 새로운 위도와 경도를 사용하거나 저장할 수 있음
  console.log("새로운 위도:", lat);
  console.log("새로운 경도:", lng);
  // 이후에 필요한 작업 수행
  location.value = { latitude: lat, longitude: lng };
  mapCenter.value = { lat, lng };
  locationAvailable.value = true;

  markerKey.value++; // Increase the marker key to force Vue to re-render the Marker component
  options.position = { lat, lng };
  //   options.value.position = { lat: lat, lng: lng };
  reverseGeocode(lat, lng);
};

const uploadFile = async () => {
  if (!selectedFile.value) {
    alert("사진을 첨부해주세요.");
    return;
  }

  if (!location.value.latitude || !location.value.longitude) {
    alert("위치를 지정해주세요.");
    return;
  }

  if (params.value.contentTypeId == 0) {
    alert("카테고리를 선택해주세요.");
    return;
  }

  if (params.value.title.length == 0) {
    alert("제목을 작성해주세요.");
    return;
  }



  const formData = new FormData();
  formData.append("file", selectedFile.value);

  params.value.latitude = location.value.latitude;
  params.value.longitude = location.value.longitude;
  // formData.append('hotplaceDto', params.value);
  // formData.append('latitude', location.value.latitude);
  // formData.append('longitude', location.value.longitude);
  // formData.append('longitude', location.value.longitude);
  if(params.value.sidoCode == "경기"){
        params.value.sidoCode = "경기도"
      }else if(params.value.sidoCode == "강원특별자치도"){
        params.value.sidoCode = "강원도"
      }else if(params.value.sidoCode == "충북"){
        params.value.sidoCode = "충청북도"
      }else if(params.value.sidoCode == "충남"){
        params.value.sidoCode = "충청남도"
      }else if(params.value.sidoCode == "경북"){
        params.value.sidoCode = "경상북도"
      }else if(params.value.sidoCode == "경남"){
        params.value.sidoCode = "경상남도"
      }else if(params.value.sidoCode == "전북특별자치도"){
        params.value.sidoCode = "전라북도"
      }else if(params.value.sidoCode == "전남"){
        params.value.sidoCode = "전라남도"
      }else if(params.value.sidoCode == "제주특별자치도"){
        params.value.sidoCode = "제주도"
      }

  formData.append("sidocode", new Blob([params.value.sidoCode], { type: "application/json" }));

  params.value.sidoCode = 1
  const hotplaceDto = JSON.stringify({
    ...params.value,
  });

  formData.append("hotplaceDto", new Blob([hotplaceDto], { type: "application/json" }));

console.log(formData);

  try {
    const response = await axios.post(
      "http://localhost/hotplace/write",
      formData,
      {
        headers: {
          Authorization: sessionStorage.getItem("accessToken"),
          "Content-Type": "multipart/form-data; charset=UTF-8",
        },
      }
    );
    alert("File uploaded successfully.");
    router.push({
      name: "hotPlaceDetail",
      params: { contentId: response.data },
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    alert("File upload failed.");
  }
};

function moveList() {
        router.push({ name: "hotPlaceList2" });
    }


    const reverseGeocode = (latitude, longitude) => {
  axios
    .get("https://dapi.kakao.com/v2/local/geo/coord2address.json", {
      params: {
        x: longitude,
        y: latitude,
      },
      headers: {
        Authorization: "KakaoAK " + VITE_VUE_APP_KAKAO_REST_API_KEY, // Replace with your Kakao API key
      },
    })
    .then((response) => {
      const regionInfo = response.data.documents[0];
      console.log(regionInfo);


      if(regionInfo.address){

        params.value.sidoCode = regionInfo.address.region_1depth_name;
      if(params.value.sidoCode == "경기"){
        params.value.sidoCode = "경기도"
      }else if(params.value.sidoCode == "강원특별자치도"){
        params.value.sidoCode = "강원도"
      }else if(params.value.sidoCode == "충북"){
        params.value.sidoCode = "충청북도"
      }else if(params.value.sidoCode == "충남"){
        params.value.sidoCode = "충청남도"
      }else if(params.value.sidoCode == "경북"){
        params.value.sidoCode = "경상북도"
      }else if(params.value.sidoCode == "경남"){
        params.value.sidoCode = "경상남도"
      }else if(params.value.sidoCode == "전북특별자치도"){
        params.value.sidoCode = "전라북도"
      }else if(params.value.sidoCode == "전남"){
        params.value.sidoCode = "전라남도"
      }else if(params.value.sidoCode == "제주특별자치도"){
        params.value.sidoCode = "제주도"
      }

      // params.value.gugunCode = regionInfo.address.region_2depth_name;
      params.value.addr1 = regionInfo.address.address_name; // Update address
      if(regionInfo.road_address)
        params.value.zipCode = regionInfo.road_address.zone_no; // Update zipCode

      }else{
        alert("위치를 다시 선택해주세요.")
      }
    })
    .catch((error) => {
      console.error("Error during reverse geocoding:", error);
      // alert("Failed to get region information.");
      alert("위치를 다시 선택해주세요.")
    });
};

setTimeout(()=>{

//  marker.addListener("click", toggleBounce);

//  function toggleBounce() {
//   if (marker.getAnimation() !== null) {
//     marker.setAnimation(null);
//   } else {
//     marker.setAnimation(google.maps.Animation.BOUNCE);
//   }
// }
})

const infowindow = ref(true)
</script>

<template>
  <!-- ======= Portfolio Details Section ======= -->
  <section id="portfolio-details" class="portfolio-details">
    <div class="container">
      <div class="row gy-4">
        <div class="col-lg-6">
          <!-- <div>{{ params.gugunCode }}</div> -->
          <div>
            주소검색을 통해 검색하거나 지도에서 클릭하여 위치를 지정해주세요!
          </div>
          <!-- 지도 -->
          <GoogleMap
            :api-key="VITE_GOOGLE_MAP_API_KEY"
            id="map"
            :center="mapCenter"
            :zoom="10"
            style="height: 400px; width: 100%"
            @click="onMapClick"
          >
            <Marker :options="options" :key="markerKey" @dragend="onMarkerDragEnd">
              <InfoWindow v-model="infowindow">
                <div id="content" v-if="markerKey!=0">선택한 지역입니다.</div>
                <div id="content" v-if="markerKey==0">위치를 선택해주세요</div>
              </InfoWindow>
            </Marker>
          </GoogleMap>

          <button class="btn btn-secondary mt10" @click="execDaumPostcode">
            주소검색
          </button>

          <!-- <GoogleMap
            :api-key="VITE_GOOGLE_MAP_API_KEY"
            id="map"
            style="width: 100%; height: 500px"
            :zoom="zoom"
            :center="init_center"
          >
            <Marker :options="options" />
          </GoogleMap> -->
        </div>

        <div class="col-lg-6">
          <div class="portfolio-info">
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
                      @change="onFileChange"
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
                      v-model="params.contentTypeId"
                    >
                      <option value="0" hidden disabled selected>
                        카테고리를 선택해주세요.
                      </option>
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
                  <label for="title" class="col-md-4 col-lg-3 col-form-label"
                    >제목</label
                  >
                  <div class="col-md-8 col-lg-9">
                    <input
                      name="title"
                      type="text"
                      class="form-control"
                      id="title"
                      value="제목"
                      v-model="params.title"
                    />
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
                      v-model="params.overview"
                      placeholder="내용을 입력해주세요."
                    ></textarea>
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
                      v-model="params.addr1"
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
                      v-model="params.tel"
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
                      placeholder="https://Homepage.com/#"
                      v-model="params.homepage"
                    />
                  </div>
                </div>
              </form>
              <!-- End Profile Edit Form -->
            </div>
          </div>
          <div class="align-right mt10 mb10">
    
            <button class="btn btn-primary me-1" @click="uploadFile">
      작성
    </button>
    <button class="btn btn-secondary" @click="moveList">
      목록
    </button>
  </div>

          <div class="portfolio-description" v-if="previewUrl">
            <h2>첨부사진 미리보기</h2>
            <!-- 추가된 섹션: 이미지 미리보기 -->
            <div class="col-md-8 col-lg-9">
              <img
                :src="previewUrl"
                alt="Image Preview"
                style="max-width: 50%; height: auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Portfolio Details Section -->
</template>

<style scoped>
.align-right{text-align:right !important;}

.mt10{margin-top:10px !important;}
.mb10{margin-bottom:10px !important;}





i {
  cursor: pointer;
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
section {
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
h6,
pre {
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

.portfolio-details
  .portfolio-details-slider
  .swiper-pagination
  .swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  background-color: #fff;
  opacity: 1;
  border: 1px solid #ffb727;
}

.portfolio-details
  .portfolio-details-slider
  .swiper-pagination
  .swiper-pagination-bullet-active {
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

pre {
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
  padding-bottom: 10px;
}

.portfolio-details .portfolio-info ul {
  list-style: none;
  padding: 0;
  font-size: 15px;
}

.portfolio-details .portfolio-info ul li + li {
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
