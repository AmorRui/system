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
      <el-button type="info" plain @click="dialogVisibleAdd = true">添加用户</el-button>
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
            <el-button size="small" type="primary" icon="el-icon-edit" plain  @click='editHandler(scope.row)'></el-button>
            <el-button size="small" type="danger" icon="el-icon-delete" plain @click="deleteHandler(scope.row)"></el-button>
            <el-button size="small" type="warning" icon="el-icon-check" plain ></el-button>
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
        <!-- 添加用户弹窗 -->
    <el-dialog
      title="添加用户"
      @close='closeUserDialog("add")'
      :visible="dialogVisibleAdd"
      width="50%">
      <el-form ref="userform" :model="user" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="user.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click='submitUser'>确 定</el-button>
      </span>
    </el-dialog>
        <!-- 编辑用户弹窗 -->
    <el-dialog
      title="编辑用户"
      @close='closeUserDialog("edit")'
      :visible="dialogVisibleEdit"
      width="50%">
      <el-form ref="userformEdit" :rules="rules" :model="euser" label-width="80px">
        <el-form-item label="用户名" prop='username'>
          <el-button plain type="info">{{euser.username}}</el-button>
        </el-form-item>
        <el-form-item label="邮箱" prop='email'>
          <el-input v-model="euser.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop='mobile'>
          <el-input v-model="euser.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="submitUserEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getUserData, toggleUserState, addUser, getUserById, editUser, deleteUser} from '../../api/api.js'
export default {
  data () {
    return {
      // 添加
      user: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 编辑
      euser: {
        username: '',
        email: '',
        mobile: ''
      },
      // form
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ]
      },
      dialogVisibleEdit: false,
      dialogVisibleAdd: false,
      query: '',
      currentPage: 1,
      total: 100,
      pagesize: 5,
      tableData: []
    }
  },
  methods: {
    deleteHandler (row) {
      this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser({id: row.id}).then(res => {
          if (res.meta.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.initList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 查询id
    editHandler (row) {
      // 根据id查询最新的数据
      getUserById({id: row.id}).then(res => {
        if (res.meta.status === 200) {
          // 填充表单
          this.euser.id = res.data.id
          this.euser.username = res.data.username
          this.euser.email = res.data.email
          this.euser.mobile = res.data.mobile
          // 显示弹窗
          this.dialogVisibleEdit = true
        }
      })
    },
    // 编辑用户
    submitUserEdit () {
      // 编辑提交用户
      this.$refs['userformEdit'].validate(valid => {
        if (valid) {
          // 提交表单
          editUser(this.euser).then(res => {
            if (res.meta.status === 200) {
              // 关闭窗口
              this.dialogVisibleEdit = false
              // 刷新列表
              this.initList()
            }
          })
        }
      })
    },
    // 提交用户
    submitUser () {
      // 提交用户信息
      this.$refs['userform'].validate(valid => {
        if (valid) {
          // 表单验证通过，调用接口
          addUser(this.user)
            .then(res => {
              if (res.meta.status === 201) {
                // 关闭弹窗
                this.dialogVisibleAdd = false
                // 刷新列表
                this.initList()
              }
            })
        }
      })
    },
    // 状态改变
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
    // 关闭弹窗
    closeUserDialog (flag) {
      if (flag === 'add') {
        this.dialogVisibleAdd = false
      } else if (flag === 'edit') {
        this.dialogVisibleEdit = false
      } else {
        this.dialogVisibleRole = false
      }
    },
    // 分页
    handleSizeChange (val) {
      this.pagesize = val
      this.initList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.initList()
    },
    // 初始化
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
