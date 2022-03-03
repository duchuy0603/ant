import axiosClient from "./axiosClient";
const StoreApi={
    getAll(){
        const url=`/stores`;
        return axiosClient.get(url)
    },
    get(id){
        const url=`/stores/${id}`;
        return axiosClient.get(url)
    },
    create(data){
        const url=`/stores`;
        return axiosClient.post(url,data)
    },
    Edit(edit){
        const url=`/stores/${edit.id}`;
        return axiosClient.put(url,edit)
    },
     Delete(id){
        const url=`/stores/${id}`;
        return axiosClient.delete(url)
    }
}
export default StoreApi;