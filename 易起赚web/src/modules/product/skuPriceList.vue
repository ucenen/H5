<template>
    <div class="addStore">
        <div class="nav-top">
            <div class="nav-box" @click="goPage">
                <img src="static/img/backlast.png"/>
                <p>返回</p>
            </div>
        </div>
        <div class="add-mod-con">
            <div class="add-mod-one">
                <h3><em></em>产品基本信息</h3>
                <div class="add-box-short">
                    <span class="add-tip-short"> spu编号：</span>
                    <el-input size="small" class="add-ipt-short" readonly v-model="infoList.spuNo"></el-input>
                </div>
                <div class="add-box-short">
                    <span class="add-tip-short">产品名称：</span>
                    <el-input size="" class="add-ipt-short" readonly
                              v-model="infoList.productName"></el-input>
                    <span style="width: 20%"/>
                </div>
                <div class="add-box-short">
                    <span class="add-tip-short"> 分类名称：</span>
                    <el-input size="small" class="add-ipt-short" readonly v-model="infoList.categoryName"></el-input>
                </div>
                <div class="add-box-short">
                    <span class="add-tip-short"> 品牌名称：</span>
                    <el-input size="small" class="add-ipt-short" readonly v-model="infoList.brandName"></el-input>
                </div>
            </div>
            <div class="add-mod-one">
                <h3><em></em>sku列表</h3>
                <div class="result-con">
                    <div class="tab-mod">
                        <el-table
                                ref="multipleTable"
                                :data="selectedSkuList"
                                tooltip-effect="dark"
                                @selection-change="handleSelectionChange"
                                border>
                            <el-table-column
                                    type="selection"
                                    width="35">
                            </el-table-column>
                            <el-table-column
                                    prop="skuBarcode"
                                    label="sku编号">
                            </el-table-column>
                            <el-table-column
                                    prop="originalPrice"
                                    label="参考价(元)">
                            </el-table-column>
                            <el-table-column
                                    prop="vipPrice"
                                    label="vip价(元)">
                            </el-table-column>
                            <el-table-column
                                    prop="salePrice"
                                    label="达人价(元)">
                            </el-table-column>
                            <el-table-column
                                    prop="unit"
                                    label="单位">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="pagenum_mod">
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
    import {MyPost, MyGet} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../../components/footerbar/footerbar.vue'

    export default {
        name: 'addStore',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                headers: {},
                loadingShow: false,
                addBoxShow: false,
                loadingShow1: false,
                loadingShow2: false,
                selectedSkuList: [

                ],
                tableData: [
                    {
                        spuNo: ""//	spuNo编码	body	false	string
                    }

                ],
                page_show: true,//分页显示
                page_show1: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                titData: '添加带货视频链接',
                multipleTable: [],
                multipleTableDialog: [],
                loadingText: '正在加载中...',
                srcList: [
                    require('../../../static/img/icon-01.png')
                ],
                url: require('../../../static/img/icon-01.png'),
                infoList: {
                    categoryName: '',//分类名称
                    productName: '',//产品名称
                    spuNo: '',//spu编号
                    brandName: ''//品牌名称
                }
            }
        },
        created() {
            this.$store.state.navTit = '产品管理';
            this.$store.state.navChildTit = '产品管理';
            this.headers = {
                token: store.get('tokenVal')
            };
            if (this.$route.query.id) {
                this.getProductInfo();
            }
        },
        methods: {
            handleSelectionDialogChange(val) {
                this.multipleTableDialog = val;
            },
            handleSelectionChange(val) {
                this.multipleTable = val;
            },
            getSkuInfoList() {
                this.loadingShow2 = true;
                MyPost('/yl-ms-product/ms/skuInfo/list', {
                    spuNo: this.infoList.spuNo,
                    start: (this.currentPage - 1) * 10,
                    length: 10
                }).then((res) => {
                    this.loadingShow2 = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.selectedSkuList = data.data;
                        if (data.data.length == 0) {
                            this.page_show1 = false;
                        } else {
                            this.page_show1 = true;
                        }
                        this.totalRecord = data.recordsTotal;
                    } else {
                        this.$confirm(message, '提示', {
                            confirmButtonText: '确定',
                            showCancelButton: false,
                            type: 'error'
                        }).then(() => {
                        }).catch(() => {
                        });
                    }
                })
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getSkuInfoList();
            },
            timeFormat(time) {
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
                    clock += day;
                    return (clock);
                } else {
                    return null
                }
            },
            getProductInfo() {
                this.loadingShow = true;
                MyPost('/yl-ms-product/ms/product/getProductById', {
                    id: this.$route.query.id
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        let dataInf = data;
                        this.infoList = {
                            categoryName: dataInf.categoryName,//
                            productName: dataInf.productName,//
                            spuNo: dataInf.spuNo,//
                            brandName: dataInf.brandName//
                        }

                        this.getSkuInfoList();
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
    @import "../../styles/css/my.scss"
    /* 谷歌 */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        appearance: none;
        margin: 0;
    }
    /* 火狐 */
    input{
        -moz-appearance:textfield;
    }

    .minW .el-dialog
        width 830px
    .scope_btn
        cursor pointer
        color #DB0D1B
        font-size 12px
        margin 0 7px

    .color-blue
        color #0D81DB

    .addStore
        .hideUpload .el-upload
            display none

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

        .add-mod-con
            padding-top 36px
            overflow hidden
            background #fff

            .add-mod-one
                padding-bottom 30px
                float left
                width 100%

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
                        background url("../../../static/img/icon-l.png") no-repeat 0 0
                        background-size contain

                .add-box-short
                    /*overflow hidden*/
                    width 33%
                    height 36px
                    float left
                    margin-bottom 22px

                    .el-image
                        width 40px
                        height 40px

                    .add-tip-short
                        width 33%
                        text-align right
                        line-height 36px
                        font-size 12px
                        color #333
                        margin-right 20px
                        display inline
                        float left

                        img
                            width 30px
                            height 30px

                    .add-ipt-short
                        height 36px
                        width 46%
                        font-size 12px
                        float left

                    .add-tips
                        height 36px
                        line-height 36px
                        font-size 12px

                    .mr20
                        margin-right 20px

                    .el-input--small .el-input__inner
                        height 36px
                        line-height 36px

                .add-box
                    height 36px
                    margin-bottom 22px
                    float left
                    width 66%

                    .add-tip
                        width 16.5%
                        text-align right
                        line-height 36px
                        font-size 12px
                        color #333
                        margin-right 20px
                        display inline
                        float left

                    .add-ipt
                        height 36px
                        width 410px
                        float left

                    .add-ipt-sel
                        float left

                        font-size 12px
                        width 200px
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

            .add-mod-line
                overflow hidden
                float left

                .add-box
                    float left
                    width 520px

                    .add-ipt
                        width 230px

            .add-mod-two
                float left
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
                        background url("../../../static/img/icon-l.png") no-repeat 0 0
                        background-size contain

                .update-box
                    margin 22px 22px 0 40px
                    border 2px dashed #e5e5e5
                    padding 32px 0 0 44px
                    overflow hidden

                    h4
                        line-height 18px
                        font-size 16px
                        color #333
                        margin-bottom 16px

                    h5
                        line-height 16px
                        font-size 14px
                        color #333
                        margin-bottom 30px
                        margin-left 20px

                    .upload-img-box
                        overflow hidden

                        .img-tip
                            text-align right
                            font-size 14px
                            color #333
                            line-height 16px
                            width 176px
                            height 20px
                            padding-right 54px
                            float left

                        .lineh36
                            line-height 36px
                            height 36px

                        .upload-ipt
                            float left
                            width 500px
                            height 36px

                        .el-input--small .el-input__inner
                            height 36px
                            line-height 36px

                        .img-con
                            float left
                            overflow hidden

                            .img-center
                                float left

                            .demo-image__preview
                                width 140px
                                height 140px
                                margin-left 20px
                                float left

                        .desc-con
                            width 100%
                            padding 16px 0 18px 0
                            overflow hidden

                            p
                                padding-left 230px
                                font-size 12px
                                color #3738C9
                                line-height 20px

                        .el-upload--picture-card {
                            background-color #fbfdff
                            border 1px dashed #c0ccda
                            border-radius 6px
                            box-sizing border-box
                            width 140px
                            height 140px
                            line-height 138px
                            vertical-align top
                        }

                        .el-upload--picture-card:hover
                            border 1px dashed #C13A3C

                        .el-upload-list--picture-card .el-upload-list__item
                            width 140px
                            height 140px

                    .mb20
                        margin-bottom 20px

            .btn-group
                text-align center
                padding 0 0 40px 0
                overflow hidden
</style>
