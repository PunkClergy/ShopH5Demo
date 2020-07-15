<template>
  <!-- 商品列表组件 -->
  <div class="shop">
    <div class="shop-list" ref="shopListBox">
      <div class="goods" id="goods">
        <ul class="goods-list fix" ref="goodsList">
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
      pageNo: 0 //页码
    };
  },

  watch: {},
  methods: {
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
            console.log(res.data.shops);
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
</style>
