//接收store 发送来的action  commit

export default {
  adminLogin(state, json) {
    state.loginResult = json
  },
  userLogin(state, json) {
    state.loginResult = json
  },
  getUser(state, json) {
    state.userAll = json
  },
  delUser(state, json) {
    state.delUserRes = json
  },
  massDeleteUserByUserIds(state, json) {
    state.deleteUserByUserIds = json
  },
  addUser(state, json) {
    state.addResult = json
  },
  updateUserById(state, json) {

  },
  updateUserPsdById(state, json) {
    state.updatePwdResult = json
  },
  selectAreaAll(state, json) {
    state.areaAll = json
  },
  addAreaOne(state, json) {
    state.newArea = json
  },
  updateArea(state, json) {
    state.updateAreaRes = json
  },
  deleteArea(state, json) {
    state.deleteAreaRes = json
  },
  selectLossAll(state, json) {
    state.lossAll = json
  },
  addLossOne(state, json) {
    state.addLossRes = json
  },
  updateLossById(state, json) {
    state.updateLossRes = json
  },
  deleteLossById(state, json) {
    state.deleteLossRes = json
  },
  selectUserById(state, json) {
    let str = ""
    state.userinfor = json.user
    state.validarea = json.validarea
    state.tier2 = json.tier2
    state.validLeft = json.validmenu
    json.validmenu.forEach((item) => {
      if (str == null || str == '') {
        str += item.validmenuid
      } else {
        str += "," + item.validmenuid;
      }
    });
    return state.validmenu = str
  },
  showKPIALL(state, json) {
    state.kpiAll = json
  },
  addKPItwoLev(state, json) {
    state.addKpiRes = json
  },
  updateKPItwoLev(state, json) {
    state.updateKpiRes = json
  },
  deleteKPItwoLev(state, json) {
    state.delKpiRes = json
  },
  findAndCount(state, json) {
    state.count = json.count
    state.userAll = json.rows
  },
  selectLinebodyById(state, json) {
    state.lineBody = json
  },
  updateLinebodyInfById(state, json) {
    state.updatelineBodyRes = json
  },
  updateUserKpiTwolveById(state, json) {

  },
  showImpItempool(state, json) {
    state.improList = json
  },
  showObjectnowBylinedyid(state, json) {
    state.nowline = json
  },
  showImpItemstatus(state, json) {
    state.itemstatus = json[0]
    console.log(state.itemstatus)
  },
  updateImpItemstatus(state, json) {
    state.updateItemResult = json
  },
  addObjectnowBylossid(state, json) {
    state.addObject = json
  },
  deleteObjectnowBylossid(state, json) {
    state.deleteObject = json
  },
  selectAllByUserIdAndLinebodyIds(state, json) {
    state.lossmappingLinebodyAll = json
  },
  updateLinebodyWeightById(state, json) {
    state.updateLinebodyWeight = json
  },
  showLosstier3(state, json) {
    state.lossTier3 = json
  },
  addLosstier4time2(state, json) {
    state.addLosstier4time2Res = json
  },
  showKpitwolev(state, json) {
    state.kpiTwoLev = json
    let arr = []
    json.data.forEach(item => {
      let obj = {};
      obj[item] = []
      arr.push(obj)
    })
    return state.datainputLoss = arr;
    console.log(arr)
  },
  addClassinf(state, json) {
    state.addClassinfRes = json
  },
  addProduct(state, json) {
    state.addProductRes = json
  }

}
