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
                <h3><em></em>门店基本信息</h3>
                <div class="add-box-short">
                    <span class="add-tip-short"><i style="color: red">*</i> 门店编号：</span>
                    <el-input size="small" class="add-ipt-short" maxlength="20"
                              v-model="infoList.companyCode"></el-input>
                    <span style="width: 20%"/>
                </div>
                <div class="add-box-short">
                    <span class="add-tip-short"><i style="color: red">*</i> 门店名称：</span>
                    <el-input size="small" class="add-ipt-short" maxlength="32" v-model="infoList.name"></el-input>
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
                    <span class="add-tip-short"><i style="color: red">*</i> 门店联系人：</span>
                    <el-input size="small" class="add-ipt-short" maxlength="32" v-model="infoList.ceo"></el-input>
                </div>
                <div class="add-box-short">
                    <span class="add-tip-short"><i style="color: red">*</i> 联系人电话：</span>
                    <el-input size="small" class="add-ipt-short" maxlength="32" v-model="infoList.ceoPhone"></el-input>
                </div>
                <div class="add-box-short">
                    <span class="add-tip-short"> 门店成立时间：</span>
                    <el-input size="small" class="add-ipt-short" maxlength="32"
                              v-model="infoList.establishmentTime"></el-input>
                </div>
                <div class="add-box-short">
                    <span class="add-tip-short">注册资本：</span>
                    <el-input size="small" class="add-ipt-short" maxlength="10"
                              type="tel"
                              @input="saveTable"
                              v-model="infoList.registeredCapital"></el-input>
                    <p class="add-tips">&nbsp;&nbsp;万元</p>
                </div>
                <div class="add-box-short">
                    <span class="add-tip-short"><i style="color: red">*</i> 门店类型：</span>
                    <el-select size="small" class="add-ipt-short" v-model="infoList.companyType" placeholder="门店类型">
                        <el-option
                                v-for="item in shopTypeList"
                                :key="item"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
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
                    <span class="add-tip"><i style="color: red">*</i> 门店注册地址：</span>
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
                <h3><em></em>门店资质上传</h3>
                <div class="update-box">
                    <h4>门店营业执照</h4>
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
                    <h4>门店负责人身份证正反面</h4>
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
    import footerbar from '../../../components/footerbar/footerbar.vue'

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
                loadingText: '正在加载中...',
                dialogImageUrl: '',
                dialogVisible: false,
                srcList: [
                    require('../../../../static/img/icon-01.png')
                ],
                url: require('../../../../static/img/icon-01.png'),

                shopTypeList: [
                    {
                        label: '直营',
                        value: '1'
                    },
                    {
                        label: '专卖',
                        value: '2'
                    }
                ],
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
                    companyType: ''//门店类型
                },
                hideUpload: false,
                hideUpload2: false,
                hideUpload3: false,
                hideUpload4: false,
                newBusinessLicenseList: [],//企业营业执照集合
                newLegalRepresentativeList: [],//法定代表人身份证正反面
                newSafetyPermitList: [],//食品生产许可证
                newProtocolList: []//签署协议上传
            }
        },
        created() {
            this.$store.state.navTit = '门店管理';
            this.$store.state.navChildTit = '门店管理';
            this.headers = {
                token: store.get('tokenVal')
            };
            this.getProvinceFn();
            if (this.$route.query.id) {
                this.getAuditCompanyFn();
            }
        },
        methods: {
            saveTable(item) {
                this.infoList.registeredCapital=item.replace(/[^\d.]/g,'').replace(/\.{2,}/g,'.')
                    .replace(/^\./g,'').replace('.','$#$')
                    .replace(/\./g,'').replace('$#$','.')
                    .replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')
                console.log(this.infoList.registeredCapital)
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
                } else {
                    return null
                }
            },
            getAuditCompanyFn() {
                this.loadingShow = true;
                MyPost('/polaris/shop/getAuditCompany', {
                    id: this.$route.query.id
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        let dataInf = data.shopDO;
                        this.infoList = {
                            companyCode: dataInf.companyCode,//门店编号
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

                        this.dateVal = [this.timeFormatFun(dataInf.startTime), this.timeFormatFun(dataInf.endTime)];
                        this.cooperationDateVal = [this.timeFormatFun(dataInf.cooperationStartTime), this.timeFormatFun(dataInf.cooperationEndTime)];
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
                    return this.$message.error('请填写门店编号');
                }

                if (!this.infoList.name) {
                    return this.$message.error('请填写门店名称');
                }
                // if (!this.infoList.uscc) {
                //     return this.$message.error('请填写统一社会信用代码');
                // }
                // if (!this.infoList.lar) {
                //     return this.$message.error('请填写法定代表人');
                // }
                if (!this.infoList.ceo) {
                    return this.$message.error('请填写门店联系人');
                }

                if (!this.infoList.ceoPhone) {
                    return this.$message.error('请填写联系人电话');
                }
                if (!/^1\d{10}$/g.test(this.infoList.ceoPhone)) {
                    return this.$message.error('请正确填写联系人电话');
                }
                if (!this.infoList.companyType) {
                    return this.$message.error('请填写门店类型');
                }

                // if (!this.infoList.establishmentTime) {
                //     return this.$message.error('请填写门店成立时间');
                // }
                // if (!this.dateVal) {
                //     return this.$message.error('请选择经营期限');
                // }
                // if (!this.infoList.registeredCapital) {
                //     return this.$message.error('请填写注册资本');
                // }
                if (!this.infoList.province) {
                    return this.$message.error('请填写门店注册地址');
                }
                if (!this.infoList.city) {
                    return this.$message.error('请填写门店注册地址');
                }
                if (!this.infoList.county) {
                    return this.$message.error('请填写门店注册地址');
                }
                // if (this.newBusinessLicenseList.length == 0) {
                //     return this.$message.error('请上传门店营业执照');
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
                    MyPost('/polaris/shop/updManage', {
                        companyCode: this.infoList.companyCode,
                        id: this.$route.query.id,
                        name: this.infoList.name,
                        uscc: this.infoList.uscc,
                        lar: this.infoList.lar,
                        ceo: this.infoList.ceo,
                        ceoPhone: this.infoList.ceoPhone,
                        establishmentTime: this.infoList.establishmentTime,
                        startTime: typeof (this.dateVal[0]) === 'undefined'
                        || this.dateVal[0] === null ? "" : this.dateVal[0],
                        endTime: typeof (this.dateVal[1]) === 'undefined'
                        || this.dateVal[1] === null ? "" : this.dateVal[1],
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
                        cooperationStartTime: typeof (this.cooperationDateVal[0]) === 'undefined'
                        || this.cooperationDateVal[0] === null ? "" : this.cooperationDateVal[0],
                        cooperationEndTime: typeof (this.cooperationDateVal[1]) === 'undefined'
                        || this.cooperationDateVal[1] === null ? "" : this.cooperationDateVal[1]
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
                    MyPost('/polaris/shop/manage', {
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
                        cooperationEndTime: typeof (this.cooperationDateVal[1]) === 'undefined' ? "" : this.cooperationDateVal[1]
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
    /* 谷歌 */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        appearance: none;
        margin: 0;
    }

    /* 火狐 */
    input {
        -moz-appearance: textfield;
    }


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
                        background url("../../../../static/img/icon-l.png") no-repeat 0 0
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
                        background url("../../../../static/img/icon-l.png") no-repeat 0 0
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
