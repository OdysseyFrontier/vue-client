import { localAxios } from "@/util/http-commons";

const local = localAxios();
    function getSidos(success, fail) {
        local.get(`/hotplace/sido`).then(success).catch(fail);
    }

    function getGuguns(sido, success, fail) {
        local.get(`/hotplace/gugun/${sido}`).then(success).catch(fail);
    }

    function listHotPlace(param, success, fail) {
        local.get(`/hotplace/list`, { params: param }).then(success).catch(fail);
    }
    
    async function detailHotPlace(contentId, success, fail) {
        local.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
        await local.get(`/hotplace/${contentId}`).then(success).catch(fail);
    }

    function likeHotPlace(param, success, fail) {
        local.post(`/hotplace/like`, JSON.stringify(param)).then(success).catch(fail);
    }

    function deleteLikeHotPlace(param, success, fail) {
        local.delete(`/hotplace/like`, { data: param }).then(success).catch(fail);
    }
    
    // function registArticle(article, success, fail) {
    //     console.log("boardjs article", article);
    //     local.post(`/board`, JSON.stringify(article)).then(success).catch(fail);
    // }
    
    // function getModifyArticle(boardno, success, fail) {
    //     local.get(`/board/modify/${boardno}`).then(success).catch(fail);
    // }
    
    // function modifyArticle(article, success, fail) {
    //     local.put(`/board`, JSON.stringify(article)).then(success).catch(fail);
    // }
    
    // function deleteArticle(boardno, success, fail) {
    //     local.delete(`/board/${boardno}`).then(success).catch(fail);
    // }

export {
    getSidos,
    getGuguns,
    listHotPlace,
    detailHotPlace,
    likeHotPlace,
    deleteLikeHotPlace
    // listArticle,
    // detailArticle,
    // registArticle,
    // getModifyArticle,
    // modifyArticle,
    // deleteArticle,
  };