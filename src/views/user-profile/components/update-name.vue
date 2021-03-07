<template>
  <div class="update-name">
     <van-nav-bar title="修改昵称" left-text="取消" right-text="完成" @click-left="$emit('close')"></van-nav-bar>
     <div style="padding: 10px;">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入新昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UpdateName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      message: this.value
    }
  },

  methods: {}
}
</script>

<style lang='less' scoped>

</style>
