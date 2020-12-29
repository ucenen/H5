<template>
    <div class="parameterConfiguration">
        <div class="nav-top">
            <div class="nav-box">
                <img src="./icon-01.png"/>
                <p class="color-red" @click="addBrand">新增</p>
            </div>
            <!--<div class="nav-box">
                <img src="./icon-02.png"/>
                <p>删除</p>
            </div>
            <div class="nav-box">
                <img src="./icon-03.png"/>
                <p>导出</p>
            </div>-->
        </div>
        <div class="contain-mod">
            <div class="contain-top">
                <span class="search-btn">参数名称：</span>
                <el-input size="mini" class="w106 mr30" v-model="searchList.name"></el-input>
                <span class="search-btn">参数状态：</span>
                <el-tooltip class="w120 mr30" effect="dark" content="参数状态" placement="top-start">
                    <el-select size="mini" placeholder="参数状态" v-model="searchList.dataStatus">
                        <el-option
                                label="全部状态"
                                value="">
                        </el-option>
                        <el-option
                                v-for="item in dataStatusList"
                                :key="item"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-tooltip>
                <el-button size="mini" type="primary" plain class="mr22" @click="queryListFn">查询</el-button>
                <el-button size="mini" type="primary" @click="clearClk">清空</el-button>
            </div><!--
            <div class="contain-top noshadow">
                <el-checkbox size="mini" class="search-btn mr22">已选中0个文件</el-checkbox>
                <el-button size="mini" type="primary" plain class="mr22">复制</el-button>
                <el-button size="mini" type="primary" class="mr22" @click="delShow = true">删除</el-button>
                <el-button size="mini" type="primary" plain @click="moveShow = true">移动到</el-button>
            </div>-->
            <div class="result-con">
                <div class="pic-contain-mod">
                    <div class="pic-l-mod">
                        <h5>我的参数组</h5>
                        <div class="all-parement">
                            <p @click="selClk(item.id)" :class="defulatId == item.id ? 'act-on' : ''"
                               v-for="item in getAllList" :key="item">{{item.specsGroup}}
                                <i @click.stop="editDelClk(item)" class="el-icon-delete editdel-btn"></i>
                                <i @click.stop="editClk(item)" class="el-icon-edit edit-btn"></i>
                            </p>
                        </div>
                        <div class="add-tree-box">
                            <img @click="addBoxClk" src="./pic-icon3.png"/>
                        </div>
                    </div>
                    <div class="pic-r-mod">
                        <div class="tab-mod">
                            <el-table
                                    ref="multipleTable"
                                    :data="tableData"
                                    tooltip-effect="dark"
                                    style="width: 100%;"
                                    border>
                                <el-table-column
                                        prop="id"
                                        label="id">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="参数名称">
                                </el-table-column>
                                <el-table-column
                                        prop="value"
                                        label="参数字典值">
                                </el-table-column>
                                <el-table-column
                                        prop="memo"
                                        label="参数描述">
                                </el-table-column>
                                <el-table-column
                                        prop="categoryName"
                                        width="100"
                                        label="关联分类">
                                </el-table-column>
                                <el-table-column
                                        label="参数类型">
                                    <template slot-scope="scope">
                                        {{scope.row.type == 1 ? '一般属性' : '销售属性'}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        width="100"
                                        label="参数状态">
                                    <template slot-scope="scope">
                                        {{scope.row.dataStatus == 1 ? '已启用' : '未启用'}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        width="120"
                                        label="操作">
                                    <template slot-scope="scope">
                                        <!--scope.row-->
                                        <span class="scope_btn color-blue" @click="changeBrand(scope.row)">编辑</span>
                                        <span class="scope_btn" @click="delClk(scope.row.id,scope.row.type)">删除</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
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
        <!--loading-->
        <transition name="fade">
            <div class="loading-container" v-show="loadingShow">
                <loading :loadingText="loadingText"></loading>
            </div>
        </transition>
        <footerbar/>
        <el-dialog
                title="删除参数组"
                :visible.sync="delShow"
                width="30%"
                :close-on-click-modal="false"
                :close-on-press-escape="false">
            <div class="tip-contain">
                <p>是否确认<span>彻底删除</span>参数组？</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="delShow = false">取 消</el-button>
                <el-button type="primary" size="small" @click="delConfig">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :title="specsGroupTit"
                   width="40%"
                   :visible.sync="addBoxShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="add-contain">
                <el-form :model="form">
                    <el-form-item size="small" label="参数组名称：" :label-width="formLabelWidth">
                        <el-input v-model="form.specsGroup" autocomplete="off" maxlength="10"
                                  placeholder="请输入分组名称，长度不超过10个字"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="addBoxShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="addParamClk">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="titData"
                   class="minW"
                   :visible.sync="serachBoxShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <el-form :model="newform">
                <el-form-item size="small" label="参数ID：" :label-width="formLabelWidth" v-if="showId">
                    <el-input v-model="newform.id" :disabled="true" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item size="small" label="参数组：" :label-width="formLabelWidth">
                    <el-select v-model="newform.groupId" placeholder="请选择参数组" style="width:100%">
                        <el-option
                                v-for="item in getAllList"
                                :key="item"
                                :label="item.specsGroup"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="small" label="* 参数名称：" :label-width="formLabelWidth">
                    <el-input v-model="newform.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item size="small" label="* 关联分类：" :label-width="formLabelWidth">
                    <el-select v-model="mineStatus" placeholder="请选择" multiple style="width:100%"
                               @change="selectChange">
                        <el-option :value="mineStatusValue" style="height: auto">
                            <el-tree
                                    :data="data"
                                    show-checkbox
                                    node-key="id"
                                    ref="tree"
                                    highlight-current
                                    :props="defaultProps" @check-change="handleCheckChange"></el-tree>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="small" label="参数描述：" :label-width="formLabelWidth">
                    <el-input v-model="newform.memo" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item size="small" label="* 参数类型：" :label-width="formLabelWidth">
                    <el-select v-model="newform.type" placeholder="请选择参数类型" style="width:100%">
                        <el-option
                                v-for="item in typeList"
                                :key="item"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="small" label="* 是否启用：" :label-width="formLabelWidth">
                    <el-select v-model="newform.dataStatus" placeholder="是否启用" style="width:100%">
                        <el-option
                                v-for="item in dataStatusList2"
                                :key="item"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="small" label="* 参数字典值：" :label-width="formLabelWidth">
                    <div>
                        <el-tag
                                :key="tag"
                                v-for="tag in dynamicTags"
                                closable
                                :disable-transitions="false"
                                @close="handleClose(tag)">
                            {{tag}}
                        </el-tag>
                        <el-input
                                class="input-new-tag"
                                v-if="inputVisible"
                                v-model="inputValue"
                                ref="saveTagInput"
                                size="small"
                                @keyup.enter.native="handleInputConfirm"
                                @blur="handleInputConfirm"
                        >
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加参数规格</el-button>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="serachBoxShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="addBrandClk">保存</el-button>
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
        name: 'parameterConfiguration',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                loadingShow: false,
                loadingText: '正在加载中...',
                getAllList: [],
                defulatId: 0,
                searchList: {
                    name: '',//参数名称
                    dataStatus: ''//参数状态
                },
                dataStatusList: [
                    {
                        label: '已启用',
                        value: '1'
                    },
                    {
                        label: '未启用',
                        value: '2'
                    }
                ],
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                page_show: true,//分页显示
                tableData: [],
                form: {
                    specsGroup: ''//添加参数组
                },
                specsGroupTit: '新增参数组',
                delShow: false,
                addBoxShow: false,
                specsGroupId: '',
                titData: '新增属性',
                serachBoxShow: false,//新增修改参数弹窗显示
                newform: {
                    groupId: '',//参数组
                    name: '',//参数名称
                    memo: '',//参数描述
                    type: '1',//参数类型
                    dataStatus: '1'//是否启用值
                },
                dataStatusList2: [
                    {
                        label: '启用',
                        value: '1'
                    },
                    {
                        label: '暂不启用',
                        value: '2'
                    }
                ],
                typeList: [
                    {
                        label: '基础参数',
                        value: '1'
                    },
                    {
                        label: '销售参数',
                        value: '2'
                    }
                ],
                formLabelWidth: '120px',
                mineStatus: "",//关联分类值中文
                mineStatusValue: [],//关联分类值
                data: [],
                defaultProps: {
                    children: 'childList',
                    label: 'name'
                },
                dynamicTags: [],//参数字典
                inputVisible: false,
                inputValue: '',
                showId: false


            }
        },
        created() {
            this.$store.state.navTit = '商品';
            this.$store.state.navChildTit = '参数配置';
            this.getAllFn();
            this.categoryListFn();
        },
        methods: {
            getAllFn() {
                this.loadingShow = true;
                MyPost('/liquor-product/specsGroup/getAll').then((res) => {
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
            queryListFn() {
                this.loadingShow = true;
                MyPost('/liquor-product/specsGroup/queryList', {
                    groupId: this.defulatId,
                    name: this.searchList.name,
                    dataStatus: this.searchList.dataStatus,
                    start: (this.currentPage - 1) * 10,
                    length: 10
                }).then((res) => {
                    this.loadingShow = false;
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
            selClk(id) {
                this.defulatId = id;
                this.queryListFn();
            },
            clearClk() {
                this.searchList = {
                    name: '',//参数名称
                    dataStatus: ''//参数状态
                }
                this.queryListFn();
            },
            delClk(id, type) {
                this.loadingShow = true;
                MyPost('/liquor-product/property/del', {
                    id: id,
                    type: type
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.queryListFn();
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            addParamClk() {
                if (!this.form.specsGroup) {
                    return this.$message.error('请填写参数组名称');
                }
                if (this.specsGroupTit == '新增参数组') {
                    this.loadingShow = true;
                    MyPost('/liquor-product/specsGroup/save', {
                        specsGroup: this.form.specsGroup
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
                } else {
                    this.loadingShow = true;
                    MyPost('/liquor-product/specsGroup/upd', {
                        id: this.specsGroupId,
                        specsGroup: this.form.specsGroup
                    }).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.addBoxShow = false;
                            this.getAllFn();
                        } else {
                            this.$message.error(message);
                        }
                    })
                }
            },
            addBoxClk() {
                this.specsGroupTit = '新增参数组';
                this.form.specsGroup = '';
                this.addBoxShow = true;
            },
            editClk(item) {
                this.specsGroupId = item.id;
                this.specsGroupTit = '修改参数组';
                this.form.specsGroup = item.specsGroup;
                this.addBoxShow = true;
            },
            editDelClk(item) {
                this.specsGroupId = item.id;
                this.delShow = true;
            },
            delConfig() {
                this.loadingShow = true;
                MyPost('/liquor-product/specsGroup/del', {
                    id: this.specsGroupId
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
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            addBrand() {
                this.titData = '新增属性';
                this.showId = false;
                this.newform = {
                    groupId: '',//参数组
                    name: '',//参数名称
                    memo: '',//参数描述
                    type: '1',//参数类型
                    dataStatus: '1'//是否启用值
                }
                this.dynamicTags = [];
                this.inputValue = '';
                this.mineStatus = '';
                this.mineStatusValue = [];
                this.serachBoxShow = true;
            },
            brandCategoryFn(id, type) {
                this.loadingShow = true;
                MyPost('/liquor-product/property/propertyCategory', {
                    id: id,
                    type: type
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.$refs.tree.setCheckedNodes(data);//设置勾选的值
                        this.mineStatusValue = data;
                        this.mineStatus = data.map(item => {
                            return item.name
                        })
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            changeBrand(item) {
                this.titData = '修改属性';
                this.showId = true;
                this.newform = {
                    id: item.id,
                    groupId: item.specsGroupId,//参数组
                    name: item.name,//参数名称
                    memo: item.memo,//参数描述
                    type: item.type,//参数类型
                    dataStatus: item.dataStatus//是否启用值
                }
                if (!item.value){
                    this.dynamicTags = [];
                } else if (item.value && item.value.length == 1){
                    this.dynamicTags = [item.value];
                } else if (item.value.length > 1){
                    this.dynamicTags = item.value.split(',');
                }
                this.inputValue = '';
                this.changeId = item.id;
                this.brandCategoryFn(item.id, item.type);
                this.serachBoxShow = true;
            },
            addBrandClk() {
                if (this.newform.name == '') {
                    return this.$message.error('请填写参数名称');
                }
                if (this.mineStatus == '') {
                    return this.$message.error('请选择关联分类');
                }
                if (this.dynamicTags.length == 0) {
                    return this.$message.error('请添加参数规格');
                }
                let idList = this.mineStatusValue.map(item => {
                    return item.id
                })
                this.loadingShow = true;
                if (this.titData == '新增属性') {
                    MyPost('/liquor-product/property/save', {
                        categoryIdList: idList,
                        valueList: this.dynamicTags,
                        type: this.newform.type,
                        name: this.newform.name,
                        memo: this.newform.memo,
                        groupId: this.newform.groupId,
                        dataStatus: this.newform.dataStatus
                    }).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.$message({
                                message: '新增成功',
                                type: 'success'
                            });
                            this.serachBoxShow = false;
                            this.getAllFn();
                            this.categoryListFn();
                        } else {
                            this.$message.error(message);
                        }
                    })
                } else {
                    MyPost('/liquor-product/property/upd', {
                        id: this.changeId,
                        categoryIdList: idList,
                        valueList: this.dynamicTags,
                        type: this.newform.type,
                        name: this.newform.name,
                        memo: this.newform.memo,
                        groupId: this.newform.groupId,
                        dataStatus: this.newform.dataStatus
                    }).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.serachBoxShow = false;
                            this.getAllFn();
                            this.categoryListFn();
                        } else {
                            this.$message.error(message);
                        }
                    })
                }
            },
            categoryListFn() {
                this.loadingShow = true;
                MyGet('/liquor-product/category/categoryList').then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.data = data;
                    } else {
                        this.$message.error(message);
                    }
                })
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
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .parameterConfiguration
        .el-tag + .el-tag {
            margin-left: 10px;
        }
        .button-new-tag {
            margin-left: 10px;
            height: 32px;
            line-height: 30px;
            padding-top: 0;
            padding-bottom: 0;
        }
        .input-new-tag {
            width: 90px;
            margin-left: 10px;
            vertical-align: bottom;
        }
        .all-parement
            overflow hidden
            padding-bottom 20px
            p
                color #333
                font-size 14px
                line-height 30px
                height 30px
                margin-left 30px
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
        .el-dialog__body
            padding 0 20px
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
                            padding 15px 0 15px 6px
                        .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content
                            background #fff
                            color #0D81DB
                        .pic-tree
                            margin 0 30px 30px 30px
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
