<template>
    <div class="container mt-4">
        <RouterLink :to="{ name: 'memberMyPage', params: { memberId: 'me' } }">
            <i class="bi bi-caret-left-fill"></i>
            <span>뒤로가기</span>
        </RouterLink>
        <h2 class="my-3">팔로잉 목록</h2>
        <div class="search-bar mb-3 d-flex">
            <input type="text" class="form-control me-2" placeholder="검색" v-model="searchQuery">
            <button class="btn btn-primary" @click="filterFollowings">검색</button>
        </div>
        <div class="member-list">
            <MyMemberItem v-for="member in followings" :key="member.memberId" :current-member-id="memberId"
                :member="member" @toggle-follow="toggleFollow" />
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect, onMounted, computed } from 'vue';
import { useMemberStore } from '@/stores/member';
import { getFollowing, unfollowMember, followMember } from '@/api/member';
import MyMemberItem from '@/components/member/myPage/MyMemberItem.vue';
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const store = useMemberStore();

let { memberId } = route.params;
if (memberId == "me") {
    memberId = store.memberInfo.memberId
}

// const memberId = store.memberInfo?.memberId || 1;
const followings = ref({});
const searchQuery = ref('');

const toggleFollow = async memberId1 => {
    const member = followings.value.find(m => m.memberId === memberId1);
    if (member) {
        if (member.following) {
            // Call unfollow
            await unfollowMember(memberId, memberId1,
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
    }
};



async function fetchMembers() {
    getFollowing(memberId,
        response => {
            console.log('Fetched members');
            console.log(response.data);
            followings.value = response.data;
            followings.value.forEach(member => member.following = true);
            console.log(followings.value);
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