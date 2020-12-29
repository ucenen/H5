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
                <span class="search-btn">会员真实姓名：</span>
                <el-input size="mini" @keyup.enter.native="queryListFnMall" maxlength="30" class="w106 mr30"
                          v-model="searchList.name"></el-input>
                <span class="search-btn">身份证号：</span>
                <el-input size="mini" @keyup.enter.native="queryListFnMall" maxlength="30" class="w106 mr30"
                          v-model="searchList.identity"></el-input>
                <span class="search-btn">审核状态：</span>
                <el-select class="w120 mr30" size="mini" placeholder="全部" v-model="searchList.auditStatus">
                    <el-option
                            label="全部"
                            value="">
                    </el-option>
                    <el-option
                            label="审核中"
                            value="1">
                    </el-option>
                    <el-option
                            label="认证通过"
                            value="2">
                    </el-option>
                    <el-option
                            label="认证不通过"
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
                                prop="name"
                                label="会员真实姓名">
                        </el-table-column>
                        <el-table-column
                                prop="identity"
                                label="身份证号码">
                        </el-table-column>
                        <el-table-column
                                label="审核状态">
                            <template slot-scope="scope">
                                <!--scope.row-->
                                <span v-if="scope.row.auditStatus=='1'">审核中</span>
                                <span class="scope_btn color-blue" v-if="scope.row.auditStatus=='2'">认证通过</span>
                                <span class="scope_btn color-red" v-if="scope.row.auditStatus=='3'">认证不通过</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="auditMemo"
                                label="审核意见">
                        </el-table-column>
                        <el-table-column
                                width="200"
                                label="操作">
                            <template slot-scope="scope">
                                <!--scope.row-->
                                <span class="scope_btn color-blue" v-if="scope.row.auditStatus=='1'"
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
        <transition name="fade">
            <div class="loading-container" v-show="loadingShow">
                <loading :loadingText="loadingText"></loading>
            </div>
        </transition>
        <footerbar/>
        <el-dialog title="实名认证审核"
                   class="minWA"
                   :visible.sync="realNameShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <el-form>
                <el-form-item size="small" label="会员真实姓名：" :label-width="formRealNameWidth">
                    <el-input v-model="realNameItem.name" readonly autocomplete="off" width="200px;" ></el-input>
                </el-form-item>
                <el-form-item size="small" label="身份证号码：" :label-width="formRealNameWidth">
                    <el-input v-model="realNameItem.identity" readonly autocomplete="off" width="200px;" ></el-input>
                </el-form-item>
                <el-form-item label="审核状态：" :label-width="formRealNameWidth">
                    <el-select v-model="realNameItem.auditStatus" placeholder="请选择">
                        <el-option
                                v-for="items in auditList"
                                :key="items.value"
                                :label="items.label"
                                :value="items.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="small" label="身份证照片正面图：" :label-width="formRealNameWidth">
                    <img :src="realNameItem.identityCardUrl1" />
                </el-form-item>
                <el-form-item size="small" label="身份证照片背面图：" :label-width="formRealNameWidth">
                    <img :src="realNameItem.identityCardUrl2" />
                </el-form-item>
                <el-form-item size="small" label="身份证照片3：" :label-width="formRealNameWidth">
                    <img :src="realNameItem.identityCardUrl3" />
                </el-form-item>

                <el-form-item size="small" label="审核意见：" :label-width="formRealNameWidth">
                    <el-input v-model="realNameItem.auditMemo" autocomplete="off" width="400px;" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="realNameShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="realNameCommit()">确认</el-button>
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
                    auditStatus: '',
                    name: '',
                    identity: ''
				},
                realNameItem: {
                    id:'',
                    auditStatus:'',
                    auditMemo:'',
                    identityCardUrl2:'',
                    identityCardUrl1:'',
                    identityCardUrl3:'',
                    name:'',
                    identity:''
                },
                auditList: [{
                    value: 2,
                    label: '认证通过'
                }, {
                    value: 3,
                    label: '认证不通过'
                }],
                formLabelWidth: '120px',
                formRealNameWidth: '200px',
                loadingShow: false,
                realNameShow: false,
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
            this.$store.state.navTit = '会员管理';
            this.$store.state.navChildTit = '会员实名认证';
            this.queryListFn();
        },
        methods: {
            realNameCommit() {
                if(this.realNameItem.auditStatus==''){
                    this.$message.error('请选择审核状态');
                    return;
                }
                if(this.realNameItem.id!=''){
                    this.loadingShow = true;
                    MyPost('/yl-ms-platform/app/member/realName/audit', {
                        id: this.realNameItem.id,
                        auditStatus: this.realNameItem.auditStatus,
                        auditMemo: this.realNameItem.auditMemo
                    }).then((res) => {
                        this.queryListFn();
                        this.loadingShow = false;
                        this.realNameShow = false
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
                this.realNameItem={
                    id:item.id,
                    auditStatus:'',
                    auditMemo:item.auditMemo,
                    identityCardUrl2:item.identityCardUrl2,
                    identityCardUrl1:item.identityCardUrl1,
                    identityCardUrl3:item.identityCardUrl3,
                    name:item.name,
                    identity:item.identity
                }
                this.realNameShow = true;
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
                    name: '',//商品模板
                    auditStatus: '',//
                    identity: ''
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
                MyGet('/yl-ms-platform/app/member/realName/getItemList', {
                    auditStatus: this.searchList.auditStatus,
                    name: this.searchList.name,
                    identity: this.searchList.identity,
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
    @import "../../../styles/css/my.scss"
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
