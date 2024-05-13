import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMemberStore = defineStore('member', () => {
  const memberinfo = ref({
    memberName:"ssafy"
  })
  
  function update(info) {
    memberinfo.value = info
  }


  return { memberinfo, update }
})
