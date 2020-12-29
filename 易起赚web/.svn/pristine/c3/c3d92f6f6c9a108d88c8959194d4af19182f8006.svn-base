<template>
    <div class="addCommodity">
        <div class="return-line">
            <span @click="goPage">返回</span>
        </div>
        <div class="add-mod-con">
            <div class="add-mod-one">
                <h3><em></em>{{edit == 1 ? '新增商品模板' : edit == 3 ? '查看商品模板' : '编辑商品模板'}}</h3>
                <div class="add-mod-line">
                    <div class="add-box">
                        <span class="add-tip">* 模板名称：</span>
                        <el-input size="small" class="add-ipt" v-model="spuName" :disabled="showDisable"></el-input>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 品牌：</span>
                        <el-input size="small" class="add-ipt" :disabled="true" v-model="brandName"></el-input>
                        <span class="sel-btn" v-show="!showDisable" @click="serachBoxShow = true">选择品牌</span>
                    </div>
                    <div class="add-box">
                        <span class="add-tip">* 分类：</span>
                        <el-cascader :options="options" :props="props" :disabled="showDisable" v-model="categoryId" @change="getPropertyFn" :show-all-levels="false"></el-cascader>
                    </div>
                    <div class="add-box mb0">
                        <span class="add-tip">模板描述：</span>
                        <el-input size="small" class="add-ipt" v-model="memo" :disabled="showDisable"></el-input>
                    </div>
                    <p class="add-desc">包括了商品毛重、产地、香型、包装、瓶装容量、度数等信息</p>
                </div>
            </div>
            <div class="add-mod-one" v-show="propertyList.length > 0">
                <h3><em></em>模板字段</h3>
                <div class="add-mod-out">
                    <div class="add-mod-line">
                        <div class="add-box w100" v-for="item in propertyList" :key="item">
                            <span class="add-tip">参数名称：</span>
                            <el-select size="small" class="add-ipt" v-model="item.name" placeholder="请选择">
                                <el-option
                                        :label="item.name"
                                        :value="item.name">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btn-group">
                <el-button type="primary" @click="configClk" v-show="!showDisable">确认</el-button>
                <!--<el-button type="primary" plain>取消</el-button>-->
            </div>
        </div>
        <!--loading-->
        <transition name="fade">
            <div class="loading-container" v-show="loadingShow">
                <loading :loadingText="loadingText"></loading>
            </div>
        </transition>
        <footerbar/>
        <el-dialog title="选择品牌"
                   class="minW"
                   :visible.sync="serachBoxShow"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="search-contain-mod">
                <div class="search-top">
                    <span v-for="(item,index) in searchTipList" :key="item"
                          :class="defaultSearch == item ? 'search-on' : ''"
                          @click="searchTipClk(item)">{{item}}</span>
                </div>
                <div class="search-ipt-contain">
                    <el-input placeholder="按品牌名称或关键词搜索" v-model="searchData.name" size="small"
                              class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
                    </el-input>
                    <p class="search-ipt-p" v-show="defaultSelVal">当前已选择品牌：{{defaultSelVal}}
                        <el-button size="small" class="select-btn" type="text" @click="cancelClk">取消选择</el-button>
                    </p>
                </div>
                <div class="seach-scroll-contain">
                    <div class="scroll-box-mod" v-for="(list,index) in scrollList" :key="list"
                         :id="'searc'+(index + 1)">
                        <h4>{{list.letter}}</h4>
                        <div class="scroll-box">
                            <span @click="selBtn(item)" :class="defaultSelVal == item.name ? 'search-on' : ''"
                                  v-for="item in list.brandBOList" :key="item.id">{{item.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="serachBoxShow = false">取消</el-button>
                <el-button size="small" type="primary" @click="brandClk">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import store from 'si-store'
    import {MyGet, MyPost} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../footerbar/footerbar.vue'

    export default {
        name: 'addCommodity',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                loadingShow: false,
                loadingText: '正在加载中...',
                searchTipList: ['全部品牌', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '其他'],
                defaultSearch: '全部品牌',
                scrollList: [],
                serachBoxShow: false,
                defaultSelVal: '',//列表选择的值
                searchData: {
                    name: '',//搜索字段：品牌名称
                    firstLetter: '',//搜索字段：首字母
                },
                spuName: '',//模板名称
                brandName: '',//品牌
                brandId: '',//品牌id
                memo: '',//模板描述
                propertyList: [],
                edit: 1,
                options: [],
                props: {
                    value: 'id',
                    label: 'name',
                    children: 'childList',
                    emitPath: false
                },
                categoryId: '',
                showDisable: false
            }
        },
        created() {
            this.$store.state.navTit = '商品';
            this.$store.state.navChildTit = '商品模板';
            this.getBrandList();
            this.categoryListFn();
        },
        mounted(){
            if (this.$route.query.edit){
                this.edit = this.$route.query.edit;
                this.spuName = this.$route.query.spuName;
                this.brandId = this.$route.query.brandId;
                this.brandName = this.$route.query.brandName;
                this.categoryId = this.$route.query.categoryId;
                this.memo = this.$route.query.memo;
                this.getPropertyFn();
            }
            if (this.$route.query.edit == 3){
                this.showDisable = true;
            } else {
                this.showDisable = false;
            }
        },
        methods: {
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
            categoryListFn() {
                this.loadingShow = true;
                MyGet('/liquor-product/category/categoryList').then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.options = this.deleteChildren(data);
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            getBrandList() {
                this.loadingShow = true;
                MyPost('/liquor-product/brand/getBrandList', {
                    name: this.searchData.name,
                    firstLetter: this.searchData.firstLetter
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.scrollList = data;
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            searchTipClk(defaultName) {
                this.defaultSearch = defaultName;
                if (defaultName == '全部品牌') {
                    this.searchData.firstLetter = '';
                } else {
                    this.searchData.firstLetter = defaultName;
                }
                this.getBrandList();
            },
            searchBtn() {
                this.getBrandList();
            },
            selBtn(item) {
                this.defaultSelVal = item.name;
                this.brandId = item.id;
            },
            cancelClk() {
                this.defaultSelVal = '';
                this.brandId = '';
            },
            brandClk() {
                if (!this.brandId) {
                    return this.$message.error('请选择品牌');
                }
                this.brandName = this.defaultSelVal;
                this.serachBoxShow = false;
            },
            getPropertyFn() {
                this.loadingShow = true;
                MyPost('/liquor-product/spu/getProperty', {
                    categoryId: this.categoryId
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.propertyList = data;
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            configClk() {
                if (!this.spuName) {
                    return this.$message.error('请填写模板名称');
                }
                if (!this.brandName) {
                    return this.$message.error('请选择品牌');
                }
                if (!this.categoryId) {
                    return this.$message.error('请选择分类');
                }
                this.loadingShow = true;
                if (this.$route.query.edit){
                    MyPost('/liquor-product/spu/upd', {
                        id: this.$route.query.id,
                        spuName: this.spuName,
                        brandId: this.brandId,
                        categoryId: this.categoryId,
                        memo: this.memo
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
                    MyPost('/liquor-product/spu/save', {
                        spuName: this.spuName,
                        brandId: this.brandId,
                        categoryId: this.categoryId,
                        memo: this.memo
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
    .addCommodity
        .hide .el-upload--picture-card
            display none
        .return-line
            background #fff
            box-shadow 0px 0px 6px 0px rgba(174, 174, 174, 0.14)
            height 36px
            position fixed
            width 100%
            z-index 1
            padding-left 16px
            span
                font-size 12px
                color #308BDE
                line-height 36px
                cursor pointer
        .add-mod-con
            padding-top 36px
            overflow hidden
            background #fff
            .add-mod-one
                .add-mod-out
                    border 2px dashed #E3E3E3
                    margin 0 14px 20px 14px
                    padding 22px 0 0 0
                    overflow hidden
                    position relative
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
                        background url("./icon-l.png") no-repeat 0 0
                        background-size contain
                .add-desc
                    line-height 36px
                    height 36px
                    float left
                    margin-left 224px
                    font-size 12px
                    color #333
                .add-box
                    height 36px
                    margin-bottom 22px
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
                    .mr20
                        margin-right 20px
                    .el-input--small .el-input__inner
                        height 36px
                        line-height 36px
                .mb0
                    margin-bottom 0
            .line-add-box
                padding 20px 0 0 0
                .add-box
                    margin-bottom 0
            .add-mod-line
                overflow hidden
                .add-box
                    float left
                    width 100%
                    .sel-btn
                        float left
                        font-size 12px
                        line-height 36px
                        color #308BDE
                        margin-left 16px
                        cursor pointer
                    .mr20
                        width 150px
                .w100
                    height auto
                    width 100%
            .btn-group
                text-align center
                padding 20px 0 30px 0
                overflow hidden
        .minW
            .el-dialog__body
                padding 0 20px 30px 20px
        .search-contain-mod
            .search-top
                overflow hidden
                padding 10px 0
                border-bottom 1px dashed #c9c9c9
                span
                    cursor pointer
                    font-size 14px
                    line-height 20px
                    margin-right 12px
                    color #333
                    float left
                    display inline
                    &:last-child
                        margin-right 0
                .search-on
                    color #c13a3c
            .search-ipt-contain
                overflow hidden
                padding 10px 0
                .input-with-select
                    float left
                    width 40%
                .search-ipt-p
                    margin-left 20px
                    font-size 12px
                    line-height 32px
                    color #333
                    float left
                    .select-btn
                        margin-left 20px
            .seach-scroll-contain
                overflow-y hidden
                .scroll-box-mod
                    overflow hidden
                    h4
                        line-height 30px
                        color #333
                        font-weight bold
                        font-size 16px
                    .scroll-box
                        overflow hidden
                        span
                            color #333
                            line-height 20px
                            height 20px
                            padding 0 10px
                            cursor pointer
                            margin-right 10px
                            margin-bottom 10px
                            float left
                            display inline
                            font-size 14px
                            &:hover
                                color #c13a3c
                        .search-on
                            color #c13a3c
</style>
