<template>
  <div class="update-birthdy">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUser } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
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
        const newDay = dayjs(this.currentDate).format('YYYY-MM-DD')
        await updateUser({
          birthday: newDay
        })
        this.$emit('input', newDay)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新昵称失败')
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
