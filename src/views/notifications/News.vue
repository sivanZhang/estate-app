<template>
  <div id="news">
    <van-nav-bar title="News" left-arrow @click-left="$router.go(-1)">
      <van-icon name="description" slot="right" />
    </van-nav-bar>
    <section class="news-item">
      <header>Water pipeline maintencance</header>
    </section>
  </div>
</template>

<script>
  import { GET_News } from "@/api/notice"
  export default {
    data() {
      return {
        newsListData: []
      }
    },
    created() {
      /* GET_News().then(res => {
        this.newsListData = [...res.data.msg];
      }) */
    }
  }
</script>

<style lang="less" scoped>
  #news {
    section.news-item {
      margin-bottom: 1px solid #c8c8cc;

      header {
        font-size: .15rem;
        font-weight: 600;
      }

      .date {
        color: #c8c8cc;
        font-size: .12rem;
      }
    }
  }
</style>