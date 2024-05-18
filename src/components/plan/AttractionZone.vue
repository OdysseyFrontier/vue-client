<script setup>
import { ref, watchEffect } from "vue";
import { usePlanStore } from '@/stores/plan';
import AttractionItem from "@/components/plan/AttractionItem.vue";
import draggable from 'vuedraggable';

const store = usePlanStore();
const searchedAttractions = ref([]);
const plannedAttractions = ref([]);
const startDate = ref();
const endDate = ref();


const deleteAttraction = (index) => {
    plannedAttractions.value.splice(index, 1);
};

watchEffect(() => {
    // searchAttractionList 값 가져오기
    console.log(usePlanStore().searchedAttractions);

    if (!usePlanStore().searchedAttractions) {
        return;
    }

    searchedAttractions.value = usePlanStore().searchedAttractions;
});

watchEffect(() => {
    if (usePlanStore().startDate && usePlanStore().endDate) {
        startDate = usePlanStore().startDate;
        endDate = usePlanStore().endDate;
        // make date line
        // store.updateAttractionsByDate();

    }
});

watchEffect(() => {
    console.log(usePlanStore().plannedAttractions);

    if (!usePlanStore().plannedAttractions) {
        return;
    }
    plannedAttractions.value = usePlanStore().plannedAttractions;
    usePlanStore().plannedAttractions = plannedAttractions.value;
    // plannedAttractions.value = store.plannedAttractions;
    // store.updateAttractionsByDate();
});

</script>

<template>

    <div class="d-flex flex-column">
        <div class="container">
            <div class="row min-vh-100">
                <div class="col-6 flex-grow-1" style="height: 45rem;">
                    <h3>검색 된 장소</h3>
                    <p>드래그로 옮겨 보세요.</p>
                    <draggable class="dragArea list-group custom-border h-100" :list="searchedAttractions"
                        :group="{ name: 'people', pull: 'clone', put: false }" @change="log" item-key="name">
                        <template #item="{ element }">
                            <div class="list-group-item">
                                <AttractionItem :attraction="element" />
                            </div>
                        </template>
                    </draggable>
                </div>
                <div class="col-6 flex-grow-1" style="height: 45rem;">
                    <h3>계획 장소</h3>
                    <p>아래에 추가 됩니다.</p>
                    <draggable class="dragArea list-group custom-border h-100" :list="plannedAttractions"
                        :group="{ name: 'people', pull: true, put: true }" @change="log" item-key="name">
                        <template #item="{ element }">
                            <div class="list-group-item">
                                <button @click="deleteAttraction(index)" class="btn btn-danger btn-sm">Delete</button>
                                <AttractionItem :attraction="element" />
                            </div>
                        </template>
                    </draggable>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-border {
    border: 2px solid rgb(174, 167, 167);
    /* 빨간색 실선 테두리 */
    border-radius: 5px;
    /* 테두리 모서리를 둥글게 만듦 */
    padding: 10px;
    /* 내용과 테두리 사이에 여백 추가 */
}

.flex-grow-1 {
    overflow-y: auto;
    /* 스크롤이 내부에서 발생하도록 설정 */
}

/* Chrome, Safari, Opera */
.flex-grow-1::-webkit-scrollbar {
    display: none;
    /* 스크롤바 영역을 숨김 */
}

/* Firefox */
.flex-grow-1 {
    scrollbar-width: none;
    /* Firefox에서 스크롤바를 숨김 */
}

/* IE, Edge */
.flex-grow-1 {
    -ms-overflow-style: none;
    /* IE와 Edge에서 스크롤바를 숨김 */
}
</style>