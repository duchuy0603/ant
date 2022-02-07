import axiosClient from "./axiosClient";
const PropertyApi={
    getAll(){
        const url=`/product-property`;
        return axiosClient.get(url)
    },
    get(id){
        const url=`/product-property/${id}`;
        return axiosClient.get(url)
    },
    create(dataAdd){
        const url=`/product-property`;
      
        return axiosClient.post(url, dataAdd)
    },
    Edit(edit){
        const url=`/product-property/${edit.id}`;
        return axiosClient.put(url,edit)
    },
     Delete(id){
        const url=`/product-property/${id}`;
        return axiosClient.delete(url)
    }
}
export default PropertyApi;