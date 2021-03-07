<template>
  <div class="update-photo">
    <div>
      <img :src="value" />
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    value: {
      type: [String, Object],
      required: true
    }
  },
  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="less" scoped></style>
