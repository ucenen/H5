<template>
    <div class="storeAccount">
        <div class="return-line">
            <span @click="goPage">返回</span>
        </div>
        <div class="add-mod-con">
            <div class="add-mod-one">
                <h3><em></em>门店账号信息</h3>
                <div class="add-box">
                    <span class="add-tip">门店编号：</span>
                    <el-input size="small" class="add-ipt" v-model="searchList.companyCode" :disabled="true"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">门店名称：</span>
                    <el-input size="small" class="add-ipt" v-model="searchList.name" :disabled="true"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 账号ID：</span>
                    <el-input size="small" class="add-ipt" v-model="searchList.userName"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 登录密码：</span>
                    <el-input size="small" class="add-ipt" type="password" :placeholder="passwordHolder"
                              v-model="searchList.password"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">账号类型：</span>
                    <el-input size="small" class="add-ipt" v-model="searchList.type" :disabled="true"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">企业类型：</span>
                    <el-select size="small" class="add-ipt" v-model="searchList.companyType" :disabled="true"
                               placeholder="企业类型">
                        <el-option
                                v-for="item in shopTypeList"
                                :key="item"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="add-box">
                    <span class="add-tip">是否启用：</span>
                    <el-select size="small" class="add-ipt" v-model="searchList.dataStatus" placeholder="状态">
                        <el-option
                                v-for="item in typeList"
                                :key="item"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="add-box">
                    <span class="add-tip">是否开立子账号：</span>
                    <el-select size="small" class="add-ipt" v-model="searchList.account" placeholder="是否开立子账号">
                        <el-option
                                v-for="item in accountList"
                                :key="item"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div v-show="searchList.account == '1'">
                    <div v-for="(item, index) in usersDoList" :key="item">
                        <div class="add-box">
                            <span class="add-tip">* 子账户ID：</span>
                            <el-input size="small" class="add-ipt" v-model="item.userName"></el-input>
                            <el-button size="small" class="add-btn" v-if="index == 0" @click="addNewAccount">新增子账号
                            </el-button>
                            <el-button size="small" class="add-btn" v-if="index != 0" @click="removeAccount(index)">删除
                            </el-button>
                        </div>
                        <div class="add-box">
                            <span class="add-tip">* 子账户密码：</span>
                            <el-input size="small" class="add-ipt" type="password" :placeholder="item.passwordHolder"
                                      v-model="item.password"></el-input>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btn-group">
                <!--<el-button type="primary" plain>取消</el-button>-->
                <el-button type="primary" @click="configClk">确认</el-button>
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
    import {MyGet, MyPost, MyPostJson} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../footerbar/footerbar.vue'

    export default {
        name: 'storeAccount',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                loadingShow: false,
                loadingText: '正在加载中...',
                shopTypeList: [
                    {
                        label: '直营',
                        value: '1'
                    },
                    {
                        label: '加盟',
                        value: '2'
                    }
                ],
                typeList: [
                    {
                        label: '停用',
                        value: '0'
                    },
                    {
                        label: '启用',
                        value: '1'
                    }
                ],
                accountList: [
                    {
                        label: '暂不开通',
                        value: '0'
                    },
                    {
                        label: '开通',
                        value: '1'
                    }
                ],
                searchList: {
                    companyCode: '',
                    name: '',
                    dataStatus: '1',
                    type: '企业管理员',
                    userName: '',
                    password: '',
                    companyType: '',
                    account: '1'
                },
                passwordHolder: '',
                usersDoList: [
                    {
                        id: '',
                        userName: '',
                        password: '',
                        passwordHolder: ''
                    }
                ],
                sendId: ''
            }
        },
        created() {
            this.$store.state.navTit = '门店';
            this.$store.state.navChildTit = '门店列表';
            this.searchList.companyCode = this.$route.query.companyCode;
            this.searchList.name = this.$route.query.name;
            this.searchList.companyType = this.$route.query.companyType;
            this.selectShopUserFn();
        },
        methods: {
            selectShopUserFn() {
                this.loadingShow = true;
                MyPost('/yl-ms-platform/user/selectShopUser', {
                    shopId: this.$route.query.id
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        if (data) {
                            this.searchList.userName = data.userName;
                            this.searchList.dataStatus = data.status;
                            this.sendId = data.id;
                            if (data.password) {
                                this.passwordHolder = '●●●●●●';
                            }
                            if (data.usersDOList.length == 0) {
                                this.searchList.account = '0';
                            } else {
                                this.usersDoList = data.usersDOList.map(item => {
                                    let newItem = {};
                                    if (item.password) {
                                        newItem.passwordHolder = '●●●●●●';
                                        newItem.password = '';
                                        newItem.userName = item.userName;
                                        newItem.id = item.id;
                                    } else {
                                        newItem.passwordHolder = '';
                                        newItem.password = '';
                                        newItem.userName = '';
                                        newItem.id = '';
                                    }
                                    return newItem
                                })
                            }
                        }
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            addNewAccount() {
                this.usersDoList.push({
                    id: '',
                    userName: '',
                    password: '',
                    passwordHolder: ''
                })
            },
            removeAccount(index) {
                this.usersDoList.splice(index, 1);
            },
            configClk() {
                if (!this.searchList.userName) {
                    return this.$message.error('请填写账号ID');
                }
                if (!this.passwordHolder) {
                    if (!this.searchList.password) {
                        return this.$message.error('请填写登录密码');
                    }
                }
                let doLost;
                if (this.searchList.account == '1') {
                    for (let i = 0; i < this.usersDoList.length; i++) {
                        if (this.usersDoList[i].userName == this.searchList.userName) {
                            return this.$message.error('账号ID不能相同');
                        }
                        if (!this.usersDoList[i].userName) {
                            return this.$message.error('请填写子账号ID');
                        }
                        if (!this.usersDoList[i].passwordHolder) {
                            if (!this.usersDoList[i].password) {
                                return this.$message.error('请填写子账号登录密码');
                            }
                        }
                    }
                    for (let i = 0; i < this.usersDoList.length; i++) {
                        for (var j = i + 1; j < this.usersDoList.length; j++) {
                            if (this.usersDoList[i].userName == this.usersDoList[j].userName) {
                                return this.$message.error('账号ID不能相同');
                            }
                        }
                    }
                    doLost = this.usersDoList;
                } else {
                    doLost = [];
                }
                this.loadingShow = true;
                MyPostJson('/yl-ms-platform/user/shopRegister', {
                    id: this.sendId ? this.sendId : '',
                    companyId: this.$route.query.id,
                    userName: this.searchList.userName,
                    password: this.searchList.password,
                    status: this.searchList.dataStatus,
                    usersDOList: doLost
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.$message({
                            message: '配置成功',
                            type: 'success'
                        });
                        this.$router.go(-1);
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            goPage() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .storeAccount
        .hide .el-upload--picture-card
            display none
        .return-line
            background #fff
            box-shadow 0px 0px 6px 0px rgba(174, 174, 174, 0.14)
            height 36px
            position fixed
            z-index 2
            width 100%
            span
                font-size 12px
                color #308BDE
                line-height 36px
                cursor pointer
                margin-left 16px
        .add-mod-con
            padding-top 36px
            overflow hidden
            background #fff
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
                    .add-btn
                        height 36px
                        margin-left 10px
                        float left
                    .add-ipt-sel
                        float left
                        width 150px
                        margin-right 20px
                    .mr0
                        margin-right 0
                    .el-input--small .el-input__inner
                        height 36px
                        line-height 36px
                    .add-tips
                        font-size 12px
                        color #C13A3C
                        line-height 36px
                        margin-left 26px
                        float left
                        display inline
                    .add-check
                        float left
                        margin 8px 0 0 26px
                        display inline
            .btn-group
                text-align center
                padding 0 0 40px 0
                overflow hidden
</style>
