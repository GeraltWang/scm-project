<template>
  <div>
    <el-row>
      <el-collapse accordion>
        <el-collapse-item title="新增采购单">
          <el-form size="mini" :model="newlist" ref="newlist" :inline="true" label-position="top">
            <el-form-item label="采购单编号" prop="poId">
              <el-input v-model="newlist.poId" readonly></el-input>
            </el-form-item>
            <el-form-item label="供应商编号" prop="venderCode">
              <el-select v-model="newlist.venderCode" clearable>
                <el-option
                  :value="item.venderCode"
                  v-for="(item, index) in pomin"
                  :key="index"
                >{{item.name}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="创建用户" prop="account">
              <el-input v-model="newlist.account" readonly></el-input>
            </el-form-item>
            <el-form-item label="创建时间" prop="createTime">
              <el-input v-model="newlist.createTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="附加费用" prop="tipFee">
              <el-input v-model="newlist.tipFee"></el-input>
            </el-form-item>
            <el-form-item label="商品总价" prop="productTotal">
              <el-input v-model="newlist.productTotal"></el-input>
            </el-form-item>
            <el-form-item label="采购总价" prop="poTotal">
              <el-input v-model="newlist.poTotal"></el-input>
            </el-form-item>
            <el-form-item label="付款方式" prop="payType">
              <el-select v-model="newlist.payType" clearable>
                <el-option label="货到付款" value="1"></el-option>
                <el-option label="款到发货" value="2"></el-option>
                <el-option label="预付款到发货" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="最低预付款金额" prop="prePayFee">
              <el-input v-model="newlist.prePayFee"></el-input>
            </el-form-item>
            <el-form-item label="采购单状态" prop="status">
              <el-select v-model="newlist.status" clearable>
                <el-option label="新增" value="1"></el-option>
                <el-option label="已收货" value="2"></el-option>
                <el-option label="已付款" value="3"></el-option>
                <el-option label="已了结" value="4"></el-option>
                <el-option label="已预付" value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="newlist.remark"></el-input>
            </el-form-item>
            <el-row v-for="(item, index) in newlist.poitems" :key="index">
              <el-divider></el-divider>
              <el-form-item label="产品编号" :prop="'poitems.' + index + '.productCode'">
                <el-select v-model="item.productCode">
                  <el-option
                    :value="item.productCode"
                    v-for="(item, index) in productCode"
                    :key="index"
                  >{{item.categoryName}}</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="产品单价" :prop="'poitems.' + index + '.unitPrice'">
                <el-input v-model="item.unitPrice"></el-input>
              </el-form-item>
              <el-form-item label="产品数量" :prop="'poitems.' + index + '.num'">
                <el-input v-model="item.num"></el-input>
              </el-form-item>
              <el-form-item label="数量单位" :prop="'poitems.' + index + '.unitName'">
                <el-input v-model="item.unitName"></el-input>
              </el-form-item>
              <el-form-item label="明细总价" :prop="'poitems.' + index + '.itemPrice'">
                <el-input v-model="item.itemPrice"></el-input>
              </el-form-item>
              <el-form-item>
                <i class="el-icon-delete" @click="deleteItem(item, index)"></i>
              </el-form-item>
            </el-row>
            <el-button @click="addItem" type="primary" size="small" class="addbtn">增加产品条目</el-button>
          </el-form>

          <el-tooltip content="点击新增采购单" placement="top">
            <el-button type="primary" icon="el-icon-plus" circle @click="submitForm('newlist')"></el-button>
          </el-tooltip>
          <el-tooltip content="点击重置表单" placement="top">
            <el-button type="danger" icon="el-icon-refresh" circle @click="resetForm('newlist')"></el-button>
          </el-tooltip>
        </el-collapse-item>
      </el-collapse>
    </el-row>
    <el-table
      :data="tableData.slice((currpage-1)*pagesize,currpage*pagesize)"
      style="width: 100%"
      class="datatable"
    >
      <el-table-column fixed type="index" :index="indexMethod" label="序号" width="90"></el-table-column>
      <el-table-column prop="poId" label="采购单编号" width="180px"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180px"></el-table-column>
      <el-table-column prop="venderName" label="供应商名称"></el-table-column>
      <el-table-column prop="account" label="创建用户"></el-table-column>
      <el-table-column prop="tipFee" label="附加费用"></el-table-column>
      <el-table-column prop="productTotal" label="采购产品总价"></el-table-column>
      <el-table-column prop="poTotal" label="采购单总价格"></el-table-column>
      <el-table-column prop="payType" label="付款方式">
        <template slot-scope="scope">
          <span>{{scope.row.payType|paytype}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="prePayFee" label="最低预付款金额"></el-table-column>
      <el-table-column fixed="right" label="操作" width="160">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="small"
            circle
            @click="startEdit(scope.$index, scope.row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-more"
            size="small"
            circle
            @click="showpoitems(scope.$index, scope.row)"
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
    <!-- 修改对话框 -->
    <el-dialog title="修改采购单信息" :visible.sync="dialogFormVisible" center>
      <el-form :model="editlist" ref="editlist" inline label-position="top">
        <el-form-item label="采购单编号" prop="poId">
          <el-input v-model="editlist.poId"></el-input>
        </el-form-item>
        <el-form-item label="供应商编号" prop="venderCode">
          <el-select v-model="editlist.venderCode" clearable>
            <el-option
              :value="item.venderCode"
              :label="item.name"
              v-for="(item, index) in pomin"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建用户" prop="account">
          <el-input v-model="editlist.account" disabled></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-input v-model="editlist.createTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="附加费用" prop="tipFee">
          <el-input v-model="editlist.tipFee"></el-input>
        </el-form-item>
        <el-form-item label="商品总价" prop="productTotal">
          <el-input v-model="editlist.productTotal"></el-input>
        </el-form-item>
        <el-form-item label="采购总价" prop="poTotal">
          <el-input v-model="editlist.poTotal"></el-input>
        </el-form-item>
        <el-form-item label="付款方式" prop="payType">
          <el-select v-model="editlist.payType" clearable>
            <el-option label="货到付款" value="1"></el-option>
            <el-option label="款到发货" value="2"></el-option>
            <el-option label="预付款到发货" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最低预付款金额" prop="prePayFee">
          <el-input v-model="editlist.prePayFee"></el-input>
        </el-form-item>
        <el-form-item label="采购单状态" prop="status">
          <el-select v-model="editlist.status" clearable>
            <el-option label="新增" value="1"></el-option>
            <el-option label="已收货" value="2"></el-option>
            <el-option label="已付款" value="3"></el-option>
            <el-option label="已了结" value="4"></el-option>
            <el-option label="已预付" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="editlist.remark"></el-input>
        </el-form-item>
        <div v-for="(item, index) in editlist.poitems" :key="index">
          <el-form-item label="产品编号" :prop="'poitems.' + index + '.productCode'">
            <el-select v-model="item.productCode" class="log">
              <el-option
                :value="item.productCode"
                v-for="(item, index) in productCode"
                :key="index"
              >{{item.categoryName}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品单价" :prop="'poitems.' + index + '.unitPrice'">
            <el-input v-model="item.unitPrice"  class="log"></el-input>
          </el-form-item>
          <el-form-item label="产品数量" :prop="'poitems.' + index + '.num'">
            <el-input v-model="item.num" class="log"></el-input>
          </el-form-item>
          <el-form-item label="数量单位" :prop="'poitems.' + index + '.unitName'">
            <el-input v-model="item.unitName" class="log"></el-input>
          </el-form-item>
          <el-form-item label="明细总价" :prop="'poitems.' + index + '.itemPrice'">
            <el-input v-model="item.itemPrice" class="log"></el-input>
          </el-form-item>
          <el-form-item>
            <i class="el-icon-delete" @click="deleteeditItem(item, index)"></i>
          </el-form-item>
        </div>
        <el-button @click="addeditItem" type="primary">增加产品条目</el-button>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="compeleteEdit('editlist')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 详情对话框 -->
    <el-dialog title="明细" :visible.sync="dialog2FormVisible" center>
      <el-table :data="poitemsData">
        <el-table-column property="productCode" label="产品编号"></el-table-column>
        <el-table-column property="productName" label="产品名称"></el-table-column>
        <el-table-column property="unitPrice" label="产品单价"></el-table-column>
        <el-table-column property="num" label="产品数量"></el-table-column>
        <el-table-column property="unitName" label="数量单位"></el-table-column>
        <el-table-column property="itemPrice" label="明细总价"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog2FormVisible = false">完 成</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import moment from "moment";
import { requestPost, requestGet, requestPostspec } from "../../utils/http";

export default {
  computed: {
    ...mapState(["user", "token"])
  },
  created() {
    this.newlist.account = this.user.account;
    axios({
      url: "api/main/purchase/pomain/show",
      method: "get",
      params: {
        type: 1
      }
    })
      .then(resp => {
        console.log("响应的结果：", resp);
        this.tableData = resp.data.list;
      })
      .catch(err => {
        console.log("请求失败：", err);
      });
    axios({
      url: " /api/main/purchase/vender/all",
      method: "get"
    })
      .then(resp => {
        console.log("响应的结果+++供应商", resp.data);
        this.pomin = resp.data;
        console.log(this.pomin);
      })
      .catch(err => {
        console.log("请求失败", err);
      });
    axios({
      url: " /api/main/sell/product/all",
      method: "get"
    })
      .then(resp => {
        console.log("响应的结果", resp.data);
        this.productCode = resp.data;
        console.log(this.productCode);
      })
      .catch(err => {
        console.log("请求失败", err);
      });
  },
  data() {
    return {
      newlist: {
        poId: moment().format("YYYYMMDDHHmmss"),
        venderCode: "",
        account: "",
        createTime: moment().format("YYYY-MM-DD HH:mm:ss"),
        tipFee: "",
        productTotal: "",
        poTotal: "",
        payType: "",
        prePayFee: "",
        status: "",
        remark: "",
        poitems: [
          {
            productCode: "",
            unitPrice: "",
            num: "",
            unitName: "",
            itemPrice: ""
          }
        ]
      },
      editlist: {
        poitems: [
          {
            productCode: "",
            unitPrice: "",
            num: "",
            unitName: "",
            itemPrice: ""
          }
        ]
      },
      dellist: {},
      poitemsData:[],
      pomin: [],
      productCode: [],
      tableData: [],
      currpage: 1,
      pagesize: 10,
      dialogFormVisible: false,
      dialog2FormVisible: false
    };
  },
  // computed: {
  //   total() {
  //     let sum = 0
  //     this.newlist.poitems.map(item => {
  //       sum += item.unitPrice * item.num
  //     })
  //     return sum
  //   }
  // },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          requestPostspec("api/main/purchase/pomain/add", this.newlist)
            .then(resp => {
              console.log("响应的结果：", resp);
              this.info = resp.data;
              if (this.info.code == 2) this.$message.success(this.info.message);
              else {
                this.$message.error(this.info.message);
              }
              this.$refs[formName].resetFields();
              axios({
                url: "api/main/purchase/pomain/show",
                method: "get",
                params: {
                  type: 1
                }
              })
                .then(resp => {
                  console.log("响应的结果：", resp);
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
    addItem() {
      this.newlist.poitems.push({
        productCode: "",
        unitPrice: "",
        num: "",
        unitName: "",
        itemPrice: ""
      });
    },
    addeditItem() {
      this.editlist.poitems.push({
        productCode: "",
        unitPrice: "",
        num: "",
        unitName: "",
        itemPrice: ""
      });
    },
    deleteItem(item, index) {
      this.newlist.poitems.splice(index, 1);
    },
    deleteeditItem(item, index) {
      this.editlist.poitems.splice(index, 1);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    indexMethod(index) {
      return index + 1;
    },
    startEdit(index, row) {
      this.dialogFormVisible = true;
      this.editlist = row;
      axios({
        url: "api/main/purchase/pomain/queryItem",
        method: "get",
        params: {
          poId: row.poId
        }
      })
        .then(resp => {
          this.editlist.poitems = resp.data;
        })
        .catch(err => {
          console.log("请求失败：", err);
        });
    },
    compeleteEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          requestPostspec("api/main/purchase/pomain/update", this.editlist)
            .then(resp => {
              console.log(this.editlist);

              this.dialogFormVisible = false;
              this.info = resp.data;
              if (this.info.code == 2) this.$message.success(this.info.message);
              else {
                this.$message.error(this.info.message);
              }
              axios({
                url: "api/main/purchase/pomain/show",
                method: "get",
                params: {
                  type: 1
                }
              })
                .then(resp => {
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
    showpoitems(index, row) {
      this.dialog2FormVisible = true;
      axios({
      url: " /api/main/purchase/pomain/queryItem",
      method: "get",
      params:{poId:row.poId}
    })
      .then(resp => {
        console.log(resp);
        this.poitemsData=resp.data
      })
      .catch(err => {
        console.log("请求失败", err);
      });
    },
    deleteRow(index, row) {
      this.$confirm("此操作将永久删除该采购单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.dellist["poId"] = row.poId;
          requestPost("api/main/purchase/pomain/delete", this.dellist)
            .then(resp => {
              console.log("响应的结果：", resp);
              this.info = resp.data;
              if (this.info.code == 2) this.$message.success(this.info.message);
              else {
                this.$message.error(this.info.message);
              }
              axios({
                url: "api/main/purchase/pomain/show",
                method: "get",
                params: {
                  type: 1
                }
              })
                .then(resp => {
                  this.tableData = resp.data.list;
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
  min-height: 550px;
}
.addbtn {
  margin-bottom: 10px;
}
.log{
  width: 110px;
}
</style>