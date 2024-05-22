<template>
    <h2>팔로워</h2>
    <div class="container mt-4">
        <div class="search-bar mb-3 d-flex">
            <input type="text" class="form-control me-2" placeholder="검색" v-model="searchQuery">
            <button class="btn btn-primary" @click="filterFollowers">검색</button>
        </div>
        <div class="member-list">
            <MyMemberItem v-for="member in followers" :key="member.memberId" :member="member"
                @toggle-follow="toggleFollow" />
            <MyFollowingListItem v-for="member in followings" :key="member.memberId" :member="member"
                @deleteFollowing="deleteFollowing" />
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue';
import { useMemberStore } from '@/stores/member';
import { getFollowers, followMember, unfollowMember } from '@/api/member';
import MyFollowingListItem from '@/components/member/myPage/MyFollowingListItem.vue';

const store = useMemberStore();
const memberId = store.memberInfo?.memberId || 1;
const followers = ref({});
const searchQuery = ref('');

async function fetchMembers() {
    getFollowers(memberId,
        response => {
            followers.value = response.data;
        },
        error => {
            console.error('Failed to fetch followers:', error);
        }
    );
}

const deleteFollowing = async (followingId) => {
    try {
        // Assuming store.memberInfo.memberId is the ID of the currently logged-in user
        await unfollowMember(memberId, followingId,
            () => {
                // Remove the unfollowed member from the list
                const index = followings.value.findIndex(member => member.memberId === followingId);
                if (index !== -1) {
                    followings.value.splice(index, 1);
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


// const toggleFollow = async memberId => {
//     const member = followers.value.find(m => m.memberId === memberId);
//     if (member) {
//         if (member.following) {
//             // Call unfollow
//             await unfollowMember(store.memberInfo.memberId, memberId,
//                 () => {
//                     member.following = false; // Update state on success
//                     console.log('Unfollow successful');
//                 },
//                 error => {
//                     console.error('Failed to unfollow:', error);
//                 }
//             );
//         } else {
//             // Call follow
//             await followMember(store.memberInfo.memberId, memberId,
//                 () => {
//                     member.following = true; // Update state on success
//                     console.log('Follow successful');
//                 },
//                 error => {
//                     console.error('Failed to follow:', error);
//                 }
//             );
//         }
//     }
// };

function filterFollowers() {
    if (searchQuery.value) {
        followers.value = followers.value.filter(member =>
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