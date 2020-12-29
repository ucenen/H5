<template>
    <div class="enterpriseInfor">
        <div class="return-line">
            <span @click="goPage">返回</span>
        </div>
        <div class="infor-mod">
            <div class="infor-tab">
                <span :class="tabShow == 1 ? 'tab-on' : ''" @click="tabClk(1)">基本信息</span>
                <span :class="tabShow == 2 ? 'tab-on' : ''" @click="tabClk(2)">证照信息</span>
                <span :class="tabShow == 3 ? 'tab-on' : ''" @click="tabClk(3)">协议信息</span>
            </div>
            <div class="tab-con" v-show="tabShow == 1">
                <el-table
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%;"
                        border>
                    <el-table-column
                            prop="name"
                            width="150"
                            label="公司注册名称">
                    </el-table-column>
                    <el-table-column
                            prop="uscc"
                            width="150"
                            label="统一社会信用代码">
                    </el-table-column>
                    <el-table-column
                            prop="lar"
                            width="100"
                            label="法定代表人">
                    </el-table-column>
                    <el-table-column
                            prop="ceo"
                            width="100"
                            label="企业负责人">
                    </el-table-column>
                    <el-table-column
                            prop="ceoPhone"
                            width="120"
                            label="企业负责人手机号">
                    </el-table-column>
                    <el-table-column
                            prop="establishmentTime"
                            width="100"
                            label="企业成立时间">
                    </el-table-column>
                    <el-table-column
                            width="160"
                            label="经营期限">
                        <template slot-scope="scope">
                            <!--scope.row-->
                            <span v-if="scope.row.longTerm == 1">长期</span>
                            <span v-else>{{timeFormatFun(scope.row.startTime)}} - {{timeFormatFun(scope.row.endTime)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="registeredCapital"
                            width="100"
                            label="注册资本">
                    </el-table-column>
                    <el-table-column
                            width="200"
                            label="企业注册地址">
                        <template slot-scope="scope">
                            <!--scope.row-->
                            {{scope.row.province}} - {{scope.row.city}} - {{scope.row.county}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="address8"
                            label="提交人">
                    </el-table-column>
                    <el-table-column
                            prop="address9"
                            width="100"
                            label="提交人电话">
                    </el-table-column>
                </el-table>
            </div>
            <div class="tab-con" v-show="tabShow == 2">
                <el-table
                        :data="tableData2"
                        tooltip-effect="dark"
                        style="width: 100%;"
                        border>
                    <el-table-column
                            label="企业营业执照">
                        <template slot-scope="scope">
                            <img class="imgPic" v-for="item in scope.row.businessLicenseList" :key="item" :src="item"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="法人身份证正反面">
                        <template slot-scope="scope">
                            <img class="imgPic" v-for="item in scope.row.legalRepresentativeList" :key="item" :src="item"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="address1"
                            label="食品生产许可证">
                        <template slot-scope="scope">
                            <img class="imgPic" v-for="item in scope.row.safetyPermitList" :key="item" :src="item"/>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="tab-con" v-show="tabShow == 3">
                <el-table
                        :data="tableData3"
                        tooltip-effect="dark"
                        style="width: 100%;"
                        border>
                    <el-table-column
                            label="合作协议">
                        <template slot-scope="scope">
                            <img class="imgPic" v-for="item in scope.row.protocolList" :key="item" :src="item"/>
                        </template>
                    </el-table-column>
                </el-table>
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
        name: 'enterpriseInfor',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                loadingShow: false,
                loadingText: '正在加载中...',
                tableData: [],
                tableData2: [],
                tableData3: [],
                tabShow: 1
            }
        },
        created() {
            this.$store.state.navTit = '酒企';
            this.$store.state.navChildTit = '酒企列表';
            this.getAuditCompanyFn();
        },
        methods: {
            timeFormatFun(time) {
                if (time){
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
                MyGet('/yl-ms-platform/company/getAuditCompany', {
                    id: this.$route.query.id
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.tableData = [data.companyDO];
                        this.tableData2 = [{
                            businessLicenseList: data.businessLicenseList,
                            safetyPermitList: data.safetyPermitList,
                            legalRepresentativeList: data.legalRepresentativeList
                        }];
                        this.tableData3 = [{
                            protocolList: data.protocolList
                        }];
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
    .enterpriseInfor
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
        .infor-mod
            background #fff
            padding 85px 16px 16px 16px
            .infor-tab
                height 26px
                margin-bottom 20px
                span
                    float left
                    width 98px
                    height 24px
                    font-size 12px
                    color #333
                    text-align center
                    line-height 24px
                    cursor pointer
                    border 1px solid #E3E3E3
                    margin-right -1px
                .tab-on
                    color #fff
                    border 1px solid #C13A3C
                    background #C13A3C
            .tab-con
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
</style>
