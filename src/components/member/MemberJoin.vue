<script setup>
import { useSidebarStore } from "@/stores/sidebar.js";

const sidebarStore = useSidebarStore();
sidebarStore.changesSidebarState("join");

setTimeout(()=>{(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()})
</script>

<template>
    <main>
		<div class="container">
			<section
				class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
				<div class="container">
					<div class="row justify-content-center">
						<div
							class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
							<div class="d-flex justify-content-center py-4">
								<a href="/"
									class="logo d-flex align-items-center w-auto"> <img
									src="/src/assets/logo.png" alt="" /> <span
									class="d-none d-lg-block">OdysseyFrontiers</span>
								</a>
							</div>
							<!-- End Logo -->

							<div class="card mb-3">
								<div class="card-body">
									<div class="pt-4 pb-2">
										<h5 class="card-title text-center pb-0 fs-4">회원가입</h5>
										<p class="text-center small">개인정보를 입력해주세요.</p>
									</div>

									<form class="row g-3 needs-validation" novalidate method="POST"
										action="/member/join">
										<div class="col-12">
											<label for="yourName" class="form-label">이름</label> <input
												type="text" name="memberName" class="form-control" id="yourName"
												required />
											<div class="invalid-feedback">이름을 입력해주세요!</div>
										</div>

										<div class="col-12">
											<label for="memberId" class="form-label">아이디</label> <input
												type="text" name="memberId" class="form-control"
												id="memberId" required />
											<div class="invalid-feedback">아이디를 입력해주세요!</div>
											
											<div id="idcheck-result"></div>
										</div>
										
										<div class="col-12">
											<label for="yourPassword" class="form-label">비밀번호</label> <input
												type="password" name="memberPassword" class="form-control"
												id="yourPassword" required />
											<div class="invalid-feedback">비밀번호를 입력해주세요!</div>
										</div>

										<div class="col-12">
											<label for="yourEmail" class="form-label">이메일</label>
											<div class="input-group has-validation">
												<input type="text" name="emailId" class="form-control"
													id="yourEmail" required /> <span class="input-group-text"
													id="inputGroupPrepend">@</span> <select class="form-select"
													id="emaildomain" name="emailDomain" aria-label="이메일 도메인 선택"
													required>
													<option value="" selected disabled hidden>선택해주세요.</option>
													<option value="ssafy.com">싸피</option>
													<option value="google.com">구글</option>
													<option value="naver.com">네이버</option>
													<option value="kakao.com">카카오</option>
												</select>

												<div class="invalid-feedback">이메일을 입력해주세요.</div>
											</div>
										</div>
										
										<div class="col-12">
											<label for="yourPhone" class="form-label">전화번호</label> <input
												type="text" name="memberPhone" class="form-control"
												id="yourPhone" required />
											<div class="invalid-feedback">전화번호를 입력해주세요!</div>
										</div>

										<div class="col-12">
											<label for="memberAddress1">우편번호 <span
												class="text-muted">&nbsp;(선택사항)</span> <span
												class="text-muted">
													<button type="button" class="btn " id="check_btn"
														onclick="execDaumPostcode()">찾기</button>
											</span>
											</label> <input type="text" class="form-control" id="memberAddress1"
												name="memberAddress1" placeholder="찾기를 눌러 주소를 입력하세요" value=""/>
										</div>

										<div class="col-12">
											<label for="MemberAddress2">주소<span
												class="text-muted">&nbsp;(선택사항)</span></label> <input type="text"
												class="form-control" id="memberAddress2"
												name="memberAddress2" placeholder="주소를 입력해주세요." value="" />
										</div>

										<div class="col-12">
											<div class="form-check">
												<input class="form-check-input" name="terms" type="checkbox"
													value="" id="acceptTerms" required /> <label
													class="form-check-label" for="acceptTerms"><a
													href="#">개인정보 수집 및 이용</a></label>에 동의
												<div class="invalid-feedback">필수항목입니다.</div>
											</div>
										</div>
										<div class="col-12">
											<button class="btn btn-primary w-100" type="submit">
												회원가입</button>
										</div>
										<div class="col-12">
											<p class="small mb-0">
												계정이 있으신가요?
                                                <RouterLink :to="{name: 'memberLogin'}">로그인</RouterLink>
											</p>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</main>
</template>

<style scoped>
/**
* Template Name: NiceAdmin
* Template URL: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/
* Updated: Apr 20 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

/*--------------------------------------------------------------
# General
--------------------------------------------------------------*/
:root {
  scroll-behavior: smooth;
}

main {
  font-family: "Open Sans", sans-serif;
  /* background: #f6f9ff; */
  color: #444444;
}

a {
  color: #4154f1;
  text-decoration: none;
}

a:hover {
  color: #717ff5;
  text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Nunito", sans-serif;
}



/*--------------------------------------------------------------
# Page Title
--------------------------------------------------------------*/
.pagetitle {
  margin-bottom: 10px;
}

.pagetitle h1 {
  font-size: 24px;
  margin-bottom: 0;
  font-weight: 600;
  color: #012970;
}




/* Card */
.card {
  margin-bottom: 30px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0 30px rgba(1, 41, 112, 0.1);
  text-align: left;
}

.card-header,
.card-footer {
  border-color: #ebeef4;
  background-color: #fff;
  color: #798eb3;
  padding: 15px;
}

.card-title {
  padding: 20px 0 15px 0;
  font-size: 18px;
  font-weight: 500;
  color: #012970;
  font-family: "Poppins", sans-serif;
}

.card-title span {
  color: #899bbd;
  font-size: 14px;
  font-weight: 400;
}

.card-body {
  padding: 0 20px 20px 20px;
}

.card-img-overlay {
  background-color: rgba(255, 255, 255, 0.6);
}



/*--------------------------------------------------------------
# logo
--------------------------------------------------------------*/
.logo {
  line-height: 1;
}

@media (min-width: 1200px) {
  .logo {
    width: 280px;
  }
}

.logo img {
  max-height: 26px;
  margin-right: 6px;
}

.logo span {
  font-size: 26px;
  font-weight: 700;
  color: #012970;
  font-family: "Nunito", sans-serif;
}




</style>