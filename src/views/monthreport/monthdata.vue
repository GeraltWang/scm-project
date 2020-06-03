<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="月度收支情况" name="1">
        <el-form size="mini">
          <el-form-item label="查询月度收支情况">
            <el-input v-model="time" placeholder="日期格式为：2020-01"></el-input>
          </el-form-item>
          <el-tooltip content="点击查询" placement="top">
            <el-button type="primary" icon="el-icon-plus" size="small" @click="request" class="reqbtn">查询</el-button>
          </el-tooltip>
        </el-form>
        <el-row>
          <el-tag type="success">收款次数：{{totaltag.receCount}}</el-tag>
          <el-tag type="success">收款总金额：{{totaltag.recePrice}}</el-tag>
          <el-tag type="success">付款次数：{{totaltag.payCount}}</el-tag>
          <el-tag type="success">付款总金额：{{totaltag.payPrice}}</el-tag>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="收款明细" name="2">
        <el-table :data="tableData" class="datatable">
          <el-table-column fixed type="index" :index="indexMethod" label="序号" width="90"></el-table-column>
          <el-table-column prop="soId" label="销售单编号"></el-table-column>
          <el-table-column prop="createTime" label="销售日期"></el-table-column>
          <el-table-column prop="pay_time" label="收款日期"></el-table-column>
          <el-table-column prop="pay_price" label="收款金额"></el-table-column>
          <el-table-column prop="account" label="经手人"></el-table-column>
          <el-table-column prop="status" label="处理状态"></el-table-column>
        </el-table>
        <el-pagination v-if="pagetotal!==''"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total=" parseInt(pagetotal)"
        ></el-pagination>
      </el-collapse-item>
      <el-collapse-item title="付款明细" name="3">
        <el-table :data="tableData2" class="datatable">
          <el-table-column fixed type="index" :index="indexMethod" label="序号" width="90"></el-table-column>
          <el-table-column prop="poId" label="采购单编号"></el-table-column>
          <el-table-column prop="createTime" label="采购日期"></el-table-column>
          <el-table-column prop="pay_time" label="收款日期"></el-table-column>
          <el-table-column prop="pay_price" label="收款金额"></el-table-column>
          <el-table-column prop="account" label="经手人"></el-table-column>
          <el-table-column prop="status" label="处理状态"></el-table-column>
        </el-table>
        <el-pagination v-if="pagetotal2!==''"
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total=" parseInt(pagetotal2)"
        ></el-pagination>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      activeNames: ["1"],
      tableData: [],
      tableData2: [],
      totaltag: [],
      time: "",
      pagetotal: "",
      currpage: 1,
      pagesize: 10,
      pagetotal2: "",
      currpage2: 1,
      pagesize2: 10
    };
  },
  methods: {
    request() {
      axios({
        url: "api/main/report/payment/main",
        method: "get",
        params: {
          time: this.time
        }
      })
        .then(resp => {
          console.log("响应的结果：", resp);
          this.totaltag = resp.data;
        })
        .catch(err => {
          console.log("请求失败：", err);
        });
      axios({
        url: "api/main/report/payment/detail/receipt",
        method: "get",
        params: {
          time: this.time
        }
      })
        .then(resp => {
          console.log("响应的结果：", resp);
          this.tableData = resp.data.list;
          this.pagetotal = resp.data.total;
        })
        .catch(err => {
          console.log("请求失败：", err);
        });
      axios({
        url: "api/main/report/payment/detail/pay",
        method: "get",
        params: {
          time: this.time
        }
      })
        .then(resp => {
          console.log("响应的结果：", resp);
          this.tableData2 = resp.data.list;
          this.pagetotal2 = resp.data.total;
        })
        .catch(err => {
          console.log("请求失败：", err);
        });
    },
    indexMethod(index) {
      return index + 1;
    },
    handleCurrentChange(val) {
      this.currpage = val;
      axios({
        url: "api/main/report/payment/detail/receipt",
        method: "get",
        params: {
          time: this.time,
          page: val
        }
      })
        .then(resp => {
          console.log("响应的结果：", resp);
          this.tableData = resp.data.list;
          this.pagetotal = resp.data.total;
          console.log("响应的结果：", this.tableData);
        })
        .catch(err => {
          console.log("请求失败：", err);
        });
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange2(val) {
      this.currpage = val;
      axios({
        url: "api/main/report/payment/detail/pay",
        method: "get",
        params: {
          time: this.time,
          page: val
        }
      })
        .then(resp => {
          console.log("响应的结果：", resp);
          this.tableData2 = resp.data.list;
          this.pagetotal2 = resp.data.total;
          console.log("响应的结果：", this.tableData2);
        })
        .catch(err => {
          console.log("请求失败：", err);
        });
    },
    handleSizeChange2(val) {
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