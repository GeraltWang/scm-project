<template>
  <div>
    <el-row>
      <el-collapse accordion>
        <el-collapse-item title="新增用户">
          <el-form
            size="mini"
            :model="newclient"
            :rules="rules"
            ref="newclient"
            inline
            label-position="top"
          >
            <el-form-item label="客户账号" prop="customerCode" class="input">
              <el-input v-model="newclient.customerCode"></el-input>
            </el-form-item>
            <el-form-item label="客户名称" prop="name" class="input">
              <el-input v-model="newclient.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="passWord" class="input">
              <el-input v-model="newclient.passWord" show-password></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="contactor" class="input">
              <el-input v-model="newclient.contactor"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address" class="input">
              <el-input v-model="newclient.address"></el-input>
            </el-form-item>
            <el-form-item label="邮政编码" prop="postCode" class="input">
              <el-input v-model="newclient.postCode"></el-input>
            </el-form-item>
            <el-form-item label="注册日期" prop="createDate" class="input">
              <el-input v-model="newclient.createDate" disabled></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="tel" class="input">
              <el-input v-model="newclient.tel"></el-input>
            </el-form-item>
            <el-form-item label="传真" prop="fax" class="input">
              <el-input v-model="newclient.fax"></el-input>
            </el-form-item>
          </el-form>
          <el-tooltip content="点击新增用户" placement="top">
            <el-button type="primary" icon="el-icon-plus" circle @click="submitForm('newclient')"></el-button>
          </el-tooltip>
          <el-button type="danger" icon="el-icon-delete" circle @click="resetForm('newclient')"></el-button>
        </el-collapse-item>
      </el-collapse>
    </el-row>
    <el-table :data="tableData" style="width: 100%" class="datatable">
      <el-table-column type="index" :index="indexMethod" label="序号" width="90"></el-table-column>
      <el-table-column prop="customerCode" label="客户账号"></el-table-column>
      <el-table-column prop="name" label="客户名称"></el-table-column>
      <el-table-column prop="contactor" label="联系人"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="postCode" label="邮政编码"></el-table-column>
      <el-table-column prop="createDate" label="注册日期" width="170px"></el-table-column>
      <el-table-column prop="tel" label="电话"></el-table-column>
      <el-table-column prop="fax" label="传真"></el-table-column>
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

    <el-dialog title="修改供应商信息" :visible.sync="dialogFormVisible" center>
      <el-form :model="editclient" ref="editclient" inline label-position="top" :rules="rules">
        <el-form-item label="客户编号" prop="customerCode">
          <el-input v-model="editclient.customerCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="客户名称" prop="name">
          <el-input v-model="editclient.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input v-model="editclient.passWord" show-password></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contactor">
          <el-input v-model="editclient.contactor"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="editclient.address"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码" prop="postCode">
          <el-input v-model="editclient.postCode"></el-input>
        </el-form-item>
        <el-form-item label="注册日期" prop="createDate">
          <el-input v-model="editclient.createDate" readonly></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="editclient.tel"></el-input>
        </el-form-item>
        <el-form-item label="传真" prop="fax">
          <el-input v-model="editclient.fax"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="compeleteEdit('editclient')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { requestPost, requestGet, requestPostspec } from "../../utils/http";
export default {
  created() {
    axios({
      url: "api/main/sell/customer/show",
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
      tableData: [],
      newclient: {
        createDate: moment().format("YYYY-MM-DD HH:mm:ss")
      },
      editclient: {
          createDate:""
      },
      delclient:{},
      pagetotal: "",
      dialogFormVisible: false,
      rules: {
        customerCode: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            pattern: /^\w{4,20}$/,
            message: "长度在 4 到 20 个字符",
            trigger: "blur"
          }
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        passWord: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          { min: 4, max: 20, message: "长度在 4 到 20 个字符", trigger: "blur" }
        ],
        contactor: [{ required: true }],
        tel: [{ required: true }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          requestPost("api/main/sell/customer/add", this.newclient)
            .then(resp => {
              console.log("响应的结果：", resp);
              //   this.info = resp.data;
              if (resp.data.code == 2) this.$message.success(resp.data.message);
              else {
                this.$message.error(resp.data.message);
              }
              this.$refs[formName].resetFields();
              axios({
                url: "api/main/sell/customer/show",
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
    },
    startEdit(index, row) {
      this.dialogFormVisible = true;
      this.editclient = row;
      console.log(this.editclient);
      
    },
    compeleteEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          requestPost("api/main/sell/customer/update", this.editclient)
            .then(resp => {
              this.dialogFormVisible = false;
              if (resp.data.code == 2) this.$message.success(resp.data.message);
              else {
                this.$message.error(resp.data.message);
              }
              axios({
                url: "api/main/sell/customer/show",
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
        } else {
          this.$message.error("信息不符");
          return false;
        }
      });
    },
    deleteRow(index, row) {
      this.$confirm("此操作将永久删除该客户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delclient["customerCode"] = row.customerCode;
          requestPost("api/main/sell/customer/delete", this.delclient)
            .then(resp => {
              console.log("响应的结果：", resp);
              if (resp.data.code == 2) this.$message.success(resp.data.message);
              else {
                this.$message.error(resp.data.message);
              }
              axios({
                url: "api/main/sell/customer/show",
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
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
        url: "api/main/sell/customer/show",
        method: "get",
        params: {
          page: val
        }
      })
        .then(resp => {
          //   console.log("响应的结果：", resp);
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
</style>