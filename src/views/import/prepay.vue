<template>
  <div>
    <el-table :data="tableData" style="width: 100%" class="datatable">
      <el-table-column fixed type="index" :index="indexMethod" label="序号" width="90"></el-table-column>
      <el-table-column prop="venderCode" label="采购单编号" width="120"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="220"></el-table-column>
      <el-table-column prop="venderName" label="供应商名称" width="120"></el-table-column>
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
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="success"
            size="small"
            icon="el-icon-finished"
          >了结</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="parseInt(pagetotal)"
    ></el-pagination>
  </div>
</template>

<script>
import axios from "axios";
import { requestPost, requestGet } from "../../utils/http";

export default {
  created() {
    axios({
      url: "api/main/purchase/pomain/query",
      method: "get",
      params: {
        payType: 3,
        status: 3
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
  },
  data() {
    return {
      tableData: [],
      dellist: {},
      currpage: 1,
      pagesize: 10,
      pagetotal: ""
    };
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    deleteRow(index, row) {
      this.$confirm("此操作将了结该采购单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.dellist["poId"] = row.poId;
          this.dellist["payType"] = row.payType;
          requestPost("api/main/purchase/pomain/end", this.dellist)
            .then(resp => {
              console.log("响应的结果：", resp);
              this.info = resp.data;
              if (this.info.code == 2) this.$message.success(this.info.message);
              else {
                this.$message.error(this.info.message);
              }
              axios({
                url: "api/main/purchase/pomain/query",
                method: "get",
                params: {
                  payType: 3,
                  status: 3
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
            })
            .catch(err => {
              console.log("请求失败：", err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    handleCurrentChange(val) {
      this.currpage = val;
      axios({
        url: "api/main/purchase/pomain/query",
        method: "get",
        params: {
          payType: 3,
          page: val,
          status: 3
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
  },
  filters: {
    statustype(value) {
      if (value == 1) {
        value = "新增";
        return value;
      } else if (value == 5) {
        value = "已预付";
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
.datatable {
  min-height: 550px;
}
</style>