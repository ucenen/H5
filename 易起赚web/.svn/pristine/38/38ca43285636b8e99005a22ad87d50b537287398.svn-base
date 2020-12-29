<template>
  <div class="loading">
    <img width="26" height="26" src="./loading.gif">
    <p class="desc">{{loadingText}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      loadingText: {
        type: String,
        default: '正在加载中...'
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .loading
    position absolute
    text-align: center
    width: 220px
    height 100px
    top: 50%
    left 50%
    margin-left -110px
    margin-top -70px
    background-color rgba(0,0,0,0.5)
    border-radius 10px
    padding 10px 0 30px 0
    img
      padding 15px 0 10px 0
    .desc
      padding 0 40px
      line-height: 20px
      font-size: 12px
      color: #fff
</style>
