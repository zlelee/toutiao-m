<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(article,index) in list" :key="index" :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        // 1. 请求获取数据
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText
        })
        const { results } = data.data
        // 2. 往数组里面追加数据
        this.list.push(...results)
        // 3. 将loading设置为false
        this.loading = false
        // 4. 判断数据是否加载完毕
        if (results.length) {
          // (1). 没加载完就更新页码
          this.page++
        } else {
          // (2). 加载完了就将finished设为true
          this.finished = true
        }
      } catch (err) {
        this.$toast('加载失败,请稍后再试')
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
