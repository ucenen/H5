<template>
    <div class="addStore">
        <div class="nav-top">
            <div class="nav-box" @click="goPage">
                <img src="static/img/backlast.png"/>
                <p>返回</p>
            </div>
            <div class="nav-box" @click="configClk">
                <img src="static/img/save.png"/>
                <p>保存</p>
            </div>

        </div>
        <div class="add-mod-con">
            <div class="add-mod-one">
                <h3><em></em>供应商基本信息</h3>
                <div class="add-box-short">
                    <span class="add-tip-short"><i style="color: red">*</i> 供应商编号：</span>
                    <el-input size="small" class="add-ipt-short" maxlength="20"
                              v-model="infoList.companyCode"></el-input>
                    <span style="width: 20%"/>
                </div>
                <div class="add-box-short">
                    <span class="add-tip-short"><i style="color: red">*</i> 供应商名称：</span>
                    <el-input size="small" class="add-ipt-short" maxlength="32" v-model="infoList.name"></el-input>
                </div>
                <div class="add-box-short">
                    <span class="add-tip-short"><i style="color: red">*</i> 供应商类型：</span>
                    <el-select size="small" class="add-ipt-short" v-model="infoList.companyType" placeholder="供应商类型">
                        <el-option
                                v-for="item in supplierType"
                                :key="item.id"
                                :label="item.dictionaryValue"
                                :value="item.dictionaryKey">
                        </el-option>
                    </el-select>
                </div>
                <div class="add-box-short">
                    <span class="add-tip-short">统一社会信用代码：</span>
                    <el-input size="small" class="add-ipt-short" maxlength="32" v-model="infoList.uscc"></el-input>
                </div>
                <div class="add-box-short">
                    <span class="add-tip-short">法定代表人：</span>
                    <el-input size="small" class="add-ipt-short" maxlength="32" v-model="infoList.lar"></el-input>
                    <!--                    <p class="add-tips">请确保与营业执照一致</p>-->
                </div>
                <div class="add-box-short">
                    <span class="add-tip-short"><i style="color: red">*</i> 供应商联系人：</span>
                    <el-input size="small" class="add-ipt-short" maxlength="32" v-model="infoList.ceo"></el-input>
                </div>
                <div class="add-box-short">
                    <span class="add-tip-short"><i style="color: red">*</i> 联系人电话：</span>
                    <el-input size="small" class="add-ipt-short" maxlength="32" v-model="infoList.ceoPhone"></el-input>
                </div>
                <div class="add-box-short">
                    <span class="add-tip-short"> 供应商成立时间：</span>
                    <el-input size="small" class="add-ipt-short" maxlength="32"
                              v-model="infoList.establishmentTime"></el-input>
                </div>
                <div class="add-box-short">
                    <span class="add-tip-short">注册资本：</span>
                    <el-input size="small" class="add-ipt-short" maxlength="10"
                              type = "number"
                              onkeyup="value=value.replace(/[^\d.]/g,'').replace(/\.{2,}/g,'.')
                                              .replace(/^\./g,'').replace('.','$#$')
                                              .replace(/\./g,'').replace('$#$','.')
                                                .replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')"

                              v-model="infoList.registeredCapital"></el-input>
                    <p class="add-tips">&nbsp;&nbsp;万元</p>
                </div>
                <div class="add-box">
                    <span class="add-tip">经营期限：</span>
                    <el-date-picker
                            v-model="dateVal"
                            size="small"
                            :disabled="infoList.longTerm"
                            value-format="yyyy-MM-dd"
                            class="add-ipt"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                    <el-checkbox size="small" class="add-check" v-model="infoList.longTerm">长期</el-checkbox>
                    <!--                    <span style="width: 60%"/>-->
                </div>

                <div class="add-box">
                    <span class="add-tip"><i style="color: red">*</i> 供应商注册地址：</span>
                    <el-select size="small" class="add-ipt-sel" v-model="infoList.province" @change="provinceClk"
                               placeholder="请选择省">
                        <el-option
                                v-for="item in provinceList"
                                :key="item"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                    <el-select size="small" class="add-ipt-sel" v-model="infoList.city" @change="cityClk"
                               placeholder="请选择市">
                        <el-option
                                v-for="item in cityList"
                                :key="item"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                    <el-select size="small" class="add-ipt-sel mr0" v-model="infoList.county" placeholder="请选择区">
                        <el-option
                                v-for="item in areaList"
                                :key="item"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                    <p class="add-tips">请填写与您营业执照上相同的地址</p>
                </div>
            </div>
            <div class="add-mod-two">
                <h3><em></em>供应商资质上传</h3>
                <div class="update-box">
                    <h4>供应商营业执照</h4>
                    <div class="upload-img-box">
                        <p class="img-tip">资质图片上传 :</p>
                        <div class="img-con">
                            <div class="img-center">
                                <el-upload
                                        action="/yl-ms-platform/imageFileApi/upload"
                                        list-type="picture-card"
                                        :class="{hideUpload:hideUpload}"
                                        :before-upload="uploadBefore"
                                        :headers="headers"
                                        :on-success="uploadSuccess"
                                        :on-preview="handlePictureCardPreview"
                                        :multiple="true"
                                        :limit="3"
                                        :on-exceed="handleExceed"
                                        :file-list="newBusinessLicenseList"
                                        :auto-upload="true"
                                        accept="image/jpeg,image/png"
                                        :on-remove="handleRemove"
                                >
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </div>
                            <!--<div class="demo-image__preview">
                                <el-image
                                        style="width: 140px; height: 140px;"
                                        :src="url"
                                        :preview-src-list="srcList">
                                </el-image>
                            </div>
                            <div class="demo-image__preview">
                                <el-image
                                        style="width: 140px; height: 140px;"
                                        :src="url"
                                        :preview-src-list="srcList">
                                </el-image>
                            </div>-->
                        </div>
                        <div class="desc-con">
                            <p>图片尺寸800px**800px以上，大小800k以内，格式png/jpg/jpeg，最多可上传3张</p>
                            <p>注意：如果图片像素太小，审核人员将无法对您的资质正确评估，因此请务必按照图片要求上传；</p>
                        </div>
                    </div>
                </div>
                <div class="update-box">
                    <h4>供应商负责人身份证正反面</h4>
                    <div class="upload-img-box mb20">
                        <p class="img-tip lineh36">身份证号码 :</p>
                        <el-input size="small" class="upload-ipt" v-model="infoList.idCard" maxlength="18"></el-input>
                    </div>
                    <div class="upload-img-box">
                        <p class="img-tip">身份证图片上传 :</p>
                        <div class="img-con">
                            <div class="img-center">
                                <el-upload
                                        action="/yl-ms-platform/imageFileApi/upload"
                                        list-type="picture-card"
                                        :class="{hideUpload:hideUpload2}"
                                        :before-upload="uploadBefore"
                                        :headers="headers"
                                        :on-success="uploadSuccess2"
                                        :on-preview="handlePictureCardPreview"
                                        :multiple="true"
                                        :limit="2"
                                        :on-exceed="handleExceed2"
                                        :file-list="newLegalRepresentativeList"
                                        :auto-upload="true"
                                        accept="image/jpeg,image/png"
                                        :on-remove="handleRemove2"
                                >
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </div>
                            <!--<div class="demo-image__preview">
                                <el-image
                                        style="width: 140px; height: 140px;"
                                        :src="url"
                                        :preview-src-list="srcList">
                                </el-image>
                            </div>
                            <div class="demo-image__preview">
                                <el-image
                                        style="width: 140px; height: 140px;"
                                        :src="url"
                                        :preview-src-list="srcList">
                                </el-image>
                            </div>-->
                        </div>
                        <div class="desc-con">
                            <p>图片尺寸800px**800px以上，大小800k以内，格式png/jpg/jpeg，最多可上传2张</p>
                            <p>注意：如果图片像素太小，审核人员将无法对您的资质正确评估，因此请务必按照图片要求上传；</p>
                        </div>
                    </div>
                </div>
                <div class="update-box">
                    <h4> 烟酒流通许可证</h4>
                    <div class="upload-img-box mb20">
                        <p class="img-tip lineh36">许可证 :</p>
                        <el-input size="small" maxlength="32" class="upload-ipt"
                                  v-model="infoList.permitCode"></el-input>
                    </div>
                    <div class="upload-img-box">
                        <p class="img-tip">资质图片上传 :</p>
                        <div class="img-con">
                            <div class="img-center">
                                <el-upload
                                        action="/yl-ms-platform/imageFileApi/upload"
                                        list-type="picture-card"
                                        :class="{hideUpload:hideUpload3}"
                                        :before-upload="uploadBefore"
                                        :headers="headers"
                                        :on-success="uploadSuccess3"
                                        :on-preview="handlePictureCardPreview"
                                        :multiple="true"
                                        :limit="3"
                                        :on-exceed="handleExceed"
                                        :file-list="newSafetyPermitList"
                                        :auto-upload="true"
                                        accept="image/jpeg,image/png"
                                        :on-remove="handleRemove3"
                                >
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </div>
                            <!--<div class="demo-image__preview">
                                <el-image
                                        style="width: 140px; height: 140px;"
                                        :src="url"
                                        :preview-src-list="srcList">
                                </el-image>
                            </div>
                            <div class="demo-image__preview">
                                <el-image
                                        style="width: 140px; height: 140px;"
                                        :src="url"
                                        :preview-src-list="srcList">
                                </el-image>
                            </div>-->
                        </div>
                        <div class="desc-con">
                            <p>图片尺寸800px**800px以上，大小800k以内，格式png/jpg/jpeg，最多可上传3张</p>
                            <p>注意：如果图片像素太小，审核人员将无法对您的资质正确评估，因此请务必按照图片要求上传；</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="add-mod-two">
                <h3><em></em>合同文件上传</h3>
                <div class="update-box">
                    <h4>签署协议上传</h4>
                    <div class="upload-img-box">
                        <p class="img-tip"> 资质图片上传 :</p>
                        <div class="img-con">
                            <div class="img-center">
                                <el-upload
                                        action="/yl-ms-platform/imageFileApi/upload"
                                        list-type="picture-card"
                                        :class="{hideUpload:hideUpload4}"
                                        :headers="headers"
                                        :before-upload="uploadBefore"
                                        :on-success="uploadSuccess4"
                                        :on-preview="handlePictureCardPreview"
                                        :multiple="true"
                                        :limit="3"
                                        :on-exceed="handleExceed"
                                        :file-list="newProtocolList"
                                        :auto-upload="true"
                                        accept="image/jpeg,image/png"
                                        :on-remove="handleRemove4"
                                >
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </div>
                            <!--<div class="demo-image__preview">
                                <el-image
                                        style="width: 140px; height: 140px;"
                                        :src="url"
                                        :preview-src-list="srcList">
                                </el-image>
                            </div>
                            <div class="demo-image__preview">
                                <el-image
                                        style="width: 140px; height: 140px;"
                                        :src="url"
                                        :preview-src-list="srcList">
                                </el-image>
                            </div>-->
                        </div>
                        <div class="desc-con">
                            <p>图片尺寸800px**800px以上，大小800k以内，格式png/jpg/jpeg，最多可上传3张</p>
                            <p>注意：如果图片像素太小，审核人员将无法对您的资质正确评估，因此请务必按照图片要求上传；</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="add-mod-one">
                <h3><em></em>合作设置</h3>
                <div class="add-box">
                    <span class="add-tip">合作期限：</span>
                    <el-date-picker
                            v-model="cooperationDateVal"
                            size="small"
                            class="add-ipt"
                            value-format="yyyy-MM-dd"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="add-mod-one">
                <h3><em></em>商品明细</h3>
                <div style="float: right;margin-bottom: 20px;">
                   <span>
                        <el-button size="small" class="mr22"
                                   @click="clearFn">添加商品</el-button>
                        <el-button type="primary" size="small" @click="delClk">删除商品</el-button>
                    </span>
                </div>
                <el-input type="hidden" v-model="infoList.skuIds"></el-input>
                <div class="result-con">
                    <div class="tab-mod">
                        <el-table
                                ref="multipleTable"
                                :data="selectedSkuList"
                                tooltip-effect="dark"
                                @selection-change="handleSelectionChange"
                                border>
                            <el-table-column
                                    type="selection"
                                    width="35">
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
            <el-dialog :title="titData"
                       class="minW"
                       :visible.sync="addBoxShow"
                       :close-on-click-modal="false"
                       :close-on-press-escape="false">
                <div class="add-contain" style="padding: 0 20px">
                    <div class="contain-top">
                        <span class="search-btn">SKU名称：</span>
                        <el-input size="mini" maxlength="50" @keyup.enter.native="queryListFnMall" class="w106 mr30"
                                  v-model="searchListAll.productName"></el-input>
                        <span class="search-btn ">商品类别：</span>
                        <el-cascader class="w106 mr30 " @keyup.enter.native="queryListFnMall"
                                     :options="options" :props="props" v-model="searchListAll.categoryId"
                                     @change="getPropertyFn" :show-all-levels="false"></el-cascader>

                        <span class="search-btn">产地：</span>

                        <el-input size="mini" maxlength="50" @keyup.enter.native="queryListFnMall" class="w106 mr30"
                                  v-model="searchListAll.placeOfOrigin"></el-input>


                        <el-button size="mini" type="primary" plain class="mr22" @click="queryListFnMall">查询
                        </el-button>
                        <el-button size="mini" type="primary" @click="clearFn">清空</el-button>
                    </div>
                    <div class="result-con">
                        <div class="tab-mod">
                            <el-table
                                    ref="multipleTableDialog"
                                    :data="tableData"
                                    tooltip-effect="dark"
                                    max-height="500"
                                    style="width: 100%;"
                                    @selection-change="handleSelectionDialogChange"
                                    border>
                                <el-table-column
                                        type="selection"
                                        width="35">
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
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button size="small" @click="addBoxShow = false">取消</el-button>
                    <el-button size="small" type="primary" @click="addSkuClk">确认</el-button>
                </div>
            </el-dialog>
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
                headers: {},
                loadingShow: false,
                addBoxShow: false,
                loadingShow1: false,
                loadingShow2: false,
                selectedSkuList: [

                ],
                tableData: [
                    {
                        categoryName: '',
                        placeOfOrigin: '',
                        fragranceType: '',
                        capacity: '',
                        boxGauge: '',
                        sku: "",//	sku编码	body	false	string
                        productName: '',
                        price: ''
                    }

                ],
                page_show: true,//分页显示
                page_show1: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                currentPage1: 1,//当前分页
                totalRecord1: 0,//总共分页数据条数
                titData: '添加商品',
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
                    companyCode: '',//公司注册名称
                    name: '',//公司注册名称
                    uscc: '',//统一社会信用代码
                    lar: '',//法定代表人
                    ceo: '',//企业负责人
                    ceoPhone: '',//企业负责人电话
                    establishmentTime: '',//企业成立时间
                    startTime: '',//经营期限开始时间
                    endTime: '',//经营期限截止时间
                    longTerm: false,//经营期限是否长期0否1是
                    registeredCapital: '',//注册资本
                    province: '',//省
                    city: '',//市
                    county: '',//区县
                    cooperationStartTime: '',//合作期限开始时间
                    cooperationEndTime: '',//合作期限截止时间
                    idCard: '',//身份证号码
                    permitCode: '',//生产许可证号
                    companyType: '',//供应商类型,
                    skuIds:''//商品id
                },
                searchListAll: {
                    categoryId: '',//类别
                    productName: "",//商品名称
                    placeOfOrigin: '', /***产地*/
                    sku: "",//sku编号
                    spuNumber: "",//spu编号
                },
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
            this.$store.state.navTit = '供应商管理';
            this.$store.state.navChildTit = '供应商管理';
            this.headers = {
                token: store.get('tokenVal')
            };
            this.categoryListFn();
            this.getProvinceFn();
            this.getSupplierType();
            if (this.$route.query.id) {
                this.getAuditCompanyFn();
            }
        },
        methods: {
            handleSelectionDialogChange(val) {
                this.multipleTableDialog = val;
            },
            handleSelectionChange(val) {
                this.multipleTable = val;
            },
            addSkuClk() {
                if(this.multipleTableDialog.length==0){
                    this.$message.error('请勾选商品');
                    return
                }
                var skuIds = '';
                for (var i = 0; i < this.multipleTableDialog.length; i++) {
                    if(i == (this.multipleTableDialog.length-1)){
                        skuIds += (this.multipleTableDialog[i].id);
                    }else {
                        skuIds += (this.multipleTableDialog[i].id+',');
                    }
                }
                if(this.infoList.skuIds==''){
                    this.infoList.skuIds = skuIds;
                }else {
                    this.infoList.skuIds = (this.infoList.skuIds+','+skuIds);
                }

                this.currentPage1 = 1;
                this.selectedSkuTable();
                this.addBoxShow = false
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
                // console.(this.delIds);
                var tempArray1 = [];//临时数组1
                var tempArray2 = [];//临时数组2

                for(var i=0;i<this.delIds.length;i++){
                    tempArray1[this.delIds[i]]=true;//将数array2 中的元素值作为tempArray1 中的键，值为true；
                }

                var array1 = this.infoList.skuIds.split(',');
                for(var i=0;i<array1.length;i++){
                    if(!tempArray1[array1[i]]){
                        tempArray2.push(array1[i]);//过滤array1 中与array2 相同的元素；
                    }
                }
                var tempStr = '';
                for(var i=0;i<tempArray2.length;i++){
                    if(i==(tempArray2.length-1)){
                        tempStr += tempArray2[i];
                    }else {
                        tempStr += (tempArray2[i]+',');
                    }
                }
                this.infoList.skuIds = tempStr;
                this.currentPage1 = 1;
                this.selectedSkuTable();
                this.delShow = false;
            },
            categoryListFn() {
                var that=this;
                MyGet('/liquor-product/category/categoryList').then((res) => {
                    // that.getSupplier();
                    let {code, message, data} = res;
                    if (code == '0') {
                        that.data = this.deleteChildren(data);
                        that.options=this.deleteChildren(data);
                    } else {
                        that.$message.error(message);
                    }
                })
            },
            deleteChildren(arr) {
                let childs = arr
                for (let i = childs.length; i--; i > 0) {
                    if (childs[i].childList) {
                        if (childs[i].childList.length) {
                            this.deleteChildren(childs[i].childList)
                        } else {
                            delete childs[i].childList
                        }
                    }
                }
                return arr
            },
            clearFn() {
                this.searchListAll = {
                    categoryId: '',//类别
                    productName: "",//商品名称
                    placeOfOrigin: '', /***产地*/
                    sku: "",//sku编号
                    spuNumber: "",//spu编号
                }
                this.currentPage = 1;
                this.getSkuList();
            },
            queryListFnMall() {
                this.currentPage = 1;
                this.getSkuList();
            },
            getSkuList() {
                this.addBoxShow = true
                this.loadingShow1 = true;
                MyPost('/liquor-product/sku/queryList', {
                    categoryId: this.searchListAll.categoryId,
                    productName: this.searchListAll.productName,
                    placeOfOrigin: this.searchListAll.placeOfOrigin,
                    noSkuIds: this.infoList.skuIds,
                    // spuNumber: this.searchListAll.spuNumber,
                    start: (this.currentPage - 1) * 10,
                    length: 10
                }).then((res) => {
                    this.loadingShow1 = false;
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
            selectedSkuTable() {
                this.loadingShow2 = true;
                MyPost('/liquor-product/sku/queryList', {
                    selectedSkuIds: this.infoList.skuIds,
                    start: (this.currentPage1 - 1) * 10,
                    length: 10
                }).then((res) => {
                    this.loadingShow2 = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.selectedSkuList = data.data;
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
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getSkuList();
            },
            handleCurrentChange1(val) {
                this.currentPage1 = val;
                this.selectedSkuTable();
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
            getAuditCompanyFn() {
                this.loadingShow = true;
                MyPost('/banyan-procurement/supplier/getAuditCompany', {
                    id: this.$route.query.id
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        let dataInf = data.supplierDO;
                        this.infoList = {
                            companyCode: dataInf.companyCode,//供应商编号
                            name: dataInf.name,//公司注册名称
                            uscc: dataInf.uscc,//统一社会信用代码
                            lar: dataInf.lar,//法定代表人
                            ceo: dataInf.ceo,//企业负责人
                            ceoPhone: dataInf.ceoPhone,//企业负责人电话
                            establishmentTime: dataInf.establishmentTime,//企业成立时间
                            longTerm: dataInf.longTerm == '1' ? true : false,//经营期限是否长期0否1是
                            registeredCapital: dataInf.registeredCapital,//注册资本
                            province: dataInf.province,//省
                            city: dataInf.city,//市
                            county: dataInf.county,//区县
                            idCard: dataInf.idCard,//身份证号码
                            companyType: dataInf.companyType,//身份证号码
                            permitCode: dataInf.permitCode,//生产许可证号
                            skuIds: dataInf.skuIds,//生产许可证号
                        }
                        this.getCityFn(this.infoList.province);
                        this.getAreaFn(this.infoList.city);
                        if (data.businessLicenseList) {
                            this.newBusinessLicenseList = data.businessLicenseList.map(item => {
                                return {
                                    url: item
                                }
                            })
                            this.hideUpload = this.newBusinessLicenseList.length >= 3;
                        }

                        if (data.safetyPermitList) {
                            this.newSafetyPermitList = data.safetyPermitList.map(item => {
                                return {
                                    url: item
                                }
                            })
                            this.hideUpload3 = this.newSafetyPermitList.length >= 3;
                        }

                        if (data.legalRepresentativeList) {

                            this.newLegalRepresentativeList = data.legalRepresentativeList.map(item => {
                                return {
                                    url: item
                                }
                            })
                            this.hideUpload2 = this.newLegalRepresentativeList.length >= 2;
                        }

                        if (data.protocolList) {
                            this.newProtocolList = data.protocolList.map(item => {
                                return {
                                    url: item
                                }
                            })
                            this.hideUpload4 = this.newProtocolList.length >= 3;
                        }

                        this.dateVal = [this.timeFormat(dataInf.startTime), this.timeFormat(dataInf.endTime)];
                        this.selectedSkuTable();
                        this.cooperationDateVal = [dataInf.startTimeStr, dataInf.endTimeStr];
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            provinceClk() {
                this.infoList.city = '';
                this.cityList = [];
                this.infoList.county = '';
                this.areaList = [];
                this.getCityFn(this.infoList.province);
            },
            cityClk() {
                this.infoList.county = '';
                this.areaList = [];
                this.getAreaFn(this.infoList.city);
            },
            getProvinceFn() {
                this.loadingShow = true;
                MyGet('/yl-ms-platform/province/getProvince', {
                    parentCode: '0',//0  type=1 为获得所有省的集合
                    type: '1',//1为省 2为市 3为区县
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.provinceList = data;
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            getCityFn(parentCode) {
                this.loadingShow = true;
                MyGet('/yl-ms-platform/province/getProvince', {
                    parentCode: parentCode,//0  type=1 为获得所有省的集合
                    type: '2',//1为省 2为市 3为区县
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.cityList = data;
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            getAreaFn(parentCode) {
                this.loadingShow = true;
                MyGet('/yl-ms-platform/province/getProvince', {
                    parentCode: parentCode,//0  type=1 为获得所有省的集合
                    type: '3',//1为省 2为市 3为区县
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.areaList = data;
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
            goPage() {
                this.$router.go(-1);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleExceed2(files, fileList) {
                this.$message.warning(`当前限制选择 2 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            uploadBefore(file) {
                // 上传之前
                const isLt2M = file.size / 1024 / 1024 < 0.8;
                if (!isLt2M) {
                    this.$message.error('上传文件大小不能超过 800k!');
                }
                return isLt2M;
            },
            uploadSuccess(response, file, fileList) {
                console.log(fileList)
                this.newBusinessLicenseList = fileList;
                this.hideUpload = fileList.length >= 3;
            },
            uploadSuccess2(response, file, fileList) {
                this.newLegalRepresentativeList = fileList;
                this.hideUpload2 = fileList.length >= 2;
            },
            uploadSuccess3(response, file, fileList) {
                this.newSafetyPermitList = fileList;
                this.hideUpload3 = fileList.length >= 3;
            },
            uploadSuccess4(response, file, fileList) {
                this.newProtocolList = fileList;
                this.hideUpload4 = fileList.length >= 3;
            },
            handleRemove(file, fileList) {
                this.newBusinessLicenseList = fileList;
                this.hideUpload = fileList.length >= 3;
            },
            handleRemove2(file, fileList) {
                this.newLegalRepresentativeList = fileList;
                this.hideUpload2 = fileList.length >= 2;
            },
            handleRemove3(file, fileList) {
                this.newSafetyPermitList = fileList;
                this.hideUpload3 = fileList.length >= 3;
            },
            handleRemove4(file, fileList) {
                this.newProtocolList = fileList;
                this.hideUpload4 = fileList.length >= 3;
            },
            uploadFail(err, file, fileList) {
                /*this.loadingShow = false;
                // 上传失败，刷新界面
                this.$message.error('上传失败');
                this.fileList = [];*/
                this.$message.error('上传失败');
            },
            configClk() {
                if (!this.infoList.companyCode) {
                    return this.$message.error('请填写供应商编号');
                }

                if (!this.infoList.name) {
                    return this.$message.error('请填写供应商名称');
                }
                // if (!this.infoList.uscc) {
                //     return this.$message.error('请填写统一社会信用代码');
                // }
                // if (!this.infoList.lar) {
                //     return this.$message.error('请填写法定代表人');
                // }
                if (!this.infoList.ceo) {
                    return this.$message.error('请填写供应商联系人');
                }

                if (!this.infoList.ceoPhone) {
                    return this.$message.error('请填写联系人电话');
                }
                if (!/^1\d{10}$/g.test(this.infoList.ceoPhone)) {
                    return this.$message.error('请正确填写联系人电话');
                }
                if (!this.infoList.companyType) {
                    return this.$message.error('请填写供应商类型');
                }

                // if (!this.infoList.establishmentTime) {
                //     return this.$message.error('请填写供应商成立时间');
                // }
                // if (!this.dateVal) {
                //     return this.$message.error('请选择经营期限');
                // }
                // if (!this.infoList.registeredCapital) {
                //     return this.$message.error('请填写注册资本');
                // }
                if (!this.infoList.province) {
                    return this.$message.error('请填写供应商注册地址');
                }
                if (!this.infoList.city) {
                    return this.$message.error('请填写供应商注册地址');
                }
                if (!this.infoList.county) {
                    return this.$message.error('请填写供应商注册地址');
                }
                // if (this.newBusinessLicenseList.length == 0) {
                //     return this.$message.error('请上传供应商营业执照');
                // }
                // if (!this.infoList.idCard) {
                //     return this.$message.error('请填写法定代表人身份证号码');
                // }
                // if (this.newLegalRepresentativeList.length < 2) {
                //     return this.$message.error('请上传法定代表人身份证');
                // }
                // if (!this.infoList.permitCode) {
                //     return this.$message.error('请填写烟酒流通许可证');
                // }
                // if (this.newSafetyPermitList.length == 0) {
                //     return this.$message.error('请上传烟酒流通许可证');
                // }
                // if (this.newProtocolList.length == 0) {
                //     return this.$message.error('请上传签署协议');
                // }
                // if (!this.cooperationDateVal) {
                //     return this.$message.error('请选择合作期限');
                // }
                if (this.$route.query.id) {
                    let BusinessLicenseList = [];
                    let LegalRepresentativeList = [];
                    let SafetyPermitList = [];
                    let ProtocolList = [];
                    BusinessLicenseList = this.newBusinessLicenseList.map(item => {
                        if (item.response) {
                            return item.response.data
                        } else {
                            return item.url
                        }
                    })
                    LegalRepresentativeList = this.newLegalRepresentativeList.map(item => {
                        if (item.response) {
                            return item.response.data
                        } else {
                            return item.url
                        }
                    })
                    SafetyPermitList = this.newSafetyPermitList.map(item => {
                        if (item.response) {
                            return item.response.data
                        } else {
                            return item.url
                        }
                    })
                    ProtocolList = this.newProtocolList.map(item => {
                        if (item.response) {
                            return item.response.data
                        } else {
                            return item.url
                        }
                    })
                    this.loadingShow = true;
                    MyPost('/banyan-procurement/supplier/updManage', {
                        companyCode: this.infoList.companyCode,
                        id: this.$route.query.id,
                        name: this.infoList.name,
                        uscc: this.infoList.uscc,
                        lar: this.infoList.lar,
                        ceo: this.infoList.ceo,
                        ceoPhone: this.infoList.ceoPhone,
                        establishmentTime: this.infoList.establishmentTime,
                        startTime: typeof (this.dateVal[0]) === 'undefined' ? "" : this.dateVal[0],
                        endTime: typeof (this.dateVal[1]) === 'undefined' ? "" : this.dateVal[1],
                        longTerm: this.infoList.longTerm ? '1' : '0',
                        registeredCapital: this.infoList.registeredCapital === null ? "" : this.infoList.registeredCapital,
                        province: this.infoList.province,
                        city: this.infoList.city,
                        county: this.infoList.county,
                        companyType: this.infoList.companyType,
                        BusinessLicenseList: BusinessLicenseList,
                        LegalRepresentativeList: LegalRepresentativeList,
                        SafetyPermitList: SafetyPermitList,
                        ProtocolList: ProtocolList,
                        idCard: this.infoList.idCard,
                        permitCode: this.infoList.permitCode,
                        cooperationStartTime: typeof (this.cooperationDateVal[0]) === 'undefined' ? "" : this.cooperationDateVal[0],
                        cooperationEndTime: typeof (this.cooperationDateVal[1]) === 'undefined' ? "" : this.cooperationDateVal[1],
                        skuIds: this.infoList.skuIds
                    }).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.$router.go(-1);
                        } else {
                            this.$message.error(message);
                        }
                    })
                } else {
                    let BusinessLicenseList = [];
                    let LegalRepresentativeList = [];
                    let SafetyPermitList = [];
                    let ProtocolList = [];
                    BusinessLicenseList = this.newBusinessLicenseList.map(item => {
                        return item.response.data
                    })
                    LegalRepresentativeList = this.newLegalRepresentativeList.map(item => {
                        return item.response.data
                    })
                    SafetyPermitList = this.newSafetyPermitList.map(item => {
                        return item.response.data
                    })
                    ProtocolList = this.newProtocolList.map(item => {
                        return item.response.data
                    })
                    this.loadingShow = true;
                    MyPost('/banyan-procurement/supplier/manage', {
                        companyCode: this.infoList.companyCode,
                        name: this.infoList.name,
                        uscc: this.infoList.uscc,
                        lar: this.infoList.lar,
                        ceo: this.infoList.ceo,
                        ceoPhone: this.infoList.ceoPhone,
                        establishmentTime: this.infoList.establishmentTime,
                        startTime: typeof (this.dateVal[0]) === 'undefined' ? "" : this.dateVal[0],
                        endTime: typeof (this.dateVal[1]) === 'undefined' ? "" : this.dateVal[1],
                        longTerm: this.infoList.longTerm ? '1' : '0',
                        registeredCapital: this.infoList.registeredCapital,
                        province: this.infoList.province,
                        city: this.infoList.city,
                        county: this.infoList.county,
                        companyType: this.infoList.companyType,
                        BusinessLicenseList: BusinessLicenseList,
                        LegalRepresentativeList: LegalRepresentativeList,
                        SafetyPermitList: SafetyPermitList,
                        ProtocolList: ProtocolList,
                        idCard: this.infoList.idCard,
                        permitCode: this.infoList.permitCode,
                        cooperationStartTime: typeof (this.cooperationDateVal[0]) === 'undefined' ? "" : this.cooperationDateVal[0],
                        cooperationEndTime: typeof (this.cooperationDateVal[1]) === 'undefined' ? "" : this.cooperationDateVal[1],
                        skuIds: this.infoList.skuIds
                    }).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.$message({
                                message: '新增成功',
                                type: 'success'
                            });
                            this.$router.go(-1);
                        } else {
                            this.$message.error(message);
                        }
                    })
                }
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
