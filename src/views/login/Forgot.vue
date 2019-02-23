<template>
  <div id="forgot">
    <van-nav-bar
      title="Reset Password"
      left-arrow
      @click-left="$router.go(-1)"
      fixed
      :border="false"
    />
    <div class="logo"></div>
    <h3>Need help with your password?</h3>
    <p>Enter the Email you use for Estrata, and you will receive a verfication code from us.</p>
    <van-steps :active="active" class="container" active-color="#fad87b">
      <van-step>Email</van-step>
      <van-step>Code</van-step>
      <van-step>NewPassword</van-step>
    </van-steps>
    <div class="form">
      <template v-if="active==0">
        <input v-model="email" type="text" class="common-inp">
        <button @click="next" class="conmmt-btn">Next</button>
      </template>
      <template v-if="active==1">
        <input v-model="code" type="text" class="common-inp" placeholder="Code">
        <button @click="verify" class="conmmt-btn">Verify</button>
      </template>
      <template v-if="active==2">
        <input v-model="password" type="text" class="common-inp" placeholder="New Password">
        <button @click="reset" class="conmmt-btn">Reset</button>
      </template>
    </div>
  </div>
</template>

<script>
import SecurityCode from "vue-security-code";
import { GET_Password, SET_Password } from "@/api/login";
export default {
  components: { SecurityCode },
  methods: {
    verify() {
      const rex = /\d{4}/;
      if (rex.test(this.code)) {
        GET_Password(`${this.email}/${this.code}`).then(res => {
          if (res.data.status == "ok") {
            this.$toast(res.data.msg);
            this.active = 2;
          } else {
            this.$toast.fail(res.data.msg);
          }
        });
      } else {
        this.$notify("Code error!");
      }
    },
    reset() {
      let data = {
        email: this.email,
        password: this.password,
        code: this.code
      };
      SET_Password(data).then(res => {
        if (res.data.status == "ok") {
          this.$toast(res.data.msg);
          this.$router.push("/login");
        } else {
          this.$toast.fail(res.data.msg);
        }
      });
    },
    next() {
      const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (pattern.test(this.email)) {
        GET_Password(this.email).then(res => {
          if (res.data.status == "ok") {
            this.$toast(res.data.msg);
            this.active = 1;
          } else {
            this.$toast.fail(res.data.msg);
          }
        });
      } else {
        this.$notify("Mailbox format error!");
      }
    }
  },
  data() {
    return {
      code: "",
      email: "",
      isSend: false,
      active: 0
    };
  }
};
</script>

<style lang="less" scoped>
@import "./Forgot.less";
</style>