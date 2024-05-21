<template>
    <div class="container">

        <!-- Plan Details Cards -->

        <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-4 mb-4" v-for="detail in planDetails" :key="detail.planDetailId">
                {{ detail }}
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">{{ detail.title }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{ detail.planTime }}</h6>
                        <p class="card-text">{{ detail.description }}</p>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-primary w-100">상세 보기</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Plan Information -->
        <div class="plan-info mb-4 p-3 border rounded">
            <div class="form-group">
                <label for="plan-name">계획 이름:</label>
                <p class="card-text">{{ plan.title }}</p>
            </div>
            <div class="form-group">
                <label for="start-date">출발일자:</label>
                <p class="card-text">{{ plan.startTime }}</p>
            </div>
            <div class="form-group">
                <label for="end-date">도착일자:</label>
                <p class="card-text">{{ plan.endTime }}</p>
            </div>
            <div class="form-group">
                <label for="plan-details">계획 설명:</label>
                <p class="card-text">{{ plan.description }}</p>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-primary">계획 수정</button>
            </div>
        </div>


    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getPlan } from '@/api/plan';

const plan = ref({});
const planDetails = ref([]);

export default {
    name: 'PlanDetail',
    setup() {
        const router = useRouter();

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
            planDetails
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