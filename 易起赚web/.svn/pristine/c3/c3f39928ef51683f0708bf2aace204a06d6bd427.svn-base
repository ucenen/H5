<template>
    <div class="warehouseConfigurationSet">

        <div class="nav-top">
            <div class="nav-box" @click="goPage">
                <img src="static/img/backlast.png"/>
                <p>返回</p>
            </div>
<!--            <div class="nav-box"v-if="edit==1"  @click="saveAll('1')">-->
<!--                <img src="static/img/save.png"/>-->
<!--                <p>保存</p>-->
<!--            </div>-->
            <div class="nav-box" @click="configClk">
                <img src="static/img/submit.png"/>
                <p>提交</p>
            </div>
        </div>
        <div class="add-mod-con">
            <div class="add-mod-one">
                <h3><em></em>基本信息</h3>
                <div class="add-box">
                    <span class="add-tip">仓库编号：</span>
                    <el-input size="small" class="add-ipt" :disabled="true" v-model="searchList.warehouseCode"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip"><i style="color: red">*</i> 仓库名称：</span>
                    <el-input size="small" maxlength="20" class="add-ipt" v-model="searchList.warehouseName"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip"><i style="color: red">*</i> 仓库类型：</span>
                    <el-select size="small" class="add-ipt" v-model="searchList.warehouseType" placeholder="仓库类型">
                        <el-option
                                v-for="item in typeList"
                                :key="item"
                                :label="item.dictionaryValue"
                                :value="item.dictionaryKey">
                        </el-option>
                    </el-select>
                </div>
                <div class="add-box">
                    <span class="add-tip"> 仓库简名：</span>
                    <el-input size="small" maxlength="20"  class="add-ipt" v-model="searchList.warehouseAbbreviation"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip"> 拼音码：</span>
                    <el-input size="small" maxlength="20"  class="add-ipt" v-model="searchList.spellCode"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip"> 状态：</span>

                    <el-radio-group  style="display: flex;align-items: center;flex-flow: row" class="add-ipt" size="small"  v-model="searchList.status">
                        <el-radio  label="1">启用</el-radio>
                        <el-radio  label="2">禁用</el-radio>
                    </el-radio-group>
<!--                    <el-input size="small" class="add-ipt" v-model="searchList.status"></el-input>-->
                </div>
                <div class="add-box">
                    <span class="add-tip"> 仓管员：</span>
                    <el-input size="small" maxlength="20"  class="add-ipt" v-model="searchList.warehouseKeeper"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip"> 电话：</span>
                    <el-input size="small" class="add-ipt" maxlength="40" v-model="searchList.phone"></el-input>
                </div>
                <div class="add-box">
                    <span class="add-tip"></span>
                    <span class="add-ipt"></span>
                </div>
                <div class="add-box-long">
                    <span class="add-tip-long"> 地区：</span>
                    <el-select size="small" class="add-ipt-long mr20" v-model="searchList.province" @change="provinceClk"
                               placeholder="请选择省">
                        <el-option
                                v-for="item in provinceList"
                                :key="item"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                    <el-select size="small" class="add-ipt-long mr20" v-model="searchList.city" @change="cityClk"
                               placeholder="请选择市">
                        <el-option
                                v-for="item in cityList"
                                :key="item"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                    <el-select size="small" class="add-ipt-long" v-model="searchList.county" placeholder="请选择区">
                        <el-option
                                v-for="item in areaList"
                                :key="item"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                </div>
                <div class="add-box">
                    <span class="add-tip"> 详细地址：</span>
                    <el-input size="small" maxlength="20"  class="add-ipt" v-model="searchList.address"></el-input>
                </div>
                <div class="add-box-long">
                    <span class="add-tip-long">备注：</span>
                    <el-input
                            size="small"
                            class="add-ipt"
                            type="textarea"
                            maxlength="200"
                            v-model="searchList.memo"
                            :rows="3">
                    </el-input>
                </div>
            </div>
<!--            <div class="btn-group">-->
<!--                <el-button type="primary" @click="configClk">提交</el-button>-->
<!--            </div>-->
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
    import {MyGet, MyPost} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../../../components/footerbar/footerbar.vue'

    export default {
        name: 'warehouseConfigurationSet',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                loadingShow: false,
                loadingText: '正在加载中。。。',
                typeList: [
                    {
                        dictionaryValue: '',
                        dictionaryKey: ''
                    }
                ],
                searchList: {
                    warehouseCode: '',//仓库编号
                    warehouseName: '',//仓库名称
                    warehouseType: '',//仓库类型 1总仓 2分仓
                    warehouseAbbreviation: '',//仓库简称
                    status: '1',//状态
                    warehouseKeeper: '',//仓管员
                    phone: '',//电话
                    province: '',//省
                    city: '',//市
                    county: '',//区
                    address: '',//地址
                    spellCode: '',//拼音码
                    memo: ''//备注信息
                },
                provinceList: [],
                cityList: [],
                areaList: [],
            }
        },
        created() {
            this.$store.state.navTit = '库存管理';
            this.$store.state.navChildTit = '仓库配置';
            this.getProvinceFn();
            this.queryWareHouse();
            if (this.$route.query.id) {
                this.getCityFn(this.$route.query.province);
                this.getAreaFn(this.$route.query.city);
                this.searchList = {
                    warehouseCode: this.$route.query.warehouseCode,//仓库编号
                    warehouseName: this.$route.query.warehouseName,//仓库名称
                    warehouseType: this.$route.query.warehouseType,//仓库类型 1总仓 2分仓
                    warehouseAbbreviation: this.$route.query.warehouseAbbreviation,//仓库简称
                    status: this.$route.query.status,//状态
                    warehouseKeeper: this.$route.query.warehouseKeeper,//仓管员
                    phone: this.$route.query.phone,//电话
                    province: this.$route.query.province,//省
                    city: this.$route.query.city,//市
                    county: this.$route.query.county,//区
                    address: this.$route.query.address,//地址
                    spellCode: this.$route.query.spellCode,//拼音码
                    memo: this.$route.query.memo//备注信息
                }
            }
        },
        methods: {
            queryWareHouse() {
                this.loadingShow = true;
                MyPost('/banyan-inventory/warehouse/getDictionaryList', {

                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.typeList=data
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            provinceClk() {
                this.searchList.city = '';
                this.cityList = [];
                this.searchList.county = '';
                this.areaList = [];
                this.getCityFn(this.searchList.province);
            },
            cityClk() {
                this.searchList.county = '';
                this.areaList = [];
                this.getAreaFn(this.searchList.city);
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
            configClk() {
                // if (!this.searchList.warehouseCode) {
                //     return this.$message.error('请填写仓库编号');
                // }
                if (!this.searchList.warehouseName) {
                    return this.$message.error('请填写仓库名称');
                }
                if (!this.searchList.warehouseType) {
                    return this.$message.error('请填写仓库类型');
                }
                // if (!this.searchList.spellCode) {
                //     return this.$message.error('请填写拼音码');
                // }
                // if (!this.searchList.warehouseAbbreviation) {
                //     return this.$message.error('请填写仓库简称');
                // }
                // if (!this.searchList.status) {
                //     return this.$message.error('请填写状态');
                // }
                // if (!this.searchList.warehouseKeeper) {
                //     return this.$message.error('请填写仓管员');
                // }
                // if (!this.searchList.phone) {
                //     return this.$message.error('请填写电话');
                // }
                // if (!/^1\d{10}$/g.test(this.searchList.phone)) {
                //     return this.$message.error('请正确填写电话');
                // }
                // if (!this.searchList.province) {
                //     return this.$message.error('请选择区域');
                // }
                // if (!this.searchList.city) {
                //     return this.$message.error('请选择区域');
                // }
                // if (!this.searchList.county) {
                //     return this.$message.error('请选择区域');
                // }
                // if (!this.searchList.address) {
                //     return this.$message.error('请填写地址');
                // }
                this.loadingShow = true;
                if (this.$route.query.id) {
                    MyPost('/banyan-inventory/warehouse/upd', {
                        id: this.$route.query.id,
                        // warehouseCode: this.searchList.warehouseCode,//仓库编号
                        warehouseName: this.searchList.warehouseName,//仓库名称
                        warehouseType: this.searchList.warehouseType,//仓库类型 1总仓 2分仓
                        warehouseAbbreviation: this.searchList.warehouseAbbreviation,//仓库简称
                        status: this.searchList.status,//状态
                        warehouseKeeper: this.searchList.warehouseKeeper,//仓管员
                        phone: this.searchList.phone,//电话
                        province: this.searchList.province,//省
                        city: this.searchList.city,//市
                        county: this.searchList.county,//区
                        address: this.searchList.address,//地址
                        spellCode: this.searchList.spellCode,//拼音码
                        memo: this.searchList.memo//备注信息
                    }).then((res) => {
                        this.loadingShow = false;
                        let {code, message, data} = res;
                        if (code == '0') {
                            this.$message({
                                message: '编辑成功',
                                type: 'success'
                            });
                            this.$router.go(-1);
                        } else {
                            this.$message.error(message);
                        }
                    })
                } else {
                    MyPost('/banyan-inventory/warehouse/add', {
                        warehouseCode: this.searchList.warehouseCode,//仓库编号
                        warehouseName: this.searchList.warehouseName,//仓库名称
                        warehouseType: this.searchList.warehouseType,//仓库类型 1总仓 2分仓
                        warehouseAbbreviation: this.searchList.warehouseAbbreviation,//仓库简称
                        status: this.searchList.status,//状态
                        warehouseKeeper: this.searchList.warehouseKeeper,//仓管员
                        phone: this.searchList.phone,//电话
                        province: this.searchList.province,//省
                        city: this.searchList.city,//市
                        county: this.searchList.county,//区
                        address: this.searchList.address,//地址
                        spellCode: this.searchList.spellCode,//拼音码
                        memo: this.searchList.memo//备注信息
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
            },
            goPage() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../../styles/css/my.scss"
    .warehouseConfigurationSet
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
            padding 30px 50px 16px 10px
            .add-mod-one
                /*margin-bottom 20px*/

                h3
                    font-weight bold
                    font-size 14px
                    color #333
                    margin-top 10px
                    padding-left 8px
                    line-height 22px
                    height 34px

                    em
                        float left
                        width 34px
                        height 34px
                        background url('../../../../static/img/icon-l.png') no-repeat 0 0
                        background-size contain
                .add-box-long
                    /*overflow hidden*/
                    width 66%
                    height 40px
                    float left
                    margin-bottom 22px

                    .add-tip-long
                        width 16.5%
                        text-align right
                        line-height 36px
                        font-size 12px
                        color #333
                        margin-right 20px
                        display inline
                        float left


                    .add-ipt-long
                        height 36px
                        width 25.3%
                        float left
                    .add-ipt
                        height 36px
                        width 80%
                        float left
                    .mr20
                        margin-right 20px
                .add-box
                    /*overflow hidden*/
                    width 33%
                    height 40px
                    float left
                    margin-bottom 22px

                    .el-image
                        width 40px
                        height 40px

                    .add-tip
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

                    .add-ipt
                        height 36px
                        width 60%
                        float left

                    .mr20
                        margin-right 20px

                    .el-input--small .el-input__inner
                        height 36px
                        line-height 36px

                .mb0
                    margin-bottom 0

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
                    font-weight 550

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

            .btn-group
                text-align center
                padding 0 0 40px 0
                overflow hidden
</style>
