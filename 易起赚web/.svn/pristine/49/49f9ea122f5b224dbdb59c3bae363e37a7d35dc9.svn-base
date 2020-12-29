<template>
    <div class="commodityList">
        <div class="nav-top">
            <div class="nav-box" @click="goPage" v-if="functionCodes.indexOf('AD')>-1">
                <img src="../../framework/images/addNew.png"/>
                <p>新增</p>
            </div>
            <div class="nav-box" @click="delClkAll" v-if="functionCodes.indexOf('DE')>-1">
                <img src="./icon-02.png"/>
                <p>删除</p>
            </div>
            <div class="nav-box" @click="startALl('1')" v-if="functionCodes.indexOf('QYJY')>-1">
                <img src="./start-01.png"/>
                <p>启用</p>
            </div>
            <div class="nav-box" @click="startALl('2')" v-if="functionCodes.indexOf('QYJY')>-1">
                <img src="./start-02.png"/>
                <p>禁用</p>
            </div>
            <div class="nav-box" @click="clearFn" v-if="functionCodes.length>=0">
                <img src="./icon-04.png"/>
                <p>刷新</p>
            </div>
        </div>
        <div class="contain-mod">
            <div class="contain-top">
                <span class="search-btn hidden-md-and-down">SKU编号：</span>
                <el-input size="mini" @keyup.enter.native="queryListFnMall" maxlength="50" class="w120 mr30 hidden-md-and-down" v-model="searchList.skuCode"></el-input>
                <span class="search-btn">SKU名称：</span>
                <el-input size="mini" @keyup.enter.native="queryListFnMall" maxlength="50" class="w140 mr30" v-model="searchList.name"></el-input>
                <span class="search-btn">SPU编号：</span>
                <el-input size="mini" @keyup.enter.native="queryListFnMall" maxlength="50" class="w120 mr30" v-model="searchList.spuCode"></el-input>
                <span class="search-btn">是否启用：</span>
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
                                label="未启用"
                                value="2">
                        </el-option>
                    </el-select>
                <el-button v-if="functionCodes.indexOf('SL')>-1" size="mini" type="primary" plain class="mr22" @click="queryListFnMall">查询</el-button>
                <el-button  size="mini" type="primary" @click="clearFn">清空</el-button>
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
                                prop="sku"
                                label="SKU编号">
                        </el-table-column>
                        <el-table-column
                                prop="productName"
                                label="SKU名称">
                        </el-table-column>
                        <el-table-column
                                width="100"
                                label="SKU主图">
                            <template slot-scope="scope">
                                <el-image style="width: 40px;height: 40px;" :src="scope.row.url" @click="showImage(scope.row.url)">
                                    <div slot="error" style="font-size: 40px;" class="image-slot">
                                        <i class="el-icon-picture-outline"></i>
                                    </div>
                                </el-image>
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="120"
                                prop="categoryName"
                                label="SKU类别">
                        </el-table-column>
                        <!--<el-table-column-->
                                <!--label="SKU状态">-->
                            <!--<template slot-scope="scope">{{ scope.row.auditStatus == 1 ? '已提交' : '待提交' }}</template>-->
                        <!--</el-table-column>-->
                        <el-table-column
                                width="80"
                                label="是否启用">
                            <template slot-scope="scope">{{ scope.row.isOpen == 1 ? '已启用' : '未启用' }}</template>
                        </el-table-column>
                        <el-table-column
                                width="160"
                                prop="spuNumber"
                                label="SPU编号">
                        </el-table-column>
                        <el-table-column
                                width="150"
                                label="操作">
                            <template slot-scope="scope">
                                <!--scope.row-->
                                <span v-if="functionCodes.indexOf('ED')>-1" class="scope_btn color-blue" @click="editClk(scope.row)">编辑</span>
                                <span v-if="functionCodes.indexOf('DE')>-1" class="scope_btn" @click="delClk(scope.row)">删除</span>
                                <span v-if="functionCodes.indexOf('QYJY')>-1" class="scope_btn color-blue color-under-line"
                                      @click="goInfor(scope.row)">{{ scope.row.isOpen == 1 ? '禁用' : '启用' }}</span>
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
                   class="minW"
                   :visible.sync="addBoxShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="add-contain" style="padding: 0 20px">
                <div class="contain-top">
                    <span class="search-btn hidden-md-and-down">SPU编号：</span>
                    <el-input size="mini" @keyup.enter.native="queryListDialogFnMall" maxlength="50" class="w106 mr30 hidden-md-and-down" v-model="searchListAll.spuCode"></el-input>
                    <span class="search-btn">商品名称：</span>
                    <el-input size="mini" maxlength="50" @keyup.enter.native="queryListDialogFnMall" class="w106 mr30" v-model="searchListAll.name"></el-input>
                    <span class="search-btn hidden-lg-and-down">商品类别：</span>
                    <el-cascader  class="w106 mr30 hidden-lg-and-down" @keyup.enter.native="queryListDialogFnMall"  :options="options" :props="props"  v-model="searchListAll.skuCode" @change="getPropertyFn" :show-all-levels="false"></el-cascader>

                    <span class="search-btn">商品状态：</span>

                        <el-select class="w88 mr30" size="mini" placeholder="全部" v-model="searchListAll.skuStatus">
                            <el-option
                                    v-for="item in getAllCategoryList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    <span class="search-btn">上架状态：</span>

                        <el-select class="w88 mr30" size="mini" placeholder="全部" v-model="searchListAll.status">
                            <el-option
                                    label="全部"
                                    value="">
                            </el-option>
                            <el-option
                                    label="下架"
                                    value="1">
                            </el-option>
                            <el-option
                                    label="上架"
                                    value="2">
                            </el-option>
                        </el-select>

                    <el-button size="mini" type="primary" plain class="mr22" @click="queryListDialogFnMall">查询</el-button>
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
                                    width="35">
                                <template scope="scope">
                                    <el-radio :label="scope.row.id" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)"></el-radio>
                                </template>

                            </el-table-column>
                            <el-table-column
                                    width="160"
                                    prop="spuNumber"
                                    label="SPU编号">
                            </el-table-column>
                            <el-table-column
                                    width="240"
                                    prop="spuName"
                                    label="商品名称">
                            </el-table-column>
                            <el-table-column
                                    label="商品主图">
                                <template slot-scope="scope">
                                    <el-image style="width: 40px;height: 40px" :src="scope.row.imageUrl" @click="showImage(scope.row.imageUrl)">
                                        <div slot="error" style="font-size: 40px;" class="image-slot">
                                            <i class="el-icon-picture-outline"></i>
                                        </div>
                                    </el-image>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="categoryName"
                                    label="商品类别">
                            </el-table-column>
                            <el-table-column
                                    label="商品状态">
                                <template slot-scope="scope">{{ scope.row.auditStatus == 1 ? '待提交' : '已提交' }}</template>
                            </el-table-column>
                            <el-table-column
                                    label="上架状态">
                                <template slot-scope="scope">{{ scope.row.shelfState == 1 ? '下架' : '上架' }}</template>
                            </el-table-column>
                            <el-table-column
                                    prop="skuCount"
                                    label="SKU数">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="pagenum_mod" v-if="page_showDialog">
                        <el-pagination
                                background
                                class="pageination_css"
                                @current-change="handleCurrentDialogChange"
                                :current-page="currentDialogPage"
                                :page-size="10"
                                layout="total, prev, pager, next, jumper"
                                :total="totalDialogRecord">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="addBoxShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="addBrandClk">下一步</el-button>
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
                showImageBoolean:false,
                images:[],
                templateRadio:"",
                searchList: {
                    spuCode: "",
                    skuStatus: "",
                    skuCode: "",
                    status: "",
                    name: "",//商品名称
                    categoryId: ""//所属类别
                },
                tableDialogData:[],
                titData:"选择商品",
                addBoxShow:false,
                loadingShow: false,
                loadingText: '正在加载中...',
                tableData: [],
                page_show: true,//分页显示
                page_showDialog:true,
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                currentDialogPage:1,
                totalDialogRecord:0,
                searchListAll: {
                    spuCode: "",
                    skuStatus: "",
                    skuCode: "",
                    status: "",
                    name: "",//商品模板
                    categoryId: ""//所属类别
                },
                getAllCategoryList: [
                    {
                        label: '全部',
                        value: ''
                    },
                    {
                        label: '已提交',
                        value: '2'
                    },
                    {
                        label: '待提交',
                        value: '1'
                    }
                ],
                delShow: false,
                delId: '',
                delIds: [],
                multipleTable: "",
                multipleTableDialog:"",
                props: {
                    value: 'id',
                    label: 'name',
                    children: 'childList',
                    checkStrictly: true,
                    emitPath: false
                },
                spuIdString:"",
                functionCodes:[],
            }
        },
        created() {
            this.functionCodes=[];
            this.$store.state.navTit = '商品';
            this.$store.state.navChildTit = 'SKU管理';
            this.getFunctionCode(this,this.$route.query.code);
            this.queryListFn();
            this.getAllCategoryListFn();
        },
        methods: {
            showImage (src) {
                if(this.checkNull(src)){
                    return;
                }
                this.images=[];
                this.images.push(src)
                const viewer = this.$el.querySelector('.images').$viewer
                viewer.show()
            },
            getTemplateRow(index,row){
             this.spuIdString=row;
            },
            clearDialogFn() {
                this.currentDialogPage=1;
                this.searchListAll = {
                    spuCode: "",
                    skuStatus: "",
                    skuCode: "",
                    status: "",
                    name: "",//商品模板
                    categoryId: ""//所属类别
                }
                this.queryListDialogFn();
            },
            queryListDialogFnMall(){
                this.currentDialogPage = 1 ;
                this.queryListDialogFn();
            },
            queryListDialogFn() {
                this.loadingShow = true;
                MyPost('/liquor-product/spu/queryList', {
                    auditStatus: this.searchListAll.skuStatus,
                    categoryId: this.searchListAll.skuCode,
                    name:this.searchListAll.name,
                    shelfState:this.searchListAll.status,
                    spuNumber:this.searchListAll.spuCode,
                    start: (this.currentDialogPage - 1) * 10,
                    length: 10
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.tableDialogData= data.data;
                        if (data.data.length == 0) {
                            this.page_showDialog = false;
                        } else {
                            this.page_showDialog = true;
                        }
                        this.totalDialogRecord = data.recordsTotal;
                    } else {
                        this.page_showDialog = false;
                        this.$message.error(message);
                    }
                })
            },
            handleSelectionDialogChange(val){
                this.multipleTableDialog = val;
            },
            handleSelectionChange(val) {
                this.multipleTable = val;
            },
            getAllCategoryListFn() {
                MyGet('/liquor-product/category/categoryList').then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.options=this.deleteChildren(data);
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
                this.currentPage=1;
                this.searchList = {
                    spuCode: "",
                    skuStatus: "",
                    skuCode: "",
                    status: "",
                    name: "",//商品模板
                    categoryId: ""//所属类别
                }
                this.queryListFn();
            },
            startALl(item) {
                if (this.multipleTable.length == 0) {
                    this.$confirm('请先勾选记录，再进行操作', '提示', {
                        confirmButtonText: '确定',
                        showCancelButton:false,
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
                let isOpen = "";
                if (item == "1") {
                    isOpen = "1";
                } else {
                    isOpen = "2";
                }
                MyPost('/liquor-product/sku/isOpenBatch', {
                    isOpen: isOpen,
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
                            showCancelButton:false,
                            type: 'error'
                        }).then(() => {
                            this.delShow = false;
                        }).catch(() => {
                            this.delShow = false;
                        });
                    }
                })
            },
            queryListFnMall(){
                this.currentPage = 1 ;
                this.queryListFn();
            },
            queryListFn() {
                MyPost('/liquor-product/sku/queryList', {
                    productName: this.searchList.name,
                    sku: this.searchList.skuCode,
                    auditStatus: this.searchList.skuStatus,
                    spuNumber: this.searchList.spuCode,
                    isOpen: this.searchList.status,
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
            handleCurrentDialogChange(val) {
                this.currentDialogPage = val;
                this.queryListDialogFn();
            },
            goInfor(item) {
                this.loadingShow = true;
                if (item.isOpen == "1") {
                    item.isOpen = "2";
                } else {
                    item.isOpen = "1";
                }
                this.delIds.push(item.id)
                MyPost('/liquor-product/sku/isOpenBatch', {
                    isOpen: item.isOpen,
                    ids: this.delIds
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.$message({
                            message: message,
                            type: 'success'
                        });
                    } else {
                        if (item.isOpen == "1") {
                            item.isOpen = "2";
                        } else {
                            item.isOpen = "1";
                        }
                        this.$message.error(message);
                    }
                })
            },
            getSpuDetail(){
                MyPost('/liquor-product/spu/queryById', {
                    id:this.spuId
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        //平台信息
                        this.searchList={
                            optionId:this.$route.query.categoryId,
                            brandId: data.spu.brandId,//品牌Id
                            brandName: data.spu.brandName,//品牌名称
                            categoryId: this.$route.query.categoryId,//分类ID
                            categoryName: data.spu.categoryName,//分类名称
                            keyword: data.spu.keyword,//商品关键词
                            phoneRichText: "",
                            otherProperties:[],
                            otherPropertiesName: [],
                            productionAddress: "",
                            properties:[],
                            propertiesName: [],
                            rawMaterial: "",
                            richText: data.spu.richText,
                            sharingDes: data.spu.sharingDes,
                            spuDetails: "",
                            spuIntroduce: '',
                            spuName: data.spu.spuName,
                            title: data.spu.title,
                            valueCount: "",
                            memo: '',//平台描述
                            afterSalesService:data.spu.afterSalesService,
                        }
                        if (!this.checkNull(data.spu.afterSalesService)){
                            this.searchList.checkedCities=data.spu.afterSalesService.split(",")
                            for(var i=0;i<this.searchList.checkedCities.length;i++){
                                this.searchList.checkedCities[i]=Number(this.searchList.checkedCities[i]);
                            }
                        }
                        if (!this.checkNull(data.spu.otherProperties)){
                            this.searchList.otherProperties=data.spu.otherProperties.split(",");
                            for(var i=0;i<this.searchList.otherProperties.length;i++){
                                this.searchList.otherProperties[i]=Number(this.searchList.otherProperties[i]);
                            }
                        }
                        if (!this.checkNull(data.spu.properties)){
                            this.searchList.properties=data.spu.properties.split(",");
                            for(var i=0;i<this.searchList.properties.length;i++){
                                this.searchList.properties[i]=Number(this.searchList.properties[i]);
                            }
                        }
                        this.newform.fileAllImages=data.spuImage;
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            editClk(item) {
                // console.log("item:" + JSON.stringify(item))
                MyPost('/liquor-product/spu/queryById', {
                    id:item.spuId
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.$router.push({
                            path: '/addSkuDetail',
                            query:{
                                id:item.spuId,
                                skuId:item.id,
                                typeStyle:"2",
                                edit:"2",
                                categoryId:data.spu.categoryId,
                            }
                        })
                    } else {
                        this.$message.error(message);
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
                        showCancelButton:false,
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
                MyPost('/liquor-product/sku/delBatch', {
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
                            showCancelButton:false,
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
                this.addBoxShow=true;
                this.queryListDialogFn()
                // this.$router.push({
                //     path: '/addSku'
                // })
            },
            addBrandClk(){
                if (this.checkNull(this.spuIdString)) {
                    return this.$message.error('请选择商品');
                }
                this.$router.push({
                    path: '/addSkuDetail',
                    query:{
                        id:this.spuIdString.id,
                        typeStyle:"1",
                        categoryId:this.spuIdString.categoryId,
                        edit:"1",
                    }
                })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/css/all.scss"
    .commodityList

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
            padding-top 45px !important

            .contain-top
                overflow hidden
                /*margin-top 5px*/
                /*margin-bottom 15px*/
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
                .w140
                    width 140px
                .w96
                    width 96px
                .w80
                    width 80px
                .w88
                    width 88px
                .w90
                    width 90px
                .w100
                    width 100px
                .mr30
                    margin-right 30px

                .mr22
                    margin-right 22px

            .result-con
                padding-bottom 40px
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
                    /*font-weight 550*/
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
                    margin-top 5px
</style>
