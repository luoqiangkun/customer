<template>
  <div>
    <!-- 桌台点单 -->
    <h3>桌台点单</h3>
    <div class="tab">
      <a
        href="javascript:;"
        v-for="(item,i) in tab"
        :key="i"
        @click="toggle(i)"
        :class="[cur==i? 'active': '']"
      >{{item}}</a>
    </div>
    <ul class="list">
      <li class="item" @click="add">
        <div class="title">A-01号</div>
        <div class="status">就餐中</div>
        <div class="time">
          <div>12：00</div>
          <div>4/4</div>
        </div>
      </li>
      <li class="item">
        <div class="title">A-01号</div>
        <div class="status">就餐中</div>
        <div class="time">
          <div>12：00</div>
          <div>4/4</div>
        </div>
      </li>
      <li class="item">
        <div class="title">A-01号</div>
        <div class="status">就餐中</div>
        <div class="time">
          <div>12：00</div>
          <div>4/4</div>
        </div>
      </li>
      <li class="item">
        <div class="title">A-01号</div>
        <div class="status">就餐中</div>
        <div class="time">
          <div>12：00</div>
          <div>4/4</div>
        </div>
      </li>
    </ul>
    <!-- <tabbar /> -->

    <!-- <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <div class="block">
          <div
            style="text-align:center; padding:.5rem; border-bottom: 1px solid #eee;position:relative"
          >
            桌台A-01
            <div class="close" @click="show=false">
              <van-icon name="cross" />
            </div>
          </div>
          <div class="box">
            <div>就餐人数</div>
            <div>
              <input type="text" placeholder="请输入人数"/>
            </div>
          </div>
          <div class="box">
            <div>服务员</div>
            <div>
              <input type="text" />
            </div>
          </div>
          <div class="btn">
                      <van-button type="warning" @click="show=false">确定</van-button>

          </div>
        </div>
      </div>
    </van-overlay> -->
  </div>
</template>
<script>
// import tabbar from "@/components/tabbar";
export default {
  data() {
    return {
      show: false,
      tab: ["全部桌台", "空闲桌台", "占用桌台"],
      cur: 0
    };
  },
  methods: {
    toggle(i) {
      this.cur = i;
    },
    add() {
      this.show = true;
    }
  },
  components: {
    // tabbar
  }
};
</script>
<style lang="stylus" scoped>
h3 {
  padding: 1rem 0.5rem;
}
.tab {
  display: flex;
  a {
    flex: 1;
    color: #585858;
    text-align: center;
    padding: 0.5rem 0;
  }
  a.active {
    color: #ffb95c;
    border-bottom: 2px solid #ffb95c;
  }
}
.list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  box-sizing: border-box;
  padding: 0 1rem;
  .item {
    border-radius: 0.5rem;
    border: 1px solid red;
    width: 30%;
    margin-right: 2.7%;
    margin-bottom: 0.5rem;
    .title {
      background-color: red;
      border-radius: 0.5rem 0.5rem 0 0;
      color: #fff;
    }
    .status {
      text-align: center;
      padding: 0.8rem 0;
    }
    .time {
      display: flex;
      justify-content: space-around;
      color: #cccccc;
    }
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 90%;
  background-color: #fff;
  .box {
    display: flex;
    justify-content: space-between;
    border: 1px solid #bfbfbf;
    box-sizing: border-box;
    margin: 1rem;
    padding: 0.5rem;
    input {
      width: 6rem;
      text-align: right;
      border: none;
    }
  }
  .close {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
  }
  .btn {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 2rem;

    button {
      width: 100%;
    }
  }
}
</style> 