<template>
    <div class="commodityList">
        <div class="nav-top">
            <div class="nav-box" @click="goPage">
                <img src="./icon-01.png"/>
                <p class="color-red">新增</p>
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
                <span class="search-btn">商品模板：</span>
                <el-input size="mini" class="w106 mr30" v-model="searchList.name"></el-input>
                <span class="search-btn">所属类别：</span>
                <el-tooltip class="w120 mr30" effect="dark" content="所属类别" placement="top-start">
                    <el-select size="mini" placeholder="所属类别" v-model="searchList.categoryId">
                        <el-option
                                label="全部"
                                value="">
                        </el-option>
                        <el-option
                                v-for="item in getAllCategoryList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
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
                            border>
                        <el-table-column
                                prop="categoryId"
                                label="商品模板编号">
                        </el-table-column>
                        <el-table-column
                                prop="spuName"
                                label="商品模板名称">
                        </el-table-column>
                        <el-table-column
                                prop="memo"
                                label="商品模板说明">
                        </el-table-column>
                        <el-table-column
                                prop="categoryName"
                                label="所属类别">
                        </el-table-column>
                        <el-table-column
                                prop="valueCount"
                                label="字段数">
                        </el-table-column>
                        <el-table-column
                                prop="modifier"
                                label="操作人">
                        </el-table-column>
                        <el-table-column
                                prop="modifierTime"
                                width="100"
                                label="操作时间">
                        </el-table-column>
                        <el-table-column
                                width="150"
                                label="操作">
                            <template slot-scope="scope">
                                <!--scope.row-->
                                <span class="scope_btn color-blue color-under-line" @click="goInfor(scope.row)">查看</span>
                                <span class="scope_btn color-blue" @click="editClk(scope.row)">编辑</span>
                                <span class="scope_btn" @click="delClk(scope.row)">删除</span>
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
                    name: '',//商品模板
                    categoryId: ''//所属类别
                },
                getAllCategoryList: [],
                delShow: false,
                delId: ''
            }
        },
        created() {
            this.$store.state.navTit = '商品';
            this.$store.state.navChildTit = '商品模板';
            this.queryListFn();
            this.getAllCategoryListFn();
        },
        methods: {
            getAllCategoryListFn() {
                this.loadingShow = true;
                MyGet('/liquor-product/category/getAllCategoryList').then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.getAllCategoryList = data;
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            clearFn() {
                this.searchList = {
                    name: '',//商品模板
                    categoryId: ''//所属类别
                }
            },
            queryListFn() {
                this.loadingShow = true;
                MyPost('/liquor-product/spu/queryList', {
                    name: this.searchList.name,
                    categoryId: this.searchList.categoryId,
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
                this.loadingShow = true;
                MyPost('/liquor-product/spu/del', {
                    id: this.delId
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
            goPage() {
                this.$router.push({
                    path: '/addCommodity'
                })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .commodityList
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
            .contain-top
                overflow hidden
                margin-top 5px
                margin-bottom 15px
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
</style>
