<template>
  <div class="update-name">
     <van-nav-bar title="修改昵称" left-text="取消" right-text="完成" @click-left="$emit('close')"></van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'UpdateName',

  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style lang='less' scoped>

</style>
