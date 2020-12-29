<template>
    <div class="memberInfor">
        <div class="return-line">
            <span @click="goPage">返回</span>
        </div>
        <div class="add-mod-con">
            <div class="add-mod-one mb0">
                <h3><em></em>会员信息</h3>
                <div class="add-mod-line">
                    <div class="member-mod">
                        <div class="member-l">
                            <img src="./pic.png"/>
                            <span>18000000000</span>
                            <p>黄金会员</p>
                        </div>
                        <div class="member-c">
                            <div class="member-box">
                                <span>用户ID</span>
                                <p>8447466</p>
                            </div>
                            <div class="member-box">
                                <span>职业</span>
                                <p>运营</p>
                            </div>
                            <div class="member-box">
                                <span>昵称</span>
                                <p>Ricky</p>
                            </div>
                            <div class="member-box">
                                <span>个性签名</span>
                                <p>无</p>
                            </div>
                            <div class="member-box">
                                <span>性别</span>
                                <p>男</p>
                            </div>
                            <div class="member-box">
                                <span>喜欢的分类</span>
                                <p>白酒、黄酒</p>
                            </div>
                            <div class="member-box">
                                <span>生日</span>
                                <p>1984年10月22日</p>
                            </div>
                            <div class="member-box">
                                <span>注册时间</span>
                                <p>2019-10-24 17:25:38</p>
                            </div>
                            <div class="member-box no-bor">
                                <span>城市</span>
                                <p>上海市</p>
                            </div>
                            <div class="member-box no-bor">
                                <span>用户来源</span>
                                <p>APP</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="add-mod-one mb0">
                <h3><em></em>统计信息</h3>
                <div class="add-mod-line">
                    <div class="tab-mod">
                        <el-table
                                :data="tableData"
                                tooltip-effect="dark"
                                style="width: 100%;"
                                border>
                            <el-table-column
                                    label="消费金额">
                                <template slot-scope="scope">{{ scope.row.date }}</template>
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="订单数量">
                            </el-table-column>
                            <el-table-column
                                    prop="address1"
                                    label="邀请好友">
                            </el-table-column>
                            <el-table-column
                                    prop="address2"
                                    label="收藏商品">
                            </el-table-column>
                            <el-table-column
                                    prop="address2"
                                    label="优惠券（张）">
                            </el-table-column>
                            <el-table-column
                                    prop="address2"
                                    label="收藏评价">
                            </el-table-column>
                            <el-table-column
                                    prop="address2"
                                    label="退货记录">
                            </el-table-column>
                            <el-table-column
                                    prop="address2"
                                    label="登录次数">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="add-mod-one mb0">
                <h3><em></em>收货地址</h3>
                <div class="add-mod-line">
                    <div class="tab-mod">
                        <el-table
                                :data="tableData"
                                tooltip-effect="dark"
                                style="width: 100%;"
                                border>
                            <el-table-column
                                    label="姓名">
                                <template slot-scope="scope">{{ scope.row.date }}</template>
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="手机号">
                            </el-table-column>
                            <el-table-column
                                    prop="address1"
                                    label="详细地址">
                            </el-table-column>
                            <el-table-column
                                    prop="address2"
                                    label="邮政编码">
                            </el-table-column>
                            <el-table-column
                                    prop="address2"
                                    label="默认地址">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="add-mod-one">
                <h3><em></em>订单明细</h3>
                <div class="add-mod-line">
                    <div class="tab-mod">
                        <el-table
                                :data="tableData"
                                tooltip-effect="dark"
                                style="width: 100%;"
                                border>
                            <el-table-column
                                    label="订单编号">
                                <template slot-scope="scope">{{ scope.row.date }}</template>
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="提交时间">
                            </el-table-column>
                            <el-table-column
                                    prop="address1"
                                    label="用户账号">
                            </el-table-column>
                            <el-table-column
                                    prop="address2"
                                    label="订单金额">
                            </el-table-column>
                            <el-table-column
                                    prop="address2"
                                    label="支付方式">
                            </el-table-column>
                            <el-table-column
                                    prop="address2"
                                    label="订单来源">
                            </el-table-column>
                            <el-table-column
                                    prop="address2"
                                    label="订单状态">
                            </el-table-column>
                            <el-table-column
                                    label="操作">
                                <template slot-scope="scope">
                                    <!--scope.row-->
                                    <span class="scope_btn color-blue color-under-line">查看订单</span>
                                </template>
                            </el-table-column>
                        </el-table>
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
        name: 'memberInfor',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                tableData: [
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address1: '上海市普陀区金沙江路 1518 弄',
                        address2: '上海市普陀区金沙江路 1518 弄',
                        address3: '上海市普陀区金沙江路 1518 弄',
                        address4: '上海市普陀区金沙江路 1518 弄',
                        address5: '13764473603',
                        address6: '上海市普陀区金沙江路 1518 弄',
                        address7: '2020年10/22',
                        address8: '上海市普陀区金沙江路 1518 弄',
                        address9: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address1: '上海市普陀区金沙江路 1518 弄',
                        address2: '上海市普陀区金沙江路 1518 弄',
                        address3: '上海市普陀区金沙江路 1518 弄',
                        address4: '上海市普陀区金沙江路 1518 弄',
                        address5: '13764473603',
                        address6: '上海市普陀区金沙江路 1518 弄',
                        address7: '2020年10/22',
                        address8: '上海市普陀区金沙江路 1518 弄',
                        address9: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address1: '上海市普陀区金沙江路 1518 弄',
                        address2: '上海市普陀区金沙江路 1518 弄',
                        address3: '上海市普陀区金沙江路 1518 弄',
                        address4: '上海市普陀区金沙江路 1518 弄',
                        address5: '13764473603',
                        address6: '上海市普陀区金沙江路 1518 弄',
                        address7: '2020年10/22',
                        address8: '上海市普陀区金沙江路 1518 弄',
                        address9: '上海市普陀区金沙江路 1518 弄'
                    }
                ],
            }
        },
        created() {
            this.$store.state.navTit = '门店';
            this.$store.state.navChildTit = '门店会员';
        },
        methods: {
            goPage() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .memberInfor
        .minW
            .el-dialog
                width 900px
            .el-dialog__body
                padding 0
        .hide .el-upload--picture-card
            display none
        .return-line
            background #fff
            box-shadow 0px 0px 6px 0px rgba(174, 174, 174, 0.14)
            height 36px
            position relative
            padding-left 16px
            position fixed
            width 100%
            z-index 1
            span
                font-size 12px
                color #308BDE
                line-height 36px
                cursor pointer
        .add-mod-con
            padding-top 36px
            overflow hidden
            .add-mod-one
                overflow hidden
                background #fff
                padding-bottom 30px
                margin-bottom 20px
                .add-mod-out
                    border 2px dashed #E3E3E3
                    margin 0 14px 20px 14px
                    padding 22px 0 0 0
                    overflow hidden
                    position relative
                    .del-new-btn
                        display block
                        width 27px
                        height 27px
                        background url("./del-icon.png") no-repeat 0 0
                        background-size contain
                        position absolute
                        right 14px
                        bottom 14px
                        cursor pointer
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
                    .add-ipt
                        height 36px
                        width 410px
                        float left
                    .mr20
                        margin-right 20px
                    .el-input--small .el-input__inner
                        height 36px
                        line-height 36px
                    .add-btn
                        width 16px
                        height 16px
                        background url("./add-icon.png") no-repeat 0 0
                        background-size contain
                        display inline
                        float left
                        margin-left 10px
                        cursor pointer
                        margin-top 10px
                    .del-btn
                        width 16px
                        height 16px
                        background url("./del-icon.png") no-repeat 0 0
                        background-size contain
                        display inline
                        float left
                        margin-left 10px
                        cursor pointer
                        margin-top 10px
                .add-desc
                    line-height 36px
                    height 36px
                    float left
                    margin-left 224px
                    font-size 12px
                    color #333
                .add-desc-tip
                    line-height 36px
                    height 36px
                    float left
                    margin-left 26px
                    display inline
                    font-size 12px
                    color #333
                .add-new-btn
                    width 51px
                    height 51px
                    display block
                    background url("./add-icon.png") no-repeat 0 0
                    background-size contain
                    margin 50px auto 30px auto
                    cursor pointer
                .edit_container
                    margin 0 30px
                .mb0
                    margin-bottom 0
                .group-check
                    margin-top 10px
                .edit-header
                    overflow hidden
                    height 40px
                    margin-left 30px
                    span
                        float left
                        font-size 14px
                        line-height 40px
                        margin-right 20px
                        display inline
                        cursor pointer
                        color #308BDE
                    .edit-btn1
                        color #333
                        text-align center
                        background #EEEEEE
                        width 200px
                    .edit-btn2
                        color #333
                        text-align center
                        background #EEEEEE
                        width 200px
                    .edit-on
                        background #308BDE
                        color #fff
            .line-add-box
                padding 20px 0 0 0
                .add-box
                    margin-bottom 0
            .add-mod-line
                overflow hidden
                .add-box
                    float left
                    width 520px
                    .add-ipt
                        width 230px
                    .mr20
                        width 150px
                .w100
                    height auto
                    width 100%
                .upload-mod
                    float left
                    overflow hidden
                    .upload-bom
                        overflow hidden
                        .upload-span
                            font-size 12px
                            color #666
                            padding-left 10px
                    .upload-top
                        overflow hidden
                        li
                            width 180px
                            height 200px
                            float left
                            margin 0 20px 20px 0
                            display inline
                            border 1px solid #EEEEEE
                            img
                                display block
                                width 88px
                                height 72px
                                margin 40px auto 44px auto
                            .upload-btn-group
                                display flex
                                height 42px
                                border-top 1px solid #EEEEEE
                                span
                                    text-align center
                                    line-height 42px
                                    font-size 12px
                                    color #C13A3C
                                    cursor pointer
                                    flex 1
                                .del
                                    color #308BDE
            .mb0
                margin-bottom 0
                padding-bottom 0
            .btn-group
                text-align center
                padding 60px 0
                overflow hidden
            .contain-top
                overflow hidden
                padding-left 16px
                .search-btn
                    font-size 12px
                    line-height 28px
                    color #333
                    display inline-block
                    margin-bottom 15px
                .w106
                    width 106px
                .w120
                    width 120px
                .mr30
                    margin-right 30px
                .mr22
                    margin-right 22px
                .el-button + .el-button
                    margin-bottom 15px
            .tab-mod
                padding 0 16px
                .add-desc-tip
                    margin-left 0
                .el-table thead tr
                    font-size 12px
                    color #262626
                    border-radius 4px 4px 0 0
                    height 50px
                .el-table thead th
                    background #FAFAFA
                .el-table thead th > .cell
                    color #262626
                .el-table thead th .el-checkbox
                    display none
                .el-table tbody tr
                    font-size 12px
                .el-table td, .el-table th
                    height 50px
                    padding 0
                .el-table__body-wrapper
                    overflow-x auto
                .scope_btn
                    cursor pointer
                    color #DB0D1B
                    font-size 12px
                    margin 0 7px
                .color-blue
                    color #0D81DB
                .color-under-line
                    text-decoration underline
            .member-mod
                border 1px solid #E8E8E8
                border-right 0
                margin 0 16px
                overflow hidden
                .member-l
                    width 260px
                    float left
                    img
                        display block
                        width 122px
                        height 122px
                        border-radius 50%
                        margin 14px auto
                    span
                        color #595959
                        font-size 12px
                        line-height 20px
                        text-align center
                        margin 20px 0
                        display block
                    p
                        width 80px
                        height 26px
                        text-align center
                        background #E3C7A7
                        border-radius 13px
                        line-height 26px
                        margin 0 auto
                        font-size 12px
                        color #595959
                .member-c
                    border-left 1px solid #E8E8E8
                    width -moz-calc(100% - 261px)
                    width -webkit-calc(100% - 261px)
                    width calc(100% - 261px)
                    float left
                    .member-box
                        float left
                        width -moz-calc(50% - 1px)
                        width -webkit-calc(50% - 1px)
                        width calc(50% - 1px)
                        border-right 1px solid #E8E8E8
                        border-bottom 1px solid #E8E8E8
                        span
                            float left
                            height 48px
                            line-height 48px
                            text-align center
                            border-right 1px solid #E8E8E8
                            background rgba(250, 250, 250, 1)
                            width 40%
                            font-size 12px
                            color #262626
                        p
                            width -moz-calc(60% - 1px)
                            width -webkit-calc(60% - 1px)
                            width calc(60% - 1px)
                            font-size 12px
                            color #262626
                            height 48px
                            line-height 48px
                            text-align center
                            float left
                    .no-bor
                        border-bottom 0
</style>
