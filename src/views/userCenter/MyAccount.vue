<template>
  <div id="MyAccount">
    <van-nav-bar title="My Account" left-arrow @click-left="$router.go(-1)"/>
    <div class="card">
      <img src="@/assets/image/touxiang.png" alt>
      <div class="main-nav">
        <div @click="$router.push('/userCenter/property-list')">My
          <div>Property</div>
          <van-icon name="arrow"/>
        </div>
        <div>My
          <div>Vehicle</div>
          <van-icon name="arrow"/>
        </div>
        <div>My
          <div>Information</div>
          <van-icon name="arrow"/>
        </div>
      </div>
    </div>
    <section @click="$router.push('/requestList')">
      <div>
        <img class="icon" src="@/assets/icons/request.png" alt>
        My Requests
      </div>
      <div>
        <van-icon name="arrow"/>
      </div>
    </section>
    <section>
      <div>
        <img class="icon" src="@/assets/icons/post.png" alt>
        My post
      </div>
      <div>
        <van-icon name="arrow"/>
      </div>
    </section>
    <section @click="$router.push('/notifications')">
      <div>
        <img class="icon" src="@/assets/icons/notify.png" alt>
        Notifications
      </div>
      <div>
        <template v-if="noticeData.length>0">
          <Badge class-name="badge" overflow-count="9" :count="noticeData.length"></Badge>
        </template>
        <van-icon name="arrow"/>
      </div>
    </section>
    <section>
      <div>
        <img class="icon" src="@/assets/icons/chatbox.png" alt>
        Chatbox
      </div>
      <div>
        <van-icon name="arrow"/>
      </div>
    </section>
    <section @click="$router.push('/userCenter/settings')">
      <div>
        <img class="icon" src="@/assets/icons/setting.png" alt>
        Setting
      </div>
      <div>
        <van-icon name="arrow"/>
      </div>
    </section>
  </div>
</template>

<script>
import { GET_Notice } from "@/api/notice";
export default {
  data() {
    return {
      noticeData: []
    };
  },
  created() {
    GET_Notice()
      .then(res => {
        this.noticeData = res.data.msg;
      })
      .catch(err => {});
  }
};
</script>

<style lang="less" scoped>
#MyAccount {
  .badge {
    background-color: #e60000 !important;
    font-size: 0.12rem !important;
  }
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
    }
  }

  .card {
    img {
      width: 0.76rem;
      height: 0.76rem;
      border-radius: 50%;
      margin-top: 0.11rem;
    }
    .main-nav {
      padding-bottom: 0.15rem;
      display: flex;
      justify-content: space-between;
      color: #fff;
      margin: 0.22rem 0.15rem 0;
      & > div {
        width: 0.95rem;
        padding: 0.08rem 0;
        border-radius: 0.04rem;
        font-size: 0.13rem;
      }
      & > div:nth-child(1) {
        background-color: #f5a2a0;
      }
      & > div:nth-child(2) {
        background-color: #71d6ac;
      }
      & > div:nth-child(3) {
        background-color: #7db8fd;
      }
    }
    border-radius: 0.04rem;
    background: linear-gradient(to bottom, #efeff4, white);
    text-align: center;
    margin: 0.2rem 0.15rem 0.15rem;
    box-shadow: 0 0 0.08rem 0.02rem rgba(200, 200, 204, 0.8);
  }
}
</style>

