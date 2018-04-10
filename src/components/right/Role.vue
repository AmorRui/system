<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/roles' }">角色列表</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.el-breadcrumb {
  padding-left: 20px;
  height: 40px;
  line-height: 40px;
  background-color: #D3DCE6;
}
.el-breadcrumb :hover {
  color: rgb(90, 159, 190);
}
</style>
