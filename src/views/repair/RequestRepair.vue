<template>
  <div id="reques" class="warp-pb container">
    <goHome/>

    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="startTime"
        type="datetime"
        :min-date="new Date()"
        @confirm="pickSucsses"
        @cancel="show=!show"
      />
    </van-popup>
    <van-nav-bar
      title="Request Repair"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="toList"
    >
      <Icon type="md-list" slot="right"/>
    </van-nav-bar>
    <!-- right-text="save" -->
    <template v-show="PropertyData.length>1">
      <h3>Select Property</h3>
      <van-radio-group v-model="radio">
        <div class="select">
          <div v-for="(item,index) in PropertyData" :key="index" @click="radio = item.id">
            <img src="@/assets/icons/house.png" alt>
            <div>
              <p>{{item.building_name}}</p>
              <p>{{item.room_number}}</p>
            </div>
            <van-radio :name="item.id" checked-color="#07c160"></van-radio>
          </div>
        </div>
      </van-radio-group>
    </template>
    <h3>What do you need to repair</h3>
    <input v-model="facility" type="text" class="common-inp">
    <h3 class="urgency-level">Urgency Level</h3>
    <div class="scale">
      <div v-for="(item,index) in scaleList" :key="`index${index}`" @click="select=item.content">
        {{item.content}}
        <p></p>
        <!-- <p class="active"></p> -->
        <img v-if="select==item.content" src="@/assets/icons/jiantou.png" alt>
      </div>
    </div>
    <div class="line"></div>
    <h3>Preferred Date and Time</h3>
    <div class="date-time">
      <div>
        <div @click="pickStart">
          <input type="test" :value="startTime" placeholder="Start Date and time" disabled>
        </div>
        <!-- <DatePicker
          type="datetime"
          v-model="startTime"
          format="yyyy-MM-dd HH:mm"
          placeholder="Start date and time"
          style="border-radius:0;width: 100%"
          small
        ></DatePicker> -->
      </div>
      <div>
        <DatePicker
          type="datetime"
          v-model="endTime"
          format="yyyy-MM-dd HH:mm"
          placeholder="End date and time"
          style="border-radius:0;width: 100%;"
        ></DatePicker>
      </div>
    </div>
    <h3>Contact me before coming
      <van-switch v-model="checked" active-color="#41b886" size=".17rem"/>
    </h3>
    <template v-if="checked">
      <h3>Contact Details</h3>
      <input v-model="phone" class="Contact" type="text" placeholder="Phone number">
      <input v-model="email" class="Contact" type="text" placeholder="Email">
    </template>
    <h3 class="note">
      Note
      <span>(optional)</span>
    </h3>
    <textarea v-model="note"></textarea>
    <button class="conmmt-btn" @click="submit()">Submit</button>
  </div>
</template>
<script>
import { POST_Repair } from "@/api/repair";
import { GET_Property } from "@/api/login";
export default {
  data() {
    return {
      show: false,
      phone: "",
      email: "",
      startTime: "",
      endTime: "",
      facility: "",
      scaleList: [
        {
          content: "average"
        },
        {
          content: "urgent"
        },
        {
          content: "super urgent"
        }
      ],
      note: "",
      radio: "",
      checked: false,
      select: "average",
      PropertyData: []
    };
  },
  activated() {
    GET_Property().then(res => {
      this.PropertyData = res.data;
      this.radio = this.PropertyData[0].id;
    });
  },
  methods: {
    pickSucsses(value){
      alert(value)
    },
    pickStart(){
      this.show=!this.show
    },
    toList() {
      this.$store.commit("setListType", "Repair");
      this.$router.push({
        name: "RequestList"
      });
    },
    submit() {
      if (this.facility == "") {
        this.$toast(`Need to complete facility!`);
        return;
      }
      if (this.checked == true) {
        if (!this.phone || !this.email) {
          this.$toast(`Need to complete phone and email!`);
          return;
        }
        let reg = /^\d+$/;
        if (false == reg.test(this.phone)) {
          this.$toast("Wrong format of phone number!");
          return;
        }
        let regE = /^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/;
        if (false == regE.test(this.email)) {
          this.$toast("Wrong format of email!");
          return;
        }
      }
      let level = 0;
      switch (this.select) {
        case `average`:
          level = 0;
          break;
        case `urgent`:
          level = 1;
          break;
        case `super urgent`:
          level = 2;
          break;
      }
      let data = {
        property_id: this.radio,
        facility: this.facility,
        level,
        starttime: new Date(this.startTime)
          .toISOString()
          .replace("T", " ")
          .replace(/\..+$/, ""),
        endtime: new Date(this.endTime)
          .toISOString()
          .replace("T", " ")
          .replace(/\..+$/, ""),
        confirm: this.checked ? 1 : 0,
        phone: this.phone,
        email: this.email,
        note: this.note
      };
      POST_Repair(data).then(res => {
        this.$toast(res.data.msg);
        if (res.data.status == "ok") {
          this.$store.commit("setListType", "Repair");
          this.$router.push({
            name: "RequestList"
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
#reques {
  & /deep/ .van-radio__icon .van-icon {
    background-color: #fff;
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
  textarea {
    display: block;
    border: 1px solid #c8c8cc;
    resize: none;
    width: 100%;
    height: 0.85rem;
  }
  .Contact {
    border-bottom: 1px solid #c8c8cc;
    width: 100%;
    padding: 0.06rem 0.12rem;
    font-size: 0.15rem;
  }
  .date-time {
    & > div {
      & + div {
        margin-top: 0.1rem;
      }
    }
    font-size: 0.12rem;
  }
  .line {
    height: 0.02rem;
    width: 2.76rem;
    background-color: #c7c7c7;
    margin: 0 auto;
    z-index: -1;
  }
  .scale {
    color: #979797;
    display: flex;
    justify-content: space-between;
    font-size: 0.12rem;
    text-align: center;
    & > div {
      width: 26%;
      position: relative;
      height: 0.35rem;
      & > p:not(.active) {
        position: absolute;
        bottom: 0.01rem;
        left: 50%;
        transform: translateX(-50%);
        width: 0.01rem;
        height: 0.06rem;
        background-color: #c7c7c7;
        z-index: -1;
      }
      & > img {
        position: absolute;
        bottom: 0.01rem;
        left: 50%;
        transform: translate(-50%, 30%);
        z-index: 1;
        width: 0.18rem;
        height: 0.25rem;
        object-fit: initial;
      }
    }
  }
  .urgency-level {
    margin-top: 0.06rem;
  }
  .common-inp {
    width: 100%;
  }
  .van-nav-bar.van-hairline--bottom {
    margin: 0 -0.15rem;
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
  .select {
    line-height: initial;
    & /deep/ .van-radio__input {
      font-size: 0.2rem;
    }
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;
    & > div {
      padding: 0 0.1rem;
      margin-bottom: 0.3rem;
      display: flex;
      justify-content: space-between;
      flex-flow: row wrap;
      height: 0.93rem;
      align-items: center;
      width: 1.43rem;
      background: linear-gradient(to bottom right, #fff, #dfdfea);
      border-radius: 0.06rem;
      & > div:last-of-type {
        width: 100%;
        text-align: right;
      }
      img {
        width: 0.33rem;
        height: 0.33rem;
      }
    }
  }
}
</style>
