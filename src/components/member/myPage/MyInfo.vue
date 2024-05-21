<script setup>
import { computed, reactive } from "vue";
import { useMemberStore } from '@/stores/member';
const store = useMemberStore();

const defaultImg = "src/assets/fighting.jpg";
const defaultProfile = {
  name: "sihyun",
  image: defaultImg,
  posts: 100,
  followers: 300,
  following: 300,
  description: "",
};

const member = store.memberInfo || defaultProfile;

const memberProfile = reactive({
  name: member.name || defaultProfile.name,
  image: member.image || defaultProfile.image,
  posts: member.posts || defaultProfile.posts,
  followers: member.followers || defaultProfile.followers,
  following: member.following || defaultProfile.following,
  description: member.description || defaultProfile.description,
});





</script>

<template>
  <div class="container my-info mt-4">
    <div class="row align-items-center">
      <!-- 사진을 항상 왼쪽에 유지합니다 -->
      <div class="col-auto">
        <img :src="memberProfile.image" alt="Profile picture" class="profile-pic rounded-circle" />
      </div>
      <div class="col">
        <div class="d-flex align-items-center mb-2">
          <h1 class="me-3 text-nowrap">{{ memberProfile.name }}</h1>
          <RouterLink :to="{ name: 'myInfoModify' }" class="btn btn-sm btn-outline-secondary text-nowrap">
            프로필 편집
          </RouterLink>
          <!-- <button class="btn btn-sm btn-outline-secondary text-nowrap">
            프로필 편집
          </button> -->
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div><strong>게시물</strong> {{ memberProfile.posts }}</div>
          <div><strong>팔로워</strong> {{ memberProfile.followers }}</div>
          <div><strong>팔로우</strong> {{ memberProfile.following }}</div>
        </div>
        <p class="user-description mt-2">{{ memberProfile.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-pic {
  width: 120px;
  height: 120px;
}

@media (max-width: 767px) {

  /* md 이하에서 가로 정렬 */
  .my-info .row {
    flex-direction: row;
    /* 행 방향 유지 */
    align-items: center;
  }

  .d-flex {
    flex-direction: row;
    /* 가로 정렬 */
    align-items: center;
  }

  .btn {
    width: auto;
    /* 버튼 너비 자동 조정 */
    padding: 0.25rem 0.5rem;
    /* 버튼 패딩 조정 */
    font-size: 0.875rem;
    /* 폰트 크기 조정 */
  }
}

@media (min-width: 768px) {

  /* md 초과에서도 가로 정렬 */
  .my-info .row {
    flex-direction: row;
    /* 행 방향 유지 */
    align-items: center;
  }

  .profile-pic {
    width: 120px;
    height: 120px;
  }

  .d-flex {
    flex-direction: row;
    /* 가로 정렬 */
    justify-content: space-between;
    /* 요소들 사이에 공간 배분 */
    align-items: center;
    /* 세로 중앙 정렬 */
    width: 100%;
    /* 전체 너비 사용 */
  }

  .btn {
    padding: 0.25rem 0.5rem;
    /* 버튼 패딩 */
    font-size: 0.875rem;
    /* 폰트 크기 */
  }
}
</style>
