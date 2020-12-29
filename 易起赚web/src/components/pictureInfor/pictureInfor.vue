<template>
    <div class="pictureInfor">
        <div class="nav-top">
            <div class="nav-box">
                <img src="./icon-01.png"/>
                <p class="color-red">新建</p>
            </div>
            <div class="nav-box">
                <img src="./icon-02.png"/>
                <p>删除</p>
            </div>
            <div class="nav-box">
                <img src="./icon-03.png"/>
                <p>导出</p>
            </div>
            <div class="nav-box">
                <img src="./icon-04.png"/>
                <p>刷新</p>
            </div>
        </div>
        <div class="contain-mod">
            <div class="result-con">
                <ul class="pic-con">
                    <li v-for="item in 30" :key="item">
                        <img src="./icon-01.png"/>
                        <p class="pic-desc">1000*1000px(100kb)</p>
                        <div class="change-mod">
                            <el-checkbox class="sel-btn" v-model="checked"></el-checkbox>
                            <span>转移相册</span>
                            <span>删除图片</span>
                        </div>
                    </li>
                </ul>
                <div class="pagenum_mod" v-if="page_show">
                    <el-pagination
                            background
                            class="pageination_css"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-size="10"
                            layout="total, prev, pager, next, jumper"
                            :total="totalRecord">
                    </el-pagination>
                </div>
            </div>
        </div>
        <!--loading-->
        <transition name="fade">
            <div class="loading-container" v-show="loadingShow">
                <loading :loadingText="loadingText"></loading>
            </div>
        </transition>
        <footerbar/>
    </div>
</template>

<script>
    import store from 'si-store'
    import {MyGet, MyPost} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../footerbar/footerbar.vue'

    export default {
        name: 'pictureInfor',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                page_show: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 100,//总共分页数据条数
                checked: true
            }
        },
        created() {
            this.$store.state.navTit = '商品';
            this.$store.state.navChildTit = '图片库管理';
        },
        methods: {}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .pictureInfor
        .minW .el-dialog
            width 640px
        .nav-top
            background #fff
            padding-left 20px
            height 35px
            position relative
            box-shadow 0px 0px 6px 0px rgba(174, 174, 174, 0.14)
            .nav-box
                cursor pointer
                height 35px
                float left
                margin-right 30px
                img
                    width 18px
                    height 18px
                    margin 9px 9px 0 0
                    display inline
                    float left
                p
                    color #333
                    font-size 12px
                    line-height 35px
                    float left
                .color-red
                    color #C13A3C
        .contain-mod
            background #fff
            overflow hidden
            padding-left 18px
            padding-right 18px
            padding-top 10px
            .result-con
                padding-bottom 100px
                .pic-con
                    overflow hidden
                    li
                        width 180px
                        height 200px
                        float left
                        border 2px solid #F4F4F4
                        margin 0 18px 14px 0
                        display inline
                        img
                            display block
                            width 88px
                            height 72px
                            margin 40px auto 32px auto
                        .pic-desc
                            font-size 12px
                            color #CCCCCC
                            line-height 16px
                            text-align center
                        .change-mod
                            margin 14px 0 0 14px
                            overflow hidden
                            .sel-btn
                                float left
                            span
                                float left
                                font-size 12px
                                color #34B38E
                                margin-left 10px
                                line-height 14px
                                cursor pointer
                .pagenum_mod
                    margin-bottom 148px
                    float right
                    overflow hidden
                    margin-top 30px
</style>
