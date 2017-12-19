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
          <Cascader disabled :data="data" trigger="hover" v-model="item.name" class="product_con"></Cascader>
        </li>
        <li class="target_set">
          <span>CT</span>
          <Input readonly size="small" v-model="item.value" class="target_con" type="number"></Input>
          <span class="seconds">秒</span>
        </li>
        <li class="target_set">
          <span class="icon-edit texy-right" @click="updateProduct(idx)"></span>
          <span class="icon-delete_2 text-right" @click="deleteProduct(idx)"></span>
        </li>
      </ul>
    </div>
  </div>
  <Modal v-model="showProducableProductsFlag" @on-ok="confirmProducableProducts" @on-cancel="cancelProducableProducts" class-name="producableProducts-vertical-center-modal"
  :closable="false" width="400">

  <span v-if="addProducableProductFlag" class="producableProductTitle">可生产产品添加</span>
  <span v-else class="producableProductTitle">可生产产品修改</span>
  <div class="productSelectionContainer">
    <span>产品选择：</span>
    <Cascader :data="data" trigger="hover" v-model="selectedProductValue"></Cascader>
  </div>
  <div class="ctContainer">
    <span>CT：</span>
    <InputNumber v-model="ctValue" :min="0"></InputNumber>
  </div>
  </Modal>
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
      modelList: [{
        "result": [],
        "data": []
      }],
      data: [],
      productIndex: null,
      showProducableProductsFlag: false,
      ctValue: null,
      selectedProductValue: [],
      addProducableProductFlag: true,
    }

  },

  computed: {
    ...mapState([
      "selectLinebodyProductsByLinebodyIdRes",
      "addLinebodyProductByLinebodyIdRes",
      "deleteLinebodyProductByIdRes",
      "updateLinebodyProductByIdRes"
    ])
  },
  methods: {
    ...mapActions([
      "selectLinebodyProductsByLinebodyId",
      "addLinebodyProductByLinebodyId",
      "deleteLinebodyProductById",
      "updateLinebodyProductById"
    ]),
    confirmProducableProducts() {
      const len = this.selectedProductValue.length;
      const addOrUpdateProductId = this.selectedProductValue[len - 1];
      if(!(addOrUpdateProductId && this.ctValue)) {
        this.$Message.error("产品信息不完善");
        return;
      }
      if(this.addProducableProductFlag) {
        const linebodyId = this.nodeId.substring(1);
        this.addLinebodyProductByLinebodyId({
          "linebodyId": this.nodeId.substring(1),
          "productId": addOrUpdateProductId,
          "cTime": this.ctValue
        });
      } else {
        const id = this.modelList[0].result[this.productIndex].id;
        this.updateLinebodyProductById({
          "id": id,
          "productId": addOrUpdateProductId,
          "cTime": this.ctValue
        });
      }
    },
    cancelProducableProducts() {
      this.selectedProductValue = [];
      this.ctValue = null;
      this.productIndex = null;
    },
    deleteProduct(idx) {
      this.productIndex = idx;
      var _this = this;
      Ewin.confirm({ message: "确认删除吗？" }).on(function (e) {
          if (!e) {
              return;
          }
          const id = _this.modelList[0].result[idx].id;
          if(id) {
            _this.deleteLinebodyProductById({
              "id": id
            });
          }
      });
    },
    empty(val) {
      var reg = /^\s+$/gi;
      if (reg.test(val) || val.length == 0) {
        return true;
      }
    },
    addProduct() {
      let reg = /^l/g;
      if (reg.test(this.nodeId)) {
        this.showProducableProductsFlag = true;
        this.addProducableProductFlag = true;
      } else {
        this.$Message.error("请选择相应线体");
      }

    },
    updateProduct(idx) {
      this.productIndex = idx;
      this.addProducableProductFlag = false;
      this.showProducableProductsFlag = true;
      this.selectedProductValue = this.modelList[0].result[idx].name;
      this.ctValue = this.modelList[0].result[idx].value;
    }
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
      if (newVal.status === "0") {
        this.modelList = newVal.data.modelList;
        this.data = newVal.data.data;
      } else {
        this.$Message.error("请求失败");
      }
    },
    addLinebodyProductByLinebodyIdRes(newVal) {
      if(newVal.status === "0") {
        this.$Message.success("添加成功");
        const obj = {
          "id": newVal.data,
          "name": this.selectedProductValue,
          "value": this.ctValue
        }
        this.modelList[0].result.push(obj);
      } else {
        this.$Message.error("添加失败");
        this.selectLinebodyProductsByLinebodyId({linebodyId: this.nodeId.substring(1)});
      }
      this.selectedProductValue = [];
      this.ctValue = null;
    },
    deleteLinebodyProductByIdRes(newVal) {
      if(newVal.status === "0") {
        this.modelList[0].result.splice(this.productIndex, 1);
        this.$Message.success("删除成功");
      } else {
        this.$Message.error("删除失败");
        this.selectLinebodyProductsByLinebodyId({linebodyId: this.nodeId.substring(1)});
      }
      this.productIndex = null;
    },
    updateLinebodyProductByIdRes(newVal) {
      if(newVal.status === "0") {
        this.modelList[0].result[this.productIndex].name = this.selectedProductValue;
        this.modelList[0].result[this.productIndex].value = this.ctValue;
        this.$Message.success("修改成功");
      } else {
        this.$Message.error("修改失败");
        this.selectLinebodyProductsByLinebodyId({linebodyId: this.nodeId.substring(1)});
      }
      this.selectedProductValue = [];
      this.ctValue = null;
      this.productIndex = null;
    }
  },
  mounted() {
    console.log(this.modelList)
  }

}
</script>
<style lang="scss" scoped>
</style>
