<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/roles' }">角色列表</el-breadcrumb-item>
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
          prop="roleName"
          label="角色名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="roleDesc"
          label="描述"
          width="500">
        </el-table-column>
        <el-table-column
          label="操作"
          width="180">
        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button size="small" type="primary" icon="el-icon-edit" plain></el-button>
              <el-button size="small" type="danger" icon="el-icon-delete" plain></el-button>
              <el-button size="small" type="warning" icon="el-icon-check" plain ></el-button>
          </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {roleList} from '../../API/api.js'
export default {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    initList () {
      roleList().then(res => {
        if (res.meta.status === 200) {
          this.tableData = res.data
        }
      })
    }
  },
  mounted () {
    this.initList()
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
