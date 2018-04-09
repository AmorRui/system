<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user' }">活动列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-input placeholder="请输入内容"  class="search">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="info" plain>添加用户</el-button>
    </div>
    <div>
      <el-table
        border
        :data="tableData"
        style="width: 100%">
        <el-table-column
          type="index"
          label="#"
          width="50">
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="150">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
          width="100">
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="角色"
          width="100">
        </el-table-column>
        <el-table-column
          prop="my_state"
          label="用户状态"
          width="80">
          <template slot-scope="scope">
            <el-switch @change='toggleUser(scope.row)' v-model="scope.row.mg_state"></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button size="small" type="primary" icon="el-icon-edit" plain disabled></el-button>
            <el-button size="small" type="danger" icon="el-icon-delete" plain disabled></el-button>
            <el-button size="small" type="warning" icon="el-icon-check" plain disabled></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {getUserData, toggleUserState} from '../../api/api.js'
export default {
  data () {
    return {
      query: '',
      currentPage: 1,
      total: 100,
      pagesize: 5,
      tableData: []
    }
  },
  methods: {
    toggleUser (data) {
      toggleUserState({
        uId: data.id,
        state: data.mg_state
      })
        .then(res => {
          if (res.meta.status === 200) {
            this.$message({
              message: res.meta.msg,
              type: 'success'
            })
          }
        })
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.initList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.initList()
    },
    initList () {
      getUserData({
        query: '',
        pagenum: this.currentPage,
        pagesize: this.pagesize
      })
        .then(res => {
          if (res.meta.status === 200) {
            this.tableData = res.data.users
            this.total = res.data.total
            this.currentPage = res.data.pagenum
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
 .search {
   width: 300px;
 }
 .el-pagination {
    padding-top: 10px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background-color: #D3DCE6;
 }
</style>
