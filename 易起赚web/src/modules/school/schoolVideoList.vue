<template>
    <div class="supplierList">
        <div class="nav-top">
            <div class="nav-box" @click="goAddSchoolVideo">
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
                <span class="search-btn">标签：</span>
				<el-select size="mini" class="w106 mr30" v-model="search_list.orderField" placeholder="全部">
				    <el-option
				            v-for="item in orderFieldList"
				            :key="item.id"
				            :label="item.title"
				            :value="item.id">
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
                                prop="levelName"
                                label="级别">
                        </el-table-column>
                        <el-table-column
                                prop="categoryName"
                                label="所属分类">
                        </el-table-column>
                        <el-table-column
                                prop="visible"
                                label="状态">

                            <template slot-scope="scope">
                                <span class="scope_btn color-blue" v-if="scope.row.visible==true">显示</span>

                                <span class="scope_btn color-blue" v-if="scope.row.visible==false">隐藏</span>
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
                                width="280"
                                label="操作">
                            <template slot-scope="scope">
                                <!--<span class="scope_btn color-blue"
                                      @click="goAddSchoolVideo(scope.row)">详情</span>-->

                                <span class="scope_btn color-blue"
                                      v-if="scope.row.visible==true"
                                      @click="visibleClk(scope.row,0)">隐藏</span>

                                <span class="scope_btn color-blue"
                                      v-if="scope.row.visible==false"
                                      @click="visibleClk(scope.row,1)">显示</span>

                                <span class="scope_btn color-blue"
                                      @click="goEditSchoolVideo(scope.row)">修改</span>

                                <span class="scope_btn color-blue"
                                      @click="delClk(scope.row,0)">删除</span>

                                <span class="scope_btn color-blue"
                                      v-if="scope.row.collectionType==1"
                                      @click="goChildrenVideo(scope.row)">子视频</span>

                                <span class="scope_btn color-blue"
                                      v-if="scope.row.collectionType==0"
                                      @click="goChoiceCollection(scope.row)">选合集</span>

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
                :visible.sync="visibleShow"
                width="30%"
                :close-on-click-modal="false"
                :close-on-press-escape="false">
            <div class="tip-contain">
                <p>是否更改显示状态？</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="visibleShow = false">取 消</el-button>
                <el-button type="primary" size="small" @click="configVisibleClk">确 定</el-button>
            </span>
        </el-dialog>


        <el-dialog title="选择合集"
                   class="minWA"
                   :visible.sync="choiceCollectionShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <el-form>
                <el-form-item size="small" label="所属分类：" :label-width="formSchoolVideoWidth">
                    <el-select @change="categoryChanged" v-model="choiceCategoryId" placeholder="请选择">
                        <el-option
                                v-for="items in categoryList"
                                :key="items.id"
                                :label="items.title"
                                :value="items.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="small" label="选择合集：" :label-width="formSchoolVideoWidth">
                    <el-select v-model="choiceParentId" placeholder="请选择">
                        <el-option
                                v-for="items in collectionVideoList"
                                :key="items.id"
                                :label="items.title"
                                :value="items.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="choiceCollectionCancel()">取消</el-button>
                <el-button size="small" type="primary" @click="choiceCollectionCommit()">确认</el-button>
            </div>
        </el-dialog>

        <el-dialog title="教学视频"
                   class="minWA"
                   :visible.sync="schoolVideoShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <el-form>
                <el-form-item size="small" label="标题：" :label-width="formSchoolVideoWidth">
                    <el-input v-model="schoolVideoItem.title" autocomplete="off" width="200px;" ></el-input>
                </el-form-item>
                <el-form-item size="small" label="副标题：" :label-width="formSchoolVideoWidth">
                    <el-input v-model="schoolVideoItem.title2" autocomplete="off" width="200px;" ></el-input>
                </el-form-item>
                <el-form-item size="small" label="内容：" :label-width="formSchoolVideoWidth">
                    <el-input v-model="schoolVideoItem.content" autocomplete="off" width="200px;" ></el-input>
                </el-form-item>
                <el-form-item v-show="collectionTypeShow" size="small" label="是否合集：" :label-width="formSchoolVideoWidth">
                    <el-select @change="collectionTypeChanged" v-model="schoolVideoItem.collectionType" placeholder="请选择">
                        <el-option
                                v-for="items in collectionTypeList"
                                :key="items.value"
                                :label="items.label"
                                :value="items.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-show="isShowCategory" size="small" label="所属分类：" :label-width="formSchoolVideoWidth">
                    <el-select v-model="schoolVideoItem.categoryId" placeholder="请选择">
                        <el-option
                                v-for="items in categoryList"
                                :key="items.id"
                                :label="items.title"
                                :value="items.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="small" label="视频等级：" :label-width="formSchoolVideoWidth">
                    <el-select v-model="schoolVideoItem.levelId" placeholder="请选择">
                        <el-option
                                v-for="items in levelList"
                                :key="items.id"
                                :label="items.title"
                                :value="items.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="small" label="可观看级别：" :label-width="formSchoolVideoWidth">
                    <el-select v-model="schoolVideoItem.freeMemberLevel" placeholder="请选择">
                        <el-option
                                v-for="items in freeMemberLevelList"
                                :key="items.value"
                                :label="items.label"
                                :value="items.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="small" label="显示状态：" :label-width="formSchoolVideoWidth">
                    <el-select v-model="schoolVideoItem.visible" placeholder="请选择">
                        <el-option
                                v-for="items in visibleList"
                                :key="items.value"
                                :label="items.label"
                                :value="items.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="small" label="置顶轮播排序" :label-width="formSchoolVideoWidth">
					<el-input v-model="schoolVideoItem.topOrdinal" autocomplete="off" width="40px;" ></el-input>
				</el-form-item>
                <el-form-item size="small" label="最新上架排序" :label-width="formSchoolVideoWidth">
					<el-input v-model="schoolVideoItem.newestOrdinal" autocomplete="off" width="40px;" ></el-input>
				</el-form-item>
                <el-form-item size="small" label="热门推荐排序" :label-width="formSchoolVideoWidth">
					<el-input v-model="schoolVideoItem.hotOrdinal" autocomplete="off" width="40px;" ></el-input>
				</el-form-item>
				<el-form-item size="small" label="封面图片背景色：" :label-width="formSchoolVideoWidth">
                    <el-input v-model="schoolVideoItem.coverImageColor" autocomplete="off" width="200px;" ></el-input>
                </el-form-item>
				<el-form-item size="small" label="封面图片：" :label-width="formSchoolVideoWidth">
				   <el-input v-model="schoolVideoItem.coverImageUri" autocomplete="off" width="200px;" ></el-input>
				   <el-upload
				           class="upload-demo" style="margin-top: 5px;"
				           action="/yl-ms-platform/common/file/upload?folder=school"
				           :headers="headers"
				           accept="image/jpeg,image/png"
				           :on-error="uploadError"
						   :before-upload="uploadBefore"
						   :on-success="uploadSuccess"
                           @change="handleChange"
						   :on-remove="onRemove"
						   list-type="picture"
				           :file-list="imageFileList">
				       <el-button size="small" type="primary">选择上传图片</el-button>
				       <div slot="tip" class="el-upload__tip">只能上传jpg/png格式文件，文件不能超过3M</div>
				   </el-upload>
				</el-form-item>
                <el-input v-model="schoolVideoItem.videoUri" type="hidden" autocomplete="off" width="200px;" ></el-input>
            </el-form>
            <div class="new-other" v-show="videoUploadShow">
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
                    <!--<div class="video_bot" style="margin: 0 0 0 10px;">
                        <el-button type="primary" @click="toSaveVideo">保存视频</el-button>
                    </div>-->
                </div>
            </div>

            <div class="add-mod-one" v-show="videoChildrenShow">
                <h3><em></em>子视频列表</h3>
                <!--<div style="float: right;margin-bottom: 20px;">
                   <span>
                        <el-button type="primary" size="small" @click="delClk">删除子视频</el-button>
                    </span>
                </div>-->
                <div class="result-con">
                    <div class="tab-mod">
                        <el-table
                                ref="multipleTable"
                                :data="selectedChildrenVideoList"
                                tooltip-effect="dark"
                                @selection-change="handleSelectionChange1"
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
                                    prop="title2"
                                    label="副标题">
                            </el-table-column>
                            <el-table-column
                                    prop="levelName"
                                    label="级别">
                            </el-table-column>
                            <el-table-column
                                    width="230"
                                    label="操作">
                                <template slot-scope="scope">
                                    <span class="scope_btn color-blue"
                                          @click="toEditChildVideo(scope.row)">修改</span>

                                    <span class="scope_btn color-blue"
                                          @click="delClk(scope.row,1)">删除</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="pagenum_mod">
                        <el-pagination
                                background
                                class="pageination_css"
                                @current-change="handleCurrentChange1"
                                :current-page="currentPage1"
                                :page-size="10"
                                layout="total, prev, pager, next, jumper"
                                :total="totalRecord1">
                        </el-pagination>
                    </div>
                </div>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="schoolVideoShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="schoolVideoCommit()">确认</el-button>
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
                page_show1: true,//分页显示
                currentPage1: 1,//当前分页
                totalRecord1: 0,//总共分页数据条数
                selectedChildrenVideoList: [],
                loadingShow2: false,
                multipleTable1: "",
                videoChildrenShow:false,
                isChild:false,
                parentId:'',
                isChildDel:false,
                isShowCategory:true,

                choiceCollectionShow:false,
                choiceCategoryId:'',
                choiceParentId:'',
                choiceId:'',

				imageFileList:[],
                formSchoolVideoWidth: '100px',
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
                schoolVideoItem: {
                    parentId:'',
                    id:'',
                    title:'',
                    title2:'',
                    content:'',
                    collectionType:'',
                    coverImageUri:'',
                    videoUri:'',
                    levelId: '',
                    categoryId: '',
                    visible: '',
                    freeMemberLevel: '',
					hotOrdinal: '',
					newestOrdinal: '',
					topOrdinal: '',
                    coverImageColor: ''
                },
                loadingShow: false,
                loadingText: '正在加载中...',
                search_list: {
                    levelId: '',//
                    categoryId:'',
                    visible:'',
                    title:'',
					orderField: ''
                },
				orderFieldList: [
					{ id: '', title: '全部' },
					{ id: 'topOrdinal', title: '置顶轮播'},
					{ id: 'newestOrdinal', title: '最新上架'},
					{ id: 'hotOrdinal', title: '热门推荐'}
				],
                isUploadVideo:'',
                tableData: [],
                page_show: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                serachBoxShow: false,//高级查询弹窗显示
                formLabelWidth: '120px',
                formAccountWidth: '150px',
                supplierStatusShow: false,//供应商启用，禁用
                delShow: false,
                visibleShow:false,
                videoUploadShow:false,
                multipleTable: "",
                schoolVideoShow:false,
                collectionTypeShow:false,
                delIds: [],
                visibleIds:[],
                visibleVal:'',
				headers:"",
                categoryList: [],
                collectionVideoList: [],
                levelList: [],
                visibleList: [{
                    value: true,
                    label: '显示'
                }, {
                    value: false,
                    label: '隐藏'
                }],
                collectionTypeList: [{
                    value: true,
                    label: '合集'
                }, {
                    value: false,
                    label: '非合集'
                }],
                freeMemberLevelList: [{
                    value: 0,
                    label: '所有人可观看'
                }, {
                    value: 1,
                    label: '登录用户可观看'
                },{
                    value: 2,
                    label: '付费会员可观看'
                },{
                    value: 3,
                    label: '付费达人可观看'
                }]
            }
        },
        created() {
            this.$store.state.navTit = '教学管理';
            this.$store.state.navChildTit = '教学视频';
			this.headers={
				token: store.get('tokenVal')
			}
            this.queryListFn();
            this.queryLevelList();
            this.queryCategoryList();
            this.queryCollectionList('');
        },
        methods: {
            getChildrenVideoList() {
                this.loadingShow2 = true;
                MyGet('/school/video/getItemList', {
                    parentId: this.parentId,
                    start: (this.currentPage1 - 1) * 10,
                    length: 10
                }).then((res) => {
                    this.loadingShow2 = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.selectedChildrenVideoList = data.data;
                        if (data.data.length == 0) {
                            this.page_show1 = false;
                        } else {
                            this.page_show1 = true;
                        }
                        this.totalRecord1 = data.recordsTotal;
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
            handleCurrentChange1(val) {
                this.currentPage1 = val;
                this.getChildrenVideoList();
            },
            categoryChanged(){
                this.choiceParentId = '';
                this.queryCollectionList(this.choiceCategoryId);
            },
            collectionTypeChanged(){
                if(this.schoolVideoItem.collectionType){
                    this.videoUploadShow = false;
                }else {
                    this.videoUploadShow = true;
                }
            },
            iamgeChange(){
                alert(1);
            },
			uploadSuccess(response, file, fileList) {
				console.info(response);
				console.info(file);
				console.info(fileList);
				if (response.code == '0') {
				    this.schoolVideoItem.coverImageUri = response.data;
                    this.imageFileList = [];
                    this.imageFileList.push({url:this.schoolVideoItem.coverImageUri});
					this.$message({
						message: '上传成功',
						type: 'success'
					});
				} else {
					this.imageFileList = [];
					this.$message({
						message: response.message,
						type: 'error'
					});
				}
			},
            handleChange(file, fileList) {
                // console.log("这是file", file);
                // console.log("这是fileList", fileList);
                // 当多余一个的时候替换文件
                if (fileList.length > 1) {
                    fileList.splice(0, 1);
                }
            },
			uploadBefore(file) {
			    // 上传之前
			    let types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png'];
			
			    const isImage = types.includes(file.type);
			    if (!isImage) {
			
			        this.$message.error('上传图片只能是 JPG、GIF、PNG 格式!');
			
			        return false;
			
			    }
			    const isLt2M = file.size / 1024 / 1024 < 3;
			    if (!isLt2M) {
			        this.$message.error('上传文件大小不能超过 3M!');
			    }
			    // this.files.push(file);
			    return isLt2M;
			},
			
			
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
            toEditChildVideo(item){
                this.videoDataUrl= '';
                this.videoData= '';
                this.imageFileList= [];
                MyGet('/school/video/getInfo', {id: item.id}).then((res) => {
                    if (res.code && res.code != '0') {
                        that.$confirm(res.message, '提示', {
                            confirmButtonText: '关闭',
                            showCancelButton: false,
                            type: 'error'
                        });
                    } else {
                        this.schoolVideoItem = {
                            id:res.data.id,
                            parentId : res.data.parentId,
                            title:res.data.title,
                            title2:res.data.title2,
                            content:res.data.content,
                            videoUri:res.data.videoUri,
                            levelId: res.data.levelId,
                            categoryId: res.data.categoryId,
                            visible: res.data.visible,
                            freeMemberLevel: res.data.freeMemberLevel,
                            coverImageUri:res.data.coverImageUri,
                            hotOrdinal: res.data.hotOrdinal,
                            newestOrdinal: res.data.newestOrdinal,
                            topOrdinal: res.data.topOrdinal,
                            coverImageColor : res.data.coverImageColor
                        }
                        if (this.schoolVideoItem.coverImageUri) {
                            this.imageFileList.push({url:this.schoolVideoItem.coverImageUri});
                        }
                        this.videoDataUrl= res.data.videoUri;
                    }
                });

            },
            doSchoolVideoCommit(){
                if(this.schoolVideoItem.id==''){
                    MyPost('/school/video/save', {
                        title: this.schoolVideoItem.title,
                        parentId:this.schoolVideoItem.parentId,
                        title2: this.schoolVideoItem.title2,
                        content:this.schoolVideoItem.content,
                        videoUri: this.schoolVideoItem.videoUri,
                        levelId: this.schoolVideoItem.levelId,
                        categoryId: this.schoolVideoItem.categoryId || '',
                        visible: this.schoolVideoItem.visible,
                        freeMemberLevel: this.schoolVideoItem.freeMemberLevel,
                        coverImageUri:this.schoolVideoItem.coverImageUri,
						hotOrdinal: this.schoolVideoItem.hotOrdinal || '0',
                        collectionType: this.schoolVideoItem.collectionType || '0',
						newestOrdinal: this.schoolVideoItem.newestOrdinal || '0',
						topOrdinal: this.schoolVideoItem.topOrdinal || '0',
                        coverImageColor: this.schoolVideoItem.coverImageColor
                    }).then((res) => {
                        this.isUploadVideo==0;
                        if (!this.isChild){
                            this.queryListFn();
                            this.loadingShow = false;
                            this.schoolVideoShow = false
                            let {code, message, data} = res;
                            if (code == '0') {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                            } else {
                                this.$message.error(message);
                            }
                        }
                        if (this.isChild){
                            this.loadingShow = false;
                            let {code, message, data} = res;
                            if (code == '0') {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.videoDataUrl= '';
                                this.videoData= '';
                                this.schoolVideoItem = {
                                    id:'',
                                    parentId : this.parentId,
                                    title:'',
                                    title2:'',
                                    content:'',
                                    videoUri:'',
                                    levelId: '',
                                    categoryId: '',
                                    visible: '',
                                    freeMemberLevel: '',
                                    coverImageUri:'',
                                    hotOrdinal: '',
                                    newestOrdinal: '',
                                    topOrdinal: '',
                                    coverImageColor: ''
                                }
                                this.getChildrenVideoList();
                            } else {
                                this.$message.error(message);
                            }
                        }
                    })
                }
                if(this.schoolVideoItem.id!=''){
                    MyPost('/school/video/save', {
                        id: this.schoolVideoItem.id,
                        title: this.schoolVideoItem.title,
                        title2: this.schoolVideoItem.title2,
                        content:this.schoolVideoItem.content,
                        videoUri: this.schoolVideoItem.videoUri,
                        levelId: this.schoolVideoItem.levelId,
                        categoryId: this.schoolVideoItem.categoryId || '',
                        visible: this.schoolVideoItem.visible,
                        freeMemberLevel: this.schoolVideoItem.freeMemberLevel,
                        coverImageUri:this.schoolVideoItem.coverImageUri,
						hotOrdinal: this.schoolVideoItem.hotOrdinal || '0',
                        // collectionType: this.schoolVideoItem.collectionType || '0',
						newestOrdinal: this.schoolVideoItem.newestOrdinal || '0',
						topOrdinal: this.schoolVideoItem.topOrdinal || '0',
                        coverImageColor: this.schoolVideoItem.coverImageColor
                    }).then((res) => {
                        this.isUploadVideo==0;
                        if (!this.isChild){
                            this.queryListFn();
                            this.loadingShow = false;
                            this.schoolVideoShow = false
                            let {code, message, data} = res;
                            if (code == '0') {
                                this.$message({
                                    message: '保存成功',
                                    type: 'success'
                                });
                            } else {
                                this.$message.error(message);
                            }
                        }
                        if (this.isChild){
                            this.loadingShow = false;
                            let {code, message, data} = res;
                            if (code == '0') {
                                this.$message({
                                    message: '保存成功',
                                    type: 'success'
                                });
                                this.videoDataUrl= '';
                                this.videoData= '';
                                this.schoolVideoItem = {
                                    id:'',
                                    parentId : this.parentId,
                                    title:'',
                                    title2:'',
                                    content:'',
                                    videoUri:'',
                                    levelId: '',
                                    categoryId: '',
                                    visible: '',
                                    freeMemberLevel: '',
                                    coverImageUri:'',
                                    hotOrdinal: '',
                                    newestOrdinal: '',
                                    topOrdinal: '',
                                    coverImageColor: ''
                                }
                                this.getChildrenVideoList();
                            } else {
                                this.$message.error(message);
                            }
                        }
                    })
                }
            },
            goChoiceCollection(item){
                this.choiceCollectionShow = true;
                this.choiceId = item.id;
                this.choiceParentId = '';
            },
            choiceCollectionCancel(){
                this.choiceCollectionShow = false;
                this.choiceId = '';
                this.choiceParentId = '';
            },
            choiceCollectionCommit(){
                this.loadingShow = true;
                if(this.choiceId == '' || this.choiceId==null || this.choiceId == undefined || this.choiceParentId == '' || this.choiceParentId==null || this.choiceId == undefined ){
                    this.$message.error('集合或主键为空');
                    this.loadingShow = false;
                }else {
                    MyPost('/school/video/save', {
                        id: this.choiceId,
                        parentId: this.choiceParentId
                    }).then((res) => {
                        this.queryListFn();
                        this.loadingShow = false;
                        this.choiceCollectionShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                        } else {
                            this.$message.error(message);
                        }
                    })
                }
            },
            schoolVideoCommit() {
                this.loadingShow = true;
                if(this.isUploadVideo==1){
                    this.uploader.startUpload();
                }else {
                    this.doSchoolVideoCommit()
                }
                this.isUploadVideo=0;
            },
            schoolVideoCommitOld() {
                if(this.schoolVideoItem.id==''){
                    this.loadingShow = true;
                    MyPost('/school/video/save', {
                        title: this.schoolVideoItem.title,
                        title2: this.schoolVideoItem.title2,
                        content:this.schoolVideoItem.content,
                        videoUri: this.schoolVideoItem.videoUri,
                        levelId: this.schoolVideoItem.levelId,
                        categoryId: this.schoolVideoItem.categoryId,
                        visible: this.schoolVideoItem.visible,
                        freeMemberLevel: this.schoolVideoItem.freeMemberLevel,
                        coverImageUri:this.schoolVideoItem.coverImageUri,
						hotOrdinal: this.schoolVideoItem.hotOrdinal || '0',
						newestOrdinal: this.schoolVideoItem.newestOrdinal || '0',
						topOrdinal: this.schoolVideoItem.topOrdinal || '0'
                    }).then((res) => {
                        this.queryListFn();
                        this.loadingShow = false;
                        this.schoolVideoShow = false
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
                if(this.schoolVideoItem.id!=''){
                    this.loadingShow = true;
                    MyPost('/school/video/save', {
                        id: this.schoolVideoItem.id,
						title: this.schoolVideoItem.title,
                        title2: this.schoolVideoItem.title2,
                        content:this.schoolVideoItem.content,
                        videoUri: this.schoolVideoItem.videoUri,
                        levelId: this.schoolVideoItem.levelId,
                        categoryId: this.schoolVideoItem.categoryId,
                        visible: this.schoolVideoItem.visible,
                        freeMemberLevel: this.schoolVideoItem.freeMemberLevel,
                        coverImageUri:this.schoolVideoItem.coverImageUri,
						hotOrdinal: this.schoolVideoItem.hotOrdinal || '0',
						newestOrdinal: this.schoolVideoItem.newestOrdinal || '0',
						topOrdinal: this.schoolVideoItem.topOrdinal || '0'
                    }).then((res) => {
                        this.queryListFn();
                        this.loadingShow = false;
                        this.schoolVideoShow = false
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
                this.isUploadVideo = 1;
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
						that.isUploadVideo==0;
                        that.$message.success('文件上传成功');
                        that.schoolVideoItem.videoUri = 'https://vod.yqz.ylgyl.com/'+uploadInfo.object;
                        // that.schoolVideoItem.videoUri = 'https://outin-7ec74330da2311eaaa1300163e06123c.oss-cn-shanghai.aliyuncs.com/'+uploadInfo.object;
                        that.doSchoolVideoCommit();
                    },
                    // 文件上传失败
                    'onUploadFailed': function (uploadInfo, code, message) {
                        // console.log(uploadInfo)
                        // that.videoLoading.close()
                        that.loadingShow = false;
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
                        // that.videoLoading.close()
                    }
                });
                return uploader
            },
            queryListFnMall() {
                this.currentPage = 1;
                this.queryListFn();
            },
            configVisibleClk() {
                this.loadingShow = true;
                MyPost('/school/video/setVisible', {
                    ids: this.visibleIds,
                    visible: this.visibleVal,
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.visibleShow = false;
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
                            this.visibleShow = false;
                        }).catch(() => {
                            this.visibleShow = false;
                        });
                    }
                })
            },
            configDelClk() {
                this.loadingShow = true;
                MyPost('/school/video/delete', {
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
                        if(this.isChildDel){
                            this.getChildrenVideoList();
                        }
                        if(!this.isChildDel){
                            this.queryListFn();
                        }

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
            visibleClk(item,visible) {
                this.visibleIds = [];
                this.visibleVal = visible;
                this.visibleIds.push(item.id)
                this.visibleShow = true;
            },
            delClk(item,isChild) {
                this.delIds = [];
                this.delIds.push(item.id)
                this.delShow = true;
                if(isChild==1){
                    this.isChildDel = true;
                }
                if(isChild==0){
                    this.isChildDel = false;
                }
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
            handleSelectionChange1(val) {
                this.multipleTable = val;
            },
            queryCollectionList(categoryId){
                MyGet('/school/video/getItemList', {
                    collectionType:1,
                    categoryId:categoryId
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.collectionVideoList = data.data;
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            queryCategoryList(){
                MyGet('/school/category/getSimpleList', {
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        // console.info(data)
                        this.categoryList = data;
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            queryLevelList(){
                MyGet('/school/level/getSimpleList', {
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        // console.info(data)
                        this.levelList = data;
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            queryListFn() {
                MyGet('/school/video/getItemList', {
                    // MyPost('http://192.188.30.188:20006/banyan-procurement/supplier/queryList', {
                    levelId: this.search_list.levelId,
                    title: this.search_list.title,
                    categoryId: this.search_list.categoryId,
                    visible: this.search_list.visible,
					orderField: this.search_list.orderField,
                    start: (this.currentPage - 1) * 10,
                    length: 10
                }).then((res) => {
                    console.info(res)
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
                    levelId: '',//企业名称
                    title: '',
                    categoryId: '',
                    visible: '',
                }
                this.queryListFn();
            },
            searchBtnClk() {
                this.serachBoxShow = false;
                this.queryListFn();
            },
            goAddBringGoodsVideo(item) {
                this.$router.push({
                    path: '/schoolVideoAdd',
                    query: {
                        id: item.id
                    }
                })
            },
            goSkuPriceList(item) {
                this.$router.push({
                    path: '/skuPriceList',
                    query: {
                        id: item.id
                    }
                })
            },
            goChildrenVideo(item){
                this.isShowCategory = false;
                this.isChild = true;
                this.parentId = item.id;
                this.imageFileList = [];
                this.schoolVideoItem = {
                    id:'',
                    parentId:item.id,
                    title:'',
                    title2:'',
                    content:'',
                    videoUri:'',
                    levelId: '',
                    categoryId: '',
                    visible: '',
                    freeMemberLevel: '',
                    coverImageUri:'',
                    hotOrdinal: '',
                    newestOrdinal: '',
                    topOrdinal: '',
                    coverImageColor:''
                }
                this.getChildrenVideoList(item.id);
                this.videoDataUrl = '';
                this.videoLoading ='';
                this.videoData = '';
                this.uploader = '';
                this.collectionTypeShow = false;
                this.schoolVideoShow = true;
                this.videoUploadShow = true;
                this.videoChildrenShow = true;
            },
            goEditSchoolVideo(item){
                // console.info(item)
                this.collectionTypeShow = false;
                this.isShowCategory = true;
                this.parentId = '';
                this.videoChildrenShow = false;
                this.isChild = false;
				var that = this;
				MyGet('/school/video/getInfo', {id: item.id}).then((res) => {
					if (res.code && res.code != '0') {
						that.$confirm(res.message, '提示', {
						    confirmButtonText: '关闭',
						    showCancelButton: false,
						    type: 'error'
						});
					} else {
						that.goEditSchoolVideoCore(res.data);
					}
				});
			},
            goEditSchoolVideoCore(item){
                // console.info(item)
                this.schoolVideoItem = {
                    id:item.id,
                    title:item.title,
                    title2:item.title2,
                    content:item.content,
                    videoUri:item.videoUri,
                    levelId: item.levelId,
                    categoryId: item.categoryId,
                    visible: item.visible,
                    freeMemberLevel: item.freeMemberLevel,
                    coverImageUri:item.coverImageUri,
					hotOrdinal: item.hotOrdinal,
					newestOrdinal: item.newestOrdinal,
                    collectionType: item.collectionType,
					topOrdinal: item.topOrdinal,
                    coverImageColor:item.coverImageColor
                };
				this.imageFileList = [];
				if (this.schoolVideoItem.coverImageUri) {
					this.imageFileList.push({url:this.schoolVideoItem.coverImageUri});
				}
                this.schoolVideoShow = true;
                this.videoDataUrl= item.videoUri;
                if(item.collectionType){
                    this.videoUploadShow = false;
                }else {
                    this.videoUploadShow = true;
                }

            },
            goAddSchoolVideo() {
                this.imageFileList = [];
                this.parentId = '';
                this.isChild = false;
                this.isShowCategory = true;
                this.schoolVideoItem = {
                    id:'',
                    parentId : '',
                    title:'',
                    title2:'',
                    content:'',
                    videoUri:'',
                    levelId: '',
                    categoryId: '',
                    visible: '',
                    freeMemberLevel: '',
                    coverImageUri:'',
					hotOrdinal: '',
					newestOrdinal: '',
					topOrdinal: ''
                }
                this.videoDataUrl= '';
                this.videoLoading='';
                this.videoData= '';
                this.uploader= '';
                this.collectionTypeShow = true;
                this.schoolVideoShow = true;
                this.videoChildrenShow = false;
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
