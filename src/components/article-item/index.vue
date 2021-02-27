<template>
  <div>
  <van-cell>
    <div slot="title">{{article.title}}</div>
    <div slot="label">
      <span>{{article.aut_name}}</span>
      <span>{{ article.comm_count }}评论</span>
      <span>{{ article.pubdate }}</span>
    </div>
    <van-image v-if="article.cover.type===1" slot="default" :src="article.cover.images[0]">
    </van-image>
    <div v-if="article.cover.type===3" slot="label" class="coverWrap">
     <div v-for="(item,i) in article.cover.images" :key="i">
       <van-image :src="item" width="100" height="100"></van-image>
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
  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style lang='less' scoped>

</style>
