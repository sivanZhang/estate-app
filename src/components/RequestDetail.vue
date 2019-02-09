<template>
  <div id="Detail">
    <van-nav-bar title="Detail" left-arrow @click-left="$router.go(-1)" fixed :border="false"/>
    <h3 class="container">{{title}}</h3>
    <div class="detail">
      <div class="header">
        <div class="title">{{`Repair - ${AjaxData.facilities}`}}</div>
        {{AjaxData.start|FDate}}-{{AjaxData.end|FDate}} {{AjaxData.start|FTime}} - {{AjaxData.end|FTime}}
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
      </div>
      <template v-if="$route.params.query==1">
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
    CancelItem() {
      this.$dialog
        .confirm({
          message: "Confirm this operation?"
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
    DeleteItem() {
      this.$dialog
        .confirm({
          message: "Are you sure you want to delete this data?"
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
      switch (this.$route.params.query) {
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
          return "Cancel";
          break;
      }
    }
  },
  data() {
    return {
      AjaxData: {}
    };
  },
  created() {
    let params = {
      repair_id: this.$route.params.rid
    };
    GET_Repair(params).then(res => {
      this.AjaxData = res.data.msg;
    });
  }
  /* beforeRouteEnter (to, from, next) {
    next(vm=>{

    })
  },
  beforeRouteLeave (to, from, next) {
    doument.
  } */
};
</script>
<style lang="less" scoped>
#Detail {
  .detail {
    .content {
      .item {
        padding: 0.15rem;
        & + .item {
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
      & > div {
        font-weight: 600;
        font-size: 0.15rem;
      }
      padding: 0.15rem;
      height: 0.78rem;
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
