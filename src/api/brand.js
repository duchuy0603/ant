import axiosClient from "./axiosClient";
const BrandApi={
    getAll(){
        const url=`/brands`;
        return axiosClient.get(url)
    },
    get(id){
        const url=`/brands/${id}`;
        return axiosClient.get(url)
    },
    create(data){
        const url=`/brands`;
        return axiosClient.post(url,data)
    },
    Edit(edit){
        const url=`/brands/${edit.id}`;
        return axiosClient.put(url,edit)
    },
     Delete(id){
        const url=`/brands/${id}`;
        return axiosClient.delete(url)
    }
}
export default BrandApi;