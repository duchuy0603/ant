import axiosClient from "./axiosClient";
const NotificationsApi={
    getAll(){
        const url=`/notifications`;
        return axiosClient.get(url)
    },
    get(id){
        const url=`/notifications/${id}`;
        return axiosClient.get(url)
    },
    create(dataAdd){
        const url=`/notifications`;
      console.log(dataAdd)
        return axiosClient.post(url, dataAdd)
    },
    Edit(edit){
        const url=`/notifications/${edit.id}`;
        return axiosClient.put(url,edit)
    },
     Delete(id){
        const url=`/notifications/${id}`;
        return axiosClient.delete(url)
    }
}
export default NotificationsApi;