<template>
    <div class="container my-4">
      <h3 class="mb-3 text-center">여기 추천해요!!!</h3>
      <div class="row">
        <div class="col-md-8">
          <!-- 지도가 들어갈 자리 -->
          <div class="map-placeholder">
            <p>지도 부분은 우선 비워둡니다.</p>
          </div>
        </div>
        <div class="col-md-4">
          <form class="form-container">
            <div class="mb-3">
              <label for="hotplace-name" class="form-label">핫플 이름:</label>
              <input type="text" class="form-control" id="hotplace-name" placeholder="핫플레이스 이름 입력...">
            </div>
            <div class="mb-3">
              <label for="hotplace-city" class="form-label">핫플 시/도:</label>
              <input type="text" class="form-control" id="hotplace-city" placeholder="시/도 입력...">
            </div>
            <div class="mb-3">
              <label for="hotplace-district" class="form-label">핫플 구/군:</label>
              <input type="text" class="form-control" id="hotplace-district" placeholder="구/군 입력...">
            </div>
            <div class="mb-3">
              <label for="hotplace-description" class="form-label">상세주소:</label>
              <textarea class="form-control" id="hotplace-description" rows="3"></textarea>
            </div>
            <div class="mb-3">
              <label for="hotplace-image" class="form-label">핫플 이미지 업로드:</label>
              <input type="file" class="form-control" id="hotplace-image">
            </div>
            <div class="d-grid gap-2">
              <button type="submit" class="btn btn-primary">등록하기</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const hotplaceName = ref('');
  const hotplaceCity = ref('');
  const hotplaceDistrict = ref('');
  const hotplaceDescription = ref('');
  </script>
  
  <style scoped>
  .map-placeholder {
    min-height: 300px;
    background-color: #e9ecef;
    color: #495057;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
  }
  
  .form-container {
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  </style>