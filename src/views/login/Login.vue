<template>
  <div id="login">
    <div class="logo">
      <img src="@/assets/image/touxiang.png" alt="">
    </div>
    <div class="input-container">
      <input type="input" id="input" v-model="PhoneNumber" placeholder="Phone Number">
      <label for="input">Phone Number</label>
      <div class="bottom-line"></div>
    </div>
    <div class="input-container">
      <input type="password" id="input2" v-model="Password" placeholder="Password">
      <label for="input2">Password</label>
      <div class="bottom-line"></div>
    </div>
    <div class="links">
      <router-link to="/login/forgot">Reset My Password</router-link>
    </div>
    <Button :loading="isloding" class="sunbmit common-btn" @click.passive="submit" :disabled="isDisabled" ghost>Log In</Button>
  </div>
</template>

<script>
  import { POST_LOGIN } from "@/api/login";
  export default {
    data() {
      return {
        PhoneNumber: "",
        Password: "",
        isloding: false,
      };
    },
    computed: {
      isDisabled() {
        if (this.PhoneNumber || this.Password) {
          return false;
        } else {
          return true;
        }
      }
    },
    methods: {
      submit() {
        let reg = /^\d+$/;
        if (false == reg.test(this.PhoneNumber)) {
          this.$toast('Wrong format of phone number!');
          return
        }
        let data = {
          phone: this.PhoneNumber,
          password: this.Password
          // phone: '13032985685',
          // password: '123456',
        };
        this.isloding = true;
        POST_LOGIN(data)
          .then(res => {
            this.loading = false;
            if (res.data.status == "ok") {
              this.isloding = false;
              this.$toast(res.data.msg);
              this.$store.commit("setToken", `JWT ${res.data.token}`);
              this.$store.commit("setUserId", res.data.id);
              /* this.$store.commit("setUserName", res.data.username);
              this.$store.commit("setPortrait", res.data.portrait); */
              let redirect = decodeURIComponent(
                this.$route.query.redirect || "/"
              );
              this.$router.replace({
                path: redirect
              });
            } else if (res.data.status == "error") {
              this.$toast(res.data.msg);
              this.isloding = false;
            }
          })
          .catch(error => { this.isloding = false; });
      }
    },
  };
</script>

<style lang="less" scoped>
  @width: 3rem;
  @label-font-color: #c8c8cc;
  @label-focus-font-color: #fab701;
  @border-bottom-color: #c8c8cc;
  @focus-border-color: #fad87b;
  @transform-top: 10px;
  @transform-time: 0.3s;
  @scale: 0.9;

  .input-container {
    width: @width;
    height: .39rem;/* border特效 */
    position: relative;
    display: flex;
    -webkit-box-orient: vertical;
    flex-flow: column-reverse;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    margin: 0 auto;
    justify-content: center;
    &+.input-container{
      margin-top: .06rem;
    }
  }

  .input-container input {
    -webkit-box-ordinal-group: 11;
    order: 10;
    -ms-flex-order: 10;
    outline: none;
    border: none;
    width: 100%;
    padding: .1rem 0 .06rem;
    font-size: 0.14rem;
    border-bottom: .01rem solid @border-bottom-color;
    text-indent: .1rem;
  }

  .input-container input::-moz-placeholder {
    opacity: 0;
  }

  .input-container input::-webkit-input-placeholder {
    opacity: 0;
  }

  .input-container input:-ms-input-placeholder {
    opacity: 0;
  }

  .input-container input,
  .input-container label {
    transition: all @transform-time;
  }

  .input-container label {
    -webkit-box-ordinal-group: 101;
    -ms-flex-order: 100;
    order: 100;
    color: @label-font-color;
    -webkit-transform-origin: left bottom;
    transform-origin: left bottom;
    transform: translate(0px, .33rem);
  }

  .input-container .bottom-line {
    order: 2;
    width: 0;
    height: .02rem;
    background: @focus-border-color;
    transition: all @transform-time;
  }

  .input-container input:focus {
    border-bottom-color: @border-bottom-color;
  }

  .input-container input:focus~div.bottom-line {
    width: 100%;
    height: .02rem;
    order: 2;
  }

  .input-container input:focus+label,
  .input-container input:not(:placeholder-shown)+label {
    color: @label-focus-font-color;
    transform: translate(.1rem, .12rem) scale(@scale);
  }

  #login {
    padding-bottom: .7rem;

    .logo {
      margin: 1.56rem auto 1rem;
      text-align: center;

      img {
        height: 1.3rem;
        width: 1.3rem;
        border-radius: 50%;
        background-color: #d8d8d8;
        border: 1px solid @border-bottom-color;
      }
    }

    .sunbmit {
      position: fixed;
      bottom: 0;
      width: 100%;
      background-color: @focus-border-color;
      font-size: 0.15rem;
      height: 0.7rem;
      line-height: 0.7rem;
      padding: 0;
      color: #222329;
      border-radius: 0;
    }

    .links {
      margin-top: 0.17rem;
      text-align: center;
      color: #fab701;
      font-size: 0.14rem;

      span {
        padding: 0 .06rem;
      }
    }
  }
</style>