<template>
<div class="account">
    <div class=""></div>
    <table class="table table-bordered">
        <thead>
        <tr>
            <td><input type="checkbox" v-model="checkB"/></td>
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
            <tr v-for="(user,idx) in userOpt" :key="idx">
                <td><input type="checkbox" v-model="user.check"></td>
                <td>{{idx+1}}</td>
                <td>{{user.account}}</td>
                <td>{{user.name}}</td>
                <td>{{user.pwd}}</td>
                <td>{{user.position}}</td>
                <td>{{user.leader}}</td>
                <td>{{user.effMenu}}</td>
                <td>{{user.viewArea}}</td>
                <td>
                    <router-link :to="{name:'accountInfo'}">{{user.edit}}</router-link></td>
                <td>{{user.del}}</td>
            </tr>
        </tbody>
    </table>
    <div class="pager" id="pager">
          <span class="form-inline">
            <select class="form-control" v-model="pagesize" v-on:change="showPage(pageCurrent,$event,true)" number>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
            </select>
          </span>
          <span v-for="(item,idx) in pageCount+1" :key="idx">
            <span v-if="item==1" class="btn btn-default" v-on:click="showPage(1,$event)" :class="{'disabled':fDisabled}">
              首页
            </span>
            <span v-if="item==1" class="btn btn-default" v-on:click="showPage(pageCurrent-1,$event)" :class="{'disabled':fDisabled}">
              上一页
            </span>
            <span v-if="item==1" class="btn btn-default" v-on:click="showPage(item,$event)">
              {{item}}
            </span>
            <span v-if="item==1&&item<showPagesStart-1" class="btn btn-default disabled">
              ...
            </span>
            <span v-if="item>1&&item<=pageCount-1&&item>=showPagesStart&&item<=showPageEnd&&item<=pageCount" class="btn btn-default" v-on:click="showPage(item,$event)">
              {{item}}
            </span>
            <span v-if="item==pageCount&&item>showPageEnd+1" class="btn btn-default disabled">
              ...
            </span>
            <span v-if="item==pageCount" class="btn btn-default" v-on:click="showPage(item,$event)" >
              {{item}}
            </span>
            <span v-if="item==pageCount" class="btn btn-default" v-on:click="showPage(pageCurrent+1,$event)" :class="{'disabled':lDisabled}">
              下一页
            </span>
            <span v-if="item==pageCount" class="btn btn-default" v-on:click="showPage(pageCount,$event)" :class="{'disabled':lDisabled}">
              尾页
            </span>
          </span>
          <span>{{pageCurrent}}/{{pageCount}}</span>
        </div>
</div>
</template>

<script type="text/javascript">
import {mapState,mapActions} from "vuex";
    export default {
        data(){
            return{
                selectCity:"overview",
                userOpt:[
                    {check:false,account:"123",name:"张全蛋",position:"ceo",leader:"coo",effMenu:"overview",edit:"编辑",del:"删除",pwd:111,viewArea:"上海"},
                    {check:false,account:"222",name:"张三",position:"ceo",leader:"coo",effMenu:"overview",edit:"编辑",del:"删除",pwd:111,viewArea:"上海"},
                    {check:false,account:"333",name:"lili",position:"ceo",leader:"coo",effMenu:"overview",edit:"编辑",del:"删除",pwd:111,viewArea:"上海"},
                    {check:false,account:"456",name:"sansan",position:"ceo",leader:"coo",effMenu:"overview",edit:"编辑",del:"删除",pwd:111,viewArea:"上海"},
                    {check:false,account:"234",name:"zhuzhu",position:"ceo",leader:"coo",effMenu:"overview",edit:"编辑",del:"删除",pwd:111,viewArea:"上海"},
                    {check:false,account:"789",name:"lala",position:"ceo",leader:"coo",effMenu:"overview",edit:"编辑",del:"删除",pwd:111,viewArea:"上海"},
                    {check:false,account:"111",name:"qqq",position:"ceo",leader:"coo",effMenu:"overview",edit:"编辑",del:"删除",pwd:111,viewArea:"上海"},
                    {check:false,account:"2222",name:"www",position:"ceo",leader:"coo",effMenu:"overview",edit:"编辑",del:"删除",pwd:111,viewArea:"上海"},
                    {check:false,account:"44445",name:"Qqq",position:"ceo",leader:"coo",effMenu:"overview",edit:"编辑",del:"删除",pwd:111,viewArea:"上海"},
                    {check:false,account:"6678",name:"qqqq",position:"ceo",leader:"coo",effMenu:"overview",edit:"编辑",del:"删除",pwd:111,viewArea:"上海"},
                    {check:false,account:"654",name:"qqq",position:"ceo",leader:"coo",effMenu:"overview",edit:"编辑",del:"删除",pwd:111,viewArea:"上海"},
                    {check:false,account:"334",name:"qqq",position:"ceo",leader:"coo",effMenu:"overview",edit:"编辑",del:"删除",pwd:111,viewArea:"上海"},
                    {check:false,account:"44445",name:"Qqq",position:"ceo",leader:"coo",effMenu:"overview",edit:"编辑",del:"删除",pwd:111,viewArea:"上海"},
                    {check:false,account:"6678",name:"qqqq",position:"ceo",leader:"coo",effMenu:"overview",edit:"编辑",del:"删除",pwd:111,viewArea:"上海"},
                    {check:false,account:"654",name:"qqq",position:"ceo",leader:"coo",effMenu:"overview",edit:"编辑",del:"删除",pwd:111,viewArea:"上海"},
                    {check:false,account:"334",name:"qqq",position:"ceo",leader:"coo",effMenu:"overview",edit:"编辑",del:"删除",pwd:111,viewArea:"上海"},
                ],
                fDisabled:false,
                lDisabled:false,
                //总项目数
                totalCount: 200,
                //分页数
                pageCount: 20,
                //当前页面
                pageCurrent: 1,
                //分页大小
                pagesize: 10,
                //显示分页按钮数
                showPages: 11,
                //开始显示的分页按钮
                showPagesStart: 1,
                //结束显示的分页按钮
                showPageEnd: 100,
                //分页数据
                arrayData: []
            }
        },
        computed:{
            ...mapState([
                // 'interestData',
                // 'staySwiper',
                // 'currentIndex',
                // 'homeData',
                // 'fireData',
                ]),
			checkB:{
				
				get(){
					var flag=true;
					this.userOpt.forEach((item,idx)=>{
						if(!item.check){
							flag=false
						}
					});
					return flag
				},
				set(newV){
					console.log(newV)
					this.userOpt.forEach((item,idx)=>{
						item.check=newV
					})
				}
				
			}
        },
        methods:{
        
        ...mapActions([
            
            ]),
            showPage(pageIndex, $event, forceRefresh){
            if (pageIndex > 0) {
                if (pageIndex > this.pageCount) {
                pageIndex = this.pageCount;
                }
                //判断数据是否需要更新
                var currentPageCount = Math.ceil(this.totalCount / this.pagesize);
                if (currentPageCount != this.pageCount) {
                pageIndex = 1;
                this.pageCount = currentPageCount;
                }
                else if (this.pageCurrent == pageIndex && currentPageCount == this.pageCount && typeof (forceRefresh) == "undefined") {
                console.log("not refresh");
                return;
                }
                //处理分页点中样式
                var buttons = $("#pager").find("span");
                for (var i = 0; i < buttons.length; i++) {
                if (buttons.eq(i).html() != pageIndex) {
                    buttons.eq(i).removeClass("active");
                }
                else {
                    buttons.eq(i).addClass("active");
                }
                }
                //测试数据 随机生成的
                var newPageInfo = [];
                var time=new Date();
                for (var i = 0; i < this.pagesize; i++) {
                newPageInfo[newPageInfo.length] = {
                    timestamp: time,
                    count: (i + (pageIndex - 1) * 20)
                };
                }
                this.pageCurrent = pageIndex;
                this.arrayData = newPageInfo;
                //如果当前页首页或者尾页，则上一页首页就不能点击，下一页尾页就不能点击
                if(this.pageCurrent===1){
                    this.fDisabled=true;
                }else if(this.pageCurrent===this.pageCount){
                    this.lDisabled=true;
                }else{
                    this.fDisabled=false;
                    this.lDisabled=false;
                }
                //计算分页按钮数据
                if (this.pageCount > this.showPages) {
                if (pageIndex <= (this.showPages - 1) / 2) {
                    this.showPagesStart = 1;
                    this.showPageEnd = this.showPages - 1;
                    console.log("showPage1")
                }
                else if (pageIndex >= this.pageCount - (this.showPages - 3) / 2) {
                    this.showPagesStart = this.pageCount - this.showPages + 2;
                    this.showPageEnd = this.pageCount;
                    console.log("showPage2")
                }
                else {
                    console.log("showPage3")
                    this.showPagesStart = pageIndex - (this.showPages - 3) / 2;
                    this.showPageEnd = pageIndex + (this.showPages - 3) / 2;
                }
                }
                console.log("showPagesStart:" + this.showPagesStart + ",showPageEnd:" + this.showPageEnd + ",pageIndex:" + pageIndex);
            }
            },
        checkAll:{
            //  只要有一个为false就是 没有全选 返回  false
            //  getter
            get(){
                var flag = true;
                this.userOpt.forEach(item=>{
                    if(!item.check){
                        flag = false;
                    }
                });
                return flag;
            },
            set(newValue){
                //  set 这个计算属性值改变时触发
                console.log(newValue);
                this.userOpt.forEach(item=>{
                    item.check = newValue;
                })
            }
        }
    },
    watch:{
    },

    mounted(){
        // this.getinterestData()
        // this.gethomeData();
        // this.getfireData();
        this.showPage(this.pageCurrent, null, true);
        
    }
}
</script>
<style lang="scss" scoped>

    
    
</style>
