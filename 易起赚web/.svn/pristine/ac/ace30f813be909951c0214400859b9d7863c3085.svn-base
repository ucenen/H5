<template>
    <div class="categoryManagement">
        <div class="nav-top">
            <div class="nav-box" @click="addBrand">
                <img src="./icon-01.png"/>
                <p class="color-red">新增</p>
            </div>
             <div class="nav-box">
                 <img src="./icon-03.png"/>
                 <p>导出</p>
             </div>
             <div class="nav-box">
                 <img src="./icon-04.png"/>
                 <p>刷新</p>
             </div>
        </div>
        <div class="contain-mod">
            <div class="contain-top">
                <span class="search-btn">角色名称：</span>
                <el-input size="mini" v-model="name" class="w106 mr30"></el-input>
                <el-button size="mini" type="primary" plain class="mr22" @click="queryListFn">查询</el-button>
                <el-button size="mini" type="primary" class="mr22" @click="clearClk">清空</el-button>
            </div>
            <div class="result-con">
                <div class="pic-contain-mod">
                    <!--<div class="pic-l-mod">-->
                        <!--<h5>角色管理</h5>-->
                        <!--<div class="all-parement">-->
                            <!--<p @click="selClk(item.id)" :class="defulatId == item.id ? 'act-on' : ''"-->
                               <!--v-for="item in getAllList" :key="item">{{item.name}}-->
                                <!--<i @click.stop="editDelClk(item)" class="el-icon-delete editdel-btn"></i>-->
                                <!--<i @click.stop="editClk(item)" class="el-icon-edit edit-btn"></i>-->
                            <!--</p>-->
                        <!--</div>-->
                    <!--</div>-->
                    <div class="pic-r-mod">
                        <div class="tab-mod">
                            <div class="ul-1">
                                <ul class="ul-2">
                                    <li>
                                        <div class="li-1">一级权限</div>
                                        <div class="li-2">二级权限</div>
                                        <div class="li-3">三级权限</div>
                                    </li>
                                    <li v-for="(item,index) in selectLists" :key="item">
                                        <div class="ul-3">
                                            <div class="ul-4">
                                                <el-checkbox :indeterminate="item.indeterminate1"
                                                             v-model="item.checkedAll"
                                                             @change="handleCheckAllChange(index,item)">{{item.title}}
                                                </el-checkbox>
                                            </div>
                                            <div class="ul-5">
                                                <el-checkbox-group v-model="item.checkedCities">
                                                    <div class="ul-6" v-for="(itemOne,position) in item.children"
                                                         :key="itemOne">
                                                        <div :class="position==0? ul77:ul7">
                                                            <el-checkbox :label="itemOne.id" :key="itemOne.id"
                                                                         v-model="itemOne.checkedAll"
                                                                         @change="handleCheckAllChangeOne(position,itemOne,index)">
                                                                {{itemOne.title}}
                                                            </el-checkbox>
                                                        </div>
                                                        <div :class="position==0? ul88:ul8">
                                                            <el-checkbox-group v-model="itemOne.checkedCities"
                                                            >
                                                                <div class="ul-9"
                                                                     v-for="(itemTwo,positionIndex) in itemOne.children"
                                                                     :key="itemTwo">
                                                                    <div class="ul-10">
                                                                        <el-checkbox :label="itemTwo.id"
                                                                                     :key="itemTwo.id"
                                                                                     v-model="itemTwo.checkedAll"
                                                                                     @change="handleCheckAllChangeTwo(positionIndex,itemTwo,index,position)">
                                                                            {{itemTwo.title}}
                                                                        </el-checkbox>
                                                                    </div>
                                                                </div>
                                                            </el-checkbox-group>
                                                        </div>
                                                    </div>
                                                </el-checkbox-group>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
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
                <p>您正在执行删除操作，是否确认删除？</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="delShow = false">取 消</el-button>
                <el-button type="primary" size="small" @click="configClk">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :title="titleVal"
                   width="40%"
                   :visible.sync="addBoxShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="add-contain">
                <el-form :model="addform">
                    <el-form-item size="small" label="* 分类名称：" :label-width="formLabelWidth">
                        <el-input v-model="addform.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="* 上级分类：" :label-width="formLabelWidth">
                        <el-select v-model="addform.parentName" disabled placeholder="请选择上级分类"
                                   style="width:100%"></el-select>
                    </el-form-item>
                    <el-form-item size="small" label="* 排序：" :label-width="formLabelWidth">
                        <el-input v-model="addform.sort" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="* 是否启用：" :label-width="formLabelWidth">
                        <el-select v-model="addform.dataStatus" style="width:100%">
                            <el-option
                                    v-for="item in dataStatusList"
                                    :key="item"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item size="small" label="分类描述：" :label-width="formLabelWidth">
                        <el-input v-model="addform.memo" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="addBoxShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="append">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="titData"
                   class="minW"
                   :visible.sync="serachBoxShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <el-form :model="form">
                <el-form-item size="small" label="* 角色名称：" :label-width="formLabelWidth">
                    <el-input v-model="roleName" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
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

    let id = 1000;
    export default {
        name: 'ceshi',
        components: {
            Loading,
            footerbar
        },
        data() {
            const selectLists = [
                {
                    indeterminate1: false,
                    checkedAll: false,
                    id: 111,
                    title: "库存",
                    checkedCities: [],
                    children: [
                        {
                            checkedCities: [],
                            indeterminate2: false,
                            checkedAll: false,
                            id: 1112,
                            title: "库存管理2",
                            children: [
                                {
                                    checkedAll: false,
                                    id: 11121,
                                    title: "新增"
                                },
                                {
                                    checkedAll: false,
                                    id: 11122,
                                    title: "删除"
                                },
                                {
                                    checkedAll: false,
                                    id: 11123,
                                    title: "导出"
                                },
                            ]
                        },
                        {
                            indeterminate2: false,
                            checkedAll: false,
                            id: 1113,
                            title: "库存管理3",
                            checkedCities: [],
                            children: [
                                {
                                    checkedAll: false,
                                    id: 11131,
                                    title: "新增"
                                },
                                {
                                    checkedAll: false,
                                    id: 11132,
                                    title: "删除"
                                }
                            ]
                        },
                        {
                            indeterminate2: false,
                            checkedAll: false,
                            id: 1114,
                            title: "库存管理4",
                            checkedCities: [],
                            children: [
                                {
                                    checkedAll: false,
                                    id: 11134,
                                    title: "删除"
                                },
                                {
                                    checkedAll: false,
                                    id: 11135,
                                    title: "导出"
                                },
                            ]
                        }
                    ]
                },
                {
                    indeterminate1: false,
                    checkedAll: false,
                    id: 222,
                    title: "采购库存",
                    checkedCities: [],
                    children: [
                        {
                            checkedCities: [],
                            indeterminate2: false,
                            checkedAll: false,
                            id: 2222,
                            title: "库存管理2",
                            children: [
                                {
                                    checkedAll: false,
                                    id: 22221,
                                    title: "新增"
                                },
                                {
                                    checkedAll: false,
                                    id: 22222,
                                    title: "删除"
                                },
                                {
                                    checkedAll: false,
                                    id: 22223,
                                    title: "导出"
                                },
                            ]
                        },
                        {
                            checkedCities: [],
                            indeterminate2: false,
                            checkedAll: false,
                            id: 2223,
                            title: "库存管理3",
                            children: [
                                {
                                    checkedAll: false,
                                    id: 22231,
                                    title: "新增"
                                },
                                {
                                    checkedAll: false,
                                    id: 22232,
                                    title: "删除"
                                }
                            ]
                        },
                        {
                            checkedCities: [],
                            indeterminate2: false,
                            checkedAll: false,
                            id: 2224,
                            title: "库存管理4",
                            children: [
                                {
                                    checkedAll: false,
                                    id: 22241,
                                    title: "删除"
                                },
                                {
                                    checkedAll: false,
                                    id: 22242,
                                    title: "导出"
                                },
                            ]
                        }
                    ]
                }
            ];

            return {
                selectLists: JSON.parse(JSON.stringify(selectLists)),
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
                getAllList:[],
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
                serachBoxShow:false,
                roleName:'',
                defulatId:3,
                nameId:"",
            }
        },
        created() {
            this.$store.state.navTit = '酒企';
            this.$store.state.navChildTit = '酒企列表';
            this.queryListFn();
        },
        methods: {
            addBrandClk(){
                if (this.titData=="新增角色"){
                    this.loadingShow = true;
                    MyPost('/yl-ms-platform/roleApi/add', {
                        name: this.roleName,
                    }).then((res) => {
                        this.loadingShow = false;
                        this.serachBoxShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {

                            this.queryListFn();
                            // this.totalRecord = data.recordsTotal;
                        } else {
                            this.$message.error(message);
                        }
                    })
                }else{
                    this.loadingShow = true;
                    MyPost('/yl-ms-platform/roleApi/update', {
                        roleId:this.nameId,
                        name: this.roleName,
                    }).then((res) => {
                        this.loadingShow = false;
                        this.serachBoxShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.queryListFn();
                        } else {
                            this.$message.error(message);
                        }
                    })
                }
            },
            addBrand() {
                this.titData = '新增角色';
                this.roleName = '';
                this.serachBoxShow = true;
            },
            handleCheckAllChange(index, item) {
                if (item.checkedAll) {
                    item.checkedCities=[];
                    for (var i = 0; i < item.children.length; i++) {
                        item.checkedCities.push(item.children[i].id);
                    }
                    for (var i = 0; i < item.children.length; i++) {
                        item.children[i].checkedAll = true;
                        item.children[i].checkedCities=[];
                        for (var j = 0; j < item.children[i].children.length; j++) {
                            item.children[i].checkedCities.push(item.children[i].children[j].id);
                            item.children[i].children[j].checkedAll = true;
                        }
                    }

                } else {
                    item.checkedCities = []
                    for (var i = 0; i < item.children.length; i++) {
                        item.children[i].checkedCities = [];
                    }
                    for (var i = 0; i < item.children.length; i++) {
                        item.children[i].checkedAll = false;
                        for (var j = 0; j < item.children[i].children.length; j++) {
                            item.children[i].children[j].checkedAll = false;
                        }
                    }
                }
            },
            handleCheckAllChangeOne(index, item, firstIndex) {
                if (item.checkedAll) {
                    item.checkedAll = false;
                    this.selectLists[firstIndex].checkedAll = false;
                    item.checkedCities = [];
                    for (var i = 0; i < item.children.length; i++) {
                        item.children[i].checkedAll = false;
                    }
                } else {
                    item.checkedAll = true
                    item.checkedCities = []
                    for (var i = 0; i < item.children.length; i++) {
                        item.checkedCities.push(item.children[i].id)
                        item.children[i].checkedAll = true;
                    }
                    if (this.selectLists[firstIndex].checkedCities.length == this.selectLists[firstIndex].children.length) {
                        this.selectLists[firstIndex].checkedAll = true;
                    }
                }
            },
            handleCheckAllChangeTwo(index, item, firstIndex, secondIndex) {
                if (item.checkedAll) {
                    item.checkedAll = false;
                   //console.log("indexsplice1===" + this.selectLists[firstIndex].checkedCities);
                    this.selectLists[firstIndex].checkedAll = false;
                    var ido = this.selectLists[firstIndex].children[secondIndex].id;
                    var indexSplice = this.selectLists[firstIndex].checkedCities.indexOf(ido);
                    if (indexSplice != -1) {
                        this.selectLists[firstIndex].checkedCities.splice(indexSplice, 1);
                    }
                    this.selectLists[firstIndex].children[secondIndex].checkedAll = false;
                } else {
                    item.checkedAll = true;
                   //console.log("indexsplice3===" + this.selectLists[firstIndex].checkedCities);
                    if (this.selectLists[firstIndex].children[secondIndex].checkedCities.length == this.selectLists[firstIndex].children[secondIndex].children.length) {
                        this.selectLists[firstIndex].children[secondIndex].checkedAll = true;
                        this.selectLists[firstIndex].checkedCities.push(this.selectLists[firstIndex].children[secondIndex].id);
                        //console.log("indexsplice2===" + this.selectLists[firstIndex].checkedCities);
                    }
                    if (this.selectLists[firstIndex].checkedCities.length == this.selectLists[firstIndex].children.length) {
                        this.selectLists[firstIndex].checkedAll = true;
                    }
                }
            },
            selClk(id) {
                this.defulatId = id;
            },
            editClk(item) {
                this.titData = '修改角色';
                this.roleName = item.name;
                this.nameId = item.id;
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
            queryListFn() {
                this.loadingShow = true;
                MyPost('/yl-ms-platform/roleApi/list', {
                    name: this.name,
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.getAllList = data;
                        this.defulatId=data[0].id;
                        // this.totalRecord = data.recordsTotal;
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
                            this.$message.error(message);
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
                            this.$message.error(message);
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
                this.delShow = true;
            },
            configClk() {
                this.loadingShow = true;
                var ids=[];
                ids.push(this.nameId);
                MyPost('/yl-ms-platform/roleApi/delete', {
                    ids: ids
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.delShow = false;
                        this.queryListFn();
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            clearClk() {
                this.name = '';
                this.dataStatusVal = '';
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .categoryManagement
        .nav-top
            background #fff
            padding-left 20px
            height 35px
            position relative
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
                padding 16px 18px 40px 18px
                .pic-contain-mod
                    overflow hidden
                    .pic-l-mod
                        width 220px
                        /*padding 10px*/
                        float left
                        border 1px solid #EEEEEE
                        h5
                            font-size 14px
                            background #fafafa
                            color #333
                            line-height 20px
                            padding 15px 0 15px 16px
                        .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content
                            background #fff
                            color #0D81DB
                        .pic-tree
                            margin 30px 20px
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
                        width 100%
                        .el-tree-node
                            display flex;
                            flex-direction row
                            align-items center
                            border 0.3px solid #EBEEF5
                            border-top 0px
                        .el-tree-node__content
                            width 300px
                            padding-left 0px !important
                        .ul-1
                            width 100%
                        .ul-2
                            border 1px solid #EBEEF5
                            border-bottom 0
                        /*width 100%*/
                        .ul-2 li
                            overflow hidden
                            width 100%
                            display flex
                            flex-direction row
                            align-items center
                            border-bottom 1px solid #EBEEF5
                        .li-1
                            width 20%
                            height 50px
                            text-align center
                            background: #fafafa
                            line-height 50px
                            border-right 1px solid #EBEEF5
                        .li-2
                            width 20%
                            height 50px
                            text-align center
                            background: #fafafa
                            line-height 50px
                            border-right 1px solid #EBEEF5
                        .li-3
                            flex 1
                            text-align center
                            background: #fafafa
                            height 50px
                            line-height 50px
                        .ul-3
                            width 100%
                            display flex
                            flex-direction row
                            align-items center
                        .ul-4
                            width 20%
                            overflow hidden
                            text-align center
                        .ul-5
                            flex 1
                            overflow hidden
                        .ul-6
                            display flex
                            flex-direction row
                            align-items center
                        .ul-7
                            overflow hidden
                            width 25%
                            height 50px
                            border-left 1px solid #EBEEF5
                            border-right 1px solid #EBEEF5
                            border-top 1px solid #EBEEF5
                            text-align center
                            line-height 50px
                        .ul-77
                            overflow hidden
                            width 25%
                            height 50px
                            border-left 1px solid #EBEEF5
                            border-right 1px solid #EBEEF5
                            text-align center
                            line-height 50px
                        .ul-8
                            flex 1
                            display flex
                            flex-direction row
                            align-items center
                            justify-content center
                            overflow hidden
                            border-top 1px solid #EBEEF5
                            height 50px
                            text-align center
                            line-height 50px
                            .el-checkbox-group
                                display flex
                        .ul-88
                            flex 1
                            display flex
                            flex-direction row
                            align-items center
                            justify-content center
                            overflow hidden
                            height 50px
                            text-align center
                            line-height 50px
                            .el-checkbox-group
                                display flex
                        .ul-9
                            margin-right 20px
                        .el-table thead tr
                            font-size 12px
                            color #262626
                            border-radius 4px 4px 0 0
                            height 50px
                        .el-table thead th
                            background #FAFAFA
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
                    margin-top 30px
            .tabs-mod
                height 30px
                margin-bottom 14px
</style>
