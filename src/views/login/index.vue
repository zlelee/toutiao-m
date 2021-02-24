<template>
  <div class="login-container">
    <van-nav-bar title="登录" class="page-nav-bar" />
    <van-form @submit="onSubmit">
      <van-field
        name="用户名"
        placeholder="请输入手机号"
        v-model="user.mobile"
        clearable
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="验证码"
        placeholder="请输入验证码"
        type="number"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-button class="send-sms-btn" round size="small" type="default"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user.js'
export default {
  name: 'login',

  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },

  methods: {
    async onSubmit () {
      const user = this.user
      try {
        const res = await login(user)
        console.log('登陆成功', res)
      } catch (err) {
        if (err.response.stats === 400) {
          console.log('手机号或验证码错误')
        } else {
          console.log('登录失败')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
