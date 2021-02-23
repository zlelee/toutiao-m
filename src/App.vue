<template>
  <div id="app">
    <i class="toutiao toutiao-shipin"></i>
    <router-view />
    <van-button type="primary">主要按钮</van-button>
    <div class="box"></div>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="less">
.box {
  width: 750px;
  height: 64px;
  background: pink;
}
</style>
