<template>
  <div>
    <el-row>
      <el-collapse accordion>
        <el-collapse-item title="添加产品分类">
          <el-form size="mini" :model="newkind" ref="newkind" :rules="rules">
            <el-form-item label="分类序列号">
              <el-input disabled placeholder="分类序列号系统自动分配"></el-input>
            </el-form-item>
            <el-form-item label="分类名称" prop="name">
              <el-input v-model="newkind.name"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="remark">
              <el-input v-model="newkind.remark"></el-input>
            </el-form-item>
          </el-form>
          <el-tooltip content="点击新增分类" placement="top">
            <el-button type="primary" icon="el-icon-plus" circle @click="submitForm('newkind')"></el-button>
          </el-tooltip>
          <el-button type="danger" icon="el-icon-delete" circle @click="resetForm('newkind')"></el-button>
        </el-collapse-item>
      </el-collapse>
    </el-row>
    <el-table
      :data="tableData.slice((currpage-1)*pagesize,currpage*pagesize)"
      style="width: 100%"
      class="datatable"
    >
      <el-table-column type="index" :index="indexMethod" label="序号" width="90"></el-table-column>
      <el-table-column prop="categoryId" label="分类序列号"></el-table-column>
      <el-table-column prop="name" label="产品名称"></el-table-column>
      <el-table-column prop="remark" label="描述"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="small"
            circle
            @click="startEdit(scope.$index, scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            circle
            @click.native.prevent="deleteRow(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    ></el-pagination>

    <el-dialog title="修改产品分类信息" :visible.sync="dialogFormVisible" center>
      <el-form :model="editkind" ref="editkind" :rules="rules">
        <el-form-item label="分类序列号" prop="categoryId">
          <el-input autocomplete="off" v-model="editkind.categoryId" disabled></el-input>
        </el-form-item>
        <el-form-item label="分类名称" prop="name">
          <el-input autocomplete="off" v-model="editkind.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input autocomplete="off" v-model="editkind.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="compeleteEdit('editkind')">确 定</el-button>
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
      url: "api/main/sell/category/all",
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
      newkind: {
        name: "",
        remark: ""
      },
      editkind: {
        categoryId: "",
        name: "",
        remark: ""
      },
      delkind:{

      },
      info: "",
      currpage: 1,
      pagesize: 10,
      dialogFormVisible: false,
      pagetotal: "",
      rules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          requestPost("api/main/sell/category/add", this.newkind)
            .then(resp => {
              console.log("响应的结果：", resp);
              this.info = resp.data;
              this.$message.success("添加产品分类成功");
              this.$refs[formName].resetFields();
              axios({
                url: "api/main/sell/category/all",
                method: "get"
              })
                .then(resp => {
                  console.log("响应的结果：", resp);
                  // this.pagetotal = resp.data.total;
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
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
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
      this.editkind.categoryId = row.categoryId;
      this.editkind.name = row.name;
      this.editkind.remark = row.remark;
    },
    compeleteEdit(formName) {
      console.log(this.editkind);
      this.$refs[formName].validate(valid => {
        if (valid) {
          requestPost("api/main/sell/category/update", this.editkind)
            .then(resp => {
              this.dialogFormVisible = false;
              console.log("响应的结果：", resp);
              this.info = resp.data;
              this.$message.success("修改产品分类成功");
              axios({
                url: "api/main/sell/category/all",
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
    },
    deleteRow(index, row) {
      this.$confirm("此操作将永久删除该产品分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delkind["categoryId"] = row.categoryId;
          requestPost("api/main/sell/category/delete", this.delkind)
            .then(resp => {
              console.log("响应的结果：", resp);
              this.info = resp.data;
              axios({
                url: "api/main/sell/category/all",
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
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
  }
};
</script>

<style lang="less" scoped>
.datatable {
  min-height: 600px;
}
</style>