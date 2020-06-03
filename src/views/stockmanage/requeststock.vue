<template>
  <div>
    <el-form
      size="mini"
      :model="requeststock"
      ref="requeststock"
      :inline="true"
      label-position="left"
    >
      <el-form-item label="产品编号" prop="productCode">
        <el-select v-model="requeststock.productCode" clearable>
          <el-option
            :value="item.productCode"
            v-for="(item, index) in product"
            :key="index"
          >{{item.productCode}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品名称" prop="name">
        <el-select v-model="requeststock.name" clearable>
          <el-option :value="item.name" v-for="(item, index) in product" :key="index">{{item.name}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="库存数量最小值" prop="min">
        <el-input v-model="requeststock.min" clearable></el-input>
      </el-form-item>
      <el-form-item label="库存数量最大值" prop="max">
        <el-input v-model="requeststock.max" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" class="datatable">
      <el-table-column type="index" :index="indexMethod" label="序号" width="90"></el-table-column>
      <el-table-column property="productCode" label="产品编号"></el-table-column>
      <el-table-column property="name" label="产品名称"></el-table-column>
      <el-table-column property="num" label="当前库存"></el-table-column>
      <el-table-column property="poNum" label="采购在途数"></el-table-column>
      <el-table-column property="soNum" label="预销售数"></el-table-column>
      <el-table-column fixed="right" label="操作" width="240">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-more"
            size="small"
            round
            @click="showinhistory(scope.$index, scope.row)"
          >入库记录</el-button>
          <el-button
            type="success"
            icon="el-icon-more"
            size="small"
            round
            @click="showouthistory(scope.$index, scope.row)"
          >出库记录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total=" parseInt(pagetotal)"
    ></el-pagination>

    <el-dialog title="入库变更记录" :visible.sync="dialogFormVisible" center>
      <el-table :data="inhis">
        <el-table-column type="index" :index="indexMethod" label="序号" width="90"></el-table-column>
        <el-table-column property="createUser" label="经手人"></el-table-column>
        <el-table-column property="orderCode" label="相关采购单号"></el-table-column>
        <el-table-column property="stockNum" label="入库数量"></el-table-column>
        <el-table-column property="stockTime" label="入库时间"></el-table-column>
        <el-table-column property="stockType" label="入库类型"></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="出库变更记录" :visible.sync="dialog2FormVisible" center>
      <el-table :data="outhis">
        <el-table-column type="index" :index="indexMethod" label="序号" width="90"></el-table-column>
        <el-table-column property="createUser" label="经手人"></el-table-column>
        <el-table-column property="orderCode" label="相关采购单号"></el-table-column>
        <el-table-column property="stockNum" label="出库数量"></el-table-column>
        <el-table-column property="stockTime" label="出库时间"></el-table-column>
        <el-table-column property="stockType" label="出库类型"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    axios({
      url: " api/main/stock/query",
      method: "get"
    })
      .then(resp => {
        console.log("响应的结果", resp.data);
        this.tableData = resp.data.list;
        this.pagetotal = resp.data.total;
      })
      .catch(err => {
        console.log("请求失败", err);
      });
    axios({
      url: " /api/main/sell/product/all",
      method: "get"
    })
      .then(resp => {
        // console.log("响应的结果", resp.data);
        this.product = resp.data;
        // console.log(this.product);
      })
      .catch(err => {
        console.log("请求失败", err);
      });
  },
  data() {
    return {
      requeststock: {
        productCode: "",
        name: "",
        min: "",
        max: ""
      },
      tableData: [],
      product: [],
      inhis: [],
      outhis: [],
      pagetotal: "",
      currpage: 1,
      pagesize: 10,
      dialogFormVisible: false,
      dialog2FormVisible: false,
      currentView: "inhis"
    };
  },
  methods: {
    onSubmit() {
      axios({
        url: "api/main/stock/query",
        method: "get",
        params: {
          poId: this.requeststock.productCode,
          name: this.requeststock.name,
          min: this.requeststock.min,
          max: this.requeststock.max
        }
      })
        .then(resp => {
          console.log("响应的结果：", resp);
          this.tableData = resp.data.list;
          //   this.pagetotal = resp.data.total;
        })
        .catch(err => {
          console.log("请求失败：", err);
        });
    },
    showinhistory(index, row) {
      this.dialogFormVisible = true;
      axios({
        url: " api/main/stock/alterRecord",
        method: "get",
        params: {
          productCode: row.productCode,
          stockType: 1
        }
      })
        .then(resp => {
          console.log("响应的结果", resp.data);
          this.inhis = resp.data.data.list;
          // this.pagetotal = resp.data.total;
        })
        .catch(err => {
          console.log("请求失败", err);
        });
    },
    showouthistory(index, row) {
      this.dialog2FormVisible = true;
      axios({
        url: " api/main/stock/alterRecord",
        method: "get",
        params: {
          productCode: row.productCode,
          stockType: 2
        }
      })
        .then(resp => {
          console.log("响应的结果", resp.data);
          this.outhis = resp.data.data.list;
          // this.pagetotal = resp.data.total;
        })
        .catch(err => {
          console.log("请求失败", err);
        });
    },
    indexMethod(index) {
      return index + 1;
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currpage = val;
      axios({
        url: "api/main/stock/query",
        method: "get",
        params: {
          page: val
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
    }
  }
};
</script>

<style lang="less" scoped>
.datatable {
  min-height: 550px;
}
</style>