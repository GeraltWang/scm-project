<template>
  <div>
    <el-tabs v-model="currentView">
      <el-tab-pane label="货到付款" name="scargofirst"></el-tab-pane>
      <el-tab-pane label="款到发货" name="smoneyfirst"></el-tab-pane>
      <el-tab-pane label="预付款到发货" name="sprepay"></el-tab-pane>
    </el-tabs>
    <div :is="currentView" keep-alive></div>
  </div>
</template>

<script>
export default {
  components: {
    //以下方式引入路由是路由的懒加载，有利于页面优化
    scargofirst: resolve => {
      require(["./scargofirst.vue"], resolve);
    },
    smoneyfirst: resolve => {
      require(["./smoneyfirst.vue"], resolve);
    },
    sprepay: resolve => {
      require(["./sprepay.vue"], resolve);
    }
  },
  data() {
    return {
      currentView: "scargofirst" //当前组件
    };
  },
  methods: {},
  created() {}
};
</script>

<style lang="less" scoped>
</style>