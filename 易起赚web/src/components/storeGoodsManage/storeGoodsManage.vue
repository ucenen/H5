<template>
    <div class="storeGoodsManage">
        <div class="return-line">
            <span @click="goPage">返回</span>
        </div>
        <div class="add-mod-con">
            <div class="add-mod-one">
                <h3><em></em>新增商品模板</h3>
                <div class="add-box">
                    <span class="add-tip">* 模板名称：</span>
                    <el-input size="small" class="add-ipt"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">* 类型：</span>
                    <el-select size="small" class="add-ipt" placeholder="状态">
                        <el-option
                                label="item.label"
                                value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="add-box">
                    <span class="add-tip">模板描述：</span>
                    <el-input size="small" class="add-ipt"></el-input>
                </div>
            </div>
            <div class="add-mod-two">
                <h3><em></em>选择商品</h3>
                <div class="pic-contain-mod">
                    <div class="store-tips">
                        <h5>示范区商品：</h5>
                        <h5 class="tips_r">门店已配置商品：</h5>
                    </div>
                    <div class="pic-l-mod">
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
                                    :data="tableData"
                                    tooltip-effect="dark"
                                    style="width: 100%;"
                                    border>
                                <el-table-column
                                        label="SKU编号">
                                    <template slot-scope="scope">{{ scope.row.date }}</template>
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="商品名称">
                                </el-table-column>
                                <el-table-column
                                        label="操作">
                                    <template slot-scope="scope">
                                        <!--scope.row-->
                                        <el-switch
                                                active-color="#13ce66">
                                        </el-switch>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div class="pic-r-mod">
                        <div class="tab-mod">
                            <el-table
                                    :data="tableData"
                                    tooltip-effect="dark"
                                    style="width: 100%;"
                                    border>
                                <el-table-column
                                        label="分类">
                                    <template slot-scope="scope">{{ scope.row.date }}</template>
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="SKU编号">
                                </el-table-column>
                                <el-table-column
                                        prop="address1"
                                        label="商品名称">
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btn-group">
                <el-button type="primary" plain>取消</el-button>
                <el-button type="primary">确认</el-button>
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
        name: 'storeGoodsManage',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                value1: '',
                dialogImageUrl: '',
                dialogVisible: false,
                fileList: [], // 上传文件列表
                hideUpload: false,
                limitCount: 3,
                srcList: [
                    require('./icon-01.png')
                ],
                url: require('./icon-01.png'),
                checked: true,
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
            }
        },
        created() {
            this.$store.state.navTit = '门店';
            this.$store.state.navChildTit = '门店商品';
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
            handleRemove(file, fileList) {
                console.log(file, fileList);
                this.fileList = [];
                this.hideUpload = this.fileList.length >= this.limitCount;
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            uploadBefore(file) {
                // 上传之前
                this.fileList = []
                /*if (!file.name || (!file.name.endsWith('.xls') && !file.name.endsWith('.xlsx'))) {
                    this.$message.error('上传文件必须为excel文件')
                    return false
                }
                var size = file.size / 1024;
                if (size > 5000) {
                    this.$message.error('文件过大，请限制在5M以下')
                    return false
                }
                this.fileUploadName = file.name;
                this.loadingText = '正在上传中。。。';
                this.loadingShow = true;*/
                console.log(file)
                this.fileList.push(file);
            },
            uploadFail(err, file, fileList) {
                /*this.loadingShow = false;
                // 上传失败，刷新界面
                this.$message.error('上传失败');
                this.fileList = [];*/
                this.$message.error('上传失败');
            },
            uploadSuccess(response, file, fileList) {
                console.log(response)
                console.log(file)
                console.log(fileList)
                this.fileList.push(file);
                this.hideUpload = this.fileList.length >= this.limitCount;
                /*this.loadingShow = false;
                this.$message({
                    message: '上传成功',
                    type: 'success'
                });*/
                // 上传成功后
            },
            goPage() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .storeGoodsManage
        .hide .el-upload--picture-card
            display none
        .return-line
            background #fff
            box-shadow 0px 0px 6px 0px rgba(174, 174, 174, 0.14)
            height 36px
            position fixed
            z-index 2
            width 100%
            span
                font-size 12px
                color #308BDE
                line-height 36px
                cursor pointer
                margin-left 16px
        .add-mod-con
            padding-top 36px
            overflow hidden
            background #fff
            .add-mod-one
                padding-bottom 30px
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
                    height 36px
                    margin-bottom 22px
                    .add-tip
                        width 184px
                        text-align right
                        line-height 36px
                        font-size 12px
                        color #333
                        margin-right 40px
                        display inline
                        float left
                    .add-ipt
                        height 36px
                        width 410px
                        float left
                    .add-ipt-sel
                        float left
                        width 150px
                        margin-right 20px
                    .mr0
                        margin-right 0
                    .el-input--small .el-input__inner
                        height 36px
                        line-height 36px
                    .add-tips
                        font-size 12px
                        color #C13A3C
                        line-height 36px
                        margin-left 26px
                        float left
                        display inline
                    .add-check
                        float left
                        margin 8px 0 0 26px
                        display inline
            .add-mod-line
                overflow hidden
                .add-box
                    float left
                    width 520px
                    .add-ipt
                        width 230px
            .add-mod-two
                padding-bottom 30px
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
                .pic-contain-mod
                    overflow hidden
                    margin 0 10px
                    .store-tips
                        overflow hidden
                        h5
                            float left
                            font-size 14px
                            color #333
                            font-weight bold
                            line-height 30px
                            margin-bottom 10px
                        .tips_r
                            float right
                            margin-right 30%
                            display inline
                    .pic-l-mod
                        width 220px
                        float left
                        border 1px solid #EEEEEE
                        padding-top 20px
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
                        width 38%
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
                .update-box
                    margin 22px 22px 0 40px
                    border 2px dashed #e5e5e5
                    padding 32px 0 0 44px
                    overflow hidden
                    h4
                        line-height 18px
                        font-size 16px
                        color #333
                        margin-bottom 16px
                    h5
                        line-height 16px
                        font-size 14px
                        color #333
                        margin-bottom 30px
                        margin-left 20px
                    .upload-img-box
                        overflow hidden
                        .img-tip
                            text-align right
                            font-size 14px
                            color #333
                            line-height 16px
                            width 176px
                            height 20px
                            padding-right 54px
                            float left
                        .lineh36
                            line-height 36px
                            height 36px
                        .upload-ipt
                            float left
                            width 500px
                            height 36px
                        .el-input--small .el-input__inner
                            height 36px
                            line-height 36px
                        .img-con
                            float left
                            overflow hidden
                            .img-center
                                float left
                            .demo-image__preview
                                width 140px
                                height 140px
                                margin-left 20px
                                float left
                        .desc-con
                            width 100%
                            padding 16px 0 18px 0
                            overflow hidden
                            p
                                padding-left 230px
                                font-size 12px
                                color #3738C9
                                line-height 20px
                        .el-upload--picture-card {
                            background-color #fbfdff
                            border 1px dashed #c0ccda
                            border-radius 6px
                            box-sizing border-box
                            width 140px
                            height 140px
                            line-height 138px
                            vertical-align top
                        }
                        .el-upload--picture-card:hover
                            border 1px dashed #C13A3C
                        .el-upload-list--picture-card .el-upload-list__item
                            width 140px
                            height 140px
                    .mb20
                        margin-bottom 20px
            .btn-group
                text-align center
                padding 0 0 40px 0
                overflow hidden
</style>
