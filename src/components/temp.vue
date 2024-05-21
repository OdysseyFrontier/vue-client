<template>
  <div>
    <input type="file" @change="onFileChange" />
    <div v-if="locationAvailable">
      <p>Latitude: {{ location.latitude }}</p>
      <p>Longitude: {{ location.longitude }}</p>

      <p>options: {{ options.position.lat }}</p>
      <p>options: {{ options.position.lng }}</p>
      <p>{{ markerKey }}</p>
    </div>
    <div >
      <div>
        <input type="text" v-model="address" placeholder="Enter address" />
        <button @click="geocodeAddress">Get Location</button>
        <button class="btn btn-secondary" @click="execDaumPostcode">주소검색</button>
        <div>주소검색을 통해 검색하거나 지도에서 클릭하여 위치를 지정해주세요!</div>
      </div>
      <GoogleMap :api-key=VITE_GOOGLE_MAP_API_KEY
        :center="mapCenter"
        :zoom="10"
        style="height: 400px; width: 600px"
        @click="onMapClick"
      >
        <Marker :options="options" :key="markerKey"  />
      </GoogleMap>
    </div>
    <button @click="uploadFile">Upload</button>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';
import EXIF from 'exif-js';
// import OpenCage from 'opencage-api-client';
// import { useLoadScript, GMapMap, GMapMarker } from '@fawmi/vue-google-maps';
import { GoogleMap, Marker } from 'vue3-google-map'

// Load Google Maps API
// const { isLoaded } = useLoadScript({
//   googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
// });

const selectedFile = ref(null);
const location = ref({
  latitude: '',
  longitude: '',
});
const locationAvailable = ref(false);
const mapCenter = ref({ lat: 36.1061824, lng: 128.4227797 }); // Default to London
const address = ref('');
const markerKey = ref(0);

const options= reactive({
        position: mapCenter.value,
        title: "선택한 위치",
      })

const onFileChange = (event) => {
  selectedFile.value = event.target.files[0];
  extractLocation(selectedFile.value);
};

const extractLocation = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const arrayBuffer = e.target.result;
    EXIF.getData(arrayBuffer, function () {
      const lat = EXIF.getTag(this, 'GPSLatitude');
      const lon = EXIF.getTag(this, 'GPSLongitude');
      const latRef = EXIF.getTag(this, 'GPSLatitudeRef');
      const lonRef = EXIF.getTag(this, 'GPSLongitudeRef');

      if (lat && lon && latRef && lonRef) {
        const latitude = (latRef === 'N' ? 1 : -1) * (lat[0] + lat[1] / 60 + lat[2] / 3600);
        const longitude = (lonRef === 'E' ? 1 : -1) * (lon[0] + lon[1] / 60 + lon[2] / 3600);
        location.value = { latitude, longitude };
        locationAvailable.value = true;
        mapCenter.value = { lat: latitude, lng: longitude };
        markerKey.value++; // Increase the marker key to force Vue to re-render the Marker component
  options.position = { lat: latitude, lng: longitude };
      } else {
        alert('No GPS data found in image.');
        locationAvailable.value = false;
      }
    });
  };
  reader.readAsArrayBuffer(file);
};

const geocodeAddress = () => {
//   OpenCage.geocode({ q: address.value, key: 'YOUR_OPENCAGE_API_KEY' }).then((response) => {
//     if (response.results.length > 0) {
//       const loc = response.results[0].geometry;
//       location.value = {
//         latitude: loc.lat,
//         longitude: loc.lng,
//       };
//       mapCenter.value = { lat: loc.lat, lng: loc.lng };
//       locationAvailable.value = true;
//     } else {
//       alert('Location not found.');
//     }
//   }).catch((error) => {
//     console.error('Error geocoding address:', error);
//     alert('Error geocoding address.');
//   });
};

 //다음 주소 검색
function execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          kakaoAddress(data.address);
          
        },
      }).open();


//  markerKey.value++; // Increase the marker key to force Vue to re-render the Marker component
//       options.position =mapCenter.value
    }
const { VITE_VUE_APP_KAKAO_REST_API_KEY, VITE_GOOGLE_MAP_API_KEY } = import.meta.env;
    //주소를 기준으로 위도, 경도 정보 가져오기
    function kakaoAddress(address){
      axios.get('https://dapi.kakao.com/v2/local/search/address',{
        params:{
          query: address
        },
        headers:{
          Authorization : 'KakaoAK '+ VITE_VUE_APP_KAKAO_REST_API_KEY
        }
      })
      .then(res=>{
        const roadAddress = res.data.documents[0].address;
        // this.setCenter(roadAddress.x,roadAddress.y);
        console.log(roadAddress.x)
        mapCenter.value.lat = Number(roadAddress.x)
        mapCenter.value.lng = Number(roadAddress.y)
        location.value = { latitude: roadAddress.x, longitude:roadAddress.y };
        locationAvailable.value = true;

       options.position = { lat: Number(roadAddress.x), lng: Number(roadAddress.y) };
       triggerRerender();
      })
      .catch(err=>{
        alert('주소를 불러오는데 실패했습니다...');
        console.log(err);
      });
    }

    const triggerRerender = () => {
  markerKey.value++;
};

    //지도 위치 변경
    // function setCenter(x, y){
    //   const xx = Number(x);
    //   const yy = Number(y);
    //   this.center = {
    //     lat : yy,
    //     lng : xx
    //   }
    // }

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
};

const uploadFile = async () => {
  if (!selectedFile.value) {
    alert('Please select a file.');
    return;
  }

  if (!location.value.latitude || !location.value.longitude) {
    alert('Please provide location information.');
    return;
  }

  const formData = new FormData();
  formData.append('file', selectedFile.value);
  formData.append('latitude', location.value.latitude);
  formData.append('longitude', location.value.longitude);

  try {
    const response = await axios.post('http://localhost:8080/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    alert('File uploaded successfully.');
  } catch (error) {
    console.error('Error uploading file:', error);
    alert('File upload failed.');
  }
};
</script>

<style scoped>
/* @import 'leaflet/dist/leaflet.css'; */
</style>
