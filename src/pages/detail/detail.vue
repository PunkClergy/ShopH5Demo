<template>
  <div id="app">
    <div class="wrap">
      <div class="content">
        <div class="item-good">
          <div class="img-show">
            <img
              :src="detailInfo.cover ? detailInfo.cover : require('@/assets/img/lazy_default.png')"
              :alt="detailInfo.name"
              :onerror="errorImg"
            />
          </div>
          <div class="normal-list">
            <div class="list-price">
              <div class="price-new">
                <i>￥</i>
                <span>{{detailInfo.price/100}}</span>
              </div>
            </div>
            <h2>{{detailInfo.name}}</h2>
            <div class="detail-info">
              <div class="detail-description">{{detailInfo.description}}</div>
              <p>*{{detailInfo.important}}</p>
            </div>
          </div>
          <div class="detail-img">
            <p class="deta-img-p">商品详情</p>
            <p v-for="(item, index) in imgList" :key="index">
              <img
                :src="item.content?item.content:require('@/assets/img/lazy_default.png')"
                :alt="item.type"
                :onerror="errorImg"
                v-if="item.type === 2"
              />
              <span v-else>{{item.content}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Export from "@/assets/js/export";
import { getShopDetail } from "@/assets/js/api";
import { url } from "@/assets/js/url";

export default {
  components: {},
  data() {
    return {
      detailInfo: {},
      imgList: [],
      errorImg: "this.src='" + require("@/assets/img/lazy_default.png") + "'"
    };
  },
  watch: {},
  methods: {
    // 请求详情
    getDetailData() {
      let that = this;
      getShopDetail(Export.getUrlParam().id)
        .then(res => {
          console.log("detail===", res);
          if (res.code === 1 && typeof res.data != undefined) {
            if (res.data) {
              that.detailInfo = res.data;
              that.imgList = res.data.detail;
            }
          }
        })
        .catch(err => {
          console.log(1);
        });
    }
  },
  created() {
    Export.rem();
    // 执行函数 详情
    this.getDetailData();
  },
  mounted() {}
};
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.item-good {
  position: relative;
  height: 100%;
  overflow: hidden;
}
.item-good a {
  color: #666;
  font-size: 0.3rem;
  display: block;
  text-align: left;
  margin: 0 0.2rem;
  padding: 0.25rem 0;
  border-top: 1px solid #eee;
}
.img-show {
  position: relative;
}
.item-good .normal-list {
  margin: 0.1rem 0.2rem;
}
.item-good h2 {
  color: #666;
  font-size: 0.3rem;
  font-weight: normal;
  padding-bottom: 0.1rem;
  text-align: justify;
}
.item-good .list-price {
  margin: 0 auto;
  /* text-align: center; */
}
.item-good .list-price .price-new {
  font-size: 0.3rem;
  color: #f8285c;
  padding-bottom: 0.1rem;
}
.item-good .list-price em {
  color: #fff;
  display: inline-block;
  vertical-align: 0.1rem;
}
.item-good .list-price .price-new em.qhd {
  font-size: 0.24rem;
  padding: 0.02rem 0.1rem;
  line-height: 0.35rem;
  background: #f8285c;
  border-radius: 0.08rem;
}
.item-good .list-price .price-new i {
  font-size: 0.36rem;
}
.item-good .del {
  font-size: 0.28rem;
  color: #ababab;
  text-decoration: line-through;
  margin-left: 0.15rem;
}

.detail-info {
  background-color: #f9fafb;
  padding: 0.2rem;
  border-radius: 0.2rem;
}
.detail-description {
  white-space: pre-line;
  font-size: 0.25rem;
  font-weight: 100;
  color: rgba(153, 153, 153, 1);
}
.detail-img {
  background-color: #f9fafb;
  text-align: center;
  margin-top: 0.3rem;
}
.deta-img-p {
  font-size: 0.25rem;
  color: rgba(153, 153, 153, 1);
  padding: 0.2rem 0.2rem;
  font-weight: 100;
}
.detail-img span {
  font-size: 0.3rem;
}
.detail-info p {
  color: #e02020;
  font-size: 0.2rem;
  margin-top: 0.2rem;
}
</style>
