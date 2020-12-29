<template>
    <div class="receiptDetails">
        <div class="return-line">
            <span @click="goPage">返回</span>
        </div>
        <div class="add-mod-con">
            <div class="add-mod-one">
                <h3><em></em>送货信息</h3>
                <div class="add-mod-line">
                    <div class="add-box">
                        <span class="add-tip">* 收货单号：</span>
                        <p class="add-p">{{receiptNo}}</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 供货单位：</span>
                        <p class="add-p">{{supplierId}}</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 发货时间：</span>
                        <p class="add-p">{{invoiceDate}}</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 配送车牌号：</span>
                        <p class="add-p">{{deliveryPlate}}</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 送货人电话：</span>
                        <p class="add-p">{{deliveryPhone}}</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 送货人：</span>
                        <p class="add-p">{{deliveryPerson}}</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 发货单号：</span>
                        <p class="add-p">{{invoiceNo}}</p>
                    </div>
                </div>
            </div>
            <div class="add-mod-one">
                <h3><em></em>收货信息</h3>
                <div class="add-mod-line">
                    <div class="add-box">
                        <span class="add-tip">* 业务单号：</span>
                        <p class="add-p">{{businessNo}}</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 业务类型：</span>
                        <p class="add-p">{{businessType}}</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 收货仓库：</span>
                        <p class="add-p">{{warehouseId}}</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 收货人：</span>
                        <p class="add-p">{{consignee}}</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 收货人电话：</span>
                        <p class="add-p">{{consigneePhone}}</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 收货状态：</span>
                        <p class="add-p">{{receiptStatus}}</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 收货时间：</span>
                        <p class="add-p">{{receiptDate}}</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 收货创建方式：</span>
                        <p class="add-p">{{creatorType}}</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 收货备注：</span>
                        <p class="add-p">无</p>
                    </div>
                </div>
            </div>
            <div class="add-mod-one">
                <h3><em></em>收货复核信息</h3>
                <div class="add-mod-line">
                    <div class="add-box">
                        <span class="add-tip">* 收货复核人：</span>
                        <p class="add-p">{{reviewerPerson}}</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 收货复核时间：</span>
                        <p class="add-p">{{reviewerDate}}</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 收货复核结果：</span>
                        <p class="add-p">{{reviewerStatus}}</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 收货复核备注：</span>
                        <p class="add-p">{{reviewerMemo}}</p>
                    </div>
                </div>
            </div>
            <div class="add-mod-one">
                <h3><em></em>附件信息</h3>
                <div class="add-mod-line">
                    <div class="add-box">
                        <span class="add-tip">* 附件单据1：</span>
                        <p class="add-p">图片地址</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 附件单据2：</span>
                        <p class="add-p">图片地址</p>
                    </div>
                </div>
            </div>
            <div class="add-mod-one">
                <h3><em></em>商品明细</h3>
                <div class="add-mod-line">
                    <div class="tab-mod">
                        <el-table
                                :data="tableData"
                                tooltip-effect="dark"
                                style="width: 100%;"
                                border>
                            <el-table-column
                                    prop="skuId"
                                    label="SKU编码">
                                <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="商品名称">
                            </el-table-column>
                            <el-table-column
                                    prop="shipNumber"
                                    width="100"
                                    label="数量">
                            </el-table-column>
                            <el-table-column
                                    prop="address2"
                                    label="数量单位">
                            </el-table-column>
                            <el-table-column
                                    prop="address3"
                                    width="120"
                                    label="箱规">
                            </el-table-column>
                            <el-table-column
                                    prop="address4"
                                    width="100"
                                    label="箱数">
                            </el-table-column>
                            <el-table-column
                                    prop=""
                                    width="100"
                                    label="码信息">
                                <template slot-scope="scope">
                                    <!--scope.row-->
                                    <span class="scope_btn color-blue" @click="goInfor">查看</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
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
</template>

<script>
    import store from 'si-store'
    import {MyGet, MyPost} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../footerbar/footerbar.vue'

    export default {
        name: 'receiptDetails',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                tableData: [],
                invoiceNo:'',//发货单号
                supplierId:"",//供应商id
                invoiceDate:"",//发货时间
                deliveryPhone:"",//配送人电话
                consigneePhone:"",//收货人电话
                consigneeAddress:"",//收货人地址
                invoiceStatus:"",//发货状态
                consignee:"",//收货人
                reviewerPerson:"",//审核人
                purchaseDate:"",//发货日期
                settlementMethod:"",//结算方式
                deliveryPlate:"",//配送车牌号
                reviewerStatus:"",//审核状态
                reviewerMemo:"",//审核备注
                businessNo:"",//业务单号
                businessType:"",//业务类型
                warehouseId:"",//收货仓库id
                invoiceDate:"",//发货时间
                receiptDate:"",//收货时间
                creatorType:"",//创建方式
                reviewerDate:"",//复核时间

            }
        },
        created() {
            this.$store.state.navTit = '商品';
            this.$store.state.navChildTit = '商品模板';
            if(this.$route.query.id){
                this.queryGoodDetail(this.$route.query.id)
            }
        },
        methods: {
            queryGoodDetail(detailId) {
                this.loadingShow = true;
                MyPost('/yl-ms-platform/receipt/queryById', {
                    id: detailId
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        var detail = data.data;
                        this.receiptNo=detail.receiptNo;
                        this.invoiceNo = detail.invoiceNo;//f发货单号
                        this.supplierId = detail.supplierId;
                        this.consigneePhone = detail.consigneePhone;//收货人电话
                        this.consigneeAddress = detail.consigneeAddress;//收货人地址
                        this.deliveryPhone=detail.deliveryPhone;
                        if (detail.reviewerStatus == "0") {
                            this.reviewerStatus = "待审核"
                        } else if (detail.reviewerStatus == "1") {
                            this.reviewerStatus = "审核通过"
                        } else if (detail.reviewerStatus == "2") {
                            this.reviewerStatus = "审核拒绝"
                        }
                        this.businessNo=detail.businessNo;//业务单号
                        this.consignee = detail.consignee;//收货人
                        this.reviewerPerson = detail.reviewerPerson;//审核人
                        this.businessType=detail.businessType;//业务类型
                        this.warehouseId=detail.warehouseId;//收货仓库id
                        if (detail.receiptStatus == "0") {
                            this.receiptStatus = "待收货"
                        } else if (detail.receiptStatus == "1") {
                            this.receiptStatus = "已收货"
                        } else if (detail.receiptStatus == "2") {
                            this.receiptStatus = "收货失败"
                        }
                        //发货时间
                        if (detail.invoiceDate) {
                            var dateeea = new Date(detail.invoiceDate).toJSON();
                            this.invoiceDate = new Date(+new Date(dateeea) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
                        } else {
                            this.invoiceDate = "";
                        }
                        //收货时间
                        if (detail.receiptDate){
                            var dateeeb = new Date(detail.receiptDate).toJSON();
                            this.receiptDate = new Date(+new Date(dateeeb) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
                        } else {
                            this.receiptDate = "";
                        }
                        if (detail.purchaseDate) {
                            var dateee = new Date(detail.purchaseDate).toJSON();
                            this.purchaseDate = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
                        } else {
                            this.purchaseDate = "";
                        }
                        //复核时间
                        if (detail.reviewerDate) {
                            var dateeec = new Date(detail.reviewerDate).toJSON();
                            this.reviewerDate = new Date(+new Date(dateeec) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
                        } else {
                            this.reviewerDate = "";
                        }
                        this.creatorType=detail.creatorType;
                        this.reviewerMemo=detail.reviewerMemo;
                        this.settlementMethod = detail.memo;//结算方式
                        this.deliveryPlate = detail.deliveryPlate;//配送车牌号
                        this.tableData = detail.receiptOrderDetailsList;//商品列表
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            goPage() {
                this.$router.go(-1)
            },
            goInfor(item) {
                this.$router.push({
                    path: '/codeInformation'
                })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .receiptDetails
        .minW
            .el-dialog
                width 900px
            .el-dialog__body
                padding 0
        .hide .el-upload--picture-card
            display none
        .return-line
            background #fff
            box-shadow 0px 0px 6px 0px rgba(174, 174, 174, 0.14)
            height 36px
            position relative
            padding-left 16px
            span
                font-size 12px
                color #308BDE
                line-height 36px
                cursor pointer
        .add-mod-con
            overflow hidden
            background #fff
            .add-mod-one
                &:last-child
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
                    .btn-r
                        float right
                        margin-right 20px
                        display inline
                .add-box
                    height 36px
                    margin-bottom 22px
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
                    .add-p
                        float left
                        font-size 12px
                        color #333
                        line-height 36px
            .line-add-box
                padding 20px 0 0 0
                .add-box
                    margin-bottom 0
            .add-mod-line
                overflow hidden
                .add-box
                    float left
                    width 520px
                    .add-ipt
                        width 230px
                    .mr20
                        width 150px
                .w100
                    height auto
                    width 100%
                .tab-mod
                    padding 0 20px
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
            .btn-group
                text-align center
                padding 20px 0 60px 0
                overflow hidden
        .contain-mod
            background #fff
            overflow hidden
            padding-left 18px
            padding-right 18px
            padding-top 10px
            .contain-top
                overflow hidden
                margin-top 5px
                .search-btn
                    font-size 12px
                    line-height 28px
                    color #333
                    display inline-block
                    margin-bottom 15px
                .w106
                    width 106px
                .w120
                    width 120px
                .mr30
                    margin-right 30px
                .mr22
                    margin-right 22px
                .el-button + .el-button
                    margin-bottom 15px
            .result-con
                padding-bottom 20px
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
            .tabs-mod
                height 30px
                margin-bottom 14px
</style>
