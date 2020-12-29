<template>
    <div class="logisticsCompanySet">
        <div class="return-line">
            <span @click="goPage">返回</span>
        </div>
        <div class="add-mod-con">
            <div class="add-mod-one">
                <h3><em></em>物流公司信息设置</h3>
                <div class="add-box">
                    <span class="add-tip">* 公司编号：</span>
                    <el-input size="small" class="add-ipt" v-model="searchList.companyCode"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 公司名称：</span>
                    <el-input size="small" class="add-ipt" v-model="searchList.companyName"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 是否可用：</span>
                    <el-select size="small" class="add-ipt" v-model="searchList.status" placeholder="是否可用">
                        <el-option
                                v-for="item in typeList"
                                :key="item"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 配送描述：</span>
                    <el-input
                            size="small"
                            class="add-ipt"
                            type="textarea"
                            v-model="searchList.memo"
                            :rows="3"
                            placeholder="配送描述">
                    </el-input>
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
        name: 'logisticsCompanySet',
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
                        label: '是',
                        value: '1'
                    },
                    {
                        label: '否',
                        value: '2'
                    }
                ],
                searchList: {
                    companyCode: '',//公司编号
                    companyName: '',//公司名称
                    status: '1',//是否可用 1是2否
                    memo: ''//配送描述
                }
            }
        },
        created() {
            this.$store.state.navTit = '系统';
            this.$store.state.navChildTit = '物流公司';
            if (this.$route.query.id) {
                this.searchList = {
                    companyCode: this.$route.query.companyCode,//公司编号
                    companyName: this.$route.query.companyName,//公司名称
                    status: this.$route.query.status,//是否可用 1是2否
                    memo: this.$route.query.memo//配送描述
                }
            }
        },
        methods: {
            configClk() {
                if (!this.searchList.companyCode) {
                    return this.$message.error('请填写公司编号');
                }
                if (!this.searchList.companyName) {
                    return this.$message.error('请填写公司名称');
                }
                if (!this.searchList.memo) {
                    return this.$message.error('请填写配送描述');
                }
                this.loadingShow = true;
                if (this.$route.query.id) {
                    MyPost('/yl-ms-platform/logisticsCompany/updLogisticsCompany', {
                        id: this.$route.query.id,
                        companyCode: this.searchList.companyCode,
                        companyName: this.searchList.companyName,
                        status: this.searchList.status,
                        memo: this.searchList.memo
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
                    MyPost('/yl-ms-platform/logisticsCompany/addLogisticsCompany', {
                        companyCode: this.searchList.companyCode,
                        companyName: this.searchList.companyName,
                        status: this.searchList.status,
                        memo: this.searchList.memo
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
    .logisticsCompanySet
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
