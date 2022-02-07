import axiosClient from "./axiosClient";
const TeamApi={
    getAll(){
        const url=`/teams`;
        return axiosClient.get(url)
    },
    get(id){
        const url=`/teams/${id}`;
        return axiosClient.get(url)
    },
    create(data){
        const url=`/teams`;
        return axiosClient.post(url,data)
    },
    Edit(edit){
        const url=`/teams/${edit.id}`;
        return axiosClient.put(url,edit)
    },
     Delete(id){
        const url=`/teams/${id}`;
        return axiosClient.delete(url)
    }
}
export default TeamApi;