<template>
  <div class="login">
    <el-card class="elCard">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <el-form>
        <el-form-item style="margin-top: 28px">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-input style="width:200px"></el-input>
          <el-button plain style="float: right">send code</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox>agree agree agree agree agree agree</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%">login1</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {}
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
