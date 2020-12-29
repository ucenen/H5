<template>
    <div class="supplierList">
        <div class="nav-top">
            <div class="nav-box" @click="goAddAdvertisement">
                <img src="static/img/addNew.png"/>
                <p>添加</p>
            </div>
            <div class="nav-box" @click="delClkAll">
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
                <span class="search-btn">标题：</span>
                <el-input size="mini" class="w106 mr30" @keyup.enter.native="queryListFnMall"
                          v-model="search_list.title"></el-input>
                <span class="search-btn">副标题：</span>
                <el-input size="mini" class="w106 mr30" @keyup.enter.native="queryListFnMall"
                          v-model="search_list.subTitle"></el-input>
                <span class="search-btn">显示状态：</span>
                <el-select size="mini" class="w106 mr30" v-model="search_list.isShow" placeholder="请选择">
                    <el-option
                            v-for="items in isShowList"
                            :key="items.value"
                            :label="items.label"
                            :value="items.value">
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
                                type="selection"
                                width="35">
                        </el-table-column>
                        <el-table-column
                                prop="title"
                                label="标题">
                        </el-table-column>
                        <el-table-column
                                prop="subTitle"
                                label="副标题">
                        </el-table-column>
                        <el-table-column
                                prop="sort"
                                label="排序">
                        </el-table-column>
                        <el-table-column
                                prop="isShow"
                                label="状态">

                            <template slot-scope="scope">
                                <span class="scope_btn color-blue" v-if="scope.row.isShow==1">显示</span>

                                <span class="scope_btn color-blue" v-if="scope.row.isShow==0">隐藏</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="createTime"
                                label="创建时间">
                            <template slot-scope="scope">
                                {{timeFormatFun(scope.row.createTime)}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="230"
                                label="操作">
                            <template slot-scope="scope">
                                <!--<span class="scope_btn color-blue"
                                      @click="goAddAdvertisement(scope.row)">详情</span>-->

                                <span class="scope_btn color-blue"
                                      v-if="scope.row.isShow==true"
                                      @click="isShowClk(scope.row,0)">隐藏</span>

                                <span class="scope_btn color-blue"
                                      v-if="scope.row.isShow==false"
                                      @click="isShowClk(scope.row,1)">显示</span>

                                <span class="scope_btn color-blue"
                                      @click="goEditAdvertisement(scope.row)">修改</span>

                                <span class="scope_btn color-blue"
                                      @click="delClk(scope.row)">删除</span>

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

        <el-dialog
                title="显示确认"
                :visible.sync="isShowShow"
                width="30%"
                :close-on-click-modal="false"
                :close-on-press-escape="false">
            <div class="tip-contain">
                <p>是否更改显示状态？</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="isShowShow = false">取 消</el-button>
                <el-button type="primary" size="small" @click="configShowClk">确 定</el-button>
            </span>
        </el-dialog>


        <el-dialog title="广告信息"
                   class="minWA"
                   :visible.sync="advertisementShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <el-form>
                <el-form-item size="small" label="广告标题：" :label-width="formAdvertisementWidth">
                    <el-input v-model="advertisementItem.title" autocomplete="off" width="200px;" ></el-input>
                </el-form-item>
                <el-form-item size="small" label="广告副标题：" :label-width="formAdvertisementWidth">
                    <el-input v-model="advertisementItem.subTitle" autocomplete="off" width="200px;" ></el-input>
                </el-form-item>
                <el-form-item size="small" label="内容：" :label-width="formAdvertisementWidth">
                    <el-input v-model="advertisementItem.content" autocomplete="off" width="200px;" ></el-input>
                </el-form-item>
                <el-form-item size="small" label="广告图片：" :label-width="formAdvertisementWidth">
                    <el-input v-model="advertisementItem.imageUrl" autocomplete="off" width="200px;" ></el-input>
                </el-form-item>
                <el-form-item size="small" label="广告链接：" :label-width="formAdvertisementWidth">
                    <el-input v-model="advertisementItem.adUrl" autocomplete="off" width="200px;" ></el-input>
                </el-form-item>
                <el-form-item size="small" label="排序：" :label-width="formAdvertisementWidth">
                    <el-input v-model="advertisementItem.sort" autocomplete="off" width="200px;" ></el-input>
                </el-form-item>
                <el-form-item size="small" label="显示状态：" :label-width="formAdvertisementWidth">
                    <el-select v-model="advertisementItem.isShow" placeholder="请选择">
                        <el-option
                                v-for="items in isShowList"
                                :key="items.value"
                                :label="items.label"
                                :value="items.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="small" label="背景颜色：" :label-width="formAdvertisementWidth">
                    <el-input v-model="advertisementItem.backgroundColor" autocomplete="off" width="200px;" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="advertisementShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="advertisementCommit()">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import store from 'si-store'
    import {MyPost, MyGet} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../../components/footerbar/footerbar.vue'

    export default {
        name: 'supplierList',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
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
            this.$store.state.navTit = '广告管理';
            this.$store.state.navChildTit = '广告管理';
            this.queryListFn();
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
            advertisementCommit() {
                if(this.advertisementItem.id==''){
                    this.loadingShow = true;
                    MyPost('/yl-ms-platform/advertisement/add', {
                        imageUrl: this.advertisementItem.imageUrl || '',
                        adUrl: this.advertisementItem.adUrl || '',
                        title: this.advertisementItem.title || '',
                        subTitle: this.advertisementItem.subTitle || '',
                        content:this.advertisementItem.content || '',
                        sort: this.advertisementItem.sort || '50',
                        isShow: this.advertisementItem.isShow,
						backgroundColor: this.advertisementItem.backgroundColor
                    }).then((res) => {
                        this.queryListFn();
                        this.loadingShow = false;
                        this.advertisementShow = false
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                        } else {
                            this.$message.error(message);
                        }
                    })
                }
                if(this.advertisementItem.id!=''){
                    this.loadingShow = true;
                    MyPost('/yl-ms-platform/advertisement/edit', {
                        id: this.advertisementItem.id,
                        imageUrl: this.advertisementItem.imageUrl || '',
                        adUrl: this.advertisementItem.adUrl || '',
                        title: this.advertisementItem.title || '',
                        subTitle: this.advertisementItem.subTitle || '',
                        content:this.advertisementItem.content || '',
                        sort: this.advertisementItem.sort || '50',
                        isShow: this.advertisementItem.isShow,
						backgroundColor: this.advertisementItem.backgroundColor
                    }).then((res) => {
                        this.queryListFn();
                        this.loadingShow = false;
                        this.advertisementShow = false
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                        } else {
                            this.$message.error(message);
                        }
                    })
                }
            },
            queryListFnMall() {
                this.currentPage = 1;
                this.queryListFn();
            },
            configShowClk() {
                this.loadingShow = true;
                MyPost('/yl-ms-platform/advertisement/setShow', {
                    ids: this.isShowIds,
                    isShow: this.isShowVal,
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.isShowShow = false;
                        this.$message({
                            message: '更改成功',
                            type: 'success'
                        });
                        this.queryListFn();
                    } else {
                        this.$confirm(message, '提示', {
                            confirmButtonText: '确定',
                            showCancelButton: false,
                            type: 'error'
                        }).then(() => {
                            this.isShowShow = false;
                        }).catch(() => {
                            this.isShowShow = false;
                        });
                    }
                })
            },
            configDelClk() {
                this.loadingShow = true;
                MyPost('/yl-ms-platform/advertisement/remove', {
                    ids: this.delIds,
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
            isShowClk(item,isShow) {
                this.isShowIds = [];
                this.isShowVal = isShow;
                this.isShowIds.push(item.id)
                this.isShowShow = true;
            },
            delClk(item) {
                this.delIds = [];
                this.delIds.push(item.id)
                this.delShow = true;
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
                this.delIds = this.multipleTable.map(item => {
                    return item.id
                });
                this.delShow = true;
            },
            handleSelectionChange(val) {
                this.multipleTable = val;
            },
            queryListFn() {
                MyPost('/yl-ms-platform/advertisement/list', {
                    // MyPost('http://192.188.30.188:20006/banyan-procurement/supplier/queryList', {
                    subTitle: this.search_list.subTitle,
                    title: this.search_list.title,
                    isShow: this.search_list.isShow,
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
                    title: '',
                    isShow: '',
                    subTitle:''
                }
                this.loadingShow = true;
                this.queryListFn();
            },
            searchBtnClk() {
                this.serachBoxShow = false;
                this.queryListFn();
            },
            goEditAdvertisement(item){
                // console.info(item)
                this.advertisementItem = {
                    id:item.id,
                    title:item.title || '',
                    subTitle:item.subTitle || '',
                    imageUrl:item.imageUrl || '',
                    adUrl: item.adUrl || '',
                    content:item.content || '',
                    sort: item.sort || '50',
                    isShow: item.isShow || '1',
					backgroundColor: item.backgroundColor || ''
                }
                this.advertisementShow = true;
            },
            goAddAdvertisement() {
                this.advertisementItem = {
                    id:'',
                    title:'',
                    subTitle:'',
                    content:'',
                    imageUrl:'',
                    adUrl: '',
                    sort: '50',
                    isShow: '1',
					backgroundColor: ''
                }
                this.videoLoading='';
                this.uploader= '';
                this.advertisementShow = true;
            },
            goInfor(item) {
                this.$router.push({
                    path: '/productInformation',
                    query: {
                        id: item.id,
                        auditStatus: item.auditStatus
                    }
                })
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
