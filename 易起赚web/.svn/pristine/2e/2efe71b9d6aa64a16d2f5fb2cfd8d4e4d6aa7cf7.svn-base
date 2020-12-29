<template>
    <div class="systemSet">
        <div class="nav-top">
            <div class="nav-box" @click="goPage">
                <img src="static/img/backlast.png"/>
                <p>返回</p>
            </div>
            <div class="nav-box" v-if="edit==1" @click="saveAll('1')">
                <img src="static/img/submit.png"/>
                <p>提交</p>
            </div>
            <div class="nav-box" v-if="edit==2" @click="saveAll('2')">
                <img src="static/img/submit.png"/>
                <p>提交</p>
            </div>
        </div>
        <div class="infor-mod">

            <div class="add-mod-one">
                <h3><em></em>基本信息</h3>
                <div class="add-box" v-if="edit==1">
                    <span class="add-tip">采购单号：</span>
                    <el-input maxlength="50" size="small" class="add-ipt" :disabled="true"
                              v-model="contentForm.purchaseNo"></el-input>
                </div>
                <!--                <div class="add-box">-->
                <!--                    <span class="add-tip"><i style="color: red">*</i> &nbsp;&nbsp;单据日期：</span>-->
                <!--                    <el-date-picker-->
                <!--                            style="width:60%"-->
                <!--                            v-model="contentForm.purchaseDate"-->
                <!--                            type="date"-->
                <!--                            placeholder="选择日期">-->
                <!--                    </el-date-picker>-->
                <!--                </div>-->
                <div class="add-box">
                    <span class="add-tip"><i style="color: red">*</i> &nbsp;&nbsp;采购日期：</span>
                    <el-date-picker
                            style="width:60%"
                            v-model="contentForm.purchaseDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                    </el-date-picker>

                </div>
                <div class="add-box">
                    <span class="add-tip"><i style="color: red">*</i> &nbsp;&nbsp;采购类型：</span>

                    <el-select class="add-ipt" v-model="contentForm.purchaseWay" placeholder="请选择">
                        <el-option
                                v-for="item in prochusType"
                                :key="item.dictionaryKey"
                                :label="item.dictionaryValue"
                                :value="item.dictionaryKey">
                        </el-option>
                    </el-select>

                </div>
                <div class="add-box">
                    <span class="add-tip">采购部门：</span>
                    <el-input size="small" maxlength="50" class="add-ipt"
                              v-model="contentForm.purchaseCompany"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip"><i style="color: red">*</i> 采购人员：</span>
                    <el-input maxlength="50" size="small" class="add-ipt"
                              v-model="contentForm.purchasePerson"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip"><i style="color: red">*</i> &nbsp;&nbsp;采购人员电话：</span>
                    <el-input maxlength="50" size="small" class="add-ipt"
                              v-model="contentForm.purchasePersonPhone"></el-input>
                </div>

                <div class="add-box">
                    <span class="add-tip">采购人员地址：</span>
                    <el-input maxlength="256" size="small" class="add-ipt"
                              v-model="contentForm.purchaseAddress"></el-input>
                </div>
                <h3><em></em>供应商信息</h3>
                <div class="add-box">
                    <span class="add-tip"><i style="color: red">*</i> &nbsp;&nbsp;供应商：</span>
                    <el-input maxlength="50" size="small" class="add-ipt"
                              v-model="contentForm.supplierName"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">供应商注册地址：</span>
                    <el-input maxlength="256" size="small" class="add-ipt"
                              v-model="contentForm.supplierAddress"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip"><i style="color: red">*</i> &nbsp;&nbsp;供应商联系人：</span>
                    <el-input size="small" maxlength="20" class="add-ipt"
                              v-model="contentForm.supplierContact"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip"><i style="color: red">*</i> &nbsp;&nbsp;供应商电话：</span>
                    <el-input maxlength="30" size="small" class="add-ipt"
                              v-model="contentForm.supplierPhone"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">供应商编号：</span>
                    <el-input maxlength="20" size="small" class="add-ipt"
                              v-model="contentForm.supplierNo"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip"><i style="color: red">*</i> &nbsp;&nbsp;要求交货日期：</span>

                    <el-date-picker
                            style="width:60%"
                            v-model="contentForm.requiredDeliveryDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                    </el-date-picker>

                </div>
                <div class="add-box">
                    <span class="add-tip"><i style="color: red">*</i> &nbsp;&nbsp;结算方式：</span>

                    <el-select class="add-ipt" v-model="contentForm.settlementMethod" placeholder="请选择">
                        <el-option
                                v-for="item in payFun"
                                :key="item.dictionaryKey"
                                :label="item.dictionaryValue"
                                :value="item.dictionaryKey">
                        </el-option>
                    </el-select>

                </div>
                <template v-if="edit==1">
                    <h3><em></em>复核信息</h3>
                    <div class="add-box">
                        <span class="add-tip">复核日期：</span>
                        <el-input maxlength="50" size="small" class="add-ipt" :disabled="true"
                                  v-model="contentForm.reviewerDate"></el-input>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">复核人：</span>
                        <el-input maxlength="50" size="small" class="add-ipt" :disabled="true"
                                  v-model="contentForm.reviewerPersonName"></el-input>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">复核结果：</span>
                        <el-input maxlength="50" size="small" class="add-ipt" :disabled="true"
                                  v-model=" contentForm.reviewerStatus == 1 ? '待复核' :
                            contentForm.reviewerStatus == 2?'待收货':
                            contentForm.reviewerStatus == 3?'复核不通过':
                            contentForm.reviewerStatus == 4?'已作废':
                            contentForm.reviewerStatus == 5?'已收货':
                            contentForm.reviewerStatus == 6?'已完成':''"></el-input>
                    </div>
                    <div class="add-box-long">
                        <span class="add-tip-long">复核备注：</span>
                        <el-input maxlength="50" size="small" class="add-ipt-long" :disabled="true"
                                  v-model="contentForm.reviewerMemo"></el-input>
                    </div>
                </template>
                <h3><em></em>商品明细</h3>
                <div>
                       <span style="float: right">
                <el-button size="small" class="mr22" style="margin-bottom: 22px"
                           @click="clearFn">添加商品</el-button>
                <el-button type="primary" size="small" @click="delClk">删除商品</el-button>
            </span>
                </div>
                <div class="result-con">
                    <el-table
                            ref="multipleTable"
                            :data="contentForm.purchaseDetailsList"
                            tooltip-effect="dark"

                            @selection-change="handleSelectionChange"
                            border>
                        <el-table-column
                                type="selection"
                                width="35">
                        </el-table-column>
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
                        <!--                        <el-table-column-->
                        <!--                                label="批次号">-->
                        <!--                            <template slot-scope="scope">-->
                        <!--                                <el-input type="text"-->
                        <!--                                          v-model="scope.row.batchNo"></el-input>-->
                        <!--                            </template>-->
                        <!--                        </el-table-column>-->
                        <el-table-column
                                label="采购数量">
                            <template slot-scope="scope">

                                <el-input size="small" type="tel"  @mousewheel.native.prevent
                                          oninput="if(value.length>8)value=value.slice(0,8)"
                                          @input="saveTable(scope.row)" v-model="scope.row.purchaseNumber"></el-input>

                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="quantityUnit"
                                label="数量单位">
                        </el-table-column>
                        <el-table-column
                                label="单价">
                            <template slot-scope="scope">
                                <div style="display: flex;flex-direction:row;align-items: center">
                                    <span style="margin-right: 4px">¥</span>
                                    <el-input size="small" type="tel"  @mousewheel.native.prevent
                                              oninput="if(value.length>8)value=value.slice(0,8)"
                                              @input="saveTable(scope.row)" v-model="scope.row.unitPrice"></el-input>

                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="总金额">
                            <template slot-scope="scope">
                                <span >¥{{regexNumberAll(Number(scope.row.purchaseNumber)*Number(scope.row.unitPrice))}}</span>
                                <!--                                <span>¥{{scope.row.purchaseNumber>0&&scope.row.unitPrice>0?(scope.row.purchaseNumber)*(scope.row.unitPrice):''}}</span>-->
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <el-dialog :title="titData"
                   class="minW"
                   :visible.sync="addBoxShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="add-contain" style="padding: 0 20px">
                <div class="contain-top">
                    <span class="search-btn">SKU名称：</span>
                    <el-input size="mini" maxlength="50" @keyup.enter.native="queryListFnMall" class="w106 mr30"
                              v-model="searchListAll.productName"></el-input>
                    <span class="search-btn ">商品类别：</span>
                    <el-cascader class="w106 mr30 " @keyup.enter.native="queryListFnMall"
                                 :options="options" :props="props" v-model="searchListAll.categoryId"
                                 @change="getPropertyFn" :show-all-levels="false"></el-cascader>

                    <span class="search-btn">产地：</span>

                    <el-input size="mini" maxlength="50" @keyup.enter.native="queryListFnMall" class="w106 mr30"
                              v-model="searchListAll.placeOfOrigin"></el-input>


                    <el-button size="mini" type="primary" plain class="mr22" @click="queryListFnMall">查询
                    </el-button>
                    <el-button size="mini" type="primary" @click="clearFn">清空</el-button>
                </div>
                <div class="result-con">
                    <div class="tab-mod">
                        <el-table
                                ref="multipleTableDialog"
                                :data="tableData"
                                tooltip-effect="dark"
                                max-height="500"

                                style="width: 100%;"
                                @selection-change="handleSelectionDialogChange"
                                border>
                            <el-table-column
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
                                    prop="placeOfOrigin"
                                    label="产地">
                            </el-table-column>
                            <!--                            <el-table-column-->
                            <!--                                    label="产地">-->
                            <!--                                <template slot-scope="scope">-->
                            <!--                                    <span>¥{{scope.row.info['容量']}}</span>-->
                            <!--                                </template>-->
                            <!--                            </el-table-column>-->
                            <el-table-column
                                    prop="categoryName"
                                    label="商品类别">
                            </el-table-column>
                            <el-table-column
                                    prop="fragranceType"
                                    label="香型">
                            </el-table-column>
                            <el-table-column
                                    prop="capacity"
                                    label="容量">
                            </el-table-column>
                            <el-table-column
                                    prop="boxGauge"
                                    label="箱规">
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
                <el-button size="small" type="primary" @click="addSKUClk">确认</el-button>
            </div>
        </el-dialog>
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
    import 'quill/dist/quill.snow.css'
    import * as Quill from 'quill'

    export default {
        name: 'systemSet',
        components: {
            Loading,
            footerbar
        },
        data() {

            return {
                page_showDialog: true,
                addBoxShow: false,
                props: {
                    value: 'id',
                    label: 'name',
                    children: 'childList',
                    checkStrictly: true,
                    emitPath: false
                },
                searchListAll: {
                    categoryId: '',//类别
                    productName: "",//商品名称
                    placeOfOrigin: '', /***产地*/
                    sku: "",//sku编号
                    spuNumber: "",//spu编号
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
                    purchaseDetailsList: [
                        //     {
                        //     actualDeliveryQuantity: "",//	实际交付数量	body	false	integer(int32)
                        //     goodsName: "五粮液100ml",//	商品名称	body	true	string
                        //     goodsSpecifications: "100ml",//	商品规格	body	true	string
                        //     id: "",//	采购单详情编码	body	false	integer(int32)
                        //     purchaseId: "12",//	采购单id	body	false	integer(int32)
                        //     purchaseNumber: "10",//	采购数量	body	false	integer(int32)
                        //     quantityUnit: "",//	单位	body	false	string
                        //     sku: "DN354354",//	sku编码	body	false	string
                        //     total: "",//	单价	body	false	number
                        //     unitPrice: "100",//	单价	body	false	number
                        // }, {
                        //     actualDeliveryQuantity: "",//	实际交付数量	body	false	integer(int32)
                        //     goodsName: "五粮液500ml",//	商品名称	body	true	string
                        //     goodsSpecifications: "500ml",//	商品规格	body	true	string
                        //     id: "",//	采购单详情编码	body	false	integer(int32)
                        //     purchaseId: "13",//	采购单id	body	false	integer(int32)
                        //     purchaseNumber: "10",//	采购数量	body	false	integer(int32)
                        //     quantityUnit: "",//	单位	body	false	string
                        //     sku: "DN354354",//	sku编码	body	false	string
                        //     total: "",//	单价	body	false	number
                        //     unitPrice: "100",//	单价	body	false	number
                        // }, {
                        //     goodsName: "五粮液1500ml",//	商品名称	body	true	string
                        //     sku: "DN354354",//	sku编码	body	false	string
                        //     goodsSpecifications: "1500ml",//	商品规格	body	true	string
                        //     quantityUnit: "",//	单位	body	false	string
                        //     unitPrice: "100",//	单价	body	false	number
                        //
                        //     actualDeliveryQuantity: "",//	实际交付数量	body	false	integer(int32)
                        //
                        //
                        //     id: "",//	采购单详情编码	body	false	integer(int32)
                        //     purchaseId: "14",//	采购单id	body	false	integer(int32)
                        //     purchaseNumber: "10",//	采购数量	body	false	integer(int32)
                        //
                        //     total: "",//	单价	body	false	number
                        // }
                    ],//		body	false	array	采购单详情 BO
                    purchaseInvoiceNo: "",//	采购发票号码	body	false	string
                    purchaseMemo: "",//	采购单备注	body	false	string
                    purchaseNo: "",//	采购单号	body	true	string
                    purchasePerson: "",//	采购人	body	false	string
                    purchasePersonPhone: "",//	采购人电话	body	false	string
                    purchaseReviewer: "",//	采购复核人	body	false	integer(int32)
                    purchaseStatus: "",//	采购单状态 0-未审核 1-审核通过 2-审核失败	body	false	string
                    purchaseTotal: "",//	采购总额	body	false	number
                    purchaseWay: "",//	采购类型	body	false	string
                    requiredDeliveryDate: "",//	要求交货日期	body	false	string(date)
                    reviewerMemo: "",//	复核备注	body	false	string
                    reviewerStatus: "",//	复核状态	body	false	string
                    settlementMethod: "",//	结算方式	body	false	integer(int32)
                    supplierContact: "",//	供应商联系人	body	false	string
                    supplierId: "",//	供应商id	body	false	integer(int32)
                    supplierName: "",//	供应商名称	body	false	string
                    supplierAddress: "",
                    supplierNo: "",//	供应商编码	body	false	string
                    supplierPhone: "",//	供应商电话	body	false	string

                },
                titData: '添加商品',
                formLabelWidth: "120px",
                multipleTable: '',
                multipleTableDialog: [],
                loadingShow: false,
                loadingText: '正在加载中...',
                tableData: [
                    {
                        categoryName: '',
                        placeOfOrigin: '',
                        fragranceType: '',
                        capacity: '',
                        boxGauge: '',
                        sku: "",//	sku编码	body	false	string
                        productName: '',
                        price: ''
                    }

                ],

                page_show: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                delIds: [],
                delShow: false,
                headers: {},
                maxHeight: 0,
                payFun: [],
                prochusType: [],
                prochusingId: '',
                edit: ''
            }
        },
        mounted() {

        },

        created() {
            this.$store.state.navTit = '采购管理';
            this.$store.state.navChildTit = '采购管理';

            this.edit = this.$route.query.edit;
            this.prochusingId = this.$route.query.prochusingId;
            this.headers = {
                token: store.get('tokenVal')
            };
            this.getPayFun()
            this.getProchusType()
            this.getAllCategoryListFn()
            if (this.edit == 1)
                this.getProchusInfo()

        },
        methods: {
            saveTable(item){
                if (this.checkNull(item.unitPrice)){
                    // item.unitPrice=0
                }else {
                    item.unitPrice=(item.unitPrice+"").replace(/[^\d.]/g,'').replace(/\.{2,}/g,'.')
                        .replace(/^\./g,'').replace('.','$#$')
                        .replace(/\./g,'').replace('$#$','.')
                        .replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')
                }
                if (this.checkNull(item.purchaseNumber)){
                    // item.purchaseNumber=0;
                }else {
                    item.purchaseNumber=(item.purchaseNumber+"").replace(/[^\d]/g,'');
                }

                item.totalPrice=Number(item.unitPrice)*Number(item.purchaseNumber);
                item.totalPrice=this.regexNumberAll(item.totalPrice);
            },
            getAllCategoryListFn() {
                MyGet('/liquor-product/category/categoryList').then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.options = this.deleteChildren(data);
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            deleteChildren(arr) {
                let childs = arr
                for (let i = childs.length; i--; i > 0) {
                    if (childs[i].childList) {
                        if (childs[i].childList.length) {
                            this.deleteChildren(childs[i].childList)
                        } else {
                            delete childs[i].childList
                        }
                    }
                }
                return arr
            },
            clearFn() {
                this.searchListAll = {
                    categoryId: '',//类别
                    productName: "",//商品名称
                    placeOfOrigin: '', /***产地*/
                    sku: "",//sku编号
                    spuNumber: "",//spu编号
                }

                this.currentPage = 1;
                this.getSkuList();
            },

            getPayFun() {
                MyPost('/banyan-procurement/purchase/querySettlementWay', {}).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.payFun = data
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
                        this.prochusType = data
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
            getProchusInfo() {
                this.loadingShow = true;

                MyPost('/banyan-procurement/purchase/queryById', {
                    id: this.prochusingId,

                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.contentForm = data;
                        if (this.contentForm.reviewerDate != null) {
                            this.contentForm.reviewerDate = this.timeFormatYYMMDD(this.contentForm.reviewerDate)
                        }
                        // if (this.contentForm.purchaseWay != null) {
                        //     this.contentForm.purchaseWay = parseInt(this.contentForm.purchaseWay)
                        // }
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
            queryListFnMall() {
                this.currentPage = 1;
                this.getSkuList();
            },

            getSkuList() {

                this.addBoxShow = true
                this.loadingShow = true;

                MyPost('/liquor-product/sku/queryList', {

                    categoryId: this.searchListAll.categoryId,
                    productName: this.searchListAll.productName,
                    placeOfOrigin: this.searchListAll.placeOfOrigin,

                    // sku: this.searchListAll.sku,
                    // spuNumber: this.searchListAll.spuNumber,
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

            beforeMount() {
                var h = document.documentElement.clientHeight || document.body.clientHeight;
                this.maxHeight = h - 300; //减去页面上固定高度height
            },

            handleCurrentChange(val) {
                this.currentPage = val;
                this.getSkuList();
            },

            configClk() {
                console.log(this.delIds)
                console.log(this.contentForm.purchaseDetailsList)
                for (var j = 0; j < this.delIds.length; j++) {
                    for (var i = 0; i < this.contentForm.purchaseDetailsList.length; i++) {
                        if (this.delIds[j] == this.contentForm.purchaseDetailsList[i].sku) {
                            this.contentForm.purchaseDetailsList.splice(i, 1)
                            i = i - 1
                        }

                    }
                }
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
                this.delShow = false;

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
                    return item.sku
                });
                this.delShow = true;
            },

            addSKUClk() {
                // if (this.contentForm.purchaseDetailsList) {
                //     for (var j = 0; j < this.contentForm.purchaseDetailsList.length; j++) {
                //     }
                // }
                if(this.multipleTableDialog.length==0){
                    this.$message.error('请勾选商品');
                    return
                }
                for (var i = 0; i < this.multipleTableDialog.length; i++) {
                    // categoryName: '',
                    //     placeOfOrigin:'',
                    //     fragranceType:'',
                    //     capacity:'',
                    //     boxGauge:'',
                    //     sku: "DN354354",//	sku编码	body	false	string
                    //     productName: '4534',
                    //     price:''
                    if (this.contentForm.purchaseDetailsList.length > 0) {
                        var isExist = false
                        for (var j = 0; j < this.contentForm.purchaseDetailsList.length; j++) {
                            if (this.multipleTableDialog[i].sku == this.contentForm.purchaseDetailsList[j].sku) {
                                isExist = true
                                break
                            }
                        }
                        if (!isExist) {
                            this.contentForm.purchaseDetailsList.push({
                                goodsName: this.multipleTableDialog[i].productName,//	商品名称	body	true	string
                                goodsSpecifications: this.multipleTableDialog[i].capacity,//	商品规格	body	true	string
                                quantityUnit: this.multipleTableDialog[i].unit,//	单位	body	false	string
                                sku: this.multipleTableDialog[i].sku,//	sku编码	body	false	string
                                skuId: this.multipleTableDialog[i].id,//	sku编码id	body	false	string
                                unitPrice: this.multipleTableDialog[i].price//	单价	body	false	number
                            })
                        }
                    } else {
                        this.contentForm.purchaseDetailsList.push({
                            goodsName: this.multipleTableDialog[i].productName,//	商品名称	body	true	string
                            goodsSpecifications: this.multipleTableDialog[i].capacity,//	商品规格	body	true	string
                            quantityUnit: this.multipleTableDialog[i].unit,//	单位	body	false	string
                            sku: this.multipleTableDialog[i].sku,//	sku编码	body	false	string
                            skuId: this.multipleTableDialog[i].id,//	sku编码id	body	false	string
                            unitPrice: this.multipleTableDialog[i].price//	单价	body	false	number
                        })
                    }

                }
                this.addBoxShow = false
            },

            saveAll(strStyle) {
                if (!this.contentForm.purchaseDate) {
                    this.$message.error('请输入采购日期');
                    return
                }
                if (!this.contentForm.purchaseWay) {
                    this.$message.error('请选择采购类型');
                    return
                }
                if (!this.contentForm.purchasePerson) {
                    this.$message.error('请输入采购人员');
                    return
                }

                if (!this.contentForm.purchasePersonPhone) {
                    this.$message.error('请输入采购人员电话');
                    return
                }
                if (!this.contentForm.supplierName) {
                    this.$message.error('请输入供应商');
                    return
                }

                if (!this.contentForm.supplierContact) {
                    this.$message.error('请输入供应商联系人');
                    return
                }
                if (!this.contentForm.supplierPhone) {
                    this.$message.error('请输入供应商电话');
                    return
                }
                if (!this.contentForm.requiredDeliveryDate) {
                    this.$message.error('请输入要求交货日期');
                    return
                }
                if (!this.contentForm.settlementMethod) {
                    this.$message.error('请输入结算方式');
                    return
                }
                if (!this.contentForm.purchaseDetailsList || this.contentForm.purchaseDetailsList.length == 0) {
                    this.$message.error('请添加商品明细');
                    return
                }
                if (this.contentForm.purchaseDetailsList) {
                    console.log(this.contentForm.purchaseDetailsList)
                    for (var i = 0; i < this.contentForm.purchaseDetailsList.length; i++) {
                        if (this.contentForm.purchaseDetailsList[i].purchaseNumber == null
                            || this.contentForm.purchaseDetailsList[i].purchaseNumber.length == 0) {
                            this.$message.error('请添加采购数量');
                            return
                        }
                        // if (this.contentForm.purchaseDetailsList[i].batchNo == null
                        //     || this.contentForm.purchaseDetailsList[i].batchNo.length == 0) {
                        //     this.$message.error('请添加批次号');
                        //     return
                        // }
                    }


                }
                this.loadingShow = true;

                let url = "";
                if (strStyle == "1") {
                    url = '/banyan-procurement/purchase/update'
                } else {
                    url = '/banyan-procurement/purchase/save'
                }
                let purchaseMasterBO = this.contentForm
                MyPostJson(url, purchaseMasterBO).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        this.$router.go(-1);
                    } else {
                        this.$confirm(message, '提示', {
                            confirmButtonText: '确定',
                            showCancelButton: false,
                            type: 'error'
                        }).then(() => {
                            this.delShow = false;
                        }).catch(() => {
                            this.delShow = false;
                        });
                    }
                })
            },

            handleSelectionChange(val) {
                this.multipleTable = val;
                console.log(val)
            },
            handleSelectionDialogChange(val) {
                this.multipleTableDialog = val;
                console.log(val)
            },

            goPage() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../../styles/css/my.scss"
    .systemSet
        .minW .el-dialog
            width 80% !important

            .pageination_css
                text-align right

            .contain-top
                overflow hidden

                .search-btn
                    font-size 12px
                    line-height 28px
                    color #333
                    display inline-block
                    margin-bottom 15px

                .el-input__inner {
                    height: 28px;
                    line-height: 28px;
                }

                .w106
                    width 106px

                .w120
                    width 120px

                .mr30
                    margin-right 30px

        /*.mr22*/
        /*margin-right 22px*/
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
            padding 50px 50px 16px 10px

            .add-mod-one
                /*margin-bottom 20px*/

                h3
                    font-weight bold
                    font-size 14px
                    color #333
                    margin-top 10px
                    padding-left 8px
                    line-height 22px
                    height 34px

                    em
                        float left
                        width 34px
                        height 34px
                        background url('../../../../static/img/icon-l.png') no-repeat 0 0
                        background-size contain

                .add-box-long
                    /*overflow hidden*/
                    width 100%
                    height 40px
                    float left
                    margin-bottom 22px

                    .add-tip-long
                        width 10.9%
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

                    .add-ipt-long
                        height 36px
                        width 86%
                        float left

                    .mr20
                        margin-right 20px

                    .el-input--small .el-input__inner
                        height 36px
                        line-height 36px

                .add-box
                    /*overflow hidden*/
                    width 33%
                    height 40px
                    float left
                    margin-bottom 22px

                    .el-image
                        width 40px
                        height 40px

                    .add-tip
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

                    .add-ipt
                        height 36px
                        width 60%
                        float left

                    .add-tip-long
                        width 22%
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

                    .add-ipt-long
                        height 36px
                        width 70%
                        float left

                    .mr20
                        margin-right 20px

                    .el-input--small .el-input__inner
                        height 36px
                        line-height 36px

                .mb0
                    margin-bottom 0

                .el-table thead tr
                    font-size 12px
                    color #262626
                    border-radius 4px 4px 0 0
                    height 50px

                .el-table thead th
                    background #FAFAFA
                    text-align center

                .el-table thead th > .cell
                    color #262626
                    font-weight 550

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

            .tab-con3

                font-size 12px

                .tab3
                    border-collapse collapse

                .tab3 tr td
                    border 1px solid #E5E5E5
                    padding 0 40px
                    line-height 50px /*设置其文字内容垂直居中*/
                    height 50px

</style>
