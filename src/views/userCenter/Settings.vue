<template>
  <div id="setting">
    <van-nav-bar title="Settings" left-arrow @click-left="$router.go(-1)"/>
    <section @click="LogOut">
      <div>Log out</div>
      <div>
        <img class="icon" src="@/assets/icons/logout.svg" alt>
      </div>
    </section>
  </div>
</template>

<script>
export default {
    methods:{
        LogOut(){
            this.$store.commit("setToken", ``);
            this.$toast('Logged out');
            this.$router.push('/home');
        }
    }
};
</script>

<style lang="less" scoped>
#setting {
  section {
    padding: 0 0.2rem;
    height: 0.6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #c8c8cc;
    & > div:nth-child(1) {
      font-weight: bold;
      .icon {
        max-width: 0.3rem;
        height: auto;
        display: inline-block;
        margin-right: 0.18rem;
      }
    }
    & > div:nth-child(2) {
      color: #c8c8cc;
      display: flex;
      align-items: center;
      .icon {
        max-width: 0.3rem;
        height: auto;
      }
    }
  }
}
</style>
