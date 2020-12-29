<template>
    <div class="prochusingInfo">
        <div class="nav-top">
            <div class="nav-box" @click="goPage">
                <img src="static/img/backlast.png"/>
                <p>返回</p>
            </div>
        </div>
        <div class="infor-mod-2">
            <div class="infor-tab-all">
                <div class="infor-tab">
                    <span :class="tabShow == 1 ? 'tab-on' : ''" @click="tabClk(1)">基本信息</span>
                    <span :class="tabShow == 2 ? 'tab-on' : ''" @click="tabClk(2)">商品信息</span>
                    <span :class="tabShow == 3 ? 'tab-on' : ''" @click="tabClk(3)">复核信息</span>
                </div>
            </div>
            <div class="tab-con" v-show="tabShow == 1">
                <table class="tab">
                    <tr>
                        <td class="td_con">入库单号</td>
                        <td v-if="type==1">{{contentForm.warehouseOrderNo}}</td>
                        <td v-else>
                            <el-input v-model="titData">
                            </el-input>
                        </td>
                        <td class="td_con">单据日期</td>
                        <td v-if="type==1">{{contentForm.creationTime}}</td>
                        <td v-else>
                            <el-input v-model="titData">
                            </el-input>
                        </td>
                        <td class="td_con">入库类型</td>
                        <td v-if="type==1">{{contentForm.warehouseOrderTypeName}}</td>
                        <td v-else>
                            <el-input v-model="titData">
                            </el-input>
                        </td>

                    </tr>
                    <tr>
                        <td class="td_con">业务单号</td>
                        <td v-if="type==1">{{contentForm.businessNo}}</td>
                        <td v-else>
                            <el-input v-model="titData">
                            </el-input>
                        </td>
                        <td class="td_con">入库日期</td>
                        <td v-if="type==1">{{contentForm.warehouseOrderDate}}</td>
                        <td v-else>
                            <el-input v-model="titData">
                            </el-input>
                        </td>
                        <td class="td_con">入库部门</td>
                        <td v-if="type==1">{{contentForm.warehouseOrderDepartment}}</td>
                        <td v-else>
                            <el-input v-model="titData">
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="td_con">入库人员</td>
                        <td v-if="type==1">{{contentForm.warehouseOrderPerson}}</td>
                        <td v-else>
                            <el-input v-model="titData">
                            </el-input>
                        </td>
                        <td class="td_con">入库人员电话</td>
                        <td v-if="type==1">{{contentForm.warehouseOrderPersonPhone}}</td>
                        <td v-else>
                            <el-input v-model="titData">
                            </el-input>
                        </td>
                        <td class="td_con">入库仓库</td>
                        <td v-if="type==1">{{contentForm.warehouseName}}</td>
                        <td v-else>
                            <el-input v-model="titData">
                            </el-input>
                        </td>
                    </tr>
                </table>

            </div>
            <div class="tab-con" v-show="tabShow == 2">

                <div class="result-con">
                    <div class="tab-mod">
                        <el-table
                                ref="multipleTable"
                                :data="tableData"
                                tooltip-effect="dark"
                                style="width: 100%;"
                                border>
                            <el-table-column
                                    disabled
                                    type="selection"
                                    width="35">
                            </el-table-column>
                            <el-table-column
                                    prop="sku"
                                    label="SKU编号">
                            </el-table-column>
                            <el-table-column
                                    prop="productName"
                                    label="SKU名称">
                            </el-table-column>
                            <el-table-column
                                    prop="capacity"
                                    label="容量">
                            </el-table-column>
                            <el-table-column
                                    prop="batchNo"
                                    label="批次">
                            </el-table-column>
                            <el-table-column
                                    prop="qualityGuaranteePeriod"
                                    label="保质期">
                            </el-table-column>
                            <el-table-column
                                    prop="shipNumber"
                                    label="收货数量">
                            </el-table-column>
                            <el-table-column
                                    prop="unit"
                                    label="数量单位">
                            </el-table-column>
                            <el-table-column
                                    prop="inWarehouseNumber"
                                    label="入库数量">
                            </el-table-column>
                            <el-table-column
                                    prop="unit"
                                    label="数量单位">
                            </el-table-column>
                            <el-table-column
                                    prop="unitPrice"
                                    label="单价">
                            </el-table-column>
                            <el-table-column
                                    prop="totalPrice"
                                    label="总金额">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="tab-con" v-show="tabShow == 3">
                <table class="tab">
                    <tr>
                        <td class="td_con">复核日期</td>
                        <td v-if="type==1">{{contentForm.reviewerDate}}</td>
                        <td v-else>
                            <el-input v-model="titData">
                            </el-input>
                        </td>
                        <td class="td_con">复核人</td>
                        <td v-if="type==1">{{contentForm.reviewerPersonName}}</td>
                        <td v-else>
                            <el-input v-model="titData">
                            </el-input>
                        </td>
                        <td class="td_con">复核结果</td>
                        <td v-if="type==1">{{contentForm.reviewerStatusStr}}</td>
                        <td v-else>
                            <el-input v-model="titData">
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="td_con">复核备注</td>
                        <td  colspan="5" v-if="type==1">{{contentForm.reviewerMemo}}</td>
                        <td  colspan="5" v-else>
                            <el-input v-model="titData">
                            </el-input>
                        </td>
                    </tr>

                </table>

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
                <p>正在执行删除操作，是否确认删除？</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="delShow = false">取 消</el-button>
                <el-button type="primary" size="small" @click="configClk">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import store from 'si-store'
    import {MyGet, MyPost, MyPostJson} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from 'components/footerbar/footerbar.vue'
    import {quillEditor} from 'vue-quill-editor'
    import 'quill/dist/quill.snow.css'
    import * as Quill from 'quill'

    export default {
        name: 'systemSet',
        components: {
            Loading,
            quillEditor,
            footerbar
        },
        data() {
            return {
                multipleTable: '',
                loadingShow: false,
                loadingText: '正在加载中...',
                tableData: [],
                type:1,
                tabShow:1,
                warehouseTypeList:[],
                contentForm: {
                    creationTime:"",
                    warehouseOrderNo: "",
                    warehouseDate: "",
                    businessNo: "",
                    warehouseOrderDate: "",
                    warehouseOrderType: "",
                    warehouseOrderTypeName: "",
                    warehouseOrderDepartment: "",
                    warehouseOrderPerson: "",
                    warehouseOrderPersonPhone: "",
                    warehouseId: "",
                    warehouseName:"",
                    reviewerDate: "",
                    reviewerPerson: "",
                    reviewerStatus: "",
                    reviewerMemo: "",
                    reviewerStatusStr:"",
                },
            }
        },
        mounted() {

        },
        created() {
            this.$store.state.navTit = '库存管理';
            this.$store.state.navChildTit = '入库管理';
            this.headers = {
                token: store.get('tokenVal')
            };
            this.warehouseId=this.$route.query.warehouseId;
            // this.getQueryInWarehouseType();
            this.getWarehouseInfo();
        },
        methods: {
            getQueryInWarehouseType(dictionaryKey){
                if (this.checkNull(store.get("warehouse"))){
                    MyPost('/banyan-inventory/warehouse/in/queryInWarehouseType', {
                    }).then((res) => {
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.warehouseTypeList=data;
                            for (let i=0;i<this.warehouseTypeList.length;i++){
                                if (this.warehouseTypeList[i].dictionaryKey==dictionaryKey){
                                    this.contentForm.warehouseOrderTypeName = this.warehouseTypeList[i].dictionaryValue;
                                }
                            }
                            store.set('warehouse', data);
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
                }else {

                    this.warehouseTypeList=store.get("warehouse")
                    console.log("warehouseTypeList=="+JSON.stringify(this.warehouseTypeList));
                    console.log("warehouseTypeList.dictionaryKey=="+JSON.stringify(this.warehouseTypeList));
                    for (let i=0;i<this.warehouseTypeList.length;i++){
                        if (this.warehouseTypeList[i].dictionaryKey==dictionaryKey){
                            this.contentForm.warehouseOrderTypeName = this.warehouseTypeList[i].dictionaryValue;
                        }
                    }
                }

            },
            tabClk(num){
              this.tabShow=num;
            },
            getWarehouseInfo(){
                MyPost('/banyan-inventory/warehouse/in/queryById', {
                    id:this.warehouseId
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.contentForm={
                            warehouseOrderNo: data.warehouseOrderNo,
                            creationTime: this.timeFormatYYMMDD(data.creationTime),
                            businessNo: data.businessNo,
                            warehouseOrderDate:  this.timeFormatYYMMDD(data.warehouseOrderDate),
                            warehouseOrderType: data.warehouseOrderType,
                            warehouseOrderDepartment: data.warehouseOrderDepartment,
                            warehouseOrderPerson: data.warehouseOrderPerson,
                            warehouseOrderPersonPhone: data.warehouseOrderPersonPhone,
                            warehouseId: data.warehouseId,
                            warehouseName:data.warehouseName,
                            reviewerDate: this.timeFormatYYMMDD(data.reviewerDate),
                            reviewerPerson: data.reviewerPerson,
                            reviewerPersonName: data.reviewerPersonName,
                            reviewerStatus: data.reviewerStatus,
                            reviewerMemo: data.reviewerMemo,
                            warehouseOrderTypeName:"",
                        }
                        this.tableData= data.warehouseDetailProductList;
                        for(let i=0;i<this.tableData.length;i++){
                            if (this.tableData[i].unitPrice==null){
                                this.tableData[i].unitPrice=0;
                            }
                            if (this.tableData[i].inWarehouseNumber==null){
                                this.tableData[i].inWarehouseNumber=0;
                            }
                            this.tableData[i].totalPrice=Number(this.tableData[i].unitPrice)*Number(this.tableData[i].inWarehouseNumber)
                            this.tableData[i].unitPrice= this.regexNumberAll(this.tableData[i].unitPrice);
                            this.tableData[i].totalPrice= this.regexNumberAll(this.tableData[i].totalPrice);
                        }
                        if (data.reviewerStatus=="1"){
                            this.contentForm.reviewerStatusStr= "待复核";
                        }else if (data.reviewerStatus=="2"){
                            this.contentForm.reviewerStatusStr= "复核通过";
                        }else if (data.reviewerStatus=="3"){
                            this.contentForm.reviewerStatusStr= "复核不通过";
                        }else if (data.reviewerStatus=="4"){
                            this.contentForm.reviewerStatusStr= "复核不通过";
                        }
                        this.getQueryInWarehouseType(data.warehouseOrderType);

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

            goPage() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../../styles/css/my.scss"
    .prochusingInfo
        input:

        :-webkit-outer-spin-button,
        input::-webkit-inner-spin-button
            -webkit-appearance none

        input[type='number']
            -moz-appearance textfield

        .el-select
            width 100%

        .upload-demo-2
            display none

        .upload-demo-1
            .el-upload-list
                display none

        .minW .el-dialog
            width 640px

        .ql-editor
            min-height 400px

        .el-checkbox
            display block
            margin 10px 0px

        .result-con
            padding-bottom 100px

            .el-table thead tr
                font-size 12px
                color #262626
                border-radius 4px 4px 0 0
                height 50px

            .el-table thead th
                background #FAFAFA

            .el-table thead th > .cell
                color #262626

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

            .color-under-line
                text-decoration underline

            .pagenum_mod
                margin-bottom 148px
                float right
                overflow hidden
                margin-top 30px

            .btn-group
                text-align center
                padding 60px 0 30px 0
                overflow hidden

        .clearFox
            clear both

        h3
            clear both
            margin-top 10px
            height 40px
            width 100%
            font-weight bold
            font-size 14px
            color #333

            em
                display inline-block
                background url('../../../../static/img/icon-l.png') no-repeat 0 0
                background-size contain
                width 22px
                height 22px
                vertical-align top
                margin-right 10px

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

        .infor-mod-2
            background #fff
            padding 105px 16px 16px 16px

            .infor-tab-all
                height 50px
                padding-top 10px
                width 100%
                position fixed
                top 141px
                left 286px
                margin-bottom 20px
                background #FFF
                z-index 2
                .infor-tab
                    height 40px
                    width 70%
                    span
                        float left
                        width 15%
                        height 40px
                        font-size 12px
                        color #333
                        text-align center
                        line-height 40px
                        cursor pointer
                        border 1px solid #E3E3E3
                        margin-right -1px

                    .tab-on
                        color #fff
                        border 1px solid #C13A3C
                        background #C13A3C

            .tab-con1
                margin-top 20px
                overflow hidden

                .add-box
                    overflow hidden
                    float left
                    /*width 720px*/
                    margin 0 auto 22px auto

                    .upload-demo
                        float left

                        .el-upload__tip
                            height 30px

                    .add-tip
                        width 184px
                        text-align right
                        line-height 36px
                        font-size 12px
                        color #333
                        margin-right 40px
                        display inline
                        float left

                    .add-tip-left
                        width 410px
                        text-align left

                    .add-ipt
                        height 36px
                        width 410px
                        float left

                    .add-ipttext
                        width 410px
                        float left

                    .add-image
                        width 100%
                        float left
                        margin-left 224px

                        .el-image-d1
                            float left
                            width 200px
                            height 200px
                            position relative
                            margin-right 20px
                            margin-bottom 10px

                            .el-image-d2
                                background #eeeeee
                                position absolute
                                left 0
                                right 0
                                bottom 0
                                height 40px
                                display flex
                                flex-direction row
                                align-items center
                                justify-content space-between
                                padding 0 30px
                                font-size 14px
                                color #333333

                                span
                                    cursor pointer

                                .span-color
                                    color #c13a3c

                        .el-image
                            width 200px
                            height 160px

                    .mr20
                        margin-right 20px

                    .el-input--small .el-input__inner
                        height 28px
                        line-height 28px

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

            .tab-con
                /*border*/
                overflow hidden
                color #262626

                .tab
                    border-collapse collapse
                    width 100%

                    .td_con
                        text-align center
                        background #FAFAFC
                        font-size 12px

                .tab tr td
                    border 1px solid #E8E8E8
                    font-size 12px
                    padding 0 5px
                    line-height 50px /*设置其文字内容垂直居中*/
                    height 50px
                    text-align left
                    width 16%


</style>
