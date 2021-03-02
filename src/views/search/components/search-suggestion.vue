<template>
  <div class="search-suggestion">
    <van-cell :key="index" v-for="(suggestion,index) in suggestions" :title="suggestion" icon="search"></van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search.js'
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
      handler(value) {
        this.loadSuggestion(value)
      },
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
    }
  }
}
</script>

<style scoped lang="less"></style>
