<template>
  <div>
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker type="date" :min-date="new Date()" @confirm="pickSucsses" @cancel="show=!show" />
    </van-popup>
    <goHome />
    <van-nav-bar title="Reserve Parking Spot" left-arrow @click-left="$router.go(-1)" @click-right="toList">
      <Icon type="ios-list" slot="right" style="font-size:.28rem" />
    </van-nav-bar>
    <div class="container">
      <h3>Request date</h3>
      <div class="date-time">
        <div @click.capture="pickStart(1)">
          <img src="@/assets/icons/date.png" alt="">
          <input type="text" :value="date1" placeholder="Start Date and time" disabled>
        </div>
        <div @click.capture="pickStart(2)">
          <img src="@/assets/icons/date.png" alt="">
          <input type="text" :value="date2" placeholder="End date and time" disabled>
        </div>
      </div>
      <div class="number">I Need
        <input class="common-inp" type="number" v-model="number" :min="1" />
        parking spot
      </div>
      <h3>Vehicle Registration No.</h3>
      <div class="inputGroup">
        <Input v-model="Registration" placeholder="Enter Registration No." style="width: 100%;" />
        <!-- <Input
          v-model="value"
          placeholder="Enter something..."
          style="width: 100%;margin-top: .12rem;"
        />-->
      </div>
      <!-- <h3>Contact Details</h3>
      <input type="input" class="inp" v-model="phoneNumber" placeholder="Phone Number">
      <input type="email" class="inp" v-model="email" placeholder="Email">-->
      <h3 class="note">
        Note
        <span>(optional)</span>
      </h3>
      <textarea v-model="note"></textarea>
      <button class="conmmt-btn" @click="submit()">Submit</button>
    </div>
  </div>
</template>

<script>
  import { POST_Parking } from "@/api/paking";
  export default {
    data() {
      return {
        number: 1,
        Registration: "",
        phoneNumber: "",
        email: "",
        note: "",
        date1: "",
        date2: "",
        show: false,
        type: 0,
      };
    },
    methods: {
      pickSucsses(value) {
        if (this.type == 1) {
          this.date1 = value.toJSON().split("T")[0];
        }
        if (this.type == 2) {
          this.date2 = value.toJSON().split("T")[0];
        }
        this.show = false;
      },
      pickStart(type) {
        this.show = true;
        this.type = type;
      },
      toList() {
        this.$store.commit("setListType", "Parking");
        this.$router.push({
          name: "RequestList"
        });
      },
      submit() {
        if (!this.date1) {
          this.$toast("date required");
          return;
        }
        if (!this.number) {
          this.$toast("number required");
          return;
        }

        let data = {
          number: this.number,
          start: this.date1,
          end: this.date2,
          note: `${this.note},${this.Registration}`,
          mgr_id: 1
        };
        POST_Parking(data).then(res => {
          if (res.data.status == "ok") {
            this.$toast.success(res.data.msg);
            this.$store.commit("setListType", "Parking");
            this.$router.push({
              name: "RequestList"
            });
          } else {
            this.$toast.fail(res.data.msg);
          }
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .container {
    & /deep/ .ivu-input-number-input {
      text-align: center;
      margin: 0;
    }

    .number {
      margin: .4rem 0;
    }

    .date-time {
      display: flex;
      justify-content: space-between;

      &>div {
        border: .01rem solid #c8c8c8;
        width: 1.5rem;
        height: .39rem;
        display: flex;
        align-items: center;

        img {
          width: .2rem;
          height: .2rem;
          margin: 0 .08rem;
        }

        input {
          background: none;
        }
      }

      font-size: 0.12rem;
    }

    .inputGroup /deep/ .ivu-input {
      height: 0.41rem;
      line-height: 0.41rem;
      font-size: 0.14rem;
    }

    input[type='number'] {
      width: 1.5rem;
      text-align: center;
      margin: 0 .1rem;
    }

    .inp {
      outline: none;
      border: none;
      width: 100%;
      padding: 10px 0 6px;
      font-size: 0.14rem;
      border-bottom: 1px solid #c8c8cc;
      text-indent: 10px;

      &:first-of-type {
        padding-top: 0;
      }
    }

    textarea {
      display: block;
      border: 1px solid #c8c8cc;
      resize: none;
      width: 100%;
      height: 0.85rem;
    }

    button.conmmt-btn {
      display: block;
      width: 2.33rem;
      height: 0.51rem;
      border-radius: 0.51rem;
      margin: 0 auto;
      background-color: #fad87b;
      margin-top: 0.17rem;
      font-size: 0.15rem;
    }

    h3 {
      font-size: 0.15rem;
      height: 0.46rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.04rem;

      &.note {
        justify-content: flex-start;

        span {
          color: #c8c8cc;
          font-weight: 300;
        }
      }
    }
  }
</style>