<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell
      v-for="(item, index) in list"
      :key="index"
      :title="item.content"
    />
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment'
export default {
  name: 'articleComment',
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },

  methods: {
    async onLoad() {
      try {
        const { data } = await getComments({
          type: 'a',
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })
        const results = data.data.results
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
