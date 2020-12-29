<template>
    <div class="payManageSet">
        <div class="return-line">
            <span @click="goPage">返回</span>
        </div>
        <div class="add-mod-con">
            <div class="add-mod-one">
                <h3><em></em>支付息设置</h3>
                <div class="add-box">
                    <span class="add-tip">* 支付方式名称：</span>
                    <el-input size="small" class="add-ipt" v-model="searchList.paymentSettingsName"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 支付方式描述：</span>
                    <el-input size="small" class="add-ipt" v-model="searchList.memo"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 微信公众号appid：</span>
                    <el-input size="small" class="add-ipt" v-model="searchList.appid"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 微信公众号AppSecret：</span>
                    <el-input size="small" class="add-ipt" maxlength="11" v-model="searchList.appsecret"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 商户支付密钥Key：</span>
                    <el-input size="small" class="add-ipt" maxlength="11" v-model="searchList.paymentKey"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 受理商ID(即微信支付商户号)：</span>
                    <el-input size="small" class="add-ipt" maxlength="11" v-model="searchList.acceptId"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 支付手续费：</span>
                    <el-input size="small" class="add-ipt" maxlength="11" v-model="searchList.serviceCharge"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 付款类型：</span>
                    <el-select size="small" class="add-ipt" v-model="searchList.paymentType" placeholder="付款类型">
                        <el-option
                                v-for="item in typeList"
                                :key="item"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 状态：</span>
                    <el-select size="small" class="add-ipt" v-model="searchList.status" placeholder="状态">
                        <el-option
                                v-for="item in statusList"
                                :key="item"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="btn-group">
                <el-button type="primary" @click="configClk">提交</el-button>
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
        name: 'payManageSet',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                loadingShow: false,
                loadingText: '正在加载中。。。',
                typeList: [
                    {
                        label: '货到付款',
                        value: '1'
                    },
                    {
                        label: '在线支付',
                        value: '2'
                    }
                ],
                statusList: [
                    {
                        label: '是',
                        value: '1'
                    },
                    {
                        label: '否',
                        value: '2'
                    }
                ],
                searchList: {
                    paymentSettingsName: '',//支付方式名称
                    memo: '',//支付方式描述
                    appid: '',//微信公众号appid
                    appsecret: '',//微信公众号AppSecret
                    paymentKey: '',//商户支付密钥Key
                    acceptId: '',//受理商ID(即微信支付商户号)
                    serviceCharge: '',//支付手续费
                    paymentType: '1',//付款类型 1货到付款 2在线支付
                    status: '1'//状态 1是2否
                }
            }
        },
        created() {
            this.$store.state.navTit = '系统';
            this.$store.state.navChildTit = '支付设置';
            if (this.$route.query.id) {
                this.searchList = {
                    paymentSettingsName: this.$route.query.paymentSettingsName,//支付方式名称
                    memo: this.$route.query.memo,//支付方式描述
                    appid: this.$route.query.appid,//微信公众号appid
                    appsecret: this.$route.query.appsecret,//微信公众号AppSecret
                    paymentKey: this.$route.query.paymentKey,//商户支付密钥Key
                    acceptId: this.$route.query.acceptId,//受理商ID(即微信支付商户号)
                    serviceCharge: this.$route.query.serviceCharge,//支付手续费
                    paymentType: this.$route.query.paymentType,//付款类型 1货到付款 2在线支付
                    status: this.$route.query.status//状态 1是2否
                }
            }
        },
        methods: {
            configClk() {
                if (!this.searchList.paymentSettingsName) {
                    return this.$message.error('请填写支付方式名称');
                }
                if (!this.searchList.memo) {
                    return this.$message.error('请填写支付方式描述');
                }
                if (!this.searchList.appid) {
                    return this.$message.error('请填写微信公众号appid');
                }
                if (!this.searchList.appsecret) {
                    return this.$message.error('请填写微信公众号AppSecret');
                }
                if (!this.searchList.paymentKey) {
                    return this.$message.error('请填写商户支付密钥Key');
                }
                if (!this.searchList.acceptId) {
                    return this.$message.error('请填写受理商ID(即微信支付商户号)');
                }
                if (!this.searchList.serviceCharge) {
                    return this.$message.error('请填写支付手续费');
                }
                this.loadingShow = true;
                if (this.$route.query.id) {
                    MyPost('/yl-ms-platform/paymentSettings/updPaymentSettings', {
                        id: this.$route.query.id,
                        paymentSettingsName: this.searchList.paymentSettingsName,//支付方式名称
                        memo: this.searchList.memo,//支付方式描述
                        appId: this.searchList.appid,//微信公众号appid
                        appSecret: this.searchList.appsecret,//微信公众号AppSecret
                        paymentKey: this.searchList.paymentKey,//商户支付密钥Key
                        acceptId: this.searchList.acceptId,//受理商ID(即微信支付商户号)
                        serviceCharge: this.searchList.serviceCharge,//支付手续费
                        paymentType: this.searchList.paymentType,//付款类型 1货到付款 2在线支付
                        status: this.searchList.status//状态 1是2否
                    }).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.$router.go(-1);
                        } else {
                            this.$message.error(message);
                        }
                    })
                } else {
                    MyPost('/yl-ms-platform/paymentSettings/addPaymentSettings', {
                        paymentSettingsName: this.searchList.paymentSettingsName,//支付方式名称
                        memo: this.searchList.memo,//支付方式描述
                        appId: this.searchList.appid,//微信公众号appid
                        appSecret: this.searchList.appsecret,//微信公众号AppSecret
                        paymentKey: this.searchList.paymentKey,//商户支付密钥Key
                        acceptId: this.searchList.acceptId,//受理商ID(即微信支付商户号)
                        serviceCharge: this.searchList.serviceCharge,//支付手续费
                        paymentType: this.searchList.paymentType,//付款类型 1货到付款 2在线支付
                        status: this.searchList.status//状态 1是2否
                    }).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.$message({
                                message: '新增成功',
                                type: 'success'
                            });
                            this.$router.go(-1);
                        } else {
                            this.$message.error(message);
                        }
                    })
                }
            },
            goPage() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .payManageSet
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
                    overflow hidden
                    /*width 720px*/
                    margin 0 auto 22px auto
                    .upload-demo
                        float left
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
                        width 410px
                        float left
                    .add-tips
                        font-size 12px
                        color #333
                        line-height 36px
                        margin-left 26px
                        float left
                        display inline
                    .mr20
                        margin-right 20px
                    .el-input--small .el-input__inner
                        height 36px
                        line-height 36px
                .head-mod
                    position relative
                    width 138px
                    margin 36px auto
                    .user-header-com
                        width 138px
                        height 138px
                        display inline-block
                        border-radius 50%
                        cursor pointer
                    .header-upload-btn
                        position absolute
                        left 0
                        top 0
                        opacity 0
                    .head-tip
                        text-align center
                        color #C13A3C
                        font-size 14px
                        margin-top 24px
                        line-height 16px
            .btn-group
                text-align center
                padding 0 0 40px 0
                overflow hidden
</style>
