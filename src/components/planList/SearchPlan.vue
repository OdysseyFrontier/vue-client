<script setup>
import { ref, onMounted } from 'vue';
import { usePlanStore } from "@/stores/plan";
import { getSidos, getGuguns } from '@/api/attraction';
import { getSearchPlan } from '@/api/plan';

const store = usePlanStore();

const sidos = ref([]);
const guguns = ref([]);

const selectedSidoCode = ref("0");
const selectedGugunCode = ref("0");
const selectedContentTypeId = ref("0");
const keyword = ref("");
const sortBy = ref('likes');

const fetchSidos = () => {
    getSidos(
        ({ data }) => {
            sidos.value = data;
        },
        (error) => {
            console.log(error);
        }
    );
}

const fetchGuguns = () => {
    if (selectedSidoCode.value === "0") {
        guguns.value = [];
        return;
    }
    getGuguns(
        selectedSidoCode.value,
        ({ data }) => {
            guguns.value = data;
        },
        (error) => {
            console.log(error);
        }
    );
}

const fetchSearchPlan = () => {
    getSearchPlan(
        selectedContentTypeId.value,
        selectedSidoCode.value,
        selectedGugunCode.value,
        keyword.value,
        ({ data }) => {
            store.setSearchFilters({
                query: keyword.value,
                sido: selectedSidoCode.value,
                gugun: selectedGugunCode.value,
                category: selectedContentTypeId.value
            });
        },
        (error) => {
            console.log(error);
        }
    )
}

const updateSortBy = () => {
    store.setSortBy(sortBy.value);
}

onMounted(() => {
    fetchSidos();
});
</script>

<template>
    <div class="container my-4">
        <div class="row justify-content-center gx-3 gy-2">
            <div class="col-lg-auto col-12">
                <select v-model="selectedSidoCode" class="form-select" @change="fetchGuguns">
                    <option value="0" selected>검색 할 지역 선택</option>
                    <option v-for="(sido) in sidos" :key="sido.sidoCode" :value="sido.sidoCode">{{ sido.sidoName }}</option>
                </select>
            </div>
            <div class="col-lg-auto col-12">
                <select v-model="selectedGugunCode" class="form-select">
                    <option value="0" selected>검색할 구/군 선택</option>
                    <option v-for="gugun in guguns" :key="gugun.gugunCode" :value="gugun.gugunCode">{{ gugun.gugunName }}</option>
                </select>
            </div>
            <div class="col-lg-auto col-12">
                <select v-model="selectedContentTypeId" class="form-select">
                    <option value="0" selected>모든 관광지 유형</option>
                    <option value="12">관광지</option>
                    <option value="14">문화시설</option>
                    <option value="15">축제 / 공연 / 행사</option>
                    <option value="25">여행코스</option>
                    <option value="28">레포츠</option>
                    <option value="32">숙박</option>
                    <option value="38">쇼핑</option>
                    <option value="39">음식점</option>
                </select>
            </div>
            <div class="col-lg-auto col-12">
                <input class="form-control" type="search" v-model="keyword" placeholder="검색어" aria-label="검색어" />
            </div>
            <div class="col-lg-auto col-12">
                <button class="btn btn-primary w-100" type="button" @click="fetchSearchPlan">검색</button>
            </div>
            <div class="col-lg-auto col-12">
                <select v-model="sortBy" @change="updateSortBy" class="form-select">
                    <option value="likes">좋아요순</option>
                    <option value="views">조회수순</option>
                    <option value="createdAt">최신순</option>
                </select>
            </div>
        </div>
    </div>
</template>

<style scoped>
.search-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
}

.search-item {
    flex: 1 1 auto;
    min-width: 150px; /* 최소 너비를 설정하여 아이템들이 줄어들 때 겹치지 않도록 합니다 */
}

@media (max-width: 992px) {
    .search-container {
        flex-direction: column;
    }
}
</style>