<template>
  <div class="login">
    <el-card class="elCard">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <el-form :model='loginForm' :rules="loginRules" ref="loginForm" style="margin-top: 25px">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="phone number"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" style="width:240px" placeholder="code number"></el-input>
          <el-button plain style="float: right">send code</el-button>
        </el-form-item>
        <el-form-item prop="checked">
          <el-checkbox v-model="loginForm.checked">agree agree agree agree agree agree</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="login">login</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        checked: false
      },
      loginRules: {
        mobile: [{ required: true, message: 'mobile cannot be empty' }, {
          pattern: /^1[3456789]\d{9}$/, message: 'mobile number is not correct'
        }],
        code: [{ required: true, message: 'code cannot be empty' }, {
          pattern: /^\d{6}$/, message: 'code is not correct'
        }],
        checked: [{ required: true }, {
          validator: function (rull, value, callback) {
            if (value) {
              callback()
            } else {
              callback(new Error('checked the agree statement'))
            }
          }
        }]
      }
    }
  },
  methods: {
    login () {
      // get dom object $refs
      this.$refs.loginForm.validate(function (isOk) {
        if (isOk) {

        }
      })
    }
  }

}
</script>

<style lang='less' scoped>
.login {
  background-image: url("../../assets/img/login_bg.jpg");
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .elCard {
    width: 400px;
    height: 360px;
    .title {
      text-align: center;
      // height: 40px;
      img {
        height: 46px;
      }
    }
  }
}
</style>
