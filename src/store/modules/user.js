import { login } from '@/api/login'//引入登录 api 接口
// import {getPermissionByUserId} from '@/api/permission' // 引入获取菜单权限 api 接口
import { getToken } from '@/utils/auth'

const user = {
  // state: {
  //   // token: getToken(),
  //   // 是否登录
  //   isLogin:false,
  //   userId:'1'
  // },
  // mutations: {
  //   SET_TOKEN: (state, token) => {
  //     state.token = token
  //   },
  //   SET_ISLOGIN:(state,isLogin)=>{
  //       state.isLogin=isLogin
  //   },
  //   SET_USERID:(state,userId)=>{
  //     state.userId=userId
  //   }
  // },
  actions: {
    // 登录
    Login({ commit }, loginInfo) { //定义 Login 方法，在组件中使用 this.$store.dispatch("Login") 调用
      return new Promise((resolve, reject) => { //封装一个 Promise
        login(loginInfo).then(response => { //使用 login 接口进行网络请求
          // commit('') //提交一个 mutation，通知状态改变
          // commit('SET_ISLOGIN',true)
          // commit('SET_USERID',1)
          resolve(response) //将结果封装进 Promise
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}
export default user
