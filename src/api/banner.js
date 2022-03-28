import axiosClient from "./axiosClient";
const BannersApi={
    getAll(){
        const url=`/banners`;
        return axiosClient.get(url)
    },
    get(id){
        const url=`/banners/${id}`;
        return axiosClient.get(url)
    },
    create(data){
        const url=`/banners`;
        return axiosClient.post(url,data)
    },
    Edit(edit){
        const url=`/banners/${edit.id}`;
        return axiosClient.put(url,edit)
    },
     Delete(id){
        const url=`/banners/${id}`;
        return axiosClient.delete(url)
    }
}
export default BannersApi;