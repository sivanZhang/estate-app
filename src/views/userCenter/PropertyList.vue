<template>
  <div id="propertyList">
    <van-nav-bar title="My Property" left-arrow @click-left="$router.go(-1)"/>
    <section v-for="(item,index) in propertyList" :key="index">
    {{item.room_number}} <span>{{item.building_name}}</span>
    </section>
  </div>
</template>

<script>
export default {
    computed:{
        propertyList(){
            return this.$store.state.Property;
        }
    }
};
</script>

<style lang="less" scoped>
#propertyList{
  section{
    display: flex;
    align-items: center;
    background-color: #ed8482;
    border-radius: .04rem;
    height: .48rem;
    margin: .2rem .15rem;
    padding: 0 .2rem;
    color: #fff;
    font-weight: 600;
    span{
      padding-left: .15rem;
    }
  }
}
</style>

