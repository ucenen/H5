<template>
    <div class="commodityList">
        <div class="return-line">
            <span @click="goPage">返回</span>
        </div>
        <div class="contain-mod">
            <h3><em></em>选择商品:</h3>
            <div class="contain-top">
                <span class="search-btn">商品名称：</span>
                <el-input size="mini" maxlength="50" class="w106 mr30" v-model="searchList.name"></el-input>
                <span class="search-btn">商品类别：</span>
                <el-cascader  class="w106 mr30"  :options="options" :props="props" :disabled="showDisable" v-model="searchList.skuCode" @change="getPropertyFn" :show-all-levels="false"></el-cascader>
                <span class="search-btn">商品状态：</span>
                <el-tooltip class="w120 mr30" effect="dark" content="商品状态" placement="top-start">
                    <el-select size="mini" placeholder="全部" v-model="searchList.skuStatus">
                        <el-option
                                v-for="item in getAllCategoryList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-tooltip>
                <span class="search-btn">上架状态：</span>
                <el-tooltip class="w120 mr30" effect="dark" content="是否启用" placement="top-start">
                    <el-select size="mini" placeholder="全部" v-model="searchList.status">
                        <el-option
                                label="全部"
                                value="">
                        </el-option>
                        <el-option
                                label="下架"
                                value="1">
                        </el-option>
                        <el-option
                                label="上架"
                                value="2">
                        </el-option>
                    </el-select>
                </el-tooltip>
                <el-button size="mini" type="primary" plain class="mr22" @click="queryListFn">查询</el-button>
                <el-button size="mini" type="primary" @click="clearFn">清空</el-button>
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
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="spuNumber"
                                label="SPU编号">
                        </el-table-column>
                        <el-table-column
                                prop="spuName"
                                label="商品名称">
                        </el-table-column>
                        <el-table-column
                                label="商品主图">
                            <template slot-scope="scope">
                                <el-image :src="scope.row.url">
                                    <div slot="error" style="font-size: 40px;" class="image-slot">
                                        <i class="el-icon-picture-outline"></i>
                                    </div>
                                </el-image>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="categoryName"
                                label="商品类别">
                        </el-table-column>
                        <el-table-column
                                label="商品状态">
                            <template slot-scope="scope">{{ scope.row.auditStatus == 1 ? '待提交' : '已提交' }}</template>
                        </el-table-column>
                        <el-table-column
                                label="上架状态">
                            <template slot-scope="scope">{{ scope.row.shelfState == 1 ? '下架' : '上架' }}</template>
                        </el-table-column>
                        <el-table-column
                                prop="skuCount"
                                width="100"
                                label="SKU数">
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
                <div class="btn-group">
                    <el-button type="primary" @click="configClk">下一步，填写商品信息</el-button>
                    <!--<el-button type="primary" plain>取消</el-button>-->
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
    import {MyGet, MyPost} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../footerbar/footerbar.vue'

    export default {
        name: 'commodityList',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                loadingShow: false,
                loadingText: '正在加载中...',
                tableData: [],
                page_show: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                searchList: {
                    spuCode: "",
                    skuStatus: "",
                    skuCode: "",
                    status: "",
                    name: "",//商品名称
                    categoryId: ""//所属类别
                },
                getAllCategoryList: [
                    {
                        label: '全部',
                        value: ''
                    },
                    {
                        label: '待提交',
                        value: '1'
                    },
                    {
                        label: '已提交',
                        value: '2'
                    }
                ],
                delShow: false,
                delId: '',
                multipleTable:"",
                options: [],
                props: {
                    value: 'id',
                    label: 'name',
                    children: 'childList',
                    checkStrictly: true,
                    emitPath: false
                },
            }
        },
        created() {
            this.$store.state.navTit = '商品';
            this.$store.state.navChildTit = 'SKU管理';
            this.queryListFn();
            this.getAllCategoryListFn();
        },
        methods: {
            handleSelectionChange(val) {

                this.multipleTable = val;

            },
            getAllCategoryListFn() {
                this.loadingShow = true;
                MyGet('/liquor-product/category/categoryList').then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.options = this.deleteChildren(data);
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
            clearFn() {
                this.searchList = {
                    spuCode: "",
                    skuStatus: "",
                    skuCode: "",
                    status: "",
                    name: "",//商品模板
                    categoryId: ""//所属类别
                }
                this.queryListFn();
            },
            queryListFn() {
                this.loadingShow = true;
                MyPost('/liquor-product/spu/queryList', {
                    auditStatus: this.searchList.skuStatus,
                    categoryId: this.searchList.skuCode,
                    name:this.searchList.name,
                    shelfState:this.searchList.status,
                    start: (this.currentPage - 1) * 10,
                    length: 10
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.tableData = data.data;
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
            goInfor(item) {
                // console.log("item=="+JSON.stringify(item))
                this.$router.push({
                    path: '/addCommodity',
                    query:{
                        id: item.id,
                        spuName: item.spuName,
                        brandId: item.brandId,
                        brandName: item.brandName,
                        categoryId: item.categoryId,
                        memo: item.memo,
                        edit: 3
                    }
                })
            },
            editClk(item){
                this.$router.push({
                    path: '/addCommodity',
                    query:{
                        id: item.id,
                        spuName: item.spuName,
                        brandId: item.brandId,
                        brandName: item.brandName,
                        categoryId: item.categoryId,
                        memo: item.memo,
                        edit: 2
                    }
                })
            },
            delClk(item) {
                this.delId = item.id;
                this.delShow = true;
            },
            configClk(){
                if (this.multipleTable.length == 0) {
                    return this.$message.error('请选择商品');
                }
                if (this.multipleTable.length > 1) {
                    return this.$message.error('只能选择一项');
                }
                this.$router.push({
                    path: '/addSkuDetail',
                    query:{
                        id:this.multipleTable[0].id,
                        typeStyle:"1",
                        categoryId:this.multipleTable[0].categoryId,
                        edit:"1",
                    }
                })
            },
            goPage() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .commodityList
        .return-line
            background #fff
            box-shadow 0px 0px 6px 0px rgba(174, 174, 174, 0.14)
            height 36px
            position fixed
            width 100%
            z-index 1
            padding-left 16px
            span
                font-size 12px
                color #308BDE
                line-height 36px
                cursor pointer
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
            padding-right 18px
            padding-top 45px
            h3
                margin-top 10px
                height 40px
                font-weight bold
                font-size 16px
                color #333
                em
                    display inline-block
                    background url("./icon-l.png") no-repeat 0 0
                    background-size contain
                    width 22px
                    height 22px
                    vertical-align top
                    margin-right 10px
            .contain-top
                overflow hidden
                margin-top 5px
                margin-bottom 15px
                .el-input__inner
                    height 28px
                    line-height 28px
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
                .mr30
                    margin-right 30px
                .mr22
                    margin-right 22px
                .el-cascader
                    .el-input__suffix
                        top 0px
            .result-con
                padding-bottom 100px
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
                    margin-bottom 148px
                    float right
                    overflow hidden
                    margin-top 30px
                .btn-group
                   text-align center
                   padding 60px 0 30px 0
                   overflow hidden
</style>
