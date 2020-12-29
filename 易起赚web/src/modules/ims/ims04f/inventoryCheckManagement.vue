<template>
    <div class="prochusingManagement">
        <div class="nav-top">
            <!--            <div class="nav-box" @click="goPage" v-if="functionCodes.indexOf('AD')>-1">-->
			<div class="nav-box" @click="editClk">
			    <img src="static/img/addNew.png"/>
			    <p>新增</p>
			</div>
            <div class="nav-box" @click="addClk(2)">
                <img src="static/img/xianshi.png"/>
                <p>显示</p>
            </div>
            <div class="nav-box" @click="reviewClk()">
                <img src="static/img/yincang.png"/>
                <p>隐藏</p>
            </div>
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
                <span class="search-btn">标题：</span>
                <el-input size="mini" @keyup.enter.native="queryListFnMall" maxlength="50" class="w106 mr30"
                          v-model="searchList.purchaseNo"></el-input>
                <span class="search-btn">内容：</span>
                <el-input maxlength="50" @keyup.enter.native="queryListFnMall" size="mini" class="w106 mr30"
                          v-model="searchList.supplierName"></el-input>
                <span class="search-btn">级别：</span>
                <el-select class="w120 mr30" size="mini" placeholder="级别" v-model="searchList.reviewerStatus">
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
                <span class="search-btn">分类：</span>
                <el-select class="w120 mr30" size="mini" placeholder="分类" v-model="searchList.reviewerStatus">
                    <el-option
                            label="全部"
                            value="">
                    </el-option>
                    <el-option
                            label="抖音"
                            value="1">
                    </el-option>
					<el-option
					        label="淘宝"
					        value="2">
					</el-option>
					<el-option
					        label="快手"
					        value="2">
					</el-option>
                </el-select>
				<span class="search-btn">状态：</span>
				<el-select class="w120 mr30" size="mini" placeholder="状态" v-model="searchList.reviewerStatus">
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
                              prop="warehouseOrderDate"
                              label="标题">
                      </el-table-column>
                      <el-table-column
                              prop="biaoti"
                              label="内容">
                      </el-table-column>
					  <el-table-column
					          prop="businessNo"
					          label="级别">
					  </el-table-column>
					  <el-table-column
					          prop="biaoti"
					          label="所属分类">
					  </el-table-column>
                      <el-table-column
                              prop="businessNo"
                              label="状态">
                      </el-table-column>
                  	<el-table-column
                  	        prop="warehouseOrderNo"
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
                                    @click="editClk(scope.row,2)">显示/隐藏</span>
							  <span class="scope_btn color-blue"
									      @click="editClk(scope.row,2)">修改</span>
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
                title="作废确认"
                :visible.sync="invalidShow"
                width="30%"
                :close-on-click-modal="false"
                :close-on-press-escape="false">
            <div class="tip-contain">
                <p>正在执行作废操作，是否确认作废？</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="invalidShow = false">取 消</el-button>
                <el-button type="primary" size="small" @click="reviewClick(2)">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog :title="titleRec"
                   class="minW"
                   :visible.sync="serachBoxShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="add-contain">
             

                <div class="add-box">
                    <span class="add-tip"><i style="color: red">*</i> 标题：</span>
                    <el-input class="add-ipt" v-model="receiveForm.sendUnit" maxlength="50"
                              autocomplete="off"></el-input>

                </div>
                <div class="add-box">
                    <span class="add-tip"><i style="color: red">*</i> 副标题：</span>
                    <el-input class="add-ipt" v-model="receiveForm.sendPerson" maxlength="50"
                              autocomplete="off"></el-input>

                </div>
                <div class="add-box">
                    <span class="add-tip"><i style="color: red">*</i> 内容：</span>
                    <el-input class="add-ipt" v-model="receiveForm.sendPersonPhone" maxlength="20"
                              autocomplete="off"></el-input>

                </div>
                <div class="add-box">
                    <span class="add-tip">平台：</span>
                    <el-select clearable class="add-ipt" size="mini" placeholder="全部" v-model="searchList.reviewerStatus">
                        <el-option
                                label="全部"
                                value="0">
                        </el-option>
                        <el-option
                                label="抖音"
                                value="1">
                        </el-option>
                        <el-option
                                label="淘宝"
                                value="2">
                        </el-option>
                        <el-option
                                label="快手"
                                value="3">
                        </el-option>
                      
           
                    </el-select> 

                </div>
                <div class="new-other">
                    <span class="add-tip">课程链接：</span>
                    <el-input class="add-ipt" v-model="receiveForm.sendNo" maxlength="30" autocomplete="off"></el-input>

                </div>
				<div class="new-other">
				    <span class="add-tip">视频封面图片：</span>
					<el-input class="add-ipt" v-model="receiveForm.sendNo" maxlength="100"
					 autocomplete="off"></el-input>
				</div>
				<div class="new-other">
				    <span class="add-tip">视频封面图片上传：</span>
				    <div style="padding-left: 100px;">
				                         <el-upload
				                           class="videoboxUpload"
				                           action=""
				                           :drag="true"
				                           :multiple="false"
										    accept="image/jpeg,image/png,image/jpg"
				                            :file-list="images"
				                            :http-request="uploadHttp"
				                            :before-upload="beforeAvatarUpload"
				                            :on-remove="handleRemove"
				                             list-type="picture">
				                           <div class="upload_div">
				                               <!-- <i style="border:1px solid #ccc;" class="el-icon-plus avatar-uploader-icon"></i> -->
				                               <el-button class="el-icon-plus" type="primary" >上传图片</el-button>
				                           </div> 
				                         </el-upload>
				                         <div class="msg_video" style="margin: 20px 0 20px 10px;">
				                             <span>注意只能上传.png,.jpg,.jpeg格式的图片</span>
				                         </div>
				                         
				    </div>
				
				</div>
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
				                               <el-button class="el-icon-plus" type="primary" >上传视频</el-button>
				                           </div> 
				                         </el-upload>
				                         <div class="msg_video" style="margin: 20px 0 20px 10px;">
				                             <span>注意只能上传.mp4,.flv,.mov格式的视频</span>
				                         </div>
				                         <div class="lbvideo_box" style="margin: 10px 0 10px 10px;">
				                             <div class="video_fj" >
				                                 <video v-if="videoDataUrl" style="width: 300px;" :src="videoDataUrl" class="avatar" controls="controls">您的浏览器不支持视频播放</video>
				                             </div>
				                         </div>
				                         <div class="video_bot" style="margin: 0 0 0 10px;">
				                             <el-button type="primary" @click="toSaveVideo">保存视频</el-button>
				                         </div>
				    </div>
				
				</div>
                <div class="add-box">
                    <span class="add-tip">级别：</span>
                   <el-select clearable class="add-ipt" size="mini" placeholder="状态" v-model="searchList.reviewerStatus">
                       <el-option
                               label="初级"
                               value="1">
                       </el-option>
                       <el-option
                               label="中级"
                               value="2">
                       </el-option>
                      <el-option
                              label="高级"
                              value="3">
                      </el-option>
                   </el-select> 

                </div>
               <div class="add-box">
                   <span class="add-tip">状态：</span>
                  <el-select clearable class="add-ipt" size="mini" placeholder="状态" v-model="searchList.reviewerStatus">
                      <el-option
                              label="显示"
                              value="1">
                      </el-option>
                      <el-option
                              label="隐藏"
                              value="1">
                      </el-option>
                     
                  </el-select> 
               
               </div>
			 
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="serachBoxShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="receiveClick">确定</el-button>
            </div>

        </el-dialog>

        <el-dialog :title="titleReview"
                   class="minW"
                   :visible.sync="revShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="add-contain">
                <el-form :model="reviewForm" ref="ruleFormAdd" :label-width="formLabelWidth">
                    <div class="new-other">
                        <el-form-item size="small" label="复核结果：">
                            <el-radio-group v-model="reviewForm.auditStatus">
                                <el-radio :label="2">通过</el-radio>
                                <el-radio :label="3">不通过</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div class="new-other">
                        <el-form-item size="small" label="复核意见：">
                            <el-input type="textarea" v-model="reviewForm.memo" maxlength="250"
                                      :rows="3"
                                      autocomplete="off"></el-input>
                        </el-form-item>

                    </div>

                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="revShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="reviewClick(1)">确定</el-button>
            </div>

        </el-dialog>

        <el-dialog title="打印"
                   class="minW-print"
                   :visible.sync="printShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="add-contain">
                <div  class="result-con">
                    <div class="tab-mod" id="printTest">
                        <div class="title-1">
                            诚信引领消费服务平台
                        </div>
                        <div class="title-2">
                            采购订单
                        </div>
                        <div class="title-3">
                            <div class="title-4">
                                <span>供应商：</span>
                                <span>{{printForm.warehouseOrderNo}}</span>
                            </div>
                            <div class="title-5">
                                <span>单据日期：</span>
                                <span>{{printForm.creationTime}}</span>
                            </div>
                            <div class="title-7">
                                <span>单据号：</span>
                                <span>{{printForm.warehouseOrderType}}</span>
                            </div>
                        </div>
                        <div class="title-3">
                            <div class="title-4">
                                <span>采购部门：</span>
                                <span>{{printForm.warehouseName}}</span>
                            </div>
<!--                            <div class="title-5">-->
<!--                                <span>入库人员：</span>-->
<!--                                <span>{{printForm.warehouseOrderPerson}}</span>-->
<!--                            </div>-->
                        </div>
                        <el-table
                                ref="multipleTablePrint"
                                :data="tableDataPrint"
                                tooltip-effect="dark"
                                style="width: 100%;"
                                @selection-change="handleSelectionChangePrint"
                                border>
                            <el-table-column
                                    type="index"
                                    label="序号">
                            </el-table-column>
                            <el-table-column
                                    prop="sku"
                                    label="SKU编码">
                            </el-table-column>
                            <el-table-column
                                    prop="productName"
                                    width="140"
                                    label="SKU名称">
                            </el-table-column>
                            <el-table-column
                                    prop="capacity"
                                    label="规格">
                            </el-table-column>
                            <el-table-column
                                    prop="inWarehouseNumber"
                                    label="数量">
                            </el-table-column>
                            <el-table-column
                                    prop="unit"
                                    label="单位">
                            </el-table-column>
                            <el-table-column
                                    prop="unitPrice"
                                    label="单价">
                            </el-table-column>
                            <el-table-column
                                    prop="totalPrice"
                                    label="总金额">
                            </el-table-column>
                        </el-table>
                        <div class="title-3">
                            <div class="title-6">
                                <span>合计金额：</span>
                                <span>{{printForm.totalPrice}}</span>
                            </div>
                        </div>
                        <div class="title-3">
                            <div class="title-8">
                                <span>备注：</span>
                                <span>{{printForm.memo}}</span>
                            </div>

                        </div>
                        <p class="title-p"></p>
                        <div class="title-3">
                            <div class="title-4">
                                <span>打印时间：</span>
                                <span>{{printForm.currentTime}}</span>
                            </div>
                            <div class="title-5">
                                <span>{{currentPagePrint}}</span>
                                <span>/ {{multipleTable.length}}</span>
                            </div>
                            <div class="title-7" style="text-align: right">
                                <span>       </span>
                                <span >诚信引领消费服务平台</span>
                            </div>
                        </div>
                    </div>
                    <div class="pagenum_modPrint" v-if="page_show">
                        <el-pagination
                                background
                                class="pageination_css"
                                @current-change="handleCurrentChangePrint"
                                :current-page="currentPagePrint"
                                :page-size="100"
                                layout="total, prev, pager, next, jumper"
                                :total="totalRecordPrint">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="printShow = false">取消</el-button>
                <el-button size="small" v-print="printObj" type="primary">打印</el-button>
            </div>

        </el-dialog>
        <div class="images" v-show="showImageBoolean" v-viewer="{movable: true}">
            <img v-for="src in images" :src="src" :key="src">
        </div>
    </div>
</template>

<script>
    import store from 'si-store'
    import {MyGet, MyPost} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from 'components/footerbar/footerbar.vue'
    import ossClient from '@/common/aliyun.oss.client';
    export default {
        supplierName: 'prochusingManagement',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
				images: [],
				uploadConf: {
				    region: null,
				    accessKeyId: null,
				    accessKeySecret: null,
				    bucket: null,
				    stsToken: null
				},
				videoDataUrl: '',
				videoLoading:'',
				videoData: '',
				uploader: '',
				videoDataForm: {
				    userId: '1467922223355590',
				    region: '',
				    partSize: 1048576,//分片大小
				    parallel: 5,//并行上传片数
				    retryCount: 3,//网络失败后重新上传次数
				    retryDuration: 2, //网络失败后重新上传时间
				},
				videoId: '',
                currentPagePrint:1,
                totalRecordPrint:0,
                multipleTablePrint:"",
                tableDataPrint:[],
                printForm:{
                    creationTime:"",
                    warehouseOrderNo: "",
                    warehouseDate: "",
                    businessNo: "",
                    warehouseName:"",
                    warehouseOrderDate: "",
                    warehouseOrderType: "",
                    warehouseOrderDepartment: "",
                    warehouseOrderPerson: "",
                    warehouseOrderPersonPhone: "",
                    currentTime:"",
                    totalPrice:"",
                    memo:"",
                },
                printObj:{
                    id:"printTest",
                    popTitle:"",
                },
                headers: {},
                showImageBoolean: false,
                images: [],
                titleRec: "新增/编辑教学视频",
                serachBoxShow: false,
                printShow:false,
                titleReview: "复核意见",
                revShow: false,
                invalidShow: false,
                receiveForm: {
                    filePath: '',// 附件

                    id: '',// 收货单编码

                    inWarehouseId: '',// 入库仓库

                    invoiceNumber: '',// 发票号码

                    purchaseId: '',// 采购单id

                    receiveAddress: '',// 收货地址

                    receiveDate: '',// 收货日期

                    receiveDepartment: '',// 收货部门

                    receiveMemo: '',// 收货备注

                    receivePerson: '',// 收货人员

                    receiveType: '',// 收货类型 1： 收货 2： 收获入库

                    sendCarNo: '',// 配送车牌号

                    sendNo: '',// 发货单号

                    sendPerson: '',// 发货人

                    sendPersonPhone: '',// 发货人电话

                    sendUnit: '',// 发货单位
                },
                reviewForm: {
                    auditStatus: "",
                    id: "",
                    memo: "",

                },

                formLabelWidth: '120px',
                loadingShow: false,
                loadingText: '正在加载中...',
                tableData: [
                  {
					  biaoti:"xiaodong"
				  }
                ],
                page_show: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                searchList: {
                    purchaseNo: '',//采购单编号
                    purchasePerson: '',//采购人员
                    reviewerStatus: '',//采购状态
                    supplierName: '',//供应商名称
                },
                delShow: false,
                delId: '',
                delIds: '',
                multipleTable: "",
                functionCodes: [],
                receiveId: '',
                files: [],
                brandList: []
            }
        },
        created() {
            this.$store.state.navTit = '教学管理';
            this.$store.state.navChildTit = '教学视频';
            this.headers = {
                token: store.get('tokenVal')
            };
            // this.getFunctionCode(this, this.$route.query.code);
            // this.queryListFn();
        },
        methods: {
			   //上传图片到oss
				/**
					 * 初始化
					 */
			       init () {
			            //获取阿里云token  这里是后台返回来的数据
			            const aliyun = {
			                Region: '你的Region  注意 这个只要 空间名 不要 http:// 和 .aliyunoss.com !!',
			                AccessKeyId: '你的AccessKeyId',
			                AccessKeySecret: '你的AccessKeySecret',
			                Bucket: '你的Bucket',
			                SecurityToken: '你的SecurityToken'
			            };
			            const {Region, AccessKeyId, AccessKeySecret, Bucket, SecurityToken} = aliyun && aliyun.data;
			            this.uploadConf.region = Region;
			            this.uploadConf.accessKeyId = AccessKeyId;
			            this.uploadConf.accessKeySecret = AccessKeySecret;
			            this.uploadConf.bucket = Bucket;
			            this.uploadConf.stsToken = SecurityToken;
			        },
			 
			        /**
			         * 阿里云OSS上传
			         */
			        uploadHttp({ file }) {
			            const { imgName } = 'ALIOSS_IMG_';
			            const fileName = `${imgName}/${Date.parse(new Date())}`;  //定义唯一的文件名
			            ossClient(this.uploadConf).put(fileName, file, {
			                'ContentType': 'image/jpeg'
			            }).then(({res, url, name}) => {
			                if (res && res.status == 200) {
			                    console.log(`阿里云OSS上传图片成功回调`, res, url, name);
			                }
			            }).catch((err) => {
			                console.log(`阿里云OSS上传图片失败回调`, err);
			            });
			        },
			 
					/**
					 * 图片限制
					 */
			        beforeAvatarUpload (file) {
			            const isJPEG = file.name.split('.')[1] === 'jpeg';
			            const isJPG = file.name.split('.')[1] === 'jpg';
			            const isPNG = file.name.split('.')[1] === 'png';
			            const isLt500K = file.size / 1024 / 500 < 2;
			            if (!isJPG && !isJPEG && !isPNG) {
			                this.$message.error('上传图片只能是 JPEG/JPG/PNG 格式!');
			            }
			            if (!isLt500K) {
			                this.$message.error('单张图片大小不能超过 500KB!');
			            }
			            return (isJPEG || isJPG || isPNG) && isLt500K;
			        },
			 
					/**
					 * 移除图片
					 */
			        handleRemove (file, fileList) {
			            console.log(`移除图片回调`, fileList);
						},

			
			
			
			 //视频文件钩子改变
			        videoChange (file, fileList) {
			            console.log(file)
			            let that = this
			            let fileReader = new FileReader()
			            fileReader.readAsDataURL(file.raw)
			            fileReader.onload = function (e) {
			                that.videoDataUrl = e.currentTarget.result
			            }
			            this.videoData = file
			            console.log(file.size / 1024 / 1024)
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
			            this.videoLoading = this.$loading({
			              lock: true,
			              text: '正在上传视频文件，请稍后',
			              spinner: 'el-icon-loading',
			              background: 'rgba(0, 0, 0, 0.7)'
			            });
			            this.uploader.startUpload()
			            // console.log(this.uploader.startUpload)
			        },
			        // createUploader
			        createUplader (that) {
						// console.log("本地视频地址==="+that.videoDataUrl)
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
			                    console.log("uploadInfo1==="+ JSON.stringify(uploadInfo))
								// console.log("本地视频地址1==="+that.videoDataUrl)
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
			                          if (res.code !== 200) {
			                            return that.$message.error(res.msg)
			                          }
			                          let uploadAuth = res.data.uploadAuth
			                          let uploadAddress = res.data.uploadAddress
			                          let videoId = res.data.videoId
			                          that.videoId = res.data.videoId
			                          uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
			                          that.$message.success(res.msg)
			                          that.videoLoading.close()
			                        })
			                     }
			                 else{
			                        // 如果 uploadInfo.videoId 不存在,调用 获取视频上传地址和凭证接口(https://help.aliyun.com/document_detail/55407.html)
			                         //这里主要是前端请求后台获取上传凭证
									
			                        let title = uploadInfo.file.name.substr(0, uploadInfo.file.name.lastIndexOf('.'))
									 console.log("文件名称1==="+title)
			                        let params = {
			                            title: title, fileName: uploadInfo.file.name,Action: 'CreateUploadVideo'
			                        }
			                        MyGet('/yl-ms-platform/video/refreshUploadVideo', {
			                            fileName:uploadInfo.file.name
			                        }).then((res) => {
			                          if (res.code !== 200) {
			                            return that.$message.error(res.msg)
			                          } 
			                          let uploadAuth = res.data.uploadAuth
			                          let uploadAddress = res.data.uploadAddress
			                          let videoId = res.data.videoId
			                          that.videoId = res.data.videoId
			                          uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
			                        })
			                     }
			                  },
			                  // 文件上传成功
			                  'onUploadSucceed': function (uploadInfo) {
			                    console.log(uploadInfo)
			                    that.$message.success(res.msg)
			                    that.videoLoading.close()
			                  },
			                  // 文件上传失败
			                  'onUploadFailed': function (uploadInfo, code, message) {
			                   console.log(uploadInfo)
			                   that.$message.success(res.msg)
			                    that.videoLoading.close()
			                  },
			                  // 文件上传进度，单位：字节
			                  'onUploadProgress': function (uploadInfo, totalSize, loadedPercent) {
			                      console.log(uploadInfo)
			                  },
			                  // 上传凭证超时
			                  'onUploadTokenExpired': function (uploadInfo) {
			                      console.log("onUploadTokenExpired");
			                  //实现时，根据uploadInfo.videoId调用刷新视频上传凭证接口重新获取UploadAuth
			                  //https://help.aliyun.com/document_detail/55408.html
			                  //从点播服务刷新的uploadAuth,设置到SDK里   
			                  that.$message.success('上传文件超时，正在重新上传')
			                  uploader.resumeUploadWithAuth(uploadAuth); 
			                  },
			                //全部文件上传结束
			                'onUploadEnd':function(uploadInfo){
			                       console.log("onUploadEnd: uploaded all the files");
			                       that.$message.success('全部文件上传完毕')
			                        that.videoLoading.close()
			                   }
			            });
			            return uploader
			        },
            getWarehouseInfo(){
                MyPost('/banyan-inventory/warehouse/in/queryById', {
                    id:this.warehouseId
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.printForm={
                            warehouseOrderNo: data.warehouseOrderNo,
                            creationTime: this.timeFormatYYMMDD(data.creationTime),
                            businessNo: data.businessNo,
                            warehouseOrderDate:  this.timeFormatYYMMDD(data.warehouseOrderDate),
                            warehouseOrderType: this.getWarehouseOrderDateType(data.warehouseOrderType),
                            warehouseOrderDepartment: data.warehouseOrderDepartment,
                            warehouseOrderPerson: data.warehouseOrderPerson,
                            warehouseOrderPersonPhone: data.warehouseOrderPersonPhone,
                            warehouseId: data.warehouseId,
                            warehouseName:data.warehouseName,
                            currentTime:this.printForm.currentTime,
                            totalPrice:0.00,
                            memo:data.reviewerMemo,
                        }
                        this.tableDataPrint= data.warehouseDetailProductList;
                        for(let i=0;i<this.tableDataPrint.length;i++){
                            if (this.tableDataPrint[i].unitPrice==null){
                                this.tableDataPrint[i].unitPrice=0;
                            }
                            if (this.tableDataPrint[i].inWarehouseNumber==null){
                                this.tableDataPrint[i].inWarehouseNumber=0;
                            }
                            this.tableDataPrint[i].totalPrice=Number(this.tableDataPrint[i].unitPrice)*Number(this.tableDataPrint[i].inWarehouseNumber)
                            this.tableDataPrint[i].unitPrice= this.regexNumberAll(this.tableDataPrint[i].unitPrice);
                            this.tableDataPrint[i].totalPrice= this.regexNumberAll(this.tableDataPrint[i].totalPrice);
                            this.printForm.totalPrice=this.regexNumberAll(Number(this.printForm.totalPrice)+ Number(this.tableDataPrint[i].totalPrice));
                            this.consoleCommon(this.printForm.totalPrice)
                        }
                    } else {
                        this.printForm={
                            warehouseOrderNo: "",
                            creationTime: "",
                            businessNo:  "",
                            warehouseOrderDate:  "",
                            warehouseOrderType:  "",
                            warehouseOrderDepartment:  "",
                            warehouseOrderPerson:  "",
                            warehouseOrderPersonPhone:  "",
                            warehouseId:  "",
                            warehouseName: "",
                            currentTime:this.printForm.currentTime,
                            totalPrice:"",
                            memo:"",
                        }
                        this.tableDataPrint= [];
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
            handleSelectionChangePrint(val) {
                this.multipleTablePrint = val;
            },
            handleCurrentChangePrint(val){
                this.currentPagePrint=val;
                this.warehouseId=this.multipleTable[this.currentPagePrint-1].id;
                this.getWarehouseInfo();
            },
            print(){
                if (this.multipleTable.length == 0) {
                    this.$confirm('请先勾选记录，再进行操作', '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'error'
                    }).then(() => {
                        this.printShow = false;
                    }).catch(() => {
                        this.printShow = false;
                    });
                    return;
                }
                this.warehouseId=this.multipleTable[0].id;
                this.totalRecordPrint=100*this.multipleTable.length
                this.getWarehouseInfo();
                this.printForm.currentTime= this.checkTime(new Date());
                this.printShow=true;
            },
            receiveChange(item) {
                if (item == '1')
                    this.receiveForm.inWarehouseId = ''
            },
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
            onExceed(file, fileList) {
                this.$message.error('最多只能上传10张图片');
            },
            uploadSuccess(response, file, fileList) {
                this.$message({
                    message: '上传成功',
                    type: 'success'
                });
                // console.log(this.files)
                if (this.receiveForm.filePath.length > 0)
                    this.receiveForm.filePath = this.receiveForm.filePath + "," + response.data;
                else
                    this.receiveForm.filePath = response.data;
                console.log(this.receiveForm.filePath)
                this.elUploadBoolean = false;
            },
            onRemove(file, fileList) {
                this.receiveForm.filePath = "";
                if (fileList.length > 0)
                    for (var i = 0; i < fileList.length; i++) {
                        if (this.receiveForm.filePath.length > 0)
                            this.receiveForm.filePath = this.receiveForm.filePath + "," + fileList[i].response.data;
                        else
                            this.receiveForm.filePath = fileList[i].response.data;

                    }
                // console.log(file)
                console.log(this.receiveForm.filePath)
            },
            showImage(src) {
                if (this.checkNull(src)) {
                    return;
                }
                this.images = [];
                this.images.push(src)
                const viewer = this.$el.querySelector('.images').$viewer
                viewer.show()
            },
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
            receive(item) {
                this.receiveForm = {
                    filePath: '',// 附件

                    id: '',// 收货单编码

                    inWarehouseId: '',// 入库仓库

                    invoiceNumber: '',// 发票号码

                    purchaseId: '',// 采购单id

                    receiveAddress: '',// 收货地址

                    receiveDate: '',// 收货日期

                    receiveDepartment: '',// 收货部门

                    receiveMemo: '',// 收货备注

                    receivePerson: '',// 收货人员

                    receiveType: '',// 收货类型 1： 收货 2： 收获入库

                    sendCarNo: '',// 配送车牌号

                    sendNo: '',// 发货单号

                    sendPerson: '',// 发货人

                    sendPersonPhone: '',// 发货人电话

                    sendUnit: '',// 发货单位
                }
                this.receiveId = item.id
                this.serachBoxShow = true;
                // this.getDictionaryList()
            },
            receiveClick() {
                // if (!this.receiveForm.receiveType) {
                //     this.$message.error('请选择收货类型');
                //     return
                // }
                // if (this.receiveForm.receiveType == 2 && !this.receiveForm.inWarehouseId) {
                //     this.$message.error('请选择收货仓库');
                //     return
                // }
                if (!this.receiveForm.sendUnit) {
                    this.$message.error('请输入发货单位');
                    return
                }
                if (!this.receiveForm.sendPerson) {
                    this.$message.error('请选择发货人');
                    return
                }
                if (!this.receiveForm.sendPersonPhone) {
                    this.$message.error('请输入发货人电话');
                    return
                }
                if (!this.receiveForm.receiveDate) {
                    this.$message.error('请选择收货日期');
                    return
                }
                if (!this.receiveForm.receiveDepartment) {
                    this.$message.error('请输入收货部门');
                    return
                }
                let searchList = {
                    filePath: this.receiveForm.filePath,// 附件

                    id: this.receiveId,// 收货单编码

                    inWarehouseId: this.receiveForm.inWarehouseId,// 入库仓库

                    invoiceNumber: this.receiveForm.invoiceNumber,// 发票号码

                    purchaseId: this.receiveId,// 采购单id

                    receiveAddress: this.receiveForm.receiveAddress,// 收货地址

                    receiveDate: this.receiveForm.receiveDate,// 收货日期

                    receiveDepartment: this.receiveForm.receiveDepartment,// 收货部门

                    receiveMemo: this.receiveForm.receiveMemo,// 收货备注

                    receivePerson: this.receiveForm.receivePerson,// 收货人员

                    receiveType: 1,//this.receiveForm.receiveType,// 收货类型 1： 收货 2： 收获入库

                    sendCarNo: this.receiveForm.sendCarNo,// 配送车牌号

                    sendNo: this.receiveForm.sendNo,// 发货单号

                    sendPerson: this.receiveForm.sendPerson,// 发货人

                    sendPersonPhone: this.receiveForm.sendPersonPhone,// 发货人电话

                    sendUnit: this.receiveForm.sendUnit,// 发货单位
                };
                this.loadingShow = true;
                MyPost('/banyan-procurement/receive/save', searchList).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.serachBoxShow = false;
                        this.queryListFn();
                        this.$message({
                            message: "收货成功",
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

            handleSelectionChange(val) {
                this.multipleTable = val;
            },

            clearFn() {
                this.searchList = {
                    purchaseNo: '',//采购单编号
                    purchasePerson: '',//采购人员
                    reviewerStatus: '',//采购状态
                    supplierName: '',//供应商名称
                }
                this.queryListFn();
            },
            reviewClick(type) {
                if (type == 1) {
                    if (!this.reviewForm.auditStatus) {
                        this.$message.error('请选择复核结果');
                        return
                    }
                }
                if(type==2){
                    this.reviewForm.auditStatus=4
                }
                this.loadingShow = true;
                if (this.checkNull(this.reviewForm.id)) {
                    MyPost('/banyan-procurement/purchase/review', {
                        auditStatus: this.reviewForm.auditStatus,
                        ids: this.delIds,
                        memo: this.reviewForm.memo,
                    }).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.revShow = false;
                            this.invalidShow = false;
                            this.$message({
                                message: type == 1 ? '复核成功' : '作废成功',
                                type: 'success'
                            });
                            this.queryListFn();
                        } else {
                            this.$confirm(message, '提示', {
                                confirmButtonText: '确定',
                                showCancelButton: false,
                                type: 'error'
                            }).then(() => {

                                this.revShow = false;
                                this.invalidShow = false;
                            }).catch(() => {
                                this.revShow = false;
                                this.invalidShow = false;
                            });
                        }
                    })
                } else {
                    MyPost('/banyan-procurement/purchase/review', {
                        auditStatus: this.reviewForm.auditStatus,
                        ids: this.reviewForm.id,
                        memo: this.reviewForm.memo,
                    }).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.revShow = false;
                            this.invalidShow = false;
                            this.$message({
                                message: type == 1 ? '复核成功' : '作废成功',
                                type: 'success'
                            });
                            this.queryListFn();
                        } else {
                            this.$confirm(message, '提示', {
                                confirmButtonText: '确定',
                                showCancelButton: false,
                                type: 'error'
                            }).then(() => {
                                this.revShow = false;
                                this.invalidShow = false;
                            }).catch(() => {
                                this.revShow = false;
                                this.invalidShow = false;
                            });
                        }
                    })
                }
            },
            queryListFn() {
                MyPost('/banyan-procurement/purchase/queryList', {
                    purchaseNo: this.searchList.purchaseNo.trim(),
                    reviewerStatus: this.searchList.reviewerStatus,
                    supplierName: this.searchList.supplierName.trim(),
                    purchasePerson: this.searchList.purchasePerson.trim(),
                    start: (this.currentPage - 1) * 10,
                    length: 10
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.tableData = data.data;
                        for (let i = 0; i < this.tableData.length; i++) {
                            if (this.tableData[i].creatorTime != null) {
                                this.tableData[i].creatorTime = this.timeFormatYYMMDD(this.tableData[i].creatorTime)
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
               this.serachBoxShow=true
            },
            addClk(type) {
                this.$router.push({
                    path: '/prochusingAdd',
                    query: {
                        edit: type,
                    }
                })
            },
            uptateClk(type, item) {
                this.$router.push({
                    path: '/prochusingAdd',
                    query: {
                        edit: type,
                        prochusingId: item.id
                    }
                })
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
    @import "../../../styles/css/my.scss"

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
