<template>
  <cube-page type="order-detail" title="订单">
    <template slot="header">
      <i @click="goBack" class="cubeic-back"></i>
    </template>

    <div slot="content" class="wrapper">
      <h1 class="h1-status">{{orderData.order_status_name}}</h1>
      <div class="contain">

        <div class="card" v-if="orderData.order_status === 1 || orderData.order_status === 2 || orderData.order_status === 3 || orderData.order_status === 4 || orderData.return">
          <div class="card-body">
            <div class="card-cell" style="flex-wrap:wrap" >
              <h3 v-if="orderData.order_status === 1">订单还未支付</h3>
              <h3 v-else-if="orderData.order_status === 2">订单已支付，等待商家确认</h3>
              <h3 v-else-if="orderData.order_status === 3">商家已确认，等待订单配送</h3>
              <h3 v-else-if="orderData.order_status === 4">订单配送中，请耐心等待</h3>
              <h3 v-else-if="orderData.order_status === 5">订单已完成，期待下次光临</h3>

              <div class="btn-group">
                <a href="javascript:;" class="btn" v-if="orderData.order_status === 1 || orderData.order_status === 2" @click="handleOrderCancel">取消订单</a>

                <a href="javascript:;" class="btn" v-if="orderData.order_status === 1" @click="handlePay">立即支付</a>

                <a href="javascript:;" class="btn" v-if="orderData.order_status === 4" @click='handleOrderConfirm'>确认收货</a>


                <a href="javascript:;" class="btn" v-if="orderData.order_status != 2 && orderData.can_return" @click="showSheet">申请售后</a>

                <a href="javascript:;" class="btn" v-if="orderData.return" @click="goReturn(orderData.return.return_id)">退款详情</a>

              </div>
              
            </div>            
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="card-cell"><h3>{{orderData.store_name}}</h3></div>

            <div class="card-cell no-border" v-for="(item,i) in orderData.items">
              <div class="card-cell__left">
                <div class="card-cell__thumb">
                  <img :src="item.item_image" style="object-fit: contain;" />
                </div>

                <div class="card-cell__info">
                  <dl>
                    <dt>{{item.item_name}}</dt>
                    <dd>{{item.spec_name}}</dd>
                    <dd>x{{item.order_item_quantity}}</dd>
                  </dl>
                </div>
              </div>
              <div class="card-cell__right">
                <span class="price">￥{{item.order_item_price}}</span>
              </div>
            </div>

            <div class="card-cell">
              <div class="card-cell__left">餐具费</div>
              <div class="card-cell__right">￥0</div>
            </div>

            <div class="card-cell">
              <div class="card-cell__left">服务费</div>
              <div class="card-cell__right">￥0</div>
            </div>

            <div class="card-cell">
              <div class="card-cell__left">满减优惠</div>
              <div class="card-cell__right">
                <i style="color:#fe7e00;">￥</i>
                <span class="mark">{{orderData.order_discount_amount}}</span>
              </div>
            </div>

            <div class="card-cell">
              <div class="card-cell__left">优惠</div>
              <div class="card-cell__right">
                已优惠
                <span class="mark">￥{{orderData.order_discount_amount}}</span>
                ，小计￥{{orderData.order_payment_amount}}
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="card-cell">
              <h3>配送信息</h3>
            </div>

            <template v-if="orderData.shipping ">
              <div class="card-cell">
                <div class="card-cell__left">配送员</div>
                <div class="card-cell__right">
                  {{orderData.shipping.shipping_contacter}}
                </div>
              </div>

              <div class="card-cell">
                <div class="card-cell__left">联系方式</div>
                <div class="card-cell__right">
                  <a :href="'tel:' + orderData.shipping_mobile">{{orderData.shipping.shipping_mobile}}</a>
                </div>
              </div>

            </template>
            <div class="card-cell">
              <div class="card-cell__left">配送时间</div>
              <div class="card-cell__right">
                {{orderData.shipping ? orderData.shipping.shipping_time :'尽快送达'}}
              </div>
            </div>

            <div class="card-cell" v-if="orderData.delivery">
              <div class="card-cell__left">配送地址</div>
              <div class="card-cell__right">
                {{orderData.delivery.da_province + orderData.delivery.da_city + orderData.delivery.da_county + orderData.delivery.da_address}}
              </div>
            </div>

            <div class="card-cell">
              <div class="card-cell__left">配送方式</div>
              <div class="card-cell__right">
                商家配送
              </div>
            </div>

            <div class="card-cell" v-if="orderData.shipping ">
              <div class="card-cell__left">配送备注</div>
              <div class="card-cell__right">
                {{orderData.shipping.shipping_explain}}
              </div>
            </div>

          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="card-cell">
              <h3>订单信息</h3>
            </div>

            <div class="card-cell">
              <div class="card-cell__left">订单号</div>
              <div class="card-cell__right">
                {{orderData.order_id}}
              </div>
            </div>

            <div class="card-cell">
              <div class="card-cell__left">支付方式</div>
              <div class="card-cell__right">
                在线支付
              </div>
            </div>

            <div class="card-cell">
              <div class="card-cell__left">下单时间</div>
              <div class="card-cell__right">
                {{orderData.order_time}}
              </div>
            </div>

            <div class="card-cell">
              <div class="card-cell__left">订单备注</div>
              <div class="card-cell__right">
                {{orderData.order_remark}}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>

    <loading v-show="loadShow"></loading>

  </cube-page>
</template>
<script>
import CubePage from '@/components/page'
import Loading from '@/components/loading'
import { orderDetail ,orderModifyStatus } from "@/api";
export default {
  components: {
    CubePage,
    Loading
  },
  data() {
    return {
      orderData:{},
      loadShow:true
    };
  },
  methods: {
    getOrderData( order_id ){
      orderDetail({order_id:order_id}).then( res => {
        if( res.status === 200 ){
          this.orderData = res.data;
        }

        this.loadShow = false;
      })
    },
    showSheet() {
      this.$createActionSheet({
        data: [
          {
            content: '申请售后',
            align: 'center'
          }
        ],
        onSelect: (item, index) => {
          if( index === 0 ){
          
            this.$router.push(`/returnManage/${this.orderData.order_id}`)
          }
        }
      }).show()
    },
    handlePay(){
      this.$router.push(`/pay/${this.orderData.order_id}/${this.orderData.order_payment_amount}`)
    },
    handleOrderCancel(){
      this.$createDialog({
        type: 'confirm',
        title: '确认要取消订单吗？',
        onConfirm: () => {
          orderModifyStatus({order_id:this.orderData.order_id,order_status:6}).then( res => {
            if( res.status === 200 ){
              this.orderData.order_status = res.data.order_status;
            }else{
              this.toast = this.$createToast({
                txt: '操作失败',
                type: 'txt'
              })
              this.toast.show()
            }
          })
        }
      }).show();
    },
    handleOrderConfirm(){
      this.$createDialog({
        type: 'confirm',
        title: '确认已收到货了吗？',
        onConfirm: () => {
          orderModifyStatus({order_id:this.orderData.order_id,order_status:5}).then( res => {
            if( res.status === 200 ){
              this.orderData.order_status = res.data.order_status;
            }else{
              this.toast = this.$createToast({
                txt: '操作失败',
                type: 'txt'
              })
              this.toast.show()
            }
          })
        }
      }).show();

    },
    goReturn(return_id){
      this.$router.push(`/returnDetail/${return_id}`)
    },
    goBack() {
      this.$router.push(`/orderLists`)
    },
    goStore(){
      if( this.orderData.order_type === 2 ){
        this.$router.push(`/store/${this.orderData.store_id}`)
      } else {
        if( this.orderData.table_id ){
          this.$router.push(`/home/${this.orderData.store_id}/${this.orderData.table_id}`)
        } else {
          this.$router.push(`/shop/${this.orderData.store_id}`)
        }
      }
    }
  },
  created() {
    if (this.$route.params.id) {
      this.getOrderData(this.$route.params.id);
    }
    
  }
};
</script>


<style lang="stylus" scoped>

.order-detail {
  background: #fafafa;
  height: 100%;

.contain {
  padding: 10px;
  margin-bottom: 50px;
}
.h1-status {
  padding: 5px 15px 5px;
  font-size: 20px;
  font-weight: 600;
}
.card {
  position: relative;
  box-sizing: border-box;
  color: #4c4c4c;
  font-size: 0.9rem;
  background-color: #ffffff;
  margin-bottom: 0.8rem;
  border-radius: 0.25rem;
  padding:0px 15px;
  .card-body {
    min-height: 30px;
    .card-cell {
      position: relative;
      padding: 1rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h3 {
      font-weight:600;
      }
      .btn-group {
        width:100%;
        margin-top:15px;
        .btn {
          display: inline-block;
            padding: 8px 10px;
            border: 1px solid #fc9153;
            font-size: .9rem;
            color: #fc9153;
            border-radius: 5px;
        }
      }
      

      .card-cell__left {
        display: flex;
        justify-content: flex-start;
        margin-right: 0.8rem;
      }

      .card-cell__right {
      }
      .beizhu {
        width: 80%;
        text-align: right;
      }

      .card-cell__thumb {
        width: 2.5rem;
        height: 2.5rem;
        flex-grow: 0;
        flex-shrink: 0;
        margin-right: .8rem;
        img {
          width: 100%;
        }
      }

      .card-cell__info {
        flex-grow: 1;
        dl {
          dt {
            color: #333;
            font-size: 1rem;
            margin-bottom: 0.2rem;
            line-height: 1.2rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }

          dd {
            color: #999;
            font-size: 0.8rem;
            line-height: 1.3rem;
            margin-bottom: 0.2rem;
          }
        }
      }

      .card-cell__address {
        dl {
          dt {
            color: #000;
            font-size: 1.2rem;
            line-height: 1.8rem;
            font-weight:600;
            margin-bottom: 0.2rem;
          }

          dd {
            color: #999;
            font-size: 0.8rem;
            line-height: 1.3rem;
            
          }
        }
      }

      .price {
        color: #333;
        font-size: 1rem;
        font-weight: 600;
      }

      .line-through {
        color: #999;
        text-decoration: line-through;
      }
    }

    .card-cell:not(:last-child)::after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      right: 0;
      bottom: 0;
      left: 0;
      border-bottom: 1px solid #ebedf0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }

    .card-cell.no-border::after {
      border-bottom: 0;
    }
  }
}


.back {
  position: absolute;
  left: 10px;
  top: .8rem;
}
}

</style>
