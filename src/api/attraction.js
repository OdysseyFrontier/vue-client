import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function getAttraction(contentId, success, fail) {
    await local.get(`/attraction/${contentId}`).then(success).catch(fail);
}

async function getCategorys(success, fail) {
    await local.get(`/attraction/category`).then(success).catch(fail);
}

async function getSearchCategory(contentTypeId, success, fail) {
    await local.get(`/attraction/search/${contentTypeId}`).then(success).catch(fail);
}
async function getSidos(success, fail) {
    await local.get(`/attraction/sido`).then(success).catch(fail);
}

async function getGuguns(sido, success, fail) {
    await local.get(`/attraction/gugun/${sido}`).then(success).catch(fail);
}

async function getSearchAttraction(contentTypeId, sidoCode, gugunCode, keywordString, nowLoc, success, fail) {
    console.log(contentTypeId, sidoCode, gugunCode, keywordString, nowLoc.lng, nowLoc.lat, nowLoc);
    if (keywordString == undefined || keywordString === "") keywordString = "no";

    await local.get(`/attraction/search/${contentTypeId}/${sidoCode}/${gugunCode}/${keywordString}/${nowLoc.lng}/${nowLoc.lat}`).then(success).catch(fail);
}

export {
    getAttraction,
    getSidos,
    getGuguns,
    getSearchAttraction,
    getCategorys,
    getSearchCategory
}