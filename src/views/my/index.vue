<template>
  <div>
     <div class="my-container">
        <div class="header">
          <img
            class="mobile-img"
            src="~@/assets/mobile.png"
            @click="$router.push({
              name: 'login',
              query: {
                redirect: '/my'
              }
            })"
          >
        </div>
        <div class="grid-nav"></div>
        <van-cell title="消息通知" is-link url="" />
        <van-cell title="实名认证" is-link url="" />
        <van-cell title="用户反馈" is-link url="" />
        <van-cell title="小智同学" is-link url="" />
        <van-cell title="系统设置" is-link url="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'My',

  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style lang='less' scoped>
.my-container {
  > .header {
    height: 361px;
    background: url("~@/assets/banner.png") no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .mobile-img {
      width: 132px;
      height: 132px;
    }
  }
}
</style>
