<template>
  <div id="view">
    <div id="box">
      <vxe-toolbar>
          <template #buttons>
            <vxe-input v-model="data.filterName" type="search" placeholder="输入账号或姓名" @keyup="searchEvent1"></vxe-input>
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
  </div>
</div>
</template>
<script>
import { defineComponent,getCurrentInstance,onMounted ,reactive } from 'vue'
import XEUtils from 'xe-utils'
import {getUserList} from "../../api/system"

export default {
  data() {
    return {
      getTableData:[]
    }
  },
  // setup表示允许在组件内部定义响应式状态和事件处理逻辑
    setup () {
      console.log("setup")
      let data = reactive({
        filterName: '',
        list: [],
        tableData:[]
      })
      function GetUserList(){
        console.log("GetUserList()")
        getUserList().then((res)=>{
          data.tableData=res.data.data
          data.list=res.data.data
        })
      }
       //挂载后调用函数获取项目数据
      onMounted(() => {
        GetUserList()
      });
      const searchEvent1 = () => {
        const filterName = XEUtils.toValueString(data.filterName).trim().toLowerCase()
        if (filterName) {
          const filterRE = new RegExp(filterName, 'gi')
          const searchProps = ['nickName','username']
          const rest = data.tableData.filter(item => searchProps.some(key => XEUtils.toValueString(item[key]).toLowerCase().indexOf(filterName) > -1))
          data.list = rest.map(row => {
            const item = Object.assign({}, row)
            searchProps.forEach(key => {
              item[key] = XEUtils.toValueString(item[key]).replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
            })
            return item
          })
        } else {
          data.list = data.tableData
        }
      }
      searchEvent1()
        return {
          data,
          searchEvent1
      }
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