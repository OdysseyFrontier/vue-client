<template>
    <div>
        <form @submit.prevent="handleUpdatePlan">
            <div class="form-group">
                <label for="plan-name">계획 이름:</label>
                <input v-model="inputPlanName" type="text" id="plan-name" class="form-control" placeholder="계획 이름">
            </div>
            <div class="form-group">
                <label for="start-date">출발일자:</label>
                <input v-model="inputStartDate" type="date" id="start-date" class="form-control" readonly>
            </div>
            <div class="form-group">
                <label for="end-date">도착일자:</label>
                <input v-model="inputEndDate" type="date" id="end-date" class="form-control" readonly>
            </div>
            <div class="form-group">
                <label for="plan-details">계획 설명:</label>
                <textarea v-model="inputPlanDescription" id="plan-details" class="form-control" rows="4"
                    placeholder="계획 상세 설명..."></textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">계획 수정</button>
                <button type="reset" class="btn btn-secondary">계획 취소</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, watchEffect, onMounted } from "vue";
import { usePlanStore } from '@/stores/plan';
import { useMemberStore } from '@/stores/member';
import axios from 'axios';
import { getPlan } from '@/api/plan';

const store = usePlanStore();
const memberId = useMemberStore().memberInfo?.memberId || 1;

const inputPlanName = ref("");
const inputStartDate = ref("");
const inputEndDate = ref("");
const inputPlanDescription = ref("");
const updatePplan = ref([]);

onMounted(() => {
    getPlan(planId, (response) => {
        updateplan = response.data;
        store.updatePlan = plan;
        inputPlanName.value = plan.value.title;
        inputStartDate.value = plan.value.startTime;
        inputEndDate.value = plan.value.endTime;
        inputPlanDescription.value = plan.description;
    } catch (error) {
        console.error('Failed to fetch plan:', error);
    }
}});

watchEffect(() => {
    store.updatePlan.title = inputPlanName.value;
    store.updatePlan.description = inputPlanDescription.value;
    store.updatePlan.startTime = inputStartDate.value;
    store.updatePlan.endTime = inputEndDate.value;
});

const handleUpdatePlan = async () => {
    const planDto = {
        memberId: memberId,
        title: store.updatePlan.title,
        description: store.updatePlan.description,
        startTime: inputStartDate.value,
        endTime: inputEndDate.value,
        planDetails: store.updatePlan.plannedAttractions.map(attraction => ({
            contentId: attraction.contentId,
            name: attraction.name,
            planTime: attraction.planTime,
            description: attraction.description
        }))
    };

    try {
        const response = await axios.put(`/api/plan/${store.updatePlan.id}`, planDto); // Replace with your API endpoint to update the plan
        console.log(response.data);
        alert('Plan updated successfully');
    } catch (error) {
        console.error('Error updating plan:', error);
        alert('Failed to update plan');
    }
};
</script>

<style scoped>
.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="text"],
input[type="date"],
textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
}

textarea {
    resize: vertical;
}

.form-actions {
    display: flex;
    justify-content: space-between;
}

button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
}

button[type="reset"] {
    background-color: #6c757d;
}

button:hover {
    opacity: 0.9;
}
</style>