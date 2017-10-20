
import axios from "axios"
import qs from 'qs'


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
        }).then(json=>{
            commit("login",json)
            
        })
    },
    getUser({commit},obj){
        axios.get("/user/selectUserAll",{}
        ).then(res=>{
            console.log(res.data.data)
            return res.data.data
        })
        .then(json=>{
            commit("getUser",json)    
        })
    },
    selectUserById ({commit},obj){
        axios.post("/user/selectUserById ",qs.stringify({
            "userId":obj.userId,
        })
        ).then(res=>{
            console.log(res.data.data)
            return res.data.data
        }).then(json=>{
            commit("selectUserById",json)    
        })
    },
}