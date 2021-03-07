<template>
  <van-picker
    title="性别"
    show-toolbar
    :columns="columns"
    @cancel="$emit('close')"
    :default-index="value"
    @confirm="onConfirm"
  />
</template>

<script>
import { updateUser } from '@/api/user'
export default {
  name: '',
  props: {
    value: {
      type: [Number],
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女']
    }
  },

  methods: {
    async onConfirm(val, index) {
      this.$toast.loading({
        message: '更新中...',
        duration: 0,
        forbidClick: true
      })
      try {
        await updateUser({
          gender: index
        })
        this.$emit('update-gender', index)
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
