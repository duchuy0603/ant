import axiosClient from "../axiosClient";

const competitionContentApi = {
    getAll: (params) => {
        const url = '/tournament_details/get-all';
        return axiosClient.get(url, {params});
    },
    getById: (params) => {
        const url = `/tournament_details/get-by-id`;   //ok
        return axiosClient.get(url, {params});
    },
    create: (newData) => {
        const url = '/tournament_details';
        return axiosClient.post(url, newData);
    },
    createHandmade: (newData) => {
        const url = '/tournament_details/with-content';
        return axiosClient.post(url, newData);
    },
    edit: (dataEdited) => {    //ok
        const dataEdit = {
            content_competition_id: dataEdited.content_competition_id,
        }
        const params = {
            tournament_id: dataEdited.tournament_id,
        }
        const url = `/tournament_details`;
        return axiosClient.put(url, dataEdit, {params});
    },
    delete: (paramsID) => {
        const id = paramsID.tournament_detail_id
        const url = `/tournament_details/${id}`;
        return axiosClient.delete(url, {id});
    },
}

export default competitionContentApi;