<template>
  <goods-search
    @search-callback="handleDetail"
    @search-back="handleBack"
    :store_id="store_id"
    :table_id="table_id"
  >
  </goods-search>
</template>
<script>
import GoodsSearch from '@/components/goodsSearch'
export default {
  components: {
    GoodsSearch
  },
  data() {
    return {
      store_id:'',
      table_id:''
    }
  },
  methods: {
    handleDetail(goods_id){
      this.$router.push(`/storeGoods/${goods_id}`)
    },
    handleBack(){
      this.$router.push(`/store/${this.store_id}`)
    }
  },
  created(){
    this.store_id = this.$route.params.store_id
  }
};
</script>
<style lang="stylus" >

</style>