<template>
 <div class="city-select">
    <select v-model="selectedProvince" name="province">
        <option v-for="(item, index) in provinces"
        :key = "index"
        v-if="item.level === 1"
        :value="item">
        {{ item.name }}
        </option>
    </select>
    <select v-model="selectedCity" name="city">
        <option
        v-for="(item, index) in cities"
        :key = "index"
        :value="item">
        {{ item.name }}
        </option>
    </select>
    <select v-model="selectedBlock" name="block">
        <option
        v-for="(item, index) in blocks"
        :key = "index"
        :value="item">
        {{ item.name }}
        </option>
    </select>
 </div>
</template>
<script>

import provinces from '../assets/js/data'
export default {
    data() {
        return {
            selectedProvince: provinces[0],
            selectedCity: 0,
            selectedBlock: 0,
            cities: 0,
            provinces,
            blocks: 0
        }
    },
    created() {
        // 数据初始化,默认选中北京市,默认选中第一个;北京市数据为总数据的前18个
        let beijing = this.provinces.slice(0, 3)
        this.cities = beijing.filter(item => {
            if (item.level === 2) {
            return true
            }
        })
        this.selectedCity = this.cities[0]
        this.blocks = beijing.filter(item => {
            if (item.level === 3) {
            return true
            }
        })
        this.selectedBlock = this.blocks[0]
    },
    watch: {
        selectedProvince(newVal, oldVal) {
            // 港澳台数据只有一级,特殊处理
            this.cities = this.provinces.filter(item => {
                if (item.level === 2 && item.sheng && newVal.sheng === item.sheng) {
                return true
                }
            })
            var _this = this
            // 此时在渲染DOM,渲染结束之后再选中第一个
            this.$nextTick(() => {
            _this.selectedCity = _this.cities[0]
            _this.$emit('input', _this.info)
            })
        },
        selectedBlock() {
            var _this = this
            this.$nextTick(() => {
            _this.$emit('input', _this.info)
            })
        },
        selectedCity(newVal) {
            // 选择了一个市,要选择区了 di是城市的代表,sheng
            this.blocks = this.provinces.filter(item => {
                if (item.level === 3 && item.sheng && item.sheng == newVal.sheng && item.di === newVal.di && item.name !== '市辖区') {
                return true
                }
            })
            var _this = this
            this.$nextTick(() => {
            _this.selectedBlock = _this.blocks[0]
            // 触发与 v-model相关的 input事件
            _this.$emit('input', _this.info)
            })
        }
    },
    computed: {
        info() {
            return {
            province: this.selectedProvince,
            city: this.selectedCity,
            block: this.selectedBlock
            }
        }
    },
   
}
</script>
<style lang="" scoped>

</style>