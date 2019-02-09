<template>
  <header class="container">
    <img @click="search" src="@/assets/icons/search.png" alt>
    <input @keypress="search" v-model="value" type="serch" placeholder="search">
  </header>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      value: ""
    };
  },
  methods: {
    search() {
      let val = this.value;
      this.$emit("onSearch", val);
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

