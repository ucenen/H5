<template>
    <div class="logisticsCompanyList">
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
            <div class="contain-top">
                <span class="search-btn">公司编号：</span>
                <el-input size="mini" class="w106 mr30" v-model="search_list.companyCode"></el-input>
                <span class="search-btn">公司名称：</span>
                <el-input size="mini" class="w106 mr30" v-model="search_list.companyName"></el-input>
                <span class="search-btn">是否启用：</span>
                <el-tooltip class="w120 mr30" effect="dark" content="是否启用" placement="top-start">
                    <el-select size="mini" placeholder="是否启用" v-model="search_list.status">
                        <el-option
                                label="全部"
                                value="">
                        </el-option>
                        <el-option
                                v-for="item in dataStatusList"
                                :key="item"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-tooltip>
                <span class="search-btn">新增时间：</span>
                <el-date-picker
                        size="mini"
                        v-model="search_list.creationTime"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        type="date"
                        class="w140 mr30"
                        placeholder="新增时间">
                </el-date-picker>
                <el-button size="mini" type="primary" plain class="mr22" @click="queryListFn">查询</el-button>
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
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="companyCode"
                                label="公司编号">
                        </el-table-column>
                        <el-table-column
                                prop="companyName"
                                label="公司名称">
                        </el-table-column>
                        <el-table-column
                                prop="memo"
                                label="配送描述">
                        </el-table-column>
                        <el-table-column
                                label="新增时间">
                            <template slot-scope="scope">
                                {{timeFormatFun(scope.row.creationTime)}}
                            </template>
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
        name: 'logisticsCompanyList',
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
                search_list: {
                    companyCode: '',//公司编号
                    companyName: '',//公司名称
                    status: '',//是否可用 1是2否
                    creationTime: ''//新建时间
                },
                dataStatusList: [
                    {
                        label: '是',
                        value: '1'
                    },
                    {
                        label: '否',
                        value: '2'
                    }
                ],
                delShow: false,
                delId: '',
                configDel: 0,//0单个删除1全部
                multipleSelection: []
            }
        },
        created() {
            this.$store.state.navTit = '系统';
            this.$store.state.navChildTit = '物流公司';
            this.queryListFn();
        },
        methods: {
            timeFormatFun(time) {
                if (time) {
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
                    clock += day + " ";
                    if (hh < 10)
                        clock += "0";

                    clock += hh + ":";
                    if (mm < 10) clock += '0';
                    clock += mm + ":";

                    if (ss < 10) clock += '0';
                    clock += ss;
                    return (clock);
                }
            },
            clearFn() {
                this.search_list = {
                    companyCode: '',//公司编号
                    companyName: '',//公司名称
                    status: '',//是否可用 1是2否
                    creationTime: ''//新建时间
                }
            },
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
                    MyPost('/yl-ms-platform/logisticsCompany/delLogisticsCompany', {
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
                    MyPost('/yl-ms-platform/logisticsCompany/delBatchLogisticsCompany', {
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
                MyGet('/yl-ms-platform/logisticsCompany/queryList', {
                    companyCode: this.search_list.companyCode,
                    companyName: this.search_list.companyName,
                    status: this.search_list.status,
                    creationTime: this.search_list.creationTime,
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
                this.queryListFn();
            },
            goPage() {
                this.$router.push({
                    path: '/logisticsCompanySet'
                })
            },
            editClk(item) {
                this.$router.push({
                    path: '/logisticsCompanySet',
                    query: {
                        id: item.id,
                        companyCode: item.companyCode,//公司编号
                        companyName: item.companyName,//公司名称
                        status: item.status,//是否可用 1是2否
                        memo: item.memo
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

    .logisticsCompanyList
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
