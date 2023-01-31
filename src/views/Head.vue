<template>
  <div id="head">
    head部分
    <h2>Welcome!</h2>
    <h3>当前用户名：{{username}}</h3>
    <el-button
    style="width: 10%"
    type="primary"
    @click.native.prevent="exitBtn"
  >退出</el-button>
  </div>
</template>

<script>
export default {
  name: "Head",
  data() {
    return {
      username: JSON.parse(window.localStorage.getItem("user")).data.username
    };
  },
  methods:{
    exitBtn(){
      this.$router.push({
          path: "/login",
        })
    }
  }
}
</script>

<style scoped>
  #head{
    width: 100%;
    height: 120px;
    background-color: bisque;
  }
</style>