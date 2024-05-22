<template>
  <div class="member-item d-flex justify-content-between align-items-center p-2 border-bottom">
    <div>
      <h5>{{ member.name }}</h5>
      <RouterLink :to="{ name: 'memberMyPage' , params: {memberId : member.memberId} }">

        <h5>{{ member.name }}</h5>
      </RouterLink>

      <p>{{ member.email }}</p>
    </div>
    <button v-if="member.memberId === currentMemberId" class="btn btn-outline-secondary" disabled>
      ME
    </button>
    <button v-else class="btn btn-outline-primary" @click="toggleFollow">
      {{ member.following ? '언팔로우' : '팔로우' }}
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// Member의 기본 이미지 설정
const defaultImg = 'path/to/default/image.jpg';

const props = defineProps({
  member: {
    type: Object,
    required: true,
    default: () => ({
      memberId: 0,
      name: '',
      email: '',
      following: false,
      profileImage: defaultImg
    })
  },
  currentMemberId: Number
});

const emit = defineEmits(['toggle-follow']);

const toggleFollow = () => {
  emit('toggle-follow', props.member.memberId);
};
</script>

<style scoped>
a {
  /* color: #4154f1; */
  color: black;
  text-decoration: none;
}

a:hover {
  color: #717ff5;
  text-decoration: none;
}

.member-item {
  margin-bottom: 10px;
}
</style>
