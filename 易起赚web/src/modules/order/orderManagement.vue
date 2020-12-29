<template>
    <div class="supplierList">
        <div class="nav-top">
            <div class="nav-box" @click="clearFn">
                <img src="static/img/icon-04.png"/>
                <p>刷新</p>
            </div>
        </div>
        <div class="contain-mod">
            <div class="contain-top">
                <span class="search-btn">订单编号：</span>
                <el-input size="mini" class="w106 mr30" @keyup.enter.native="queryListFnMall"
                          v-model="search_list.orderNo"></el-input>
                <span class="search-btn">联系人：</span>
                <el-input size="mini" class="w106 mr30" @keyup.enter.native="queryListFnMall"
                          v-model="search_list.contact"></el-input>
                <span class="search-btn">联系电话：</span>
                <el-input size="mini" class="w106 mr30" @keyup.enter.native="queryListFnMall"
                          v-model="search_list.phone"></el-input>
                <span class="search-btn">快递单号：</span>
                <el-input size="mini" class="w106 mr30" @keyup.enter.native="queryListFnMall"
                          v-model="search_list.expressNo"></el-input>
                <el-button size="mini" type="primary" plain class="mr22" @click="queryListFnMall">查询</el-button>
                <el-button size="mini" type="primary" @click="clearFn">清空</el-button>
            </div>
            <div class="result-con">
                <div class="tab-mod">
                    <el-table
                            ref="multipleTable"
                            :data="tableData"
                            tooltip-effect="dark"
                            style="width: 100%;"
                            @selection-change="handleSelectionChange"
                            border>
                        <el-table-column
                                type="selection"
                                width="35">
                        </el-table-column>
                        <el-table-column
                                prop="orderNo"
                                label="订单编号">
                        </el-table-column>
                        <el-table-column
                                prop="truePrice"
                                label="实际付款">
                        </el-table-column>
                        <el-table-column
                                prop="contact"
                                label="联系人">
                        </el-table-column>
                        <el-table-column
                                prop="phone"
                                label="联系电话">
                        </el-table-column>
                        <el-table-column
                                prop="paySwiftNumber"
                                label="支付流水号">
                        </el-table-column>
                        <el-table-column
                                width="170"
                                label="操作">
                            <template slot-scope="scope">
                                <span class="scope_btn color-blue"
                                      @click="goAddLiveBroadcast(scope.row)">发货</span>
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
                <el-button type="primary" size="small" @click="configDelClk">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import store from 'si-store'
    import {MyPost, MyGet} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../../components/footerbar/footerbar.vue'

    export default {
        name: 'supplierList',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                loadingShow: false,
                loadingText: '正在加载中...',
                search_list: {
                    orderNo: '',
                    expressNo:'',
                    contact:'',
                    phone:''
                },
                tableData: [],
                page_show: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                serachBoxShow: false,//高级查询弹窗显示
                formLabelWidth: '120px',
                formAccountWidth: '150px',
                editPriceShow: false,
                delShow: false,
                sendId: '',
                multipleTable: "",
                delIds: [],
                passwordHolder: ""
            }
        },
        created() {
            this.$store.state.navTit = '订单管理';
            this.$store.state.navChildTit = '订单列表';
            this.queryListFn();
        },
        methods: {
            queryListFnMall() {
                this.currentPage = 1;
                this.queryListFn();
            },
            review(item) {
                this.reveiwForm = {
                    auditStatus: item.auditStatus,
                    memo: item.memo,
                };
                this.delIds = []
                this.delIds.push(item.id)
                this.reveiwShow = true;
            },
            configDelClk() {
                this.loadingShow = true;
                MyPost('/banyan-procurement/supplier/delSupplierInfo', {
                    ids: this.delIds
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.delShow = false;
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.queryListFn();
                    } else {
                        this.$confirm(message, '提示', {
                            confirmButtonText: '确定',
                            showCancelButton: false,
                            type: 'error'
                        }).then(() => {
                            this.delShow = false;
                        }).catch(() => {
                            this.delShow = false;
                        });
                    }
                })
            },
            delClk(item) {
                this.delIds = [];
                this.delIds.push(item.id)
                this.delShow = true;
            },
            delClkAll() {
                if (this.multipleTable.length == 0) {
                    this.$confirm('请先勾选记录，再进行操作', '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'error'
                    }).then(() => {
                        this.delShow = false;
                    }).catch(() => {
                        this.delShow = false;
                    });
                    return;
                }
                this.delIds = this.multipleTable.map(item => {
                    return item.id
                });
                this.delShow = true;
            },
            isSupplierOpenAll(status) {
                if (this.multipleTable.length == 0) {
                    this.$confirm('请先勾选记录，再进行操作', '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'error'
                    }).then(() => {
                        this.reveiwShow = false;
                    }).catch(() => {
                        this.reveiwShow = false;
                    });
                    return;
                }
                for (var i = 0; i < this.multipleTable.length; i++) {
                    if (this.multipleTable[i].auditStatus != 1&&this.multipleTable[i].status!=status) {
                        this.$confirm('供应商编号:'+this.multipleTable[i].companyCode+
                        '供应商状态不是”复核通过“或者不是'+status==1?'禁用':'启用'+'状态，无法进行'+status==1?'禁用':'启用' +'操作', '提示', {
                            confirmButtonText: '确定',
                            showCancelButton: false,
                            type: 'error'
                        }).then(() => {
                            this.revShow = false;
                        }).catch(() => {
                            this.revShow = false;
                        });
                        return;
                    }
                }
                this.supplierStatus = status
                this.delIds = this.multipleTable.map(item => {
                    return item.id
                });
                this.supplierStatusShow = true;
            },
            isSupplierOpen(item) {
                this.delIds = [];
                this.delIds.push(item.id)
                if (item.status == 1) {
                    this.supplierStatus = '2'
                    this.supplierStatusTitle = '禁用'
                } else if (item.status == 2) {
                    this.supplierStatus = '1'
                    this.supplierStatusTitle = '启用'
                }
                this.supplierStatusShow = true;
            },
            reviewClk() {
                if (this.multipleTable.length == 0) {
                    this.$confirm('请先勾选记录，再进行操作', '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'error'
                    }).then(() => {
                        this.reveiwShow = false;
                    }).catch(() => {
                        this.reveiwShow = false;
                    });
                    return;
                }
                this.delIds = this.multipleTable.map(item => {
                    return item.id
                });
                this.reveiwShow = true;
            },
            handleSelectionChange(val) {
                this.multipleTable = val;
            },
            queryListFn() {
                MyPost('/yl-ms-product/ms/product/list', {
                    // MyPost('http://192.188.30.188:20006/banyan-procurement/supplier/queryList', {
                    productName: this.search_list.productName,
                    spuNo: this.search_list.spuNo,
                    categoryName: this.search_list.categoryName,
                    brandName: this.search_list.brandName,
                    start: (this.currentPage - 1) * 10,
                    length: 10
                }).then((res) => {
                    console.info(res)
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
                this.queryListFn();
            },
            clearFn() {
                this.search_list = {
                    productName: '',//企业名称
                    spuNo: '',
                    categoryName: '',
                    brandName: '',
                }
                this.queryListFn();
            },
            searchBtnClk() {
                this.serachBoxShow = false;
                this.queryListFn();
            },
            goAddBringGoodsVideo(item) {
                this.$router.push({
                    path: '/bringGoodsVideoAdd',
                    query: {
                        id: item.id
                    }
                })
            },
            goSkuPriceList(item) {
                this.$router.push({
                    path: '/skuPriceList',
                    query: {
                        id: item.id
                    }
                })
            },

            goAddLiveBroadcast(item) {
                this.$router.push({
                    path: '/liveBroadcastAdd',
                    query: {
                        id: item.id
                    }
                })
            },
            goInfor(item) {
                this.$router.push({
                    path: '/productInformation',
                    query: {
                        id: item.id,
                        auditStatus: item.auditStatus
                    }
                })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .supplierList
        .minW .el-dialog
            width 680px

            .el-radio__label
                font-size 12px

                .add-contain
                    font-size 12px
                    float left

                    .new-other
                        width 100%
                        /*height 40px*/
                        float left
                        margin-bottom 30px


    .minWA .el-dialog
        width 850px

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
            margin-bottom 15px

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

        .result-con
        .el-table thead tr
            font-size 12px
            color #262626
            border-radius 4px 4px 0 0
            height 50px

        .el-table thead th
            background #FAFAFA
            text-align center

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
            margin-top 5px
</style>
