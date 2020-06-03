<template>
  <el-container class="con">
    <el-aside width="200px">
      <el-menu router class="sidemenu" unique-opened default-active="$route.path">
        <el-submenu index="/manageinfo">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>管理信息</span>
          </template>
          <el-menu-item index="/manageinfo">首页</el-menu-item>
          <el-menu-item index="/manageinfo/usercontrol">用户管理</el-menu-item>
          <el-menu-item index="/manageinfo/logout">退出</el-menu-item>
        </el-submenu>
        <el-submenu index="/productmanage">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>产品管理</span>
          </template>
          <el-menu-item index="/productmanage/productkind">产品分类列表</el-menu-item>
          <el-menu-item index="/productmanage/productlist">产品列表</el-menu-item>
        </el-submenu>
        <el-submenu index="/purchase">
          <template slot="title">
            <i class="el-icon-plus"></i>
            <span>采购管理</span>
          </template>
          <el-menu-item index="/purchase/supply">供应商管理</el-menu-item>
          <el-menu-item index="/purchase/newlist">新增采购单</el-menu-item>
          <el-menu-item index="/purchase/compelete">采购单了结</el-menu-item>
          <el-menu-item index="/purchase/requestlist">采购单查询</el-menu-item>
        </el-submenu>
        <el-submenu index="/stock">
          <template slot="title">
            <i class="el-icon-star-on"></i>
            <span>仓库管理</span>
          </template>
          <el-menu-item index="/stock/instock">入库登记</el-menu-item>
          <el-menu-item index="/stock/outstock">出库登记</el-menu-item>
          <el-menu-item index="/stock/requeststock">库存查询</el-menu-item>
          <el-menu-item index="/stock/stockcheck">库存盘点</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-edit"></i>
            <span>销售管理</span>
          </template>
          <el-menu-item index="/sales/client">客户管理</el-menu-item>
          <el-menu-item index="/sales/newsaleslist">新增销售单</el-menu-item>
          <el-menu-item index="/sales/salescompelete">销售单了结</el-menu-item>
          <el-menu-item index="/sales/requestsales">销售单查询</el-menu-item>
        </el-submenu>
        <el-submenu index="/finance">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>财务收支</span>
          </template>
          <el-menu-item index="/finance/receive">收款登记</el-menu-item>
          <el-menu-item index="6-2">付款登记</el-menu-item>
          <el-menu-item index="6-3">收支查询</el-menu-item>
        </el-submenu>
        <el-submenu index="/monthreport">
          <template slot="title">
            <i class="el-icon-info"></i>
            <span>月度报表</span>
          </template>
          <el-menu-item index="/monthreport">月度报表</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container class="top">
      <el-header class="head">
        <el-col :span="10">
         <breadcrumb/>
        </el-col>
        <el-col :span="6" :offset="13" class="time">
          <i class="el-icon-time"></i>
          <span >{{localtime}}</span>
        </el-col>
        <el-col :span="1">
          <img src="../../assets/logo.png" alt />
        </el-col>
      </el-header>
      <el-main id="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import moment from "moment";
import breadcrumb from "@/components/breadcrumb"
export default {
  created() {
    var _this = this;
    setInterval(() => {
      _this.localtime = new Date().toLocaleString();
    }, 1000);
  },
  computed: {
    defaultActive() {
      return "/" + this.$route.path.split("/").reverse()[0];
    }
  },
  data() {
    return {
      localtime: ""
    };
  },
  components:{
    breadcrumb
  },
  methods: {
    breadcrumbClick(item) {
      this.$router.push({
        path: item.path
      });
    }
  }
};
</script>

<style lang="less" scoped>
.con{
  height: 100vh
}
.sidemenu {
  height: 100%;
  background-color: #F4F4F5;
}
.head {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #c4b4e4;
  height: 56px;
  img {
    width: 40px;
  }
  .time{
    font-size: 14px;
    color: #fff;
  }
}
#main{
  padding: 5px;
}
</style>