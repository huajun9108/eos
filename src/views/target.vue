<template>
<div class="target">
  <div class="target_nav">
    <div class="nav_header">
      <span class="header_title">
				    区域范围
			    </span>
    </div>
    <div class="nav_body">
      <ul id="area_tree" class="area_tree_class ztree">
      </ul>
    </div>
  </div>
  <div class="target_content">
    <div class="target_box">
      <div class="target_top">
        <ul class="target_title clearfix">
          <li class="target_tit">Target</li>
          <li class="target_tit">开始时间</li>
          <li class="target_tit">结束时间</li>
        </ul>
        <ul class="target_setting clearfix">
          <li class="target_set">
            <el-autocomplete id="targetInput" class="inline-input" type="number" v-model="targetNo"  :fetch-suggestions="querySearch" placeholder="请输入" @select="handleSelect"></el-autocomplete>
          </li>
          <li class="target_set">
            <el-date-picker v-model="dateStart" type="date" placeholder="选择日期">
            </el-date-picker>
          </li>
          <li class="target_set">
            <el-date-picker v-model="dateEnd" type="date" placeholder="选择日期">
            </el-date-picker>
          </li>
        </ul>
        <ul class="target_title clearfix">
          <li class="target_tit">Vision</li>
        </ul>
        <ul class="target_setting clearfix">
          <li class="target_set"><input class="target_no" /></li>
        </ul>
        <ul class="target_title clearfix">
          <li class="target_tit">Ideal</li>
        </ul>
        <ul class="target_setting clearfix">
          <li class="target_set"><input class="target_no" /></li>
        </ul>
      </div>
      <div class="accountinfo_button text-right">
        <span class="button_confirm button" @click="confirm">确认</span>
        <span class="button_cancel button" @click="cancel">取消</span>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import myDatepicker from 'vue-datepicker'
import {
  mapActions,
  mapState
} from "vuex"
export default {
  components: {
    'date-picker': myDatepicker
  },
  data() {
    return {
      test:"",
      targetList: [],
      targetNo: "",
      dateStart: '',
      dateEnd: '',
      setting: {
        view: {
          selectedMulti: false,
          showIcon: false,
        },
        data: {
          simpleData: {
            enable: true
          }
        },
      },
    }
  },

  computed: {
    ...mapState([
      'areaAll'

    ])
  },
  methods: {
    ...mapActions([
      'selectAreaAll',
    ]),
    confirm() {

    },
    cancel() {

    },
    querySearch(queryString, cb) {
      var targetList = this.targetList;
      var results = queryString ? targetList.filter(this.createFilter(queryString)) : targetList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (item) => {
        return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [{
          "value": "73",
          "address": "长宁区新渔路144号"
        },
        {
          "value": "74",
          "address": "上海市长宁区淞虹路661号"
        },
        {
          "value": "75",
          "address": "上海市普陀区真北路988号创邑金沙谷6号楼113"
        },
        {
          "value": "76 ",
          "address": "天山西路438号"
        },
      ];
    },
    handleSelect(item) {
      console.log(item);
      this.targetList = this.loadAll();
    },
    zTreeBeforeClick: function() {
      console.log("before");
    },
    zTreeOnClick: function(event, treeId, treeNode, clickFlag) {
      console.log("on");
      console.log(typeof treeNode.id + treeNode.id);
      if(typeof treeNode.id !== 'string') return;
      let nodes = treeNode.id.split('');
      if(nodes.length <= 0) return;
      if(nodes[0] !== "l") return;
      console.log("你选择了线体");
      let obj = { "id" : treeNode.id };
      $.post("http://116.196.113.167:3001/linebodySet/selectLinebodyById", obj, function(data, textStatus) {
        console.log(typeof textStatus);
        console.log(data);
        if(textStatus !== "success") return;
        if(data.status === "1") alert("参数错误");
        if(data.status === "0") {
          console.log("访问成功");
          console.log(typeof data.targetvalue);

          $("#targetInput").focus();
          this.targetNo = 60;
          // this.targetNo = data.targetvalue;
        }
      })
    }
  },
  watch: {
    areaAll() {
      $.fn.zTree.init($("#area_tree"), this.setting, this.areaAll);
    }
  },
  mounted() {
    this.selectAreaAll(),
      this.targetList = this.loadAll();


  }

}
</script>
<style lang="scss" scoped>
</style>
