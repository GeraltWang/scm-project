<template>
  <div class="con">
    <el-header class="head" height="47px">
      <span>
        <i class="el-icon-loading"></i> 欢迎登陆后台管理界面平台
      </span>
    </el-header>
    <el-main class="main">
      <el-form :model="user" label-position="top" :rules="rules" ref="user" class="login-box">
        <h2 class="login-title">
          用户登录
          <span>UserLogin</span>
        </h2>
        <el-form-item label="账号" prop="username">
          <el-input type="text" placeholder="请输入账号" v-model="user.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="user.password" show-password />
        </el-form-item>
        <el-form-item label="访问身份">
          <el-radio-group v-model="user.role">
            <el-radio label="员工" value="member"></el-radio>
            <el-radio label="客户" value="customer"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('user')">登录</el-button>
          <el-button native-type="reset">重置</el-button>
          <el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox>
        </el-form-item>
      </el-form>
    </el-main>

    <el-footer class="footer" height="47px">
      <span>TerraGroup©后台管理界面平台</span>
    </el-footer>
  </div>
</template>

<script>
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      user: {
        username: "",
        password: "",
        role: ""
      },
      checked: false,
      err: "",
      info: "",
      rules: {
        username: [
          { message: "请输入账号", trigger: "blur" },
          {
            pattern: /^\w{3,10}$/,
            message: "长度在3-10位的数字字母或下划线",
            trigger: "blur"
          },
          { validator: validateUsername, trigger: "blur" }
        ],
        password: [
          { message: "密码不能为空", trigger: "blur" },
          {
            pattern: /^\w{3,10}$/,
            message: "长度在5-10位的数字字母或下划线",
            trigger: "blur"
          },
          { validator: validatePassword, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("loginAction", this.user)
            .then(data => {
              this.info = data;
              console.log(this.info);
              this.$message.success("登陆成功");
              this.$router.push("/manageinfo");
            })
            .catch(err => {
              this.error = err;
            });
        } else {
          this.$message.error("账号或密码错误");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.con {
  height: 100vh;
  background-position: center top;
  background-size: cover;
  background-image: url(../assets/IMG_1726.jpg);
  background-position: center top;
  background-size: cover;
  background-attachment: fixed;
  .head {
    background-color: #324057;
    width: 100%;
    display: flex;
    align-items: center;
    span {
      color: #fff;
    }
  }
  .main {
    display: flex;
    justify-content: flex-end;
    height: 626px;
    opacity: 0.9;
    .login-box {
      border: 1px solid #dcdfe6;
      width: 370px;
      padding: 20px 35px 15px 35px;
      border-radius: 5px;
      box-shadow: 0 0 25px #909399;
      background-color: #fff;
      .login-title {
        text-align: center;
        margin: 0 auto 40px auto;
        color: #303133;
        span {
          font-size: 18px;
        }
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #324057;
    span {
      color: #fff;
    }
  }
}
</style>
