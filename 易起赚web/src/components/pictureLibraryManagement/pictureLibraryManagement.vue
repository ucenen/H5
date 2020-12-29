<template>
    <div class="pictureLibraryManagement">
        <div class="contain-mod">
            <div class="contain-top">
                <span class="search-btn">图片名称：</span>
                <el-input size="mini" class="w106 mr30" v-model="searchList.name"></el-input>
                <el-button size="mini" type="primary" plain class="mr22" @click="queryListFn">查询</el-button>
                <el-button size="mini" type="primary" class="mr22" @click="clearClk">清空</el-button>
                <el-button size="mini" type="primary" plain @click="uploadClk">上传</el-button>
            </div>
            <div class="contain-top noshadow">
                <el-checkbox size="mini" class="search-btn mr22" v-model="allChecked" @change="allCheckedSel">
                    已选中{{multipleSelection.length}}个文件
                </el-checkbox>
                <el-button size="mini" type="primary" plain class="mr22" @click="copyClk">复制</el-button>
                <el-button size="mini" type="primary" class="mr22" @click="delPicClk">删除</el-button>
                <el-button size="mini" type="primary" plain @click="moveClkTo">移动到</el-button>
            </div>
            <div class="result-con">
                <div class="pic-contain-mod">
                    <div class="pic-l-mod">
                        <div v-for="item in getAllList" :key="item">
                            <h5 @click="selClk(item.id)" :class="defulatId == item.id ? 'act-on' : ''">
                                {{item.name}}</h5>
                            <div class="all-parement">
                                <div class="pic-con" v-for="k in item.childList" :key="k">
                                    <h4 @click="selClk(k.id)" :class="defulatId == k.id ? 'act-on' : ''">{{k.name}}</h4>
                                    <p @click="selClk(n.id)" v-for="n in k.childList" :key="n"
                                       :class="defulatId == n.id ? 'act-on' : ''">{{n.name}}
                                        <i @click.stop="editDelClk(n)" class="el-icon-delete editdel-btn"></i>
                                        <i @click.stop="editClk(n)" class="el-icon-edit edit-btn"></i>
                                    </p>
                                </div>
                            </div>
                            <div class="add-tree-box">
                                <img @click="addBoxClk" src="./pic-icon3.png"/>
                            </div>
                            <p class="pic-recovery" @click="goPage"><em></em>图片回收站</p>
                        </div>
                    </div>
                    <ul class="pic-r-mod">
                        <li v-for="(item, index) in tableData" :key="item.id">
                            <el-checkbox class="sel-btn" v-model="item.checked"
                                         @change="changeSel(item,index)"></el-checkbox>
                            <img :src="item.url"/>
                            <p class="pic-name">{{item.name}}</p>
                        </li>
                    </ul>
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
        <el-dialog title="上传图片"
                   class="minW"
                   :visible.sync="uploadShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="upload-contain">
                <div class="contain-top">
                    <span class="search-btn">上传到：</span>
                    <el-tooltip class="w120 mr30" effect="dark" content="请选择图片文件夹" placement="top-start">
                        <el-select size="mini" v-model="picForm.categoryId">
                            <el-option v-for="item in getAllCategoryList" :label="item.name" :key="item" :value="item.id"></el-option>
                        </el-select>
                    </el-tooltip>
                    <!--<el-checkbox class="search-btn">添加水印</el-checkbox>-->
                </div>
                <div class="upload-box">
                    <el-upload
                            class="upload-demo"
                            ref="upload"
                            :data="picForm"
                            drag
                            :file-list="picForm.files"
                            action="/liquor-product/imageLibraryApi/upload"
                            :before-upload="uploadBefore"
                            :on-success="uploadSuccess"
                            :auto-upload="false"
                            multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">为了保证图片的正常使用，仅支持3M以内jpg、jpeg、gif、png格式图片上传</div>
                    </el-upload>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="uploadShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="submitUpload">确认</el-button>
            </div>
        </el-dialog>
        <el-dialog
                title="提示"
                :visible.sync="delPicShow"
                width="30%"
                :close-on-click-modal="false"
                :close-on-press-escape="false">
            <div class="tip-contain">
                <p>是否确认<span>强制删除</span>所选图片？</p>
                <p>删除后图片将被放进回收站，<span>7</span>天内可以在回收站还原</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="delPicShow = false">取 消</el-button>
                <el-button type="primary" size="small" @click="delPic">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                :title="copyMoveTit"
                :visible.sync="moveShow"
                width="30%"
                :close-on-click-modal="false"
                :close-on-press-escape="false">
            <div class="move-contain">
                <el-tree :data="getAllList"
                         class="pic-tree"
                         :props="defaultProps"
                         :default-expand-all="true"
                         :expand-on-click-node="false"
                         :highlight-current="true"
                         @node-click="handleNodeClick"></el-tree>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="moveShow = false">取 消</el-button>
                <el-button type="primary" size="small" @click="moveClk">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="新建文件夹"
                   width="40%"
                   :visible.sync="addBoxShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="add-contain">
                <el-form :model="addForm">
                    <el-form-item size="small" label="所属上级文件夹：" :label-width="formLabelWidth">
                        <el-select v-model="addForm.parentId" placeholder="请选择活动区域" style="width:100%">
                            <el-option label="商品图片" value="2"></el-option>
                            <el-option label="店铺图片" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item size="small" label="分组名称：" :label-width="formLabelWidth">
                        <el-input v-model="addForm.name" autocomplete="off" maxlength="10"
                                  placeholder="请请输入分组名称，长度不超过10个字"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="addBoxShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="addClk">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog
                title="提示"
                :visible.sync="delShow"
                width="30%"
                :close-on-click-modal="false"
                :close-on-press-escape="false">
            <div class="tip-contain">
                <p>是否确认<span>删除</span>所选图片类别？</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="delShow = false">取 消</el-button>
                <el-button type="primary" size="small" @click="delClk">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="修改图片类别"
                   width="40%"
                   :visible.sync="changeBoxShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="add-contain">
                <el-form :model="changeForm">
                    <el-form-item size="small" label="图片类别名称：" :label-width="formLabelWidth">
                        <el-input v-model="changeForm.name" autocomplete="off" maxlength="10"
                                  placeholder="请输入图片类别名称，长度不超过10个字"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="changeBoxShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="changeConfigClk">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import store from 'si-store'
    import {MyGet, MyPost} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../footerbar/footerbar.vue'

    export default {
        name: 'pictureLibraryManagement',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                formLabelWidth: '120px',
                uploadShow: false,//上传弹框显示
                moveShow: false,
                loadingShow: false,
                loadingText: '正在加载中...',
                getAllList: [],
                defulatId: 0,
                page_show: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                changeBoxShow: false,
                changeForm: {
                    name: ''
                },
                changeId: '',//修改名称id
                changeParentId: '',//修改名称id
                addBoxShow: false,
                addForm: {
                    name: '',
                    parentId: '2'
                },
                delShow: false,
                searchList: {
                    name: ''
                },
                tableData: [],
                allChecked: false,
                multipleSelection: [],
                picForm: {
                    categoryId: '',
                    files: []
                },
                getAllCategoryList: [],
                defaultProps: {
                    children: 'childList',
                    label: 'name'
                },
                copyMoveTit: '移动到',
                copyMoveCategoryId: '',
                copyMoveType: '1',
                delPicShow: false
            }
        },
        created() {
            this.$store.state.navTit = '商品';
            this.$store.state.navChildTit = '图片库管理';
            this.getAllFn();
            this.getAllCategoryListFn();
        },
        methods: {
            getAllCategoryListFn(){
                this.loadingShow = true;
                MyGet('/liquor-product/imageLibraryApi/getAllCategoryList').then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.getAllCategoryList = data;
                        this.picForm.categoryId = data[0].id;
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            getAllFn() {
                this.loadingShow = true;
                MyGet('/liquor-product/imageLibraryApi/categoryList').then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.getAllList = data;
                        this.defulatId = data[0].id;
                        this.queryListFn();
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            selClk(id) {
                this.defulatId = id;
                this.queryListFn();
            },
            editClk(item) {
                this.changeId = item.id;
                this.changeParentId = item.parentId;
                this.changeForm.name = item.name;
                this.changeBoxShow = true;
            },
            changeConfigClk() {
                if (!this.changeForm.name) {
                    this.$message.error('请输入图片类别名称');
                    return
                }
                this.loadingShow = true;
                MyPost('/liquor-product/imageLibraryApi/upd', {
                    id: this.changeId,
                    name: this.changeForm.name,
                    parentId: this.changeParentId
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.changeBoxShow = false;
                        this.getAllFn();
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            addBoxClk() {
                this.addForm = {
                    name: '',
                    parentId: '2'
                }
                this.addBoxShow = true;
            },
            addClk() {
                if (!this.addForm.name) {
                    this.$message.error('请输入分组名称');
                    return
                }
                this.loadingShow = true;
                MyPost('/liquor-product/imageLibraryApi/save', {
                    name: this.addForm.name,
                    parentId: this.addForm.parentId
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.$message({
                            message: '新增成功',
                            type: 'success'
                        });
                        this.addBoxShow = false;
                        this.getAllFn();
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            editDelClk(item) {
                this.changeId = item.id;
                this.delShow = true;
            },
            delClk() {
                this.loadingShow = true;
                MyPost('/liquor-product/imageLibraryApi/del', {
                    id: this.changeId
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.delShow = false;
                        this.getAllFn();
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            clearClk() {
                this.searchList = {
                    name: ''
                }
                this.queryListFn();
            },
            queryListFn() {
                this.loadingShow = true;
                MyPost('/liquor-product/imageLibraryApi/queryList', {
                    name: this.searchList.name,
                    categoryId: this.defulatId,
                    dataStatus: '1',
                    start: (this.currentPage - 1) * 10,
                    length: 10
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.tableData = data.data.map(item => {
                            item.checked = false;
                            return item
                        });
                        this.multipleSelection = [];
                        this.allChecked = false;
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
            changeSel(item, index) {
                this.tableData[index].checked = item.checked;
                this.multipleSelection = this.tableData.filter(item => {
                    return item.checked
                })
                if (this.multipleSelection.length == this.tableData.length){
                    this.allChecked = true;
                } else {
                    this.allChecked = false;
                }
            },
            allCheckedSel() {
                if (this.allChecked){
                    this.tableData.forEach(item => {
                        item.checked = true;
                    })
                    this.multipleSelection = this.tableData;
                } else {
                    this.tableData.forEach(item => {
                        item.checked = false;
                    })
                    this.multipleSelection = [];
                }
            },
            uploadBefore(file) {
                // 上传之前
                const isLt2M = file.size / 1024 / 1024 < 3;
                if (!isLt2M) {
                    this.$message.error('上传文件大小不能超过 3M!');
                }
                return isLt2M;
                this.picForm.files.push(file);
            },
            uploadSuccess(response, file, fileList) {
                this.$message({
                    message: '上传成功',
                    type: 'success'
                });
                this.uploadShow = false;
                this.queryListFn();
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            uploadClk(){
                this.picForm.files = [];
                this.uploadShow = true;
            },
            handleNodeClick(data) {
                this.copyMoveCategoryId = data.id;
            },
            copyClk(){
                if (this.multipleSelection.length == 0){
                    return this.$message.error('请选择图片');
                }
                this.copyMoveTit = '复制到';
                this.copyMoveType = '1';
                this.moveShow = true;
            },
            moveClkTo(){
                if (this.multipleSelection.length == 0){
                    return this.$message.error('请选择图片');
                }
                this.copyMoveTit = '移动到';
                this.copyMoveType = '2';
                this.moveShow = true;
            },
            moveClk(){
                if (!this.copyMoveCategoryId){
                    return this.$message.error('请选择图片类目');
                }
                let ids = this.multipleSelection.map(item => {
                    return item.id
                })
                this.loadingShow = true;
                MyPost('/liquor-product/imageLibraryApi/copyOrMove', {
                    ids: ids,
                    categoryId: this.copyMoveCategoryId,
                    type: this.copyMoveType
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        let mes = this.copyMoveType == '1' ? '复制成功' : '移动成功';
                        this.$message({
                            message: mes,
                            type: 'success'
                        });
                        this.moveShow = false;
                        this.queryListFn();
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            delPicClk(){
                if (this.multipleSelection.length == 0){
                    return this.$message.error('请选择图片');
                }
                this.delPicShow = true;
            },
            delPic(){
                let ids = this.multipleSelection.map(item => {
                    return item.id
                })
                this.loadingShow = true;
                MyPost('/liquor-product/imageLibraryApi/delImage', {
                    ids: ids,
                    type: '1'
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.delPicShow = false;
                        this.queryListFn();
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            goPage() {
                this.$router.push({
                    path: '/pictureLibraryRecovery'
                })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .pictureLibraryManagement
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
                    margin-right 22px
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
                    margin-right 22px
                .el-button + .el-button
                    margin-bottom 15px
            .noshadow
                box-shadow none
            .result-con
                padding 0 18px 40px 18px
                .pic-contain-mod
                    overflow hidden
                    .pic-l-mod
                        width 220px
                        float left
                        border 1px solid #EEEEEE
                        h5
                            font-size 14px
                            color #333
                            line-height 20px
                            padding 15px 0 10px 6px
                            cursor pointer
                        .all-parement
                            padding-bottom 10px
                            h4
                                font-size 14px
                                color #333
                                line-height 20px
                                padding 5px 0 5px 26px
                                cursor pointer
                            p
                                color #333
                                font-size 14px
                                line-height 30px
                                height 30px
                                margin-left 46px
                                cursor pointer
                            .edit-btn
                                float right
                                line-height 30px
                                margin-right 10px
                            .editdel-btn
                                float right
                                line-height 30px
                                margin-right 20px
                            .act-on
                                color #C13A3C
                        .act-on
                            color #C13A3C
                        .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content
                            background #fff
                            color #0D81DB
                        .pic-tree
                            margin 0 30px 30px 30px
                        .add-tree-box
                            height 70px
                            border-top 1px solid #EEEEEE
                            border-bottom 1px solid #EEEEEE
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
                        width 70%
                        li
                            width 176px
                            height 196px
                            float left
                            border 2px solid #F4F4F4
                            margin 0 14px 14px 0
                            position relative
                            img
                                display block
                                width 88px
                                height 72px
                                margin 60px 46px 0 46px
                            .pic-desc
                                text-align center
                                font-size 12px
                                line-height 20px
                                margin 20px 0 10px 0
                                color #ccc
                            .pic-name
                                text-align center
                                font-size 12px
                                color #34B38E
                                line-height 20px
                                margin 20px 0 10px 0
                            .sel-btn
                                position absolute
                                left 14px
                                top 16px
                            .el-checkbox__inner
                                width 20px
                                height 20px
                            .el-checkbox__inner::after
                                height 10px
                                left 7px
                .pagenum_mod
                    margin-bottom 40px
                    float right
                    overflow hidden
                    margin-top 30px
            .tabs-mod
                height 30px
                margin-bottom 14px
</style>
