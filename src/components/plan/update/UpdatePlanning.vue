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
import { getPlan, modifyPlan } from '@/api/plan';
import { useRouter } from 'vue-router';

const store = usePlanStore();
const memberId = useMemberStore().memberInfo?.memberId || 1;
const router = useRouter();

const updatePlan = ref({});
const planDetails = ref([]);

const inputPlanName = ref("");
const inputStartDate = ref("");
const inputEndDate = ref("");
const inputPlanDescription = ref("");

onMounted(() => {
  const planId = router.currentRoute.value.params.planId;
  getPlan(planId, (response) => {
    console.log(response.data);
    updatePlan.value = response.data;
    planDetails.value = response.data.planDetails.sort((a, b) => new Date(a.planTime) - new Date(b.planTime));
    console.log(planDetails.value);

    const details = planDetails.value.map(detail => {
        console.log(detail)
        return {
            ...detail.attractionInfo,
            description: detail.description,
            contentId : detail.contentId,
            planDetailId : detail.planDetailId,
            planTime : formatDateTimeLocal(detail.planTime)

        }
    });
    console.log(details)

    planDetails.value = details;
    usePlanStore().setPlannedAttractions(planDetails.value);

    if (updatePlan.value.startTime && !isNaN(new Date(updatePlan.value.startTime).valueOf())) {
        usePlanStore().setStartTime(formatDate(updatePlan.value.startTime));
    }

    if (updatePlan.value.endTime && !isNaN(new Date(updatePlan.value.endTime).valueOf())) {
        usePlanStore().setEndTime(formatDate(updatePlan.value.endTime));
    }

    inputPlanName.value = updatePlan.value.title;
    inputPlanDescription.value = updatePlan.value.description;

    store.isUpdate = true;
  }, (error) => {
    console.error('Failed to fetch plan', error);
  });
});

function formatDateTimeLocal(dateArray) {
    if (!dateArray || dateArray == null) {
        console.error("Invalid date array");
        return ''; // Return empty if the dateArray is not valid
    }
    if (dateArray.length !== 5){
        console.error("Invalid date array length:", dateArray.length);
        return ''; // Return empty if the dateArray is not valid
    }

    // Extracting each component from the dateArray
    const [year, month, day, hour, minute] = dateArray;

    // Formatting each component to ensure it has the correct number of digits
    // and concatenating them into a datetime-local compatible string
    const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const formattedTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

    // Combining date and time with 'T' as required by the datetime-local input type
    return `${formattedDate}T${formattedTime}`;
}

// onMounted(() => {
//     const planId = router.currentRoute.value.params.planId;
//     getPlan(planId, (response) => {
//         console.log(response.data)

//         const updatePlan = response.data;
//         store.updatePlan = updatePlan; 
//         console.log(updatePlan.planDetails)

//         const details = updatePlan.planDetails.forEach(detail => {
//             console.log(detail)
//             detail.description = detail.attractionInfo.description;
//             console.log(detail)
//         });
//         console.log(details)

//         usePlanStore().plannedAttractions = updatePlan.planDetails;

//         usePlanStore().setPlannedAttractions(updatePlan.planDetails);
//         console.log(usePlanStore().plannedAttractions);
    
//         if (updatePlan.startTime && !isNaN(new Date(updatePlan.startTime).valueOf())) {
//             usePlanStore().setStartTime(formatDate(updatePlan.startTime));
//         }

//         if (updatePlan.endTime && !isNaN(new Date(updatePlan.endTime).valueOf())) {
//             usePlanStore().setEndTime(formatDate(updatePlan.endTime));
//         }

//         inputPlanName.value = updatePlan.title;
//         inputPlanDescription.value = updatePlan.description;
//     }).catch(error => { // Fixed the syntax for catch
//         console.error('Failed to fetch plan:', error);
//     });
// });

watchEffect(() => {
    inputStartDate.value = usePlanStore().startTime;
    inputEndDate.value = usePlanStore().endTime;
    usePlanStore().title = inputPlanName.value;
    usePlanStore().description = inputPlanDescription.value;
});

function formatDate(dateArray) {
    if (dateArray.length !== 3) return ''; // Return empty if the dateArray is not valid
    const [year, month, day] = dateArray;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`; // Convert month and day to two digits
}

const handleUpdatePlan = async () => {
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

    console.log(planDto)
    console.log(updatePlan.value.planId)
    const success = (response) => {
        console.log(response.data);
        alert('Plan updated successfully');
    };

    const fail = (error) => {
        console.error('Error creating plan:', error);
        alert('Failed to update plan');
    };

    modifyPlan(updatePlan.value.planId,planDto, success, fail);
    console.log(planDto)
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