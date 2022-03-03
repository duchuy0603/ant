import axiosClient from "./axiosClient";
const CategoriesAPI={
    getAll(){
        const url=`/categories`;
        return axiosClient.get(url)
    },
    get(id){
        const url=`/categories/${id}`;
        return axiosClient.get(url)
    },
    create(data){
       
        const url=`/categories`;
        return axiosClient.post(url,data)
    },
    Edit(edit){
        const url=`/categories/${edit.id}`;
        return axiosClient.put(url,edit)
    },
     Delete(id){
        const url=`/categories/${id}`;
        return axiosClient.delete(url)
    }
}
export default CategoriesAPI;