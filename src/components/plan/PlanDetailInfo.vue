<template>
    <div class="container">
  
        <div class="plan-info mb-4 p-3 border rounded">
        <div class="form-group">
          <label for="plan-name">계획 이름:</label>
          <p class="card-text">{{ plan.title }}</p>
        </div>
        <div class="form-group">
          <label for="start-date">출발일자:</label>
          <p class="card-text">{{ formatPlanDate(plan.startTime) }}</p>
        </div>
        <div class="form-group">
          <label for="end-date">도착일자:</label>
          <p class="card-text">{{ formatPlanDate(plan.endTime) }}</p>
        </div>
        <div class="form-group">
          <label for="plan-details">계획 설명:</label>
          <p class="card-text">{{ plan.description }}</p>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-primary">계획 수정</button>
        </div>
      </div>
      <!-- Plan Details Cards -->
      
      <div class="row">
        <div class="col-xs-12 col-lg-6 col-xl-4 mb-4" v-for="detail in planDetails" :key="detail.planDetailId">
      
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">{{ detail.attractionInfo.title }}</h5>
              <h5 class="card-title">{{ detail.attractionInfo.addr1 }}</h5>
              <h5 class="card-title">{{ detail.attractionInfo.addr2 }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{ formatPlanTime(detail.planTime) }}</h6>
              <p class="card-text">
                {{ isExpanded(detail.planDetailId) ? detail.description : truncateText(detail.description, 100) }}
              </p>
            </div>
            <div class="card-footer">
              <button class="btn btn-secondary w-100" @click="toggleExpand(detail.planDetailId)">
                {{ isExpanded(detail.planDetailId) ? '접기' : '더 보기' }}
              </button>
              <RouterLink
                  :to="{name: 'AttractionDetail', params: {contentId: detail.contentId} }"
                  class="btn btn-primary w-100 mt-2"
                >관광지 상세보기
            </RouterLink>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Main Plan Information -->
      
  
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { getPlan } from '@/api/plan';
  import { usePlanStore } from '@/stores/plan'

  export default {
    name: 'PlanDetail',
    setup() {
      const plan = ref({});
      const planDetails = ref([]);
      const expandedDetails = ref(new Set());
      const router = useRouter();
    
      const store = usePlanStore();
      store.setPlanDetails(planDetails);
      
      const formatPlanTime = (planTimeArray) => {
        if (!Array.isArray(planTimeArray)) return '';
        const [year, month, day, hour, minute] = planTimeArray;
        const date = new Date(year, month - 1, day, hour, minute);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      };
  
      const formatPlanDate = (planDateArray) => {
        if (!Array.isArray(planDateArray)) return '';
        const [year, month, day] = planDateArray;
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString();
      };
  
      const truncateText = (text, length) => {
        if (text.length <= length) return text;
        return text.substring(0, length) + '...';
      };
  
      const isExpanded = (planDetailId) => {
        return expandedDetails.value.has(planDetailId);
      };
  
      const toggleExpand = (planDetailId) => {
        if (expandedDetails.value.has(planDetailId)) {
          expandedDetails.value.delete(planDetailId);
        } else {
          expandedDetails.value.add(planDetailId);
        }
      };
  
      onMounted(() => {
        const planId = router.currentRoute.value.params.planId;
        getPlan(planId, (response) => {
          console.log(response.data);
          plan.value = response.data;
          planDetails.value = response.data.planDetails.sort((a, b) => new Date(a.planTime) - new Date(b.planTime));
          console.log(planDetails.value);
        }, (error) => {
          console.error('Failed to fetch plan', error);
        });
      });
  
      
      return {
        plan,
        planDetails,
        formatPlanTime,
        formatPlanDate,
        truncateText,
        isExpanded,
        toggleExpand
      };
    }
  };
  </script>
  
  <style scoped>
  .plan-info {
    background-color: #f8f9fa;
  }
  
  .card {
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .card-body {
    padding: 20px;
  }
  
  .card-title {
    font-size: 1.25rem;
    font-weight: bold;
  }
  
  .card-subtitle {
    font-size: 0.875rem;
  }
  
  .card-text {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  
  .card-footer {
    background-color: transparent;
    border-top: none;
    padding: 10px;
  }
  
  .form-group label {
    font-weight: bold;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
  }
  </style>
  