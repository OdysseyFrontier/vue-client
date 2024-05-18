<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { usePlanListStore } from "@/stores/planList";
import PlanListItem from "@/components/planList/PlanListItem.vue"

const store = usePlanListStore();

const planList = ref(store.planList)

watchEffect(() => {
    // searchAttractionList가 비어 있는 경우 처리
    planList.value = usePlanListStore().planList;
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
/* 여기에 필요한 추가 스타일을 작성하세요 */
</style>