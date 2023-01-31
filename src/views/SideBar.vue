<template>
  <nav id="nav">
    <ul v-for="(menu,index) in menus" :key="index">
      <tree-menu :menu="menu"></tree-menu>
    </ul>
  </nav>
</template>

<script>

import TreeMenu from "@/views/TreeMenu";


// 父组件
export default {
  name: "SideBar",
  // 引入子组件
  components: {TreeMenu},
  data() {
    return {
      submenu: {
        submenuHide: false,
        submenuShow: true
      },
      menus:[]
    }
  },
  methods: {
    expand() {
      this.submenu.submenuShow = !this.submenu.submenuShow;
      this.submenu.submenuHide = !this.submenu.submenuHide;
    },
    getPermissionByUserId(){
      console.log("调用getPermissionByUserId()")
      this.$axios.get('http://localhost:8080/getPermissionByUserId', 
      {params:{userId:JSON.parse(window.localStorage.getItem("user")).data.userId}}).then(res => {
          // 拿到结果
          console.log(res.data)
          let statusCode = res.data.statusCode
          let message = res.data.message;
          console.log(res.data.data)
          this.menus=res.data.data
          // 判断结果
          if (statusCode==200) {
            console.log("获取权限成功")
          } else {
            console.log("获取权限错误")
          }
        })
    }
  },
  mounted:function(){  // 页面加载时触发函数
    console.log("SideBar加载触发")
    this.getPermissionByUserId()
  }
}
</script>

<style>

#nav {
  width: 12%;
  height: 800px;
  background-color: darkgray;
  float: left;
}

li {
  list-style: none;
  position: relative;
  border-style: solid;
  border-width: 1px 0 0;
  border-color: #E5E5E5;
}

.submenu > li {
  position: relative;
  padding-left: 28px;
}

a {
  display: block;
  width: 189px;
  height: 36px;
  color: #5d5d5d;
  text-decoration: none;
  line-height: 36px;
}

.submenuHide {
  display: none;
  position: relative;
}

.submenuShow {
  display: block;
  position: relative;
}

.submenu:before {
  content: "";
  display: block;
  position: absolute;
  z-index: 1;
  left: 13px;
  top: 37px;
  bottom: 0;
  border: 1px dotted;
  border-width: 0 0 0 1px; /* 上 右 下 左 */
}

.submenu > li:before {
  content: "";
  display: block;
  width: 10px;
  position: absolute;
  z-index: 1;
  left: 15px;
  top: 17px;
  border: 1px dotted;
  border-width: 1px 0 0; /* 上 右 下*/
}

#header {
  width: 100%;
  height: 130px;
  float: left;
  border-bottom: 1px solid black;
}
</style>