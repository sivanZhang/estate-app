<template>
  <div id="Detail">
    <goHome/>
    <van-nav-bar title="Details" left-arrow @click-left="$router.go(-1)" fixed :border="false"/>
    <h3 class="container">{{title}}</h3>
    <div class="detail">
      <div class="header">
        <div class="title">{{`reserve Parking Spots`}}</div>
        {{AjaxData.start|FDate}}-{{AjaxData.end|FDate}} {{AjaxData.start|FTime}} - {{AjaxData.end|FTime}}
        <p>{{`Ticket No.${AjaxData.code}`}}</p>
      </div>
      <div class="content">
        <div class="item">
          reservation
          <div class="blod">{{`${AjaxData.number} Parking spots`}}</div>
        </div>
        <div class="item">
          Vehicle Registration No. & Note
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
        <div class="item" style="background-color: #efefef;">
          <div class="title replies">Replies:</div>
          <div class="reply" v-for="(item,index) of replyData" :key="index">
            <div>
              <span>{{item.replier_name}}:</span>
              <div>
                <span class="date">{{item.date}}</span>
                <img
                  class="delete-icon"
                  @click="DeleteReply(item.pk)"
                  src="@/assets/icons/delete.png"
                  alt
                >
              </div>
            </div>
            <div v-html="item.content"></div>
          </div>
          <template v-if="AjaxData.status!=3">
            <Input v-model="replyInp" type="textarea" placeholder="Enter Reply content"/>
            <Button @click="SubmitReply" shape="circle" style="margin-top:.1rem;">Reply</Button>
          </template>
        </div>
      </div>
      <template v-if="AjaxData.status==0">
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
import { filtersMixin } from "@/assets/mixins/dateTimeFilters";
export default {
  mixins: [filtersMixin],
  methods: {
    DeleteReply(id) {
      this.$dialog
        .confirm({
          title: "Delete confirmation"
        })
        .then(() => {
          let data = {
            method: "delete",
            id
          };
          POST_Reply(data).then(res => {
            if (res.data.status == "ok") {
              this.$toast(res.data.msg);
              this.GetReplyList();
            } else if (res.data.status == "error") {
              this.$toast(res.data.msg);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    GetReplyList() {
      let reolyParams = {
        task_type: 1,
        task_id: this.$route.params.rid
      };
      GET_Reply(reolyParams).then(res => {
        this.replyData = res.data;
      });
    },
    SubmitReply() {
      let data = {
        content: this.replyInp,
        task_type: 1,
        replier_id: this.$store.state.userId,
        task_id: this.$route.params.rid
      };
      /*  if (this.replyData.length >= 1 && this.replyData[1].replier_id) {
          data = {
            content: this.replyInp,
            task_type: 1,
            receiver_id: this.replyData[1].replier_id,
            replier_id: this.$store.state.userId,
            task_id: this.$route.params.rid
          };
        } else {
          data = {
            content: this.replyInp,
            task_type: 1,
            replier_id: this.$store.state.userId,
            task_id: this.$route.params.rid
          };
        } */

      POST_Reply(data).then(res => {
        if (res.data.status == "ok") {
          this.replyInp = "";
          this.$toast(res.data.msg);
          this.GetReplyList();
        } else if (res.data.status == "error") {
          this.$toast(res.data.msg);
        }
      });
    },
    onSwipeLeft() {
      this.$router.go(-1);
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
            method: "delete"
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
      switch (this.AjaxData.status) {
        case 0:
          return "Ongoing";
          break;
        case 1:
          return "Accepted";
          break;
        case 2:
          return "Declined";
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
  activated() {
    let params = {
      id: this.$route.params.rid
    };
    GET_Parking(params).then(res => {
      this.AjaxData = res.data;
    });
    this.GetReplyList();
  }
};
</script>
<style lang="less" scoped>
#Detail {
  padding-bottom: 0.3rem;
  .detail {
    & /deep/ .ivu-btn {
    color: #fad87b;
    border-color: #fad87b;
    font-weight: 600;
  }
    .delete-icon {
      height: 0.16rem;
      height: 0.16rem;
      margin-left: 0.04rem;
    }
    .content {
      .item {
        .reply {
          padding: 0.1rem 0;
          &+.reply{
            border-top: .01rem solid #c8c8cc;
          }
          div:first-child {
            display: flex;
            justify-content: space-between;

            & > span {
              font-family: "OpenSans-SemiBold";
            }

            & > div {
              span.date {
                color: #c8c8c8;
                font-size: 0.12rem;
              }
            }
          }

          & > div:last-child {
            span {
              font-size: 0.11rem;
              color: #c8c8cc;
            }
          }
        }

        padding: 0.15rem;

        & + .item {
          border-top: 1px solid #c8c8cc;
        }
      }
    }

    border-radius: 0.04rem;
    overflow: hidden;

    .footer {
      font-family: "OpenSans-SemiBold";
      background-color: #fad87b;
      border-radius: 0.04rem;
      text-align: center;
      height: 0.6rem;
      line-height: 0.6rem;
    }

    .header {
      .title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &.replies{
          margin-bottom: .15rem;
        }
      }

      & > div {
        font-family: "OpenSans-SemiBold";
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
    font-family: "OpenSans-SemiBold";
  }
}
</style>