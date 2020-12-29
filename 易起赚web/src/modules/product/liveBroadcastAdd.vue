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
                <h3><em></em>直播明细</h3>
                <div style="float: right;margin-bottom: 20px;">
                   <span>
                        <el-button size="small" class="mr22"
                                   @click="toAddLiveBroadcast">添加直播</el-button>
                        <el-button type="primary" size="small" @click="delClk">删除直播</el-button>
                    </span>
                </div>
                <div class="result-con">
                    <div class="tab-mod">
                        <el-table
                                ref="multipleTable"
                                :data="selectedLiveBroadcastList"
                                tooltip-effect="dark"
                                @selection-change="handleSelectionChange"
                                border>
                            <el-table-column
                                    type="selection"
                                    width="35">
                            </el-table-column>
                            <el-table-column
                                    prop="liveBroadcasTitle"
                                    label="直播标题">
                            </el-table-column>
                            <el-table-column
                                    prop="liveBroadcastType"
                                    label="直播类型">
                                <template slot-scope="scope">
                                    {{scope.row.liveBroadcastType==1?'抖音':scope.row.liveBroadcastType==2?'快手':''}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="liveBroadcastUrl"
                                    label="直播url">
                            </el-table-column>
                            <el-table-column
                                    prop="status"
                                    label="是否启用">
                                <template slot-scope="scope">
                                    {{scope.row.status==1?'启用':scope.row.status==0?'禁用':''}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    width="170"
                                    label="操作">
                                <template slot-scope="scope">
                                <span class="scope_btn color-blue"
                                      v-if="scope.row.auditStatus!=2"
                                      @click="toEditLiveBroadcast(scope.row)">修改</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="pagenum_mod">
                        <el-pagination
                                background
                                class="pageination_css"
                                @current-change="handleCurrentChange1"
                                :current-page="currentPage1"
                                :page-size="10"
                                layout="total, prev, pager, next, jumper"
                                :total="totalRecord1">
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
            <el-dialog title="直播链接"
                       class="minWA"
                       :visible.sync="liveBroadCastShow"
                       :close-on-click-modal="false"
                       :close-on-press-escape="false">
                <el-form>
                    <el-form-item size="small" label="产品编号：" :label-width="formLiveBroadCastWidth">
                        <el-input v-model="liveBroadCastItem.spuNo" readonly autocomplete="off" width="200px;" ></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="直播标题：" :label-width="formLiveBroadCastWidth">
                        <el-input v-model="liveBroadCastItem.liveBroadcasTitle" autocomplete="off" width="200px;" ></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="直播描述：" :label-width="formLiveBroadCastWidth">
                        <el-input v-model="liveBroadCastItem.liveBroadcasDescribe" autocomplete="off" width="200px;" ></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="直播url：" :label-width="formLiveBroadCastWidth">
                        <el-input v-model="liveBroadCastItem.liveBroadcastUrl" autocomplete="off" width="200px;" ></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="直播类型：" :label-width="formLiveBroadCastWidth">
                        <el-select size="mini"  v-model="liveBroadCastItem.liveBroadcastType" width="200px;" >
                            <el-option
                                    label="抖音"
                                    value="1">
                            </el-option>
                            <el-option
                                    label="快手"
                                    value="2">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item size="small" label="是否启用：" :label-width="formLiveBroadCastWidth" >
                        <el-select size="mini"  v-model="liveBroadCastItem.status" width="200px;" >
                            <el-option
                                    label="启用"
                                    value="1">
                            </el-option>
                            <el-option
                                    label="禁用"
                                    value="0">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item size="small" label="直播时间段：" :label-width="formLiveBroadCastWidth">
                        <el-date-picker
                                v-model="timeDateVal"
                                size="small"
                                class="add-ipt"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始时间"
                                end-placeholder="结束时间">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="small" @click="liveBroadCastShow = false">取消</el-button>
                    <el-button size="small" type="primary" @click="liveBroadCastCommit()">确认</el-button>
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
                selectedLiveBroadcastList: [

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
                currentPage1: 1,//当前分页
                totalRecord1: 0,//总共分页数据条数
                titData: '添加直播链接',
                delIds: [],
                delShow: false,
                multipleTable: [],
                multipleTableDialog: [],
                loadingText: '正在加载中...',
                dialogImageUrl: '',
                dialogVisible: false,
                srcList: [
                    require('../../../static/img/icon-01.png')
                ],
                url: require('../../../static/img/icon-01.png'),
                provinceList: [],
                cityList: [],
                areaList: [],
                dateVal: '',//经营期限
                cooperationDateVal: '',//合作期限
                infoList: {
                    categoryName: '',//分类名称
                    productName: '',//产品名称
                    spuNo: '',//spu编号
                    brandName: ''//品牌名称
                },
                searchListAll: {
                    categoryId: '',//类别
                    productName: "",//商品名称
                    placeOfOrigin: '', /***产地*/
                    sku: "",//sku编号
                    spuNumber: "",//spu编号
                },
                liveBroadCastItem: {
                    spuNo:'',
                    id:'',
                    liveBroadcasTitle:'',
                    liveBroadcasDescribe:'',
                    liveBroadcastType:'',
                    liveBroadcastUrl:'',
                    status:'',
                    beginTime:'',
                    endTime:''
                },
                timeDateVal: '',//时间期限
                formLiveBroadCastWidth: '100px',
                liveBroadCastShow: false,//直播弹窗显示
                hideUpload: false,
                hideUpload2: false,
                hideUpload3: false,
                hideUpload4: false,
                supplierType: [],//供应商类型
                newBusinessLicenseList: [],//企业营业执照集合
                newLegalRepresentativeList: [],//法定代表人身份证正反面
                newSafetyPermitList: [],//食品生产许可证
                newProtocolList: [],//签署协议上传
                props: {
                    value: 'id',
                    label: 'name',
                    children: 'childList',
                    checkStrictly: true,
                    emitPath: false
                },
                options: []
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
            toAddLiveBroadcast() {
                this.timeDateVal = ['', ''];
                this.liveBroadCastItem = {
                    spuNo:this.infoList.spuNo,
                    id:'',
                    liveBroadcasTitle:'',
                    liveBroadcasDescribe:'',
                    liveBroadcastType:'',
                    liveBroadcastUrl:'',
                    status:'',
                    beginTime:'',
                    endTime:''
                }
                this.liveBroadCastShow = true;
            },
            toEditLiveBroadcast(item) {
                this.timeDateVal = [item.beginTimeStr, item.endTimeStr];
                this.liveBroadCastItem = {
                    spuNo:this.infoList.spuNo,
                    id:item.id,
                    liveBroadcasTitle:item.liveBroadcasTitle,
                    liveBroadcasDescribe:item.liveBroadcasDescribe,
                    liveBroadcastType:item.liveBroadcastType,
                    liveBroadcastUrl:item.liveBroadcastUrl,
                    status:item.status,
                    beginTime:'',
                    endTime:''
                }
                this.liveBroadCastShow = true;
            },
            liveBroadCastCommit() {
                if(this.liveBroadCastItem.id==''){
                    this.loadingShow = true;
                    MyPost('/yl-ms-product/ms/liveBroadcast/add', {
                        spuNo: this.liveBroadCastItem.spuNo,
                        liveBroadcasTitle: this.liveBroadCastItem.liveBroadcasTitle,
                        liveBroadcasDescribe: this.liveBroadCastItem.liveBroadcasDescribe,
                        liveBroadcastType: this.liveBroadCastItem.liveBroadcastType,
                        liveBroadcastUrl: this.liveBroadCastItem.liveBroadcastUrl,
                        status: this.liveBroadCastItem.status,
                        beginTime: typeof (this.timeDateVal[0]) === 'undefined' ? "" : this.timeDateVal[0],
                        endTime: typeof (this.timeDateVal[1]) === 'undefined' ? "" : this.timeDateVal[1]
                    }).then((res) => {
                        this.getLiveBroadcastList();
                        this.loadingShow = false;
                        this.liveBroadCastShow = false
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                        } else {
                            this.$message.error(message);
                        }
                    })
                }
                if(this.liveBroadCastItem.id!=''){
                    this.loadingShow = true;
                    MyPost('/yl-ms-product/ms/liveBroadcast/edit', {
                        id: this.liveBroadCastItem.id,
                        liveBroadcasTitle: this.liveBroadCastItem.liveBroadcasTitle,
                        liveBroadcasDescribe: this.liveBroadCastItem.liveBroadcasDescribe,
                        liveBroadcastType: this.liveBroadCastItem.liveBroadcastType,
                        liveBroadcastUrl: this.liveBroadCastItem.liveBroadcastUrl,
                        status: this.liveBroadCastItem.status,
                        beginTime: typeof (this.timeDateVal[0]) === 'undefined' ? "" : this.timeDateVal[0],
                        endTime: typeof (this.timeDateVal[1]) === 'undefined' ? "" : this.timeDateVal[1]
                    }).then((res) => {
                        this.getLiveBroadcastList();
                        this.loadingShow = false;
                        this.liveBroadCastShow = false
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                        } else {
                            this.$message.error(message);
                        }
                    })
                }
            },
            handleSelectionDialogChange(val) {
                this.multipleTableDialog = val;
            },
            handleSelectionChange(val) {
                this.multipleTable = val;
            },
            delClk() {
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
                this.delIds = this.multipleTable.map(item => {
                    return item.id
                });
                this.delShow = true;
            },
            configDelClk(){
                this.loadingShow = true;
                MyPost('/yl-ms-product/ms/liveBroadcast/remove', {
                    ids: this.delIds
                }).then((res) => {
                    this.getLiveBroadcastList();
                    this.loadingShow = false;
                    this.delShow = false
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            getLiveBroadcastList() {
                this.loadingShow2 = true;
                MyPost('/yl-ms-product/ms/liveBroadcast/list', {
                    spuNo: this.infoList.spuNo,
                    start: (this.currentPage1 - 1) * 10,
                    length: 10
                }).then((res) => {
                    this.loadingShow2 = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.selectedLiveBroadcastList = data.data;
                        if (data.data.length == 0) {
                            this.page_show1 = false;
                        } else {
                            this.page_show1 = true;
                        }
                        this.totalRecord1 = data.recordsTotal;
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
            handleCurrentChange1(val) {
                this.currentPage1 = val;
                this.getLiveBroadcastList();
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

                        this.getLiveBroadcastList();
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
