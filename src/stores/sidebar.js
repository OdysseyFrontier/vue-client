import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', () => {
  const sidebarList = ref({
    home: "",
    board: "collapsed",
    attraction: "collapsed",
    plan: "collapsed",
    hotplace: "collapsed",
    mypage: "collapsed",
    login: "collapsed",
    join: "collapsed",
  })
  

  const changesSidebarState = (name) => {
    Object.keys(sidebarList.value).forEach(key => {
        sidebarList.value[key] = key === name ? "" : "collapsed";
      });
  };

  return { sidebarList, changesSidebarState }
})
