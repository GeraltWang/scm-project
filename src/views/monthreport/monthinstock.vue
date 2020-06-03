<template>
  <div>
    <el-form size="mini">
      <el-form-item label="查询月度入库报表">
        <el-input v-model="time" placeholder="日期格式为：2020-01"></el-input>
      </el-form-item>
      <el-tooltip content="点击查询" placement="top">
        <el-button type="primary" icon="el-icon-plus" @click="request" class="reqbtn">查询</el-button>
      </el-tooltip>
    </el-form>
    <el-row>
      <el-tag type="success">入库单据数：{{totaltag.total}}</el-tag>
      <el-tag type="info">产品总数量：{{totaltag.totalNum}}</el-tag>
      <el-tag type="warning">产品总金额：{{totaltag.productTotal}}</el-tag>
    </el-row>
    <el-table :data="tableData" class="datatable">
      <el-table-column fixed type="index" :index="indexMethod" label="序号" width="90"></el-table-column>
      <el-table-column prop="poId" label="单号"></el-table-column>
      <el-table-column prop="productCode" label="产品编号"></el-table-column>
      <el-table-column prop="name" label="产品名称"></el-table-column>
      <el-table-column prop="stockTime" label="入库日期" width="200px"></el-table-column>
      <el-table-column prop="stockNum" label="库存数"></el-table-column>
      <el-table-column prop="productTotal" label="总价格"></el-table-column>
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
      pagetotal: "",
      time: ""
    };
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    request() {
      axios({
        url: "api/main/report/instock/main",
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
        url: "api/main/report/instock/main",
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
.datatable {
  min-height: 520px;
}
.reqbtn{
  margin-bottom: 17px;
}
</style>