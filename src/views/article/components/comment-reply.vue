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
    <article-comment type="c" :source="comment.com_id" />
    <!-- /评论的回复列表 -->

    <!-- 回复评论 -->
    <div class="post-wrap">
      <van-button class="post-btn" size="small" round @click="isPostShow=true">写评论</van-button>
    </div>
    <!-- /回复评论 -->
      <!-- 评论弹出层 -->
        <van-popup v-model="isPostShow" position="bottom">
          <comment-post
            :target="comment.com_id"
          />
        </van-popup>
        <!-- /评论弹出层 -->
  </div>
</template>

<script>
import commentItem from './comment-item'
import articleComment from './article-comment'
import commentPost from './comment-post'
export default {
  name: 'CommentReply',
  components: {
    commentItem,
    articleComment,
    commentPost
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isPostShow: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.scroll-wrap {
  position: fixed;
  top: 92px;
  right: 0;
  bottom: 88px;
  left: 0;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>
