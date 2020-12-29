<template>
    <div class="systemSet">
        <div class="nav-top">

            <div class="nav-box" @click="saveAll()">
                <img src="static/img/save.png"/>
                <p>保存</p>
            </div>
            <div class="nav-box">
                <img src="./icon-04.png" @click="getSystemSet()"/>
                <p>刷新</p>
            </div>
        </div>
        <div class="infor-mod">
            <div class="infor-tab">
                <span :class="tabShow == 1 ? 'tab-on' : ''" @click="tabClk(1)">平台信息</span>
                <span :class="tabShow == 2 ? 'tab-on' : ''" @click="tabClk(2)">支付方式</span>
                <span :class="tabShow == 3 ? 'tab-on' : ''" @click="tabClk(3)">库存管理</span>
                <span :class="tabShow == 4 ? 'tab-on' : ''" @click="tabClk(4)">消费收银</span>
                <span :class="tabShow == 5 ? 'tab-on' : ''" @click="tabClk(5)">系统使用习惯</span>
                <span :class="tabShow == 6 ? 'tab-on' : ''" @click="tabClk(6)">小票打印</span>
                <span :class="tabShow == 7 ? 'tab-on' : ''" @click="tabClk(7)">消息提醒</span>
                <span :class="tabShow == 8 ? 'tab-on' : ''" @click="tabClk(8)">系统相关</span>
            </div>
            <div class="tab-con1" v-show="tabShow == 1" v-for="(item ,index) in platformList">
                <div class="add-box" v-if="item.dataKey=='stringflyName'">
                    <span class="add-tip">* {{item.dataMemo}}：</span>
                    <el-input maxlength="50" size="small" class="add-ipt" v-model="item.dataValue"></el-input>
                </div>
                <div class="add-box" v-if="item.dataKey=='stringflyTitle'">
                    <span class="add-tip">* {{item.dataMemo}}：</span>
                    <el-input maxlength="50" size="small" class="add-ipt" v-model="item.dataValue"></el-input>
                </div>
                <div class="add-box" v-if="item.dataKey=='memo'">
                    <span class="add-tip">* {{item.dataMemo}}：</span>
                    <el-input maxlength="50" size="small" class="add-ipt" v-model="item.dataValue"></el-input>
                </div>
                <div class="add-box" v-if="item.dataKey=='icon'">
                    <span class="add-tip">* 平台LOGO：</span>
                    <el-upload
                            class="upload-demo"
                            action="/yl-ms-platform/imageFileApi/upload"
                            :headers="headers"
                            accept="image/jpeg,image/png"
                            :on-success="uploadPlatformSuccess"
                            :on-error="uploadError"
                            limit="1"
                            list-type="picture"
                            :file-list="fileList">
                        <el-button size="small" type="primary">选择上传文件</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png格式文件，文件不能超过50kb</div>
                    </el-upload>
                </div>
                <div class="add-box" v-if="item.dataKey=='antistop'">
                    <span class="add-tip">* {{item.dataMemo}}：</span>
                    <el-input maxlength="50" size="small" class="add-ipt" v-model="item.dataValue"></el-input>
                </div>
                <div class="add-box" v-if="item.dataKey=='hotLine'">
                    <span class="add-tip">* {{item.dataMemo}}：</span>
                    <el-input maxlength="50" size="small" class="add-ipt" v-model="item.dataValue"></el-input>
                </div>
                <div class="add-box" v-if="item.dataKey=='email'">
                    <span class="add-tip">* {{item.dataMemo}}：</span>
                    <el-input maxlength="50" size="small" class="add-ipt" v-model="item.dataValue"></el-input>
                </div>

                <div class="add-box" v-if="item.dataKey=='order'">
                    <span class="add-tip">排序：</span>
                    <div class="order">
                        <el-input maxlength="50" class="add-sort" type="textarea"
                                  :autosize="{ minRows: 8, maxRows: 8}"
                                  placeholder="请输入内容" v-model="item.dataValue"></el-input>
                        <div>该信息将在用户中心欢迎页面显示</div>
                    </div>
                </div>

            </div>
            <div class="tab-con3" v-show="tabShow == 2">
                <table class="tab3">

                    <tr style="background: #FAFAFC">
                        <td>支付方式类别代码</td>
                        <td>支付方式类别名称</td>
                        <td>是否计入现金收入</td>
                        <td>积分折算比率</td>
                    </tr>
                    <tr>
                        <td>ZFB</td>
                        <td>
                            支付宝支付
                        </td>
                        <template v-for="(item,index) in payList">
                            <td v-if="item.dataKey=='isZFBCountIn'">

                                <el-radio-group v-model="item.dataValue">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="2">否</el-radio>
                                </el-radio-group>
                            </td>
                            <td v-if="item.dataKey=='ZFBConvert'">
                                <el-input maxlength="50" size="small" type="tel"  @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" v-model="item.dataValue"
                                ></el-input>
                            </td>
                        </template>
                    </tr>
                    <tr>
                        <td>WX</td>
                        <td>
                            微信支付
                        </td>
                        <template v-for="(item,index) in payList">
                            <td v-if="item.dataKey=='isWXCountIn'">

                                <el-radio-group v-model="item.dataValue">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="2">否</el-radio>
                                </el-radio-group>
                            </td>
                            <td v-if="item.dataKey=='WXConvert'">
                                <el-input maxlength="50" size="small" type="tel"  @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" v-model="item.dataValue"
                                ></el-input>
                            </td>
                        </template>
                    </tr>
                    <tr>
                        <td>XJ</td>
                        <td>
                            现金支付
                        </td>
                        <template v-for="(item,index) in payList">
                            <td v-if="item.dataKey=='isXJCountIn'">

                                <el-radio-group v-model="item.dataValue">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="2">否</el-radio>
                                </el-radio-group>
                            </td>
                            <td v-if="item.dataKey=='XJConvert'">
                                <el-input maxlength="50" size="small" type="tel"  @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" v-model="item.dataValue"
                                ></el-input>
                            </td>
                        </template>
                    </tr>
                    <tr>
                        <td>CZ</td>
                        <td>
                            储值帐户
                        </td>
                        <template v-for="(item,index) in payList">
                            <td v-if="item.dataKey=='isCZCountIn'">

                                <el-radio-group v-model="item.dataValue">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="2">否</el-radio>
                                </el-radio-group>
                            </td>
                            <td v-if="item.dataKey=='CZConvert'">
                                <el-input maxlength="50" size="small" type="tel"  @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" v-model="item.dataValue"
                                ></el-input>
                            </td>
                        </template>
                    </tr>
                    <tr>
                        <td>JF</td>
                        <td>
                            积分支付
                        </td>
                        <template v-for="(item,index) in payList">
                            <td v-if="item.dataKey=='isJFCountIn'">

                                <el-radio-group v-model="item.dataValue">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="2">否</el-radio>
                                </el-radio-group>
                            </td>
                            <td v-if="item.dataKey=='JFConvert'">
                                <el-input maxlength="50" size="small" type="tel"  @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" v-model="item.dataValue"
                                ></el-input>
                            </td>
                        </template>
                    </tr>
                    <tr>
                        <td>DY</td>
                        <td>
                            抵用券
                        </td>
                        <template v-for="(item,index) in payList">
                            <td v-if="item.dataKey=='isDYCountIn'">

                                <el-radio-group v-model="item.dataValue">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="2">否</el-radio>
                                </el-radio-group>
                            </td>
                            <td v-if="item.dataKey=='DYConvert'">
                                <el-input maxlength="50" size="small" type="tel"  @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" v-model="item.dataValue"
                                ></el-input>
                            </td>
                        </template>
                    </tr>
                </table>
            </div>
            <div class="tab-con3" v-show="tabShow == 3">
                <table class="tab3" v-for="(item,index) in stockList" :key="index">
                    <tr>
                        <td style="background: #FAFAFC;width: 250px">{{item.dataMemo}}</td>
                        <td style="width: 400px">
                            <el-radio-group v-if="item.dataKey=='priceInRadio'" v-model="item.dataValue">
                                <el-radio label="1">进货价</el-radio>
                                <el-radio label="2">标准价</el-radio>
                                <el-radio label="3">销售成本</el-radio>
                            </el-radio-group>
                            <el-radio-group v-if="item.dataKey=='priceOutRadio'" v-model="item.dataValue">
                                <el-radio label="1">进货价</el-radio>
                                <el-radio label="2">标准价</el-radio>
                                <el-radio label="3">销售成本</el-radio>
                            </el-radio-group>
                            <el-radio-group v-if="item.dataKey=='isStop'" v-model="item.dataValue">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="2">否</el-radio>
                            </el-radio-group>
                            <el-radio-group v-if="item.dataKey=='isDeduction'" v-model="item.dataValue">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="2">否</el-radio>
                            </el-radio-group>
                            <el-select v-if="item.dataKey=='warehouse'" v-model="item.dataValue" placeholder="请选择">
                                <el-option
                                        v-for="items in warehouseList"
                                        :key="items.value"
                                        :label="items.label"
                                        :value="items.value">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="tab-con3" v-show="tabShow == 4">
                <table class="tab3" v-for="(item,index) in receiveList" :key="index">
                    <tr>
                        <td style="background: #FAFAFC;width: 250px">{{item.dataMemo}}</td>
                        <td style="width: 500px">
                            <el-radio-group v-if="item.dataKey=='isShowInfo'" v-model="item.dataValue">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="2">否</el-radio>
                            </el-radio-group>
                            <el-radio-group v-if="item.dataKey=='isOpenCheck'" v-model="item.dataValue">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="2">否</el-radio>
                            </el-radio-group>
                            <el-input maxlength="50" v-if="item.dataKey=='prefix'" size="small" v-model="item.dataValue"
                            ></el-input>
                            <el-input maxlength="50" v-if="item.dataKey=='Suffix'" size="small" v-model="item.dataValue"
                            ></el-input>
                            <el-radio-group v-if="item.dataKey=='roundingMode'" v-model="item.dataValue">
                                <el-radio label="1">不启用</el-radio>
                                <el-radio label="2">四舍五入模式</el-radio>
                                <el-radio label="3">向下取整模式</el-radio>
                                <el-radio label="4">向上取整模式</el-radio>
                            </el-radio-group>
                            <el-radio-group v-if="item.dataKey=='isCreate'" v-model="item.dataValue">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="2">否</el-radio>
                            </el-radio-group>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="tab-con3" v-show="tabShow == 5">
                <table class="tab3" v-for="(item,index) in usageList" :key="index">
                    <tr>
                        <td style="background: #FAFAFC;width: 250px">{{item.dataMemo}}</td>
                        <td style="width: 500px">
                            <el-radio-group v-if="item.dataKey=='isCreateSelf'" v-model="item.dataValue">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="2">否</el-radio>
                            </el-radio-group>
                            <el-radio-group v-if="item.dataKey=='isReviewSelf'" v-model="item.dataValue">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="2">否</el-radio>
                            </el-radio-group>
                            <el-radio-group v-if="item.dataKey=='modifyMode'" v-model="item.dataValue">
                                <el-radio label="1">直接修改模式</el-radio>
                                <el-radio label="2">反冲模式</el-radio>
                            </el-radio-group>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="tab-con3" v-show="tabShow == 6">
                <table class="tab3">
                    <template v-for="(item,index) in printList">
                        <tr>
                            <td style="background: #FAFAFC;width: 250px">{{item.dataMemo}}</td>
                            <td style="width: 400px">
                                <el-radio-group v-if="item.dataKey=='isPrintSelf'" v-model="item.dataValue">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="2">否</el-radio>
                                </el-radio-group>
                                <el-input maxlength="50" v-if="item.dataKey=='welcome'" size="small" v-model="item.dataValue"
                                ></el-input>
                                <el-radio-group v-if="item.dataKey=='isShowWelcome'" v-model="item.dataValue">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="2">否</el-radio>
                                </el-radio-group>
                                <el-select v-if="item.dataKey=='fontSelect'" v-model="item.dataValue" placeholder="请选择">
                                    <el-option
                                            v-for="items in fontList"
                                            :key="items.value"
                                            :label="items.label"
                                            :value="items.value">
                                    </el-option>
                                </el-select>
                                <el-input maxlength="50" v-if="item.dataKey=='titleFontSize'" min="0" type="tel"  @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" size="small"
                                          v-model="item.dataValue"
                                ></el-input>
                                <el-input maxlength="50" v-if="item.dataKey=='bodyFontSize'" min="0" type="tel"  @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" size="small"
                                          v-model="item.dataValue"
                                ></el-input>
                                <el-input maxlength="50" v-if="item.dataKey=='ticketWidth'" min="0" type="tel"  @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" size="small"
                                          v-model="item.dataValue"
                                ></el-input>
                                <el-input maxlength="50" v-if="item.dataKey=='toLeft'" min="0" type="tel"  @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" size="small"
                                          v-model="item.dataValue"
                                ></el-input>
                                <el-input maxlength="50" v-if="item.dataKey=='toRight'" min="0" type="tel"  @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" size="small"
                                          v-model="item.dataValue"
                                ></el-input>
                                <el-input maxlength="50" v-if="item.dataKey=='blankLength'" min="0" type="tel"  @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" size="small"
                                          v-model="item.dataValue"
                                ></el-input>

                                <el-radio-group v-if="item.dataKey=='isSingleLine'" v-model="item.dataValue">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="2">否</el-radio>
                                </el-radio-group>
                                <div v-if="item.dataKey=='printNum'">
                                    <el-input maxlength="50" style="float: left; width: 300px;margin-right: 30px" type="tel"  @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" min="1"
                                              max="3" step="1" size="small" v-model="item.dataValue"
                                    >
                                    </el-input>
                                    <div>最多支持3份</div>
                                </div>

                            </td>
                        </tr>
                    </template>

                    <tr>
                        <td style="background: #FAFAFC ;width: 250px">打印测试页</td>
                        <td style="width: 400px">
                            <el-button> 打印</el-button>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="tab-con3" v-show="tabShow == 7">
                <table class="tab3">

                    <tr style="background: #FAFAFC">
                        <td>序号</td>
                        <td>消息类型</td>
                        <td>是否弹窗</td>
                        <td>是否禁用</td>
                        <td>提前时间</td>
                        <td>单位</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>
                            库存不足
                        </td>
                        <template v-for="(item,index) in messageList">
                            <td v-if="item.dataKey=='stockPop'">
                                <el-radio-group v-model="item.dataValue">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="2">否</el-radio>
                                </el-radio-group>
                            </td>
                            <td v-if="item.dataKey=='stockEnable'">
                                <el-radio-group v-model="item.dataValue">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="2">否</el-radio>
                                </el-radio-group>
                            </td>

                            <td v-if="item.dataKey=='stockTime'">
                                <el-input maxlength="50" size="small" type="tel"  @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" min="0" v-model="item.dataValue"
                                ></el-input>
                            </td>
                        </template>
                        <td>
                            天
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>
                            新订单
                        </td>

                        <template v-for="(item,index) in messageList">
                            <td v-if="item.dataKey=='orderPop'">
                                <el-radio-group v-model="item.dataValue">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="2">否</el-radio>
                                </el-radio-group>
                            </td>
                            <td v-if="item.dataKey=='orderEnable'">
                                <el-radio-group v-model="item.dataValue">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="2">否</el-radio>
                                </el-radio-group>
                            </td>

                            <td v-if="item.dataKey=='orderTime'">
                                <el-input maxlength="50" size="small" type="tel"  @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" v-model="item.dataValue"
                                ></el-input>
                            </td>
                        </template>

                        <td>
                            时
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>
                            会员卡到期
                        </td>

                        <template v-for="(item,index) in messageList">
                            <td v-if="item.dataKey=='expirePop'">
                                <el-radio-group v-model="item.dataValue">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="2">否</el-radio>
                                </el-radio-group>
                            </td>
                            <td v-if="item.dataKey=='expireEnable'">
                                <el-radio-group v-model="item.dataValue">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="2">否</el-radio>
                                </el-radio-group>
                            </td>

                            <td v-if="item.dataKey=='expireTime'">
                                <el-input maxlength="50" size="small" type="tel"  @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" v-model="item.dataValue"
                                ></el-input>
                            </td>
                        </template>

                        <td>
                            天
                        </td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>
                            未到店提醒
                        </td>
                        <template v-for="(item,index) in messageList">
                            <td v-if="item.dataKey=='missNoticePop'">
                                <el-radio-group v-model="item.dataValue">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="2">否</el-radio>
                                </el-radio-group>
                            </td>
                            <td v-if="item.dataKey=='missNoticeEnable'">
                                <el-radio-group v-model="item.dataValue">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="2">否</el-radio>
                                </el-radio-group>
                            </td>

                            <td v-if="item.dataKey=='missNoticeTime'">
                                <el-input maxlength="50" size="small" type="tel"  @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" v-model="item.dataValue"
                                ></el-input>
                            </td>
                        </template>
                        <td>
                            天
                        </td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>
                            发货提醒
                        </td>

                        <template v-for="(item,index) in messageList">
                            <td v-if="item.dataKey=='sendNoticePop'">
                                <el-radio-group v-model="item.dataValue">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="2">否</el-radio>
                                </el-radio-group>
                            </td>
                            <td v-if="item.dataKey=='sendNoticeEnable'">
                                <el-radio-group v-model="item.dataValue">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="2">否</el-radio>
                                </el-radio-group>
                            </td>

                            <td v-if="item.dataKey=='sendNoticeTime'">
                                <el-input maxlength="50" size="small" type="tel"  @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" v-model="item.dataValue"
                                ></el-input>
                            </td>
                        </template>
                        <td>
                            天
                        </td>
                    </tr>

                </table>
            </div>
            <div class="tab-con3" v-show="tabShow == 8">

                <table class="tab3">
                    <template v-for="(item,index) in systemList ">
                        <tr>
                            <td style="background: #FAFAFC;width: 250px">{{item.dataMemo}}</td>
                            <td style="width: 400px">

                                <el-input maxlength="50" v-if="item.dataKey=='shopPrefix'" size="small" v-model="item.dataValue"
                                ></el-input>
                                <el-input maxlength="50" type="tel"  @mousewheel.native.prevent oninput="if(value.length>8)value=value.slice(0,8)" step="1" min="1" v-if="item.dataKey=='numberLength'"
                                          size="small" v-model="item.dataValue"
                                ></el-input>
                                <el-radio-group v-if="item.dataKey=='isOpenSysTask'" v-model="item.dataValue">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="2">否</el-radio>
                                </el-radio-group>
                                <template v-if="item.dataKey=='shopIcon'">
                                    <el-upload
                                            class="upload-demo"
                                            :headers="headers"
                                            action="/yl-ms-platform/imageFileApi/upload"
                                            accept="image/jpeg,image/png"
                                            :on-success="uploadShopSuccess"
                                            :on-error="uploadError"
                                            :file-list="fileList"
                                            limit="1"
                                            list-type="picture">
                                        <el-button size="small" type="primary">上传</el-button>
                                    </el-upload>
                                </template>
                            </td>
                        </tr>
                    </template>
                </table>
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
    import {MyGet, MyPost, MyPostJson} from 'common/js/request'
    import Loading from 'base/loading/loading'
    import footerbar from '../footerbar/footerbar.vue'

    export default {
        name: 'systemSet',
        components: {
            Loading,
            footerbar
        },
        data() {
            return {
                loadingShow: false,
                loadingText: '正在加载中...',
                tableData: [],
                tableData2: [],
                tableData3: [],
                tabShow: 1,
                fileList: [],
                sendId: '',

                //平台信息
                platformList: [

                    // {
                    //     id: 4,
                    //     dataKey: "stringflyName",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "平台名称",
                    //     superclassKey: "platformList"
                    // },
                    // {
                    //     id: 5,
                    //     dataKey: "stringflyTitle",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "平台标题",
                    //     superclassKey: "platformList"
                    // },
                    // {
                    //     id: 6,
                    //     dataKey: "memo",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "平台描述",
                    //     superclassKey: "platformList"
                    // },
                    // {
                    //     id: 7,
                    //     dataKey: "antistop",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "关键词",
                    //     superclassKey: "platformList"
                    // },
                    // {
                    //     id: 8,
                    //     dataKey: "hotLine",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "客服热线",
                    //     superclassKey: "platformList"
                    // },
                    // {
                    //     id: 9,
                    //     dataKey: "email",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "客服邮箱",
                    //     superclassKey: "platformList"
                    // },
                    // {
                    //     id: 10,
                    //     dataKey: "icon",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "平台icon",
                    //     superclassKey: "platformList"
                    // },
                    // {
                    //     id: 11,
                    //     dataKey: "order",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "排序",
                    //     superclassKey: "platformList"
                    // }
                ],
                // {
                //     stringflyName: '',//平台名称
                //     stringflyTitle: '',//平台标题
                //     memo: '',//平台描述
                //     antistop: '',//关键词
                //     hotLine: '',//客服热线
                //     email: '',//客服邮箱
                //     icon: '',//平台icon
                //     order: ''//排序
                // },

                //支付方式
                payList: [
                    // {
                    //     id: 12,
                    //     dataKey: "isZFBCountIn",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "支付宝是否计入现金收入",
                    //     superclassKey: "payList"
                    // },
                    // {
                    //     id: 13,
                    //     dataKey: "ZFBConvert",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "支付宝积分折算比率",
                    //     superclassKey: "payList"
                    // },
                    // {
                    //     id: 14,
                    //     dataKey: "isWXCountIn",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "微信是否计入现金收入",
                    //     superclassKey: "payList"
                    // },
                    // {
                    //     id: 15,
                    //     dataKey: "WXConvert",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "微信积分折算比率",
                    //     superclassKey: "payList"
                    // },
                    // {
                    //     id: 16,
                    //     dataKey: "isXJCountIn",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "现金是否计入现金收入",
                    //     superclassKey: "payList"
                    // },
                    // {
                    //     id: 17,
                    //     dataKey: "XJConvert",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "现金积分折算比率",
                    //     superclassKey: "payList"
                    // },
                    // {
                    //     id: 18,
                    //     dataKey: "isCZCountIn",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "储值是否计入现金收入",
                    //     superclassKey: "payList"
                    // },
                    // {
                    //     id: 19,
                    //     dataKey: "CZConvert",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "储值积分折算比率",
                    //     superclassKey: "payList"
                    // },
                    // {
                    //     id: 20,
                    //     dataKey: "isJFCountIn",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "积分是否计入现金收入",
                    //     superclassKey: "payList"
                    // },
                    // {
                    //     id: 21,
                    //     dataKey: "JFConvert",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "积分积分折算比率",
                    //     superclassKey: "payList"
                    // },
                    // {
                    //     id: 22,
                    //     dataKey: "isDYCountIn",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "抵用券是否计入现金收入",
                    //     superclassKey: "payList"
                    // },
                    // {
                    //     id: 23,
                    //     dataKey: "DYConvert",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "抵用券积分折算比率",
                    //     superclassKey: "payList"
                    // }
                ],
                // {
                //     isZFBCountIn: 0, //支付宝是否计入现金收入
                //     ZFBConvert: '',//支付宝积分折算比率
                //     isWXCountIn: 0,//微信是否计入现金收入
                //     WXConvert: '',//微信积分折算比率
                //     isXJCountIn: 0,//现金是否计入现金收入
                //     XJConvert: '',//现金积分折算比率
                //     isCZCountIn: 0,//储值是否计入现金收入
                //     CZConvert: '',//储值积分折算比率
                //     isJFCountIn: 0,//积分是否计入现金收入
                //     JFConvert: '',//积分积分折算比率
                //     isDYCountIn: 0,//抵用券是否计入现金收入
                //     DYConvert: '',//抵用券积分折算比率
                // },
                //库存管理

                stockList: [
                    // {
                    //     id: 24,
                    //     dataKey: "priceInRadio",
                    //     dataValue: "3",
                    //     orderNumber: "1",
                    //     dataMemo: "产品入库单价默认为",
                    //     superclassKey: "stockList"
                    // },
                    // {
                    //     id: 25,
                    //     dataKey: "priceOutRadio",
                    //     dataValue: "2",
                    //     orderNumber: "1",
                    //     dataMemo: "产品出库单价默认为",
                    //     superclassKey: "stockList"
                    // },
                    // {
                    //     id: 26,
                    //     dataKey: "isStop",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "库存报表是否统计停用产品",
                    //     superclassKey: "stockList"
                    // },
                    // {
                    //     id: 27,
                    //     dataKey: "isDeduction",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "产品销售是否直接扣库存",
                    //     superclassKey: "stockList"
                    // },
                    // {
                    //     id: 28,
                    //     dataKey: "warehouse",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "产品销售仓库",
                    //     superclassKey: "stockList"
                    // }
                ],
                //     {
                //     priceInRadio: 0,//产品入库单价默认为
                //     priceOutRadio: 0,//产品出库单价默认为
                //     isStop: 0,//库存报表是否统计停用产品
                //     isDeduction: 0,//产品销售是否直接扣库存
                //     //产品销售仓库列表
                warehouseList: [{
                    value: '1',
                    label: '上海诚信示范区A仓'
                }, {
                    value: '2',
                    label: '上海诚信示范区B仓'
                }, {
                    value: '3',
                    label: '上海诚信示范区C仓'
                }],
                //     warehouse: '',//产品销售仓库
                // },


                //消费收银
                receiveList: [
                    // {
                    //     id: 29,
                    //     dataKey: "isShowInfo",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "收银时是否显示会员信息",
                    //     superclassKey: "receiveList"
                    // },
                    // {
                    //     id: 30,
                    //     dataKey: "isOpenCheck",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "是否开启手工单检查",
                    //     superclassKey: "receiveList"
                    // },
                    // {
                    //     id: 31,
                    //     dataKey: "prefix",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "手工单前缀",
                    //     superclassKey: "receiveList"
                    // },
                    // {
                    //     id: 32,
                    //     dataKey: "Suffix",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "手工单后缀",
                    //     superclassKey: "receiveList"
                    // },
                    // {
                    //     id: 33,
                    //     dataKey: "roundingMode",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "金额取整模式",
                    //     superclassKey: "receiveList"
                    // },
                    // {
                    //     id: 34,
                    //     dataKey: "isCreate",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "是否自动生成服务历史",
                    //     superclassKey: "receiveList"
                    // }
                ],
                // {
                //     isShowInfo: 0,//收银时是否显示会员信息
                //     isOpenCheck: 0,//是否开启手工单检查
                //     prefix: '',//手工单前缀
                //     Suffix: '',//手工单后缀
                //     roundingMode: 0,//金额取整模式
                //     isCreate: 0,//是否自动生成服务历史
                // },

                //系统使用习惯
                usageList: [
                    // {
                    //     id: 35,
                    //     dataKey: "modifyMode",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "收银单保存后是否自动新增收银单",
                    //     superclassKey: "usageList"
                    // },
                    // {
                    //     id: 36,
                    //     dataKey: "isReviewSelf",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "是否自动复核单据",
                    //     superclassKey: "usageList"
                    // },
                    // {
                    //     id: 37,
                    //     dataKey: "isCreateSelf",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "业务单据修改模式",
                    //     superclassKey: "usageList"
                    // }
                ],
                // {
                //     modifyMode: 0,//收银单保存后是否自动新增收银单
                //     isReviewSelf: 0,//是否自动复核单据
                //     isCreateSelf: 0,//业务单据修改模式
                // },
                //字体系统选择列表
                fontList: [{
                    value: '1',
                    label: '微软雅黑'
                }, {
                    value: '2',
                    label: '方正楷体'
                }, {
                    value: '3',
                    label: '宋体'
                }],
                //小票打印
                printList: [
                    // {
                    //     id: 38,
                    //     dataKey: "isPrintSelf",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "是否自动打印消费小票",
                    //     superclassKey: "printList"
                    // },
                    // {
                    //     id: 39,
                    //     dataKey: "welcome",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "欢迎使用",
                    //     superclassKey: "printList"
                    // },
                    // {
                    //     id: 40,
                    //     dataKey: "isShowWelcome",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "是否显示小票问侯语",
                    //     superclassKey: "printList"
                    // },
                    // {
                    //     id: 41,
                    //     dataKey: "fontSelect",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "字体系统选择",
                    //     superclassKey: "printList"
                    // },
                    // {
                    //     id: 42,
                    //     dataKey: "titleFontSize",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "标题字体大小设置",
                    //     superclassKey: "printList"
                    // },
                    // {
                    //     id: 43,
                    //     dataKey: "bodyFontSize",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "内容字体大小设置",
                    //     superclassKey: "printList"
                    // },
                    // {
                    //     id: 44,
                    //     dataKey: "ticketWidth",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "小票宽度设置",
                    //     superclassKey: "printList"
                    // },
                    // {
                    //     id: 45,
                    //     dataKey: "toLeft",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "左边距",
                    //     superclassKey: "printList"
                    // },
                    // {
                    //     id: 46,
                    //     dataKey: "toRight",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "右边距",
                    //     superclassKey: "printList"
                    // },
                    // {
                    //     id: 47,
                    //     dataKey: "blankLength",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "下方预留空白长度",
                    //     superclassKey: "printList"
                    // },
                    // {
                    //     id: 48,
                    //     dataKey: "isSingleLine",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "项目名称是否单独成行",
                    //     superclassKey: "printList"
                    // },
                    // {
                    //     id: 49,
                    //     dataKey: "printNum",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "打印份数",
                    //     superclassKey: "printList"
                    // }
                ],
                // {
                //     isPrintSelf: 0,//是否自动打印消费小票
                //     welcome: '',//小票问侯语内容（分号分割行）
                //     isShowWelcome: 0,//是否显示小票问侯语
                //     fontSelect: '',//字体系统选择
                //
                //     titleFontSize: '',//标题字体大小设置
                //     bodyFontSize: '',//内容字体大小设置
                //     ticketWidth: '',//小票宽度设置
                //     toLeft: '',//左边距
                //     toRight: '',//右边距
                //     blankLength: '',//下方预留空白长度
                //     isSingleLine: 0,//项目名称是否单独成行
                //     printNum: 0,//打印份数
                // },

                //消息提醒
                messageList: [
                    // {
                    //     id: 50,
                    //     dataKey: "stockPop",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "库存不足是否弹窗",
                    //     superclassKey: "messageList"
                    // },
                    // {
                    //     id: 51,
                    //     dataKey: "stockEnable",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "库存不足是否禁用",
                    //     superclassKey: "messageList"
                    // },
                    // {
                    //     id: 52,
                    //     dataKey: "stockTime",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "库存不足提前时间",
                    //     superclassKey: "messageList"
                    // },
                    // {
                    //     id: 53,
                    //     dataKey: "orderPop",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "新订单是否弹窗",
                    //     superclassKey: "messageList"
                    // },
                    // {
                    //     id: 54,
                    //     dataKey: "orderEnable",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "新订单是否禁用",
                    //     superclassKey: "messageList"
                    // },
                    // {
                    //     id: 55,
                    //     dataKey: "orderTime",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "新订单提前时间",
                    //     superclassKey: "messageList"
                    // },
                    // {
                    //     id: 56,
                    //     dataKey: "expirePop",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "会员卡到期是否弹窗",
                    //     superclassKey: "messageList"
                    // },
                    // {
                    //     id: 57,
                    //     dataKey: "expireEnable",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "会员卡到期是否禁用",
                    //     superclassKey: "messageList"
                    // },
                    // {
                    //     id: 58,
                    //     dataKey: "expireTime",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "会员卡到期提前时间",
                    //     superclassKey: "messageList"
                    // },
                    // {
                    //     id: 59,
                    //     dataKey: "missNoticePop",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "未到店提醒是否弹窗",
                    //     superclassKey: "messageList"
                    // },
                    // {
                    //     id: 60,
                    //     dataKey: "missNoticeEnable",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "未到店提醒是否禁用",
                    //     superclassKey: "messageList"
                    // },
                    // {
                    //     id: 61,
                    //     dataKey: "missNoticeTime",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "未到店提醒提前时间",
                    //     superclassKey: "messageList"
                    // },
                    // {
                    //     id: 62,
                    //     dataKey: "sendNoticePop",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "发货提醒是否弹窗",
                    //     superclassKey: "messageList"
                    // },
                    // {
                    //     id: 63,
                    //     dataKey: "sendNoticeEnable",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "发货提醒是否禁用",
                    //     superclassKey: "messageList"
                    // },
                    // {
                    //     id: 64,
                    //     dataKey: "sendNoticeTime",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "发货提醒提前时间",
                    //     superclassKey: "messageList"
                    // }
                ],
                // {
                //     stockPop: 0,//库存不足是否弹窗
                //     stockEnable: 0,//库存不足是否禁用
                //     stockTime: '',//库存不足提前时间
                //     orderPop: 0,//新订单是否弹窗
                //     orderEnable: 0,//新订单是否禁用
                //     orderTime: '',//新订单提前时间
                //     expirePop: 0,//会员卡到期是否弹窗
                //     expireEnable: 0,//会员卡到期是否禁用
                //     expireTime: '',//会员卡到期提前时间
                //     missNoticePop: 0,//未到店提醒是否弹窗
                //     missNoticeEnable: 0,//未到店提醒是否禁用
                //     missNoticeTime: '',//未到店提醒提前时间
                //     sendNoticePop: 0,//发货提醒是否弹窗
                //     sendNoticeEnable: 0,//发货提醒是否禁用
                //     sendNoticeTime: '',//发货提醒提前时间
                // },

                //系统相关
                systemList: [
                    // {
                    //     id: 65,
                    //     dataKey: "shopPrefix",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "示范店编号前缀",
                    //     superclassKey: "systemList"
                    // },
                    // {
                    //     id: 66,
                    //     dataKey: "numberLength",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "示范店编号序号长度",
                    //     superclassKey: "systemList"
                    // },
                    // {
                    //     id: 67,
                    //     dataKey: "isOpenSysTask",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "示范店图标设置",
                    //     superclassKey: "systemList"
                    // },
                    // {
                    //     id: 68,
                    //     dataKey: "shopIcon",
                    //     dataValue: "1",
                    //     orderNumber: "1",
                    //     dataMemo: "示范店图标设置",
                    //     superclassKey: "systemList"
                    // }
                ],
                // {
                //     shopPrefix: '',//示范店编号前缀
                //     numberLength: '',//示范店编号序号长度
                //     isOpenSysTask: 0,//是否开启系统计划任务
                //     shopIcon: ''//示范店图标设置
                // },
                myData: [
                    {
                        superclassKey: '',
                        sysConfigurationBOList: []
                    }
                ],
                listAll: [],
                headers:{},
            }
        },
        created() {
            this.$store.state.navTit = '系统管理';
            this.$store.state.navChildTit = '系统设置';
            this.headers = {
                token: store.get('tokenVal')
            };
            this.getSystemSet();
        }
        ,
        methods: {
            uploadError(err, file, fileList) {
                this.$message.error('图片上传失败');
            },
            uploadShopSuccess(response, file, fileList) {
                let {code, message, data} = response;
                if (code == '0') {
                    this.$message({
                        message: '图片上传成功',
                        type: 'success'
                    });

                    for (var i = 0; i < this.systemList.length; i++) {
                        if(this.systemList[i].dataKey=='icon')
                            this.$set(this.systemList[i], `dataValue`, data)
                    }
                } else {
                    this.$message.error(message);
                }
            },

            uploadPlatformSuccess(response, file, fileList) {
                let {code, message, data} = response;
                if (code == '0') {
                    this.$message({
                        message: '图片上传成功',
                        type: 'success'
                    });

                    for (var i = 0; i < this.platformList.length; i++) {
                        if(this.platformList[i].dataKey=='icon')
                            this.$set(this.platformList[i], `dataValue`, data)
                    }
                } else {
                    this.$message.error(message);
                }
            },
            saveAll() {
                // return
                this.loadingShow = true;
                this.listAll = this.listAll.concat(this.platformList, this.payList, this.stockList
                    , this.receiveList, this.usageList, this.printList, this.messageList, this.systemList)
                MyPostJson('/yl-ms-platform/sysConfiguration/updSysConfig', {

                    sysConfigurationBOList: this.listAll,

                }).then((res) => {
                    this.listAll = []
                    this.loadingShow = false;
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error(message);
                    }
                })

            },

            getSystemSet() {
                // return
                MyGet('/yl-ms-platform/sysConfiguration/getSysConfig', {
                    // id: this.$route.query.id
                }).then((res) => {
                    let {code, message, data} = res;
                    if (code == '0') {
                        this.myData = data
                        for (var i = 0; i < this.myData.length; i++) {
                            if (this.myData[i].superclassKey == 'systemList')
                                this.systemList = this.myData[i].sysConfigurationBOList
                            if (this.myData[i].superclassKey == 'platformList')
                                this.platformList = this.myData[i].sysConfigurationBOList
                            if (this.myData[i].superclassKey == 'messageList')
                                this.messageList = this.myData[i].sysConfigurationBOList
                            if (this.myData[i].superclassKey == 'stockList')
                                this.stockList = this.myData[i].sysConfigurationBOList

                            if (this.myData[i].superclassKey == 'payList')
                                this.payList = this.myData[i].sysConfigurationBOList
                            if (this.myData[i].superclassKey == 'printList')
                                this.printList = this.myData[i].sysConfigurationBOList
                            if (this.myData[i].superclassKey == 'receiveList')
                                this.receiveList = this.myData[i].sysConfigurationBOList
                            if (this.myData[i].superclassKey == 'usageList')
                                this.usageList = this.myData[i].sysConfigurationBOList
                        }


                    } else {
                        this.$message.error(message);
                    }
                })
            }
            ,
            tabClk(num) {
                this.tabShow = num
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .systemSet
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
            padding 45px 16px 16px 16px
            .infor-tab
                height 40px
                margin-bottom 20px

                span
                    float left
                    width 10%
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
                border
                .add-box
                    overflow hidden
                    /*width 720px*/
                    margin 0 auto 22px auto

                    .upload-demo
                        float left

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

                    .order
                        font-size 12px
                        display flex
                        flex-flow column
                        width 410px

                        .add-sort
                            float left
                            margin-bottom 10px

                    .mr20
                        margin-right 20px

                    .el-input--small .el-input__inner
                        height 36px
                        line-height 36px

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
