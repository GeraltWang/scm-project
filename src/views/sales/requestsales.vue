<template>
  <div>
    <el-form inline label-position="top" size="small">
      <el-form-item label="采购单编号" prop="soId">
        <el-input v-model="request.soId" class="wide" clearable></el-input>
      </el-form-item>
      <el-form-item label="开始时间" prop="startDate">
        <el-date-picker
          v-model="request.startDate"
          type="datetime"
          placeholder="选择日期时间"
          class="wide"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="截止时间" prop="endDate">
        <el-date-picker v-model="request.endDate" type="datetime" placeholder="选择日期时间" class="wide"></el-date-picker>
      </el-form-item>
      <el-form-item label="付款方式" prop="payType">
        <el-select v-model="request.payType" clearable class="wide">
          <el-option label="货到付款" value="1"></el-option>
          <el-option label="款到发货" value="2"></el-option>
          <el-option label="预付款到发货" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="处理状态" prop="status">
        <el-select v-model="request.status" clearable class="wide">
          <el-option label="新增" value="1"></el-option>
          <el-option label="已收货" value="2"></el-option>
          <el-option label="已付款" value="3"></el-option>
          <el-option label="已了结" value="4"></el-option>
          <el-option label="已预付" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户选择" prop="customerCode">
        <el-select v-model="request.customerCode" clearable class="wide">
          <el-option :value="item.customerCode" v-for="(item, index) in client" :key="index">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.customerCode }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="点击查询">
        <el-button @click="requsestsend" type="success">查询</el-button>
      </el-form-item>
    </el-form>
    <template>
      <el-table :data="tableData" class="datatable" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand" label-width="110px">
              <el-form-item label="销售单编号">
                <span>{{ props.row.soId }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.createTime }}</span>
              </el-form-item>
              <el-form-item label="客户">
                <span>{{ props.row.customerName }}</span>
              </el-form-item>
              <el-form-item label="创建用户">
                <span>{{ props.row.account }}</span>
              </el-form-item>
              <el-form-item label="附加费用">
                <span>{{ props.row.tipFee }}</span>
              </el-form-item>
              <el-form-item label="产品总价">
                <span>{{ props.row.productTotal }}</span>
              </el-form-item>
              <el-form-item label="销售单总价格">
                <span>{{ props.row.soTotal }}</span>
              </el-form-item>
              <el-form-item label="付款方式">
                <span>{{ props.row.payType }}</span>
              </el-form-item>
              <el-form-item label="最低预付款金额">
                <span>{{ props.row.prePayFee }}</span>
              </el-form-item>
              <el-form-item label="处理状态">
                <span>{{ props.row.status }}</span>
              </el-form-item>
              <el-form-item label="备注">
                <span>{{ props.row.remark }}</span>
              </el-form-item>
              <el-form-item label="出库时间">
                <span>{{ props.row.stockTime }}</span>
              </el-form-item>
              <el-form-item label="出库操作用户" >
                <span>{{ props.row.stockUser }}</span>
              </el-form-item>
              <el-form-item label="预付时间" v-if="props.row.payType==3">
                <span>{{ props.row.prePayTime }}</span>
              </el-form-item>
              <el-form-item label="预付操作用户" v-if="props.row.payType==3">
                <span>{{ props.row.prePayUser }}</span>
              </el-form-item>
              <el-form-item label="付款时间" >
                <span>{{ props.row.payTime }}</span>
              </el-form-item>
              <el-form-item label="付款操作用户" >
                <span>{{ props.row.payUser }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column fixed type="index" :index="indexMethod" label="序号" width="90"></el-table-column>
        <el-table-column prop="soId" label="销售单单号" width="180px"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180px"></el-table-column>
        <el-table-column prop="customerName" label="客户名称"></el-table-column>
        <el-table-column prop="account" label="创建用户"></el-table-column>
        <el-table-column prop="tipFee" label="附加费用"></el-table-column>
        <el-table-column prop="productTotal" label="产品总价"></el-table-column>
        <el-table-column prop="soTotal" label="销售单总价格"></el-table-column>
        <el-table-column prop="payType" label="付款方式">
          <template slot-scope="scope">
            <span>{{scope.row.payType|paytype}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="付款方式">
          <template slot-scope="scope">
            <span>{{scope.row.status|statustype}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-tooltip content="查看明细" placement="top-start">
              <el-button
                type="success"
                icon="el-icon-more"
                size="small"
                circle
                @click="showsoitems(scope.$index, scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-pagination
      v-if="pagetotal!==''"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="parseInt(pagetotal)"
    ></el-pagination>

    <el-dialog title="明细" :visible.sync="dialogFormVisible" center>
      <el-table :data="soitemsData">
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
import axios from "axios";
export default {
  created() {
    axios({
      url: " api/main/sell/customer/show",
      method: "get"
    })
      .then(resp => {
        console.log("响应的客户", resp.data);
        this.client = resp.data.list;
        console.log(this.client);
      })
      .catch(err => {
        console.log("请求失败", err);
      });
  },
  data() {
    return {
      request: {
        soId: "",
        customerCode: "",
        payType: "",
        status: "",
        startDate: "",
        endDate: ""
      },
      tableData: [],
      client: [],
      soitemsData: [],
      pagetotal: "",
      dialogFormVisible: false
    };
  },
  methods: {
    requsestsend() {
      axios({
        url: "api/main/sell/somain/query",
        method: "get",
        params: {
          soId: this.request.soId,
          customerCode: this.request.customerCode,
          payType: this.request.payType,
          startDate: this.request.startDate,
          endDate: this.request.endDate,
          status: this.request.status
        }
      })
        .then(resp => {
          console.log("过滤的销售单", resp.data);
          this.tableData = resp.data.list;
          this.pagetotal = resp.data.total;
        })
        .catch(err => {
          console.log("请求失败", err);
        });
    },
    showsoitems(index, row) {
      this.dialogFormVisible = true;
      axios({
        url: " api/main/sell/somain/queryItem",
        method: "get",
        params: { soId: row.soId }
      })
        .then(resp => {
          console.log(resp);
          this.soitemsData = resp.data;
        })
        .catch(err => {
          console.log("请求失败", err);
        });
    },
    indexMethod(index) {
      return index + 1;
    },
    handleCurrentChange(val) {
      this.currpage = val;
      axios({
        url: "api/main/sell/somain/query",
        method: "get",
        params: {
          soId: this.request.soId,
          customerCode: this.request.customerCode,
          payType: this.request.payType,
          startDate: this.request.startDate,
          endDate: this.request.endDate,
          status: this.request.status,
          page: val
        }
      })
        .then(resp => {
          console.log("过滤的销售单", resp.data);
          this.tableData = resp.data.list;
          this.pagetotal = resp.data.total;
        })
        .catch(err => {
          console.log("请求失败", err);
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
.wide {
  width: 180px;
}
.datatable {
  min-height: 500px;
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>