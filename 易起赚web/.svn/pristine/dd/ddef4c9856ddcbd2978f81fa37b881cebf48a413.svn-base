<template>
    <div class="growSet">
        <div class="return-line">
            <span @click="goPage">返回</span>
        </div>
        <div class="add-mod-con">
            <div class="add-mod-one">
                <h3><em></em>成长值规则设置</h3>
                <div class="add-box">
                    <span class="add-tip">每日连续签到：</span>
                    <el-input size="small" class="add-ipt">
                        <template slot="append">天</template>
                    </el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">额外奖励：</span>
                    <el-input size="small" class="add-ipt">
                        <template slot="append">分</template>
                    </el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">购物消费：</span>
                    <el-input size="small" class="add-ipt">
                        <template slot="append">元</template>
                    </el-input>
                    <span class="growtips">奖励1分成长值（不含运费）</span>
                </div>
                <div class="add-box">
                    <span class="add-tip">商品单价低于：</span>
                    <el-input size="small" class="add-ipt">
                        <template slot="append">元</template>
                    </el-input>
                    <span class="growtips">评价不送成长值</span>
                </div>
                <div class="add-box">
                    <span class="add-tip">订单实际支付金额低于：</span>
                    <el-input size="small" class="add-ipt">
                        <template slot="append">元</template>
                    </el-input>
                    <span class="growtips">不送成长值</span>
                </div>
                <div class="add-box">
                    <span class="add-tip">单件商品最高可获得：</span>
                    <el-input size="small" class="add-ipt">
                        <template slot="append">分</template>
                    </el-input>
                    <span class="growtips">成长值</span>
                </div>
            </div>
            <div class="btn-group">
                <el-button type="primary">确认</el-button>
                <el-button type="primary" plain>取消</el-button>
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
        name: 'growSet',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {}
        },
        created() {
            this.$store.state.navTit = '门店';
            this.$store.state.navChildTit = '会员等级';
        },
        methods: {
            goPage() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .growSet
        .hide .el-upload--picture-card
            display none
        .return-line
            background #fff
            box-shadow 0px 0px 6px 0px rgba(174, 174, 174, 0.14)
            height 36px
            position fixed
            z-index 2
            width 100%
            span
                font-size 12px
                color #308BDE
                line-height 36px
                cursor pointer
                margin-left 16px
        .add-mod-con
            padding-top 36px
            overflow hidden
            background #fff
            .add-mod-one
                padding-bottom 30px
                h3
                    font-weight bold
                    font-size 16px
                    color #333
                    margin-top 20px
                    margin-bottom 22px
                    padding-left 8px
                    line-height 22px
                    height 34px
                    em
                        float left
                        width 34px
                        height 34px
                        background url("./icon-l.png") no-repeat 0 0
                        background-size contain
                .add-box
                    height 36px
                    margin-bottom 22px
                    .add-tip
                        width 184px
                        text-align right
                        line-height 36px
                        font-size 12px
                        color #333
                        margin-right 40px
                        display inline
                        float left
                    .grade-radio-box
                        float left
                        margin-top 10px
                        .el-radio__label
                            font-size 12px
                    .add-ipt
                        height 36px
                        width 410px
                        float left
                    .growtips
                        float left
                        font-size 12px
                        color #333
                        line-height 36px
                        margin-left 26px
                        display inline
                    .add-ipt-sel
                        float left
                        width 150px
                        margin-right 20px
                    .mr0
                        margin-right 0
                    .el-input--small .el-input__inner
                        height 36px
                        line-height 36px
                    .add-tips
                        font-size 12px
                        color #C13A3C
                        line-height 36px
                        margin-left 26px
                        float left
                        display inline
                    .add-check
                        float left
                        margin 8px 0 0 26px
                        display inline
            .btn-group
                text-align center
                padding 0 0 40px 0
                overflow hidden
</style>
