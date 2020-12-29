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
                    <span class="add-tip">盘点单号：</span>
                    <el-input disabled maxlength="20" size="small" class="add-ipt"
                              v-model="contentForm.checkNo"></el-input>
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
                    <span class="add-tip"><i style="color: red">*</i> &nbsp;&nbsp;盘点仓库：</span>
                    <el-select class="add-ipt" clearable
                               :disabled="edit=='2'"
                               v-model="contentForm.warehouseId" @change="selectWarehouse">
                        <el-option
                                v-for="itemTwo in brandList"
                                :key="itemTwo.id"
                                :label="itemTwo.warehouseName"
                                :value="itemTwo.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="add-box">
                    <span class="add-tip"><i style="color: red">*</i> &nbsp;&nbsp;盘点日期：</span>
                    <el-date-picker
                            style="width:60%"
                            v-model="contentForm.checkDate"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </div>
                <div class="add-box">
                    <span class="add-tip"><i style="color: red">*</i> &nbsp;&nbsp;盘点类型：</span>
                    <el-select class="add-ipt" clearable
                               :disabled="edit=='2'"
                               v-model="contentForm.checkType" @change="selectWarehouseType">
                        <el-option
                                v-for="itemTwo in warehouseTypeList"
                                :key="itemTwo.dictionaryKey"
                                :label="itemTwo.dictionaryValue"
                                :value="itemTwo.dictionaryKey">
                        </el-option>
                    </el-select>
                </div>
                <div class="add-box">
                    <span class="add-tip">盘点部门：</span>
                    <el-input size="small" maxlength="20" class="add-ipt"
                              v-model="contentForm.checkDepartment"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip"><i style="color: red">*</i> &nbsp;&nbsp;盘点人员：</span>
                    <el-input maxlength="20" size="small" class="add-ipt"
                              v-model="contentForm.checkPerson"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">盘点人员电话：</span>
                    <el-input maxlength="20" size="small" class="add-ipt"
                              v-model="contentForm.checkPersonPhone"></el-input>
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
                    <el-input disabled maxlength="20" size="small" class="add-ipt"
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
                    <el-input disabled type="textarea" class="add-ipt" style="width: 52.5%" :row="2" maxlength="20"
                              v-model="contentForm.reviewerMemo" autocomplete="off"></el-input>
                </div>
                </div>
                <h3 class="clearFox"><em></em>盘点明细:</h3>
                <!--<div>-->
                       <!--<span style="float: right" v-if="warehouseMethod=='2'">-->
                <!--<el-button size="small" class="mr22"  style="margin-bottom: 22px"-->
                           <!--@click="getSkuListShow">添加商品</el-button>-->
                <!--<el-button type="primary" size="small" style="margin-bottom: 22px" @click="deleteSpu">删除商品</el-button>-->
            <!--</span>-->
                <!--</div>-->
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
                                label="规格">
                        </el-table-column>
                        <el-table-column
                                prop="batchNo"
                                label="批次">
                        </el-table-column>
                        <el-table-column
                                prop="inventoryNumber"
                                label="账面数量">
                        </el-table-column>
                        <el-table-column
                                prop="unit"
                                label="数量单位">
                        </el-table-column>
                        <el-table-column
                                label="盘点数量">
                            <template slot-scope="scope">
                                <el-input size="small" type="tel"  @mousewheel.native.prevent
                                          oninput="if(value.length>8)value=value.slice(0,8)"
                                          @input="saveTable(scope.row)" v-model="scope.row.checkInventoryNumber"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="differentNumber"
                                label="盈亏数量">
                        </el-table-column>
                        <el-table-column
                                label="单价(元)">
                            <template slot-scope="scope">
                              <span style="display: flex;flex-direction: row;align-items: center">¥
                                <el-input disabled style="margin-left: 6px" size="small" type="tel"  @mousewheel.native.prevent
                                          oninput="if(value.length>8)value=value.slice(0,8)"
                                          @input="saveTable(scope.row)" v-model="scope.row.unitPrice"></el-input>
                              </span>

                            </template>
                        </el-table-column>
                        <el-table-column
                                label="总金额(元)">
                            <template slot-scope="scope">
                                <span style="display: flex;flex-direction: row;align-items: center">¥
                                <el-input style="margin-left: 6px" disabled size="small" type="tel"   @mousewheel.native.prevent
                                          oninput="if(value.length>8)value=value.slice(0,8)"
                                          @input="saveTable(scope.row)" v-model="scope.row.totalPrice"></el-input>
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
                    <span class="search-btn">商品名称：</span>
                    <el-input size="mini" maxlength="20" @keyup.enter.native="queryListFnMall" class="w106 mr30"
                              v-model="searchListAll.productName"></el-input>
                    <span class="search-btn ">商品类别：</span>
                    <el-cascader class="w120 mr30 " @keyup.enter.native="queryListFnMall"
                                 :options="options" :props="props" v-model="searchListAll.categoryId"
                                 @change="getPropertyFn" :show-all-levels="false"></el-cascader>
                    <span class="search-btn">产地：</span>

                    <el-input size="mini" maxlength="20" @keyup.enter.native="queryListFnMall" class="w106 mr30"
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
                warehouseBoolean:true,
                addBoxShow: false,
                searchListAll: {
                    productName: "",
                    spuCode: "",
                    skuStatus: "",
                    skuCode: "",
                    status: "",
                    name: "",//商品模板
                    categoryId: "",//所属类别
                    placeOfOrigin:""
                },
                contentForm: {
                    creationTime:"",
                    checkNo: "",
                    checkDate: "",
                    businessNo: "",
                    warehouseOrderDate: "",
                    checkType: "",
                    checkDepartment: "",
                    checkPerson: "",
                    checkPersonPhone: "",
                    warehouseId: "",
                    warehouseName:"",
                    reviewerDate: "",
                    reviewerPerson: "",
                    reviewerPersonName:"",
                    reviewerStatus: "",
                    reviewerMemo: "",
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
                batchNoList:[],
            }
        },
        mounted() {

        },
        created() {
            this.$store.state.navTit = '库存管理';
            this.$store.state.navChildTit = '库存盘点';
            this.headers = {
                token: store.get('tokenVal')
            };
            this.edit = this.$route.query.edit;
            this.getDictionaryList();
            if (this.edit == "1") {
                this.getSkuList();
                this.getQueryOutWarehouseType();
            } else {
                this.warehouseId=this.$route.query.warehouseId;
                this.getSkuList();
                this.getWarehouseInfo();
            }
            this.getAllCategoryListFn();

        },
        methods: {
            selectWarehouseType(val){
                if (this.checkNull(val)){
                    this.warehouseBoolean=true;
                }else {
                    if (this.contentForm.warehouseId){
                        this.warehouseBoolean=false;
                    }else {
                        this.warehouseBoolean=true;
                    }
                }
            },
            selectBatchNoList(item){
                if (!this.checkNull(item.batchNo)){
                    for(let i=0;i<this.batchNoList.length;i++){
                        if (item.batchNo==this.batchNoList[i].batchNo){
                            item.inventoryNumber=this.batchNoList[i].quantity
                            return;
                        }
                    }
                }else {
                    item.inventoryNumber="";
                }

            },
            selectWarehouse(val){
                this.getDetails(val);
            },
            getSkuListShow(){

                this.addBoxShow = true;
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
            getDetails(purchaseNo){
                MyPost('/banyan-inventory/inventory/check/queryDetailProductsByWarehouseId', {
                    warehouseId:purchaseNo
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                      this.tableData=data;
                      for(let i=0;i<this.tableData.length;i++){
                          // if (this.tableData[i].unitPrice==null){
                          //     this.tableData[i].unitPrice=0;
                          // }
                          // if (this.tableData[i].checkInventoryNumber==null){
                          //     this.tableData[i].checkInventoryNumber=0;
                          // }
                          if (this.tableData[i].batchNo==null){
                              this.tableData[i].batchNo="";
                          }
                          this.tableData[i].batchNoList=[];
                          this.tableData[i].totalPrice=Number(this.tableData[i].unitPrice)*Number(this.tableData[i].checkInventoryNumber)
                          this.tableData[i].totalPrice= this.regexNumberAll(this.tableData[i].totalPrice);
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
            getQueryInventoryBySkuIdAndWarehouseId(item){
                MyPost('/banyan-inventory/inventory/queryInventoryBySkuIdAndWarehouseId', {
                    inventoryId:this.contentForm.warehouseId,
                    skuId:item.skuId,
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.batchNoList=data;
                        item.batchNoList=data;
                        // console.log("==="+JSON.stringify(this.tableData))
                    } else {

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
                MyPost('/banyan-inventory/inventory/check/queryById', {
                    id:this.warehouseId
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                       this.contentForm={
                           checkNo: data.checkNo,
                           creationTime: this.timeFormatYYMMDD(data.creationTime),
                           businessNo: data.businessNo,
                           checkDate:  this.timeFormatYYMMDD(data.checkDate),
                           checkType: data.checkType,
                           checkDepartment: data.checkDepartment,
                           checkPerson: data.checkPerson,
                           checkPersonPhone: data.checkPersonPhone,
                           warehouseId: data.warehouseId,
                           reviewerDate: this.timeFormatYYMMDD(data.reviewerDate),
                           reviewerPerson: data.reviewerPerson,
                           reviewerStatus: data.reviewerStatus,
                           reviewerPersonName: data.reviewerPersonName,
                           reviewerMemo: data.reviewerMemo,
                       }
                        this.tableData= data.checkInventoryProductList;
                        this.getQueryOutWarehouseType();
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
            getQueryOutWarehouseType(){
                MyPost('/banyan-inventory/inventory/check/queryCheckInventoryType', {
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.warehouseTypeList=data;
                        if (this.edit=="2"){
                            for(let i=0;i<this.warehouseTypeList.length;i++){
                                if (this.contentForm.warehouseOrderType==this.warehouseTypeList[i].dictionaryKey&&this.warehouseTypeList[i].dictionaryValue=="其他盘点"){
                                    this.warehouseMethod="2";
                                    this.warehouseBoolean=false;
                                    return
                                }else {
                                    this.warehouseBoolean=true;
                                    this.warehouseMethod="1";

                                }
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
            saveAll() {

                if (!this.contentForm.warehouseId) {
                    this.$message.error('请选择盘点仓库');
                    return
                }
                if (!this.contentForm.checkDate) {
                    this.$message.error('请选择盘点日期');
                    return
                }
                if (!this.contentForm.checkType) {
                    this.$message.error('请选择盘点类型');
                    return
                }
                if (!this.contentForm.checkPerson) {
                    this.$message.error('请输入盘点人员');
                    return
                }
                for (var i = 0; i < this.tableData.length; i++) {
                    if (this.checkNull(this.tableData[i].checkInventoryNumber)) {
                        this.$confirm('SKU编号:'+this.tableData[i].sku+' 没有输入盘点数量，请输入', '提示', {
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
                let brandArray=[]
                brandArray=this.brandList.map(function (item,index) {
                    return item.id
                })
                let indexOf=brandArray.indexOf(this.contentForm.warehouseId);
                this.contentForm.warehouseName=this.brandList[indexOf].warehouseName;
                all = {
                    id:this.warehouseId,
                    checkNo: this.contentForm.checkNo,
                    checkDate: this.timeFormatYYMMDD(this.contentForm.checkDate),
                    checkType: this.contentForm.checkType,
                    checkDepartment: this.contentForm.checkDepartment,
                    checkPerson: this.contentForm.checkPerson,
                    checkPersonPhone: this.contentForm.checkPersonPhone,
                    warehouseId: this.contentForm.warehouseId,
                    warehouseName: this.contentForm.warehouseName,
                    checkInventoryOrderDetailsList: this.tableData
                };
                if (this.edit=="1"){
                    MyPostJson('/banyan-inventory/inventory/check/save', all).then((res) => {
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
                    MyPostJson('/banyan-inventory/inventory/check/update', all).then((res) => {
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
            saveTable(item){
                if (this.checkNull(item.unitPrice)){
                    // item.unitPrice=0
                }else {
                    item.unitPrice=(item.unitPrice+"").replace(/[^\d.]/g,'').replace(/\.{2,}/g,'.')
                        .replace(/^\./g,'').replace('.','$#$')
                        .replace(/\./g,'').replace('$#$','.')
                        .replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')
                }
                if (this.checkNull(item.checkInventoryNumber)){
                    // item.checkInventoryNumber=0;
                }else {
                    item.checkInventoryNumber=(item.checkInventoryNumber+"").replace(/[^\d]/g,'');
                }
                item.differentNumber=Number(item.checkInventoryNumber)-Number(item.inventoryNumber);
                item.totalPrice=Number(item.unitPrice)*Number(item.checkInventoryNumber);
                item.totalPrice=this.regexNumberAll(item.totalPrice);
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
                    item.outWarehouseNumber=0;
                    item.orderNumber="";
                    item.inventoryNumber="";
                });
                for (let i=0;i<this.multipleTableDialog.length;i++){
                    this.tableData.push({
                        sku:this.multipleTableDialog[i].sku,
                        skuId:this.multipleTableDialog[i].skuId,
                        productName:this.multipleTableDialog[i].productName,
                        capacity:this.multipleTableDialog[i].capacity,
                        batchNo:this.multipleTableDialog[i].batchNo,
                        unitPrice:this.multipleTableDialog[i].unitPrice,
                        outWarehouseNumber:this.multipleTableDialog[i].outWarehouseNumber,
                        totalPrice:this.multipleTableDialog[i].totalPrice,
                        qualityGuaranteePeriod:this.multipleTableDialog[i].qualityGuaranteePeriod,
                        orderNumber:this.multipleTableDialog[i].orderNumber,
                        inventoryNumber:this.multipleTableDialog[i].orderNumber,
                        unit:this.multipleTableDialog[i].unit,
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
                    status: "",
                    name: "",//商品模板
                    categoryId: "",//所属类别
                    productName: "",
                    placeOfOrigin:""
                }
                this.getSkuList();
            },
            getSkuList() {
                MyPost('/liquor-product/sku/queryList', {
                    categoryId: this.searchListAll.categoryId,
                    auditStatus: "1",
                    isOpen: "1",
                    placeOfOrigin:this.searchListAll.placeOfOrigin,
                    productName: this.searchListAll.productName,
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
                            this.$message.error('请输入商品名称');
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
