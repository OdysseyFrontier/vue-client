import { localAxios } from "@/util/http-commons";

const local = localAxios();

function getAttraction(contentId, success, fail) {
    local.get(`/attraction/${contentId}`).then(success).catch(fail);
}

function getCategorys(success, fail) {
    local.get(`/attraction/category`).then(success).catch(fail);
}

function getSearchCategory(contentTypeId, success, fail) {
    local.get(`/attraction/search/${contentTypeId}`).then(success).catch(fail);
}
function getSidos(success, fail) {
    local.get(`/attraction/sido`).then(success).catch(fail);
}

function getGuguns(sido, success, fail) {
    local.get(`/attraction/gugun/${sido}`).then(success).catch(fail);
}

function getSearchAttraction(contentTypeId, sidoCode, gugunCode, keywordString, nowLoc, success, fail) {
    console.log(contentTypeId, sidoCode, gugunCode, keywordString, nowLoc.lng, nowLoc.lat, nowLoc);
    if (keywordString == undefined || keywordString === "") keywordString = "no";

    local.get(`/attraction/search/${contentTypeId}/${sidoCode}/${gugunCode}/${keywordString}/${nowLoc.lng}/${nowLoc.lat}`).then(success).catch(fail);
}

export {
    getAttraction,
    getSidos,
    getGuguns,
    getSearchAttraction,
    getCategorys,
    getSearchCategory
}