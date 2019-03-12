<template>
    <div class="subnav">
      <div v-for="(item,index) in menuList" :key="`nav${index}`" @click="change(item.name)">
        <img :src="activeKey==item.name?item.activeSrc:item.src">
        <p :class="{active:activeKey==item.name}" v-text="item.name"></p>
      </div>
    </div>
</template>

<script>
export default {
    props:{
        menuList:Array,
        activeKey:String,
    },
    methods:{
        change(name){
            this.$emit('tapChange',name)
        }
    }
}
</script>

<style lang="less" scoped>
.subnav {
      height: 0.71rem;
      line-height: 1;
      display: flex;
      justify-content: space-around;
      box-shadow: 0 0.03rem 0.03rem rgba(200, 200, 204, 0.8);
      align-items: baseline;
      padding-top: 0.12rem;
      div {
        text-align: center;
        font-size: 0.1rem;

        p {
          text-align: center;

          &.active {
            color: #fab701;
          }
        }

        img {
          display: inline-block;
          height: 0.25rem;
          width: auto;
          margin-bottom: 0.04rem;
          object-fit: initial;
        }
      }
    }
</style>

