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
        json.validmenu.forEach((item) => {
            if (str == null || str == '') {
                str += item.validmenuid
            } else {
                str += "," + item.validmenuid;
            }
        });
        console.log(str)
        return state.validmenu = str
    },
    selectKPIALL(state, json) {
        state.kpiAll = json
    }
}