<template>
  <div class="member-item d-flex justify-content-between align-items-center p-2 border-bottom">
    <div>
      <h5>{{ member.name }}</h5>
      <p>{{ member.email }}</p>
    </div>
    <button class="btn btn-outline-primary" @click="toggleFollow">
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
      id: 0,
      name: '',
      email: '',
      following: false,
      profileImage: defaultImg
    })
  }
});

const emit = defineEmits(['toggle-follow']);

const toggleFollow = () => {
  emit('toggle-follow', props.member.id);
};
</script>

<style scoped>
.member-item {
  margin-bottom: 10px;
}
</style>
