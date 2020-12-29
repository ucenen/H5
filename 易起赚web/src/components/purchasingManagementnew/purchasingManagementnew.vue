<template>
    <div class="skuList">
        功能待开发
<!--        <div class="nav-top">-->
<!--            <div class="nav-box" @click="goPage">-->
<!--                <img src="./icon-01.png"/>-->
<!--                <p class="color-red">新增</p>-->
<!--            </div>-->
<!--            <div class="nav-box" @click="goPage">-->
<!--                <img src="./icon-01.png"/>-->
<!--                <p class="color-red">复核</p>-->
<!--            </div>-->
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
<!--                <span class="search-btn">采购单号：</span>-->
<!--                <el-input size="mini" v-model="searchList.purchaseNo" class="w106 mr30"></el-input>-->
<!--                <span class="search-btn">供应商：</span>-->
<!--                <el-input size="mini" v-model="searchList.supplierId" class="w106 mr30"></el-input>-->
<!--                <span class="search-btn">复核状态：</span>-->
<!--                <el-tooltip class="w120 mr30" effect="dark" content="复核状态" placement="top-start">-->
<!--                    <el-select size="mini" v-model="searchList.reviewerStatus" placeholder="复核状态">-->
<!--                        <el-option-->
<!--                                v-for="item in reviewerStatusList"-->
<!--                                :key="item"-->
<!--                                :label="item.label"-->
<!--                                :value="item.value">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </el-tooltip>-->
<!--                <span class="search-btn">采购申请人：</span>-->
<!--                <el-input size="mini" v-model="searchList.purchaseApplicant" class="w106 mr30"></el-input>-->
<!--                <el-button size="mini" type="primary" plain class="mr22" @click="queryListFn">查询</el-button>-->
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
<!--                                prop="purchaseNo"-->
<!--                                label="采购单号">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column-->
<!--                                prop="purchaseCompany"-->
<!--                                label="供应商">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column-->
<!--                                prop="consignee"-->
<!--                                label="供应商联系人">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column-->
<!--                                prop="consigneePhone"-->
<!--                                label="供应商电话">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column-->
<!--                                prop="requiredDeliveryDate"-->
<!--                                label="要求交货日期">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column-->
<!--                                prop="expectedDeliveryDate"-->
<!--                                label="预计交货日期">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column-->
<!--                                prop="actualDeliveryDate"-->
<!--                                label="实际交货日期">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column-->
<!--                                prop="purchaseApplicant"-->
<!--                                label="采购申请人">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column-->
<!--                                prop="purchaseReviewer"-->
<!--                                label="采购复核人">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column-->
<!--                                prop="reviewerStatus"-->
<!--                                :formatter="reviewerStatusGet"-->
<!--                                label="复核状态">-->
<!--                        </el-table-column>-->

<!--                        <el-table-column-->
<!--                                width="160"-->
<!--                                label="操作">-->
<!--                            <template slot-scope="scope">-->
<!--                                &lt;!&ndash;scope.row&ndash;&gt;-->
<!--                                <span class="scope_btn color-blue color-under-line" @click="goInfor(scope.row)">查看</span>-->
<!--                                <span class="scope_btn" @click="editClk(scope.row)">复核</span>-->
<!--                                <span class="scope_btn color-blue" @click="delClk(scope.row)">删除</span>-->
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
<!--                <el-button size="small" type="primary" @click="conReveiwClk">确认</el-button>-->
<!--            </div>-->
<!--        </el-dialog>-->
<!--        <el-dialog-->
<!--                title="删除确认"-->
<!--                :visible.sync="delShow"-->
<!--                width="30%"-->
<!--                :close-on-click-modal="false"-->
<!--                :close-on-press-escape="false">-->
<!--            <div class="tip-contain">-->
<!--                <p>您正在执行删除操作，是否确认删除？</p>-->
<!--            </div>-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--                <el-button size="small" @click="delShow = false">取 消</el-button>-->
<!--                <el-button type="primary" size="small" @click="configClk">确 定</el-button>-->
<!--            </span>-->
<!--        </el-dialog>-->
    </div>
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
                loadingShow:false,
                //搜索框字段
                caigoudanhao:"1234hy",
                tableData: [

                ],
                reviewerStatusList:[
                    {
                        label:'未审核',
                        value:0,
                    },
                    {
                        label:'审核通过',
                        value:1,
                    },
                    {
                        label:'审核失败',
                        value:2,
                    },
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
                visibleShow: false,
                purchaseNo:"",//采购单号
                supplierId:"",//供应商id
                reviewerStatus:"",//审核状态
                purchaseApplicant:"",//采购申请人id
                purchaseReviewer:"",//复核人id
                reveiwId:"",//复核id
                reviewerStatusGive:"",
                delId:"",
                delShow:false,
                searchList:{
                    purchaseNo:"",//采购单号
                    supplierId:"",//供应商id
                    reviewerStatus:"",//审核状态
                    purchaseApplicant:"",//采购申请人id
                },
            }
        },
        created() {
            this.$store.state.navTit = '采购管理';
            this.$store.state.navChildTit = '采购管理';
            // this.queryListFn();
        },
        methods: {
            reviewerStatusGet:function (row) {
                if (row.reviewerStatus==0){
                    return '未审核'
                }else if(row.reviewerStatus==1){
                    return '审核通过'
                }else if(row.reviewerStatus==2){
                    return '审核失败'
                }else{
                    return '未审核'
                }
            },
            goInfor(item) {
                // console.log("item=="+JSON.stringify(item))
                //查看
                this.$router.push({
                    path: '/addPurchase',
                    query:{
                        id: item.id,
                        edit: 3
                    }
                })
            },
            reviewClk(item) {
                this.revTit = '采购复核';
                this.reveiwId = item.id;
                this.purchaseReviewer=item.purchaseReviewer;
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
                // let ids = [];
                // if (this.revTit == '商品复核') {
                //     ids = [this.reveiwId];
                // } else {
                //     ids = this.multipleSelection.map(item => {
                //         return item.id
                //     })
                // }
                this.loadingShow = true;
                var params={
                    id: this.reviewId,
                    purchaseReviewer:this.purchaseReviewer,
                    reviewerStatus: this.reveiwForm.radio,
                    reviewerMemo: this.reveiwForm.name
                }
                MyPost('/yl-ms-platform/purchase/reviewerPurchase', JSON.stringify(params)).then((res) => {
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
            editClk(item){
                this.reveiwShow=true;
                this.reviewId=item.id;
                this.purchaseReviewer=item.purchaseReviewer;
                // this.$router.push({
                //     path: '/addPurchase',
                //     query:{
                //         id: item.id,
                //         spuName: item.spuName,
                //         brandId: item.brandId,
                //         brandName: item.brandName,
                //         categoryId: item.categoryId,
                //         memo: item.memo,
                //         edit: 2
                //     }
                // })
            },
            delClk(item) {
                this.delId = item.id;
                this.delShow = true;
            },
            configClk(){
                this.loadingShow = true;
                MyPost('/yl-ms-platform/purchase/deletePurchase', {
                    id: this.delId
                }).then((res) => {
                    this.loadingShow = false;
                    this.delShow = false;
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
            queryListFn() {
                this.loadingShow = true;
                var params={
                    purchaseNo:this.searchList.purchaseNo,//采购单号
                    supplierId:this.searchList.supplierId,//供应商id
                    reviewerStatus:this.searchList.reviewerStatus,//审核状态
                    purchaseApplicant:this.searchList.purchaseApplicant,//采购申请人id
                    // start: (this.currentPage - 1) * 10,
                    // length: 10
                };
                MyGet('/yl-ms-platform/purchase/getPurchaseList',JSON.stringify(params)).then((res) => {
                    console.log("res=="+JSON.stringify(res))
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.tableData = res.data;
                        this.totalRecord = res.recordsTotal;
                        if (res.data.length == 0) {
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
