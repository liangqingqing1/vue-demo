<template>
  <div id="view">
    <div id="box">
      <vxe-toolbar>
          <template #buttons>
            <vxe-input v-model="data.filterName" type="search" placeholder="输入账号或姓名" @keyup="searchEvent()"></vxe-input>
            <vxe-button status="primary" icon="vxe-icon-square-plus" @click="insertEvent()">新增</vxe-button>
          </template>
        </vxe-toolbar>
        <vxe-table :data="data.list" class="table"
            border
            ref="userTable"
            height="80%"
            :row-config="{isHover: true}"
            :loading="loading">
            <vxe-column type="seq" width="100"></vxe-column>
            <vxe-column field="nickName" title="姓名" width="100" sortable type="html"></vxe-column>
            <vxe-column field="username" title="账号" width="100" type="html"></vxe-column>
            <vxe-column field="mobile" title="电话" width="120"></vxe-column>
            <vxe-column class="test" field="identity" title="身份证" width="100"></vxe-column>
            <vxe-column field="homeAddress" title="家庭住址" width="150"></vxe-column>
            <vxe-column field="onboardingTime" title="入职时间" width="130" sortable></vxe-column>
            <vxe-column field="departureTime" title="离职时间" width="130" sortable></vxe-column>
            <vxe-column field="status" title="状态" width="100"></vxe-column>
            <vxe-column title="操作" width="180" show-overflow>
            <template #default="{ row }">
              <vxe-button status="primary" icon="vxe-icon-edit" @click="editEvent(row)"></vxe-button>
              <vxe-button status="danger" icon="vxe-icon-delete" @click="removeEvent(row)"></vxe-button>
            </template>
          </vxe-column>
            <template #empty>
            <span style="color: red;">
              <img src="https://n.sinaimg.cn/sinacn17/w120h120/20180314/89fc-fyscsmv5911424.gif">
              <p>没有更多数据了！</p>
            </span>
          </template>
      </vxe-table>
      <vxe-pager
        :loading="loading"
        :current-page="tablePage.currentPage"
        :page-size="tablePage.pageSize"
        :page-sizes= "tablePage.pageSizes"
        :total="tablePage.total"
        :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
        @page-change="handlePageChange">
      </vxe-pager>

      <!-- 弹出的新增或编辑表单 -->
      <vxe-modal v-model="showEdit" :title="selectRow ? '编辑&保存' : '新增&保存'" width="800" min-width="600" min-height="300"  resize destroy-on-close>
          <template #default>
            <vxe-form :data="formData" :rules="formRules" title-align="right" title-width="100" @submit="submitEvent">
              <vxe-form-item field="nickName" title="姓名" :span="12" :item-render="{}">
                <template #default="{ data }">
                  <vxe-input v-model="data.nickName" placeholder="请输入名称"></vxe-input>
                </template>
              </vxe-form-item>
              <vxe-form-item field="identity" title="身份证" :span="12" :item-render="{}">
                <template #default="{ data }">
                  <vxe-input v-model="data.identity" placeholder="请输入身份证"></vxe-input>
                </template>
              </vxe-form-item>
              <vxe-form-item field="age" title="年龄" :span="12" :item-render="{}">
                <template #default="{ data }">
                  <vxe-input v-model="data.age" placeholder="请输年龄"></vxe-input>
                </template>
              </vxe-form-item>
              <vxe-form-item field="mobile" title="电话" :span="12" :item-render="{}">
                <template #default="{ data }">
                  <vxe-input v-model="data.mobile" placeholder="请输入电话"></vxe-input>
                </template>
              </vxe-form-item>
              <vxe-form-item field="username" title="用户名" :span="12" :item-render="{}">
                <template #default="{ data }">
                  <vxe-input v-model="data.username" placeholder="请输入用户名"></vxe-input>
                </template>
              </vxe-form-item>

              <vxe-form-item field="password" title="密码" :span="12" :item-render="{}" v-if="!selectRow">
                <template #default="{ data }">
                  <vxe-input v-model="data.password" placeholder="请输入密码"></vxe-input>
                </template>
              </vxe-form-item>

              <vxe-form-item field="onboardingTime" title="入职时间" :span="12" :item-render="{}">
                <template #default="{ data }">
                  <vxe-input v-model="data.onboardingTime" type="date" placeholder="请选择日期" transfer></vxe-input>
                </template>
              </vxe-form-item>
              <vxe-form-item field="departureTime" title="离职时间" :span="12" :item-render="{}">
                <template #default="{ data }">
                  <vxe-input v-model="data.departureTime" type="date" placeholder="请选择日期" transfer></vxe-input>
                </template>
              </vxe-form-item>

              <!-- 角色 下拉框多选 -->
              <vxe-form-item field="role" title="角色" :span="12" :item-render="{}">
                <template #default="{ data }">
                  <vxe-select v-model="data.role" multiple clearable>
                    <vxe-option v-for="item in roleList" :key="item.roleId" :value="item.roleName" :label="item.roleName"></vxe-option>
                  </vxe-select>
                </template>
              </vxe-form-item>

              <!-- 状态 单选 -->
              <vxe-form-item field="status" title="状态" :span="12" :item-render="{}">
                <template #default="{ data }">
                  <vxe-radio-group v-model="data.status">
                    <vxe-radio label="Y" content="在职"></vxe-radio>
                    <vxe-radio label="N" content="离职"></vxe-radio>
                  </vxe-radio-group>
                </template>
              </vxe-form-item>

              <vxe-form-item field="homeAddress" title="家庭住址" :span="24" :item-render="{}">
                <template #default="{ data }">
                  <vxe-textarea v-model="data.homeAddress" :autosize="{minRows: 2, maxRows: 4}"></vxe-textarea>
                </template>
              </vxe-form-item>
              
              <vxe-form-item align="center" title-align="left" :span="24">
                <template #default>
                  <vxe-button status="primary" type="submit">提交</vxe-button>
                  <vxe-button type="reset">重置</vxe-button>
                </template>
              </vxe-form-item>
            </vxe-form>
          </template>
        </vxe-modal>
  </div>
</div>
</template>
<script>
import XEUtils from 'xe-utils'

export default {
  name:"userList",
  data() {
    return {
      loading: false,
      tablePage: {
        currentPage: 1,
        pageSize: 10,
        pageSizes:[5,10,20,50,100],
        total: 0
      },
      data:{
        filterName: '',
        list: [],  // 用于在界面显示的数据
        tableData:[],  // 存放真正的数据
        listCopy:[], // 用于查询前后存放的假数据
      },
      showEdit: false,
      selectRow:null,
      formRules: {
        username: [
          { required: true, message: '请输入用户名' },
        ],
        nickName: [
          { required: true, message: '请输入姓名' }
        ],
        age: [
          { required: true, message: '请输入年龄' }
        ],
        mobile:[
          { required: true, message: '请输入手机号' },
          { min: 11, max: 11, message: '长度 11 个字符' }
        ],
        identity:[
          { required: true, message: '请输入身份证' },
          { min: 18, max: 18, message: '长度 18 个字符'}
        ],
        homeAddress:[
          { required: true, message: '请输入家庭住址' }
        ],
        role:[
          { required: true, message: '请选择角色' }
        ],
        status:[
          { required: true, message: '请选择状态' }
        ],
        password:[
          { required: true, message: '请输入密码' }
        ]
      },      
      formData: { // 弹出的表单数据
        username: '',
        nickName: '',
        mobile:'',
        roleName: '',
        onboardingTime:'',
        departureTime:'',
        age: '',
        homeAddress:'',
        status:'',
        role:'',
        identity:'',
        password:'',
      },
      roleList: [
        {
          roleId: 1,
          roleName: "超级管理员"
        },
        {
            roleId: 5,
            roleName: "董事会"
        },
        {
            roleId: 6,
            roleName: "出纳"
        },
        {
            roleId: 7,
            roleName: "采购员"
        },
        {
            roleId: 8,
            roleName: "销售员"
        },
        {
            roleId: 9,
            roleName: "财务"
        },
        {
            roleId: 11,
            roleName: "业务员"
        },
        {
            roleId: 13,
            roleName: "物流操作"
        }]
    }
  },
  methods:{
      insertEvent(){
        this.showEdit=true,
        this.selectRow=null,
        this.formData = {
          username: '',
          nickName: '',
          mobile:'',
          roleName:'',
          identity:'',
          onboardingTime:'',
          departureTime:'',
          age: '',
          homeAddress:'',
          status:'',
          role:'',
          identity:'',
          password:'',
        }
      },
      editEvent(row){
        this.selectRow = row
        this.showEdit = true
        this.formData = {
          username: row.username,
          nickName: row.nickName,
          mobile:row.mobile,
          roleName: row.roleName,
          onboardingTime:row.onboardingTime,
          departureTime:row.departureTime,
          age: row.age,
          homeAddress:row.homeAddress,
          status:row.status,
          role:row.role,
          identity:row.identity,
          // password:row.password
        }
      },
      getUserList(){
          this.loading = true
          setTimeout(() => {
              this.$store.dispatch('GetUserList').then((res) => {
                let statusCode = res.data.statusCode
                  // 判断结果
              if (statusCode==200) {
                  this.data.tableData=res.data.data
                  this.data.list=res.data.data
                  this.tablePage.total = res.data.data.length
                  this.loading = false
              } else {
                  console.log("错误")
              }
              }).catch(() => {
                  this.$message({
                      showClose: true,
                      message: '无权访问！',
                      type: 'error'
                });
              })
          },200)
      },
      getUserListByPage(){
        this.loading = true
          setTimeout(() => {
              this.$store.dispatch('GetUserListByPage',this.tablePage).then((res) => {
                let statusCode = res.data.statusCode
                    // 判断结果
                if (statusCode==200) {
                    this.data.list=res.data.data
                    this.data.listCopy=this.data.list
                    this.loading = false
                } else {
                    console.log("错误")
                }
              }).catch((err) => {
                  console.log(err);
                  this.$message({
                    showClose: true,
                    message: '无权访问！',
                    type: 'error'
                });
              })
          },200)
      },
      searchEvent() {
        const filterName = XEUtils.toValueString(this.data.filterName).trim().toLowerCase()
        if (filterName) {
          const filterRE = new RegExp(filterName, 'gi')
          const searchProps = ['nickName','username']
          const rest = this.data.tableData.filter(item => searchProps.some(key => XEUtils.toValueString(item[key]).toLowerCase().indexOf(filterName) > -1))
          this.data.list = rest.map(row => {
            const item = Object.assign({}, row)
            searchProps.forEach(key => {
              item[key] = XEUtils.toValueString(item[key]).replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
            })
            return item
          })
        } else {
          this.data.list = this.data.listCopy
      }
    },
    handlePageChange ({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.getUserListByPage()
    }
  },
  created:function(){
      this.getUserList()
  },
}

      

</script>
  
  <style scoped>
  #box{
    width: 95%;
    height: 100%;
    margin: auto;
    margin-top: 20px;
  }
  #box .table{
    margin-top: 20px;
    margin: auto;
  }
  </style>