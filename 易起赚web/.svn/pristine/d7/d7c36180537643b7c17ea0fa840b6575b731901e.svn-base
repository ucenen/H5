<template>
    <div class="brandExamine">
        <div class="nav-top">
            <div class="nav-box" @click="addBrand" v-if="functionCodes.indexOf('AD')>-1">
                <img src="../../framework/images/addNew.png"/>
                <p>新增</p>
            </div>
            <div class="nav-box" @click="delConfigAll" v-if="functionCodes.indexOf('DE')>-1">
                <img src="./icon-02.png"/>
                <p>删除</p>
            </div>
            <div class="nav-box" @click="reFresh" v-if="functionCodes.length>=0">
                <img src="./icon-04.png"/>
                <p>刷新</p>
            </div>
        </div>
        <div class="contain-mod">
            <div class="contain-top">
                <span class="search-btn" >品牌名称：</span>
                <el-input size="mini" @keyup.enter.native="queryListFnMall" maxlength="50" v-model="serachForm.name" class="w106 mr30"></el-input>
                <span class="search-btn">是否启用：</span>

                    <el-select class="w88 mr30" size="mini" v-model="serachForm.dataStatusVal" placeholder="是否启用">
                        <el-option
                                label="全部"
                                value="">
                        </el-option>
                        <el-option
                                v-for="item in dataStatusList"
                                :key="item"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                <span class="search-btn">所属分类：</span>

                        <el-cascader  class="w120 mr30"  :options="options" :props="props" :disabled="showDisable" v-model="serachForm.statusClassification" @change="getPropertyFn" :show-all-levels="false"></el-cascader>

                <span class="search-btn">速记码：</span>
                <el-input size="mini" @keyup.enter.native="queryListFnMall" maxlength="5" class="w88 mr30" v-model="serachForm.shorthandCode"></el-input>
                <el-button size="mini" type="primary" plain class="mr22" @click="queryListFnMall">查询</el-button>
                <!--<el-button size="mini" type="primary" plain class="mr22" @click="serachBoxShow = true">高级查询</el-button>-->
                <el-button size="mini" type="primary" @click="clearClk">清空</el-button>
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
                                prop="code"
                                label="品牌编号">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="品牌名称">
                        </el-table-column>
                        <el-table-column
                                label="品牌logo">
                            <template slot-scope="scope">
                                <el-image style="width: 40px;height: 40px" :src="scope.row.barndLogo" @click="showImage(scope.row.barndLogo)">
                                    <div slot="error" style="font-size: 40px;" class="image-slot">
                                        <i class="el-icon-picture-outline"></i>
                                    </div>
                                </el-image>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="orderNumber"
                                label="排序">
                        </el-table-column>
                        <el-table-column
                                label="是否启用">
                            <template slot-scope="scope">{{ scope.row.status == 1 ? '启用' : '禁用' }}</template>
                        </el-table-column>
                        <el-table-column
                                prop="supplierStr"
                                label="供应商">
                        </el-table-column>
                        <el-table-column
                                prop="categoryName"
                                label="所属分类">
                        </el-table-column>
                        <el-table-column
                                prop="firstLetter"
                                width="100"
                                label="速记码">
                        </el-table-column>
                        <el-table-column
                                width="120"
                                label="操作">
                            <template slot-scope="scope">
                                <span v-if="functionCodes.indexOf('ED')>-1" class="scope_btn color-blue" @click="changeBrand(scope.row)">编辑</span>
                                <span v-if="functionCodes.indexOf('DE')>-1" class="scope_btn " @click="delConfig(scope.row)">删除</span>
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
                    <el-form-item size="small" label="品牌名称：" prop="name">
                        <el-input v-model="form.name" maxlength="50" autocomplete="off"></el-input>
                    </el-form-item>
                </div>
                <el-form-item size="small" class="hundred" label="  品牌LOGO：">
                    <div class="upload-box">
                        <el-upload
                                v-if="elUploadBoolean"
                                class="upload-demo"
                                ref="upload"
                                :headers="headers"
                                :data="form"
                                :limit="1"
                                :file-list="form.files"
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
                        <div class="close_all" v-if="!elUploadBoolean">
                            <el-image style="width: 40px;height: 40px;border-radius: 40px" :src="form.barndLogo" @click="showImage(form.barndLogo)">
                                <div slot="error" style="font-size: 40px;" class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                </div>
                            </el-image>
                            <i @click="removeImage" style="font-size: 16px;position: absolute;right: -4px;top: -4px;" class="el-icon-circle-close"></i>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item size="small" label="排序：" >
                    <el-input type="tel"  @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" v-model="form.sort" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item size="small" label="是否启用：" >
                    <el-select v-model="form.dataStatusVal" placeholder="是否启用" style="width:100%">
                        <el-option
                                v-for="item in dataStatusList2"
                                :key="item"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="small" label="供应商：" prop="sort">
                    <el-select v-model="form.supplier" placeholder="请选择" style="width:100%">
                        <el-option
                                v-for="item in supplierLists"
                                :key="item"
                                :label="item.dictionaryValue"
                                :value="item.dictionaryKey">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="small" label="速记码：">
                    <el-input :maxlength="inputMaxL" v-model="form.firstLetter" autocomplete="off"></el-input>
                </el-form-item>
                <div class="new-other">
                    <el-form-item size="small" label="  所属分类：">
                        <el-cascader style="width:100%"
                                     v-model="form.parentCode"
                                     :options="data"
                                     :props="props"
                                     @change="handleChange"
                                     clearable></el-cascader>
                    </el-form-item>
                </div>

                <div class="new-other">
                    <el-form-item size="small" label="备注：">
                        <el-input type="textarea" :row="2" maxlength="30" v-model="form.memo" autocomplete="off"></el-input>
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
                <el-button size="small" type="primary" @click="delClk">确 定</el-button>
            </span>
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

        name: 'brandExamine',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                showImageBoolean:false,
                images:[],
                headers:{},
                rules:{
                    name: [
                        { required: true, message: '  ', trigger: 'blur' },
                    ],
                    sort: [
                        { required: true, message: '  ', trigger: 'change' },
                    ]
                },
                numberSort:"8",
                inputMaxL:"5",
                serachForm:{
                    dataStatusVal: '',//启用状态
                    name: '',//品牌名称
                    shorthandCode:'',//速记码
                    statusClassification:"",
                },
                props: {
                    value: 'id',
                    label: 'name',
                    children: 'childList',
                    checkStrictly: true,
                    emitPath: false
                },
                tableData: [],
                multipleSelection: [],
                form: {
                    name: '',//名称
                    dataStatusVal: '1',//是否启用值
                    memo: '',//描述
                    supplier:'',
                    barndLogo:'',
                    sort:'',
                    firstLetter:'',
                    files: [],
                    parentCode:"0",
                },
                elUploadBoolean:true,
                loadingShow: false,
                loadingText: '正在加载中...',
                dataStatusList: [
                    {
                        label: '启用',
                        value: '1'
                    },
                    {
                        label: '禁用',
                        value: '2'
                    }
                ],
                dataStatusList2: [
                    {
                        label: '启用',
                        value: '1'
                    },
                    {
                        label: '禁用',
                        value: '2'
                    }
                ],

                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                page_show: true,//分页显示
                mineStatus: "",//关联分类值中文
                mineStatusValue: [],//关联分类值
                data: [],
                defaultProps: {
                    children: 'childList',
                    label: 'name'
                },
                serachBoxShow: false,//修改品牌弹窗显示
                formLabelWidth: '120px',
                titData: '新增品牌',
                changeId: 0,
                delId: 0,
                delIds:[],
                multipleTable:"",
                delShow: false,
                supplierLists:[],
                options: [],
                functionCodes:[],
            }
        },
        created() {
            this.$store.state.navTit = '商品';
            this.$store.state.navChildTit = '商品品牌';
            this.headers={
                token:store.get('tokenVal')
            };
            this.getFunctionCode(this,this.$route.query.code);
            this.queryListFn();
            this.categoryListFn();
            this.getSupplier();
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
            removeImage(){
                this.form.barndLogo="";
                this.elUploadBoolean=true;
            },
            handleSelectionChange(val) {
                this.multipleTable = val;
            },
            handleChange(value) {

            },
            submitUpload() {
                this.$refs.upload.submit();
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
                return isLt2M;
                this.form.files.push(file);
            },
            uploadSuccess(response, file, fileList) {
                this.$message({
                    message: '上传成功',
                    type: 'success'
                });
                 this.form.barndLogo=response.data;
                 this.elUploadBoolean=false;
            },
            onRemove(file,fileList){
                this.form.barndLogo="";
            },
           clearClk() {
               this.currentPage = 1 ;
               this.serachForm={
                   dataStatusVal: '',//启用状态
                   name: '',//品牌名称
                   shorthandCode:'',//速记码
                   statusClassification:"",
               };
               this.queryListFn();
            },
            delConfig(item) {
                this.delId = item.id;
                this.delShow = true;
            },
            delConfigAll(id) {
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
                this.delId="";
                this.delIds = this.multipleTable.map(item => {
                    return item.id;
                });
                this.delShow = true;
            },
            delClk() {
                this.loadingShow = true;
                if (this.checkNull(this.delId)){

                }else {
                    this.delIds=[];
                    this.delIds.push(this.delId)
                }
                MyPost('/liquor-product/brand/delBatch', {
                    ids: this.delIds
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.delIds =[];
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.delShow = false;
                        this.queryListFn();
                        this.categoryListFn();
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
            reFresh() {
                this.serachForm={
                        dataStatusVal: '',//启用状态
                        name: '',//品牌名称
                        shorthandCode:'',//速记码
                        statusClassification:"",
                };
                this.queryListFn();
            },
            changeBrand(item) {
                this.titData = '编辑品牌';
                this.form={
                        name: item.name,//名称
                        dataStatusVal: item.status,//是否启用值
                        memo: item.memo,//描述
                        supplier:item.supplier,
                        barndLogo:item.barndLogo,
                        sort:item.orderNumber,
                        firstLetter:item.firstLetter,
                        parentCode:item.categoryId,
                        files: [],
                };
                if (!this.checkNull(item.barndLogo)){
                    // this.form.files.push({
                    //     url:item.barndLogo
                    // })
                    this.elUploadBoolean=false;
                }else {
                    this.elUploadBoolean=true;
                }
                this.serachBoxShow = true;
                this.changeId = item.id;
                // this.brandCategoryFn(item.id);
            },
            addBrand() {
                this.titData = '新增品牌';
                this.form = {
                        name: '',//名称
                        dataStatusVal: '1',//是否启用值
                        memo: '',//描述
                        supplier:'',
                        barndLogo:'',
                        sort:'',
                        firstLetter:'',
                        files: [],
                        parentCode:"0",
                };
                this.elUploadBoolean=true;
                this.serachBoxShow = true;
            },
            addBrandClk() {
                if (this.form.name == '') {
                    return this.$message.error('请填写品牌名称');
                }
                if (this.form.supplier == '') {
                    return this.$message.error('请填写供应商');
                }
                this.loadingShow = true;
                if (this.titData == '新增品牌') {
                    MyPost('/liquor-product/brand/add', {
                        name: this.form.name,
                        barndLogo:this.form.barndLogo,
                        categoryId: this.form.parentCode,
                        orderNumber:this.form.sort,
                        memo: this.form.memo,
                        supplier:this.form.supplier,
                        firstLetter:this.form.firstLetter,
                        status: this.form.dataStatusVal
                    }).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.$message({
                                message: message,
                                type: 'success'
                            });
                            this.serachBoxShow = false;
                            this.queryListFn();
                            this.categoryListFn();
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
                } else {
                    MyPost('/liquor-product/brand/upd', {
                        name: this.form.name==null?"":this.form.name,
                        barndLogo:this.form.barndLogo==null?"":this.form.barndLogo,
                        orderNumber:this.form.sort==null?"":this.form.sort,
                        categoryId: this.form.parentCode==null?"":this.form.parentCode,
                        memo: this.form.memo==null?"":this.form.memo,
                        supplier:this.form.supplier==null?"":this.form.supplier,
                        firstLetter:this.form.firstLetter==null?"":this.form.firstLetter,
                        status: this.form.dataStatusVal==null?"":this.form.dataStatusVal,
                        id:this.changeId,
                    }).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.$message({
                                message: message,
                                type: 'success'
                            });
                            this.serachBoxShow = false;
                            this.queryListFn();
                            this.categoryListFn();
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
                }
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
            categoryListFn() {
                var that=this;
                MyGet('/liquor-product/category/categoryList').then((res) => {
                    // that.getSupplier();
                    let {code, message, data} = res;
                    if (code == '0') {
                        that.data = this.deleteChildren(data);
                        that.options=this.deleteChildren(data);
                    } else {
                        that.$message.error(message);
                    }
                })
            },
            getSupplier(){
                var that=this;
                MyGet('/liquor-product/brand/getDictionaryList').then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        that.supplierLists = data;
                    } else {
                        that.$message.error(message);
                    }
                })
            },
            queryListFnMall(){
                this.currentPage = 1 ;
                this.queryListFn();
            },
            queryListFn() {

                MyGet('/liquor-product/brand/queryList', {
                    status: this.serachForm.dataStatusVal,
                    name: this.serachForm.name,
                    categoryId:this.serachForm.statusClassification,
                    firstLetter:this.serachForm.shorthandCode,
                    start: (this.currentPage - 1) * 10,
                    length: 10
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.tableData = data.data;
                        this.totalRecord = data.recordsTotal;
                        if (data.data.length == 0) {
                            this.page_show = false;
                        } else {
                            this.page_show = true;
                        }
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
            selectChange(e) {
                var arrNew = [];
                var dataLength = this.mineStatusValue.length;
                var eleng = e.length;
                for (let i = 0; i < dataLength; i++) {
                    for (let j = 0; j < eleng; j++) {
                        if (e[j] === this.mineStatusValue[i].name) {
                            arrNew.push(this.mineStatusValue[i])
                        }
                    }
                }
                this.mineStatusValue = arrNew;
                this.$refs.tree.setCheckedNodes(arrNew);//设置勾选的值
            },
            handleCheckChange() {
                let res = this.$refs.tree.getCheckedNodes(true, false); //这里两个true，1. 是否只是叶子节点 2. 是否包含半选节点（就是使得选择的时候不包含父节点）
                let arrLabel = [];
                let arr = [];
                res.forEach(item => {
                    arrLabel.push(item.name);
                    arr.push(item);
                });
                this.mineStatusValue = arr;
                this.mineStatus = arrLabel;
            },

            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },

            goInfor() {
                this.$router.push({
                    path: '/enterpriseInfor'
                })
            },
            goPage() {
                this.$router.push({
                    path: '/addEnterprise'
                })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/css/all.scss"
    .el-select-dropdown__item.hover
        background #fff

    .brandExamine
        .el-input__inner {
            height: 28px;
            line-height: 28px;
        }
        .tip-contain
            padding 20px
            p
                font-size 12px
                line-height 30px
                text-align center
                span
                    color #C13A3C
        .minW .el-dialog
            width 640px
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
                    /*margin-right 22px*/
                .el-button + .el-button
                    margin-bottom 15px
            .result-con
                padding-bottom 100px
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
                    margin-bottom 148px
                    float right
                    overflow hidden
                    margin-top 5px
            .tabs-mod
                height 30px
                margin-bottom 14px
</style>
