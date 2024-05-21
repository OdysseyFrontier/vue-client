import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const usePlanListStore = defineStore('planList', () => {
  const planList = ref([]);

  const searchFilters = ref({
    query: '',
    sido: '',
    gugun: '',
    category: ''
  });
  const sortBy = ref('likes');

  const filteredAndSortedPlans = computed(() => {
    let filteredPlans = planList.value;

    if (searchFilters.value.query || searchFilters.value.sido || searchFilters.value.gugun || searchFilters.value.category) {
      filteredPlans = filteredPlans.filter(plan => {
        const matchesQuery = plan.title.toLowerCase().includes(searchFilters.value.query.toLowerCase());
        const matchesSido = searchFilters.value.sido ? plan.attraction.sido === searchFilters.value.sido : true;
        const matchesGugun = searchFilters.value.gugun ? plan.attraction.gugun === searchFilters.value.gugun : true;
        const matchesCategory = searchFilters.value.category ? plan.attraction.category === searchFilters.value.category : true;
        return matchesQuery && matchesSido && matchesGugun && matchesCategory;
      });
    }

    return filteredPlans.sort((a, b) => {
      if (sortBy.value === 'likes') {
        return b.likes - a.likes;
      } else if (sortBy.value === 'views') {
        return b.views - a.views;
      } else if (sortBy.value === 'createdAt') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
  });

  function setSearchFilters(filters) {
    searchFilters.value = filters;
    updatePlanList();
  }

  function setSortBy(criteria) {
    sortBy.value = criteria;
    updatePlanList();
  }

  function setPlanList(plans) {
    planList.value = plans;
  }
  function updatePlanList() {
    planList.value = filteredAndSortedPlans.value;
  }


  return {
    planList,
    searchFilters,
    sortBy,
    filteredAndSortedPlans,
    setSearchFilters,
    setSortBy,
    setPlanList,
    updatePlanList
  };
});