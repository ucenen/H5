<template>
    <div class="prochusingManagement">
        <div class="nav-top">
            <div class="nav-box" @click="addClk">
                <img src="static/img/addNew.png"/>
                <p>新增</p>
            </div>
            <div class="nav-box" @click="delClkAll">
                <img src="static/img/icon-02.png"/>
                <p>删除</p>
            </div>
       
        
        </div>
        <div class="contain-mod">
            <div class="contain-top">
                <span class="search-btn">店铺名称：</span>
                <el-input size="mini" @keyup.enter.native="queryListFnMall" maxlength="30" class="w106 mr30"
                          v-model="searchList.warehouseOrderNo"></el-input>
               <!-- <span class="search-btn">出库类型：</span>
                <el-select clearable class="w100 mr30" size="mini" placeholder="出库类型" v-model="searchList.warehouseOrderType">
                    <el-option
                            v-for="itemTwo in warehouseTypeList"
                            :key="itemTwo.dictionaryKey"
                            :label="itemTwo.dictionaryValue"
                            :value="itemTwo.dictionaryKey">
                    </el-option>
                </el-select>
                <span class="search-btn">业务单号：</span>
                <el-input maxlength="30" @keyup.enter.native="queryListFnMall" size="mini" class="w106 mr30"
                          v-model="searchList.businessNo"></el-input>
                <span class="search-btn">出库状态：</span>
                <el-select clearable class="w88 mr30" size="mini" placeholder="出库状态" v-model="searchList.reviewerStatus">
                    <el-option
                            label="全部"
                            value="">
                    </el-option>
                    <el-option
                            label="待复核"
                            value="1">
                    </el-option>
                    <el-option
                            label="已出库"
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

                </el-select> -->

                <el-button size="mini" type="primary" plain class="mr22" @click="queryListFnMall">查询</el-button>
                <el-button size="mini" type="primary" @click="clearFn">清空</el-button>
            </div>
            <div  class="result-con">
                <div id="printTest" class="tab-mod">
                    <el-table
                            ref="multipleTable"
                            :data="tableData"
                            tooltip-effect="dark"
                            style="width: 100%;"
                            @selection-change="handleSelectionChange"
                            border>
							<el-table-column
							    label="序号"
							    type="index"
							    width="50">
							</el-table-column>
                        <el-table-column
                                type="selection"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                prop="mingcheng"
                                label="店铺名称">
                        </el-table-column>
                        <el-table-column
                                prop="creationTime"
                                label="无理由退货时间">
                        </el-table-column>
                        <el-table-column
                                prop="warehouseOrderType"
                                label="返佣解冻时间">
                        </el-table-column>
                        <el-table-column
                                width="200"
                                label="操作">
                            <template slot-scope="scope">
                              
                                <span class="scope_btn color-blue" 
                                      @click="editClk(scope.row,2)">修改</span>
            
                                <span class="scope_btn"
                                      @click="receiveDel(scope.row)">删除</span>

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
        <transition name="fade">
            <div class="loading-container" v-show="loadingShow">
                <loading :loadingText="loadingText"></loading>
            </div>
        </transition>
        <footerbar/>
		<el-dialog :title="titData"
		           class="minW"
		           :visible.sync="serachBoxShow"
		           :close-on-click-modal="false"
		           :close-on-press-escape="false">
		    <div class="add-contain">
		    <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth">
				<div class="new-other">
		       <el-form-item size="small" label="店铺名称：" >
		          <el-input type="text"  v-model="form.mingcheng" autocomplete="off"></el-input>
		       </el-form-item>
		       </div>
			   <div class="new-other">
		      <el-form-item size="small" label="无理由退货时间(天)：">
		            <el-input type="tel" :maxlength="inputMaxL" @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" v-model="form.tian1" autocomplete="off"></el-input>
		      </el-form-item>
		       </div>
			   <div class="new-other">
		      <el-form-item size="small" label="固定解冻返佣时间(天)：">
		         <el-input type="tel" :maxlength="inputMaxL" @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" v-model="form.tian2" autocomplete="off"></el-input>
		      </el-form-item>
		        </div>
				<div class="new-other">
				<el-form-item size="small" label="动态解冻返佣时间(天)：">
				   <el-input type="tel" :maxlength="inputMaxL" @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" v-model="form.tian3" autocomplete="off"></el-input>
				</el-form-item>
				  </div>
		    </el-form>
		    </div>
		    <div slot="footer" class="dialog-footer">
		        <el-button size="small" @click="serachBoxShow = false">取消</el-button>
		        <el-button size="small" type="primary" @click="addBrandClk">确定</el-button>
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
                <el-button type="primary" size="small" @click="configClk">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title="作废"
                :visible.sync="invalidShow"
                width="30%"
                :close-on-click-modal="false"
                :close-on-press-escape="false">
            <div class="tip-contain">
                <p>正在执行作废，是否确认作废？</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="invalidShow = false">取 消</el-button>
                <el-button type="primary" size="small" @click="configInvalid">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog :title="titleRec"
                   class="minW-print"
                   :visible.sync="recShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="add-contain">
                <div  class="result-con">
                    <div class="tab-mod" id="printStockOut">
                        <div class="title-1">
                            诚信引领消费服务平台
                        </div>
                        <div class="title-2">
                            出库单
                        </div>
                        <div class="title-3">
                            <div class="title-4">
                                <span>出库单号：</span>
                                <span>{{printForm.warehouseOrderNo}}</span>
                            </div>
                            <div class="title-5">
                                <span>单据日期：</span>
                                <span>{{printForm.creationTime}}</span>
                            </div>
                            <div class="title-7">
                                <span>出库类型：</span>
                                <span>{{printForm.warehouseOrderType}}</span>
                            </div>
                        </div>
                        <div class="title-3">
                            <div class="title-4">
                                <span>出库仓库：</span>
                                <span>{{printForm.warehouseName}}</span>
                            </div>
                            <div class="title-5">
                                <span>出库人员：</span>
                                <span>{{printForm.warehouseOrderPerson}}</span>
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
                                    type="index"
                                    label="序号">
                            </el-table-column>
                            <el-table-column
                                    prop="sku"
                                    label="SKU编码">
                            </el-table-column>
                            <el-table-column
                                    prop="productName"
                                    label="SKU名称">
                            </el-table-column>
                            <el-table-column
                                    prop="capacity"
                                    label="规格">
                            </el-table-column>
                            <el-table-column
                                    prop="outWarehouseNumber"
                                    label="数量">
                            </el-table-column>
                            <el-table-column
                                    prop="unit"
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

        <el-dialog :title="titleReview"
                   class="minW"
                   :visible.sync="revShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="add-contain">
                <el-form :model="masterForm" :rules="rulesAdd" ref="ruleFormAdd" :label-width="formLabelWidth">
                    <div class="new-other">
                        <el-form-item size="small" label="复核结果：">
                            <el-radio-group v-model="masterForm.status">
                                <el-radio label="2">通过</el-radio>
                                <el-radio label="3">不通过</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div class="new-other">
                        <el-form-item size="small" label="复核意见：">
                            <el-input type="textarea" v-model="masterForm.memo" maxlength="30"
                                      autocomplete="off"></el-input>
                        </el-form-item>

                    </div>

                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="revShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="addMasterClick">确定</el-button>
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
        name: 'stockOutManagerment',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
				titData:"修改",
				serachBoxShow:false,
                currentPagePrint:1,
                totalRecordPrint:0,
                multipleTablePrint:"",
                tableDataPrint:[],
                showImageBoolean: false,
                images: [],
                titleRec: "收货",
                recShow: false,
                titleReview: "复核意见",
                revShow: false,
                revIds: [],
                revId: "",
                masterForm: {
                    parentCode: "",
                    name: "",
                    title: "",
                    brandId: "",
                    keyword: "",
                    status:"",
                    memo: "",
                },
                brandList: [],
                form: {
					mingcheng:"",
					tian1:"",
					tian2:"",
					tian3:""
      
                },
                rulesAdd: {
                    name: [
                        {required: true, message: '最多输入30个字符', trigger: 'blur'},
                    ],
                    type: [
                        {required: true, message: '  ', trigger: 'change'},
                    ],
                },
                rules: {
                    type: [
                        {required: true, message: '  ', trigger: 'change'},
                    ],
                },
                addform: {
                    categoryId: ""
                },
                optionsChoiceString: '',
                formLabelWidth: '120px',
                loadingShow: false,
                loadingText: '正在加载中...',
                tableData: [{
					mingcheng:"店铺1",
				}],
                page_show: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                addBoxShow: false,
                searchList: {
                    businessNo: '',//商品模板
                    reviewerStatus: '',//所属类别
                    warehouseOrderNo: '',
                    warehouseOrderType: '',
                },
                getAllCategoryList: [],
                delShow: false,
                delId: '',
                delIds: '',
                invalidShow:false,
                multipleTable: "",
                options: [],
                optionsAgain: [],
                functionCodes: [],
                arrFathers: [],
                arrFathersOptions: [],
                warehouseTypeList:[],
                printForm:{
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
                props: {
                    value: 'id',
                    label: 'name',
                    children: 'childList',
                    checkStrictly: true,
                    emitPath: false
                },
                printObj:{
                    id:"printStockOut",
                    popTitle:"",
                }
            }
        },
        created() {
            this.$store.state.navTit = '会员管理';
            this.$store.state.navChildTit = '带货返佣设置';
            // this.getFunctionCode(this, this.$route.query.code);
            // this.queryListFn();
            // this.getQueryOutWarehouseType();
            // this.queryBrandListFn();
            // this.getAllCategoryListFn();
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
            getWarehouseInfo(){
                MyPost('/banyan-inventory/warehouse/out/queryById', {
                    id:this.warehouseId
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.printForm={
                            warehouseOrderNo: data.warehouseOrderNo,
                            creationTime: this.timeFormatYYMMDD(data.creationTime),
                            businessNo: data.businessNo,
                            warehouseOrderDate:  this.timeFormatYYMMDD(data.warehouseOrderDate),
                            warehouseOrderType: this.getWarehouseOrderDateType(data.warehouseOrderType),
                            warehouseOrderDepartment: data.warehouseOrderDepartment,
                            warehouseOrderPerson: data.warehouseOrderPerson,
                            warehouseOrderPersonPhone: data.warehouseOrderPersonPhone,
                            warehouseId: data.warehouseId,
                            warehouseName:data.warehouseName,
                            currentTime:this.printForm.currentTime,
                            totalPrice:0.00,
                            memo:data.reviewerMemo
                        }
                        this.tableDataPrint= data.outWarehouseDetailProductList;
                        for(let i=0;i<this.tableDataPrint.length;i++){
                            if (this.tableDataPrint[i].unitPrice==null){
                                this.tableDataPrint[i].unitPrice=0;
                            }
                            if (this.tableDataPrint[i].outWarehouseNumber==null){
                                this.tableDataPrint[i].outWarehouseNumber=0;
                            }
                            this.tableDataPrint[i].totalPrice=Number(this.tableDataPrint[i].unitPrice)*Number(this.tableDataPrint[i].outWarehouseNumber)
                            this.tableDataPrint[i].unitPrice= this.regexNumberAll(this.tableDataPrint[i].unitPrice);
                            this.tableDataPrint[i].totalPrice= this.regexNumberAll(this.tableDataPrint[i].totalPrice);
                            this.printForm.totalPrice=this.regexNumberAll(Number(this.printForm.totalPrice)+ Number(this.tableDataPrint[i].totalPrice));
                        }
                    } else {
                        this.printForm={
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
            getWarehouseOrderDateType(item){
                for (let i=0;i<this.warehouseTypeList.length;i++){
                    if (this.warehouseTypeList[i].dictionaryKey==item){
                        return this.warehouseTypeList[i].dictionaryValue
                    }
                }
            },
            handleCurrentChangePrint(val){
                this.currentPagePrint=val;
                this.warehouseId=this.multipleTable[this.currentPagePrint-1].id;
                this.getWarehouseInfo();
            },
            getQueryOutWarehouseType(){
                MyPost('/banyan-inventory/warehouse/out/queryInOutWarehouseType', {
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.warehouseTypeList=data;
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
            dayin(){

            },
            getTitleType(item){
                if (item=="1"){
                    return "待复核"
                }else if (item=="2"){
                    return "已出库"
                }else if (item=="3"){
                    return "复核不通过"
                }else if (item=="4"){
                    return "已作废"
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
            reviewSimple(item) {
                this.revId = item.id;
                this.revShow = true;
            },
            reviewItem(item){
                this.revId=item.id;

                this.revShow=true;
            },
            review() {
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
                    if (this.multipleTable[i].reviewerStatus != 1) {
                        this.$confirm('出库单号:'+this.multipleTable[i].warehouseOrderNo+' 出库状态不是“待复核”，无法进行复核操作。', '提示', {
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
                this.revId = "";
                this.revIds = this.multipleTable.map(item => {
                    return item.id
                });
                this.revShow = true;
            },
            receiveDel(item) {
                this.delId = item.id;
                this.delShow = true;
            },
            addMasterClick() {
                this.loadingShow = true;
                if (this.checkNull(this.revId)) {
                } else {
                    this.revIds = [];
                    this.revIds.push(this.revId)
                }
                MyPost('/banyan-inventory/warehouse/out/review', {
                    ids: this.revIds,
                    auditStatus: this.masterForm.status,
                    memo: this.masterForm.memo
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.revShow = false;
                        this.queryListFn();
                        this.$message({
                            message: "复核成功",
                            type: 'success'
                        });

                    } else {
                        this.$confirm(message, '提示', {
                            confirmButtonText: '确定',
                            showCancelButton: false,
                            type: 'error'
                        }).then(() => {
                            this.revShow = false;
                        }).catch(() => {
                            this.revShow = false;
                        });
                    }
                })
            },

            tolist(data) {
                var result = [];
                for (var i = 0; i < data.length; i++) {
                    var c = data[i].childList;
                    result.push(data[i]);
                    if (!this.checkNull(c)) {
                        result.push.apply(result, this.tolist(c));
                        data[i].childList = null;
                    }
                }
                return result;
            },

            getFatherName(data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id == this.form.parentCode) {
                        this.arrFathers.push(this.options[i].name)
                        this.form.parentCode = data[i].parentId;
                    }
                }
                if (this.form.parentCode == 0) {
                    return
                } else {
                    this.getFatherName(data);
                }

            },
            handleSelectionChange(val) {
                this.multipleTable = val;
            },
            getAllCategoryListFn() {
                MyGet('/liquor-product/category/categoryList').then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.optionsAgain = this.deleteChildren(data);
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
                this.searchList = {
                    businessNo: '',//商品模板
                    reviewerStatus: '',//所属类别
                    warehouseOrderNo: '',
                    warehouseOrderType: '',
                };
                this.queryListFn();
            },
            queryListFn() {
                MyPost('/banyan-inventory/warehouse/out/queryList', {
                    businessNo: this.searchList.businessNo,
                    reviewerStatus: this.searchList.reviewerStatus,
                    warehouseOrderNo: this.searchList.warehouseOrderNo,
                    warehouseOrderType: this.searchList.warehouseOrderType,
                    start: (this.currentPage - 1) * 10,
                    length: 10
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.tableData = data.data;
                        for(let i=0;i<this.tableData.length;i++){
                            if (this.tableData[i].warehouseOrderDate!=null){
                                this.tableData[i].warehouseOrderDate=this.timeFormatYYMMDD(this.tableData[i].warehouseOrderDate)
                            }
                            if (this.tableData[i].creationTime!=null){
                                this.tableData[i].creationTime=this.timeFormatYYMMDD(this.tableData[i].creationTime)
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
            editClk(item, type) {
                this.serachBoxShow=true;
				this.form={
					mingcheng:item.mingcheng
				}
            },
            addClk(item) {
                this.$router.push({
                    path: '/stockOutManagermentAdd',
                    query: {
                        edit: "1",
                    }
                })
            },
            goInfor(item) {
                this.$router.push({
                    path: '/stockOutManagermentInfo',
                    query: {
                        edit: "1",
                        warehouseId: item.id,
                    }
                })
            },
            delClk(item) {
                this.delId = item.id;
                this.delShow = true;
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
                    if (this.multipleTable[i].reviewerStatus != 1&&this.multipleTable[i].reviewerStatus != 3) {
                        this.$confirm('出库单号:'+this.multipleTable[i].warehouseOrderNo+' 出库状态不是“待复核/复核不通过”，无法进行作废操作。', '提示', {
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
                this.revId = "";
                this.revIds = this.multipleTable.map(item => {
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
                        this.$confirm('出库单号:'+this.multipleTable[i].warehouseOrderNo+' 出库状态不是“复核不通过”，无法进行删除操作。', '提示', {
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
                this.delIds = this.multipleTable.map(item => {
                    return item.id
                });
                this.delShow = true;
            },
            lostLoser(item){
                this.revId = item.id;
                this.invalidShow=true;
            },
            configInvalid() {
                this.loadingShow = true;
                if (this.checkNull(this.revId)) {
                } else {
                    this.revIds = [];
                    this.revIds.push(this.revId)
                }
                MyPost('/banyan-inventory/warehouse/out/review', {
                    ids: this.revIds,
                    auditStatus: "4",
                    memo:"作废"
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.revIds = [];
                        this.revId="";
                        this.invalidShow = false;
                        this.queryListFn();
                        this.$message({
                            message: "作废成功",
                            type: 'success'
                        });

                    } else {
                        this.$confirm(message, '提示', {
                            confirmButtonText: '确定',
                            showCancelButton: false,
                            type: 'error'
                        }).then(() => {
                            this.invalidShow = false;
                        }).catch(() => {
                            this.invalidShow = false;
                        });
                    }
                })
            },
            configClk() {
                this.loadingShow = true;
                if (this.checkNull(this.delId)) {
                } else {
                    this.delIds = [];
                    this.delIds.push(this.delId)
                }

                MyPost('/banyan-inventory/warehouse/out/delete', {
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
            },
            goPage() {
                this.optionsChoiceString = "";
                this.form.parentCode = "";
                this.addBoxShow = true;

                // this.$router.push({
                //     path: '/addCommodityManage'
                // })
            },
            addBrandClk() {
                if (this.checkNull(this.optionsChoiceString)) {
                    return this.$message.error("请选择分类");
                }
                this.$router.push({
                    path: '/addCommodityDetail',
                    query: {
                        optionString: this.optionsChoiceString,
                        optionId: this.form.parentCode,
                        edit: "1",
                        spuId: "",
                    }
                })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../../styles/css/my.scss"
    #printStockOut
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
    .prochusingManagement
        .el-input__inner {
            height: 28px;
            line-height: 28px;
        }

        .minW .el-dialog
            width 680px

            .el-radio__label
                font-size 12px
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
            .el-button
                padding 0 0
                border none
            .el-button:hover
                color #333333
                background #ffffff
                border-color #ffffff
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
