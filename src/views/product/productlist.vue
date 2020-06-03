<template>
  <div>
    <el-row>
      <el-collapse accordion>
        <el-collapse-item title="添加产品">
          <el-form
            size="mini"
            :model="newlist"
            ref="newlist"
            :rules="rules"
            inline
            label-position="top"
          >
            <el-form-item label="产品编号" prop="productCode">
              <el-input v-model="newlist.productCode"></el-input>
            </el-form-item>
            <el-form-item label="产品名称" prop="name">
              <el-input v-model="newlist.name"></el-input>
            </el-form-item>
            <el-form-item label="数量单位" prop="unitName">
              <el-input v-model="newlist.unitName"></el-input>
            </el-form-item>
            <el-form-item label="分类编号" prop="categoryId">
              <el-input v-model="newlist.categoryId"></el-input>
            </el-form-item>
            <el-form-item label="销售价" prop="price">
              <el-input v-model="newlist.price"></el-input>
            </el-form-item>
            <el-form-item label="添加日期" prop="createDate">
              <el-input v-model="newlist.createDate" disabled></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="remark">
              <el-input v-model="newlist.remark"></el-input>
            </el-form-item>
          </el-form>
          <el-tooltip content="点击新增分类" placement="top">
            <el-button type="primary" icon="el-icon-plus" circle @click="submitForm('newlist')"></el-button>
          </el-tooltip>
          <el-button type="danger" icon="el-icon-delete" circle @click="resetForm('newlist')"></el-button>
        </el-collapse-item>
      </el-collapse>
    </el-row>
    <el-table
      :data="tableData.slice((currpage-1)*pagesize,currpage*pagesize)"
      style="width: 100%"
      class="datatable"
    >
      <el-table-column type="index" :index="indexMethod" label="序号" width="90"></el-table-column>
      <el-table-column prop="productCode" label="产品编号"></el-table-column>
      <el-table-column prop="name" label="产品名称"></el-table-column>
      <el-table-column prop="unitName" label="数量单位"></el-table-column>
      <el-table-column prop="categoryId" label="分类序列号"></el-table-column>
      <el-table-column prop="price" label="销售价格"></el-table-column>
      <el-table-column prop="createDate" label="添加日期"></el-table-column>
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
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    ></el-pagination>

    <el-dialog title="修改产品信息" :visible.sync="dialogFormVisible" center>
      <el-form :model="editlist" ref="editlist" :rules="rules">
        <el-form-item label="产品编号" prop="productCode">
          <el-input v-model="editlist.productCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="name">
          <el-input v-model="editlist.name"></el-input>
        </el-form-item>
        <el-form-item label="数量单位" prop="unitName">
          <el-input v-model="editlist.unitName"></el-input>
        </el-form-item>
        <el-form-item label="分类编号" prop="categoryId">
          <el-input v-model="editlist.categoryId"></el-input>
        </el-form-item>
        <el-form-item label="销售价" prop="price">
          <el-input v-model="editlist.price"></el-input>
        </el-form-item>
        <el-form-item label="添加日期" prop="createDate">
          <el-input v-model="editlist.createDate" disabled></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input v-model="editlist.remark"></el-input>
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
import moment from "moment";
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
      newlist: {
        productCode: "",
        name: "",
        unitName: "",
        categoryId: "",
        price: "",
        createDate: moment().format("YYYY-MM-DD HH:mm:ss"),
        remark: ""
      },
      editlist: {
        productCode: "",
        name: "",
        unitName: "",
        categoryId: "",
        price: "",
        createDate: moment().format("YYYY-MM-DD HH:mm:ss"),
        remark: ""
      },
      dellist: {},
      rules: {
        productCode: [
          { required: true, message: "请输入产品编号", trigger: "blur" },
          {
            pattern: /^[0-9a-zA-Z]{4,10}$/,
            message: "产品编号为4-10位字母数字",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            min: 1,
            max: 100,
            message: "请输入产品名称",
            trigger: "blur"
          }
        ],
        unitName: [{ required: true, message: "请输入数量单位" }],
        categoryId: [{ required: true, message: "请输入分类编号" }],
        price: [
          { required: true, pattern: /^\d+$/, message: "请输入销售价格" }
        ],
        createDate: [{ required: true, message: "请输入当前时间" }]
      },
      currpage: 1,
      pagesize: 10,
      dialogFormVisible: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          requestPost("api/main/sell/product/add", this.newlist)
            .then(resp => {
              console.log("响应的结果：", resp);
              this.info = resp.data;
              this.$message.success("添加产品分类成功");
              this.$refs[formName].resetFields();
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
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    startEdit(index, row) {
      this.dialogFormVisible = true;
      this.editlist = row;
    },
    compeleteEdit(formName) {
      console.log(this.editlist);
      this.$refs[formName].validate(valid => {
        if (valid) {
          requestPost("api/main/sell/product/update", this.editlist)
            .then(resp => {
              this.dialogFormVisible = false;
              console.log("响应的结果：", resp);
              this.info = resp.data;
              this.$message.success("修改产品分类成功");
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
    },
    indexMethod(index) {
      return index + 1;
    },
    deleteRow(index, row) {
      this.$confirm("此操作将永久删除该产品分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.dellist["productCode"] = row.productCode;
          requestPost("api/main/sell/product/delete", this.dellist)
            .then(resp => {
              console.log("响应的结果：", resp.data);
              this.info = resp.data;
              if (this.info.code == 4) {
                this.$message({
                  type: "info",
                  message: "存在依赖的记录，无法删除该项目"
                });
              } else {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currpage = val;
    }
  }
};
</script>

<style lang="less" scoped>
.datatable {
  min-height: 600px;
}
</style>