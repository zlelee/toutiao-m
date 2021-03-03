<template>
  <div class="article-item">
    <!-- cell 单元格 -->
    <van-cell class="article-container" :to="{
      name: 'article',
      params: {
        articleId: article.art_id
      }
    }">
      <!-- 文章标题 -->
      <div slot="title">{{ article.title }}</div>

      <!-- 详情 -->
      <div slot="label" class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>

      <!-- 封面图片只有一张 -->
      <van-image
        class="right-cover"
        v-if="article.cover.type === 1"
        slot="default"
        :src="article.cover.images[0]"
      >
      </van-image>

      <!-- 封面图片有三张 -->
      <div v-if="article.cover.type === 3" slot="label" class="cover-wrap">
        <div
          v-for="(item, i) in article.cover.images"
          :key="i"
          class="cover-item"
        >
          <van-image :src="item" class="cover-item-img"></van-image>
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'articleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }

  .right-cover {
    width: 232px;
    height: 146px;
  }

  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }

  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
