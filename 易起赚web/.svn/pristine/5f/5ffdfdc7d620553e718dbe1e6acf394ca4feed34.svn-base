<template>
    <div class="returnOrderDetail">
        <div class="nav-top">
            <div class="nav-box">
                <img src="./icon-01.png"/>
                <p class="color-red">打印</p>
            </div>
        </div>
        <div class="retail-contain">
            <div class="order-retail-box mt10">
                <h4>退货商品</h4>
                <div class="order-contain">
                    <div class="retail-table">
                        <el-table
                                :data="tableData"
                                border
                                style="width: 100%">
                            <el-table-column
                                    prop="date"
                                    label="商品图片">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="商品名称">
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    label="价格">
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    label="优惠金额">
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    label="数量">
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    label="小计">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="end-tips-box no-border">
                        <p>合计：<span>¥1399.00</span></p>
                    </div>
                </div>
            </div>
            <div class="order-retail-box mt10">
                <h4>服务单信息</h4>
                <div class="order-contain">
                    <div class="retail-table">
                        <div class="return-mod">
                            <div class="return-box">
                                <span class="return-l">服务单号</span>
                                <p class="return-r">313860326</p>
                            </div>
                            <div class="return-box">
                                <span class="return-l">申请状态</span>
                                <p class="return-r">待处理</p>
                            </div>
                            <div class="return-box">
                                <span class="return-l">订单编号</span>
                                <p class="return-r">201907196398345</p>
                            </div>
                            <div class="return-box">
                                <span class="return-l">申请时间</span>
                                <p class="return-r">2019-07-11 14:28:20</p>
                            </div>
                            <div class="return-box">
                                <span class="return-l">用户账号</span>
                                <p class="return-r">18000000000</p>
                            </div>
                            <div class="return-box">
                                <span class="return-l">联系人</span>
                                <p class="return-r">陈先生</p>
                            </div>
                            <div class="return-box">
                                <span class="return-l">联系电话</span>
                                <p class="return-r">18000000000</p>
                            </div>
                            <div class="return-box">
                                <span class="return-l">退货原因</span>
                                <p class="return-r">包装破损</p>
                            </div>
                            <div class="return-box">
                                <span class="return-l">问题描述</span>
                                <p class="return-r">描述文字</p>
                            </div>
                            <div class="return-box">
                                <span class="return-l">凭证照片</span>
                                <p class="return-r"></p>
                            </div>
                        </div>
                    </div>
                    <div class="retail-table">
                        <div class="return-mod">
                            <div class="return-box">
                                <span class="return-l">订单金额</span>
                                <p class="return-r">¥1380.00</p>
                            </div>
                            <div class="return-box">
                                <span class="return-l">退运费</span>
                                <div class="return-r-box">
                                    <div class="radio-box">
                                        <el-radio v-model="radio" size="mini" label="1">不退运费</el-radio>
                                        <el-radio v-model="radio" size="mini" label="2">退运费</el-radio>
                                    </div>
                                </div>
                            </div>
                            <div class="return-box">
                                <span class="return-l">确认退款金额</span>
                                <p class="return-r">¥1380.00</p>
                            </div>
                            <div class="return-box">
                                <span class="return-l">选择收货点</span>
                                <div class="return-r-box">
                                    <div class="sel-box">
                                        <el-select size="mini" v-model="value" placeholder="请选择">
                                            <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                            <div class="return-box">
                                <span class="return-l">收货人姓名</span>
                                <p class="return-r">18000000000</p>
                            </div>
                            <div class="return-box">
                                <span class="return-l">所在区域</span>
                                <div class="return-r-box">
                                    <div class="sel-box">
                                        <el-select size="mini" v-model="value" placeholder="请选择">
                                            <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                        <el-select size="mini" v-model="value" placeholder="请选择">
                                            <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                        <el-select size="mini" v-model="value" placeholder="请选择">
                                            <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                            <div class="return-box">
                                <span class="return-l">详细地址</span>
                                <p class="return-r">上海博复科技</p>
                            </div>
                            <div class="return-box">
                                <span class="return-l">联系电话</span>
                                <p class="return-r">18000000000</p>
                            </div>
                            <div class="return-box">
                                <span class="return-l">处理备注</span>
                                <p class="return-r"></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn-group">
                    <el-button size="small">取消</el-button>
                    <el-button size="small" type="primary">确定</el-button>
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
        name: 'returnOrderDetail',
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
                value: ''
            }
        },
        created() {
            this.$store.state.navTit = '门店';
            this.$store.state.navChildTit = '门店退货';
        },
        methods: {}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .returnOrderDetail
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
                        padding 20px 24px 10px 24px
                        overflow hidden
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
