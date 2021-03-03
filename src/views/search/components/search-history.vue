<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="clearAll">全部删除</span>
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDeleteShow = true"/>
    </van-cell>
    <van-cell
      v-for="(item, index) in searchHistories"
      :key="index"
      :title="item"
      @click="onSearchHistoriesClcik(item, index)"
    >
      <van-icon name="close" v-show="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDeleteShow: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSearchHistoriesClcik(item, index) {
      if (this.isDeleteShow) {
        // 删除
        this.searchHistories.splice(index, 1)
      } else {
        // 搜索
        this.$emit('on-search', item)
      }
    },
    clearAll() {
      this.searchHistories.splice(0)
    }
  }
}
</script>

<style scoped lang="less"></style>
