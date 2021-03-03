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
    <search-results :search-text="searchText" v-if="isResultShow" />
    <!-- 联想建议 -->
    <search-suggestion
      @suggestion-click="onSearch"
      :search-text="searchText"
      v-else-if="searchText"
    />
    <!-- 搜索历史 -->
    <search-history :searchHistories="searchHistories" v-else />
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
      isResultShow: false,
      searchHistories: []
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResults
  },
  methods: {
    onSearch(val) {
      // 重新赋值
      this.searchText = val
      // 显示搜索结果
      this.isResultShow = true
      // 添加历史记录
      // 先判断有没有重复的
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
    },
    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-search__action {
    color: #fff;
  }
  .van-search__action {
    color: #fff;
  }
  .van-search__action:active {
    background-color: transparent;
  }
}
</style>
