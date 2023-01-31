<template>
  <li>
    <router-link v-if="menu.url!=null" :to="menu.url"><i :class="menu.icon"></i>{{ menu.name }}</router-link>
    <a @click.prevent="isExpand=!isExpand" href="http://www.baidu.com" v-else><i :class="menu.icon"></i>{{ menu.name }}</a>
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
      isExpand: false
    }
  }
}
</script>

<style scoped>

</style>