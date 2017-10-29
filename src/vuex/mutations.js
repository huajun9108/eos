//接收store 发送来的action  commit

export default {
    login(state, json) {
        state.loginResult = json
    },
    getUser(state, json) {
        state.userAll = json
    },
    delUser(state, json) {
        state.userId = json
    },
    addUser(state, json) {

    },
    updateUserById(state, json) {

    },
    selectAreaAll(state, json) {
        state.areaAll = json
    },
    selectUserById(state, json) {
        let str = ""
        state.userinfor = json.user
        state.validarea = json.validarea
        // console.log(state.validarea)
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
    addFactoryOne(state, json) {
        state.newArea = json
    },
    updateArea(state, json) {
    }
}
