<template>
    <div class="storeList">
        <div class="nav-top">
            <div class="nav-box" @click="goPage">
                <img src="../../../../static/img/icon-01.png"/>
                <p class="color-red">新增</p>
            </div>
            <div class="nav-box" @click="reviewClk()">
                <img src="static/img/fuhe.png"/>
                <p>复核</p>
            </div>
            <div class="nav-box" @click="delClkAll">
                <img src="static/img/icon-02.png"/>
                <p>删除</p>
            </div>
            <div class="nav-box" @click="">
                <img src="static/img/import.png"/>
                <p>导入</p>
            </div>
            <div class="nav-box" @click="isShopOpenAll(1)">
                <img src="static/img/qiyong.png"/>
                <p>启用</p>
            </div>
            <div class="nav-box" @click="isShopOpenAll(2)">
                <img src="static/img/jinyong.png"/>
                <p>禁用</p>
            </div>
            <div class="nav-box" @click="clearFn">
                <img src="static/img/icon-04.png"/>
                <p>刷新</p>
            </div>
        </div>
        <div class="contain-mod">
            <div class="contain-top">
                <span class="search-btn">门店名称：</span>
                <el-input size="mini" class="w106 mr30" @keyup.enter.native="queryListFnMall"
                          v-model="search_list.name"></el-input>
                <span class="search-btn">门店类型：</span>
                <el-tooltip class="w120 mr30" effect="dark" content="门店类型" placement="top-start">
                    <el-select size="mini" placeholder="门店类型" v-model="search_list.companyType">
                        <el-option
                                label="全部"
                                value="">
                        </el-option>
                        <el-option
                                v-for="item in shopTypeList"
                                :key="item"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-tooltip>
                <span class="search-btn">状态：</span>
                <el-tooltip class="w120 mr30" effect="dark" content="门店状态" placement="top-start">
                    <el-select size="mini" placeholder="门店状态" v-model="search_list.status">
                        <el-option
                                label="全部"
                                value="">
                        </el-option>
                        <el-option
                                v-for="item in typeList"
                                :key="item"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-tooltip>

                <span class="search-btn">复核状态：</span>
                <el-tooltip class="w120 mr30" effect="dark" content="复核状态" placement="top-start">
                    <el-select size="mini" placeholder="复核状态" v-model="search_list.auditStatus">
                        <el-option
                                label="全部"
                                value="">
                        </el-option>
                        <el-option
                                v-for="item in reviewList"
                                :key="item"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-tooltip>
                <el-button size="mini" type="primary" plain class="mr22" @click="queryListFnMall">查询</el-button>
                <!--                <el-button size="mini" type="primary" plain class="mr22" @click="serachBoxShow = true">高级查询</el-button>-->
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
                                prop="companyCode"
                                label="门店编号">
                        </el-table-column>

                        <el-table-column
                                prop="name"
                                label="门店名称">
                        </el-table-column>
                        <el-table-column
                                prop="ceo"
                                label="门店联系人">
                        </el-table-column>
                        <el-table-column
                                prop="ceoPhone"
                                label="联系人电话">
                        </el-table-column>
                        <el-table-column
                                prop="area"
                                label="门店地址">
                        </el-table-column>
                        <el-table-column
                                width="100"
                                label="门店类型">
                            <template slot-scope="scope">
                                {{scope.row.companyType==1?'直营':'专卖'}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="100"
                                label="门店状态">
                            <template slot-scope="scope">
                                {{scope.row.status==1?'启用':scope.row.status==2?'禁用':''}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="100"
                                label="复核状态">
                            <template slot-scope="scope">
                                {{scope.row.auditStatus==1?'复核通过':scope.row.auditStatus==2?'复核不通过'
                                :scope.row.auditStatus==3?'待复核':''}}
                            </template>
                        </el-table-column>
                        <!--                        <el-table-column-->
                        <!--                                width="80"-->
                        <!--                                label="账号管理">-->
                        <!--                            <template slot-scope="scope">-->
                        <!--                                &lt;!&ndash;scope.row&ndash;&gt;-->
                        <!--                                <span class="scope_btn color-blue" @click="goAccount(scope.row)">配置</span>-->
                        <!--                            </template>-->
                        <!--                        </el-table-column>-->
                        <el-table-column
                                width="170"
                                label="操作">
                            <template slot-scope="scope">
                                <!--scope.row-->
<!--                                <span class="scope_btn color-blue"-->
<!--                                      v-if="scope.row.auditStatus!=2"-->
                                <span class="scope_btn color-blue"
                                      @click="goInfor(scope.row)">查看</span>

                                <!-- 复核状态：1.通过 2.未通过 3.待复核-->
                                <span class="scope_btn color-blue"
                                      v-if="scope.row.auditStatus==3"
                                      @click="review(scope.row)">复核</span>
                                <span class="scope_btn color-blue color-underline"
                                      v-if="scope.row.auditStatus==2" @click="editClk(scope.row.id)">编辑</span>
                                <span class="scope_btn color-blue color-underline"
                                      v-if="scope.row.auditStatus==2"
                                      @click="delClk(scope.row)">删除</span>
                                <span class="scope_btn color-blue"
                                      v-if="scope.row.auditStatus==1"
                                      @click="accountSet(scope.row)">帐号配置</span>
                                <!-- 门店状态：1.启用 2.禁用-->
                                <span class="scope_btn color-blue"
                                      v-if="scope.row.auditStatus==1"
                                      @click="isShopOpen(scope.row)">
                                    {{scope.row.status==1?'禁用':scope.row.status==2?'启用':''}}</span>
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

        <el-dialog title="复核意见"
                   class="minW"
                   :visible.sync="reveiwShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="add-contain">
                <el-form :model="reveiwForm">
                    <div class="new-other">
                        <el-form-item size="small" label="复核结果：" :label-width="formLabelWidth">
                            <el-radio-group v-model="reveiwForm.auditStatus">
                                <el-radio :label="1">通过</el-radio>
                                <el-radio :label="2">不通过</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div class="new-other">
                        <el-form-item size="small" label="复核意见：" :label-width="formLabelWidth">
                            <el-input
                                    type="textarea"
                                    :rows="3"
                                    maxlength="200"
                                    placeholder="请输入内容"
                                    v-model="reveiwForm.memo">
                            </el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="reveiwShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="reviewClick">确认</el-button>
            </div>
        </el-dialog>
        <el-dialog title="账号配置"
                   class="minWA"
                   :visible.sync="accountShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <el-form>
                <el-form-item size="small" label="门店编号：" :label-width="formAccountWidth">
                    <el-input v-model="accountItem.companyCode" :disabled="true" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item size="small" label="门店名称：" :label-width="formAccountWidth">
                    <el-input v-model="accountItem.name" :disabled="true" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item size="small" label="统一社会信用代码：" :label-width="formAccountWidth">
                    <el-input v-model="accountItem.uscc" :disabled="true" autocomplete="off"></el-input>
                </el-form-item>
                <!--                <el-form-item size="small" label="账号类型：" :label-width="formAccountWidth">-->
                <!--                    <el-input v-model="searchList.type" :disabled="true" autocomplete="off"></el-input>-->
                <!--                </el-form-item>-->
                <el-form-item size="small" label="* 登录ID：" :label-width="formAccountWidth">
                    <el-input v-model="searchList.userName" maxlength="20" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item size="small" label="* 登录密码：" :label-width="formAccountWidth">
                    <el-input :placeholder="passwordHolder" maxlength="20" v-model="searchList.password"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item size="small" label="是否启用：" :label-width="formAccountWidth">
                    <el-radio-group v-model="searchList.dataStatus">
                        <el-radio label="1">启用</el-radio>
                        <el-radio label="2">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="accountShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="accountCommit">确认</el-button>
            </div>
        </el-dialog>
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
        <el-dialog
                :title="shopStatusTitle"
                :visible.sync="shopStatusShow"
                width="30%"
                :close-on-click-modal="false"
                :close-on-press-escape="false">
            <div class="tip-contain">
                <p>正在执行{{shopStatusTitle}}操作，是否确认{{shopStatusTitle}}？</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="shopStatusShow = false">取 消</el-button>
                <el-button type="primary" size="small" @click="shopStatusAll">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import store from 'si-store'
    import {MyPost, MyGet} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../../../components/footerbar/footerbar.vue'

    export default {
        name: 'storeList',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                loadingShow: false,
                loadingText: '正在加载中...',
                search_list: {
                    status: '',//,启用，禁用
                    auditStatus: '',//待复核,复核不通过,启用，禁用
                    name: '',//企业名称
                    companyType: ''//类型（1 直营 2加盟）
                },
                typeList: [
                    {
                        label: '启用',
                        value: '1'
                    },
                    {
                        label: '禁用',
                        value: '2'
                    }
                ],
                reviewList: [
                    {
                        label: '复核通过',
                        value: '1'
                    },
                    {
                        label: '复核不通过',
                        value: '2'
                    }
                ],
                shopTypeList: [
                    {
                        label: '直营',
                        value: '1'
                    },
                    {
                        label: '专卖',
                        value: '2'
                    }
                ],
                tableData: [],
                page_show: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                serachBoxShow: false,//高级查询弹窗显示
                formLabelWidth: '120px',
                formAccountWidth: '150px',

                accountItem: '',
                reveiwForm: {
                    auditStatus: "",
                    id: '',
                    memo: "",
                },
                reveiwShow: false,//复核弹窗显示
                accountShow: false,//账号配置弹窗显示
                shopStatusShow: false,//门店启用，禁用
                delShow: false,
                searchList: {

                    dataStatus: '0',
                    type: '企业管理员',
                    userName: '',
                    password: '',
                },
                sendId: '',
                multipleTable: "",
                delIds: [],
                shopStatus: '',
                shopStatusTitle: '',
                passwordHolder: ""
            }
        },
        created() {
            this.$store.state.navTit = '门店管理';
            this.$store.state.navChildTit = '门店管理';
            this.queryListFn();
        },
        methods: {
            queryListFnMall() {
                this.currentPage = 1;
                this.queryListFn();
            },
            reviewClick() {
                if (!this.reveiwForm.auditStatus) {
                    this.$message.error('请选择复核结果');
                    return
                }

                this.loadingShow = true;
                MyPost('/polaris/shop/auditCompany', {
                    auditStatus: this.reveiwForm.auditStatus,
                    ids: this.delIds,
                    memo: this.reveiwForm.memo,
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.reveiwShow = false;
                        this.$message({
                            message: '复核成功',
                            type: 'success'
                        });
                        this.queryListFn();
                    } else {
                        this.$confirm(message, '提示', {
                            confirmButtonText: '确定',
                            showCancelButton: false,
                            type: 'error'
                        }).then(() => {

                            this.reveiwShow = false;
                        }).catch(() => {
                            this.revShow = false;
                        });
                    }
                })

            },
            review(item) {
                this.reveiwForm = {
                    auditStatus: "",
                    memo: "",
                };
                this.delIds = []
                this.delIds.push(item.id)
                this.reveiwShow = true;
            },
            configDelClk() {
                this.loadingShow = true;
                MyPost('/polaris/shop/delShopInfo', {
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

                for (var i = 0; i < this.multipleTable.length; i++) {
                    if (this.multipleTable[i].auditStatus != 2) {
                        this.$confirm('门店编号:' + this.multipleTable[i].companyCode +
                            '的门店状态不是”复核不通过“，无法进行删除操作', '提示', {
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
                this.delIds = this.multipleTable.map(item => {
                    return item.id
                });
                this.delShow = true;
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
                for (var i = 0; i < this.multipleTable.length; i++) {
                    if (this.multipleTable[i].auditStatus != 3) {
                        this.$confirm('门店编号:' + this.multipleTable[i].companyCode +
                            '的门店状态不是”待复核“，无法进行复核操作', '提示', {
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
                this.reveiwForm = {
                    auditStatus: "",
                    memo: "",
                };
                this.delIds = this.multipleTable.map(item => {
                    return item.id
                });
                this.reveiwShow = true;
            },
            handleSelectionChange(val) {
                this.multipleTable = val;
            },
            queryListFn() {

                this.loadingShow = true;

                MyPost('/polaris/shop/queryList', {
                    // MyPost('http://192.188.30.168:20016/shop/queryList', {
                    name: this.search_list.name,
                    auditStatus: this.search_list.auditStatus,
                    companyType: this.search_list.companyType,
                    status: this.search_list.status,
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
            clearFn() {
                this.search_list = {
                    status: '',//,启用，禁用
                    auditStatus: '',//待复核,复核不通过,启用，禁用
                    name: '',//企业名称
                    companyType: ''//类型（1 直营 2加盟）
                }
                this.queryListFn();
            },
            searchBtnClk() {
                this.serachBoxShow = false;
                this.queryListFn();
            },
            isShopOpenAll(status) {
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
                var type= status == 1 ? '启用' : '禁用'
                var type2= status == 1 ? '禁用' : '启用'
                for (var i = 0; i < this.multipleTable.length; i++) {
                    if (this.multipleTable[i].auditStatus != 1||this.multipleTable[i].status == status ) {
                        this.$confirm('门店编号:' + this.multipleTable[i].companyCode +
                            '的门店状态不是”复核通过“状态，或者不是'+type2+'状态，无法进行' + type + '操作', '提示', {
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

                    // if (this.multipleTable[i].status == status) {
                    //     this.$confirm('门店编号:' + this.multipleTable[i].companyCode +
                    //     '的门店状态不是' +type2+ '状态，无法进行' + type + '操作', '提示', {
                    //         confirmButtonText: '确定',
                    //         showCancelButton: false,
                    //         type: 'error'
                    //     }).then(() => {
                    //         this.revShow = false;
                    //     }).catch(() => {
                    //         this.revShow = false;
                    //     });
                    //     return;
                    // }
                }
                this.shopStatus = status
                this.delIds = this.multipleTable.map(item => {
                    return item.id
                });
                this.shopStatusShow = true;
            },
            isShopOpen(item) {
                this.delIds = [];
                this.delIds.push(item.id)
                if (item.status == 1) {
                    this.shopStatus = '2'
                    this.shopStatusTitle = '禁用'
                } else if (item.status == 2) {
                    this.shopStatus = '1'
                    this.shopStatusTitle = '启用'
                }
                this.shopStatusShow = true;
            },

            shopStatusAll() {

                this.loadingShow = true;
                MyPost('/polaris/shop/statusAll', {
                    ids: this.delIds,
                    status: this.shopStatus,
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.queryListFn()
                        this.$message({
                            message: this.shopStatus == 1 ? '启用成功' : '禁用成功',
                            type: 'success'
                        });
                        this.shopStatusShow = false
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            accountSet(item) {
                this.searchList = {

                    dataStatus: '0',
                    userName: '',
                    password: '',
                },
                    this.accountItem = item

                this.accountShow = true
                this.selectShopUserFn(item);
            },
            accountCommit() {
                if (this.searchList.userName.length == 0) {
                    this.$message.error('请填写登录ID');
                    return
                }
                if (this.searchList.password.length == 0 && this.passwordHolder.length == 0) {
                    this.$message.error('请填写登录密码');
                    return
                }
                if (this.searchList.dataStatus == 0) {
                    this.$message.error('请选择启用或者禁用');
                    return
                }

                this.loadingShow = true;
                MyPost('/polaris/shop/configureAccount', {
                    id: this.sendId,
                    shopId: this.accountItem.id,
                    name: this.searchList.userName,
                    password: this.searchList.password,
                    status: this.searchList.dataStatus,
                }).then((res) => {
                    this.loadingShow = false;
                    this.accountShow = false
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.$message({
                            message: '配置成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            selectShopUserFn(item) {
                this.loadingShow = true;
                MyPost('/polaris/shop/selectAccount', {
                    shopId: item.id
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        if (data) {
                            this.searchList.userName = data.name;
                            this.searchList.dataStatus = data.status;
                            this.sendId = data.id;
                            if (data.password) {
                                this.passwordHolder = '●●●●●●';
                            }

                        }
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            goInfor(item) {
                this.$router.push({
                    path: '/storeInformation',
                    query: {
                        id: item.id,
                        auditStatus: item.auditStatus
                    }
                })
            },
            editClk(id) {
                this.$router.push({
                    path: '/storeInformationAdd',
                    query: {
                        id: id
                    }
                })
            },
            goPage() {
                this.$router.push({
                    path: '/storeInformationAdd'
                })
            },
            goAccount(item) {
                this.$router.push({
                    path: '/storeAccount',
                    query: {
                        id: item.id,
                        companyCode: item.id,
                        name: item.name,
                        companyType: item.companyType
                    }
                })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .storeList
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
