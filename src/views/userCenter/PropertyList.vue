<template>
  <div id="propertyList"  class="warp-pb">
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
    <section v-for="(item,index) in propertyList" :key="index">
      {{item.room_number}}
      <span>{{item.building_name}}</span>
    </section>
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
  }
};
</script>

<style lang="less" scoped>
#propertyList {
  section {
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
  }
}
</style>

