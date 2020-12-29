<template>
    <div class="homePage">
        <div class="home-img"></div>
        <transition name="fade">
            <div class="loading-container" v-show="loadingShow">
                <loading :loadingText="loadingText"></loading>
            </div>
        </transition>
        <footerbar/>
        <el-dialog
                title="删除确认"
                :visible.sync="delShow"
                width="30%"
                :close-on-click-modal="false"
                :close-on-press-escape="false">
            <div class="tip-contain">
                <p>正在执行删除操作，是否确认删除？</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="delShow = false">取 消</el-button>
                <el-button type="primary" size="small" @click="configDeleteClk">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import store from 'si-store'
    import {MyGet, MyPost, MyPostJson} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../footerbar/footerbar.vue'

    export default {
        name: 'homePage',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                navList:[],
            }
        },
        created() {
            this.navList = store.get('navBarList');
            this.$store.state.navTit = this.navList[0].name;
            this.$store.state.navChildTit="首页";
            // this.$store.state.navChildTit = this.navList[0].twoFunctionBoList[0].functionMenuBoList[0].name;
        },
        methods: {

        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/css/all.scss"
    .homePage
        text-align center
        padding-top 100px
        background  url(../login/logo_back.png) no-repeat 0 0;
        background-size 100% 100%
        position absolute
        top 0
        bottom 40px
        left 0
        right 0

</style>
