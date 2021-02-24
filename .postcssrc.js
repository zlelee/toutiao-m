module.exports = {
  plugins: {
    // vue Cli 已经帮我们配置好了,所以不用配置,再配置一次会警告
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },

    'postcss-pxtorem': {
      // rootValue: 37.5,
      rootValue ({ file }) {
        return file.includes('vant') ? 37.5 : 75
      },
      // 代表作用于所有的 CSS 属性
      propList: ['*']
    }
  }
}
