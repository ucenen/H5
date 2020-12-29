<template>
    <div class="topbar" :style="{zIndex: zIndexNum}" :class="$store.state.slideCls">
        <!--:style="{minHeight:winh+'px'}"-->
        <div class="top-l">
            <img src="./logo.png"/>
            <p>易齐赚后台系统</p>
        </div>
        <div class="top-r">
            <ul class="home-group">
                <!--<li>-->
                    <!--<img src="./icon-01.png"/>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<el-dropdown>-->
                        <!--<img src="./icon-02.png"/>-->
                        <!--<el-dropdown-menu slot="dropdown">-->
                            <!--<div class="menu-box">-->
                                <!--<h3 class="menu-title">常用菜单</h3>-->
                                <!--<div class="menu-cen">-->
                                    <!--<span>商品管理</span>-->
                                    <!--<span>商品属性</span>-->
                                    <!--<span>商品分类</span>-->
                                <!--</div>-->
                                <!--<div class="menu-cen">-->
                                    <!--<span>商品品牌</span>-->
                                    <!--<span>SKU管理</span>-->
                                    <!--<span>字典维护</span>-->
                                <!--</div>-->
                                <!--<div class="menu-cen">-->
                                    <!--<span>用户管理</span>-->
                                    <!--<span>系统设置</span>-->
                                    <!--<span>角色维护</span>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</el-dropdown-menu>-->
                    <!--</el-dropdown>-->
                <!--</li>-->
              <!--  <li>
                    <el-dropdown>
                        <el-badge :value="2" :max="99" class="item">
                            <img src="./icon-03.png"/>
                        </el-badge>
                        <el-dropdown-menu slot="dropdown">
                            <div class="menu-box">
                                <h3 class="menu-title">系统提示</h3>
                                <div class="sys-box">
                                    <p>待收货单</p>
                                    <span>（10）</span>
                                </div>
                                <div class="sys-box">
                                    <p>待入库单</p>
                                    <span>（10）</span>
                                </div>
                                <div class="sys-box">
                                    <p>待出库单</p>
                                    <span>（10）</span>
                                </div>
                                <div class="sys-box">
                                    <p>待发货单</p>
                                    <span>（10）</span>
                                </div>
                            </div>
                        </el-dropdown-menu>
                    </el-dropdown>
                </li> -->
                <li @click="signOutClk">
                    <img src="./icon-04.png"/>
                </li>
            </ul>
            <div class="people-group">
                <el-dropdown>
                    <div>
                        <img src="./default_person.png"/>
                        <p>{{userName}}<em></em></p>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <div class="menu-box">
                            <h3 class="menu-title">账户信息<span @click="goAccount">账户设置</span></h3>
                            <!-- <ul class="account-con">
                                <li>
                                    <i></i>
                                    <p>所在部门：<span>技术部</span></p>
                                </li>
                                <li>
                                    <i></i>
                                    <p>本次登录：<span>{{loginTime}}</span></p>
                                </li>
                                <li>
                                    <i></i>
                                    <p>登录地区：<span>上海市奉贤区 (IP：183.14.135.1)</span></p>
                                </li>
                                <li>
                                    <i></i>
                                    <p>上次登录：<span>2019-11-25 14:36:21</span></p>
                                </li>
                            </ul> -->
                        </div>
                    </el-dropdown-menu>
                </el-dropdown>

            </div>
        </div>
        <!--loading-->
        <transition name="fade">
            <div class="loading-container" v-show="loadingShow">
                <loading :loadingText="loadingText"></loading>
            </div>
        </transition>
        <el-dialog
                title="退出确认"
                :visible.sync="loginShow"
                width="30%"
                :close-on-click-modal="false"
                :close-on-press-escape="false">
            <span>确定要退出登录吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="signOutBtnClk">取 消</el-button>
                <el-button size="small" type="primary" @click="signOutBtnClkFn">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import store from 'si-store'
    import {MyGet, MyPost} from 'common/js/request'
    import Loading from 'base/loading/loading'

    export default {
        name: 'topbar',
        components: {
            Loading
        },
        data() {
            return {
                user_con: {},
                loadingShow: false,
                loadingText: '正在加载中...',
                loginShow: false,
                zIndexNum: 3,
                userName:"",
                loginTime:"",
            }
        },
        created() {
            this.loginTime=store.get("loginTime");
            this.userName=store.get("myname");
            /*if(store.get('userInf')){
              this.user_con = store.get('userInf');
            }*/
        },
        methods: {
            handleClose(e) {
                this.login_show = false;
            },
            login_clk() {
                this.login_show = !this.login_show;
            },
            slide_clk() {
                if (this.$store.state.slideCls == '') {
                    this.$store.state.slideCls = 'slideCls';
                } else {
                    this.$store.state.slideCls = '';
                }
            },
            loginout_clk() {
                this.loadingShow = true;
                MyPost('/fast-sys/api/login/logout', {
                    username: this.user_con.userName
                }).then((data) => {
                    this.loadingShow = false;
                    if (data.code == '0') {
                        this.$message({
                            message: '退出成功',
                            type: 'success'
                        });
                        this.dialogVisible = false;
                        this.$router.push({
                            path: '/login'
                        });
                    } else {
                        this.$message.error(data.message);
                    }
                })
            },
            password_clk() {
                if (this.password == '') {
                    this.$message.error('请输入旧密码');
                    return
                }
                if (this.newPassword == '') {
                    this.$message.error('请输入新密码');
                    return
                }
                if (this.newPassword.length < 6 && this.newPassword.length > 20) {
                    this.$message.error('密码长度应为6-20位');
                    return
                }
                if (this.againNewPassword == '') {
                    this.$message.error('请再次输入新密码');
                    return
                }
                if (this.newPassword != this.againNewPassword) {
                    this.$message.error('两次输入的密码不一致');
                    return
                }
                this.loadingShow = true;
                MyPost('/fast-sys/api/login/modifyPassword', {
                    username: this.user_con.userName,
                    password: this.password,
                    newPassword: this.againNewPassword
                }).then((data) => {
                    this.loadingShow = false;
                    if (data.code == '0') {
                        this.$message({
                            message: '修改密码成功',
                            type: 'success'
                        });
                        this.centerDialogVisible = false;
                    } else {
                        this.$message.error(data.message);
                    }
                })
            },
            signOutClk() {
                this.zIndexNum = 5000;
                this.loginShow = true;
            },
            signOutBtnClk() {
                this.zIndexNum = 2;
                this.loginShow = false;
            },
            signOutBtnClkFn(){
                this.zIndexNum = 2;
                this.loginShow = false;
                store.remove('tokenVal');
                this.$router.push({
                    path: '/login'
                })
            },
            goAccount() {
                this.$router.push({
                    path: '/accountSet'
                })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .menu-box
        width 350px
        height 190px
        .menu-title
            color #333
            line-height 40px
            height 40px
            font-size 14px
            margin-top -10px
            padding-left 12px
            border-bottom 1px solid #EEEEEE
            span
                font-size 14px
                color #308BDE
                margin-right 12px
                cursor pointer
                float right
        .menu-cen
            display flex
            justify-content center
            span
                font-size 12px
                line-height 44px
                flex 1
                text-align center
                cursor pointer
                color #333
                &:hover
                    color #308BDE
        .sys-box
            overflow hidden
            height 28px
            padding 0 42px 0 30px
            border-bottom 1px solid #EEEEEE
            font-size 12px
            color #333
            line-height 28px
            cursor pointer
            &:last-child
                border 0
            &:hover
                p, span
                    color #308BDE
            p
                float left
            span
                float right
        .account-con
            padding 14px 0 0 20px
            li
                height 14px
                line-height 14px
                font-size 12px
                color #999
                margin-bottom 16px
                i
                    float left
                    width 4px
                    height 4px
                    border-radius 50%
                    background #308BDE
                    margin 6px 8px 0 0
                    display inline
                span
                    color #333

    .topbar
        width 100vw
        background #fff
        height 60px
        position fixed
        box-shadow -2px 3px 5px 0px rgba(174, 174, 174, 0.14)
        left 0
        top 0
        z-index 3
        .top-l
            float left
            margin-left 27px
            display inline
            img
                float left
                width 29px
                height 35px
                margin-top 13px
                display inline
            p
                float left
                margin-left 12px
                display inline
                font-weight bold
                line-height 60px
                color rgba(193, 58, 60, 1)
                font-size 16px
        .top-r
            margin-right 33px
            display inline
            float right
            .people-group
                float right
                display inline
                height 39px
                margin-top 11px
                margin-right 46px
                img
                    float left
                    width 38.5px
                    height 38.5px
                    border-radius 38.5px
                    overflow hidden
                    margin-right 12px
                    display inline
                    cursor pointer
                p
                    float left
                    font-size 14px
                    color #333
                    line-height 39px
                    font-weight bold
                    cursor pointer
                    em
                        display inline-block
                        margin-left 7px
                        width 6px
                        height 4px
                        background url("./arrow.png") no-repeat 0 0
                        background-size contain
            .home-group
                margin-top 20px
                height 20px
                float right
                li
                    width 21px
                    height 21px
                    float left
                    padding-right 15px
                    border-right 1px solid #e2e2e2
                    margin-right 15px
                    display inline
                    &:last-child
                        margin-right 0
                        border 0
                    img
                        cursor pointer
                        width 20px
                        height 20px
                        float left
                    .item
                        cursor pointer
                        .el-badge__content
                            background #c13a3c
</style>
