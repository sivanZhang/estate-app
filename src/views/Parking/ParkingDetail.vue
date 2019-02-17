<template>
  <div id="Detail">
    <van-nav-bar title="Detail" left-arrow @click-left="$router.go(-1)" fixed :border="false" />
    <h3 class="container">{{title}}</h3>
    <div class="detail">
      <div class="header">
        <div class="title">{{`Reserve Parking Spots`}}</div>
        {{AjaxData.start|FDate}}-{{AjaxData.end|FDate}} {{AjaxData.start|FTime}} - {{AjaxData.end|FTime}}
        <p>{{`Ticket No.${AjaxData.code}`}}</p>
      </div>
      <div class="content">
        <div class="item">Reservation
          <div class="blod">{{`${AjaxData.number} Parking spots`}}</div>
        </div>
        <div class="item">Vehicle Registration No.
          <div class="blod"></div>
        </div>
        <div class="item">
          <div class="title">Contact me before coming</div>
          <div class="blod">Phone 435666777</div>
          <div class="blod">Email 123@gmail.com</div>
        </div>
        <div class="item">Note
          <div class="blod">{{AjaxData.note}}</div>
        </div>
        <div class="item">
          <div>Submitted</div>
          <div class="blod">
            {{AjaxData.modify_date | FDate
            }}{{AjaxData.modify_date | FTime
            }}
          </div>
        </div>
        <div class="item">
          <div class="title">Reply of Admin</div>
          <div class="reply" v-for="(item,index) of replyData" :key="index">
            <div><span>{{item.replier_name}}</span>:{{item.content}}</div>
            <div><span>{{item.date}}</span>
              <Icon type="ios-trash-outline" @click="DeleteReply" />
            </div>
          </div>
          <Input v-model="replyInp" type="textarea" placeholder="Enter Reply content" />
          <Button @click="SubmitReply" size="small" shape="circle" style="margin-top:.1rem;">Reply</Button>
        </div>
      </div>
      <template v-if="$route.params.query==0">
        <div @click="CancelItem" class="footer">Cancel</div>
      </template>
      <template v-else>
        <div @click="DeleteItem" class="footer">Delete</div>
      </template>
    </div>
  </div>
</template>
<script>
  import { GET_Parking, POST_Parking } from "@/api/paking";
  import { GET_Reply, POST_Reply } from "@/api/notice";
  export default {
    filters: {
      FDate(val) {
        let arr = new Date(val).toDateString().split(/\s/g);
        return `${arr[2]} ${arr[1]}`;
      },
      FTime(val) {
        return new Date(val).toLocaleTimeString();
      }
    },
    methods: {
      DeleteReply() {
        let data = {
          method: "delete",
          id: this.$route.params.rid,
        };
        POST_Reply(data).then(Res => {
          this.$toast(Res.data.msg);
        });
      },
      SubmitReply() {
        let data = {
          content: this.replyInp,
          task_type: 1,
          receiver_id: 1,
          replier_id: 1,
          task_id: 2,
          parent_id: 1
        };
        POST_Reply(data).then(Res => {
          this.$toast(Res.data.msg);
        });
      },
      CancelItem() {
        this.$dialog
          .confirm({
            title: "Confirm this operation?"
          })
          .then(() => {
            let data = {
              id: this.$route.params.rid,
              method: "put",
              status: 3
            };
            POST_Parking(data).then(res => {
              if (res.data.status == "ok") {
                this.$toast.success(res.data.msg);
                this.$router.push("/requestList");
              } else {
                this.$toast.fail(res.data.msg);
              }
            });
          })
          .catch(() => {
            // on cancel
          });
      },
      DeleteItem() {
        this.$dialog
          .confirm({
            title: "Delete confirmation"
          })
          .then(() => {
            let data = {
              id: this.$route.params.rid,
              method: "delete",
            };
            POST_Parking(data).then(res => {
              if (res.data.status == "ok") {
                this.$toast.success(res.data.msg);
                this.$router.push("/requestList");
              } else {
                this.$toast.fail(res.data.msg);
              }
            });
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    computed: {
      level() {
        switch (this.AjaxData.level) {
          case 0:
            return "average";
            break;
          case 1:
            return "urgent";
            break;
          case 2:
            return "supor urgent";
            break;
        }
      },
      title() {
        switch (this.$route.params.query) {
          case 0:
            return "Ongoing";
            break;
          case 1:
            return "Accept";
            break;
          case 2:
            return "Decline";
            break;
          case 3:
            return "Canceled";
            break;
        }
      }
    },
    data() {
      return {
        AjaxData: {},
        replyData: "",
        replyInp: ""
      };
    },
    created() {
      let params = {
          id: this.$route.params.rid
        },
        reolyParams = {
          task_type: "1",
          task_id: this.$route.params.rid
        };
      GET_Parking(params).then(res => {
        this.AjaxData = res.data;
      });
      GET_Reply(reolyParams).then(res => {
        this.replyData = res.data;
      });
    }
  };
</script>
<style lang="less" scoped>
  #Detail {
    .detail {
      .content {
        .item {
          .reply {
            div:first-child {
              span {
                font-weight: 600;
              }
            }

            div:last-child {
              display: flex;
              justify-content: space-between;

              span {
                font-size: .12rem;
                color: #c8c8cc;
              }
            }
          }

          padding: 0.15rem;

          &+.item {
            border-top: 1px solid #c8c8cc;
          }
        }
      }

      border-radius: 0.04rem;
      overflow: hidden;

      .footer {
        font-weight: 600;
        background-color: #fad87b;
        border-radius: 0.04rem;
        text-align: center;
        height: 0.63rem;
        line-height: 0.63rem;
      }

      .header {
        .title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        &>div {
          font-weight: 600;
          font-size: 0.15rem;
        }

        padding: 0.15rem;
        min-height: 0.78rem;
        background-color: #fad87b;
      }

      margin: 0 0.08rem;
      background-color: #fff;
    }

    background-color: rgb(34, 35, 41);
    min-height: 100vh;
    padding-top: 46px;

    .container {
      color: #fff;
    }

    h3 {
      font-size: 0.2rem;
      height: 0.44rem;
      line-height: 0.44rem;
      margin-bottom: 0.13rem;
    }

    .blod {
      font-weight: 600;
    }
  }
</style>