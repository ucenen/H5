<template>
    <div class="payManageList">
        <div class="nav-top">
            <div class="nav-box" @click="goPage">
                <img src="./icon-01.png"/>
                <p class="color-red">新增</p>
            </div>
            <div class="nav-box" @click="delAllClk">
                <img src="./icon-02.png"/>
                <p>删除</p>
            </div>
        </div>
        <div class="contain-mod">
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
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="paymentSettingsName"
                                label="支付方式名称">
                        </el-table-column>
                        <el-table-column
                                prop="memo"
                                label="支付方式描述">
                        </el-table-column>
                        <el-table-column
                                width="70"
                                label="是否启用">
                            <template slot-scope="scope">
                                <!--scope.row-->
                                {{scope.row.status == 1 ? '是' : '否'}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="120"
                                label="操作">
                            <template slot-scope="scope">
                                <!--scope.row-->
                                <span class="scope_btn color-blue" @click="editClk(scope.row)">编辑</span>
                                <span class="scope_btn" @click="delClk(scope.row)">删除</span>
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
                <p>您正在执行删除操作，是否确认删除？</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="delShow = false">取 消</el-button>
                <el-button type="primary" size="small" @click="configClk">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import store from 'si-store'
    import {MyGet, MyPost, MyPostJson} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../footerbar/footerbar.vue'

    export default {
        name: 'payManageList',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                loadingShow: false,
                loadingText: '正在加载中...',
                tableData: [],
                page_show: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                delShow: false,
                delId: '',
                configDel: 0,//0单个删除1全部
                multipleSelection: []
            }
        },
        created() {
            this.$store.state.navTit = '系统';
            this.$store.state.navChildTit = '支付设置';
            this.queryListFn();
        },
        methods: {
            delAllClk() {
                if (this.multipleSelection.length == 0) {
                    return this.$message.error('请选择列表');
                }
                this.configDel = 1;
                this.delShow = true;
            },
            delClk(item) {
                this.delId = item.id;
                this.configDel = 0;
                this.delShow = true;
            },
            configClk() {
                if (this.configDel == 0) {
                    this.loadingShow = true;
                    MyPost('/yl-ms-platform/paymentSettings/delPaymentSettings', {
                        id: this.delId
                    }).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.delShow = false;
                            this.queryListFn();
                        } else {
                            this.$message.error(message);
                        }
                    })
                } else {
                    let newIds = this.multipleSelection.map(item => {
                        return item.id
                    })
                    this.loadingShow = true;
                    MyPost('/yl-ms-platform/paymentSettings/delBatchPaymentSettings', {
                        ids: newIds.join(',')
                    }).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.delShow = false;
                            this.queryListFn();
                        } else {
                            this.$message.error(message);
                        }
                    })
                }
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
            queryListFn() {
                this.loadingShow = true;
                MyGet('/yl-ms-platform/paymentSettings/queryList').then((res) => {
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
            goPage() {
                this.$router.push({
                    path: '/payManageSet'
                })
            },
            editClk(item) {
                this.$router.push({
                    path: '/payManageSet',
                    query: {
                        id: item.id,
                        paymentSettingsName: item.paymentSettingsName,//支付方式名称
                        memo: item.memo,//支付方式描述
                        appid: item.appId,//微信公众号appid
                        appsecret: item.appSecret,//微信公众号AppSecret
                        paymentKey: item.paymentKey,//商户支付密钥Key
                        acceptId: item.acceptId,//受理商ID(即微信支付商户号)
                        serviceCharge: item.serviceCharge,//支付手续费
                        paymentType: item.paymentType,//付款类型 1货到付款 2在线支付
                        status: item.status//状态 1是2否
                    }
                })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .el-popover
        padding 12px 12px 4px 12px
        .money-box
            text-align center
            overflow hidden

    .payManageList
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
                .w140
                    width 140px
                .mr30
                    margin-right 30px
                .mr22
                    margin-right 22px
                .el-button + .el-button
                    margin-bottom 15px
            .result-con
                padding-bottom 100px
                .money-tip
                    cursor pointer
                    span
                        font-size 14px
                        margin-left 10px
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
