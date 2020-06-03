<template>
  <div>
    <el-tabs v-model="currentView">
      <el-tab-pane label="月度采购报表" name="monthspent"></el-tab-pane>
      <el-tab-pane label="月度销售报表" name="monthsale"></el-tab-pane>
      <el-tab-pane label="月度出库报表" name="monthoutstock"></el-tab-pane>
      <el-tab-pane label="月度入库报表" name="monthinstock"></el-tab-pane>
      <el-tab-pane label="月度库存报表" name="monthstock"></el-tab-pane>
      <el-tab-pane label="月度收支报表" name="monthdata"></el-tab-pane>
    </el-tabs>
    <div :is="currentView" keep-alive></div>
  </div>
</template>

<script>
export default {
  components: {
    //以下方式引入路由是路由的懒加载，有利于页面优化
    monthspent: resolve => {
      require(["./monthspent.vue"], resolve);
    },
    monthsale: resolve => {
      require(["./monthsale.vue"], resolve);
    },
    monthoutstock: resolve => {
      require(["./monthoutstock.vue"], resolve);
    },
    monthinstock: resolve => {
      require(["./monthinstock.vue"], resolve);
    },
    monthstock: resolve => {
      require(["./monthstock.vue"], resolve);
    },
    monthdata: resolve => {
      require(["./monthdata.vue"], resolve);
    },
  },
  data() {
    return {
      currentView: "monthspent" //当前组件
    };
  },
  methods: {},
  created() {}
};
</script>

<style lang="less" scoped>
</style>