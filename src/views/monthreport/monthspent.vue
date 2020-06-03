<template>
  <div>
    <el-form size="mini">
      <el-form-item label="查询月度报表">
        <el-input v-model="time" placeholder="日期格式为：2020-01"></el-input>
      </el-form-item>
      <el-tooltip content="点击查询" placement="top">
        <el-button type="primary" icon="el-icon-plus" @click="request" class="reqbtn" size="small">查询</el-button>
      </el-tooltip>
    </el-form>
    <el-row>
      <el-tag type="success">销售单数：{{totaltag.totalnum}}</el-tag>
      <el-tag type="info">已了结单数：{{totaltag.endtotalnum}}</el-tag>
      <el-tag type="warning">销售总金额：{{totaltag.sototal}}</el-tag>
      <el-tag type="danger">已付款金额：{{totaltag.totalpay}}</el-tag>
    </el-row>
    <el-table :data="tableData">
      <el-table-column fixed type="index" :index="indexMethod" label="序号" width="90"></el-table-column>
      <el-table-column prop="poId" label="采购单编号"></el-table-column>
      <el-table-column prop="venderName" label="供应商名称"></el-table-column>
      <el-table-column prop="createTime" label="创建日期" width="200px"></el-table-column>
      <el-table-column prop="createTime" label="创建用户"></el-table-column>
      <el-table-column prop="endUser" label="经手人"></el-table-column>
      <el-table-column prop="soTotal" label="采购单总价格"></el-table-column>
      <el-table-column prop="tipFee" label="未付款金额"></el-table-column>
      <el-table-column prop="tipFee" label="最低预付款金额"></el-table-column>
      <el-table-column fixed="right" prop="status" label="处理状态"></el-table-column>
    </el-table>
    <el-pagination v-if="pagetotal!==''"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total=" parseInt(pagetotal)"
    ></el-pagination>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {},
  data() {
    return {
      totaltag: [],
      tableData: [],
      currpage: 1,
      pagesize: 10,
      time: "",
      pagetotal: ""
    };
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    request() {
      axios({
        url: "api/main/report/pomain/main",
        method: "get",
        params: {
          time: this.time,
          page: 1
        }
      })
        .then(resp => {
          console.log("响应的结果：", resp);
          this.tableData = resp.data.details.list;
          this.pagetotal = resp.data.details.total;
          console.log("响应的结果：", this.tableData);

          this.totaltag = resp.data;
        })
        .catch(err => {
          console.log("请求失败：", err);
        });
    },
    handleCurrentChange(val) {
      this.currpage = val;
      axios({
        url: "api/main/report/pomain/main",
        method: "get",
        params: {
          time: this.time,
          page: val
        }
      })
        .then(resp => {
          console.log("响应的结果：", resp);
          this.tableData = resp.data.details.list;
          this.pagetotal = resp.data.details.total;
          console.log("响应的结果：", this.tableData);

          this.totaltag = resp.data;
        })
        .catch(err => {
          console.log("请求失败：", err);
        });
    },
    handleSizeChange(val) {
      this.pagesize = val;
    }
  }
};
</script>

<style lang="less" scoped>
.reqbtn{
  margin-bottom: 17px;
}
</style>