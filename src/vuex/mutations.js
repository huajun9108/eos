

//接收store 发送来的action  commit

export default{
    login(state,json){
        state.loginResult=json
    },
    getUser(state,json){
        state.userAll=json
    },
    delUser(state,json){
        state.userId=json
    },
    // selectGroupAll(state,json){
    //     state.groupAll=json
    // }
}