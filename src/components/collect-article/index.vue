<template>
  <van-icon
    :color="value ? '#ffa500' : ''"
    :name="value ? 'star' : 'star-o'"
    @click="onCollect"
    :loading="isloading"
  />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article-list'
export default {
  name: 'collectArticle',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    collectId: {
      type: [Number, Object, String],
      required: true
    }
  },
  data() {
    return {
      isloading: false
    }
  },

  methods: {
    async onCollect() {
      this.isloading = true
      try {
        if (this.value) {
          // 取消收藏
          await deleteCollect(this.collectId)
          this.$emit('input', false)
          this.$toast.success('取消收藏')
        } else {
          // 收藏文章
          await addCollect(this.collectId)
          this.$emit('input', true)
          this.$toast.success('收藏成功')
        }
      } catch (err) {
        console.log(err)
      }
      this.isloading = false
    }
  }
}
</script>

<style lang="less" scoped></style>
