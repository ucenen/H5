<template>
    <div class="login">
        <div class="loginmod" @keyup.enter="gohome">
            <div class="login_r">
                <img class="logo-img" src="./logo.png"/>
                <h3>易快赚平台系统</h3>
                <div class="login_box">
                    <i class="icon1"></i>
                    <input type="text" v-model="username" placeholder="输入账户"/>
                </div>
                <div class="login_box">
                    <i class="icon2"></i>
                    <input type="password" v-model="password" placeholder="输入密码"/>
                </div>
                <div class="login_box login_css">
                    <input type="text" v-model="codeValue" placeholder="输入验证码"/>
                    <span class="img-btn" @click="ewm_fn"></span>
                    <img :src="codeImg" alt="图片验证码"/>
                </div>
                <p class="login_btn" @click="gohome">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</p>
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

    export default {
        name: 'login',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                loadingShow: false,
                loadingText: '正在加载中...',
                codeId: '',//图片验证码
                codeImg: '',//验证码图片
                codeValue: '',//输入验证码
                username: '',//用户名
                password: '',//密码
                user_con: {}
            }
        },
        created() {
			//获取验证码
            this.ewm_fn();
        },
        methods: {
            ewm_fn() {
                this.codeImg = "/yl-ms-platform/login/checkNumber?v=" + Math.random()
                // this.loadingShow = true;
                // MyGet('/yl-ms-platform/login/checkNumber?v=' + Math.random(), {
                //
                // }).then((res) => {
                //     console.log(">>>>>>>:" +res)
                //
                // })
                // this.codeImg="/yl-ms-platform/login/checkNumber?v=" + Math.random()
                // MyGet('/fast-sys/api/login/getImageCode?v=' + Math.random()).then((data) => {
                //     this.loadingShow = false;
                //     if (data.code == '0') {
                //         this.codeId = data.image.codeId;
                //         this.codeImg = data.image.data;
                //     } else {
                //         this.$message.error(data.message);
                //     }
                // })
            },
            gohome() {
                if (this.username == '') {
                    this.$message.error('请输入账号');
                    return
                }
                if (this.password == '') {
                    this.$message.error('请输入密码');
                    return
                }
                if (this.codeValue == '') {
                    this.$message.error('请输入验证码');
                    return
                }
                // this.loadingShow = true;
				// let breadList = [{
				//        list: [
				//            {
				//                title: "首页",
				//                url: "/homePage",
				//                code: "SY"
				//            }
				//        ]
				//    }
				// ]
				// let data=[
				// 	{
				// 		smallIconUrl:"https://minip.cndfmg.com:83/beauty/a9.png",
				// 		name:"会员管理",
				// 		twoFunctionBoList:[{
				// 			title:"分类" ,
				// 			functionMenuBoList:[
				// 				{
				// 					name:"会员管理",
				// 				},
				// 				{
				// 					name:"带货返佣设置",
				// 				}
				// 			]
				// 		},
							
				// 		]
				// 	},
				// 	{
				// 		smallIconUrl:"https://minip.cndfmg.com:83/beauty/a9.png",
				// 		name:"教学管理",
				// 		twoFunctionBoList:[{
				// 			title: "分类" ,
				// 			functionMenuBoList:[
				// 				    {
				// 						name:"教学视频",
				// 					},
				// 					{
				// 						name:"教学分类",
				// 					},
				// 					{
				// 						name:"教程级别",
				// 					}
				// 				],
				// 				}
				// 			]
						
							
				// 	},
				// 	{
				// 		smallIconUrl:"https://minip.cndfmg.com:83/beauty/a9.png",
				// 		name:"广告管理",
				// 		twoFunctionBoList:[{
				// 			title: "分类" ,
				// 			functionMenuBoList:[
				// 				    {
				// 						name:"广告管理",
				// 					},
				// 					{
				// 						name:"提现审核",
				// 					},
				// 					{
				// 						name:"直播链接",
				// 					}
				// 				],
				// 				}
				// 			]
						
							
				// 	},
				// ]
				// store.set('breadTips',breadList);
				// store.set('navBarList', data);
				// store.set("loginTime", this.checkTime(new Date()));
				// store.set("myname", this.username);
				// this.$router.push({
				//     path: "/homePage",//商品模板
				//     query:{code:"SY"}
				// });
                MyPost('/yl-ms-platform/login/checkLogin', {
                    account: this.username,
                    password: this.checkMd5(this.password),
                    loginVerificationCode: this.codeValue
                }).then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        store.set('tokenVal', data);
                        store.remove('breadTips');
						
                        this.getLeftFunctionListFn();
                    } else {
                        this.ewm_fn();
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

            getLeftFunctionListFn() {
                this.loadingShow = true;
                MyGet('/yl-ms-platform/functionApi/getLeftFunctionList').then((res) => {
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        if (this.checkNull(data)) {
                            this.$confirm("账号无权限", '提示', {
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
                        for (let k = 0; k < data.length; k++) {
                            for (let i = 0; i < data[k].twoFunctionBoList.length; i++) {
                                for (let j = 0; j < data[k].twoFunctionBoList[i].functionMenuBoList.length; j++) {
                                    let fileName = data[k].twoFunctionBoList[i].functionMenuBoList[j].smallIconUrl.lastIndexOf("/");//取到文件名开始到最后一个点的长度
                                    let fileNameLength = data[k].twoFunctionBoList[i].functionMenuBoList[j].smallIconUrl.length;//取到文件名长度
                                    let fileStr = data[k].twoFunctionBoList[i].functionMenuBoList[j].smallIconUrl.substring(0, fileName + 1);
                                    let fileFormat = data[k].twoFunctionBoList[i].functionMenuBoList[j].smallIconUrl.substring(fileName + 1, fileNameLength - 4);//截
                                    let fileFormatStr = fileFormat + "-blue.png"
                                    data[k].twoFunctionBoList[i].functionMenuBoList[j].bigIconUrl = fileStr + fileFormatStr;
                                }
                            }
                        }
                    let breadList = [{
                           list: [
                               {
                                   title: "首页",
                                   url: "/homePage",
                                   code: "SY"
                               }
                           ]
                       }
                    ]


                        store.set('navBarList', data);
                        store.set("loginTime", this.checkTime(new Date()));
                        store.set("myname", this.username);
                        store.set('breadTips',breadList);
                        this.$router.push({
                            path: "/homePage",//商品模板
                            query:{code:"SY"}
                        });
                        // this.$router.push({
                        //     path: '/commodityList'//商品模板
                        // });
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
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .login
        position absolute
        width 100%
        height 100%
        left 0
        top 0
        background url("./logo_back.png") no-repeat center center
        background-size cover
        .loginmod
            position absolute
            /*top 50%*/
            /*left 50%*/
            width 407px
            right 10%
            top 14%
            /*opacity 0.2*/
            background rgba(0, 0, 0, 0.2)
            /*opacity 0.2*/
            border-radius 10px
            /*background url("./login_img.png") no-repeat 0 0*/
            /*background-size 874px 606px*/
            //margin -303px 0 0 -437px
            height 504px
            .login_r
                width 100%
                height 100%
                background rgba(243, 248, 254, 0.6)
                display flex
                flex-direction column
                border-radius 10px
                align-items center
                /*padding 55px*/
                /*padding-top  72px*/
                .logo-img
                    /*display block*/
                    width 42px
                    height 56px
                    margin 8% auto 5%

                /*margin 72px auto 30px auto*/
                h3
                    color #C13A3C
                    line-height 30px
                    font-weight bold
                    /*margin-bottom 46px*/
                    margin-bottom 3%
                    font-size 18px
                    text-align center
                .login_box
                    height 50px
                    overflow hidden
                    background #FFFFFF
                    border-radius 6px
                    width 76%
                    margin 4% 12%
                    i
                        width 16px
                        height 22px
                        display inline
                        float left
                        margin 15px 22px 0 24px
                    .icon1
                        background url("./icon1.png") no-repeat center center
                        background-size contain
                    .icon2
                        background url("./icon2.png") no-repeat center center
                        background-size contain
                    input
                        height 24px
                        line-height 24px
                        outline none
                        font-size 14px
                        font-family "Microsoft Yahei", "Arial"
                        /*width 260px*/
                        float left
                        color #333
                        margin-top 13px
                        background none
                    ::-moz-placeholder
                        color #B6C2CE
                    ::-webkit-input-placeholder
                        color #B6C2CE
                    img
                        width 24%
                        height 48px
                        display inline
                        float right

                    .img-btn
                        float right
                        width 22px
                        height 24px
                        background url("./icon3.png") no-repeat 0 0
                        background-size 22px 24px
                        margin 14px 0 0 18px
                        display inline
                        cursor pointer
                .login_css
                    margin-bottom 8%
                    overflow hidden
                    background none
                    border-radius 0
                    input
                        background #FFFFFF
                        border-radius 6px
                        width 60%
                        height 50px
                        margin-top 0
                        text-indent 30px
                        line-height 54px
                .login_btn
                    color #fff
                    text-align center
                    width 76%
                    height 48px
                    line-height 48px
                    background #C13A3C
                    box-shadow 0px 6px 12px -4px #7A64F0
                    border-radius 5px
                    cursor pointer
                    margin 0 auto
                    font-size 18px

        .footbara
            position fixed
            bottom 0
            right 0
            width 100%
            height 30px
            background #f0f0f0
            z-index 3
            box-shadow 0px 0px 6px 0px rgba(174, 174, 174, 0.14)
            p
                color #333
                line-height 30px
                text-align center
                font-size 12px
</style>
