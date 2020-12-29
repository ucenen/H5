<template>
    <div class="codeInformation">
        <div class="return-line">
            <span @click="goPage">返回</span>
        </div>
        <div class="add-mod-con">
            <div class="add-mod-one">
                <div class="add-mod-line">
                    <div class="tab-mod">
                        <el-table
                                :data="tableData"
                                tooltip-effect="dark"
                                style="width: 100%;"
                                border>
                            <el-table-column
                                    label="编号">
                                <template slot-scope="scope">{{ scope.row.date }}</template>
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="商品名称">
                            </el-table-column>
                            <el-table-column
                                    prop="address1"
                                    label="原追溯码">
                            </el-table-column>
                            <el-table-column
                                    prop="address2"
                                    label="诚信码">
                            </el-table-column>
                        </el-table>
                    </div>
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
        name: 'codeInformation',
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
                multipleSelection: [],
                addBoxShow: false,
                page_show: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 100,//总共分页数据条数
            }
        },
        created() {
        },
        methods: {
            goPage() {
                this.$router.go(-1);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                //this.tab_fn();
            },
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .codeInformation
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
            span
                font-size 12px
                color #308BDE
                line-height 36px
                cursor pointer
        .add-mod-con
            overflow hidden
            background #fff
            padding-top 30px
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
                    .btn-r
                        float right
                        margin-right 20px
                        display inline
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
                    .add-p
                        float left
                        font-size 12px
                        color #333
                        line-height 36px
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
                .tab-mod
                    padding 0 20px
                    .el-table thead tr
                        font-size 12px
                        color #262626
                        border-radius 4px 4px 0 0
                        height 50px
                    .el-table thead th
                        background #FAFAFA
                    .el-table thead th > .cell
                        color #262626
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
                .pagenum_mod
                    float right
                    overflow hidden
                    margin 30px 20px 40px 20px
                    display inline
            .btn-group
                text-align center
                padding 20px 0 60px 0
                overflow hidden
        .contain-mod
            background #fff
            overflow hidden
            padding-left 18px
            padding-right 18px
            padding-top 10px
            .contain-top
                overflow hidden
                margin-top 5px
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
            .result-con
                padding-bottom 20px
                .el-table thead tr
                    font-size 12px
                    color #262626
                    border-radius 4px 4px 0 0
                    height 50px
                .el-table thead th
                    background #FAFAFA
                .el-table thead th > .cell
                    color #262626
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
                .pagenum_mod
                    margin-bottom 148px
                    float right
                    overflow hidden
                    margin-top 30px
            .tabs-mod
                height 30px
                margin-bottom 14px
</style>
