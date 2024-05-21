import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function getSearchPlan(contentTypeId, sidoCode, gugunCode, keywordString, success, fail) {
    console.log(contentTypeId, sidoCode, gugunCode, keywordString);
    if (keywordString == undefined || keywordString === "") keywordString = "no";

    await local.get(`/plan/search/${contentTypeId}/${sidoCode}/${gugunCode}/${keywordString}`).then(success).catch(fail);
}
async function getMyMakePlans(memberId, success, fail) {
    await local.get(`/plan/myMakePlans/${memberId}`)
        .then(success)
        .catch(fail);
}

async function getMyLikePlans(memberId, success, fail) {
    await local.get(`/plan/myLikePlans/${memberId}`)
        .then(success)
        .catch(fail);
}
async function createPlan(planDto, success, fail) {
    await local.post('/plan/', JSON.stringify(planDto)).then(success).catch(fail);
}

async function getPlan(planId, success, fail) {
    await local.get(`/plan/${planId}`).then(success).catch(fail);
}


export {
    getSearchPlan,
    getPlan,
    createPlan,
    getMyLikePlans,
    getMyMakePlans,

}