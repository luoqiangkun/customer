<template>

  <cube-page type="no-header store" title="店铺">
    <div slot="content" class="main">
      <div class="store-header">
        <div class="back" @click="goBack"></div>
        <div class="top-group">
          <div class="search" @click="goSearch"></div>
          <div class="cart" @click="goCart"></div>
          <div class="order" @click="goOrder"></div>
        </div>
      </div>

      <div class="store-banner">
        <div class="image-view">
          <img :src="store.store_banner">
        </div>
        <div class="image-mask"></div>
      </div>

      <div class="store-con">
        <div class="store-logo">
          <img :src="store.store_logo" />
        </div>
        <div class="store-name">
          {{store.store_name}}
        </div>
        <div class="store-desc">
          {{store.store_name}}
        </div>
        <div class="store-activity"></div>
      </div>
      <div class="home-box">
        <cube-scroll-nav v-if="group[0]" :side="true" :data="group" :current="group[0].category_name">
          <cube-scroll-nav-panel
            v-for="(item,i) in group"
            :key="i"
            :label="item.category_name"
            :title="item.category_name"
          >
            <ul>
              <li v-for="(food,i) in item.category_goods" :key="i" class="rightLi">
                <div class="rowDiv" :itemId="food.items[0].item_id">
                  <div class="imgWrapper" @click="goDetail(food.goods_id)">
                    <img :src="food.goods_image" alt class="img" />
                  </div>
                  <div class="info" @click="goDetail(food.goods_id)">
                    <h4>{{food.goods_name}}</h4>
                    <div class="sell">
                      月售
                      <span>{{8}}</span>
                      
                    </div>

                    <div class="discount" v-if="food.activity_id && food.activity_type_id == 2">
                      <i></i>
                      {{food.activity_discount_rate}}折

                      <span v-if="food.activity_item_buylimit" style="margin-left:10px">限{{food.activity_item_buylimit}}份</span>
                      
                    </div>
                    <div class="price" v-if="food.activity_id && food.activity_type_id == 2">
                      <span>￥{{food.activity_item_price}}</span>

                      <span class="line-through">￥{{food.item_price}}</span>

                    </div>

                    <div class="price" v-else>￥{{food.item_price}}</div>
                  </div>
                  <div class="numbox">
                    <div
                      class="spec"
                      v-if="food.items.length > 1 "
                      @click.stop="showPopup(food)"
                    >
                      <a href="javascript:;" class="btn-primary__round">选规格</a>
                      <span
                        class="quantity"
                        v-if="cartMap[food.goods_id]"
                      >{{cartMap[food.goods_id].quantity}}</span>
                    </div>

                    <stepper 
                      :cartMap="cartMap" 
                      :food="food" 
                      :cart_type="cart_type"
                      :item="{item_id:food.items[0].item_id,item_price:food.items[0].item_price,}"
                      @cart-map="setCartMap"
                      v-else
                    >
                    </stepper>

                  </div>
                  

                </div>
              </li>
            </ul>
          </cube-scroll-nav-panel>
        </cube-scroll-nav>
      </div>
    
    </div>
   

    <shop-car
      :cart="cart"
       @cart-map="setCartMap"
       @deal-order="handleOrderRouter"
    >
    </shop-car>

    <spec-popup
      :cartMap="cartMap" 
      :food="food" 
      :cart_type="cart_type"
      ref="specPopup"
      @cart-map="setCartMap"
    >
    </spec-popup>


    <loading v-show="loadShow"></loading>

  </cube-page>
</template>
<script>
import CubePage from '@/components/page'
import Loading from '@/components/loading'
import ShopCar from '@/components/shopCar'
import stepper from '@/components/stepper'
import specPopup from '@/components/specPopup'

import { mapGetters, mapActions } from "vuex";
import {
  storeData
} from "@/api";
export default {
  components: {
    CubePage,
    Loading,
    ShopCar,
    stepper,
    specPopup
  },
  data() {
    return {
      store_id:0,
      store: {}, //店铺
      cart: {}, //购物车
      order: {}, //订单
      category: [], //分类
      goods: [], //商品
      group: [], //商品分组 分类和分类下的商品
      goods_name: "",
      cartMap:{},
      cart_type:2,
      food : {},
      item:{
        item_id:0,
        item_price:'',
        item_quantity:0,
        item_attribute:[]
      },
      itemId: 0,
      current: 0,
      fshow: false,
      loadShow:true,
      detailShow:false,
    };
  },
  methods: {
    //这里没有分开请求 直接一次获取了所有需要的数据 store category goods cart order
    getStoreData() {
      storeData({ store_id: this.store_id }).then(res => {

        if( res.status === 200 ){

          const {  store,cart, category, goods } = res.data;

          if( store ){
            this.store = store;
          }

          if( cart ){
            this.cart = cart;
          }


          if( category ){
            this.category = category;
          }

          if( goods ){
            this.goods = goods;
          }

          this.getGroupData();

          this.initCartMap();

          this.loadShow = false;
        } else {
          this.toast = this.$createToast({
            txt: '数据有误',
            type: 'txt'
          })
          this.toast.show()
        }
        
      });
    },
    getGroupData() {
      let group = [];
      let cart_id;
      for (let m in this.category) {
        group.push({
          category_id: this.category[m].category_id,
          category_name: this.category[m].category_name,
          category_goods: []
        });

        for (let n in this.goods) {
          if (this.goods[n].category_id === group[m].category_id) {
            group[m].category_goods.push(this.goods[n]);
          }
        }
      }
      this.group = group;
    },
    initCartMap(){
      let cartMap = {};
      if( this.cart ){
        for( let m in this.cart.items ){
          if( !cartMap[this.cart.items[m].goods_id] ){
            cartMap[this.cart.items[m].goods_id] = {
              id : this.cart.items[m].goods_id,
              name : this.cart.items[m].goods_name,
              quantity :0,
              items:{}
            }
          }
        
          cartMap[this.cart.items[m].goods_id].items[this.cart.items[m].item_id] = this.cart.items[m]
          cartMap[this.cart.items[m].goods_id].quantity += this.cart.items[m].item_quantity
        }
      }
      this.cartMap = cartMap;
    },
    setCartMap( cart ){
      this.cart = cart;
      this.initCartMap();
    },
    showPopup( food ){
      this.food = food;
      this.$refs.specPopup.showPopup('specPopup');
      this.$refs.specPopup.handleSelectSpec(food);
    },
    goSearch() {
      this.$router.push(`/storeSearch/${this.store_id}`)
    },
    goDetail( goods_id ){
      this.$router.push(`/storeGoods/${goods_id}`)
    },
    goCart(){
      this.$router.push(`/cart`)
    },
    goOrder(){
      this.$router.push(`/orderLists`)
    },
    goBack(){
      this.$router.go(-1);
    },
    handleOrderRouter(){
      if (this.cart && this.cart.items.length > 0) {
        let cart_id = [];
        for (let i in this.cart.items) {
          cart_id.push(this.cart.items[i].cart_id);
        }

        this.$router.push(`/storeDeal/${cart_id}`);

      } else {
        this.toast = this.$createToast({
            txt: '请选择商品',
            type: 'txt'
          })
        this.toast.show()
      }
    }
  },
  created() {
    this.store_id = this.$route.params.store_id;
    this.getStoreData();
  },
 
};
</script>
<style lang="stylus">
.store {
  height: 100%;
  background:#fff;
  .store-header {
    width:100%;
    height:42px;
    position: absolute;
    display:flex;
    background:transparent;
    border-bottom:0;
    align-items: center;
    justify-content: space-between;
    z-index:99;
    .back {
      width:22px;
      height:22px;
      background:url('../../assets/images/back2.png');
      background-report:no-report;
      background-position:50% 50%;
      background-size:100%;
    }
    .top-group {
      display:flex;
      align-items: center;
      justify-content: space-between;
      .search {
        width:22px;
        height:22px;
        background:url('../../assets/images/search2.png');
        background-report:no-report;
        background-position:50% 50%;
        background-size:100%;
        margin-right:.5rem;
      }
      .cart {
        width:22px;
        height:22px;
        background:url('../../assets/images/cart.png');
        background-report:no-report;
        background-position:50% 50%;
        background-size:100%;
        margin-right:.5rem;
      }
      .share {
        width:22px;
        height:22px;
        background:url('../../assets/images/share.png');
        background-report:no-report;
        background-position:50% 50%;
        background-size:100%;
        margin-right:.5rem;
      }
      .order {
        width:22px;
        height:22px;
        background:url('../../assets/images/orderwhite.png');
        background-report:no-report;
        background-position:50% 50%;
        background-size:100%;
        margin-right:.5rem;
      }
    }
  }
  .store-banner {
    width:100%;
    overflow:hidden;
    background: rgba(0,0,0,.55);
    position: relative;
    height:120px;
    overflow:hidden;
    .image-view {
      img {
        width:100%;
      } 
    }
    .image-mask {
      position: absolute;
      left:0;
      right:0;
      top:0;
      bottom:0;
      background: rgba(0,0,0,.2);
    }
  }
  .store-con {
    width:90%;
    margin:-60px auto;
    position:relative;
    border-radius: 10px;
    background:#fff;
    height:75px;
    box-shadow: 0 5px 10px #eee;
    padding: 15px;
    box-sizing: border-box;
    .store-logo{
      position:absolute;
      top:-20px;
      right:15px;
      width:65px;
      height:65px;
      img {
        width:100%;
        border-radius:5px;
      }
    }
    .store-name{
      font-size:20px;
      font-weight:bold;
      margin-bottom: 15px;
      margin-left: 15px;
    }
    .store-desc{
      font-size:12px;
      color:#b5b5b5;
      margin:15px;
    }
    .store-activity{

    }
  }
  .home-box {
    position: absolute;
    top: 150px;
    left: 0;
    right: 0;
    bottom: 50px;
    background:#fff;
  }
  .rightLi .rowDiv {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0.7rem 22px;
    .numbox {
      position: absolute;
      right: 0.5rem;
      top: 2.5rem;
      .spec {
        position: relative;
        .btn-primary__round {
          color: #fff;
          background: #fe7e00;
          border-radius: 22px;
          padding: 0.3rem 0.6rem;
          font-size: 0.7rem;
        }
        .quantity {
          position: absolute;
          top: -10px;
          right: -8px;
          font-size: 12px;
          background-color: rgba(249, 50, 50, 0.859);
          color: #fff;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: block;
          display: flex;
          justify-content: center;
          align-content: center;
          text-align: center;
          line-height: 20px;
        }
      }
    }
    h4 {
      font-size: 14px;
      line-height: 1.2;
          font-weight: bold;
    }

    .imgWrapper {
      .img {
        width: 4rem;
        height: 4rem;
        border-radius: 0.3rem;
      }
    }

    .info {
      margin-left: 0.3rem;

      h4 {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 8rem;
        margin-bottom: 6px;
      }

      .sell {
        color: #b9b9b9;
        font-size: 0.7rem;
        margin-bottom: 6px;
         margin-top:10px;
      }

      .price {
        color: #fe7e00;
        font-weight:600;
        margin-top:5px;
        span {
          margin-right:10px;
        }
        .line-through {
          color:#999;
          font-size:14px;
          text-decoration: line-through;
        } 
      }
      .discount {
        color:#fe7e00;
        margin-top:5px;
        font-size:14px;
        display:flex;
        i {
          width:15px;
          height:15px;
          display:inline-block;
          background:url('../../assets/images/discount.png');
          background-size: 100%;
          background-repeat: no-repeat;
          margin-right:5px;
        }
      }
    }
  }
}

.cube-scroll-nav-bar-item {
  padding: 15px 15px !important;
}
.cube-scroll-nav-panel-title {
  padding: 15px 15px !important;
  font-size: 0.7rem;
  color: #666;
  background: #f8f8f8;
}

</style>