<template>
    <div class="invoiceDetails">
        <div class="return-line">
            <span @click="goPage">返回</span>
        </div>
        <div class="add-mod-con">
            <div class="add-mod-one">
                <h3><em></em>基本信息</h3>
                <div class="add-mod-line">
                    <div class="add-box">
                        <span class="add-tip">* 发货单号：</span>
                        <p class="add-p">{{invoiceNo}}</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 联系方式：</span>
                        <p class="add-p">{{consigneePhone}}</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 供货单位：</span>
                        <p class="add-p">{{consigneeAddress}}</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 发货状态：</span>
                        <p class="add-p">{{invoiceStatus}}</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 审核人：</span>
                        <p class="add-p">{{reviewerPerson}}</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 操作时间：</span>
                        <p class="add-p">{{purchaseDate}}</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 结算方式：</span>
                        <p class="add-p">{{settlementMethod}}</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 采购单号：</span>
                        <p class="add-p">{{invoiceNo}}</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 经手人：</span>
                        <p class="add-p">{{invoiceNo}}</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 收货仓库：</span>
                        <p class="add-p">{{invoiceNo}}</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 配送车牌号：</span>
                        <p class="add-p">{{deliveryPlate}}</p>
                    </div>
                </div>
            </div>
            <div class="add-mod-one">
                <h3><em></em>商品明细</h3>
                <div class="add-mod-line">
                    <div class="tab-mod">
                        <el-table
                                ref="multipleTable"
                                :data="tableData"
                                tooltip-effect="dark"
                                style="width: 100%;"
                                border>
                            <el-table-column
                                    prop="skuId"
                                    label="商品名称">
                            </el-table-column>
                            <el-table-column
                                    prop="shipNumber"
                                    label="数量">
                            </el-table-column>
                            <el-table-column
                                    prop=""
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
        name: 'invoiceDetails',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                loadingShow: false,
                loadingText: '正在加载中...',
                tableData: [],
                multipleSelection: [],
                addBoxShow: false,
                invoiceNo:'',//f发货单号
                consigneePhone:"",//收货人电话
                consigneeAddress:"",//收货人地址
                invoiceStatus:"",//发货状态
                consignee:"",//收货人
                reviewerPerson:"",//审核人
                purchaseDate:"",//发货日期
                settlementMethod:"",//结算方式
                deliveryPlate:"",//配送车牌号

            }
        },
        created() {
            this.$store.state.navTit = '商品';
            this.$store.state.navChildTit = 'SKU列表';
            if(this.$route.query.id){
                this.queryGoodDetail(this.$route.query.id)
            }
        },
        methods: {
            queryGoodDetail(detailId){
                this.loadingShow=true;
                MyPost('/yl-ms-platform/invoice/queryById', {
                    id:detailId
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        var detail=data.data;
                        this.invoiceNo=detail.invoiceNo;//f发货单号
                        this.consigneePhone=detail.consigneePhone;//收货人电话
                        this.consigneeAddress=detail.consigneeAddress;//收货人地址
                        if (detail.invoiceStatus=="0"){
                            this.invoiceStatus="待发货"
                        }else if(detail.invoiceStatus=="1"){
                            this.invoiceStatus="已发货"
                        }else if(detail.invoiceStatus=="2"){
                            this.invoiceStatus="发货失败"
                        }
                        this.consignee=detail.consignee;//收货人
                        this.reviewerPerson=detail.reviewerPerson;//审核人
                        if(detail.purchaseDate){
                            var dateee = new Date(detail.purchaseDate).toJSON();
                            this.purchaseDate=new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
                        }else {
                            this.purchaseDate="";
                        }

                        this.settlementMethod=detail.settlementMethod;//结算方式
                        this.deliveryPlate=detail.deliveryPlate;//配送车牌号
                        this.tableData=detail.invoiceDetailsBOList;//商品列表
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            goPage() {
                this.$router.push({
                    path: '/enterpriseDeliveryManagement'
                })
            },
            goInfor(){
                this.$router.push({
                    path: '/codeInformation'
                })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .invoiceDetails
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
