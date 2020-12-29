<template>
    <div class="systemSet">
        <div class="nav-top">
            <div class="nav-box" @click="goPage">
                <img src="static/img/backlast.png"/>
                <p>返回</p>
            </div>
            <div class="nav-box" @click="saveAll('2')">
                <img src="static/img/submit.png"/>
                <p>提交</p>
            </div>
        </div>
        <div class="infor-mod">
            <div class="add-mod-one">
                <h3><em></em>基本信息</h3>
                <div class="add-box" v-if="edit=='2'">
                    <span class="add-tip">收货单号：</span>
                    <el-input disabled maxlength="30" size="small" class="add-ipt"
                              v-model="contentForm.receiveNo"></el-input>
                </div>
                <div class="add-box" v-if="edit=='2'">
                    <span class="add-tip"><i style="color: red">*</i> &nbsp;&nbsp;单据日期：</span>
                    <el-date-picker
                            disabled
                            style="width:60%"
                            v-model="contentForm.creationTime"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </div>
                <div class="add-box">
                    <span class="add-tip"><i style="color: red">*</i> &nbsp;&nbsp;收货类型：</span>
                    <el-select class="add-ipt" clearable
                               :disabled="edit=='2'"
                               v-model="contentForm.receiveType" @change="selectWarehouseOrderType">
                        <el-option
                                v-for="itemTwo in warehouseTypeList"
                                :key="itemTwo.dictionaryKey"
                                :label="itemTwo.dictionaryValue"
                                :value="itemTwo.dictionaryKey">
                        </el-option>
                    </el-select>
                </div>
                <div class="add-box">
                    <span class="add-tip"><i v-if="warehouseMethod=='1'" style="color: red">*</i> &nbsp;&nbsp;业务单号：</span>
                    <el-input  maxlength="30" size="small" class="add-ipt"
                              v-if="warehouseMethod=='2'"   v-model="contentForm.businessNo"></el-input>
                    <el-autocomplete
                            v-if="warehouseMethod=='1'"
                            :disabled="warehouseBoolean"
                            maxlength="30"
                            @input="getTabled"
                            class="inline-input add-ipt"
                            v-model="contentForm.businessNo"
                            :fetch-suggestions="querySearch"
                            placeholder="请输入内容"
                            @select="handleSelect"
                    ></el-autocomplete>
                </div>
                <div class="add-box">
                    <span class="add-tip"><i style="color: red">*</i> &nbsp;&nbsp;收货日期：</span>
                    <el-date-picker
                            style="width:60%"
                            v-model="contentForm.receiveDate"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>

                </div>
                <div class="add-box">
                    <span class="add-tip">收货部门：</span>
                    <el-input size="small" maxlength="30" class="add-ipt"
                              v-model="contentForm.receiveDepartment"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip"><i style="color: red">*</i> &nbsp;&nbsp;收货人员：</span>
                    <el-input maxlength="30" size="small" class="add-ipt"
                              v-model="contentForm.receivePerson"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">收货人员电话：</span>
                    <el-input maxlength="30" size="small" class="add-ipt"
                              v-model="contentForm.receivePersonPhone"></el-input>
                </div>
                <h3><em></em>送货信息</h3>
                <div class="add-box">
                    <span class="add-tip">送货单号：</span>
                    <el-input maxlength="30" size="small" class="add-ipt"
                              v-model="contentForm.sendNo"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">送货日期：</span>
                    <el-date-picker
                            style="width:60%"
                            v-model="contentForm.sendDate"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>

                </div>
                <div class="add-box">
                    <span class="add-tip">送货单位：</span>
                    <el-input  maxlength="30" size="small" class="add-ipt"
                              v-model="contentForm.sendDepartment"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">送货人：</span>
                    <el-input  maxlength="30" size="small" class="add-ipt"
                              v-model="contentForm.sendPerson"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">送货人电话：</span>
                    <el-input  maxlength="30" size="small" class="add-ipt"
                              v-model="contentForm.sendPersonPhone"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">配送车牌号：</span>
                    <el-input  maxlength="30" size="small" class="add-ipt"
                              v-model="contentForm.distributionCartNo"></el-input>
                </div>
                <div v-if="edit=='2'">
                <h3><em></em>复核信息</h3>
                <div class="add-box">
                    <span class="add-tip">复核日期：</span>
                    <el-date-picker
                            disabled
                            style="width:60%"
                            v-model="contentForm.reviewerDate"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </div>

                <div class="add-box">
                    <span class="add-tip">复核人：</span>
                    <el-input disabled maxlength="30" size="small" class="add-ipt"
                              v-model="contentForm.reviewerPersonName"></el-input>
                </div>

                <div class="add-box">
                    <span class="add-tip">复核结果：</span>
                    <el-radio-group disabled class="add-ipt" style="margin-top: 10px;" v-model="contentForm.reviewerStatus">
                        <el-radio label="2">通过</el-radio>
                        <el-radio label="3">不通过</el-radio>
                    </el-radio-group>
                </div>
                <div class="add-box clearFox" style="width: 100%;height: 60px;overflow: hidden">
                    <span class="add-tip" style="width: 11%">复核意见：</span>
                    <el-input disabled type="textarea" class="add-ipt" style="width: 52.5%" :row="2" maxlength="30"
                              v-model="contentForm.reviewerMemo" autocomplete="off"></el-input>
                </div>
                </div>
                <h3 class="clearFox"><em></em>收货明细:</h3>
                <div>
                       <span style="float: right">
                <el-button  size="small" class="mr22" style="margin-bottom: 22px"
                           @click="getSkuListShow">添加商品</el-button>
                <el-button type="primary" size="small" style="margin-bottom: 22px" @click="deleteSpu">删除商品</el-button>
            </span>
                </div>
                <div class="result-con">
                    <el-table
                            ref="multipleTable"
                            :data="tableData"
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
                                label="保质期(天)">
                        </el-table-column>
                        <el-table-column
                                prop="purchaseNumber"
                                label="采购数量">
                        </el-table-column>
                        <el-table-column
                                prop="unit"
                                label="数量单位">
                        </el-table-column>
                        <el-table-column
                                label="收货数量">
                            <template slot-scope="scope">
                                <el-input size="small"  type="text"
                                          maxlength="8"
                                          oninput="value=value.replace(/[^\d]/g,'')"
                                          @input="saveTable(scope.row)" v-model="scope.row.receiveNumber"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="unit"
                                label="数量单位">
                        </el-table-column>
                        <el-table-column
                                prop="notReceiveNumber"
                                label="未收货数量">
                        </el-table-column>
                        <el-table-column
                                label="单价(元)">
                            <template slot-scope="scope">
                                <span style="display: flex;flex-direction: row;align-items: center">¥
                                <el-input size="small"  type="text"
                                          maxlength="8"
                                          disabled
                                          oninput="value=value.replace(/[^\d.]/g,'')"
                                          @input="saveTable(scope.row)" v-model="scope.row.unitPrice"></el-input>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="总金额(元)">
                            <template slot-scope="scope">
                                <span style="display: flex;flex-direction: row;align-items: center">¥
                                <el-input size="small"  type="text"
                                          maxlength="8"
                                          disabled
                                          oninput="value=value.replace(/[^\d.]/g,'')"
                                          @input="saveTableTotal(scope.row)" v-model="scope.row.totalPrice"></el-input>
                                </span>
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
                    <el-input size="mini" maxlength="30" @keyup.enter.native="queryListFnMall" class="w106 mr30"
                              v-model="searchListAll.productName"></el-input>
                    <span class="search-btn">商品类别：</span>
                    <el-cascader class="w120 mr30" @keyup.enter.native="queryListFnMall"
                                 :options="options" :props="props" v-model="searchListAll.categoryId"
                                 @change="getPropertyFn" :show-all-levels="false"></el-cascader>
                    <span class="search-btn">产地：</span>

                    <el-input size="mini" maxlength="30" @keyup.enter.native="queryListFnMall" class="w106 mr30"
                              v-model="searchListAll.placeOfOrigin"></el-input>

                    <el-button size="mini" type="primary" plain class="mr22" @click="queryListFnMall">查询
                    </el-button>
                    <el-button size="mini" type="primary" @click="clearDialogFn">清空</el-button>
                </div>
                <div class="result-con">
                    <div class="tab-mod">
                        <el-table
                                ref="multipleTableDialog"
                                :data="tableDialogData"
                                tooltip-effect="dark"
                                max-height="400"
                                style="width: 100%;"
                                @selection-change="handleSelectionDialogChange"
                                border>
                            <el-table-column
                                    fixed
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
                <el-button size="small" type="primary" @click="addBrandClk">确认</el-button>
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
                warehouseMethod:"1",
                addBoxShow: false,
                searchListAll: {
                    productName: "",
                    spuCode: "",
                    skuStatus: "",
                    skuCode: "",
                    status: "",
                    placeOfOrigin:"",
                    name: "",//商品模板
                    categoryId: ""//所属类别
                },
                contentForm: {
                    businessNo: "",
                    creationTime:"",
                    distributionCartNo:"",
                    receiveNo: "",
                    receiveDate: "",
                    id:"",
                    receiveType: "",
                    receiveDepartment: "",
                    receivePerson: "",
                    receivePersonPhone: "",
                    warehouseId: "",
                    warehouseName:"",
                    reviewerDate: "",
                    reviewerPerson: "",
                    reviewerStatus: "",
                    reviewerMemo: "",
                    sendDate:"",
                    sendDepartment:"",
                    sendNo:"",
                    sendPerson:"",
                    sendPersonPhone:"",
                },
                dialogVisible: false,
                disabled: false,
                titData: '添加商品',
                formLabelWidth: "120px",
                serachBoxShow: false,//新增修改参数弹窗显示
                brandList: [],
                categoryId: "",
                typeStyle: "",
                editor: "",
                tableDialogData: [],
                multipleTableDialog: "",
                loadingShow: false,
                loadingText: '正在加载中...',
                tableData: [],
                multipleTable: "",
                edit: "",
                page_show: true,//分页显示
                currentPage: 0,//当前分页
                totalRecord: 0,//总共分页数据条数
                warehouseBoolean:true,
                delId: "",
                delIds: [],
                delShow: false,
                headers: {},
                maxHeight: 0,
                options: [],
                props: {
                    value: 'id',
                    label: 'name',
                    children: 'childList',
                    checkStrictly: true,
                    emitPath: false
                },
                warehouseId:"",
                restaurants:[],
                warehouseTypeList:[],
                warehouseOrderType:"",
            }
        },
        mounted() {

        },
        created() {
            this.$store.state.navTit = '采购管理';
            this.$store.state.navChildTit = '收货查询';
            this.headers = {
                token: store.get('tokenVal')
            };
            this.edit = this.$route.query.edit;

            this.getDictionaryList();
            this.getPurchaseNo();
            if (this.edit == "1") {
                this.getSkuList();
                this.getQueryInWarehouseType();
            } else {
                this.warehouseId=this.$route.query.warehouseId;
                this.getSkuList();
                this.getWarehouseInfo();
            }
            this.getAllCategoryListFn();

        },
        methods: {
            selectWarehouseOrderType(val){
                if (this.checkNull(val)){
                    this.warehouseBoolean=true;
                }else {
                    this.warehouseBoolean=false;
                }

                if (val==this.warehouseOrderType){

                }else {
                    this.contentForm={
                        businessNo: "",
                        creationTime:"",
                        distributionCartNo:"",
                        receiveNo: "",
                        receiveDate: "",
                        id:"",
                        receiveType: val,
                        receiveDepartment: "",
                        receivePerson: "",
                        receivePersonPhone: "",
                        warehouseId: "",
                        warehouseName:"",
                        reviewerDate: "",
                        reviewerPerson: "",
                        reviewerStatus: "",
                        reviewerMemo: "",
                        sendDate:"",
                        sendDepartment:"",
                        sendNo:"",
                        sendPerson:"",
                        sendPersonPhone:"",
                    };
                    this.tableData=[];
                }
                this.warehouseOrderType=val;
                // for(let i=0;i<this.warehouseTypeList.length;i++){
                //     if (val==this.warehouseTypeList[i].dictionaryKey&&this.warehouseTypeList[i].dictionaryValue=="其他入库"){
                //         this.warehouseMethod="2";
                //         return
                //     }else {
                //         this.warehouseMethod="1";
                //     }
                // }

            },
            getSkuListShow(){
                if(!this.contentForm.businessNo){
                    this.$message.error('请选择业务单号');
                    return
                }
                this.addBoxShow = true;
            },
            getQueryInWarehouseType(){
                MyPost('/banyan-procurement/purchaseReceive/order/queryPurchaseReceiveType', {
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
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
              this.getDetails(item.value)
            },
            getTabled() {
                this.tableData=[];
                // this.getDetails(this.contentForm.businessNo)
            },
            getDetails(purchaseNo){
                MyPost('/banyan-procurement/purchase/queryDetailsByPurchaseNo ', {
                    purchaseNo:purchaseNo
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                      this.tableData=data;
                      for(let i=0;i<this.tableData.length;i++){
                          if (this.tableData[i].unitPrice==null){
                              this.tableData[i].unitPrice=0;
                          }
                          this.tableData[i].purchaseNumber=this.tableData[i].shipNumber;
                          this.tableData[i].totalPrice=Number(this.tableData[i].unitPrice)*Number(this.tableData[i].receiveNumber)
                          this.tableData[i].unitPrice = this.regexNumberAll(this.tableData[i].unitPrice);
                          this.tableData[i].totalPrice= this.regexNumberAll(this.tableData[i].totalPrice);
                      }
                    } else {
                        if(this.warehouseMethod=="2"){

                        }else {
                            this.tableData=[]
                        }

                    }
                })

            },
            regexNum(str){

                var num = str+"";
                if(Number(num)<=0||num==undefined||num==null){
                    return '0.00';
                }
                if(!/^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]*)?$/.test(num)){
                    return '0.00';
                }
                if(num.indexOf(".") == -1) {
                    return num = num+'.00';
                }
                var newStr = num.split('.');
                if(newStr[1].length <= 1) {
                    //小数点后只有一位时
                    num = num +'0';
                }else if(newStr[1].length > 1){
                    //小数点后两位以上时
                    var decimals = newStr[1].substr(0,2);

                    num = newStr[0] + '.' + decimals;

                }

                return num;
            },
            getPurchaseNo(){
                MyPost('/banyan-procurement/purchase/queryPurchaseNo', {
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.restaurants=[];
                        for (let i=0;i<data.length;i++){
                            this.restaurants.push({
                                value:data[i]
                            })
                        }
                        store.set("restaurants",this.restaurants)
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
            getDictionaryList(){
                //selectAll
                MyPost('/banyan-inventory/warehouse/queryList', {
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.brandList=data.data
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
            getWarehouseInfo(){
                MyPost('/banyan-procurement/purchaseReceive/order/queryById', {
                    id:this.warehouseId
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                       this.contentForm=data

                        this.tableData= data.purchaseReceiveProductList;
                        for(let i=0;i<this.tableData.length;i++){
                            if (this.tableData[i].unitPrice==null){
                                this.tableData[i].unitPrice=0;
                            }
                            if (this.tableData[i].receiveNumber==null){
                                this.tableData[i].receiveNumber=0;
                            }
                            this.tableData[i].totalPrice=Number(this.tableData[i].unitPrice)*Number(this.tableData[i].receiveNumber)
                            this.tableData[i].totalPrice= this.regexNum(this.tableData[i].totalPrice);
                        }
                        this.getQueryInWarehouseType();
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
            saveAll() {
                if (!this.contentForm.receiveType) {
                    this.$message.error('请选择收货类型');
                    return
                }
                if (!this.contentForm.businessNo){
                    this.$message.error('请选择业务单号');
                    return
                }
                if (!this.contentForm.receiveDate) {
                    this.$message.error('请选择收货日期');
                    return
                }
                if (!this.contentForm.receivePerson) {
                    this.$message.error('请输入收货人员');
                    return
                }
                if (this.checkNull(this.tableData)) {
                    this.$message.error('请添加收货明细');
                    return
                }
                for (var i = 0; i < this.tableData.length; i++) {
                    if (this.checkNull(this.tableData[i].receiveNumber)) {
                        this.$confirm('SKU编号:' + this.tableData[i].sku + ' 没有输入收货数量，请输入', '提示', {
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
                this.loadingShow=true;
                let all = "";
                // let brandArray=[]
                // brandArray=this.brandList.map(function (item,index) {
                //     return item.id
                // })
                // let indexOf=brandArray.indexOf(this.contentForm.warehouseId);
                // this.contentForm.warehouseName=this.brandList[indexOf].warehouseName;
                this.tableData.forEach(function (item,index) {
                    item.expirationTime=item.qualityGuaranteePeriod
                })
                all = {
                    id:this.warehouseId,
                    businessNo: this.contentForm.businessNo,
                    warehouseId: this.contentForm.warehouseId,
                    warehouseName: this.contentForm.warehouseName,
                    distributionCartNo: this.contentForm.distributionCartNo,
                    receiveNo: this.contentForm.receiveNo,
                    receiveDate:this.timeFormatYYMMDD(this.contentForm.receiveDate),
                    receiveType: this.contentForm.receiveType,
                    receiveDepartment: this.contentForm.receiveDepartment,
                    receivePerson: this.contentForm.receivePerson,
                    receivePersonPhone: this.contentForm.receivePersonPhone,
                    sendDate:this.timeFormatYYMMDD(this.contentForm.sendDate),
                    sendDepartment:this.contentForm.sendDepartment,
                    sendNo:this.contentForm.sendNo,
                    sendPerson:this.contentForm.sendPerson,
                    sendPersonPhone:this.contentForm.sendPersonPhone,
                    purchaseReceiveOrderDetailsList: this.tableData,
                };
                if (this.edit=="1"){
                    MyPostJson('/banyan-procurement/purchaseReceive/order/save', all).then((res) => {
                        this.loadingShow=false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.$message({
                                message: "提交成功",
                                type: 'success'
                            });
                            this.goPage();
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
                    MyPostJson('/banyan-procurement/purchaseReceive/order/update', all).then((res) => {
                        this.loadingShow=false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.$message({
                                message: "提交成功",
                                type: 'success'
                            });
                            this.goPage();
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
                }

            },
            deleteSpu() {
                if (this.checkNull(this.multipleTable)) {
                    this.$confirm("请先勾选记录，再进行操作", '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'error'
                    }).then(() => {
                    }).catch(() => {
                    });
                    return
                }
                for (let i = 0; i < this.tableData.length; i++) {
                    for (let j = 0; j < this.multipleTable.length; j++) {
                        if (this.tableData[i].skuId == this.multipleTable[j].skuId) {
                            this.tableData.splice(i, 1);
                        }
                    }
                }
            },
            saveTableTotal(item){
                item.totalPrice=this.regexNum(item.totalPrice);
            },
            saveTable(item){

                if (item.unitPrice==null){
                    item.unitPrice=0
                }else {
                    item.unitPrice=(item.unitPrice+"").replace(/[^\d.]/g,'').replace(/\.{2,}/g,'.')
                        .replace(/^\./g,'').replace('.','$#$')
                        .replace(/\./g,'').replace('$#$','.')
                        .replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
                }
                if (item.receiveNumber==null){
                    item.receiveNumber=0;
                }else {
                    item.receiveNumber=(item.receiveNumber+"").replace(/[^\d]/g,'');
                }
                if(Number(item.receiveNumber)>Number(item.purchaseNumber)&&this.warehouseMethod=="1"){
                    this.$confirm("收货数量不能超过采购数量", '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'error'
                    }).then(() => {
                    }).catch(() => {
                    });
                    item.receiveNumber=item.purchaseNumber
                }
                item.notReceiveNumber=Number(item.purchaseNumber)-Number(item.receiveNumber);
                item.totalPrice=Number(item.unitPrice)*Number(item.receiveNumber);
                item.totalPrice=this.regexNum(item.totalPrice);
            },
            addBrandClk() {
                if (this.checkNull(this.multipleTableDialog)) {
                    this.$confirm("请先勾选记录，再进行操作", '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'error'
                    }).then(() => {
                    }).catch(() => {
                    });
                    return
                }
                this.addBoxShow=false;
                this.multipleTableDialog.forEach(function (item,index) {
                    item.batchNo="";
                    item.unitPrice=item.price;
                    item.totalPrice=0;
                    item.purchaseNumber="";
                    item.receiveNumber="";
                    item.notReceiveNumber="";
                });
                for (let i=0;i<this.multipleTableDialog.length;i++){
                    this.tableData.push({
                        sku:this.multipleTableDialog[i].sku,
                        skuId:this.multipleTableDialog[i].id,
                        productName:this.multipleTableDialog[i].productName,
                        capacity:this.multipleTableDialog[i].capacity,
                        batchNo:this.multipleTableDialog[i].batchNo,
                        unitPrice:this.multipleTableDialog[i].unitPrice,
                        inWarehouseNumber:this.multipleTableDialog[i].inWarehouseNumber,
                        totalPrice:this.regexNum(this.multipleTableDialog[i].totalPrice),
                        qualityGuaranteePeriod:this.multipleTableDialog[i].qualityGuaranteePeriod,
                        shipNumber:this.multipleTableDialog[i].shipNumber,
                        unit:this.multipleTableDialog[i].unit,
                        purchaseNumber:this.multipleTableDialog[i].stockNumber,
                        receiveNumber:this.multipleTableDialog[i].receiveNumber,
                        notReceiveNumber:this.multipleTableDialog[i].notReceiveNumber,
                    })
                }
                this.$refs.multipleTableDialog.clearSelection();
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
            queryListFnMall() {
                this.currentPage = 1;
                this.getSkuList();
            },
            clearDialogFn() {
                this.currentPage = 1;
                this.searchListAll = {
                    spuCode: "",
                    skuStatus: "",
                    skuCode: "",
                    placeOfOrigin:"",
                    status: "",
                    name: "",//商品模板
                    categoryId: "",//所属类别
                    productName: ""
                }
                this.getSkuList();
            },
            getSkuList() {
                MyPost('/liquor-product/sku/queryList', {
                    categoryId: this.searchListAll.categoryId,
                    productName: this.searchListAll.productName,
                    placeOfOrigin: this.searchListAll.placeOfOrigin,
                    start: (this.currentPage - 1) * 10,
                    length: 10
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.tableDialogData = data.data;
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
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getSkuList();
            },
            handleSelectionChange(val) {
                this.multipleTable = val;
            },
            handleSelectionDialogChange(val) {
                this.multipleTableDialog = val;
            },
            timeFormatFun(time) {
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
                }
            },
            tabClk(num) {
                if (num == 2) {
                    if (this.checkNull(this.spuId)) {
                        if (!this.searchList.spuName) {
                            this.tabShow = "1";
                            this.$message.error('请输入SKU名称');
                            return
                        }
                        this.saveAll("1");
                    }
                }
                this.tabShow = num;
                if (num == "2" && this.edit == "2") {
                    this.getSkuList();
                }

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
