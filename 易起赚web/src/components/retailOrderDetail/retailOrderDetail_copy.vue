<template>
    <div class="retailOrderDetail">
        <div class="nav-top">
            <div class="nav-box">
                <img src="./icon-01.png"/>
                <p class="color-red">打印</p>
            </div>
        </div>
        <div class="retail-contain">
            <div class="retail-top">
                <el-steps :space="300" :active="1" finish-status="success" align-center>
                    <el-step title="买家下单" description="2019/10/22 10:30"></el-step>
                    <el-step title="买家付款"></el-step>
                    <el-step title="发货"></el-step>
                    <el-step title="买家收货"></el-step>
                </el-steps>
            </div>
            <div class="retail-mod1">
                <p class="retail-tip1">当前订单状态：<span>待付款</span></p>
                <p class="retail-tip2">卖家已下单，等待付款中，{{countDownList}}后关闭订单</p>
                <p class="retail-tip3">关闭订单</p>
            </div>
            <div class="retail-mod-box">
                <h4>买家信息</h4>
                <ul class="retail-inner-box">
                    <li>昵称：Rikcy</li>
                    <li>联系人：陈先生</li>
                    <li>会员等级：普通会员</li>
                    <li>收货地址：上海市 奉贤区 高丰路899弄8号</li>
                    <li>联系电话：13616661688</li>
                </ul>
            </div>
            <div class="retail-mod-box2">
                <h4>物流信息</h4>
                <div class="retail-inner-box">
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="date"
                                label="包裹">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="配送方式">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="物流公司名称">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="物流状态">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="运单号">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="发货时间">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="操作">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="retail-mod-box">
                <h4>发票信息</h4>
                <ul class="retail-inner-box">
                    <li>发票类型：无</li>
                    <li>联系人：发票内容</li>
                    <li>发票抬头：上海XX信息科技有限公司</li>
                    <li>礼品订单：否</li>
                </ul>
            </div>
            <div class="order-retail-box">
                <h4>订单信息</h4>
                <div class="order-contain">
                    <ul class="retail-inner-box w50">
                        <li>订单编号：3543453534534534534</li>
                        <li>创建时间：2019/10/22 13:30:21</li>
                        <li>交易流水号：————</li>
                        <li>付款方式：支付宝</li>
                        <li>支付时间：2019/10/22 13:31:20</li>
                        <li>发货时间：————</li>
                    </ul>
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
                                    prop="address"
                                    label="单价">
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    label="商品数量">
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    label="优惠金额">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="tips-box">
                        <p>商品总额：¥1399.00</p>
                    </div>
                    <div class="tips-box">
                        <p>商品总额：¥1399.00</p>
                    </div>
                    <div class="tips-box">
                        <p>商品总额：¥1399.00</p>
                    </div>
                    <div class="end-tips-box">
                        <p>应付金额：<span>¥1399.00</span></p>
                    </div>
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
        name: 'retailOrderDetail',
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
                countDownList: '00天00时00分00秒',
                actEndTime: '2019-12-30 18:50:00'
            }
        },
        created() {
            this.$store.state.navTit = '门店';
            this.$store.state.navChildTit = '零售订单';
            this.countDown();
        },
        methods: {
            timeFormatFun(param) {
                return param < 10 ? '0' + param : param;
            },
            countDown(it) {
                var interval = setInterval(() => {
                    // 获取当前时间，同时得到活动结束时间数组
                    let newTime = new Date().getTime();
                    // 对结束时间进行处理渲染到页面
                    let endTime = new Date(this.actEndTime).getTime();
                    let obj = null;
                    // 如果活动未结束，对时间进行处理
                    if (endTime - newTime > 0) {
                        let time = (endTime - newTime) / 1000;
                        // 获取天、时、分、秒
                        let day = parseInt(time / (60 * 60 * 24));
                        let hou = parseInt(time % (60 * 60 * 24) / 3600);
                        let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
                        let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
                        obj = {
                            day: this.timeFormatFun(day),
                            hou: this.timeFormatFun(hou),
                            min: this.timeFormatFun(min),
                            sec: this.timeFormatFun(sec)
                        };
                    } else { // 活动已结束，全部设置为'00'
                        obj = {
                            day: '00',
                            hou: '00',
                            min: '00',
                            sec: '00'
                        };
                        clearInterval(interval);
                    }
                    this.countDownList = obj.day + '天' + obj.hou + '时' + obj.min + '分' + obj.sec + '秒';
                }, 1000);
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .retailOrderDetail
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
</style>
