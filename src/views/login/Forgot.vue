<template>
  <div id="forgot">
    <van-nav-bar title="Reset Password" left-arrow @click-left="$router.go(-1)" fixed :border="false" />
    <div class="logo"></div>
    <h2>Need help with your password?</h2>
    <p>Enter the Email you use for Estrata, and you will receive a verfication code from us.</p>
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
</template>

<script>
  import SecurityCode from "vue-security-code";
  import { GET_Password } from "@/api/login";
  export default {
    components: { SecurityCode },
    methods: {
      verify() {
        GET_Password(`${this.email}/${this.code}`).then(res => {
          if (res.data.status == "ok") {
            this.$toast(res.data.msg);
            this.active = 2;
          } else {
            this.$toast.fail(res.data.msg);
          }
        });
      },
      resete() {
        let data = {
          email: this.email,
          password: this.password,
          code: this.code,
        }
        SET_Password(data).then(res => {
          if (res.data.status == "ok") {
            this.$toast(res.data.msg);
            this.$router.push('/login');
          } else {
            this.$toast.fail(res.data.msg);
          }
        });
      },
      next() {
        GET_Password(this.email).then(res => {
          if (res.data.status == "ok") {
            this.$toast(res.data.msg);
            this.active = 1;
          } else {
            this.$toast.fail(res.data.msg);
          }
        });
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