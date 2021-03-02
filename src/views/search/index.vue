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
    <!-- 搜索历史 -->
    <search-history />
    <!-- 联想建议 -->
    <search-suggestion />
    <!-- 搜索结果 -->
    <search-results />
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResults from './components/search-results'
export default {
  name: 'Search',

  data() {
    return {
      value: ''
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResults
  },
  methods: {
    onSearch(val) {
      this.$toast(val)
    },
    onCancel() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped></style>
