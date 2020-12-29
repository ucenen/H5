<template>
    <div class="platformInformationSet">
        <div class="add-mod-con">
            <div class="add-mod-one">
                <h3><em></em>平台信息设置</h3>
                <div class="add-box">
                    <span class="add-tip">* 平台名称：</span>
                    <el-input size="small" class="add-ipt" v-model="searchList.stringflyName"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 平台标题：</span>
                    <el-input size="small" class="add-ipt" v-model="searchList.stringflyTitle"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 平台描述：</span>
                    <el-input size="small" class="add-ipt" v-model="searchList.memo"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 平台LOGO：</span>
                    <el-upload
                            class="upload-demo"
                            action="/yl-ms-platform/imageFileApi/upload"
                            accept="image/jpeg,image/png"
                            :before-upload="uploadBefore"
                            :on-success="uploadSuccess"
                            :on-remove="handleRemove"
                            list-type="picture"
                            :file-list="fileList">
                        <el-button size="small" type="primary">选择上传文件</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png格式文件，文件不能超过50kb</div>
                    </el-upload>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 关键词：</span>
                    <el-input size="small" class="add-ipt" v-model="searchList.antistop"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 客服热线：</span>
                    <el-input size="small" class="add-ipt" v-model="searchList.hotLine"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 客服邮箱：</span>
                    <el-input size="small" class="add-ipt" v-model="searchList.email"></el-input>
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
        name: 'platformInformationSet',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                loadingShow: false,
                loadingText: '正在加载中。。。',
                fileList: [],
                searchList: {
                    stringflyName: '',//平台名称
                    stringflyTitle: '',//平台标题
                    memo: '',//平台描述
                    antistop: '',//关键词
                    hotLine: '',//客服热线
                    email: ''//客服邮箱
                },
                sendId: ''
            }
        },
        created() {
            this.$store.state.navTit = '系统';
            this.$store.state.navChildTit = '平台信息';
            this.getMessageFn();
        },
        methods: {
            getMessageFn() {
                this.loadingShow = true;
                MyGet('/yl-ms-platform/informationPlatform/getMessage').then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.sendId = data.id;
                        this.searchList = {
                            stringflyName: data.stringflyName,//平台名称
                            stringflyTitle: data.stringflyTitle,//平台标题
                            memo: data.memo,//平台描述
                            antistop: data.antistop,//关键词
                            hotLine: data.hotLine,//客服热线
                            email: data.email//客服邮箱
                        }
                        if (data.logo) {
                            var fileExtension = data.logo.substring(data.logo.lastIndexOf('.') + 1);
                            var file_name = data.logo.replace(/(.*\/)*([^.]+).*/ig, "$2");
                            this.fileList = [
                                {
                                    name: file_name + '.' + fileExtension,
                                    url: data.logo
                                }
                            ]
                        }
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            configClk() {
                if (!this.searchList.stringflyName) {
                    return this.$message.error('请填写平台名称');
                }
                if (!this.searchList.stringflyTitle) {
                    return this.$message.error('请填写平台标题');
                }
                if (!this.searchList.memo) {
                    return this.$message.error('请填写平台描述');
                }
                if (this.fileList.length == 0) {
                    return this.$message.error('请上传平台logo');
                }
                if (!this.searchList.antistop) {
                    return this.$message.error('请填写关键词');
                }
                if (!this.searchList.hotLine) {
                    return this.$message.error('请填写客服热线');
                }
                if (!this.searchList.email) {
                    return this.$message.error('请填写客服邮箱');
                }
                let ProtocolList = [];
                ProtocolList = this.fileList.map(item => {
                    if (item.response) {
                        return item.response.data
                    } else {
                        return item.url
                    }
                })
                this.loadingShow = true;
                MyPost('/yl-ms-platform/informationPlatform/updMessage', {
                    id: this.sendId,
                    stringflyName: this.searchList.stringflyName,
                    stringflyTitle: this.searchList.stringflyTitle,
                    memo: this.searchList.memo,
                    antistop: this.searchList.antistop,
                    logo: ProtocolList[0],
                    hotLine: this.searchList.hotLine,
                    email: this.searchList.email
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            handleRemove(file, fileList) {
                this.fileList = fileList;
            },
            uploadSuccess(response, file, fileList) {
                this.fileList = [file];
            },
            uploadBefore(file, fileList) {
                // 上传之前
                const isLt2M = file.size / 1024 / 1024 < 0.05;
                if (!isLt2M) {
                    this.$message.error('上传文件大小不能超过 50k!');
                }
                return isLt2M;
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .platformInformationSet
        .add-mod-con
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
                        height 36px
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
