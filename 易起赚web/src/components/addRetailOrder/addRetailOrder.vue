<template>
    <div class="addRetailOrder">
        <div class="return-line">
            <span @click="goPage">返回</span>
        </div>
        <div class="add-mod-con">
            <div class="add-mod-one">
                <h3><em></em>买家信息</h3>
                <div class="add-mod-line">
                    <div class="add-box">
                        <span class="add-tip">* 零售订单号：</span>
                        <el-input size="small" class="add-ipt"></el-input>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 订单日期：</span>
                        <el-input size="small" class="add-ipt"></el-input>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 买家：</span>
                        <el-input size="small" class="add-ipt"></el-input>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 买家电话：</span>
                        <el-input size="small" class="add-ipt"></el-input>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 买家昵称：</span>
                        <el-input size="small" class="add-ipt"></el-input>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 收货电话：</span>
                        <el-input size="small" class="add-ipt"></el-input>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 收货人：</span>
                        <el-input size="small" class="add-ipt"></el-input>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 收货地址：</span>
                        <el-input size="small" class="add-ipt"></el-input>
                    </div>
                </div>
            </div>
            <div class="add-mod-one">
                <h3><em></em>发票</h3>
                <div class="add-mod-line">
                    <div class="add-box">
                        <span class="add-tip">* 发票类型：</span>
                        <el-input size="small" class="add-ipt"></el-input>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 发票抬头：</span>
                        <el-input size="small" class="add-ipt"></el-input>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 联系人：</span>
                        <el-input size="small" class="add-ipt"></el-input>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 礼品订单：</span>
                        <el-input size="small" class="add-ipt"></el-input>
                    </div>
                </div>
            </div>
            <div class="add-mod-one">
                <h3><em></em>商品明细
                    <el-button size="mini" class="btn-r" type="primary">删除商品</el-button>
                    <el-button size="mini" class="btn-r" type="primary" plain @click="addBoxShow = true">添加商品
                    </el-button>
                </h3>
                <div class="add-mod-line">
                    <div class="tab-mod">
                        <el-table
                                ref="multipleTable"
                                :data="tableData"
                                tooltip-effect="dark"
                                style="width: 100%;"
                                border
                                @selection-change="handleSelectionChange">
                            <el-table-column
                                    type="selection"
                                    width="55">
                            </el-table-column>
                            <el-table-column
                                    label="商品编号">
                                <template slot-scope="scope">{{ scope.row.date }}</template>
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="商品名称">
                            </el-table-column>
                            <el-table-column
                                    prop="address1"
                                    width="100"
                                    label="单价">
                            </el-table-column>
                            <el-table-column
                                    prop="address2"
                                    label="商品数量">
                            </el-table-column>
                            <el-table-column
                                    prop="address3"
                                    width="120"
                                    label="优惠金额">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="btn-group">
                <el-button type="primary" plain>取消</el-button>
                <el-button type="primary">确认</el-button>
            </div>
        </div>
        <!--loading-->
        <transition name="fade">
            <div class="loading-container" v-show="loadingShow">
                <loading :loadingText="loadingText"></loading>
            </div>
        </transition>
        <footerbar/>
        <el-dialog title="添加商品"
                   class="minW"
                   :visible.sync="addBoxShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="contain-mod">
                <div class="contain-top">
                    <span class="search-btn">商品名称：</span>
                    <el-input size="mini" class="w106 mr30"></el-input>
                    <span class="search-btn">商品类别：</span>
                    <el-tooltip class="w120 mr30" effect="dark" content="品牌名称" placement="top-start">
                        <el-select size="mini" placeholder="品牌名称">
                            <el-option
                                    label="item.label"
                                    value="item.value">
                            </el-option>
                        </el-select>
                    </el-tooltip>
                    <span class="search-btn">产地：</span>
                    <el-input size="mini" class="w106 mr30"></el-input>
                    <el-button size="mini" type="primary" plain class="mr22">查询</el-button>
                    <el-button size="mini" type="primary">清空</el-button>
                </div>
                <div class="result-con">
                    <div class="tab-mod">
                        <el-table
                                ref="multipleTable"
                                :data="tableData"
                                tooltip-effect="dark"
                                style="width: 100%;"
                                border
                                @selection-change="handleSelectionChange">
                            <el-table-column
                                    type="selection"
                                    width="55">
                            </el-table-column>
                            <el-table-column
                                    label="商品编号">
                                <template slot-scope="scope">{{ scope.row.date }}</template>
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="商品名称">
                            </el-table-column>
                            <el-table-column
                                    prop="address1"
                                    width="100"
                                    label="SKU编号">
                            </el-table-column>
                            <el-table-column
                                    prop="address2"
                                    label="产地">
                            </el-table-column>
                            <el-table-column
                                    prop="address3"
                                    width="120"
                                    label="剩余库存">
                            </el-table-column>
                            <el-table-column
                                    prop="address4"
                                    width="100"
                                    label="香型">
                            </el-table-column>
                            <el-table-column
                                    prop="address5"
                                    width="100"
                                    label="容量">
                            </el-table-column>
                            <el-table-column
                                    prop="address6"
                                    label="箱规">
                            </el-table-column>
                            <el-table-column
                                    prop="address7"
                                    width="100"
                                    label="成本价">
                            </el-table-column>
                            <el-table-column
                                    prop="address7"
                                    width="100"
                                    label="状态">
                            </el-table-column>
                            <el-table-column
                                    width="80"
                                    label="操作">
                                <template slot-scope="scope">
                                    <!--scope.row-->
                                    <span class="scope_btn">删除</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="addBoxShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="addBoxShow = false">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import store from 'si-store'
    import {MyGet, MyPost} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../footerbar/footerbar.vue'

    export default {
        name: 'addRetailOrder',
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
                addBoxShow: false
            }
        },
        created() {
            this.$store.state.navTit = '门店';
            this.$store.state.navChildTit = '零售订单';
        },
        methods: {
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            goPage() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .addRetailOrder
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
            .add-mod-one
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
            .btn-group
                text-align center
                padding 40px 0 60px 0
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
