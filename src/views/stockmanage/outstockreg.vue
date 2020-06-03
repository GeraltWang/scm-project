<template>
  <div>
    <el-tabs v-model="currentView">
      <el-tab-pane label="货到付款" name="ocargofirst"></el-tab-pane>
      <el-tab-pane label="款到发货" name="omoneyfirst"></el-tab-pane>
      <el-tab-pane label="预付款到发货" name="oprepay"></el-tab-pane>
    </el-tabs>
    <div :is="currentView" keep-alive></div>
  </div>
</template>

<script>
export default {
  components: {
    //以下方式引入路由是路由的懒加载，有利于页面优化
    ocargofirst: resolve => {
      require(["./ocargofirst.vue"], resolve);
    },
    omoneyfirst: resolve => {
      require(["./omoneyfirst.vue"], resolve);
    },
    oprepay: resolve => {
      require(["./oprepay.vue"], resolve);
    }
  },
  data() {
    return {
      currentView: "ocargofirst" //当前组件
    };
  },
  methods: {},
  created() {}
};
</script>

<style lang="less" scoped>
</style>