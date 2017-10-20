

//接收store 发送来的action  commit

export default{
    login(state,json){
        state.loginResult=json
    },
    getUser(state,json){
        state.userAll=json
    },
    selectUserById (state,json){
        state.user=json
        console.log(state.user)
    },
}