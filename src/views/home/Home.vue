<template>
  <div id="home">
    <div class="header">
      <div class="title">Home
        <div class="hint">
          <template v-if="noticeData.length>0">
            <Badge :count="noticeData.length" overflow-count="9">
              <img @click="target" src="@/assets/icons/bell.png" alt>
            </Badge>
          </template>
          <template v-else>
            <img @click="target" src="@/assets/icons/bell.png" alt>
          </template>
        </div>
      </div>
      <div class="main-nav">
        <div @click="$router.push('/repair/request-repair')">
          <div class="icons-bg">
            <img src="@/assets/icons/garage-wrenches.png" alt>
          </div>
          <div class="main-nav-name">Repair</div>
        </div>
        <div><!-- @click="$router.push('/bill/bill')" -->
          <div class="icons-bg">
            <img src="@/assets/icons/Bitmap.png" alt>
          </div>
          <div class="main-nav-name">Pay bills</div>
        </div>
        <div>
          <div class="icons-bg">
            <img src="@/assets/icons/barbecue.png" alt>
          </div>
          <div class="main-nav-name">
            Reserve
            Amennity
          </div>
        </div>
      </div>
    </div>
    <div class="subnav">
      <div>
        <img
          src="@/assets/icons/parked-car.png"
          style="width:.309rem"
          alt
          @click="$router.push('/Parking/ReserveParkingSpot')"
        >
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
    <div class="main">
      <div class="mask">
        <div class="left" @click="$router.push('/news')">
          <img src="@/assets/icons/laba.svg" alt>
          <p>News</p>
          <van-icon name="arrow-down"/>
        </div>
        <div
          v-if="newsListData.length"
          class="right"
          @click="$router.push({name:'ViewNews',params:{nid:newsListData[0].pk}})"
        >
          {{newsListData[0].fields.title}}
          <van-icon name="arrow"/>
        </div>
        <div v-else class="right">No news</div>
      </div>
      <div class="home-pic">
        <img src="@/assets/image/home.png" alt>
      </div>
      <div class="user">
        <img @click="$router.push('/userCenter/MyAccount')" src="@/assets/icons/user.png" alt>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_Notice, GET_News } from "@/api/notice";

export default {
  name: "home",
  data() {
    return {
      noticeData: [],
      newsListData: []
    };
  },
  components: {},
  methods: {
    alt() {
      alert("changan");
    },
    target() {
      this.$router.push("/notifications");
    }
  },
  activated() {
    GET_Notice()
      .then(res => {
        this.noticeData = [...res.data.msg];
        this.noticeData = this.noticeData.filter(item => item.fields.read == 0);
      })
      .catch(err => {});
    GET_News().then(res => {
      this.newsListData = [...res.data.msg];
    });
  },
};
</script>

<style lang="less" scoped>
#home {
  .main {
    padding: 0.2rem 0.15rem 0;

    .user {
      text-align: center;
      margin-top: 0.15rem;

      img {
        width: 0.72rem;
        height: 0.72rem;
        text-align: center;
      }
    }

    .home-pic {
      text-align: center;
      margin-top: 0.15rem;

      img {
        height: 1.3rem;
        width: 3.3rem;
        border-radius: 0.05rem;
      }
    }

    .mask {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 0.59rem;
      padding: 0.15rem;
      box-shadow: 0 0 0.06rem 0.01rem rgba(200, 200, 204, 0.8);

      .right {
        height: 0.33rem;
        line-height: 0.33rem;
        flex: 1 1 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-left: 1px solid #c8c8cc;
        padding-left: 0.15rem;
        margin-left: 0.15rem;
      }

      .left {
        text-align: center;

        p {
          color: #e96f6c;
          font-size: 0.08rem;
        }

        img {
          height: 0.15rem;
          width: 0.151rem;
        }
      }
    }
  }

  .subnav {
    height: 0.7rem;
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

  .header {
    position: relative;
    width: 100%;
    height: 2rem;
    background: #ddd;
    color: #fff;
    padding-top: 0.15rem;

    .main {
      padding: 0.12rem;
    }

    .main-nav {
      margin-top: 0.3rem;
      display: flex;
      justify-content: space-around;

      div {
        text-align: center;

        .main-nav-name {
          height: 0.24rem;
          text-align: center;
          margin-top: 0.028rem;
          word-wrap: break-word;
          max-width: 0.637rem;
          font-size: 0.11rem;
          line-height: 0.1rem;

          &:last-child {
            line-height: 0.12rem;
          }
        }

        .icons-bg {
          display: flex;
          justify-content: center;
          align-items: center;
          background: #fff;
          border-radius: 50%;
          height: 0.637rem;
          width: 0.637rem;

          img {
            max-width: 0.344rem;
            max-height: 0.344rem;
          }
        }
      }
    }

    .title {
      font-size: 0.3rem;
      height: 0.41rem;
      line-height: 0.41rem;
      text-align: center;

      .hint {
        position: absolute;
        top: 0.15rem;
        right: 0.32rem;

        & /deep/ .ivu-badge-count {
          top: -0.05rem;
        }

        img {
          height: 0.2rem;
          width: 0.2rem;
        }
      }
    }
  }
}
</style>