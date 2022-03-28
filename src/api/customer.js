import axiosClient from "./axiosClient";
const CustomerApi={
    getAll(){
        const url=`/customers/`;
        return axiosClient.get(url)
    },
    get(id){
        const url=`/customers/${id}`;
        return axiosClient.get(url)
    },
    create(data){
        const url=`/customers/register`;
        return axiosClient.post(url,data)
    },
    login(data){
        const url=`/customers/login`;
        return axiosClient.post(url,data)
    },
    Edit(edit){
        const url=`/customers/${edit.id}`;
        return axiosClient.put(url,edit)
    },
     Delete(id){
        const url=`/customers/${id}`;
        return axiosClient.delete(url)
    }
}
export default CustomerApi;