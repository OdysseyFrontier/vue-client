<template>
    <div class="container mt-4">
        <div class="search-bar mb-3 d-flex">
            <input type="text" class="form-control me-2" placeholder="검색" v-model="searchQuery">
            <button class="btn btn-primary" @click="fetchSearchMembers">검색</button>
        </div>
        <div class="member-list">
            <MyMemberItem v-for="member in memberList" :key="member.memberId" :current-member-id="loginMemberId"
                :member="member" @toggle-follow="toggleFollow" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { searchAllMembersByLoginMemberId, searchMembersByLoginMemberId, followMember, unfollowMember } from '@/api/member';
import MyMemberItem from '@/components/member/myPage/MyMemberItem.vue';
import { useMemberStore } from '@/stores/member';
import { useSidebarStore } from "@/stores/sidebar.js";

const sidebarStore = useSidebarStore();
sidebarStore.changesSidebarState("memberSearch");
sidebarStore.open = false;

const store = useMemberStore();
const memberList = ref([]);
const searchQuery = ref('');
const loginMemberId = store.memberInfo?.memberId || 1;

const toggleFollow = async memberId => {
    const member = memberList.value.find(m => m.memberId === memberId);
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

async function fetchSearchMembers() {
    console.log(searchQuery.value)

    searchMembersByLoginMemberId(
        searchQuery.value,
        loginMemberId,
        ({ data }) => {
            memberList.value = data;
        },
        (error) => {
            console.log(searchQuery.value)
            console.log(error);
        }
    );
}

function fetchAllMembers() {
    searchAllMembersByLoginMemberId(
    loginMemberId,
        ({ data }) => {
            memberList.value = data;
            console.log(memberList.value);
        },
        (error) => {
            console.log(searchQuery.value)
            console.log(error);
        }
    );
}

watch(searchQuery, () => {
    console.log(searchQuery.value)
    if (searchQuery.value == "" || searchQuery.value == " " || searchQuery.value.length == 0) {
        fetchAllMembers();
    } else {
        fetchSearchMembers();
    }
});

onMounted(() => {
    searchAllMembersByLoginMemberId(
        loginMemberId,
        ({ data }) => {
            memberList.value = data;
            console.log(memberList.value);
        },
        (error) => {
            console.log(error);
        }
    );
});
</script>

<style scoped>
.member-list {
    display: flex;
    flex-direction: column;
}
</style>
