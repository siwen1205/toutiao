<template>
  <div class="channel-select">
    <!-- v-model="value"
             === 等于以下写法叠加 ===
     :value="value"
     @input="value = 事件参数" -->
    <el-select placeholder="选择频道" :value="value" @input="onInput">
      <!-- value is in props -->
      <!-- v-for 必须有 :key -->
      <el-option label="所有频道" :value="null"></el-option>
      <el-option :label="item.name" :value="item.id" v-for="item in channels" :key="item.id"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'channels',
  props: {
    value: {
      // type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      channels: []
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    loadChannels () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      }).then(r => {
        // console.log(r)
        this.channels = r.data.data.channels
      })
    },
    onInput (optionValue) {
      this.$emit('input', optionValue)
    }
  }
}
</script>

<style>
</style>
