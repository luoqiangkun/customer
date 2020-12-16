<template>
  <div>

    <div class="header">
      <div class="info">
        <img :src="info.avatar" alt class="avatar" />
        <div class="nickName">{{info.name}}</div>
      </div>
    </div>

    <div class="Btn">
      <cube-button :primary="true" @click="logout">退出账号</cube-button>
    </div>
  </div>
</template>
<script>
import { userInfo ,logout } from '@/api'
export default {
  data(){
    return {
      info:{}
    }
  },
  methods: {
    getUserInfo(){
      userInfo().then( res => {
        this.info = res.data;
      })
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  },
  created(){
    this.getUserInfo();
  }
};
</script>
<style lang="stylus" scoped>
.dv {
  background-color: #fe7e00;
  color: #fff;
  text-align: center;
  padding: 0.5rem 0;
}

.leftImg {
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;

  img {
    width: 100%;
    height: 100%;
  }
}

.box {
  width: 90%;
  margin: 0 auto;
  box-shadow: 0px 0px 23px 6px rgba(228, 228, 228, 0.29);
  border-radius: 20px;
  display: flex;
  box-sizing: border-box;
  padding: 0.8rem 0;
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.Btn {
  width: 90%;
  margin: 0 auto;
  margin-top: 8rem;

  button {
    margin-top: 3rem;
    border-radius: 2rem;
    background: #fe7e00;
    box-shadow: 0 5px 11px #fe7e0073;
  }
}

.cube-btn {
  width: 90% !important;
  margin: 0 auto;
}

.header {
  text-align: center;
  background: #fe7e00;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.info .nickName {
  margin-top: 1rem;
  color: #fff;
}
</style>