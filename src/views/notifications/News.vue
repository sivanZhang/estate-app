<template>
  <div id="news">
    <Button
      shape="circle"
      icon="ios-home"
      to="/home"
      style="position:fixed;
        right: .15rem;
        bottom: .3rem;
        z-index:1000;color:#fab701;font-size:.18rem;border-color:#fab701"
        size="large"
    ></Button>
    <van-nav-bar title="News" left-arrow @click-left="$router.go(-1)">
      <van-icon name="description" slot="right"/>
    </van-nav-bar>
    <section
      class="news-item"
      v-for="(item,index) in newsListData"
      :key="index"
      @click="$router.push({name:'ViewNews',params:{nid:item.pk}})"
    >
      <header>
        {{item.fields.title}}
        <span v-if="item.fields.urgency_level==1">!</span>
      </header>
      <p class="date">{{item.fields.date}}</p>
      <div class="content" v-html="item.fields.content"></div>
    </section>
  </div>
</template>
<script>
import { GET_News } from "@/api/notice";
export default {
  mounted() {},
  data() {
    return {
      newsListData: []
    };
  },
  created() {
    GET_News().then(res => {
      this.newsListData = [...res.data.msg];
    });
  }
};
</script>

<style lang="less" scoped>
#news {
  section.news-item {
    padding: 0.2rem 0.31rem 0.08rem 0.2rem;
    border-bottom: 1px solid #c8c8cc;
    header {
      font-size: 0.15rem;
      font-weight: 600;
      position: relative;
      span {
        position: absolute;
        right: -0.11rem;
        color: #e96f6c;
      }
    }
    .date {
      color: #c8c8cc;
      font-size: 0.12rem;
    }
    .content {
      width: 100%;
      max-height: .64rem;
      overflow: hidden;
      font-size: .13rem;
    }
  }
}
</style>