<template>
  <div id="notifications">
    <van-nav-bar title="Notifications" left-arrow @click-left="$router.go(-1)"/>
    <header class="container">
      <img src="@/assets/icons/search.png" alt>
      <input type="text" placeholder="search">
    </header>
    <div class="subnav">
      <div>
        <img src="@/assets/icons/parked-car.png" style="width:.309rem" alt>
        <p>Reseve</p>
        <p>Parking Spot</p>
      </div>
      <div>
        <img src="@/assets/icons/parcel.png" style="width:.263rem" alt>
        <p>Parcel</p>
      </div>
      <div>
        <img src="@/assets/icons/market.png" style="width:.265rem" alt>
        <p>Market</p>
      </div>
      <div>
        <img src="@/assets/icons/event.png" style="width:.231rem" alt>
        <p>Events</p>
      </div>
    </div>
    <section class="container" v-for="item in notiData" :key="item.pk">
      <img src="@/assets/image/touxiang.png" alt>
      <div class="content">
        <div class="name">{{item.fields.title}}</div>
        <div class="date">{{item.fields.date.split(' ')[0]}}</div>
        <div class="msg" v-html="item.fields.content"></div>
      </div>
    </section>
  </div>
</template>

<script>
import { GET_Notice } from "@/api/notice";
export default {
  data() {
    return {
      notiData:[],
    };
  },
  created() {
    GET_Notice()
      .then(res => {
        this.notiData=res.data.msg;
      })
      .catch(err => {});
  }
};
</script>

<style lang="less" scoped>
#notifications {
  section {
    display: flex;
    flex-flow: row wrap;
    border-bottom: 1px solid #c8c8cc;
    padding: .15rem;
    .content {
      flex: 1;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      padding-left: .28rem;
      div {
        width: 100%;
      }
      .date{
        color:#c8c8cc;
      }.name{
        font-weight: 600;
      }
    }

    img {
      border-radius: 50%;
      width: 0.57rem;
      height: 0.57rem;
    }
  }

  .subnav {
    height: 0.71rem;
    line-height: 1;
    color: #fab701;
    display: flex;
    justify-content: space-around;
    box-shadow: 0 0.03rem 0.03rem rgba(200, 200, 204, 0.8);
    align-items: baseline;
    padding-top: 0.12rem;

    div {
      text-align: center;
      font-size: 0.1rem;

      img {
        margin-bottom: 0.04rem;
      }
    }
  }

  header {
    display: flex;
    justify-content: space-between;
    margin-top: 0.08rem;
    align-items: center;

    img {
      width: 0.2rem;
      height: 0.2rem;
    }

    input {
      flex: 1 1 auto;
      margin-left: 0.23rem;
      height: 0.36rem;
      line-height: 0.36rem;
    }
  }
}
</style>