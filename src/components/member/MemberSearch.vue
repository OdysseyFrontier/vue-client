<template>
    <div class="container mt-4">
        <div class="search-bar mb-3 d-flex">
            <input type="text" class="form-control me-2" placeholder="검색" v-model="searchQuery">
            <button class="btn btn-primary" @click="fetchMembers">검색</button>
        </div>
        <div class="member-list">
            <MyMemberItem v-for="member in memberList" :key="member.memberId" :member="member"
                @toggle-follow="toggleFollow" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { searchMembers, followMember, unfollowMember } from '@/api/member';
import MyMemberItem from '@/components/member/myPage/MyMemberItem.vue';

const memberList = ref([]);
const searchQuery = ref('');

const toggleFollow = async memberId => {
    const member = memberList.value.find(m => m.memberId === memberId);
    if (member) {
        if (member.following) {
            // Call unfollow
            await unfollowMember(store.memberInfo.memberId, memberId, 
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
            await followMember(store.memberInfo.memberId, memberId, 
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
    searchMembers(
        searchQuery,
        ({ data }) => {
            memberList.value = data;
        },
        (error) => {
            console.log(error);
        }
    );
}

watchEffect(() => {
    fetchSearchMembers();
})

onMounted(() => {
    searchMembers(
        "",
        ({ data }) => {
            memberList.value = data;
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