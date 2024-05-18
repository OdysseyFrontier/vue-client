<template>
  <div class="container mt-4">
    <div class="search-bar mb-3 d-flex">
      <input type="text" class="form-control me-2" placeholder="검색" v-model="searchQuery">
      <button class="btn btn-primary" @click="fetchMembers">검색</button>
    </div>
    <div class="member-list">
      <MyMemberItem v-for="member in memberList" :key="member.id" :member="member" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watchEffect } from 'vue';
import axios from 'axios';
import MyMemberItem from '@/components/member/myPage/MyMemberItem.vue';

const memberList = reactive({
  members: []
});

const searchQuery = ref('');

async function fetchMembers() {
  try {
    const response = await axios.get(`/api/members?query=${searchQuery.value}`);
    memberList.members = response.data;
  } catch (error) {
    console.error('Error fetching members:', error);
  }
}

watchEffect(() => {
  fetchMembers();
});
</script>

<style scoped>
.member-list {
  display: flex;
  flex-direction: column;
}
</style>