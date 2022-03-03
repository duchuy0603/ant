import axiosClient from "./axiosClient";
const VoucherdApi={
    getAll(){
        const url=`/vouchers`;
        return axiosClient.get(url)
    },
    get(id){
        const url=`/vouchers/${id}`;
        return axiosClient.get(url)
    },
    create(data){
        const url=`/vouchers`;
        return axiosClient.post(url,data)
    },
    Edit(edit){
        const url=`/vouchers/${edit.id}`;
        return axiosClient.put(url,edit)
    },
     Delete(id){
        const url=`/vouchers/${id}`;
        return axiosClient.delete(url)
    }
}
export default VoucherdApi;