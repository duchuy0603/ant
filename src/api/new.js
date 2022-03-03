
import axiosClient from "./axiosClient";
const NewAPI={
    getAll(){
        const url=`/news`;
        return axiosClient.get(url)
    },
    get(id){
        const url=`/news/${id}`;
        return axiosClient.get(url)
    },
    create(data){
        const url=`/news`;
        return axiosClient.post(url,data)
    },
    Edit(edit){
        const url=`/news/${edit.id}`;
        return axiosClient.put(url,edit)
    },
     Delete(id){
        const url=`/news/${id}`;
        return axiosClient.delete(url)
    }
}
export default NewAPI;