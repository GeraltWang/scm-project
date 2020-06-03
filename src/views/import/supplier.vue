<template>
  <div>
    <el-row>
      <el-collapse accordion>
        <el-collapse-item title="新增供应商">
          <el-form
            size="mini"
            :model="newsupplier"
            :rules="rules"
            ref="newsupplier"
            :inline="true"
            label-position="top"
          >
            <el-form-item label="供应商编号" prop="venderCode">
              <el-input v-model="newsupplier.venderCode"></el-input>
            </el-form-item>
            <el-form-item label="供应商名称" prop="name">
              <el-input v-model="newsupplier.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="passWord">
              <el-input v-model="newsupplier.passWord"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="contactor">
              <el-input v-model="newsupplier.contactor"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input v-model="newsupplier.address"></el-input>
            </el-form-item>
            <el-form-item label="邮政编码" prop="postCode">
              <el-input v-model="newsupplier.postCode"></el-input>
            </el-form-item>
            <el-form-item label="注册日期" prop="createDate">
              <el-input v-model="newsupplier.createDate"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="tel">
              <el-input v-model="newsupplier.tel"></el-input>
            </el-form-item>
            <el-form-item label="传真" prop="fax">
              <el-input v-model="newsupplier.fax"></el-input>
            </el-form-item>
          </el-form>
          <el-tooltip content="点击新增用户" placement="top">
            <el-button type="primary" icon="el-icon-plus" circle @click="submitForm('newsupplier')"></el-button>
          </el-tooltip>
          <el-button type="danger" icon="el-icon-delete" circle @click="resetForm('newsupplier')"></el-button>
        </el-collapse-item>
      </el-collapse>
    </el-row>
    <el-table :data="tableData" style="width: 100%" class="datatable" stripe>
      <el-table-column fixed type="index" :index="indexMethod" label="序号" width="90"></el-table-column>
      <el-table-column prop="venderCode" label="供应商编号" width="120"></el-table-column>
      <el-table-column prop="name" label="供应商名称" width="120"></el-table-column>
      <el-table-column prop="contactor" label="联系人" width="120"></el-table-column>
      <el-table-column prop="address" label="地址" width="120"></el-table-column>
      <el-table-column prop="postCode" label="邮政编码" width="120"></el-table-column>
      <el-table-column prop="createDate" label="注册日期" width="220"></el-table-column>
      <el-table-column prop="tel" label="电话" width="120"></el-table-column>
      <el-table-column prop="fax" label="传真" width="120"></el-table-column>
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
      :total="parseInt(pagetotal)"
    ></el-pagination>
    <el-dialog title="修改供应商信息" :visible.sync="dialogFormVisible" center>
      <el-form :model="editsupplier" ref="editsupplier" inline label-position="top" :rules="rules">
        <el-form-item label="供应商编号" prop="venderCode">
          <el-input v-model="editsupplier.venderCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="供应商名称" prop="name">
          <el-input v-model="editsupplier.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input v-model="editsupplier.passWord"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contactor">
          <el-input v-model="editsupplier.contactor"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="editsupplier.address"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码" prop="postCode">
          <el-input v-model="editsupplier.postCode"></el-input>
        </el-form-item>
        <el-form-item label="注册日期" prop="createDate">
          <el-input v-model="editsupplier.createDate" disabled></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="editsupplier.tel"></el-input>
        </el-form-item>
        <el-form-item label="传真" prop="fax">
          <el-input v-model="editsupplier.fax"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="compeleteEdit('editsupplier')">确 定</el-button>
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
      url: "api/main/purchase/vender/show",
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
      newsupplier: {
        venderCode: "",
        name: "",
        passWord: "",
        contactor: "",
        address: "",
        postCode: "",
        createDate: moment().format("YYYY-MM-DD HH:mm:ss"),
        tel: "",
        fax: ""
      },
      editsupplier: {
        venderCode: "",
        name: "",
        passWord: "",
        contactor: "",
        address: "",
        postCode: "",
        createDate: moment().format("YYYY-MM-DD HH:mm:ss"),
        tel: "",
        fax: ""
      },
      delsupplier: {},
      info: "",
      dialogFormVisible: false,
      pagetotal: "",
      rules: {
        venderCode: [
          { required: true, message: "请输入供应商编号", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9]{4,20}$/,
            message: "长度在4-20位的数字字母",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入供应商名称",
            min: 1,
            max: 100,
            trigger: "blur"
          }
        ],
        passWord: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            pattern: /^\w{4,20}$/,
            message: "长度在 4 到 20 个字符",
            trigger: "blur"
          }
        ],
        createDate: [
          {
            required: true,
            message: "请输入时间",
            trigger: "change"
          }
        ],
        contactor: [
          {
            required: true,
            message: "请输入联系人",
            trigger: "blur"
          }
        ],
        tel: [
          {
            required: true,
            message: "请输入电话号码",
            trigger: "blur"
          },
          {
            required: true,
            pattern: /^[0-9]+$/,
            message: "电话号码不正确",
            trigger: "blur"
          }
        ]
      },
      tableData: [],
      currpage: 1,
      pagesize: 10
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          requestPost("api/main/purchase/vender/add", this.newsupplier)
            .then(resp => {
              console.log("响应的结果：", resp);
              this.info = resp.data;
              this.$message.success("添供应商成功");
              this.$refs[formName].resetFields();
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
    deleteRow(index, row) {
      this.$confirm("此操作将永久删除该供应商, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delsupplier["venderCode"] = row.venderCode;
          requestPost("api/main/purchase/vender/delete", this.delsupplier)
            .then(resp => {
              console.log("响应的结果：", resp);
              this.info = resp.data;
              axios({
                url: "api/main/purchase/vender/show",
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
      this.editsupplier=row
    },
    compeleteEdit(formName) {
      console.log(this.editsupplier);
      this.$refs[formName].validate(valid => {
        if (valid) {
          requestPost("api/main/purchase/vender/update", this.editsupplier)
            .then(resp => {
              this.dialogFormVisible = false;
              console.log("响应的结果：", resp);
              this.info = resp.data;
              this.$message.success("修改供应商成功");
              axios({
                url: "api/main/purchase/vender/show",
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
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currpage = val;
      axios({
        url: "api/main/purchase/vender/show",
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
  min-height: 600px;
}
</style>