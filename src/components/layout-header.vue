<template>
    <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="6" class="left">
            <i class="el-icon-s-fold"></i>
            <span>传智黑马 传智黑马</span>
        </el-col>
        <el-col :span="4" class="right">
            <img src="../assets/img/avatar.jpg" alt="">
            <el-dropdown trigger="click">
                <span>username</span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>accounts info</el-dropdown-item>
                    <el-dropdown-item>git address</el-dropdown-item>
                    <el-dropdown-item @click.native='onLogout'>log out</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-row>
</template>

<script>
export default {
  methods: {
    onLogout () {
      this.$confirm('logout?', {
        confirmButtonText: 'logout',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user-token')
        this.$router.push('./login')
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang='less' scoped>
    .left{
        display: flex;
        align-items: center;
        i {
            font-size: 24px;
        }
        span{
            margin-left: 10px;
        }
    }
    .right{

        img{
            border-radius: 50%;
            margin-right: 10px;
            vertical-align: middle;
        }

    }
</style>
