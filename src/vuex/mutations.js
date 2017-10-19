

//接收store 发送来的action  commit

export default{
    login(state,json){
        state.loginResult=json
    },
}