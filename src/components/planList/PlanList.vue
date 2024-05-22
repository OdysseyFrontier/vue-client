<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { usePlanListStore } from "@/stores/planList";
import PlanListItem from "@/components/planList/PlanListItem.vue"
import { getSearchPlan } from '@/api/plan';

const store = usePlanListStore();

const planList = ref([])

watchEffect(() => {
    // searchAttractionList가 비어 있는 경우 처리
    planList.value = usePlanListStore().planList;
});

const fetchPlanList = () => {
    getSearchPlan(
        0,
        0,
        0,
        "no",
        ({ data }) => {
            usePlanListStore().setPlanList(data);
            planList.value = data;
        },
        (error) => {
            console.log(error);
        }
    )
}

onMounted(() => {
    fetchPlanList();
});

</script>

<template>
    <div class="container my-4">
        <div class="row">
            <div class="col-md-6 col-lg-4 mb-4" v-for="plan in planList" :key="plan.id">
                <PlanListItem :plan="plan" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    padding: 2rem 1rem;
    /* Increase padding around the grid */
}

.row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    /* Ensures that items are evenly spaced */
}

.col-md-6.col-lg-4.mb-4 {
    flex: 0 0 48%;
    /* Adjust the flex-basis to ensure space usage */
    max-width: 48%;
    /* Corresponds to flex setting */
    margin-bottom: 2rem;
    /* More space between rows */
}

@media (min-width: 992px) {

    /* Adjustments for larger screens */
    .col-md-6.col-lg-4.mb-4 {
        flex: 0 0 30%;
        /* Three items per row at larger screens */
        max-width: 30%;
    }
}

.decoration-area {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
    border-radius: 15px;
    padding: 2rem;
    margin-top: 2rem;
}

.decoration-content {
    text-align: center;
}

.decoration-content h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.decoration-content p {
    font-size: 1.2rem;
    line-height: 1.5;
}
</style>