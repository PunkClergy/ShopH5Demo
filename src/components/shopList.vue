<template>
  <!-- 商品列表组件 -->
  <div class="shop">
    <div class="shop-list" ref="shopListBox">
      <div class="goods" id="goods">
        <ul
          class="goods-list fix"
          ref="goodsList"
          @touchstart="touchStart($event)"
          @touchmove="touchMove($event)"
          @touchend="touchEnd($event)"
        >
          <li v-for="(item, index) in myData" :key="index">
            <a
              class="goods-a"
              :title="item.name"
              href="javascript:;"
              @click="gotoDetail(item.id)"
              target="_blank"
            >
              <div class="goods-main">
                <img
                  class="lazy"
                  :src="item.cover ? item.cover : require('@/assets/img/lazy_default.png')"
                  :onerror="errorImg"
                />
              </div>
              <div class="goods-desc">
                <h3>
                  <em>{{item.name}}</em>
                </h3>
                <div class="list-price">
                  <span class="price-new">
                    <i>￥</i>
                    {{item.price/100}}
                  </span>
                </div>
              </div>
            </a>
          </li>
        </ul>
        <div class="load-more" v-show="downFlag" ref="loadmore">
          <div v-show="haveMore" class="load-container load">
            <div class="loader">Loading...</div>
            <div class="loader-tit">正在加载...</div>
          </div>
          <div v-show="!haveMore" class="loadingText">没有更多了</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Export from "@/assets/js/export";
import { getShopList } from "@/assets/js/api";
import { url } from "@/assets/js/url";

export default {
  components: {},
  data() {
    return {
      // 商品列表数据
      myData: [],
      errorImg: "this.src='" + require("@/assets/img/lazy_default.png") + "'",
      pageNum: 20, //每页显示数量
      pageNo: 0, //页码

      downFlag: false,
      scrollHt: 0, //滚动距离
      maxScrollHt: "", //最大滚动相差值
      startPosition: "", //初始位置
      endPosition: "", //结束位置
      baseHt: 20, //加载基准
      moveY: 0,
      moreHt: 0, //上拉加载高度
      haveMore: true, //有更多数据
      times: 0 //调用次数
    };
  },

  watch: {},
  methods: {
    touchStart(e) {
      console.log(e);
      let touch = e.touches[0];
      // 初始位置
      this.startPosition = {
        x: touch.pageX,
        y: touch.pageY
      };

      if (this.$refs.goodsList) {
        let loadmoreHt = parseFloat(
          getComputedStyle(this.$refs.loadmore).height
        );
        if (isNaN(loadmoreHt)) {
          loadmoreHt = 0;
        }

        this.contentHt =
          parseFloat(getComputedStyle(this.$refs.goodsList).height) +
          loadmoreHt;
      } else {
        this.contentHt = 0;
      }
      this.boxHt = parseFloat(getComputedStyle(this.$refs.shopListBox).height);
      this.moreHt = parseFloat(
        getComputedStyle(this.$el.querySelector(".load-more")).height
      );

      this.maxScrollHt = this.contentHt - this.boxHt;
    },
    // 下拉刷新
    touchMove(e) {
      // console.log(e);
      // 获取下拉坐标
      let touch = e.touches[0];
      // let more = this.$el.querySelector(".load-more").style.display;
      this.endPosition = {
        x: touch.pageX,
        y: touch.pageY
      };
      this.moveY = this.endPosition.y - this.startPosition.y;
      if (this.moveY < 0) {
        //上拉加载
        if (this.scrollHt >= this.maxScrollHt - this.baseHt) {
          this.downFlag = true;
          if (this.myData.length >= 20) {
            this.times++;
            if (this.times == 1) {
              this.pageNo++;
              this.isInitData = false;
              this.getListData();
            }
          } else {
            this.haveMore = false;
          }
        }
      } else if (this.moveY > 0) {
        if (this.haveMore) {
          this.downFlag = false;
        }
      }
    },
    touchEnd(e) {},
    // 跳转详情
    gotoDetail(id) {
      window.location.href = `..${url}/detail.html?id=${id}`;
    },
    // 请求数据
    getListData() {
      let that = this;
      getShopList(
        // 请求传参数
        that.pageNo,
        that.pageNum,
        null
      )
        .then(res => {
          console.log("shopList===", res);
          that.myData = [];
          if (res.code == 1 && typeof res.data != undefined) {
            if (res.data.shops) {
              that.myData = res.data.shops;
            }
          }
        })
        .catch(err => {
          console.log("失败");
        });
    }
  },
  created() {
    Export.rem();
    this.getListData();
  },
  mounted() {}
};
</script>

<style scoped>
.goods {
  width: 100%;
  height: 100%;
}
.goods-list {
  width: 100%;
  background: #fff;
  padding-bottom: 2%;
}
.goods-list li {
  position: relative;
  float: left;
  width: 47%;
  margin: 2% 0 0 2%;
  background: #fff;
}

.goods-list .goods-a {
  display: block;
  position: relative;
}
.goods-list li img {
  width: 100%;
  height: 3.52rem;
  position: relative;
  display: inherit;
}
.goods-main {
  width: 100%;
  height: 3.52rem;
  background: #eee;
  /*background: url(../assets/img/lazy_default.png) no-repeat center;
    background-size: 100%;*/
}
.goods-main .icon {
  display: block;
  width: 0.56rem;
  height: 0.32rem;
  line-height: 0.32rem;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  color: #fff;
  font-size: 0.24rem;
  letter-spacing: -1px;
}
.goods-main .icon.new {
  background: #66cc99;
}
.goods-list li h3 {
  width: 100%;
  font-size: 0.24rem;
  font-weight: 300;
  color: #808080;
  height: 0.46rem;
  line-height: 0.46rem;
  text-indent: 0.1rem;
  overflow: hidden;
  word-wrap: break-word;
  word-break: break-all;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
}
.list-price {
  width: 100%;
  line-height: 0;
  position: relative;
  bottom: 0;
  padding: 0 0 0.6rem;
  background: #fff;
}
.price-new {
  font-size: 0.32rem;
  color: #f8285c;
}
.del {
  color: #b2b2b2;
  text-decoration: line-through;
  margin-left: 0.04rem;
  font-size: 0.24rem;
}

.only-time {
  display: block;
  position: absolute;
  top: 0.15rem;
  right: 0.05rem;
  height: 0.28rem;
  line-height: 0.28rem;
  color: #b2b2b2;
  font-size: 0.2rem;
  text-align: right;
}
.coupon-con {
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  width: 1.5rem;
  text-align: center;
  background: #ff4c66;
}
.coupon-con p {
  font-size: 0.2rem;
  color: #fff;
  padding: 0.05rem 0;
}
.coupon-con .coupon-tit {
  font-size: 0.24rem;
  color: #ff4c66;
  background: #fcff00;
  padding: 0.05rem 0;
}
.goods-list .quan-money {
  font-size: 0.24rem;
  padding-bottom: 0.05rem;
  color: #fff;
  text-align: center;
}
.goods-list .quan-money span {
  font-size: 0.32rem;
  padding: 0 0.05rem;
}

.load-more {
  width: auto;
  height: auto;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 0 0 0.3rem 0;
}
.loadingText {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  font-size: 0.3rem;
}

/* loading动画 */
.load-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
}
.load .loader {
  font-size: 0;
  text-indent: -9999rem;
  border-top: 0.05rem solid rgba(0, 0, 0, 0.1);
  border-right: 0.05rem solid rgba(0, 0, 0, 0.1);
  border-bottom: 0.05rem solid rgba(0, 0, 0, 0.1);
  border-left: 0.05rem solid #fc0786;
  -webkit-animation: load 1.1s infinite linear;
  animation: load 1.1s infinite linear;
}
.loader-tit {
  font-size: 0.3rem;
  color: #545454;
  margin-left: 0.3rem;
}
.load .loader,
.load .loader:after {
  border-radius: 50%;
  width: 0.4rem;
  height: 0.4rem;
}
@-webkit-keyframes load {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
