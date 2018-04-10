<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/rights' }">权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-table
        border
        :data="tableData"
        style="width: 100%">
        <el-table-column
          type="index"
          label="#"
          width="80">
        </el-table-column>
        <el-table-column
          prop="authName"
          label="权限名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="path"
          label="路径"
          width="180">
        </el-table-column>
        <el-table-column
          prop="level"
          label="层级"
          width="180">
          <template slot-scope='scope'>
            <span v-if='scope.row.level === "0"'>一级</span>
            <span v-else-if='scope.row.level === "1"'>二级</span>
            <span v-else>三级</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {rightList} from '../../API/api.js'
export default {
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    rightList({type: 'list'}).then(res => {
      if (res.meta.status === 200) {
        this.tableData = res.data
      }
    })
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
