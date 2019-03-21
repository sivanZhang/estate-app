<template>
  <button @click="$router.push('/home')">
    <Icon type="md-home" slot="right" />
  </button>
</template>

<script>
  export default {
    name: "goHome",
  };
</script>

<style lang="less" scoped>
  button {
    position: fixed;
    right: .15rem;
    bottom: .28rem;
    width: .4rem;
    height: .4rem;
    z-index: 1000;
    color: #fab701;
    border:1px solid #fab701;
    font-size: .28rem;
    background-color: #fff;
    border-radius:50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>