<template>
  <div id="Detail">
    <Button shape="circle" icon="ios-home" to="/home" style="position:fixed;
        right: .15rem;
        bottom: .3rem;
        z-index:1000;color:#fab701;font-size:.18rem;border-color:#fab701" size="large"></Button>
    <van-nav-bar title="Details" left-arrow @click-left="$router.go(-1)" fixed :border="false" />
    <h3 class="container">{{title}}</h3>
    <div class="detail">
      <div class="header">
        <div class="title">{{`Repair - ${AjaxData.facilities}`}}</div>
        {{AjaxData.start}} To {{AjaxData.end}}
        <p>{{`Ticket No.${AjaxData.code}`}}</p>
      </div>
      <div class="content">
        <div class="item">Address
          <div class="blod">{{AjaxData.building}}</div>
        </div>
        <div class="item">Urgency Level
          <div class="blod">{{level}}</div>
        </div>
        <div class="item">
          <div class="title">Contact me before coming</div>
          <div class="blod">Phone {{AjaxData.phone}}</div>
          <div class="blod">Email {{AjaxData.email}}</div>
        </div>
        <div class="item">Note
          <div class="blod">{{AjaxData.note}}</div>
        </div>
        <div class="item">
          <div>Submitted</div>
          <div class="blod">{{AjaxData.end}}</div>
        </div>
        <div class="item">
          <div class="title">Replies:</div>
          <div class="reply" v-for="(item,index) of replyData" :key="index">
            <div>
              <span>{{item.replier_name}}:</span>
              <div>
                <span class="date">{{item.date}}</span>
                <Icon type="ios-trash-outline" @click="DeleteReply(item.pk)" />
              </div>
            </div>
            <div v-html="item.content"></div>
          </div>
          <template v-if="AjaxData.status!=3">
            <Input v-model="replyInp" type="textarea" placeholder="Enter Reply content" />
          <Button @click="SubmitReply" size="small" shape="circle" style="margin-top:.1rem;">Reply</Button>
          </template>
          
        </div>
      </div>

      <template v-if="AjaxData.status==1">
        <div @click="CancelItem" class="footer">Cancel</div>
      </template>
      <template v-else>
        <div @click="DeleteItem" class="footer">Delete</div>
      </template>
    </div>
  </div>
</template>
<script>
  import { GET_Repair, POST_Repair } from "@/api/repair";
  import { GET_Reply, POST_Reply } from "@/api/notice";
  export default {
    data() {
      return {
        AjaxData: {},
        replyData: "",
        replyInp: ""
      };
    },
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
      DeleteReply(id) {
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
      },
      GetReplyList() {
        let reolyParams = {
          task_type: 0,
          task_id: this.$route.params.rid
        };
        GET_Reply(reolyParams).then(res => {
          this.replyData = res.data;
        });
      },
      SubmitReply() {
        let data = {
            content: this.replyInp,
            task_type: 0,
            replier_id: this.$store.state.userId,
            task_id: this.$route.params.rid
          };
        /* let data;
        if (this.replyData.length >= 1 && this.replyData[0].replier_id) {
          data = {
            content: this.replyInp,
            task_type: 0,
            receiver_id: this.replyData[0].replier_id,
            replier_id: this.$store.state.userId,
            task_id: this.$route.params.rid
          };
        } else {
          data = {
            content: this.replyInp,
            task_type: 0,
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
      CancelItem() {
        this.$dialog
          .confirm({
            title: "Confirm this operation?"
          })
          .then(() => {
            let data = {
              repair_id: this.$route.params.rid,
              method: "put",
              status: 3
            };
            POST_Repair(data).then(res => {
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
      GetReplyList() {
        let reolyParams = {
          task_type: 0,
          task_id: this.$route.params.rid
        };
        GET_Reply(reolyParams).then(res => {
          this.replyData = res.data;
        });
      },
      DeleteItem() {
        this.$dialog
          .confirm({
            title: "Delete confirmation"
          })
          .then(() => {
            let data = {
              repair_id: this.$route.params.rid,
              method: "delete"
            };
            POST_Repair(data).then(res => {
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
            return "Draft";
            break;
          case 1:
            return "Ongoing";
            break;
          case 2:
            return "Completed";
            break;
          case 3:
            return "Canceled";
            break;
          case 4:
            return "Accepted";
            break;
          case 5:
            return "Declined";
            break;
        }
      }
    },
    activated() {
      let params = {
        repair_id: this.$route.params.rid
      };
      GET_Repair(params).then(res => {
        this.AjaxData = res.data.msg;
      });
      this.GetReplyList();
    },
  };
</script>
<style lang="less" scoped>
  #Detail {
    padding-bottom: .3rem;

    .detail {
      .content {
        .item {
          div.reply {
            margin: 0.08rem auto;

            div:first-child {
              display: flex;
              justify-content: space-between;

              &>span {
                font-weight: 600;
              }

              &>div {
                span.date {
                  color: #c8c8c8;
                  font-size: 0.12rem;
                }
              }
            }

            &>div:last-child {
              span {
                font-size: 0.11rem;
                color: #c8c8cc;
              }
            }

            &:not(:last-child) {
              &>div:last-child {
                border-bottom: 1px solid #ddd;
                padding-bottom: 0.08rem;
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