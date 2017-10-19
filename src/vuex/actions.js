
import axios from "axios"
import qs from 'qs'
console.log(qs)


axios.defaults.baseURL = "http://116.196.113.167:3001"; 



export default{
    login({commit},obj){
    axios.post("/admin/adminLogin",qs.stringify({
        "username": obj.user,
        "password": obj.pwd
    })
    ).then(res=>{
            console.log(res.data)
            return res.data
        })
        .then(json=>{
            commit("login",json)
            
        })
    },
}