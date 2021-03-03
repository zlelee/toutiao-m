<template>
  <div class="search-suggestion">
    <van-cell :key="index" v-for="(suggestion,index) in suggestions" icon="search" @click="$emit('suggestion-click', suggestion)">
      <div slot="title" v-html="heilight(suggestion)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search.js'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler: debounce(function (value) {
        this.loadSuggestion(value)
      }, 200),
      immediate: true
    }
  },
  created () {},
  mounted () {},
  methods: {
    async loadSuggestion(q) {
      try {
        const { data } = await getSearchSuggestion(q)
        this.suggestions = data.data.options
      } catch (err) {
      }
    },
    heilight(text) {
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, `<span class="active">${this.searchText}</span>`)
    }
  }
}
</script>

<style scoped lang="less">
.search-suggestion {
  /deep/ .active{
    color: skyblue;
  }
}
</style>
