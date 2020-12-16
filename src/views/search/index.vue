<template>
  <goods-search></goods-search>
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
    
  },
  created(){
    this.store_id = this.$route.params.store_id;
    this.table_id = this.$route.params.table_id;
  }
};
</script>
<style lang="stylus" >

</style>