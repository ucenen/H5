<template>
    <div class="home">
        <!--头部-->
        <topbar/>
        <!--侧边栏-->
        <navbar/>
        <div class="right_con" :class="$store.state.slideCls">
            <router-view :key="key" class="right_content"></router-view>
        </div>
    </div>
</template>

<script>
    import store from 'si-store'
    /*侧边栏*/
    import navbar from '../navbar/navbar.vue'
    /*头部*/
    import topbar from '../topbar/topbar.vue'

    export default {
        name: 'home',
        components: {
            navbar,
            topbar
        },
        watch: {
            '$route'(to, from) {
                /*if (from.path == '/batchSynchronous') {
                    store.remove('history_search');
                    store.remove('history_page');
                }*/
            }
        },
        computed: {
            key() {
                return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .home
        position absolute
        width 100%
        height 100%
        left 0
        top 0
        background #FFFFFF
        /*bottom 40px*/
        .right_con
            width 100%
            margin-top 105px
            .right_content
                /*padding-bottom 40px*/
                margin-left 270px
                overflow auto
                overflow-x hidden
                height -moz-calc(100vh - 145px)
                height -webkit-calc(100vh - 145px)
                height calc(100vh - 145px)
        .slideCls
            .right_content
                margin-left 0
</style>
