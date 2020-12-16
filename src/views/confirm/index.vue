<template>
  <div id="confirm" style="background:#fafafa">
    <div class="header">
      <div class="back" @click="goBack">
        <img src="../../assets/images/back.png" alt class="back" style="width:1rem; height:1rem;" />
      </div>
      <div>
        确认订单
      </div>
    </div>

    <div class="contain">
      <div class="card">
        <div class="card-body">
          <div class="card-cell">{{confirmData.store_name}}</div>

          <div class="card-cell no-border" v-for="(item,i) in confirmData.items">
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
          <div class="card-cell" @click="goNotes">
            <div class="card-cell__left ">备注</div>
            <div class="card-cell__right beizhu" >
              {{notesData}}
              <!-- <cube-textarea v-model="postData.addition.remark"></cube-textarea> -->
            </div>
          </div>
        </div>
      </div>
    </div>

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
</template>
<script>

import { orderAdd, addOrderItem, orderConfirm } from "@/api";
export default {
  data() {
    return {
      confirmData: {},
      postData: {
        cart_id: [],
        order_id: "",
        address: {}, //收货地址 暂时用不掉
        addition: {
          voucher: {}, //代金券 暂时用不到
          redpacket: {}, //红包  暂时用不到
          remark: "" //备注
        }
      },

      selectedIndex: [],
      data: [[]],
      notesData:''
    };
  },
  methods: {
    getConfirmData(cart_id, order_id) {
      orderConfirm({ cart_id: cart_id, order_id: order_id }).then(res => {
        if (res.status === 200) {
          this.confirmData = res.data;
        } else {
        }
      });
    },
    showDrawer() {
      this.$refs.drawer.show();
    },
    confirmOrder() {
      if (this.postData.order_id) {
        this.addOrderItem();
        localStorage.clear('notesData');

      } else {
        this.orderAdd();
      }
    },
    orderAdd() {
      orderAdd(this.postData).then(res => {
        if (res.status === 200) {
          this.$router.push(`/successPlaceOrder/${res.data.order_id}`);
        } else {
        }
      });
    },
    addOrderItem() {
      addOrderItem(this.postData).then(res => {
        if (res.status === 200) {
          this.$router.push(`/successPlaceOrder/${res.data.order_id}`);
        } else {
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    goNotes(){
      this.$router.push('/notes')
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
    this.notesData = localStorage.getItem('notesData') || ' '
  },
  components: {
    // tabbar
  }
};
</script>
<style lang="stylus" scoped>
#confirm {
  background: #fafafa;
  height: 100%;

.header {
  text-align: center;
  background: #fff;
  padding: 1rem;
  font-size: 1rem;
  color: #000;
  display: flex;
  position: fixed;
  width: 100%;
  z-index: 1;
  justify-content: center;
}

.contain {
  padding: 10px;
  margin-bottom: 50px;
  padding-top: 50px;
}

.card {
  position: relative;
  box-sizing: border-box;
  padding: 8px 16px;
  color: #4c4c4c;
  font-size: 0.9rem;
  background-color: #ffffff;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;

  .card-body {
    min-height: 30px;
    .card-cell {
      position: relative;
      padding: 1rem 0;
      display: flex;
      justify-content: space-between;

      .card-cell__left {
        display: flex;
        justify-content: flex-start;
        margin-right: 0.5rem;
      }

      .card-cell__right {
      }
      .beizhu {
        width: 80%;
        text-align: right;
      }

      .card-cell__thumb {
        width: 4rem;
        height: 4rem;
        flex-grow: 0;
        flex-shrink: 0;
        margin-right: .5rem;
        img {
          width: 100%;
        }
      }

      .card-cell__info {
        flex-grow: 1;
      }

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
          font-size: 0.6rem;
          line-height: 1.3rem;
          margin-bottom: 0.2rem;
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

.mark {
  font-size: 1rem;
  color: #FE7E00;
  font-weight: 600;
}

.back {
  position: absolute;
  left: 10px;
  top: .5rem;
}
}

</style>
