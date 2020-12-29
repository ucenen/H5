<template>
    <div class="categoryManagement">
        <div class="nav-top">
            <div class="nav-box" @click="addClk"  v-if="functionCodes.indexOf('AD')>-1">
                <img src="../../framework/images/addNew.png"/>
                <p>新增</p>
            </div>
            <div class="nav-box" @click="delConfigAll"  v-if="functionCodes.indexOf('DE')>-1">
                <img src="./icon-02.png"/>
                <p>删除</p>
            </div>
            <div class="nav-box" @click="clearClk" v-if="functionCodes.length>=0">
                <img src="./icon-04.png"/>
                <p>刷新</p>
            </div>
        </div>
        <div class="contain-mod">
            <div class="contain-top">
                <span class="search-btn">属性名称：</span>
                <el-input size="mini" @keyup.enter.native="queryListFnMall" maxlength="50" v-model="contentForm.name" class="w120 mr30"></el-input>
                <span class="search-btn">属性类型：</span>

                    <el-select class="w100 mr30" size="mini" v-model="contentForm.dataStatusType" placeholder="属性类型">
                        <el-option
                                label="全部"
                                value="4">
                        </el-option>
                        <el-option
                                v-for="item in dataStatusListAttr"
                                :key="item"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>


                <el-button size="mini" type="primary" plain class="mr22" @click="queryListFnMall">查询</el-button>
                <el-button size="mini" type="primary" class="mr22" @click="clearClk">清空</el-button>
            </div>
            <div class="result-con-2">
                <div class="pic-contain-mod">
                    <div class="pic-l-mod">
                        <h3>分类结构表</h3>
                        <el-tree :data="categoryList"
                                 ref="treeBox"
                                 node-key="id"
                                 class="pic-tree"
                                 :props="defaultProps"
                                 :default-expand-all="true"
                                 :expand-on-click-node="false"
                                 :highlight-current="true"
                                 @node-click="handleNodeClick"></el-tree>
                        <!--<div class="add-tree-box">-->
                            <!--<img @click="addClk" src="./pic-icon3.png"/>-->
                        <!--</div>-->
                    </div>
                    <div class="pic-r-mod">
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
                                        label="属性编号">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="属性名称">
                                </el-table-column>
                                <el-table-column
                                        prop="categoryName"
                                        label="所属分类">
                                </el-table-column>
                                <el-table-column
                                        prop="order"
                                        label="排序">
                                </el-table-column>
                                <el-table-column
                                        label="属性类型">
                                    <template slot-scope="scope">{{ scope.row.type == '1' ? '基础属性' :scope.row.type == 2 ?'规格属性':'其他属性' }}</template>
                                </el-table-column>
                                <el-table-column
                                        prop="value"
                                        label="可选值">
                                </el-table-column>
                                <el-table-column
                                        width="120"
                                        label="操作">
                                    <template slot-scope="scope">
                                        <span  v-if="functionCodes.indexOf('ED')>-1">
                                            <span  class="scope_btn color-blue" @click="changClk(scope.row)">编辑</span>
                                        </span>
                                        <span v-if="functionCodes.indexOf('DE')>-1">
                                            <span  class="scope_btn " @click="delConfig(scope.row)">删除</span>
                                        </span>

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
        <el-dialog :title="titleVal"
                   width="40%"
                   class="minW"
                   :visible.sync="addBoxShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="add-contain">
                <el-form :model="addform" :rules="rules" ref="ruleForm" :label-width="formLabelWidth">
                    <div class="new-other">
                    <el-form-item size="small" label="属性名称：" prop="name">
                        <el-input maxlength="50" v-model="addform.name" autocomplete="off"></el-input>
                    </el-form-item>
                    </div>
                    <div class="new-other">
                        <el-form-item size="small" label="所属分类：" prop="category">
                            <el-cascader   :options="options" :props="props" :disabled="showDisable" v-model="addform.categoryId" @change="getPropertyFn"></el-cascader>
                        </el-form-item>
                    </div>
                    <el-form-item size="small" label="排序：" prop="sort">
                        <el-input  type="tel"  @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)"
                        v-model="addform.order" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="属性类型：" prop="type">
                        <el-select v-model="addform.type" :disabled="showDisable" style="width:100%">
                            <el-option
                                    v-for="item in dataStatusListAttr"
                                    :key="item"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div class="new-other">
                    <el-form-item size="small" class="hundred" label="  属性可选值列表：" :label-width="formLabelWidth">
                        <el-input
                                type="textarea"
                                :rows="2"
                                @keyup.enter.native="addAnswer"
                                placeholder="请输入内容"
                                maxlength="30"
                                v-model="addform.textarea">
                        </el-input>
                        <div class="textarea-css-1">
                            <div :class="editIndex==index ? 'textarea-css-2 on-active' : 'textarea-css-2'" v-for="(item,index) in textareaLists">
                                <span  style="cursor: pointer" @click="joinValue(item,index)">{{item.value}}</span>
                                <i style="cursor: pointer" @click="deleteValue(item,index)" class="el-icon-circle-close"></i>
                            </div>
                        </div>
                    </el-form-item>
                    </div>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="addBoxShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="saveFn">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import store from 'si-store'
    import {MyGet, MyPost, MyPostJson} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../footerbar/footerbar.vue'

    export default {
        name: 'categoryManagement',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                rules:{
                    name: [
                        { required: true, message: ' ', trigger: 'blur' },
                    ],
                    category: [
                        { required: true, message: ' ', trigger: 'change' },
                    ],
                    type: [
                        { required: true, message: ' ', trigger: 'change' },
                    ],
                    sort: [
                        { required: true, message: ' ', trigger: 'blur' },
                    ]
                },
                statusYes:false,
                loadingShow: false,
                loadingText: '正在加载中...',
                categoryList: [],
                defaultProps: {
                    children: 'childList',
                    label: 'name'
                },
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
                dataStatusListAttr: [
                    {
                        label: '基础属性',
                        value: '1'
                    },
                    {
                        label: '规格属性',
                        value: '2'
                    },
                    {
                        label: '其他属性',
                        value: '3'
                    }
                ],
                contentForm:{
                  name:"",
                  dataStatusVal:"",
                  dataStatusType:"4",
                },
                dataStatusVal: '',//启用状态
                name: '',//分类名称
                childId: '',//当前id
                showDisable:false,
                tableData: [],
                addform: {
                    categoryId:0,
                    name: '',//分类名称
                    order:"",
                    type:"",
                    memo: '',//分类描述
                    status: '',//排序
                    parentName: '',//上级分类
                    textarea:"",
                },
                titleVal: '新增属性',
                selfId: '',
                delId: '',
                page_show: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                formLabelWidth: '120px',
                delShow: false,
                addBoxShow: false,
                multipleTable:"",
                options: [],
                textareaLists:[],
                editTextarea:"1",
                editIndex:10000,
                props: {
                    value: 'id',
                    label: 'name',
                    children: 'childList',
                    checkStrictly: true,
                    emitPath: false
                },
                delIds:[],
                delId:"",
                delIdType:"1",
                leftBoolean:true,
                functionCodes:[],
            }
        },
        created() {
            this.$store.state.navTit = '商品';
            this.$store.state.navChildTit = '商品属性';
            this.getFunctionCode(this,this.$route.query.code);
            this.categoryListFn();
        },
        methods: {
            joinValue(item,index){
                this.editTextarea="2";
                this.editIndex=index;
                this.addform.textarea=item.value
            },

            deleteValue(item,index){
                this.textareaLists.splice(index,1)
                if (index==this.editIndex&&this.textareaLists.length>0){
                     this.addform.textarea=this.textareaLists[0].value;
                     this.editIndex=0;
                }else {
                    this.addform.textarea="";
                }
            },
            handleSelectionChange(val) {
                this.multipleTable = val;
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            uploadBefore(file) {
                // 上传之前
                let types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png'];

                const isImage = types.includes(file.type);
                if (!isImage) {

                    this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!');

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
                MyPost('/yl-ms-platform/functionApi/ajaxAddIcon', {
                    url: response.data,
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.$message({
                            message: '上传成功',
                            type: 'success'
                        });
                        this.uploadShow = false;
                        this.getImageList();
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
            categoryListFn() {
                MyGet('/liquor-product/category/categoryListIsOpen').then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        if(this.checkNull(data)){
                            return
                        }
                        this.options = this.deleteChildren(data);
                        this.categoryList = data;
                        if (!this.childId){
                            this.childId = data[0].id;
                        }
                        this.addform.parentName = data[0].name;
                        this.$nextTick(() => {
                            this.$refs.treeBox.setCurrentKey(this.childId); // treeBox 元素的ref   value 绑定的node-key
                        });
                        this.queryListFn();
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            handleNodeClick(data) {
                this.currentPage=1;
                this.leftBoolean=true;
                this.childId = data.id;
                this.addform.parentName = data.name;
                this.queryListFn();
            },
            queryListFn() {
                MyPost('/liquor-product/property/queryList', {
                    categoryId:this.childId,
                    name: "",
                    type: "4",
                    start: (this.currentPage - 1) * 10,
                    length: 10
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.tableData = data.data;
                        this.totalRecord = data.recordsTotal;
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            queryListFnMall(){
                this.currentPage = 1 ;
                this.queryListFnCha();
            },
            queryListFnCha() {
                this.leftBoolean=false;
                this.loadingShow = true;
                MyPost('/liquor-product/property/queryList', {
                    categoryId:"",
                    name: this.contentForm.name,
                    type: this.contentForm.dataStatusType,
                    start: (this.currentPage - 1) * 10,
                    length: 10
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.tableData = data.data;
                        this.totalRecord = data.recordsTotal;
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            addAnswer(){
                if (this.addform.textarea.replace(/\n/g,"")==""){
                    this.editTextarea="1";
                    this.editIndex=10000;
                    return this.$message.error("请输入属性可选值");
                }
                if (this.clearDouble(this.textareaLists,this.addform.textarea.replace(/\n/g,""))){
                    this.editTextarea="1";
                    this.editIndex=10000;
                    this.addform.textarea="";
                    return this.$message.error("属性值已存在");
                }
                if (this.editTextarea=="1"){
                    this.textareaLists.push({
                        id:"",
                        value: this.addform.textarea.replace(/\n/g,"")
                        });
                    this.addform.textarea="";
                }else {
                    this.textareaLists[this.editIndex].value=this.addform.textarea.replace(/\n/g,"");
                    this.addform.textarea="";
                    this.editTextarea="1";
                }
            },
            saveFn() {
                if (!this.addform.name) {
                    this.$message.error('请输入属性名称');
                    return
                }
                if(!this.addform.categoryId){
                    this.$message.error('请选择分类');
                    return
                }
                if (!this.addform.order) {
                    this.$message.error('请输入排序');
                    return
                }
                if(!this.addform.type){
                    this.$message.error('请选择属性类型');
                    return
                }
                let categoryIdList=[];
                categoryIdList.push(this.addform.categoryId);
                let valueList=this.textareaLists;
                let all={
                    categoryIdList: categoryIdList,
                    name : this.addform.name,
                    order: this.addform.order,
                    type:this.addform.type,
                    memo: this.addform.memo,
                    id:this.selfId,
                    status: 0,
                    valueList: valueList
                };
                if (this.titleVal == '新增属性') {
                    this.loadingShow = true;
                    MyPostJson('/liquor-product/property/save', all).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.addBoxShow = false;
                            this.$message({
                                message: message,
                                type: 'success'
                            });
                            this.childId=this.addform.categoryId;
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
                    this.loadingShow = true;
                    MyPostJson('/liquor-product/property/upd', all).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.addBoxShow = false;
                            this.$message({
                                message: message,
                                type: 'success'
                            });
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
            handleCurrentChange(val) {
                this.currentPage = val;
                if (this.leftBoolean){
                    this.queryListFn();
                }else {
                    this.queryListFnCha()
                }
            },
            addClk() {
                this.titleVal = '新增属性';
                this.addform= {
                       categoryId:this.childId,
                        name: '',//分类名称
                        order:"",
                        type:"",
                        memo: '',//分类描述
                        status: '',//排序
                        parentName: '',//上级分类
                        textarea:"",
                },
                this.showDisable=false;
                this.editTextarea="1";
                this.textareaLists=[];
                this.addBoxShow = true;
            },
            changClk(item) {
                this.titleVal = '编辑属性';
                let arr=[];
                this.addform={
                    categoryId:item.categoryId,
                    name: item.name,//分类名称
                    order:item.order,
                    type:item.type,
                    memo: item.memo,//分类描述
                    status: item.status+"",//排序
                    textarea:"",
                }
                this.showDisable=true;
                this.textareaLists=[];
                this.editIndex=10000;
                // if (!this.checkNull(item.value)){
                //     this.textareaLists=item.value.split(",")
                // }
                this.selfId = item.id;
                this.addBoxShow = true;
                this.getValue(item.id,item.type)
            },
            getValue(id,type){
                MyPost('/liquor-product/property/getValue', {
                    id: id,
                    type:type,
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.textareaLists=data
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            delConfig(item) {
                this.delId = item.id;
                this.delIdType=item.type;
                this.delShow = true;
            },
            delConfigAll() {
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
                    return item.id
                });
                this.delShow = true;
            },
            configClk(){
                this.loadingShow = true;
                let delProperty=[];
                if (!this.checkNull(this.delId)){
                    delProperty.push({
                        id:this.delId,
                        type:this.delIdType
                    })
                }else {
                    delProperty=this.multipleTable.map(item => {
                        return {
                            id:item.id,
                            type:item.type
                        }
                    });
                }
                MyPostJson('/liquor-product/property/delBatch', delProperty).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.delShow = false;
                        this.$message({
                            message: message,
                            type: 'success'
                        });
                        if (this.leftBoolean){
                            this.queryListFn();
                        }else {
                            this.queryListFnCha()
                        }
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
            clearClk(){
                this.currentPage=1;
                this.leftBoolean=false;
                this.contentForm={
                    name:"",
                    dataStatusVal:"",
                    dataStatusType:"4",
                };
                this.queryListFnCha();
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/css/all.scss"
    .categoryManagement
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
        .el-dialog__body
            padding 0
        .add-contain
            padding 20px
            .textarea-css-1
                 width 100%
                 margin-top 10px
                .textarea-css-2
                    background #eeeeee
                    padding 0 4px
                    border-radius 4px
                    font-size 10px
                    margin-right 10px
                    float left
                 .on-active
                     color white
                     background-color #0d81db;
            .el-form-item__label
                font-size 12px
        .move-contain
            padding 20px
            .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content
                background #fff
                color #0D81DB
        .tip-contain
            padding 20px
            p
                font-size 12px
                line-height 30px
                text-align center
                span
                    color #C13A3C
        .upload-contain
            overflow hidden
            .contain-top
                overflow hidden
                padding 10px 18px 0 18px
                .search-btn
                    font-size 12px
                    line-height 28px
                    color #333
                    display inline-block
                    margin-bottom 15px
                    .el-checkbox__label
                        font-size 12px
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
            .upload-box
                overflow hidden
                padding 10px 20px
                text-align center
        .minW .el-dialog
            width 640px
        .contain-mod
            background #fff
            overflow hidden
            padding-top 45px
            .contain-top
                overflow hidden
                padding 0px 18px 0 18px
                box-shadow none
                .search-btn
                    font-size 12px
                    line-height 28px
                    color #333
                    display inline-block
                    margin-bottom 15px
                    .el-checkbox__label
                        font-size 12px
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
            .noshadow
                box-shadow none
            .result-con-2
                padding 0 18px 0px 18px
                .pic-contain-mod
                    overflow hidden
                    display flex
                    .pic-l-mod
                        width 220px
                        float left
                        border 1px solid #EEEEEE
                        h3
                            text-align center
                            line-height 40px
                            font-weight bold
                            font-size 14px
                            color #333
                            border-bottom 1px solid #EEEEEE
                        h5
                            font-size 14px
                            color #333
                            line-height 20px
                            padding 15px 0 15px 6px
                        .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content
                            background #fff
                            color #0D81DB
                        .pic-tree
                            height -moz-calc(55vh)
                            height -webkit-calc(55vh)
                            height calc(55vh)
                            overflow auto
                            .el-tree-node__content
                                 border-bottom 1px solid #eeeeee
                                 height 40px
                            .el-tree-node__content::last-child
                                 border-bottom none
                            .el-tree-node.is-current > .el-tree-node__content
                                 background #eeeeee

                        .add-tree-box
                            height 70px
                            border-top 1px solid #EEEEEE
                            img
                                display block
                                width 30px
                                height 30px
                                margin 18px auto 0 auto
                                cursor pointer
                        .pic-recovery
                            text-align center
                            font-size 14px
                            color #333
                            line-height 70px
                            cursor pointer
                            em
                                display inline-block
                                background url("./pic-icon4.png") no-repeat 0 0
                                background-size contain
                                width 22px
                                height 22px
                                vertical-align text-bottom
                                margin-right 10px
                    .pic-r-mod
                        /*float left*/
                        overflow hidden
                        margin-left 16px
                        flex 1
                        /*display inline*/
                        /*width 75%*/
                        .add-mod-one
                            overflow hidden
                            margin-bottom 20px
                           .add-mod-out
                                border 2px dashed #E3E3E3
                                margin 0 14px 20px 14px
                                padding 22px 0 0 0
                                overflow hidden
                                position relative
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
                           .add-box
                                width 33%
                                height 36px
                                float left
                                margin-bottom 22px
                                .add-tip
                                    width 30%
                                    text-align right
                                    line-height 36px
                                    font-size 12px
                                    color #333
                                    margin-right 20px
                                    display inline
                                    float left
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
                    margin-bottom 40px
                    float right
                    overflow hidden
                    margin-top 5px
            .tabs-mod
                height 30px
                margin-bottom 14px
</style>
