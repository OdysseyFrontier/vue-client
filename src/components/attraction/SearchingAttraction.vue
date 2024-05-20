<script setup>
import { ref, onMounted } from 'vue';
import { getSidos, getGuguns, getSearchAttraction, getSearchCategory } from '@/api/attraction';

import { useAttractionStore } from '@/stores/attraction';

const store = useAttractionStore();

const sidos = ref([]);
const guguns = ref([]);


const selectedSidoCode = ref("0");
const selectedGugunCode = ref("0");
const selectedContentTypeId = ref("0");
const keyword = ref("");
const nowLoc = ref({ lat: 36.1061824, lng: 128.4227797 })


const fetchSidos = () => {
    console.log("sido")
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
    console.log("gugun")
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

const fetchSearchAttraction = () => {
    console.log("attr")
    getSearchAttraction(
        selectedContentTypeId.value,
        selectedSidoCode.value,
        selectedGugunCode.value,
        keyword.value,
        nowLoc.value,
        ({ data }) => {
            store.setSearchAttractionList(data);
        },
        (error) => {
            console.log(error);
        }
    )
}


onMounted(() => {
    // 페이지가 마운트된 후 실행될 함수
    fetchSidos();
    getSearchCategory(
        0,
        ({ data }) => {
            console.log("category")
            store.setSearchAttractionList(data);
        },
        (error) => {
            console.log("category")
            console.log(error);
        }
    );
});

</script>

<template>
    <div class="maphead row m-3">
        <div class="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center col-9">
            <div class="d-flex justify-content-center">
                <div class="text-center">
                    <h1 class="mx-auto my-0 mt-3 text-center fw-bold">
                        전국 관광지 정보
                    </h1>
                    <form class="d-flex my-3" onsubmit="return false;" role="search">
                        <select v-model="selectedSidoCode" id="search-sido" class="form-select me-2"
                            @change="fetchGuguns">
                            <option value="0" name="sidoCode" selected>검색 할 지역 선택</option>
                            <option v-for="(sido) in sidos" :key="sido.sidoCode" :value="sido.sidoCode">{{ sido.sidoName
                                }}</option>
                        </select>
                        <select v-model="selectedGugunCode" id="search-gugun" class="form-select me-2">
                            <option value="0" name="gugunCode" selected>검색할 시/군/구 선택</option>
                            <option v-for="gugun in guguns" :key="gugun.gugunCode" :value="gugun.gugunCode">{{
                                gugun.gugunName }}</option>
                        </select>
                        <select id="search-content-id" class="form-select me-2" v-model="selectedContentTypeId">
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
                        <input id="search-keyword" name="keyword" class="form-control me-2" type="search"
                            v-model="keyword" placeholder="검색어" aria-label="검색어" />
                        <button id="btn-search" class="btn btn-info" type="button" @click="fetchSearchAttraction">
                            검색
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>