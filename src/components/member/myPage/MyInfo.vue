<script setup>
import { computed, reactive, ref, onMounted } from "vue";
import { useMemberStore } from '@/stores/member';
import { getMemberInfo, followMember, unfollowMember } from "@/api/member.js";

const store = useMemberStore();

import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

let { memberId } = route.params;

const param = ref({
  memberId: store.memberInfo.memberId,
  targetId: memberId
})

onMounted(() => {
  if (memberId == "me") {
    memberId = store.memberInfo.memberId
    param.value.targetId = memberId
  }

  getInfo();
});


const memberProfile = ref({})
const getInfo = async () => {
  console.log("서버에서 회원 정보 얻어오자!!!", param.value);
  getMemberInfo(
    param.value,
    (response) => {
      console.log(response.data)
      memberProfile.value = response.data;
      console.log(memberProfile.value)
    },
    (error) => {
      console.log(error);
    }
  );
};


const defaultImg = "/src/assets/ggo.png";
const defaultProfile = {
  name: "sihyun",
  image: defaultImg,
  posts: 100,
  followers: 300,
  followings: 300,
  description: "",
};

// const member = store.memberInfo || defaultProfile;

// const memberProfile = reactive({
//   name: member.name || defaultProfile.name,
//   image: member.image || defaultProfile.image,
//   posts: member.posts || defaultProfile.posts,
//   followers: member.followers || defaultProfile.followers,
//   followings: member.followings || defaultProfile.followings,
//   description: member.description || defaultProfile.description,
// });
const follow = async () => {
  await followMember(store.memberInfo.memberId, memberId,
    () => {
      // member.following = true; // Update state on success
      console.log('Follow successful');
      getInfo()
    },
    error => {
      console.error('Failed to follow:', error);
    }
  );
};

const unfollow = async () => {
  await unfollowMember(store.memberInfo.memberId, memberId,
    () => {
      // member.following = false; // Update state on success
      console.log('Unfollow successful');
      getInfo()
    },
    error => {
      console.error('Failed to unfollow:', error);
    }
  );
};


</script>

<template>
  <div class="container my-info mt-4">
    <div class="row align-items-center">
      <!-- 사진을 항상 왼쪽에 유지합니다 -->
      <div class="col-auto">
        <img :src="defaultImg" alt="Profile picture" class="profile-pic rounded-circle" />
      </div>
      <div class="col">
        <div class="d-flex align-items-center mb-2">
          <h1 class="me-3 text-nowrap">{{ memberProfile.name }}</h1>
          <RouterLink :to="{ name: 'myInfoModify' }" class="btn btn-sm btn-outline-secondary text-nowrap"
            v-if="memberId == store.memberInfo.memberId">
            프로필 편집
          </RouterLink>
          <button class="btn btn-outline-danger" @click="unfollow"
            v-if="memberId != 'me' && memberId != store.memberInfo.memberId && !memberProfile.following">
            언팔로우
          </button>
          <button class="btn btn-outline-primary" @click="follow"
            v-if="memberId != 'me' && memberId != store.memberInfo.memberId && memberProfile.following">
            팔로우
          </button>
          <!-- <button class="btn btn-sm btn-outline-secondary text-nowrap">
            프로필 편집
          </button> -->
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div><strong>게시물</strong> {{ memberProfile.boardNum }}</div>
          <div><strong>계획</strong> {{ memberProfile.planNum }}</div>
          <div><strong>핫플레이스</strong> {{ memberProfile.hotPlaceNum }}</div>
          <RouterLink :to="{ name: 'myFollowerList' }" class="nav-link">
            <strong>팔로워</strong> {{ memberProfile.followedNum }}
          </RouterLink>
          <RouterLink :to="{ name: 'myFollowingList' }" class="nav-link">
            <strong>팔로잉</strong> {{ memberProfile.followingNum }}
          </RouterLink>
        </div>
        <p class="user-description mt-2">{{ defaultProfile.description }}</p>
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
