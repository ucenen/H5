<template>
    <div class="skuExamine">
        <div class="nav-top">
            <div class="nav-box" @click="reviewAllClk">
                <img src="./icon-01.png"/>
                <p class="color-red">批量复核</p>
            </div>
            <!-- <div class="nav-box">
                 <img src="./icon-02.png"/>
                 <p>删除</p>
             </div>
             <div class="nav-box">
                 <img src="./icon-03.png"/>
                 <p>导出</p>
             </div>
             <div class="nav-box">
                 <img src="./icon-04.png"/>
                 <p>刷新</p>
             </div>-->
        </div>
        <div class="contain-mod">
            <div class="contain-top">
                <span class="search-btn">商品名称：</span>
                <el-input size="mini" class="w106 mr30" v-model="search_list.productName"></el-input>
                <span class="search-btn">商品类别：</span>
                <el-tooltip class="w120 mr30" effect="dark" content="商品类别" placement="top-start">
                    <el-select size="mini" placeholder="商品类别" v-model="search_list.categoryId">
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
                <!--<span class="search-btn">商品状态：</span>
                <el-tooltip class="w120 mr30" effect="dark" content="商品状态" placement="top-start">
                    <el-select size="mini" placeholder="商品状态" v-model="search_list.auditStatus">
                        <el-option
                                label="全部"
                                value="">
                        </el-option>
                        <el-option
                                v-for="item in dataStatusList"
                                :key="item"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-tooltip>-->
                <span class="search-btn">上架状态：</span>
                <el-tooltip class="w120 mr30" effect="dark" content="上架状态" placement="top-start">
                    <el-select size="mini" placeholder="上架状态" v-model="search_list.shelfState">
                        <el-option
                                label="全部"
                                value="">
                        </el-option>
                        <el-option
                                v-for="item in shelfStateList"
                                :key="item"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-tooltip>
                <el-button size="mini" type="primary" plain class="mr22" @click="queryListFn">查询</el-button>
                <!--<el-button size="mini" type="primary" plain class="mr22" @click="serachBoxShow = true">高级查询</el-button>-->
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
                        <!-- <el-table-column
                                 prop="sku"
                                 label="SKU编号">
                         </el-table-column>-->
                        <el-table-column
                                prop="categoryName"
                                label="商品类别">
                        </el-table-column>
                        <!--<el-table-column
                                prop="address1"
                                label="商品主图">
                        </el-table-column>-->
                        <el-table-column
                                prop="productName"
                                label="商品名称">
                        </el-table-column>
                        <el-table-column
                                label="价格">
                            <template slot-scope="scope">
                                <!--scope.row-->
                                ￥{{scope.row.price}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address4"
                                width="100"
                                label="库存">
                        </el-table-column>
                        <el-table-column
                                width="100"
                                label="商品状态">
                            <template slot-scope="scope">
                                <!--scope.row.auditStatus-->
                                {{scope.row.auditStatus == '1' ? '待审核' : scope.row.auditStatus == '2' ? '已审核' : '审核拒绝'}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="70"
                                label="上架状态">
                            <template slot-scope="scope">
                                <!--scope.row-->
                                {{scope.row.shelfState == '1' ? '已上架' : '未上架'}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="120"
                                label="操作">
                            <template slot-scope="scope">
                                <!--scope.row-->
                                <span class="scope_btn color-blue color-under-line" @click="goInfor">查看</span>
                                <span class="scope_btn color-blue" @click="reviewClk(scope.row)">复核</span>
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
        <el-dialog title="高级查询"
                   class="minW"
                   :visible.sync="serachBoxShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <el-form :model="form">
                <el-form-item size="small" label="商品类别：" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="small" label="品牌名称：" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="small" label="商品名称：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item size="small" label="系列名称：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item size="small" label="产地：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item size="small" label="香型：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="serachBoxShow = false">重置</el-button>
                <el-button size="small" type="primary" @click="serachBoxShow = false">开始检索</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="revTit"
                   class="minW"
                   :visible.sync="reveiwShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <el-form :model="reveiwForm">
                <el-form-item size="small" label="商品名称：" :label-width="formLabelWidth" v-if="revTit == '商品复核'">
                    <p>{{revProductName}}</p>
                </el-form-item>
                <el-form-item size="small" :label="revProductName" label-width="100%" class="ml38"
                              v-else></el-form-item>
                <el-form-item size="small" label="商品复核：" :label-width="formLabelWidth">
                    <el-radio v-model="reveiwForm.auditStatus" label="2">复核通过</el-radio>
                    <el-radio v-model="reveiwForm.auditStatus" label="3">复核拒绝</el-radio>
                </el-form-item>
                <el-form-item size="small" label="复核备注：" :label-width="formLabelWidth">
                    <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入内容"
                            v-model="reveiwForm.auditMemo">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="reveiwShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="conReveiwClk">确认</el-button>
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
        name: 'skuExamine',
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
                search_list: {
                    productName: '',//品牌名称
                    categoryId: '',//类别
                    auditStatus: '1',//审核状态 1待审核 2已审核 3 审核拒绝
                    shelfState: '',//上架状态 1已上架 2未上架
                },
                getAllCategoryList: [],
                dataStatusList: [
                    {
                        label: '待审核',
                        value: '1'
                    },
                    {
                        label: '已审核',
                        value: '2'
                    },
                    {
                        label: '审核拒绝',
                        value: '3'
                    }
                ],
                shelfStateList: [
                    {
                        label: '已上架',
                        value: '1'
                    },
                    {
                        label: '未上架',
                        value: '2'
                    }
                ],
                multipleSelection: [],
                reveiwForm: {
                    auditMemo: '',
                    auditStatus: '2'
                },
                formLabelWidth: '120px',
                reveiwShow: false,
                revTit: '商品复核',
                revProductName: '',
                reveiwId: '',


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
                serachBoxShow: false,//高级查询弹窗显示
            }
        },
        created() {
            this.$store.state.navTit = '商品';
            this.$store.state.navChildTit = 'SKU审核';
            this.queryListFn();
            this.getAllCategoryListFn();
        },
        methods: {
            clearFn() {
                this.search_list = {
                    productName: '',//品牌名称
                    categoryId: '',//类别
                    auditStatus: '1',//审核状态 1待审核 2已审核 3 审核拒绝
                    shelfState: '',//上架状态 1已上架 2未上架
                }
            },
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
            queryListFn() {
                this.loadingShow = true;
                MyPost('/liquor-product/sku/queryList', {
                    productName: this.search_list.productName,
                    categoryId: this.search_list.categoryId,
                    auditStatus: this.search_list.auditStatus,
                    shelfState: this.search_list.shelfState,
                    dataStatus: '1',
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
            reviewClk(item) {
                this.revTit = '商品复核';
                this.reveiwId = item.id;
                this.revProductName = item.productName;
                this.reveiwShow = true;
            },
            reviewAllClk() {
                if (this.multipleSelection.length == 0) {
                    return this.$message.error('请选择复核商品');
                }
                this.revTit = '商品批量复核';
                this.revProductName = `已选 ${this.multipleSelection.length} 个商品，是否执行批量复核 ？`;
                this.reveiwShow = true;
            },
            conReveiwClk() {
                let ids = [];
                if (this.revTit == '商品复核') {
                    ids = [this.reveiwId];
                } else {
                    ids = this.multipleSelection.map(item => {
                        return item.id
                    })
                }
                this.loadingShow = true;
                MyPost('/liquor-product/sku/updAudit', {
                    ids: ids,
                    auditStatus: this.reveiwForm.auditStatus,
                    auditMemo: this.reveiwForm.auditMemo
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.$message({
                            message: '复核成功',
                            type: 'success'
                        });
                        this.reveiwShow = false;
                        this.queryListFn();
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            goInfor() {
                this.$router.push({
                    path: '/commodityPreview'
                })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .ml38 .el-form-item__label
        text-indent 38px
        text-align left

    .el-popover
        padding 12px 12px 4px 12px
        .money-box
            text-align center
            overflow hidden

    .skuExamine
        .minW .el-dialog
            width 640px
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
        .contain-mod
            background #fff
            overflow hidden
            padding-left 18px
            padding-right 18px
            padding-top 10px
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
                .mr30
                    margin-right 30px
                .mr22
                    margin-right 22px
                .el-button + .el-button
                    margin-bottom 15px
            .result-con
                padding-bottom 100px
                .money-tip
                    cursor pointer
                    span
                        font-size 14px
                        margin-left 10px
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
            .tabs-mod
                height 30px
                margin-bottom 14px
</style>
