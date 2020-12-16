<template>
  <goods-detail :goods_id="goods_id" :table_id="table_id" :cart_type="cart_type" @goods-back="goBack" @to-order="goOrder"></goods-detail>
</template>
<script>
import GoodsDetail from '@/components/goodsDetail'
export default {
  components: {
    GoodsDetail
  },
  data() {
    return {
      goods_id:'',
      table_id:'',
      cart_type:3,
    }
  },
  methods: {
    goBack( store_id ){
      this.$router.push(`/shop/${store_id}`)
    },
    goOrder(cart_id){
     this.$router.push(`/shopeDeal/${cart_id}`);
    }
  },
  created(){
    this.goods_id = this.$route.params.id;
  }
};
</script>
<style lang="stylus" >

</style>