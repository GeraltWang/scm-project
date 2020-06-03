<template>
  <div>
    <el-form
      size="mini"
      :model="requestlist"
      ref="requestlist"
      :inline="true"
      label-position="left"
    >
      <!-- <el-form-item label="采购单编号" prop="poId">
        <el-input v-model="requestlist.poId" clearable></el-input>
      </el-form-item>
      <el-form-item label="供应商编号" prop="venderCode">
        <el-input v-model="requestlist.venderCode" clearable></el-input>
      </el-form-item> -->
      <el-form-item label="付款方式">
        <el-select v-model="requestlist.payType" placeholder="请选择" clearable>
          <el-option label="货到付款" value="1"></el-option>
          <el-option label="款到发货" value="2"></el-option>
          <el-option label="预付款到发货" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="处理状态">
        <el-select v-model="requestlist.status" placeholder="请选择" clearable>
          <el-option label="新增" value="1"></el-option>
          <el-option label="已收货" value="2"></el-option>
          <el-option label="已付款" value="3"></el-option>
          <el-option label="已了结" value="4"></el-option>
          <el-option label="已预付" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" class="datatable">
      <el-table-column fixed type="index" :index="indexMethod" label="序号" width="90"></el-table-column>
      <el-table-column prop="poId" label="采购单编号" width="150"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="220"></el-table-column>
      <el-table-column prop="venderName" label="供应商名称" width="120"></el-table-column>
      <el-table-column prop="venderCode" label="供应商编号" width="120"></el-table-column>
      <el-table-column prop="tipFee" label="附加费用" width="120"></el-table-column>
      <el-table-column prop="productTotal" label="采购产品总价" width="120"></el-table-column>
      <el-table-column prop="poTotal" label="采购单总价格" width="120"></el-table-column>
      <el-table-column prop="payType" label="付款方式" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.payType|paytype}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="prePayFee" label="最低预付款金额" width="120"></el-table-column>
      <el-table-column prop="status" label="处理状态" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.status|statustype}}</span>
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      requestlist: {
        poId: "",
        venderCode: "",
        payType: "",
        status: ""
      },
      tableData: [],
      pagetotal: "",
      currpage: 1,
      pagesize: 10
    };
  },
  methods: {
    onSubmit() {
      axios({
        url: "api/main/purchase/pomain/query",
        method: "get",
        params: {
          poId: this.requestlist.poId,
          venderCode: this.requestlist.venderCode,
          payType: this.requestlist.payType,
          status: this.requestlist.status
        }
      })
        .then(resp => {
          console.log("响应的结果：", resp);
          this.tableData=resp.data.list
          this.pagetotal=resp.data.total
        })
        .catch(err => {
          console.log("请求失败：", err);
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
        url: "api/main/purchase/pomain/query",
        method: "get",
        params: {
          poId: this.requestlist.poId,
          venderCode: this.requestlist.venderCode,
          payType: this.requestlist.payType,
          status: this.requestlist.status,
          page:val
        }
      })
        .then(resp => {
          console.log("响应的结果：", resp);
          this.tableData=resp.data.list
          this.pagetotal=resp.data.total
        })
        .catch(err => {
          console.log("请求失败：", err);
        });
      
    },
  },
  filters: {
    statustype(value) {
      if (value == 1) {
        value = "新增";
        return value;
      } else if (value == 2) {
        value = "已收货";
        return value;
      } else if (value == 3) {
        value = "已付款";
        return value;
      } else {
        value = "已了结";
        return value;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.datatable{
    min-height: 550px;
}
</style>