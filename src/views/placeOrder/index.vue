<template>
  <cube-page type="white-header placeOrder" title="下单成功">
    <template slot="header" v-if="order.table_id">
      <h1>桌台 {{order.table_name}}</h1>
      <i @click="goBack" class="cubeic-back"></i>
    </template>

    <template slot="header" v-else>
      <h1>订单详情</h1>
      <i @click="goBack" class="cubeic-back"></i>
    </template>

    <div slot="content" class="wrapper">
      <div class="orderNum">订单号：{{order.order_id}}</div>
      <ul class="list">
        <li class="item" :key="i" v-for="(item,i) in order.items">
          <div class="tableImg">
            <img :src="item.item_image" alt />
          </div>
          <div class="mealName">
            <div class="name">{{item.item_name}}</div>
            <div class="crumb">
              <span v-if="item.item_spec">{{item.item_spec}}</span>

            </div>
          </div>
          <div class="num">
            <span>x{{item.order_item_quantity}}</span>
            <span style="color:#878787">￥{{item.order_item_price}}</span>
          </div>
          <div class="del" v-if="false && order.order_status == 1 ">
            <span @click="handleDelMeal(item.order_item_id)" >
              <img style="width:16px; height:16px" src="../../assets/images/del.png" alt />
            </span>
          </div>
        </li>
      </ul>

      <div class="bottomBar">
        <div >
          合计：
          <span class="price">￥ {{order.order_payment_amount}}</span>
        </div>
        <div class="btn" v-if="order.order_status == 1">
          <button @click="handlePressOrder">催单</button>
          <button @click="handleAddMealRouter">加菜</button>
          <button @click="handlePayOrderRouter">结算</button>
        </div>
      </div>
    </div>

    <loading v-show="loadShow"></loading>

  </cube-page>

</template>
<script>
import { orderDetail, deleteOrderItem,orderPress } from "@/api"
import CubePage from '@/components/page'
import Loading from '@/components/loading'
export default {
  components: {
    CubePage,
    Loading
  },
  data() {
    return {
      order: {},
      loadShow:true,
    };
  },
  methods: {
    getOrderDetail(order_id) {
      orderDetail({ order_id: order_id }).then(res => {
        if (res.status === 200) {
          this.order = res.data;
          this.loadShow = false;
        }
      });
    },
    handleDelMeal(order_item_id) {
      this.$createDialog({
        type: 'confirm',
        title: '确认要删除商品吗？',
        onConfirm: () => {
          deleteOrderItem({
            order_id: this.order.order_id,
            order_item_id: order_item_id
          }).then(res => {
            if (res.status === 200) {
              this.order = res.data;
            } else {
              this.toast = this.$createToast({
                txt: '操作失败',
                type: 'txt'
              })
              this.toast.show()
            }
          });
        }
      }).show();
    },
    handleAddMealRouter() {
      if( this.order.table_id ){
        return this.$router.push(
          `/home/${this.order.store_id}/${this.order.table_id}`
        );
      } else {
        return this.$router.push(
          `/shop/${this.order.store_id}`
        );
      }
      
    },
    handlePayOrderRouter() {
      return this.$router.push(`/pay/${this.order.order_id}/${this.order.order_payment_amount}`);
    },
    handlePressOrder(){
      orderPress({order_id:this.order.order_id}).then( res =>{
        if( res.status === 200 ){
          this.toast = this.$createToast({
            txt: '您的催单已发送',
            type: 'txt'
          })
          this.toast.show()
        } else {
          this.toast = this.$createToast({
            txt: '操作失败',
            type: 'txt'
          })
          this.toast.show()
        }
      })
    },
    goBack() {
      this.$router.go(-1);//返回上一层
    }
  },
  created() {
    let order_id = this.$route.params.id;
    this.getOrderDetail(order_id);
  }
};
</script>
<style lang="stylus" scoped>
.placeOrder {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #fafafa;

  .orderNum {
    position: relative;
    width: 100%;
    display: flex;
    box-sizing: border-box;
    padding: .5rem;
    font-size: 0.8rem;
    color: #9e9e9e;
    background: #fff;
  }

  .list {
    margin-bottom: 50px;
    background: #fff;
    .item {
      position: relative;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .num {
        display: flex;
        display: flex;
        width: 26%;
        justify-content: space-between;
      }

      .tableImg {
        width: 2rem;
        height: 2rem;
        margin-right: 0.5rem;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .mealName {
        flex-grow: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .name {
          padding:.5rem 0;
        }
        .crumb {
          color: #999;
          font-size: 14px;
        }
      }

      .del {
        margin-left:2rem;
      }
    }

    .item::after {
      content: '';
      width: 96%;
      height: 1px;
      position: absolute;
      top: 0;
      left: 2%;
      background: #dcdcdc;
    }
  }

  .bottomBar {
    position: fixed;
    width: 100%;
    bottom: 0;
    display: flex;
    align-items: center;
    height: 3rem;
    box-sizing: border-box;
    padding: 0 0.5rem;
    box-shadow: 0px 5px 29px 0px rgba(6, 0, 1, 0.1);
    background-color: #fff;
    .price {
      color:#FE7E00;
      font-weight: 600;
    }
    .btn {
      position: absolute;
      right: 0rem;

      button {
        font-size:12px;
        border-radius: 1rem;
        margin-right: 0.25rem;
        border: none;
        color: #fff;
        padding: 7px 24px;
        background:linear-gradient(0deg,rgba(254,126,0,1),rgba(255,172,90,1));
        box-shadow:0px 5px 10px 0px rgba(254,126,0,0.4);
      }
    }
  }
}
</style>