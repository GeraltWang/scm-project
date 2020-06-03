<template>
  <div id="page">
    <el-row class="inforow">
      <img src="../../assets/weather.png" alt />
      {{user.name}}早上好，欢迎使用TerraGroup信息管理系统
    </el-row>
    <el-row class="inforow">
      <img src="../../assets/time.png" alt />
      您登陆的时间为：{{token|timeFormat}}
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
const qs = require("querystring");

export default {
  computed: {
    ...mapState(["user", "token"])
  },
  filters: {
    timeFormat(tt) {
      var pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
      var dateString = tt;
      let formatedDate = dateString.toString().replace(pattern, "$1/$2/$3 $4:$5:$6");
      return formatedDate
    }
  }
};
</script>

<style lang="less" scoped>
#page {
  background-color: aliceblue;
  height: 100%;
  .inforow {
    font-size: 14px;
    line-height: 40px;

    img {
      width: 24px;
    }
  }
}
</style>