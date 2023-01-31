<template>
  <div>
    <head-area></head-area>
    <side-bar></side-bar>
   <router-view></router-view>
  </div>
</template>

<script>
import SideBar from "@/views/SideBar";
import HeadArea from "@/views/Head";
import MainArea from "@/views/Main";
export default {
  name: "Main",
  components:{
    SideBar,
    HeadArea,
    MainArea
  }
}
</script> 
<style>
*{
  margin: 0;
  padding: 0;
}
</style>