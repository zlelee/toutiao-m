<template>
  <div class="search-container">
    <!-- 搜索栏》事件监听 -->
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: 'Search',

  data () {
    return {
      value: ''
    }
  },

  methods: {
    onSearch (val) {
      this.$toast(val)
    },
    onCancel () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang='less' scoped>

</style>
