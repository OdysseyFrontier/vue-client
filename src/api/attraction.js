import { localAxios } from "@/util/http-commons";

const local = localAxios();

function getSidos(success, fail) {
    local.get(`/attraction/sido`).then(success).catch(fail);
}

function getGuguns(sido, success, fail) {
    local.get(`/attraction/gugun/${sido}`).then(success).catch(fail);
}

function getSearchAttraction(contentTypeId, sidoCode, gugunCode, keywordString, nowLoc, success, fail) {
    local.get(`attraction/search/${contentTypeId}/${sidoCode}/${gugunCode}/${keywordString}/${nowLoc.lng}/${nowLoc.lat}`).then(success).catch(fail);
}

export{
    getSidos,
    getGuguns,
    getSearchAttraction,
}