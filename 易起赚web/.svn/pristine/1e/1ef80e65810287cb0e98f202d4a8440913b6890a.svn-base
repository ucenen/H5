<template>
    <div class="accountSet">
        <div class="add-mod-con">
            <div class="add-mod-one">
                <h3><em></em>账户设置</h3>
                <div class="head-mod">
                    <input type="file" name="image" accept="image/*" @change='onchangeImgFun'
                           class="header-upload-btn user-header-com">
                    <img alt="" :src='imgStr' class="user-header-img user-header-com">
                    <p class="head-tip">上传头像</p>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 用户名：</span>
                    <el-input size="small" class="add-ipt" :disabled="true"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* Email：</span>
                    <el-input size="small" class="add-ipt" :disabled="true"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 旧密码：</span>
                    <el-input type="password" size="small" class="add-ipt"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 新密码：</span>
                    <el-input type="password" size="small" class="add-ipt"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 确认密码：</span>
                    <el-input type="password" size="small" class="add-ipt"></el-input>
                </div>
            </div>
            <div class="btn-group">
                <el-button type="primary">提交</el-button>
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
        name: 'accountSet',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                loadingShow: false,
                loadingText: '正在加载中。。。',
                imgStr: require('./icon-01.png'),
            }
        },
        created() {
        },
        methods: {
            onchangeImgFun(e) {
                var file = e.target.files[0]
                console.log(file)
                // 获取图片的大小，做大小限制有用
                let imgSize = file.size
                console.log(imgSize)
                var _this = this // this指向问题，所以在外面先定义
                // 比如上传头像限制5M大小，这里获取的大小单位是b
                //if (imgSize <= 50 * 1024) {
                // 合格
                _this.errorStr = ''
                console.log('大小合适')
                // 开始渲染选择的图片
                // 本地路径方法 1
                // this.imgStr = window.URL.createObjectURL(e.target.files[0])
                // console.log(window.URL.createObjectURL(e.target.files[0])) // 获取当前文件的信息

                // base64方法 2
                var reader = new FileReader()
                reader.readAsDataURL(file) // 读出 base64
                reader.onloadend = function () {
                    // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
                    var dataURL = reader.result
                    console.log(dataURL)
                    _this.imgStr = dataURL
                    // 下面逻辑处理
                }
                /*} else {
                    console.log('大小不合适')
                    _this.errorStr = '图片大小超出范围'
                }*/
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .accountSet
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
                    height 36px
                    width 720px
                    margin 0 auto 22px auto
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
