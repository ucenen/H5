<template>
    <div class="storePurchase">
        <div class="nav-top">
            <div class="nav-box">
                <img src="./icon-01.png"/>
                <p class="color-red">批量复核</p>
            </div>
            <!--<div class="nav-box">
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
            </div>-->
        </div>
        <div class="contain-mod">
            <div class="contain-top">
                <span class="search-btn">所属门店：</span>
                <el-tooltip class="w120 mr30" effect="dark" content="所属门店" placement="top-start">
                    <el-select size="mini" v-model="search_list.shopId" placeholder="所属门店">
                        <el-option
                                label="全部"
                                value="">
                        </el-option>
                    </el-select>
                </el-tooltip>
                <span class="search-btn">订单状态：</span>
                <el-tooltip class="w120 mr30" effect="dark" content="订单状态" placement="top-start">
                    <el-select size="mini" v-model="search_list.reviewerStatus" placeholder="订单状态">
                        <el-option
                                label="全部"
                                value="">
                        </el-option>
                        <el-option
                                v-for="item in statusList"
                                :key="item"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-tooltip>
                <el-button size="mini" type="primary" plain class="mr22" @click="getShopPurchaseListFn">查询</el-button>
                <!--<el-button size="mini" type="primary" plain class="mr22" @click="serachBoxShow = true">高级查询</el-button>-->
                <el-button size="mini" type="primary" @click="clearFn">清空</el-button>
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
                                prop="shopPurchaseNo"
                                label="采购单编号">
                        </el-table-column>
                        <el-table-column
                                prop="skuNum"
                                label="商品总数">
                        </el-table-column>
                        <el-table-column
                                label="指定交货时间">
                            <template slot-scope="scope">
                                {{timeFormatFun(scope.row.requiredDeliveryDate)}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="订单状态">
                            <template slot-scope="scope">
                                {{statusValue(scope.row.reviewerStatus)}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="120"
                                label="操作">
                            <template slot-scope="scope">
                                <!--scope.row-->
                                <span class="scope_btn color-blue" @click="goInfor(scope.row)">查看</span>
                                <span class="scope_btn color-blue color-under-line"
                                      @click="reviewClk(scope.row)">复核</span>
                            </template>
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
        <!--loading-->
        <transition name="fade">
            <div class="loading-container" v-show="loadingShow">
                <loading :loadingText="loadingText"></loading>
            </div>
        </transition>
        <footerbar/>
        <el-dialog title="订单复核"
                   class="minW"
                   :visible.sync="reveiwShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <el-form :model="reveiwForm">
                <el-form-item size="small" label="订单编号：" :label-width="formLabelWidth">
                    <p>{{shopPurchaseNo}}</p>
                </el-form-item>
                <el-form-item size="small" label="所属门店：" :label-width="formLabelWidth">
                    <p>暂时没有字段空着</p>
                </el-form-item>
                <el-form-item size="small" label="订单复核：" :label-width="formLabelWidth">
                    <el-radio v-model="reveiwForm.reviewerStatus" label="1">复核通过</el-radio>
                    <el-radio v-model="reveiwForm.reviewerStatus" label="2">复核拒绝</el-radio>
                </el-form-item>
                <el-form-item size="small" label="复核备注：" :label-width="formLabelWidth">
                    <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入内容"
                            v-model="reveiwForm.reviewerMemo">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="reveiwShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="reveiwConfig">确认</el-button>
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
        name: 'storePurchase',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                multipleSelection: [],
                serachBoxShow: false,//高级查询弹窗显示


                loadingShow: false,
                loadingText: '正在加载中。。。',
                search_list: {
                    shopId: '',//门店id
                    reviewerStatus: '',//订单状态
                },
                statusList: [
                    {
                        label: '待复核',
                        value: '0'
                    },
                    {
                        label: '复核通过',
                        value: '1'
                    },
                    {
                        label: '复核不通过',
                        value: '2'
                    }
                ],
                page_show: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                tableData: [],
                reveiwShow: false,
                reveiwForm: {
                    reviewerMemo: '',//复核备注
                    reviewerStatus: '1',//复核状态1-通过 2-失败
                },
                formLabelWidth: '120px',
                reviewId: '',//采购单id
                shopPurchaseNo: '',//采购单编号
            }
        },
        created() {
            this.$store.state.navTit = '门店';
            this.$store.state.navChildTit = '门店采购';
            this.getShopPurchaseListFn();
        },
        methods: {
            statusValue(value) {
                switch (value) {
                    case '0':
                        return '待复核'
                    case '1':
                        return '复核通过'
                    case '2':
                        return '复核不通过'
                }
            },
            clearFn() {
                this.search_list = {
                    shopId: '',//门店id
                    reviewerStatus: '',//订单状态
                }
            },
            getShopPurchaseListFn() {
                this.loadingShow = true;
                MyPost('/yl-ms-platform/shopPurchase/getShopPurchaseList', {
                    shopId: this.search_list.shopId,
                    reviewerStatus: this.search_list.reviewerStatus,
                    start: (this.currentPage - 1) * 10,
                    length: 10
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.tableData = data.data;
                        if (data.data.length == 0) {
                            this.page_show = false;
                        } else {
                            this.page_show = true;
                        }
                        this.totalRecord = data.recordsTotal;
                    } else {
                        this.page_show = false;
                        this.$message.error(message);
                    }
                })
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getShopPurchaseListFn();
            },
            reviewClk(item) {
                this.reviewId = item.id;
                this.shopPurchaseNo = item.shopPurchaseNo;
                this.reveiwForm.reviewerStatus = item.reviewerStatus;
                this.reveiwShow = true;
            },
            reveiwConfig() {
                this.loadingShow = true;
                MyPost('/yl-ms-platform/shopPurchase/reviewerShopPurchase', {
                    id: this.reviewId,
                    reviewer: '2',
                    reviewerStatus: this.reveiwForm.reviewerStatus,
                    reviewerMemo: this.reveiwForm.reviewerMemo
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.$message({
                            message: '复核成功',
                            type: 'success'
                        });
                        this.reveiwShow = false;
                        this.getShopPurchaseListFn();
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            goInfor(item) {
                this.$router.push({
                    path: '/purchaseOrderDetail',
                    query: {
                        id: item.id
                    }
                })
            },


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

        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .storePurchase
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
                padding-bottom 100px
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
