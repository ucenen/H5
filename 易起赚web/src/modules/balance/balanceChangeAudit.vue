<template>
    <div class="prochusingManagement">
        <div class="nav-top">
            <div class="nav-box" @click="clearFn">
                <img src="static/img/icon-04.png"/>
                <p>刷新</p>
            </div>
        </div>
        <div class="contain-mod">
            <div class="contain-top">
                <span class="search-btn">姓名：</span>
                <el-input size="mini" @keyup.enter.native="queryListFnMall" maxlength="30" class="w106 mr30"
                          v-model="searchList.withdrawBankUserName"></el-input>
                <span class="search-btn">银行名称：</span>
                <el-input size="mini" @keyup.enter.native="queryListFnMall" maxlength="30" class="w106 mr30"
                          v-model="searchList.withdrawBankFullName"></el-input>
                <span class="search-btn">审核状态：</span>
                <el-select class="w120 mr30" size="mini" placeholder="全部" v-model="searchList.withdrawStatus">
                    <el-option
                            label="全部"
                            value="">
                    </el-option>
                    <el-option
                            label="提现中"
                            value="1">
                    </el-option>
                    <el-option
                            label="提现成功"
                            value="2">
                    </el-option>
                    <el-option
                            label="提现失败"
                            value="3">
                    </el-option>
                              
                </el-select>
                <el-button size="mini" type="primary" plain class="mr22" @click="queryListFnMall">查询</el-button>
                <el-button size="mini" type="primary" @click="clearFn">清空</el-button>
            </div>
            <div  class="result-con">
                <div class="tab-mod">
                    <el-table
                            ref="multipleTable"
                            :data="tableData"
                            tooltip-effect="dark"
                            style="width: 100%;"
                            @selection-change="handleSelectionChange"
                            border>
							<el-table-column
							    label="序号"
							    type="index"
							    width="50">
							</el-table-column>
                        <el-table-column
                                type="selection"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                prop="withdrawBankUserName"
                                label="姓名">
                        </el-table-column>
                        <el-table-column
                                prop="withdrawBankFullName"
                                label="银行名称">
                        </el-table-column>
                        <el-table-column
                                prop="amount"
                                label="金额">
                        </el-table-column>
                        <el-table-column
                                label="审核状态">
                            <template slot-scope="scope">
                                <!--scope.row-->
                                <span v-if="scope.row.withdrawStatus=='1'">提现中</span>
                                <span class="scope_btn color-blue" v-if="scope.row.withdrawStatus=='2'">提现成功</span>
                                <span class="scope_btn color-red" v-if="scope.row.withdrawStatus=='3'">提现失败</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="withdrawFailedReason"
                                label="提现失败原因">
                        </el-table-column>
                        <el-table-column

                                label="申请时间">
                            <template slot-scope="scope">
                                <span>
                                    {{timeFormatFun(scope.row.createTime)}}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="200"
                                label="操作">
                            <template slot-scope="scope">
                                <!--scope.row-->
                                <span class="scope_btn color-blue" v-if="scope.row.withdrawStatus=='1'"
                                      @click="toAudit(scope.row)">审核</span>
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
        <transition withdrawBankUserName="fade">
            <div class="loading-container" v-show="loadingShow">
                <loading :loadingText="loadingText"></loading>
            </div>
        </transition>
        <footerbar/>
        <el-dialog title="提现审核"
                   class="minWA"
                   :visible.sync="balanceChangeAuditShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <el-form>
                <el-form-item size="small" label="姓名：" :label-width="formBalanceChangeAuditWidth">
                    <el-input v-model="balanceChangeAuditItem.withdrawBankUserName" readonly autocomplete="off" width="200px;" ></el-input>
                </el-form-item>
                <el-form-item size="small" label="银行名称：" :label-width="formBalanceChangeAuditWidth">
                    <el-input v-model="balanceChangeAuditItem.withdrawBankFullName" readonly autocomplete="off" width="200px;" ></el-input>
                </el-form-item>
                <el-form-item size="small" label="金额：" :label-width="formBalanceChangeAuditWidth">
                    <el-input v-model="balanceChangeAuditItem.amount" readonly autocomplete="off" width="200px;" ></el-input>
                </el-form-item>
                <el-form-item label="审核状态：" :label-width="formBalanceChangeAuditWidth">
                    <el-select v-model="balanceChangeAuditItem.withdrawStatus" placeholder="请选择">
                        <el-option
                                v-for="items in auditList"
                                :key="items.value"
                                :label="items.label"
                                :value="items.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="small" label="提现失败原因：" :label-width="formBalanceChangeAuditWidth">
                    <el-input v-model="balanceChangeAuditItem.withdrawFailedReason" autocomplete="off" width="400px;" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="balanceChangeAuditShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="balanceChangeAuditCommit()">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import store from 'si-store'
    import {MyGet, MyPost} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from 'components/footerbar/footerbar.vue'

    export default {
        name: 'stockInManagerment',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
				searchList: {
                    withdrawStatus: '',
                    withdrawBankUserName: '',
                    withdrawBankFullName: ''
				},
                balanceChangeAuditItem: {
                    id:'',
                    withdrawStatus:'',
                    withdrawFailedReason:'',
                    withdrawBankUserName:'',
                    withdrawBankFullName:'',
                    amount:''
                },
                auditList: [{
                    value: 2,
                    label: '提现成功'
                }, {
                    value: 3,
                    label: '提现失败'
                }],
                formLabelWidth: '120px',
                formBalanceChangeAuditWidth: '200px',
                loadingShow: false,
                balanceChangeAuditShow: false,
                loadingText: '正在加载中...',
                tableData: [],
                page_show: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                addBoxShow: false,
                multipleTable: "",
                options: [],
                loadingName:""
            }
        },
        created() {
            this.$store.state.navTit = '提现审核';
            this.$store.state.navChildTit = '提现审核';
            this.queryListFn();
        },
        methods: {
            timeFormatFun(time) {
                if (time){
                    var d = new Date(time.replace(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2}).*$/, '$1 $2 GMT+0000').replace(/-/g, '/'))
                    var year = d.getFullYear();       //年
                    var month = d.getMonth() + 1;     //月
                    var day = d.getDate();            //日
                    var hh = d.getHours();            //时
                    var mm = d.getMinutes();          //分
                    var ss = d.getSeconds();           //秒
                    var clock = year + "-";
                    if (month < 10)
                        clock += "0";
                    clock += month + "-";
                    if (day < 10)
                        clock += "0";
                    clock += day;
                    clock += " ";
                    if (hh < 10)
                        clock += "0";
                    clock += hh + ":";
                    if (mm < 10)
                        clock += "0";
                    clock += mm + ":";
                    if (ss < 10)
                    clock += "0";
                    clock += ss;
                    return (clock);
                }
            },
            balanceChangeAuditCommit() {
                if(this.balanceChangeAuditItem.withdrawStatus==''){
                    this.$message.error('请选择审核状态');
                    return;
                }
                console.info(this.balanceChangeAuditItem.id)
                if(this.balanceChangeAuditItem.id!=''){
                    this.loadingShow = true;
                    MyPost('/yl-ms-platform/MemberBalance/v1/withdrawAudit', {
                        id: this.balanceChangeAuditItem.id,
                        withdrawStatus: this.balanceChangeAuditItem.withdrawStatus,
                        withdrawFailedReason: this.balanceChangeAuditItem.withdrawFailedReason
                    }).then((res) => {
                        this.queryListFn();
                        this.loadingShow = false;
                        this.balanceChangeAuditShow = false
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                        } else {
                            this.$message.error(message);
                        }
                    })
                }
            },
            toAudit(item){
                this.balanceChangeAuditItem={
                    id:item.id,
                    withdrawStatus:'',
                    withdrawFailedReason:item.withdrawFailedReason,
                    withdrawBankUserName:item.withdrawBankUserName,
                    amount:item.amount,
                    withdrawBankFullName:item.withdrawBankFullName
                }
                this.balanceChangeAuditShow = true;
            },
            queryListFnMall() {
                this.currentPage = 1;
                this.queryListFn();
            },
            handleSelectionChange(val) {
                this.multipleTable = val;
            },
            clearFn() {
                this.searchList = {
                    withdrawBankUserName: '',//商品模板
                    withdrawStatus: '',//
                    withdrawBankFullName: ''
                };
				this.loadingName=this.$loading({
				    lock: true,
				    text: 'Loading',
				    spinner: 'el-icon-loading',
				    background: 'rgba(0, 0, 0, 0.8)'
				});
                this.queryListFn();
            },
            queryListFn() {
                MyGet('/yl-ms-platform/MemberBalance/v1/getItemList', {
                    type:3,
                    withdrawStatus: this.searchList.withdrawStatus,
                    withdrawBankUserName: this.searchList.withdrawBankUserName,
                    withdrawBankFullName: this.searchList.withdrawBankFullName,
                    start: (this.currentPage - 1) * 10,
                    length: 10
                }).then((res) => {
					if(this.loadingName){
						this.loadingName.close();
					}
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
                this.form.parentCode = "";
                this.addBoxShow = true;
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../styles/css/my.scss"
    #printTest
        @page{
            size:  auto;   /* auto is the initial value */
            margin: 0 30px;  /* this affects the margin in the printer settings */
        }

        html{
            background-color: #FFFFFF;
            margin: 0px;  /* this affects the margin on the html before sending to printer */
        }

        body{
            margin: 0px; /* margin you want for the content */
        }

        .title-1
            /*line-height 40px*/
            margin-top 20px
            font-weight 600
            font-size 18px
            text-align center
        .title-2
            line-height 40px
            font-weight 500
            font-size 14px
            text-align center
        .title-3
            color #666666
            display flex
            flex-direction row
            align-items center
            font-size 14px
            line-height 40px
        .title-4
            width 33%
        .title-5
            width 33%
            text-align left
        .title-6
            width 100%
            text-align right
        .title-7
            width 33%
            text-align right
        .title-8
            width 100%
            text-align left
        .title-p
            /*height 1px*/
            border 0.5px solid #333333
            width 100%
            margin 20px 0
    .pagenum_modPrint
        .el-pagination__total
            display none !important
        .el-pagination__jump
            display none !important
        .el-pagination
            text-align right
    .prochusingManagement
        .el-input__inner {
            height: 28px;
            line-height: 28px;
        }
        .minW-print .el-dialog
            width 840px

            .el-radio__label
                font-size 12px
        .minW .el-dialog
            width 680px

            .el-radio__label
                font-size 12px
        .minN .el-dialog
            width 840px

        .nav-top
            background #fff
            padding-left 20px
            height 35px
            position fixed
            z-index 2
            width 100%
            box-shadow 0px 0px 6px 0px rgba(174, 174, 174, 0.14)
            .el-button
                padding 0 0
                border none
            .el-button:hover
                color #333333
                background #ffffff
                border-color #ffffff
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
            padding-top 40px

            .contain-top
                overflow hidden
                /*margin-bottom 15px*/

                .search-btn
                    font-size 12px
                    line-height 28px
                    color #333
                    display inline-block
                    margin-bottom 15px

        /*margin-right 22px*/

        .result-con
            /*padding-bottom 100px*/
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
