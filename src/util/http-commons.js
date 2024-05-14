import axios from "axios";

const { VITE_VUE_API_URL } = import.meta.env;

// local vue api axios instance
function localAxios() {
  const instance = axios.create({
    baseURL: VITE_VUE_API_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

export { localAxios };

// import axios from "axios";

// const { VITE_VUE_API_URL } = import.meta.env;

// // local vue api axios instance
// function localAxios() {
//   const instance = axios.create({
//     baseURL: VITE_VUE_API_URL,
//     headers: {
//       "Content-Type": "application/json;charset=utf-8",
//     },
//   });

//   // 요청 인터셉터 추가
//   instance.interceptors.request.use(
//     (config) => {
//       // CORS 헤더 추가
//       config.headers["Access-Control-Allow-Origin"] = "*";
//       return config;
//     },
//     (error) => {
//       // 요청 에러 처리
//       return Promise.reject(error);
//     }
//   );

//   return instance;
// }

// export { localAxios };