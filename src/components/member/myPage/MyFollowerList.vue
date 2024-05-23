<template>
    <div class="container mt-4">
        <RouterLink :to="{ name: 'memberMyPage', params: { memberId: 'me' } }">
            <i class="bi bi-caret-left-fill"></i>
            <span>뒤로가기</span>
        </RouterLink>
        <h2 class="my-3">팔로워 목록</h2>
        <div class="search-bar mb-3 d-flex">
            <input type="text" class="form-control me-2" placeholder="검색" v-model="searchQuery">
            <button class="btn btn-primary" @click="filterFollowers">검색</button>
        </div>
        <div class="member-list">
            <MyFollowerListItem v-for="member in followers" :key="member.memberId" :member="member"
                @deleteFollowing="deleteFollowing" @follow="follow" />
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue';
import { useMemberStore } from '@/stores/member';
import { getFollowers, unfollowMember, followMember } from '@/api/member';
import MyFollowerListItem from '@/components/member/myPage/MyFollowerListItem.vue';
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const store = useMemberStore();

let { memberId } = route.params;
if (memberId == "me") {
    memberId = store.memberInfo.memberId
}

// const memberId = store.memberInfo?.memberId || 1;
// const memberId = memberId;
const followers = ref({});
const searchQuery = ref('');

async function fetchMembers() {
    getFollowers(memberId,
        response => {
            console.log(response.data);
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
                const index = followers.value.findIndex(member => member.memberId === followingId);
                if (index !== -1) {
                    followers.value.splice(index, 1);
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

const follow = async (memberId1) => {
    const member = followers.value.find(m => m.memberId === memberId1);
    if (member) {
        // Call follow
        await followMember(memberId, memberId1,
            () => {
                member.following = true; // Update state on success
                console.log('Follow successful');
            },
            error => {
                console.error('Failed to follow:', error);
            }
        );
    }
};

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
a {
    /* color: #4154f1; */
    color: black;
    text-decoration: none;
}

a:hover {
    color: #717ff5;
    text-decoration: none;
}

.member-list {
    display: flex;
    flex-direction: column;
}
</style>