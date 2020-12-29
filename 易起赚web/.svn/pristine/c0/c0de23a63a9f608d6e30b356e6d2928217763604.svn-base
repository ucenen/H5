<template>
    <div class="storeInfor">
        <div class="nav-top">
            <div class="nav-box" @click="goPage">
                <img src="static/img/backlast.png"/>
                <p>返回</p>
            </div>

        </div>
        <div class="infor-mod">
            <div class="infor-tab-all">
                <div class="infor-tab">
                    <span :class="tabShow == 1 ? 'tab-on' : ''" @click="tabClk(1)">基本信息</span>
                    <span :class="tabShow == 2 ? 'tab-on' : ''" @click="tabClk(2)">证照信息</span>
                    <span :class="tabShow == 3 ? 'tab-on' : ''" @click="tabClk(3)">协议信息</span>
                    <span :class="tabShow == 4 ? 'tab-on' : ''" @click="tabClk(4)">商品信息</span>
                    <span :class="tabShow == 5 ? 'tab-on' : ''" @click="tabClk(5)">账号信息</span>
                    <!--<span v-if="auditStatus==1" :class="tabShow == 4? 'tab-on' : ''" @click="tabClk(4)">账号信息</span>-->
                </div>
            </div>
            <div class="tab-con" v-show="tabShow == 1">
                <table class="tab">
                    <tr>
                        <td class="td_con">供应商编号</td>
                        <td>{{tableData.companyCode}}</td>
                        <td class="td_con">供应商名称</td>
                        <td>{{tableData.name}}</td>
                        <td class="td_con">法定代表人</td>
                        <td>{{tableData.lar}}</td>
                    </tr>
                    <tr>
                        <td class="td_con">供应商联系人</td>
                        <td>{{tableData.ceo}}</td>
                        <td class="td_con">联系人电话</td>
                        <td>{{tableData.ceoPhone}}</td>
                        <td class="td_con">供应商成立时间</td>
                        <td>{{tableData.establishmentTime}}</td>
                    </tr>
                    <tr>
                        <td class="td_con">经营期限</td>
                        <td>{{tableData.longTerm==1?'长期':tableData.endTime&& tableData.startTime?tableData.startTime +'至' +tableData.endTime:''}}</td>
                        <td class="td_con">注册资本</td>
                        <td>{{tableData.registeredCapital>=0?tableData.registeredCapital+'万元':''}}</td>
                        <td class="td_con">供应商注册地址</td>
                        <td colspan="3">{{tableData.area}}</td>
                    </tr>
                    <tr>
                        <td class="td_con">统一社会信用代码</td>
                        <td>{{tableData.uscc}}</td>
                        <td class="td_con">供应商类型</td>
                        <td>
                            <span v-for="type in supplierType">
                                {{ type.dictionaryKey==tableData.companyType?type.dictionaryValue:'' }}
                            </span>
                        </td>
                        <td class="td_con">身份证号</td>
                        <td>{{tableData.idCard}}</td>
                    </tr>
                    <tr>
                        <td class="td_con">许可证号</td>
                        <td>{{tableData.permitCode}}</td>
                        <td class="td_con">合作期限</td>
                        <td>
                            {{tableData.cooperationStartTime+'~'+tableData.cooperationEndTime}}
                        </td>
                        <td class="td_con"></td>
                        <td></td>
                    </tr>
                </table>
            </div>
            <div class="tab-con" v-show="tabShow == 2">
                <el-table
                        :data="tableData2"
                        tooltip-effect="dark"
                        style="width: 100%;margin-top: 20px"
                        border>
                    <el-table-column
                            label="供应商营业执照">
                        <template slot-scope="scope">
                            <img class="imgPic" @click="showImage(item)" v-for="item in scope.row.businessLicenseList"
                                 :key="item" :src="item"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="法人身份证正反面">
                        <template slot-scope="scope">
                            <img class="imgPic" @click="showImage(item)"
                                 v-for="item in scope.row.legalRepresentativeList" :key="item"
                                 :src="item"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="address1"
                            label="烟酒流通许可证">
                        <template slot-scope="scope">
                            <img class="imgPic" @click="showImage(item)" v-for="item in scope.row.safetyPermitList"
                                 :key="item" :src="item"/>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="tab-con" v-show="tabShow == 3">
                <el-table
                        :data="tableData3"
                        tooltip-effect="dark"
                        style="width: 100%;;margin-top: 20px"
                        border>
                    <el-table-column
                            label="合作协议">
                        <template slot-scope="scope">
                            <img class="imgPic" @click="showImage(item)" v-for="item in scope.row.protocolList"
                                 :key="item" :src="item"/>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="tab-con" v-show="tabShow == 4">
                <div class="tab tab-mod">
                    <el-table
                            ref="multipleTable"
                            :data="tableData4"
                            tooltip-effect="dark"
                            style="width: 100%;"
                            @selection-change="handleSelectionChange"
                            border>
                        <el-table-column
                                type="selection"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                prop="sku"
                                label="SKU编号">
                        </el-table-column>
                        <el-table-column
                                prop="productName"
                                label="SKU名称">
                        </el-table-column>
                        <el-table-column
                                prop="placeOfOrigin"
                                label="产地">
                        </el-table-column>
                        <el-table-column
                                prop="categoryName"
                                label="商品类别">
                        </el-table-column>
                        <el-table-column
                                prop="fragranceType"
                                label="香型">
                        </el-table-column>
                        <el-table-column
                                prop="capacity"
                                label="容量">
                        </el-table-column>
                        <el-table-column
                                prop="boxGauge"
                                label="箱规">
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
            <div class="tab-con" v-show="tabShow == 5">
                <table class="tab">
                    <tr>
                        <td class="td_con">供应商编号</td>
                        <td>{{tableData.companyCode}}</td>
                        <td class="td_con">供应商名称</td>
                        <td>{{tableData.name}}</td>
                        <td class="td_con">统一社会信用代码</td>
                        <td>{{tableData.uscc}}</td>
                    </tr>
                    <tr>
                        <td class="td_con">登录ID</td>
                        <td>{{tableData.userName}}</td>
                        <td class="td_con">是否启用</td>
                        <td>{{tableData.userStatus==1?'启用':'禁用'}}</td>
                        <td class="td_con"></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        </div>
        <!--loading-->
        <transition name="fade">
            <div class="loading-container" v-show="loadingShow">
                <loading :loadingText="loadingText"></loading>
            </div>
        </transition>
        <footerbar/>
        <div class="images" v-show="showImageBoolean" v-viewer="{movable: true}">
            <img v-for="src in images" :src="src" :key="src">
        </div>
    </div>
</template>

<script>
    import store from 'si-store'
    import {MyPost, MyGet} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../../components/footerbar/footerbar.vue'

    export default {
        name: 'storeInfor',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                formAccountWidth: '150px',
                loadingShow: false,
                loadingText: '正在加载中...',
                tableData: '',
                tableData2: [],
                tableData3: [],
                tableData4: [],
                page_show: true,//分页显示
                page_showDialog:true,
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                currentDialogPage:1,
                totalDialogRecord:0,
                supplierType: [],//供应商类型
                tabShow: 1,
                searchList: {
                    dataStatus: '1',
                    type: '企业管理员',
                    userName: '',
                    password: '',
                },
                passwordHolder: '',
                sendId: '',
                auditStatus: '',

                showImageBoolean: false,
                images: [],
            }
        },
        created() {
            this.$store.state.navTit = '供应商管理';
            this.$store.state.navChildTit = '供应商管理';
            this.auditStatus = this.$route.query.auditStatus
            this.getAuditCompanyFn();
            this.selectSupplierUserFn();
            this.getSupplierType();

        },
        methods: {
            showImage(src) {
                if (this.checkNull(src)) {
                    return;
                }
                this.images = [];
                this.images.push(src)
                const viewer = this.$el.querySelector('.images').$viewer
                viewer.show()
            },
            selectSupplierUserFn() {
                this.loadingShow = true;
                MyPost('/banyan-procurement/supplier/selectAccount', {
                    supplierId: this.$route.query.id
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        if (data) {
                            this.searchList.userName = data.name;
                            this.searchList.dataStatus = data.status;
                            if (data.password) {
                                this.searchList.password = '●●●●●●';
                            }

                        }
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            getSupplierType() {
                MyPost('/banyan-procurement/supplier/querySupplierType', {}).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.supplierType = data
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
            queryListFn() {
                MyPost('/liquor-product/sku/queryList', {
                    selectedSkuIds: this.tableData.skuIds,
                    start: (this.currentPage - 1) * 10,
                    length: 10
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.tableData4 = data.data;
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
            timeFormat(time) {
                if (time) {
                    var d = new Date(time.replace(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2}).*$/, '$1 $2 GMT+0000').replace(/-/g, '/'))
                    var year = d.getFullYear();       //年
                    var month = d.getMonth() + 1;     //月
                    var day = d.getDate();            //日
                    var hh = d.getHours();            //时
                    var mm = d.getMinutes();          //分
                    var ss = d.getSeconds();           //秒
                    var clock = year + "-";
                    if (month < 10)
                        clock += "0";
                    clock += month + "-";
                    if (day < 10)
                        clock += "0";
                    clock += day;
                    return (clock);
                }
            },
            getAuditCompanyFn() {
                this.loadingShow = true;
                MyPost('/banyan-procurement/supplier/getAuditCompany', {
                    id: this.$route.query.id
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.tableData = data.supplierDO;
                        if (this.tableData.startTime != null) {
                            this.tableData.startTime = this.timeFormatYYMMDD(this.tableData.startTime)
                        }
                        if (this.tableData.endTime != null) {
                            this.tableData.endTime = this.timeFormatYYMMDD(this.tableData.endTime)
                        }
                        if (this.tableData.cooperationStartTime != null) {
                            this.tableData.cooperationStartTime = this.timeFormatYYMMDD(this.tableData.cooperationStartTime)
                        }
                        if (this.tableData.cooperationEndTime != null) {
                            this.tableData.cooperationEndTime = this.timeFormatYYMMDD(this.tableData.cooperationEndTime)
                        }

                        this.tableData2 = [{
                            businessLicenseList: data.businessLicenseList,
                            safetyPermitList: data.safetyPermitList,
                            legalRepresentativeList: data.legalRepresentativeList
                        }];
                        this.tableData3 = [{
                            protocolList: data.protocolList
                        }];

                        this.queryListFn();
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            tabClk(num) {
                this.tabShow = num
            },
            goPage() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .storeInfor
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


        .infor-mod
            background #fff
            padding 50px 16px 16px 16px

            .infor-tab
                height 40px
                width 70%

                span
                    float left
                    width 15%
                    height 40px
                    font-size 12px
                    color #333
                    text-align center
                    line-height 40px
                    cursor pointer
                    border 1px solid #E3E3E3
                    margin-right -1px

                .tab-on
                    color #fff
                    border 1px solid #C13A3C
                    background #C13A3C

            .tab-con
                .tab
                    border-collapse collapse
                    width 100%
                    margin-top 20px

                    .td_con
                        text-align center
                        background #FAFAFC
                        font-size 12px

                .tab tr td
                    border 1px solid #E8E8E8
                    font-size 12px
                    padding 0 5px
                    //line-height 50px /*设置其文字内容垂直居中*/
                    height 50px
                    vertical-align middle
                    text-align left
                    width 16%

                .imgPic
                    width 100px
                    height 100px
                    float left
                    margin 10px 10px 10px 0

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

            .tab-con1
                .add-mod-one
                    width 850px
                    padding-top 50px

                    .el-form-item
                        float left
    .pagenum_mod
        margin-bottom 148px
        float right
        overflow hidden
        margin-top 5px

    .pageination_css
        text-align right
</style>
