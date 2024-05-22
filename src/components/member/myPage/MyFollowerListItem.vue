<template>
  <div class="member-item d-flex justify-content-between align-items-center p-2 border-bottom">
    <div>
      <h5>{{ member.name }}</h5>
      <p>{{ member.email }}</p>
    </div>
    <template v-if="!member.following">
      <button class="btn btn-outline-primary" @click="follow">팔로우</button>
    </template>
    <button class="btn btn-outline-danger" @click="deleteFollowing">삭제</button>
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
  }
});

const emit = defineEmits(['delete-following', 'follow']);

const deleteFollowing = () => {
  emit('delete-following', props.member.memberId);
};
const follow = () => {
  emit('follow', props.member.memberId);
}
</script>

<style scoped>
.member-item {
  margin-bottom: 10px;
}
</style>