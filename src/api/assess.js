import axiosClient from "./axiosClient";
const AssessApi={
    getAll(){
        const url=`/assess`;
        return axiosClient.get(url)
    },
    get(id){
        const url=`/assess/${id}`;
        return axiosClient.get(url)
    },
    create(data){
        const url=`/assess`;
        return axiosClient.post(url,data)
    },
    Edit(edit){
        const url=`/assess/${edit.id}`;
        return axiosClient.put(url,edit)
    },
     Delete(id){
        const url=`/assess/${id}`;
        return axiosClient.delete(url)
    }
}
export default AssessApi;