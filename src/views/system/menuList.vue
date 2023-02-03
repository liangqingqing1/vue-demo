<template>
    <div id="box">
      <vxe-table
  show-overflow
  height="200"
  row-id="id"
  :loading="loading"
  :data="tableData">
  <vxe-column type="checkbox" width="60"></vxe-column>
  <vxe-column type="seq" title="序号" width="60"></vxe-column>
  <vxe-column field="name" title="Name" sortable></vxe-column>
  <vxe-column field="sex" title="Sex"></vxe-column>
  <vxe-column field="age" title="Age"></vxe-column>
</vxe-table>

<vxe-pager
  :loading="loading"
  :current-page="tablePage.currentPage"
  :page-size="tablePage.pageSize"
  :total="tablePage.total"
  :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
  @page-change="handlePageChange">
</vxe-pager>

    </div>
  </template>
  
  <script>
  export default {
 data () {
    return {
      loading: false,
      tableData: [],
      tablePage: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  created () {
    this.findList()
  },
  methods: {
    findList () {
      // 模拟后台接口
      this.loading = true
      setTimeout(() => {
      	const list = [
	      	{name: 'test_124',sex: '男', age: 32},
	      	{name: 'test_190',sex: '女', age: 22},
	      	{name: 'name_66',sex: '男', age: 26},
	      	{name: 'name_77',sex: '男', age: 28},
	      	{name: 'name_17',sex: '女', age: 23}
      	]
      	this.tableData = list 
      	this.tablePage.total = 401
      	this.loading = false
      }, 200)
    },
    handlePageChange ({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.findList()
    }
  }
}

  </script>
  
<style scoped>
#box{
  width: 95%;
  margin: auto;
  margin-top: 20px;
  /* background-color: red; */
}
#box .table{
  margin: auto;
  overflow: auto;
}

</style>