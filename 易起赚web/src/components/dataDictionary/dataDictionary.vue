<template>
    <div class="dataDictionary">
        <div class="nav-top">
            <div class="nav-box" @click="addRow" v-if="functionCodes.indexOf('AD')>-1">
                <img src="../../framework/images/addNew.png"/>
                <p>新增</p>
            </div>
            <div class="nav-box" @click="delAllClk" v-if="functionCodes.indexOf('DE')>-1">
                <img src="./icon-02.png"/>
                <p>删除</p>
            </div>
            <div class="nav-box" @click="saveAll('formData')" v-if="functionCodes.indexOf('BC')>-1">
                <img src="static/img/save.png"/>
                <p>保存</p>
            </div>
            <div class="nav-box">
                <img src="./icon-04.png"/>
                <p @click="queryListFn">刷新</p>
            </div>
        </div>
        <div class="contain-mod">
            <div class="contain-top">
                <span class="search-btn">资料类别：</span>
                <el-input size="mini" class="w106 mr30" @keyup.enter.native="queryListFn"
                          v-model="search_list.name"></el-input>
                <el-button size="mini" type="primary" plain class="mr22" @click="queryListFn">查询</el-button>
                <el-button size="mini" type="primary" @click="clearFn">清空</el-button>
            </div>
            <div class="result-con-dic">
                <div class="pic-l-mod">
                    <el-table
                            ref="singleTable"
                            height="60vh"
                            :data="tableData"
                            tooltip-effect="dark"
                            style="width: 100%;"
                            :show-header="false"
                            highlight-current-row
                            @row-click="rowClick"
                            border>

                        <el-table-column
                                align="center"
                                prop="name">
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pic-r-mod">
                    <el-form ref="formData" :model="dataForm"
                    >
                        <el-table :data="dataForm.dictionaryValueList"
                                  tooltip-effect="dark"
                                  height="60vh"
                                  style="width: 100%;"
                                  @selection-change="handleSelectionChange"
                                  highlight-current-row
                                  border>
                            <el-table-column
                                    type="selection"
                                    align="center"
                                    :selectable="checkSelectable"
                                    width="55">
                            </el-table-column>

                            <el-table-column
                                    label="类别字段代码"
                                    align="center">
                                <template slot-scope="scope">
                                    <!--scope.row-->

                                    <el-form-item style="width: 100%;"
                                                  :prop="'dictionaryValueList.'+scope.$index+'.dictionaryKey'"
                                                  :rules="codeRules">
                                        <el-input style="width: 100%" size="small"
                                                  v-model="scope.row.dictionaryKey"
                                                  :disabled="scope.row.updType==1||scope.row.updType==4"
                                        ></el-input>
                                    </el-form-item>


                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="类别字段值"
                                    align="center">
                                <template slot-scope="scope">
                                    <!--scope.row-->
                                    <el-form-item style="width: 100%;"
                                                  :prop="'dictionaryValueList.'+scope.$index+'.dictionaryValue'"
                                                  :rules="valueRules">
                                        <el-input style="width: 100%" size="small"
                                                  v-model="scope.row.dictionaryValue" :disabled="scope.row.updType==1"
                                        ></el-input>
                                    </el-form-item>
                                    <!--                                <el-input size="small" v-model="scope.row.dictionaryValue" :disabled="scope.row.updType==1"-->
                                    <!--                                          autocomplete="off"></el-input>-->
                                </template>
                            </el-table-column>


                        </el-table>
                    </el-form>
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

    </div>
</template>

<script>
    import store from 'si-store'
    import {MyGet, MyPost, MyPostJson} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../footerbar/footerbar.vue'

    export default {
        name: 'dataDictionary',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                codeRules: [{required: true, message: '请输入类别字段代码', trigger: 'blur'}],
                valueRules: [{required: true, message: '请输入类别字段值', trigger: 'blur'}],
                loadingShow: false,
                loadingText: '正在加载中...',
                tableData: [
                    // {name: '测试1', id: '1'}

                ],
                page_show: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                search_list: {
                    name: ''//字典名称
                },

                delShow: false,
                delId: '',
                edtId: '',
                isNeedFresh: false,//是否要刷新页面
                multipleSelection: [],
                dialogFormVisible: false,
                dataForm: {
                    // name: '这是测试',
                    // englishAbbreviation: '测试简称',
                    // memo: '这是一个字典测试',
                    // dictionaryValueList: [
                    //     {
                    //         orderNumber: '1',
                    //         dictionaryId: '1',
                    //         dictionaryKey: '王小虎',
                    //         dictionaryValue: '金沙江路 1518 弄',
                    //         updType: '4'//1.不可修改 2.可修改
                    //     }
                    // ]
                },
                currentItem: {},
                step: 0,
                functionCodes: [],


            }
        },
        created() {
            this.$store.state.navTit = '系统管理';
            this.$store.state.navChildTit = '字典维护';
            this.getFunctionCode(this, this.$route.query.code);
            this.queryListFn();
        },
        methods: {
            saveAll(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        //如果通过验证 to do...
                        console.log('submit!!')

                        this.loadingShow = true;
                        MyPostJson('/yl-ms-platform/dictionary/updDic', {
                            id: this.edtId,
                            // dictionaryId: this.edtId,
                            dictionaryValueList: this.dataForm.dictionaryValueList,
                            // dictionaryKey: item.dictionaryKey,
                            // orderNumber: item.orderNumber
                        }).then((res) => {
                            this.loadingShow = false;
                            let {code, message, data} = res;
                            if (code == '0') {
                                this.$message({
                                    message:'保存成功',
                                    type: 'success'
                                });
                                this.isNeedFresh = true;
                                this.editClk(this.edtId)
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
                        console.log('error submit!!')
                        return false
                    }
                })
                // return

            },
            checkSelectable(row, index) {
                let flag = true;
                if (row.updType == 1) {
                    flag = false
                }
                return flag
            },
            rowClick(row, event, column) {
                this.currentItem = row
                this.editClk(row.id)
                this.$refs['formData'].resetFields();
            },
            delAllClk() {

                if (this.multipleSelection.length == 0) {
                    this.$confirm('请选择一条记录', '提示', {
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
                this.delShow = true;
            },
            addRow() {
                if (this.currentItem.updDicType == 1)//不可修改
                {
                    this.$message({
                        message: '无法添加',
                        type: 'warning'
                    })
                    return
                }
                if (this.dataForm.dictionaryValueList && this.dataForm.dictionaryValueList.length > 0)

                    this.dataForm.dictionaryValueList.unshift({
                        dictionaryId: this.dataForm.id.toString(),
                        dictionaryKey: '',
                        dictionaryValue: '',
                        addDictionary: true
                    })
                else
                    this.dataForm.dictionaryValueList = [{
                        dictionaryId: this.dataForm.id,
                        dictionaryKey: '',
                        dictionaryValue: '',
                        addDictionary: true
                    }]
            },
            setCurrent(row) {
                this.currentItem = row
                this.$refs.singleTable.setCurrentRow(row);
            },
            modifyClk(item) {
                if (item.updType == 1)
                    return
                this.loadingShow = true;
                MyPost('/yl-ms-platform/dictionary/updateDictionaryValue', {
                    Id: item.id,
                    dictionaryId: this.edtId,
                    dictionaryValue: item.dictionaryValue,
                    dictionaryKey: item.dictionaryKey,
                    orderNumber: item.orderNumber
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.$message({
                            message: '更新成功',
                            type: 'success'
                        });
                        this.isNeedFresh = true;
                        // this.editClk(this.edtId)
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            addValue(item) {
                if (!item.dictionaryKey || !item.dictionaryValue) {
                    this.$message({
                        message: '请填写Key和字典值',
                        type: 'warning'
                    })
                    return
                }
                console.log('item' + JSON.stringify(item))
                this.loadingShow = true;
                MyPost('/yl-ms-platform/dictionary/insertDictionaryValue', {
                    dictionaryId: item.dictionaryId,
                    dictionaryValue: item.dictionaryValue,
                    dictionaryKey: item.dictionaryKey,
                    orderNumber: item.orderNumber
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });

                        this.isNeedFresh = true;
                        this.editClk(this.edtId)
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            clearFn() {
                this.search_list = {
                    name: ''//字典名称
                }
            },
            configClk() {

                // this.$refs['formData'].resetFields()
                for (var i = 0; i < this.multipleSelection.length; i++) {
                    if (this.multipleSelection[i].addDictionary) {
                        if (this.dataForm.dictionaryValueList && this.dataForm.dictionaryValueList.length > 0)
                            this.dataForm.dictionaryValueList.shift();
                        this.multipleSelection.splice(i, 1)
                        i = i - 1
                    }
                }

                if (this.multipleSelection.length == 0) {
                    this.delShow = false;
                    return
                }
                this.loadingShow = true;
                let newIds = this.multipleSelection.map(item => {
                    return item.id
                })
                MyPost('/yl-ms-platform/dictionary/deleteDictionaryValue', {
                    ids: newIds.join(',')
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.delShow = false;

                        this.isNeedFresh = true;
                        this.editClk(this.edtId)
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
            // toggleSelection(rows) {
            //     if (rows) {
            //         rows.forEach(row => {
            //             this.$refs.multipleTable.toggleRowSelection(row);
            //         });
            //     } else {
            //         this.$refs.multipleTable.clearSelection();
            //     }
            // },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(val)
            },
            queryListFn() {
                // this.setCurrent(this.tableData[0])
                //  this.$refs.singleTable.setCurrentRow(this.tableData[0])
                MyGet('/yl-ms-platform/dictionary/getDicList', {
                    name: this.search_list.name,//字典名称
                    // start: (this.currentPage - 1) * 10,
                    // length: 10
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.tableData = data;
                        this.setCurrent(this.tableData[0])
                        this.editClk(this.tableData[0].id)
                        if (data.length == 0) {
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
            editClk(itemId) {
                this.edtId = itemId
                MyGet('/yl-ms-platform/dictionary/getDic', {
                    id: this.edtId//字典id
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        if (data) {
                            this.dialogFormVisible = true
                        } else {
                            this.dialogFormVisible = false
                        }
                        this.dataForm = data;
                    } else {
                        this.dialogFormVisible = false;
                        this.$message.error(message);
                    }
                })

            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">


    .el-popover
        padding 12px 12px 4px 12px

        .money-box
            text-align center
            overflow hidden


    .dataDictionary
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
            /*height 90%*/
            padding-right 18px
            padding-top 40px

            .contain-top
                overflow hidden
                margin-top 5px

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

                .mr30
                    margin-right 30px

                .mr22
                    margin-right 22px

                .el-button + .el-button
                    margin-bottom 15px

            .result-con-dic

                padding 0px 0px 0px 0px
                display flex


                .pic-l-mod
                    width 220px
                    float left

                    /*border 1px solid #EEEEEE*/

                    .el-table__body tr.current-row > td {
                        background-color: #EFEEF1 !important;
                        color #3388E4
                        /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
                    }
                    .el-table
                        height -moz-calc(50vh)
                        height -webkit-calc(50vh)
                        height calc(50vh)
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

                .pic-r-mod
                    /*float left*/
                    overflow hidden
                    margin-left 16px
                    display inline
                    flex 1

                    .el-form-item
                        margin-bottom 18px
                        margin-top 18px

                        .el-form-item__error
                            padding-top 0px
                            font-size 10px

                    .el-table__body tr.current-row > td {
                        background-color: #EEF6FF !important;
                        /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
                    }

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
                        width 100%

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


</style>
