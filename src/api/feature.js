import axiosClient from "./axiosClient";
const FeatureAPI={
    getAll(){
        const url=`/product-feature`;
        return axiosClient.get(url)
    },
    get(id){
        const url=`/product-feature/${id}`;
        return axiosClient.get(url)
    },
    create(data){
        const url=`/product-feature`;
        return axiosClient.post(url,data)
    },
    Edit(edit){
        const url=`/product-feature/${edit.id}`;
        return axiosClient.put(url,edit)
    },
     Delete(id){
        const url=`/product-feature/${id}`;
        return axiosClient.delete(url)
    }
}
export default FeatureAPI;