<template>
  <div class="orderHome note" :style="note">
    <div class="resName">
      <img :src="shop.storeBanner" alt />
      <h4>{{shop.storeName}}</h4>
    </div>
    <h4>请选择用餐人数</h4>

   
    <ul class="selectUl">
      <li
        v-for="(item,i) in num"
        :key="i"
        @click="selectNum(item,i)"
        :class="[cur==i? 'numActive': '']"
      ><span>{{item}}</span></li>
      <li>
        <a href="#" @click="showAlert">手动输入</a>
      </li>
    </ul>
    <div class="btn">
      <cube-button :primary="true" @click="handleAddTableAction">开始点餐</cube-button>
    </div>
  </div>
</template>
<script>
import { tableActionAdd } from "@/api";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      store_id: 0,
      diners_number: 1,
      table_id: 0,
      note: {
        backgroundImage:
          "url(" + require("../../assets/images/orderImg.png") + ")",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "130% 113%"
      },
      num: [
        "1人",
        "2人",
        "3人",
        "4人",
        "5人",
        "6人",
        "7人",
        "8人",
        "9人",
        "10人"
      ],
      cur: 0
    };
  },
  computed: {
    ...mapGetters(["shop", "table"])
  },
  methods: {
    ...mapActions("shop", ["getStoreInfo", "getTableInfo"]),
    handleAddTableAction() {

      if( !this.diners_number ){
        this.toast = this.$createToast({
          txt: '请选择就餐人数',
          type: 'txt'
        })
        this.toast.show()
        return;
      }
    
      tableActionAdd({
        table_id: this.table_id,
        diners_number: this.diners_number
      }).then(res => {
        if (res.status === 200) {
          return this.$router.push(`/home/${this.store_id}/${this.table_id}`);
        } else {
          this.toast = this.$createToast({
            txt: '操作失败',
            type: 'txt'
          })
          this.toast.show()
        }
      });
    },

    selectNum(item, i) {
      this.cur = i;
      this.diners_number = i + 1;
      
    },
    showAlert() {
      this.dialog = this.$createDialog({
        type: 'prompt',
        title: '就餐人数',
        prompt: {
          value: '',
          placeholder: '请输入就餐人数'
        },
        onConfirm: (e, promptValue) => {
          this.diners_number = promptValue;
          this.handleAddTableAction();
        }
      }).show()
    }
  },
  created() {
    this.store_id = this.$route.params.store_id;
    this.table_id = this.$route.params.table_id;

    this.getStoreInfo(this.$route.params.store_id);
    this.getTableInfo(this.$route.params.table_id);
  }
};
</script>
<style lang="stylus" scoped>
.orderHome {
  width: 100%;
  height: 100%;
  background: #f5f5f5;

  .resName {
    padding-top: 2.5rem;
    text-align: center;

    img {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      margin-top: 0.3rem;
    }

    h4 {
      margin-bottom: 2rem;
    }
  }

  h4 {
    text-align: center;
    margin-bottom: 1rem;
  }

  .numActive span {
    border: 2px solid #ffac5a;
    color: #fe7e00;
    background: #FCE2C9;
  }

  ul {
    margin: 0 auto;
    display: flex;
    width: 75%;
    box-sizing: border-box;
    flex-wrap: wrap;

    li {
      width: 25%;
      text-align: center;
      font-size: 0.8rem;
      span {
        display:block;
        background-color: #fff;
        border-radius: 0.3rem;
        margin-bottom: 0.6rem;
        border: 1px solid #fff;
        margin-right: 0.6rem;
        height: 3.5rem;
        line-height: 3.5rem;
            box-sizing: border-box;
      }
    }
  }

  .btn {
    margin: 0 auto;
    width: 80%;
    margin-top: 2rem;
    z-index:0;
    button {
      width: 100%;
      background: linear-gradient(0deg, rgba(254, 126, 0, 1), rgba(255, 172, 90, 1));
      box-shadow: 0px 20px 21px 0px rgba(254, 126, 0, 0.4);
      border-radius: 47px;
      position: relative;
    }
  }
}

.orderHome .cube-input {
  margin: 0 auto;
  width: 80%;
}

.selectUl li:nth-last-of-type(1) {
  width: 50%;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.selectUl li:nth-last-of-type(1) a {
  background: linear-gradient(0deg, rgba(254, 126, 0, 1), rgba(255, 172, 90, 1));
  color: #fff;
  height: 3.5rem;
  line-height: 3.5rem;
  margin-bottom: .6rem;
    margin-right: .6rem;
  width:100%;
}
</style>

