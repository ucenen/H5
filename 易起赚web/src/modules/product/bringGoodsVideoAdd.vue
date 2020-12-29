<template>
    <div class="addStore">
        <div class="nav-top">
            <div class="nav-box" @click="goPage">
                <img src="static/img/backlast.png"/>
                <p>返回</p>
            </div>
        </div>
        <div class="add-mod-con">
            <div class="add-mod-one">
                <h3><em></em>产品基本信息</h3>
                <div class="add-box-short">
                    <span class="add-tip-short"> spu编号：</span>
                    <el-input size="small" class="add-ipt-short" readonly v-model="infoList.spuNo"></el-input>
                </div>
                <div class="add-box-short">
                    <span class="add-tip-short">产品名称：</span>
                    <el-input size="" class="add-ipt-short" readonly
                              v-model="infoList.productName"></el-input>
                    <span style="width: 20%"/>
                </div>
                <div class="add-box-short">
                    <span class="add-tip-short"> 分类名称：</span>
                    <el-input size="small" class="add-ipt-short" readonly v-model="infoList.categoryName"></el-input>
                </div>
                <div class="add-box-short">
                    <span class="add-tip-short"> 品牌名称：</span>
                    <el-input size="small" class="add-ipt-short" readonly v-model="infoList.brandName"></el-input>
                </div>
            </div>
            <div class="add-mod-one">
                <h3><em></em>带货视频明细</h3>
                <div style="float: right;margin-bottom: 20px;">
                   <span>
                        <el-button size="small" class="mr22"
                                   @click="toAddBringGoodsVideo">添加视频</el-button>
                        <el-button type="primary" size="small" @click="delClk">删除视频</el-button>
                    </span>
                </div>
                <div class="result-con">
                    <div class="tab-mod">
                        <el-table
                                ref="multipleTable"
                                :data="selectedBringGoodsVideoList"
                                tooltip-effect="dark"
                                @selection-change="handleSelectionChange"
                                border>
                            <el-table-column
                                    type="selection"
                                    width="35">
                            </el-table-column>
                            <el-table-column
                                    prop="bringGoodsVideoTitle"
                                    label="带货视频标题">
                            </el-table-column>
                            <el-table-column
                                    prop="bringGoodsVideoSubtitle"
                                    label="带货视频副标题">
                            </el-table-column>
                           <!-- <el-table-column
                                    prop="bringGoodsVideoUrl"
                                    label="带货视频url">
                            </el-table-column>-->
                            <el-table-column
                                    width="170"
                                    label="操作">
                                <template slot-scope="scope">
                                <span class="scope_btn color-blue"
                                      @click="toEditBringGoodsVideo(scope.row)">修改</span>
                                <span class="scope_btn color-blue"
                                      @click="toEditBringGoodsVideo(scope.row)">上传</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="pagenum_mod">
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
            <el-dialog title="带货视频链接"
                       class="minWA"
                       :visible.sync="bringGoodsVideoShow"
                       :close-on-click-modal="false"
                       :close-on-press-escape="false">
                <el-form>
                    <el-form-item size="small" label="产品编号：" :label-width="formBringGoodsVideoWidth">
                        <el-input v-model="bringGoodsVideoItem.spuNo" readonly autocomplete="off" width="200px;" ></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="带货视频标题：" :label-width="formBringGoodsVideoWidth">
                        <el-input v-model="bringGoodsVideoItem.bringGoodsVideoTitle" autocomplete="off" width="200px;" ></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="带货视频副标题：" :label-width="formBringGoodsVideoWidth">
                        <el-input v-model="bringGoodsVideoItem.bringGoodsVideoSubtitle" autocomplete="off" width="200px;" ></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="带货视频描述：" :label-width="formBringGoodsVideoWidth">
                        <el-input v-model="bringGoodsVideoItem.bringGoodsVideoDescribe" autocomplete="off" width="200px;" ></el-input>
                    </el-form-item>
                   <!-- <el-form-item size="small" label="带货视频url：" :label-width="formBringGoodsVideoWidth">
                        <el-input v-model="bringGoodsVideoItem.bringGoodsVideoUrl" readonly autocomplete="off" width="200px;" ></el-input>
                    </el-form-item>-->
                    <el-input v-model="bringGoodsVideoItem.bringGoodsVideoUrl" type="hidden" autocomplete="off" width="200px;" ></el-input>

                   <!-- <el-form-item size="small" label="带货视频时间段：" :label-width="formBringGoodsVideoWidth">
                        <el-date-picker
                                v-model="timeDateVal"
                                size="small"
                                class="add-ipt"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始时间"
                                end-placeholder="结束时间">
                        </el-date-picker>
                    </el-form-item>-->
                </el-form>
                <div class="new-other">
                    <span class="add-tip">视频上传：</span>
                    <div style="padding-left: 100px;">
                        <el-upload
                                class="videoboxUpload"
                                :action="uploadApi"
                                :show-file-list="false"
                                :auto-upload="false"
                                accept=".mp4,.flv,.mov"
                                :on-change="videoChange"
                                :before-upload="videoBeforeUp">
                            <div class="upload_div">
                                <!-- <i style="border:1px solid #ccc;" class="el-icon-plus avatar-uploader-icon"></i> -->
                                <el-button class="el-icon-plus" type="primary" >选择视频</el-button>
                            </div>
                        </el-upload>
                        <div class="msg_video" style="margin: 20px 0 20px 10px;">
                            <span>注意只能上传.mp4,.flv,.mov格式的视频</span>
                        </div>
                        <div class="lbvideo_box" style="margin: 10px 0 10px 10px;">
                            <div class="video_fj" >
                                <video v-if="videoDataUrl" style="width: 300px;height:230px;" :src="videoDataUrl" class="avatar" controls="controls">您的浏览器不支持视频播放</video>
                            </div>
                        </div>
                        <div class="video_bot" style="margin: 0 0 0 10px;">
                            <el-button type="primary" @click="toSaveVideo">保存视频</el-button>
                        </div>
                    </div>

                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button size="small" @click="bringGoodsVideoShow = false">取消</el-button>
                    <el-button size="small" type="primary" @click="bringGoodsVideoCommit()">确认</el-button>
                </div>
            </el-dialog>
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
    import {MyPost, MyGet} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../../components/footerbar/footerbar.vue'

    export default {
        name: 'addStore',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                videoDataUrl: '',
                videoLoading:'',
                videoData: '',
                uploader: '',
                videoDataForm: {
                    userId: '1488360158815453',
                    region: '',
                    partSize: 1048576,//分片大小
                    parallel: 5,//并行上传片数
                    retryCount: 3,//网络失败后重新上传次数
                    retryDuration: 2, //网络失败后重新上传时间
                },
                videoId: '',
                headers: {},
                loadingShow: false,
                addBoxShow: false,
                loadingShow1: false,
                loadingShow2: false,
                selectedBringGoodsVideoList: [

                ],
                tableData: [
                    {
                        spuNo: ""//	spuNo编码	body	false	string
                    }

                ],
                page_show: true,//分页显示
                page_show1: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                titData: '添加带货视频链接',
                delIds: [],
                delShow: false,
                multipleTable: [],
                multipleTableDialog: [],
                loadingText: '正在加载中...',
                dialogImageUrl: '',
                dialogVisible: false,
                srcList: [
                    require('../../../static/img/icon-01.png')
                ],
                url: require('../../../static/img/icon-01.png'),
                provinceList: [],
                cityList: [],
                areaList: [],
                dateVal: '',//经营期限
                cooperationDateVal: '',//合作期限
                infoList: {
                    categoryName: '',//分类名称
                    productName: '',//产品名称
                    spuNo: '',//spu编号
                    brandName: ''//品牌名称
                },
                searchListAll: {
                    categoryId: '',//类别
                    productName: "",//商品名称
                    placeOfOrigin: '', /***产地*/
                    sku: "",//sku编号
                    spuNumber: "",//spu编号
                },
                bringGoodsVideoItem: {
                    spuNo:'',
                    id:'',
                    bringGoodsVideoTitle:'',
                    bringGoodsVideoSubtitle:'',
                    bringGoodsVideoDescribe:'',
                    bringGoodsVideoUrl:''
                },
                timeDateVal: '',//时间期限
                formBringGoodsVideoWidth: '100px',
                bringGoodsVideoShow: false,//带货视频弹窗显示
                hideUpload: false,
                hideUpload2: false,
                hideUpload3: false,
                hideUpload4: false,
                supplierType: [],//供应商类型
                newBusinessLicenseList: [],//企业营业执照集合
                newLegalRepresentativeList: [],//法定代表人身份证正反面
                newSafetyPermitList: [],//食品生产许可证
                newProtocolList: [],//签署协议上传
                props: {
                    value: 'id',
                    label: 'name',
                    children: 'childList',
                    checkStrictly: true,
                    emitPath: false
                },
                options: []
            }
        },
        created() {
            this.$store.state.navTit = '产品管理';
            this.$store.state.navChildTit = '产品管理';
            this.headers = {
                token: store.get('tokenVal')
            };

            if (this.$route.query.id) {
                this.getProductInfo();
            }
        },
        methods: {
            //视频文件钩子改变
            videoChange (file, fileList) {
                let that = this
                let fileReader = new FileReader()
                fileReader.readAsDataURL(file.raw)
                fileReader.onload = function (e) {
                    that.videoDataUrl = e.currentTarget.result
                }
                this.videoData = file
                let userData = '{"Vod":{}}'
                if (this.uploader) {
                    this.uploader.stopUpload()
                }
                this.uploader = this.createUplader(this)
                this.uploader.addFile(file.raw, null, null, null, userData)
            },
            // 视频文件上传前的钩子
            videoBeforeUp (file) {
                const isLt20M = file.size / 1024 / 1024  < 20;
                if (['video/mp4', 'video/ogg', 'video/flv','video/avi','video/wmv','video/rmvb'].indexOf(file.type) == -1) {
                    this.$message.error('请上传正确的视频格式');
                    return false;
                }
                if (!isLt20M) {
                    this.$message.error('上传视频大小不能超过20MB哦!');
                    return false;
                }
            },
            // 保存视频
            toSaveVideo () {
              /*  this.videoLoading = this.$loading({
                    lock: true,
                    text: '正在上传视频文件，请稍后',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });*/
                this.uploader.startUpload()
                // console.log(this.uploader.startUpload)
            },
            // createUploader
            createUplader (that) {
                let uploader = new AliyunUpload.Vod({
                    userId: that.videoDataForm.userId,
                    partSize: that.videoDataForm.partSize,
                    parallel: that.videoDataForm.parallel,
                    retryCount: that.videoDataForm.retryCount,
                    retryDuration: that.videoDataForm.retryDuration,
                    //是否上报上传日志到点播，默认为true
                    enableUploadProgress: true,
                    // 开始上传
                    'onUploadstarted': function (uploadInfo) {
                        console.log(uploadInfo)
                        if (uploadInfo.videoId) {
                            // 如果 uploadInfo.videoId 存在, 调用 刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)
                            //这里主要是前端请求后台刷新上传凭证
                            let params = {
                                videoId: uploadInfo.videoId,
                                Action: 'CreateUploadVideo'
                            }
                            MyGet('/yl-ms-platform/video/refreshUploadVideo', {
                                fileName:uploadInfo.file.name
                            }).then((res) => {
                                // console.info(res);
                                let uploadAuth = res.uploadAuth
                                let uploadAddress = res.uploadAddress
                                let videoId = res.videoId
                                that.videoId = res.videoId
                                console.info(uploadAuth)
                                console.info(uploadAddress)
                                console.info(videoId)
                                uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
                            })
                        }
                        else{
                            // 如果 uploadInfo.videoId 不存在,调用 获取视频上传地址和凭证接口(https://help.aliyun.com/document_detail/55407.html)
                            //这里主要是前端请求后台获取上传凭证
                            let title = uploadInfo.file.name.substr(0, uploadInfo.file.name.lastIndexOf('.'))
                            let params = {
                                title: title, fileName: uploadInfo.file.name,Action: 'CreateUploadVideo'
                            }
                            MyGet('/yl-ms-platform/video/createUploadVideo', {
                                fileName:uploadInfo.file.name
                            }).then((res) => {
                                // console.info(res);
                                let uploadAuth = res.uploadAuth
                                let uploadAddress = res.uploadAddress
                                let videoId = res.videoId
                                that.videoId = res.videoId
                                /*console.info(uploadAuth)
                                console.info(uploadAddress)
                                console.info(videoId)*/
                                uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
                            })
                        }
                    },
                    // 文件上传成功
                    'onUploadSucceed': function (uploadInfo) {
                        that.$message.success('文件上传成功');

                        that.bringGoodsVideoItem.bringGoodsVideoUrl = 'https://outin-7ec74330da2311eaaa1300163e06123c.oss-cn-shanghai.aliyuncs.com/'+uploadInfo.object;
                        // console.log(uploadInfo)
                        that.videoLoading.close()
                    },
                    // 文件上传失败
                    'onUploadFailed': function (uploadInfo, code, message) {
                        // console.log(uploadInfo)
                        that.videoLoading.close()
                    },
                    // 文件上传进度，单位：字节
                    'onUploadProgress': function (uploadInfo, totalSize, loadedPercent) {
                        // console.log(uploadInfo)
                    },
                    // 上传凭证超时
                    'onUploadTokenExpired': function (uploadInfo) {
                        // console.log("onUploadTokenExpired");
                        //实现时，根据uploadInfo.videoId调用刷新视频上传凭证接口重新获取UploadAuth
                        //https://help.aliyun.com/document_detail/55408.html
                        //从点播服务刷新的uploadAuth,设置到SDK里
                        uploader.resumeUploadWithAuth(uploadAuth);
                    },
                    //全部文件上传结束
                    'onUploadEnd':function(uploadInfo){
                        // console.log("onUploadEnd: uploaded all the files");
                        that.videoLoading.close()
                    }
                });
                return uploader
            },
            toAddBringGoodsVideo() {
                this.bringGoodsVideoItem = {
                    spuNo:this.infoList.spuNo,
                    id:'',
                    bringGoodsVideoTitle:'',
                    bringGoodsVideoSubtitle:'',
                    bringGoodsVideoDescribe:'',
                    bringGoodsVideoUrl:''
                }
                this.videoDataUrl= '';
                this.videoLoading='';
                this.videoData= '';
                this.uploader= '';
                this.bringGoodsVideoShow = true;
            },
            toEditBringGoodsVideo(item) {
                this.bringGoodsVideoItem = {
                    spuNo:this.infoList.spuNo,
                    id:item.id,
                    bringGoodsVideoTitle:item.bringGoodsVideoTitle,
                    bringGoodsVideoSubtitle:item.bringGoodsVideoSubtitle,
                    bringGoodsVideoDescribe:item.bringGoodsVideoDescribe,
                    bringGoodsVideoUrl:item.bringGoodsVideoUrl
                }
                this.bringGoodsVideoShow = true;
                this.videoDataUrl= item.bringGoodsVideoUrl;
            },
            bringGoodsVideoCommit() {
                if(this.bringGoodsVideoItem.id==''){
                    this.loadingShow = true;
                    MyPost('/yl-ms-product/ms/bringGoodsVideo/add', {
                        spuNo: this.bringGoodsVideoItem.spuNo,
                        bringGoodsVideoTitle: this.bringGoodsVideoItem.bringGoodsVideoTitle,
                        bringGoodsVideoSubtitle:this.bringGoodsVideoItem.bringGoodsVideoSubtitle,
                        bringGoodsVideoDescribe: this.bringGoodsVideoItem.bringGoodsVideoDescribe,
                        bringGoodsVideoUrl: this.bringGoodsVideoItem.bringGoodsVideoUrl
                    }).then((res) => {
                        this.getBringGoodsVideoList();
                        this.loadingShow = false;
                        this.bringGoodsVideoShow = false
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
                if(this.bringGoodsVideoItem.id!=''){
                    this.loadingShow = true;
                    MyPost('/yl-ms-product/ms/bringGoodsVideo/edit', {
                        id: this.bringGoodsVideoItem.id,
                        bringGoodsVideoTitle: this.bringGoodsVideoItem.bringGoodsVideoTitle,
                        bringGoodsVideoSubtitle:this.bringGoodsVideoItem.bringGoodsVideoSubtitle,
                        bringGoodsVideoDescribe: this.bringGoodsVideoItem.bringGoodsVideoDescribe,
                        bringGoodsVideoUrl: this.bringGoodsVideoItem.bringGoodsVideoUrl
                    }).then((res) => {
                        this.getBringGoodsVideoList();
                        this.loadingShow = false;
                        this.bringGoodsVideoShow = false
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
            handleSelectionDialogChange(val) {
                this.multipleTableDialog = val;
            },
            handleSelectionChange(val) {
                this.multipleTable = val;
            },
            delClk() {
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
            configDelClk(){
                this.loadingShow = true;
                MyPost('/yl-ms-product/ms/bringGoodsVideo/remove', {
                    ids: this.delIds
                }).then((res) => {
                    this.getBringGoodsVideoList();
                    this.loadingShow = false;
                    this.delShow = false
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            getBringGoodsVideoList() {
                this.loadingShow2 = true;
                MyPost('/yl-ms-product/ms/bringGoodsVideo/list', {
                    spuNo: this.infoList.spuNo,
                    start: (this.currentPage - 1) * 10,
                    length: 10
                }).then((res) => {
                    this.loadingShow2 = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.selectedBringGoodsVideoList = data.data;
                        if (data.data.length == 0) {
                            this.page_show1 = false;
                        } else {
                            this.page_show1 = true;
                        }
                        this.totalRecord = data.recordsTotal;
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
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getBringGoodsVideoList();
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
                } else {
                    return null
                }
            },
            getProductInfo() {
                this.loadingShow = true;
                MyPost('/yl-ms-product/ms/product/getProductById', {
                    id: this.$route.query.id
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        let dataInf = data;
                        this.infoList = {
                            categoryName: dataInf.categoryName,//
                            productName: dataInf.productName,//
                            spuNo: dataInf.spuNo,//
                            brandName: dataInf.brandName//
                        }

                        this.getBringGoodsVideoList();
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            goPage() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../styles/css/my.scss"
    /* 谷歌 */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        appearance: none;
        margin: 0;
    }
    /* 火狐 */
    input{
        -moz-appearance:textfield;
    }

    .minW .el-dialog
        width 830px
    .scope_btn
        cursor pointer
        color #DB0D1B
        font-size 12px
        margin 0 7px

    .color-blue
        color #0D81DB

    .addStore
        .hideUpload .el-upload
            display none

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

        .add-mod-con
            padding-top 36px
            overflow hidden
            background #fff

            .add-mod-one
                padding-bottom 30px
                float left
                width 100%

                h3
                    font-weight bold
                    font-size 16px
                    color #333
                    margin-top 20px
                    margin-bottom 22px
                    padding-left 8px
                    line-height 22px
                    height 34px

                    em
                        float left
                        width 34px
                        height 34px
                        background url("../../../static/img/icon-l.png") no-repeat 0 0
                        background-size contain

                .add-box-short
                    /*overflow hidden*/
                    width 33%
                    height 36px
                    float left
                    margin-bottom 22px

                    .el-image
                        width 40px
                        height 40px

                    .add-tip-short
                        width 33%
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

                    .add-ipt-short
                        height 36px
                        width 46%
                        font-size 12px
                        float left

                    .add-tips
                        height 36px
                        line-height 36px
                        font-size 12px

                    .mr20
                        margin-right 20px

                    .el-input--small .el-input__inner
                        height 36px
                        line-height 36px

                .add-box
                    height 36px
                    margin-bottom 22px
                    float left
                    width 66%

                    .add-tip
                        width 16.5%
                        text-align right
                        line-height 36px
                        font-size 12px
                        color #333
                        margin-right 20px
                        display inline
                        float left

                    .add-ipt
                        height 36px
                        width 410px
                        float left

                    .add-ipt-sel
                        float left

                        font-size 12px
                        width 200px
                        margin-right 20px

                    .mr0
                        margin-right 0

                    .el-input--small .el-input__inner
                        height 36px
                        line-height 36px

                    .add-tips
                        font-size 12px
                        color #C13A3C
                        line-height 36px
                        margin-left 26px
                        float left
                        display inline

                    .add-check
                        float left
                        margin 8px 0 0 26px
                        display inline

            .add-mod-line
                overflow hidden
                float left

                .add-box
                    float left
                    width 520px

                    .add-ipt
                        width 230px

            .add-mod-two
                float left
                padding-bottom 30px

                h3
                    font-weight bold
                    font-size 16px
                    color #333
                    margin-top 20px
                    margin-bottom 22px
                    padding-left 8px
                    line-height 22px
                    height 34px

                    em
                        float left
                        width 34px
                        height 34px
                        background url("../../../static/img/icon-l.png") no-repeat 0 0
                        background-size contain

                .update-box
                    margin 22px 22px 0 40px
                    border 2px dashed #e5e5e5
                    padding 32px 0 0 44px
                    overflow hidden

                    h4
                        line-height 18px
                        font-size 16px
                        color #333
                        margin-bottom 16px

                    h5
                        line-height 16px
                        font-size 14px
                        color #333
                        margin-bottom 30px
                        margin-left 20px

                    .upload-img-box
                        overflow hidden

                        .img-tip
                            text-align right
                            font-size 14px
                            color #333
                            line-height 16px
                            width 176px
                            height 20px
                            padding-right 54px
                            float left

                        .lineh36
                            line-height 36px
                            height 36px

                        .upload-ipt
                            float left
                            width 500px
                            height 36px

                        .el-input--small .el-input__inner
                            height 36px
                            line-height 36px

                        .img-con
                            float left
                            overflow hidden

                            .img-center
                                float left

                            .demo-image__preview
                                width 140px
                                height 140px
                                margin-left 20px
                                float left

                        .desc-con
                            width 100%
                            padding 16px 0 18px 0
                            overflow hidden

                            p
                                padding-left 230px
                                font-size 12px
                                color #3738C9
                                line-height 20px

                        .el-upload--picture-card {
                            background-color #fbfdff
                            border 1px dashed #c0ccda
                            border-radius 6px
                            box-sizing border-box
                            width 140px
                            height 140px
                            line-height 138px
                            vertical-align top
                        }

                        .el-upload--picture-card:hover
                            border 1px dashed #C13A3C

                        .el-upload-list--picture-card .el-upload-list__item
                            width 140px
                            height 140px

                    .mb20
                        margin-bottom 20px

            .btn-group
                text-align center
                padding 0 0 40px 0
                overflow hidden
</style>
