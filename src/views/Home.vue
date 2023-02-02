<template>
  <div id="box" >
    <div id="content" :style="'background-image:url('+ Background +');'">
    
    </div>
  </div>
</template>

<script>
import Background from '@/assets/images/home.jpg'
export default {
  name: "Home",
  data(){
    return{
      Background:Background
    }
  }
}
</script>

<style scoped>
/* 局部引入 */
/* @import '../assets/styles/view.css'; */
#box{
  padding: 5px;
}
#content{
  height: 100%;
}
</style>