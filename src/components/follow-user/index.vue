<template>
  <van-button
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    v-if="!isFollowed"
    size="small"
    icon="plus"
    :loading="isFollowLoading"
    @click="FollowClick"
  >关注</van-button>
  <van-button
    v-else
    class="follow-btn"
    round
    :loading="isFollowLoading"
    size="small"
    @click="FollowClick"
  >已关注</van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'follow-user',
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      isFollowLoading: false
    }
  },

  methods: {
    async FollowClick() {
      this.followLoading = true
      try {
        if (this.isFollowed) {
          await deleteFollow(this.userId)
        } else {
          await addFollow(this.userId)
        }
        this.$emit('update-follow', !this.isFollowed)
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.$toast('不能关注你自己')
        }
        this.$toast('操作失败')
      }
      this.followLoading = false
    }
  }
}
</script>

<style lang='less' scoped>

</style>
