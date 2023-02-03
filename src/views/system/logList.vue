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
              height="83%"
              :row-config="{isHover: true}">
              <vxe-column type="seq" width="100"></vxe-column>
              <vxe-column field="nickName" title="姓名" width="100" sortable type="html"></vxe-column>
              <vxe-column field="username" title="账号" width="100" type="html"></vxe-column>
              <vxe-column field="mobile" title="电话" width="120"></vxe-column>
              <vxe-column class="test" field="identity" title="身份证" width="100"></vxe-column>
              <vxe-column field="homeAddress" title="家庭住址" width="150"></vxe-column>
              <vxe-column field="onboardingTime" title="入职时间" width="130" sortable></vxe-column>
              <vxe-column field="departureTime" title="离职时间" width="130" sortable></vxe-column>
              <vxe-column field="status" title="状态" width="100"></vxe-column>
              <vxe-column field="departureTime" title="操作" width="180">
                <vxe-button status="primary" content="编辑"></vxe-button>
                <vxe-button status="danger" content="删除"></vxe-button>
              </vxe-column>
              <template #empty>
              <span style="color: red;">
                <img src="https://n.sinaimg.cn/sinacn17/w120h120/20180314/89fc-fyscsmv5911424.gif">
                <p>没有更多数据了！</p>
              </span>
            </template>
        </vxe-table>
        <vxe-pager
            v-model:current-page="page1.currentPage"
            v-model:page-size="page1.pageSize"
            :total="page1.totalResult">
        </vxe-pager>
    </div>
  </div>
  </template>
  <script>
  import XEUtils from 'xe-utils'
  import { defineComponent, reactive } from 'vue'
  export default {
    name:"logList",
    data() {
         const page1 = reactive({
            currentPage: 1,
            pageSize: 10,
            totalResult: 200
        })
      return {
        getTableData:[],
        page1,
        data:{
            
            filterName: '',
            list: [],
            tableData:[]
        }
      }
    },
    methods:{
        GetUserList(){
            console.log("GetUserList()")
            this.$store.dispatch('GetUserList').then((res) => {
            // 拿到结果
            let statusCode = res.data.statusCode
                // 判断结果
            if (statusCode==200) {
                this.data.tableData=res.data.data
                this.data.list=res.data.data
                console.log("成功")
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
            this.data.list = this.data.tableData
        }
     }
    },
    mounted:function(){
        console.log("GetUserList()")
        this.GetUserList()
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