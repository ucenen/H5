<template>
    <div class="enterpriseAccount">
        <div class="return-line">
            <span @click="goPage">返回</span>
        </div>
        <div class="add-mod-con">
            <div class="add-mod-one">
                <h3><em></em>企业账号信息</h3>
                <div class="add-box">
                    <span class="add-tip">* 公司编号：</span>
                    <el-input size="small" class="add-ipt" v-model="searchList.companyCode" :disabled="true"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 公司名称：</span>
                    <el-input size="small" class="add-ipt" v-model="searchList.name" :disabled="true"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 统一社会信用代码：</span>
                    <el-input size="small" class="add-ipt" v-model="searchList.uscc" :disabled="true"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 账号类型：</span>
                    <el-input size="small" class="add-ipt" v-model="searchList.type" :disabled="true"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 账号ID：</span>
                    <el-input size="small" class="add-ipt" v-model="searchList.userName"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 登录密码：</span>
                    <el-input size="small" class="add-ipt" type="password" :placeholder="passwordHolder" v-model="searchList.password"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 是否启用：</span>
                    <el-select size="small" class="add-ipt" v-model="searchList.dataStatus" placeholder="状态">
                        <el-option
                                v-for="item in typeList"
                                :key="item"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
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
    import {MyGet, MyPost} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../footerbar/footerbar.vue'

    export default {
        name: 'enterpriseAccount',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                loadingShow: false,
                loadingText: '正在加载中...',
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
                searchList: {
                    companyCode: '',
                    name: '',
                    uscc: '',
                    dataStatus: '1',
                    type: '企业管理员',
                    userName: '',
                    password: ''
                },
                passwordHolder: ''
            }
        },
        created() {
            this.$store.state.navTit = '酒企';
            this.$store.state.navChildTit = '酒企列表';
            this.searchList.companyCode = this.$route.query.companyCode;
            this.searchList.name = this.$route.query.name;
            this.searchList.uscc = this.$route.query.uscc;
            this.searchList.userName = this.$route.query.userName;
            if (this.$route.query.password){
                this.passwordHolder = '●●●●●●';
            }
            this.searchList.dataStatus = this.$route.query.dataStatus;
        },
        methods: {
            configClk() {
                if (!this.searchList.userName) {
                    return this.$message.error('请填写账号ID');
                }
                if (!this.$route.query.userId){
                    if (!this.searchList.password) {
                        return this.$message.error('请填写登录密码');
                    }
                }
                this.loadingShow = true;
                MyPost('/yl-ms-platform/user/register', {
                    id: this.$route.query.userId ? this.$route.query.userId : '',
                    companyId: this.$route.query.id,
                    userName: this.searchList.userName,
                    password: this.searchList.password,
                    status: this.searchList.dataStatus
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
    .enterpriseAccount
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
