import axiosClient from "./axiosClient";
const UserApi={
    getAll(){
        const url=`/users/`;
        return axiosClient.get(url)
    },
    get(id){
        const url=`/users/${id}`;
        return axiosClient.get(url)
    },
    create(data){
        const url=`/users/register`;
        return axiosClient.post(url,data)
    },
    login(data){
        const url=`/users/login`;
        return axiosClient.post(url,data)
    },
    Edit(edit){
        const url=`/users/${edit.id}`;
        return axiosClient.put(url,edit)
    },
     Delete(id){
        const url=`/users/${id}`;
        return axiosClient.delete(url)
    }
}
export default UserApi;