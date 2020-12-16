<template>
  <cube-page type="order-lists" title="订单">
  	<template slot="header">
      <i @click="goBack" class="cubeic-back"></i>
      
    </template>
    <div slot="content" class="wrapper" style="position: relative;">

      <div class="search-bar">
        <i class="cubeic-search"></i>
      </div>

      <cube-tab-bar v-model="selectedLabel" @click="handleChange" show-slider style="width:130px;">
        <cube-tab label="订单"  key="order" ></cube-tab>
        <cube-tab label="退款"  key="return"></cube-tab>
      </cube-tab-bar>

      <cube-tab-panels v-model="selectedLabel">
        <cube-tab-panel label="订单" key="order">
          <cube-scroll :data="data.items" 
            ref="scroll"
            :options="options"
            class="scroll-list-wrap"
            @pulling-up="onPullingUp"
            :style="{height:scrollHeight + 'px'}"
            >
            <ul class="list-wrapper">
              <li v-for="(item, index) in data.items" class="list-item" :key="index">
                <div class="box" @click="goDetail(item.order_id)">
                  <div class="box-header">
                    <div class="image" @click.stop="goStore(item.store_id)">
                      <img :src="item.store_logo" />
                    </div>
                    <div class="title" @click.stop="goStore(item.store_id)">
                      <h3>{{item.store_name}}</h3>
                      <span class="time">{{item.order_time}}</span>
                    </div>
                    <div class="status" v-if="item.return && (item.return.return_state_id === 1 || item.return.return_state_id === 2 || item.return.return_state_id === 3)">
                      退款中
                    </div>
                    <div class="status" v-else-if="item.return && item.return.return_state_id === 4">
                      退款完成
                    </div>

                    <div class="status" v-else>{{item.order_status_name}}</div>
                  </div>
                  <div class="box-content" v-if="item.items.length == 1 ">
                    <div class="image">
                      <img :src="item.items[0].item_image" style="width:100%"/>
                    </div>
                    <div class="name">{{fixOrderItemsTitle(item.items)}}</div>
                   <div class="price">{{item.order_payment_amount}}￥</div>

                  </div>
                  <div class="box-wrap" v-else>
                    <cube-scroll
                      ref="scroll"
                      :data="item.items"
                      direction="horizontal"
                      class="horizontal-scroll-list-wrap">
                      <ul class="list-wrapper">
                        <li v-for="row in item.items" class="list-item">
                          <div class="image">
                            <img :src="row.item_image" />
                          </div>
                          <div class="name">{{row.item_name}}</div>
                        </li>
                      </ul>
                    </cube-scroll>
                    <div class="aside-wrapper">
                      <div class="aside-content">
                        <div class="price">{{item.order_payment_amount}}￥</div>
                        <div class="count">共{{item.items.length}}件</div>
                      </div>
                    </div>
                    
                  </div>

                  <div class="box-footer">
                    <a href="javascript:;" class="btn" v-if="item.order_status === 1" @click.stop="handleOrderModifyStatus(item,index)">取消订单</a>

                    <a href="javascript:;" class="btn" v-if="item.order_status === 1" @click.stop="goPay(item)">立即支付</a>

                    <a href="javascript:;" class="btn" v-if="item.order_status === 4" @click.stop='handleOrderConfirm(item,index)'>确认收货</a>
                    
                  </div>
                </div>
              </li>
            </ul>
          </cube-scroll>
          
        </cube-tab-panel>
        <cube-tab-panel label="退款" key="return">
          <cube-scroll :data="data.items" 
            ref="scroll"
            :options="options"
            class="scroll-list-wrap"
            @pulling-up="onPullingUp"
            :style="{height:scrollHeight + 'px'}"
            >
            <ul class="list-wrapper" >
              <li v-for="(item, index) in data.items" class="list-item" :key="index">
                <div class="box" @click="goDetail(item.order_id)">
                  <div class="box-header">
                    <div class="image" @click.stop="goStore(item.store_id)">
                      <img :src="item.store_logo" />
                    </div>
                    <div class="title" @click.stop="goStore(item.store_id)">
                      <h3>{{item.store_name}}</h3>
                      <span class="time">{{item.order_time}}</span>
                    </div>
                    <div class="status" v-if="item.return && (item.return.return_state_id === 1 || item.return.return_state_id === 2 || item.return.return_state_id === 3)">
                      退款中
                    </div>
                    <div class="status" v-else>{{item.order_status_name}}</div>
                  </div>
                  <div class="box-content" v-if="item.items.length == 1 ">
                    <div class="image">
                      <img :src="item.items[0].item_image" style="width:100%"/>
                    </div>
                    <div class="name">{{fixOrderItemsTitle(item.items)}}</div>
                   <div class="price">{{item.order_payment_amount}}￥</div>

                  </div>
                  <div class="box-wrap" v-else>
                    <cube-scroll
                      ref="scroll"
                      :data="item.items"
                      direction="horizontal"
                      class="horizontal-scroll-list-wrap">
                      <ul class="list-wrapper">
                        <li v-for="row in item.items" class="list-item">
                          <div class="image">
                            <img :src="row.item_image" />
                          </div>
                          <div class="name">{{row.item_name}}</div>
                        </li>
                      </ul>
                    </cube-scroll>
                    <div class="aside-wrapper">
                      <div class="aside-content">
                        <div class="price">{{item.order_payment_amount}}￥</div>
                        <div class="count">共{{item.items.length}}件</div>
                      </div>
                    </div>
                    
                  </div>
                  <div class="box-footer">                   
                    <a href="javascript:;" class="btn" @click.stop="goReturn(item.return.return_id)">退单详情</a>                    
                  </div>
                </div>
              </li>
            </ul>
           
          </cube-scroll>
          
        </cube-tab-panel>
      </cube-tab-panels>

    	
    </div>
   <loading v-show="loadShow"></loading>
  </cube-page>
</template>


<script type="text/ecmascript-6">
	import CubePage from '@/components/page'
  import noResults from '@/components/noResults'
  import Loading from '@/components/loading'
  import { orderLists,orderModifyStatus } from '@/api'

   export default {
   	components: {
      CubePage,
      noResults,
      Loading
    },
    data () {
      return {
        keyword:'',
        selectedLabel: '订单',
        options: {
          pullDownRefresh: false,
          pullUpLoad: true
        },
        secondStop:26,
        scrollHeight:'',
        data: {
          page: 1,
          records: 0,
          total: 0,
          more:true,
          items: []
        },
        returnData:{
          page: 1,
          records: 0,
          total: 0,
          more:true,
          items: []
        },
        loadShow:true
      }
    },
    methods: {
      getOrderLists( data ){
        if( !this.data.more ){
          return;
        }
        let params = {
          rows: 5,
          page: this.data.page,
          order_type: 2
        };
        Object.assign(params, data);
      	orderLists(params).then( res =>{
          this.loadShow = false;
          
      		let data = res.data;

          this.data.page = data.page;
          this.data.records = data.records;
          this.data.total = data.total;
          if( this.data.total == this.data.page || this.data.total == 0 ){
            this.data.more = false;
          }
          if( data.page === 1 ){
            this.data.items = data.items;
          } else {
            this.data.items.push.apply(this.data.items,data.items);
          }
          this.data.page++;
          
      	})
      },
      fixOrderItemsTitle( items ){
      	let titles = [];
      	for( let i in items ){
      		titles.push( items[i].item_name );
      	}
      	return titles.join('&');
      },
      handleOrderModifyStatus(item,index){
        this.$createDialog({
          type: 'confirm',
          title: '确认要取消订单吗？',
          onConfirm: () => {
            orderModifyStatus({order_id:item.order_id,order_status:6}).then( res => {
              if( res.status === 200 ){
                this.data.items[index].order_status = res.data.order_status;
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
      handleOrderConfirm(item,index){
        this.$createDialog({
          type: 'confirm',
          title: '确认已收到货了吗？',
          onConfirm: () => {
            orderModifyStatus({order_id:item.order_id,order_status:5}).then( res => {
              if( res.status === 200 ){
                this.data.items[index].order_status = res.data.order_status;
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
      handleChange(item){
        this.data = {
          page: 1,
          records: 0,
          total: 0,
          more:true,
          items: []
        }
        this.options.pullUpLoad = true;
        if( item === '订单' ){
          this.getOrderLists({page:1,order_kind:''});
        } else {
          this.getOrderLists({page:1,order_kind:'return'});
        }
      },  
      onPullingUp(){
        if( this.data.more ){
          this.getOrderLists();
        } else {
          this.options.pullUpLoad = false;
        }
        
      },
      goDetail(order_id){
      	this.$router.push(`/orderDetail/${order_id}`)
      },
      goReturn(return_id){
        this.$router.push(`/returnDetail/${return_id}`)
      },
      goPay(item){
        this.$router.push(`/pay/${item.order_id}/${item.order_payment_amount}`)
      },
      goStore( store_id ){
        this.$router.push(`/store/${store_id}`)
      },
      goBack() {
	    this.$router.go(-1);
	  }
    },
    created(){
      let viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
      this.scrollHeight = viewportHeight - 44;
      this.getOrderLists(); 
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.order-lists {
  .search-bar {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 18px;
    color: #999;
  }
  .cube-tab-panels {
    overflow: initial;
  }
 	background:#fff !important;
 	.header {
    background:#fff;
 		.cubeic-search {
 			position: absolute
      top: 0
      right: 0
      padding: 0 15px
      color: #fc9153
 		}
 	}
 
  .cube-tab-bar {
    background:#fff;
  }
 	.scroll-list-wrap {
    border-radius: 5px;
    transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
    position: relative;
    height: 300px;
  }

  .horizontal-scroll-list-wrap {
    width:100%;
    z-index:0;
    .cube-scroll-content {
      display: inline-block;
    }
    .list-wrapper {
      padding: 0 4rem 0 10px;
      white-space: nowrap;
    }
      
    .list-item {
      width:4.5rem;
      overflow: hidden;
      display: inline-block;
      .image {
        width:4rem;
        height:4rem;
        img {
          width:100%;
        }
      }
      .name {
        font-size:14px;
        color:#999;
        height: 25px;
        line-height: 25px;
        overflow: hidden;
      }
    }
  }

  .list-wrapper {
    .list-item {
      padding: 10px 10px 1px;
      .box {
        width:100%;
        background:#fff;
        border-radius: 5px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);;
        .box-header {
          display: flex;
            justify-content: space-between;
            padding: 10px;
            border-bottom: 1px solid #f4f5f6;
            align-items: center;
          .image {
            width:2.2rem;
            height:2.2rem;
            img {
              width:100%;
              border-radius: 50%;
            }
          }
          .title {
            margin-left:10px;
            flex-grow:1;
            h3 {
                height:1.5rem;
              line-height: 1.5rem;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                font-size:.9rem;
            }
            .time {
              color:#999;
              font-size:.8rem;
            }
          }
          .status {
            font-size:.8rem;
            color:#333;
          }
        }
        .box-content {
          padding: 15px 20px 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .image {
            width:4rem;
            height:4rem;
            img {
              width:100%;
              border-radius: 50%;
            }
          }
          .name {
            color:#666;
            font-size: .85rem;
            height:1.2rem;
            line-height: 1.2rem;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
          }
          .price {
            flex-grow: 1;
            width: 40%;
            text-align: right;
          }
        }
        .box-wrap {
          padding:10px 0;
          position: relative;
          display:flex;
          align-items: center;
          justify-content: flex-start;
        }
        .aside-wrapper {
          position: absolute;
          right: 0;
          z-index: 9999;
          background: rgba(255,255,255,.8);
          top: 0;
          bottom: 0;
          display: flex;
          flex-wrap:wrap;
          align-items: center;
          .aside-content {
            padding: 0 15px;
            text-align: right;
          }
          div {
            width:100%;
          }
          .price {
            font-size:16px;
          }
          .count {
            font-size:14px;
            color:#999;
            margin-top:5px;
          }
        }
      
        .box-footer {
          padding: 0 10px 10px;
            text-align: right;
          .btn {
            display: inline-block;
              padding: 8px 10px;
              border: 1px solid #fc9153;
              font-size: .9rem;
              color: #fc9153;
              border-radius: 5px;
          }
        }
      }
    }
   }
  
}
 
   
 	 
</style>
