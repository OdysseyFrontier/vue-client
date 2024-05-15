import { localAxios } from "@/util/http-commons";

const local = localAxios();


    function listArticle(param, success, fail) {
        local.get(`/board/list`, { params: param }).then(success).catch(fail);
    }
    
    function detailArticle(articleno, success, fail) {
        local.get(`/shareboard/${articleno}`).then(success).catch(fail);
    }
    
    function registArticle(article, success, fail) {
        console.log("boardjs article", article);
        local.post(`/shareboard`, JSON.stringify(article)).then(success).catch(fail);
    }
    
    function getModifyArticle(articleno, success, fail) {
        local.get(`/shareboard/modify/${articleno}`).then(success).catch(fail);
    }
    
    function modifyArticle(article, success, fail) {
        local.put(`/shareboard`, JSON.stringify(article)).then(success).catch(fail);
    }
    
    function deleteArticle(articleno, success, fail) {
        local.delete(`/shareboard/${articleno}`).then(success).catch(fail);
    }

export {
    listArticle,
    detailArticle,
    registArticle,
    getModifyArticle,
    modifyArticle,
    deleteArticle,
  };