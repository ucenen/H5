<template>
    <div class="categoryManagement">
        <div class="nav-top">
            <div class="nav-box" @click="addBrand" v-if="functionCodes.indexOf('AD')>-1">
                <img src="../../framework/images/addNew.png"/>
                <p>新增</p>
            </div>
            <div class="nav-box" @click="configClkAll" v-if="functionCodes.indexOf('DE')>-1">
                <img src="./icon-02.png"/>
                <p>删除</p>
            </div>
            <div class="nav-box" @click="reFresh" v-if="functionCodes.length>=0">
                <img src="./icon-04.png"/>
                <p>刷新</p>
            </div>
        </div>
        <div class="contain-mod">
            <div class="contain-top">
                <span class="search-btn">用户帐号：</span>
                <el-input size="mini" @keyup.enter.native="queryListFnMall" v-model="userName" class="w106 mr30"></el-input>
                <span class="search-btn">用户姓名：</span>
                <el-input size="mini" @keyup.enter.native="queryListFnMall" v-model="userAccount" class="w106 mr30"></el-input>
                <span class="hidden-md-and-down search-btn">手机号码：</span>
                <el-input size="mini" @keyup.enter.native="queryListFnMall" v-model="userMobile" class="w106 mr30 hidden-md-and-down"></el-input>
                <span class="search-btn">帐号状态：</span>
                <el-select class="w106 mr30" size="mini" placeholder="帐号状态" v-model="status">
                    <el-option
                            label="全部"
                            value="">
                    </el-option>
                    <el-option
                            label="启用"
                            value="1">
                    </el-option>
                    <el-option
                            label="禁用"
                            value="2">
                    </el-option>
                </el-select>
                <el-button size="mini" type="primary" plain class="mr22" @click="queryListFnMall">查询</el-button>
                <el-button size="mini" type="primary" class="mr22" @click="clearClk">清空</el-button>
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
                                prop="userName"
                                label="用户帐号">
                        </el-table-column>
                        <el-table-column
                                prop="fullName"
                                label="用户姓名">
                        </el-table-column>
                        <el-table-column
                                label="性别"
                                prop="sex">
                        </el-table-column>
                        <el-table-column
                                label="公司编号"
                                prop="companyNumber">
                        </el-table-column>
                        <el-table-column
                                label="员工编号"
                                prop="staffNumber">
                        </el-table-column>
                        <el-table-column
                                label="电子邮箱"
                                prop="email">
                        </el-table-column>
                        <el-table-column
                                label="手机号码"
                                prop="phoneNumber">
                        </el-table-column>
                        <el-table-column
                                label="帐号状态"
                                width="120">
                            <template slot-scope="scope">
                                <span>{{scope.row.status == '1' ? "启用":"禁用"}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="170"
                                label="操作">
                            <template slot-scope="scope">
                                <span class="scope_btn color-blue color-under-line" v-if="functionCodes.indexOf('ED')>-1"
                                      @click="editClk(scope.row)">编辑</span>
                                <span v-if="functionCodes.indexOf('DE')>-1" class="scope_btn color-red" @click="delClk(scope.row)">删除</span>
                                <span v-if="functionCodes.indexOf('XGMM')>-1" class="scope_btn color-blue" @click="updatePassword(scope.row)">修改密码</span>
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
        <el-dialog :title="titData"
                   class="minW minN"
                   :visible.sync="serachBoxShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="add-contain">
            <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth">
                <el-form-item size="small" label="用户登录帐号："  prop="name">
                    <el-input maxlength="30" v-model="form.userAccount" :disabled="titData=='修改用户' ? true : false"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item size="small" label="  帐号状态："  prop="type">
                    <el-select v-model="form.dataStatus" placeholder="启用">
                        <el-option label="启用" value="1"></el-option>
                        <el-option label="禁用" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="small" label="  登录密码："  v-if="titData=='新增用户'"  prop="password">
                    <el-input v-model="form.userPassWord" maxlength="30" autocomplete="off" show-password></el-input>
                    <el-span class="pass-span01">英文数字的组合不少于6位</el-span>
                </el-form-item>
                <el-form-item size="small" label="  确认密码："  v-if="titData=='新增用户'"  prop="passwordSure">
                    <el-input v-model="form.userSurePassWord"  maxlength="30" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item size="small" label="  用户姓名："  prop="userName">
                    <el-input v-model="form.userName" maxlength="30" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item size="small" label="  用户性别：" :label-width="formLabelWidth">
                    <el-select v-model="form.userGender" placeholder="请选择性别">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="small" label="  员工编号：" >
                    <el-input v-model="form.userPersonCode" maxlength="30" autocomplete="off"></el-input>
                </el-form-item>
                <!--<el-form-item size="small" label="* 公司编号：" :label-width="formLabelWidth">-->
                    <!--<el-input v-model="form.userCompanyCode" autocomplete="off"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item size="small" label="  电子邮箱：">
                    <el-input v-model="form.userMobileAddress" maxlength="30" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item size="small" label="  手机号码：">
                    <el-input v-model="form.userMobile" autocomplete="off"></el-input>
                </el-form-item>
               <!-- <el-form-item size="small" label="  所在部门：">
                    <el-select v-model="form.userDepartment" placeholder="请选择所在部门">
                        <el-option v-for="item in userDepartmentList"
                                   :key="item.dictionaryValue"
                                   :label="item.dictionaryValue"
                                   :value="item.dictionaryValue"></el-option>
                    </el-select>
                </el-form-item> -->
                <div class="new-other" v-if="functionCodes.indexOf('JSFP')>-1">
                    <el-form-item class="clearFox" size="small" label="角色分配：" :label-width="formLabelWidth">
                        <el-tree
                                default-expand-all
                                class="tree-other"
                                :data="data"
                                show-checkbox
                                node-key="id"
                                ref="tree"
                                highlight-current
                                :props="defaultProps">
                        </el-tree>
                    </el-form-item>
                </div>
            </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="serachBoxShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="addBrandClk">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="titPasswordData"
                   class="minW minN"
                   :visible.sync="passwordBoxShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="add-contain">
                <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth">
                    <el-form-item size="small" label="用户登录帐号："  prop="name">
                        <el-input maxlength="30" v-model="form.userAccount"  :disabled="true"
                                  autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="  用户姓名："   prop="userName" >
                        <el-input v-model="form.userName"  maxlength="30" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="  登录密码："  prop="password">
                        <el-input v-model="form.userPassWord" maxlength="30" autocomplete="off" show-password></el-input>
                        <el-span class="pass-span01">英文数字的组合不少于6位</el-span>
                    </el-form-item>

                    <el-form-item size="small" label="  确认密码："   prop="passwordSure">
                        <el-input v-model="form.userSurePassWord"  maxlength="30" autocomplete="off" show-password></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="passwordBoxShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="passwordBoxSure">确定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import store from 'si-store'
    import {MyGet, MyPost, MyPostJson} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../footerbar/footerbar.vue'

    export default {
        name: 'rolePermissions',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                status:"",
                userAccount: "",
                userName: "",
                userMobile: "",
                userPhone: "",
                data: [],
                loadingShow: false,
                loadingText: '正在加载中...',
                categoryList: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                dataStatusList: [
                    {
                        label: '启用',
                        value: '1'
                    },
                    {
                        label: '不启用',
                        value: '2'
                    }
                ],
                dataStatusVal: '',//启用状态
                name: '',//分类名称
                childId: '',//当前id
                tableData: [],
                addform: {
                    name: '',//分类名称
                    dataStatus: '1',//分类状态
                    memo: '',//分类描述
                    sort: '',//排序
                    parentName: ''//上级分类
                },
                ul7: 'ul-7',
                ul77: 'ul-77',
                ul8: 'ul-8',
                ul88: 'ul-88',
                getAllList: [],
                titleVal: '新增类目',
                selfId: '',
                delId: '',
                page_show: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                formLabelWidth: '140px',
                delShow: false,
                addBoxShow: false,
                thisData: '',
                serachBoxShow: false,
                roleName: '',
                roleMedo: '',
                defulatId: 3,
                nameId: "",
                delIds: [],
                multipleTable: "",
                roleId: "",
                functionLists: [],
                checkList: [],
                form: {
                    userAccount: "",
                    userDepartment: "",
                    userDepartmentKey: "",
                    userName: "",
                    userMobile: "",
                    userGender: "女",
                    userMobileAddress: "",
                    userCompanyCode: "",
                    userPersonCode: "",
                    userPassWord: "",
                    userSurePassWord: "",
                    dataStatus: "1",
                    mobileNumber: ""
                },
                userDepartmentList: [],//部门列表数据
                functionCodes:[],
                rules:{
                    name: [
                        { required: true, message: '  ', trigger: 'blur' },
                    ],
                    type:[
                        { required: true, message: ' ', trigger: 'blur' },
                    ],
                    password:[
                        { required: true, message: ' ', trigger: 'blur' },
                    ],
                    passwordSure:[
                        { required: true, message: ' ', trigger: 'blur' },
                    ],
                    userName:[
                        { required: true, message: '  ', trigger: 'blur' },
                    ]
                },
                titPasswordData:"修改密码",
                passwordBoxShow:false,
            }
        },
        created() {
            this.$store.state.navTit = '系统管理';
            this.$store.state.navChildTit = '用户管理';
            this.queryListFn();
            this.getFunctionCode(this,this.$route.query.code);
            this.getTreeData("");
        },

        methods: {
            queryListFnMall(){
                this.currentPage = 1 ;
                this.queryListFn();
            },
            updateStatus(userId, dataStatus, item) {
                MyPost('/yl-ms-platform/user/updStatus', {
                    userId: userId,
                    status: dataStatus,
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {

                    } else {
                        this.$message.error(message);
                    }
                })
            },
            handleSelectionChange(val) {
                this.multipleTable = val;
            },
            passwordBoxSure(){
                if (!this.form.userPassWord) {
                    this.$message.error('请输入登录密码');
                    return
                }
                if (!this.form.userSurePassWord) {
                    this.$message.error('请输入确认密码');
                    return
                }
                if (!this.checkPassword(this.form.userSurePassWord)) {
                    this.$message.error('密码必须是字母和数字的组合,且不少于6位');
                    return
                }
                if (this.form.userPassWord != this.form.userSurePassWord) {
                    this.$message.error('两次输入的密码不一致');
                    return
                }
                this.loadingShow = true;
                MyPost('/yl-ms-platform/user/updPassword', {
                    id: this.roleId,
                    password:this.form.userPassWord,
                }).then((res) => {
                    this.loadingShow = false;
                    this.passwordBoxShow=false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.$message({
                            message: message,
                            type: 'success'
                        });
                        this.queryListFn();
                        // this.totalRecord = data.recordsTotal;
                    } else {
                        // this.$message.error(message);
                        this.$confirm(message, '提示', {
                            confirmButtonText: '确定',
                            showCancelButton:false,
                            type: 'error'
                        }).then(() => {
                            this.delShow = false;
                        }).catch(() => {
                            this.delShow = false;
                        });
                    }
                })
            },
            addBrandClk() {
                var that = this;
                if (!this.form.userAccount) {
                    this.$message.error('请输入用户登录帐号');
                    return
                }

                if (!this.checkNull(this.form.userMobile)) {
                    if(!this.checkPhone(this.form.userMobile)){
                        this.$message.error('手机号码格式错误');
                        return
                    }
                }
                if (!this.checkNull(this.form.userMobileAddress)) {
                    if (!this.checkMail(this.form.userMobileAddress)){
                        this.$message.error('邮箱格式错误');
                        return
                    }
                }

                if (this.titData == "新增用户") {
                    if (!this.form.userPassWord) {
                        this.$message.error('请输入登录密码');
                        return
                    }
                    if (!this.form.userSurePassWord) {
                        this.$message.error('请输入确认密码');
                        return
                    }
                    if (this.form.userAccount == this.form.userPassWord) {
                        this.$message.error('帐号密码不能一致');
                        return
                    }
                    if (!this.checkPassword(this.form.userSurePassWord)) {
                        this.$message.error('密码必须是字母和数字的组合,且不少于6位');
                        return
                    }
                    if (this.form.userPassWord != this.form.userSurePassWord) {
                        this.$message.error('两次输入的密码不一致');
                        return
                    }
                    if (!this.form.userName) {
                        this.$message.error('请输入用户姓名');
                        return
                    }
                    let beforeData = [];
                    if (this.functionCodes.indexOf('JSFP')>-1){
                        var datas = this.$refs.tree.getCheckedNodes(true, false);

                        for (var i = 0; i < datas.length; i++) {
                            beforeData.push(datas[i].id)
                        }
                    }
                    for (var i = 0; i < this.userDepartmentList.length; i++) {
                        if (this.form.userDepartment == this.userDepartmentList[i].dictionaryValue) {
                            this.form.userDepartmentKey = this.userDepartmentList[i].dictionaryKey
                        }
                    }
                    this.loadingShow = true;
                    MyPostJson('/yl-ms-platform/user/add', {
                        roleIds: beforeData,
                        userName: this.form.userAccount,
                        password: this.form.userPassWord,
                        phoneNumber: this.form.userMobile,
                        staffNumber: this.form.userPersonCode,
                        companyNumber: this.form.userCompanyCode,
                        sex: this.form.userGender,
                        email: this.form.userMobileAddress,
                        departmentKey: this.form.userDepartmentKey,
                        departmentValue: this.form.userDepartment,
                        fullName: this.form.userName,
                        status: this.form.dataStatus
                    }).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.serachBoxShow = false;
                            this.$message({
                                message: message,
                                type: 'success'
                            });
                            this.form = {
                                userAccount: "",
                                userDepartment: "",
                                userDepartmentKey: "",
                                userName: "",
                                userMobile: "",
                                userGender: "",
                                userMobileAddress: "",
                                userCompanyCode: "",
                                userPersonCode: "",
                                userPassWord: "",
                                userSurePassWord: "",
                                dataStatus: "",
                                mobileNumber: ""
                            };
                            this.data = [];
                            this.queryListFn();
                            // this.totalRecord = data.recordsTotal;
                        } else {
                            // this.$message.error(message);
                            this.$confirm(message, '提示', {
                                confirmButtonText: '确定',
                                showCancelButton:false,
                                type: 'error'
                            }).then(() => {
                                this.delShow = false;
                            }).catch(() => {
                                this.delShow = false;
                            });
                        }
                    })
                } else {
                    if (!this.form.userName) {
                        this.$message.error('请输入用户姓名');
                        return
                    }
                    let beforeData = [];
                    if (this.functionCodes.indexOf('JSFP')>-1) {
                        var datas = this.$refs.tree.getCheckedNodes(true, false);
                        for (var i = 0; i < datas.length; i++) {
                            beforeData.push(datas[i].id)
                        }
                    }
                    for (var i = 0; i < this.userDepartmentList.length; i++) {
                        if (this.form.userDepartment == this.userDepartmentList[i].dictionaryValue) {
                            this.form.userDepartmentKey = this.userDepartmentList[i].dictionaryKey
                        }
                    }
                    this.loadingShow = true;
                    MyPostJson('/yl-ms-platform/user/upd', {
                        id: this.roleId,
                        roleIds: beforeData,
                        userName: this.form.userAccount,
                        phoneNumber: this.form.userMobile,
                        staffNumber: this.form.userPersonCode,
                        companyNumber: this.form.userCompanyCode,
                        sex: this.form.userGender,
                        email: this.form.userMobileAddress,
                        departmentKey: this.form.userDepartmentKey,
                        departmentValue: this.form.userDepartment,
                        fullName: this.form.userName,
                        status: this.form.dataStatus
                    }).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.$message({
                                message: message,
                                type: 'success'
                            });
                            this.serachBoxShow = false;
                            this.form = {
                                userAccount: "",
                                userDepartment: "",
                                userDepartmentKey: "",
                                userName: "",
                                userMobile: "",
                                userGender: "",
                                userMobileAddress: "",
                                userCompanyCode: "",
                                userPersonCode: "",
                                userPassWord: "",
                                userSurePassWord: "",
                                dataStatus: "",
                                mobileNumber: ""
                            };
                            this.data = [];
                            this.queryListFn();
                            // this.totalRecord = data.recordsTotal;
                        } else {
                            // this.$message.error(message);
                            this.$confirm(message, '提示', {
                                confirmButtonText: '确定',
                                showCancelButton:false,
                                type: 'error'
                            }).then(() => {
                                this.delShow = false;
                            }).catch(() => {
                                this.delShow = false;
                            });
                        }
                    })
                }
            },
            makeAddToSever(beforeData) {
                let tempArr = [];
                for (let i = 0; i < beforeData.length; i++) {
                    if (tempArr.indexOf(beforeData[i].functionCode) === -1) {
                        this.functionLists.push({
                            functionCode: beforeData[i].functionCode,
                            actionList: [
                                {
                                    actionCode: beforeData[i].actionCode
                                }]
                        });
                        tempArr.push(beforeData[i].functionCode);
                    } else {
                        for (let j = 0; j < this.functionLists.length; j++) {
                            if (this.functionLists[j].functionCode == beforeData[i].functionCode) {
                                this.functionLists[j].actionList.push({
                                    actionCode: beforeData[i].actionCode
                                });
                                break;
                            }
                        }
                    }
                }
            },
            addBrand() {
                this.titData = '新增用户';
                this.serachBoxShow = true;
                this.form = {
                    userAccount: "",
                    userDepartment: "",
                    userDepartmentKey: "",
                    userName: "",
                    userMobile: "",
                    userGender: "女",
                    userMobileAddress: "",
                    userCompanyCode: "",
                    userPersonCode: "",
                    userPassWord: "",
                    userSurePassWord: "",
                    dataStatus: "1",
                    mobileNumber: ""
                };
                this.getTreeData("");
                this.getDepartmentList("");
            },
            getTreeData(roleId) {
                var that = this;
                MyPost('/yl-ms-platform/user/roleList', {
                    userId: roleId,
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        var datas = [
                            {
                                children: data,
                                name: "角色分类",
                                id: 0
                            }
                        ]
                        that.data = datas;
                        var checkList = [];
                        for (var i = 0; i < this.data.length; i++) {
                            if (this.data[i].children != null && this.data[i].children.length > 0) {
                                for (var j = 0; j < this.data[i].children.length; j++) {
                                    if (this.data[i].children[j].checked) {
                                        checkList.push(this.data[i].children[j])
                                    }
                                }
                            }
                        }
                        this.$nextTick(function () {
                            this.$refs.tree.setCheckedNodes(checkList);
                        })
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            getDepartmentList() {
                var that = this;
                MyPost('/yl-ms-platform/user/departmentList', {}).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.userDepartmentList = data;
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            makeDatas(datas) {
                var that = this;
                if (datas != null && datas !== undefined && datas.length > 0) {
                    datas.forEach(function (item, index) {
                        if (item.fmList != null && item.fmList !== undefined && item.fmList.length > 0) {
                            that.makeDatas(item.fmList);
                        } else if (item.actList != null && item.actList !== undefined && item.actList.length > 0) {
                            item.fmList = item.actList;
                            item.actList = [];
                            that.makeDatas(item.fmList);
                        } else {

                        }
                    })
                }
                return datas
            },

            selClk(id) {
                this.defulatId = id;
            },
            updatePassword(item){
                this.form = {
                    userAccount: item.userName,
                    userName: item.fullName,
                    userPassWord: "",
                    userSurePassWord:"",
                }
                this.roleId = item.id;
                this.passwordBoxShow = true;
            },
            editClk(item) {
                this.titData = '修改用户';
                this.form = {
                    userAccount: item.userName,
                    userPassWord: item.password,
                    userSurePassWord: item.password,
                    userMobile: item.phoneNumber,
                    userPersonCode: item.staffNumber,
                    userCompanyCode: item.companyNumber,
                    userGender: item.sex,
                    userMobileAddress: item.email,
                    userDepartmentKey: item.departmentKey,
                    userDepartment: item.departmentValue,
                    userName: item.fullName,
                    mobileNumber: item.mobileNumber,
                    dataStatus: item.status
                }
                this.roleId = item.id;
                this.getTreeData(item.id);
                this.getDepartmentList("");
                this.serachBoxShow = true;
            },
            editDelClk(item) {
                this.nameId = item.id;
                this.delShow = true;
            },
            append() {
                var data = this.thisData;
                const newChild = {id: id++, label: 'testtest', children: []};
                if (!data.children) {
                    this.$set(data, 'children', []);
                }
                data.children.push(newChild);
                this.addBoxShow = false;
            },

            remove(node, data) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            },
            categoryListFn() {
                this.loadingShow = false;
                MyGet('/liquor-product/category/categoryList').then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.categoryList = data;
                        if (!this.childId) {
                            this.childId = data[0].id;
                        }
                        this.addform.parentName = data[0].name;
                        this.$nextTick(() => {
                            this.$refs.treeBox.setCurrentKey(this.childId); // treeBox 元素的ref   value 绑定的node-key
                        });
                        this.queryListFn();
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            handleNodeClick(data) {
                this.childId = data.id;
                this.addform.parentName = data.name;
                this.queryListFn();
            },
            reFresh() {
                this.userName = "";
                this.userAccount = "";
                this.userMobile = "";
                this.userPhone = "";
                this.queryListFn();
            },
            queryListFn() {

                MyPost('/yl-ms-platform/user/list', {
                    userName: this.userName,
                    fullName: this.userAccount,
                    phoneNumber: this.userMobile,
                    status:this.status,
                    start: (this.currentPage - 1) * 10,
                    length: 10
                }).then((res) => {

                    let {code, message, data} = res;
                    if (code == '0') {
                        this.tableData = data.data;
                        this.totalRecord = data.recordsTotal;
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            saveFn() {
                if (this.titleVal == '新增类目') {
                    if (!this.addform.name) {
                        this.$message.error('请输入分类名称');
                        return
                    }
                    if (!this.addform.sort) {
                        this.$message.error('请输入排序');
                        return
                    }
                    this.loadingShow = false;
                    MyPost('/liquor-product/category/save', {
                        name: this.addform.name,
                        parentId: this.childId,
                        dataStatus: this.addform.dataStatus,
                        sort: this.addform.sort,
                        memo: this.addform.memo
                    }).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.addBoxShow = false;
                            this.categoryListFn();
                        } else {
                            this.$message.error(message);
                        }
                    })
                } else {
                    if (!this.addform.name) {
                        this.$message.error('请输入分类名称');
                        return
                    }
                    if (!this.addform.sort) {
                        this.$message.error('请输入排序');
                        return
                    }
                    this.loadingShow = false;
                    MyPost('/liquor-product/category/upd', {
                        name: this.addform.name,
                        parentId: this.childId,
                        dataStatus: this.addform.dataStatus,
                        sort: this.addform.sort,
                        memo: this.addform.memo,
                        id: this.selfId
                    }).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.addBoxShow = false;
                            this.categoryListFn();
                        } else {
                            this.$message.error(message);
                        }
                    })
                }
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.queryListFn();
            },
            addClk(data) {
                this.titleVal = '新增类目';
                this.addform.name = '';
                this.thisData = data;
                this.addform.dataStatus = '1';
                this.addform.memo = '';
                this.addform.sort = '';
                this.addBoxShow = true;
            },
            changClk(item) {
                this.titleVal = '编辑类目';
                this.addform.name = item.name;
                this.addform.dataStatus = item.dataStatus;
                this.addform.sort = item.sort;
                this.addform.memo = item.memo;
                this.selfId = item.id;
                this.addBoxShow = true;
            },
            delClk(item) {
                if (item.status == "1") {
                    this.$message.error("启用的帐号无法删除")
                    return
                }
                this.delId = item.id;
                this.delIds=[];
                this.delIds.push(this.delId);
                this.delShow = true;
            },
            configClkAll() {
                if (this.multipleTable.length == 0) {
                    this.$confirm('请先勾选记录，再进行操作', '提示', {
                        confirmButtonText: '确定',
                        showCancelButton:false,
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
            configClk() {
                this.loadingShow = true;

                MyPost('/yl-ms-platform/user/del', {
                    ids: this.delIds
                }).then((res) => {
                    this.delIds = [];
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.delShow = false;
                        this.queryListFn();
                    } else {
                        this.$confirm(message, '提示', {
                            confirmButtonText: '确定',
                            showCancelButton:false,
                            type: 'error'
                        }).then(() => {
                            this.delShow = false;
                        }).catch(() => {
                            this.delShow = false;
                        });
                    }
                })
            },
            clearClk() {
                this.userName = "";
                this.userAccount = "";
                this.userMobile = "";
                this.userPhone = "";
                this.status="";
                this.queryListFn();
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/css/all.scss"
    .categoryManagement
        .nav-top
            background #fff
            padding-left 20px
            height 35px
            position fixed
            z-index 2
            width 100%
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

        .add-contain
            padding 20px
            .el-form-item__label
                font-size 12px
        .move-contain
            padding 20px
            .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content
                background #fff
                color #0D81DB
        .tip-contain
            padding 20px
            p
                font-size 12px
                line-height 30px
                text-align center
                span
                    color #C13A3C
        .all-parement
            overflow hidden
            padding-bottom 20px
            p
                color #333
                font-size 14px
                line-height 40px
                height 40px
                padding-left 30px
                cursor pointer
                .edit-btn
                    float right
                    line-height 40px
                    margin-right 10px
                .editdel-btn
                    float right
                    line-height 40px
                    margin-right 20px
            .act-on
                color #C13A3C
        .upload-contain
            overflow hidden
            .contain-top
                overflow hidden
                padding 10px 18px 0 18px
                .search-btn
                    font-size 12px
                    line-height 28px
                    color #333
                    display inline-block
                    margin-bottom 15px
                    .el-checkbox__label
                        font-size 12px
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
            .upload-box
                overflow hidden
                padding 10px 20px
                text-align center
        .minW
            .pass-span01
                color #666666
                font-size 10px
            .el-form
                overflow hidden
            .el-form-item
                width 50%
                float left
            .el-dialog
                width 640px
            .el-input
                width 90%
            .el-input__clear
                display none
            .clearFox
                clear both
        .contain-mod
            overflow hidden
            background #ffffff
            padding-left 18px
            padding-right 18px
            padding-top 45px
            .contain-top
                overflow hidden
                .search-btn
                    font-size 12px
                    line-height 28px
                    color #333
                    display inline-block
                    margin-bottom 15px
                    .el-checkbox__label
                        font-size 12px
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
            .noshadow
                box-shadow none
            .result-con
                padding-bottom: 100px;
                .tab-mod
                    /*width 100%*/
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
                        font-weight normal
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
                    .color-red
                        color #DB0D1B
                    .color-under-line
                        text-decoration underline

                .pagenum_mod
                    margin-bottom 40px
                    float right
                    overflow hidden
                    margin-top 5px
            .tabs-mod
                height 30px
                margin-bottom 14px
</style>
