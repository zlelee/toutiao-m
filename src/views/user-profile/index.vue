<template>
  <div class="user-profile">
    <van-nav-bar title="个人信息" class="page-nav-bar" left-arrow @click-left="$router.back()"></van-nav-bar>
     <van-cell title="头像" is-link>
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="user.photo"
      />
    </van-cell>
    <van-cell title="昵称" :value="user.name" is-link />
    <van-cell title="性别" :value="user.gender===0?'男':'女'" is-link />
    <van-cell title="生日" :value="user.birthday" is-link />
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
export default {
  name: 'UserProfile',

  data () {
    return {
      user: {}
    }
  },
  created() {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
}
</style>
