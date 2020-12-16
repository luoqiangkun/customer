<template>
  <cube-page type="no-header goods-detail" title="订单">
    <template slot="header">
      
    </template>
    <div slot="content" class="wrapper">
      <div class="indexDetail">
        <div class="back">
            <i class="cubeic-back" @click="goBack"></i>
        </div>
        <div class="detailImg">
            <img
                :src="goodsData.goods_image"
                alt=""
            >
        </div>
        <div class="infoWrapper">
            <p class="title">{{goodsData.goods_name}}</p>
            <div class="sales">月售30</div>
            <div class="priceStepper">
                <div class="price">￥{{goodsData.goods_price}}</div>
                <div class="stepper">
                    <div class="selectBtn" @click="showSpec" v-if="(goodsData.items && goodsData.items.length > 1 ) || (goodsData.goods_attribute && goodsData.goods_attribute.length > 0) ">选规格</div>
                    
                    <div class="stepper" v-else>
                        <template v-if="cartMap[goodsData.goods_id]">
                          <transition name="move">
                            <div
                              class="cart-decrease"
                              @click.stop="decreaseItem(goodsData.items[0].item_id)"
                              style="padding: 6px"
                            >
                              <img
                                class="inner"
                                style="width:20px; height:20px"
                                src="../../assets/images/decrease.png"
                                alt
                              />
                            </div>
                          </transition>
                          <div class="cart-count">{{cartMap[goodsData.goods_id].quantity}}</div>
                        </template>

                        <div @click.stop="increaseItem(goodsData.items[0].item_id)" style="padding:6px">
                          <img style="width:20px; height:20px" src="../../assets/images/add.png" alt />
                        </div>
                    </div>

                </div>
            </div>
            <p class="detail">{{goodsData.goods_desc}}</p>
        </div>
        <div class="shopBarWrapper">
          <div class="shopCar">
            <div class="content">
              <div class="content-left" @click="showCart">
                <div class="logo-wrapper">
                  <img
                    style="width:30px; height:30px;margin-left:10px;margin-right:10px"
                    src="../../assets/images/shopCar.png"
                    alt
                  />
                  <div class="num" v-if="cart.store_item_quantity">{{cart.store_item_quantity}}</div>
                </div>
                <div class="price">合计：</div>
                <div class="desc">{{ cart.store_payment_amount? '￥'+ cart.store_payment_amount :'' }}</div>
              </div>
              <div class="content-right">
                <div class="pay" @click="handleConfirmRouter">去下单</div>
              </div>
            </div>
          </div>
        </div>

        <div class="fb_box" :class="[specShow? 'show' : '']" @click="hideSpec">
            <div class="fb_layer" :class="[specShow? 'show' : '']">
                <div class="fb_layer_con" style="padding:.5rem">
                    <div class="header">
                        <img
                            :src="goodsData.goods_image"
                            class="header-img"
                        >
                        <div class="header-info">
                            <h4>{{food.item_name}}</h4>
                            <p>已选正常</p>
                            <div>￥{{food.item_price}}</div>
                        </div>
                    </div>
                    <div class="body">
                        <div v-if="goodsData.items && goodsData.items.length > 0 ">
                            <p>规格</p>
                            <div class="wrapper">
                                <a
                                    href="#" v-for="(item,i) in goodsData.items" :key="i" @click.stop="food = item" :class="{'act' : food.item_id == item.item_id}"
                                >{{item.spec_name}}</a>
                            </div>
                        </div>

                        <template v-if="goodsData.goods_attribute && goodsData.goods_attribute.length > 0">
                        <div v-for="(item,index) in goodsData.goods_attribute">
                            <p>{{item.name}}</p>
                            <div class="wrapper">
                            
                                <a
                                  href="javascript:;"
                                  :class="{'act' : item_attribute && item_attribute[index].value === value}"
                                  v-for="(value) in item.items"
                                  @click.stop="handleAttributeChange(item.name,value,index)"
                                >{{value}}</a>

                            </div>
                        </div>
                        </template>
                        

                    </div>

                    <div class="footer">
                      
                        <div class="total">
                            <div class="total-amount">
                              总计：
                              <span class="mark" style="color:red">￥{{food.item_price}}</span>
                            </div>
                        </div>

                      <div class="numbox">
                        <div class="stepper">
                          <template
                            v-if="cartMap[goodsData.goods_id] && cartMap[goodsData.goods_id].items && cartMap[goodsData.goods_id].items[food.item_id] "
                          >
                            <transition name="move">
                              <div
                                class="cart-decrease"
                                @click.stop="decreaseItem(food.item_id)"
                                style="padding: 6px"
                              >
                                <img
                                  class="inner"
                                  style="width:20px; height:20px"
                                  src="../../assets/images/decrease.png"
                                  alt
                                />
                              </div>
                            </transition>
                            <div class="cart-count">{{cartMap[goodsData.goods_id].items[food.item_id].item_quantity}}</div>
                          </template>

                          <div @click.stop="increaseItem(food.item_id)" style="padding:6px">
                            <img style="width:20px; height:20px" src="../../assets/images/add.png" alt />
                          </div>
                        </div>
                      </div>
                    </div>

                    
                </div>
            </div>
        </div>

        <div class="fb_box" :class="[cartShow ? 'show' : '']" @click="hideCart" style="bottom:60px">
          <div class="fb_layer" :class="[ cartShow ? 'show' : '']">
            <div class="fb_layer_con">
              <div class="bar">
                <div>已选商品</div>
                <div @click="clearCart">清空</div>
              </div>

              <ul class="ulList">
                <li v-for="(item,i) in cart.items" :key="i" class="liItem">
                  <dl class="item_name">
                    <dt>{{item.item_name}}</dt>
                    <dd>{{item.spec_name}}</dd>
                  </dl>
                  <div class="item_price">{{item.item_price}}</div>

                  <div class="stepper">
                    <template>
                      <transition name="move">
                        <div
                          class="cart-decrease"
                          @click.stop="decreaseCart(item.cart_id,item.cart_quantity)"
                          style="padding: 6px"
                        >
                          <img
                            class="inner"
                            style="width:20px; height:20px"
                            src="../../assets/images/decrease.png"
                            alt
                          /> 
                        </div>
                      </transition>
                      <div class="cart-count">{{item.item_quantity}}</div>
                    </template>

                    <div
                      @click.stop="increaseCart(item.cart_id,item.cart_quantity)"
                      style="padding:6px"
                    >
                      <img style="width:20px; height:20px" src="../../assets/images/add.png" alt />
                    </div>
                  </div>
                </li>
              </ul>
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
import Loading from '@/components/Loading'

import {
   storeCart,
   goodsInfo,
   cartAdd,
   cartEdit,
   cartDelete,
   cartClear,
   orderAdd,
   addOrderItem
} from "@/api";

export default {
  components: {
    CubePage,
    Loading
  },
  data() {
    return {
      goods_id:'',
      store_id:'',
      item_id:'',
      item_attribute:[],
      goodsData:{},
      cart:{},
      cartMap: {},
      food:{},
      current: 0,
      cur: 0,
      specShow: false,
      cartShow: false,
      loadShow:true
    };
  },
  methods: {
    getGoodsInfo(){
        goodsInfo({goods_id:this.goods_id}).then( res => {
          if( res.status === 200 ){
            this.goodsData = res.data;

            const goods_attribute = [];
            if( this.goodsData.goods_attribute ){
                for( let i in this.goodsData.goods_attribute ){
                  goods_attribute.push({name:this.goodsData.goods_attribute[i].name,value:this.goodsData.goods_attribute[i].items[0]})
                }
            }
            this.food = this.goodsData['items'][0];
            this.item_attribute = goods_attribute;

            this.store_id = this.goodsData['store_id'];
            this.getStoreCart( this.store_id );

            this.loadShow = false;
          } else {
            this.toast = this.$createToast({
              txt: '操作失败',
              type: 'txt'
            })
            this.toast.show()
          }
            
        })
    },
    getStoreCart( store_id ){
        storeCart({store_id:store_id}).then( res => {
            this.cart = res.data;

            if( this.cart ){
                let store_item_quantity = 0;
                for( let i in this.cart.items ){
                    store_item_quantity += this.cart.items[i].cart_quantity
                }
                this.cart.store_item_quantity = store_item_quantity;
            }

            this.getCartMap();
            
        })
    },
    getCartMap(){
        let cartMap = {};
        if (this.cart) {
            for (let m in this.cart.items) {
              if (!cartMap[this.cart.items[m].goods_id]) {
                cartMap[this.cart.items[m].goods_id] = {
                  id: this.cart.items[m].goods_id,
                  name: this.cart.items[m].goods_name,
                  quantity: 0,
                  items: {}
                };
              }

              cartMap[this.cart.items[m].goods_id].items[
                this.cart.items[m].item_id
              ] = this.cart.items[m];
              cartMap[this.cart.items[m].goods_id].quantity += this.cart.items[
                m
              ].item_quantity;
            }
        }
        this.cartMap = cartMap;
    },
    //添加购物车 item_id 商品ID item_quantity 商品数量
    handleAddCart(item_id, item_quantity,item_attribute) {
      cartAdd({
        item_id: item_id,
        item_quantity: item_quantity,
        item_attribute:item_attribute
      }).then(res => {
        if (res.status === 200) {
          this.cart = res.data;

          this.getCartMap();
        } else {
          this.toast = this.$createToast({
            txt: '操作失败',
            type: 'txt'
          })
          this.toast.show()
        }
      });
    },

    //编辑购物车 cart_id 购物车ID cart_quantity 商品数量
    handleEditCart(cart_id, cart_quantity,item_attribute) {
      cartEdit({ cart_id: cart_id, cart_quantity: cart_quantity,item_attribute:item_attribute }).then(res => {
        if (res.status === 200) {
          this.cart = res.data;
          this.getCartMap();
        } else {
          this.toast = this.$createToast({
            txt: '操作失败',
            type: 'txt'
          })
          this.toast.show()
        }
      });
    },
    //删除购物车 cart_id 购物车ID
    handleRemoveCart(cart_id) {
      cartDelete({ cart_id: cart_id }).then(res => {
        if (res.status === 200) {
          this.cart = res.data;
          this.getCartMap();
        } else {
          this.toast = this.$createToast({
            txt: '操作失败',
            type: 'txt'
          })
          this.toast.show()
        }
      });
    },
    //
    increaseItem(item_id) {
      const goods = this.goodsData;
      let item_attribute = [];
      if( this.food.item_id === item_id ){
        item_attribute = this.food.item_attribute
      }
  
      if (
        this.cartMap[goods.goods_id] &&
        this.cartMap[goods.goods_id].items &&
        this.cartMap[goods.goods_id].items[item_id]
      ) {
        let item_quantity = this.cartMap[goods.goods_id].items[item_id]
          .item_quantity;
        item_quantity++;
        this.handleEditCart(
          this.cartMap[goods.goods_id].items[item_id].cart_id,
          item_quantity,
          item_attribute
        );
      } else {
        this.handleAddCart(item_id, 1,item_attribute);
      }
    },
    decreaseItem( item_id ) {
      const goods = this.getGoodsByItemId( item_id );
      let item_quantity = this.cartMap[goods.goods_id].items[item_id].item_quantity
      item_quantity--;
      if( item_quantity <= 0 ){
        this.handleRemoveCart(this.cartMap[goods.goods_id].items[item_id].cart_id);
      } else {
        this.handleEditCart(this.cartMap[goods.goods_id].items[item_id].cart_id,item_quantity);
      }
    },
    increaseCart( cart_id,cart_quantity ){
      cart_quantity++;
      this.handleEditCart(cart_id,cart_quantity);
    },
    decreaseCart( cart_id,cart_quantity){
      cart_quantity--;
      if( cart_quantity <= 0 ){
        this.handleRemoveCart(cart_id);
      } else {
        this.handleEditCart(cart_id,cart_quantity);
      }
    },
    handleConfirmRouter() {
      if (this.cart && this.cart.items && this.cart.items.length > 0) {
        let cart_id = [];
        for (let i in this.cart.items) {
          cart_id.push(this.cart.items[i].cart_id);
        }

        if( this.order && this.order.order_id ){
          this.$router.push(`/confirm/${cart_id}/${this.order.order_id}`);
        } else {
          this.$router.push(`/confirm/${cart_id}`);
        }
        
      } else {
        this.toast = this.$createToast({
          txt: '请先选择商品',
          type: 'txt'
        })
        this.toast.show()
      }
    },
    clearCart() {
      cartClear({store_id:this.store_id}).then( res => {
        if( res.status === 200 ){
          this.cart = {};
        }else{
          this.toast = this.$createToast({
            txt: '操作失败',
            type: 'txt'
          })
          this.toast.show()
        }
      })
    },
    showCart() {
      if (!this.cart || !this.cart.items || this.cart.items.length == 0) {
        return;
      } else {
        this.cartShow = !this.cartShow;
      }
    },
    showSpec(){
      if((this.goodsData.items && this.goodsData.items.length > 0 ) || (this.goodsData.goods_attribute && this.goodsData.goods_attribute.length > 0)) {
        this.specShow = !this.specShow;
      } else {
        return;
      }
    },
    hideSpec() {
      this.specShow = false;
    },
    hideCart() {
      this.cartShow = false;
    },
    handleAttributeChange(name, value, index) {
      this.item_attribute[index].value = value;
    },
    goBack() {
        this.$router.go(-1);
    },
    
    select(i) {
      this.cur = i;
    }
  },
  created(){
    this.goods_id = this.$route.params.id;
    this.getGoodsInfo();
  }
};
</script>
<style lang="stylus" scoped>

.goods-detail {
  background:#fff;
  
}
.cube-page {
  .header {
    display:none;
  }
}
.indexDetail {
    padding-bottom: 50px;

    .back {
        position: fixed;
        left: 0.5rem;
        top: 0.5rem;
    }

    .detailImg {
        width: 100%;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .infoWrapper {
        padding: 0.5rem;

        .title {
            font-size: 1rem;
            font-weight: 700;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 2px;
        }

        .sales {
            margin-top: 0.5rem;
            color: #666;
            font-size: 0.7rem;
        }

        .priceStepper {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .price {
                color: red;
                font-size: 0.8rem;
                margin-top: 0.5rem;
            }

            .stepper {
                display: flex;
                align-items: center;
            }
        }

        .detail {
            margin-top: 0.5rem;
            color: #666;
            font-size: 12px;
            line-height: 14px;
            letter-spacing: 2px;
        }
    }

    .comment {
        padding: 0.5rem;

        .row {
            display: flex;

            .left {
                font-size: 0.9rem;
            }
        }

        .commentType {
            margin-top: 0.5rem;
            display: flex;

            span {
                margin-right: 0.5rem;
                font-size: 0.6rem;
                padding: 8px 12px;
                line-height: 16px;
                color: #666;
            }

            span.active {
                background-color: #3385ff;
                color: #fff;
            }
        }
    }

    .shopBarWrapper {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 50px;
      z-index: 111;
      .shopCar {
          height: 100%;

          .content {
            display: flex;
            background: #fff;
            font-size: 0;
            color: #999;
            height: 100%;

            .content-left {
              flex: 1;
              display: flex;

              .logo-wrapper {
                display: inline-block;
                vertical-align: top;
                position: relative;
                margin: 0 12px;
                padding: 6px;
                width: 56px;
                box-sizing: border-box;
                border-radius: 50%;

                .logo {
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                  text-align: center;
                }

                .num {
                  font-size: 10px;
                  line-height: 1.4;
                  position: absolute;
                  top: -2px;
                  left: 100%;
                  margin-left: -10px;
                  padding: 1px 5px;
                  color: #fff;
                  background: #FE7E00;
                  border-radius: 100px;
                }
              }

              .price {
                display: inline-block;
                vertical-align: top;
                margin-top: 12px;
                line-height: 24px;
                padding-right: 12px;
                box-sizing: border-box;
                border-right: 1px solid rgba(255, 255, 255, 0.1);
                font-size: 16px;
              }

              .desc {
                display: inline-block;
                vertical-align: top;
                margin-top: 12px;
                line-height: 24px;
                font-size: 10px;
                color: #FE7E00;
                font-size: 16px;
              }
            }

            .content-right {
              width: 105px;
              display: flex;
              align-items: center;
              justify-content: center;

              .pay {
                text-align: center;
                font-weight: 700;
                font-size: 12px;
                background: #FE7E00;
                color: #fff;
                padding: 10px 20px;
                border-radius: 20px;
              }
            }
          }
        }

    }
    .show.fb_box {
        top: 0;
    }

    .fb_box {
        position: fixed;
        top: 100%;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 9999;
        background-color: rgba(0, 0, 0, 0.7);
    }

    .show.fb_box .fb_layer {
        position: absolute;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }

    .fb_box .fb_layer {
        position: absolute;
        -webkit-transform: translate3d(0, 495px, 0);
        transform: translate3d(0, 495px, 0);
        -webkit-transition: -webkit-transform 0.2s cubic-bezier(0, 0, 0.25, 1);
        transition: -webkit-transform 0.2s cubic-bezier(0, 0, 0.25, 1);
        transition: transform 0.2s cubic-bezier(0, 0, 0.25, 1);
        transition: transform 0.2s cubic-bezier(0, 0, 0.25, 1), -webkit-transform 0.2s cubic-bezier(0, 0, 0.25, 1);
        bottom: 0;
        bottom: constant(safe-area-inset-bottom);
        bottom: env(safe-area-inset-bottom);
        width: 100%;
        background-color: #fff;
    }

    .fb_layer_con {
        box-sizing: border-box;
    }
   

    .fb_layer_con {
        overflow: auto;
        -webkit-overflow-scrolling: touch;

        .header {
            display: flex;

            .header-img {
                width: 6rem;
                height: 6rem;
            }

            .header-info {
                padding-top: 0.5rem;
                padding-left: 0.5rem;

                h4 {
                    padding-top: 0.3rem;
                    font-size: 0.9rem;
                    color: #333;
                    font-weight: 700;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-bottom: 0.5rem;
                }

                p {
                    color: #666;
                    font-size: 0.6rem;
                    margin-bottom: 1rem;
                }

                div {
                    color: #f00;
                }
            }
        }

        .body {
            margin-bottom:60px;
            p {
                padding: 1rem 0;
            }

            .wrapper {
                display: flex;
                flex-wrap: wrap;

                a {
                    color: #333;
                    background-color: #f5f5f5;
                    padding: 0.5rem 0rem;
                    width: 31%;
                    text-align: center;
                    margin-right: 2.3%;
                    margin-bottom: 0.5rem;
                    border-radius: 0.3rem;

                    &.act {
                        color: #fe7e00;
                        background-color: #f4ede9;
                    }
                }
            }
        }

        .footer {
          display: flex;
        }

        .footer .total {
          display: flex;
          flex-grow: 1;
          justify-content: space-between;
          align-items: center;

          .total-discount {
            font-size: 0.8rem;
            color: #999;
          }
        }
        .btn {
            display: block;
            background-color: #fe7e00;
            color: #fff;
            text-align: center;
            position: absolute;
            bottom: 1rem;
            left: 0.5rem;
            right: 0.5rem;
            padding: 0.5rem 0;
            border-radius: 0.3rem;
        }
    }
    .fb_layer_con {
      box-sizing: border-box;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      .bar {
          position: fixed;
          width: 100%;
          display: flex;
          background: #eceff1;
          justify-content: space-between;
          padding: 10px;
          box-sizing: border-box;
          z-index: 1;
          color: #666;
        }
    }
    
    .stepper {
      display: flex;
      align-items: center;
      .selectBtn {
        color: #fff;
        background: #fe7e00;
        border-radius: 1rem;
        padding: 0.3rem 0.6rem;
        font-size: 0.7rem;
      }
      .cart-decrease {
        display: inline-block;
        padding: 6px;
        opacity: 1;

        .inner {
          display: inline-block;
          line-height: 24px;
          transition: all 0.3s linear;
          transform: rotate(0);
        }

        &.move-enter-active, &.move-leave-active {
          transition: all 0.3s linear;
        }

        &.move-enter, &.move-leave-active {
          opacity: 0;
          transform: translate3d(24px, 0, 0);

          .inner {
            transform: rotate(180deg);
          }
        }
      }

      .cart-count {
        width: 16px;
        padding: 2px;
        line-height: 24px;
        overflow: hidden;
        text-align: center;
      }
    }

    .ulList {
      background-color: #fff;
      padding-top: 30px;
      .liItem {
          display: flex;
          padding: 0.5rem;
          justify-content: space-between;
          align-items: center;
        }

        .item_name {
          font-weight: 700;
          width: 60%;
        }

        .item_price {
          color: #FE7E00;
        }

        .spec {
          position: relative;
        }
    }

    

}
</style>
