<template>
  <div style="height:100%" v-show="queueData.queue_status">
      <div class="box_bj" v-if="queueData.queue_status == 1 ">
        <h1>预约排队</h1>
         <div class="container">
              <h2>排队序号</h2>
              <h3>{{queueData.queue_number}}</h3>
              <h4>前方等待人数<span>{{queueData.queue_num}}</span></h4>
              <div class="con_item">
                    <img :src="queueData.store_logo" alt />
                    <p>{{queueData.store_name}}</p>
                    <h4 @click="handleCancle">取消排队</h4>
               </div>
          </div>
          <div class="con_bom">
                    <div>温馨提示</div>
          
                    <p> 请尽快前往餐厅，过号需要重新取号呦！</p>
                 
            </div>
      </div>

      <div class="box-wrong" v-else >
        <div class="wrapper">
          <h2>当前号码已失效，请重新扫码点餐</h2>
          <img src="../../assets/images/wrong.png" style="margin-top:30px"/>
        </div>
      </div>
  </div>
</template>
<script>
import { queueInfo,queueEdit } from "@/api";

export default {
  name: "queue",
  data() {
    return {
      queue_id:0,
      queueData:{}
    }
  },
  methods: {
    getQueueInfo(){
      queueInfo({queue_id:this.queue_id}).then( res => {
        this.queueData = res.data;
      })
    },
    handleCancle(){
      this.$createDialog({
        type: 'confirm',
        title: '提示',
        content: '确定要取消排队吗',
        confirmBtn: {
          text: '确定',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '取消',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        onConfirm: () => {
          queueEdit({queue_id:this.queue_id,queue_status:4}).then( res => {
            if( res.status === 200 ){
              this.queueData.queue_status = res.data.queue_status;
            }else{
              this.toast = this.$createToast({
                  txt: '操作失败',
                  type: 'txt'
                })
              this.toast.show()
            }
            
          })
        }
      }).show()
    }
  },
  created(){
    this.queue_id = this.$route.params.id;
    this.getQueueInfo();
  }
};
</script>
<style  scoped>
  .box_bj{
    width:100%;
    height:25rem;
    background: linear-gradient(90deg,#ffffff47,#fe7e00);
    background: -webkit-linear-gradient(90deg,#ffffff47,#fe7e00);
  }
  .box_bj h1{
    padding: 1rem;
    font-size: 1rem;
    color:white;
    text-align: center;
  }
  .container{
    width:90%;
    margin:1rem  auto;
    height:18rem;
    border-radius:10px;
    background:white;
  }
  .container h2{
    font-size:.8rem;
    padding:1rem;
    font-weight:bold;

  }
  .container h3{
    font-size:3rem;
    text-align:center;
    color:#fe7e00;
    font-weight:bold;
    margin:1rem auto;
  }
  .container h4{
    font-size:.8rem;
    padding:1rem 1rem 1rem 0;
    float:right;
    color:#717171;
  }
  .container h4 span{
    font-size:1rem;
    color:#fe7e00;
    font-weight:bold;
  }
  .con_item{
    margin:1rem;
    border-top:1px solid #eee;
    margin-top:3.5rem;
    text-align:center;
    padding-top:1rem;
  }
  .con_item img{
    width:3rem;
    height:3rem;
    border-radius:50%;
  }
  .con_item p{
    font-size:.8rem;
    margin:.5rem auto;
    font-weight:bold;
  }
  .con_item h4{
    font-size:.8rem;
    padding:0 0 1rem 0;
    float:right;
    color:#fe7e00;
    text-decoration: underline;
  }
  .con_bom{
    margin:0 2rem;
  }
  .con_bom div{
    font-size:.8rem;
    color:#717171;
    line-height:2rem;
  }
  .con_bom p{
    font-size:.75rem;
    color:#717171;
    line-height:1.2rem;

  }
  .box-wrong {
    width:100%;
    height:100%;
    background:url('../../assets/images/bg.png');
    background-size: 100%;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .box-wrong .wrapper {
    text-align: center;
  }
</style>

