<template>
  <div>
    <el-tabs v-model="currentView">
      <el-tab-pane label="货到付款" name="cargofirst"></el-tab-pane>
      <el-tab-pane label="款到发货" name="moneyfirst"></el-tab-pane>
      <el-tab-pane label="预付款到发货" name="prepay"></el-tab-pane>
    </el-tabs>
    <div :is="currentView" keep-alive></div>
  </div>
</template>

<script>
export default {
  components: {
    //以下方式引入路由是路由的懒加载，有利于页面优化
    cargofirst: resolve => {
      require(["./cargofirst.vue"], resolve);
    },
    moneyfirst: resolve => {
      require(["./moneyfirst.vue"], resolve);
    },
    prepay: resolve => {
      require(["./prepay.vue"], resolve);
    }
  },
  data() {
    return {
      currentView: "cargofirst" //当前组件
    };
  },
  methods: {},
  created() {}
};
</script>

<style lang="less" scoped>
</style>