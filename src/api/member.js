import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function memberConfirm(param, success, fail) {
  await local.post(`/member/login`, param).then(success).catch(fail);
}

async function findById(memberId, success, fail) {
  local.defaults.headers["Authorization"] =
    sessionStorage.getItem("accessToken");
  await local.get(`/member/info/${memberId}`).then(success).catch(fail);
}

async function tokenRegeneration(member, success, fail) {
  local.defaults.headers["refreshToken"] =
    sessionStorage.getItem("refreshToken"); //axios header에 refresh-token 셋팅
  await local.post(`/member/refresh`, member).then(success).catch(fail);
}

async function logout(memberId, success, fail) {
  await local.get(`/member/logout/${memberId}`).then(success).catch(fail);
}

function idCheck(param, success, fail) {
  local.get(`/member/idcheck`, { params: param }).then(success).catch(fail);
}

function join(joinMember, success, fail) {
  local
    .post(`/member/join`, JSON.stringify(joinMember))
    .then(success)
    .catch(fail);
}

async function getFollowers(memberId, success, fail) {
  local.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
  await local.get(`/member/${memberId}/followers`).then(success).catch(fail);
}

// Fetch following of a member
async function getFollowing(memberId, success, fail) {
  local.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
  await local.get(`/member/${memberId}/following`).then(success).catch(fail);
}

async function searchMembers(searchQuery, success, fail) {
  local.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
  await local.get(`/member/search/${searchQuery}`).then(success).catch(fail);
}

async function searchAllMembers(success, fail) {
  local.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
  await local.get(`/member/search/all`).then(success).catch(fail);
}

async function searchMembersByLoginMemberId(searchQuery, loginMemberId, success, fail) {
  local.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
  await local.get(`/member/search/${searchQuery}/${loginMemberId}`).then(success).catch(fail);
}

async function searchAllMembersByLoginMemberId(loginMemberId, success, fail) {
  local.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
  await local.get(`/member/search/all/${loginMemberId}`).then(success).catch(fail);
}

async function followMember(followerId, followingId, success, fail) {
  local.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
  await local.post(`/member/${followerId}/follow/${followingId}`).then(success).catch(fail);
}

// Function to unfollow another member
async function unfollowMember(followerId, followingId, success, fail) {
  local.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
  await local.post(`/member/${followerId}/unfollow/${followingId}`).then(success).catch(fail);
}



export {
  memberConfirm, findById, tokenRegeneration, logout, idCheck, join,
  getFollowers,
  getFollowing,
  searchAllMembers,
  searchMembers,
  searchMembersByLoginMemberId,
  searchAllMembersByLoginMemberId,
  followMember,
  unfollowMember
};
