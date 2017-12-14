<template>
<div class="target product">
  <div class="target_box clearfix">
    <div class="product_title">
      <span class="target_title">可生产产品</span><i class="icon-add_add project_add" @click="addProduct()"></i>
    </div>
    <div class="target_top" v-if="!this.productFlag">
      <ul class="target_setting clearfix" v-for="(item,idx) in this.modelList[0].result" :key="idx">
        <li class="target_set product_set">
          <span class="target_tit">产品选择</span>
          <Cascader :disabled="productFlag" :data="data" trigger="hover" v-model="item.name" class="product_con" @on-change="handleChange" :ref="'result'+idx"></Cascader>
        </li>
        <li class="target_set">
          <span>CT</span>
          <Input :disabled="productFlag" size="small" v-model="item.value" class="target_con" type="number" :ref="'input'+idx"></Input>
          <span class="seconds">秒</span>
          <span class="completeBtn" @click="updateExistingProductsInLineBody(idx)">完成</span>
          <span class="icon-delete_2" @click="deleteExistingProductsInLineBody(idx)"></span>
        </li>
      </ul>
      <ul class="target_setting clearfix" v-for="(item,idx) in this.modelList[0].data" :key="idx">
        <li class="target_set product_set">
          <span class="target_tit">产品选择</span>
          <Cascader :data="data" trigger="hover" :value="'data'+idx" class="product_con" :ref="'data'+idx"></Cascader>
        </li>
        <li class="target_set">
          <span>CT</span>
          <Input size="small" class="target_con" :value="'datainput'+idx" type="number" :ref="'datainput'+idx"></Input>
          <span class="seconds">秒</span>
          <span class="completeBtn" @click="addOrUpdateNewProductsInLineBody(idx)">完成</span>
          <span class="icon-delete_2" @click="deleteNewProductsInLineBody(idx)"></span>
        </li>
      </ul>
    </div>
    <div class="area_button text-right">
      <span class="button_confirm button" @click="confirm">确认</span>
    </div>
  </div>
</div>
</template>
<script>
import {
  mapActions,
  mapState
} from "vuex"
export default {
  props: [
    'nodeId',
  ],
  data() {
    return {
      productFlag: true,

      result: [],
      modelList: [{
        "result": [],
        "data": []
      }],
      data: [],
      addProductIdList: [],
      addProductCtime: null,
      existProductIndex: null,
      newProductIndex: null
      // model1:'',
      // model2:''
    }

  },

  computed: {
    ...mapState([
      // "modelList",
      // "data",
      "selectLinebodyProductsByLinebodyIdRes",
      "addLinebodyProductByLinebodyIdRes",
      "deleteLinebodyProductByIdRes",
      "updateLinebodyProductByIdRes"
    ])
  },
  methods: {
    ...mapActions([
      "addLinebodyProductByLinebodyId",
      "deleteLinebodyProductById",
      "updateLinebodyProductById"
    ]),
    updateExistingProductsInLineBody(idx) {
      console.log(idx);
      this.existProductIndex = idx;
      if(this.$refs["result" + idx][0].selected && this.$refs["input" + idx][0].currentValue) {
        const len = this.$refs["result" + idx][0].selected.length;
        const Ctime = this.$refs["input" + idx][0].currentValue;
        const id = this.modelList[0].result[idx].id;

        this.updateLinebodyProductById({
          "id": id,
          "productId": this.$refs["result" + idx][0].selected[len - 1].value,
          "cTime": this.$refs["input" + idx][0].currentValue
        });
      }
    },
    addOrUpdateNewProductsInLineBody(idx) {
      this.newProductIndex = idx;
      if(this.$refs["data" + idx][0].selected && this.$refs["datainput" + idx][0].currentValue) {
        const len = this.$refs["data" + idx][0].selected.length;
        const addOrUpdateProductId = this.$refs["data" + idx][0].selected[len - 1].value;

        console.log(this.modelList);
        if(this.modelList[0].data[idx].hasOwnProperty('id')) {
          const id = this.modelList[0].data[idx].id;
          this.updateLinebodyProductById({
            "id": id,
            "productId": addOrUpdateProductId,
            "cTime": this.$refs["datainput" + idx][0].currentValue
          });
        } else {
          for(let i = 0; i < this.$refs["data" + idx][0].selected.length; i++) {
            this.addProductIdList.push(this.$refs["data" + idx][0].selected[i].value);
          }
          this.addProductCtime = this.$refs["datainput" + idx][0].currentValue;
          this.addLinebodyProductByLinebodyId({
            "linebodyId": this.nodeId.substring(1),
            "productId": addOrUpdateProductId,
            "cTime": this.$refs["datainput" + idx][0].currentValue
          });
        }
      }
    },
    deleteExistingProductsInLineBody(idx) {
      const id = this.modelList[0].result[idx].id;
      console.log(id);
      if(id) {
        this.deleteLinebodyProductById({
          "id": id
        })
        this.modelList[0].result.splice(idx, idx + 1);
      }
    },
    deleteNewProductsInLineBody(idx) {
      const id = this.modelList[0].data[idx].id;
      if(id) {
        this.deleteLinebodyProductById({
          "id": id
        });
      }
      this.modelList[0].data.splice(idx, idx + 1);
    },
    empty(val) {
      var reg = /^\s+$/gi;
      if (reg.test(val) || val.length == 0) {
        return true;
      }
    },
    addProduct() {
      this.modelList[0].data.push({})
      console.log(this.modelList)
    },
    confirm() {
      this.modelList[0].result.forEach((item, idx) => {
        console.log(item)
        console.log(idx)
      })
      this.modelList[0].data.forEach((item, idx) => {
        console.log(this.$refs["data" + idx][0].selected)
        console.log(this.$refs["datainput" + idx][0].currentValue)
      })
    },
    cancel() {

    },
    handleChange(value, selectedData) {
      console.log(1);
      console.log(value)
      console.log(idx)
      // console.log(selectedData)
      let obj = {}
      console.log(selectedData.map(o => o.label).join(', '));
      this.modelList[0].result.forEach((item, idx) => {
        console.log(item)
        console.log(idx)
      })
      // obj={
      //     label1:this.$refs["result"+idx][0].value,
      //     label2:this.$refs["input"+idx][0].value
      // };
      // this.modelList[0].result.push(obj)
      console.log(obj)
    },
  },
  watch: {
    nodeId(newVal) {
      console.log(newVal)
      let reg = /^l/g;
      if (reg.test(newVal)) {
        this.productFlag = false
        // this.selectLinebodyById({id:newVal})
      } else {
        this.productFlag = true
        // this.targetNo="";
        // this.dateStart='';
        // this.dateEnd='';
        // this.vision='';
        // this.ideal='';
        // this.visionStart = '',
        // this.visionEnd = '',
        // this.idealStart = '',
        // this.idealEnd = ''
      }

    },
    selectLinebodyProductsByLinebodyIdRes(newVal) {
      console.log("selectLinebodyProductsByLinebodyId:");
      // console.log(newVal);
      if (newVal.status === "0") {
        this.modelList = newVal.data.modelList;
        this.data = newVal.data.data;
        // console.log(this.modelList);
        // console.log(this.data);
      }
    },
    addLinebodyProductByLinebodyIdRes(newVal) {
      console.log("addLinebodyProductByLinebodyIdRes:")
      if(newVal.status === "0") {
        this.modelList[0].data[this.newProductIndex].id = newVal.data;
        this.modelList[0].data[this.newProductIndex].name = this.addProductIdList;
        this.modelList[0].data[this.newProductIndex].value = this.addProductCtime;
        console.log(this.modelList);
      }
      this.addProductIdList = [];
      this.addProductCtime = null;
      this.newProductIndex = null;
    },
    deleteLinebodyProductByIdRes(newVal) {
      console.log(newVal);
      if(newVal.status === "0") {
        this.$Message.success("删除成功");
      }
    },
    updateLinebodyProductByIdRes(newVal) {
      if(newVal.status === "0") {
        this.$Message.success("修改成功");
      }
    }
  },
  mounted() {
    console.log(this.modelList)
  }

}
</script>
<style lang="scss" scoped>
</style>
