<template>
    <div class="categoryManagement">
        <div class="nav-top">
            <div class="nav-box" @click="addClk"  v-if="functionCodes.indexOf('AD')>-1">
                <img src="../../framework/images/addNew.png"/>
                <p>新增</p>
            </div>
            <div class="nav-box" @click="configClk"  v-if="functionCodes.indexOf('BC')>-1">
                <img src="../../common/images/save.png"/>
                <p>保存</p>
            </div>
            <div class="nav-box" @click="deleteClk"  v-if="functionCodes.indexOf('DE')>-1">
                <img src="./icon-02.png"/>
                <p>删除</p>
            </div>
            <div class="nav-box" @click="clearClk" v-if="functionCodes.length>=0">
                <img src="./icon-04.png"/>
                <p>刷新</p>
            </div>
        </div>
        <div class="contain-mod">
            <div class="result-con-1">
                <div class="pic-contain-mod">
                    <div class="pic-l-mod" style="margin-top: 10px">
                        <h3>分类结构表</h3>
                        <el-tree :data="categoryList"
                                 ref="treeBox"
                                 node-key="id"
                                 class="pic-tree-1"
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
                        <div class="add-mod-one">
                            <h3><em></em>分类详情
                            </h3>
                            <div class="add-mod-line">
                                <div class="add-box">
                                    <span class="add-tip">分类编号：</span>
                                    <el-input  maxlength="50"  size="small" class="add-ipt" v-model="contentForm.categoryNumber" disabled="true"></el-input>
                                </div>
                                <div class="add-box">
                                    <span class="add-tip"><i style="color: red">*</i> &nbsp;&nbsp;分类名称：</span>
                                    <el-input size="small"  maxlength="30" class="add-ipt"  v-model="contentForm.name"></el-input>
                                </div>
                                <div class="add-box">
                                    <span class="add-tip">上级分类：</span>
                                    <el-cascader  class="add-ipt" :options="options" :props="props" disabled="true" v-model="contentForm.parentId" @change="getPropertyFn" :show-all-levels="false"></el-cascader>
                                </div>
                                <div class="add-box">
                                    <span class="add-tip">分类图标：</span>
                                    <div class="close_all" v-if="!elUploadHtmlBoolean">
                                        <el-image @click="showImage(contentForm.imageUrl)" style="width: 40px;height: 40px;border-radius: 40px" :src="contentForm.imageUrl">
                                            <div slot="error" style="font-size: 40px;" class="image-slot">
                                                <i class="el-icon-picture-outline"></i>
                                            </div>
                                        </el-image>
                                        <i @click="removeHtmlImage" style="cursor:pointer;font-size: 16px;position: absolute;right: -4px;top: 0px;" class="el-icon-circle-close"></i>
                                    </div>
                                    <div class="upload-box" v-if="elUploadHtmlBoolean">
                                        <el-upload
                                                class="upload-demo"
                                                ref="upload"
                                                :headers="headers"
                                                :data="contentForm"
                                                :file-list="contentForm.files"
                                                action="/liquor-product/imageLibraryApi/oneUpload"
                                                accept="image/jpeg,image/png"
                                                :before-upload="uploadBefore"
                                                :on-success="uploadContentSuccess"
                                                multiple>
                                            <el-button size="small" type="primary">选择上传图片</el-button>

                                        </el-upload>
                                    </div>
                                </div>
                                <div class="add-box">
                                    <span class="add-tip"><i style="color: red">*</i> &nbsp;&nbsp;排序：</span>
                                    <el-input type="tel"  @mousewheel.native.prevent maxlength="11" size="small" class="add-ipt" v-model="contentForm.sort"></el-input>
                                </div>
                                <div class="add-box">
                                    <span class="add-tip">是否启用：</span>
                                    <el-switch
                                            class="add-ipt"
                                            v-model="contentForm.dataStatus"
                                            active-color="#13ce66"
                                            inactive-color="#ff4949"
                                            @change="changeSwitch">
                                    </el-switch>
                                </div>
                                <div class="add-box-area" style="width: 100%">
                                    <span class="add-tip" style="width: 10%">分类描述：</span>
                                    <el-input size="small" type="textarea" maxlength="100" :row="2" class="add-ipt" style="width: 52.5%" v-model="contentForm.memo"></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="tab-mod" v-if="tableData.length>0">
                            <h3><em></em>下级分类</h3>
                            <el-table
                                    :data="tableData"
                                    max-height="400"
                                    tooltip-effect="dark"
                                    style="width: 100%;"
                                    border>
                                <el-table-column
                                        fixed
                                        prop="categoryNumber"
                                        label="分类编号">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="分类名称">
                                </el-table-column>
                                <el-table-column
                                        prop="memo"
                                        label="分类描述">
                                </el-table-column>
                                <el-table-column
                                        label="是否启用">
                                    <template slot-scope="scope">{{ scope.row.isOpen == 1 ? '启用' : '禁用' }}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="分类图标">
                                    <template slot-scope="scope">
                                        <el-image style="width: 40px;height: 40px;" :src="scope.row.imageUrl" @click="showImage(scope.row.imageUrl)">
                                            <div slot="error" style="font-size: 40px;" class="image-slot">
                                                <i class="el-icon-picture-outline"></i>
                                            </div>
                                        </el-image>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="sort"
                                        label="排序">
                                </el-table-column>
                            </el-table>
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
                <el-button type="primary" size="small" @click="configDeleteClk">确 定</el-button>
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
                        <el-form-item size="small"  label="分类名称：" prop="name">
                            <el-input maxlength="6" v-model="addform.thisName" autocomplete="off"></el-input>
                        </el-form-item>
                    </div>
                    <div class="new-other">
                    <el-form-item size="small" label="  上级分类：">
                        <el-cascader ref="titleValcascader"   :options="options" :props="props"  v-model="addform.lastName" @change="getPropertyShowFn" ></el-cascader>
                    </el-form-item>
                    </div>
                    <el-form-item size="small" label="排序：" prop="sort">
                        <el-input type="tel"  @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" v-model="addform.sort" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="  是否启用：">
                        <el-select v-model="addform.dataStatus" style="width:100%">
                            <el-option
                                    v-for="item in dataStatusList"
                                    :key="item"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item size="small" class="hundred" label="  上传图片：">
                        <div class="upload-box">
                            <el-upload
                                    class="upload-demo"
                                    v-if="elUploadBoolean"
                                    ref="upload"
                                    :headers="headers"
                                    :data="addform"
                                    :file-list="addform.files"
                                    action="/liquor-product/imageLibraryApi/oneUpload"
                                    accept="image/jpeg,image/png"
                                    :before-upload="uploadBefore"
                                    :on-success="uploadSuccess"
                                    multiple>
                                <el-button size="small" type="primary">选择上传图片</el-button>
                                <div class="el-upload__tip" slot="tip">为了保证图片的正常使用，仅支持3M以内jpg、gif、png格式图片上传</div>
                            </el-upload>
                            <div class="close_all" v-if="!elUploadBoolean">
                                <el-image style="width: 40px;height: 40px;border-radius: 40px" :src="addform.imageUrl" @click="showImage(addform.imageUrl)">
                                    <div slot="error" style="font-size: 40px;" class="image-slot">
                                        <i class="el-icon-picture-outline"></i>
                                    </div>
                                </el-image>
                                <i @click="removeImage" style="cursor:pointer;font-size: 16px;position: absolute;right: -4px;top: -4px;" class="el-icon-circle-close"></i>
                            </div>
                        </div>
                    </el-form-item>
                    <div class="new-other">
                    <el-form-item size="small" label="分类描述：">
                        <el-input type="textarea" :row="2"  maxlength="100" v-model="addform.memo" autocomplete="off"></el-input>
                    </el-form-item>
                    </div>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="addBoxShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="saveFn">确定</el-button>
            </div>
        </el-dialog>
        <div class="images" v-show="showImageBoolean"  v-viewer="{movable: true}">
            <img v-for="src in images" :src="src" :key="src">
        </div>
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
                showImageBoolean:false,
                images:[],
                rules:{
                    name: [
                        { required: true, message: '  ', trigger: 'blur' },
                    ],
                    sort: [
                        { required: true, message: '  ', trigger: 'blur' },
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
                elUploadHtmlBoolean:true,
                elUploadBoolean:true,
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
                dataStatusVal: '',//启用状态
                name: '',//分类名称
                childId: '',//当前id
                showDisable:true,
                tableData: [],
                addform: {
                    files:[],
                    codeName:'',//分类编号
                    thisName:"",//分类名称
                    lastName:0,//上级分类
                    name: '',//分类名称
                    dataStatus: '1',//分类状态
                    memo: '',//分类描述
                    sort: '',//排序
                    imageUrl:'',
                    parentName: ''//上级分类
                },
                contentForm:{
                    files:[],
                    id:"",
                    name:"",
                    parentId:"",
                    imageUrl:"",
                    sort:"",
                    dataStatus:false,
                    memo:"",
                    isOpen:'',
                    categoryNumber:'',
                },
                titleVal: '新增分类',
                selfId: '',
                delId: '',
                page_show: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                formLabelWidth: '120px',
                delShow: false,
                addBoxShow: false,
                options: [],
                showPicture:true,
                headers:{},
                props: {
                    value: 'id',
                    label: 'name',
                    children: 'childList',
                    checkStrictly: true,
                    emitPath: false
                },
                categoryLength:"1",
                functionCodes:[],
            }
        },
        created() {
            this.$store.state.navTit = '商品';
            this.$store.state.navChildTit = '商品分类';
            this.headers={
                token:store.get('tokenVal')
            };
            this.getFunctionCode(this,this.$route.query.code);
            this.categoryListFn("");
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
            removeHtmlImage(){
                this.contentForm.imageUrl="";
                this.elUploadHtmlBoolean=true;
            },
            removeImage(){
                this.addform.imageUrl="";
                this.elUploadBoolean=true;
            },
            getPropertyShowFn(){

            },
            deleteClk(){
               if(this.checkNull(this.childId)){
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
              this.delShow=true;
            },
            changeSwitch(val){
                if (val){
                    this.contentForm.isOpen="1"
                }else {
                    this.contentForm.isOpen="2"
                }
            },
            pictureButton(){
                if (this.checkNull(this.childId)){
                    return
                }
                this.showPicture = !this.showPicture;
                if (this.showPicture){
                    this.showDisable=true
                }else {
                    this.showDisable=false
                }
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            uploadBefore(file) {
                // 上传之前
                let types = ['image/jpeg', 'image/gif',  'image/png'];

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
                this.addform.imageUrl = response.data;
                this.elUploadBoolean = false;
            },
            uploadContentSuccess(response, file, fileList) {
                this.$message({
                    message: '上传成功',
                    type: 'success'
                });
                this.contentForm.imageUrl = response.data;
                this.elUploadHtmlBoolean=false;
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
            makeOptions(datas,indexN){
                indexN++;
                for(var i=0;i<datas.length;i++){
                    if (indexN<4){
                        datas[i].disabled = false;
                    }else {
                        datas[i].disabled = true;
                    }
                    if (!this.checkNull(datas[i].childList)){
                        this.makeOptions(datas[i].childList,indexN)
                    }
                }

            },
            categoryListFn(style) {
                // this.loadingShow = true;
                MyGet('/liquor-product/category/categoryListIsOpen').then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        if(this.checkNull(data)){
                            return this.categoryList=[];
                        }
                        this.options = this.deleteChildren(data);
                        this.makeOptions(this.options,0);
                        this.categoryList = this.deleteChildren(data);
                        if (style=="1"){
                            this.$nextTick(() => {
                                this.$refs.treeBox.setCurrentKey(this.childId); // treeBox 元素的ref   value 绑定的node-key
                            });
                            return;
                        }
                        if (!this.childId){
                            this.childId = data[0].id;
                        }
                        this.addform.parentName = data[0].name;
                        this.$nextTick(() => {
                            this.$refs.treeBox.setCurrentKey(this.childId); // treeBox 元素的ref   value 绑定的node-key
                        });

                        this.contentForm={
                            id:data[0].id,
                            name:data[0].name,
                            parentId:data[0].parentId,
                            imageUrl:data[0].imageUrl,
                            sort:data[0].sort,
                            dataStatus:data[0].isOpen=="1" ? true:false,
                            memo:data[0].memo,
                            categoryNumber:data[0].categoryNumber,
                            isOpen:data[0].isOpen,
                        };
                        if (this.checkNull(data[0].imageUrl)){
                            this.elUploadHtmlBoolean=true
                        }else {
                            this.elUploadHtmlBoolean=false
                        }
                        this.tableData=data[0].childList==undefined?[]:data[0].childList;
                        // this.queryListFn();
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            handleNodeClick(data) {
                this.contentForm={
                    id:data.id,
                    name:data.name,
                    parentId:data.parentId,
                    imageUrl:data.imageUrl,
                    sort:data.sort,
                    dataStatus:data.isOpen=="1" ? true:false,
                    memo:data.memo,
                    categoryNumber:data.categoryNumber,
                    isOpen:data.isOpen,
                };
                this.childId=data.id;
                if (this.checkNull(data.imageUrl)){
                    this.elUploadHtmlBoolean=true
                }else {
                    this.elUploadHtmlBoolean=false
                }
                this.tableData=data.childList==undefined?[]:data.childList;
            },
            queryListFn() {
                this.loadingShow = true;
                MyPost('/liquor-product/category/queryList', {
                    dataStatus: this.dataStatusVal,
                    name: this.name,
                    parentId: this.childId,
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
            saveFn() {

                if (!this.addform.thisName) {
                    this.$message.error('请输入分类名称');
                    return
                }
                if (!this.addform.sort) {
                    this.$message.error('请输入排序');
                    return
                }
                // let  len="1";
                if(!this.checkNull(this.addform.lastName)){
                     this.getLength(this.options,1)
                }
                if (this.titleVal == '新增分类') {
                    this.loadingShow = true;
                    MyPost('/liquor-product/category/save', {
                        name : this.addform.thisName,
                        parentId : this.addform.lastName,
                        isOpen: this.addform.dataStatus,
                        sort: this.addform.sort,
                        imageUrl:this.addform.imageUrl,
                        categoryNumber:this.addform.codeName,
                        memo: this.addform.memo,
                        len:this.categoryLength,
                        dataStatus:'1',
                    }).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {

                            this.addBoxShow = false;
                            this.$message({
                                message: message,
                                type: 'success'
                            });
                            this.categoryListFn("1");
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
                    MyPost('/liquor-product/category/upd', {
                        name : this.addform.thisName,
                        parentId : this.addform.lastName==null?0:this.addform.lastName,
                        isOpen: this.addform.isOpen,
                        sort: this.addform.sort==null?0:this.addform.sort,
                        imageUrl:this.addform.imageUrl,
                        categoryNumber:this.addform.categoryNumber,
                        memo: this.addform.memo,
                        dataStatus:'1',
                        len:categoryLength,
                        id:this.changeId,
                    }).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.addBoxShow = false;
                            this.$message({
                                message: message,
                                type: 'success'
                            });
                            this.categoryListFn("1");
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
            getLength(arrs,indexN) {
                for (let i = 0; i < arrs.length; i++) {
                    if (arrs[i].id == this.addform.lastName) {
                        this.categoryLength=indexN+1+""
                        return
                    }
                    if (!this.checkNull(arrs[i].childList)) {
                        indexN=indexN+1
                        this.getLength(arrs[i].childList,indexN);
                    }
                }

            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.queryListFn();
            },
            addClk() {
                this.titleVal = '新增分类';
                this.addform={
                        files:[],
                        codeName:'',//分类编号
                        thisName:"",//分类名称
                        lastName:0,//上级分类
                        name: '',//分类名称
                        dataStatus: '1',//分类状态
                        memo: '',//分类描述
                        sort: '',//排序
                        imageUrl:'',
                        parentName: ''//上级分类
                };
                this.addBoxShow = true;
            },
            changClk(item) {
                this.titleVal = '编辑分类';
                this.addform.name = item.name;
                this.addform.dataStatus = item.dataStatus;
                this.addform.sort = item.sort;
                this.addform.memo = item.memo;
                this.selfId = item.id;
                this.addBoxShow = true;
            },
            delClk(item){
                this.delId = item.id;
                this.delShow = true;
            },
            configDeleteClk(){
                this.loadingShow = true;
                MyPost('/liquor-product/category/del', {
                   id:this.childId
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.childId="";
                        this.delShow=false;
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
            },
            configClk(){
                if(this.checkNull(this.categoryList)){
                    this.$message.error('请选择分类');
                    return
                }
                if (!this.contentForm.name) {
                    this.$message.error('请输入分类名称');
                    return
                }
                if (!this.contentForm.sort) {
                    this.$message.error('请输入排序');
                    return
                }
                this.loadingShow = true;
                MyPost('/liquor-product/category/upd', {
                    name : this.contentForm.name,
                    parentId : this.contentForm.parentId==null?0:this.contentForm.parentId,
                    isOpen: this.contentForm.isOpen,
                    sort: this.contentForm.sort==null?0:this.contentForm.sort,
                    imageUrl:this.contentForm.imageUrl==null?"":this.contentForm.imageUrl,
                    categoryNumber:this.contentForm.categoryNumber==null?0:this.contentForm.categoryNumber,
                    memo: this.contentForm.memo==null?"":this.contentForm.memo,
                    dataStatus:'1',
                    len:"1",
                    id:this.contentForm.id,
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.addBoxShow = false;
                        this.$message({
                            type:"success",
                            message:message
                        })
                        this.categoryListFn("1");
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
                this.childId="";
                this.categoryListFn("");
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/css/all.scss"
    .categoryManagement
        .el-input__inner
            height 28px !important
            line-height 28px !important
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
                box-shadow 0px 0px 6px 0px rgba(174, 174, 174, 0.14)
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
            .el-form
                overflow hidden
            .el-form-item
                width 50%
                float left
            .hundred
                width 100%
                float left
            width 640px
        .contain-mod
            padding-top 45px
            background #fff
            overflow hidden
            .contain-top
                overflow hidden
                /*padding 10px 18px 0 18px*/
                box-shadow 0px 0px 6px 0px rgba(174, 174, 174, 0.14)
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
            .result-con-1
                padding 0px 18px 0px 18px
                .pic-contain-mod

                    overflow hidden
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
                        .pic-tree-1
                            height -moz-calc(60vh)
                            height -webkit-calc(60vh)
                            height calc(60vh)
                            overflow auto
                            /*padding 10px 20px  10px 20px*/
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
                        float left
                        overflow hidden
                        margin-left 16px
                        display inline
                        width 75%
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
                                font-size 14px
                                color #333
                                margin-top 10px
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
                           .add-box-area
                                width 100%
                                height auto
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
                           .add-box
                                overflow hidden
                                width 33%
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
                .pagenum_mod
                    margin-bottom 40px
                    float right
                    overflow hidden
                    margin-top 5px
            .tabs-mod
                height 30px
                margin-bottom 14px
</style>
