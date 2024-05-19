<script setup>
import { RouterLink, RouterView } from "vue-router";
import Footer from "./components/common/Footer.vue";
import Header from "./components/common/Header.vue";


setTimeout(()=>{
  let backtotop = document.querySelector('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    document.addEventListener('scroll', toggleBacktotop)
  }
})

</script>

<template>
  <div class="d-flex flex-column min-vh-100">
      <Header />
    <main class="flex-grow-1 container-fluid">
      <RouterView />
    </main>
    <Footer />
  </div>
  <a href="#" class="back-to-top d-flex align-items-center justify-content-center active">
    <i class="bi bi-arrow-up-short"></i>
  </a>
</template>

<style scoped>
/*--------------------------------------------------------------
# Back to top button
--------------------------------------------------------------*/
.back-to-top {
  position: fixed;
  visibility: hidden;
  opacity: 0;
  right: 15px;
  bottom: 15px;
  z-index: 99999;
  background: #4154f1;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  transition: all 0.4s;
}

.back-to-top i {
  font-size: 24px;
  color: #fff;
  line-height: 0;
}

.back-to-top:hover {
  background: #6776f4;
  color: #fff;
}

.back-to-top.active {
  visibility: visible;
  opacity: 1;
}

.d-flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.min-vh-100 {
  min-height: 100vh;
}

.flex-grow-1 {
  flex-grow: 1;
  overflow-y: auto; /* 스크롤이 내부에서 발생하도록 설정 */
}
</style>