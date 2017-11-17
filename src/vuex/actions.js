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
            console.log(res.data)
            return res.data
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
            // console.log(res.data)
            return res.data
        }).then(json => {
            commit("selectAreaAll", json)
        })
    },
    addAreaOne({ commit }, obj) {
        axios.post("/areaAllSet/addAreaOne", qs.stringify({
            "name": obj.name,
            "pId": obj.pId,
        })).then(res => {
            console.log(res.data)
            return res.data
        }).then(json => {
            commit("addAreaOne", json)
        }).catch(error => {
            console.log(error);
        })
    },
    updateArea({ commit }, obj) {
        axios.post("/areaAllSet/updateArea", qs.stringify({
            "name": obj.name,
            "pId": obj.pId,
            "id": obj.id,
        })).then(res => {
            console.log(res.data)
            return res.data
        }).then(json => {
            commit("updateArea", json)
        }).catch(error => {
            console.log(error);
        })
    },
    deleteArea({ commit }, obj) {
        axios.get("/areaAllSet/deleteArea", {
            params: {
                id: obj.id
            }
        }).then(res => {
            console.log(res.data)
            return res.data
        }).then(json => {
            commit("deleteArea", json)
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
    showKPIALL({ commit }, obj) {
        axios.get("/KPISet/showKPIAll", {}).then(res => {
            return res.data
        }).then(json => {
            commit("showKPIALL", json)
        })
    },
    addKPItwoLev({ commit }, obj) {
        axios.post("/KPISet/addKPItwoLev", qs.stringify({
            "name": obj.name,
            "pId": obj.pId,
        })).then(res => {
            console.log(res.data);
            return res.data
        }).then(json => {
            commit("addKPItwoLev", json)
        }).catch(error => {
            console.log(error)
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
    deleteKPItwoLev({ commit }, obj) {
        axios.get("/KPISet/deleteKPItwoLev", {
            params: {
                id: obj.id
            }
        }).then(res => {
            return res.data
        }).then(json => {
            commit("deleteKPItwoLev", json)
        })
    },
    selectLossAll({ commit }, obj) {
        axios.get("/losscategory/selectLossAll", {}).then(res => {
            return res.data
        }).then(json => {
            commit("selectLossAll", json)
        })
    },
    addLossOne({ commit }, obj) {
        axios.post("/losscategory/addLossOne", qs.stringify({
            "name": obj.name,
            "pId": obj.pId
        })).then(res => {
            console.log(res.data)
            return res.data
        }).then(json => {
            commit("addLossOne", json)
        }).catch(err => {
            console.log(err)
        })
    },
    updateLossById({ commit }, obj) {
        axios.post("/losscategory/updateLossById", qs.stringify({
            "id": obj.id,
            "name": obj.name,
            "pId": obj.pId
        })).then(res => {
            return res.data
        }).then(json => {
            commit("updateLossById", json)
        }).catch(err => {
            console.log(err)
        })
    },
    deleteLossById({ commit }, obj) {
        axios.get("/losscategory/deleteLossById", {
            params: {
                id: obj.id
            }
        }).then(res => {
            return res.data
        }).then(json => {
            commit("deleteLossById", json)
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
        axios.post("/impobject/showImpItempool", qs.stringify({
            "linebodyId": 6
        })).then(res => {
            console.log(res.data)
            return res.data
        }).then(json => {
            commit("showImpItempool", json)
        }).catch(err => {
            console.log(err)
        })

    },
    showObjectnowBylinedyid({ commit }, obj) {
        axios.post("/impobject/showObjectnowBylinedyid", qs.stringify({
            "linebodyId": 6
        })).then(res => {
            console.log(res.data)
            return res.data
        }).then(json => {
            commit("showObjectnowBylinedyid", json)
        }).catch(err => {
            console.log(err)
        })
    },
    showImpItemstatus({ commit }, obj) {
        axios.post("/impobject/showImpItemstatus", qs.stringify({
            "lossId": obj.lossId
        })).then(res => {
            console.log(res.data.data)
            return res.data.data
        }).then(json => {
            commit("showImpItemstatus", json)
        }).catch(err => {
            console.log(err)
        })
    },
    updateImpItemstatus({ commit }, obj) {
        axios.post("/impobject/updateImpItemstatus ", qs.stringify({
            "lossId": obj.lossId,
            "status": obj.status,
            "projectNumber": obj.projectNumber,
            "projectName": obj.projectName,
            "areaBlong": obj.areaBlong,
            "projectMethod": obj.projectMethod,
            "projectManager": obj.projectManager,
            "teamMember": obj.teamMember,
            "planStart": obj.planStart,
            "actualStart": obj.actualStart,
            "planEnd": obj.planEnd,
            "actualEnd": obj.actualEnd,
            "target": obj.target,
            "actualValue": obj.actualValue
        })).then(res => {
            console.log(res)
            return res.data.data
        }).then(json => {
            commit("updateImpItemstatus", json)
        }).catch(err => {
            console.log(err)
        })
    },
    addObjectnowBylossid({ commit }, obj) {
        axios.post("/impobject/addObjectnowBylossid ", qs.stringify({
            "lossIdList": obj.lossId,
        })).then(res => {
            console.log(res)
            return res.data.data
        }).then(json => {
            commit("addObjectnowBylossid", json)
        }).catch(err => {
            console.log(err)
        })
    },
    deleteObjectnowBylossid({ commit }, obj) {
        axios.post("/impobject/deleteObjectnowBylossid", qs.stringify({
            "lossId": obj.lossId,
        })).then(res => {
            console.log(res)
            return res.data.data
        }).then(json => {
            commit("deleteObjectnowBylossid", json)
        }).catch(err => {
            console.log(err)
        })
    },
    selectAllByUserIdAndLinebodyIds({ commit }, obj) {
        axios.post("/lossmapping/selectAllByUserIdAndLinebodyIds", qs.stringify({
            "userId": obj.userId,
            "linebodyIds": obj.linebodyIds
        })).then(res => {
            // console.log(JSON.stringify(res.data , null , 4))
            return res.data
        }).then(json => {
            commit("selectAllByUserIdAndLinebodyIds", json)
        })
    }
}