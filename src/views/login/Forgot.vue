<template>
  <div id="forgot">
    <van-nav-bar title="Reset Password" left-arrow @click-left="$router.go(-1)" fixed :border="false" />
    <div class="logo"></div>
    <h2>Need help with your password?</h2>
    <p>Enter the phone number you use for Estrata, and you will receive a verfication code from us.</p>
    <input type="text" class="common-inp">
    <button @click="next" class="conmmt-btn">Next</button>
    <div class="model" v-show="isShow">
      <div>
        <header>
          <van-icon @click="isShow=!isShow" size=".15rem" name="cross" />
        </header>
        <h3>Please enter into the verification code</h3>
        <p>The verification code has been sent to your mobile phone.</p>
        <security-code theme="line" placeholder="" v-model="code"></security-code>
        <div class="sec">{{`30s`}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import SecurityCode from "vue-security-code";
  export default {
    components: { SecurityCode },
    methods: {
      next() {
        this.isShow = true;
      }
    },
    data() {
      return {
        isShow: false,
        code: ""
      };
    }
  };
</script>

<style lang="less" scoped>
  @import "./Forgot.less";
</style>