<template>
  <el-container>
    <el-aside style="width: 220px; height: 100vh; background-color: #353b4e; overflow: hidden;">
      <div style="background-color: #2e2f32; text-align: center; padding: 20px 0;">
        <img style="height: 30px" src="../../assets/img/logo_admin.png" alt="">
      </div>
      <el-menu router style="width: 221px" background-color="#353b4e" text-color="#adafb5" active-text-color="#ffd04b">
        <el-menu-item index="/">Home Page</el-menu-item>
        <el-submenu index='2'>
          <template slot="title">Management Content</template>
          <el-menu-item index="/publish">publish</el-menu-item>
          <el-menu-item index="article">article Lists</el-menu-item>
          <el-menu-item index="2-3">Management Review</el-menu-item>
          <el-menu-item index="2-4">Management Material</el-menu-item>
        </el-submenu>
        <el-submenu index='3'>
          <template slot="title">Management Fans</template>
          <el-menu-item index="3-1">Echarts Data</el-menu-item>
          <el-menu-item index="3-2">Fans General</el-menu-item>
          <el-menu-item index="3-3">Fans Photos</el-menu-item>
          <el-menu-item index="3-4">Fans Lists</el-menu-item>
        </el-submenu>
        <el-menu-item index="4">Account Info</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import header from '../../components/layout-header.vue'

export default {
  name: 'layout',
  components: {
    'layout-header': header
  }
}
</script>

<style>
</style>
