<template>
  <div id="app">
    <router-view ></router-view>
  </div>
</template>

<script>
    import store from 'si-store'
    import {MyGet, MyPost} from 'common/js/request'
  export default {
    name: 'app',
    created() {
        // setInterval(()=>{
        //     this.checkVersion()
        // }, 60000) //
    },
    methods:{
        checkVersion(){
            MyGet('/static/version.json',{headers: {'Cache-Control': 'no-cache'}}) // 反正就是要请求到json文件的内容, 并且禁止缓存
                .then(res => {
                    const version = res.version
                    const clientVersion = store.get('_version_')
                    this.consoleCommon('最新版本>>', version)
                    this.consoleCommon('当前版本>>', clientVersion)
                    // 和最新版本不同，刷新页面
                    if (version !== clientVersion) {
                        this.$confirm('检查到系统升级到'+version+',请更新', '提示', {
                            confirmButtonText: '确定',
                            showCancelButton: false,
                            type: 'error'
                        }).then(() => {
                            store.set('_version_', version);
                            window.location.reload()
                        }).catch(() => {

                        });
                    }
                })
        }
    },
    mounted(){
      function checkIE(){
        return '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style
      }
      if (checkIE()) {
        window.addEventListener('hashchange', () => {
          var currentPath = window.location.hash.slice(1);
          if (this.$route.path !== currentPath) {
            this.$router.push(currentPath)
          }
        }, false)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
