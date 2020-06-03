<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" >
    <el-breadcrumb-item v-for="(item) in breadList" :key="item.name" class="breadcrumb">
      <router-link
        v-if="item.name != name"
        :to="{ path: item.path === '' ? '/' : item.path }"
      >{{ item.meta.title }}</router-link>
      <span v-else>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      breadList: []
    };
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      this.name = this.$route.name;

      this.breadList = [];
      this.$route.matched.forEach(item => {
        if (item.path !== "") {
          this.breadList.push(item);
        }
      });
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  }
};
</script>

<style scoped lang="less">
    .breadcrumb{
        color: white;
    }
</style>
