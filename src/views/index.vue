<template>
    <!--  <HeadArea></HeadArea>-->
    <!--  <MainArea></MainArea>-->
    <div>
        <head-area></head-area>
        <router-view></router-view>
        <main-area></main-area>
    </div>

</template>

    <script>
      import HeadArea from "@/views/Head";
      import MainArea from "@/views/Main";
      export default {
        name:'index',
        components:{
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
    