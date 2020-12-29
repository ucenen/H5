<template>
    <div class="addCommodity">
        <div class="return-line">
            <span @click="goPage">返回</span>
        </div>
        <div class="add-mod-con">
            <div class="four-css">
                <div class="four-css-1">一级分类</div>
                <div class="four-css-1">二级分类</div>
                <div class="four-css-1">三级分类</div>
                <div class="four-css-2">四级分类</div>
            </div>
            <div class="cascader-css">
                <el-cascader-panel filterable ref="myCascader" v-model="optionChoice" :props="props"  @change="handleChange" :options="options" ></el-cascader-panel>
                <div class="cascader-span">
                    已选类目: {{optionsChoiceString}}
                </div>
            </div>
            <div class="btn-group">
                <el-button type="primary" @click="configClk">下一步，填写商品信息</el-button>
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
                myCascader:'',
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
                categoryId: '',
                showDisable: false,
                optionChoice:'',
                optionsChoiceString:"",
                options: [],
                props: {
                    value: 'id',
                    label: 'name',
                    children: 'childList',
                    checkStrictly: true,
                    emitPath: false
                },
            }
        },
        created() {
            this.$store.state.navTit = '商品';
            this.$store.state.navChildTit = '商品模板';
            // this.getBrandList();
            this.getAllCategoryListFn();
        },
        mounted(){

        },
        methods: {

            handleChange(value) {
                this.optionsChoiceString = this.$refs.myCascader.getCheckedNodes()[0].label;
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
            getAllCategoryListFn() {
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
                if(this.checkNull(this.optionsChoiceString)){
                    return this.$message.error("请选择分类");
                }
               this.$router.push({
                   path: '/addCommodityDetail',
                   query:{
                       optionString:this.optionsChoiceString,
                       optionId:this.optionChoice,
                       edit:"1",
                       spuId:"",
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
            .cascader-css
               margin  0 20% 40px
            .four-css
               margin 40px 20% 0
               .four-css-1
                   display: inline-block
                   height 40px
                   line-height 40px
                   width 20%
               .four-css-2
                   display: inline-block
                   height 40px
                   line-height 40px
                   /*width 40%*/
            .el-cascader-menu
               width 20%
            .cascader-span
               height 40px
               line-height 40px
               margin-top 10px
               padding-left 10px
               background #FAFAFA
               color #666666
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
