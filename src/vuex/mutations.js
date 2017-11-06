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
        state.userId = json
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
    selectUserById(state, json) {
        let str = ""
        state.userinfor = json.user
        state.validarea = json.validarea
        state.tier2 = json.tier2
        json.validmenu.forEach((item) => {
            if (str == null || str == '') {
                str += item.validmenuid
            } else {
                str += "," + item.validmenuid;
            }
        });
        return state.validmenu = str
    },
    selectKPIALL(state, json) {
        state.kpiAll = json
    },
    addFactoryOne(state, json) {},
    findAndCount(state, json) {
        // let arr = []
        state.count = json.count
        state.userAll = json.rows
            // json.rows.forEach((item) => {
            //     arr.push(item)
            // });
            // return state.userAll = arr
    },
    addFactoryOne(state, json) {
        state.newArea = json
    },
    updateArea(state, json) {},
    updateKPItwoLev(state, json) {},
    selectLinebodyById(state, json) {
        state.lineBody = json
    },
    updateLinebodyInfById(state, json) {

    },
    updateUserKpiTwolveById(state, json) {

    }
}