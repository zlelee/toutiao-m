<template>
  <div class="search-container">
    <!-- 搜索栏》事件监听 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-results v-if="isResultShow"/>
    <!-- 联想建议 -->
    <search-suggestion :search-text="searchText" v-else-if="searchText"/>
    <!-- 搜索历史 -->
    <search-history v-else/>
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
      searchText: '',
      isResultShow: false
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResults
  },
  methods: {
    onSearch(val) {
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  .van-search__action {
    color: #fff;
  }
  .van-search__action:active {
    background-color: transparent;
  }
}
</style>
