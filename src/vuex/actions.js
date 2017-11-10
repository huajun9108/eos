import axios from "axios"
import qs from 'qs'

axios.defaults.baseURL = "http://116.62.10.199:3001";

export default {
    adminLogin({ commit }, obj) {
        axios.post("/admin/adminLogin", qs.stringify({
            "adminName": obj.user,
            "adminPsd": obj.pwd
        })).then(res => {
            return res.data
        }).then(json => {
            commit("adminLogin", json)

        })
    },
    userLogin({ commit }, obj) {
        axios.post("/user/userLogin ", qs.stringify({
            "userName": obj.user,
            "userPsd": obj.pwd
        })).then(res => {
            return res.data
        }).then(json => {
            commit("userLogin", json)

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
        axios.post("/user/addUserOne ", qs.stringify({
            "userName": obj.userName,
            "userPsd": obj.userPsd,
            "userAbbName": obj.userAbbName,
            "userJob": obj.userJob,
            "userLeader": obj.userLeader,
            "validMenu": obj.validMenu,
            "validArea": obj.validArea,
        })).then(res => {
            console.log(res.data)
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
            "validMenu": obj.validMenu,
            "validArea": obj.validArea
        })).then(res => {
            console.log(res.data)
            return res.data
        }).then(json => {
            commit("updateUserById", json)

        }).catch(error => {
            console.log(error);
        })
    },
    updateUserPsdById({ commit }, obj) {
        axios.post("/user/updateUserPsdById  ", qs.stringify({
            "userId": obj.userId,
            "userPsd": obj.userPsd,
            "userNewPsd": obj.userNewPsd,
        })).then(res => {
            console.log(res.data)
            return res.data
        }).then(json => {
            commit("updateUserPsdById", json)

        }).catch(error => {
            console.log(error);
        })
    },
    selectAreaAll({ commit }, obj) {
        axios.get("/areaAllSet/showAreaAll", {}).then(res => {
            console.log(res.data)
            return res.data
        }).then(json => {
            commit("selectAreaAll", json)
        })
    },
    selectUserById({ commit }, obj) {
        axios.post("/user/selectUserById", qs.stringify({
            "userId": obj.userid
        })).then(res => {
            console.log(res.data.data)
            return res.data.data
        }).then(json => {
            commit("selectUserById", json)

        })
    },
    selectKPIALL({ commit }, obj) {
        axios.get("/KPISet/showKPIAll ", {}).then(res => {
            console.log(res.data)
            return res.data
        }).then(json => {
            commit("selectKPIALL", json)
        })
    },
    addFactoryOne({ commit }, obj) {
        axios.post("/areaAllSet/addAreaOne", qs.stringify({
            "name": obj.name,
            "pId": obj.pId,
        })).then(res => {
            console.log(res.data)
            return res.data
        }).then(json => {
            commit("addFactoryOne", json)
        }).catch(error => {
            console.log(error);
        })
    },
    findAndCount({ commit }, obj) {
        axios.get("/user/findAndCount", {
            params: {
                page: obj.page
            }
        }).then(res => {
            console.log(res.data.data)
            return res.data.data
        }).then(json => {
            commit("findAndCount", json)
        }).catch(err => {
            console.log(err)
        })
    },
    updateArea({ commit }, obj) {
        axios.post("/areaAllSet/updateArea", qs.stringify({
            "name": obj.name,
            "pId": obj.pId,
            "id": obj.id,
        })).then(res => {
            // console.log(res.data)
            return res.data
        }).then(json => {
            commit("updateArea", json)
        }).catch(error => {
            console.log(error);
        })
    },
    updateKPItwoLev({ commit }, obj) {
        axios.post("/KPISet/updateKPItwoLev", qs.stringify({
            "name": obj.name,
            "pId": obj.pId,
            "id": obj.id,
        })).then(res => {
            // console.log(res.data)
            return res.data
        }).then(json => {
            commit("updateKPItwoLev", json)
        }).catch(error => {
            console.log(error);
        })
    },
    selectLinebodyById({ commit }, obj) {
        axios.post("/linebodySet/selectLinebodyById ", qs.stringify({
            "id": obj.id
        })).then(res => {
            console.log(res.data)
            return res.data
        }).then(json => {
            commit("selectLinebodyById", json)
        }).catch(err => {
            console.log(err)
        })
    },
    updateLinebodyInfById({ commit }, obj) {
        axios.post("/linebodySet/updateLinebodyInfById ", qs.stringify({
            "id": obj.id,
            "targetValue": obj.targetValue,
            "targetStrattime": obj.targetStrattime,
            "targetEndtime": obj.targetEndtime,
            "visionValue": obj.visionValue,
            "visionStrattime": obj.visionStrattime,
            "visionEndtime": obj.visionEndtime,
            "idealValue": obj.idealValue,
            "idealStrattime": obj.idealStrattime,
            "idealEndtime": obj.idealEndtime
        })).then(res => {
            console.log(res.data)
            return res.data
        }).then(json => {
            commit("updateLinebodyInfById", json)
        }).catch(err => {
            console.log(err)
        })
    },
    updateUserKpiTwolveById({ commit }, obj) {
        axios.post("/user/updateUserKpiTwolveById ", qs.stringify({
            "userId": obj.userId,
            "changeId": obj.changeId,
            "changedId": obj.changedId,
            "changeOrder": obj.changeOrder,
            "changedOrder": obj.changedOrder
        })).then(res => {
            console.log(res.data)
            return res.data
        }).then(json => {
            commit("updateUserKpiTwolveById", json)
        }).catch(err => {
            console.log(err)
        })
    },
    showImpItempool({ commit }, obj) {
        axios.get("/impobject/showImpItempool", {

        }).then(res => {
            console.log(res.data)
            return res.data
        }).then(json => {
            commit("showImpItempool", json)
        }).catch(err => {
            console.log(err)
        })
    },
    selectLossmappingLinebody({ commit }, obj) {
      axios.get("/lossmapping/linebody", {}).then(res => {
          console.log(res.data.data)
          return res.data.data
      }).then(json => {
          commit("selectLossmappingLinebody", json)
      })
    }
}
