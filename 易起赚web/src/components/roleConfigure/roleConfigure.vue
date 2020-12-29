<template>
    <div class="roleConfigure">
        <div class="contain-mod">
            <div class="result-con">
                <div class="pic-contain-mod">
                    <div class="pic-l-mod">
                        <el-select size="small" class="role-select" placeholder="品牌管理">
                            <el-option
                                    label="item.label"
                                    value="item.value">
                            </el-option>
                        </el-select>
                        <el-input size="small" placeholder="请输入内容" class="role-search"></el-input>
                        <el-tree :data="data"
                                 class="pic-tree"
                                 :props="defaultProps"
                                 :default-expand-all="true"
                                 :expand-on-click-node="false"
                                 :highlight-current="true"
                                 @node-click="handleNodeClick"></el-tree>
                    </div>
                    <div class="pic-r-mod">
                        <div class="tab-mod">
                            <el-table
                                    ref="multipleTable"
                                    :data="tableData"
                                    tooltip-effect="dark"
                                    style="width: 100%;"
                                    border
                                    @selection-change="handleSelectionChange">
                                <el-table-column
                                        type="selection"
                                        width="55">
                                </el-table-column>
                                <el-table-column
                                        label="按钮">
                                    <template slot-scope="scope">{{ scope.row.date }}</template>
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="权限编码">
                                </el-table-column>
                                <el-table-column
                                        prop="address1"
                                        label="资源路径">
                                </el-table-column>
                                <el-table-column
                                        prop="address2"
                                        label="方式">
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
                <div class="btn-group">
                    <el-button type="primary">保存</el-button>
                    <el-button type="primary" plain>取消</el-button>
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
    </div>
</template>

<script>
    import store from 'si-store'
    import {MyGet, MyPost} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../footerbar/footerbar.vue'

    export default {
        name: 'roleConfigure',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                tableData: [
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address1: '上海市普陀区金沙江路 1518 弄',
                        address2: '上海市普陀区金沙江路 1518 弄',
                        address3: '上海市普陀区金沙江路 1518 弄',
                        address4: '上海市普陀区金沙江路 1518 弄',
                        address5: '13764473603',
                        address6: '上海市普陀区金沙江路 1518 弄',
                        address7: '2020年10/22',
                        address8: '上海市普陀区金沙江路 1518 弄',
                        address9: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address1: '上海市普陀区金沙江路 1518 弄',
                        address2: '上海市普陀区金沙江路 1518 弄',
                        address3: '上海市普陀区金沙江路 1518 弄',
                        address4: '上海市普陀区金沙江路 1518 弄',
                        address5: '13764473603',
                        address6: '上海市普陀区金沙江路 1518 弄',
                        address7: '2020年10/22',
                        address8: '上海市普陀区金沙江路 1518 弄',
                        address9: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address1: '上海市普陀区金沙江路 1518 弄',
                        address2: '上海市普陀区金沙江路 1518 弄',
                        address3: '上海市普陀区金沙江路 1518 弄',
                        address4: '上海市普陀区金沙江路 1518 弄',
                        address5: '13764473603',
                        address6: '上海市普陀区金沙江路 1518 弄',
                        address7: '2020年10/22',
                        address8: '上海市普陀区金沙江路 1518 弄',
                        address9: '上海市普陀区金沙江路 1518 弄'
                    }
                ],
                multipleSelection: [],
                page_show: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 100,//总共分页数据条数
                reveiwForm: {
                    name: '',
                    radio: '1'
                },
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',
                uploadShow: false,//上传弹框显示
                data: [
                    {
                        label: '一级 1',
                        children: [{
                            label: '二级 1-1'
                        }]
                    }, {
                        label: '一级 2',
                        children: [{
                            label: '二级 2-1'
                        }, {
                            label: '二级 2-2'
                        }]
                    }, {
                        label: '一级 3',
                        children: [{
                            label: '二级 3-1'
                        }, {
                            label: '二级 3-2'
                        }]
                    }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                delShow: false,
                addBoxShow: false
            }
        },
        created() {
            this.$store.state.navTit = '门店';
            this.$store.state.navChildTit = '门店角色';
        },
        methods: {
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                //this.tab_fn();
            },
            goInfor() {
                this.$router.push({
                    path: '/enterpriseInfor'
                })
            },
            goPage() {
                this.$router.push({
                    path: '/pictureLibraryManagement'
                })
            },
            handleNodeClick(data) {
                console.log(data);
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .roleConfigure
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
                padding 10px 18px 40px 18px
                .pic-contain-mod
                    overflow hidden
                    .pic-l-mod
                        width 220px
                        float left
                        border 1px solid #EEEEEE
                        .role-select
                            width 200px
                            margin 20px auto
                            display block
                        .role-search
                            width 200px
                            margin 0 auto 10px auto
                            display block
                        h5
                            font-size 14px
                            color #333
                            line-height 20px
                            padding 15px 0 15px 6px
                        .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content
                            background #fff
                            color #0D81DB
                        .pic-tree
                            margin 0 10px 30px 10px
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
        .btn-group
            text-align center
            padding 20px 0 30px 0
            overflow hidden
</style>
