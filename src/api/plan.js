import { localAxios } from "@/util/http-commons";

const local = localAxios();

function getSearchPlan(contentTypeId, sidoCode, gugunCode, keywordString, success, fail) {
    console.log(contentTypeId, sidoCode, gugunCode, keywordString);
    if (keywordString == undefined || keywordString === "") keywordString = "no";

    local.get(`/plan/search/${contentTypeId}/${sidoCode}/${gugunCode}/${keywordString}`).then(success).catch(fail);
}

export{
    getSearchPlan,
}