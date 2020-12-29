<template>
    <div class="prochusingManagement">
        <div class="nav-top">
            <!--            <div class="nav-box" @click="goPage" v-if="functionCodes.indexOf('AD')>-1">-->
            <div class="nav-box" @click="addClk(2)">
                <img src="static/img/addNew.png"/>
                <p>新增</p>
            </div>
            <div class="nav-box" @click="reviewClk()">
                <img src="static/img/fuhe.png"/>
                <p>复核</p>
            </div>
            <!--            <div class="nav-box" @click="delClkAll" v-if="functionCodes.indexOf('DE')>-1">-->
            <div class="nav-box" @click="delClkAll">
                <img src="static/img/icon-02.png"/>
                <p>删除</p>
            </div>
            <div class="nav-box" @click="invalidClk()">
                <img src="static/img/zuofei.png"/>
                <p>作废</p>
            </div>
            <div class="nav-box" @click="printShow">
                <img src="static/img/dayin.png"/>
                <p>打印</p>
            </div>
            <div class="nav-box" @click="clearFn" v-if="functionCodes.length>=0">
                <img src="static/img/icon-04.png"/>
                <p>刷新</p>
            </div>
        </div>
        <div class="contain-mod">
            <div class="contain-top">
                <span class="search-btn">采购单号：</span>
                <el-input size="mini" @keyup.enter.native="queryListFnMall" maxlength="50" class="w106 mr30"
                          v-model="searchList.purchaseNo"></el-input>
                <span class="search-btn">采购状态：</span>
                <el-select class="w120 mr30" size="mini" placeholder="商品状态" v-model="searchList.reviewerStatus">
                    <el-option
                            label="全部"
                            value="">
                    </el-option>
                    <el-option
                            label="待复核"
                            value="1">
                    </el-option>
                    <el-option
                            label="复核通过"
                            value="2">
                    </el-option>
                    <el-option
                            label="复核不通过"
                            value="3">
                    </el-option>
                    <el-option
                            label="已作废"
                            value="4">
                    </el-option>
                    <el-option
                            label="已收货"
                            value="5">
                    </el-option>
                </el-select>

                <span class="search-btn">采购人员：</span>
                <el-input size="mini" @keyup.enter.native="queryListFnMall" maxlength="50" class="w106 mr30"
                          v-model="searchList.purchasePerson"></el-input>

                <el-button size="mini" type="primary" plain class="mr22" @click="queryListFnMall">查询</el-button>
                <el-button size="mini" type="primary" @click="clearFn">清空</el-button>
            </div>
            <div class="result-con">
                <div class="tab-mod">
                    <el-table
                            ref="multipleTable"
                            :data="tableData"
                            tooltip-effect="dark"
                            style="width: 100%;"
                            @selection-change="handleSelectionChange"
                            border>
                        <el-table-column
                                type="selection"
                                width="35">
                        </el-table-column>
                        <el-table-column
                                width="160"
                                prop="purchaseNo"
                                label="采购单号">
                        </el-table-column>

                        <el-table-column
                                prop="creatorTime"
                                label="单据日期">
                        </el-table-column>
                        <el-table-column
                                prop="requiredDeliveryDate"
                                label="要求交货日期">
                        </el-table-column>
                        <el-table-column
                                prop="actualDeliveryDate"
                                label="收货日期">
                        </el-table-column>
                        <el-table-column
                                prop="purchasePerson"
                                label="采购人员">
                        </el-table-column>
                        <el-table-column
                                label="采购复核人">
                            <template slot-scope="scope">{{
                                scope.row.reviewerStatus == 4?'':scope.row.reviewerPersonName}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="采购状态">
                            <template slot-scope="scope">{{ scope.row.reviewerStatus == '1' ? '待复核' :
                                scope.row.reviewerStatus == '2'?'复核通过':
                                scope.row.reviewerStatus == '3'?'复核不通过':
                                scope.row.reviewerStatus == '4'?'已作废':
                                scope.row.reviewerStatus == '5'?'已收货': ''}}
                            </template>
                        </el-table-column>

                        <el-table-column
                                width="200"
                                label="操作">
                            <template slot-scope="scope">
                                <!--scope.row-->
                                <!--<span v-if="functionCodes.indexOf('ED')>-1" class="scope_btn color-blue"-->
                                <span class="scope_btn color-blue"  @click="editClk(scope.row)">查看</span>
                                <!--<span v-if="functionCodes.indexOf('DE')>-1" class="scope_btn"-->
                                <span class="scope_btn" v-if="scope.row.reviewerStatus == 1"
                                      @click="review(scope.row)">复核</span>
                                <span class="scope_btn color-blue"
                                      v-if="scope.row.reviewerStatus == 1||scope.row.reviewerStatus == 3"
                                      @click="invalid(scope.row)">作废</span>
                                <span class="scope_btn color-blue" v-if="scope.row.reviewerStatus == 3"
                                      @click="uptateClk(1,scope.row)">编辑</span>
                                <span class="scope_btn color-blue" v-if="scope.row.reviewerStatus == 3"
                                      @click="delClk(scope.row)">删除</span>
                                <span class="scope_btn color-blue" v-if="scope.row.reviewerStatus == 2"
                                      @click="receive(scope.row)">收货</span>
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
        <!--loading-->
        <transition supplierName="fade">
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
                <el-button type="primary" size="small" @click="configDelClk">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title="作废确认"
                :visible.sync="invalidShow"
                width="30%"
                :close-on-click-modal="false"
                :close-on-press-escape="false">
            <div class="tip-contain">
                <p>正在执行作废操作，是否确认作废？</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="invalidShow = false">取 消</el-button>
                <el-button type="primary" size="small" @click="reviewClick(2)">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog :title="titleRecGood"
                   class="minW"
                   :visible.sync="recShowGood"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="add-contain">


                <div class="add-box">
                    <span class="add-tip"><i style="color: red">*</i> 发货单位：</span>
                    <el-input class="add-ipt" v-model="receiveForm.sendUnit" maxlength="20"
                              autocomplete="off"></el-input>

                </div>
                <div class="add-box">
                    <span class="add-tip"><i style="color: red">*</i> 发货人：</span>
                    <el-input class="add-ipt" v-model="receiveForm.sendPerson" maxlength="10"
                              autocomplete="off"></el-input>

                </div>
                <div class="add-box">
                    <span class="add-tip"><i style="color: red">*</i> 发货人电话：</span>
                    <el-input class="add-ipt" v-model="receiveForm.sendPersonPhone" maxlength="20"
                              autocomplete="off"></el-input>

                </div>
                <div class="add-box">
                    <span class="add-tip">配送车牌号：</span>
                    <el-input class="add-ipt" v-model="receiveForm.sendCarNo" maxlength="20"
                              autocomplete="off"></el-input>

                </div>
                <div class="add-box">
                    <span class="add-tip">发货单号：</span>
                    <el-input class="add-ipt" v-model="receiveForm.sendNo" maxlength="20" autocomplete="off"></el-input>

                </div>
                <div class="add-box">
                    <span class="add-tip">发票号码：</span>
                    <el-input class="add-ipt" v-model="receiveForm.invoiceNumber" maxlength="20"
                              autocomplete="off"></el-input>

                </div>
                <div class="add-box">
                    <span class="add-tip"><i style="color: red">*</i> 收货日期：</span>
                    <el-date-picker
                            class="add-ipt"
                            v-model="receiveForm.receiveDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                    </el-date-picker>
                </div>
                <div class="add-box">
                    <span class="add-tip"><i style="color: red">*</i> 收货部门：</span>
                    <el-input class="add-ipt" v-model="receiveForm.receiveDepartment" maxlength="20"
                              autocomplete="off"></el-input>

                </div>
                <div class="add-box">
                    <span class="add-tip">收货人员：</span>
                    <el-input class="add-ipt" v-model="receiveForm.receivePerson" maxlength="10"
                              autocomplete="off"></el-input>

                </div>
                <div class="add-box">
                    <span class="add-tip">收货地址：</span>
                    <el-input class="add-ipt" v-model="receiveForm.receiveAddress" maxlength="30"
                              autocomplete="off"></el-input>

                </div>

                <div class="new-other">
                    <span class="add-tip">附件上传：</span>
                    <el-upload
                            class="upload-demo"
                            ref="upload"
                            :headers="headers"
                            :limit="10"
                            :file-list="files"
                            :on-exceed="onExceed"
                            action="/liquor-product/imageLibraryApi/oneUpload"
                            accept="image/jpeg,image/png"
                            :before-upload="uploadBefore"
                            :on-success="uploadSuccess"
                            :on-remove="onRemove"
                            list-type="picture"
                            multiple>
                        <el-button size="small" type="primary">选择上传图片</el-button>
                        <div class="el-upload__tip" slot="tip">为了保证图片的正常使用，仅支持3M以内jpg、gif、png格式图片上传</div>
                    </el-upload>

                </div>

                <div class="new-other">
                    <span class="add-tip">收货备注：</span>
                    <el-input class="add-ipt" v-model="receiveForm.receiveMemo" maxlength="30"
                              autocomplete="off"></el-input>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="recShowGood = false">取消</el-button>
                <el-button size="small" type="primary" @click="receiveClick">确定</el-button>
            </div>

        </el-dialog>

        <el-dialog :title="titleReview"
                   class="minW"
                   :visible.sync="revShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="add-contain">
                <el-form :model="reviewForm" ref="ruleFormAdd" :label-width="formLabelWidth">
                    <div class="new-other">
                        <el-form-item size="small" label="复核结果：">
                            <el-radio-group v-model="reviewForm.auditStatus">
                                <el-radio :label="2">通过</el-radio>
                                <el-radio :label="3">不通过</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div class="new-other">
                        <el-form-item size="small" label="复核意见：">
                            <el-input type="textarea" v-model="reviewForm.memo" maxlength="30"
                                      autocomplete="off"></el-input>
                        </el-form-item>

                    </div>

                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="revShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="reviewClick(1)">确定</el-button>
            </div>

        </el-dialog>

        <el-dialog :title="titleRec"
                   class="minW-print"
                   :visible.sync="recShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="add-contain">
                <div  class="result-con">
                    <div class="tab-mod" id="printStoreProchusing">
                        <div class="title-1">
                            诚信引领消费服务平台
                        </div>
                        <div class="title-2">
                            采购单
                        </div>
                        <div class="title-3">

                            <div class="title-4">
                                <span>单据日期：</span>
                                <span>{{printForm.creationTime}}</span>
                            </div>
                            <div class="title-5">
                                <span>采购单号：</span>
                                <span>{{printForm.warehouseOrderNo}}</span>
                            </div>
                            <div class="title-7">
                                <span>采购部门：</span>
                                <span>{{printForm.warehouseOrderDepartment}}</span>
                            </div>
                        </div>
                        <div class="title-3">
                            <div class="title-4">
                                <span>采购人员：</span>
                                <span>{{printForm.warehouseOrderPerson}}</span>
                            </div>
                            <div class="title-5">
                                <span>采购人员电话：</span>
                                <span>{{printForm.warehouseOrderPersonPhone}}</span>
                            </div>
                        </div>
                        <el-table
                                ref="multipleTablePrint"
                                :data="tableDataPrint"
                                tooltip-effect="dark"
                                style="width: 100%;"
                                @selection-change="handleSelectionChangePrint"
                                border>
                            <el-table-column
                                    type="selection"
                                    label="序号">
                            </el-table-column>
                            <el-table-column
                                    prop="sku"
                                    label="SKU编码">
                            </el-table-column>
                            <el-table-column
                                    prop="goodsName"
                                    label="商品名称">
                            </el-table-column>
                            <el-table-column
                                    prop="goodsSpecifications"
                                    label="规格">
                            </el-table-column>
                            <el-table-column
                                    prop="purchaseNumber"
                                    label="数量">
                            </el-table-column>
                            <el-table-column
                                    prop="quantityUnit"
                                    label="单位">
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
                        <div class="title-3">
                            <div class="title-6">
                                <span>合计金额：</span>
                                <span>{{printForm.totalPrice}}</span>
                            </div>
                        </div>
                        <div class="title-3">
                            <div class="title-8">
                                <span>备注：</span>
                                <span>{{printForm.memo}}</span>
                            </div>
                        </div>
                        <p class="title-p"></p>
                        <div class="title-3">
                            <div class="title-4">
                                <span>打印时间：</span>
                                <span>{{printForm.currentTime}}</span>
                            </div>
                            <div class="title-5">
                                <span>{{currentPagePrint}}</span>
                                <span>/ {{multipleTable.length}}</span>
                            </div>
                            <div class="title-7" style="text-align: right">
                                <span>   </span>
                                <span>诚信引领消费服务平台</span>
                            </div>
                        </div>
                    </div>
                    <div class="pagenum_modPrint" v-if="page_show">
                        <el-pagination
                                background
                                class="pageination_css"
                                @current-change="handleCurrentChangePrint"
                                :current-page="currentPagePrint"
                                :page-size="100"
                                layout="total, prev, pager, next, jumper"
                                :total="totalRecordPrint">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="recShow = false">取消</el-button>
                <el-button size="small" v-print="printObj" type="primary">打印</el-button>
            </div>

        </el-dialog>

        <div class="images" v-show="showImageBoolean" v-viewer="{movable: true}">
            <img v-for="src in images" :src="src" :key="src">
        </div>
    </div>
</template>

<script>
    import store from 'si-store'
    import {MyGet, MyPost} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from 'components/footerbar/footerbar.vue'

    export default {
        supplierName: 'prochusingManagement',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                currentPagePrint:1,
                totalRecordPrint:0,
                multipleTablePrint:"",
                tableDataPrint:[],
                printForm:{
                    supplierName:"",
                    creationTime:"",
                    warehouseOrderNo: "",
                    warehouseDate: "",
                    businessNo: "",
                    warehouseName:"",
                    warehouseOrderDate: "",
                    warehouseOrderType: "",
                    warehouseOrderDepartment: "",
                    warehouseOrderPerson: "",
                    warehouseOrderPersonPhone: "",
                    currentTime:"",
                    totalPrice:0.00,
                    memo:"",
                },
                elUploadBoolean:true,
                headers: {},
                showImageBoolean: false,
                images: [],
                titleRec: "打印",
                recShow: false,
                titleRecGood: "收货",
                recShowGood: false,
                titleReview: "复核意见",
                revShow: false,
                invalidShow: false,
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
                reviewForm: {
                    auditStatus: "",
                    id: "",
                    memo: "",

                },

                formLabelWidth: '120px',
                loadingShow: false,
                loadingText: '正在加载中...',
                tableData: [{
                    id: '',
                    purchaseNo: "",
                    purchaseDate: null,
                    purchaseCompany: "",
                    purchaseWay: "",
                    purchasePerson: null,
                    purchasePersonPhone: null,
                    purchaseAddress: null,
                    consignee: 0,
                    consigneePhone: "",
                    consigneeAddress: "",
                    supplierId: 0,
                    supplierName: "",
                    supplierContact: "",
                    supplierPhone: "",
                    supplierNo: null,
                    settlementMethod: 0,
                    requiredDeliveryDate: null,
                    expectedDeliveryDate: null,
                    actualDeliveryDate: null,
                    purchaseInvoiceNo: "",
                    purchaseApplicant: 0,
                    reviewerPersonName: '',
                    purchaseReviewer: "",
                    reviewerStatus: "1",
                    reviewerMemo: "",
                    purchaseTotal: 0,
                    purchaseStatus: "1",
                    purchaseMemo: "",
                    purchaseDetailsList: []
                }],
                page_show: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                searchList: {
                    purchaseNo: '',//采购单编号
                    purchasePerson: '',//采购人员
                    reviewerStatus: '',//采购状态
                    supplierName: '',//供应商名称
                },
                delShow: false,
                delId: '',
                delIds: '',
                multipleTable: "",
                functionCodes: [],
                receiveId: '',
                files: [],
                brandList: [],
                warehouseId:"",
                printObj:{
                    id:"printStoreProchusing",
                    popTitle:"",

                }
            }
        },
        created() {
            this.$store.state.navTit = '门店管理';
            this.$store.state.navChildTit = '门店采购';
            this.headers = {
                token: store.get('tokenVal')
            };
            // this.getFunctionCode(this, this.$route.query.code);
            this.queryListFn();
        },
        methods: {
            printShow(){
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
                this.currentPagePrint=1;
                this.warehouseId=this.multipleTable[0].id;
                this.totalRecordPrint=100*this.multipleTable.length
                this.getWarehouseInfo();
                this.printForm.currentTime= this.checkTime(new Date());
                this.recShow=true;
            },
            handleCurrentChangePrint(val){
                this.currentPagePrint=val;
                this.warehouseId=this.multipleTable[this.currentPagePrint-1].id;
                this.getWarehouseInfo();
            },
            getWarehouseInfo() {
                MyPost('/polaris/purchase/queryById', {
                    id: this.warehouseId,
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.printForm={
                            supplierName:data.supplierName,
                            warehouseOrderNo: data.purchaseNo,
                            creationTime: this.timeFormatYYMMDD(data.creatorTime),
                            businessNo: data.businessNo,
                            warehouseOrderDate:  this.timeFormatYYMMDD(data.purchaseDate),
                            warehouseOrderType: data.settlementMethod,
                            warehouseOrderDepartment: data.purchaseCompany,
                            warehouseOrderPerson: data.purchasePerson,
                            warehouseOrderPersonPhone: data.purchasePersonPhone,
                            warehouseId: data.warehouseId,
                            warehouseName:data.warehouseName,
                            currentTime:this.printForm.currentTime,
                            totalPrice:0.00,
                            memo:data.purchaseMemo
                        }
                        this.tableDataPrint= data.purchaseDetailsList;
                        for(let i=0;i<this.tableDataPrint.length;i++){
                            if (this.tableDataPrint[i].unitPrice==null){
                                this.tableDataPrint[i].unitPrice=0;
                            }
                            if (this.tableDataPrint[i].purchaseNumber==null){
                                this.tableDataPrint[i].purchaseNumber=0;
                            }
                            this.tableDataPrint[i].totalPrice=Number(this.tableDataPrint[i].unitPrice)*Number(this.tableDataPrint[i].purchaseNumber)
                            this.tableDataPrint[i].unitPrice= this.regexNumberAll(this.tableDataPrint[i].unitPrice);
                            this.tableDataPrint[i].totalPrice= this.regexNumberAll(this.tableDataPrint[i].totalPrice);
                            this.printForm.totalPrice=this.regexNumberAll(Number(this.printForm.totalPrice)+ Number(this.tableDataPrint[i].totalPrice));
                        }
                    } else {
                        this.printForm={
                            supplierName:"",
                            warehouseOrderNo: "",
                            creationTime: "",
                            businessNo:  "",
                            warehouseOrderDate:  "",
                            warehouseOrderType:  "",
                            warehouseOrderDepartment:  "",
                            warehouseOrderPerson:  "",
                            warehouseOrderPersonPhone:  "",
                            warehouseId:  "",
                            warehouseName: "",
                            currentTime:this.printForm.currentTime,
                            totalPrice:0.00,
                            memo:""
                        }
                        this.tableDataPrint= [];
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
            onExceed(file, fileList) {
                this.$message.error('最多只能上传10张图片');
            },
            removeImage() {
                this.receiveForm.filePath = "";
                this.elUploadBoolean = true;
            },
            receiveChange(item) {
                if (item == '1')
                    this.receiveForm.inWarehouseId = ''
            },
            getDictionaryList() {
                //selectAll
                MyPost('/banyan-inventory/warehouse/queryList', {}).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.brandList = data.data
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
            uploadBefore(file) {
                // 上传之前
                let types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png'];

                const isImage = types.includes(file.type);
                if (!isImage) {

                    this.$message.error('上传图片只能是 JPG、GIF、PNG 格式!');

                    return false;

                }
                const isLt2M = file.size / 1024 / 1024 < 3;
                if (!isLt2M) {
                    this.$message.error('上传文件大小不能超过 3M!');
                }
                // this.files.push(file);
                return isLt2M;
            },
            uploadSuccess(response, file, fileList) {
                this.$message({
                    message: '上传成功',
                    type: 'success'
                });
                // console.log(this.files)
                if (this.receiveForm.filePath.length > 0)
                    this.receiveForm.filePath = this.receiveForm.filePath + "," + response.data;
                else
                    this.receiveForm.filePath = response.data;

            },
            onRemove(file, fileList) {
                this.receiveForm.filePath = "";
                if (fileList.length > 0)
                    for (var i = 0; i < fileList.length; i++) {
                        if (this.receiveForm.filePath.length > 0)
                            this.receiveForm.filePath = this.receiveForm.filePath + "," +  fileList[i].response.data;
                        else
                            this.receiveForm.filePath = fileList[i].response.data;

                    }
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
            queryListFnMall() {
                this.currentPage = 1;
                this.queryListFn();
            },
            review(item) {
                this.reviewForm = {
                    auditStatus: "",
                    id: item.id,
                    memo: "",
                };
                this.delIds=[];
                this.delIds.push(item.id);
                this.revShow = true;
            },
            invalid(item) {
                this.reviewForm = {
                    auditStatus: "4",
                    id: item.id,
                    memo: "",
                };
                this.delIds=[];
                this.delIds.push(item.id);
                this.invalidShow = true
            },
            receive(item) {
                this.receiveForm = {
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
                }
                this.files=[];
                this.receiveId = item.id
                this.recShowGood = true;
                this.getDictionaryList()
            },
            receiveClick() {

                if (!this.receiveForm.sendUnit) {
                    this.$message.error('请输入发货单位');
                    return
                }
                if (!this.receiveForm.sendPerson) {
                    this.$message.error('请选择发货人');
                    return
                }
                if (!this.receiveForm.sendPersonPhone) {
                    this.$message.error('请输入发货人电话');
                    return
                }
                if (!this.receiveForm.receiveDate) {
                    this.$message.error('请选择收货日期');
                    return
                }
                if (!this.receiveForm.receiveDepartment) {
                    this.$message.error('请输入收货部门');
                    return
                }
                let searchList = {
                    filePath: this.receiveForm.filePath,// 附件

                    id: this.receiveId,// 收货单编码

                    inWarehouseId: this.receiveForm.inWarehouseId,// 入库仓库

                    invoiceNumber: this.receiveForm.invoiceNumber,// 发票号码

                    purchaseId: this.receiveId,// 采购单id

                    receiveAddress: this.receiveForm.receiveAddress,// 收货地址

                    receiveDate: this.receiveForm.receiveDate,// 收货日期

                    receiveDepartment: this.receiveForm.receiveDepartment,// 收货部门

                    receiveMemo: this.receiveForm.receiveMemo,// 收货备注

                    receivePerson: this.receiveForm.receivePerson,// 收货人员

                    receiveType: this.receiveForm.receiveType,// 收货类型 1： 收货 2： 收获入库

                    sendCarNo: this.receiveForm.sendCarNo,// 配送车牌号

                    sendNo: this.receiveForm.sendNo,// 发货单号

                    sendPerson: this.receiveForm.sendPerson,// 发货人

                    sendPersonPhone: this.receiveForm.sendPersonPhone,// 发货人电话

                    sendUnit: this.receiveForm.sendUnit,// 发货单位
                };
                this.loadingShow = true;
                MyPost('/polaris/receive/save', searchList).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.recShowGood = false;
                        this.queryListFn();
                        this.$message({
                            message: "收货成功",
                            type: 'success'
                        });

                    } else {
                        this.$confirm(message, '提示', {
                            confirmButtonText: '确定',
                            showCancelButton: false,
                            type: 'error'
                        }).then(() => {
                            this.recShowGood = false;
                        }).catch(() => {
                            this.recShowGood = false;
                        });
                    }
                })
            },

            handleSelectionChange(val) {
                this.multipleTable = val;
            },

            clearFn() {
                this.searchList = {
                    purchaseNo: '',//采购单编号
                    purchasePerson: '',//采购人员
                    reviewerStatus: '',//采购状态
                    supplierName: '',//供应商名称
                }
                this.queryListFn();
            },
            reviewClick(type) {
                if (type == 1) {
                    if (!this.reviewForm.auditStatus) {
                        this.$message.error('请选择复核结果');
                        return
                    }
                }
                this.loadingShow = true;
                    MyPost('/polaris/purchase/review', {
                        auditStatus: this.reviewForm.auditStatus,
                        ids: this.delIds,
                        memo: this.reviewForm.memo,
                    }).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.revShow = false;
                            this.invalidShow = false;
                            this.$message({
                                message: type == 1 ? '复核成功' : '作废成功',
                                type: 'success'
                            });
                            this.queryListFn();
                        } else {
                            this.$confirm(message, '提示', {
                                confirmButtonText: '确定',
                                showCancelButton: false,
                                type: 'error'
                            }).then(() => {
                                this.revShow = false;
                                this.invalidShow = false;
                            }).catch(() => {
                                this.revShow = false;
                                this.invalidShow = false;
                            });
                        }
                    })

            },
            queryListFn() {
                MyPost('/polaris/purchase/queryList', {
                    purchaseNo: this.searchList.purchaseNo.trim(),
                    reviewerStatus: this.searchList.reviewerStatus,
                    purchasePerson: this.searchList.purchasePerson.trim(),
                    start: (this.currentPage - 1) * 10,
                    length: 10
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.tableData = data.data;
                        for (let i = 0; i < this.tableData.length; i++) {
                            if (this.tableData[i].creatorTime != null) {
                                this.tableData[i].creatorTime = this.timeFormatYYMMDD(this.tableData[i].creatorTime)
                            }
                            if (this.tableData[i].actualDeliveryDate != null) {
                                this.tableData[i].actualDeliveryDate = this.timeFormatYYMMDD(this.tableData[i].actualDeliveryDate)
                            }
                        }
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
            handleCurrentChange(val) {
                this.currentPage = val;
                this.queryListFn();
            },
            editClk(item) {
                this.$router.push({
                    path: '/storeProchusingInfo',
                    query: {
                        prochusingId: item.id
                    }
                })
            },
            addClk(type) {
                this.$router.push({
                    path: '/storeProchusingAdd',
                    query: {
                        edit: type,
                    }
                })
            },
            uptateClk(type, item) {
                this.$router.push({
                    path: '/storeProchusingAdd',
                    query: {
                        edit: type,
                        prochusingId: item.id
                    }
                })
            },

            delClk(item) {
                this.delId = item.id;
                this.delShow = true;
            },
            reviewClk() {
                if (this.multipleTable.length == 0) {
                    this.$confirm('请先勾选记录，再进行操作', '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'error'
                    }).then(() => {
                        this.revShow = false;
                    }).catch(() => {
                        this.revShow = false;
                    });
                    return;
                }
                for (var i = 0; i < this.multipleTable.length; i++) {
                    if (this.multipleTable[i].reviewerStatus != 1) {
                        this.$confirm('门店采购单号:'+this.multipleTable[i].purchaseNo+'复核状态不是”待复核“，无法进行复核操作。', '提示', {
                            confirmButtonText: '确定',
                            showCancelButton: false,
                            type: 'error'
                        }).then(() => {
                            this.revShow = false;
                        }).catch(() => {
                            this.revShow = false;
                        });
                        return;
                    }
                }
                this.delId = "";
                this.delIds=[];
                this.delIds = this.multipleTable.map(item => {
                    return item.id
                });
                this.reviewForm= {
                    auditStatus: "",
                    id: "",
                    memo: "",
                }
                this.revShow = true;
            },
            invalidClk() {
                if (this.multipleTable.length == 0) {
                    this.$confirm('请先勾选记录，再进行操作', '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'error'
                    }).then(() => {
                        this.invalidShow = false;
                    }).catch(() => {
                        this.invalidShow = false;
                    });
                    return;
                }

                for (var i = 0; i < this.multipleTable.length; i++) {
                    if (this.multipleTable[i].reviewerStatus != 1 && this.multipleTable[i].reviewerStatus != 3) {
                        this.$confirm('门店采购单号:'+this.multipleTable[i].purchaseNo+'复核状态不是”待复核“、“复核不通过”，无法进行作废操作。', '提示', {
                            confirmButtonText: '确定',
                            showCancelButton: false,
                            type: 'error'
                        }).then(() => {
                            this.invalidShow = false;
                        }).catch(() => {
                            this.invalidShow = false;
                        });
                        return;
                    }
                }
                this.delId = "";
                this.delIds=[];
                this.reviewForm = {
                    auditStatus: "4",
                    id: "",
                    memo: "",
                };
                this.delIds = this.multipleTable.map(item => {
                    return item.id
                });
                this.invalidShow = true;
            },
            delClkAll() {
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
                for (var i = 0; i < this.multipleTable.length; i++) {
                    if (this.multipleTable[i].reviewerStatus != 3) {
                        this.$confirm('门店采购单号:'+this.multipleTable[i].purchaseNo+'复核状态不是”复核不通过“，无法进行删除操作。', '提示', {
                            confirmButtonText: '确定',
                            showCancelButton: false,
                            type: 'error'
                        }).then(() => {
                            this.invalidShow = false;
                        }).catch(() => {
                            this.invalidShow = false;
                        });
                        return;
                    }
                }
                this.delId = "";
                this.delIds=[];
                this.delIds = this.multipleTable.map(item => {
                    return item.id
                });
                this.delShow = true;
            },
            configInvalid() {
            },
            configDelClk() {
                this.loadingShow = true;
                if (this.checkNull(this.delId)) {
                    MyPost('/polaris/purchase/delete', {
                        ids: this.delIds
                    }).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.delShow = false;
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.queryListFn();
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
                } else {
                    this.delIds=[];
                    this.delIds.push(this.delId);
                    MyPost('/polaris/purchase/delete', {
                        ids: this.delIds
                    }).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.delShow = false;
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.queryListFn();
                        } else {
                            this.$confirm(message, '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'error'
                            }).then(() => {
                                this.delShow = false;
                            }).catch(() => {
                                this.delShow = false;
                            });
                        }
                    })
                }

            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../../styles/css/my.scss"
    #printStoreProchusing
        @page{
            size:  auto;   /* auto is the initial value */
            margin: 0 30px;  /* this affects the margin in the printer settings */
        }

        html{
            background-color: #FFFFFF;
            margin: 0px;  /* this affects the margin on the html before sending to printer */
        }

        body{
            margin: 0px; /* margin you want for the content */
        }

        .title-1
            line-height 40px
            font-weight 600
            font-size 18px
            text-align center
        .title-2
            line-height 40px
            font-weight 500
            font-size 14px
            text-align center
        .title-3
            color #666666
            display flex
            flex-direction row
            align-items center
            font-size 14px
            line-height 40px
        .title-4
            width 33%
        .title-5
            width 33%
            text-align left
        .title-6
            width 100%
            text-align right
        .title-7
            width 33%
            text-align right
        .title-p
            /*height 1px*/
            border 0.5px solid #333333
            width 100%
            margin 20px 0
    .pagenum_modPrint
        .el-pagination__total
            display none !important
        .el-pagination__jump
            display none !important
        .el-pagination
            text-align right
    .el-select-dropdown__item
        font-size 12px

    .prochusingManagement
        .el-input__inner {
            height: 28px;
            line-height: 28px;
        }

        .minW .el-dialog
            width 680px

            .el-radio__label
                font-size 12px

            .add-contain
                font-size 12px
                float left

                .new-other
                    width 100%
                    /*height 40px*/
                    float left
                    margin-bottom 22px

                    .upload-demo
                        width 80%
                        float left

                    .add-tip
                        width 15%
                        text-align right
                        line-height 36px
                        font-size 12px
                        color #333
                        margin-right 20px
                        display inline
                        float left

                    .add-ipt
                        /*height 36px*/

                        height 36px
                        line-height 36px
                        width 80%
                        float left

                .add-box
                    /*overflow hidden*/
                    width 50%
                    height 40px
                    float left
                    margin-bottom 22px

                    .el-image
                        width 40px
                        height 40px

                    .add-tip
                        width 30%
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
                        /*height 36px*/

                        height 36px
                        line-height 36px
                        width 60%
                        float left

                    .mr20
                        margin-right 20px

                    .el-input--small .el-input__inner
                        height 36px
                        line-height 36px

        .minN .el-dialog
            width 840px

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

        .contain-mod
            background #fff
            overflow hidden
            padding-left 18px
            padding-right 18px
            padding-top 40px

            .contain-top
                overflow hidden
                /*margin-bottom 15px*/

                .w120
                    width 120px

                .search-btn
                    font-size 12px
                    line-height 28px
                    color #333
                    display inline-block
                    margin-bottom 15px

        /*margin-right 22px*/

        .result-con
            /*padding-bottom 100px*/

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
                float right
                overflow hidden
                margin-top 5px
</style>
