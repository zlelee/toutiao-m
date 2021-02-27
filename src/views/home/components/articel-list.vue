<template>
  <div>
    组件{{channel}}
  </div>
</template>

<script>
export default {
  name: 'articleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style lang='less' scoped>

</style>
