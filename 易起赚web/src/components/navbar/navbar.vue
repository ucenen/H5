<template>
    <div class="navbar" :style="'minHeight:' + $store.state.winHeight + 'px'"
         :class="$store.state.slideCls=='slideCls'?'slideClsNav':''">
        <ul class="nav-l" :style="'minHeight:' + $store.state.winHeight + 'px'">
            <li v-for="(item,index) in navList" :key="item" :class="item.name == $store.state.navTit ? 'nav-on' : ''"
                @click="navlistClk(item)">
                <img :src="item.smallIconUrl"/>
                <p class="nav-p">{{item.name}}</p>
                <div class="nav-chid-group" v-show="item.name == $store.state.navTit">
                    <div class="nav-child-box" v-for="(child,index1) in item.twoFunctionBoList" :key="index1">
                        <h3>{{child.title}}</h3>
                        <div class="nav-box-con" v-for="(children,index2) in child.functionMenuBoList" :key="index2"
                             :class="children.name == $store.state.navChildTit ? 'nav-box-on' : ''"
                             @click="navChildClk(children,index1,index2,child)">
                            <img :src="children.name == $store.state.navChildTit ? children.bigIconUrl : children.smallIconUrl"/>
                            <p>{{children.name}}</p>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <!--:class="breadList.length > 1 ? '' : 'noArrow'"-->
        <div class="tags-outer-scroll-con">
            <!--<el-scrollbar></el-scrollbar>-->
            <div class="bread-con" :style="{left: tagBodyLeft + 'px'}">
                <!--<div class="bread-group" v-bind:style="{width:screenWidthStr}" height="30px" arrow="always"-->
                     <!--indicator-position="none" :autoplay="false" ref="carousel">-->
                    <!--<div >-->
                        <!--<div class="bread-group-box">-->
                            <!--<p class="bread-tips" :class="kTitle == '首页' ? 'bread-tips-on' : ''"-->
                               <!--@click="backToFirster()">首页</p>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div v-for="(item,index) in breadList" :key="item" style="float: left">-->
                        <!--<div class="bread-group-box">-->
                            <!--<p class="bread-tips" :style="'zIndex:' + (g - countWidth)*-1"-->
                               <!--:class="k.title == $store.state.navChildTit ? 'bread-tips-on' : ''"-->
                               <!--v-for="(k,g) in item.list" :key="k" @click="breadClk(k)">-->
                                <!--{{k.title}}<i style="position: absolute;right: 5px;top: 8px;font-size: 16px "-->
                                              <!--class="el-icon-circle-close" v-if="k.code!='SY'"-->
                                              <!--@click.stop="delTit(index,g,k)"></i></p>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
                <div class="tags-view-container">
                    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
                        <router-link
                                v-for="(tag,index) in breadList[0].list"
                                ref="tag"
                                :class="isActive(tag,index)?'active':''"
                                :to="{ path: tag.url, query: {code:tag.code}}"
                                :key="tag.url"
                                tag="span"
                                class="tags-view-item"
                                @click.middle.native="closeSelectedTag(tag)"
                                @contextmenu.prevent.native="openMenu(tag,$event)">
                            {{ tag.title }}
                            <span v-if="tag.code!='SY'"  class="el-icon-close" @click.prevent.stop="delTit(index,tag)" />
                        </router-link>
                    </scroll-pane>
                    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
                        <!--<li @click="refreshSelectedTag(selectedTag)">{{ $t('tagsView.refresh') }}</li>-->
                        <!--<li @click="closeSelectedTag(selectedTag)">{{ $t('tagsView.close') }}</li>-->
                        <!--<li @click="closeOthersTags">{{ $t('tagsView.closeOthers') }}</li>-->
                        <!--<li @click="closeAllTags">{{ $t('tagsView.closeAll') }}</li>-->
                    </ul>
                </div>
            </div>
        </div>
        <transition name="fade">
            <div class="loading-container" v-show="loadingShow">
                <loading :loadingText="loadingText"></loading>
            </div>
        </transition>
    </div>
</template>

<script>
    import ScrollPane from '@/components/ScrollPane'
    import store from 'si-store'
    import {MyGet, MyPost} from 'common/js/request'
    import Loading from 'base/loading/loading'
    export default {
        name: 'navbar',
        components: {
            Loading,
            ScrollPane
        },
        data() {
            return {
                tagBodyLeft: 270,
                loadingShow: false,
                loadingText: '正在加载中...',
                winh: 0,
                kTitle: "",
                navList: [],
                breadList: [
                    {
                        list: []
                    }
                ],
                backToFirstBoolean: false,
                screenWidth: 1000,
                screenWidthStr: "",
                countWidth: 1,
                styleCarousel: {
                    width: 0
                },
                firstIndex:1,
            }
        },

        mounted() {
            let widthScreen = document.body.clientWidth;
            this.screenWidth = widthScreen - 320;
            this.screenWidthStr = this.screenWidth + "px";
            this.countWidth = parseInt(this.screenWidth / 131);
            window.onresize = () => {
                return (() => {
                    widthScreen = document.body.clientWidth;
                    this.screenWidth = widthScreen - 320;
                    this.screenWidthStr = this.screenWidth + "px";
                    this.countWidth = parseInt(this.screenWidth / 131);
                })();
            };
        },
        created() {

            this.navList = store.get('navBarList');
            store.get('breadTips') ? this.breadList = store.get('breadTips') : this.breadList = [
                {
                    list: []
                }
            ]

        },
        watch: {
            $route() {
                this.moveToCurrentTag()
            },
        },
        methods: {
            moveToCurrentTag() {
                const tags = this.$refs.tag
                this.$nextTick(() => {
                    for (const tag of tags) {
                        if (tag.to.path === this.$route.path) {
                            this.$refs.scrollPane.moveToTarget(tag)

                            // when query is different then update
                            // if (tag.to.fullPath !== this.$route.fullPath) {
                            //     this.$store.dispatch('updateVisitedView', this.$route)
                            // }

                            break
                        }
                    }
                })
            },
            openMenu(tag, e) {
                const menuMinWidth = 105
                const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
                const offsetWidth = this.$el.offsetWidth // container width
                const maxLeft = offsetWidth - menuMinWidth // left boundary
                const left = e.clientX - offsetLeft + 15 // 15: margin right

                if (left > maxLeft) {
                    this.left = maxLeft
                } else {
                    this.left = left
                }
                this.top = e.clientY

                this.visible = true
                this.selectedTag = tag
            },
            isActive(route,index) {
                return route.title ===  this.$store.state.navChildTit;
            },
            backToFirster() {
                this.kTitle = "首页";
                this.$store.state.navChildTit = "";
                this.$router.push({
                    path: "homePage",
                    query: {
                        redirect: "homePage"
                    }
                })
            },
            go(url) {
                store.remove('history_search');
                store.remove('history_page');
                this.$router.push({
                    path: url
                })
            },
            navlistClk(item) {
                this.$store.state.navTit = item.name;
            },
            navChildClk(child, index1, index2, childFather) {
                this.kTitle = "";

                if (this.breadList[this.breadList.length - 1]) {
                    let againNum = 0;
                    for (let i = 0; i < this.breadList.length; i++) {
                        for (let k = 0; k < this.breadList[i].list.length; k++) {
                            if (this.breadList[i].list[k].title == child.name) {
                                againNum = 1;
                            }
                        }
                    }
                    if (againNum == 0) {
                        // if (this.breadList[0].list.length >= this.countWidth - 1) {
                        //     this.$confirm("标签栏已满", '提示', {
                        //         confirmButtonText: '确定',
                        //         showCancelButton: false,
                        //         type: 'error'
                        //     }).then(() => {
                        //
                        //     }).catch(() => {
                        //
                        //     });
                        //     return
                        // }
                        // if (this.breadList[this.breadList.length - 1].list.length >= this.countWidth) {
                        // this.breadList = this.breadList.concat({
                        //     list: [
                        //         {
                        //             title: child.name,
                        //             url: this.gUrlGo(child.name),
                        //             code: child.code
                        //         }
                        //     ]
                        // })
                        // } else {
                        this.breadList[this.breadList.length - 1].list = this.breadList[this.breadList.length - 1].list.concat({
                            title: child.name,
                            url: this.gUrlGo(child.name),
                            code: child.code,
                        })
                        // }
                    }
                } else {
                    this.breadList[0] = {
                        list: [
                            {
                                title: child.name,
                                url: this.gUrlGo(child.name),
                                code: child.code
                            }
                        ]
                    }
                }
                this.$store.state.navChildTit = child.name;
                store.set('breadTips', this.breadList);
                this.$router.push({
                    path: this.gUrlGo(child.name),
                    query: {code: child.code}
                })
                let swiperNum = 0;
                for (let k = 0; k < this.breadList.length; k++) {
                    for (let j = 0; j < this.breadList[k].list.length; j++) {
                        if (this.breadList[k].list[j].title == child.name) {
                            swiperNum = k;
                        }
                    }
                }
                // setTimeout(()=>{
                //     this.$refs.carousel.setActiveItem(swiperNum)
                // },20)
            },
            delTit(g,k) {
                // this.breadList[index].list.splice(g, 1);
                this.fnDel(g,k);
            },
            fnDel(g,k) {
                try {
                    // if (this.breadList[index].list && this.breadList[index].list.length < this.countWidth) {
                    //     if (!this.breadList[index + 1]) {
                    //         if (this.breadList[this.breadList.length - 1].list.length == 0) {
                    //             this.breadList.pop();
                    //         }
                    //         return;
                    //     }
                    //     if (this.breadList[index + 1].list.length) {
                    //         this.breadList[index].list = this.breadList[index].list.concat(this.breadList[index + 1].list[0])
                    //         this.breadList[index + 1].list.shift();
                    //     }
                    // }
                    // if (this.breadList[index + 1].list.length == 0) {
                    //     this.breadList.splice(index + 1, 1);
                    // }
                    if (k.title == this.$store.state.navChildTit&&g>1) {
                        // if (g <= 0 && this.breadList[0].list.length > 1) {
                        //     this.$router.push({
                        //         path: this.gUrlGo(this.breadList[0].list[g + 1].title),
                        //         query: {code: this.breadList[0].list[g + 1].code}
                        //     })
                        // } else if (g <= 0 && this.breadList[0].list.length <= 1) {
                        //     // this.$router.push({
                        //     //     path: this.gUrlGo(this.breadList[0].list[g+1].title),
                        //     //     query:{code:this.breadList[0].list[g+1].code}
                        //     // })
                        // } else {
                        //     this.$router.push({
                        //         path: this.gUrlGo(this.breadList[0].list[g - 1].title),
                        //         query: {code: this.breadList[0].list[g - 1].code}
                        //     })
                        // }
                        this.$router.push({
                            path: this.gUrlGo(this.breadList[0].list[g - 1].title),
                            query: {code: this.breadList[0].list[g - 1].code}
                        })
                    }else if(g==1) {
                        this.$router.push({
                            path: "/homePage",
                            query: {code: this.breadList[0].list[g - 1].code}
                        })
                    }
                    this.breadList[0].list.splice(g, 1);
                    store.set('breadTips', this.breadList);
                    // index++;
                    // for (let i = 0; i < this.breadList.length; i++) {
                    //     this.fnDel(index, g);
                    // }
                } catch (err) {

                }
            },
            breadClk(item) {
                this.kTitle = "";
                this.$router.push({
                    path: this.gUrlGo(item.title),
                    query: {code: item.code}
                })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .navbar
        position fixed
        left 0
        top 60px
        background #EAEDF1 /*float left
        background #EAEDF1
        margin-right -253px*/
        width 270px
        /*position relative*/
        z-index 2
        overflow-y auto
        .nav-l
            width 135px
            height -moz-calc(100vh - 60px)
            height -webkit-calc(100vh - 60px)
            height calc(100vh - 60px)
            background #C13A3C
            float left
            position relative
            li
                background #c13a3c
                height 60px
                img
                    width 18px
                    height 18px
                    margin 21px 14px 0 16px
                    float left
                    cursor pointer
                .nav-p
                    font-size 14px
                    color #fff
                    line-height 60px
                    font-weight 550
                    float left
                    cursor pointer
                .nav-chid-group
                    position absolute
                    left 135px
                    top 0
                    width 135px
                    height -moz-calc(100vh - 60px)
                    height -webkit-calc(100vh - 60px)
                    height calc(100vh - 60px)
                    overflow-y auto
                    .nav-child-box
                        h3
                            line-height 44px
                            font-size 14px
                            color #C13A3C
                            font-weight bold
                            text-align center
                            border-bottom 1px solid #D5D5D5
                        .nav-box-con
                            height 60px
                            border-left 5px solid #EAEDF1
                            cursor pointer
                            img
                                width 18px
                                height 18px
                                margin 22px 5px 0 26px
                                display inline
                                float left
                            p
                                font-size 12px
                                color #666
                                line-height 60px
                                float left
                                font-weight 550
                        .nav-box-on
                            border-left 5px solid #308BDE
                            background #fff url("./icon-bac.png") no-repeat right center
                            background-size 10px 20px
                            p
                                color #308BDE
            .nav-on
                background #AE0003 url("./act-icon.png") no-repeat right center
                background-size 9px 10px

    .tags-outer-scroll-con
        width -moz-calc(100vw - 270px)
        width -webkit-calc(100vw - 270px)
        width calc(100vw - 270px)
        position fixed
        left 270px
        top 10
        z-index 2
        overflow hidden
        .tags-view-container {
            height: 45px;
            width: 100%;
            background: #fff;
            line-height: 45px
            border-bottom: 1px solid #D5D5D5
            .tags-view-wrapper {
                padding-top: 8px
                .tags-view-item {
                    cursor pointer
                    font-size 12px
                    text-align center
                    color #333
                    line-height 30px
                    margin-right -50px
                    border-bottom 121px solid rgba(231, 235, 241, 1)
                    border-left 30px solid transparent
                    border-right 30px solid transparent
                    height 0
                    width 121px
                    display: inline-block;
                    position relative
                    /*float left*/
                    &:first-of-type {
                        /*margin-left: 15px;*/
                    }
                    &:last-of-type {
                        margin-right: 15px;
                    }
                    &.active {
                        color: #fff;
                        border-bottom 121px solid #C13A3C
                    }
                }
            }
            .contextmenu {
                margin: 0;
                background: #fff;
                z-index: 100;
                position: absolute;
                list-style-type: none;
                padding: 5px 0;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 400;
                color: #333;
                box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
                li {
                    margin: 0;
                    padding: 7px 16px;
                    cursor: pointer;
                    &:hover {
                        background: #eee;
                    }
                }
            }
            .tags-view-item {
                .el-icon-close {
                    width: 16px;
                    height: 16px;
                    font-size 12px
                    vertical-align: 2px;
                    border-radius: 50%;
                    text-align: center;
                    margin-left 2px
                    transition: all .3s cubic-bezier(.645, .045, .355, 1);
                    transform-origin: 100% 50%;
                    &:before {
                        transform: scale(.6);
                        display: inline-block;
                        vertical-align: -3px;
                    }
                    &:hover {
                        background-color: #b4bccc;
                        color: #fff;
                    }
                }
            }
        }
        .bread-con
            height 45px
            border-bottom 1px solid #D5D5D5
            width 100%
            /*overflow auto*/
            /*overflow visible*/
            white-space nowrap
            transition left .3s ease
            background #F2F4F7
            .el-carousel__arrow--left
                width 22px
                height 22px
                background url("./left_icon.png") no-repeat 0 0
                background-size contain
                left 10px
                top 14px
            .el-carousel__arrow--right
                width 22px
                height 22px
                background url("./right_icon.png") no-repeat 0 0
                background-size contain
                right 73px
                top 14px
            .bread-group
                float left
                margin-top 15px
                /*display inline*/
                /*width 1052px*/
                position relative
                overflow hidden
                display flex
                flex-direction row
                height 30px
            .bread-group-box
                height 30px
                display flex
                flex-direction row
                /*padding-left 24px*/
                /*padding-right 24px*/
                .bread-tips
                    cursor pointer
                    font-size 12px
                    text-align center
                    color #333
                    line-height 30px
                    margin-right -50px
                    border-bottom 121px solid rgba(231, 235, 241, 1)
                    border-left 30px solid transparent
                    border-right 30px solid transparent
                    height 0
                    width 121px
                    /*float left*/
                    position relative
                    em
                        position absolute
                        top 10px
                        right 14px
                        width 1px
                        height 10px
                        background #333
                        -webkit-transform rotate(45deg)
                        -moz-transform rotate(45deg)
                        -o-transform rotate(45deg)
                        -ms-transform rotate(45deg)
                        transform rotate(45deg)
                        display block
                        &:after
                            content ""
                            position absolute
                            top 0
                            left 0
                            width 1px
                            height 10px
                            background #333
                            -webkit-transform rotate(270deg)
                            -moz-transform rotate(270deg)
                            -o-transform rotate(270deg)
                            -ms-transform rotate(270deg)
                            transform rotate(270deg)
                .bread-tips-on
                    color #fff
                    border-bottom 121px solid #C13A3C
                    em
                        background #fff
                        &:after
                            background #fff
        .noArrow
            .el-carousel__arrow--left
                display none
            .el-carousel__arrow--right
                display none

    .slideClsNav
        margin-right 0
        width 0
</style>
