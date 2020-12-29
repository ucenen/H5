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
                <!--                <span v-if="showRec" :class="tabShow == 4 ? 'tab-on' : ''" @click="tabClk(4)">收货信息</span>-->
                <!--                <span v-if="showRec" :class="tabShow == 5 ? 'tab-on' : ''" @click="tabClk(5)">附件</span>-->
            </div>

            <div class="tab-con" v-show="tabShow == 1">
                <table class="tab">
                    <tr>
                        <td class="td_con">{{typeName}}单号</td>
                        <td>{{contentForm.warehouseOrderNo}}</td>
                        <td class="td_con">单据日期</td>
                        <td>{{contentForm.creationTime}}</td>

                        <td class="td_con">{{typeName}}类型</td>
                        <td>{{contentForm.warehouseOrderType}}</td>

                    </tr>
                    <tr>

                        <td class="td_con">业务单号</td>
                        <td>{{contentForm.businessNo}}</td>
                        <td class="td_con">{{typeName}}人员</td>
                        <td>{{contentForm.warehouseOrderPerson}}</td>

                        <td class="td_con">{{typeName}}人员电话</td>
                        <td>{{contentForm.warehouseOrderPersonPhone}}</td>

                    </tr>
                    <tr>
                        <td class="td_con">{{typeName}}仓库</td>
                        <td>{{contentForm.warehouseName}}</td>

                        <td class="td_con">{{typeName}}日期</td>
                        <td>{{contentForm.warehouseOrderDate}}</td>
                        <td class="td_con">{{typeName}}部门</td>
                        <td>{{contentForm.warehouseOrderDepartment}}</td>


                    </tr>
                </table>

            </div>
            <div class="tab-con" v-show="tabShow == 2">

                <div class="result-con">
                    <div class="tab-mod">
                        <el-table
                                :data="type == 1?contentForm.outWarehouseOrderDetailsList:contentForm.warehouseOrderDetailsList"
                                tooltip-effect="dark"
                                style="width: 100%;"
                                border>
                            <el-table-column
                                    prop="skuCode"
                                    label="SKU编号">
                            </el-table-column>
                            <el-table-column
                                    prop="skuName"
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
                                    v-if="type==1"
                                    prop="residueInventory"
                                    label="批次可用库存数量">
                            </el-table-column>
                            <el-table-column
                                    prop="expirationTime"
                                    label="保质期">
                                <template slot-scope="scope">
                                    <span>{{scope.row.expirationTime?scope.row.expirationTime+'天':''}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    :label="type==1?'订购数量':'收货数量'">
                                <template slot-scope="scope">
                                    <span>{{type==1?scope.row.orderNumber:scope.row.shipNumber}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="unit"
                                    label="数量单位">
                            </el-table-column>
                            <el-table-column
                                    :label="typeName+'数量'">
                                <template slot-scope="scope">
                                    <span>{{type == 1?scope.row.outWarehouseNumber:scope.row.inWarehouseNumber}}</span>
                                </template>
                            </el-table-column>

                            <!--                            <el-table-column-->
                            <!--                                    prop="actualDeliveryQuantity"-->
                            <!--                                    label="实际交货数量">-->
                            <!--                            </el-table-column>-->
                            <el-table-column
                                    prop="unit"
                                    label="数量单位">
                            </el-table-column>
                            <el-table-column
                                    label="单价">
                                <template slot-scope="scope">
                                    <span>¥{{regexNum(scope.row.unitPrice)}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="总金额">
                                <template slot-scope="scope">
                                    <span>¥{{regexNum(scope.row.totalPrice)}}</span>
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
                        <td>{{
                            contentForm.reviewerStatus == 1 ? '待复核' :
                            contentForm.reviewerStatus == 2?'复核通过':
                            contentForm.reviewerStatus == 3?'复核不通过':
                            contentForm.reviewerStatus == 4?'已作废':
                            contentForm.reviewerStatus == 5?'已收货':
                            contentForm.reviewerStatus == 6?'已完成':''}}
                        </td>
                    </tr>
                    <tr>
                        <td class="td_con">复核备注</td>
                        <td colspan="5">{{contentForm.reviewerMemo}}</td>
                    </tr>

                </table>

            </div>
            <!--            <div class="tab-con" v-show="tabShow == 4">-->
            <!--                <table class="tab">-->
            <!--                    <tr>-->
            <!--                        <td class="td_con">发货单位</td>-->
            <!--                        <td>{{receiveForm.sendUnit}}</td>-->
            <!--                        <td class="td_con">发货人</td>-->
            <!--                        <td>{{receiveForm.sendPerson}}</td>-->

            <!--                        <td class="td_con">发货人电话</td>-->
            <!--                        <td>{{receiveForm.sendPersonPhone}}</td>-->


            <!--                    </tr>-->
            <!--                    <tr>-->

            <!--                        <td class="td_con">配送车牌号</td>-->
            <!--                        <td>{{receiveForm.sendCarNo}}</td>-->
            <!--                        <td class="td_con">发货单号</td>-->
            <!--                        <td>{{receiveForm.sendNo}}</td>-->

            <!--                        <td class="td_con">发票号码</td>-->
            <!--                        <td>{{receiveForm.invoiceNumber}}</td>-->


            <!--                    </tr>-->
            <!--                    <tr>-->
            <!--                        <td class="td_con">收货人员</td>-->
            <!--                        <td>{{receiveForm.receivePerson}}</td>-->

            <!--                        <td class="td_con">收货日期</td>-->
            <!--                        <td>{{receiveForm.receiveDate}}</td>-->

            <!--                        <td class="td_con">收货部门</td>-->
            <!--                        <td>{{receiveForm.receiveDepartment}}</td>-->


            <!--                    </tr>-->
            <!--                    <tr>-->
            <!--                        <td class="td_con">收货地址</td>-->
            <!--                        <td colspan="5">{{receiveForm.receiveAddress}}</td>-->

            <!--                    </tr>-->
            <!--                    <tr>-->
            <!--                        <td class="td_con">收货备注</td>-->
            <!--                        <td colspan="5">{{receiveForm.receiveMemo}}</td>-->

            <!--                    </tr>-->

            <!--                </table>-->

            <!--            </div>-->
            <div class="tab-con1" v-show="tabShow == 5">
                <table class="tab" v-if="filePath[0]!=null&&filePath[0].length>0">
                    <tr v-if="filePath[0]!=null&&filePath[0].length>0">
                        <td class="td_con">{{filePath[0]!=null?'附件1':''}}</td>
                        <td><img class="imgPic" @click="showImage(filePath[0])"
                                 :src="filePath[0]!=null?filePath[0]:''"/></td>

                        <td class="td_con">{{filePath[1]!=null?'附件2':''}}</td>
                        <td><img class="imgPic" @click="showImage(filePath[1])"
                                 :src="filePath[1]!=null?filePath[1]:''"/></td>

                        <td class="td_con">{{filePath[2]!=null?'附件3':''}}</td>
                        <td>
                            <img class="imgPic" @click="showImage(filePath[2])"
                                 :src="filePath[2]!=null?filePath[2]:''"/>
                        </td>

                    </tr>
                    <tr v-if="filePath[3]!=null&&filePath[3].length>0">
                        <td class="td_con">{{filePath[3]!=null?'附件4':''}}</td>
                        <td><img class="imgPic" @click="showImage(filePath[3])"
                                 :src="filePath[3]!=null?filePath[3]:''"/></td>


                        <td class="td_con">{{filePath[4]!=null?'附件5':''}}</td>
                        <td><img class="imgPic" @click="showImage(filePath[4])"
                                 :src="filePath[4]!=null?filePath[4]:''"/></td>


                        <td class="td_con">{{filePath[5]!=null?'附件6':''}}</td>
                        <td><img class="imgPic" @click="showImage(filePath[5])"
                                 :src="filePath[5]!=null?filePath[5]:''"/></td>


                    </tr>
                    <tr v-if="filePath[6]!=null&&filePath[6].length>0">
                        <td class="td_con">{{filePath[6]!=null?'附件7':''}}</td>
                        <td><img class="imgPic" @click="showImage(filePath[6])"
                                 :src="filePath[6]!=null?filePath[6]:''"/></td>


                        <td class="td_con">{{filePath[7]!=null?'附件8':''}}</td>
                        <td><img class="imgPic" @click="showImage(filePath[7])"
                                 :src="filePath[7]!=null?filePath[7]:''"/></td>

                        <td class="td_con">{{filePath[8]!=null?'附件9':''}}</td>
                        <td><img class="imgPic" @click="showImage(filePath[8])"
                                 :src="filePath[8]!=null?filePath[8]:''"/></td>

                    </tr>
                    <tr v-if="filePath[9]!=null&&filePath[9].length>0">
                        <td class="td_con">{{filePath[9]!=null?'附件10':''}}</td>
                        <td><img class="imgPic" @click="showImage(filePath[9])"
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

                showImageBoolean: false,
                images: [],
                warehouse: '',
                payFun: '',
                warehouseOrderId: '',
                type: '',
                typeName: '',
                tabShow: 1,
                showRec: false,
                prochusType: '',
                filePath: [],
                receiveForm: {
                    filePath: '',// 附件

                    id: '',// 收货单编码

                    inWarehouseId: '',// 入库仓库

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
        computed: {
            caculate() {
                return function (arg1, arg2) {
                    if (arg1 > 0 && arg2 > 0) {
                        var m = 0;
                        var s1 = arg1.toString();
                        var s2 = arg2.toString();
                        try {
                            m += s1.split(".")[1].length;
                        } catch (e) {
                        }
                        try {
                            m += s2.split(".")[1].length;
                        } catch (e) {
                        }

                        return this.regexNum(Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m));
                    } else {
                        return ""
                    }
                }
            }
        },
        created() {
            this.$store.state.navTit = '库存管理';
            this.$store.state.navChildTit = '库存流水';
            this.warehouseOrderId = this.$route.query.warehouseOrderId
            this.type = this.$route.query.type
            this.typeName = this.type == 1 ? '出库' : '入库'

            this.queryProchusingFn();
        },
        methods: {
            regexNum(str) {

                var num = str + "";
                if (Number(num) <= 0 || num == undefined || num == null) {
                    return '0.00';
                }
                if (!/^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]*)?$/.test(num)) {
                    return '0.00';
                }
                if (num.indexOf(".") == -1) {
                    return num = num + '.00';
                }
                var newStr = num.split('.');
                if (newStr[1].length <= 1) {
                    //小数点后只有一位时
                    num = num + '0';
                } else if (newStr[1].length > 1) {
                    //小数点后两位以上时
                    var decimals = newStr[1].substr(0, 2);

                    num = newStr[0] + '.' + decimals;

                }

                return num;
            },
            showImage(src) {
                if (this.checkNull(src)) {
                    return;
                }
                this.images = [];
                this.images.push(src)
                const viewer = this.$el.querySelector('.images').$viewer
                viewer.show()
            },
            getPayFun() {
                MyPost('/banyan-procurement/purchase/querySettlementWay', {}).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].id == this.contentForm.settlementMethod)
                                this.payFun = data[i].dictionaryValue
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
                MyPost('/banyan-procurement/purchase/queryPurchaseWay', {}).then((res) => {
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
            getDictionaryList() {
                //selectAll
                MyPost('/banyan-inventory/warehouse/queryList', {}).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        for (var i = 0; i < data.data.length; i++) {
                            if (data.data[i].id == this.receiveForm.inWarehouseId) {
                                this.warehouse = data.data[i].warehouseName
                                break

                            }
                        }
                        // this.brandList = data.data
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
            queryProchusingFn() {
                MyPost('/banyan-inventory/warehouseOrderView/getWarehouseOrderView', {
                    warehouseOrderId: this.warehouseOrderId,
                    type: this.type
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
                        // this.getPayFun()
                        // this.getProchusType()
                    } else {
                        this.$message.error(message);
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
                    //line-height 50px /*设置其文字内容垂直居中*/
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
                    //line-height 80px /*设置其文字内容垂直居中*/
                    height 80px
                    vertical-align middle
                    text-align left
                    width 16%


</style>
