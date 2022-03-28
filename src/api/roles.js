import axiosClient from "./axiosClient";
const RoleApi={
    getAll(){
        const url=`/roles`;
        return axiosClient.get(url)
    },
    get(id){
        const url=`/roles/${id}`;
        return axiosClient.get(url)
    },
    create(data){
        const url=`/roles`;
        return axiosClient.post(url,data)
    },
    Edit(edit){
        const url=`/roles/${edit.id}`;
        return axiosClient.put(url,edit)
    },
     Delete(id){
        const url=`/roles/${id}`;
        return axiosClient.delete(url)
    }
}
export default RoleApi;