<template>
  <div>
    用户列表
  </div>
</template>

<script>
export default {
  name: "ViewUser",
  data(){
    return{
      userList:[]
    }
  },
  mounted() {
    //用axios发送请求，获取用户的数据
    //把后台取到的数据赋值给userList
  }
}
</script>

<style scoped>

</style>