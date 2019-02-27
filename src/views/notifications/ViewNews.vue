<template>
  <div id="ViewNews">
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
    <van-nav-bar title="ViewNews" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <div class="container">
      <header>{{newsDetailData.title}}</header>
      <div class="user">
        <img src="@/assets/image/touxiang.png" alt>
        <div>
          <div class="name">Staff</div>
          <div class="date">{{newsDetailData.date}}</div>
        </div>
      </div>
      <div class="content" v-html="newsDetailData.content"></div>
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
  div.container {
    .content{
      font-size: .13rem;
    }
    header {
      font-size: 0.14rem;
      font-weight: 600;
      padding: .06rem 0;
    }
    div.user{
      display: flex;
      align-items: center;
      margin-bottom: .3rem;
      img{
        width: .6rem;
        height: .6rem;
        border-radius: 50%;
        margin-right: .15rem;
      }
      div{
        .name{
          font-weight: 600;
        }
        .date{
          color: #c8c8c8;
          font-size: .12rem;
        }
      }
    }
  }
}
</style>