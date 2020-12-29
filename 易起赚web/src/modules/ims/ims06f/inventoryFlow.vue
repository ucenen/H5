<template>
    <div class="inventoryFlow">
        <div class="nav-top">

            <div class="nav-box">
                <img src="static/img/fuhe.png"/>
                <p>审核</p>
            </div>
          <div class="nav-box">
              <img src="static/img/icon-02.png"/>
              <p>删除</p>
          </div>
            <div class="nav-box" @click="clearFn">
                <img src="static/img/icon-04.png"/>
                <p>刷新</p>
            </div>
        </div>
        <div class="contain-mod">
            <div class="contain-top">
               <!-- <span class="search-btn">记账日期：</span>
                <el-date-picker
                        v-model="searchList.dateVal"
                        size="mini"
                        class="w200 mr30"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format="yyyy-MM-dd HH:mm:ss"
                        type="datetimerange"
                        :default-time="['00:00:00', '00:00:00']"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker> -->
                <span class="search-btn">手机号：</span>
                <el-input size="mini" @keyup.enter.native="queryListFnMall" maxlength="50" class="w106 mr30"
                          v-model="searchList.productName"></el-input>
                <span class="search-btn">姓名/昵称：</span>
				<el-input size="mini" @keyup.enter.native="queryListFnMall" maxlength="50" class="w106 mr30"
				          v-model="searchList.productName"></el-input>
                <span class="search-btn">状态：</span>
                <el-select class="w88 mr30" size="mini" placeholder="状态" v-model="searchList.reviewerStatus">
                    <el-option
                            label="全部"
                            value="">
                    </el-option>
                    <el-option
                            label="待复核"
                            value="1">
                    </el-option>
                    <el-option
                            label="已入库"
                            value="2">
                    </el-option>
                    <el-option
                            label="复核不通过"
                            value="3">
                    </el-option>
                    <el-option
                            label="已作废"
                            value="4">
                    </el-option>

                </el-select>
           
                <el-button size="mini" type="primary" plain class="mr22" @click="queryListFnMall">查询</el-button>
                <el-button size="mini" type="primary" @click="clearFn">清空</el-button>
            </div>
            <div class="result-flow">
                <div class="tab-mod">
                    <el-table
                            ref="multipleTable"
                            :data="tableData"
                            tooltip-effect="dark"
                            style="width: 100%;"
                            @selection-change="handleSelectionChange"
                            border>
                    		<el-table-column
                    		    label="序号"
                    		    type="index"
                    		    width="50">
                    		</el-table-column>
                        <el-table-column
                                type="selection"
                                width="50">
                        </el-table-column>
                       
                        <el-table-column
                                prop="warehouseOrderDate"
                                label="手机号">
                        </el-table-column>
                        <el-table-column
                                prop="xingming"
                                label="姓名">
                        </el-table-column>
                        <el-table-column
                                prop="businessNo"
                                label="昵称">
                        </el-table-column>
						<el-table-column
						        prop="warehouseOrderNo"
						        label="提现金额">
						</el-table-column>
                     
                        <el-table-column
                                prop="warehouseOrderDepartment"
                                label="状态">
                        </el-table-column>
                        <el-table-column
                                prop="warehouseOrderPerson"
                                label="申请时间">
                        </el-table-column>
                                 
                        <el-table-column
                                width="200"
                                label="操作">
                            <template slot-scope="scope">
                                <!--scope.row-->
                                <!--                                <span v-if="functionCodes.indexOf('ED')>-1" class="scope_btn color-blue"-->
                                <!--                                <span v-if="functionCodes.indexOf('DE')>-1" class="scope_btn"-->
                                <span class="scope_btn color-blue" 
                                      @click="reviewItem(scope.row)">详情</span>
                                <span class="scope_btn color-blue"
                                      @click="editClk(scope.row,2)">审核通过</span>
                              
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
        <transition supplierName="fade">
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
    import footerbar from 'components/footerbar/footerbar.vue'

    export default {
        name: 'inventoryFlow',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {

                loadingShow: false,
                loadingText: '正在加载中...',
                tableData: [
					{
						xingming:"小冬"
					}
                    //     {
                    //     id: '',
                    //     purchaseNo: "",
                    //     purchaseDate: null,
                    //     purchaseCompany: "",
                    //     purchaseWay: "",
                    //     purchasePerson: null,
                    //     purchasePersonPhone: null,
                    //     purchaseAddress: null,
                    //     consignee: 0,
                    //     consigneePhone: "",
                    //     consigneeAddress: "",
                    //     supplierId: 0,
                    //     supplierName: "",
                    //     supplierContact: "",
                    //     supplierPhone: "",
                    //     supplierNo: null,
                    //     settlementMethod: 0,
                    //     requiredDeliveryDate: null,
                    //     expectedDeliveryDate: null,
                    //     actualDeliveryDate: null,
                    //     purchaseInvoiceNo: "",
                    //     purchaseApplicant: 0,
                    //     reviewerPersonName: '',
                    //     purchaseReviewer: "",
                    //     reviewerStatus: "1",
                    //     reviewerMemo: "",
                    //     purchaseTotal: 0,
                    //     purchaseStatus: "1",
                    //     purchaseMemo: "",
                    //     purchaseDetailsList: []
                    // }
                ],
                page_show: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                searchList: {
                    warehouseName: '',
                    type: '',
                    productName: '',
                    creationTime: '',
                    prochusingType:'',
                    dateVal: ['', '']
                },
                delShow: false,
                delId: '',
                delIds: '',
                multipleTable: "",
                functionCodes: [],
                dateVal: '',
                inOutType: [],
                brandList: [],
                prochusingType:''
            }
        },
        created() {
            this.$store.state.navTit = '广告管理';
            this.$store.state.navChildTit = '提现审核';

            // this.getFunctionCode(this, this.$route.query.code);
            // this.queryListFn()
            // this.getInOutType()
            // this.getDictionaryList()
        },
        methods: {
            getDictionaryList() {
                //selectAll
                MyPost('/banyan-inventory/warehouse/queryList', {}).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.brandList = data.data
                    } else {
                        this.$confirm(message, '提示', {
                            confirmButtonText: '确定',
                            showCancelButton: false,
                            type: 'error'
                        }).then(() => {
                        }).catch(() => {
                        });
                    }
                })
            },
            querySearch(queryString, cb) {
                var restaurants = []
                for (var i = 0; i < this.brandList.length; i++) {
                    if (this.brandList[i].status != 2) {
                        restaurants.push(this.brandList[i])
                    }
                }
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.warehouseName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                console.log(item);
                this.searchList.warehouseName = item.warehouseName
            },
            querySearchType(queryString, cb) {
                var restaurants =this.inOutType

                var results = queryString ? restaurants.filter(this.createFilterType(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilterType(queryString) {
                return (restaurant) => {
                    return (restaurant.dictionaryValue.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelectType(item) {
                this.searchList.type = item.dictionaryKey
                this.searchList.prochusingType = item.dictionaryValue
            },
            getInOutType() {
                MyPost('/banyan-inventory/warehouseOrderView/selectTypeAll', {}).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.inOutType = data
                    } else {
                        this.$confirm(message, '提示', {
                            confirmButtonText: '确定',
                            showCancelButton: false,
                            type: 'error'
                        }).then(() => {
                        }).catch(() => {
                        });
                    }
                })
            },
            timeFormatFun(time) {
                if (time) {
                    var dateee = new Date(time).toJSON();
                    return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')

                }
            },
            queryListFnMall() {
                this.currentPage = 1;
                this.queryListFn();
            },

            handleSelectionChange(val) {
                this.multipleTable = val;
            },

            clearFn() {
                this.searchList = {
                    warehouseName: '',
                    type: '',
                    productName: '',
                    creationTime: '',
                    dateVal: ['', ''],
                    prochusingType:''
                }
                this.queryListFn();
            },
            queryListFn() {
                MyPost('/banyan-inventory/warehouseOrderView/queryList', {
                    startTime: this.searchList.dateVal[0],
                    endTime: this.searchList.dateVal[1],
                    warehouseName: this.searchList.warehouseName,
                    warehouseOrderType: this.searchList.type,
                    productName: this.searchList.productName,
                    creationTime: this.searchList.creationTime,
                    start: (this.currentPage - 1) * 10,
                    length: 10
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.tableData = data.data;
                        for (let i = 0; i < this.tableData.length; i++) {
                            if (this.tableData[i].creationTime != null) {
                                this.tableData[i].creationTime = this.timeFormatYYMMDD(this.tableData[i].creationTime)
                            }
                        }
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
            editClk(item) {
                this.$router.push({
                    path: '/inventoryFlowInfo',
                    query: {
                        type: item.type,
                        warehouseOrderId: item.warehouseOrderId
                    }
                })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../../styles/css/my.scss"
    .el-select-dropdown__item
        font-size 12px

    .inventoryFlow
        .el-input__inner {
            height: 28px;
            line-height: 28px;
        }

        .minW .el-dialog
            width 680px

            .el-radio__label
                font-size 12px

        .minN .el-dialog
            width 840px

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
            padding-top 40px

            .contain-top
                overflow hidden
                /*margin-bottom 15px*/

                .w150
                    width 150px

                .w120
                    width 120px

                .w200
                    width 320px

                .search-btn
                    font-size 12px
                    line-height 28px
                    color #333
                    display inline-block
                    margin-bottom 15px

        /*margin-right 22px*/

        .result-flow
            /*padding-bottom 100px*/

            .el-table .cell
                text-align: center

            .el-table thead tr
                font-size 12px
                color #262626
                border-radius 4px 4px 0 0
                height 50px

            .el-table thead th
                background #FAFAFA
                text-align center

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

            .color-blue
                color #0D81DB

            .color-under-line
                text-decoration underline

            .pagenum_mod
                float right
                overflow hidden
                margin-top 5px
</style>
