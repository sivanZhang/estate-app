<template>
  <header class="container">
  <img @click="search" src="@/assets/icons/search.png" alt>
  <input @keydown.enter="search" :value="value" @input="$emit('enterKeywords',$event.target.value)" type="serch" placeholder="search">
  </header>
</template>

<script>
  export default {
    name: "search",
    data() {
      return {};
    },
    props: {
      value: String
    },
    model:{
      prop:'value',
      event:'enterKeywords'
    },
    methods: {
      search() {
        console.log('触发')
        this.$emit("onSearch");
      }
    }
  };
</script>

<style lang="less" scoped>
  header {
    display: flex;
    justify-content: space-between;
    margin-top: 0.08rem;
    align-items: center;

    img {
      width: 0.2rem;
      height: 0.2rem;
    }

    input {
      flex: 1 1 auto;
      margin-left: 0.23rem;
      height: 0.36rem;
      line-height: 0.36rem;
    }
  }
</style>