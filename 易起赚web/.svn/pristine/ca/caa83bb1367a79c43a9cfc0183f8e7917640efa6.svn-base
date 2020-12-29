<template>
    <div class="distributionDetail">
        <div class="nav-top">
            <div class="nav-box">
                <img src="./icon-01.png"/>
                <p class="color-red">打印</p>
            </div>
        </div>
        <div class="retail-contain">
            <div class="order-retail-box mt10">
                <h4>配货信息</h4>
                <div class="order-contain">
                    <div class="retail-table">
                        <div class="return-mod">
                            <div class="return-box">
                                <span class="return-l">订单编号</span>
                                <p class="return-r">3545336435345435435</p>
                            </div>
                            <div class="return-box">
                                <span class="return-l">创建时间</span>
                                <p class="return-r">2019/10/22 13:30:21</p>
                            </div>
                            <div class="return-box">
                                <span class="return-l">交易流水号</span>
                                <p class="return-r">—— ——</p>
                            </div>
                            <div class="return-box">
                                <span class="return-l">支付时间</span>
                                <p class="return-r">—— ——</p>
                            </div>
                            <div class="return-box">
                                <span class="return-l">付款方式</span>
                                <p class="return-r">支付宝</p>
                            </div>
                            <div class="return-box">
                                <span class="return-l">发货时间</span>
                                <p class="return-r">—— ——</p>
                            </div>
                            <div class="return-box">
                                <span class="return-l">门店</span>
                                <p class="return-r">徐家汇示范店</p>
                            </div>
                            <div class="return-box">
                                <span class="return-l">联系人</span>
                                <p class="return-r">陈先生</p>
                            </div>
                            <div class="return-box">
                                <span class="return-l">联系电话</span>
                                <p class="return-r">13616881688</p>
                            </div>
                            <div class="return-box">
                                <span class="return-l">联系地址</span>
                                <p class="return-r">奉贤区 高丰路899弄8号</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="order-retail-box mt10">
                <h4>原订单：3545336435345435435</h4>
                <div class="order-contain">
                    <div class="retail-table">
                        <el-table
                                :data="tableData"
                                border
                                style="width: 100%">
                            <el-table-column
                                    prop="date"
                                    label="商品编号">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="商品名称">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="单价">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="销售金额">
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    label="可用库存">
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    label="原订单数量">
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    label="配货数量">
                            </el-table-column>
                            <el-table-column
                                    width="160"
                                    label="操作">
                                <template slot-scope="scope">
                                    <!--scope.row-->
                                    <span class="scope_btn color-blue color-under-line"
                                          @click="reviewShow = true">整单拆</span>
                                    <span class="scope_btn color-blue" @click="delwShow = true">部分拆</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="order-retail-box mt10">
                <h4>新订单：3545336435345435435 -1</h4>
                <div class="order-contain">
                    <div class="retail-table">
                        <el-table
                                :data="tableData"
                                border
                                style="width: 100%">
                            <el-table-column
                                    prop="date"
                                    label="商品编号">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="商品名称">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="单价">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="销售金额">
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    label="可用库存">
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    label="配货数量">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="order-retail-box mt10">
                <h4>配货备注</h4>
                <div class="order-contain">
                    <div class="retail-table">
                        <div class="return-mod">
                            <div class="return-box">
                                <span class="return-l">配货备注</span>
                                <div class="return-r-box">
                                    <div class="sel-box">
                                        <el-input size="mini" placeholder="请输入内容"></el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn-group">
                    <el-button size="small">取消</el-button>
                    <el-button size="small" type="primary">保存</el-button>
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
        <el-dialog
                title="商品替换"
                :visible.sync="reviewShow"
                width="30%"
                :close-on-click-modal="false"
                :close-on-press-escape="false">
            <div class="tip-contain">
                <p>原商品编号：  SDSJD545105525422</p>
                <p>替换为：
                    <el-input size="mini" class="review-ipt" placeholder="请输入内容"></el-input>
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="reviewShow = false">取 消</el-button>
                <el-button type="primary" size="small" @click="reviewShow = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title="商品删除"
                :visible.sync="delwShow"
                width="30%"
                :close-on-click-modal="false"
                :close-on-press-escape="false">
            <div class="tip-contain">
                <p>确认删除该商品？</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="delwShow = false">取 消</el-button>
                <el-button type="primary" size="small" @click="delwShow = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import store from 'si-store'
    import {MyGet, MyPost} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../footerbar/footerbar.vue'

    export default {
        name: 'distributionDetail',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                tableData: [
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    }, {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    }
                ],
                radio: '1',
                options: [
                    {
                        value: '选项1',
                        label: '黄金糕'
                    }, {
                        value: '选项2',
                        label: '双皮奶'
                    }, {
                        value: '选项3',
                        label: '蚵仔煎'
                    }, {
                        value: '选项4',
                        label: '龙须面'
                    }, {
                        value: '选项5',
                        label: '北京烤鸭'
                    }
                ],
                value: '',
                visibleShow: false,
                reviewShow: false,
                delwShow: false,
            }
        },
        created() {
            this.$store.state.navTit = '门店';
            this.$store.state.navChildTit = '订单复核';
        },
        methods: {}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .el-popover
        padding 12px 12px 4px 12px
        .money-box
            text-align center
            overflow hidden

    .distributionDetail
        .tip-contain
            padding 20px
            p
                font-size 12px
                line-height 30px
                text-align center
                margin-bottom 10px
                span
                    color #C13A3C
            .review-ipt
                display inline-block
                width 200px
        .el-table thead, .el-table tr
            font-size 12px
            color #333
        .nav-top
            background #fff
            padding-left 20px
            height 35px
            position fixed
            z-index 2
            width 100%
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
        .retail-contain
            background #fff
            overflow hidden
            padding 35px 35px 0 35px
            .retail-top
                padding 50px 0
                .el-step__title.is-wait
                    color #E0E0E0
                .el-step__title
                    font-size 14px
                    font-weight bold
                .el-step__title.is-process, .el-step__description.is-process, .el-step__title.is-success, .el-step__description.is-success
                    color #CF2A1B
                .is-process, .is-success
                    .el-step__icon.is-text, .el-step__line-inner
                        color #CF2A1B
                        border-color #CF2A1B
            .retail-mod1
                overflow hidden
                height 118px
                margin-bottom 30px
                padding-left 25px
                background rgba(207, 42, 27, .1)
                .retail-tip1
                    color #333
                    font-weight bold
                    line-height 18px
                    margin 22px 0 10px 0
                    font-size 14px
                    span
                        font-weight bold
                        color #47ACEC
                .retail-tip2
                    color #333
                    line-height 16px
                    font-weight bold
                    padding-bottom 20px
                    font-size 12px
                .retail-tip3
                    font-size 14px
                    color #C13A3C
                    line-height 16px
                    cursor pointer
                    font-weight bold
            .retail-mod-box
                margin-bottom 30px
                overflow hidden
                h4
                    font-size 14px
                    height 48px
                    line-height 48px
                    background #EFF0F4
                    padding-left 24px
                    color #333
                    font-weight bold
                .retail-inner-box
                    padding 4px 0 16px 25px
                    border 1px solid #EFF0F4
                    border-top 0
                    li
                        font-size 12px
                        line-height 16px
                        margin-top 16px
                        font-weight bold
                        color #333
                .w50
                    overflow hidden
                    li
                        float left
                        width 50%
            .retail-mod-box2
                margin-bottom 30px
                overflow hidden
                h4
                    font-size 14px
                    height 48px
                    line-height 48px
                    background #f0f0f0
                    padding-left 24px
                    color #333
                    font-weight bold
                .retail-inner-box
                    border-top 0
                    border 1px solid #f0f0f0
                    padding 20px 24px
            .order-retail-box
                margin-bottom 30px
                overflow hidden
                h4
                    font-size 14px
                    height 48px
                    line-height 48px
                    background #EFF0F4
                    padding-left 24px
                    color #333
                    font-weight bold
                .order-contain
                    border-top 0
                    border 1px solid #f0f0f0
                    .retail-inner-box
                        padding 4px 0 16px 25px
                        li
                            font-size 12px
                            line-height 16px
                            margin-top 16px
                            font-weight bold
                            color #333
                    .w50
                        overflow hidden
                        li
                            float left
                            width 50%
                    .retail-table
                        padding 20px 24px 20px 24px
                        overflow hidden
                        .money-tip
                            cursor pointer
                            span
                                font-size 14px
                                margin-left 10px
                        .scope_btn
                            cursor pointer
                            color #DB0D1B
                            font-size 12px
                            margin 0 7px
                        .color-blue
                            color #0D81DB
                        .color-under-line
                            text-decoration underline
                    .tips-box
                        overflow hidden
                        padding-right 36px
                        p
                            font-size 12px
                            color #333
                            font-weight bold
                            line-height 36px
                            float right
                    .end-tips-box
                        margin 10px 24px 0 24px
                        border-top 1px solid #F3F4F8
                        overflow hidden
                        padding 20px 0
                        p
                            padding-right 12px
                            font-size 12px
                            color #333
                            font-weight bold
                            line-height 36px
                            float right
                            span
                                font-weight bold
                                color #C13A3C
                    .no-border
                        border 0
                    .return-mod
                        border 1px solid #f0f0f0
                        border-bottom 0
                        .return-box
                            height 40px
                            border-bottom 1px solid #f0f0f0
                            .return-l
                                font-size 12px
                                color #333
                                font-weight bold
                                text-align center
                                line-height 40px
                                width 262px
                                border-right 1px solid #f0f0f0
                                float left
                            .return-r
                                padding-left 52px
                                font-size 12px
                                font-weight bold
                                line-height 40px
                                color #333
                                float left
                            .return-r-box
                                float left
                                padding-left 52px
                                .sel-box
                                    margin-top 6px
                                .radio-box
                                    margin-top 12px
                                    .el-radio, .el-radio__label
                                        font-size 12px
                .btn-group
                    margin 30px 0 10px 0
                    text-align center
            .mt10
                margin-top 10px
</style>
