<template>
    <div class="commodityPreview">
        <div class="return-line">
            <span @click="goPage">返回</span>
        </div>
        <div class="add-mod-con">
            <div class="top-mod">
                <div class="slide" id="single_lb" @mouseover="fn3" @mouseout="fn4">
                    <div class="big-pic-con">
                        <pic-zoom :url="imgUrl" :scale="3"></pic-zoom>
                    </div>
                    <img class="prev" @click="fn5" src="./prev.png"/>
                    <div class="small-pic-con">
                        <ol class="small">
                            <li :class="now == index ? 'act-on' : ''" v-for="(item, index) in imgList" :key="item"><img
                                    :src="item.imageUrl"/></li>
                        </ol>
                    </div>
                    <img class="next" @click="fn6" src="./next.png"/>
                </div>
                <div class="desc-mod">
                    <h5>{{spuList.spuName}}</h5>
                    <p class="desc-p">{{spuList.memo}}</p>
                    <p class="desc-val">售价：<span>￥1399.00</span></p>
                    <p class="desc-val under-line">划线价格：<span>￥1399.00</span></p>
                    <div class="protery-mod">
                        <span class="protery-tip">选择规格：</span>
                        <div class="protery-cen">
                            <div class="protery-box" v-for="(item,index) in spuPropertyList" :key="item">
                                <span class="box-tip">{{item.name}}：</span>
                                <el-radio-group v-model="item.selectVal" size="medium"
                                                @change="selchange(item.selectVal,index)">
                                    <el-radio-button v-for="k in item.propertyValueBOS" :key="k" :label="k.id">
                                        {{k.value}}
                                    </el-radio-button>
                                </el-radio-group>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tabs-mod">
                <span :class="tabShow == 1 ? 'tab-on' : ''" @click="tabClk(1)">商品介绍</span>
                <span :class="tabShow == 2 ? 'tab-on' : ''" @click="tabClk(2)">规格与包装</span>
            </div>
            <div class="tabs-con-mod" v-show="tabShow == 1" v-html="spuList.richText"></div>
            <div class="tabs-con-mod" v-show="tabShow == 2">
                <div class="tabs-box">
                    <span class="tabs-tips">主体</span>
                    <ul>
                        <li><span>特性</span>普通餐酒</li>
                        <li><span>特性</span>普通餐酒</li>
                        <li><span>特性</span>普通餐酒</li>
                    </ul>
                </div>
                <div class="tabs-box">
                    <span class="tabs-tips">主体</span>
                    <ul>
                        <li><span>特性</span>普通餐酒</li>
                        <li><span>特性</span>普通餐酒</li>
                        <li><span>特性</span>普通餐酒</li>
                    </ul>
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
    import {MyGet, MyPost} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../footerbar/footerbar.vue'
    import PicZoom from "vue-piczoom"

    export default {
        name: 'commodityPreview',
        components: {
            Loading,
            footerbar,
            PicZoom
        },
        data() {
            return {
                loadingShow: false,
                loadingText: '正在加载中...',
                timer: null,
                now: 0,
                imgList: [],
                imgUrl: '',
                tabShow: 1,
                spuList: {},
                spuPropertyList: [],
                ids: []
            }
        },
        created() {
            this.$store.state.navTit = '商品';
            this.$store.state.navChildTit = 'SKU列表';
            this.queryByIdFn();
            this.getSpuPropertyFn();
        },
        methods: {
            queryByIdFn() {
                this.loadingShow = true;
                MyPost('/liquor-product/spu/queryById', {
                    id: this.$route.query.id
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.imgList = data.spuImage;
                        this.spuList = data.spu;
                        this.imgUrl = data.spuImage[0].imageUrl;
                        this.$nextTick(() => {
                            this.imgFn();
                        })
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            imgFn() {
                var that = this;
                var aSlide = document.getElementById('single_lb');
                var aSmall = this.getByClass(aSlide, 'small')[0];
                var aSmallLi = aSmall.getElementsByTagName('li');
                var aSmallImg = aSmall.getElementsByTagName('img')
                var aPrev = this.getByClass(aSlide, 'prev')[0];
                var aNext = this.getByClass(aSlide, 'next')[0];
                aSmall.style.width = (aSmallLi[0].offsetWidth + 10) * aSmallLi.length + 'px';
                for (var i = 0; i < aSmallLi.length; i++) {
                    aSmallLi[i].index = i;
                    aSmallLi[i].onclick = function () {
                        if (this.index == that.now) return;
                        that.now = this.index;
                        that.tab();
                    }
                }
                //this.timer = setInterval(this.fn6, 5000);
            },
            tab() {
                var that = this;
                var aSlide = document.getElementById('single_lb');
                var aSmall = this.getByClass(aSlide, 'small')[0];
                var aSmallLi = aSmall.getElementsByTagName('li');
                var aSmallImg = aSmall.getElementsByTagName('img')
                var aPrev = this.getByClass(aSlide, 'prev')[0];
                var aNext = this.getByClass(aSlide, 'next')[0];
                this.imgUrl = this.imgList[this.now].imageUrl;
                if (this.now == 0) {
                    this.startMove(aSmall, 'left', 0)
                } else if (this.now == aSmallLi.length - 1) {
                    this.startMove(aSmall, 'left', -(this.now - 3) * (aSmallLi[0].offsetWidth + 5))
                } else if (this.now == aSmallLi.length - 2) {
                    this.startMove(aSmall, 'left', -(this.now - 2) * (aSmallLi[0].offsetWidth + 5))
                } else {
                    this.startMove(aSmall, 'left', -(this.now - 1) * (aSmallLi[0].offsetWidth + 5));
                }
                this.startMove(aSmallImg[this.now], 'border', '1px solid #C13A3C');
            },
            fn3() {
                clearInterval(this.timer);
            },
            fn4() {
                //this.timer = setInterval(this.fn6, 5000)
            },
            fn5() {
                var aSlide = document.getElementById('single_lb');
                var aSmall = this.getByClass(aSlide, 'small')[0];
                var aSmallLi = aSmall.getElementsByTagName('li');
                this.now--;
                if (this.now == -1) {
                    this.now = aSmallLi.length - 1;
                }
                this.tab();
            },
            fn6() {
                var aSlide = document.getElementById('single_lb');
                var aSmall = this.getByClass(aSlide, 'small')[0];
                var aSmallLi = aSmall.getElementsByTagName('li');
                this.now++;
                if (this.now > aSmallLi.length - 1) {
                    this.now = 0;
                }
                this.tab();
            },
            goPage() {
                this.$router.go(-1);
            },
            getByClass(aParent, sClass) {
                var aEle = aParent.getElementsByTagName('*');
                var aResult = [];
                for (var i = 0; i < aEle.length; i++) {
                    if (aEle[i].className == sClass) {
                        aResult.push(aEle[i])
                    }
                }
                return aResult;
            },
            getStyle(obj, name) {
                if (obj.currentStyle) {
                    return obj.currentStyle[name];
                }
                else {
                    return getComputedStyle(obj, false)[name];
                }
            },
            startMove(obj, attr, iTarget, fnEnd) {
                clearInterval(obj.timer);
                obj.timer = setInterval(() => {
                    var cur = 0;
                    if (attr == 'opacity') {
                        cur = Math.round((this.getStyle(obj, attr)) * 100);
                    } else {
                        cur = parseInt(this.getStyle(obj, attr))
                    }
                    var speed = (iTarget - cur) / 7;
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                    if (cur == iTarget) {
                        clearInterval(obj.timer);
                        if (fnEnd) fnEnd();
                    } else {
                        if (attr == 'opacity') {
                            obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
                            obj.style.opacity = (cur + speed) / 100;
                        } else {
                            obj.style[attr] = cur + speed + 'px';
                        }
                    }
                }, 30)
            },
            getSpuPropertyFn() {
                this.loadingShow = true;
                MyPost('/liquor-product/spu/getSpuProperty', {
                    id: this.$route.query.id
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.spuPropertyList = data.map((item, index, data) => {
                            item.selectVal = item.propertyValueBOS[0].id;
                            return item;
                        });
                        this.ids = data.map((item, index, data) => {
                            return item.propertyValueBOS[0].id;
                        });
                    } else {
                        this.$message.error(message);
                    }
                })
            },
            selchange(id, index) {
                this.ids.splice(index, 1, id);
            },
            tabClk(num) {
                this.tabShow = num
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .commodityPreview
        .return-line
            background #fff
            box-shadow 0px 0px 6px 0px rgba(174, 174, 174, 0.14)
            height 36px
            position relative
            padding-left 16px
            position fixed
            width 100%
            z-index 2
            span
                font-size 12px
                color #308BDE
                line-height 36px
                cursor pointer
        .add-mod-con
            padding 56px 30px 20px 36px
            overflow hidden
            background #fff
            .top-mod
                overflow hidden
            .slide
                width 370px
                float left
                overflow hidden
                .big-pic-con
                    width 368px
                    height 368px
                    border 1px solid #F0F0F0
                    img
                        width 100%
                        display block
                .small-pic-con
                    float left
                    overflow hidden
                    width 290px
                    margin-top 15px
                    height 50px
                .big
                    position relative
                    overflow hidden
                    left 0
                    top 0
                    li
                        float left
                        width 368px
                        img
                            width 100%
                            display block
                .prev
                    width 16px
                    height 16px
                    float left
                    margin 34px 10px 0 20px
                    display inline
                    cursor pointer
                .next
                    width 16px
                    height 16px
                    float left
                    margin 34px 0 0 0
                    display inline
                    cursor pointer
                .small
                    width 100%
                    position relative
                    li
                        float left
                        margin-right 5px
                        width 50px
                        height 48px
                        overflow hidden
                        border 1px solid #F0F0F0
                        cursor pointer
                        &:last-child
                            margin-right 0
                        img
                            width 100%
                            display block
                    .act-on
                        border 1px solid #C13A3C
            .desc-mod
                margin-left 30px
                display inline
                float left
                .protery-mod
                    overflow hidden
                    .protery-tip
                        display block
                        font-size 14px
                        color #333
                        line-height 30px
                        font-weight bold
                    .protery-cen
                        overflow hidden
                        .protery-box
                            overflow hidden
                            margin-top 10px
                            .box-tip
                                float left
                                font-size 14px
                                color #333
                                line-height 36px
                h5
                    color #505050
                    line-height 20px
                    padding 80px 0 30px 0
                    font-size 18px
                .desc-p
                    color #505050
                    line-height 26px
                    font-size 14px
                    padding-bottom 30px
                .desc-val
                    font-size #333
                    line-height 26px
                    padding-bottom 30px
                    font-size 20px
                    span
                        color #C13A3C
                .under-line
                    span
                        text-decoration line-through
            .tabs-mod
                width 100%
                overflow hidden
                height 26px
                margin-top 26px
                margin-bottom 20px
                span
                    float left
                    width 98px
                    height 24px
                    font-size 12px
                    color #333
                    text-align center
                    line-height 24px
                    cursor pointer
                    border 1px solid #E3E3E3
                    margin-right -1px
                .tab-on
                    color #fff
                    border 1px solid #C13A3C
                    background #C13A3C
            .tabs-con-mod
                overflow hidden
                .tabs-box
                    border-bottom 1px solid #f0f0f0
                    padding 10px 0
                    overflow hidden
                    .tabs-tips
                        float left
                        font-size 12px
                        color #333
                        line-height 30px
                        width 200px
                    ul
                        float left
                        li
                            font-size 12px
                            color #333
                            line-height 30px
                            overflow hidden
                            span
                                float left
                                width 100px
                                text-align right
                                margin-right 40px
                                display inline
                    &:last-child
                        border 0
</style>
