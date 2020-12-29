<template>
    <div class="prochusingManagement">
      
        <div class="contain-mod">
            <div  class="result-con">
                <div class="tab-con1">
                    <h3 style="height: 40px;clear: both;"><em style="display:inline-block;width:12px;height:12px;border-radius:12px;background:#FF0033;
                vertical-align:top;margin-right:10px;"></em>升级付费会员(元):</h3>
                    <div class="add-box clearFox">
                        <span class="add-tip"><i style="color: red">*</i> &nbsp;&nbsp;总费用：</span>
                        <el-input type="number"  @input="jianShuju()" @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" 
						size="small" class="add-ipt" v-model="searchList.payMoney"></el-input>
                    </div>
                    <div class="add-box clearFox">
                        <span class="add-tip"><i style="color: red">*</i>&nbsp;&nbsp;向上级分佣：</span>
                        <el-input type="number" @input="jianShuju()" @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" 
						size="small" class="add-ipt"  v-model="searchList.parentReturnMoney"></el-input>
                    </div>
                    <div class="add-box clearFox">
                        <span class="add-tip"><i style="color: red">*</i>&nbsp;&nbsp;向上上级分佣：</span>
                
                        <el-input type="number" @input="jianShuju()" @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" 
						size="small" class="add-ipt"   v-model="searchList.parentParentReturnMoney"></el-input>
                
                    </div>
                    <div class="add-box clearFox">
                        <span class="add-tip"><i style="color: red">*</i>&nbsp;&nbsp;公司得：</span>
                        <el-input type="number" disabled  @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" 
						size="small"  class="add-ipt" v-model="searchList.companyReturnMoney"></el-input>
                    </div>
                    <div class="add-box clearFox" style="width: 200px;margin-left: 160px;">
                       <el-button size="medium" type="primary" plain class="mr22" @click="addClk('1')">保存</el-button>
                   </div>
                    <h3 style="height: 40px;clear: both;"><em style="display:inline-block;width:12px;height:12px;border-radius:12px;background:#FF0033;
                    vertical-align:top;margin-right:10px;"></em>升级付费达人(元):</h3>
                    <div class="add-box clearFox">
                        <span class="add-tip"><i style="color: red">*</i> &nbsp;&nbsp;总费用：</span>
                        <el-input  type="number" input="jianShujuSecond()" @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" 
						size="small" class="add-ipt" v-model="searchList1.payMoney"></el-input>
                    </div>
                    <div class="add-box clearFox">
                        <span class="add-tip"><i style="color: red">*</i>&nbsp;&nbsp;向上级分佣：</span>
                        <el-input type="number" @input="jianShujuSecond()"  @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" 
						size="small" class="add-ipt"  v-model="searchList1.parentReturnMoney"></el-input>
                    </div>
                    <div class="add-box clearFox">
                        <span class="add-tip"><i style="color: red">*</i>&nbsp;&nbsp;向上上级分佣：</span>
                        <el-input type="number" @input="jianShujuSecond()" @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)"
                        size="small" class="add-ipt"  v-model="searchList1.parentParentReturnMoney"></el-input>
                                    
                    </div>
                    <div class="add-box clearFox ">
                        <span class="add-tip"><i style="color: red">*</i>&nbsp;&nbsp;公司得：</span>
                        <el-input type="number"  @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" disabled
                        size="small" class="add-ipt"  v-model="searchList1.companyReturnMoney"></el-input>
                    </div>
					<div class="add-box clearFox" style="width: 200px;margin-left: 160px;">
					      <el-button size="medium" type="primary" plain class="mr22" @click="addClk('2')">保存</el-button>
					 </div>
                </div>
            </div>
        </div>

        <footerbar/>
		
    </div>
</template>

<script>
    import store from 'si-store'
    import {MyGet, MyPost,MyPostJson} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from 'components/footerbar/footerbar.vue'

    export default {
        name: 'huiyuanfeiyong',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
				searchList:{
					id:"",
					payMoney:"",
					parentReturnMoney:"",
					parentParentReturnMoney:"",
					companyReturnMoney:"",	
				},
				searchList1:{
					id:"",
					payMoney:"",
					parentReturnMoney:"",
					parentParentReturnMoney:"",
					companyReturnMoney:"",	
				},
				loadingName:"",
            }
        },
        created() {
            this.$store.state.navTit = '会员管理';
            this.$store.state.navChildTit = '会员费用设置';
            // this.getFunctionCode(this, this.$route.query.code);
            this.queryListFn();
            // this.getQueryOutWarehouseType();
            // this.queryBrandListFn();
            // this.getAllCategoryListFn();
        },
        methods: {
           jianShuju(){
			   this.searchList.companyReturnMoney= Number(this.searchList.payMoney-this.searchList.parentReturnMoney-this.searchList.parentParentReturnMoney)
		   },
		   jianShujuSecond(){
		   	   this.searchList1.companyReturnMoney= Number(this.searchList1.payMoney-this.searchList1.parentReturnMoney-this.searchList1.parentParentReturnMoney)
		   },
            queryListFn() {
                MyGet('/yl-ms-platform/members/cost/set/getMembersCost', {
                  
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        if(this.checkNull(data)){
							
						}else{
							this.searchList={
								id:data[0].id,
								payMoney:data[0].payMoney,
								parentReturnMoney:data[0].parentReturnMoney,
								parentParentReturnMoney:data[0].parentParentReturnMoney,
								companyReturnMoney:data[0].companyReturnMoney,
							}
							this.searchList1={
								id:data[1].id,
								payMoney:data[1].payMoney,
								parentReturnMoney:data[1].parentReturnMoney,
								parentParentReturnMoney:data[1].parentParentReturnMoney,
								companyReturnMoney:data[1].companyReturnMoney,
							}
							
						}
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            addClk(item) {
				 
				this.loadingName=this.$loading({
				    lock: true,
				    text: '加载中···',
				    spinner: 'el-icon-loading',
				    background: 'rgba(0, 0, 0, 0.8)'
				});
				if(item==1){
					if (!this.newform.price) {
					    this.$message.error('请输入销售价格');
					    return
					}
				}
                MyPostJson('/yl-ms-platform/members/cost/set/update', item=="1"?this.searchList:this.searchList1).then((res) => {
					this.loadingName.close();
                    let {code, message, data} = res;
                    if (code == '0') {
                      this.$message({
                          message: "保存成功",
                          type: 'success'
                      });
					  this.queryListFn()
                    } else {
                   
                        this.$message.error(message);
                    }
                })
            },
            goInfor(item) {
                this.$router.push({
                    path: '/stockOutManagermentInfo',
                    query: {
                        edit: "1",
                        warehouseId: item.id,
                    }
                })
            },
            delClk(item) {
                this.delId = item.id;
                this.delShow = true;
            },
            invalidClk() {
                if (this.multipleTable.length == 0) {
                    this.$confirm('请先勾选记录，再进行操作', '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'error'
                    }).then(() => {
                        this.invalidShow = false;
                    }).catch(() => {
                        this.invalidShow = false;
                    });
                    return;
                }
                for (var i = 0; i < this.multipleTable.length; i++) {
                    if (this.multipleTable[i].reviewerStatus != 1&&this.multipleTable[i].reviewerStatus != 3) {
                        this.$confirm('出库单号:'+this.multipleTable[i].warehouseOrderNo+' 出库状态不是“待复核/复核不通过”，无法进行作废操作。', '提示', {
                            confirmButtonText: '确定',
                            showCancelButton: false,
                            type: 'error'
                        }).then(() => {
                            this.revShow = false;
                        }).catch(() => {
                            this.revShow = false;
                        });
                        return;
                    }
                }
                this.revId = "";
                this.revIds = this.multipleTable.map(item => {
                    return item.id
                });
                this.invalidShow = true;
            },
            delClkAll() {
                if (this.multipleTable.length == 0) {
                    this.$confirm('请先勾选记录，再进行操作', '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'error'
                    }).then(() => {
                        this.delShow = false;
                    }).catch(() => {
                        this.delShow = false;
                    });
                    return;
                }
                for (var i = 0; i < this.multipleTable.length; i++) {
                    if (this.multipleTable[i].reviewerStatus != 3) {
                        this.$confirm('出库单号:'+this.multipleTable[i].warehouseOrderNo+' 出库状态不是“复核不通过”，无法进行删除操作。', '提示', {
                            confirmButtonText: '确定',
                            showCancelButton: false,
                            type: 'error'
                        }).then(() => {
                            this.revShow = false;
                        }).catch(() => {
                            this.revShow = false;
                        });
                        return;
                    }
                }
                this.delId = "";
                this.delIds = this.multipleTable.map(item => {
                    return item.id
                });
                this.delShow = true;
            },
            lostLoser(item){
                this.revId = item.id;
                this.invalidShow=true;
            },
            configInvalid() {
                this.loadingShow = true;
                if (this.checkNull(this.revId)) {
                } else {
                    this.revIds = [];
                    this.revIds.push(this.revId)
                }
                MyPost('/banyan-inventory/warehouse/out/review', {
                    ids: this.revIds,
                    auditStatus: "4",
                    memo:"作废"
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.revIds = [];
                        this.revId="";
                        this.invalidShow = false;
                        this.queryListFn();
                        this.$message({
                            message: "作废成功",
                            type: 'success'
                        });

                    } else {
                        this.$confirm(message, '提示', {
                            confirmButtonText: '确定',
                            showCancelButton: false,
                            type: 'error'
                        }).then(() => {
                            this.invalidShow = false;
                        }).catch(() => {
                            this.invalidShow = false;
                        });
                    }
                })
            },
            configClk() {
                this.loadingShow = true;
                if (this.checkNull(this.delId)) {
                } else {
                    this.delIds = [];
                    this.delIds.push(this.delId)
                }

                MyPost('/banyan-inventory/warehouse/out/delete', {
                    ids: this.delIds
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.delShow = false;
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.queryListFn();
                    } else {
                        this.$confirm(message, '提示', {
                            confirmButtonText: '确定',
                            showCancelButton: false,
                            type: 'error'
                        }).then(() => {
                            this.delShow = false;
                        }).catch(() => {
                            this.delShow = false;
                        });
                    }
                })
            },
            goPage() {
                this.optionsChoiceString = "";
                this.form.parentCode = "";
                this.addBoxShow = true;

                // this.$router.push({
                //     path: '/addCommodityManage'
                // })
            },
            addBrandClk() {
                if (this.checkNull(this.optionsChoiceString)) {
                    return this.$message.error("请选择分类");
                }
                this.$router.push({
                    path: '/addCommodityDetail',
                    query: {
                        optionString: this.optionsChoiceString,
                        optionId: this.form.parentCode,
                        edit: "1",
                        spuId: "",
                    }
                })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../../styles/css/my.scss"
    #printStockOut
        @page{
            size:  auto;   /* auto is the initial value */
            margin: 0 30px;  /* this affects the margin in the printer settings */
        }

        html{
            background-color: #FFFFFF;
            margin: 0px;  /* this affects the margin on the html before sending to printer */
        }

        body{
            margin: 0px; /* margin you want for the content */
        }

        .title-1
            line-height 40px
            font-weight 600
            font-size 18px
            text-align center
        .title-2
            line-height 40px
            font-weight 500
            font-size 14px
            text-align center
        .title-3
            color #666666
            display flex
            flex-direction row
            align-items center
            font-size 14px
            line-height 40px
        .title-4
            width 33%
        .title-5
            width 33%
            text-align left
        .title-6
            width 100%
            text-align right
        .title-7
            width 33%
            text-align right
        .title-p
            /*height 1px*/
            border 0.5px solid #333333
            width 100%
            margin 20px 0
    .pagenum_modPrint
        .el-pagination__total
            display none !important
        .el-pagination__jump
            display none !important
        .el-pagination
            text-align right
    .prochusingManagement
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
            .el-button
                padding 0 0
                border none
            .el-button:hover
                color #333333
                background #ffffff
                border-color #ffffff
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

                .search-btn
                    font-size 12px
                    line-height 28px
                    color #333
                    display inline-block
                    margin-bottom 15px

        /*margin-right 22px*/

        .result-con
            /*padding-bottom 100px*/
            .tab-con1
                margin-top 20px
                overflow hidden
                border
                .add-box
                    overflow hidden
                    float left
                    /*width 720px*/
                    margin 0 auto 22px auto

                    .upload-demo
                        float left
                        .el-upload__tip
                            height 30px
                    .add-tip
                        width 184px
                        text-align right
                        line-height 36px
                        font-size 12px
                        color #333
                        margin-right 40px
                        display inline
                        float left
                    .add-ipt
                        height 36px
                        width 410px
                        float left
                    .add-ipttext
                        width 410px
                        float left
                    .add-image
                        float left
                        .el-image-d1
                            float left
                            width 200px
                            height 200px
                            position relative
                            margin-right 20px
                        .el-image
                            width 200px
                            height 160px
                    .mr20
                        margin-right 20px

                    .el-input--small .el-input__inner
                        height 28px
                        line-height 28px

                .head-mod
                    position relative
                    width 138px
                    margin 36px auto

                    .user-header-com
                        width 138px
                        height 138px
                        display inline-block
                        border-radius 50%
                        cursor pointer

                    .header-upload-btn
                        position absolute
                        left 0
                        top 0
                        opacity 0

                    .head-tip
                        text-align center
                        color #C13A3C
                        font-size 14px
                        margin-top 24px
                        line-height 16px
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
