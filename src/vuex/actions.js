import axios from "axios"
import qs from 'qs'
import iView from 'iview'
axios.defaults.baseURL = "http://116.62.10.199:3002";
axios.defaults.timeout = 1000000000000;

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
            return res.data
        }).then(json => {
            commit("delUser", json)
        })
    },
    massDeleteUserByUserIds({ commit }, obj) {
        axios.post("user/massDeleteUserByUserIds ", qs.stringify({
            userIds: obj.userIds
        })).then(res => {
            return res.data
        }).then(json => {
            commit("massDeleteUserByUserIds", json)
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
            return res.data
        }).then(json => {
            commit("updateUserPsdById", json)

        }).catch(error => {
            console.log(error);
        })
    },
    selectAreaAll({ commit }, obj) {
        axios.get("/areaAllSet/showAreaAll", {}).then(res => {
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
            return res.data
        }).then(json => {
            commit("deleteArea", json)
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
            return res.data.data
        }).then(json => {
            commit("selectLossAll", json)
        })
    },
    addLossOne({ commit }, obj) {
        axios.post("/losscategory/addLossOne", qs.stringify({
            "name": obj.name,
            "pId": obj.pId
        })).then(res => {
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
            return res.data
        }).then(json => {
            commit("updateUserKpiTwolveById", json)
        }).catch(err => {
            console.log(err)
        })
    },
    showImpItempool({ commit }, obj) {
        axios.post("/impobject/showImpItempool", qs.stringify({
            "userId": obj.userid
        })).then(res => {
            return res.data
        }).then(json => {
            commit("showImpItempool", json)
        }).catch(err => {
            console.log(err)
        })

    },
    showObjectnowBylinedyid({ commit }, obj) {
        axios.post("/impobject/showObjectnowBylinedyid", qs.stringify({
            "linebodyId": obj.linebodyId
        })).then(res => {
            return res.data.data
        }).then(json => {
            commit("showObjectnowBylinedyid", json)
        }).catch(err => {
            console.log(err)
        })
    },
    showImpItemstatus({ commit }, obj) {
        axios.post("/impobject/showImpItemstatus", qs.stringify({
            "lossId": obj.lossId,
            "linebodyId": obj.linebodyId
        })).then(res => {
            return res.data
        }).then(json => {
            commit("showImpItemstatus", json)
        }).catch(err => {
            console.log(err)
        })
    },
    updateImpItemstatus({ commit }, obj) {
        axios.post("/impobject/updateImpItemstatus ", qs.stringify({
            "id": obj.id,
            "linebodyId": obj.linebodyId,
            "projectnumber": obj.projectnumber,
            "projectname": obj.projectname,
            "losscategory": obj.losscategory,
            "status": obj.status,
            "startperformance": obj.startperformance,
            "target": obj.target,
            "performance": obj.performance,
            "objectstarttime": obj.objectstarttime,
            "planendtime": obj.planendtime,
            "stage": obj.stage,
        })).then(res => {
            return res.data
        }).then(json => {
            commit("updateImpItemstatus", json)
        }).catch(err => {
            console.log(err)
        })
    },
    addObjectnowBylossid({ commit }, obj) {
        axios.post("/impobject/addObjectnowBylossid ", qs.stringify({
            "lossIdList": obj.lossId,
            "linebodyId": obj.linebodyId
        })).then(res => {
            return res.data
        }).then(json => {
            commit("addObjectnowBylossid", json)
        }).catch(err => {
            console.log(err)
        })
    },
    deleteObjectnowBylossid({ commit }, obj) {
        axios.post("/impobject/deleteObjectnowBylossid", qs.stringify({
            "lossId": obj.lossId,
            "linebodyId": obj.linebodyId
        })).then(res => {
            return res.data
        }).then(json => {
            commit("deleteObjectnowBylossid", json)
        }).catch(err => {
            console.log(err)
        })
    },
    selectLossmappingByTimesAndLinebodys({ commit }, obj) {
        iView.Spin.show()
        axios.post('/lossmapping/selectLossmappingByTimesAndLinebodys', qs.stringify({
            "userId": obj.userId,
            "linebodyIds": obj.linebodyIds,
            "startTime": obj.startTime,
            "endTime": obj.endTime
        })).then(res => {
            iView.Spin.hide()
            return res.data
        }).then(json => {
            commit("selectLossmappingByTimesAndLinebodys", json)
        })

    },
    updateLinebodyWeightById({ commit }, obj) {
        axios.post("/linebodySet/updateLinebodyWeightById", qs.stringify({
            "linebodyId": obj.linebodyId,
            "weight": obj.weight
        })).then(res => {
            return res.data
        }).then(json => {
            commit("updateLinebodyWeightById", json)
        })
    },

    showLosstier3({ commit }, obj) {
        axios.post("/datainput/showLosstier3", qs.stringify({
            "twolevName": obj.twolevName
        })).then(res => {
            return res.data
        }).then(json => {
            commit("showLosstier3", json)
        })
    },

    addLosstier4time2({ commit }, obj) {
        axios.post("/datainput/addLosstier4time2", qs.stringify({
            "classinfId": obj.classinfId,
            "twolevName": obj.twolevName,
            "losstier3Id": obj.losstier3Id,
            "losstier4Id": obj.losstier4Id,
            "linebodyId": obj.linebodyId,
            "starttime": obj.starttime,
            "endtime": obj.endtime
        })).then(res => {
            return res.data
        }).then(json => {
            commit("addLosstier4time2", json)
        })
    },
    showKpitwolev({ commit }, obj) {
        axios.post("/datainput/showKpitwolev", qs.stringify({
            "userId": obj.userId
        })).then(res => {
            return res.data
        }).then(json => {
            commit("showKpitwolev", json)
        })
    },
    selectProjectStateByTimeAndLinebodyIds({ commit }, obj) {
        axios.post("/summary/selectProjectStateByTimeAndLinebodyIds", qs.stringify({
            linebodyIds: obj.linebodyIds,
            time: obj.time,
        })).then(res => {
            return res.data
        }).then(json => {
            commit("selectProjectStateByTimeAndLinebodyIds", json)
        })
    },
    addClassinf({ commit }, obj) {
        axios.post("/datainput/addClassinf", qs.stringify({
            "classStarttime": obj.classStarttime,
            "classEndtime": obj.classEndtime,
            "shouldAttendance": obj.shouldAttendance,
            "actualAttendance": obj.actualAttendance,
            "linebodyId": obj.linebodyId
        })).then(res => {
            return res.data
        }).then(json => {
            commit("addClassinf", json)
        })
    },
    addProduct({ commit }, obj) {
        axios.post("/datainput/addProduct", qs.stringify({
            "classinfId": obj.classinfId,
            "productNameId": obj.productNameId,
            "conformProduct": obj.conformProduct,
            "linebodyId": obj.linebodyId
        })).then(res => {
            return res.data
        }).then(json => {
            commit("addProduct", json)
        })
    },
    showProduct({ commit }, obj) {
        axios.post("/datainput/showProduct", qs.stringify({
            "classinfId": obj.classinfId,
            "linebodyId": obj.linebodyId
        })).then(res => {
            return res.data
        }).then(json => {
            commit("showProduct", json)
        })
    },
    updateObjectimeAfteradd({ commit }, obj) {
        axios.post("/datainput/updateObjectimeAfteradd", qs.stringify({
            "losstier4DataidList": obj.losstier4Dataid,
            "starttime": obj.starttime,
            "endtime": obj.endtime,
            "classinfId": obj.classinfId,
            "linebodyId": obj.linebodyId
        })).then(res => {
            return res.data
        }).then(json => {
            commit("updateObjectimeAfteradd", json)
        })
    },
    showProductName({ commit }, obj) {
        axios.post("/datainput/showProductName", qs.stringify({
            "linebodyId": obj.linebodyId
        })).then(res => {
            return res.data
        }).then(json => {
            commit("showProductName", json)
        })
    },
    deleteProduct({ commit }, obj) {
        axios.post("/datainput/deleteProduct", qs.stringify({
            "productId": obj.productId,
            "classinfId": obj.classinfId,
            "linebodyId": obj.linebodyId
        })).then(res => {
            return res.data
        }).then(json => {
            commit("deleteProduct", json)
        })
    },
    updateProduct({ commit }, obj) {
        axios.post("/datainput/updateProduct", qs.stringify({
            "productId": obj.productId,
            "conformProduct": obj.conformProduct,
            "classinfId": obj.classinfId,
            "linebodyId": obj.linebodyId
        })).then(res => {
            return res.data
        }).then(json => {
            commit("updateProduct", json)
        })
    },
    deleteLoss4data({ commit }, obj) {
        axios.post("/datainput/deleteLoss4data", qs.stringify({
            "losstier4DataidList": obj.losstier4DataidList
        })).then(res => {
            return res.data
        }).then(json => {
            commit("deleteLoss4data", json)
        })
    },
    selectProductAll({ commit }, obj) {
        axios.get("/product/selectProductAll", {}).then(res => {
            return res.data.data
        }).then(json => {
            commit("selectProductAll", json)
        })
    },
    addProductOne({ commit }, obj) {
        axios.post("/product/addProductOne", qs.stringify({
            "name": obj.name,
            "pId": obj.pId
        })).then(res => {
            return res.data
        }).then(json => {
            commit("addProductOne", json)
        })
    },
    updateProductById({ commit }, obj) {
        axios.post("/product/updateProductById", qs.stringify({
            "name": obj.name,
            "id": obj.id
        })).then(res => {
            return res.data
        }).then(json => {
            commit("updateProductById", json)
        })
    },
    deleteProductById({ commit }, obj) {
        axios.post("/product/deleteProductById", qs.stringify({
            "id": obj.id
        })).then(res => {
            return res.data
        }).then(json => {
            commit("deleteProductById", json)
        })
    },
    selectProductnameById({ commit }, obj) {
        axios.post("/product/selectProductnameById", qs.stringify({
            "id": obj.id
        })).then(res => {
            return res.data
        }).then(json => {
            commit("selectProductnameById", json)
        })
    },
    updateProductnameById({ commit }, obj) {
        axios.post("/product/updateProductnameById", qs.stringify({
            "id": obj.id,
            "price": obj.price
        })).then(res => {
            return res.data
        }).then(json => {
            commit("updateProductnameById", json)
        })
    },
    showImpItemhistory({ commit }, obj) {
        axios.post("/impobject/showImpItemhistory", qs.stringify({
            "lossstatusId": obj.lossstatusId
        })).then(res => {
            return res.data
        }).then(json => {
            commit("showImpItemhistory", json)
        })
    },
    selectLinebodyProductsByLinebodyId({ commit }, obj) {
        axios.post("/areaAllSet/selectLinebodyProductsByLinebodyId", qs.stringify({
            "linebodyId": obj.linebodyId
        })).then(res => {
            return res.data
        }).then(json => {
            commit("selectLinebodyProductsByLinebodyId", json)
        })
    },
    addLinebodyProductByLinebodyId({ commit }, obj) {
        axios.post("/areaAllSet/addLinebodyProductByLinebodyId", qs.stringify({
            "linebodyId": obj.linebodyId,
            "productId": obj.productId,
            "cTime": obj.cTime
        })).then(res => {
            return res.data
        }).then(json => {
            commit("addLinebodyProductByLinebodyId", json)
        })
    },
    deleteLinebodyProductById({ commit }, obj) {
        axios.post("/areaAllSet/deleteLinebodyProductById", qs.stringify({
            "id": obj.id
        })).then(res => {
            return res.data
        }).then(json => {
            commit("deleteLinebodyProductById", json)
        })
    },
    updateLinebodyProductById({ commit }, obj) {
        axios.post("/areaAllSet/updateLinebodyProductById", qs.stringify({
            "id": obj.id,
            "productId": obj.productId,
            "cTime": obj.cTime
        })).then(res => {
            return res.data
        }).then(json => {
            commit("updateLinebodyProductById", json)
        })
    },
    selectSavingBookByTimesAndLinebodys({ commit }, obj) {
        axios.post("/savingbook/selectSavingBookByTimesAndLinebodys", qs.stringify({
            "startTime": obj.startTime,
            "endTime": obj.endTime,
            "linebodyIds": obj.linebodyIds
        })).then(res => {
            return res.data
        }).then(json => {
            commit("selectSavingBookByTimesAndLinebodys", json)
        })
    },
    selectOverviewByTimesAndLinebodys({ commit }, obj) {
        iView.Spin.show()
        axios.post("/overview/selectOverviewByTimesAndLinebodys", qs.stringify({
            "startTime": obj.startTime,
            "endTime": obj.endTime,
            "linebodyIds": obj.linebodyIds,
            "userId": obj.userId
        })).then(res => {
            iView.Spin.hide()
            return res.data
        }).then(json => {
            commit("selectOverviewByTimesAndLinebodys", json)
        })
    },
    showClassinfHistory({ commit }, obj) {
        axios.post("/datainput/showClassinfHistory", qs.stringify({
            "linebodyId": obj.linebodyId,
        })).then(res => {
            return res.data
        }).then(json => {
            commit("showClassinfHistory", json)
        })
    },
    deleteClassinfHistory({ commit }, obj) {
        axios.post("/datainput/deleteClassinfHistory", qs.stringify({
            "classinfId": obj.classinfId
        })).then(res => {
            return res.data
        }).then(json => {
            commit("deleteClassinfHistory", json)
        })
    },
    showClassinfHisRight({ commit }, obj) {
        axios.post("/datainput/showClassinfHisRight", qs.stringify({
            "classinfId": obj.classinfId,
            "userId": obj.userId,
            "linebodyId": obj.linebodyId
        })).then(res => {
            return res.data
        }).then(json => {
            commit("showClassinfHisRight", json)
        })
    }
}
