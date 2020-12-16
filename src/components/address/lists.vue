<template>
  <cube-page type="address-lists" title="收货地址">
    <template slot="header">
      <h1>收货地址</h1>
      <i @click="back" class="cubeic-back"></i>
      <div class="action">
        <span @click="addAddress">添加地址</span>
      </div>
    </template>
   
    <div slot="content" class="lists">
      <ul class="ul-lists">
        <li class="ul-item" v-for="(item,index) in lists.items" @click="callback(item)">
          <div class="title">{{item.district_info + item.ud_address}}</div>
          <div class="patch">
            <span>{{item.ud_name}}</span>
            <span>{{item.ud_mobile}}</span>
          </div>

          <div class="action">
            <i class="cubeic-edit" @click.stop="editAddress(item)"></i>
          </div>
        </li>
      </ul>
    </div>

    <address-manage 
      v-show="manageShow"
      @manage-back="manageBack" 
      @manage-confirm="manageConfirm" 
      :title="title" 
      :address="address" 
      :btnText="btnText">
    </address-manage>

  </cube-page>
  
</template>


<script type="text/ecmascript-6">
  import CubePage from '@/components/page'
  import AddressManage from '@/components/address/manage'

  import { addressLists } from "@/api"

  export default {
    name:'AddressLists',
    components: {
      CubePage,
      AddressManage
    },
    data(){
      return {
        lists:{},
        address:{
          ud_name:'',
          ud_mobile:'',
          ud_address:'',
          ud_county_id:'',
          ud_city_id:'',
          ud_province_id:'',
          ud_province:'',
          ud_city:'',
          ud_county:'',
          ud_id:''
        },
        title:'新增地址',
        btnText:'保存地址并使用',
        manageShow:false
      }
    },
    methods: {
      getLists(){
        addressLists().then( res => {
          this.lists = res.data;
          let item = {};
          if( this.lists.items ){
            item = this.lists.items[0];
          }
          this.callback(item);
        })
      },
      back(){
        this.$emit('address-back');
      },
      goTo(subPath) {
        this.$router.push('/drawer/' + subPath)
      },
      callback( item ){
        this.$emit('address-callback',item);
      },
      addAddress(){
        this.address = {
          ud_name:'',
          ud_mobile:'',
          ud_address:'',
          ud_county_id:'',
          ud_city_id:'',
          ud_province_id:'',
          ud_province:'',
          ud_city:'',
          ud_county:'',
          ud_id:''
        }
        this.manageShow = true;
      },
      editAddress(data){
        this.address = data;
        this.manageShow = true;
      },
      manageBack(){
        this.manageShow = false;
      },
      manageConfirm(data){
        this.manageShow = false;
        this.address = data;

        let index = -1;
        for( let i in this.lists.items ){
          if( data.ud_id == this.lists.items[i].ud_id ){
            index = i;
          }
        }
        data.district_info = data.ud_province + data.ud_city + data.ud_county

        if( index == -1 ){
          this.lists.items.push( data );
        }else{
          this.lists.items[index] = Object.assign(this.lists.items[index], data);
        }
        this.callback( data );
      }
    },
    created(){
      this.getLists();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.address-lists
  background: #fafafa;
  .action 
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 15px;
    color: #fc9153;

  .ul-lists
    margin-top:10px;
    .ul-item 
      position: relative;
      padding:15px;
      background:#fff;
      margin-bottom: 10px;
      .title
        font-weight:600;
        font-size: 1rem;
        line-height: 2rem;
      .patch 
        color:#999;
        font-size: .8rem;
        line-height:1.5rem;
      .action 
        top:50%;
        transform: translate(0%, -50%);
</style>
