import axiosClient from "./axiosClient";
const EventApi={
    getAll(){
        const url=`/events`;
        return axiosClient.get(url)
    },
    get(id){
        const url=`/events/${id}`;
        return axiosClient.get(url)
    },
    create(data){
        const url=`/events`;
        return axiosClient.post(url,data)
    },
    Edit(edit){
        const url=`/events/${edit.id}`;
        return axiosClient.put(url,edit)
    },
     Delete(id){
        const url=`/events/${id}`;
        return axiosClient.delete(url)
    }
}
export default EventApi;