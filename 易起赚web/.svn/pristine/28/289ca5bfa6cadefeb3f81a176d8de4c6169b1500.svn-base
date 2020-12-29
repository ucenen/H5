<template>
    <div class="prochusingManagement">
        <div class="nav-top">
            <!--            <div class="nav-box" @click="goPage" v-if="functionCodes.indexOf('AD')>-1">-->
            <div class="nav-box" @click="addClk()">
                <img src="static/img/addNew.png"/>
                <p>添加</p>
            </div>
			<!-- <div class="nav-box" @click="addClk(2)">
                <img src="static/img/xianshi.png"/>
                <p>显示</p>
            </div>
            <div class="nav-box" @click="reviewClk()">
                <img src="static/img/yincang.png"/>
                <p>隐藏</p>
            </div> -->
            <!--            <div class="nav-box" @click="delClkAll" v-if="functionCodes.indexOf('DE')>-1">-->
            <div class="nav-box" @click="delClkAll">
                <img src="static/img/icon-02.png"/>
                <p>删除</p>
            </div>
         
            <div class="nav-box" @click="clearFn" v-if="functionCodes.length>=0">
                <img src="static/img/icon-04.png"/>
                <p>刷新</p>
            </div>
        </div>
        <div class="contain-mod">
            <div class="contain-top">
                <span class="search-btn">名称：</span>
                <el-input size="mini" @keyup.enter.native="queryListFnMall" maxlength="50" class="w106 mr30"
                          v-model="searchList.title"></el-input>
				<span class="search-btn">状态：</span>
				<el-select class="w120 mr30" size="mini" placeholder="状态" v-model="searchList.visible">
				    <el-option
				            label="全部"
				            value="">
				    </el-option>
				    <el-option
				            label="显示"
				            value="1">
				    </el-option>
					<el-option
					        label="隐藏"
					        value="2">
					</el-option>
				</el-select>
                <el-button size="mini" type="primary" plain class="mr22" @click="queryListFnMall">查询</el-button>
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
                  		    label="序号"
                  		    type="index"
                  		    width="50">
                  		</el-table-column>
                      <el-table-column
                              type="selection"
                              width="50">
                      </el-table-column>
                     
                      <el-table-column
                              prop="title"
                              label="名称">
                      </el-table-column>
                      <el-table-column
                              prop="visibleName"
                              label="状态">
                      </el-table-column>
					 
                  	<el-table-column
                  	        prop="createTimeName"
                  	        label="创建时间">
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
                                    @click="editClk(scope,2)">显示/隐藏</span>
							  <span class="scope_btn color-blue"
									      @click="editClk(scope)">修改</span>
							  <span class="scope_btn"
							        @click="delClkAll(scope.row,2)">删除</span>			  
                            
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
		<!-- 删除确认 -->
        <el-dialog
                title="删除确认"
                :visible.sync="delShow"
                width="30%"
                :close-on-click-modal="false"
                :close-on-press-escape="false">
            <div class="tip-contain">
                <p>正在执行删除操作，是否确认删除？</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="delShow = false">取 消</el-button>
                <el-button type="primary" size="small" @click="configDelClk">确 定</el-button>
            </span>
        </el-dialog>
        
		<!-- 编辑窗 -->
        <el-dialog :title="titleEdit"
                   class="minW"
                   :visible.sync="serachBoxShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="add-contain">
             

                <div class="add-box">
                    <span class="add-tip"><i style="color: red">*</i> 名称：</span>
                    <el-input class="add-ipt" v-model="editForm.title" maxlength="50"
                              autocomplete="off"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip"> 备注：</span>
                    <el-input class="add-ipt" v-model="editForm.memo" maxlength="250"
                              autocomplete="off"></el-input>
                </div>
               <div class="add-box">
                   <span class="add-tip">状态：</span>
                  <el-select clearable class="add-ipt" size="mini" placeholder="状态" v-model="editForm.visible">
                      <el-option
                              label="显示"
                              value="true">
                      </el-option>
                      <el-option
                              label="隐藏"
                              value="false">
                      </el-option>
                  </el-select>
               </div>
			 
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="serachBoxShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="saveClick">确定</el-button>
            </div>

        </el-dialog>
    </div>
</template>

<script>
    import store from 'si-store'
    import {MyGet, MyPost} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from 'components/footerbar/footerbar.vue'

    export default {
        supplierName: 'prochusingManagement',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                titleEdit: "添加分类",
				editIndex: -1,
                serachBoxShow: false,
                titleReview: "复核意见",
                revShow: false,
                invalidShow: false,
				emptyEditForm: {
					// id: null,
					title: null,
					memo: null,
					visible: 'true'
				},
                editForm: {},
                loadingShow: false,
                loadingText: '正在加载中...',
                tableData: [
                  {
					  id: 1,
					  title:"入门教程2",
					  visible: true,
					  visibleName: "显示",
					  createTime: "2020-8-16 9:09:16"
				  }
                ],
                page_show: false,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                searchList: {
                    title: '',//名称
                    visible: '',//显示状态
                },
                delShow: false,
                delId: '',
                delIds: '',
                multipleTable: "",
                functionCodes: []
            }
        },
        created() {
            this.$store.state.navTit = '教学管理';
            this.$store.state.navChildTit = '教学分类';
			
            this.queryListFn();
        },
        methods: {
            queryListFnMall() {
                this.currentPage = 1;
                this.queryListFn();
            },
            review(item) {
                this.reviewForm = {
                    auditStatus: "",
                    id: item.id,
                    memo: "",
                };
                this.revShow = true;
            },
            invalid(item) {
                this.reviewForm = {
                    auditStatus: "4",
                    id: item.id,
                    memo: "",
                };
                this.invalidShow = true
            },
            saveClick() {
                if (!this.editForm.title) {
                    this.$message.error('请输入分类名称');
                    return
                }
                this.loadingShow = true;
                MyPost('/school/category/save', this.editForm).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.serachBoxShow = false;
						if (!this.editForm.id) {
							this.tableData.splice(0, 0, data);
						} else {
							this.tableData[this.editIndex] = data;
						}
                        this.$message({
                            message: "保存成功",
                            type: 'success'
                        });

                    } else {
                        this.$confirm(message, '提示', {
                            confirmButtonText: '确定',
                            showCancelButton: false,
                            type: 'error'
                        }).then(() => {
                            this.serachBoxShow = false;
                        }).catch(() => {
                            this.serachBoxShow = false;
                        });
                    }
                })
            },
			
			copy(obj) {
				return JSON.parse(JSON.stringify(obj));
			},

            handleSelectionChange(val) {
                this.multipleTable = val;
            },

            clearFn() {
                this.searchList = {
                    title: '',//名称
                    visible: '',//显示状态
                }
                this.queryListFn();
            },
            queryListFn() {
				this.tableData = [];
                MyGet('/school/category/getItemList', {
                    title: this.searchList.title.trim(),
                    visible: this.searchList.visible,
                    // supplierName: this.searchList.supplierName.trim(),
                    // purchasePerson: this.searchList.purchasePerson.trim(),
                    // start: (this.currentPage - 1) * 10,
                    // length: 10
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.tableData = data;
                        for (let i = 0; i < this.tableData.length; i++) {
                            if (!this.tableData[i].createTime) {
                                this.tableData[i].createTimeName = this.timeFormatFun(this.tableData[i].createTime)
                            }

                        }
                        if (data.length == 0) {
                            this.page_show = false;
                        } else {
                            this.page_show = true;
                        }
                        // this.totalRecord = data.recordsTotal;
                    } else {
                        this.page_show = false;
                        this.$message.error(message);
                    }
                })
            },
			formatRow(row) {
				
			},
            handleCurrentChange(val) {
                this.currentPage = val;
                this.queryListFn();
            },
            editClk(item) {
				console.info(item);
				this.titleEdit = '修改';
				this.editIndex = item.$index;
				this.editForm = this.copy(item.row);
				this.serachBoxShow=true
            },
            addClk() {
				this.titleEdit = '添加';
				this.editIndex = -1;
				this.editForm = this.copy(this.emptyEditForm);
				this.serachBoxShow=true
            },

            delClk(item) {
                this.delId = item.id;
                this.delShow = true;
            },
            reviewClk() {
                if (this.multipleTable.length == 0) {
                    this.$confirm('请先勾选记录，再进行操作', '提示', {
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

                for (var i = 0; i < this.multipleTable.length; i++) {
                    if (this.multipleTable[i].reviewerStatus != 1) {
                        this.$confirm('采购单号:'+this.multipleTable[i].purchaseNo+'采购状态不是”待复核“，无法进行复核操作', '提示', {
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

                this.reviewForm = {
                    auditStatus: "",
                    memo: "",
                };
                this.delId = "";
                this.delIds = this.multipleTable.map(item => {
                    return item.id
                });
                this.revShow = true;
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
                    if (this.multipleTable[i].reviewerStatus != 1 &&
                        this.multipleTable[i].reviewerStatus != 2 &&
                        this.multipleTable[i].reviewerStatus != 3) {
                        this.$confirm('采购单号:'+this.multipleTable[i].purchaseNo+'采购状态不是“待复核”、“待收货”、“复核不通过”状态，无法进行作废操作。', '提示', {
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
                }
                this.delId = "";
                this.delIds = this.multipleTable.map(item => {
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

                // for(var i=0;i< this.multipleTable.length;i++){
                //     if(this.multipleTable[i].reviewerStatus!= 3){
                //         this.$confirm('采购单号:'+this.multipleTable[i].purchaseNo+'采购状态不是”复核不通过“，无法进行删除操作。', '提示', {
                //             confirmButtonText: '确定',
                //             showCancelButton: false,
                //             type: 'error'
                //         }).then(() => {
                //             this.invalidShow = false;
                //         }).catch(() => {
                //             this.invalidShow = false;
                //         });
                //         return;
                //     }

                // }
                this.delId = "";
                this.delIds = this.multipleTable.map(item => {
                    return item.id
                });
                this.delShow = true;
            },
            configInvalid() {
            },
            configDelClk() {
                this.loadingShow = true;
                if (this.checkNull(this.delId)) {
                    MyPost('/banyan-procurement/purchase/delete', {
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
                } else {
                    MyPost('/banyan-procurement/purchase/delete', {
                        ids: this.delId
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
                                cancelButtonText: '取消',
                                type: 'error'
                            }).then(() => {
                                this.delShow = false;
                            }).catch(() => {
                                this.delShow = false;
                            });
                        }
                    })
                }

            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../styles/css/my.scss"

    #printTest
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
            text-align center
        .title-6
            width 100%
            text-align right
        .title-7
            width 33%
            text-align right
        .title-8
            width 100%
            text-align left
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
    .el-select-dropdown__item
        font-size 12px

    .prochusingManagement
        .el-input__inner {
            height: 28px;
            line-height: 28px;
        }
        .minW-print .el-dialog
            width 840px
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
                    margin-bottom 22px

                    .upload-demo
                        width 80%
                        float left

                    .add-tip
                        width 15%
                        text-align right
                        line-height 36px
                        font-size 12px
                        color #333
                        margin-right 20px
                        display inline
                        float left

                    .add-ipt
                        /*height 36px*/

                        height 36px
                        line-height 36px
                        width 80%
                        float left

                .add-box
                    /*overflow hidden*/
                    width 50%
                    height 40px
                    float left
                    margin-bottom 22px

                    .el-image
                        width 40px
                        height 40px

                    .add-tip
                        width 30%
                        text-align right
                        line-height 36px
                        font-size 12px
                        color #333
                        margin-right 20px
                        display inline
                        float left

                        img
                            width 30px
                            height 30px

                    .add-ipt
                        /*height 36px*/

                        height 36px
                        line-height 36px
                        width 60%
                        float left

                    .mr20
                        margin-right 20px

                    .el-input--small .el-input__inner
                        height 36px
                        line-height 36px

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

                .w120
                    width 120px

                .search-btn
                    font-size 12px
                    line-height 28px
                    color #333
                    display inline-block
                    margin-bottom 15px

        /*margin-right 22px*/

        .result-con
            /*padding-bottom 100px*/

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
