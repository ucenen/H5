<template>
    <div class="skuList">

        功能待开发
    </div>

<!--    <div class="skuList">-->
<!--        <div class="nav-top">-->
<!--            <div class="nav-box">-->
<!--                <img src="./icon-02.png"/>-->
<!--                <p>删除</p>-->
<!--            </div>-->
<!--            <div class="nav-box">-->
<!--                <img src="./icon-03.png"/>-->
<!--                <p>导出</p>-->
<!--            </div>-->
<!--            <div class="nav-box">-->
<!--                <img src="./icon-04.png"/>-->
<!--                <p>刷新</p>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="contain-mod">-->
<!--            <div class="contain-top">-->
<!--                <span class="search-btn">收货单号：</span>-->
<!--                <el-input size="mini" class="w106 mr30"></el-input>-->
<!--                <span class="search-btn">供应单位：</span>-->
<!--                <el-input size="mini" class="w106 mr30"></el-input>-->
<!--                <span class="search-btn">复核状态：</span>-->
<!--                <el-tooltip class="w120 mr30" effect="dark" content="复核状态" placement="top-start">-->
<!--                    <el-select size="mini" placeholder="审核通过">-->
<!--                        <el-option-->
<!--                                label="item.label"-->
<!--                                value="item.value">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </el-tooltip>-->
<!--                <span class="search-btn">收货人：</span>-->
<!--                <el-input size="mini" class="w106 mr30"></el-input>-->
<!--                <el-button size="mini" type="primary" plain class="mr22">查询</el-button>-->
<!--                <el-button size="mini" type="primary" plain class="mr22" @click="serachBoxShow = true">高级查询</el-button>-->
<!--                <el-button size="mini" type="primary">清空</el-button>-->
<!--            </div>-->
<!--            <div class="result-con">-->
<!--                <div class="tab-mod">-->
<!--                    <el-table-->
<!--                            ref="multipleTable"-->
<!--                            :data="tableData"-->
<!--                            tooltip-effect="dark"-->
<!--                            style="width: 100%;"-->
<!--                            border-->
<!--                            @selection-change="handleSelectionChange">-->
<!--                        <el-table-column-->
<!--                                type="selection"-->
<!--                                width="55">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column-->
<!--                                label="收货单号">-->
<!--                            <template slot-scope="scope">{{ scope.row.date }}</template>-->
<!--                        </el-table-column>-->
<!--                        <el-table-column-->
<!--                                prop="name"-->
<!--                                label="业务类型">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column-->
<!--                                prop="address1"-->
<!--                                label="业务单号">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column-->
<!--                                prop="address2"-->
<!--                                label="供货单位">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column-->
<!--                                prop="address2"-->
<!--                                label="送货人">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column-->
<!--                                prop="address2"-->
<!--                                label="送货人电话">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column-->
<!--                                prop="address2"-->
<!--                                label="配送车辆号">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column-->
<!--                                prop="address2"-->
<!--                                label="收货仓库">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column-->
<!--                                prop="address2"-->
<!--                                label="收货人">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column-->
<!--                                prop="address2"-->
<!--                                label="复核状态">-->
<!--                        </el-table-column>-->

<!--                        <el-table-column-->
<!--                                width="160"-->
<!--                                label="操作">-->
<!--                            <template slot-scope="scope">-->
<!--                                &lt;!&ndash;scope.row&ndash;&gt;-->
<!--                                <span class="scope_btn color-blue color-under-line" @click="goInfor">查看</span>-->
<!--                                <span class="scope_btn color-blue">复核</span>-->
<!--                                <span class="scope_btn">删除</span>-->
<!--                            </template>-->
<!--                        </el-table-column>-->
<!--                    </el-table>-->
<!--                </div>-->
<!--                <div class="pagenum_mod" v-if="page_show">-->
<!--                    <el-pagination-->
<!--                            background-->
<!--                            class="pageination_css"-->
<!--                            @current-change="handleCurrentChange"-->
<!--                            :current-page="currentPage"-->
<!--                            :page-size="10"-->
<!--                            layout="total, prev, pager, next, jumper"-->
<!--                            :total="totalRecord">-->
<!--                    </el-pagination>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--        &lt;!&ndash;loading&ndash;&gt;-->
<!--        <transition name="fade">-->
<!--            <div class="loading-container" v-show="loadingShow">-->
<!--                <loading :loadingText="loadingText"></loading>-->
<!--            </div>-->
<!--        </transition>-->
<!--        <footerbar/>-->
<!--        <el-dialog title="高级查询"-->
<!--                   class="minW"-->
<!--                   :visible.sync="serachBoxShow"-->
<!--                   :close-on-click-modal="false"-->
<!--                   :close-on-press-escape="false">-->
<!--            <el-form :model="form">-->
<!--                <el-form-item size="small" label="商品类别：" :label-width="formLabelWidth">-->
<!--                    <el-select v-model="form.region" placeholder="请选择活动区域">-->
<!--                        <el-option label="区域一" value="shanghai"></el-option>-->
<!--                        <el-option label="区域二" value="beijing"></el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
<!--                <el-form-item size="small" label="品牌名称：" :label-width="formLabelWidth">-->
<!--                    <el-select v-model="form.region" placeholder="请选择活动区域">-->
<!--                        <el-option label="区域一" value="shanghai"></el-option>-->
<!--                        <el-option label="区域二" value="beijing"></el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
<!--                <el-form-item size="small" label="商品名称：" :label-width="formLabelWidth">-->
<!--                    <el-input v-model="form.name" autocomplete="off"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item size="small" label="系列名称：" :label-width="formLabelWidth">-->
<!--                    <el-input v-model="form.name" autocomplete="off"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item size="small" label="产地：" :label-width="formLabelWidth">-->
<!--                    <el-input v-model="form.name" autocomplete="off"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item size="small" label="香型：" :label-width="formLabelWidth">-->
<!--                    <el-input v-model="form.name" autocomplete="off"></el-input>-->
<!--                </el-form-item>-->
<!--            </el-form>-->
<!--            <div slot="footer" class="dialog-footer">-->
<!--                <el-button size="small" @click="serachBoxShow = false">重置</el-button>-->
<!--                <el-button size="small" type="primary" @click="serachBoxShow = false">开始检索</el-button>-->
<!--            </div>-->
<!--        </el-dialog>-->
<!--        <el-dialog title="复核意见"-->
<!--                   class="minW"-->
<!--                   :visible.sync="reveiwShow"-->
<!--                   :close-on-click-modal="false"-->
<!--                   :close-on-press-escape="false">-->
<!--            <el-form :model="reveiwForm">-->
<!--                <el-form-item size="small" label="复核结果：" :label-width="formLabelWidth">-->
<!--                    <el-radio v-model="reveiwForm.radio" label="1">通过</el-radio>-->
<!--                    <el-radio v-model="reveiwForm.radio" label="2">不通过</el-radio>-->
<!--                </el-form-item>-->
<!--                <el-form-item size="small" label="复核意见：" :label-width="formLabelWidth">-->
<!--                    <el-input-->
<!--                            type="textarea"-->
<!--                            :rows="3"-->
<!--                            placeholder="请输入内容"-->
<!--                            v-model="reveiwForm.name">-->
<!--                    </el-input>-->
<!--                </el-form-item>-->
<!--            </el-form>-->
<!--            <div slot="footer" class="dialog-footer">-->
<!--                <el-button size="small" @click="reveiwShow = false">取消</el-button>-->
<!--                <el-button size="small" type="primary" @click="reveiwShow = false">确认</el-button>-->
<!--            </div>-->
<!--        </el-dialog>-->
<!--    </div>-->
</template>

<script>
    import store from 'si-store'
    import {MyGet, MyPost} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../footerbar/footerbar.vue'

    export default {
        name: 'skuList',
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
                scopeShow: true,
                visibleShow: false
            }
        },
        created() {
            this.$store.state.navTit = '采购管理';
            this.$store.state.navChildTit = '收货查询';
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
                    path: '/commodityPreview'
                })
            },
            goPage() {
                this.$router.push({
                    path: '/addPurchase'
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
    .skuList
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
                .el-button+.el-button
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
