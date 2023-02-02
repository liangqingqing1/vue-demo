<template>
  <li>
    <router-link v-if="menu.type!=0" :to="menu.url" >
      <span :class="`iconfont icon-${menu.icon.toLowerCase()}`"></span>
      {{ menu.name }}
    </router-link>

    <a @click.prevent="isExpand=!isExpand" v-else>
      <span :class="`iconfont icon-${menu.icon.toLowerCase()}`"></span>{{ menu.name }}
      <i v-if="isExpand" class="el-icon-arrow-down"></i>
      <i v-else="isExpand" class="el-icon-arrow-up"></i>
    </a>
    
    <ul class="submenu" v-if="menu.childs.length!=0" v-show="isExpand">
      <tree-menu v-for="(childMenu,idx) in menu.childs" :key="idx" :menu="childMenu"/>
    </ul>
  </li>
</template>

<script>
export default {
  name: "TreeMenu",
  props: ['menu'], // 用来接收父组件传给子组件的数据
  data() {
    return {
      isExpand: false,
      clickClass:"none"
    }
  },
  methods:{
    color(){
      console.log("点击")
        if(this.clickClass=='none'){
            this.clickClass='active'
        }else{
          this.clickClass="none"
        }
    }
  }
}
</script>

<style scoped>

li a:hover{
  background-color: aquamarine;
}
/*  一级  */
li a{
  padding-left: 25px;
  /* background: red; */
  width: 100%;
  height: 50px;
  line-height: 50px;
}

/* 图标 */
li span{
  margin-right: 10px;
}
/* 折叠的图标 */
li a i{
  height: 40px;
  line-height: 40px;
  position: absolute;
  right: 20px;
}

</style>