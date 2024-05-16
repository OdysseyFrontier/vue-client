import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function memberConfirm(param, success, fail) {
  await local.post(`/member/login`, param).then(success).catch(fail);
}

async function findById(memberId, success, fail) {
  local.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
  await local.get(`/member/info/${memberId}`).then(success).catch(fail);
}

async function tokenRegeneration(member, success, fail) {
  local.defaults.headers["refreshToken"] = sessionStorage.getItem("refreshToken"); //axios header에 refresh-token 셋팅
  await local.post(`/member/refresh`, member).then(success).catch(fail);
}

async function logout(memberId, success, fail) {
  await local.get(`/member/logout/${memberId}`).then(success).catch(fail);
}

export { memberConfirm, findById, tokenRegeneration, logout };
