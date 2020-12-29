<template>
    <div class="prochusingManagement">
        <div class="nav-top">
         
			<div class="nav-box" @click="review('1')">
			    <img src="static/img/jiedong.png"/>
			    <p>启用</p>
			</div>
            <div class="nav-box" @click="review('2')">
                <img src="static/img/jinyong.png"/>
                <p>冻结</p>
            </div>
		<!-- 	<div class="nav-box" @click="shengji">
			    <img src="static/img/shengji.png"/>
			    <p>升级</p>
			</div> -->
        <!--    <div class="nav-box" @click="delClkAll">
                <img src="static/img/icon-02.png"/>
                <p>删除</p>
            </div> -->
            <div class="nav-box" @click="clearFn">
                <img src="static/img/icon-04.png"/>
                <p>刷新</p>
            </div>
        </div>
        <div class="contain-mod">
            <div class="contain-top">
                <span class="search-btn">手机号：</span>
                <el-input size="mini" @keyup.enter.native="queryListFnMall" maxlength="30" class="w106 mr30"
                          v-model="searchList.phone"></el-input>
                <span class="search-btn">姓名/昵称：</span>
               <el-input size="mini" @keyup.enter.native="queryListFnMall" maxlength="30" class="w106 mr30"
                         v-model="searchList.nickOrName"></el-input>
                <span class="search-btn">类型：</span>
                <el-select class="w120 mr30" size="mini" placeholder="全部" v-model="searchList.type">
                    <el-option
                            label="全部"
                            value="">
                    </el-option>
                    <el-option
                            label="普通会员"
                            value="1">
                    </el-option>
                    <el-option
                            label="付费会员"
                            value="2">
                    </el-option>
                    <el-option
                            label="付费达人"
                            value="3">
                    </el-option>
                              
                </el-select>
                <span class="search-btn">状态：</span>
                <el-select class="w88 mr30" size="mini" placeholder="全部" v-model="searchList.status">
                    <el-option
                            label="全部"
                            value="">
                    </el-option>
                    <el-option
                            label="已启用"
                            value="1">
                    </el-option>
                    <el-option
                            label="已冻结"
                            value="2">
                    </el-option>

                </el-select>

                <el-button size="mini" type="primary" plain class="mr22" @click="queryListFnMall">查询</el-button>
                <el-button size="mini" type="primary" @click="clearFn">清空</el-button>
            </div>
            <div  class="result-con">
                <div class="tab-mod">
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
                                prop="warehouseOrderNo"
                                label="邀请人">
                        </el-table-column>
                        <el-table-column
                                prop="phone"
                                label="手机号">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="姓名">
                        </el-table-column>
                        <el-table-column
                                prop="nickname"
                                label="昵称">
                        </el-table-column>
                        <el-table-column
                                label="类型">
								<template slot-scope="scope">
								     <span>{{scope.row.type == '1' ? "普通会员":scope.row.type == '2'?"付费会员":"付费达人"}}</span>
								</template>
                        </el-table-column>
                        <el-table-column
                                label="状态">
								<template slot-scope="scope">
									<span>{{scope.row.status == '1' ? "已启用":"已冻结"}}</span>
								   
								</template>
                        </el-table-column>
                        <el-table-column
                                prop="registerTime"
                                label="注册时间">
                        </el-table-column>
             
                        <el-table-column
                                width="200"
                                label="操作">
                            <template slot-scope="scope">
                                <!--scope.row-->
                                <span class="scope_btn color-blue">详情</span>
                                <span class="scope_btn color-blue" v-if="scope.row.status=='2'"
                                      @click="reviewTable(scope.row,'1')">启用</span>
                              <!--  <span class="scope_btn color-blue" 
                                      @click="lostLoser(scope.row)">升级</span> -->
                                <span class="scope_btn color-blue" v-if="scope.row.status=='1'"
                                      @click="reviewTable(scope.row,'2')">冻结</span>
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

        <el-dialog :title="titData"
                 class="minW"
                 :visible.sync="serachBoxShow"
                 :close-on-click-modal="false"
                 :close-on-press-escape="false">
          <div class="add-contain">
          <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth">
			  <div class="new-other">
             <el-form-item size="small" label="升级类型：" prop="sort">
                 <el-select v-model="form.shengji" placeholder="请选择" style="width:100%">
                     <el-option
                             v-for="item in shengjiLists"
                             :key="item"
                             :label="item.label"
                             :value="item.value">
                     </el-option>
                 </el-select>
             </el-form-item>
			</div>
             <el-form-item size="small" label="向上级返佣：" >
                <el-input type="tel"  @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" v-model="form.sort" autocomplete="off"></el-input>
             </el-form-item>
  
            <el-form-item size="small" label="向上上级返佣：">
                  <el-input :maxlength="inputMaxL" @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" v-model="form.firstLetter" autocomplete="off"></el-input>
            </el-form-item>
             
            <el-form-item size="small" label="公司得：">
               <el-input :maxlength="inputMaxL" @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" v-model="form.firstLetter" autocomplete="off"></el-input>
            </el-form-item>
             
          </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
              <el-button size="small" @click="serachBoxShow = false">取消</el-button>
              <el-button size="small" type="primary" @click="addBrandClk">确定</el-button>
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
        name: 'stockInManagerment',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
				searchList: {
				    nickOrName: '',//商品模板
				    phone: '',//所属类别
				    status: '',
				    type: '',
				},
				titData:"会员费用设置",
				serachBoxShow:false,
				shengjiLists:[{
					label:"升级付费会员",
					value:1
				},{
					label:"升级付费达人",
					value:2
				}],
				form: {
					shengji:"",
				    parentCode: ""
				},
                currentPagePrint:1,
                totalRecordPrint:0,
                multipleTablePrint:"",
                tableDataPrint:[],
                showImageBoolean: false,
                images: [],
                titleRec: "打印",
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
                tableData: [],
                page_show: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                addBoxShow: false,
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
                loadingName:"",
                props: {
                    value: 'id',
                    label: 'name',
                    children: 'childList',
                    checkStrictly: true,
                    emitPath: false
                },
                printObj:{
                    id:"printTest",
                    popTitle:"",
                },
                warehouseId:"",
            }
        },
        created() {
            this.$store.state.navTit = '会员管理';
            this.$store.state.navChildTit = '会员列表';
            // this.getFunctionCode(this, this.$route.query.code);
            // this.getQueryInWarehouseType();
            this.queryListFn();
            // this.queryBrandListFn();
            // this.getAllCategoryListFn();
        },
        methods: {
            getWarehouseInfo(){
                MyPost('/banyan-inventory/warehouse/in/queryById', {
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
                            memo:data.reviewerMemo,
                        }
                        this.tableDataPrint= data.warehouseDetailProductList;
                        for(let i=0;i<this.tableDataPrint.length;i++){
                            if (this.tableDataPrint[i].unitPrice==null){
                                this.tableDataPrint[i].unitPrice=0;
                            }
                            if (this.tableDataPrint[i].inWarehouseNumber==null){
                                this.tableDataPrint[i].inWarehouseNumber=0;
                            }
                            this.tableDataPrint[i].totalPrice=Number(this.tableDataPrint[i].unitPrice)*Number(this.tableDataPrint[i].inWarehouseNumber)
                            this.tableDataPrint[i].unitPrice= this.regexNumberAll(this.tableDataPrint[i].unitPrice);
                            this.tableDataPrint[i].totalPrice= this.regexNumberAll(this.tableDataPrint[i].totalPrice);
                            this.printForm.totalPrice=this.regexNumberAll(Number(this.printForm.totalPrice)+ Number(this.tableDataPrint[i].totalPrice));
                            this.consoleCommon(this.printForm.totalPrice)
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
                            totalPrice:"",
                            memo:"",
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
			shengji(){
				 this.serachBoxShow=true;
			},
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
                this.consoleCommon(this.printForm.currentTime)
                this.recShow=true;
            },
            getQueryInWarehouseType(){
                MyPost('/banyan-inventory/warehouse/in/queryInWarehouseType', {
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.warehouseTypeList=data;
                        store.set('warehouse', data);
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
            getWarehouseOrderDateType(item){
              for (let i=0;i<this.warehouseTypeList.length;i++){
                  if (this.warehouseTypeList[i].dictionaryKey==item){
                      return this.warehouseTypeList[i].dictionaryValue
                  }
              }
            },
            getTitleType(item){
                if (item=="1"){
                    return "待复核"
                }else if (item=="2"){
                    return "已入库"
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
                this.masterForm.status ="";
                this.masterForm.memo = "";
                this.revShow = true;
            },
            reviewItem(item){
                this.masterForm.status ="";
                this.masterForm.memo = "";
                this.revId =item.id;
                this.revShow =true;
            },
			//启用禁用
            review(status) {
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
                // for (var i = 0; i < this.multipleTable.length; i++) {
                //     if (this.multipleTable[i].reviewerStatus != 1) {
                //         this.$confirm('入库单号:'+this.multipleTable[i].warehouseOrderNo+' 入库状态不是“待复核”，无法进行复核操作。', '提示', {
                //             confirmButtonText: '确定',
                //             showCancelButton: false,
                //             type: 'error'
                //         }).then(() => {
                //             this.revShow = false;
                //         }).catch(() => {
                //             this.revShow = false;
                //         });
                //         return;
                //     }
                // }
                this.revIds = this.multipleTable.map(item => {
                    return item.id
                });
				this.qiyongFunction(status);
            },
			reviewTable(item,status){
				this.revIds=[];
				this.revIds.push(item.id);
				this.qiyongFunction(status);
			},
			qiyongFunction(status){
				this.loadingName=this.$loading({
				    lock: true,
				    text: '加载中···',
				    spinner: 'el-icon-loading',
				    background: 'rgba(0, 0, 0, 0.8)'
				});
				MyPost('/yl-ms-platform/admin/members/setMemberStatus', {
				    ids: this.revIds,
				    status: status,
				    memo: this.masterForm.memo
				}).then((res) => {
				    this.loadingName.close();
				    let {code, message, data} = res;
				    if (code == '0') {
				        this.queryListFn();
				        this.$message({
				            message: status=='1'?"启用成功":"冻结成功",
				            type: 'success'
				        });
				
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
                MyPost('/banyan-inventory/warehouse/in/review', {
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
            handleSelectionChangePrint(val) {
                this.multipleTablePrint = val;
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
                    nickOrName: '',//商品模板
                    phone: '',//所属类别
                    status: '',
                    type: '',
                };
				this.loadingName=this.$loading({
				    lock: true,
				    text: 'Loading',
				    spinner: 'el-icon-loading',
				    background: 'rgba(0, 0, 0, 0.8)'
				});
                this.queryListFn();
            },
            queryListFn() {
                MyGet('/yl-ms-platform/admin/members/userMemberList', {
                    nickOrName: this.searchList.nickOrName,
                    phone: this.searchList.phone,
                    status: this.searchList.status,
                    type: this.searchList.type,
                    start: (this.currentPage - 1) * 10,
                    length: 10
                }).then((res) => {
					if(this.loadingName){
						this.loadingName.close();
					}
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.tableData = data;
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
            handleCurrentChangePrint(val){
              this.currentPagePrint=val;
              this.warehouseId=this.multipleTable[this.currentPagePrint-1].id;
              this.getWarehouseInfo();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.queryListFn();
            },
            editClk(item, type) {
                this.$router.push({
                    path: '/stockInManagermentAdd',
                    query: {
                        edit: "2",
                        warehouseId: item.id,
                    }
                })
            },
            addClk(item) {
                this.$router.push({
                    path: '/stockInManagermentAdd',
                    query: {
                        edit: "1",
                    }
                })
            },
            goInfor(item) {
                this.$router.push({
                    path: '/stockInManagermentInfo',
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
                        this.$confirm('入库单号:'+this.multipleTable[i].warehouseOrderNo+' 入库状态不是“待复核/复核不通过”，无法进行作废操作。', '提示', {
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
                        this.$confirm('入库单号:'+this.multipleTable[i].warehouseOrderNo+' 入库状态不是“复核不通过”，无法进行删除操作。', '提示', {
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
                this.invalidShow=true
            },
            configInvalid() {
                this.loadingShow = true;
                if (this.checkNull(this.revId)) {
                } else {
                    this.revIds = [];
                    this.revIds.push(this.revId)
                }
                MyPost('/banyan-inventory/warehouse/in/review', {
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

                MyPost('/banyan-inventory/warehouse/in/delete', {
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
    #printTest
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
            /*line-height 40px*/
            margin-top 20px
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
        .title-8
            width 100%
            text-align left
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
        .minW-print .el-dialog
            width 840px

            .el-radio__label
                font-size 12px
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
