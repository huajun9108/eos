<template>
<div class="accountinfo_container">
  <div class="accountinfo_interface col-md-7">
    <br>
    <div class="accountinfo_title">
      <span>客户设置</span>
      <hr>
    </div>

    <div class="accountinfo_setting">
      <div class="setting_left">
        <div class="accountinfo_username">
          <i class="icon-User-name"></i>
          <input class="input_accountinfo" type="text" name="" value="" placeholder="用户名">
          <hr>
        </div>
        <div class="accountinfo_password">
          <i class="icon-password"></i>
          <input class="input_accountinfo" type="text" name="" value="" placeholder="密码">
          <hr>
        </div>
        <div class="accountinfo_position">
          <i class="icon-position"></i>
          <input class="input_accountinfo" type="text" name="" value="" placeholder="职位">
          <hr>
        </div>
        <div class="accountinfo_boss">
          <i class="icon-superior"></i>
          <input class="input_accountinfo" type="text" name="" value="" placeholder="直线上司">
          <hr>
        </div>
        <div class="accountinfo_effectivemenu">
          <i class="icon-Effective-menu"></i>
          <div class="menu_container">
            <div class="menu_title">
              有效菜单
            </div>
            <div class="menu_option">
              <div class="input_menuoption" v-for="(city,idx) in showList">
                  <input type="checkbox" :id="city.name" :value="city.name" v-model="checkLists">
                  <label :for="city.name" >{{city.name}}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="accountinfo_areacontainer">
        <div class="visablearea_title">
          <i class="icon-Viewing-area"></i>
          可视区域范围
        </div>
        <ul id="treeDemo" class="ztree"></ul>
      </div>
      </div>
      <div class="accountinfo_button text-right">
          <span class="button_confirm">确认</span>
          <button type="button" name="button">取消</button>
      </div>

  </div>
</div>
</template>

<script type="text/javascript">
import {mapState,mapActions} from "vuex";
import Bottom from "../components/bottom.vue";
import "../assets/js/jquery-1.4.4.min.js"
import "../assets/js/jquery.ztree.core.js"
import "../assets/js/jquery.ztree.excheck.js"
import "../assets/js/jquery.ztree.exedit.js"

var newCount = 1;

var cityListTwo = [
			{name:"overview",value:"overview"},
			{name:"performance",value:"performance"},
			{name:"target",value:"target"},
			{name:"loss",value:"loss"},
			{name:"projects",value:"projects"},
            {name:"saving",value:"saving"},
			{name:"data",value:"data"},
			{name:"account",value:"account"},
		];
    export default {
        components:{
            ebottom:Bottom
        },
        data(){
            return{
                checkLists:"",
                showList:cityListTwo,
                setting: {
          				view: {
          					addHoverDom: this.addHoverDom,
          					removeHoverDom: this.removeHoverDom,
          					selectedMulti: false
          				},
          				data: {
          					simpleData: {
          						enable: true
          					}
          				},
                  check: {
                    enable: true,
                    chkStyle: 'checkbox',
                    radioType: "level"
                  },
          				edit: {
          					enable: true
          				}
          			},
          			zNodes: [{
          					id: 1,
          					pId: 0,
          					name: "pNode 1",
          					open: true
          				},
          				{
          					id: 11,
          					pId: 1,
          					name: "pNode 11"
          				},
          				{
          					id: 111,
          					pId: 11,
          					name: " sNode 111"
          				},
          				{
          					id: 112,
          					pId: 11,
          					name: "sNode 112"
          				},
          				{
          					id: 113,
          					pId: 11,
          					name: "sNode 113"
          				},
          				{
          					id: 114,
          					pId: 11,
          					name: "sNode 114"
          				},
          				{
          					id: 12,
          					pId: 1,
          					name: "pNode 12"
          				},
          				{
          					id: 121,
          					pId: 12,
          					name: "sNode 121"
          				},
          				{
          					id: 122,
          					pId: 12,
          					name: "sNode 122"
          				},
          				{
          					id: 123,
          					pId: 12,
          					name: "sNode 123"
          				},
          				{
          					id: 124,
          					pId: 12,
          					name: "sNode 124"
          				},
          				{
          					id: 13,
          					pId: 1,
          					name: "pNode 13",
          					isParent: true
          				},
          				{
          					id: 2,
          					pId: 0,
          					name: "pNode 2"
          				},
          				{
          					id: 21,
          					pId: 2,
          					name: "pNode 21",
          					open: true
          				},
          				{
          					id: 211,
          					pId: 21,
          					name: "sNode 211"
          				},
          				{
          					id: 212,
          					pId: 21,
          					name: "sNode 212"
          				},
          				{
          					id: 213,
          					pId: 21,
          					name: "sNode 213"
          				},
          				{
          					id: 214,
          					pId: 21,
          					name: "sNode 214"
          				},
          				{
          					id: 22,
          					pId: 2,
          					name: "pNode 22"
          				},
          				{
          					id: 221,
          					pId: 22,
          					name: "sNode 221"
          				},
          				{
          					id: 222,
          					pId: 22,
          					name: "sNode 222"
          				},
          				{
          					id: 223,
          					pId: 22,
          					name: "sNode 223"
          				},
          				{
          					id: 224,
          					pId: 22,
          					name: "sNode 224"
          				},
          				{
          					id: 23,
          					pId: 2,
          					name: "pNode 23"
          				},
          				{
          					id: 231,
          					pId: 23,
          					name: "sNode 231"
          				},
          				{
          					id: 232,
          					pId: 23,
          					name: "sNode 232"
          				},
          				{
          					id: 233,
          					pId: 23,
          					name: "sNode 233"
          				},
          				{
          					id: 234,
          					pId: 23,
          					name: "sNode 234"
          				},
          				{
          					id: 3,
          					pId: 0,
          					name: "pNode 3",
          					isParent: true
          				}
          			],
            }
        },
        computed:{
            ...mapState([
                "user"

                ])
        },
        methods:{

        ...mapActions([
            // 'getinterestData',
            // 'changeIndex',
            // 'gethomeData',
            // 'getfireData',
            // 'gethomeList'
          ]),
          addHoverDom: function(treeId, treeNode) {
      			var sObj = $("#" + treeNode.tId + "_span");
      			if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
      			var addStr = "<span class='button add' id='addBtn_" + treeNode.tId +
      				"' title='add node' onfocus='this.blur();'></span>";
      			sObj.after(addStr);
      			var btn = $("#addBtn_" + treeNode.tId);
      			if (btn) btn.bind("click", function() {
      				var zTree = $.fn.zTree.getZTreeObj("treeDemo");
      				zTree.addNodes(treeNode, {
      					id: (100 + newCount),
      					pId: treeNode.id,
      					name: "new node" + (newCount++)
      				});
      				return false;
      			});
      		},
      		removeHoverDom: function(treeId, treeNode) {
      			$("#addBtn_" + treeNode.tId).unbind().remove();
      		},
    },
    watch:{
        // homeData(newValue){
        //     console.log(newValue)
        //     this.$nextTick(()=>{
        //         var myswiper = new Swiper("#swiper",{
        //            	pagination:".swiper-pagination",
        //            	paginationClickable:true,//为true时，点击分页器的指示点分页器会控制Swiper切换。
		// 	        paginationType:"bullets",  //'bullets' 圆点'fraction'分式 'progress'进度条'custom' 自定义
		// 	        paginationHide:false,
		// 	        paginationElement:"div",
		// 	        paginationBulletRender:function(index, className){
		// 	            var txt=["精品民宿","兴趣培养","灵感空间"]
		// 	            var unicode=["&#xe669;","&#xe62c;","&#xe506;"]
		// 	            return"<div class="+className+"><i class='iconfont'>"+unicode[index]+"</i><span>"+txt[index]+"</span></div>"
		// 	        }//渲染分页器小
        //         })

        //     })
        // },
    },

    mounted(){
        // this.getinterestData()
        // this.gethomeData();
        // this.getfireData();
        $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
    }
}
</script>
<style lang="scss" scoped>



</style>
