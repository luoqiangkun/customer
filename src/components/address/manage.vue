<template>
  <cube-page type="address-manage" :title="title">
    <template slot="header">
      <h1>{{title}}</h1>
      <i @click="backHandle" class="cubeic-back"></i>
    </template>
   
    <div slot="content" class="main">
      <form class="form-wrapper">
      	<div class="form-item">
      		<div class="form-label">联系人：</div>
      		<div class="form-field">
      			<cube-input v-model="address.ud_name" placeholder="请填写联系人"></cube-input>
      		</div>
      	</div>

      	<div class="form-item">
      		<div class="form-label">联系电话：</div>
      		<div class="form-field">
      			<cube-input v-model="address.ud_mobile" placeholder="请填写电话"></cube-input>
      		</div>
      	</div>

      	<div class="form-item" @click="showAddressPicker">
      		<div class="form-label">收货地址：</div>
      		<div class="form-field">
      			<cube-input :value="address_text" placeholder="请选择城市" readonly ></cube-input>
      		</div>
      	</div>

      	<div class="form-item">
      		<div class="form-label">详细地址：</div>
      		<div class="form-field">
      			<cube-input v-model="address.ud_address" placeholder="请填写详细地址"></cube-input>
      		</div>
      	</div>

      </form>

      <div class="confirm-btn" @click="confirmHandle">保存地址并使用</div>
    </div>


  </cube-page>
</template>


<script type="text/ecmascript-6">
  import CubePage from '@/components/page'
  import { provinceList, cityList, areaList } from '@/data/area'
  import { addressInfo,addressSave } from "@/api"

  const asyncProvinceList = provinceList.slice()
  const asyncCityList = JSON.parse(JSON.stringify(cityList))
  const asyncAreaList = JSON.parse(JSON.stringify(areaList))

  const addressData = provinceList
  addressData.forEach(province => {
    province.children = cityList[province.value]
    province.children.forEach(city => {
      city.children = areaList[city.value]
    })
  })

  export default {
    components: {
      CubePage
    },
    props: {
      title: {
        type: String,
        default: '',
        required: true
      },
      btnText: {
        type: String,
        default: '保存地址并退出',
        required: true
      },
      address:{
        type: Object,
        default:()=>{
          return {
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
        }
      },
    },
    data(){
      return {
        hold:true,
      }
    },
    mounted() {
      this.addressPicker = this.$createCascadePicker({
        title: '城市选择',
        data: addressData,
        onSelect: this.selectHandle,
        onCancel: this.cancelHandle
      })
    },
    methods: {
      getInfo(){
      	addressInfo({ud_id:ud_id}).then( res => {
      	  if( res.status === 200 ){
      	  	this.form = res.data;
      	  } else {
      	  	this.toast = this.$createToast({
              txt: '数据有误',
              type: 'txt'
            })
            this.toast.show()
      	  }
      	})
      },
      showAddressPicker() {
        this.addressPicker.show()
      },
      selectHandle(selectedVal, selectedIndex, selectedText) {
        this.address.ud_province_id = selectedVal[0]
        this.address.ud_city_id = selectedVal[1]
        this.address.ud_county_id = selectedVal[2]

        this.address.ud_province = selectedText[0]
        this.address.ud_city = selectedText[1]
        this.address.ud_county = selectedText[2]

      },
      cancelHandle() {
        
      },
      backHandle(){
        this.$emit('manage-back');
      },
      confirmHandle(){
        let valid = true;
        let msg = ''
        if( !this.address.ud_name ){
          msg = "请填写联系人"
          valid = false
        } else if( !this.address.ud_mobile ){
          msg = "请填写联系方式"
          valid = false
        } else if( !this.address_text ){
          msg = "请选择地址"
          valid = false
        } else if( !this.address.ud_address ){
          msg = "请填写详细地址"
          valid = false
        }
        if( !valid ){
          this.toast = this.$createToast({
            txt: msg,
            type: 'txt'
          })
          this.toast.show()
          return;
        }
        if( this.hold ){
          addressSave(this.address).then( res => {
            this.hold = false;
            if( res.status === 200 ){

              this.$emit('manage-confirm',res.data);
            }else{
              this.toast = this.$createToast({
                txt: '操作失败',
                type: 'txt'
              })
              this.toast.show()
            }
          })
        } 
        
        
      }
    },
    computed:{
      address_text:function(){
        return this.address.ud_province + this.address.ud_city + this.address.ud_county 
      }
    },
    watch: {
      title(data) {
        this.title = data;
      },
      btnText(data) {
        this.btnText = data;
      },
      address(data) {
        this.address = data;
      }
    },
    created(){
      if (this.$route.params.id) {
  	    this.form.ud_id = this.$route.params.id;
  	    this.addressInfo( this.$route.params.id );
        this.title = '编辑地址'
  	  } else {
        this.title = '新增地址'
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.address-manage{
  .action {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 15px;
    color: #fc9153; 
  }
  .form-wrapper {
    padding: 0 20px;
    background: #fff;
    margin-top: 10px;
    .form-item {
      padding:8px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #f5f5f5;
      .form-label {
        width:70px;
        font-size: 14px;
        color: #333;
        font-weight:600;
      }
      .form-field {
        flex-grow:1;
        .border-top-1px:before {
          border-top:0;
        }
        .cube-input:after {
          border:0;
        }
        .cube-select:after {
          border:0;
        }
      }
    }
  }
  .confirm-btn {
    display:block;
    width: 90%;
    height: 48px;
    line-height: 48px;
    background: #fe7e00;
    font-size: 15px;
    font-weight: bold; 
    color: #fff;
    border-radius: 5px;
    margin: 30px auto;
    text-align: center;
  }
}
  
</style>
