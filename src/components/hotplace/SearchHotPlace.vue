<script setup>
import { ref, onMounted } from 'vue';
import { useHotPlaceStore } from "@/stores/hotplace";
import { getSidos, getGuguns } from '@/api/attraction';
import { getSearchPlan } from '@/api/plan';


import { listHotPlace } from "@/api/hotplace.js";

const store = useHotPlaceStore();

const sidos = ref([]);
const guguns = ref([]);


const param = ref({
    selectedSidoCode: "0",
    selectedGugunCode: "0",
    selectedContentTypeId: "0",
    keyword: ""
});


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
    if (param.value.selectedSidoCode === "0") {
        guguns.value = [];
        return;
    }
    getGuguns(
        param.value.selectedSidoCode,
        ({ data }) => {
            guguns.value = data;
        },
        (error) => {
            console.log(error);
        }
    );
}




const fetchSearchHotPlace = () => {
    listHotPlace(
        param,
        ({ data }) => {
            store.setSearchHotPlaceList(data);
        },
        (error) => {
            console.log(error);
        }
    )
}



onMounted(() => {
    fetchSidos();
});



// ---------------------------------------
// const param = ref({
//     type: "",
//     key: "subject",
//     word: "",
// });


// 검색 조건 세팅
// const tgtTypeCd = ref("subject")
// const searchKey = ref(true)
// const searchKey2 = ref(false)
// const keyword = ref("")
// const select2 = ref("")

// function funChgTgtTypeCd(){
// 	if(tgtTypeCd.value =="type"){ //구분
//         param.value.word = ""
//         param.value.key = ""
//         searchKey.value = false;
//         searchKey2.value = true;

//         param.value.key = tgtTypeCd.value;
// 	}else{
//         param.value.word = ""
//         param.value.key = tgtTypeCd.value
//         searchKey.value = true;
//         searchKey2.value = false;

//         param.value.key = tgtTypeCd.value;
// 	}
// }
//----------------------------------------------------------------
</script>

<template>
    <div class="container my-4">
        <div class="row justify-content-center gx-3 gy-2">
            <div class="col-lg-auto col-12">
                <select v-model="sortBy" @change="updateSortBy" class="form-select">
                    <option value="createdAt">최신순</option>
                    <option value="likes">좋아요순</option>
                    <option value="views">조회수순</option>
                </select>
            </div>

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