import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebar", () => {
  const sidebarList = ref({
    home: "",
    board: "collapsed",
    attraction: "collapsed",
    plan: "collapsed",
    planList: "collapsed",
    hotplace: "collapsed",
    mypage: "collapsed",
    login: "collapsed",
    join: "collapsed",
    stat: "collapsed",
    memberSearch: "collapsed"
  });

  const open = ref(false)

  const changesSidebarState = (name) => {
    Object.keys(sidebarList.value).forEach((key) => {
      sidebarList.value[key] = key === name ? "" : "collapsed";
    });
  };

  function toggleSidebar() {
    open.value = !open.value;
  }
  return { sidebarList, open, changesSidebarState, toggleSidebar };
});
