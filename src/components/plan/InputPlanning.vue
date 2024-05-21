<script setup>
import { ref, watchEffect } from "vue";
import { usePlanStore } from '@/stores/plan';
import { createPlan } from '@/api/plan'; // Import the createPlan function
import { useMemberStore } from '@/stores/member';

const store = usePlanStore();
const memberId = useMemberStore().memberInfo.memberId;


const inputPlanName = ref("");
const inputStartDate = ref("");
const inputEndDate = ref("");
const inputPlanDescription = ref("");

watchEffect(() => {
    inputStartDate.value = usePlanStore().startTime;
    inputEndDate.value = usePlanStore().endTime;
    usePlanStore().title = inputPlanName.value;
    usePlanStore().description = inputPlanDescription.value;
});


const handleCreatePlan = async () => {
    const planDto = {
        memberId: memberId,
        title: usePlanStore().title,
        description: usePlanStore().description,
        startTime: inputStartDate.value,
        endTime: inputEndDate.value,
        planDetails: usePlanStore().plannedAttractions.map(attraction => ({
            contentId: attraction.contentId,
            name: attraction.name,
            planTime: attraction.planTime,
            description: attraction.description
        }))
    };

    console.log(planDto);

    const success = (response) => {
        console.log(response.data);
        alert('Plan created successfully');
    };

    const fail = (error) => {
        console.error('Error creating plan:', error);
        alert('Failed to create plan');
    };

    createPlan(planDto, success, fail);
};
</script>

<template>
    <div>
        <form @submit.prevent="handleCreatePlan">
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
                <button type="submit" class="btn btn-primary">계획 추가</button>
                <button type="reset" class="btn btn-secondary">계획 취소</button>
            </div>
        </form>
    </div>
</template>

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