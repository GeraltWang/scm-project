<template>
  <div>
    <el-tabs v-model="currentView">
      <el-tab-pane label="货到付款" name="icargofirst"></el-tab-pane>
      <el-tab-pane label="款到发货" name="imoneyfirst"></el-tab-pane>
      <el-tab-pane label="预付款到发货" name="iprepay"></el-tab-pane>
    </el-tabs>
    <div :is="currentView" keep-alive></div>
  </div>
</template>

<script>
export default {
  components: {
    //以下方式引入路由是路由的懒加载，有利于页面优化
    icargofirst: resolve => {
      require(["./icargofirst.vue"], resolve);
    },
    imoneyfirst: resolve => {
      require(["./imoneyfirst.vue"], resolve);
    },
    iprepay: resolve => {
      require(["./iprepay.vue"], resolve);
    }
  },
  data() {
    return {
      currentView: "icargofirst" //当前组件
    };
  },
  methods: {},
  created() {}
};
</script>

<style lang="less" scoped>
</style>