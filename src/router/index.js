import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";

const onlyAuthUser = async (to, from, next) => {
  const memberStore = useMemberStore();
  const { memberInfo, isValidToken } = storeToRefs(memberStore);
  const { getMemberInfo } = memberStore;

  let token = sessionStorage.getItem("accessToken");

  if (memberInfo.value != null && token) {
    await getMemberInfo(token);
  }
  if (!isValidToken.value || memberInfo.value === null) {
    next({ name: "memberLogin" });
  } else {
    next();
  }
};


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // { path: '/:pathMatch(.*)', component: NotFoundComponent },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/plan',
      name: 'plan',
      component: () => import('@/views/PlanView.vue')
    },
    {
      path: '/attraction',
      name: 'attraction',
      component: () => import('@/views/AttractionView.vue')
    },
    {
      path: '/board',
      name: 'board',
      beforeEnter: onlyAuthUser,
      component: () => import('@/views/boardView.vue'),
      children: [
        {
          path: 'list',
          name: 'boardList',
          beforeEnter: onlyAuthUser,
          component: () => import('@/components/board/shareBoardList.vue'),
        },
        {
          path: 'boardDetail/:boardno',
          name: 'boardDetail',
          beforeEnter: onlyAuthUser,
          component: () => import('@/components/board/boardDetail.vue')
        },
        {
          path: "write",
          name: "boardWrite",
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/board/boardWrite.vue"),
        },
        {
          path: "modify/:boardno",
          name: "boardModify",
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/board/boardModify.vue"),
        },
      ]
    },
    {
      path: '/hotplace',
      name: 'hotplace',
      component: () => import('@/components/board/hotplaceList.vue')
    },
    {
      path: "/member",
      name: "member",
      component: () => import("@/views/MemberView.vue"),
      children: [
        {
          path: "login",
          name: "memberLogin",
          component: () => import("@/components/member/MemberLogin.vue"),
        },
        {
          path: "join",
          name: "memberJoin",
          component: () => import("@/components/member/MemberJoin.vue"),
        },
        // {
        //   path: "mypage",
        //   name: "user-mypage",
        //   beforeEnter: onlyAuthUser,
        //   component: () => import("@/components/users/UserMyPage.vue"),
        // },
        // {
        //   path: "modify/:userid",
        //   name: "user-modify",
        //   component: () => import("@/components/users/UserModify.vue"),
        // },
      ],
    },

  ]
})

export default router
