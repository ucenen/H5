<template>
    <div class="carManageSet">
        <div class="return-line">
            <span @click="goPage">返回</span>
        </div>
        <div class="add-mod-con">
            <div class="add-mod-one">
                <h3><em></em>车辆信息设置</h3>
                <div class="add-box">
                    <span class="add-tip">* 车辆编号：</span>
                    <el-input size="small" class="add-ipt" v-model="searchList.vehiclecCode"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 车牌号：</span>
                    <el-input size="small" class="add-ipt" v-model="searchList.vehiclecNumber"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 司机姓名：</span>
                    <el-input size="small" class="add-ipt" v-model="searchList.driverName"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 司机电话：</span>
                    <el-input size="small" class="add-ipt" maxlength="11" v-model="searchList.driverPhone"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 车辆状态：</span>
                    <el-select size="small" class="add-ipt" v-model="searchList.status" placeholder="是否可用">
                        <el-option
                                v-for="item in typeList"
                                :key="item"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <p class="add-tips">冻结状态下账号无法选择本车辆</p>
                </div>
                <div class="add-box">
                    <span class="add-tip">备注信息：</span>
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
        name: 'carManageSet',
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
                        label: '激活',
                        value: '1'
                    },
                    {
                        label: '冻结',
                        value: '2'
                    }
                ],
                searchList: {
                    vehiclecCode: '',//车辆编号
                    vehiclecNumber: '',//车牌号
                    status: '1',//车辆状态 1激活2冻结
                    driverName: '',//司机姓名
                    driverPhone: '',//司机电话
                    memo: ''//备注信息
                }
            }
        },
        created() {
            this.$store.state.navTit = '系统';
            this.$store.state.navChildTit = '车辆管理';
            if (this.$route.query.id) {
                this.searchList = {
                    vehiclecCode: this.$route.query.vehiclecCode,//车辆编号
                    vehiclecNumber: this.$route.query.vehiclecNumber,//车牌号
                    status: this.$route.query.status,//车辆状态 1激活2冻结
                    driverName: this.$route.query.driverName,//司机姓名
                    driverPhone: this.$route.query.driverPhone,//司机电话
                    memo: this.$route.query.memo//备注信息
                }
            }
        },
        methods: {
            configClk() {
                if (!this.searchList.vehiclecCode) {
                    return this.$message.error('请填写车辆编号');
                }
                if (!this.searchList.vehiclecNumber) {
                    return this.$message.error('请填写车牌号');
                }
                if (!this.searchList.driverName) {
                    return this.$message.error('请填写司机姓名');
                }
                if (!this.searchList.driverPhone) {
                    return this.$message.error('请填写司机电话');
                }
                if (!/^1\d{10}$/g.test(this.searchList.driverPhone)) {
                    return this.$message.error('请正确填写司机电话');
                }
                this.loadingShow = true;
                if (this.$route.query.id) {
                    MyPost('/yl-ms-platform/vehicle/upd', {
                        id: this.$route.query.id,
                        vehiclecCode: this.searchList.vehiclecCode,
                        vehiclecNumber: this.searchList.vehiclecNumber,
                        status: this.searchList.status,
                        driverName: this.searchList.driverName,
                        driverPhone: this.searchList.driverPhone,
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
                    MyPost('/yl-ms-platform/vehicle/add', {
                        vehiclecCode: this.searchList.vehiclecCode,
                        vehiclecNumber: this.searchList.vehiclecNumber,
                        status: this.searchList.status,
                        driverName: this.searchList.driverName,
                        driverPhone: this.searchList.driverPhone,
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
    .carManageSet
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
