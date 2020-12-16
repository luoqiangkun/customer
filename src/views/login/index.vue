<template>
  <div class="login">
    <div class="bgc">
      <img src="../../assets/images/chi.png" alt />
    </div>
    <div class="loginWrapper">
      <div class="item">
        <input type="text" placeholder="用户名" v-model="form.user_account" />
      </div>
      <div class="item">
       
        <input type="password" placeholder="密码" v-model="form.user_password"/>
      </div>
    </div> 
    <div class="loginBtn">
      <cube-button :primary="true"  @click="doLogin">登录</cube-button>

    </div>
  </div>
</template>
<script>
import { login } from '@/api'
export default {
    name:'login',
    data() {
      return {
        form: {
          user_account: "",
          user_password: ""
        }
      }
    },
    methods: {
      doLogin() {
        this.$store.dispatch('user/login', this.form)
        .then(() => {
          
          this.$router.push({ path: this.redirect || '/' })
        })
        .catch(( error ) => {

          this.form.user_password= ''
          this.toast = this.$createToast({
            txt: error,
            type: 'txt'
          })
          this.toast.show()
        })
      }
    }
}
</script>
<style lang="stylus" scoped>
.login {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  .bgc {
    background-color: #fe7e00;
    height: 40%;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 4rem;
      height: 4rem;
    }
  }
  .loginWrapper {
    width: 90%;
    margin: 0 auto;
    margin-top: -6rem;
    position: relative;
    box-shadow: 0px 0px 13px 3px rgba(222, 222, 222, 0.29);
    border-radius: 10px;
    padding: 2rem 0;
    padding-top: 3rem;
    background: #fff;
    input {
      border: none;
      background-color: #f9f9f9;
    }
    .van-icon,
    .van-icon::before {
      color: #fe7e00;
    }
    .item {
      background-color: #f9f9f9;

      border-radius: 1rem;
      
      margin: 0 12%;
      margin-bottom: 1rem;
      text-indent: 0.5rem;
      input {
        width:100%;
        padding: 0.5rem 0;
      }
    }
  }
  .loginBtn {
    width: 90%;
    margin: 0 auto;
    margin-top: 3rem;
    button {
      width: 100%;
      border-radius: 2rem;
    }
  }
  .cube-btn {
    width: 90% !important;
    margin: 0 auto;
  }
}
</style>