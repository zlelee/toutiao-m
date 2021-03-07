<template>
  <div class="update-name">
     <van-nav-bar title="修改昵称"
        left-text="取消"
        right-text="完成"
        @click-left="$emit('close')"
        @click-right="onConfirm"
     ></van-nav-bar>
     <div style="padding: 10px;">
      <van-field
        v-model.trim="localName"
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
import { updateUser } from '@/api/user'
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
      localName: this.value
    }
  },

  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '更新中...',
        duration: 0,
        forbidClick: true
      })
      try {
        if (!this.localName.length) {
          this.$toast('用户昵称不能为空')
        }
        await updateUser({
          name: this.localName
        })
        this.$emit('update-user_name', this.localName)
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新昵称失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>

</style>
