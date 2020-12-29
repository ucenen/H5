<template>
    <div class="prochusingInfo">
        <div class="nav-top">
            <div class="nav-box" @click="goPage">
                <img src="static/img/backlast.png"/>
                <p>返回</p>
            </div>

        </div>
        <div class="infor-mod">
            <div class="infor-tab">
                <span :class="tabShow == 1 ? 'tab-on' : ''" @click="tabClk(1)">基本信息</span>
                <span :class="tabShow == 2 ? 'tab-on' : ''" @click="tabClk(2)">商品信息</span>
                <span :class="tabShow == 3 ? 'tab-on' : ''" @click="tabClk(3)">复核信息</span>
                <span v-if="showRec" :class="tabShow == 4 ? 'tab-on' : ''" @click="tabClk(4)">收货信息</span>
                <span v-if="showRec" :class="tabShow == 5 ? 'tab-on' : ''" @click="tabClk(5)">附件</span>
            </div>

            <div class="tab-con" v-show="tabShow == 1">
                <table class="tab">
                    <tr>
                        <td class="td_con">采购单号</td>
                        <td>{{contentForm.purchaseNo}}</td>
                        <td class="td_con">单据日期</td>
                        <td>{{contentForm.creatorTime}}</td>

                        <td class="td_con">采购日期</td>
                        <td>{{contentForm.purchaseDate}}</td>

                    </tr>
                    <tr>
                        <td class="td_con">采购类型</td>
                        <td>{{prochusType}}</td>

                        <td class="td_con">所属门店</td>
                        <td>{{contentForm.purchaseCompany}}</td>

                        <td class="td_con">采购人员</td>
                        <td>{{contentForm.purchasePerson}}</td>

                    </tr>
                    <tr>
                        <td class="td_con">采购人员电话</td>
                        <td>{{contentForm.purchasePersonPhone}}</td>
                        <td class="td_con">结算方式</td>
                        <td>{{payFun}}</td>
                        <td class="td_con">要求交货日期</td>
                        <td>{{contentForm.requiredDeliveryDate}}</td>
                    </tr>
                    <tr>
                        <td class="td_con">采购人员地址</td>
                        <td colspan="5">{{contentForm.purchaseAddress}}</td>
                    </tr>
                </table>
            </div>
            <div class="tab-con" v-show="tabShow == 2">

                <div class="result-con">
                    <div class="tab-mod">
                        <el-table
                                :data="contentForm.purchaseDetailsList"
                                tooltip-effect="dark"
                                style="width: 100%;"
                                border>
                            <el-table-column
                                    prop="sku"
                                    label="SKU编号">
                            </el-table-column>
                            <el-table-column
                                    prop="goodsName"
                                    label="SKU名称">
                            </el-table-column>
                            <el-table-column
                                    prop="goodsSpecifications"
                                    label="容量">
                            </el-table-column>
                            <el-table-column
                                    prop="purchaseNumber"
                                    label="采购数量">
                            </el-table-column>
                            <el-table-column
                                    prop="quantityUnit"
                                    label="数量单位">
                            </el-table-column>
                            <el-table-column
                                    label="单价">
                                <template slot-scope="scope">
                                    <span>¥{{scope.row.unitPrice}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="总金额">
                                <template slot-scope="scope">
                                    <span>¥{{(scope.row.purchaseNumber)*(scope.row.unitPrice)}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="tab-con" v-show="tabShow == 3">
                <table class="tab">
                    <tr>
                        <td class="td_con">复核日期</td>
                        <td>{{contentForm.reviewerDate}}</td>

                        <td class="td_con">复核人</td>
                        <td>{{contentForm.reviewerPersonName}}</td>

                        <td class="td_con">复核结果</td>
                        <td>{{ contentForm.reviewerStatus == '1' ? '待复核' :
                            contentForm.reviewerStatus == '2'?'复核通过':
                            contentForm.reviewerStatus == '3'?'复核不通过':
                            contentForm.reviewerStatus == '4'?'复核不通过':
                            contentForm.reviewerStatus == '5'?'复核通过': ''}}
                        </td>
                    </tr>
                    <tr>
                        <td class="td_con">复核备注</td>
                        <td colspan="5">{{contentForm.reviewerMemo}}</td>
                    </tr>

                </table>

            </div>
            <div class="tab-con" v-show="tabShow == 4">
                <table class="tab">
                    <tr>
                        <td class="td_con">发货单位</td>
                        <td>{{receiveForm.sendUnit}}</td>
                        <td class="td_con">发货人</td>
                        <td>{{receiveForm.sendPerson}}</td>
                        <td class="td_con">发货人电话</td>
                        <td>{{receiveForm.sendPersonPhone}}</td>
                    </tr>
                    <tr>
                        <td class="td_con">配送车牌号</td>
                        <td>{{receiveForm.sendCarNo}}</td>
                        <td class="td_con">发货单号</td>
                        <td>{{receiveForm.sendNo}}</td>
                        <td class="td_con">发票号码</td>
                        <td>{{receiveForm.invoiceNumber}}</td>
                    </tr>
                    <tr>
                        <td class="td_con">收货人员</td>
                        <td>{{receiveForm.receivePerson}}</td>
                        <td class="td_con">收货日期</td>
                        <td>{{receiveForm.receiveDate}}</td>

                        <td class="td_con">收货部门</td>
                        <td>{{receiveForm.receiveDepartment}}</td>

                    </tr>
                    <tr>
                        <td class="td_con">收货地址</td>
                        <td>{{receiveForm.receiveAddress}}</td>
                        <td class="td_con">收货备注</td>
                        <td colspan="3">{{receiveForm.receiveMemo}}</td>
                    </tr>

                </table>

            </div>
            <div class="tab-con1" v-show="tabShow == 5">
                <table class="tab"  v-if="filePath[0]!=null&&filePath[0].length>0">
                    <tr v-if="filePath[0]!=null&&filePath[0].length>0">
                        <td class="td_con">{{filePath[0]!=null?'附件1':''}}</td>
                        <td>

                            <img class="imgPic"  @click="showImage(filePath[0])"
                                 :src="filePath[0]!=null?filePath[0]:''"/></td>

                        <td class="td_con">{{filePath[1]!=null?'附件2':''}}</td>
                        <td><img class="imgPic"   @click="showImage(filePath[1])"
                                 :src="filePath[1]!=null?filePath[1]:''"/></td>

                        <td class="td_con">{{filePath[2]!=null?'附件3':''}}</td>
                        <td>
                            <img class="imgPic"   @click="showImage(filePath[2])"
                                 :src="filePath[2]!=null?filePath[2]:''"/>
                          </td>

                    </tr>
                    <tr v-if="filePath[3]!=null&&filePath[3].length>0">
                        <td class="td_con">{{filePath[3]!=null?'附件4':''}}</td>
                        <td> <img class="imgPic"  @click="showImage(filePath[3])"
                                  :src="filePath[3]!=null?filePath[3]:''"/></td>


                        <td class="td_con">{{filePath[4]!=null?'附件5':''}}</td>
                        <td> <img class="imgPic"  @click="showImage(filePath[4])"
                                  :src="filePath[4]!=null?filePath[4]:''"/></td>


                        <td class="td_con">{{filePath[6]!=null?'附件6':''}}</td>
                        <td> <img class="imgPic"  @click="showImage(filePath[5])"
                                  :src="filePath[5]!=null?filePath[5]:''"/></td>


                    </tr>
                    <tr v-if="filePath[6]!=null&&filePath[6].length>0">
                        <td class="td_con">{{filePath[6]!=null?'附件7':''}}</td>
                        <td> <img class="imgPic"  @click="showImage(filePath[6])"
                                  :src="filePath[6]!=null?filePath[6]:''"/></td>


                        <td class="td_con">{{filePath[7]!=null?'附件8':''}}</td>
                        <td><img class="imgPic"  @click="showImage(filePath[7])"
                                 :src="filePath[7]!=null?filePath[7]:''"/></td>

                        <td class="td_con">{{filePath[8]!=null?'附件9':''}}</td>
                        <td><img class="imgPic"  @click="showImage(filePath[8])"
                                 :src="filePath[8]!=null?filePath[8]:''"/></td>

                    </tr>
                    <tr v-if="filePath[9]!=null&&filePath[9].length>0">
                        <td class="td_con">{{filePath[9]!=null?'附件10':''}}</td>
                        <td><img class="imgPic"  @click="showImage(filePath[9])"
                                 :src="filePath[9]!=null?filePath[9]:''"/></td>

                        <td class="td_con"></td>
                        <td></td>

                        <td class="td_con"></td>
                        <td></td>

                    </tr>
                </table>
                <div v-else> 没有发现附件</div>

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
        <div class="images" v-show="showImageBoolean" v-viewer="{movable: true}">
            <img v-for="src in images" :src="src" :key="src">
        </div>

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

                showImageBoolean:false,
                images:[],
                warehouse: '',
                payFun: '',
                prochusingId: '',
                tabShow: 1,
                showRec: false,
                prochusType: '',
                filePath: [],
                brandList:[],
                receiveForm: {
                    filePath: '',// 附件

                    id: '',// 收货单编码

                    inWarehouseId: '',// 入库仓库
                    inWarehouseName:"",
                    invoiceNumber: '',// 发票号码

                    purchaseId: '',// 采购单id

                    receiveAddress: '',// 收货地址

                    receiveDate: '',// 收货日期

                    receiveDepartment: '',// 收货部门

                    receiveMemo: '',// 收货备注

                    receivePerson: '',// 收货人员

                    receiveType: '',// 收货类型 1： 收货 2： 收获入库

                    sendCarNo: '',// 配送车牌号

                    sendNo: '',// 发货单号

                    sendPerson: '',// 发货人

                    sendPersonPhone: '',// 发货人电话

                    sendUnit: '',// 发货单位
                },
                contentForm: {
                    actualDeliveryDate: "",//	实际交货日期	body	false	string(date)
                    consignee: "",//	收货人	body	false	integer(int32)
                    consigneeAddress: "",//	收货地址	body	false	string
                    consigneePhone: "",//	收货人电话	body	false	string
                    expectedDeliveryDate: "",//	预计交货日期	body	false	string(date)
                    id: "",//	采购单编码	body	false	integer(int32)
                    purchaseAddress: "",//	采购地址	body	false	string
                    purchaseApplicant: "",//	采购申请人	body	false	integer(int32)
                    purchaseCompany: "",//	采购方	body	false	string
                    purchaseDate: "",//	采购日期	body	true	string(date)
                    purchaseDetailsList: [{
                        actualDeliveryQuantity: "",//	实际交付数量	body	false	integer(int32)
                        goodsName: "",//	商品名称	body	true	string
                        goodsSpecifications: "",//	商品规格	body	true	string
                        id: "",//	采购单详情编码	body	false	integer(int32)
                        purchaseId: "",//	采购单id	body	false	integer(int32)
                        purchaseNumber: "",//	采购数量	body	false	integer(int32)
                        quantityUnit: "",//	单位	body	false	string
                        sku: "",//	sku编码	body	false	string
                        total: "",//	单价	body	false	number
                        unitPrice: "",//	单价	body	false	number
                    }],//		body	false	array	采购单详情 BO
                    purchaseInvoiceNo: "",//	采购发票号码	body	false	string
                    purchaseMemo: "",//	采购单备注	body	false	string
                    purchaseNo: "",//	采购单号	body	true	string
                    purchasePerson: "",//	采购人	body	false	string
                    purchasePersonPhone: "",//	采购人电话	body	false	string
                    purchaseReviewer: "",//	采购复核人	body	false	integer(int32)
                    purchaseStatus: "",//	采购单状态 0-未审核 1-审核通过 2-审核失败	body	false	string
                    purchaseTotal: "",//	采购总额	body	false	number
                    purchaseWay: "",//	采购方式	body	false	string
                    requiredDeliveryDate: "",//	要求交货日期	body	false	string(date)
                    reviewerMemo: "",//	复核备注	body	false	string
                    reviewerStatus: "",//	复核状态	body	false	string
                    settlementMethod: "",//	结算方式	body	false	integer(int32)
                    supplierContact: "",//	供应商联系人	body	false	string
                    supplierId: "",//	供应商id	body	false	integer(int32)
                    supplierName: "",//	供应商名称	body	false	string
                    supplierNo: "",//	供应商编码	body	false	string
                    supplierPhone: "",//	供应商电话	body	false	string

                }
            }
        },
        mounted() {
        },
        created() {
            this.$store.state.navTit = '门店管理';
            this.$store.state.navChildTit = '门店采购';

            this.prochusingId = this.$route.query.prochusingId;
            this.queryProchusingFn();
            // this.queryRecFn();


        },
        methods: {
            showImage (src) {
                if(this.checkNull(src)){
                    return;
                }
                this.images=[];
                this.images.push(src)
                const viewer = this.$el.querySelector('.images').$viewer
                viewer.show()
            },
            getPayFun() {
                MyPost('/polaris/purchase/querySettlementWay', {}).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].id == this.contentForm.settlementMethod){
                                this.payFun = data[i].dictionaryValue
                                break
                            }
                        }
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
            getProchusType() {
                MyPost('/polaris/purchase/queryPurchaseWay', {}).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].id == this.contentForm.purchaseWay) {
                                this.prochusType = data[i].dictionaryValue
                                break

                            }
                        }
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
            queryRecFn() {
                MyPost('/polaris/purchase/queryDetailsByPurchaseNo', {
                    purchaseId: this.prochusingId,
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {

                        this.showRec = true
                        this.receiveForm = data;
                        if (this.receiveForm.receiveDate != null) {
                            this.receiveForm.receiveDate = this.timeFormatYYMMDD(this.receiveForm.receiveDate)
                        }
                        if (this.receiveForm.filePath != null) {
                            var str = this.receiveForm.filePath
                            for (var i = 0; i < str.split(",").length; i++) {
                                this.filePath.push(str.split(",")[i])

                            }
                        }
                    } else if (code == '1003001003') {
                        this.showRec = false
                    } else {
                        this.$message.error(message);
                    }
                })
            },

            queryProchusingFn() {
                MyPost('/polaris/purchase/queryById', {
                    id: this.prochusingId,
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.contentForm = data;
                        if (this.contentForm.creatorTime != null) {
                            this.contentForm.creatorTime = this.timeFormatYYMMDD(this.contentForm.creatorTime)
                        }
                        if (this.contentForm.reviewerDate != null) {
                            this.contentForm.reviewerDate = this.timeFormatYYMMDD(this.contentForm.reviewerDate)
                        }
                        this.getPayFun()
                        this.getProchusType()
                        if (data.reviewerStatus=="5"){
                            this.getQueryByPurchaseId();
                        }
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            getQueryByPurchaseId(){
                MyPost('/polaris/receive/queryByPurchaseId', {
                    purchaseId: this.prochusingId,
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.showRec=true;
                        this.receiveForm = data;
                        if (this.receiveForm.receiveDate != null) {
                            this.receiveForm.receiveDate = this.timeFormatYYMMDD(this.receiveForm.receiveDate)
                        }
                        this.getDictionaryList();
                    } else {
                        this.showRec=false;
                        this.$message.error(message);
                    }
                })
            },
            getDictionaryList() {
                MyPost('/banyan-inventory/warehouse/queryList', {}).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.brandList = data.data
                        for (let i=0;i<this.brandList.length;i++){

                            if (this.receiveForm.inWarehouseId==this.brandList[i].id){
                                this.receiveForm.inWarehouseName=this.brandList[i].warehouseName;
                                return
                            }
                        }
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
            tabClk(num) {

                this.tabShow = num;
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

        .infor-mod
            background #fff
            padding 50px 16px 16px 16px


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

            .tab-con
                /*border*/
                margin-top 20px
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
                    /*line-height 50px*/
                    height 50px
                    vertical-align middle
                    text-align left
                    width 16%
            .tab-con1
                /*border*/
                margin-top 20px
                overflow hidden
                color #262626

                .tab
                    border-collapse collapse
                    width 100%

                    .td_con
                        text-align center
                        background #FAFAFC
                        font-size 12px

                    .imgPic
                        height 50px
                        vertical-align: middle;

                .tab tr td
                    border 1px solid #E8E8E8
                    font-size 12px
                    padding 0 5px
                    line-height 80px /*设置其文字内容垂直居中*/
                    height 80px
                    vertical-align center
                    text-align left
                    width 16%


</style>
