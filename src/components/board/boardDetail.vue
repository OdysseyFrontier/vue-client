<script setup>
    import { ref, onMounted } from "vue";
    import { useRoute, useRouter } from "vue-router";
    import { detailArticle, deleteArticle } from "@/api/board";
    import { useMemberStore } from "@/stores/member"

    const route = useRoute();
    const router = useRouter();
    const memberStore = useMemberStore()

    const { boardno } = route.params;

    const article = ref({});

    onMounted(() => {
        getArticle();
    });

    const getArticle = () => {
        detailArticle(
            boardno,
            ({ data }) => {
            article.value = data;
            },
            (error) => {
            console.error(error);
            }
        );
    };


    function moveList() {
        router.push({ name: "boardList" });
    }

    function moveModify() {
        router.push({ name: "boardModify", params: { boardno } });
    }

    function onDeleteArticle() {
        deleteArticle(
            boardno,
            (response) => {
            if (response.status == 200) moveList();
            },
            (error) => {
            console.error(error);
            }
        );
    }
</script>

<template>
    <div id="wrap">
    <!-- container -->
    <div id="container">

 <!-- 컨텐츠 -->
<div id="content" class="contents board board-view">
    <!-- 컨텐츠 내용 -->
    <div class="inner">
        <div class="table-wrap">
            <h4>내용</h4>
            <table class="table-type2 table-1">
                <caption>고객문의 질문 상세 내용 - 제목 작성자 등록일자, 내용으로 구성</caption>
                <thead>
                    <tr>
                        <th>
                            <div class="clearfix">
                                    <p class="table-division width-auto" :class="article.type">{{article.type === "notice"? "공지사항" : "커뮤니티"}}</p>  
                                    <p class="table-title mb10">{{article.subject}}</p>
                            </div>
                       <span>{{article.name}}</span>
                       <span class="ml10">|</span>
                       <span class="ml10">{{article.registerTime}}</span>  
                       <span class="ml10">|</span>
                       <span class="ml10">{{article.hit}}</span>           
                   </th>
                   <th>
                    <i class="bi bi-heart"></i>
                    <i class="bi bi-heart-fill"></i>
                   </th>
               </tr>
           </thead>
           <tbody>
               <tr>
                   <td colspan="2" class="table-content">
                     <!-- <p>안녕하세요 <br/>이용 가이드북을 pdf로 다운로드 하고자 하나, <br/>이용 가이드북 이용방법 소개글과 다르게 다운로드 받을 수 있는 버튼이 없어 부득이하게 문의글을 올립니다.<br/>(소개글에는 왼쪽 아래 버튼 중 가장 첫번째에 다운로드 버튼이 있으나, 현재 이용 가이드북에는 가장 첫번째에 홈으로 가기가 배치되어있습니다..)<br/>pdf로 다운로드 받을 수 있는 경로를 안내받거나 혹은 첨부파일로 pdf를 제공받고 싶습니다.</p>  -->
                        <p>{{article.content}}</p>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="clearfix btn-wrap align-right mt30" v-if="article.memberId === memberStore.memberInfo.memberId">
            <button class="table-btn btn-write btn_bbsList" @click="moveModify">수정</button>
            <button class="table-btn btn-exit btn_bbsList" @click="onDeleteArticle">삭제</button>
        </div>
        
        <h4 class="mt55">댓글</h4>
        <table class="table-type2">
            <caption>댓글 - 댓글 작성자, 내용으로 구성</caption>
            <thead>
                <tr>
                    <th>
                        <span>댓글 작성자</span>
                        <span class="ml10">|</span>
                        <span class="ml10">2024.04.19 13:44</span>            
                   </th>
               </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="2" class="table-content">
                        
                         <!-- 그 외 -->
<p class="0" style="letter-spacing: 0pt;"><span style="font-family: NanumSquare; font-size: 12pt;">도움이 되셨기를 바라며</span></p>
<p class="0" style="letter-spacing: 0pt;"><span style="font-family: Noto Sans KR; font-size: 12pt;">추가 문의 사항이 있으시면 언제든 문의 남겨주시길 바랍니다</span></p>
<p class="0"><span style="font-family: 굴림; font-size: 12pt;">&nbsp;</span></p>
<p class="0" style="letter-spacing: 0pt;"><span style="font-family: 'Noto Sans KR', sans-serif; font-size: 12pt;">더 좋은 서비스를 제공하는 한국관광 데이터랩이 되도록 노력하겠습니다</span><span lang="EN-US" style="font-family: 굴림; letter-spacing: 0pt; font-size: 12pt;">.</span></p>
<p class="0" style="letter-spacing: 0pt;"><span style="font-family: 굴림; font-size: 12pt;">앞으로도 많은 이용 부탁드립니다</span><span lang="EN-US" style="font-family: 굴림; letter-spacing: 0pt; font-size: 12pt;">.</span></p>
<p class="0"><span style="font-family: 굴림; font-size: 12pt;">&nbsp;</span></p>
<p class="0"><span style="font-family: 굴림; font-size: 12pt;">감사합니다</span><span lang="EN-US" style="font-family: 굴림; letter-spacing: 0pt; font-size: 12pt;">.</span></p>
                        
                    </td>
               </tr>
           </tbody>
        </table>


            <div class="btn-wrap align-center mt30">
                <input  type="text" class="comment-input" name="searchKey" id="searchKey"
                title="검색어입력" placeholder="댓글달기">
                <button class="table-btn btn-write btn_bbsList">등록</button>
            </div>


        
        
        <div class="clearfix btn-wrap align-right mt30 mb30">
            <button href="#" class="table-btn btn-exit btn_bbsList" @click="moveList">목록</button>
        </div>
    </div>
        </div>
    </div>
    <!-- 컨텐츠 내용 -->
</div>
<!-- 컨텐츠 -->


 
    </div>



</template>
    

<style scoped>
@charset "utf-8";
.comment-input{
    display: inline-block;
    padding: 13px 40px;
    font-size: 18px;
    /* text-align: center; */
    border: gray solid 1px;
    border-radius: 5px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    transition: all 0.5s;
    width: calc(100% - 8rem);
} 

@media screen and (max-width:1023px) {
    .comment-input {padding: 0.5rem 1.5rem; font-size: 1rem; border-radius: 0.3rem;}
    .comment-input {margin-left: 0.5rem;}
}



/* table */
.table-wrap table{width:100%; border-top: 2px solid #1e96c4;}

.table-type2 thead {border-top: 2px solid #1e96c4; border-bottom: 1px solid #d3d3d3;}
.table-type2 thead th {padding: 20px 25px; font-weight: 500; text-align: left;}
.table-type2 thead th span {color: #7f7f7f; letter-spacing: 0px; font-weight: 400;}
.table-type2 thead .table-title {font-size: 19px; margin-top:10px; margin-bottom: 5px;}
.table-type2 tbody tr{border-bottom: 1px solid #e4e4e4;}
.table-type2 tbody td.table-content *{
    /* padding: 30px;
    background-color: #f8f8f8; */
    line-height: 2;
}


.table-division {margin: 0 auto; width: 115px; border-radius: 5px; background-color:#fff;}
.table-division1 {color:#41626f !important; border:1px solid #41626f !important;} /*이벤트*/
.community {color:#007bab !important; border:1px solid #007bab !important;} /*서비스운영*/
.notice {color:#c74b10 !important; border:1px solid #c74b10 !important;} /*행사*/
.table-division4 {color:#744a35 !important; border:1px solid #744a35 !important;}



    
/* tablet */
@media screen and (max-width:1023px) {    
    .table-division {display: inline-block; padding: 0 0.7rem; width: auto; border-radius: 0.3rem;}

    /* table */
    .table-type2 thead th {padding:0.8rem 1rem;}
    .table-type2 thead .table-title {font-size: 1.3rem; line-height: 1.6;}
    .table-type2 tbody td.table-content {padding: 1.2rem; font-size: 1rem;}
    .table-type2 tbody td.table-content * {line-height: 1.5; word-break: break-all;}

    .table-wrap {overflow-y: auto;}
    .table-wrap table {height: calc( (var(--vh) * 50));}
    
    .board table td {padding: 0.8rem;}
}







/* font */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400&display=swap');
/* font-family: 'Noto Sans', sans-serif; */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
/* font-family: 'Noto Sans KR', sans-serif; */
@import url('//fonts.googleapis.com/earlyaccess/notosanskr.css');
/* noto-sans-kr-100 - latin_korean */
@font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 100;
    src: url('./fonts/noto-sans-kr-v12-latin_korean-100.eot'); /* IE9 Compat Modes */
    src: local('Noto Sans KR Thin'), local('NotoSansKR-Thin'),
         url('./fonts/noto-sans-kr-v12-latin_korean-100.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('./fonts/noto-sans-kr-v12-latin_korean-100.woff2') format('woff2'), /* Super Modern Browsers */
         url('//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.woff') format('woff'), /* Modern Browsers */
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
         url('//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Light.woff') format('woff'), /* Modern Browsers */
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
         url('//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff') format('woff'), /* Modern Browsers */
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
         url('//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.woff2') format('woff2'), /* Super Modern Browsers */
         url('./fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.woff') format('woff'), /* Modern Browsers */
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
         url('//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.woff') format('woff'), /* Modern Browsers */
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
         url('//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Black.woff') format('woff'), /* Modern Browsers */
         url('./fonts/noto-sans-kr-v12-latin_korean-900.ttf') format('truetype'), /* Safari, Android, iOS */
         url('./fonts/noto-sans-kr-v12-latin_korean-900.svg#NotoSansKR') format('svg'); /* Legacy iOS */
  }








  /* reset */
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

html, body, div, span,h4, p, form, label,
	table, caption, tbody, thead, tr, th, td,
	button, textarea, input {
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
html, body, div{
	/* height: 100%; */
	overflow: auto;
}
body, div {
    width:100%;
    /* height:100%; */
	line-height: 1.5;
	letter-spacing: -1px;
}

table {
	border-collapse: collapse;
	border-spacing: 0;
}
/* table	caption { display:none; } */
table caption { /*position:absolute;*/ font-size:0; width:0; height:0; line-height:0; }
fieldset { border:0; margin:0; padding:0;}
button, input[type="button"] {cursor: pointer;}
hr {/* display:none;*/ height:0; }
textarea { resize: vertical; }


[role=button]{
	cursor:pointer;
}

/*basic*/
.clear {clear:both;}
.clearfix:after{display: block; content: ''; clear: both;}

.align-center{text-align:center;}
.align-right{text-align:right !important;}
.align-left{text-align:left !important;}
.align-middle{vertical-align: middle !important;}

/* margin */
.ml0{margin-left:0 !important;}
.ml5{margin-left:5px !important;}
.ml10{margin-left:10px !important;}
.ml20{margin-left:20px !important;}
.ml30{margin-left:30px !important;}
.ml50{margin-left:50px !important;}
.mr0{margin-right:0 !important;}
.mr5{margin-right:5px !important;}
.mr10{margin-right:10px !important;}
.mr20{margin-right:20px !important;}
.mr30{margin-right:30px !important;}
.mr50{margin-right:50px !important;}
.mt0{margin-top:0 !important;}
.mt5{margin-top:5px;}
.mt10{margin-top:10px !important;}
.mt15{margin-top:15px !important;}
.mt20{margin-top:20px !important;}
.mt25{margin-top:25px !important;}
.mt30{margin-top:30px !important;}
.mt35{margin-top:35px !important;}
.mt40{margin-top:40px !important;}
.mt50{margin-top:50px !important;}
.mt55{margin-top:55px !important;}
.mt80{margin-top:80px !important;}
.mb0{margin-bottom:0px !important}
.mb10{margin-bottom:10px !important}
.mb15{margin-bottom:15px !important;}
.mb20{margin-bottom:20px !important;}
.mb30{margin-bottom:30px !important;}
.mb35{margin-bottom:35px !important;}
.mb45{margin-bottom:45px !important;}
.mb50{margin-bottom:50px !important;}
.mb65{margin-bottom:65px !important;}

/* padding */
.pd0{padding:0;}
.pl15{padding-left:15px;}
.pl30{padding-left:30px !important;}
.pl45{padding-left:45px !important;}
.pr10{padding-right:10px !important;}
.pt0{padding-top:0 !important;}
.pt30{padding-top:30px;}
.pb30{padding-bottom: 30px;}

/* width */
.width-auto {width: auto !important;}
.width100{width:100% !important;}
.width50{width:50% !important;}
.width30{width:30% !important;}

.width200{width:200px;}

/* height */
.height-auto {height: auto !important;}


/* mobile */
@media screen and (max-width:1023px) {
	html, body, div, span,h4, p, form, label,
	table, caption, tbody, thead, tr, th, td,
	button, textarea, input {
		font-size:24px;
	}

	.ml10 {margin-left: 0.7rem !important;}
	.ml50 {margin-left: 2.3rem !important;}
	.mr30 {margin-right: 1.5rem !important;}
	.mt20 {margin-top: 1.1rem !important;}
	.mt30 {margin-top: 1.5rem !important;}
	.mt35 {margin-top: 1.7rem !important;}
	.mt40 {margin-top: 2rem !important;}
	.mt55 {margin-top: 2.5rem !important;}
	.mb10 {margin-bottom: 0.7rem !important;}
	.mb30 {margin-bottom: 1.5rem !important;}
}
@media screen and (max-width:720px) {
	html, body, div, span,h4, p, form, label,
	table, caption, tbody, thead, tr, th, td,
	button, textarea, input {
		font-size:18px;
	}
}

@media screen and (max-width:580px) {
	html, body, div, span,h4, p, form, label,
	table, caption, tbody, thead, tr, th, td,
	button, textarea, input  {
		font-size:16px;
	}
}





/* style */

.contents{min-height:450px;}
.contents > .inner{
    margin: 55px auto 0;
    width: 1260px;
}


/* button */
.btn-wrap{font-size:0;}
.btn-wrap:after{content: '';display: block; clear: both;}

.btn-h50{height:50px !important;line-height: 22px !important;}
.btn-h40{height:40px !important;line-height: 38px !important;}
.btn-h30{height:30px !important;line-height: 27px !important;}

.table-btn {
    display: inline-block;
    padding: 13px 40px;
    font-size: 18px;
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
.btn-exit {background-color: #7f7f7f;}
.btn-exit:hover {color:#fff; background-color: #575757;}


/* input */
.input-wrap input {margin-right: 5px;}
.input-wrap li {display: inline-block; margin-left: 10px; vertical-align: top;}
.input-wrap li:first-child {margin-left: 0;}

.input-type1{
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
.input-type1.align-right{padding-right:10px; letter-spacing:0px;}


/*board*/
.board table td {font-size: 16px; /*padding: 20px;*/}
.board table .table-division {
    display: inline-block;
    padding: 5px 15px;
    min-width: 140px;
    width: auto;
    box-sizing: border-box;
    text-align: center;
}

.board-view .table-wrap .table-content {padding: 20px; box-sizing: border-box; text-align:initial;}

.board-view .table-wrap .table-type2 thead {border-top:1px solid #888888;}

/* editor */
.board-view .table-wrap .table-content * {font-family: 'Nanum Gothic'; font-size:inherit;}

.board-view .table-wrap .table-content p{display: block; margin-block-start: 1em; margin-block-end: 1em; margin-inline-start: 0px; margin-inline-end: 0px;}


/* 수정 중  */
.board-view .table-wrap .table-content h4{
	font-weight: normal;
	line-height: 1.2;
	margin-inline-start: 0px; 
	margin-inline-end: 0px;
    margin-block-start: 1.33em; 
	margin-block-end: 1.33em; 
}


.board-view .table-wrap .table-content hr{
	border: 0px;
	border-top: 1px solid #ccc;
}

.board-view .table-wrap .table-content span[lang]{font-style: italic;}
/* //수정중 */


.board .table-wrap h4 {color:#1E96C4; font-size: 20px; font-weight: 500; margin:0px 0 20px 0;}




@media screen and (max-width:1300px) {
    .contents > .inner{width:95%;}
}


@media screen and (max-width:1023px) {
    /* .contents{padding-top:65px;} */
    .contents > .inner{margin-top: 2.5rem;}

    /* board */
    .board table td{font-size: 0.9rem;}
    .board table .table-division {padding: 0.2rem 0.5rem; width: 6rem;}

    .board .table-wrap {overflow-x: auto;}
    .board .table-wrap h4 {margin: 0 0 0.5rem 0; font-size: 1.1rem;}

	
    .table-btn {padding: 0.5rem 1.5rem; font-size: 1rem; border-radius: 0.3rem;}
    .btn-wrap .table-btn {margin-left: 0.5rem;}



    /* input */
    .input-wrap input {margin-right: 0.3rem;}

	
    /* button */
    .btn-h30 {height: 2rem !important; line-height: 1.9rem !important;}
	.btn-h40 {height: 2.5rem !important; line-height: 2.5rem !important;}

}	


@media screen and (max-width:720px) {
	.contents > .inner{width: 90%;}
}

h4
 {
    margin: 0;
}


</style>