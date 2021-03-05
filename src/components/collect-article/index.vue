<template>
  <van-icon
    :color="value ? '#ffa500' : ''"
    :name="value ? 'star' : 'star-o'"
    :loading="isloading"
  />
</template>

<script>
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

  methods: {}
}
</script>

<style lang="less" scoped></style>
