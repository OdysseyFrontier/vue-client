<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from "vue-router";
import { listArticle } from "@/api/board.js";
import BoardListItem from '@/components/board/item/BoardListItem.vue'
import VPageNavigation from "@/components/common/VPageNavigation.vue";
import { useSidebarStore } from "@/stores/sidebar.js";

const sidebarStore = useSidebarStore();
sidebarStore.changesSidebarState("board");
sidebarStore.open = false;

const router = useRouter();

const articles = ref([])
const currentPage = ref(1)
const totalPage = ref(0)
const { VITE_ARTICLE_LIST_SIZE } = import.meta.env;
const param = ref({
    type: "",
    pgno: currentPage.value,
    spp: VITE_ARTICLE_LIST_SIZE,
    key: "subject",
    word: "",
});


// 검색 조건 세팅
const tgtTypeCd = ref("subject")
const searchKey = ref(true)
const searchKey2 = ref(false)
// const keyword = ref("")
// const select2 = ref("")

function funChgTgtTypeCd(){
	if(tgtTypeCd.value =="type"){ //구분
        param.value.word = ""
        param.value.key = ""
        searchKey.value = false;
        searchKey2.value = true;

        param.value.key = tgtTypeCd.value;
	}else{
        param.value.word = ""
        param.value.key = tgtTypeCd.value
        searchKey.value = true;
        searchKey2.value = false;

        param.value.key = tgtTypeCd.value;
	}
}
//----------------------------------------------------------------


onMounted(() => {
  getArticleList();
});



const getArticleList = () => {
  console.log("서버에서 글목록 얻어오자!!!", param.value);
  listArticle(
    param.value,
    ({ data }) => {
      articles.value = data.articles;
      currentPage.value = data.currentPage;
      totalPage.value = data.totalPageCount;
    },
    (error) => {
      console.log(error);
    }
  );
};

const onPageChange = (val) => {
  console.log(val + "번 페이지로 이동 준비 끝!!!");
  currentPage.value = val;
  param.value.pgno = val;
  getArticleList();
};

const moveWrite = () => {
  router.push({ name: "boardWrite" });
};



// function doBbsFPag(pageIndex) {
// 	var cbIdx = "1135";
// 	document.bbsFVo.pageIndex.value = pageIndex;
// 	document.bbsFVo.action = "/site/portal/ex/bbs/List.do?cbIdx="+cbIdx;
// 	document.bbsFVo.submit();
// 	//location.href = "/site/portal/ex/bbs/List.do?cbIdx="+cbIdx+"&pageIndex="+pageIndex;
// }

</script>



<template>
    <div>
        <!-- <h1>여행 정보 공유 게시판</h1> -->
        <div >
            <input id="pageIndex" name="pageIndex" type="hidden" value="1">
            <input id="bcIdx" name="bcIdx" type="hidden" value="307301">
            <input id="mode" name="mode" type="hidden" value="">

            <!-- 컨텐츠 -->
            <!-- 컨텐츠 -->
            <div id="content" class="contents board board-list">


                <!-- <h2 class="current"><span>공지사항</span></h2>  -->
                <!-- 컨텐츠 내용 -->
                <div class="inner">

                    <div class="table-search-wrap">
                        <p class="page-txt"><span class="ft-blue">총 {{ articles.length }}건</span><span class="ml10 ft-gray">{{ currentPage }} /
                                {{ totalPage }}페이지</span></p>
                        <div class="table-search">
                            <select id="tgtTypeCd" name="tgtTypeCd" title="검색어 분류 선택" @change="funChgTgtTypeCd()" v-model="tgtTypeCd"
                                class="select-type2">
                                <option value="subject">제목</option>
                                <option value="content">내용</option>
                                <option value="type">구분</option>
                            </select>
                            <div class="input-wrap">
                                <select v-show="searchKey2" id="searchKey2" name="searchKey2" class="select-type2" title="구분 선택"
                                    style="display: none;" v-model="param.word">
                                    <option value="" selected="">전체</option>
                                    <option value="notice">공지사항</option>
                                    <!-- <option value="nd02">이벤트</option> -->
                                    <option value="community">커뮤니티</option>
                                    <!-- <option value="nd05">교육</option> -->
                                    <!-- <option value="nd04">기타</option> -->
                                </select>
                                <input v-show="searchKey" type="text" class="search-input" name="searchKey" id="searchKey"  v-model="param.word"
                                    title="검색어입력">

                                <button type="button" class="btn-search" @click="getArticleList">검색</button>
                            </div>
                        </div>
                    </div>

                    <!-- 				<div class="clearfix mt55"> -->

                    <!-- 				</div> -->
                    <div role="scrollbar" aria-controls="undefined"></div>
                    <div role="scrollbar" aria-controls="undefined"></div>
                    <div class="table-wrap table-scroll" tabindex="0" aria-labelledby="tableLabel">
                        <table class="table-type1 table-1 mt30">
                            <caption>공지사항 목록 | 번호, 구분, 제목, 첨부파일, 등록일자로 구성</caption>

                            <colgroup>
                                <col style="width:8%">
                                <col style="width:20%">
                                <col>
                                <col style="width:10%">
                                <col style="width:13%">
                            </colgroup>
                            <thead>
                                <!-- 							<tr> -->



                                <!-- 							</tr> -->
                                <tr class="text-center">
                                    <th>번호</th>
                                    <th>구분</th>
                                    <th>제목</th>
                                    <th>작성자</th>
                                    <th>등록일자</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="articles.length === 0">
                                    <td></td>
                                    <td></td>
                                    <td class="title lock_wrap">
                                        <span>게시글이 없습니다.</span>
                                    </td>
                                    <td></td>
                                    <td></td>
                                </template>
                                <BoardListItem
                                    v-for="article in articles"
                                    :key="article.articleNo"
                                    :article="article"
                                ></BoardListItem>

                                <!-- <tr>
                                    <td>95</td>
                                    <td>
                                        <span class="table-division table-division3">행사</span>
                                    </td>
                                    <td class="title lock_wrap subject">
                                        <a href="/site/portal/ex/bbs/View.do?cbIdx=1135&amp;bcIdx=307301&amp;pageIndex=1&amp;tgtTypeCd=&amp;searchKey=&amp;searchKey2="
                                            class="btn_bbsDetail">
                                            [지자체, RTO, DMO 대상] '2024년 한국관광 데이터 얼라이언스' 2분기 세미나 개최
                                        </a>
                                    </td>
                                    <td>
                                    </td>
                                    <td>2024.05.02</td>
                                </tr>

                                <tr>
                                    <td>94</td>
                                    <td>
                                        <span class="table-division table-division2">서비스운영</span>
                                    </td>
                                    <td class="title lock_wrap subject">
                                        <a href="/site/portal/ex/bbs/View.do?cbIdx=1135&amp;bcIdx=307188&amp;pageIndex=1&amp;tgtTypeCd=&amp;searchKey=&amp;searchKey2="
                                            class="btn_bbsDetail">
                                            한국관광 데이터랩 휴면회원제 폐지 안내
                                        </a>
                                    </td>
                                    <td>
                                    </td>
                                    <td>2024.04.18</td>
                                </tr>

                                <tr>
                                    <td>93</td>
                                    <td>
                                        <span class="table-division table-division3">행사</span>
                                    </td>
                                    <td class="title lock_wrap subject">
                                        <a href="/site/portal/ex/bbs/View.do?cbIdx=1135&amp;bcIdx=307179&amp;pageIndex=1&amp;tgtTypeCd=&amp;searchKey=&amp;searchKey2="
                                            class="btn_bbsDetail">
                                            「2024 빅데이터와 함께하는 똑똑한 컨설팅」 사업설명회 개최 안내
                                        </a>
                                    </td>
                                    <td>
                                        <a href=""><img src="https://datalab.visitkorea.or.kr/images/portal/icon/icon_jpg.png" alt="jpg파일"></a>
                                    </td>
                                    <td>2024.04.16</td>
                                </tr>

                                <tr>
                                    <td>92</td>
                                    <td>
                                        <span class="table-division table-division2">서비스운영</span>
                                    </td>
                                    <td class="title lock_wrap subject">
                                        <a href="/site/portal/ex/bbs/View.do?cbIdx=1135&amp;bcIdx=307044&amp;pageIndex=1&amp;tgtTypeCd=&amp;searchKey=&amp;searchKey2="
                                            class="btn_bbsDetail">
                                            숙박/체류시간 서비스 오픈 일자 변경 안내
                                        </a>
                                    </td>
                                    <td>
                                    </td>
                                    <td>2024.03.25</td>
                                </tr>

                                <tr>
                                    <td>91</td>
                                    <td>
                                        <span class="table-division table-division2">서비스운영</span>
                                    </td>
                                    <td class="title lock_wrap subject">
                                        <a href="/site/portal/ex/bbs/View.do?cbIdx=1135&amp;bcIdx=307026&amp;pageIndex=1&amp;tgtTypeCd=&amp;searchKey=&amp;searchKey2="
                                            class="btn_bbsDetail">
                                            신규메뉴 추가 및 개선 안내
                                        </a>
                                    </td>
                                    <td>
                                    </td>
                                    <td>2024.03.21</td>
                                </tr>

                                <tr>
                                    <td>90</td>
                                    <td>
                                        <span class="table-division table-division2">서비스운영</span>
                                    </td>
                                    <td class="title lock_wrap subject">
                                        <a href="/site/portal/ex/bbs/View.do?cbIdx=1135&amp;bcIdx=306934&amp;pageIndex=1&amp;tgtTypeCd=&amp;searchKey=&amp;searchKey2="
                                            class="btn_bbsDetail">
                                            부천시 행정구역 변경에 따른 서비스 변경 안내
                                        </a>
                                    </td>
                                    <td>
                                    </td>
                                    <td>2024.03.07</td>
                                </tr>

                                <tr>
                                    <td>89</td>
                                    <td>
                                        <span class="table-division table-division2">서비스운영</span>
                                    </td>
                                    <td class="title lock_wrap subject">
                                        <a href="/site/portal/ex/bbs/View.do?cbIdx=1135&amp;bcIdx=306873&amp;pageIndex=1&amp;tgtTypeCd=&amp;searchKey=&amp;searchKey2="
                                            class="btn_bbsDetail">
                                            신한카드 지출액 데이터 변경 안내
                                        </a>
                                    </td>
                                    <td>
                                    </td>
                                    <td>2024.02.27</td>
                                </tr>

                                <tr>
                                    <td>88</td>
                                    <td>
                                        <span class="table-division table-division2">서비스운영</span>
                                    </td>
                                    <td class="title lock_wrap subject">
                                        <a href="/site/portal/ex/bbs/View.do?cbIdx=1135&amp;bcIdx=306818&amp;pageIndex=1&amp;tgtTypeCd=&amp;searchKey=&amp;searchKey2="
                                            class="btn_bbsDetail">
                                            행사/축제 DIY 맞춤 분석 메뉴 신규 오픈 안내
                                        </a>
                                    </td>
                                    <td>
                                    </td>
                                    <td>2024.02.19</td>
                                </tr>

                                <tr>
                                    <td>87</td>
                                    <td>
                                        <span class="table-division table-division2">서비스운영</span>
                                    </td>
                                    <td class="title lock_wrap subject">
                                        <a href="/site/portal/ex/bbs/View.do?cbIdx=1135&amp;bcIdx=306748&amp;pageIndex=1&amp;tgtTypeCd=&amp;searchKey=&amp;searchKey2="
                                            class="btn_bbsDetail">
                                            KT 데이터 (일자별 데이터, 숙박/체류기간) 변경 안내
                                        </a>
                                    </td>
                                    <td>
                                    </td>
                                    <td>2024.02.05</td>
                                </tr>

                                <tr>
                                    <td>86</td>
                                    <td>
                                        <span class="table-division table-division1">이벤트</span>
                                    </td>
                                    <td class="title lock_wrap subject">
                                        <a href="/site/portal/ex/bbs/View.do?cbIdx=1135&amp;bcIdx=306732&amp;pageIndex=1&amp;tgtTypeCd=&amp;searchKey=&amp;searchKey2="
                                            class="btn_bbsDetail">
                                            한국관광 데이터랩 '2023 외래객 수 맞추기 이벤트' 당첨자 발표
                                        </a>
                                    </td>
                                    <td>
                                    </td>
                                    <td>2024.02.02</td>
                                </tr> -->

                            </tbody>
                        </table>
                    </div>
                    <!-- <div class="paging mt55">
                        <a href="#" class="on" title="선택됨">1</a>
                        <a href="?pageIndex=2" @click.prevent="doBbsFPag(2);">2</a>
                        <a href="?pageIndex=3" @click="doBbsFPag(3);">3</a>
                        <a href="?pageIndex=4" @click="doBbsFPag(4);">4</a>
                        <a href="?pageIndex=5" @click="doBbsFPag(5);">5</a>
                        <a href="?pageIndex=6" @click="doBbsFPag(6);">6</a>
                        <a href="?pageIndex=7" @click="doBbsFPag(7);">7</a>
                        <a href="?pageIndex=8" @click="doBbsFPag(8);">8</a>
                        <a href="?pageIndex=9" @click="doBbsFPag(9);">9</a>
                        <a href="?pageIndex=10" @click="doBbsFPag(10);">10</a>
                    </div> -->

                    <VPageNavigation class="mt30"
                        :current-page="currentPage"
                        :total-page="totalPage"
                        @pageChange="onPageChange"
                    ></VPageNavigation>

                    <div class="clearfix mb30">
                        <button class="table-btn btn-write" @click.prevent="moveWrite">글쓰기</button>
                    </div>
                    <!-- 컨텐츠 내용 -->
                </div>
            </div><!-- 컨텐츠 -->
        </div>
    </div>
</template>

<style scoped>
    @charset "utf-8";
/* font */
/* @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400&display=swap'); */
/* font-family: 'Noto Sans', sans-serif; */
/* @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap'); */
/* font-family: 'Noto Sans KR', sans-serif; */

/* noto-sans-kr-100 - latin_korean */
@font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 100;
    src: url('./fonts/noto-sans-kr-v12-latin_korean-100.eot'); /* IE9 Compat Modes */
    src: local('Noto Sans KR Thin'), local('NotoSansKR-Thin'),
         url('./fonts/noto-sans-kr-v12-latin_korean-100.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('./fonts/noto-sans-kr-v12-latin_korean-100.woff2') format('woff2'), /* Super Modern Browsers */
         url('./fonts/noto-sans-kr-v12-latin_korean-100.woff') format('woff'), /* Modern Browsers */
         url('./fonts/noto-sans-kr-v12-latin_korean-100.ttf') format('truetype'), /* Safari, Android, iOS */
         url('./fonts/noto-sans-kr-v12-latin_korean-100.svg#NotoSansKR') format('svg'); /* Legacy iOS */
  }
  /* noto-sans-kr-300 - latin_korean */
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 300;
    src: url('./fonts/noto-sans-kr-v12-latin_korean-300.eot'); /* IE9 Compat Modes */
    src: local('Noto Sans KR Light'), local('NotoSansKR-Light'),
         url('./fonts/noto-sans-kr-v12-latin_korean-300.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('./fonts/noto-sans-kr-v12-latin_korean-300.woff2') format('woff2'), /* Super Modern Browsers */
         url('./fonts/noto-sans-kr-v12-latin_korean-300.woff') format('woff'), /* Modern Browsers */
         url('./fonts/noto-sans-kr-v12-latin_korean-300.ttf') format('truetype'), /* Safari, Android, iOS */
         url('./fonts/noto-sans-kr-v12-latin_korean-300.svg#NotoSansKR') format('svg'); /* Legacy iOS */
  }
  /* noto-sans-kr-regular - latin_korean */
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    src: url('./fonts/noto-sans-kr-v12-latin_korean-regular.eot'); /* IE9 Compat Modes */
    src: local('Noto Sans KR Regular'), local('NotoSansKR-Regular'),
         url('./fonts/noto-sans-kr-v12-latin_korean-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('./fonts/noto-sans-kr-v12-latin_korean-regular.woff2') format('woff2'), /* Super Modern Browsers */
         url('./fonts/noto-sans-kr-v12-latin_korean-regular.woff') format('woff'), /* Modern Browsers */
         url('./fonts/noto-sans-kr-v12-latin_korean-regular.ttf') format('truetype'), /* Safari, Android, iOS */
         url('./fonts/noto-sans-kr-v12-latin_korean-regular.svg#NotoSansKR') format('svg'); /* Legacy iOS */
  }
  /* noto-sans-kr-500 - latin_korean */
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    src: url('./fonts/noto-sans-kr-v12-latin_korean-500.eot'); /* IE9 Compat Modes */
    src: local('Noto Sans KR Medium'), local('NotoSansKR-Medium'),
         url('./fonts/noto-sans-kr-v12-latin_korean-500.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('./fonts/noto-sans-kr-v12-latin_korean-500.woff2') format('woff2'), /* Super Modern Browsers */
         url('./fonts/noto-sans-kr-v12-latin_korean-500.woff') format('woff'), /* Modern Browsers */
         url('./fonts/noto-sans-kr-v12-latin_korean-500.ttf') format('truetype'), /* Safari, Android, iOS */
         url('./fonts/noto-sans-kr-v12-latin_korean-500.svg#NotoSansKR') format('svg'); /* Legacy iOS */
  }
  /* noto-sans-kr-700 - latin_korean */
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    src: url('./fonts/noto-sans-kr-v12-latin_korean-700.eot'); /* IE9 Compat Modes */
    src: local('Noto Sans KR Bold'), local('NotoSansKR-Bold'),
         url('./fonts/noto-sans-kr-v12-latin_korean-700.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('./fonts/noto-sans-kr-v12-latin_korean-700.woff2') format('woff2'), /* Super Modern Browsers */
         url('./fonts/noto-sans-kr-v12-latin_korean-700.woff') format('woff'), /* Modern Browsers */
         url('./fonts/noto-sans-kr-v12-latin_korean-700.ttf') format('truetype'), /* Safari, Android, iOS */
         url('./fonts/noto-sans-kr-v12-latin_korean-700.svg#NotoSansKR') format('svg'); /* Legacy iOS */
  }
  /* noto-sans-kr-900 - latin_korean */
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 900;
    src: url('./fonts/noto-sans-kr-v12-latin_korean-900.eot'); /* IE9 Compat Modes */
    src: local('Noto Sans KR Black'), local('NotoSansKR-Black'),
         url('./fonts/noto-sans-kr-v12-latin_korean-900.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('./fonts/noto-sans-kr-v12-latin_korean-900.woff2') format('woff2'), /* Super Modern Browsers */
         url('./fonts/noto-sans-kr-v12-latin_korean-900.woff') format('woff'), /* Modern Browsers */
         url('./fonts/noto-sans-kr-v12-latin_korean-900.ttf') format('truetype'), /* Safari, Android, iOS */
         url('./fonts/noto-sans-kr-v12-latin_korean-900.svg#NotoSansKR') format('svg'); /* Legacy iOS */
  }




.pc{display: block !important;}
.mobile{display: none !important;}
.btn-pc{display: inline-block !important;}
.btn-mobile{display: none !important;}

/* layout */
#wrap.admin-login{box-sizing:border-box; border-width:3px; border-style:solid;}
#wrap.admin-login.admin1{border-color: red;}
#wrap.admin-login.admin2{border-color: #f4bb79;}
/* #wrap.admin-login{position:relative;}
#wrap.admin-login:before{content:'';position:absolute; top:0; left:0; right:0; bottom:0;box-sizing:border-box; border-width:3px; border-style:solid; z-index:99999;}
#wrap.admin-login.admin1:before{border-color: red;}
#wrap.admin-login.admin2:before{border-color: #f4bb79;}
 */




.table-wrap.table-scroll {overflow: auto;}
/* .table-wrap.table-scroll:focus{outline: 2px dashed #222;outline-offset: -3px;} */
.table-wrap.table-scroll::-webkit-scrollbar{width:10px; height:10px; border-radius:1.5rem; background-color: #b5dbea; background-color: rgba(181, 219, 234, 0.5);}
.table-wrap.table-scroll::-webkit-scrollbar-thumb{border-radius:1.5rem; background-color:#1E96C4;}
.table-wrap.table-scroll::-webkit-scrollbar-thumb-track{border-radius:1.5rem; background-color: #b5dbea; background-color: rgba(181, 219, 234, 0.5);}



.table-wrap table{width:100%; border-top: 2px solid #1e96c4;}
.table-wrap table .subject {width:100%; text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
.table-wrap table tr.fixed {border-bottom: 1px dashed #1e96c4;}
.table-wrap table td.bg-gray {background-color:#f5f5f5;}



.table-wrap > .title {display: inline-block; margin-bottom: 10px; font-size: 18px; font-weight: 500;}
td {padding:10px;/* padding:15px 0;*/  text-align: center; vertical-align: middle;}
thead { border-bottom: 1px solid #d3d3d3;}
thead th {padding: 10px 0; font-size: 16px; font-weight: 500; vertical-align: middle; border-top: 1px solid #e4e4e4; background-color: #f7f7f7;}
tbody tr {border-bottom: 1px solid #e4e4e4;}
tbody th{padding:15px 10px; font-weight:500; vertical-align: middle;}
tbody td a {font-size: 17px; word-break: keep-all;} 
tbody td a:hover {text-decoration: underline;} 
tbody td.subject {padding-left:10px; text-align: left;}
td{vertical-align: middle;}




.table-wrap .table-hover tbody tr th,
.table-wrap .table-hover tbody tr td{transition: all 0.5s;}
.table-wrap .table-hover tbody tr:hover th,
.table-wrap .table-hover tbody tr:hover td{background-color:#b3d4fc !important; cursor:pointer;}

  
/* tablet */
@media screen and (max-width:1023px) {     
    .table-division {display: inline-block; padding: 0 0.7rem; width: auto; border-radius: 0.3rem;}

    /* table */
    .table-type1 td{padding: 0.8rem 0.6rem; font-size: 0.9rem;}
    .table-type1 thead th {padding: 0.8rem 0; font-size: 0.9rem;}
    .table-type1 tbody td a {font-size: 0.9rem; line-height: 1.5;}
    
    .table-type1 tbody td.subject {padding-left: 0.5rem;}

    .table-wrap > .title {margin-bottom: 0.5rem; font-size: 1rem;}
    .table-wrap {overflow-y: auto;}
    .table-wrap table {height: calc( (var(--vh) * 50));}

    .board table td {padding: 0.8rem;}

}

/* mobile */

@media screen and (max-width:720px) {
	.table-wrap.table-scroll::-webkit-scrollbar{width:3px; height:3px; border-radius:1.5rem; background-color:#ebebeb;}
	.table-wrap.table-scroll::-webkit-scrollbar-thumb{border-radius:1.5rem; background-color:#999;}
	.table-wrap.table-scroll::-webkit-scrollbar-thumb-track{border-radius:1.5rem; background-color:#ebebeb;}
	.table-wrap.table-scroll table {min-width: 600px;}
}


/* ************** font ************** */
@font-face {
  font-family: 'NanumSquare';
  font-style: normal;
  font-weight: 400;
  src: url(./font/NanumSquareR.eot);
  src: url(./font/NanumSquareR.eot?#iefix) format('embedded-opentype'),
       url(./font/NanumSquareR.woff2) format('woff2'),
       url(./font/NanumSquareR.woff) format('woff'),
       url(./font/NanumSquareR.ttf) format('truetype');
}
@font-face {
  font-family: 'NanumSquare';
  font-style: normal;
  font-weight: 700;
  src: url(./font/NanumSquareB.eot);
  src: url(./font/NanumSquareB.eot?#iefix) format('embedded-opentype'),
	   url(./font/NanumSquareB.woff2) format('woff2'),
       url(./font/NanumSquareB.woff) format('woff'),
       url(./font/NanumSquareB.ttf) format('truetype');
}
@font-face {
  font-family: 'NanumSquare';
  font-style: normal;
  font-weight: 800;
  src: url(./font/NanumSquareEB.eot);
  src: url(./font/NanumSquareEB.eot?#iefix) format('embedded-opentype'),
	   url(./font/NanumSquareEB.woff2) format('woff2'),
       url(./font/NanumSquareEB.woff) format('woff'),
       url(./font/NanumSquareEB.ttf) format('truetype');
}
@font-face{
  font-family: 'Nanum Gothic';
  font-style: normal;
  font-weight: 400;
  src: url(./font/NanumGothic-Regular.eot);
  src: url(./font/NanumGothic-Regular.eot?#iefix) format('embedded-opentype'),
       url(./font/NanumGothic-Regular.woff2) format('woff2'),
       url(./font/NanumGothic-Regular.woff) format('woff'),
	   url(./font/NanumGothic-Regular.ttf) format('truetype');
}
@font-face{
  font-family: 'Nanum Gothic';
  font-style: normal;
  font-weight: 700;
  src: url(./font/NanumGothic-Bold.eot);
  src: url(./font/NanumGothic-Bold.eot?#iefix) format('embedded-opentype'),
       url(./font/NanumGothic-Bold.woff2) format('woff2'),
       url(./font/NanumGothic-Bold.woff) format('woff'),
	   url(./font/NanumGothic-Bold.ttf) format('truetype');
}

/* http://meyerweb.com/eric/tools/css/portal/reset/
   v2.0 | 20110126
   License: none (pftextareaublic domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video,
button, textarea, input, select {
	margin: 0;
	padding: 0;
	border: 0;
	/* font-size: 100%; */
	font-size: 16px;
	/* font: inherit; */
	vertical-align: baseline;
	/* color: #464646; */
	font-family: 'Noto Sans KR', sans-serif;
}
/* HTML5 display-role reset for older browsers */
html, template{
	/* height: 100%; */
	overflow: auto;
}
template {
    width:100%;
    /* height:100%; */
	line-height: 1.5;
	letter-spacing: -1px;
}
ol, ul {
	list-style: none;
    vertical-align:top;
    padding:0;
    margin:0;
}
li { vertical-align:top; list-style: none;}
li img	{ vertical-align:top;}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
img { border:0; vertical-align:top;}
/* table	caption { display:none; } */
table caption { /*position:absolute;*/ font-size:0; width:0; height:0; line-height:0; }
input, button, select{ vertical-align:middle; }
input, button, select{border: 1px solid #dcdcdc;}
button, input[type="button"] {cursor: pointer;}
a{padding:0; margin:0; text-decoration:none; color:#464646;}
/* a:link, a:visited { color:#666; text-decoration:none;} */
a:hover, a:active { color:#444;  text-decoration:none; }
textarea { resize: vertical; }
select{
	padding:0 30px 0 10px;	
	background-image: url('/src/assets/arrow_open.png');
	background-repeat: no-repeat;
	/* background-position: 90% 50%; */
	background-position: 96% 50%;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	font-family: 'Noto Sans KR', sans-serif;
}
select::-ms-expand{display: none;}
::-moz-selection { background: #b3d4fc; text-shadow: none; }
::selection { background: #b3d4fc; text-shadow: none; }

/* select:focus-visible,
a:focus-visible,
input:focus-visible,
button:focus-visible{outline:2px dashed #222;box-sizing:border-box;outline-offset:-2px;} */

[role=button]{
	cursor:pointer;
}

/*basic*/
.clear {clear:both;}
.clearfix:after{display: block; content: ''; clear: both;}



/* font color */
/* .color-red{ color: #e20312;}
.color-gray{ color: #7f7f7f;} */
.ft-red{ color: #e20312;}
.ft-gray{ color: #626262;}
.ft-oran {color: #c93614;}
.ft-oran2 {color: #e15610;}
.ft-blue {color: #007bab;}
.ft-blue2 {color: #0000ff;}
.ft-yellow {color: #fff67b;}


/* margin */
.ml10{margin-left:10px !important;}
.mt30{margin-top:30px !important;}
.mt55{margin-top:55px !important;}
.mb55{margin-bottom:55px !important;}
.mb30{margin-bottom:30px !important;}




/* mobile */
@media screen and (max-width:1023px) {
	div, span, h1, h2, h3, h4, h5, h6, p,
	a, img, s, b, u, i, ol, ul, li,
	form, table, caption, tbody, thead, tr, th, td,
	button, input, select {
		font-size:24px;
	}

	select {padding: 0 2rem 0 0.8rem;}

	.ml10 {margin-left: 0.7rem !important;}
	.mt30 {margin-top: 1.5rem !important;}
	.mt55 {margin-top: 2.5rem !important;}

}
@media screen and (max-width:720px) {
	div, span, h1, h2, h3, h4, h5, h6, p, a,
	img, s, b, u, i, ol, ul, li,
	form, table, caption, tbody, tfoot, thead, tr, th, td,
	button, input, select {
		font-size:18px;
	}
}

@media screen and (max-width:580px) {
	div, span, h1, h2, h3, h4, h5, h6, p, a,
	img, s, b, u, i, ol, ul, li, form,
	table, caption, tbody, tfoot, thead, tr, th, td,
	button, input, select {
		font-size:16px;
	}
}


.contents{min-height:450px;}
.contents > .inner,
.contents > article > .inner {
    margin: 55px auto 0;
    width: 1260px;
}



/* location */
.location {box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);}
.location ul {margin: 0 auto; width: 1260px; line-height: 55px; font-size: 0;}
.location li {display:inline-block;vertical-align:bottom;}
.location li:after {content: '>'; margin:0 3px;}
.location .home:after, 
.location li:last-child:after {content: '';margin:0;}
.location li a:hover{text-decoration: underline;}
.location li h2,
.location li h3{display:inline-block;font-weight:normal;}
.location li:last-child h2,
.location li:last-child h3{font-weight:500;}
.location .home{margin-right:10px;}
.location .home a {
    display: inline-block;
    margin-top: -3px;
    width: 14px;
    height: 12px;
    font-size: 0;
    vertical-align: middle;
    background: url('/images/portal/icon/icon_home.png') no-repeat;
}



@keyframes fade {
    from {
      opacity: 0;
    }
  
    to {
      opacity: 1;
    }
}



/* select */
.select-type1{
    display: inline-block;
    padding:0 30px 0 10px;
    height: 30px;
    line-height: 27px;
    font-size: 16px;
    border: 1px solid #E6E6E6;
    border-radius: 5px;
    background-color:#fff;
    vertical-align: middle;
    box-sizing:border-box;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
}
.select-type2{
    display: inline-block;
    padding:0 30px 0 10px;
    height: 30px;
    line-height: 27px;
    font-size: 16px;
    border: 1px solid #E6E6E6;
    border-radius: 5px;
    background-color:#fff;
    vertical-align: middle;
    box-sizing:border-box;
    box-shadow: none;
}

/* input */
.input-wrap input,.input-wrap button {margin-right: 5px;}
.input-wrap li {display: inline-block; margin-left: 10px; vertical-align: top;}
.input-wrap li:first-child {margin-left: 0;}



.contents > .inner > .tab-wrap{margin-top:75px;}


@keyframes spin{
	0%{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg);}
	100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg);}
}


.hover {display: block !important;}




.guide-box + .table-search-wrap {margin-top:55px;}
.table-search-wrap:after {content:''; display:block; clear:both;}
.table-search-wrap .page-txt{float:left;}
.table-search-wrap .table-search{float:right;}
.table-search .search-input{padding: 0 5px;margin-right:0;width:80%;width: calc(100% - 60px);height: 30px;box-sizing:border-box;border: 1px solid #E6E6E6; border-radius:5px;}
/* .table-search .search-input:focus {border: 2px dashed #222;} */
.table-search .input-wrap {
    display: inline-block;
    margin-left: 5px;
    width: 300px;
    height:30px;
    vertical-align: top;
    font-size: 0;
    /* border-radius: 5px; */
    /* border: 1px solid #E6E6E6; */
    /* overflow: hidden; */
}
.table-search .btn-search{float:right; margin-right:0;width:55px;height:30px;/* font-size:0;border:0 none;background: url('/images/portal/button/btn_search.png') no-repeat #fff center center; */ font-size:17px; background-color:#fff; box-sizing: border-box; cursor:pointer; transition: all 0.5s;}


.board .table-search select,
.board .table-search .input-wrap,
.board .table-search .search-input,
.board .table-search .btn-search {height: 35px;}
.table-search .btn-search {
    border-radius: 0.3rem;
    font-size: 0.9rem;
    font-weight: normal;
    padding: 0;
    text-align: center;
}

.board table td {font-size: 16px; /*padding: 20px;*/}
.board table td .lock:before{content: url(/images/portal/icon/icon_rock.png); margin-right: 10px;}
.board table .table-division {
    display: inline-block;
    padding: 5px 15px;
    min-width: 140px;
    width: auto;
    box-sizing: border-box;
    text-align: center;
}
.board .table-type1 thead th {font-size: 16px; /*padding: 20px;*/background-color: #f7f7f7;}

.board-list table{table-layout: fixed;}
 


/* //수정중 */

.notice table .table-division {padding: 0 10px;}
.paging {
    text-align: center;
}
.paging a {
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    width: 30px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #cccccc;
}
.paging a.on {
    background-color: #1e96c4;
    color: #fff;
}
.paging a.table-back {
    background: url(/images/portal/button/table-back.png) no-repeat center center;
    font-size:0;
}
.paging a.table-prev {
    background: url(/images/portal/button/table-prev.png) no-repeat center center;
    font-size:0;
}
.paging a.table-forward {
    background: url(/images/portal/button/table-forward.png) no-repeat center center;
    font-size:0;
}
.paging a.table-next {
    background: url(/images/portal/button/table-next.png) no-repeat center center;
    font-size:0;
}
.board .table-wrap .noti {
    background-color: #676767;
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
}
.board .table-wrap .board-file {
    border-top: 1px solid #d1d1d1;;
}
.board .table-wrap .board-file .inner {padding: 15px 25px; display:flex;flex-direction:row;}
.board .table-wrap .board-file .title {display:inline-block; margin-top:5px; width:60px;color: #7f7f7f; letter-spacing: 0px; vertical-align:top; font-weight: 400;}
.board .table-wrap .board-file .file-list{display:inline-block; width:calc(100% - 60px); vertical-align:top; }
.board .table-wrap .board-file .file-list li {display: inline-block; margin: 5px 0; word-break: break-all; vertical-align: top;}
.board .table-wrap .board-file .file-icon {padding: 0px 0px 5px 30px ; margin-left: 30px; background-repeat:no-repeat;}
.board .table-wrap .board-file .file-icon:hover {text-decoration: underline;}
.file-icon.pdf {background-image: url(/images/portal/icon/icon_pdf.png);}
.file-icon.csv {background-image: url(/images/portal/icon/icon_csv.png);}
.file-icon.etc {background-image: url(/images/portal/icon/icon_etc.png);}
.file-icon.hwp {background-image: url(/images/portal/icon/icon_hwp.png);}
.file-icon.jpg {background-image: url(https://datalab.visitkorea.or.kr/images/portal/icon/icon_jpg.png);}
.file-icon.png {background-image: url(/images/portal/icon/icon_png.png);}
.file-icon.ppt {background-image: url(/images/portal/icon/icon_ppt.png);}
.file-icon.txt {background-image: url(/images/portal/icon/icon_txt.png);}
.file-icon.word {background-image: url(/images/portal/icon/icon_word.png);}
.file-icon.xlsx {background-image: url(/images/portal/icon/icon_xlsx.png);}

	

.board .table-wrap h4 {color:#1E96C4; font-size: 20px; font-weight: 500; margin:0px 0 20px 0;}




@keyframes circle-explosion {
    0% {
        opacity: 1;
        stroke-width: 40;
        transform: scale(0)
    }
    100%{
        opacity: 1;
        stroke-width: 2;
        transform: scale(1)
    }
}

@keyframes path-explosion {
    0%,12%{
        opacity: 0;
    }
    12.5%{
        stroke-dasharray: 15, 40;
        stroke-dashoffset: -40;
        opacity: 1;
        stroke-width: 3;
        transform: rotate(0)
    }
    50%,100% {
        stroke-dasharray: 1, 40;
        stroke-dashoffset: 2;
        stroke-width: 0;
        transform: rotate(0);
    }
}

@keyframes check {
    0%,12%{
        opacity: 0;
    }
    12.5%{
        stroke-dasharray: 40, 40;
        stroke-dashoffset: 40;
        opacity: 1;
    }
    50%,100% {
        stroke-dasharray: 40, 40;
        stroke-dashoffset: 0;
        opacity: 1;
    }
}


/* member */
.location-none h3 {margin-bottom: 50px; text-align: center; font-size: 25px; font-weight: 400;}

/* tourism statistice */
.location-none{}







@media screen and (max-width:1300px) {
    .contents > .inner, 
    .contents > article > .inner{width:95%;}
    
    .location ul{width:95%;}
}




@media screen and (max-width:1023px) {
    /* .contents{padding-top:65px;} */
    #location_nav{padding-top:65px;}
    .contents.event-con{padding-top:65px;}
    .contents > .inner, 
    .contents > article > .inner {margin-top: 2.5rem;}
   
	
    /* location */
    .location ul {width: 90%; line-height: 2.5rem;}
    .location li {font-size: 0.9rem;}
    .location li:after {margin: 0.3rem;}
    .location li a {font-size: 0.9rem;}
    .location .home {margin-right: 0.8rem;}

    .select-type2 {padding: 0 1.2rem 0 0.7rem; height: 1.7rem; vertical-align: top; font-size: 1rem; line-height: 1rem; border-radius: 0.3rem;}

  

    /* board */
    .table-search .input-wrap {margin-left: 0.2rem; width: 14rem; height: 1.7rem; line-height: 1.7rem;}
	.table-search .search-input {width: calc( 100% - 3.5rem); height: 1.7rem;}
	.table-search .btn-search {width: 3rem; font-size: 1rem;  }
	
    .board .table-search select, 
    .board .table-search .input-wrap, 
    .board .table-search .search-input, 
    .board .table-search .btn-search {height: 1.7rem;}

	.board .table-type1 thead th{padding: 0.8rem; font-size: 1rem;}
	
    /* .table-search-wrap{width:auto; hegiht:2rem;} */
    /* .table-search {margin-left: 0.3rem; width: 12rem; height: 1.7rem;border-radius: 0.3rem;   } */
    /* .table-search .input-wrap {padding: 0 0.3rem; width: calc(100% - 1.7rem);}
    .table-search .btn-search {padding:0 0.5rem;width: 1.7rem; height: 100%; font-size:1rem; background-size: 40%;} */
    .guide-box + .table-search-wrap{margin-top:2.5rem;}

    .board table td{font-size: 0.9rem;}
    .board table .table-division {padding: 0.2rem 0.5rem; width: 6rem;}

    .board .table-wrap {overflow-x: auto;}
    .board .table-wrap h4 {margin: 0 0 0.5rem 0; font-size: 1.1rem;}
    .board .table-wrap .noti {padding: 0.2rem 0.4rem;}
    .board .table-wrap .board-file li {padding: 0.8rem 1rem;}
    .board .table-wrap .board-file .inner {padding: 0.8rem 1rem;}
	.board .table-wrap .board-file .title {margin-top: 0; width: 5rem;}
	.board .table-wrap .board-file .file-list {width: calc(100% - 5rem);}
	.board .table-wrap .board-file .file-icon {margin-left: 1.2rem; padding: 0 0 0.3rem 1.3rem; background-position: left center;}
   
    
    .board .select-type2{height:1.7rem; line-height:1.7rem;}

    .board-list .table-wrap table {width:1260px;}
    .board-list .select-type{height:35px;}  
	

    .paging a {width: 1.5rem; height: 1.5rem; font-size: 0.9rem; line-height: 1.5rem;}

    
    /* input */
    .input-wrap input, .input-wrap button {margin-right: 0.3rem;}

    /* select */
    .select-type1 {padding: 0 1.2rem 0 0.7rem; height: 1.7rem; font-size: 1rem; line-height: 1rem; border-radius: 0.3rem;}
    
}


@media screen and (max-width:720px) {
	.contents > .inner{width: 90%;}
	
	.location li {display: none;}
	.location li:last-child {display: block;}
	.location li:last-child:after{display: none;}
	.location li:last-child:before {content: '>'; margin-right: 3px; font-weight: 500;}
	

    .table-type1 tbody td a{font-size: 16px;}
   
	
}



@media screen and (max-width:480px) {
	/* board */
	.table-search-wrap .table-search {float: none; margin-top: 1.5rem;}
	.table-search-wrap .page-txt {float: none;}
	.table-search .input-wrap {width: 11rem;}
	

}





/* print */
@page{size: A4 landscape;/* margin:0;*/ margin:10mm;page-break-inside:auto; print-color-adjust:exact;page-break-after: auto;}




h1,
h2,
h3,
h4,
h5,
h6 {
    margin: 0;
}

a {
    text-decoration: inherit;
    color: inherit;
}

img {
    max-width: 100%;
    height: auto;
    vertical-align: top;
}


.title {
    flex-grow: 2;
    flex-shrink: 0;
}


/* Mediaquries */

@media (max-width: 840px) {
    .title {
        position: absolute;
        bottom: 15px;
    }

}




.table-btn {
    display: inline-block;
    padding: 10px 20px;
    font-size: 15px;
    color:#fff;
    text-align: center;
    border-radius: 5px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    transition: all 0.5s;
} 
.btn-wrap .table-btn{margin-left:10px; min-width:80px;}
.btn-wrap .table-btn:first-child{margin-left:0;}

.btn-write {background-color:#1e96c4;}
.btn-write:hover {color:#fff; background-color: #137297;}


@media screen and (max-width:1023px) {
	
    .table-btn {padding: 0.5rem 1.5rem; font-size: 1rem; border-radius: 0.3rem;}
    .btn-wrap .table-btn {margin-left: 0.5rem;}

}	

.align-right{text-align:right !important;}
.clearfix:after{display: block; content: ''; clear: both;}
</style>