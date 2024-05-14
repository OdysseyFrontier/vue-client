<script setup>
import { ref, onMounted } from 'vue';
import { getSidos, getGuguns, getSearchAttraction } from '@/api/attraction';

const sido = ref();
const gugun = ref();
const searchAttractionList = ref([]);

const fetchSidos = () => {
    getSidos(
        ({ data }) => {
            console.log(data);
            console.log(data.json());
            data.json().addOption("search-sido", data);
        },
        (error) => {
            console.log(error);
        }
    );
}

const fetchGuguns = (sido) => {
    getGuguns(
        sido,
        ({ data }) => {
            data.json(data).addOption("search-gugun", data);
        },
        (error) => {
            console.log(error);
        }
    );
}

const fetchSearchAttraction = (contentTypeId, sidoCode, gugunCode, keywordString, nowLoc) => {
    getSearchAttraction(
        contentTypeId,
        sidoCode,
        gugunCode,
        keywordString,
        nowLoc,
        ({ data }) => {
            searchAttractionList = data;
        },
        (error) => {
            console.log(error);
        }
    )
}

onMounted(() => {
    // 페이지가 마운트된 후 실행될 함수
    fetchSidos();
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
                        <select id="search-sido" class="form-select me-2">
                            <option value="0" name="sidoCode" selected>검색 할 지역 선택</option>
                        </select>
                        <select id="search-gugun" class="form-select me-2">
                            <option value="0" name="gugunCode" selected>검색할 시/군/구 선택</option>
                        </select>
                        <select id="search-content-id" class="form-select me-2">
                            <option value="0" name="contentTypeId" selected>관광지 유형</option>
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
                            placeholder="검색어" aria-label="검색어" />
                        <button id="btn-search" class="btn btn-info" type="button">
                            검색
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>