<template>
<div class="cartControl">
  <div class="numbox">
    <div
      class="spec"
      v-if="food.items.length > 1 "
      @click.stop="showPopup('specPopup');handleSelectSpec(food)"
    >
      <a href="javascript:;" class="btn-primary__round">选规格</a>
      <span
        class="quantity"
        v-if="cartMap[food.goods_id]"
      >{{cartMap[food.goods_id].quantity}}</span>
    </div>

    <div class="stepper" v-else>
      <template v-if="cartMap[food.goods_id]">
        <transition name="move">
          <div
            class="cart-decrease"
            @click.stop="decreaseItem(food.items[0].item_id)"
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
        <div class="cart-count">{{cartMap[food.goods_id].quantity}}</div>
      </template>

      <div @click.stop="increaseItem(food.items[0].item_id)" style="padding:6px">
        <img style="width:20px; height:20px" src="../../assets/images/add.png" alt />
      </div>
    </div>
  </div>

  <cube-popup type="center-popup" ref="specPopup" position="center" :mask-closable="true">
    <div class="card">
      <div class="card-header">{{food.goods_name}}</div>
      <div class="card-body">
        <div class="card-row">
          <p>规格</p>
          <div class="card-row__flex">
            <a
              href="javascript:;"
              :class="{'active' : form.item_id === item.item_id}"
              v-for="(item,i) in food.items"
              @click="handleSpecChange(item)"
            >{{item.spec_name}}</a>
          </div>
        </div>

        <template v-if="food.goods_attribute">
          <div class="card-row" v-for="(attribute,k) in food.goods_attribute">
            <p>{{attribute.name}}</p>
            <div class="card-row__flex">
              <a
                href="javascript:;"
                :class="{'active' : form.item_attribute[k].value === value}"
                v-for="(value) in attribute.items"
                @click="handleAttributeChange(attribute.name,value,k)"
              >{{value}}</a>
            </div>
          </div>
        </template>
      </div>
      <div class="card-footer">
        <div class="total">
          <div class="total-amount">
            总计：
            <span class="mark" style="color:red">￥{{form.item_price}}</span>
          </div>
        </div>

        <div class="numbox">
          <div class="stepper">
            <template
              v-if="cartMap[food.goods_id] && cartMap[food.goods_id].items && cartMap[food.goods_id].items[form.item_id] "
            >
              <transition name="move">
                <div
                  class="cart-decrease"
                  @click.stop="decreaseItem(form.item_id)"
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
              <div class="cart-count">{{cartMap[food.goods_id].items[form.item_id].item_quantity}}</div>
            </template>

            <div @click.stop="increaseItem(form.item_id)" style="padding:6px">
              <img style="width:20px; height:20px" src="../../assets/images/add.png" alt />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="close" @click="hideSpecPopup"></div>
      
    
  </cube-popup>
</div>
  
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.cartControl {
  .numbox {
    position: absolute;
    right: 0.5rem;
    top: 2.5rem;
    .spec {
      position: relative;
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
    .stepper {
      display: flex;
      align-items: center;

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
  }

  .cube-center-popup .cube-popup-content {
    width: 90%;
    background: #fff;
    border-radius: 8px;
  }

  .cube-popup-container, .cube-popup-mask {
    bottom: 48px;
  }


  .card {
    .card-header {
      padding: 15px 20px 10px;
    }

    .card-body {
      padding: 5px 20px;
      min-height: 180px;
      .card-row {
        margin-bottom: 10px;
        p {
          color: #999;
          font-size: 12px;
          line-height: 2rem;
        }
        .card-row__flex {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          a {
            width: 30%;
            display: inline-block;
            text-align: center;
            padding: 0.5rem 0;
            border: 1px solid #efefef;
            border-radius: 0.25rem;
            box-sizing: border-box;
            margin: 0.25rem 0;
            font-size: 14px;
            color: #333;
          }
          a:after {
            content: '';
            width: 30%;
            border: 1px solid transparent;
          }

          a.active {
            color: #fe7e00;
            background: #fbf1df;
            border: 1px solid #fe7e00;
          }
        }
      }
    }

    .card-footer {
      padding: 10px 20px 15px;
      display: flex;
      .total {
        display: flex;
        flex-grow: 1;
        justify-content: space-between;
        align-items: center;

        .total-discount {
          font-size: 0.8rem;
          color: #999;
          .mark {
            font-size: 22px;
            color: #f93232db;
            font-weight: 600;
          }
        }
      }
      button {
        color: #fff;
        background: #fe7e00;
        border: 0;
        padding: 0.25rem 0.8rem;
        border-radius: 22px;
      }
    }
  }

  .close {
    width: 30px;
    height: 30px;
    position: absolute;
    left: 50%;
    margin-left: -15px;
    margin-top: 20px;
    border: 1px solid #fff;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.2);
    img {
      width: 60%;
      padding: 20%;
    }
  }
}
</style>
