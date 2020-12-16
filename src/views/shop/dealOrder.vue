<template>
  <cube-page type="white-header confirm" title="确认订单">
    <template slot="header">
      <h1>确认订单</h1>
      <i class="cubeic-back" @click="goBack"></i>
    </template>

    <div slot="content" class="wrapper">
      <div class="contain">
        <div class="card">
          <div class="card-body">
            <div class="card-cell" >
              <div class="card-cell__left ">支付方式</div>
              <div class="card-cell__right">在线支付 <i class="cubeic-arrow"></i></div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="card-cell">{{confirmData.store_name}}</div>

            <div class="card-cell no-border ud-padding" v-for="(item,i) in confirmData.items">
              <div class="card-cell__left">
                <div class="card-cell__thumb">
                  <img :src="item.item_image" style="object-fit: contain;" />
                </div>

                <div class="card-cell__info">
                  <dl>
                    <dt>{{item.item_name}}</dt>
                    <dd>{{item.spec_name}}</dd>
                    <dd>x{{item.item_quantity}}</dd>
                  </dl>
                </div>

                <p
                  class="line-through"
                  v-if="item.activity_id && item.activity_type_id && item.activity_type_id == 2"
                >￥{{item.item_price}}</p>
              </div>
              <div class="card-cell__right">
                <span class="price">￥{{item.item_actual_price}}</span>
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
                <span class="mark">{{confirmData.store_reduction_amount}}</span>
              </div>
            </div>

            <div class="card-cell">
              <div class="card-cell__left">优惠</div>
              <div class="card-cell__right">
                已优惠
                <span class="mark">￥{{confirmData.store_discount_amount}}</span>
                ，小计￥{{confirmData.store_payment_amount}}
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="card-cell" @click="showRemark = !showRemark">
              <div class="card-cell__left ">备注</div>
              <div class="card-cell__right beizhu" >
                {{remark}}
                <!-- <cube-textarea v-model="postData.addition.remark"></cube-textarea> -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <order-remark
        @remark-back="remarkBack" 
        @remark-callback="remarkCallBack" 
        @remark-set="remarkSet"
        v-show="showRemark">
      </order-remark>

      <div class="footer">
        <div class="total">
          <div class="total-amount">
            总计：
            <span class="mark">￥{{confirmData.store_payment_amount}}</span>
          </div>
          <div class="total-discount">优惠：￥{{confirmData.store_discount_amount}}</div>
        </div>
        <div class="submit" @click="confirmOrder">提交订单</div>
      </div>
    </div>

    <loading v-show="loadShow"></loading>

  </cube-page>
</template>
<script>
import CubePage from '@/components/page'
import OrderRemark from '@/components/remark'
import Loading from '@/components/loading'

import { orderAdd, addOrderItem, orderConfirm } from "@/api";
export default {
  components: {
    CubePage,
    OrderRemark,
    Loading
  },
  data() {
    return {
      confirmData: {},
      postData: {
        order_type:3,
        cart_id: [],
        order_id: "",
        ud_id:'',
        remark: "", //备注
        voucher: {}, //代金券 暂时用不到
        redpacket: {} //红包  暂时用不到
      },
      selectedIndex: [],
      data: [[]],
      remark:'',
      showRemark:false,
      loadShow:false
    };
  },
  methods: {
    getConfirmData(cart_id, order_id) {
      orderConfirm({ cart_id: cart_id, order_id: order_id }).then(res => {
        if (res.status === 200) {
          this.confirmData = res.data;
          this.loadShow = false;
        } else {
          this.toast = this.$createToast({
            txt: '数据有误'
          })
          this.toast.show()
          setTimeout(() => {
            this.goBack();
          }, 500)
        }
      });
    },
    confirmOrder() {
      if (this.postData.order_id) {
        this.addOrderItem();
      } else {
        this.orderAdd();
      }
    },
    orderAdd() {
      orderAdd(this.postData).then(res => {
        if (res.status === 200) {
          this.$router.push(`/pay/${res.data.order_id}/${res.data.order_payment_amount}`)
        } else {
          this.toast = this.$createToast({
            txt: '操作失败',
            type: 'txt'
          })
          this.toast.show()
        }
      });
    },
    addOrderItem() {
      addOrderItem(this.postData).then(res => {
        if (res.status === 200) {
          this.$router.push(`/pay/${res.data.order_id}/${res.data.order_payment_amount}`)
        } else {
          this.toast = this.$createToast({
            txt: '操作失败',
            type: 'txt'
          })
          this.toast.show()
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    remarkBack(){
      this.showRemark = false;
    },
    remarkCallBack( remark ){
      this.remark = remark;
      this.showRemark = false;
      this.postData.remark = remark;
    },
    remarkSet( remark ){
      this.remark = remark;
      this.postData.remark = remark;
    }
  },
  created() {
    if (this.$route.params.cart_id) {
      this.postData.cart_id = this.$route.params.cart_id.split(",");
    }
    if (this.$route.params.order_id) {
      this.postData.order_id = this.$route.params.order_id;
    }

    this.getConfirmData(this.postData.cart_id, this.postData.order_id);
    this.remark = localStorage.getItem('remark') || ' '
  }
};
</script>
<style lang="stylus" scoped>
.confirm {
  background: #fafafa;
  height: 100%;
  .contain {
    padding: 10px;
    margin-bottom: 50px;
    .card {
      position: relative;
      box-sizing: border-box;
      padding: 0 15px;
      color: #4c4c4c;
      font-size: 0.9rem;
      background-color: #ffffff;
      margin-bottom: 0.8rem;
      border-radius: 0.25rem;

      .card-body {
        min-height: 30px;
        .card-cell {
          position: relative;
          padding: 1rem 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .card-cell__left {
            display: flex;
            justify-content: flex-start;
            margin-right: 0.8rem;
          }

          .card-cell__right {
            line-height: 1.2rem;
            .mark {
              font-size: 1rem;
              color: #FE7E00;
              font-weight: 600;
            }
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
                font-size: .9rem;
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

        

          .price {
            color: #333;
            font-size: 1rem;
            font-weight: 600;
          }

          .line-through {
            color: #999;
            text-decoration: line-through;
            margin-left:10px;
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
        .card-cell.ud-padding{
          padding: .5rem 0 0;
        }
        .card-cell.no-border::after {
          border-bottom: 0;
        }
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0rem;
    left: 0;
    right: 0;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    height:50px;

    .total {
      padding: 0 1rem;
      display: flex;
      flex-grow: 1;
      justify-content: space-between;
      align-items: center;
      .total-discount {
        font-size: 0.8rem;
        color: #999;

      }
    }

    .submit {
      text-align: center;
      font-weight: 700;
      font-size: 12px;
      color: #fff;
      padding: 10px 20px;
      border-radius: 20px;
      background: linear-gradient(0deg,rgba(254,126,0,1),rgba(255,172,90,1));
      box-shadow: 0px 5px 10px 0px rgba(254,126,0,0.4);
      margin-right: 1rem;
    }


  }
}

</style>
