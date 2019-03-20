<template>
  <v-touch id="notifications" tag="div" v-on:swipeleft="onSwipeLeft">
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
    <van-nav-bar title="Notifications" left-arrow @click-left="$router.go(-1)"/>
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
    <section class="container" v-for="item in notiData" :key="item.pk" @click="target_detail(item)">
      <Badge dot v-if="item.fields.read==0"></Badge>
      <img src="@/assets/image/touxiang.png" alt>
      <div class="content">
        <div>
          <div class="name">{{item.fields.title}}</div>
          <div class="date">{{item.fields.date.split(' ')[0]}}</div>
          <div class="msg" v-html="item.fields.content"></div>
          <Icon @click.stop="deleteNotice(item.pk)" type="ios-trash-outline"/>
        </div>
      </div>
    </section>
  </v-touch>
</template>

<script>
import { GET_Notice, POST_Notice } from "@/api/notice";
export default {
  data() {
    return {
      notiData: []
    };
  },
  activated() {
    GET_Notice()
      .then(res => {
        this.notiData = [...res.data.msg];

        function compare(p, cp) {
          //这是比较函数
          return function(m, n) {
            var a = m[p][cp];
            var b = n[p][cp];
            return a - b; //升序
          };
        }
        this.notiData.sort(compare("fields", "read"));
      })
      .catch(err => {});
  },
  methods: {
    onSwipeLeft() {
      this.$router.go(-1);
    },
    target_detail(data) {
      this.isRead(data.pk);
      if (data.fields.category == 0) {
        this.$router.push({
          name: "RequestDetail",
          params: { rid: data.fields.task_id }
        });
      } else if (data.fields.category == 1) {
        this.$router.push({
          name: "ParkingDetail",
          params: { rid: data.fields.task_id }
        });
      } else if (data.fields.category == 2) {
        this.$router.push({
          name: "ViewNews",
          params: { nid: data.fields.task_id }
        });
      }
    },
    deleteNotice(ids) {
      let data = {
        ids,
        method: "delete"
      };

      this.$dialog
        .confirm({
          title: "Delete confirmation",
          message: "Will you delete it?"
        })
        .then(() => {
          POST_Notice(data).then(res => {
            this.$toast(res.data.msg);
            GET_Notice()
              .then(res => {
                this.notiData = [...res.data.msg];

                function compare(p, cp) {
                  //这是比较函数
                  return function(m, n) {
                    var a = m[p][cp];
                    var b = n[p][cp];
                    return a - b; //升序
                  };
                }
                this.notiData.sort(compare("fields", "read"));
              })
              .catch(err => {});
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    isRead(id) {
      let data = {
        id,
        read: 1,
        method: "put"
      };
      POST_Notice(data);
    }
  }
};
</script>

<style lang="less" scoped>
#notifications {
  section {
    width: 100%;
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    border-bottom: 1px solid #c8c8cc;
    padding: 0.15rem;

    .content {
      padding-left: 0.15rem;

      & > div {
        .date {
          display: flex;
          justify-content: space-between;
          color: #c8c8cc;
        }

        .name {
          font-weight: 600;
          font-size: 0.14rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
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