<template>
    <div class="addCommodityDetail">
        <div class="nav-top">
            <div class="nav-box" @click="goPage">
                <img src="../../common/images/backlast.png"/>
                <p>返回</p>
            </div>
            <div class="nav-box" @click="saveAll('1')">
                <img src="../../common/images/save.png"/>
                <p>保存</p>
            </div>
            <div class="nav-box" @click="saveAll('2')">
                <img src="../../common/images/submit.png"/>
                <p>提交</p>
            </div>
        </div>
        <div class="infor-mod">
            <div class="infor-tab-all">
                <div class="infor-tab">
                    <span :class="tabShow == 1 ? 'tab-on' : ''" @click="tabClk(1)">商品基本信息</span>
                    <span :class="tabShow == 3 ? 'tab-on' : ''" @click="tabClk(3)">图文描述</span>
                    <span :class="tabShow == 2 ? 'tab-on' : ''" @click="tabClk(2)">SKU信息</span>
                    <span :class="tabShow == 4 ? 'tab-on' : ''" @click="tabClk(4)">其他属性信息</span>
                    <span :class="tabShow == 5 ? 'tab-on' : ''" @click="tabClk(5)">售后服务</span>
                </div>
            </div>

            <div class="tab-con1" v-show="tabShow == 1">
                <h3><em></em>商品基本信息</h3>
                <div class="add-box clearFox">
                    <span class="add-tip">   您当前选择的商品分类是：</span>
                    <span class="add-tip add-tip-left">{{searchList.optionString}}</span>
                </div>
                <div class="add-box clearFox">
                    <span class="add-tip"><i style="color: red">*</i> &nbsp;&nbsp;商品名称：</span>
                    <el-input size="small" maxlength="50" class="add-ipt" v-model="searchList.spuName"></el-input>
                </div>
                <div class="add-box clearFox">
                    <span class="add-tip">  副标题：</span>
                    <el-input size="small" maxlength="100" class="add-ipt" v-model="searchList.title"></el-input>
                </div>
                <div class="add-box clearFox">
                    <span class="add-tip">  品牌：</span>

                    <el-select class="add-ipt" clearable size="mini" :placeholder="品牌" v-model="searchList.brandId">
                        <el-option
                                v-for="itemTwo in brandList"
                                :key="itemTwo.id"
                                :label="itemTwo.name"
                                :disabled="itemTwo.status=='2'"
                                :value="itemTwo.id">
                        </el-option>
                    </el-select>

                </div>
                <div class="add-box clearFox">
                    <span class="add-tip">  分享描述：</span>
                    <el-input size="small" maxlength="100" class="add-ipt" v-model="searchList.sharingDes"></el-input>
                </div>
                <div class="add-box clearFox">
                    <span class="add-tip">  商品关键字：</span>
                    <el-input size="small" maxlength="50" class="add-ipt" v-model="searchList.keyword"></el-input>
                </div>
                <h3><em></em>商品基础属性:</h3>
                <div class="add-box">
                    <span class="add-tip">  酒精度：</span>
                    <el-input size="small" maxlength="30" class="add-ipt" v-model="searchList.alcohol"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">  年份：</span>
                    <el-date-picker
                            class="add-ipt"
                            v-model="searchList.particularYear"
                            type="year"
                            placeholder="选择年">
                    </el-date-picker>
                </div>
                <div class="add-box">
                    <span class="add-tip">  香型：</span>
                    <el-input size="small" maxlength="30" class="add-ipt" v-model="searchList.fragranceType"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">  净含量：</span>
                    <el-input size="small" maxlength="30" class="add-ipt" v-model="searchList.netContent"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">  产地：</span>
                    <el-input size="small" maxlength="30" class="add-ipt" v-model="searchList.placeOfOrigin"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">  生产日期：</span>
                    <el-date-picker
                            class="add-ipt"
                            v-model="searchList.productionDate"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </div>
                <div class="add-box">
                    <span class="add-tip">  保质期(天)：</span>
                    <el-input size="small" type="text" maxlength="5"
                              oninput="value=value.replace(/[^\d]/g,'')" class="add-ipt" v-model="searchList.qualityGuaranteePeriod"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip">  包装方式：</span>
                    <el-input size="small" maxlength="30" class="add-ipt" v-model="searchList.packingMethod"></el-input>
                </div>
                <div class="add-box" v-for="(item,index) in optionLists">
                    <span class="add-tip">{{item.specsName}}：</span>

                    <el-select size="mini" clearable class="add-ipt" placeholder="请选择" clearable
                               v-model="searchList.properties[item.id]">
                        <el-option
                                v-for="itemTwo in item.specsValueList"
                                :key="itemTwo.id"
                                :label="itemTwo.specsValue"
                                :value="itemTwo.id">
                        </el-option>
                    </el-select>

                </div>
            </div>
            <div class="tab-con1" v-show="tabShow == 2">
                <h3 style="font-size: 24px;color: #7e8c8d">
                    <i style="cursor: pointer;" @click="addBrand" class="el-icon-circle-plus"></i>
                    <i style="cursor: pointer;" @click="deleteBrand" class="el-icon-remove"></i>
                </h3>
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
                                    label="SKU名称">
                                <template slot-scope="scope">
                                    <el-input @input="saveTable(scope.row)" size="small"
                                              v-model="scope.row.productName"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    v-if="index<2"
                                    v-for="(item, index) in optionGuideLists"
                                    :label="item.name">
                                <template slot-scope="scope">
                                    <el-select size="mini" clearable :placeholder="item.name"
                                               @change="saveTable(scope.row)"
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
                                    label="划线价格">
                                <template slot-scope="scope">
                                    <el-input @input="saveTable(scope.row)" type="tel"  @mousewheel.native.prevent
                                              oninput="if(value.length>8)value=value.slice(0,8)" size="small"
                                              v-model="scope.row.markingPrice"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="销售价格">
                                <template slot-scope="scope">
                                    <el-input @input="saveTable(scope.row)" type="tel"  @mousewheel.native.prevent
                                              oninput="if(value.length>8)value=value.slice(0,8)" size="small"
                                              v-model="scope.row.price"></el-input>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    label="主图">
                                <template slot-scope="scope">
                                    <el-image style="width: 40px;height: 40px;" :src="scope.row.url"
                                              @click="showImage(scope.row.url)">
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
                            <el-table-column
                                    width="150"
                                    label="操作">
                                <template slot-scope="scope">
                                    <!--scope.row-->
                                    <span class="scope_btn color-blue" @click="editClk(scope.row)">编辑</span>
                                    <span class="scope_btn" @click="delClk(scope.row)">删除</span>
                                    <span class="scope_btn color-blue color-under-line" @click="goInfor(scope.row)">{{ scope.row.isOpen == 1 ? '禁用' : '启用' }}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="tab-con1" v-show="tabShow == 3">
                <h3><em></em>商品基本信息</h3>
                <div class="add-box clearFox">
                    <span class="add-tip">商品主图：</span>
                    <div class="add-image">
                        <div class="el-image-d1" v-for="(item,index) in fileAllImages">
                            <el-image :src="item.imageUrl" @click="showImageAll(index)">
                            </el-image>
                            <div class="el-image-d2">
                                <span :class="item.type==1? ' span-color':''" @click="surePicture(item,index)">{{item.type==1?"商品主图":"设为主图"}}</span>
                                <span @click="deletePicture(index)">删除图片</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="add-box clearFox">
                    <span class="add-tip">    选择上传图片：</span>
                    <el-upload
                            class="upload-demo upload-demo-1"
                            ref="uploadmain"
                            :headers="headers"
                            :data="newform"
                            :file-list="newform.fileAlls"
                            action="/liquor-product/imageLibraryApi/oneUpload"
                            accept="image/jpeg,image/png"
                            :before-upload="uploadBeforeHtml"
                            :on-success="uploadSuccessAgain"
                            multiple>
                        <el-button size="small" type="primary">选择上传图片</el-button>
                        <div class="el-upload__tip" slot="tip">按住ctrl可同时批量选择多张图片上传，最多可以上传5张图片，建议尺寸800*800px</div>
                    </el-upload>
                </div>
                <h3><em></em>详细描述</h3>
                <el-upload
                        class="upload-demo upload-demo-2"
                        ref="uploadrich"
                        :data="newform"
                        :headers="headers"
                        :file-list="newform.fileRich"
                        action="/liquor-product/imageLibraryApi/oneUpload"
                        accept="image/jpeg,image/png"
                        :before-upload="uploadBefore"
                        :on-success="uploadRichSuccess"
                        multiple>
                    <el-button size="small" type="primary">选择上传图片</el-button>
                    <div class="el-upload__tip" slot="tip">为了保证图片的正常使用，仅支持3M以内jpg、jpeg、gif、png格式图片上传</div>
                </el-upload>
                <div class="add-image">
                    <quill-editor v-model="searchList.richText"
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
            <div class="tab-con1" v-show="tabShow == 4">
                <h3><em></em>其他属性信息</h3>
                <div class="add-box" v-for="(item,index) in optionOtherLists">
                    <span class="add-tip">{{item.name}}：</span>

                    <el-select class="add-ipt" clearable size="mini" placeholder="请选择"
                               v-model="searchList.otherProperties[item.id]">
                        <el-option
                                v-for="itemTwo in item.valueList"
                                :key="itemTwo.id"
                                :label="itemTwo.value"
                                :value="itemTwo.id">
                        </el-option>
                    </el-select>

                </div>
            </div>
            <div class="tab-con1" v-show="tabShow == 5">
                <h3><em></em>售后服务</h3>
                <div class="add-box clearFox">
                    <span class="add-tip">   服务类别：</span>
                    <div class="add-image">
                        <el-checkbox-group v-model="searchList.checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="(item,index) in cities" :value="item.id" :label="item.id"
                                         :key="item.id">{{item.name}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog :title="titData"
                   class="minW"
                   :visible.sync="serachBoxShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="add-contain">
                <el-form :model="newform" :rules="rules" ref="ruleForm" :label-width="formLabelWidth">
                    <el-form-item size="small" label="  SKU编号：">
                        <el-input :disabled="true" v-model="newform.skuCode" maxlength="50"
                                  autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="SKU名称：" prop="name">
                        <el-input v-model="newform.skuName" maxlength="50" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="是否启用：" content="是否启用" :label-width="formLabelWidth">
                        <el-select size="mini" :placeholder="是否启用" v-model="newform.isOpen">
                            <el-option
                                    label="启用"
                                    value="1">
                            </el-option>
                            <el-option
                                    label="禁用"
                                    value="2">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item size="small" label="  划线价格：" :label-width="formLabelWidth">
                        <el-input v-model="newform.markingPrice" type="tel"  @mousewheel.native.prevent
                                  oninput="if(value.length>8)value=value.slice(0,8)"
                                  autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="  销售价格：" prop="price" :label-width="formLabelWidth">
                        <el-input v-model="newform.price" type="tel"  @mousewheel.native.prevent
                                  oninput="if(value.length>8)value=value.slice(0,8)" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="  数量单位：" :label-width="formLabelWidth">
                        <el-input v-model="newform.unit" maxlength="30" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="  条形码：" :label-width="formLabelWidth">
                        <el-input v-model="newform.barCode" maxlength="30" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="  容量：" :label-width="formLabelWidth">
                        <el-input v-model="newform.capacity" maxlength="30" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="  包装层级：" :label-width="formLabelWidth">
                        <el-input v-model="newform.packagingLevel" maxlength="30" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item v-for="(item,index) in optionGuideLists" size="small" :label="item.name+'：'"
                                  :content="item.name" :label-width="formLabelWidth">
                        <el-select size="mini" :placeholder="item.name" v-model="newform.valueIds[index]">
                            <el-option
                                    v-for="itemTwo in item.propertyValueDOList"
                                    :key="itemTwo.id"
                                    :label="itemTwo.value"
                                    :value="itemTwo.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item size="small" class="hundred" label=" SKU主图：" :label-width="formLabelWidth">
                        <div class="upload-box">
                            <el-upload
                                    v-if="elUploadBoolean"
                                    class="upload-demo"
                                    ref="uploadtitData"
                                    :headers="headers"
                                    :data="newform"
                                    :file-list="newform.files"
                                    action="/liquor-product/imageLibraryApi/oneUpload"
                                    accept="image/jpeg,image/png"
                                    :before-upload="uploadBefore"
                                    :on-success="uploadSuccess"
                                    multiple>
                                <el-button size="small" type="primary">选择上传图片</el-button>
                                <div class="el-upload__tip" slot="tip">为了保证图片的正常使用，仅支持3M以内jpg、gif、png格式图片上传</div>
                            </el-upload>
                            <div class="close_all" v-if="!elUploadBoolean">
                                <el-image style="width: 40px;height: 40px;border-radius: 40px" :src="newform.url"
                                          @click="showImage(newform.url)">
                                    <div slot="error" style="font-size: 40px;" class="image-slot">
                                        <i class="el-icon-picture-outline"></i>
                                    </div>
                                </el-image>
                                <i @click="removeImage"
                                   style="font-size: 16px;position: absolute;right: -4px;top: -4px;"
                                   class="el-icon-circle-close"></i>
                            </div>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="serachBoxShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="addBrandClk">保存</el-button>
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
                <el-button type="primary" size="small" @click="configClk">确 定</el-button>
            </span>
        </el-dialog>
        <div class="images" v-show="showImageBoolean" v-viewer="{movable: true}">
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
                ['bold', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
                ['blockquote', 'code-block'],     //引用，代码块

                [{'header': 1}, {'header': 2}],        // 标题，键值对的形式；1、2表示字体大小
                [{'list': 'ordered'}, {'list': 'bullet'}],     //列表
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
                showImageBoolean: false,
                images: [],
                rules: {
                    name: [
                        {required: true, message: '  ', trigger: 'blur'},
                    ],
                    type: [
                        {required: true, message: '  ', trigger: 'change'},
                    ],
                    price: [
                        {required: true, message: '  ', trigger: 'change'},
                    ],
                    stock: [
                        {required: true, message: '  ', trigger: 'change'},
                    ],
                    url: [
                        {required: true, message: '  ', trigger: 'change'},
                    ]

                },
                elUploadBoolean: true,
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,
                titData: '新增SKU',
                formLabelWidth: "120px",
                serachBoxShow: false,//新增修改参数弹窗显示
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
                    placeOfOrigin:"",
                    fragranceType:"",
                    capacity:"",
                    boxGauge:"",
                    fileRich: [],
                    packagingLevel:"",
                    id: "",
                    unit:"",
                },
                //平台信息
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
                fileAllImages: [],
                categoryId: "",
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
                editorOption: { //  富文本编辑器配置
                    modules: {
                        toolbar: {
                            container: toolbarOptions,
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        document.querySelector('.upload-demo-2 .el-button--small').click()
                                        // alert('自定义图片')
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                    },
                    theme: 'snow',
                    placeholder: '请输入正文'
                },
                edit: "",
                spuId: '',
                page_show: true,//分页显示
                currentPage: 0,//当前分页
                totalRecord: 0,//总共分页数据条数
                delId: "",
                delIds: [],
                delShow: false,
                headers: {},
                maxHeight: 0,
                tableItem: "",
                saveTableBoolean: false,
            }
        },
        mounted() {
            this.editor = this.$refs.myQuillEditor.quill;
        },
        created() {
            this.$store.state.navTit = '商品';
            this.$store.state.navChildTit = '商品管理';
            this.headers = {
                token: store.get('tokenVal')
            };
            this.searchList.optionString = this.$route.query.optionString;
            this.searchList.optionId = this.$route.query.optionId;
            this.edit = this.$route.query.edit;
            this.spuId = this.$route.query.spuId;
            this.beforeMount();
            this.getProperty();
            this.queryBrandListFn();
            this.getPropertyGuide();
            this.getPropertyOther();
            if (this.edit == "1") {
                // this.saveAndUpd();
            } else {
                this.getSpuDetail();
                // this.getSkuList();
            }

        },
        methods: {
            showImage(src) {
                if (this.checkNull(src)) {
                    return;
                }
                this.images = [];
                this.images.push(src)
                const viewer = this.$el.querySelector('.images').$viewer
                viewer.show()
            },
            showImageAll(index) {
                this.images = [];
                this.images = this.fileAllImages.map(function (item, index) {
                    return item.imageUrl
                });
                let imageUrlStr = "";
                for (let i = 0; i < this.images.length; i++) {

                    if (index == i) {
                        imageUrlStr = this.images[i];
                        this.images.splice(i, 1)
                        // this.images.unshift(this.fileAllImages[i].imageUrl)
                    }
                }
                this.images.unshift(imageUrlStr);
                const viewer = this.$el.querySelector('.images').$viewer;
                viewer.show();
            },
            beforeMount() {
                var h = document.documentElement.clientHeight || document.body.clientHeight;
                this.maxHeight = h - 300; //减去页面上固定高度height
            },

            handleCurrentChange(val) {
                this.currentPage = val;
                this.getSkuList();
            },
            removeImage() {
                this.newform.url = "";
                this.elUploadBoolean = true;
            },
            configClk() {
                this.loadingShow = true;
                if (!this.checkNull(this.delId)) {
                    this.delIds = [];
                    this.delIds.push(this.delId)
                } else {

                }
                MyPost('/liquor-product/sku/delBatch', {
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
                        this.getSkuList();
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
            delClk(item) {
                this.delId = item.id;
                this.delShow = true;
            },

            goInfor(item) {
                this.loadingShow = true;
                if (item.isOpen == "1") {
                    item.isOpen = "2";
                } else {
                    item.isOpen = "1";
                }
                let ids = [];
                ids.push(item.id)
                MyPost('/liquor-product/sku/isOpenBatch', {
                    isOpen: item.isOpen,
                    ids: ids,
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.$message({
                            message: message,
                            type: 'success'
                        });
                    } else {
                        if (item.isOpen == "1") {
                            item.isOpen = "2";
                        } else {
                            item.isOpen = "1";
                        }
                        this.$message.error(message);
                    }
                })
            },
            editClk(item) {

                this.titData = '编辑SKU';
                this.newform = {
                    skuCode: item.sku,
                    auditStatus: item.auditStatus,
                    barCode: item.barCode,
                    isOpen: item.isOpen,
                    skuName: item.productName,
                    markingPrice: item.markingPrice,
                    price: item.price,
                    url: item.url,
                    id: item.id,

                    capacity:item.capacity,
                    packagingLevel:item.packagingLevel,
                    unit:item.unit,
                    valueIds: [],
                }
                if (!this.checkNull(item.skuPropertyDOList)) {
                    this.newform.valueIds = item.skuPropertyDOList.map(function (item1, index1) {
                        return item1.propertyValueId
                    });
                }
                if (this.checkNull(item.url)) {
                    this.elUploadBoolean = true
                } else {
                    this.elUploadBoolean = false
                }
                this.serachBoxShow = true;
            },
            deletePicture(index) {
                if (this.fileAllImages[index].type == "1") {
                    if (index == 0) {
                        if (this.fileAllImages.length > 1) {
                            this.fileAllImages[index + 1].type = "1"
                        }
                    } else {
                        this.fileAllImages[0].type = "1"
                    }
                }
                this.fileAllImages.splice(index, 1);
            },
            surePicture(item, index) {
                if (item.type == 1) {
                    return;
                } else {
                    item.type = 1;
                    for (var i = 0; i < this.fileAllImages.length; i++) {
                        if (i == index) {
                            // this.fileAllImages[i].type = 1
                        } else {
                            this.fileAllImages[i].type = 2
                        }
                    }
                }
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
                            this.tableData.forEach(function (item, index) {
                                item.valueIds = item.skuPropertyDOList.map(function (item1, index1) {
                                    return item1.propertyValueId
                                })
                            })
                        }
                    } else {
                        this.$message.error(message);
                    }
                })

            },
            saveTable(item) {
                this.tableItem = item;
                this.saveTableBoolean = true;
                // console.log("item==="+JSON.stringify(item))
                // if (!this.checkNull(item.skuPropertyDOList)) {
                //     this.newform.valueIds = item.skuPropertyDOList.map(function (item1, index1) {
                //         return item1.propertyValueId
                //     });
                // }
                // let skuList = [];
                // skuList.push({
                //     auditStatus: item.auditStatus,
                //     barCode: item.barCode,
                //     isOpen: item.isOpen,
                //     skuName: item.productName,
                //     markingPrice: item.markingPrice,
                //     price: item.price,
                //     url: item.url,
                //     valueIds: this.newform.valueIds,
                //     stockNumber:item.stockNumber == "" ? 0 : item.stockNumber,
                // })
                // let all = {
                //     skuList: skuList,
                //     spuId: this.spuId
                // }
                // MyPostJson('/liquor-product/sku/upd', all).then((res) => {
                //     this.loadingShow = false;
                //     let {code, message, data} = res;
                //     if (code == '0') {
                //         this.serachBoxShow = false;
                //         this.getSkuList();
                //     } else {
                //         this.$confirm(message, '提示', {
                //             confirmButtonText: '确定',
                //             showCancelButton:false,
                //             type: 'error'
                //         }).then(() => {
                //             this.delShow = false;
                //         }).catch(() => {
                //             this.delShow = false;
                //         });
                //     }
                // })
            },
            addBrandClk() {
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
                if (this.titData == "新增SKU") {
                    let skuList = [];
                    skuList.push({
                        auditStatus: this.newform.auditStatus,
                        barCode: this.newform.barCode,
                        isOpen: this.newform.isOpen,
                        skuName: this.newform.skuName,
                        markingPrice: this.newform.markingPrice,
                        price: this.newform.price,
                        url: this.newform.url,
                        capacity:this.newform.capacity,
                        packagingLevel:this.newform.packagingLevel,
                        unit:this.newform.unit,
                        properties: properties,
                        propertiesName: propertiesName,
                        valueIds: this.newform.valueIds,

                    })
                    let all = {
                        skuList: skuList,
                        spuId: this.spuId
                    }
                    MyPostJson('/liquor-product/sku/add', all).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.serachBoxShow = false;
                            this.getSkuList();
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
                    let skuList = [];
                    skuList.push({
                        auditStatus: this.newform.auditStatus,
                        barCode: this.newform.barCode,
                        isOpen: this.newform.isOpen,
                        skuName: this.newform.skuName,
                        id: this.newform.id,
                        markingPrice: this.newform.markingPrice == null ? "" : this.newform.markingPrice,
                        price: this.newform.price,
                        url: this.newform.url,
                        unit:this.newform.unit,
                        capacity:this.newform.capacity,
                        packagingLevel:this.newform.packagingLevel,
                        properties: properties,
                        propertiesName: propertiesName,
                        valueIds: this.newform.valueIds,

                    })
                    let all = {
                        skuList: skuList,
                        spuId: this.spuId
                    }
                    MyPostJson('/liquor-product/sku/upd', all).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.saveTableBoolean = false;
                            this.serachBoxShow = false;
                            this.getSkuList();
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
            getPropertyGuide() {
                this.loadingShow = true;
                MyPost('/liquor-product/sku/getProperty', {
                    categoryId: this.searchList.optionId
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.optionGuideLists = data;
                        // if (this.optionGuideLists.length > 0) {
                        //     this.optionGuideLists.forEach(function (item, index) {
                        //         item.name = item.name + "："
                        //     })
                        // }
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            saveAndUpd() {
                let searchList = {
                    optionString: '',
                    auditStatus: "1",
                    optionId: '',
                    brandId: "",//品牌Id
                    brandName: "",//品牌名称
                    categoryId: this.searchList.optionId,//分类ID
                    categoryName: "",//分类名称
                    keyword: "",//商品关键词
                    phoneRichText: "",
                    otherProperties: [],
                    otherPropertiesName: [],
                    productionAddress: "",
                    properties: "",
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
                };
                this.loadingShow = true;
                MyPost('/liquor-product/spu/saveAndUpd', searchList).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.spuId = data;
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
            addBrand() {
                this.titData = '新增SKU';
                this.newform = {
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
                    id: "",
                    fileRich: [],
                    unit:"",
                    placeOfOrigin:"",
                    fragranceType:"",
                    capacity:"",
                    boxGauge:"",
                    packagingLevel:"",
                },
                this.elUploadBoolean = true;
                this.serachBoxShow = true;
            },
            deleteBrand() {
                if (this.checkNull(this.multipleTable)) {
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
                this.delId = "";
                this.delIds = this.multipleTable.map(function (item, index) {
                    return item.id
                })
                this.delShow = true;
            },

            addSpuImageAndRichText(spuId, strStyle) {
                this.loadingShow = true;
                let searchList = {
                    "phoneRichText": "",
                    "richText": this.searchList.richText,
                    "spuId": spuId,
                    "urlList": this.fileAllImages
                }
                MyPostJson('/liquor-product/spu/spuImageAndRichText', searchList).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        if (this.edit == "2") {
                            if (strStyle == "2") {
                                this.goPage();
                            }
                        } else {
                            if (strStyle == "2") {
                                this.goPage();
                            }
                        }
                        this.getSpuDetail();
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            saveAll(strStyle) {
                if (!this.searchList.spuName) {
                    this.$message.error('请输入商品名称');
                    return
                }
                if (this.saveTableBoolean) {
                    this.titData = '编辑SKU';
                    let properties = "";
                    let propertiesName = "";

                    for (let i = 0; i < this.tableData.length; i++) {
                        this.tableData[i].skuName = this.tableData[i].productName;
                        this.tableData[i].valueIds = [];
                        let arrs = [];
                        let properties = "";
                        let propertiesName = "";
                        let propertiesList = [];
                        let propertiesNameList = [];
                        if (!this.checkNull(this.tableData[i].skuPropertyDOList)) {
                            for (let j = 0; j < this.tableData[i].skuPropertyDOList.length; j++) {
                                arrs.push(this.tableData[i].skuPropertyDOList[j].propertyValueId)

                                for (let k = 0; k < this.optionGuideLists[j].propertyValueDOList.length; k++) {
                                    if (this.tableData[i].skuPropertyDOList[j].propertyValueId == this.optionGuideLists[j].propertyValueDOList[k].id) {
                                        propertiesList.push({
                                            valueId: this.optionGuideLists[j].propertyValueDOList[k].id,
                                            nameId: this.optionGuideLists[j].propertyValueDOList[k].propertyId,
                                        })
                                        propertiesNameList.push({
                                            name: this.optionGuideLists[j].name,
                                            value: this.optionGuideLists[j].propertyValueDOList[k].value
                                        })
                                    }
                                }
                            }
                            properties=JSON.stringify(propertiesList);
                            propertiesName=JSON.stringify(propertiesNameList);
                            this.tableData[i].valueIds = arrs;
                            this.tableData[i].properties=properties;
                            this.tableData[i].propertiesName=propertiesName;
                        }

                    }

                    let skuList = [];
                    skuList = this.tableData;
                    let all = {
                        skuList: skuList,
                        spuId: this.spuId
                    }
                    MyPostJson('/liquor-product/sku/upd', all).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.serachBoxShow = false;
                            this.getSkuList();
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
                var properties = "";
                if (!this.checkNull(this.searchList.properties)) {
                    for (let i = 0; i < this.searchList.properties.length; i++) {
                        if (this.checkNull(this.searchList.properties[i])) {
                            this.searchList.properties.splice(i, 1);
                            i = i - 1;
                        }
                    }
                    properties = this.searchList.properties.join(",");
                }
                var otherProperties = "";
                if (!this.checkNull(this.searchList.otherProperties)) {
                    for (let i = 0; i < this.searchList.otherProperties.length; i++) {
                        if (this.checkNull(this.searchList.otherProperties[i])) {
                            this.searchList.otherProperties.splice(i, 1);
                            i = i - 1;
                        }
                    }
                    otherProperties = this.searchList.otherProperties.join(",")
                }
                if (!this.checkNull(this.searchList.checkedCities)) {
                    this.searchList.afterSalesService = this.searchList.checkedCities.join(",")
                }
                if (!this.checkNull(this.searchList.particularYear)){
                    this.searchList.particularYear=this.timeFormatYY(this.searchList.particularYear)
                }
                if (!this.checkNull(this.searchList.productionDate)){
                    this.searchList.productionDate=this.timeFormatYYMMDD(this.searchList.productionDate)
                }

                let searchList = {
                    id: this.spuId,
                    auditStatus: strStyle,
                    optionString: this.searchList.optionString,
                    optionId: '',
                    brandId: this.searchList.brandId == null ? "" : this.searchList.brandId,//品牌Id
                    brandName: "",//品牌名称
                    categoryId: this.searchList.optionId,//分类ID
                    categoryName: this.searchList.optionString,//分类名称
                    keyword: this.searchList.keyword,//商品关键词
                    phoneRichText: "",
                    otherProperties: otherProperties,
                    otherPropertiesName: [],
                    productionAddress: "",
                    properties: properties,
                    propertiesName: [],
                    rawMaterial: "",
                    richText: "",
                    sharingDes: this.searchList.sharingDes == "null" ? "" : this.searchList.sharingDes,
                    spuDetails: "",
                    spuIntroduce: '',
                    spuName: this.searchList.spuName,
                    title: this.searchList.title,
                    valueCount: "",
                    memo: '',//平台描述
                    afterSalesService: this.searchList.afterSalesService,
                    alcohol:this.searchList.alcohol==null?"":this.searchList.alcohol,
                    particularYear:this.searchList.particularYear==null?"":this.searchList.particularYear,
                    fragranceType:this.searchList.fragranceType==null?"":this.searchList.fragranceType,
                    netContent:this.searchList.netContent==null?"":this.searchList.netContent,
                    placeOfOrigin:this.searchList.placeOfOrigin==null?"":this.searchList.placeOfOrigin,
                    productionDate:this.searchList.productionDate==null?"":this.searchList.productionDate,
                    qualityGuaranteePeriod:this.searchList.qualityGuaranteePeriod==null?"":this.searchList.qualityGuaranteePeriod,
                    packingMethod:this.searchList.packingMethod==null?"":this.searchList.packingMethod,
                };
                this.loadingShow = true;
                MyPost('/liquor-product/spu/saveAndUpd', searchList).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.spuId = data;
                        let title = "";
                        if (strStyle == "1") {
                            title = "保存成功"
                        } else {
                            title = "提交成功"
                        }
                        this.$message({
                            message: title,
                            type: 'success'
                        });
                        this.addSpuImageAndRichText(this.spuId, strStyle);

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
            getSpuDetail() {
                MyPost('/liquor-product/spu/queryById', {
                    id: this.spuId
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        //平台信息
                        this.searchList = {
                            optionId: this.$route.query.optionId,
                            optionString: this.$route.query.optionString,
                            brandId: data.spu.brandId,//品牌Id
                            brandName: data.spu.brandName,//品牌名称
                            categoryId: this.$route.query.optionId,//分类ID
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
                            sharingDes: data.spu.sharingDes == "null" ? "" : data.spu.sharingDes,
                            spuDetails: "",
                            spuIntroduce: '',
                            spuName: data.spu.spuName,
                            title: data.spu.title,
                            valueCount: "",
                            memo: '',//平台描述
                            checkedCities: [],
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
                        // 回显其他属性值,属性是动态
                        // if (!this.checkNull(data.spu.otherProperties)) {
                        //     this.searchList.otherProperties = data.spu.otherProperties.split(",");
                        //     for (var i = 0; i < this.searchList.otherProperties.length; i++) {
                        //         this.searchList.otherProperties[i] = Number(this.searchList.otherProperties[i]);
                        //     }
                        // }
                        // if (!this.checkNull(data.spu.properties)) {
                        //     this.searchList.properties = data.spu.properties.split(",");
                        //     for (var i = 0; i < this.searchList.properties.length; i++) {
                        //         this.searchList.properties[i] = Number(this.searchList.properties[i]);
                        //     }
                        // }
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
                        this.fileAllImages = data.spuImage;
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            uploadBeforeHtml(file) {
                if (this.fileAllImages.length >= 5) {
                    this.$confirm("商品主图最多上传5张", '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'error'
                    }).then(() => {
                        this.delShow = false;
                    }).catch(() => {
                        this.delShow = false;
                    });
                    return
                }
                // 上传之前
                let types = ['image/jpeg', 'image/gif', 'image/png'];

                const isImage = types.includes(file.type);
                if (!isImage) {

                    this.$message.error('上传图片只能是 JPG、GIF、PNG 格式!');

                    return false;

                }
                const isLt2M = file.size / 1024 / 1024 < 3;
                if (!isLt2M) {
                    this.$message.error('上传文件大小不能超过 3M!');
                }
                return isLt2M;
                this.form.files.push(file);
            },
            uploadBefore(file) {
                // 上传之前
                let types = ['image/jpeg', 'image/gif', 'image/png'];

                const isImage = types.includes(file.type);
                if (!isImage) {

                    this.$message.error('上传图片只能是 JPG、GIF、PNG 格式!');

                    return false;

                }
                const isLt2M = file.size / 1024 / 1024 < 3;
                if (!isLt2M) {
                    this.$confirm("上传文件大小不能超过 3M!", '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'error'
                    }).then(() => {
                        this.delShow = false;
                    }).catch(() => {
                        this.delShow = false;
                    });
                }
                return isLt2M;
                this.form.files.push(file);
            },
            uploadSuccess(response, file, fileList) {
                this.$message({
                    message: '上传成功',
                    type: 'success'
                });
                this.newform.url = response.data;
                this.elUploadBoolean = false
            },
            uploadSuccessAgain(response, file, fileList) {
                if (this.fileAllImages.length >= 5) {
                    return
                }
                this.$message({
                    message: '上传成功',
                    type: 'success'
                });
                this.fileAllImages.push({
                    imageUrl: response.data,
                    type: 2
                });
                if (this.fileAllImages.length == 1) {
                    this.fileAllImages[0].type = 1
                }
            },
            uploadRichSuccess(response, file, fileList) {
                // 获取富文本组件实例
                let quill = this.$refs.myQuillEditor.quill;
                // 如果上传成功
                if (response.data) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片，res为服务器返回的图片链接地址
                    quill.insertEmbed(length, 'image', response.data)
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    // 提示信息，需引入Message
                    this.$confirm("上传失败", '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'error'
                    }).then(() => {
                        this.delShow = false;
                    }).catch(() => {
                        this.delShow = false;
                    });
                }
            },
            getProperty() {
                MyPost('/liquor-product/sku/getSpec', {
                    categoryId: this.searchList.optionId
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.optionLists = data[0].specsNameBOList;
                        this.optionLists.forEach(function (item, index) {
                            item.choice = ""
                        })
                    } else {
                        this.$message.error(message);
                    }
                })
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
            tabClk(num) {
                if (num == 2) {
                    if (this.checkNull(this.spuId)) {
                        if (!this.searchList.spuName) {
                            this.tabShow = "1";
                            this.$message.error('请输入商品名称');
                            return
                        }
                        this.saveAll("1");
                    }
                }
                this.tabShow = num;
                if (num == "2" && this.edit == "2") {
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
    .addCommodityDetail
        input:

        :-webkit-outer-spin-button,
        input::-webkit-inner-spin-button
            -webkit-appearance none

        input[type='number']
            -moz-appearance textfield

        .el-select
            width 100%

        .upload-demo-2
            display none

        .upload-demo-1
            .el-upload-list
                display none

        .minW .el-dialog
            width 640px

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
                padding-top 10px
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
                    .el-input__inner
                        height 28px !important
                        line-height 28px !important
                    .el-input__prefix
                        height 28px
                    .el-input__icon
                        line-height 28px
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

                    .add-tip-left
                        width 410px
                        text-align left

                    .add-ipt
                        height 36px
                        width 410px
                        float left

                    .add-ipttext
                        width 410px
                        float left

                    .add-image
                        width 100%
                        float left
                        margin-left 224px

                        .el-image-d1
                            float left
                            width 200px
                            height 200px
                            position relative
                            margin-right 20px
                            margin-bottom 10px

                            .el-image-d2
                                background #eeeeee
                                position absolute
                                left 0
                                right 0
                                bottom 0
                                height 40px
                                display flex
                                flex-direction row
                                align-items center
                                justify-content space-between
                                padding 0 30px
                                font-size 14px
                                color #333333

                                span
                                    cursor pointer

                                .span-color
                                    color #c13a3c

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
