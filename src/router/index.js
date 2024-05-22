import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

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
    alert("로그인 후 이용가능합니다.");
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
      path: "/temp",
      name: "temp",
      component: () => import("@/components/temp.vue"),
    },
    {
      path: "/stat",
      name: "stat",
      component: () => import("@/components/stat/Statistics.vue"),
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/plan",
      name: "plan",
      component: () => import("@/views/PlanView.vue"),
    },
    {
      path: '/plan/detail/:planId',
      name: 'PlanDetail',
      component: () => import('@/components/plan/PlanDetail.vue')
    },
    {
      path: '/plan/update/:planId',
      name: 'PlanUpdate',
      component: () => import('@/views/UpdatePlanView.vue')
    },
    {
      path: "/planList",
      name: "planList",
      component: () => import("@/views/PlanListView.vue"),
    },
    {
      path: '/attraction',
      name: 'attraction',
      component: () => import('@/views/AttractionView.vue'),
      // children: [

      // ]
    },
    {
      path: '/attraction/detail/:contentId',
      name: 'AttractionDetail',
      component: () => import('@/components/attraction/AttractionDetail.vue')
    },
    {
      path: "/memberMyPage/:memberId",
      name: "memberMyPage",
      // beforeEnter: onlyAuthUser,
      component: () => import("@/views/MemberMyPageView.vue"),
      children: [
        {
          path: "/myPlanList/:memberId",
          name: "MyPlanList",
          component: () => import("@/components/member/myPage/MyPlanList.vue"),
        },
        {
          path: "/memberHotPlace/:memberId",
          name: "memberHotPlace",
          component: () => import("@/components/hotplace/memberHotPlaceList.vue"),
        },
        {
          path: "info",
          name: "myInfo",
          component: () => import("@/components/tempMyPage/info.vue"),
        },
        {
          path: "infomodify",
          name: "myInfoModify",
          component: () => import("@/components/tempMyPage/infoModify.vue"),
        },
      ],
    },
    {
      path: "/myMemberList",
      name: "myMemberList",
      // beforeEnter: onlyAuthUser,
      component: () => import("@/views/MyMemberListView.vue"),
    },
    {
      path: "/memberSearch",
      name: "memberSearch",
      // beforeEnter: onlyAuthUser,
      component: () => import("@/components/member/MemberSearch.vue"),
    },
    {
      path: "/myFollowerList/:memberId",
      name: "myFollowerList",
      component: () => import("@/components/member/myPage/MyFollowerList.vue"),
    },
    {
      path: "/myFollowingList/:memberId",
      name: "myFollowingList",
      component: () => import("@/components/member/myPage/MyFollowingList.vue"),
    },
    {
      path: "/board",
      name: "board",
      // beforeEnter: onlyAuthUser,
      component: () => import("@/views/boardView.vue"),
      children: [
        {
          path: "list",
          name: "boardList",
          // beforeEnter: onlyAuthUser,
          component: () => import("@/components/board/shareBoardList.vue"),
        },
        {
          path: "boardDetail/:boardno",
          name: "boardDetail",
          // beforeEnter: onlyAuthUser,
          component: () => import("@/components/board/boardDetail.vue"),
        },
        {
          path: "write",
          name: "boardWrite",
          // beforeEnter: onlyAuthUser,
          component: () => import("@/components/board/boardWrite.vue"),
        },
        {
          path: "modify/:boardno",
          name: "boardModify",
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/board/boardModify.vue"),
        },
      ],
    },
    // hotplace 수정중 -----
    // {
    //   path: '/hotplace',
    //   name: 'hotplace',
    //   component: () => import('@/components/board/hotplaceList.vue')
    // },
    {
      path: "/hotplace",
      name: "hotPlace",
      component: () => import("@/views/HotPlaceView.vue"),
      redirect: "/hotplace/list2",
      children: [
        {
          path: "list2",
          name: "hotPlaceList2",
          component: () =>
            import(
              /* webpackChunkName: "community" */ "@/components/hotplace/hotPlaceList2.vue"
            ),
        },
        {
          path: "detail/:contentId",
          name: "hotPlaceDetail",
          component: () =>
            import(
              /* webpackChunkName: "community" */ "@/components/hotplace/HotPlaceDetail.vue"
            ),
        },
        {
          path: "list",
          name: "hotPlaceList",
          component: () =>
            import(
              /* webpackChunkName: "community" */ "@/components/hotplace/HotPlaceList.vue"
            ),
        },
        {
          path: "write",
          name: "hotPlaceWrite",
          // beforeEnter: onlyAuthUser,
          component: () => import("@/components/hotplace/HotPlaceWrite.vue"),
        },
        {
          path: "modify/:contentId",
          name: "hotPlaceModify",
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/hotplace/HotPlaceModify.vue"),
        },
      ],
    },
    //hotplace 수정중 -----
    {
      path: "/tempmypage",
      name: "tempMyPage",
      component: () => import("@/views/tempMyPageView.vue"),
      children: [
        {
          path: "mypageboard",
          name: "myPageBoard",
          component: () => import("@/components/tempMyPage/board.vue"),
        },
        {
          path: "info",
          name: "info",
          component: () => import("@/components/tempMyPage/info.vue"),
        },
        {
          path: "infomodify",
          name: "infoModify",
          component: () => import("@/components/tempMyPage/infoModify.vue"),
        },
        {
          path: "passwordModify",
          name: "passwordModify",
          // beforeEnter: onlyAuthUser,
          component: () => import("@/components/tempMyPage/passwordModify.vue"),
        },
        // {
        //   path: "modify/:userid",
        //   name: "user-modify",
        //   component: () => import("@/components/users/UserModify.vue"),
        // },
      ],
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
        //   // beforeEnter: onlyAuthUser,
        //   component: () => import("@/views/MemberMyPageView.vue"),
        // },
        // {
        //   path: "modify/:userid",
        //   name: "user-modify",
        //   component: () => import("@/components/users/UserModify.vue"),
        // },
      ],
    },
  ],
});

export default router;
