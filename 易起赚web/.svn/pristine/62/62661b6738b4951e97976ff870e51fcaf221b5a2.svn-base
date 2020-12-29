<template>
    <div class="commodityList">
        <div class="nav-top">
            <div class="nav-box" @click="goPage" v-if="functionCodes.indexOf('AD')>-1">
                <img src="../../framework/images/addNew.png"/>
                <p>新增</p>
            </div>
            <div class="nav-box" @click="kuailyAdd" v-if="functionCodes.indexOf('AD')>-1">
                <img src="../../common/images/master.png"/>
                <p>快速新增</p>
            </div>
            <div class="nav-box" @click="delClkAll" v-if="functionCodes.indexOf('DE')>-1">
                <img src="./icon-02.png"/>
                <p>删除</p>
            </div>
            <div class="nav-box" @click="startALl('2')" v-if="functionCodes.indexOf('SJXJ')>-1">
                <img src="./up-01.png"/>
                <p>上架</p>
            </div>
            <div class="nav-box" @click="startALl('1')" v-if="functionCodes.indexOf('SJXJ')>-1">
                <img src="./down-01.png"/>
                <p>下架</p>
            </div>
            <div class="nav-box" @click="" @click="drFile" v-if="functionCodes.indexOf('DR')>-1">
                <img src="../../common/images/import.png"/>
                <p>导入</p>
            </div>
            <el-upload
                    class="upload-demo upload-demo-2"
                    ref="uploadrich"
                    :data="newform"
                    :headers="headers"
                    :file-list="newform.fileRich"
                    action="/liquor-product/productUpload/upload"
                    accept=".xlsx"
                    :before-upload="uploadBefore"
                    :on-success="uploadRichSuccess"
                    multiple>
                <el-button size="small" type="primary">选择上传文件</el-button>
                <div class="el-upload__tip" slot="tip">能上传xlsx(Excel2007)文件，且不超过10M</div>
            </el-upload>
            <div class="nav-box" @click="clearFn" v-if="functionCodes.length>=0">
                <img src="./icon-04.png"/>
                <p>刷新</p>
            </div>
        </div>
        <div class="contain-mod">
            <div class="contain-top">
                <span class="search-btn hidden-md-and-down">SPU编号：</span>
                <el-input size="mini" @keyup.enter.native="queryListFnMall" maxlength="50" class="w106 mr30 hidden-md-and-down"
                          v-model="searchList.spuCode"></el-input>
                <span class="search-btn">商品名称：</span>
                <el-input maxlength="50" @keyup.enter.native="queryListFnMall" size="mini" class="w106 mr30"
                          v-model="searchList.name"></el-input>
                <span class="search-btn hidden-lg-and-down">商品类别：</span>
                <el-cascader class="w120 mr30 hidden-lg-and-down" :options="options" :props="props" :disabled="showDisable"
                             v-model="searchList.categoryId" :show-all-levels="false"></el-cascader>
                <span class="search-btn">商品状态：</span>
                <el-select class="w88 mr30" size="mini" placeholder="商品状态" v-model="searchList.auditStatus">
                    <el-option
                            label="全部"
                            value="">
                    </el-option>
                    <el-option
                            label="待提交"
                            value="1">
                    </el-option>
                    <el-option
                            label="已提交"
                            value="2">
                    </el-option>
                </el-select>
                <span class="search-btn">上架状态：</span>
                <el-select class="w88 mr30" size="mini" placeholder="上架状态" v-model="searchList.shelfState">
                    <el-option
                            label="全部"
                            value="">
                    </el-option>
                    <el-option
                            label="已上架"
                            value="2">
                    </el-option>
                    <el-option
                            label="未上架"
                            value="1">
                    </el-option>
                </el-select>

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
                                prop="spuNumber"
                                label="SPU编号">
                        </el-table-column>
                        <el-table-column
                                prop="spuName"
                                label="商品名称">
                        </el-table-column>
                        <el-table-column
                                width="100"
                                label="商品主图">
                            <template slot-scope="scope">
                                <el-image style="width: 40px;height: 40px;" :src="scope.row.imageUrl" @click="showImage(scope.row.imageUrl)">
                                    <div slot="error" style="font-size: 40px;" class="image-slot">
                                        <i class="el-icon-picture-outline"></i>
                                    </div>
                                </el-image>
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="120"
                                prop="categoryName"
                                label="商品类别">
                        </el-table-column>
                        <el-table-column
                                width="100"
                                label="商品状态">
                            <template slot-scope="scope">{{ scope.row.auditStatus == 1 ? '待提交' : '已提交' }}</template>
                        </el-table-column>
                        <el-table-column
                                width="100"
                                label="上架状态">
                            <template slot-scope="scope">{{ scope.row.shelfState == 1 ? '未上架' : '已上架' }}</template>
                        </el-table-column>
                        <el-table-column
                                width="100"
                                prop="skuCount"
                                label="SKU数">
                        </el-table-column>
                        <el-table-column
                                width="150"
                                label="操作">
                            <template slot-scope="scope">
                                <!--scope.row-->
                                <span v-if="functionCodes.indexOf('ED')>-1" class="scope_btn color-blue"
                                      @click="editClk(scope.row)">编辑</span>
                                <span v-if="functionCodes.indexOf('DE')>-1" class="scope_btn"
                                      @click="delClk(scope.row)">删除</span>
                                <span v-if="scope.row.auditStatus == 2&&functionCodes.indexOf('SJXJ')>-1"
                                      class="scope_btn color-blue color-under-line" @click="goInfor(scope.row)">{{ scope.row.shelfState == '1' ? '上架' : '下架' }}</span>
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
        <el-dialog :title="titData"
                   class="minW minN"
                   :visible.sync="addBoxShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="add-contain">
                <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth">
                    <div class="new-other">
                        <el-form-item size="small" prop="type" label="  选择分类：">
                            <el-cascader-panel ref="myCascader" v-model="form.parentCode" :props="props"
                                               @change="handleChange" :options="options"></el-cascader-panel>
                        </el-form-item>
                        <el-form-item size="small" label="  已选类目：">
                            {{optionsChoiceString}}
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="addBoxShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="addBrandClk">下一步</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="titAddData"
                   class="minW"
                   :visible.sync="addShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="add-contain">
                <el-form :model="masterForm" :rules="rulesAdd" ref="ruleFormAdd" :label-width="formLabelWidth">
                    <div class="new-other">
                        <el-form-item  size="small" prop="type" label="商品类别：">
                            <el-cascader ref="myCascader" v-model="masterForm.parentCode" :props="props"
                                         :options="options"></el-cascader>
                        </el-form-item>
                    </div>
                    <div class="new-other">
                        <el-form-item size="small" prop="name" label="商品名称：">
                            <el-input v-model="masterForm.name" maxlength="30" autocomplete="off"></el-input>
                        </el-form-item>
                    </div>
                    <el-form-item size="small" label="副标题：">
                        <el-input v-model="masterForm.title" maxlength="30" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="品牌：">
                        <el-tooltip class="add-ipt" content="品牌" placement="top-start">
                            <el-select size="mini" :placeholder="品牌" v-model="masterForm.brandId">
                                <el-option
                                        v-for="itemTwo in brandList"
                                        :key="itemTwo.id"
                                        :label="itemTwo.name"
                                        :value="itemTwo.id">
                                </el-option>
                            </el-select>
                        </el-tooltip>
                    </el-form-item>
                    <el-form-item size="small" label="商品关键字：">
                        <el-input v-model="masterForm.keyword" maxlength="30" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="addShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="addMasterClick">确定</el-button>
            </div>

        </el-dialog>
        <div class="images" v-show="showImageBoolean"  v-viewer="{movable: true}">
            <img v-for="src in images" :src="src" :key="src">
        </div>
    </div>
</template>

<script>
    import store from 'si-store'
    import {MyGet, MyPost} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../footerbar/footerbar.vue'

    export default {
        name: 'commodityList',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                newform:{
                    fileRich:[],
                },
                showImageBoolean:false,
                images:[],
                titAddData: "快速新增商品",
                addShow: false,
                masterForm: {
                    parentCode: "",
                    name: "",
                    title: "",
                    brandId: "",
                    keyword: "",
                },
                brandList: [],
                form: {
                    parentCode: ""
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
                tableData: [],
                page_show: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                addBoxShow: false,
                searchList: {
                    name: '',//商品模板
                    categoryId: '',//所属类别
                    auditStatus: '',
                    shelfState: '',
                    spuCode: "",
                },
                getAllCategoryList: [],
                delShow: false,
                delId: '',
                delIds: '',
                titData: '选择分类',
                multipleTable: "",

                optionsAgain:[],
                functionCodes: [],
                arrFathers:[],
                arrFathersOptions:[],
                headers: {},
                errorTitle:"",
                options: [],
                props: {
                    value: 'id',
                    label: 'name',
                    children: 'childList',
                    checkStrictly: true,
                    emitPath: false
                },
            }
        },
        created() {
            this.functionCodes=[];
            this.$store.state.navTit = '商品';
            this.$store.state.navChildTit = '商品管理';
            this.headers = {
                token: store.get('tokenVal')
            };
            this.getFunctionCode(this, this.$route.query.code);
            this.queryListFn();
            this.queryBrandListFn();
            this.getAllCategoryListFn();
        },
        methods: {
            drFile(){
                document.querySelector('.upload-demo-2 .el-button--small').click()
            },
            uploadBefore(file) {
                // 上传之前
                let extension = file.name.substring(file.name.lastIndexOf('.')+1)
                let size = file.size / 1024 / 1024
                if(extension !== 'xlsx') {
                    // this.$confirm("只能上传Excel2017（即后缀是.xlsx）的文件", '提示', {
                    //     confirmButtonText: '确定',
                    //     showCancelButton: false,
                    //     type: 'error'
                    // }).then(() => {
                    //     this.delShow = false;
                    // }).catch(() => {
                    //     this.delShow = false;
                    // });
                    this.errorTitle="只能上传Excel2017（即后缀是.xlsx）的文件"
                }
                if(size > 10) {
                    // this.$confirm("文件大小不得超过10M", '提示', {
                    //     confirmButtonText: '确定',
                    //     showCancelButton: false,
                    //     type: 'error'
                    // }).then(() => {
                    //     this.delShow = false;
                    // }).catch(() => {
                    //     this.delShow = false;
                    // });
                    this.errorTitle="文件大小不得超过10M"
                }
                return;
                // this.newform.fileRich.push(file)
            },
            uploadRichSuccess(response, file, fileList) {
                if (response.code=="0") {
                    this.queryListFn();
                    this.$message({
                        message: "导入成功",
                        type: 'success'
                    });
                } else {
                    if (response.code=="001000"){
                        this.$confirm("导入失败 "+this.errorTitle, '提示', {
                            confirmButtonText: '确定',
                            showCancelButton: false,
                            type: 'error'
                        }).then(() => {
                            this.delShow = false;
                        }).catch(() => {
                            this.delShow = false;
                        });
                    }else {
                        this.$confirm(response.message, '提示', {
                            confirmButtonText: '确定',
                            showCancelButton: false,
                            type: 'error'
                        }).then(() => {
                            this.delShow = false;
                        }).catch(() => {
                            this.delShow = false;
                        });
                    }
                    // 提示信息，需引入Message

                }
                this.errorTitle="";
            },
            showImage (src) {
                if(this.checkNull(src)){
                    return;
                }
                this.images=[];
                this.images.push(src)
                const viewer = this.$el.querySelector('.images').$viewer
                viewer.show()
            },
            queryListFnMall() {
                this.currentPage = 1;
                this.queryListFn();
            },
            queryBrandListFn() {
                MyGet('/liquor-product/brand/queryList', {
                    status: "1",
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.brandList = data.data;
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            kuailyAdd() {
                this.masterForm = {
                    parentCode: "",
                    name: "",
                    title: "",
                    brandId: "",
                    keyword: "",
                };
                this.addShow = true;
            },
            addMasterClick() {
                if (!this.masterForm.parentCode) {
                    this.$message.error('请选择商品分类');
                    return
                }
                if (!this.masterForm.name) {
                    this.$message.error('请输入商品名称');
                    return
                }
                let searchList = {
                    id: "",
                    auditStatus: "2",
                    brandId: this.masterForm.brandId == null ? "" : this.masterForm.brandId,//品牌Id
                    categoryId: this.masterForm.parentCode,//分类ID
                    keyword: this.masterForm.keyword,//商品关键词
                    spuName: this.masterForm.name,
                    title: this.masterForm.title,
                };
                this.loadingShow = true;
                MyPost('/liquor-product/spu/saveAndUpd', searchList).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.addShow = false;
                        this.queryListFn();
                        this.$message({
                            message: "新增成功",
                            type: 'success'
                        });

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

            tolist(data) {
                var result=[];
                for(var i=0;i<data.length;i++) {
                    var c=data[i].childList;
                    result.push(data[i]);
                    if(!this.checkNull(c)) {
                        result.push.apply(result,this.tolist(c));
                        data[i].childList=null;
                    }
                }
                return result;
            },

            getFatherName(data){
                for(var i=0;i<data.length;i++){
                    if (data[i].id == this.form.parentCode) {
                        this.arrFathers.push(this.options[i].name)
                        this.form.parentCode=data[i].parentId;
                    }
                }
                if (this.form.parentCode==0){
                    return
                }else {
                    this.getFatherName(data);
                }

            },
            handleChange() {
                let arr=[];
                for (var i = 0; i < this.options.length; i++) {
                    if (this.options[i].id == this.form.parentCode) {
                        arr.push(this.options[i].name)
                    } else {
                        if (!this.checkNull(this.options[i].childList)) {
                            for (var j = 0; j < this.options[i].childList.length; j++) {
                                if (this.options[i].childList[j].id == this.form.parentCode) {
                                    arr.push(this.options[i].name)
                                    arr.push(this.options[i].childList[j].name)
                                } else {
                                    if (!this.checkNull(this.options[i].childList[j].childList)) {
                                        for (var k = 0; k < this.options[i].childList[j].childList.length; k++) {
                                            if (this.options[i].childList[j].childList[k].id == this.form.parentCode) {
                                                arr.push(this.options[i].name)
                                                arr.push(this.options[i].childList[j].name)
                                                arr.push(this.options[i].childList[j].childList[k].name)
                                            } else {
                                                if (!this.checkNull(this.options[i].childList[j].childList[k].childList)) {
                                                    for (var l = 0; l < this.options[i].childList[j].childList[k].childList.length; l++) {
                                                        if (this.options[i].childList[j].childList[k].childList[l].id == this.form.parentCode) {
                                                            arr.push(this.options[i].name)
                                                            arr.push(this.options[i].childList[j].name)
                                                            arr.push(this.options[i].childList[j].childList[k].name)
                                                            arr.push(this.options[i].childList[j].childList[k].childList[l].name)
                                                        } else {
                                                            if (!this.checkNull(this.options[i].childList[j].childList[k].childList[l].childList)) {
                                                                for (var m = 0; m < this.options[i].childList[j].childList[k].childList[l].childList.length; m++) {
                                                                    if (this.options[i].childList[j].childList[k].childList[l].childList[m].id == this.form.parentCode) {
                                                                        arr.push(this.options[i].name)
                                                                        arr.push(this.options[i].childList[j].name)
                                                                        arr.push(this.options[i].childList[j].childList[k].name)
                                                                        arr.push(this.options[i].childList[j].childList[k].childList[l].name)
                                                                        arr.push(this.options[i].childList[j].childList[k].childList[l].childList[m].name)
                                                                    }else {
                                                                        if (!this.checkNull(this.options[i].childList[j].childList[k].childList[l].childList[m].childList)) {
                                                                            for (var n = 0; n < this.options[i].childList[j].childList[k].childList[l].childList[m].childList.length; n++) {
                                                                                if (this.options[i].childList[j].childList[k].childList[l].childList[m].childList[n].id == this.form.parentCode) {
                                                                                    arr.push(this.options[i].name)
                                                                                    arr.push(this.options[i].childList[j].name)
                                                                                    arr.push(this.options[i].childList[j].childList[k].name)
                                                                                    arr.push(this.options[i].childList[j].childList[k].childList[l].name)
                                                                                    arr.push(this.options[i].childList[j].childList[k].childList[l].childList[m].name)
                                                                                    arr.push(this.options[i].childList[j].childList[k].childList[l].childList[m].childList[n].name)
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                    }
                }
                this.optionsChoiceString = arr.join(">")
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
                    name: '',//商品模板
                    categoryId: '',//所属类别
                    auditStatus: '',
                    shelfState: '',
                    spuCode:'',
                }
                this.queryListFn();
            },
            queryListFn() {
                MyPost('/liquor-product/spu/queryList', {
                    name: this.searchList.name,
                    categoryId: this.searchList.categoryId,
                    auditStatus: this.searchList.auditStatus,
                    shelfState: this.searchList.shelfState,
                    spuNumber: this.searchList.spuCode,
                    start: (this.currentPage - 1) * 10,
                    length: 10
                }).then((res) => {
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
            handleCurrentChange(val) {
                this.currentPage = val;
                this.queryListFn();
            },
            editClk(item) {
                if(item.shelfState=="2"){
                    this.$confirm("已上架商品不能编辑，请先下架", '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'error'
                    }).then(() => {
                        this.delShow = false;
                    }).catch(() => {
                        this.delShow = false;
                    });
                    return
                }
                this.$router.push({
                    path: '/addCommodityDetail',
                    query: {
                        optionString: item.categoryName,
                        optionId: item.categoryId,
                        edit: "2",
                        spuId: item.id
                    }
                })
            },
            goInfor(item) {
                this.loadingShow = true;
                let title = ""
                if (item.shelfState == "1") {
                    item.shelfState = "2";
                    // title = "下架成功"
                } else {
                    item.shelfState = "1";
                    // title = "上架成功"
                }
                let ids = [];
                ids.push(item.id);
                MyPost('/liquor-product/spu/isShelfStateBatch', {
                    shelfState: item.shelfState,
                    ids: ids
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.$message({
                            message: message,
                            type: 'success'
                        });
                        this.queryListFn();
                    } else {
                        if (item.shelfState == "1") {
                            item.shelfState = "2";
                        } else {
                            item.shelfState = "1";
                        }
                        this.$message.error(message);
                    }
                })

            },
            startALl(item) {
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
                    return item.id
                });
                let shelfState = "";
                if (item == "1") {
                    shelfState = "1";
                } else {
                    shelfState = "2";
                }
                MyPost('/liquor-product/spu/isShelfStateBatch', {
                    shelfState: shelfState,
                    ids: this.delIds
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.delIds = [];
                        this.$message({
                            message: message,
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
            delClk(item) {
                this.delId = item.id;
                this.delShow = true;
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
                this.delId = "";
                this.delIds = this.multipleTable.map(item => {
                    return item.id
                });
                this.delShow = true;
            },
            configClk() {
                this.loadingShow = true;
                if (this.checkNull(this.delId)) {
                } else {
                    this.delIds=[];
                    this.delIds.push(this.delId)
                }
                MyPost('/liquor-product/spu/delBatch', {
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
    @import "../../common/css/all.scss"
    .commodityList
        .el-input__inner {
            height: 28px;
            line-height: 28px;
        }
        .minW .el-dialog
            width 640px
            .el-cascader-menu
                min-width 140px
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
            .upload-demo-2
                display none
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
