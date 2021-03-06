<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar
      :title="
        `${comment.reply_count ? comment.reply_count + '条回复' : '暂无回复'}`
      "
    >
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 当前评论项 -->
    <comment-item :comment="comment" />
    <!-- /当前评论项 -->

    <van-cell title="所有回复" />

    <!-- 评论的回复列表 -->
    <!-- /评论的回复列表 -->

    <!-- 底部 -->
    <!-- /底部 -->
  </div>
</template>

<script>
import commentItem from './comment-item'
export default {
  name: 'CommentReply',
  components: {
    commentItem
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped></style>
