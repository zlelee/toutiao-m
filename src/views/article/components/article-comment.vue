<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :immediate-check="false"
    @load="onLoad"
  >
  <!-- immediate-check 是否在初始化时立即执行滚动位置检查 -->
    <comment-item
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
      @click-reply="$emit('click-reply',$event)"
    />
  </van-list>
</template>

<script>
import commentItem from './comment-item'
import { getComments } from '@/api/comment'
export default {
  name: 'articleComment',
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      validator: (val) => {
        return ['a', 'c'].includes(val)
      },
      default: 'a'
    }
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  created() {
    this.loading = true
    this.onLoad()
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getComments({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })
        console.log(data)
        const { results } = data.data
        this.$emit('update-comment_total', data.data)
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.$toast('获取评论失败')
      }
    }
  },
  components: {
    commentItem
  }
}
</script>

<style lang="less" scoped></style>
