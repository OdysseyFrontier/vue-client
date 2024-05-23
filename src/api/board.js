import { localAxios } from "@/util/http-commons";

const local = localAxios();


    function listArticle(param, success, fail) {
        local.get(`/board/list`, { params: param }).then(success).catch(fail);
    }
    
    function detailArticle(boardno, success, fail) {
        local.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
        local.get(`/board/${boardno}`).then(success).catch(fail);
    }
    
    function registArticle(article, success, fail) {
        console.log("boardjs article", article);
        local.post(`/board`, JSON.stringify(article)).then(success).catch(fail);
    }
    
    function getModifyArticle(boardno, success, fail) {
        local.get(`/board/modify/${boardno}`).then(success).catch(fail);
    }
    
    function modifyArticle(article, success, fail) {
        local.put(`/board`, JSON.stringify(article)).then(success).catch(fail);
    }
    
    function deleteArticle(boardno, success, fail) {
        local.delete(`/board/${boardno}`).then(success).catch(fail);
    }

export {
    listArticle,
    detailArticle,
    registArticle,
    getModifyArticle,
    modifyArticle,
    deleteArticle,
  };