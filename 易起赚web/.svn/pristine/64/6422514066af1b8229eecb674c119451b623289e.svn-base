<template>
    <div class="addPurchase">
        <div class="return-line">
            <span @click="goPage">返回</span>
        </div>
        <div class="add-mod-con">
            <div class="add-mod-one">
                <h3><em></em>采购方信息</h3>
                <div class="add-mod-line">
                    <div class="add-box">
                        <span class="add-tip">* 采购单号：</span>
                        <el-input size="small" class="add-ipt" v-model="purchaseNo" :disabled="showDisable"></el-input>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 采购日期：</span>
                        <el-date-picker
                                size="mini"
                                v-model="purchaseDate"
                                value-format="yyyy-MM-dd"
                                :editable="false"
                                type="date"
                                class="add-ipt"
                                placeholder="">
                        </el-date-picker>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 采购方：</span>
                        <el-input size="small" v-model="purchaseCompany" :disabled="showDisable" class="add-ipt"></el-input>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 收货电话：</span>
                        <el-input size="small" v-model="consigneePhone" :disabled="showDisable" class="add-ipt"></el-input>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 采购人员：</span>
                        <el-input size="small" v-model="purchaseApplicant" :disabled="showDisable" class="add-ipt"></el-input>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 收货地址：</span>
                        <el-input size="small" v-model="consigneeAddress" :disabled="showDisable" class="add-ipt"></el-input>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 收货人：</span>
                        <el-input size="small" v-model="consignee" :disabled="showDisable" class="add-ipt"></el-input>
                    </div>
                </div>
            </div>
            <div class="add-mod-one">
                <h3><em></em>供应商信息</h3>
                <div class="add-mod-line">
                    <div class="add-box">
                        <span class="add-tip">* 供应商：</span>
                        <el-input size="small" v-model="supplierId" :disabled="showDisable" class="add-ipt"></el-input>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 供应商联系人：</span>
                        <el-input size="small" v-model="supplierId" :disabled="showDisable"  class="add-ipt"></el-input>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 供应商电话：</span>
                        <el-input size="small" v-model="supplierId" :disabled="showDisable"  class="add-ipt"></el-input>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 结算方式：</span>
                        <el-tooltip class="add-ipt" effect="dark" content="结算方式" placement="top-start">
                          <el-select :disabled="showDisable" size="mini" v-model="dataStatusVal" placeholder="结算方式">
                            <el-option
                                    v-for="item in dataStatusList"
                                    :key="item"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                          </el-select>
                    </el-tooltip>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 要求交货日期：</span>
                        <el-date-picker
                                size="mini"
                                v-model="requiredDeliveryDate"
                                value-format="yyyy-MM-dd"
                                :editable="false"
                                type="date"
                                class="add-ipt"
                                placeholder="">
                        </el-date-picker>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 预计交货日期：</span>
                        <el-date-picker
                                size="mini"
                                v-model="expectedDeliveryDate"
                                value-format="yyyy-MM-dd"
                                :editable="false"
                                type="date"
                                class="add-ipt"
                                placeholder="">
                        </el-date-picker>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 实际交货日期：</span>
                        <el-date-picker
                                size="mini"
                                v-model="actualDeliveryDate"
                                value-format="yyyy-MM-dd"
                                :editable="false"
                                type="date"
                                class="add-ipt"
                                placeholder="">
                        </el-date-picker>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 采购发票号码：</span>
                        <el-input size="small" v-model="purchaseInvoiceNo" :disabled="showDisable"  class="add-ipt"></el-input>
                    </div>
                </div>
            </div>
            <div class="add-mod-one">
                <h3><em></em>采购审核人信息</h3>
                <div class="add-mod-line">
                    <div class="add-box">
                        <span class="add-tip">* 采购发票号码：</span>
                        <p class="add-p">刘小强</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 采购审核时间：</span>
                        <p class="add-p">2019/10/22 13:00:00</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 采购审核结果：</span>
                        <p class="add-p">通过</p>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 采购审批备注：</span>
                        <p class="add-p">通过</p>
                    </div>
                </div>
            </div>
            <div class="add-mod-one">
                <h3><em></em>商品明细
                    <el-button size="mini" class="btn-r" type="primary">删除商品</el-button>
                    <el-button size="mini" class="btn-r" type="primary" plain @click="addcommodity">添加商品
                    </el-button>
                </h3>
                <div class="add-mod-line">
                    <div class="tab-mod">
                        <el-table
                                ref="multipleSelectTable"
                                :data="selectTableData"
                                tooltip-effect="dark"
                                style="width: 100%;"
                                border
                                @selection-change="handleSelectChange">
                            <el-table-column
                                    type="selection"
                                    width="55">
                            </el-table-column>
                            <!--<el-table-column-->
                            <!--label="商品编号">-->
                            <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
                            <!--</el-table-column>-->
                            <el-table-column
                                    prop="productName"
                                    label="商品名称">
                            </el-table-column>
                            <el-table-column
                                    prop="categoryName"
                                    label="商品类别">
                            </el-table-column>
                            <el-table-column
                                    prop="sku"
                                    width="100"
                                    label="SKU编号">
                            </el-table-column>
                            <el-table-column
                                    width="100"
                                    label="成本价">
                                <template slot-scope="scope">
                                    ￥{{scope.row.price}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="dataStatus"
                                    :formatter="reviewerDataStatus"
                                    width="100"
                                    label="状态">
                            </el-table-column>

                            <el-table-column
                                    prop="number"
                                    width="80"
                                    label="采购数量">
                            </el-table-column>
                            <el-table-column
                                    width="100"
                                    label="总金额">
                                <template slot-scope="scope">
                                    ￥{{scope.row.totalPrice}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    width="80"
                                    label="操作">
                                <template slot-scope="scope">
                                    <!--scope.row-->
                                    <span class="scope_btn">删除</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="pagenum_mod" v-if="pageShow">
                        <el-pagination
                                background
                                class="pageination_css"
                                @current-change="handleCurrentChange"
                                :current-page="currentSelectPage"
                                :page-size="10"
                                layout="total, prev, pager, next, jumper"
                                :total="totalSelectRecord">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="btn-group">
                <el-button type="primary" plain @click="configClkCancle">取消</el-button>
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
        <el-dialog title="添加商品"
                   class="minW"
                   :visible.sync="addBoxShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="contain-mod">
                <div class="contain-top">
                    <span class="search-btn">商品名称：</span>
                    <el-input size="mini" class="w106 mr30" v-model="search_list.productName"></el-input>
                    <span class="search-btn">商品类别：</span>
                    <el-tooltip class="w120 mr30" effect="dark" content="商品类别" placement="top-start">
                        <el-select size="mini" placeholder="商品类别" v-model="search_list.categoryId">
                            <el-option
                                    label="全部"
                                    value="">
                            </el-option>
                            <el-option
                                    v-for="item in getAllCategoryList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-tooltip>

                    <span class="search-btn">上架状态：</span>
                    <el-tooltip class="w120 mr30" effect="dark" content="上架状态" placement="top-start">
                        <el-select size="mini" placeholder="上架状态" v-model="search_list.shelfState">
                            <el-option
                                    label="全部"
                                    value="">
                            </el-option>
                            <el-option
                                    v-for="item in shelfStateList"
                                    :key="item"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-tooltip>
                    <el-button size="mini" type="primary" plain class="mr22" @click="addcommodity">查询</el-button>
                    <!--<el-button size="mini" type="primary" plain class="mr22" @click="serachBoxShow = true">高级查询</el-button>-->
                    <el-button size="mini" type="primary" @click="clearFn">清空</el-button>
                </div>
                <div class="result-con">
                    <div class="tab-mod">
                        <el-table
                                ref="multipleTable"
                                :data="tableData"
                                tooltip-effect="dark"
                                style="width: 100%;"
                                border
                                @selection-change="handleSelectionChange">
                            <el-table-column
                                    type="selection"
                                    width="55">
                            </el-table-column>
                            <!--<el-table-column-->
                                    <!--label="商品编号">-->
                                <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
                            <!--</el-table-column>-->
                            <el-table-column
                                    prop="productName"
                                    label="商品名称">
                            </el-table-column>
                            <el-table-column
                                    prop="categoryName"
                                    label="商品类别">
                            </el-table-column>
                            <el-table-column
                                    prop="sku"
                                    width="100"
                                    label="SKU编号">
                            </el-table-column>
                            <el-table-column
                                    width="100"
                                    label="成本价">
                            <template slot-scope="scope">
                                ￥{{scope.row.price}}
                            </template>
                            </el-table-column>
                            <el-table-column
                                    prop="dataStatus"
                                    :formatter="reviewerDataStatus"
                                    width="100"
                                    label="状态">
                            </el-table-column>
                            <el-table-column
                                    width="80"
                                    label="操作">
                                <template slot-scope="scope">
                                    <!--scope.row-->
                                    <span class="scope_btn">删除</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="pagenum_mod" v-if="page_show">
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
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="addBoxShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="sureSelect">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import store from 'si-store'
    import {MyGet, MyPost,PayPost} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../footerbar/footerbar.vue'

    export default {
        name: 'addPurchase',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                loadingShow: false,
                loadingText: '正在加载中...',
                pageShow:false,
                currentSelectPage:1,//选中商品的当前分页
                totalSelectRecord: 0,//总共分页数据条数
                selectTableData:[],
                multipleSelectTable: [],
                page_show: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                tableData: [],
                multipleSelection: [],
                addBoxShow: false,
                purchaseNo:"",//采购单号
                purchaseDate:'',//采购日期
                showDisable: false,//是否可编辑
                purchaseCompany:'',//采购方
                purchaseApplicant:"",//采购人员
                consigneePhone:"",//收货人电话
                consignee:"",//收货人
                consigneeAddress:"",//收货地址
                supplierId:"",//供应商Id
                settlementMethod:'',//结算方式
                requiredDeliveryDate:"",//要求结货日期
                expectedDeliveryDate:"",//预计结货日期
                actualDeliveryDate:"",//实际结货日期
                purchaseInvoiceNo:"",//采购发票号码
                dataStatusList:[
                    {label:'现金',value:0},{label:'银行转账',value:1},{label:'支付宝',value:2},{label:'微信',value:3},{label:'其他',value:4},
                ],//结算方式集合
                dataStatusVal:"",
                search_list: {
                    productName: '',//品牌名称
                    categoryId: '',//类别
                    auditStatus: '',//审核状态 1待审核 2已审核 3 审核拒绝
                    shelfState: '',//上架状态 1已上架 2未上架
                },
                getAllCategoryList: [],
                shelfStateList: [
                    {
                        label: '已上架',
                        value: '1'
                    },
                    {
                        label: '未上架',
                        value: '2'
                    }
                ],
                purchaseDetailsList:[],
            }
        },
        created() {
            // this.$store.state.navTit = '采购';
            // this.$store.state.navChildTit = '采购管理';
            this.$store.state.navTit = '商品';
            this.$store.state.navChildTit = '商品模板';
            if (this.$route.query.edit==3){
                this.showDisable=true;
                this.queryGoodDetail(this.$route.query.id);
            }
        },
        methods: {
            queryGoodDetail(detailId){
                this.loadingShow=true;
                MyPost('/yl-ms-platform/purchase/queryById', {
                    id:detailId
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                       var detail=data.data;
                       this.purchaseNo=detail.purchaseNo//采购单号
                       this.purchaseDate=detail.purchaseDate//采购日期
                       this.purchaseCompany=detail.purchaseCompany//采购方
                       this.purchaseApplicant=detail.purchaseApplicant//采购人员
                       this.consigneePhone=detail.consigneePhone//收货人电话
                       this.consignee=detail.consignee//收货人
                       this.consigneeAddress=detail.consigneeAddress//收货地址
                       this.supplierId=detail.supplierId//供应商Id
                       this.settlementMethod=detail.settlementMethod//结算方式
                        console.log("detai.settlementMethod=="+Number(detail.settlementMethod));
                       var indexFlag=Number(detail.settlementMethod);
                       this.dataStatusVal=this.dataStatusList[indexFlag].label
                       this.requiredDeliveryDate=detail.requiredDeliveryDate//要求结货日期
                       this.expectedDeliveryDate=detail.expectedDeliveryDate//预计结货日期
                       this.actualDeliveryDate=detail.actualDeliveryDate//实际结货日期
                       this.purchaseInvoiceNo=detail.purchaseInvoiceNo//采购发票号码
                       this.multipleSelectTable=detail.purchaseDetailsList
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            sureSelect(){
                if (this.multipleSelection.length == 0) {
                    return this.$message.error('请选择商品');
                }
                this.selectTableData=this.multipleSelection;
                this.selectTableData.forEach(function (item,index) {
                    item.number=100;
                    item.totalPrice=Number(item.price)*(item.number);

                })
                this.addBoxShow=false;
                // this.toggleSelection(this.multipleSelection[1]);
                // this.$refs.multipleSelectTable.toggleRowSelection(this.selectTableData);
            },
            clearFn() {
                this.search_list = {
                    productName: '',//品牌名称
                    categoryId: '',//类别
                    auditStatus: '',//审核状态 1待审核 2已审核 3 审核拒绝
                    shelfState: '',//上架状态 1已上架 2未上架
                }
                this.addcommodity();
            },
            reviewerDataStatus:function (row) {
                if (row.dataStatus==1){
                    return '上架';
                }else{
                    return '未上架';
                }
            },
            getAllCategoryListFn() {
                this.loadingShow = true;
                MyGet('/liquor-product/category/getAllCategoryList').then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.getAllCategoryList = data;
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            addcommodity() {
                this.addBoxShow = true;
                this.page_show = true;
                this.getAllCategoryListFn();
                MyPost('/liquor-product/sku/queryList', {
                    productName: this.search_list.productName,
                    categoryId: this.search_list.categoryId,
                    auditStatus: this.search_list.auditStatus,
                    shelfState: this.search_list.shelfState,
                    dataStatus: '2',
                    start: (this.currentPage - 1) * 10,
                    length: 10
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.tableData = data.data;
                        if (data.data.length == 0) {
                            this.page_show = false;
                        } else {
                            this.page_show = true;
                        }
                        this.totalRecord = data.recordsTotal;
                    } else {
                        this.page_show = false;
                        this.$message.error(message);
                    }
                })
            },
            configClkCancle(){
                this.$router.go(-1);
            },
            configClk() {
                if (!this.purchaseNo) {
                    return this.$message.error('请填写采购单号');
                }
                if (!this.purchaseDate) {
                    return this.$message.error('请填写采购日期');
                }
                if (!this.purchaseCompany) {
                    return this.$message.error('请填写采购方');
                }
                if (!this.purchaseApplicant) {
                    return this.$message.error('请填写采购人员');
                }
                if (!this.consignee) {
                    return this.$message.error('请填写收货人');
                }
                if (!this.consigneePhone) {
                    return this.$message.error('请填写收货人电话');
                }
                if (!this.consigneeAddress) {
                    return this.$message.error('请填写收货人地址');
                }
                if (!this.dataStatusVal) {
                    return this.$message.error('请选择结算方式');
                }
                if (!this.requiredDeliveryDate) {
                    return this.$message.error('请填写要求结货日期');
                }
                if (!this.expectedDeliveryDate) {
                    return this.$message.error('请填写预计结货日期');
                }
                if (!this.actualDeliveryDate) {
                    return this.$message.error('请填写实际结货日期');
                }
                if (!this.purchaseInvoiceNo) {
                    return this.$message.error('请填写采购发票号码');
                }
                if (this.multipleSelectTable.length == 0) {
                    return this.$message.error('请选择商品');
                }
                for(var i=0;i<this.dataStatusList.length;i++){
                    if (this.dataStatusVal=this.dataStatusList[i].label){
                        this.settlementMethod=this.dataStatusList[i].value
                    }
                }

                this.loadingShow = true;
                var purchaseDetailsList=[];
                for(var i=0;i<this.multipleSelectTable.length;i++){
                    var han={
                        sku:this.multipleSelectTable[i].id,
                        purchaseNumber:this.multipleSelectTable[i].number
                    }
                    purchaseDetailsList.push(han)
                }
                if (this.$route.query.edit){
                    MyPost('/liquor-product/spu/upd', {
                        id: this.$route.query.id,
                        spuName: this.spuName,
                        brandId: this.brandId,
                        categoryId: this.categoryId,
                        memo: this.memo
                    }).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.$message({
                                message: '编辑成功',
                                type: 'success'
                            });
                            this.$router.go(-1);
                        } else {
                            this.$message.error(message);
                        }
                    })
                } else {
                    this.purchaseDetailsList=this.multipleSelectTable;
                    PayPost('/yl-ms-platform/purchase/savePurchase', {
                        purchaseNo:this.purchaseNo,//采购单号
                        purchaseDate:this.purchaseDate,//采购日期
                        purchaseCompany:Number(this.purchaseCompany),//采购方
                        purchaseApplicant:Number(this.purchaseApplicant),//采购人员
                        consigneePhone:this.consigneePhone,//收货人电话
                        consignee:Number(this.consignee),//收货人
                        consigneeAddress:this.consigneeAddress,//收货地址
                        supplierId:6,//供应商Id
                        settlementMethod:Number(this.settlementMethod),//结算方式
                        requiredDeliveryDate:this.requiredDeliveryDate,//要求结货日期
                        expectedDeliveryDate:this.expectedDeliveryDate,//预计结货日期
                        actualDeliveryDate:this.actualDeliveryDate,//实际结货日期
                        purchaseInvoiceNo:this.purchaseInvoiceNo,//采购发票号码
                        purchaseDetailsList:purchaseDetailsList,
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
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleSelectTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleSelectTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;

            },
            handleSelectChange(val) {
                this.multipleSelectTable = val;

            },
            goPage() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .addPurchase
        .el-input--mini .el-input__inner {
            height: 36px;
            line-height: 36px;
        }
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
