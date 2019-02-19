<template>
<div id="ViewNews">

</div>
</template>

<script>
  import { GET_News } from "@/api/notice"
  export default {
    data() {
      return {
        newsDetailData: {},
      }
    },
    created() {
      let params = {
        id : this.$route.params.query,
      }
      GET_News(params).then(res => {
        this.newsDetailData = { ...res.data.msg };
      })
    }
  }
</script>

<style lang="less" scoped>
#ViewNews{}
</style>