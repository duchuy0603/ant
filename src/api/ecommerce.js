import axiosClient from "./axiosClient";

const ecommerceApi={
    getAll(){
        const url=`/ecommerce`;
        return axiosClient.get(url)
    },
    get(id){
        const url=`/ecommerce/${id}`;
        return axiosClient.get(url)
    },
    create(data){
        const url='/ecommerce';
        console.log(data);
        return axiosClient.post(url, data)
    },
    Edit(edit){
        const url=`/ecommerce/${edit.Id}`;
        return axiosClient.put(url,edit)
    },
     Delete(id){
        const url=`/ecommerce/${id}`;
        return axiosClient.delete(url)
    }
}
export default ecommerceApi;