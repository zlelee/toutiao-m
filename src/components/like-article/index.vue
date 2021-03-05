<template>
  <van-icon
  :color="attitude===1? 'red':''"
   :name="attitude===1? 'good-job':'good-job-o'"
   @click="onLike"
   :loading="isloading"
  />
</template>

<script>
import { addLike, deleteLike } from '@/api/article-list'
export default {
  name: 'likeArticle',
  props: {
    attitude: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      isloading: false
    }
  },
  methods: {
    async onLike() {
      this.isloading = true
      try {
        if (this.attitude === 1) {
          // 取消点赞
          await deleteLike(this.articleId)
          this.$emit('update:attitude', -1)
          this.$toast.success('取消点赞')
        } else {
          // 点赞文章
          await addLike(this.articleId)
          this.$emit('update:attitude', 1)
          this.$toast.success('点赞成功')
        }
      } catch (err) {
        this.$toast('操作失败,请重试')
      }
      this.isloading = false
    }
  }
}
</script>

<style lang='less' scoped>

</style>
