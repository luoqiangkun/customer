<template>

  <cube-page type="white-header pay" title="支付">
    <template slot="header">
      <i @click="goBack" class="cubeic-back"></i>
    </template>
   
    <div slot="content" class="lists">
      <div class="main">
        <div class="title">本次应收</div>
        <div class="amount">￥{{order_amount}}</div>
        <div class="payment_channel">
          <cube-radio-group>
            <cube-radio
              v-for="(option, index) in options"
              :key="index"
              position="right"
              :option="option"
              v-model="payment_channel_code">
              <img class="image" :src="option.src" />
              <span style="margin-left:10px">{{option.label}}</span>
            </cube-radio>
          </cube-radio-group>
        </div>
      </div>

      <div class="footer">
        <cube-button :primary="true" @click="pay">确认支付</cube-button>
      </div>
    </div>

  
  </cube-page>

</template>
<script>
import CubePage from '@/components/page'
import { pay } from '@/api'
import { orderDetail } from "@/api"
import { isWeixin } from "@/utils/helper"
export default {
  components: {
    CubePage
  },
  data() {
    return {
      orderData:{},
      order_id:'',
      order_amount:'',
      page:'',
      payment_channel_code : 'wx_native',
      options: [
        {
          label: '微信支付',
          value: 'wx_native',
          src: require('../../assets/images/wechat.png')
        },
        {
          label: '支付宝支付',
          value: 'alipay',
          src: require('../../assets/images/ali.png')
        }
      ]
    };
  },
  methods: {
    getOrder(){
      orderDetail({order_id:this.order_id}).then( res => {
        if( res.status === 200 ){
          this.orderData = res.data;
        }
      })
    },
    pay(){
      let data = {
        payment_channel_code:this.payment_channel_code,
        order_id:this.order_id,
        from:'customer'
      };

      return pay( this.order_id,this.payment_channel_code);
    },
    goBack() {
      if( this.orderData.order_type === 1 ){
        return this.$router.push(`/placeOrder/${this.order_id}`);
      } else if( this.orderData.order_type === 2 ){
        return this.$router.push(`/orderDetail/${this.order_id}`);
      } else if( this.orderData.order_type === 3 ){
        return this.$router.push(`/orderInfo/${this.order_id}`);
      }
    }
  },
  
  created(){
    this.order_id = this.$route.params.order_id;
    this.order_amount = this.$route.params.order_amount;

    if( isWeixin() ){
      this.options.splice(1,1);
    }
    this.getOrder();
  },

}; 
</script>
<style lang="stylus" scoped>
.main {
  padding:30px 0;
  background: #fff;
}
.main .title,
.main .amount {
  padding:10px 0;
  text-align: center;
}
.main .amount {
  font-size:30px;
  color:#fca046;
  font-weight:600;
}
.main .image {
  width:50px;
}
.footer {
  position: absolute;
  bottom: 3rem;
  left: 1rem;
  right: 1rem;
    .cube-btn {
    width: 90% !important;
    position: fixed;
    bottom: 3rem;
    margin: 0 auto;
    width: 100%;
    border-radius: 2rem;
    background: linear-gradient(0deg, rgba(254, 126, 0, 1), rgba(255, 172, 90, 1));
    box-shadow: 0px 5px 20px 0px rgba(254, 126, 0, 0.4);
  }
}
</style>


