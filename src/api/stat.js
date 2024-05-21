import { localAxios } from "@/util/http-commons";

const local = localAxios();


    async function time(success, fail) {
        await local.get(`/stat/time`).then(success).catch(fail);
    }

    async function registrationStats(success, fail) {
        await local.get(`/stat/registration-stats`).then(success).catch(fail);
    }

    async function popular(success, fail) {
        await local.get(`/stat/popular`).then(success).catch(fail);
    }

    async function reginonCount(success, fail) {
        await local.get(`/stat/region-count`).then(success).catch(fail);
    }

export {
    time,
    registrationStats,
    popular,
    reginonCount,
};