import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/attraction',
      name: 'attraction',
      component: () => import('../views/AttractionView.vue') 
    },
    {
      path: '/shareBoard',
      name: 'shareBoard',
      component: () => import('@/components/board/shareBoardList.vue'),
    },
    {
      path: '/boardDetail/:boardno',
      name: 'boardDetail',
      component: () => import('@/components/board/boardDetail.vue')
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
