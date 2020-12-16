<template>
  <cube-page type="return-manage" title="申请退款">
  	<template slot="header">
      <h1>申请退款</h1>
      <i @click="goBack" class="cubeic-back"></i>
      
    </template>
    <div slot="content" class="wrapper">
    	<div class="contain">
        <form class="form-wrapper">
          <div class="form-item">
            <div class="form-label">退款原因</div>
            <div class="form-field">
              <cube-select
                v-model="form.return_reason_id"
                :options="selectoOptions"
                placeholder="请选择退款原因"
                >
              </cube-select>
            </div>

            <div class="form-field">
              <textarea v-model="form.return_buyer_message" placeholder="请描述退款原因" style="font-size:14px"></textarea>
            </div>

            <div class="form-field">
              <cube-upload
                :action="action"
                :simultaneous-uploads="1"
                @files-added="filesAdded" />

            </div>

          </div>

          <div class="form-item">
            <div class="form-label">选择退款来源</div>
            <div class="form-field">
              <cube-radio-group :options="radioOptions" position="right"/>
            </div>
          </div>

          <div class="form-item">
            <div class="form-label">选择退款商品</div>
            <div class="form-field">
              <cube-checkbox-group v-model="form.order_item_id" @input="handleInput">
                <cube-checkbox :option="{value: item.order_item_id, disabled: false}"  v-for="(item,index) in orderData.items">
                  <div class="box" >
                    <div class="image">
                      <img :src="item.item_image" />
                    </div>
                    <dl class="info">
                      <dt>{{item.item_name}}</dt>
                      <dd>{{item.item_spec}}</dd>
                      <dd>x{{item.order_item_quantity}}</dd>
                    </dl>
                  </div>
                </cube-checkbox>
                
              </cube-checkbox-group>

            </div>
          </div>

        </form>
      </div>
      <div class="footer">
        <div class="left">退款金额：{{this.returnData.return_refund_amount ? this.returnData.return_refund_amount : ''}}￥</div>
        <div class="right" @click="handleSubmit">提交</div>
      </div>
    </div>
   
  </cube-page>
</template>


<script type="text/ecmascript-6">
  import {SYSURL} from '@/http/url'
  import { returnAdd, returnReason, orderDetail,returnData  } from "@/api"
	import CubePage from '@/components/page'
  export default {
   	components: {
      CubePage
    },
    data () {
      return {
        orderData:{},
        returnData:{},
        form:{
          order_id:'',
          return_reason_id:'',
          return_buyer_message:'',
          return_image:[],
          order_item_id:[]
        },
        action:{
          target:SYSURL.upload,
          fileName:'upfile',
          checkSuccess:( res, file ) => {
            console.log( res );
            if( res.status === 200 ){
              this.form.return_image.push( res.data.url )
            } else {
               this.toast = this.$createToast({
                txt: '文件上传失败',
                type: 'txt'
              })
              this.toast.show()
            }
            
          }
        },
        selectoOptions: [],
        radioOptions: ['退至用户余额'],
        return_refund_amount:'',
        uploadUrl:SYSURL.upload
      }
    },
    methods: {
      getOrderInfo( order_id ){
        orderDetail({order_id:order_id}).then( res => {
          if( res.status === 200 ){
            this.orderData = res.data;
            this.form.order_id = res.data.order_id;
          }
        })
      },
      getReturnReason(){
        returnReason().then( res => {
          if( res.status === 200 ){
            const options = [];
            for( let i in res.data ){
              options.push({value:res.data[i].return_reason_id,text:res.data[i].return_reason_name})
            }
            this.selectoOptions = options;
            this.form.return_reason_id = options[0].return_reason_id;
          }
          

        })
      },
      getReturnData(){
        returnData({order_id:this.orderData.order_id,order_item_id:this.form.order_item_id}).then( res => {
          if( res.status === 200 ){
            this.returnData = res.data;
          } else {
            this.toast = this.$createToast({
              txt: '数据有误',
              type: 'txt'
            })
            this.toast.show()
          }
        })
      },

      filesAdded(files) {
        console.log( files );
      },
      handleInput(){
        if( this.form.order_item_id.length === 0 ){
          this.returnData.return_refund_amount = 0;
          return
        }

        this.getReturnData();
      },
      handleSubmit(){

        if( this.form.order_item_id.length === 0 ){
          this.toast = this.$createToast({
            txt: '请选择退款商品',
            type: 'txt'
          })
          this.toast.show()
          return
        }

        returnAdd(this.form).then( res => {
          if( res.status === 200 ){
            this.$router.push(`/returnDetail/${res.data.return_id}`)
          } else {
            this.toast = this.$createToast({
              txt: '数据有误',
              type: 'txt'
            })
            this.toast.show()
          }
        })
      },
      goBack() {
	      this.$router.go(-1);
	    }
    },
    created(){
      if (this.$route.params.id) {
        this.getOrderInfo(this.$route.params.id);
      }
      this.getReturnReason();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.return-manage {
  background:#fff !important;
  .contain {
    margin-bottom: 4rem;
  }
  .form-wrapper {
    .form-item {
      .form-label {
        font-size: 1rem;
        color: #999;
        background-color: #f3f4f5;
        padding:10px;
      }
      .form-field {
        margin:10px;
        .border-top-1px:before {
          border-top:0;
        }
        .cube-select:after {
          border:0;
          border-bottom: 1px solid #ccc;
        }
        textarea {
          box-sizing: border-box;
          padding: 10px 20px 10px 10px;
          width: 100%;
          border: 0;
          height: 40px;
        }
      }
    }
    .box {
      display:flex;
      .image {
        width:4rem;
        height:4rem;
        img {
          width:100%;
        }
      }
      dl {
        dt {
          font-size: .9rem;
        }
        dd {
          font-size: .8rem;
          color:#999;
        }
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3rem;
    line-height:3rem;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      background: #555353;
      width:70%;
      color:#fff;
      padding-left:10px;

    }
    .right {
      background: #fe7e00;
      width:30%;
      text-align:center;

    }
  }
}	  
</style>
