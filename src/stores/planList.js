import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const usePlanListStore = defineStore('planList', () => {
  const planList = ref([
    { id: 1, title: '플랜 1', description: '설명 1', image: 'url-to-image-1', likes: 100, views: 200, createdAt: new Date('2023-01-01'), attraction: { sido: '서울', gugun: '강남', category: '관광지1' }},
    { id: 2, title: '플랜 2', description: '설명 2', image: 'url-to-image-2', likes: 150, views: 300, createdAt: new Date('2023-02-01'), attraction: { sido: '서울', gugun: '종로', category: '관광지2' }},
    { id: 3, title: '플랜 3', description: '설명 3', image: 'url-to-image-3', likes: 120, views: 250, createdAt: new Date('2023-03-01'), attraction: { sido: '부산', gugun: '해운대', category: '관광지1' }},
    { id: 1, title: '플랜 4', description: '설명 1', image: 'url-to-image-1', likes: 100, views: 200, createdAt: new Date('2023-01-01'), attraction: { sido: '서울', gugun: '강남', category: '관광지1' }},
    { id: 2, title: '플랜 2', description: '설명 2', image: 'url-to-image-2', likes: 150, views: 300, createdAt: new Date('2023-02-01'), attraction: { sido: '서울', gugun: '종로', category: '관광지2' }},
    { id: 3, title: '플랜 3', description: '설명 3', image: 'url-to-image-3', likes: 120, views: 250, createdAt: new Date('2023-03-01'), attraction: { sido: '부산', gugun: '해운대', category: '관광지1' }},
    { id: 1, title: '플랜 11', description: '설명 1', image: 'url-to-image-1', likes: 100, views: 200, createdAt: new Date('2023-01-01'), attraction: { sido: '서울', gugun: '강남', category: '관광지1' }},
    { id: 2, title: '플랜 2', description: '설명 2', image: 'url-to-image-2', likes: 150, views: 300, createdAt: new Date('2023-02-01'), attraction: { sido: '서울', gugun: '종로', category: '관광지2' }},
    { id: 3, title: '플랜 3', description: '설명 3', image: 'url-to-image-3', likes: 120, views: 250, createdAt: new Date('2023-03-01'), attraction: { sido: '부산', gugun: '해운대', category: '관광지1' }},
  ]);

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
    updatePlanList
  };
});