<template>
  <div id="app">
    <div class="wrap">
      <div class="list-summary">
        <span>直购商品</span>
      </div>

      <div>
        <shop-list></shop-list>
      </div>
    </div>
  </div>
</template>

<script>
import shopList from "@/components/shopList";

export default {
  components: {
    shopList
  },
  data() {
    return {};
  },
  watch: {},
  methods: {},
  computed: {}
};
</script>

<style scoped>
.list-summary {
  padding: 0.2rem 0;
  font-size: 0.24rem;
  border-bottom: 1px solid #eee;
  border-top: 1px solid #eee;
  background: #fff;
}
.list-summary span {
  height: 0.4rem;
  line-height: 0.4rem;
  padding-left: 0.2rem;
  border-left: 2px solid #eb3e42;
  display: block;
  color: #000;
  font-size: 0.28rem;
}

/* .index-img {
  height: 3.71rem;
} */
</style>
