import axios from "axios"
import qs from 'qs'


axios.defaults.baseURL = "http://116.196.113.167:3001";



export default {
    login({ commit }, obj) {
        axios.post("/admin/adminLogin", qs.stringify({
            "username": obj.user,
            "password": obj.pwd
        })).then(res => {
            return res.data
        }).then(json => {
            commit("login", json)

        })
    },
    getUser({ commit }, obj) {
        axios.get("/user/selectUserAll", {}).then(res => {
                return res.data.data
            })
            .then(json => {
                commit("getUser", json)
            })
    },
    delUser({ commit }, obj) {
        axios.get("/user/deleteUserById", {
            params: {
                userId: obj.userId
            }
        }).then(res => {
            return res.data.data
        }).then(json => {
            commit("delUser", json)
        })
    },
    // selectGroupAll ({commit},obj){
    //     axios.get("/groupset/selectGroupAll",{}
    //     ).then(res=>{
    //         console.log(res.data.data)
    //         return res.data.data.data
    //     }).then(json=>{
    //         commit("selectGroupAll",json)
    //     })
    // },
    updateGroupById({ commit }, obj) {
        axios.get("/groupset/updateGroupById ", qs.stringify({
            "groupName": ""
        })).then(res => {
            return res.data.data
        }).then(json => {
            commit("updateGroupById", json)
        })
    },
    selectFactoryAll({ commit }, obj) {
        axios.get("/factorySet/selectFactoryAll", {}).then(res => {
            return res.data.data.data
        }).then(json => {
            commit("factorySet", json)
        })
    },
    addUser({ commit }, obj) {
        axios.post("/user/addUserOne", qs.stringify({
            "userName": obj.userName,
            "userPsd": obj.userPsd,
            "userAbbName": obj.userAbbName,
            "userJob": obj.userJob,
            "userLeader": obj.userLeader,
            "validMenu":obj.validMenu
        })).then(res => {
            return res.data
        }).then(json => {
            commit("addUser", json)

        }).catch(error => {
            console.log(error);
        })
    },
    updateUserById({ commit }, obj) {
        axios.post("/user/updateUserById ", qs.stringify({
            "userId": obj.userId,
            "userName": obj.userName,
            "userPsd": obj.userPsd,
            "userAbbName": obj.userAbbName,
            "userJob": obj.userJob,
            "userLeader": obj.userLeader,
            "validMenu":obj.validMenu
        })).then(res => {
            return res.data
        }).then(json => {
            commit("updateUserById", json)

        }).catch(error => {
            console.log(error);

        })
    },
    selectAreaAll({ commit }, obj) {
        axios.get("/groupset/selectAreaAll", {}).then(res => {
            return res.data
        }).then(json => {
            commit("selectAreaAll", json)
        })
    },
    selectUserById({ commit }, obj) {
        axios.post("/user/selectUserById", qs.stringify({
            "userId": obj.userid
        })).then(res => {
            return res.data.data
        }).then(json => {
            commit("selectUserById", json)

        })
    },

 
}