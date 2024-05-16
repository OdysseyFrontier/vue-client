<script setup>
import { useSidebarStore } from "@/stores/sidebar.js";

const sidebarStore = useSidebarStore();
sidebarStore.changesSidebarState("login");


// Example starter JavaScript for disabling form submissions if there are invalid fields
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
          class="section register d-flex flex-column align-items-center justify-content-center py-4"
        >
          <div class="container">
            <div class="row justify-content-center">
              <div
                class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center"
              >
                <div class="d-flex justify-content-center py-4">
                  <a
                    href="/"
                    class="logo d-flex align-items-center w-auto"
                  >
                    <img src="/src/assets/logo.png" alt="" />
                    <span class="d-none d-lg-block">OdysseyFrontiers</span>
                  </a>
                </div>
                <!-- End Logo -->

                <div class="card mb-3">
                  <div class="card-body">
                    <div class="pt-4 pb-2">
                      <h5 class="card-title text-center pb-0 fs-4">로그인</h5>
                      <p class="text-center small">
                        아이디와 비밀번호를 입력해주세요.
                      </p>
                    </div>

                    <form class="row g-3 needs-validation" novalidate id="form-login" method="POST" action="${root}/member/login">
                      <div class="col-12">
                        <label for="yourUsername" class="form-label"
                          >아이디</label
                        >
                        <div class="input-group has-validation">
                          <input
                            type="text"
                            name="memberId"
                            class="form-control"
                            id="yourUsername"
                            value="${cookie.memberId.value}"
                            required
                          />
                          <div class="invalid-feedback">
                            아이디를 입력해주세요.
                          </div>
                        </div>
                      </div>

                      <div class="col-12">
                        <label for="yourPassword" class="form-label"
                          >비밀번호</label
                        >
                        <input
                          type="password"
                          name="memberPassword"
                          class="form-control"
                          id="yourPassword"
                          value=""
                          required
                        />
                        <div class="invalid-feedback">
                          비밀번호를 입력해주세요.
                        </div>
                      </div>

                      <div class="col-12">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            name="remember"
                            value="true"
                            id="rememberMe"
                          />
                          <label class="form-check-label" for="rememberMe"
                            >로그인 정보 기억</label
                          >
                        </div>
                      </div>

            <div class="text-danger mb-2">{{msg}}</div>   
                      
                      <div class="col-12">
                        <button class="btn btn-primary w-100" type="submit">
                          로그인
                        </button>
                      </div>
                      <div class="col-12">
                        <p class="small mb-0">
                          계정이 없으신가요?
                          <RouterLink :to="{name: 'memberJoin'}">회원가입</RouterLink>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>

                <div class="credits">
                  <!-- All the links in the footer should remain intact. -->
                  <!-- You can delete the links only if you purchased the pro version. -->
                  <!-- Licensing information: https://bootstrapmade.com/license/ -->
                  <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/ -->
                  Designed by
                  <a href="https://bootstrapmade.com/">BootstrapMade</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
    <!-- End #main -->



    <!-- Google Fonts -->
    <link href="https://fonts.gstatic.com" rel="preconnect" />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
      rel="stylesheet"
    />
</template>

<style scoped>
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




/* 복붙 */
/**
* Template Name: NiceAdmin
* Updated: Mar 13 2024 with Bootstrap v5.3.3
* Template URL: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/
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



/* Card */
.card {
  margin-bottom: 30px;
  border: none;
  border-radius: 5px;
  text-align: left;
  box-shadow: 0px 0 30px rgba(1, 41, 112, 0.1);
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




</style>