<template>
<div class="mainaccount">
  <br/>
    <div class="fixed-table-toolbar oper">
        <span class="add" @click="add">
            <i class="icon-add"></i>
            新建
        </span>
        <span class="delA" @click="dellALL" >
            <i class="icon-delete"></i>
            批量删除
        </span>
    </div>
    <br/>
    <table class="table table-hover table-bordered text-center">
        <thead>
        <tr>
            <td width="5%"><input type="checkbox" id="checkbox-1" v-model="checkedAll" class="checkone" @click="changeAllChecked()"/>
            <label for="checkbox-1"></label>
            </td>
            <td width="10%">编号</td>
            <td width="15%">用户账号</td>
            <td width="15%">姓名</td>
            <td width="15%">密码</td>
            <td width="10%">职位</td>
            <td width="15%">上司</td>
            <td width="15%" colspan="2">操作</td>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(item,idx) in userAll" :key="idx">
                <td><input type="checkbox" v-model="checkedUserArr"  :value="item.userid" :id="'checkbox'+idx" class="checkone">
                <label :for="'checkbox'+idx"></label>
                </td>
                <td>{{idx+1}}</td>
                <td>{{item.username}}</td>
                <td>{{item.userabbname}}</td>
                <td>{{item.userpsd}}</td>
                <td>{{item.userjob}}</td>
                <td>{{item.userleader}}</td>
                <td class="icon-edit" :data="item.userid" @click="goAccountInfo({userId:item.userid})"></td>
                <td class="icon-delete_2" :data="item.userid" @click="del({id:idx,userId:item.userid,name:item.username})"></td>
            </tr>
        </tbody>
    </table>

    <!-- <ul class="pagination">
    <label>当前第</label><label v-text="this.current"></label><label>页</label>
    <li :class="{'disabled': current == 1}" @click="firstPage()">首页</li>
    <label @click="prevPage()">上一页</label>
    <label @click="nextPage()">下一页</label>
    <label @click="lastPage()">尾页</label>
    </ul> -->
    <v-pagination :total="total" :current-page="current" :display="display" class="pull-right" @pagechange="onPagechange"></v-pagination> 
</div>
</template>

<script type="text/javascript">
import axios from "axios";
import $ from "jquery";
window.$ = $;
import { mapState, mapActions } from "vuex";
import pagination from "../components/bootpage";
export default {
  components: {
    "v-pagination": pagination
  },
  data() {
    return {
      validmenu:[],
      userAll: [],
      checkedUserArr:[],
      selected: [],
      checkedAll:false,
      checkModel: [],
      selectCity: "overview",
      fDisabled: false,
      lDisabled: false,
      arrayData: [],
      total: null,     // 记录总条数
      display:10,   // 每页显示条数
      current: 1     // 当前第n页 ， 也可以 watch current 的变化 
    };
  },
  computed: {
    ...mapState([
      "count",
    ]),
  },
  methods: {
    ...mapActions([
      "delUser",
      "findAndCount"
      ]),
      onPagechange:function(currentPage){
       console.log(currentPage);
       // 请求, 向后台发送 currentPage, 来获取对应的数据
       axios.get("/user/findAndCount?page="+currentPage).then(res => {
        this.total=res.data.data.count;
        this.userAll=[];
        this.checkedUserArr=[];
        return (
            res.data.data.rows.forEach(item=>{          
              this.userAll.push(item);
            })
        ); 
      }).catch(error => {
        console.log(error);
      });

     },
    changeAllChecked(){
      var _this = this;
      console.log(_this.checkedUserArr);
      //alert(this.checked);
      if (this.checkedAll) {//实现反选
        _this.checkedUserArr = [];
      }else{//实现全选
        _this.checkedUserArr = [];
        _this.userAll.forEach(function(item) {
          _this.checkedUserArr.push(item.userid);
        });
      }
    },
    goAccountInfo(obj) {
      this.$router.push({ name: "accountInfo", query: { userid: obj.userId } });
    },
    add() {
      this.$router.push({ name: "accountInfo" });
    },
    del(obj) {
      var _this= this
      Ewin.confirm({ message: "确认要删除用户"+obj.name+"吗？" }).on(function (e) {
          if (!e) {
              return;
          }
          //that.userAll.splice(obj.id, 1);
          _this.delUser({ userId: obj.userId });
          _this.loadList();
          _this.onPagechange(1)
          _this.$message.success('删除'+obj.name+'成功');
      });
    },
    dellALL() {
      var _this= this
      Ewin.confirm({ message: "确认要删除选择的数据吗？" }).on(function (e) {
          for (var i = _this.checkedUserArr.length - 1; i >= 0; i--) {
              var userId = _this.checkedUserArr[i];
              //that.userAll.splice(userId, 1);
              _this.delUser({ userId:userId });
              _this.loadList();
          }   
      });
    },
    // firstPage:function() {
    //   this.current = 1;
    //   this.loadList();
    // },
    // prevPage:function() {
    //   if(this.current && this.current>1) {
    //      this.current = this.current-1;
    //   }      
    //   this.loadList();
    // },
    // nextPage:function() {
    //   if(this.current && this.current<Math.ceil(this.total/5)) {
    //      this.current = this.current+1;
    //   }      
    //   this.loadList();
    // },
    // lastPage:function() {
    //   this.current = Math.ceil(this.total/5);
    //   this.loadList();
    // },
    loadList:function() {
      axios.get("/user/findAndCount?page="+this.current).then(res => {
        this.total=res.data.data.count;
        this.userAll=[];
        this.checkedUserArr=[];
        return (
            res.data.data.rows.forEach(item=>{ 
              this.userAll.push(item);
            })
        ); 
      }).catch(error => {
        console.log(error);
      });
    },
  },
  watch: {
    checkedUserArr:{
      handler: function (val, oldVal) { 
        if (this.checkedUserArr.length === this.userAll.length) {
          this.checkedAll=true;
        }else{
          this.checkedAll=false;
        }
      },
      deep: true
    }
  },
  mounted() {
    this.loadList();
  }
};
</script>

<style lang="scss" scoped>
</style>  