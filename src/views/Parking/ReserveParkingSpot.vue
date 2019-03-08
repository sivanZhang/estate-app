<template>
  <div>
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
    <van-nav-bar
      title="Reserve Parking Spot"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="toList"
    >
      <van-icon name="description" slot="right"/>
    </van-nav-bar>
    <div class="container">
      <h3>Request date</h3>

      <DatePicker
        type="date"
        v-model="date1"
        placeholder="Select start date"
        style="width: 100%;font-size:.13rem;height:.41rem;"
      ></DatePicker>
      <DatePicker
        type="date"
        v-model="date2"
        placeholder="Select end date"
        style="width: 100%;font-size:.13rem;height:.41rem;"
      ></DatePicker>
      <div>I Need
        <InputNumber
          v-model="number"
          :min="1"
          style="width: 1.3rem;border-radius:0;margin:0 .1rem,text-align: center;"
        />parking spot
      </div>
      <h3>Vehicle Registration No.</h3>
      <div class="inputGroup">
        <Input v-model="Registration" placeholder="Enter Registration No." style="width: 100%;"/>
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
      date2: ""
    };
  },
  methods: {
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
        start: `${this.date1.getFullYear()}-${this.date1.getMonth() +
          1}-${this.date1.getDate()}`,
        end: `${this.date2.getFullYear()}-${this.date2.getMonth() +
          1}-${this.date2.getDate()}`,
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
  .inputGroup /deep/ .ivu-input {
    height: 0.41rem;
    line-height: 0.41rem;
    font-size: 0.14rem;
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
