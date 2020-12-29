<template>
    <div class="parameterConfiguration">
        <div class="nav-top">
            <div class="nav-box">
                <img src="./icon-01.png"/>
                <p class="color-red" @click="addBrand">新增</p>
            </div>
            <div class="nav-box">
                <img src="./icon-02.png"/>
                <p>删除</p>
            </div>
            <div class="nav-box">
                <img src="./icon-03.png"/>
                <p>导出</p>
            </div>
        </div>
        <div class="contain-mod">
            <div class="contain-top">
                <span class="search-btn">菜单名称：</span>
                <el-input size="mini" class="w106 mr30" v-model="searchList.name"></el-input>
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
                    <div class="pic-r-mod">
                        <div class="tab-mod">
                            <el-table
                                    ref="multipleTable"
                                    :data="tableData"
                                    tooltip-effect="dark"
                                    style="width: 100%;"
                                    border>
                                <el-table-column
                                        type="selection"
                                        width="55">
                                </el-table-column>
                                <el-table-column
                                        prop="code"
                                        label="菜单编号">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="菜单名称">
                                </el-table-column>
                                <el-table-column
                                        prop="parentName"
                                        label="上级目录">
                                </el-table-column>
                                <el-table-column
                                        prop="smallIconUrl"
                                        label="菜单图标">
                                </el-table-column>
                                <el-table-column
                                        prop="sort"
                                        label="排序">
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
                    <el-form-item size="small" label="按钮名称：" :label-width="formLabelWidth">
                        <el-input v-model="form.specsGroup" autocomplete="off" maxlength="10"
                                  placeholder="请输入分组名称，长度不超过10个字"></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="按钮Code：" :label-width="formLabelWidth">
                        <el-input v-model="form.specsGroupCode" autocomplete="off" maxlength="10"
                                  placeholder="请输入分组Code，长度不超过10个字"></el-input>
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
                <el-form-item size="small" label="* 菜单编号：" :label-width="formLabelWidth">
                    <el-input v-model="newform.code" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item size="small" label="* 菜单名称：" :label-width="formLabelWidth">
                    <el-input v-model="newform.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item size="small" label="上级目录：" :label-width="formLabelWidth">
                    <el-autocomplete
                            v-model="newform.groupId"
                            :fetch-suggestions="querySearchAsync"
                            placeholder="请输入内容"
                            @select="handleSelect"
                            style="width:100%"
                    ></el-autocomplete>
                </el-form-item>
                <el-form-item size="small" label="* 菜单图标：" :label-width="formLabelWidth">
                    <el-select v-model="newform.smallUrl" placeholder="请选择" style="width:75%">
                        <el-option
                                v-for="item in imageList"
                                :key="item"
                                :label="item.url"
                                :value="item.url">
                            <el-image
                                    style="width: 30px;height: auto"
                                    :src="item.url"
                                    fit="contain"></el-image>
                        </el-option>
                    </el-select>
                    <div style="float: right;">
                        <el-button class="button-new-tag" size="small" @click="showPicture">+ 新增图标</el-button>
                    </div>
                </el-form-item>
                <el-form-item size="small" label="* 排序：" :label-width="formLabelWidth">
                    <el-input v-model="newform.sort" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item size="small" label="* 菜单入口：" :label-width="formLabelWidth">
                    <el-select v-model="newform.type" placeholder="请选择" style="width:100%">
                        <el-option
                                v-for="item in typeList"
                                :key="item"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item size="small" label="* 功能按钮：" :label-width="formLabelWidth">
                    <div>
                        <el-button class="button-new-tag" size="small" @click="addBoxClk">+ 新增按钮</el-button>
                    </div>
                </el-form-item>
                <el-form-item size="small" label="" :label-width="formLabelWidth">
                    <el-checkbox-group v-model="newform.checkDatas" @change="handleCheckedCitiesChange" size="small">
                        <el-checkbox v-for="city in checkLists" border :label="city" :key="city">{{city.name}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="serachBoxShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="addBrandClk">保存</el-button>
            </div>
        </el-dialog>
        <el-dialog title="上传图片"
                   class="minW"
                   :visible.sync="uploadShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="upload-contain">
                <div class="upload-box">
                    <el-upload
                            class="upload-demo"
                            ref="upload"
                            :data="picForm"
                            drag
                            :file-list="picForm.files"
                            action="/yl-ms-platform/imageFileApi/upload"
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
                checkLists: [
                    "新增"
                ],
                imageList: [],
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
                    specsGroup: '',//添加参数组
                    specsGroupCode:''
                },
                specsGroupTit: '新增按钮',
                delShow: false,
                addBoxShow: false,
                specsGroupId: '',
                titData: '新增菜单',
                newform: {
                    code: '',//菜单编号
                    name: '',//菜单名称
                    groupId: '',//上级目录
                    smallUrl: '',//图片地址
                    sort: '',//排序
                    type: '',//菜单入口对应的类型
                    checkDatas: [],//菜单被选择项

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
                        label: '示范区管理后台',
                        value: '1'
                    }
                ],
                serachBoxShow: false,//新增修改参数弹窗显示
                uploadShow: false,//上传图片的弹窗
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
                showId: false,
                picForm: {
                    categoryId: '',
                    files: []
                },

            }
        },
        created() {
            this.$store.state.navTit = '系统';
            this.$store.state.navChildTit = '菜单维护';
            this.getAllFn();
            this.categoryListFn();
        },
        methods: {
            submitUpload() {
                this.$refs.upload.submit();
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
            showPicture() {
                this.uploadShow = true
            },
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
                MyPost('/yl-ms-platform/functionApi/ajaxGetFunctionList', {
                    name: this.searchList.name,
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
                this.loadingShow = true;
                MyPost('/yl-ms-platform/actionApi/addActionInfo', {
                    name: this.form.specsGroup,
                    code: this.form.specsGroupCode
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.$message({
                            message: '新增成功',
                            type: 'success'
                        });
                        this.addBoxShow = false;
                        this.GetAllActionList();
                    } else {
                        this.$message.error(message);
                    }
                })

            },
            addBoxClk() {
                this.specsGroupTit = '新增按钮';
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
                this.titData = '新增菜单';
                this.showId = false;
                this.newform = {
                    code: '',//菜单编号
                    name: '',//菜单名称
                    groupId: '',//上级目录
                    smallUrl: '',//图片地址
                    sort: '',//排序
                    type: '',//菜单入口对应的类型
                    checkDatas: [],//菜单被选择项

                }
                this.dynamicTags = [];
                this.inputValue = '';
                this.mineStatus = '';
                this.mineStatusValue = [];
                this.serachBoxShow = true;
                this.getImageList();
                this.GetAllActionList();
            },
            getImageList() {
                MyPost('/yl-ms-platform/functionApi/getIconList', {}).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.imageList = data;
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            GetAllActionList() {
                MyPost('/yl-ms-platform/actionApi/GetAllActionList', {}).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.checkLists = data;
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length
                console.log(value);
            },
            handleSelect(item) {
                console.log(item);
            },
            querySearchAsync(queryString, cb) {
                MyPost('/yl-ms-platform/functionApi/ajaxGetParentFunctionList', {
                    name: queryString,
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {

                        for (var i = 0; i < data.length; i++) {
                            data[i].value = data[i].name;
                        }
                        cb(data)
                    } else {
                        this.$message.error(message);
                    }
                })
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
                this.titData = '修改菜单';
                this.showId = true;
                this.newform = {
                    id: item.id,
                    groupId: item.specsGroupId,//参数组
                    name: item.name,//参数名称
                    memo: item.memo,//参数描述
                    type: item.type,//参数类型
                    dataStatus: item.dataStatus//是否启用值
                }
                if (!item.value) {
                    this.dynamicTags = [];
                } else if (item.value && item.value.length == 1) {
                    this.dynamicTags = [item.value];
                } else if (item.value.length > 1) {
                    this.dynamicTags = item.value.split(',');
                }
                this.inputValue = '';
                this.changeId = item.id;
                this.brandCategoryFn(item.id, item.type);
                this.serachBoxShow = true;
            },
            addBrandClk() {

                if (this.newform.code == '') {
                    return this.$message.error('请填写菜单编号');
                }
                if (this.newform.name == '') {
                    return this.$message.error('请填写菜单名称');
                }
                if (this.newform.groupId == '') {
                    return this.$message.error('请填写上级目录');
                }
                if (this.newform.smallUrl == '') {
                    return this.$message.error('请填写图片地址');
                }
                if (this.newform.sort == '') {
                    return this.$message.error('请填写排序');
                }
                if (this.newform.type == '') {
                    return this.$message.error('请选择菜单入口');
                }
                if (this.newform.checkDatas == '') {
                    return this.$message.error('请选择按钮');
                }
                this.loadingShow = true;
                if (this.titData == '新增菜单') {
                    MyPost('/yl-ms-platform/functionApi/ajaxAddFunction', {
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
        .el-checkbox.is-bordered+.el-checkbox.is-bordered {
            margin-left: 0px !important;
        }
        .el-tag + .el-tag {
            margin-left: 10px;
        }
        .button-new-tag {
            /*margin-left: 10px;*/
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
                        display inline
                        width 100%
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
