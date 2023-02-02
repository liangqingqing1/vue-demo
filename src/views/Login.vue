<template>
  <div class="login" :style="'background-image:url('+ Background +');'">
    <el-card class="login-form-layout">
      <el-form
          autocomplete="on"
          :model="loginForm"
          :rules="loginRules"
          ref="loginForm"
          label-position="left"
      >
        <div style="text-align: center">
          <i class="fa fa-user-circle-o" style="font-size: 50px;color: #409EFF;margin-bottom: 20px;"></i>
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
            <span slot="prefix" style="padding-left:7px">
              <i class="fa fa-user"></i>
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
              <i class="fa fa-key" style="padding-left:7px"></i>
            </span>
            <span slot="suffix" @click="showPwd" :hide="hide" style="padding-right: 7px;">
              <i v-if="!hide" class="fa fa-eye"></i>
              <i v-else class="fa fa-eye-slash"></i>
            </span>
          </el-input>
        </el-form-item>
        <el-checkbox v-model="loginForm.rememberMe" style="margin:0 0 25px 0;">
          记住我
        </el-checkbox>
        <el-form-item style="margin-bottom: 10px;text-align: center;">
          <el-button style="width: 45%"
                     type="primary"
                     @click.native.prevent="reset"
          >重置</el-button>
          <el-button
              style="width: 45%"
              type="primary"
              :loading="loading"
              @click.native.prevent="handleLogin"
          >
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import Background from '@/assets/images/background.webp'
import Config from '@/settings'
import CryptoJS from "crypto-js";

export default {
  name: "Login",
  data() {
    var validatePw = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else {
        if (this.loginForm.password !== '') {
          this.$refs.loginForm.validateField('password');
        }
        callback();
      }
    };
    var validateUn = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空'));
      } else {
        if (this.loginForm.username !== '') {
          this.$refs.loginForm.validateField('username');
        }
        callback();
      }
    };
    return {
      Background: Background,
      cookiePass: '',
      loginForm: {
        username: "",
        password: "",
        rememberMe: false
      },
      loading: false,
      hide:true,
      pwdType: "password",
      loginRules: {
        password: [
          { validator: validatePw, trigger: 'blur' }
        ],
        username: [
          { validator: validateUn, trigger: 'blur' }
        ]
        // username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        // password: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
      },
    }
  },
  // 生命周期钩子函数，一个 vue 实例被生成后会调用这个函数
  created() {
    // 获取用户名密码等Cookie
    this.getCookie()
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
        this.hide=false
      } else {
        this.pwdType = "password";
        this.hide=true
      }
    },
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
          this.$store.dispatch('Login',this.loginForm).then((response) => {
            this.loading = false
            console.log(response)
            let statusCode = response.data.statusCode
            if(statusCode==200){
              this.$router.push({ path: '/dashboard' })
              window.localStorage.setItem("user",JSON.stringify(response.data))
              if (user.rememberMe) {
                Cookies.set('username', user.username, { expires: Config.passCookieExpires })
                Cookies.set('password', user.password, { expires: Config.passCookieExpires })
                Cookies.set('rememberMe', user.rememberMe, { expires: Config.passCookieExpires })
              } else {
                Cookies.remove('username')
                Cookies.remove('password')
                Cookies.remove('rememberMe')
              }
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
    }
  }
};
</script>

<style scoped>
.login {
  height: 100%;
  background-size: cover;
  /*background-color: rebeccapurple;*/
}
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
  margin-bottom: 20px;
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
