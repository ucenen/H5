<template>
    <div class="enterpriseList">
        功能待开发
    </div>
</template>

<script>
    import store from 'si-store'
    import {MyGet, MyPost} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../footerbar/footerbar.vue'

    export default {
        name: 'enterpriseList',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {

            }
        },
        created() {
            this.$store.state.navTit = '供应商';
            this.$store.state.navChildTit = '供应商档案';

        },
        /*mounted() {
            this.$store.state.winHeight = document.documentElement.scrollHeight - 60;
        },*/
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
            queryListFn() {
                this.loadingShow = true;
                MyGet('/yl-ms-platform/company/queryList', {
                    name: this.search_list.name,
                    auditStatus: this.search_list.auditStatus,
                    lar: this.search_list.lar,
                    companyCode: this.search_list.companyCode,
                    ceo: this.search_list.ceo,
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
            clearFn() {
                this.search_list = {
                    name: '',//企业名称
                    auditStatus: '',//状态（0 未启用 1启用）
                    lar: '',//法人姓名
                    companyCode: '',//企业代码
                    ceo: ''//负责人姓名
                }
            },
            searchBtnClk() {
                this.serachBoxShow = false;
                this.queryListFn();
            },
            goInfor(id) {
                this.$router.push({
                    path: '/enterpriseInfor',
                    query: {
                        id: id
                    }
                })
            },
            editClk(id){
                this.$router.push({
                    path: '/addEnterprise',
                    query: {
                        id: id
                    }
                })
            },
            goPage() {
                this.$router.push({
                    path: '/addEnterprise'
                })
            },
            goAccount(item) {
                this.$router.push({
                    path: '/enterpriseAccount',
                    query: {
                        id: item.id,
                        companyCode: item.companyCode,
                        name: item.name,
                        uscc: item.uscc,
                        dataStatus: item.auditStatus,
                        userName: item.userName,
                        password: item.passWord,
                        userId: item.userId
                    }
                })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .enterpriseList
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
                .color-underline
                    text-decoration underline
                .pagenum_mod
                    margin-bottom 148px
                    float right
                    overflow hidden
                    margin-top 30px
</style>
