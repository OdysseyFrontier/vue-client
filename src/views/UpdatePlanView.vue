<script setup>
import { ref, onMounted } from "vue";
import { useSidebarStore } from "@/stores/sidebar.js";
import { useRouter } from 'vue-router';
import { usePlanStore } from '@/stores/plan';
import { getPlan } from '@/api/plan';

const dataFetched = ref(false); // Define a reactive variable to track data fetching
const sidebarStore = useSidebarStore();
sidebarStore.changesSidebarState("attraction");
sidebarStore.open = false;

import UpdatePlanTimeLine from "@/components/plan/update/UpdatePlanTimeLine.vue";
import UpdatePlanning from "@/components/plan/update/UpdatePlanning.vue";
import UpdatePlanGoogleMap from "@/components/plan/update/UpdatePlanGoogleMap.vue";
import UpdateSearchingBar from "@/components/plan/update/UpdateSearchingBar.vue";
import UpdateAttractionZone from "@/components/plan/update/UpdateAttractionZone.vue";

const router = useRouter();
const store = usePlanStore();

function formatDateTimeLocal(dateArray) {
    if (!dateArray || dateArray == null) {
        console.error("Invalid date array");
        return ''; // Return empty if the dateArray is not valid
    }
    if (dateArray.length !== 5) {
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

onMounted(() => {
    const planId = router.currentRoute.value.params.planId;
    getPlan(planId, (response) => {
        console.log(response.data);
        const updatePlan = response.data;
        let planDetails = response.data.planDetails.sort((a, b) => new Date(a.planTime) - new Date(b.planTime));
        console.log(planDetails);

        const details = planDetails.map(detail => {
            console.log(detail)
            return {
                ...detail.attractionInfo,
                description: detail.description,
                contentId: detail.contentId,
                planDetailId: detail.planDetailId,
                planTime: formatDateTimeLocal(detail.planTime)
            }
        });
        console.log(details)

        planDetails = details;
        console.log("planDetails")
        usePlanStore().setPlannedAttractions(planDetails);

        if (updatePlan.startTime && !isNaN(new Date(updatePlan.startTime).valueOf())) {
            usePlanStore().setStartTime(formatDate(updatePlan.startTime));
        }

        if (updatePlan.endTime && !isNaN(new Date(updatePlan.endTime).valueOf())) {
            usePlanStore().setEndTime(formatDate(updatePlan.endTime));
        }

        // inputPlanName.value = updatePlan.value.title;
        // inputPlanDescription.value = updatePlan.value.description;

        store.isUpdate = true;
        console.log("view complete")
        dataFetched.value = true; // Set dataFetched to true after data is fetched
    }, (error) => {
        console.error('Failed to fetch plan', error);
    });
});

function formatDate(dateArray) {
    if (dateArray.length !== 3) return ''; // Return empty if the dateArray is not valid
    const [year, month, day] = dateArray;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`; // Convert month and day to two digits
}


</script>

<template class="flex-grow-1">
    <div class="d-flex flex-column">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 bg-light p-3">
                    <UpdateSearchingBar />
                </div>
            </div>
            <template v-if="dataFetched">

                <div class="row" style="height: 60rem;">
                    <div :class="{ 'col-lg-6': true, 'col-12': $mq === 'xl' }" class="bg-white p-6"
                        style="height: 60rem;">
                        <UpdateAttractionZone />
                    </div>
                    <div :class="{ 'col-lg-6': true, 'col-12': $mq === 'xl' }" class="p-3">
                        <div class="bg-white p-3" style="height: 60rem;">
                            <UpdatePlanGoogleMap />
                        </div>
                    </div>
                </div>
                <div class="row bg-light p-3">
                    <UpdatePlanning />
                </div>
                <div class="row bg-white p-3 flex-grow-1" style="height: 60rem;">
                    <UpdatePlanTimeLine />
                </div>
            </template>
        </div>
    </div>
</template>


<style scoped>
/* 기본적인 미디어 쿼리를 추가하여 더 작은 화면에서 레이아웃을 조정합니다. */
@media (max-width: 768px) {
    .row {
        flex-direction: column;
    }

    .col-12,
    .col-lg-6 {
        height: auto;
        /* 높이 자동 조정 */
    }
}

.bg-light {
    background-color: #f8f9fa !important;
}

.bg-white {
    background-color: #ffffff !important;
}

.flex-grow-1 {
    overflow-y: auto;
    /* 스크롤이 내부에서 발생하도록 설정 */
    height: 100%;
    /* 전체 높이를 부모에 맞춤 */
}

/* 스크롤이 필요한 영역에 대해 스크롤바 표시 설정 */
.flex-grow-1 {
    overflow-y: scroll;
}
</style>
