<template>
  <div>
    <el-row>
      <el-collapse accordion>
        <el-collapse-item title="新增用户">
          <el-form size="mini" :model="newuser" :rules="rules" ref="newuser">
            <el-form-item label="用户账号" prop="account" class="input">
              <el-input v-model="newuser.account" ></el-input>
            </el-form-item>
            <el-form-item label="用户姓名" prop="name" class="input">
              <el-input v-model="newuser.name"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="passWord" class="input">
              <el-input v-model="newuser.passWord"></el-input>
            </el-form-item>
            <el-form-item label="添加日期" prop="createDate" class="input">
              <el-input v-model="newuser.createDate" disabled></el-input>
            </el-form-item>
            <el-form-item label="锁定状态" prop="status">
              <el-radio-group v-model="newuser.status">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="用户权限" prop="modelcodes">
              <el-checkbox-group v-model="newuser.modelcodes">
                <el-checkbox label="1">采购管理</el-checkbox>
                <el-checkbox label="2">销售管理</el-checkbox>
                <el-checkbox label="5">仓库管理</el-checkbox>
                <el-checkbox label="4">财务管理</el-checkbox>
                <el-checkbox label="6">业务报表</el-checkbox>
                <el-checkbox label="3">系统管理</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
          <el-tooltip content="点击新增用户" placement="top">
            <el-button type="primary" icon="el-icon-plus" circle @click="submitForm('newuser')"></el-button>
          </el-tooltip>
          <el-button type="danger" icon="el-icon-delete" circle @click="resetForm('newuser')"></el-button>
        </el-collapse-item>
      </el-collapse>
    </el-row>
    <el-table :data="tableData" style="width: 100%" class="datatable">
      <el-table-column type="index" :index="indexMethod" label="序号" width="90"></el-table-column>
      <el-table-column prop="account" label="用户账号" width="180"></el-table-column>
      <el-table-column prop="name" label="用户姓名"></el-table-column>
      <el-table-column label="锁定状态">
        <template slot-scope="scope">
          <span>{{scope.row.status|status}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="添加日期"></el-table-column>
      <el-table-column  label="用户权限列表" width="270px">
        <template slot-scope="scope">
          <el-tag type="success" v-for="(item, index) in scope.row.models" :key="index">{{item.modelName}}</el-tag>
        </template>
      </el-table-column>
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
      layout="total, sizes, prev, pager, next, jumper"
      :total=" parseInt(pagetotal)"
    ></el-pagination>

    <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible" center>
      <el-form :model="edituser" refs="edituser">
        <el-form-item label="账号" prop="account">
          <el-input autocomplete="off" v-model="edituser.account" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input autocomplete="off" v-model="edituser.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input autocomplete="off" v-model="edituser.passWord"></el-input>
        </el-form-item>
        <el-form-item label="锁定状态" prop="status">
          <el-radio-group v-model="edituser.status">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户权限" prop="modelcodes">
          <el-checkbox-group v-model="edituser.modelcodes">
            <el-checkbox label="1">采购管理</el-checkbox>
            <el-checkbox label="2">销售管理</el-checkbox>
            <el-checkbox label="5">仓库管理</el-checkbox>
            <el-checkbox label="4">财务管理</el-checkbox>
            <el-checkbox label="6">业务报表</el-checkbox>
            <el-checkbox label="3">系统管理</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="compeleteEdit">确 定</el-button>
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
      url: "api/main/system/user/show",
      method: "get"
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
      newuser: {
        account: "",
        name: "",
        passWord: "",
        createDate: moment().format("YYYY-MM-DD HH:mm:ss"),
        status: "",
        modelcodes: []
      },
      edituser: {
        account: "",
        name: "",
        passWord: "",
        status: "",
        modelcodes: []
      },
      deluser: {},
      tableData: [],
      info: "",
      dialogFormVisible: false,
      pagetotal: "",
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        passWord: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        createDate: [
          {
            required: true,
            message: "请输入时间",
            trigger: "change"
          }
        ],
        status: [
          {
            required: true,
            message: "请至少选择一个状态",
            trigger: "change"
          }
        ],
        modelcodes: [
          {
            type: "array",
            required: true,
            message: "请选择授权",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    deleteRow(index, row) {
      this.$confirm("此操作将永久删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deluser["account"] = row.account;
          requestPost("api/main/system/user/delete", this.deluser)
            .then(resp => {
              console.log("响应的结果：", resp);
              this.info = resp.data;
              location.reload();
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
    startEdit(index, row) {
      this.dialogFormVisible = true;
      this.edituser.account = row.account;
      this.edituser.name = row.name;
      this.edituser.passWord = row.passWord;
      // this.edituser = row
    },
    compeleteEdit() {
      this.dialogFormVisible = false;
      console.log(this.edituser);
      requestPost("api/main/system/user/update", this.edituser)
        .then(resp => {
          console.log("响应的结果：", resp);
          this.info = resp.data;
          this.$message.success("修改用户成功");
          this.edituser.name = "";
          this.edituser.modelcodes = [];
          this.edituser.passWord = "";
          this.edituser.status = "";
          axios({
            url: "api/main/system/user/show",
            method: "get"
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
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currpage = val;
      axios({
            url: "api/main/system/user/show",
            method: "get",
            params:{
              page:val
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          requestPost("api/main/system/user/add", this.newuser)
            .then(resp => {
              console.log("响应的结果：", resp);
              this.info = resp.data;
              this.$message.success("添加用户成功");
              this.$refs[formName].resetFields();
              axios({
                url: "api/main/system/user/show",
                method: "get"
              })
                .then(resp => {
                  console.log("响应的结果：", resp);
                  this.pagetotal = resp.data.total;
                  this.tableData = resp.data.list;
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
    }
  }
};
</script>

<style lang="less" scoped>
.input{
  width: 300px;
}
.datatable {
  min-height: 550px;
}
</style>