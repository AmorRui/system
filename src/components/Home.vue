<template>
  <div>主页</div>
</template>

<script>
import {testData} from '../API/api.js'
export default {
  data () {
    return { }
  },
  mounted () {
    testData({
      query: '',
      pagename: 1,
      pagesize: 10
    })
      .then(res => {
        console.log(res)
      })
  }
}
</script>

<style scoped>

</style>
