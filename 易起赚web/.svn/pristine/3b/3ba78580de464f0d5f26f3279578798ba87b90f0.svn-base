<template>
    <div class="supplierList">
        <div class="nav-top">
            <div class="nav-box" @click="productSyn">
                <img src="static/img/addNew.png"/>
                <p>同步product</p>
            </div>
            <div class="nav-box" @click="skuInfoSyn">
                <img src="static/img/icon-02.png"/>
                <p>同步skuInfo</p>
            </div>
            <div class="nav-box" @click="categorySyn">
                <img src="static/img/icon-04.png"/>
                <p>同步分类</p>
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
    import {MyPost, MyGet,MyPostNoStatus,MyGetNoStatus} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../../components/footerbar/footerbar.vue'
    import md5 from 'js-md5';
    import {MyPostJson,MyPostJsonNoStatus} from "../../common/js/request";
    Vue.prototype.$md5 = md5;

    export default {
        name: 'supplierList',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
				apiUrl: 'https://www.ylgyl.com/open/api',
                formAdvertisementWidth: '100px',
                advertisementItem: {
                    id:'',
                    title:'',
                    subTitle:'',
                    imageUrl:'',
                    adUrl:'',
                    content:'',
                    sort:'',
                    isShow: '',
					backgroundColor: ''
                },
                loadingShow: false,
                loadingText: '正在加载中...',
                search_list: {
                    subTitle: '',
                    title: '',
                    isShow: ''
                },
                tableData: [],
                page_show: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                serachBoxShow: false,//高级查询弹窗显示
                formLabelWidth: '120px',
                formAccountWidth: '150px',
                supplierStatusShow: false,//供应商启用，禁用
                delShow: false,
                isShowShow:false,
                multipleTable: "",
                advertisementShow:false,
                delIds: [],
                isShowIds:[],
                isShowVal:'',
                isShowList: [{
                    value: 1,
                    label: '显示'
                }, {
                    value: 0,
                    label: '隐藏'
                }]
            }
        },
        created() {
            this.$store.state.navTit = '同步管理';
            this.$store.state.navChildTit = '同步管理';
        },
        methods: {
            timeFormatFun(time) {
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
                    clock += day + " ";
                    if (hh < 10)
                        clock += "0";

                    clock += hh + ":";
                    if (mm < 10) clock += '0';
                    clock += mm + ":";

                    if (ss < 10) clock += '0';
                    clock += ss;
                    return (clock);
                }
            },
            productSyn() {
				var that = this;
				this.loadingShow = true;
				this.loadingText = "正在同步商品...";
				MyPost('/yl-ms-product/ms/synchro/syncProducts', {
				    
				}).then((res) => {
				    that.loadingShow = false;
				    let {code, message, data} = res;
				    if (code == '0') {
				        that.$message({
				            message: '同步商品成功',
				            type: 'success'
				        });
				    } else {
				        that.$confirm(message, '提示', {
				            confirmButtonText: '确定',
				            showCancelButton: false,
				            type: 'error'
				        }).then(() => {
				        }).catch(() => {
				        });
				    }
				});
                // var dd = {'pageSize':3000,'pageNo':1,'method':'yl.fms.method.api.product.list'};
                // var data = this.dataYQ(dd);
                // // console.info(data)
                // MyGet(this.apiUrl, data).then((res) => {
                //     // console.info(res)
                //     MyPostJsonNoStatus('/yl-ms-product/ms/synchro/saveProductAll', res.data
                //     ).then((result) => {
                //         console.info(result)
                //     })
                // })
            },
            skuInfoSyn() {
				var that = this;
				this.loadingShow = true;
				this.loadingText = "正在同步商品sku...";
				MyPost('/yl-ms-product/ms/synchro/syncSkus', {
				    
				}).then((res) => {
				    that.loadingShow = false;
				    let {code, message, data} = res;
				    if (code == '0') {
				        that.$message({
				            message: '同步商品sku成功',
				            type: 'success'
				        });
				    } else {
				        that.$confirm(message, '提示', {
				            confirmButtonText: '确定',
				            showCancelButton: false,
				            type: 'error'
				        }).then(() => {
				        }).catch(() => {
				        });
				    }
				});
                // var pageNo = 1;
                // var dd = {'pageSize':200,'pageNo':pageNo,'method':'yl.fms.method.api.product.list'};
                // var data = this.dataYQ(dd);
                // MyGet(this.apiUrl, data).then((res) => {
                //     for(let xx=0;xx<res.data.length;xx++){
                //         var objxx = res.data[xx];
                //         // console.info(objxx)
                //         var ddxx = {'productChannelId':objxx.product_channel_id,'method':'yl.fms.method.api.product.detail.list'};
                //         var dataxx = this.dataYQ(ddxx);
                //         var spuNo = objxx.spu_no;
                //         MyGet(this.apiUrl, dataxx).then((resxx) => {
                //             // console.info(resxx)
                //             var objArr = new Array();
                //             for(let yy=0;yy<resxx.product_result.skus.length;yy++){
                //                 var obj = resxx.product_result.skus[yy];
                //                 obj['spuNo'] = spuNo;
                //                 objArr.push(obj);
                //             }
                //             // console.info(objArr)
                //             MyPostJsonNoStatus('/yl-ms-product/ms/synchro/saveSkuAll', objArr
                //             ).then((result) => {
                //             })
                //         })
                //     }
                // })
                // pageNo ++;
            },
            categorySyn() {
				var that = this;
				this.loadingShow = true;
				this.loadingText = "正在同步商品分类...";
				MyPost('/yl-ms-product/ms/synchro/syncProducts', {
				    
				}).then((res) => {
				    that.loadingShow = false;
				    let {code, message, data} = res;
				    if (code == '0') {
				        that.$message({
				            message: '同步商品分类成功',
				            type: 'success'
				        });
				    } else {
				        that.$confirm(message, '提示', {
				            confirmButtonText: '确定',
				            showCancelButton: false,
				            type: 'error'
				        }).then(() => {
				        }).catch(() => {
				        });
				    }
				});
                // var dd = {'pageSize':3000,'pageNo':1,'method':'yl.fms.method.api.product.category.list'};
                // var data = this.dataYQ(dd);
                // console.info(data)
                // MyGet(this.apiUrl, data).then((res) => {
                //     // console.info(res)
                //     MyPostJsonNoStatus('/yl-ms-product/ms/synchro/saveCategoryAll', res.categorys
                //     ).then((result) => {
                //         console.info(result)
                //     })
                // })
            },
            dataYQ(dd) {
                var data = {};
                for (var d in dd) {
                    if (dd[d] && d!='files') {
                        data[d] = dd[d];
                    }
                }
                var app_key = 'fms_key';
                var app_secret = 'lf2SMHRl8cyI01PpyuiT6RIU';
                var as = [];
                var sign = "";

                // in
                data["language"] = "zh_CN";

                data["appKey"] = app_key;
                data["timestamp"] = new Date().getTime();
                var appPlatform="2c";
                data["appPlatform"] = appPlatform;

                for (var d in data) {
                    as.push(d);
                }
                as = as.sort();
                var str = "";
                for (var a in as) {
                    if (data[as[a]]) {
                        str += as[a] + data[as[a]];
                    }
                }
                var s = app_secret + str + app_secret;
                s = s.toUpperCase();
                sign = this.$md5(s);
                data["sign"] = sign;

                return data;
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .supplierList
        .minW .el-dialog
            width 680px

            .el-radio__label
                font-size 12px

                .add-contain
                    font-size 12px
                    float left

                    .new-other
                        width 100%
                        /*height 40px*/
                        float left
                        margin-bottom 30px


    .minWA .el-dialog
        width 850px

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
            margin 0 7px

        .color-blue
            color #0D81DB

        .color-under-line
            text-decoration underline

        .pagenum_mod
            float right
            overflow hidden
            margin-top 5px
</style>
