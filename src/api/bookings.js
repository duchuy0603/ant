import axiosClient from "./axiosClient";
const BookingApi={
    getAll(){
        const url=`/bookings`;
        return axiosClient.get(url)
    },
    get(id){
        const url=`/bookings/${id}`;
        return axiosClient.get(url)
    },
    create(data){
        const url=`/bookings`;
        return axiosClient.post(url,data)
    },
    Edit(edit){
        const url=`/bookings/${edit.id}`;
        return axiosClient.put(url,edit)
    },
     Delete(id){
        const url=`/bookings/${id}`;
        return axiosClient.delete(url)
    }
}
export default BookingApi;