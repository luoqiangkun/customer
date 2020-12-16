<template>
  <cube-page type="order-detail" title="退款详情">
    <template slot="header">
      <h1>退款详情</h1>
      <i @click="goBack" class="cubeic-back"></i>
    </template>

    <div slot="content" class="wrapper">
      <div class="contain">

        <div class="card">
          <div class="card-body">
            <div class="card-cell" style="flex-wrap:wrap">
              <h3 v-if="returnData.return_state_id === 1">退款申请中，等待商家确认</h3>
              <h3 v-else-if="returnData.return_state_id === 2">退单已确认，等待商家退款</h3>
              <h3 v-else-if="returnData.return_state_id === 3">商家已退款，请确认收款</h3>
              <h3 v-else-if="returnData.return_state_id === 4">退款已完成</h3>
              <h3 v-else-if="returnData.return_state_id === 5">商家拒绝退款
                <p>{{returnData.return_store_message}}</p>
              </h3>
              <h3 v-else-if="returnData.return_state_id === 6">退单已取消</h3>

              <div class="btn-group"  v-if="returnData.return_state_id === 1 || returnData.return_state_id === 5">
                <a href="javascript:;" class="btn" @click="handleReturnCancel">取消退单</a>
              </div>
            </div> 

            <div class="card-cell">
              <div class="card-cell__left">退款金额</div>
              <div class="card-cell__right">￥{{returnData.return_refund_amount}}</div>
            </div>

            <div class="card-cell">
              <div class="card-cell__left">退款账户</div>
              <div class="card-cell__right">支付账户</div>
            </div>


          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="card-cell"><h3>退款流程</h3></div>

            <div class="card-cell">
              <ul class="timeline">
                <li class="timeline-item" :class="returnData.return_state_id == item.status ? 'active' : ''" v-for="(item,index) in returnData.return_timeline">
                  <div class="timeline-item__tail"></div>
                  <div class="timeline-item__node"></div>
                  <div class="timeline-item__wrapper">
                    <div class="timeline-item__content">
                        {{item.content}}
                    </div>
                    <div class="timeline-item__timestamp">
                        {{item.time}}
                    </div>
                  </div>
                </li>
              </ul>
            </div>

          
          </div>
        </div>

         <div class="card">
          <div class="card-body">
            <div class="card-cell"><h3>退款信息</h3></div>

            <div class="card-cell no-border" v-for="(item,i) in returnData.items">
              <div class="card-cell__left">
                <div class="card-cell__thumb">
                  <img :src="item.item_image" style="object-fit: contain;" />
                </div>

                <div class="card-cell__info">
                  <dl>
                    <dt>{{item.item_name}}</dt>
                    <dd>x{{item.return_item_num}}</dd>
                  </dl>
                </div>
              </div>
              <div class="card-cell__right">
                <span class="price">￥{{item.item_price}}</span>
              </div>
                
            </div>
            
            <div class="card-cell">
              <div class="card-cell__left">退款原因</div>
              <div class="card-cell__right">{{returnData.return_reason + ' ' + returnData.return_buyer_message}}</div>
            </div>

            <div class="card-cell">
              <div class="card-cell__left">订单号</div>
              <div class="card-cell__right">{{returnData.order_id}}</div>
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
import { returnDetail,returnCancel,modifyReturnState } from "@/api";
export default {
  components: {
    CubePage,
    Loading
  },
  data() {
    return {
      returnData:{},
      loadShow:true
    };
  },
  methods: {
    getreturnData( return_id ){
      returnDetail({return_id:return_id}).then( res => {
        if( res.status === 200 ){
          this.returnData = res.data;
          this.loadShow = false;
        }
      })
    },
    handleReturnCancel(){
      this.$createDialog({
        type: 'confirm',
        title: '确认要取消退单吗？',
        onConfirm: () => {
          modifyReturnState({return_id:this.returnData.return_id,return_state_id:6}).then( res => {
            if( res.status === 200 ){
              this.returnData.return_state_id = res.data.return_state_id;
            } else {
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
    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
    if (this.$route.params.id) {
      this.getreturnData(this.$route.params.id);
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
  padding: 8px 16px;
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
      h3 {
      font-weight:600;
      }
      .btn-group {
        width:100%;
        margin-top:20px;
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

.timeline {
  
  .timeline-item {
    position: relative;
    padding-bottom: 20px;
    .timeline-item__tail {
      position: absolute;
      left: 4px;
      height: 100%;
      border-left: 2px solid #e4e7ed;
    }
    .timeline-item__node {
      width: 12px;
      height: 12px;
      position: absolute;
      background-color: #e4e7ed;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .timeline-item__wrapper {
      position: relative;
      padding-left: 28px;
      top: -3px;
      .timeline-item__content {
        padding: 0px 0 10px;
      }
      .timeline-item__timestamp {
        color:#999;
        font-size:.8rem;
      }
    }
  }
  .timeline-item.active {
    .timeline-item__node {
      background:#fc9153;
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
