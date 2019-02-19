<template>
  <div id="ViewNews">
    <van-nav-bar title="ViewNews" left-arrow @click-left="$router.go(-1)">
      <van-icon name="description" slot="right"/>
    </van-nav-bar>
    <div class="container">
      <header>{{newsDetailData.title}}</header>
      <div class="user">

      </div>
      <div v-html="newsDetailData.content"></div>
      <div>
        {{newsDetailData.messages}}
      </div>
    </div>
  </div>
</template>

<script>
import { GET_News } from "@/api/notice";
export default {
  data() {
    return {
      newsDetailData: {}
    };
  },
  created() {
    let params = {
      id: this.$route.params.nid
    };
    GET_News(params).then(res => {
      this.newsDetailData = { ...res.data.msg };
    });
  }
};
</script>

<style lang="less" scoped>
#ViewNews {
  div{
    header {
      font-size: 0.15rem;
      font-weight: 600;
    }
  }
}
</style>