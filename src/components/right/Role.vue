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
      <el-table-column type="expand">
        <template slot-scope='scope'>
          <el-row :key="item.id" v-for="item in scope.row.children">
            <el-col :span="3">
              <el-tag @close="deleteRight(scope.row, item.id)" closable>{{item.authName}}</el-tag>
              <i v-if="item.children.length>0" class="el-icon-arrow-right arrow"></i>
            </el-col>
            <el-col :span="21">
              <el-row class="authlist" :key="tag.id" v-for="tag in item.children">
                <el-col :span="4">
                  <el-tag @close="deleteRight(scope.row, tag.id)" type="success" closable>{{tag.authName}}</el-tag>
                  <i v-if="tag.children.length>0" class="el-icon-arrow-right arrow"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag @close="deleteRight(scope.row, btn.id)" :key="btn.id" type="warning" closable v-for="btn in tag.children">{{btn.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
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
.el-tag  {
    margin-left: 5px;
  }
.authlist {
  border-top: solid 1px #D3DCE6;
  padding-bottom: 5px;
}
.arrow {
  font-size: 18px;
  font-weight: bold;
}
</style>
