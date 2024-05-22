<script setup>
import { useSidebarStore } from "@/stores/sidebar.js";

const sidebarStore = useSidebarStore();
sidebarStore.changesSidebarState("join");
sidebarStore.open = false;

import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { idCheck, join } from "@/api/member";

const joinMemberInfo = ref({
  name: "",
  emailId: "",
  emailDomain: "",
  password: "",
  phone: "",
  address: "",
  birthday: "",
});

const router = useRouter();

const msg = ref("");
watch(
  () => joinMemberInfo.value.emailId,
  (value) => {
    msg.value = "";
  },
  { immediate: true }
);

watch(
  () => joinMemberInfo.value.emailDomain,
  (value) => {
    msg.value = "";
  },
  { immediate: true }
);

let isfilled = false;
function onSubmit() {

  console.log(joinMemberInfo.value)
  let count = 0;
  idCheck(
    joinMemberInfo.value,
    (response) => {
      count = response.data;
console.log(count)
       if (count> 0) {
        console.log("중복")
    msg.value = "중복된 이메일입니다.";
  } else {
    joinMember();
  }

    },
    (error) => console.error(error)
  );

}

// function onSubmit() {
//   if (isIdCheck()) {
//     msg.value = "중복된 이메일입니다.";
//   } else {
//     joinMember();
//   }
// }

function joinMember() {
  join(
    joinMemberInfo.value,
    (response) => {
      console.log(response.data);
      let msg = "회원가입 처리시 문제 발생했습니다.";
      if (response.status == 201) msg = "회원가입이 완료되었습니다.";
      alert(msg);
      router.push("/");
    },
    (error) => console.error(error)
  );
}

function execDaumPostcode() {
  new window.daum.Postcode({
    oncomplete: (data) => {
      console.log("주소검색");
      if(data.jibunAddress)
      joinMemberInfo.value.address = data.jibunAddress
      if(data.roadAddress)
      joinMemberInfo.value.address = data.roadAddress
    },
  }).open();
}

setTimeout(() => {
  (function () {
    "use strict";

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }else{
            event.preventDefault();
            onSubmit()
          }
          event.preventDefault();
          // isfilled = true;
          form.classList.add("was-validated");
        },
        false
      );


    });
  })();
});
</script>

<template>
  <main>
    <div class="container">
      <section
        class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4"
      >
        <div class="container">
          <div class="row justify-content-center">
            <div
              class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center"
            >
              <div class="d-flex justify-content-center py-4">
                <a href="/" class="logo d-flex align-items-center w-auto">
                  <img src="/src/assets/logo.png" alt="" />
                  <span class="d-none d-lg-block">OdysseyFrontiers</span>
                </a>
              </div>
              <!-- End Logo -->

              <div class="card mb-3">
                <div class="card-body">
                  <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">회원가입</h5>
                    <p class="text-center small">개인정보를 입력해주세요.</p>
                  </div>

                  <form class="row g-3 needs-validation" novalidate>
                    <div class="col-12">
                      <label for="yourName" class="form-label">이름</label>
                      <input
                        type="text"
                        name="memberName"
                        class="form-control"
                        id="yourName"
                        required
                        v-model="joinMemberInfo.name"
                      />
                      <div class="invalid-feedback">이름을 입력해주세요!</div>
                    </div>

                    <div class="col-12" id="idcheck">
                      <label for="yourEmail" class="form-label">이메일</label>
                      <div class="input-group has-validation">
                        <input
                          type="text"
                          name="emailId"
                          class="form-control"
                          id="yourEmail"
                          required
                          v-model="joinMemberInfo.emailId"
                        />
                        <span class="input-group-text" id="inputGroupPrepend"
                          >@</span
                        >
                        <select
                          class="form-select"
                          id="emaildomain"
                          name="emailDomain"
                          aria-label="이메일 도메인 선택"
                          required
                          v-model="joinMemberInfo.emailDomain"
                        >
                          <option value="" selected disabled hidden>
                            선택해주세요.
                          </option>
                          <option value="odysseyfrontiers.com">
                            odysseyfrontiers.com
                          </option>
                          <option value="google.com">google.com</option>
                          <option value="naver.com">naver.com</option>
                          <option value="kakao.com">kakao.com</option>
                        </select>

                        <div class="invalid-feedback">
                          이메일을 입력해주세요.
                        </div>
                        <div class="col-12 text-danger" style="fontSize: 14px">{{ msg }}</div>
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
                        required
                        v-model="joinMemberInfo.password"
                      />
                      <div class="invalid-feedback">
                        비밀번호를 입력해주세요.
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="yourPhone" class="form-label">전화번호</label>
                      <input
                        type="text"
                        name="memberPhone"
                        class="form-control"
                        id="yourPhone"
                        required
                        placeholder="000-0000-0000"
                        v-model="joinMemberInfo.phone"
                      />
                      <div class="invalid-feedback">
                        전화번호를 입력해주세요.
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="birthday" class="form-label">생일</label>
                      <input
                        type="text"
                        name="birthday"
                        class="form-control"
                        id="birthday"
                        required
                        placeholder="0000-00-00"
                        v-model="joinMemberInfo.birthday"
                      />
                      <div class="invalid-feedback">생일을 입력해주세요.</div>
                    </div>

                    <div class="col-12">
                      <label for="MemberAddress"
                        >주소<span class="text-muted"
                          >&nbsp;(선택사항)</span>
                          <span class="text-muted">
                          <button
                            type="button"
                            class="btn"
                            id="check_btn"
                            @click="execDaumPostcode"
                          >
                            찾기
                          </button>
                        </span>
                        </label>
                      <input
                        type="text"
                        class="form-control"
                        id="memberAddress"
                        name="memberAddress"
                        placeholder="주소를 직접 입력하거나 찾기를 눌러주세요."
                        v-model="joinMemberInfo.address"
                      />
                    </div>

                    <div class="col-12">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          name="terms"
                          type="checkbox"
                          value=""
                          id="acceptTerms"
                          required
                        />
                        <label class="form-check-label" for="acceptTerms"
                          ><a href="#">개인정보 수집 및 이용</a></label
                        >에 동의
                        <div class="invalid-feedback">필수항목입니다.</div>
                      </div>
                    </div>
                    <div class="col-12">
                      <button
                        class="btn btn-primary w-100"
                        type="submit"
                      >
                        회원가입
                      </button>
                    </div>
                    <div class="col-12">
                      <p class="small mb-0">
                        계정이 있으신가요?
                        <RouterLink :to="{ name: 'memberLogin' }"
                          >로그인</RouterLink
                        >
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
