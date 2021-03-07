<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="黑马头条" v-show="isNavBarShow">
      <van-icon
        slot="left"
        name="arrow-left"
        @click="$router.back()"
      ></van-icon>
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="articleInfo.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleInfo.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleInfo.aut_photo"
            @click="previewImg"
          />
          <div slot="title" class="user-name">{{ articleInfo.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ articleInfo.pubdate | relativeTime }}
          </div>
          <follow-user
            :userId="articleInfo.aut_id"
            v-model="articleInfo.is_followed"
          />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="articleInfo.content"
          ref="contentRef"
        ></div>
        <van-divider>正文结束</van-divider>
        <article-comment
          :source="articleInfo.art_id"
          @update-comment_total="comment_total = $event.total_count"
          :list="commentList"
          @click-reply="onReplyClick"
        />
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
            >写评论</van-button
          >
          <van-icon name="comment-o" :badge="comment_total" color="#777" />
          <collect-article
            :collectId="articleInfo.art_id"
            v-model="articleInfo.is_collected"
          />
          <like-article
            :attitude.sync="articleInfo.attitude"
            :articleId="articleInfo.art_id"
          />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->

        <!-- 评论弹出层 -->
        <van-popup v-model="isPostShow" position="bottom">
          <comment-post
            :target="articleInfo.art_id"
            @add-comment="addComments"
          />
        </van-popup>
        <!-- /评论弹出层 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus == 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticleInfo"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->

      <!-- 回复评论弹出层 -->
      <van-popup v-model="isReplyShow" position="bottom" style="height: 100%">
        <comment-reply v-if="isReplyShow" @close="isReplyShow=false" :comment="commentInfo"/>
      </van-popup>
      <!-- /回复评论弹出层 -->
    </div>
  </div>
</template>

<script>
import { getArticleById } from '@/api/article-list'
import { addComment } from '@/api/comment'
import { ImagePreview } from 'vant'
import followUser from '@/components/follow-user'
import collectArticle from '@/components/collect-article'
import likeArticle from '@/components/like-article'
import articleComment from './components/article-comment'
import commentPost from './components/comment-post'
import CommentReply from './components/comment-reply'
export default {
  name: 'articleIndex',
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  provide: () => {
    return {
      articleId: this.articleInfo.art_id
    }
  },
  components: {
    followUser,
    collectArticle,
    likeArticle,
    articleComment,
    commentPost,
    CommentReply
  },
  data() {
    return {
      articleInfo: {},
      loading: true,
      errStatus: 0,
      followLoading: false,
      comment_total: 0,
      isPostShow: false,
      commentList: [],
      isReplyShow: false,
      isNavBarShow: true,
      commentInfo: null
    }
  },
  created() {
    this.loadArticleInfo()
  },
  methods: {
    async loadArticleInfo() {
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)
        this.articleInfo = data.data
        // 数据加载完成
        this.loading = false
        // setTimeout(() => {
        //   this.previewImg()
        // }, 10)
        this.$nextTick(() => {
          this.previewImg()
        })
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
      }
      this.loading = false
    },
    previewImg() {
      const contentEl = this.$refs.contentRef
      const allImg = contentEl.querySelectorAll('img')
      const images = []
      allImg.forEach((element, index) => {
        images.push(element.src)
        element.onclick = () => {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    async addComments(params) {
      try {
        const { data } = await addComment(params)
        this.commentList.unshift(data.data.new_obj)
        this.isPostShow = false
        this.$toast.success('评论成功')
      } catch (err) {
        this.$toast('评论失败')
      }
    },
    onReplyClick(comment) {
      this.commentInfo = comment
      this.isReplyShow = true
      this.isNavBarShow = false
    }
  }
}
</script>

<style lang="less" scoped>
@import './article.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }
    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 50px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
