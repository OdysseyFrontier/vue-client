<template>
    <h2>팔로잉</h2>
    <div class="container mt-4">
        <div class="search-bar mb-3 d-flex">
            <input type="text" class="form-control me-2" placeholder="검색" v-model="searchQuery">
            <button class="btn btn-primary" @click="fetchMembers">검색</button>
        </div>
        <div class="member-list">
            <MyFollowingListItem v-for="member in following" :key="member.memberId" :member="member"
                @deleteFollowing="deleteFollowing" />
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue';
import { useMemberStore } from '@/stores/member';
import { getFollowing, unfollowMember } from '@/api/member';
import MyFollowingListItem from '@/components/member/myPage/MyFollowingListItem.vue';

const store = useMemberStore();
const memberId = store.memberInfo?.memberId || 1;
const following = ref({});
const searchQuery = ref('');

const deleteFollowing = async (followingId) => {
    try {
        // Assuming store.memberInfo.memberId is the ID of the currently logged-in user
        await unfollowMember(memberId, followingId,
            () => {
                // Remove the unfollowed member from the list
                const index = following.value.findIndex(member => member.memberId === followingId);
                if (index !== -1) {
                    following.value.splice(index, 1);
                }
                console.log('Unfollow successful');
            },
            error => {
                console.error('Failed to unfollow:', error);
            }
        );
    } catch (error) {
        console.error('Error during unfollow operation:', error);
    }
};
async function fetchMembers() {
    getFollowing(memberId,
        response => {
            following.value = response.data;
        },
        error => {
            console.error('Failed to fetch followers:', error);
        }
    );
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