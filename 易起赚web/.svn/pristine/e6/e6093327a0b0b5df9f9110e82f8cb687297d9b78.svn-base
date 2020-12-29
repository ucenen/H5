<template>
    <div class="storeInventory">
        <div class="nav-top">
            <div class="nav-box">
                <img src="../../../../static/img/icon-01.png"/>
                <p class="color-red">新增</p>
            </div>
            <!--<div class="nav-box">
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
                <span class="search-btn">所属门店：</span>
                <el-tooltip class="w120 mr30" effect="dark" content="所属门店" placement="top-start">
                    <el-select size="mini" v-model="search_list.shopId" placeholder="所属门店">
                        <el-option
                                label="全部"
                                value="">
                        </el-option>
                    </el-select>
                </el-tooltip>
                <!--<span class="search-btn">商品名称：</span>
                <el-input size="mini" class="w106 mr30"></el-input>
                <span class="search-btn">库存不足 ：</span>
                <el-tooltip class="w120 mr30" effect="dark" content="品牌名称" placement="top-start">
                    <el-select size="mini" placeholder="品牌名称">
                        <el-option
                                label="item.label"
                                value="item.value">
                        </el-option>
                    </el-select>
                </el-tooltip>
                <span class="search-btn">所在仓库：</span>
                <el-input size="mini" class="w106 mr30"></el-input>-->
                <el-button size="mini" type="primary" plain class="mr22">查询</el-button>
                <!--<el-button size="mini" type="primary" plain class="mr22" @click="serachBoxShow = true">高级查询</el-button>-->
                <el-button size="mini" type="primary">清空</el-button>
            </div>
            <div class="result-con">
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
                                prop="skuId"
                                label="商品编号">
                        </el-table-column>
                        <el-table-column
                                prop="productName"
                                label="商品名称">
                        </el-table-column>
                        <el-table-column
                                prop="quantity"
                                label="实际库存">
                        </el-table-column>
                        <el-table-column
                                prop="costPrice"
                                label="成本均价">
                        </el-table-column>
                        <el-table-column
                                width="60"
                                label="操作">
                            <template slot-scope="scope">
                                <!--scope.row-->
                                <span class="scope_btn color-blue color-under-line">查看</span>
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
        <el-dialog title="修改品牌"
                   class="minW"
                   :visible.sync="serachBoxShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <el-form :model="form">
                <el-form-item size="small" label="* 名称：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item size="small" label="* 关联分类：" :label-width="formLabelWidth">
                    <el-select v-model="mineStatus" placeholder="请选择" multiple style="width:100%"
                               @change="selectChange">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
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
                <el-form-item size="small" label="品牌创立时间：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item size="small" label="品牌描述：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item size="small" label="是否启用：" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域" style="width:100%">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="serachBoxShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="serachBoxShow = false">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="复核意见"
                   class="minW"
                   :visible.sync="reveiwShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <el-form :model="reveiwForm">
                <el-form-item size="small" label="复核结果：" :label-width="formLabelWidth">
                    <el-radio v-model="reveiwForm.radio" label="1">通过</el-radio>
                    <el-radio v-model="reveiwForm.radio" label="2">不通过</el-radio>
                </el-form-item>
                <el-form-item size="small" label="复核意见：" :label-width="formLabelWidth">
                    <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入内容"
                            v-model="reveiwForm.name">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="reveiwShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="reveiwShow = false">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import store from 'si-store'
    import {MyGet, MyPost} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../../../components/footerbar/footerbar.vue'

    export default {
        name: 'storeInventory',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                multipleSelection: [],
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
                reveiwForm: {
                    name: '',
                    radio: '1'
                },
                serachBoxShow: false,//高级查询弹窗显示
                formLabelWidth: '120px',
                reveiwShow: false,


                loadingShow: false,
                loadingText: '正在加载中。。。',
                search_list: {
                    shopId: '',//门店id
                },
                tableData: [],
                page_show: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
            }
        },
        created() {
            this.$store.state.navTit = '门店管理';
            this.$store.state.navChildTit = '门店库存';
            this.getInventoryListFn();
        },
        methods: {
            clearFn() {
                this.search_list = {
                    shopId: '',//门店id
                }
            },
            getInventoryListFn() {
                this.loadingShow = true;
                MyPost('/yl-ms-platform/shopInventory/getInventoryList', {
                    shopId: this.search_list.shopId,
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
                this.getInventoryListFn();
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
            goInfor() {
                this.$router.push({
                    path: '/enterpriseInfor'
                })
            },
            goPage() {
                this.$router.push({
                    path: '/addstoreInventory'
                })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .storeInventory
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
