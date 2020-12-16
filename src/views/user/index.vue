<template>
  <cube-page type="no-header user" title="用户中心">
    <div slot="content" class="main">
      <div class="box">
        <div class="user-wrap">
            <div class="user_avatar">
              <img :src="user.avatar ? user.avatar : avatar_url" />
            </div>
            <div class="user_account">{{user.name}}</div>
        </div>
      </div>

      <div class="btn">
        <cube-button :primary="true" @click="logout">退出账号</cube-button>
      </div>
      
    </div>
  </cube-page>
</template>
<script>
import CubePage from '@/components/page'
import { mapGetters } from "vuex"
import avatarUrl from '../../assets/images/avatar.jpg'
   
import { userInfo } from '@/api'
export default {
  components:{
    CubePage
  },
  data(){
    return {
      avatar_url:avatarUrl
    }
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    getuserInfo(){
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
   
  }
};
</script>
<style lang="stylus" scoped>
.user {
  background:#fff;
  .box {
    height:250px;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background:url('../../assets/images/background.png');
    background-size: 100%;
    background-repeat: no-repeat;
    .user-wrap {
      .user_avatar {
        width: 4rem;
        margin: 0 auto;
        overflow: hidden;
        img {
          border-radius: 50%;
          width:100%;
          border: 3px solid #e88019;
          box-sizing: border-box;
        }
      }
      .user_account {
        color:#fff;
        color: #fff;
        margin-top: 5px;
        height: 20px;
        font-size: 16px;
        text-align: center;
      }
    }
  }

  button {
    margin-top: 5rem;
    width: 90% !important;
    border-radius: 2rem;
    margin-left: 5%;
    background: #fe7e00;
    box-shadow: 0 5px 11px #fe7e0073;
  }
}

</style>