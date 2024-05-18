<script setup>
import { ref, watchEffect } from "vue";
import { usePlanStore } from '@/stores/plan';

const planStore = usePlanStore();


const inputPlanName = ref("");
const inputStartDate = ref("");
const inputEndDate = ref("");
const inputPlanDescription = ref("");

watchEffect(() => {
    if (inputStartDate.value && inputEndDate.value) {
        planStore.setStartDate(inputStartDate.value);
        planStore.setEndDate(inputEndDate.value);
    } else if (inputStartDate.value === '' || inputEndDate.value === '') {
        planStore.setStartDate(null);
        planStore.setEndDate(null);
    }
});


</script>

<template>
    <div>
        <form>
            <div class="form-group">
                <label for="plan-name">계획 이름:</label>
                <input v-model="inputPlanName" type="text" id="plan-name" class="form-control" placeholder="계획 이름">
            </div>
            <div class="form-group">
                <label for="start-date">출발일자:</label>
                <input v-model="inputStartDate" type="date" id="start-date" class="form-control">
            </div>
            <div class="form-group">
                <label for="end-date">도착일자:</label>
                <input v-model="inputEndDate" type="date" id="end-date" class="form-control">
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