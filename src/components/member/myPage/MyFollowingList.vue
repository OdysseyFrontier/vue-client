<template>
    <h2>팔로잉</h2>
    <div class="container mt-4">
        <div class="search-bar mb-3 d-flex">
            <input type="text" class="form-control me-2" placeholder="검색" v-model="searchQuery">
            <button class="btn btn-primary" @click="filterFollowings">검색</button>
        </div>
        <div class="member-list">
            <MyMemberItem v-for="member in followings" :key="member.memberId" :current-member-id="loginMemberId"
                :member="member" @toggle-follow="toggleFollow" />
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect, onMounted, computed } from 'vue';
import { useMemberStore } from '@/stores/member';
import { getFollowing, unfollowMember, followMember } from '@/api/member';
import MyMemberItem from '@/components/member/myPage/MyMemberItem.vue';

const store = useMemberStore();
const loginMemberId = store.memberInfo?.memberId || 1;
const followings = ref({});
const searchQuery = ref('');

const toggleFollow = async memberId => {
    const member = followings.value.find(m => m.memberId === memberId);
    console.log(member);
    if (member) {
        if (member.following) {
            // Call unfollow
            await unfollowMember(loginMemberId, memberId,
                () => {
                    member.following = false; // Update state on success
                    console.log('Unfollow successful');
                },
                error => {
                    console.error('Failed to unfollow:', error);
                }
            );
        } else {
            // Call follow
            await followMember(loginMemberId, memberId,
                () => {
                    member.following = true; // Update state on success
                    console.log('Follow successful');
                },
                error => {
                    console.error('Failed to follow:', error);
                }
            );
        }
    }
};



async function fetchMembers() {
    getFollowing(loginMemberId,
        response => {
            console.log('Fetched members');
            console.log(response.data);
            followings.value = response.data;
        },
        error => {
            console.error('Failed to fetch followers:', error);
        }
    );
}

function filterFollowings() {
    if (searchQuery.value) {
        followings.value = followings.value.filter(member =>
            member.name.includes(searchQuery.value) || member.emailId.includes(searchQuery.value)
        );
    }
}

watchEffect(() => {
    fetchMembers();
});

onMounted(() => {
    fetchMembers();
});

</script>

<style scoped>
.member-list {
    display: flex;
    flex-direction: column;
}
</style>