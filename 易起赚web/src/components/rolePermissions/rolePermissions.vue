<template>
    <div class="categoryManagement">
        <div class="nav-top">
            <div class="nav-box" @click="addBrand" v-if="functionCodes.indexOf('AD')>-1">
                <img src="../../framework/images/addNew.png"/>
                <p>新增</p>
            </div>
            <div class="nav-box" @click="configClkAll" v-if="functionCodes.indexOf('DE')>-1">
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
                <span class="search-btn">角色名称：</span>
                <el-input maxlength="10" @keyup.enter.native="queryListFnMall" size="mini" v-model="name" class="w140 mr30"></el-input>
                <el-button size="mini" type="primary" plain class="mr22" @click="queryListFnMall">查询</el-button>
                <el-button size="mini" type="primary" class="mr22" @click="clearClk">清空</el-button>
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
                                prop="name"
                                label="角色名称">
                        </el-table-column>
                        <el-table-column
                                prop="memo"
                                label="角色描述">
                        </el-table-column>
                        <el-table-column
                                label="创建时间"
                                prop="creationTime">
                        </el-table-column>
                        <el-table-column
                                label="创建者"
                                prop="creator">
                        </el-table-column>
                        <el-table-column
                                label="更新时间"
                                prop="modificationTime">
                        </el-table-column>
                        <el-table-column
                                label="更新者"
                                prop="modifier">
                        </el-table-column>
                        <el-table-column
                                width="120"
                                label="操作">
                            <template slot-scope="scope">
                                <!--scope.row-->
                                <!--<span class="scope_btn color-blue color-under-line" @click="goInfor">查看</span>-->
                                <!--<span class="scope_btn color-blue" @click="reviewClk(scope.row)">复核</span>-->
                                <span class="scope_btn color-blue color-under-line" v-if="functionCodes.indexOf('ED')>-1"
                                      @click="editClk(scope.row)">编辑</span>
                                <span v-if="functionCodes.indexOf('DE')>-1" class="scope_btn color-red" @click="delClk(scope.row)">删除</span>
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
                   :visible.sync="serachBoxShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="add-contain">
            <el-form  :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth">
                <el-form-item size="small" label="角色名称："  prop="name"  >
                    <el-input v-model="roleName" maxlength="30" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="clearFox" size="small" label="角色描述：" >
                    <el-input type="textarea" maxlength="30" :row="2" v-model="roleMedo" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="clearFox" size="small" label="权限：">
                    <el-tree
                            default-expand-all
                            class="tree-other"
                            :data="data"
                            show-checkbox
                            node-key="codeId"
                            ref="tree"
                            highlight-current
                            :props="defaultProps">
                    </el-tree>
                </el-form-item>
            </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="serachBoxShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="addBrandClk">确定</el-button>
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
        name: 'rolePermissions',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                data: [],
                loadingShow: false,
                loadingText: '正在加载中...',
                categoryList: [],
                defaultProps: {
                    children: 'fmList',
                    label: 'name'
                },
                dataStatusList: [
                    {
                        label: '启用',
                        value: '1'
                    },
                    {
                        label: '不启用',
                        value: '2'
                    }
                ],
                dataStatusVal: '',//启用状态
                name: '',//分类名称
                childId: '',//当前id
                tableData: [],
                addform: {
                    name: '',//分类名称
                    dataStatus: '1',//分类状态
                    memo: '',//分类描述
                    sort: '',//排序
                    parentName: ''//上级分类
                },
                ul7: 'ul-7',
                ul77: 'ul-77',
                ul8: 'ul-8',
                ul88: 'ul-88',
                getAllList: [],
                titleVal: '新增类目',
                selfId: '',
                delId: '',
                page_show: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                formLabelWidth: '120px',
                delShow: false,
                addBoxShow: false,
                thisData: '',
                serachBoxShow: false,
                roleName: '',
                roleMedo: '',
                defulatId: 3,
                nameId: "",
                delIds: [],
                multipleTable: "",
                roleId: "",
                functionLists: [],
                checkList: [],
                functionCodes:[],
                rules:{
                    name: [
                        { required: true, message: '  ', trigger: 'blur' },
                    ]
                }
            }
        },
        created() {
            this.$store.state.navTit = '系统管理';
            this.$store.state.navChildTit = '角色维护';
            this.queryListFn();
            this.getFunctionCode(this,this.$route.query.code);
        },

        methods: {
            handleSelectionChange(val) {
                this.multipleTable = val;
            },

            makeAdds(datas) {
                var that = this;
                if (datas != null && datas !== undefined && datas.length > 0) {
                    datas.forEach(function (item, index) {
                        if (item.fmList != null && item.fmList !== undefined && item.fmList.length > 0) {
                            that.makeDatas(item.fmList);
                        } else if (item.actList != null && item.actList !== undefined && item.actList.length > 0) {
                            item.fmList = item.actList;
                            item.actList = [];
                            that.makeDatas(item.fmList);
                        } else {

                        }
                    })
                }
                return datas
            },
            addBrandClk() {
                var that = this;
                if (!this.roleName) {
                    this.$message.error('请输入角色名称');
                    return
                }
                if (this.titData == "新增角色") {
                    var datas = this.$refs.tree.getCheckedNodes(true, false);
                    let beforeData = [];
                    for (var i = 0; i < datas.length; i++) {
                        if (datas[i].flag !== undefined && datas[i].flag) {
                            beforeData.push({
                                functionCode: datas[i].functionCode,
                                actionCode: datas[i].code,
                                parentCode: datas[i].parentCode,
                            })
                        }
                    }
                    that.makeAddToSever(beforeData);
                    var afterData=that.unique(beforeData);
                    var afterDataArray=[];
                    for (var i = 0; i < afterData.length; i++) {
                        afterDataArray.push({
                            functionCode: afterData[i],
                            actionList: []
                        })
                    }
                    this.functionLists.push.apply(this.functionLists,afterDataArray);
                    this.loadingShow = true;
                    MyPostJson('/yl-ms-platform/roleApi/add', {
                        name: this.roleName,
                        memo: this.roleMedo,
                        functionList: this.functionLists,
                    }).then((res) => {
                        this.loadingShow = false;
                        this.functionLists = [];
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.serachBoxShow = false;
                            this.queryListFn();
                            // this.totalRecord = data.recordsTotal;
                        } else {
                            this.$message.error(message);
                        }
                    })
                } else {
                    var datas = this.$refs.tree.getCheckedNodes(true, false);
                    let beforeData = [];
                    for (var i = 0; i < datas.length; i++) {
                        if (datas[i].flag !== undefined && datas[i].flag) {
                            beforeData.push({
                                functionCode: datas[i].functionCode,
                                actionCode: datas[i].code,
                                parentCode: datas[i].parentCode,
                            })
                        }
                    }
                    that.makeAddToSever(beforeData);
                    var afterData=that.unique(beforeData);
                    var afterDataArray=[];
                    for (var i = 0; i < afterData.length; i++) {
                        afterDataArray.push({
                            functionCode: afterData[i],
                            actionList: []
                        })
                    }
                    this.functionLists.push.apply(this.functionLists,afterDataArray);
                    this.loadingShow = true;
                    MyPostJson('/yl-ms-platform/roleApi/update', {
                        name: this.roleName,
                        memo: this.roleMedo,
                        functionList: this.functionLists,
                        roleId: this.roleId
                    }).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.serachBoxShow = false;
                            this.functionLists = [];
                            this.queryListFn();
                            // this.totalRecord = data.recordsTotal;
                        } else {
                            this.$message.error(message);
                        }
                    })
                }
            },
            unique(arr) {
                var array = [];
                for (var i = 0; i < arr.length; i++) {
                    if (array.indexOf(arr[i].parentCode) === -1) {
                        array.push(arr[i].parentCode)
                    }
                }
                return array;
            },
            makeAddToSever(beforeData) {
                let tempArr = [];
                for (let i = 0; i < beforeData.length; i++) {
                    if (tempArr.indexOf(beforeData[i].functionCode) === -1) {
                        this.functionLists.push({
                            functionCode: beforeData[i].functionCode,
                            actionList: [
                                {
                                    actionCode: beforeData[i].actionCode
                                }]
                        });
                        tempArr.push(beforeData[i].functionCode);
                    } else {
                        for (let j = 0; j < this.functionLists.length; j++) {
                            if (this.functionLists[j].functionCode == beforeData[i].functionCode) {
                                this.functionLists[j].actionList.push({
                                    actionCode: beforeData[i].actionCode
                                });
                                break;
                            }
                        }
                    }
                }
            },
            addBrand() {
                this.titData = '新增角色';
                this.roleName = '';
                this.roleMedo = '';
                this.serachBoxShow = true;
                this.getTreeData("");
            },
            getTreeData(roleId) {
                var that = this;
                this.loadingShow = true;
                MyPost('/yl-ms-platform/roleApi/permiConfig', {
                    roleId: roleId,
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        var datas = data;
                        that.data = that.makeDatas(datas);
                        var checkList = [];
                        for (var i = 0; i < this.data.length; i++) {
                            if (this.data[i].fmList != null && this.data[i].fmList.length > 0) {
                                for (var j = 0; j < this.data[i].fmList.length; j++) {
                                    if (this.data[i].fmList[j].fmList != null && this.data[i].fmList[j].fmList.length > 0) {
                                        for (var k = 0; k < this.data[i].fmList[j].fmList.length; k++) {
                                            this.data[i].fmList[j].fmList[k].parentCode = this.data[i].code;
                                            this.data[i].fmList[j].fmList[k].codeId=this.data[i].fmList[j].fmList[k].functionCode+this.data[i].fmList[j].fmList[k].code
                                            if (this.data[i].fmList[j].fmList[k].checked) {
                                                checkList.push(this.data[i].fmList[j].fmList[k])
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        this.$nextTick(function () {
                            this.$refs.tree.setCheckedNodes(checkList);
                        })
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            makeDatas(datas) {
                var that = this;
                if (datas != null && datas !== undefined && datas.length > 0) {
                    datas.forEach(function (item, index) {
                        if (item.fmList != null && item.fmList !== undefined && item.fmList.length > 0) {
                            that.makeDatas(item.fmList);
                        } else if (item.actList != null && item.actList !== undefined && item.actList.length > 0) {
                            item.fmList = item.actList;
                            item.actList = [];
                            that.makeDatas(item.fmList);
                        } else {

                        }
                    })
                }
                return datas
            },

            selClk(id) {
                this.defulatId = id;
            },
            editClk(item) {
                this.titData = '修改角色';
                this.roleName = item.name;
                this.roleMedo = item.memo;
                this.roleId = item.id;
                this.getTreeData(item.id);
                this.serachBoxShow = true;
            },
            editDelClk(item) {
                this.nameId = item.id;
                this.delShow = true;
            },
            append() {
                var data = this.thisData;
                const newChild = {id: id++, label: 'testtest', children: []};
                if (!data.children) {
                    this.$set(data, 'children', []);
                }
                data.children.push(newChild);
                this.addBoxShow = false;
            },

            remove(node, data) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            },
            categoryListFn() {
                this.loadingShow = false;
                MyGet('/liquor-product/category/categoryList').then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.categoryList = data;
                        if (!this.childId) {
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
                this.childId = data.id;
                this.addform.parentName = data.name;
                this.queryListFn();
            },
            reFresh() {
                this.name = "";
                this.queryListFn();
            },
            queryListFnMall(){
                this.currentPage = 1 ;
                this.queryListFn();
            },
            queryListFn() {
                let that=this;
                MyPost('/yl-ms-platform/roleApi/list', {
                    name: this.name,
                    start: (this.currentPage - 1) * 10,
                    length: 10
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.tableData = data.data;
                        for(let i=0;i<this.tableData.length;i++){
                            if (this.tableData[i].creationTime!=null){
                                this.tableData[i].creationTime=this.timeFormatFun(this.tableData[i].creationTime)
                            }
                            if (this.tableData[i].modificationTime!=null){
                                this.tableData[i].modificationTime=this.timeFormatFun(this.tableData[i].modificationTime)
                            }
                        }
                        this.totalRecord = data.recordsTotal;
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            saveFn() {
                if (this.titleVal == '新增类目') {
                    if (!this.addform.name) {
                        this.$message.error('请输入分类名称');
                        return
                    }
                    if (!this.addform.sort) {
                        this.$message.error('请输入排序');
                        return
                    }
                    this.loadingShow = false;
                    MyPost('/liquor-product/category/save', {
                        name: this.addform.name,
                        parentId: this.childId,
                        dataStatus: this.addform.dataStatus,
                        sort: this.addform.sort,
                        memo: this.addform.memo
                    }).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.addBoxShow = false;
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
                    if (!this.addform.name) {
                        this.$message.error('请输入分类名称');
                        return
                    }
                    if (!this.addform.sort) {
                        this.$message.error('请输入排序');
                        return
                    }
                    this.loadingShow = false;
                    MyPost('/liquor-product/category/upd', {
                        name: this.addform.name,
                        parentId: this.childId,
                        dataStatus: this.addform.dataStatus,
                        sort: this.addform.sort,
                        memo: this.addform.memo,
                        id: this.selfId
                    }).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.addBoxShow = false;
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
                this.queryListFn();
            },
            addClk(data) {
                this.titleVal = '新增类目';
                this.addform.name = '';
                this.thisData = data;
                this.addform.dataStatus = '1';
                this.addform.memo = '';
                this.addform.sort = '';
                this.addBoxShow = true;
            },
            changClk(item) {
                this.titleVal = '编辑类目';
                this.addform.name = item.name;
                this.addform.dataStatus = item.dataStatus;
                this.addform.sort = item.sort;
                this.addform.memo = item.memo;
                this.selfId = item.id;
                this.addBoxShow = true;
            },
            delClk(item) {
                this.delId = item.id;
                this.delIds=[];
                this.delIds.push(this.delId);
                this.delShow = true;
            },
            configClkAll() {
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
                this.delShow = true;
            },
            configClk() {
                this.loadingShow = true;
                MyPost('/yl-ms-platform/roleApi/delete', {
                    ids: this.delIds
                }).then((res) => {
                    this.delIds = [];
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.delShow = false;
                        this.queryListFn();
                    } else {
                        // this.$message.error(message);
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
            clearClk() {
                this.currentPage=1;
                this.name = '';
                this.dataStatusVal = '';
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
        .all-parement
            overflow hidden
            padding-bottom 20px
            p
                color #333
                font-size 14px
                line-height 40px
                height 40px
                padding-left 30px
                cursor pointer
                .edit-btn
                    float right
                    line-height 40px
                    margin-right 10px
                .editdel-btn
                    float right
                    line-height 40px
                    margin-right 20px
            .act-on
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
                .w140
                    width 140px
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
        .minW
            .el-dialog
                width 640px
            .el-input
                width 100% !important
            .el-form-item
                width 100% !important
        .contain-mod
            overflow hidden
            background #ffffff
            padding-left 18px
            padding-right 18px
            padding-top 45px
            .contain-top
                overflow hidden
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
                .w140
                    width 140px
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
                padding-bottom: 100px;
                .tab-mod
                    /*width 100%*/
                    .el-table thead tr
                        font-size 12px
                        color #262626
                        border-radius 4px 4px 0 0
                        height 50px
                    .el-table thead th
                        text-align center
                        background #FAFAFA
                    .el-table thead th > .cell
                        color #262626
                        font-weight normal
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
                    .color-red
                        color #DB0D1B
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
