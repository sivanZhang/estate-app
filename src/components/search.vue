<template>
  <header class="container">
    <img @click="search" src="@/assets/icons/search.png" alt>
    <input
      @keydown.enter="search"
      :value="value"
      @input="$emit('enterKeywords',$event.target.value)"
      type="serch"
      :placeholder="searchText"
    >
  </header>
</template>

<script>
export default {
  name: "search",
  props: {
    value: String,
    searchText:{
      default:'search',
    }
  },
  model: {
    prop: "value",
    event: "enterKeywords"
  },
  methods: {
    search() {
      this.$emit("onSearch");
    }
  }
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #c8c8cc;
  height: .52rem;
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