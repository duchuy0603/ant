import axiosClient from "../axiosClient";

const tournamentsListApi = {
    getAll: (params) => {
        const url = '/tournaments/get-all';
        return axiosClient.get(url, {params});
    },
    create: (newData) => {
        const url = '/tournaments';
        return axiosClient.post(url, newData);
    },
    edit: (dataEdited) => {
        const url = `/tournaments/${dataEdited.id}`;
        return axiosClient.put(url, dataEdited);
    },
    delete: (id) => {
        const url = `/tournaments/${id}`;
        return axiosClient.delete(url, {id});
    },
}

export default tournamentsListApi;