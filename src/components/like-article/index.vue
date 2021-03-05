<template>
  <van-icon
  :color="attitude===1? 'red':''"
   :name="attitude===1? 'good-job':'good-job-o'"
   :loading="isloading"
  />
</template>

<script>
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

  }
}
</script>

<style lang='less' scoped>

</style>
