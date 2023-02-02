<template>
  <div>
    <el-card class="login-form-layout">
      <el-form
        autocomplete="on"
        :model="loginForm"
        ref="loginForm"
        label-position="left"
      >
        <div style="text-align: center">
          <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>
        </div>
        <h2 class="login-title color-main">登入</h2>
        <el-form-item prop="username">
          <el-input
            name="username"
            type="text"
            v-model="loginForm.username"
            autocomplete="on"
            placeholder="请输入用户名"
          >
            <span slot="prefix">
              <svg-icon icon-class="user" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :type="pwdType"
            @keyup.enter.native="handleLogin"
            v-model="loginForm.password"
            autocomplete="on"
            placeholder="请输入密码"
          >
            <span slot="prefix">
              <svg-icon icon-class="password" class="color-main"></svg-icon>
            </span>
            <span slot="suffix" @click="showPwd">
              <svg-icon icon-class="eye" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px">
          <el-button
            style="width: 100%"
            type="primary"
            :loading="loading"
            @click.native.prevent="handleLogin"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "1234"
      },
      loading: false,
      pwdType: "password",
    };
  },
  computed:{
    getUserId(){
      return this.$store.state.userId;
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
<<<<<<< Updated upstream
    handleLogin(){
      this.$refs.loginForm.validate(valid => {
        if (valid) {
            // 表单验证成功
            this.$axios.post('http://localhost:8080/admin/login', this.loginForm).then(res => {
              // 拿到结果
              console.log(res.data)
              let statusCode = res.data.statusCode
              let message = res.data.message;
              // 判断结果
              if (statusCode==200) {
                /*登陆成功*/
                // Element.Message.success(message);          
                window.localStorage.setItem("user",JSON.stringify(res.data))
                 /*跳转页面*/
                this.$router.push({
                  path: "/home",
                  // query: { data: res.data }
                })
              } else {
                /*打印错误信息*/
                Element.Message.error(message);
              }
            })
          }else {
            console.log('error submit!!');
            return false;
           }        
      })
=======
    reset() {
      // 重置会变成cookie里的值
      // this.$refs.loginForm.resetFields();
      this.loginForm.username=""
      this.loginForm.password=""
      this.loginForm.rememberMe=false
    },
    getCookie() {
      const username = Cookies.get('username')
      let password = Cookies.get('password')
      // 解密
      var bytes = CryptoJS.AES.decrypt(password, "key");
      var originalPW = bytes.toString(CryptoJS.enc.Utf8);
      const rememberMe = Cookies.get('rememberMe')
      // 保存cookie里面的加密后的密码
      this.cookiePass = password === undefined ? '' : password
      password = password === undefined ? this.loginForm.password : originalPW
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      }
    },

    // 使用状态管理，用封装的axios
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        const user = {
          username: this.loginForm.username,
          password: this.loginForm.password,
          rememberMe: this.loginForm.rememberMe,
        }
        // Encrypt 加密 
        var cipherPW = CryptoJS.AES.encrypt(
          user.password,//账号 或者  密码
          "key"  //键
        ).toString();
        if (user.password !== this.cookiePass) {
          user.password = cipherPW
        }
        if(valid){
          if (user.rememberMe) {
            Cookies.set('username', user.username, { expires: Config.passCookieExpires })
            Cookies.set('password', user.password, { expires: Config.passCookieExpires })
            Cookies.set('rememberMe', user.rememberMe, { expires: Config.passCookieExpires })
          } else {
            Cookies.remove('username')
            Cookies.remove('password')
            Cookies.remove('rememberMe')
          }
          this.$store.dispatch('Login',this.loginForm).then((response) => {
            this.loading = false
            console.log(response)
            let statusCode = response.data.statusCode
            if(statusCode==200){
              this.$router.push({ path: '/dashboard' })
              window.localStorage.setItem("user",JSON.stringify(response.data))
            }else{
              /* 弹出警告提示框 */
              this.$message({
                  showClose: true,
                  message: '用户名或密码错误！',
                  type: 'warning'
                });
            }
          }).catch(() => {
            this.loading = false
          })
        }else{
          this.$message({
            showClose: true,
            message: '用户名和密码不能为空！',
            type: 'warning'
          });
        }
      });
>>>>>>> Stashed changes
    }
}
};
</script>

<style scoped>
.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  margin: 140px auto;
  border-top: 10px solid #409eff;
}

.login-title {
  text-align: center;
}

.login-center-layout {
  background: #409eff;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-top: 200px;
}
</style>
