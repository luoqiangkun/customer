<template>
  <cube-page type="white-header cart" title="购物车">
    <template slot="header">
      <h1>购物车</h1>
      <i class="cubeic-back" @click="goBack"></i>
      <span class="action" @click="handleClearCart" v-if="cartData.length > 0 ">清空</span>

    

    </template>

    <div slot="content" class="wrapper">
      <div class="contain">
        <template  v-if="cartData.length > 0 ">
          <div class="card" :key="index" v-for="(data,index) in cartData">
            <div class="card-body">
              <div class="card-cell">
                <div class="card-cell__left">{{data.store_name}}</div>
                <div class="card-cell__right"><i class="cubeic-delete" style="color:#ccc" @click="handleDeleteCart(data.store_id)"></i></div>
             
              </div>

              <div class="card-cell no-border ud-padding" :key="i" v-for="(item,i) in data.items">
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
                <div class="card-cell__left">
                  已优惠
                  <span class="mark">￥{{data.store_discount_amount}}</span>
                </div>
                <div class="card-cell__right">
                  
                  合计￥{{data.store_payment_amount}}

                  <a href="javascript:;" class="submit" @click="handleConfirmRouter(data)">去结算</a>
                </div>
              </div>
            </div>
          </div>

        </template>
        
        <no-results v-else></no-results>

      </div>

    </div>

    <loading v-show="loadShow"></loading>

  </cube-page>
</template>
<script>
import CubePage from '@/components/page'
import noResults from '@/components/noResults'
import Loading from '@/components/loading'
import { cartLists,cartClear } from "@/api";
export default {
  components: {
    CubePage,
    noResults,
    Loading
  },
  data() {
    return {
      cartData: [],
      loadShow:true,
    };
  },
  methods: {
    getCartData(cart_id, order_id) {
      cartLists().then(res => {
        if (res.status === 200) {
          this.cartData = res.data;
          this.loadShow = false;
        }
      });
    },
    handleDeleteCart( store_id ) {

      this.$createDialog({
        type: 'confirm',
        title: '确认要删除店铺的所有商品吗？',
        onConfirm: () => {
          cartClear({store_id:store_id,cart_type:2}).then( res => {
            if( res.status === 200 ){
              this.cartData = [];
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
    handleClearCart() {
      this.$createDialog({
        type: 'confirm',
        title: '确认要清除购物车吗？',
        onConfirm: () => {
          cartClear({cart_type:2}).then( res => {
            if( res.status === 200 ){
              this.cartData = [];
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
    handleConfirmRouter( data ) {
      let cart_id = [];
      for( let i in data.items ){
        cart_id.push( data.items[i].cart_id );
      }
      this.$router.push(`/confirmOrder/${cart_id}`);
    },
    goBack() {
      
      this.$router.go(-1);
    }
  },
  created() {
    this.getCartData();
  }
};
</script>
<style lang="stylus" scoped>
.cart {
  background: #fafafa;
  height: 100%;
  .action {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 15px;
    color: #fc9153;
  }
  
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
  }

  .card {
    position: relative;
    box-sizing: border-box;
    padding: 0px 15px;
    color: #4c4c4c;
    font-size: 0.9rem;
    background-color: #ffffff;
    margin-bottom: 0.8rem;
    border-radius: 0.25rem;

    .card-body {
      min-height: 30px;
      padding:0 0 5px;
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
      .card-cell.ud-padding {
          padding:.5rem 0 0.5rem;
        }
      .card-cell.no-border::after {
        border-bottom: 0;
      }
    }
  }

  .submit {
    text-align: center;
    font-weight: 700;
    font-size: 12px;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    margin-left:5px;
    background: linear-gradient(0deg,rgba(254,126,0,1),rgba(255,172,90,1));
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
    top: .8rem;
  }
}

</style>
