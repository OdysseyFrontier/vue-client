<script setup>
    defineProps({ article: Object });
</script>

<template>
    <tr>
        <td>{{ article.boardNo }}</td>
        <td>
        <span class="table-division" :class="article.type">{{article.type === "notice"? "공지사항" : "커뮤니티"}}</span>
        </td>
        <td class="title lock_wrap subject">
            <router-link :to="{name:'boardDetail', params: {boardno: article.boardNo} }">
                {{article.subject}}
            </router-link>
        <!-- <a
            href="/site/portal/ex/bbs/View.do?cbIdx=1135&amp;bcIdx=307179&amp;pageIndex=1&amp;tgtTypeCd=&amp;searchKey=&amp;searchKey2="
            class="btn_bbsDetail"
        >
            {{article.subject}}
        </a> -->
        </td>
        <td>

            <RouterLink :to="{ name: 'memberMyPage', params: {memberId : article.memberId}  }" >
                  {{ article.name }}
                </RouterLink>
        <!-- <a href=""
            >{{ article.name }}</a> -->
        </td>
        <td>{{article.registerTime}}</td>
    </tr>
</template>

<style scoped>
@charset "utf-8";

.table-division {margin: 0 auto; text-align: center; width: 115px; border-radius: 5px; background-color:#fff;}
.table-division1 {color:#41626f !important; border:1px solid #41626f !important;} /*이벤트*/
.community {color:#007bab !important; border:1px solid #007bab !important;} /*서비스운영*/
.notice {color:#c74b10 !important; border:1px solid #c74b10 !important;} /*행사*/
.table-division4 {color:#744a35 !important; border:1px solid #744a35 !important;}

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
html, body{
	/* height: 100%; */
	overflow: auto;
}
body {
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
        /* position: absolute; */
        bottom: 15px;
    }

}


</style>