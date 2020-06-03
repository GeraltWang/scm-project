<template>
  <div>
    <el-table :data="tableData.slice((currpage-1)*pagesize,currpage*pagesize)">
      <el-table-column type="index" :index="indexMethod" label="序号" width="90"></el-table-column>
      <el-table-column property="productCode" label="产品编号"></el-table-column>
      <el-table-column property="name" label="产品名称"></el-table-column>
      <el-table-column property="num" label="当前库存"></el-table-column>
      <el-table-column property="poNum" label="采购在途数"></el-table-column>
      <el-table-column property="soNum" label="预销售数"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="small"
            @click="startEdit(scope.$index, scope.row)"
          >盘点</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    ></el-pagination>
    <el-dialog title="库存盘点" :visible.sync="dialogFormVisible" center>
      <el-form :model="editlist" ref="editlist" inline>
        <el-form-item label="产品编号" prop="productCode">
          <el-input v-model="editlist.productCode"></el-input>
        </el-form-item>
        <el-form-item label="产品原始数量" prop="originNum">
          <el-input v-model="editlist.originNum"></el-input>
        </el-form-item>
        <el-form-item label="变化数量" prop="num">
          <el-input v-model="editlist.num"></el-input>
        </el-form-item>
        <el-form-item label="变化类型" prop="type">
          <el-select v-model="editlist.type" clearable>
            <el-option label="损耗" value="损耗"></el-option>
            <el-option label="盘余" value="盘余"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="变化原因" prop="description">
          <el-input v-model="editlist.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="compeleteEdit('editlist')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { requestPost, requestGet } from "../../utils/http";

export default {
  created() {
    axios({
      url: "api/main/sell/product/all",
      method: "get"
    })
      .then(resp => {
        console.log("响应的结果：", resp);
        this.tableData = resp.data;
      })
      .catch(err => {
        console.log("请求失败：", err);
      });
  },
  data() {
    return {
      tableData: [],
      editlist: {
        productCode: "",
        originNum: "",
        num: "",
        type: "",
        description: ""
      },
      currpage: 1,
      pagesize: 10,
      dialogFormVisible: false
    };
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currpage = val;
    },
    startEdit(index, row) {
      this.dialogFormVisible = true;
      this.editlist.originNum = row.num;
      this.editlist.productCode = row.productCode;
      this.editlist.num = "";
      this.editlist.description = "";
      this.editlist.type = "";
    },
    compeleteEdit(formName) {
      console.log(this.editlist);
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios({
            url: "api/main/stock/checkstock",
            method: "get",
            params: {
              productCode: this.editlist.productCode,
              originNum: this.editlist.originNum,
              num: this.editlist.num,
              type: this.editlist.type,
              description: this.editlist.description
            }
          })
            .then(resp => {
              this.dialogFormVisible = false;
              console.log("响应的结果：", resp);
              if (resp.data.code == 2) {
                this.$message.success(resp.data.message);
              } else {
                this.$message.error(resp.data.message);
              }
              axios({
                url: "api/main/sell/product/all",
                method: "get"
              })
                .then(resp => {
                  console.log("响应的结果：", resp);
                  this.tableData = resp.data;
                })
                .catch(err => {
                  console.log("请求失败：", err);
                });
            })
            .catch(err => {
              console.log("请求失败：", err);
            });
        } else {
          this.$message.error("信息不符");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>