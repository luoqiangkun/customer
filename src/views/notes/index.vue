<template>
  <transition name="page-move">
    <div class="notes">
      <div class="header">
        <div class="back" @click="goBack">
          <img src="../../assets/images/back.png" alt class="back" style="width:1rem; height:1rem;" />
        </div>
        <div>订单备注</div>
      </div>
      <div class="viewbody">
        <cube-textarea v-model="value" placeholder="自定义备注信息"></cube-textarea>
        <ul class="notesUl">
          <li
            v-for="(item,i) in radioData"
            :class="[cur==i? 'radioActive': '']"
            :key="i"
            @click="radioNum(item,i)"
          >{{item}}</li>
          <li
            v-for="(item,i) in checkBoxData"
            @click="checkNum(item,i)"
            :class="[item.status? 'checkActive' : '']"
            :key="i+3"
          >{{item.name}}</li>
        </ul>
        <cube-button :primary="true" @click="confirm">确定</cube-button>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      checked: false,
      notesData:'',
      aa: "不要辣",
      bb:[],
      value: "",
      cur: "",
      radioData: ["不要辣", "少放辣", "多放辣"],
      checkBoxData: [
        { name: "不要香菜", status: false },
        { name: "不要洋葱", status: false },
        { name: "多点醋", status: false },
        { name: "多点葱", status: false }
      ]
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    radioNum(item, i) {
      this.cur = i;
      this.aa = item;
      console.log(item);
    },
    checkNum(item, i) {
      this.checkBoxData.forEach((item, a) => {
        if (i == a) {
          item.status = !item.status;
        }
      });
    },
    confirm() {
      let elem = document.querySelectorAll(".checkActive");
      elem.forEach((item, i) => {
        this.bb.push(item.innerText)
      });
      this.notesData = this.aa +',' +this.value+ this.bb.join(',') ;
      localStorage.setItem('notesData',this.notesData)
            this.$router.go(-1);

    }
  }
};
</script>
<style lang="stylus" scoped>
.page-move-enter, .page-move-leave-active
    transform: translate(100%, 0)
.page-move-enter-active, .page-move-leave-active
  transition: transform .3s
    
.header {
  text-align: center;
  background: #fff;
  padding: 1rem;
  font-size: 1rem;
  color: #000;
  background: #fff;
  display: flex;
  position: fixed;
  width: 100%;
  z-index: 1;
  justify-content: center;
}

.back {
  position: absolute;
  left: 10px;
  top: 0.5rem;
}

.viewbody {
  padding-top: 50px;
}

.notesUl {
  display: flex;
  flex-wrap: wrap;
  width: 96%;
  margin: 0 auto;
  margin-top: 20px;

  li {
    border: 1px solid #ddd;
    padding: 5px;
    width: 20%;
    text-align: center;
    font-size: 14px;
    margin-right: 5px;
    margin-bottom: 5px;
  }

  .radioActive, .checkActive {
    background: #fc9153;
    color: #fff;
    border: 1px solid transparent;
    text-align: center;
  }
}

.cube-btn-primary {
  width: 90%;
  margin: 0 auto;
  margin-top: 50px;
  margin-left: 5%;
}
</style>