<template>
<div class="account">
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
            <td><input type="checkbox" id="checkbox-1" v-model="checkedAll"/>
            <label for="checkbox-1"></label></td>
            <td>编号</td>
            <td>用户账号</td>
            <td>姓名</td>
            <td>密码</td>
            <td>职位</td>
            <td>上司</td>
            <td>有效菜单</td>
            <td>可视区域范围</td>
            <td  colspan="2">操作</td>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(item,idx) in userAll" :key="idx">
                <td><input type="checkbox" v-model="item.check" :value="item.userid" :id="'checkbox'+idx" :class="item.check?'check':'uncheck'">
                <label :for="'checkbox'+idx"></label></td>
                <td>{{idx+1}}</td>
                <td>{{item.username}}</td>
                <td>{{item.userabbname}}</td>
                <td>{{item.userpsd}}</td>
                <td>{{item.userjob}}</td>
                <td>{{item.userleader}}</td>
                <td>{{item.userleader}}</td>
                <td>{{item.userleader}}</td>
                <td class="icon-edit" :data="item.userid" @click="goAccountInfo({userId:item.userid})"></td>
                <td class="icon-delete_2" :data="item.userid" @click="del({id:idx,userId:item.userid})"></td>
            </tr>
        </tbody>
    </table>
    <v-pagination :total="total" :current.sync="current" class="pull-right"></v-pagination>
    <!-- <div class="pager pull-right" id="pager"> -->
          <!-- <span class="form-inline">
            <select class="form-control" v-model="pagesize" v-on:change="showPage(pageCurrent,$event,true)" number>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
            </select>
          </span> -->
          <!-- <span v-for="(item,idx) in pageCount+1" :key="idx">
            <span v-if="item==1" class="btn btn-sm btn-default" v-on:click="showPage(1,$event)" :class="{'disabled':fDisabled}">
              首页
            </span>
            <span v-if="item==1" class="btn btn-sm btn-default" v-on:click="showPage(pageCurrent-1,$event)" :class="{'disabled':fDisabled}">
              上一页
            </span>
            <span v-if="item==1" class="btn btn-sm btn-default" v-on:click="showPage(item,$event)">
              {{item}}
            </span>
            <span v-if="item==1&&item<showPagesStart-1" class="btn btn-sm btn-default disabled">
              ...
            </span>
            <span v-if="item>1&&item<=pageCount-1&&item>=showPagesStart&&item<=showPageEnd&&item<=pageCount" class="btn btn-sm btn-default" v-on:click="showPage(item,$event)">
              {{item}}
            </span>
            <span v-if="item==pageCount&&item>showPageEnd+1" class="btn btn-sm btn-default disabled">
              ...
            </span>
            <span v-if="item==pageCount" class="btn btn-sm btn-default" v-on:click="showPage(item,$event)" >
              {{item}}
            </span>
            <span v-if="item==pageCount" class="btn btn-sm btn-default" v-on:click="showPage(pageCurrent+1,$event)" :class="{'disabled':lDisabled}">
              下一页
            </span>
            <span v-if="item==pageCount" class="btn btn-sm btn-default" v-on:click="showPage(pageCount,$event)" :class="{'disabled':lDisabled}">
              尾页
            </span>
          </span>
          <span>{{pageCurrent}}/{{pageCount}}</span>
    </div> -->
</div>
</template>

<script type="text/javascript">
import axios from "axios";
import qs from "qs";
import $ from "jquery";
window.$ = $;
import { mapState, mapActions } from "vuex";
import pagination from "../components/pager";
export default {
  components: {
    "v-pagination": pagination
  },
  data() {
    return {
      validmenu:[],
      userAll: [],
      selected: [],
      // checkedAll:"",
      checkModel: [],
      selectCity: "overview",
      fDisabled: false,
      lDisabled: false,
      arrayData: [],
      total: 81, // 记录总条数
      display: 10, // 每页显示条数
      current: 1 // 当前第n页 ， 也可以 watch current 的变化
    };
  },
  computed: {
    ...mapState([]),
    checkedAll: {
      //  只要有一个为false就是 没有全选 返回  false
      //  getter
      get() {
        var flag = true;
        this.userAll.forEach(item => {
          if (!item.check) {
            flag = false;
          }
        });
        return flag;
      },
      set(newValue) {
        //  set 这个计算属性值改变时触发
        console.log(newValue);
        this.userAll.forEach(item => {
          item.check = newValue;
        });
      }
    }
  },
  methods: {
    ...mapActions(["delUser"]),

    goAccountInfo(obj) {
      this.$router.push({ name: "accountInfo", query: { userid: obj.userId } });
    },
    add() {
      this.$router.push({ name: "accountInfo" });
    },
    del(obj) {
      if (confirm("确定要删除吗?")) {
        this.userAll.splice(obj.id, 1); //
        this.delUser({ userId: obj.userId });
      } else {
      }
    },
    dellALL() {
      console.log(1);
      var that = this;
      for (var i = that.userAll.length - 1; i >= 0; i--) {
        var index = that.userAll[i];
        if (index.check) {
          that.userAll.splice(i, 1);
        }
      }
    },
    pagechange: function(currentPage) {
      console.log(currentPage);
      // ajax请求, 向后台发送 currentPage, 来获取对应的数据
    },
    removeUsers() {
      this.$confirm("此操作将永久删除 " + this.selected.length + " 个用户, 是否继续?", "提示", {
        type: "warning"
      }).then(() => {
        console.log(this.selected);
        var ids = [];
        //提取选中项的id
        $.each(this.selected, (i, user) => {
          ids.push(user.id);
        });
        // 向请求服务端删除
        //     var resource = this.$resource(this.url);
        //     resource.remove({ids: ids.join(",") })
        //         .then((response) => {
        //             this.$message.success('删除了' + this.selected.length + '个用户!');
        //             this.getUsers();
        //         })
        //         .catch((response) => {
        //             this.$message.error('删除失败!');
        //     });
        // })
        // .catch(() => {
        // this.$Message('已取消操作!');
      });
    },
    showPage(pageIndex, $event, forceRefresh) {
      if (pageIndex > 0) {
        if (pageIndex > this.pageCount) {
          pageIndex = this.pageCount;
        }
        //判断数据是否需要更新
        var currentPageCount = Math.ceil(this.totalCount / this.pagesize);
        if (currentPageCount != this.pageCount) {
          pageIndex = 1;
          this.pageCount = currentPageCount;
        } else if (
          this.pageCurrent == pageIndex &&
          currentPageCount == this.pageCount &&
          typeof forceRefresh == "undefined"
        ) {
          console.log("not refresh");
          return;
        }
        //处理分页点中样式
        var buttons = $("#pager").find("span");
        for (var i = 0; i < buttons.length; i++) {
          console.log(pageIndex);
          if (buttons.eq(i).html() != pageIndex) {
            buttons.eq(i).removeClass("active");
          } else {
            buttons.eq(i).addClass("active");
          }
        }
        //测试数据 随机生成的
        var newPageInfo = [];
        var time = new Date();
        for (var i = 0; i < this.pagesize; i++) {
          newPageInfo[newPageInfo.length] = {
            timestamp: time,
            count: i + (pageIndex - 1) * 20
          };
        }
        this.pageCurrent = pageIndex;
        this.arrayData = newPageInfo;
        //如果当前页首页或者尾页，则上一页首页就不能点击，下一页尾页就不能点击
        if (this.pageCurrent === 1) {
          this.fDisabled = true;
        } else if (this.pageCurrent === this.pageCount) {
          this.lDisabled = true;
        } else {
          this.fDisabled = false;
          this.lDisabled = false;
        }
        //计算分页按钮数据
        if (this.pageCount > this.showPages) {
          if (pageIndex <= (this.showPages - 1) / 2) {
            this.showPagesStart = 1;
            this.showPageEnd = this.showPages - 1;
            console.log("showPage1");
          } else if (pageIndex >= this.pageCount - (this.showPages - 3) / 2) {
            this.showPagesStart = this.pageCount - this.showPages + 2;
            this.showPageEnd = this.pageCount;
            console.log("showPage2");
          } else {
            console.log("showPage3");
            this.showPagesStart = pageIndex - (this.showPages - 3) / 2;
            this.showPageEnd = pageIndex + (this.showPages - 3) / 2;
          }
        }
        console.log(
          "showPagesStart:" +
            this.showPagesStart +
            ",showPageEnd:" +
            this.showPageEnd +
            ",pageIndex:" +
            pageIndex
        );
      }
    }
  },
  watch: {
    
  },
  mounted() {
    axios
      .get("/user/selectUserAll", {})
      .then(res => {
        (res.data.data.forEach(item=>{
            console.log(item)
        }));
        return (
            res.data.data.forEach(item=>{
            this.userAll.push(item.user)
            this.validmenu.push(item.validmenu)
            // console.log ('userAll -> ' + JSON.stringify (this.userAll))
        })
        );
      })
      .catch(error => {
        console.log(error);
      });

    this.showPage(this.pageCurrent, null, true);
  }
};
</script>
<style lang="scss" scoped>

</style>
