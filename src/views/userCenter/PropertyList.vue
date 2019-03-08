<template>
<div id="propertyList" v-hammer:swipe.left="onSwipeLeft" class="warp-pb">
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
    <van-nav-bar title="My Property" left-arrow @click-left="$router.go(-1)"/>
    <!-- <section v-for="(item,index) in propertyList" :key="index">
      {{item.room_number}}
      <span>{{item.building_name}}</span>
    </section> -->


    <template v-if="propertyList.length>1">
        <div class="select container">
          <div v-for="(item,index) in propertyList" :key="index">
            <img src="@/assets/icons/house.png" alt>
            <div>
              <p>{{item.building_name}}</p>
              <p>{{item.room_number}}</p>
            </div>
          </div>
        </div>
    </template>
  </div>
</template>

<script>
import { GET_Property } from "@/api/login";
export default {
  data() {
    return {
      propertyList: []
    };
  },
  created(){
    GET_Property().then(res => {
      this.propertyList = res.data;
    });
  },
  methods:{
    onSwipeLeft(){
        this.$router.go(-1);
      },
  }
};
</script>

<style lang="less" scoped>
#propertyList {
  /* section {
    display: flex;
    align-items: center;
    background-color: #ed8482;
    border-radius: 0.04rem;
    height: 0.48rem;
    margin: 0.2rem 0.15rem;
    padding: 0 0.2rem;
    color: #fff;
    font-weight: 600;
    span {
      padding-left: 0.15rem;
    }
  } */
  .select {
    line-height: initial;
    margin-top: .3rem;
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
      height: 0.6rem;
      align-items: center;
      width: 1.43rem;
      background: linear-gradient(to bottom right, #fff, #dfdfea);
      border-radius: 0.06rem;
      & > div:last-of-type {
        flex: 1 1 auto;
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

