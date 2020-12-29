<template>
    <div class="systemSet">
        <div class="nav-top">
            <div class="nav-box" @click="goPage">
                <img src="../../common/images/backlast.png"/>
                <p>返回</p>
            </div>
            <!--<div class="nav-box" @click="saveAll('1')">-->
            <!--<img src="../../common/images/save.png"/>-->
            <!--<p>保存</p>-->
            <!--</div>-->
            <div class="nav-box" @click="saveAll('2')">
                <img src="../../common/images/submit.png"/>
                <p>提交</p>
            </div>
        </div>
        <div class="infor-mod">
            <div class="infor-tab-all">
                <div class="infor-tab">
                    <span :class="tabShow == 1 ? 'tab-on' : ''" @click="tabClk(1)">填写SKU信息</span>
                    <span :class="tabShow == 2 ? 'tab-on' : ''" @click="tabClk(2)">商品基本信息</span>
                    <span :class="tabShow == 3 ? 'tab-on' : ''" @click="tabClk(3)">关联SKU信息</span>
                    <span :class="tabShow == 4 ? 'tab-on' : ''" @click="tabClk(4)">图文描述</span>
                    <span :class="tabShow == 5 ? 'tab-on' : ''" @click="tabClk(5)">其他属性信息</span>
                    <span :class="tabShow == 6 ? 'tab-on' : ''" @click="tabClk(6)">售后服务</span>
                </div>
            </div>
            <div class="tab-con1" v-show="tabShow == 1">
                <h3><em></em>填写SKU信息:</h3>
                <div class="add-box" v-if="typeStyle==2">
                    <span class="add-tip">  SKU编号：</span>
                    <el-input maxlength="50" :disabled="true" size="small" class="add-ipt"
                              v-model="newform.skuCode"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip"><i style="color: red">*</i> &nbsp;&nbsp;SKU名称：</span>
                    <el-input size="small" maxlength="50" class="add-ipt" v-model="newform.skuName"></el-input>
                </div>

                <div class="add-box">
                    <span class="add-tip">是否启用：</span>

                    <el-select class="add-ipt" size="mini" placeholder="是否启用" v-model="newform.isOpen">
                        <el-option
                                label="启用"
                                value="1">
                        </el-option>
                        <el-option
                                label="禁用"
                                value="2">
                        </el-option>
                    </el-select>

                </div>

                <div class="add-box">
                    <span class="add-tip">  划线价格：</span>
                    <el-input size="small" type="tel"  @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)"
                              class="add-ipt" v-model="newform.markingPrice"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip"><i style="color: red">*</i> &nbsp;&nbsp;销售价格：</span>
                    <el-input size="small" type="tel"  @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)"
                              class="add-ipt" v-model="newform.price"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">  数量单位：</span>
                    <el-input size="small" maxlength="30" class="add-ipt" v-model="newform.unit"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">  条形码：</span>
                    <el-input size="small" maxlength="30" class="add-ipt" v-model="newform.barCode"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">  容量：</span>
                    <el-input size="small" maxlength="30" class="add-ipt" v-model="newform.capacity"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">  包装层级：</span>
                    <el-input size="small" maxlength="30" class="add-ipt" v-model="newform.packagingLevel"></el-input>
                </div>
                <div class="add-box" v-for="(item,index) in optionGuideLists">
                    <span class="add-tip">{{item.name}}：</span>

                    <el-select class="add-ipt" clearable size="mini" placeholder="请选择"
                               v-model="newform.valueIds[index]">
                        <el-option
                                v-for="itemTwo in item.propertyValueDOList"
                                :key="itemTwo.id"
                                :label="itemTwo.value"
                                :value="itemTwo.id">
                        </el-option>
                    </el-select>

                </div>
                <div class="add-box clearFox">
                    <span class="add-tip">  SKU主图：</span>
                    <el-upload
                            v-if="elUploadBoolean"
                            class="upload-demo"
                            :headers="headers"
                            action="/liquor-product/imageLibraryApi/oneUpload"
                            accept="image/jpeg,image/png"
                            :before-upload="uploadBefore"
                            :on-success="uploadSuccess"
                            :on-remove="handleRemove"
                            list-type="picture"
                            :file-list="fileList">
                        <el-button size="small" type="primary">选择上传文件</el-button>
                        <div slot="tip" class="el-upload__tip">为了保证图片的正常使用，仅支持3M以内jpg、bmp、gif、png格式图片上传</div>
                    </el-upload>
                    <div class="close_all" v-if="!elUploadBoolean">
                        <el-image style="width: 36px;height: 36px;border-radius: 36px" :src="newform.url" @click="showImage(newform.url)">
                            <div slot="error" style="font-size: 40px;" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </el-image>
                        <i @click="removeImage"
                           style="cursor:pointer;font-size: 16px;position: absolute;right: 0px;top: 0px;"
                           class="el-icon-circle-close"></i>
                    </div>
                </div>
            </div>
            <div class="tab-con1" v-show="tabShow == 2">
                <h3><em></em>商品基本信息:</h3>
                <div class="add-box clearFox">
                    <span class="add-tip"><i style="color: red">*</i> &nbsp;&nbsp;商品名称：</span>
                    <el-input disabled size="small" class="add-ipt" v-model="searchList.spuName"></el-input>
                </div>
                <div class="add-box clearFox">
                    <span class="add-tip">* 副标题：</span>
                    <el-input size="small" class="add-ipt" disabled v-model="searchList.title"></el-input>
                </div>
                <div class="add-box clearFox">
                    <span class="add-tip">* 品牌：</span>

                    <el-select disabled class="add-ipt" size="mini" :placeholder="品牌" v-model="searchList.brandId">
                        <el-option
                                v-for="itemTwo in brandList"
                                :key="itemTwo.id"
                                :label="itemTwo.name"
                                :value="itemTwo.id">
                        </el-option>
                    </el-select>

                </div>
                <div class="add-box clearFox">
                    <span class="add-tip">* 分享描述：</span>
                    <el-input size="small" disabled class="add-ipt" v-model="searchList.sharingDes"></el-input>
                </div>
                <div class="add-box clearFox">
                    <span class="add-tip">* 商品关键字：</span>
                    <el-input size="small" disabled class="add-ipt" v-model="searchList.keyword"></el-input>
                </div>
                <h3><em></em>商品基础属性:</h3>
                <div class="add-box">
                    <span class="add-tip">  酒精度：</span>
                    <el-input disabled size="small" maxlength="30" class="add-ipt" v-model="searchList.alcohol"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">  年份：</span>
                    <el-date-picker
                            disabled
                            class="add-ipt"
                            v-model="searchList.particularYear"
                            type="year"
                            placeholder="选择年">
                    </el-date-picker>
                </div>
                <div class="add-box">
                    <span class="add-tip">  香型：</span>
                    <el-input disabled size="small" maxlength="30" class="add-ipt" v-model="searchList.fragranceType"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">  净含量：</span>
                    <el-input disabled size="small" maxlength="30" class="add-ipt" v-model="searchList.netContent"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">  产地：</span>
                    <el-input disabled size="small" maxlength="30" class="add-ipt" v-model="searchList.placeOfOrigin"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">  生产日期：</span>
                    <el-date-picker
                            disabled
                            class="add-ipt"
                            v-model="searchList.productionDate"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </div>
                <div class="add-box">
                    <span class="add-tip">  保质期：</span>
                    <el-input size="small" maxlength="30" disabled class="add-ipt" v-model="searchList.qualityGuaranteePeriod"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">  包装方式：</span>
                    <el-input size="small" maxlength="30" disabled class="add-ipt" v-model="searchList.packingMethod"></el-input>
                </div>
                <div class="add-box" v-for="(item,index) in optionLists">
                    <span class="add-tip">{{item.specsName}}：</span>

                    <el-select disabled class="add-ipt" size="mini" v-model="searchList.properties[item.id]">
                        <el-option
                                v-for="itemTwo in item.specsValueList"
                                :key="itemTwo.id"
                                :label="itemTwo.specsValue"
                                :value="itemTwo.id">
                        </el-option>
                    </el-select>

                </div>
            </div>
            <div class="tab-con1" v-show="tabShow == 3">
                <h3><em></em>关联SKU信息:</h3>
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
                                    prop="productName"
                                    label="SKU名称">
                            </el-table-column>
                            <el-table-column
                                    v-if="index<2"
                                    v-for="(item, index) in optionGuideLists"
                                    :label="item.name">
                                <template slot-scope="scope">
                                    <el-select disabled size="mini"
                                               v-model="scope.row.skuPropertyDOList[index].propertyValueId">
                                        <el-option
                                                v-for="itemTwo in item.propertyValueDOList"
                                                :key="itemTwo.id"
                                                :label="itemTwo.value"
                                                :value="itemTwo.id">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="markingPrice"
                                    label="划线价格">
                            </el-table-column>
                            <el-table-column
                                    prop="price"
                                    label="销售价格">
                            </el-table-column>
                            <el-table-column
                                    label="主图">
                                <template slot-scope="scope">
                                    <el-image style="width: 40px;height: 40px;" :src="scope.row.url" @click="showImage(scope.row.url)">
                                        <div slot="error" style="font-size: 40px;" class="image-slot">
                                            <i class="el-icon-picture-outline"></i>
                                        </div>
                                    </el-image>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="是否启用">
                                <template slot-scope="scope">{{ scope.row.isOpen == 1 ? '已启用' : '未启用' }}</template>
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
            <div class="tab-con1" v-show="tabShow == 4">
                <h3><em></em>商品基本信息:</h3>
                <div class="add-box clearFox">
                    <span class="add-tip">商品主图：</span>
                    <div class="add-image">
                        <div class="el-image-d1" v-for="(item,index) in fileAllImages" @click="showImageAll(index)">
                            <el-image :src="item.imageUrl">
                            </el-image>
                        </div>
                    </div>
                </div>
                <h3><em></em>详细描述:</h3>
                <div class="add-image">
                    <quill-editor v-model="searchList.richText"
                                  disabled
                                  class="editer"
                                  ref="myQuillEditor"
                                  :options="editorOption"
                                  @focus="onEditorFocus($event)"
                                  @blur="onEditorBlur($event)"
                                  @change="onEditorChange($event)"
                                  @ready="onEditorReady($event)">
                    </quill-editor>
                </div>
            </div>
            <div class="tab-con1" v-show="tabShow == 5">
                <h3><em></em>其他属性信息:</h3>
                <div class="add-box" v-for="(item,index) in optionOtherLists">
                    <span class="add-tip">{{item.name}}：</span>

                    <el-select class="add-ipt" disabled size="mini" v-model="searchList.otherProperties[item.id]">
                        <el-option
                                v-for="itemTwo in item.valueList"
                                :key="itemTwo.id"
                                :label="itemTwo.value"
                                :value="itemTwo.id">
                        </el-option>
                    </el-select>

                </div>
            </div>
            <div class="tab-con1" v-show="tabShow == 6">
                <h3><em></em>售后服务:</h3>
                <div class="add-box clearFox">
                    <span class="add-tip">*   服务类别：</span>
                    <div class="add-image">
                        <el-checkbox-group disabled v-model="searchList.checkedCities"
                                           @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="(item,index) in cities" :value="item.id" :label="item.id"
                                         :key="item.id">{{item.name}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
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
        <div class="images" v-show="showImageBoolean"  v-viewer="{movable: true}">
            <img v-for="src in images" :src="src" :key="src">
        </div>
    </div>
</template>

<script>
    import store from 'si-store'
    import {MyGet, MyPost, MyPostJson} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../footerbar/footerbar.vue'
    import {quillEditor} from 'vue-quill-editor'
    import 'quill/dist/quill.snow.css'
    import * as Quill from 'quill'

    export default {
        name: 'systemSet',
        components: {
            Loading,
            quillEditor,
            footerbar
        },
        data() {
            let toolbarOptions = [
                ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
                ['blockquote', 'code-block'],     //引用，代码块

                [{'header': 1}, {'header': 2}],        // 标题，键值对的形式；1、2表示字体大小
                [{'list': 'ordered'}, {'list': 'bullet'}],     //列表
                [{'script': 'sub'}, {'script': 'super'}],   // 上下标
                [{'indent': '-1'}, {'indent': '+1'}],     // 缩进
                [{'direction': 'rtl'}],             // 文本方向

                [{'size': ['small', false, 'large', 'huge']}], // 字体大小
                [{'header': [1, 2, 3, 4, 5, 6, false]}],     //几级标题

                [{'color': []}, {'background': []}],     // 字体颜色，字体背景颜色
                [{'font': []}],     //字体
                [{'align': []}],    //对齐方式

                ['clean'],    //清除字体样式
                ['image']    //上传图片、上传视频
            ]
            return {
                showImageBoolean:false,
                images:[],
                elUploadBoolean: true,
                searchList: {
                    optionString: '',
                    optionId: '',
                    brandId: "",//品牌Id
                    brandName: "",//品牌名称
                    categoryId: "",//分类ID
                    categoryName: "",//分类名称
                    keyword: "",//商品关键词
                    phoneRichText: "",
                    otherProperties: [],
                    otherPropertiesName: [],
                    productionAddress: "",
                    properties: [],
                    propertiesName: [],
                    rawMaterial: "",
                    richText: "",
                    sharingDes: "",
                    spuDetails: "",
                    spuIntroduce: '',
                    spuName: "",
                    title: "",
                    valueCount: "",
                    memo: '',//平台描述
                    checkedCities: [],
                    afterSalesService: "",
                    alcohol:"",
                    particularYear:"",
                    fragranceType:"",
                    netContent:"",
                    placeOfOrigin:"",
                    productionDate:"",
                    qualityGuaranteePeriod:"",
                    packingMethod:"",
                },
                brandList: [],
                optionLists: [],
                optionGuideLists: [],
                optionOtherLists: [],
                edit: "",
                skuId: "",
                categoryId: "",
                spuId: "",
                typeStyle: "",
                editor: "",

                cities: [
                    {
                        id: "1",
                        name: '提供发票',
                    },
                    {
                        id: "2",
                        name: '保修服务',
                    },
                    {
                        id: "3",
                        name: '退换货承诺',
                    },
                    {
                        id: "4",
                        name: '退换货服务',
                    }],
                imageUrl: require('./icon-l.png'),
                multipleTable: '',
                loadingShow: false,
                loadingText: '正在加载中...',
                tableData: [],
                tabShow: 1,
                fileList: [],
                newform: {
                    skuCode: "",
                    auditStatus: '1',
                    barCode: '',
                    isOpen: '1',
                    files: [],
                    fileAlls: [],
                    markingPrice: '',//参数类型
                    price: '',//是否启用值
                    skuName: "",
                    stock: "",
                    url: "",
                    valueIds: [],
                    fileRich: [],
                    id: "",
                    placeOfOrigin:"",
                    fragranceType:"",
                    capacity:"",
                    boxGauge:"",
                    unit:"",
                    packagingLevel:"",
                },
                editorOption: { //  富文本编辑器配置
                    modules: {
                        toolbar: toolbarOptions
                    },
                    theme: 'snow',
                    placeholder: '请输入正文'
                },
                headers: {},
                fileAllImages: [],
                page_show: true,//分页显示
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
            }
        },
        mounted() {
            this.editor = this.$refs.myQuillEditor.quill;
        },
        created() {
            this.$store.state.navTit = '商品';
            this.$store.state.navChildTit = 'SKU管理';
            this.headers = {
                token: store.get('tokenVal')
            };
            this.typeStyle = this.$route.query.typeStyle;
            this.edit = this.$route.query.edit;
            this.categoryId = this.$route.query.categoryId;
            this.searchList.optionId = this.$route.query.categoryId;
            this.spuId = this.$route.query.id;
            this.getProperty();
            this.queryBrandListFn();
            this.getPropertyGuide();
            this.getPropertyOther();
            this.getSpuDetail();
            if (this.edit == "2") {
                this.newform.id = this.$route.query.skuId;
                this.getSkuDetail();
            }

        },
        methods: {
            showImage (src) {
                if(this.checkNull(src)){
                    return;
                }
                this.images=[];
                this.images.push(src)
                const viewer = this.$el.querySelector('.images').$viewer
                viewer.show()
            },
            showImageAll (index) {
                this.images=[];
                this.images=this.fileAllImages.map(function (item,index) {
                   return item.imageUrl
                });
                let imageUrlStr="";
                for(let i=0;i<this.images.length;i++){

                    if (index==i){
                        imageUrlStr=this.images[i];
                        this.images.splice(i,1)
                        // this.images.unshift(this.fileAllImages[i].imageUrl)
                    }
                }
                this.images.unshift(imageUrlStr);
                const viewer = this.$el.querySelector('.images').$viewer;
                viewer.show();
            },
            removeImage() {
                this.newform.url = "";
                this.elUploadBoolean = true;
            },
            getSkuDetail() {
                MyPost('/liquor-product/sku/queryById', {
                    id: this.newform.id,
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        var valueIds = [];

                        let skuProperties="";
                        if (!this.checkNull(data.properties)){
                            skuProperties=JSON.parse(data.properties);
                        }
                        this.consoleCommon(skuProperties)
                        if (!this.checkNull(skuProperties)) {
                            for(let i=0;i<skuProperties.length;i++){
                                for (let j=0;j<this.optionGuideLists.length;j++){
                                       for (let k=0;k<this.optionGuideLists[j].propertyValueDOList.length;k++){
                                           if (skuProperties[i].valueId==this.optionGuideLists[j].propertyValueDOList[k].id){
                                               valueIds[j]= this.optionGuideLists[j].propertyValueDOList[k].id
                                           }
                                       }
                                }
                            }
                        }
                        this.consoleCommon(valueIds)
                        this.newform = {
                            skuCode: data.sku,
                            auditStatus: '1',
                            barCode: data.barCode,
                            isOpen: data.isOpen,
                            markingPrice: data.markingPrice,//参数类型
                            price: data.price,//是否启用值
                            skuName: data.productName,
                            stock: data.stock,
                            url: data.url,
                            valueIds: valueIds,
                            id: this.newform.id,
                            files: [],
                            placeOfOrigin:data.placeOfOrigin,
                            fragranceType:data.fragranceType,
                            capacity:data.capacity,
                            boxGauge:data.boxGauge,
                            unit:data.unit,
                            packagingLevel:data.packagingLevel,
                        }

                        if (!this.checkNull(data.url)) {
                            this.elUploadBoolean = false
                        } else {
                            this.elUploadBoolean = true
                        }
                    } else {
                        this.$message.error(message);
                    }
                })

            },
            getSpuDetail() {
                MyPost('/liquor-product/spu/queryById', {
                    id: this.spuId
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        //平台信息
                        this.searchList = {
                            optionId: this.$route.query.categoryId,
                            brandId: data.spu.brandId,//品牌Id
                            brandName: data.spu.brandName,//品牌名称
                            categoryId: this.$route.query.categoryId,//分类ID
                            categoryName: data.spu.categoryName,//分类名称
                            keyword: data.spu.keyword,//商品关键词
                            phoneRichText: "",
                            otherProperties: [],
                            otherPropertiesName: [],
                            productionAddress: "",
                            properties: [],
                            propertiesName: [],
                            rawMaterial: "",
                            richText: data.spu.richText,
                            sharingDes: data.spu.sharingDes,
                            spuDetails: "",
                            spuIntroduce: '',
                            spuName: data.spu.spuName,
                            title: data.spu.title,
                            valueCount: "",
                            memo: '',//平台描述
                            afterSalesService: data.spu.afterSalesService,
                            alcohol:data.spu.alcohol,
                            particularYear:data.spu.particularYear,
                            fragranceType:data.spu.fragranceType,
                            netContent:data.spu.netContent,
                            placeOfOrigin:data.spu.placeOfOrigin,
                            productionDate:data.spu.productionDate,
                            qualityGuaranteePeriod:data.spu.qualityGuaranteePeriod,
                            packingMethod:data.spu.packingMethod,
                        }
                        if (!this.checkNull(data.spu.afterSalesService)) {
                            var checkedCities = data.spu.afterSalesService.split(",");
                            this.searchList.checkedCities = checkedCities;
                        }
                        if (!this.checkNull(data.propertyValues)) {
                            for (var i = 0; i < data.propertyValues.length; i++) {
                                this.searchList.properties[data.propertyValues[i].specsNameId] = Number(data.propertyValues[i].id)
                            }
                        }
                        if (!this.checkNull(data.productOtherProperties)) {
                            for (var i = 0; i < data.productOtherProperties.length; i++) {
                                this.searchList.otherProperties[data.productOtherProperties[i].propertyId] = Number(data.productOtherProperties[i].id)
                            }
                        }
                        // if (!this.checkNull(data.spu.otherProperties)){
                        //     this.searchList.otherProperties=data.spu.otherProperties.split(",");
                        //     for(var i=0;i<this.searchList.otherProperties.length;i++){
                        //         this.searchList.otherProperties[i]=Number(this.searchList.otherProperties[i]);
                        //     }
                        // }
                        // if (!this.checkNull(data.spu.properties)){
                        //     this.searchList.properties=data.spu.properties.split(",");
                        //     for(var i=0;i<this.searchList.properties.length;i++){
                        //         this.searchList.properties[i]=Number(this.searchList.properties[i]);
                        //     }
                        // }
                        this.fileAllImages = data.spuImage;
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            getSkuList() {
                MyPost('/liquor-product/spu/getSkuList', {
                    spuId: this.spuId,
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.tableData = data;
                        if (this.tableData.length > 0) {
                            for (let i = 0; i < this.tableData.length; i++) {
                                if (this.tableData[i].skuPropertyDOList == null) {
                                    this.tableData[i].skuPropertyDOList = [];
                                    if (this.optionGuideLists.length > 0) {
                                        for (let j = 0; j < this.optionGuideLists.length; j++) {
                                            this.tableData[i].skuPropertyDOList.push({
                                                id: "",
                                                skuId: "",
                                                propertyValueId: ""
                                            })
                                        }
                                    }
                                } else if (this.tableData[i].skuPropertyDOList.length < this.optionGuideLists.length) {
                                    let lengIndex = this.optionGuideLists.length - this.tableData[i].skuPropertyDOList.length;
                                    for (let k = 0; k < lengIndex; k++) {
                                        this.tableData[i].skuPropertyDOList.push({
                                            id: "",
                                            skuId: "",
                                            propertyValueId: ""
                                        })
                                    }
                                }
                            }
                        }
                    } else {
                        this.$message.error(message);
                    }
                })

            },

            getPropertyOther() {
                MyPost('/liquor-product/sku/getOtherProperty', {
                    categoryId: this.searchList.optionId
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.optionOtherLists = data;
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            getProperty() {

                MyPost('/liquor-product/sku/getSpec', {
                    categoryId: this.searchList.optionId
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.optionLists = data[0].specsNameBOList;
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            getPropertyGuide() {
                this.loadingShow = true;
                MyPost('/liquor-product/sku/getProperty', {
                    categoryId: this.searchList.optionId
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.optionGuideLists = data;
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            queryBrandListFn() {
                MyGet('/liquor-product/brand/queryList', {}).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.brandList = data.data;
                    } else {
                        this.$message.error(message);
                    }
                })
            },

            saveAll(typeStyle) {
                if (!this.newform.skuName) {
                    this.$message.error('请输入SKU名称');
                    return
                }
                if (!this.newform.price) {
                    this.$message.error('请输入销售价格');
                    return
                }
                this.loadingShow = true;
                let properties = "";
                let propertiesName = "";
                if (this.newform.valueIds.length > 0) {
                    this.consoleCommon(this.newform.valueIds);
                    this.consoleCommon(this.optionGuideLists);
                    let propertiesList = [];
                    let propertiesNameList = [];
                    for (let i = 0; i < this.newform.valueIds.length; i++) {
                        for (let j = 0; j < this.optionGuideLists[i].propertyValueDOList.length; j++) {
                            if (this.newform.valueIds[i] == this.optionGuideLists[i].propertyValueDOList[j].id) {
                                propertiesList.push({
                                    valueId: this.optionGuideLists[i].propertyValueDOList[j].id,
                                    nameId: this.optionGuideLists[i].propertyValueDOList[j].propertyId,
                                })
                                propertiesNameList.push({
                                    name: this.optionGuideLists[i].name,
                                    value: this.optionGuideLists[i].propertyValueDOList[j].value
                                })
                            }
                        }
                    }
                    properties=JSON.stringify(propertiesList);
                    propertiesName=JSON.stringify(propertiesNameList);
                }
                let skuList = [];
                skuList.push({
                    id: this.newform.id,
                    auditStatus: this.newform.auditStatus,
                    barCode: this.newform.barCode,
                    isOpen: this.newform.isOpen,
                    skuName: this.newform.skuName,
                    markingPrice: this.newform.markingPrice,
                    price: this.newform.price,
                    url: this.newform.url,
                    properties:properties,
                    propertiesName:propertiesName,
                    capacity:this.newform.capacity,
                    unit:this.newform.unit,
                    packagingLevel:this.newform.packagingLevel,
                    valueIds: this.newform.valueIds,
                })
                let all = {
                    skuList: skuList,
                    spuId: this.spuId
                }
                if (this.edit == "1" && this.checkNull(this.newform.id)) {
                    MyPostJson('/liquor-product/sku/add', all).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.newform.id = data;
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            if (typeStyle == "1") {

                            } else {
                                this.goPage();
                            }

                        } else {
                            this.$message.error(message);
                        }
                    })
                } else {
                    MyPostJson('/liquor-product/sku/upd', all).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.goPage();
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
                }

            },
            uploadBefore(file) {
                // 上传之前
                let types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png'];

                const isImage = types.includes(file.type);
                if (!isImage) {

                    this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!');

                    return false;

                }
                const isLt2M = file.size / 1024 / 1024 < 3;
                if (!isLt2M) {
                    this.$message.error('上传文件大小不能超过 3M!');
                }
                return isLt2M;
            },
            uploadSuccess(response, file, fileList) {
                this.$message({
                    message: '上传成功',
                    type: 'success'
                });
                this.newform.url = response.data;
                this.elUploadBoolean = false;
            },
            handleRemove(file, fileList) {
                this.newform.url = "";
            },

            // 准备富文本编辑器
            onEditorReady(editor) {
            },
            // 富文本编辑器 失去焦点事件
            onEditorBlur(editor) {
            },
            // 富文本编辑器 获得焦点事件
            onEditorFocus(editor) {
            },
            // 富文本编辑器 内容改变事件
            onEditorChange(editor) {
            },

            handleSelectionChange(val) {
                this.multipleTable = val;
            },
            handleCheckedCitiesChange(value) {
                console.log("value==" + value)
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
                this.tabShow = num;
                if (num == "3") {
                    this.getSkuList();
                }
            },
            goPage() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/css/all.scss"
    .systemSet
        .ql-editor
            min-height 400px
        .el-checkbox
            display block
            margin 10px 0px
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
            .color-under-line
                text-decoration underline
            .pagenum_mod
                margin-bottom 148px
                float right
                overflow hidden
                margin-top 30px
            .btn-group
                text-align center
                padding 60px 0 30px 0
                overflow hidden
        .clearFox
            clear both
        h3
            clear both
            margin-top 10px
            height 40px
            width 100%
            font-weight bold
            font-size 14px
            color #333
            em
                display inline-block
                background url("./icon-l.png") no-repeat 0 0
                background-size contain
                width 22px
                height 22px
                vertical-align top
                margin-right 10px
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

        .infor-mod
            background #fff
            padding 85px 16px 16px 16px
            .infor-tab-all
                height 50px
                width 100%
                position fixed
                top 141px
                left 286px
                margin-bottom 20px
                background #FFF
                z-index 2
                .infor-tab
                    height 40px
                    width 80%
                    span
                        float left
                        width 15%
                        height 40px
                        font-size 12px
                        color #333
                        text-align center
                        line-height 40px
                        cursor pointer
                        border 1px solid #E3E3E3
                        margin-right -1px
                    .tab-on
                        color #fff
                        border 1px solid #C13A3C
                        background #C13A3C
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

            .tab-con3

                font-size 12px
                .tab3
                    border-collapse collapse

                .tab3 tr td
                    border 1px solid #E5E5E5
                    padding 0 40px
                    line-height 50px /*设置其文字内容垂直居中*/
                    height 50px

</style>
