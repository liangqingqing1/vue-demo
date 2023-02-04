import request from '@/utils/request' //引入封装好的 axios 请求

export function getUserList() { // 获取 员工列表
  return request({ //使用封装好的 axios 进行网络请求
    url: '/getUserList',
    method: 'get',
  })
}
/*
    员工列表 分页查询
    currentPage：求第几页的数据
    pageSize：每页显示 pageSize 条数据
*/ 
export function getUserListByPage(tablePage){
  let currentPage=tablePage.currentPage
  let pageSize=tablePage.pageSize
  return request({
    url:'/getUserListByPage',
    method:'get',
    params:{
      currentPage:currentPage,
      pageSize:pageSize
    }
  })
}

