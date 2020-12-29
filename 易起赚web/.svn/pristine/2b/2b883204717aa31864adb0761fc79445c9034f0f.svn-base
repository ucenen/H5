<template>
    <div class="costList">
        <div class="nav_tip">
            <p>费用发放记录<span>{{virtualUserName}}</span></p>
        </div>
        <div class="search_con">
            <div class="search_nav">
                <span class="search_date">签单日期：</span>
                <el-date-picker
                        v-model="search_list.date_val[0]"
                        id="date1"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        type="date"
                        size="small"
                        placeholder="开始日期">
                </el-date-picker>
                <el-date-picker
                        v-model="search_list.date_val[1]"
                        id="date2"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        type="date"
                        size="small"
                        placeholder="结束日期">
                </el-date-picker>
                <span class="search_date">发放发起日期：</span>
                <el-date-picker
                        v-model="search_list.dateSuc_val[0]"
                        id="date3"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        type="date"
                        size="small"
                        placeholder="开始日期">
                </el-date-picker>
                <el-date-picker
                        v-model="search_list.dateSuc_val[1]"
                        id="date4"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        type="date"
                        size="small"
                        placeholder="结束日期">
                </el-date-picker>
                <span class="search_date">发放成功日期：</span>
                <el-date-picker
                        v-model="search_list.dateEnd_val[0]"
                        id="date5"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        type="date"
                        size="small"
                        placeholder="开始日期">
                </el-date-picker>
                <el-date-picker
                        v-model="search_list.dateEnd_val[1]"
                        id="date6"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        type="date"
                        size="small"
                        placeholder="结束日期">
                </el-date-picker>
            </div>
            <div class="search_nav">
                <el-input size="small" class="w90" v-model="search_list.licenseNo" placeholder="车牌号码"></el-input>
                <el-input size="small" class="w90" v-model="search_list.frameNo" placeholder="车架号"></el-input>
                <el-input size="small" class="w110" v-model="search_list.insuredName" placeholder="被保险人姓名"></el-input>
                <el-input size="small" class="w90" v-model="search_list.policyNo" placeholder="保单号"></el-input>
                <el-input size="small" class="w110" v-model="search_list.receiverName" placeholder="收款人姓名"></el-input>
                <el-tooltip class="item" effect="dark" content="已发放次数" placement="top-start">
                    <el-select class="w100" size="small" v-model="search_list.distributedTimes" placeholder="已发放次数">
                        <el-option
                                v-for="item in issuedNumberList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="发放状态" placement="top-start">
                    <el-select class="w100" size="small" v-model="search_list.status" placeholder="发放状态">
                        <el-option
                                v-for="item in statusList"
                                :key="item"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                </el-tooltip>
                <el-button class="mb24" type="primary" size="small" @click="search_clk">查 询</el-button>
            </div>
            <div class="searcn_end_mod" v-show="search_show">
                <p><i class="el-icon-info iconBlue"></i>查询结果：已发放金额 ￥{{distributedAmount}}({{distributedNum}}单)，发放中金额 ￥{{distributingAmount}}({{distributingNum}}单)
                </p>
                <span class="down_top" @click="downExcel">下载数据</span>
            </div>
        </div>
        <div class="search_bom">
            <!--<div class="down_top">-->
            <!--<span @click="downExcel">下载数据</span>-->
            <!--</div>-->
            <div class="result_con">
                <el-table
                        :data="tableData"
                        :maxHeight="winh"
                        border
                        style="width: 100%;">
                    <el-table-column
                            prop="policySignTime"
                            label="签单时间"
                            width="160">
                    </el-table-column>
                    <el-table-column
                            prop="licenseNo"
                            label="车牌号码"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="frameNo"
                            label="车架号"
                            width="190">
                    </el-table-column>
                    <el-table-column
                            prop="insuredName"
                            label="被保险人姓名"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="保单号"
                            width="220">
                        <template slot-scope="scope">
                            <span class="cost_sp">{{scope.row.bizPolicyNo}}</span>
                            <span class="cost_sp">{{scope.row.forcePolicyNo}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="产品名称"
                            width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.bizPolicyNo" class="cost_sp">商业险</span>
                            <span v-if="scope.row.forcePolicyNo" class="cost_sp">交强险</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="保费"
                            width="90">
                        <template slot-scope="scope">
                            <span class="cost_sp" v-if="scope.row.bizPolicyNo">{{scope.row.bizTotalPremium}}</span>
                            <span class="cost_sp" v-if="scope.row.forcePolicyNo">{{scope.row.forceTotalPremium}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="净保费"
                            width="90">
                        <template slot-scope="scope">
                            <span class="cost_sp" v-if="scope.row.bizPolicyNo">{{scope.row.netBizTotalPremium}}</span>
                            <span class="cost_sp"
                                  v-if="scope.row.forcePolicyNo">{{scope.row.netForceTotalPremium}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="发放比例"
                            width="100">
                        <template slot-scope="scope">
                            <span class="cost_sp"
                                  v-if="scope.row.bizPolicyNo&&scope.row.bizDistributeRate==null">-</span>
                            <span class="cost_sp" v-else-if="scope.row.bizPolicyNo&&scope.row.bizDistributeRate!=null">{{numMulti(scope.row.bizDistributeRate, 100).toFixed(2)}}%</span>
                            <span class="cost_sp"
                                  v-if="scope.row.forcePolicyNo&&scope.row.forceDistributeRate==null">-</span>
                            <span class="cost_sp"
                                  v-else-if="scope.row.forcePolicyNo&&scope.row.forceDistributeRate!=null">{{numMulti(scope.row.forceDistributeRate, 100).toFixed(2)}}%</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="发放金额"
                            width="80">
                        <template slot-scope="scope">
                            <span class="cost_sp"
                                  v-if="scope.row.bizPolicyNo&&scope.row.bizDistributeRate==null">-</span>
                            <span class="cost_sp" v-else-if="scope.row.bizPolicyNo&&scope.row.bizDistributeRate!=null">{{scope.row.bizDistAmount}}</span>
                            <span class="cost_sp"
                                  v-if="scope.row.forcePolicyNo&&scope.row.forceDistributeRate==null">-</span>
                            <span class="cost_sp"
                                  v-else-if="scope.row.forcePolicyNo&&scope.row.forceDistributeRate!=null">{{scope.row.forceDistAmount}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="totalDistAmount"
                            label="发放总金额"
                            width="100">
                        <template slot-scope="scope">
                            <span v-if="(scope.row.bizPolicyNo&&scope.row.bizDistributeRate==null)||(scope.row.forcePolicyNo&&scope.row.forceDistributeRate==null)">-</span>
                            <span v-else>{{scope.row.totalDistAmount}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="收款人姓名"
                            width="150">
                        <template slot-scope="scope">
                            <span>{{scope.row.accountName}}</span>
                            <div v-if="scope.row.accountName" style="display: inline-block;">
                                <i class="cost_icon" v-if="scope.row.isOwner">车</i>
                                <i class="cost_icon" v-if="scope.row.isInsured">被</i>
                                <i class="cost_icon" v-if="scope.row.isApplicant">投</i>
                                <i class="cost_not"
                                   v-if="!scope.row.isOwner&&!scope.row.isInsured&&!scope.row.isApplicant">非</i>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="idNo"
                            label="收款人身份证号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="bankAccountNo"
                            label="收款人银行卡号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            label="费用发放发起时间"
                            width="140">
                    </el-table-column>
                    <el-table-column
                            prop="distributeSuccessTime"
                            label="费用发放成功时间"
                            width="140">
                    </el-table-column>
                    <el-table-column
                            prop="distributeFailTime"
                            label="费用发放失败时间"
                            width="140">
                    </el-table-column>
                    <el-table-column
                            prop="distributedTimes"
                            label="已发放次数"
                            width="90">
                    </el-table-column>
                    <el-table-column
                            prop="message"
                            label="错误信息"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            prop="status"
                            label="发放状态"
                            width="90">
                    </el-table-column>
                    <el-table-column
                            v-if="readOnlyShow"
                            fixed="right"
                            label="操作"
                            width="160">
                        <template slot-scope="scope">
                            <el-select class="change_sel" size="mini" v-model="scope.row.changeVal"
                                       @change="changeInf(scope.row)" placeholder="修改">
                                <el-option
                                        v-for="item in scope.row.modify"
                                        :key="item"
                                        :label="gModify(item)"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagenum_mod" v-if="page_show">
                <el-pagination
                        class="pageination_css"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="15"
                        layout="total, prev, pager, next, jumper"
                        :total="totalRecord">
                </el-pagination>
            </div>
        </div>
        <!--loading-->
        <transition name="fade">
            <div class="loading-container" v-show="loadingShow">
                <loading :loadingText="loadingText"></loading>
            </div>
        </transition>
        <el-dialog
                title="编辑附加信息"
                :visible.sync="editorShow"
                width="45%"
                class="minW640"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :before-close="handleClose">
            <div class="inf_content">
                <div class="batchImportCon">
                    <div class="listbox">
                        <span class="list_tit">保费支付方式：</span>
                        <el-tooltip class="synch_el" effect="dark" content="保费支付方式" placement="top-start">
                            <el-select class="w164" size="small" v-model="changeDialoInf.paymentMethod"
                                       placeholder="保费支付方式">
                                <el-option
                                        v-for="item in allPaymentOptions"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code">
                                </el-option>
                            </el-select>
                        </el-tooltip>
                    </div>
                    <div class="listbox">
                        <span class="list_tit">配&ensp;&ensp;送&ensp;方&ensp;式：</span>
                        <el-tooltip class="synch_el" effect="dark" content="配送方式" placement="top-start">
                            <el-select class="w164" size="small" v-model="changeDialoInf.deliveryMethod"
                                       placeholder="配送方式">
                                <el-option
                                        v-for="item in allDeliveryOptions"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code">
                                </el-option>
                            </el-select>
                        </el-tooltip>
                    </div>
                    <div class="areaBox">
                        <span class="list_tit">备&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;注：</span>
                        <el-input
                                v-model="changeDialoInf.remark"
                                class="area_ipt"
                                type="textarea"
                                resize="none"
                                placeholder="输入备注(选填)">
                        </el-input>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose">取 消</el-button>
        <el-button size="small" type="primary" @click="editorClk(changeDialoInf)">确 定</el-button>
      </span>
        </el-dialog>
        <el-dialog
                title="取消再发放设置"
                :visible.sync="setUpShow"
                width="36%"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :before-close="handleClose">
            <div class="inf_content">
                <div class="setUpCon">
                    <p>车牌号码：{{changeDialoInf.licenseNo}}</p>
                    <p>被保险人：{{changeDialoInf.insuredName}}</p>
                    <p v-if="changeDialoInf.bizPolicyNo">商业险保单号：{{changeDialoInf.bizPolicyNo}}</p>
                    <p v-if="changeDialoInf.forcePolicyNo">交强险保单号：{{changeDialoInf.forcePolicyNo}}</p>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose">取 消</el-button>
        <el-button size="small" type="primary" @click="setUpClk(changeDialoInf.id)">确 定</el-button>
      </span>
        </el-dialog>
        <el-dialog
                title="设置为不发放"
                :visible.sync="setUpShow2"
                width="36%"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :before-close="handleClose">
            <div class="inf_content">
                <div class="setUpCon">
                    <p>车牌号码：{{changeDialoInf.licenseNo}}</p>
                    <p>被保险人：{{changeDialoInf.insuredName}}</p>
                    <p v-if="changeDialoInf.bizPolicyNo">商业险保单号：{{changeDialoInf.bizPolicyNo}}</p>
                    <p v-if="changeDialoInf.forcePolicyNo">交强险保单号：{{changeDialoInf.forcePolicyNo}}</p>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose">取 消</el-button>
        <el-button size="small" type="primary" @click="setUpClk2(changeDialoInf.id)">确 定</el-button>
      </span>
        </el-dialog>
        <el-dialog
                title="设置为再发放"
                :visible.sync="setUpShow3"
                width="36%"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :before-close="handleClose">
            <div class="inf_content">
                <div class="setUpCon">
                    <p>车牌号码：{{changeDialoInf.licenseNo}}</p>
                    <p>被保险人：{{changeDialoInf.insuredName}}</p>
                    <p v-if="changeDialoInf.bizPolicyNo">商业险保单号：{{changeDialoInf.bizPolicyNo}}</p>
                    <p v-if="changeDialoInf.forcePolicyNo">交强险保单号：{{changeDialoInf.forcePolicyNo}}</p>
                    <p>收款人姓名：{{changeDialoInf.accountName}}<i class="cost_icon" v-if="changeDialoInf.isOwner">车</i>
                        <i class="cost_icon" v-if="changeDialoInf.isInsured">被</i>
                        <i class="cost_icon" v-if="changeDialoInf.isApplicant">投</i>
                        <i class="cost_not"
                           v-if="!changeDialoInf.isOwner&&!changeDialoInf.isInsured&&!changeDialoInf.isApplicant">非</i>
                    </p>
                    <p>收款人身份证号：{{changeDialoInf.idNo}}</p>
                    <p>收款人银行卡号：{{changeDialoInf.bankAccountNo}}</p>
                    <p>是否使用历史收款人信息
                        <el-select size="mini" v-model="useHistoryReceiver" class="set_sel" placeholder="是否使用历史收款人信息">
                            <el-option
                                    v-for="item in useHistoryReceiverList"
                                    :key="item.value"
                                    :label="item.text"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </p>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose">取 消</el-button>
        <el-button size="small" type="primary" @click="setUpClk3(changeDialoInf.id)">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
    import store from 'si-store'
    import {MyGet, MyPost} from 'common/js/request'
    import Loading from 'base/loading/loading'

    export default {
        name: 'costList',
        components: {
            Loading
        },
        data() {
            return {
                user_con: {},//登录缓存信息
                loadingShow: false,
                loadingText: '正在加载中...',
                search_list: {
                    date_val: ['', ''], // 选择日期
                    dateSuc_val: [this.GetDateStr(-7), this.GetDateStr(0)], // 发放发起日期
                    dateEnd_val: ['', ''], // 发放成功日期
                    licenseNo: '', // 车牌号码
                    frameNo: '', // 车架号
                    insuredName: '', // 被保险人姓名
                    policyNo: '', // 保单号
                    receiverName: '', // 收款人姓名
                    status: '发放状态', // 状态(包括入账状态和发放状态)
                    distributedTimes: '' // 已发放次数
                },
                statusList: ['发放状态', '已发放', '发放中', '发放失败'],//状态列表
                issuedNumberList: [
                    {
                        value: '',
                        label: '已发放次数'
                    },
                    {
                        value: 1,
                        label: '一次'
                    },
                    {
                        value: 2,
                        label: '二次'
                    }
                ],//已发放次数状态状态列表
                tableData: [],
                currentPage: 1,//当前分页
                totalRecord: 0,//总共分页数据条数
                page_show: false,//分页显示
                virtualUserName: '',//费用虚拟账号名
                distributingNum: 0,//发放中单数
                distributingAmount: 0,//发放中金额
                distributedNum: 0,//已发放单数
                distributedAmount: 0,//已发放金额
                search_show: false,//查询结果显示
                editorShow: false,//编辑附加信息显示
                setUpShow: false,//取消再发放设置
                setUpShow2: false,//设置为不发放显示
                setUpShow3: false,//设置为再发放
                changeDialoInf: {},//修改收款人信息
                allPaymentOptions: [],//获取支付方式列表
                allDeliveryOptions: [],//获取配送方式列表
                winh: 0,
                useHistoryReceiverList: [
                    {
                        value: true,
                        text: '是'
                    },
                    {
                        value: false,
                        text: '否'
                    }
                ],//次数状态列表
                useHistoryReceiver: false,
                readOnlyShow: true,
            }
        },
        created() {
            this.$store.state.routePath = '/costList';
            /*this.winh = this.getViewportOffset().h - 200;
            this.$store.state.routePath = '/costList';
            this.virtualUserName = store.get('virtualUserName');
            store.get('userInf') && (this.user_con = store.get('userInf'));
            if (store.get('readOnly') === 1) {
                this.readOnlyShow = false;
            } else {
                this.readOnlyShow = true;
            }
            this.tab_fn();*/
        },
        methods: {
            handleClose() {
                this.setUpShow = false;
                this.setUpShow2 = false;
                this.setUpShow3 = false;
                this.editorShow = false;
                this.useHistoryReceiver = false;
                for (var k in this.tableData) {
                    this.tableData[k].changeVal = '';
                }
            },
            setUpClk(id) {
                this.loadingShow = true;
                MyPost('/fast-sys/api/refund/disableDistribution', {
                    operationId: id
                }).then((data) => {
                    this.loadingShow = false;
                    if (data.code == '0') {
                        this.$message({
                            message: '取消再发放设置成功',
                            type: 'success'
                        });
                        this.setUpShow = false;
                        this.tab_fn();
                    } else {
                        this.$message.error(data.message);
                    }
                })
            },
            setUpClk2(id) {
                this.loadingShow = true;
                MyPost('/fast-sys/api/refund/disableDistribution', {
                    operationId: id
                }).then((data) => {
                    this.loadingShow = false;
                    if (data.code == '0') {
                        this.$message({
                            message: '设置为不发放成功',
                            type: 'success'
                        });
                        this.setUpShow2 = false;
                        this.tab_fn();
                    } else {
                        this.$message.error(data.message);
                    }
                })
            },
            setUpClk3(id) {
                this.loadingShow = true;
                MyPost('/fast-sys/api/refund/newDistribution', {
                    id: id,
                    useHistoryReceiver: this.useHistoryReceiver
                }).then((data) => {
                    this.loadingShow = false;
                    if (data.code == '0') {
                        this.$message({
                            message: '设置为再发放成功',
                            type: 'success'
                        });
                        this.setUpShow3 = false;
                        this.useHistoryReceiver = false;
                        this.tab_fn();
                    } else {
                        this.$message.error(data.message);
                    }
                })
            },
            editorClk(item) {
                this.loadingShow = true;
                MyPost('/fast-sys/api/refund/modifyExtendInfo', {
                    orderId: item.orderId,
                    paymentMethod: item.paymentMethod,
                    deliveryMethod: item.deliveryMethod,
                    remark: item.remark
                }).then((res) => {
                    this.loadingShow = false;
                    var data = res;
                    if (data.code == '0') {
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        });
                        this.editorShow = false;
                        this.tab_fn();
                    } else {
                        this.$message.error(data.message);
                    }
                })
            },
            queryAllPaymentOptions() {//获取支付方式列表
                MyGet('/fast-sys/api/refund/queryAllPaymentOptions').then((data) => {
                    if (data.code == '0') {
                        this.allPaymentOptions = data.data;
                    } else {
                        this.$message.error(data.message);
                    }
                })
            },
            queryAllDeliveryOptions() {//获取配送方式列表
                MyGet('/fast-sys/api/refund/queryAllDeliveryOptions').then((data) => {
                    if (data.code == '0') {
                        this.allDeliveryOptions = data.data;
                    } else {
                        this.$message.error(data.message);
                    }
                })
            },
            queryExtraInfo(orderId) {
                MyGet('/fast-sys/api/refund/queryExtraInfo', {orderId: orderId}).then((data) => {
                    if (data.code == '0') {
                        this.changeDialoInf.deliveryMethod = data.data.deliveryMethod;
                        this.changeDialoInf.paymentMethod = data.data.paymentMethod;
                        this.changeDialoInf.remark = data.data.remark;
                    } else {
                        this.$message.error(data.message);
                    }
                })
            },
            changeInf(item) {
                this.changeDialoInf = item;
                if (item.changeVal == 'disableMultiDist') {//取消再发放设置
                    this.setUpShow = true;
                } else if (item.changeVal == 'setDisabled') {//设置为不发放
                    this.setUpShow2 = true;
                } else if (item.changeVal == 'extraInfo') {//编辑附加信息
                    this.editorShow = true;
                    this.queryExtraInfo(item.orderId);//获得编辑信息的数据
                } else if (item.changeVal == 'multiDist') {//设置为再发放
                    this.setUpShow3 = true;
                }
            },
            getSmsCode() {
                var url = '/fast-sys/api/refund/sendMessage';
                MyPost(url, {
                    username: this.user_con.userName
                }).then((data) => {
                    if (data.code == '0') {
                        if (this.sec == 0) {
                            this.sec = 60;
                            this.timer();
                        }
                    } else {
                        this.$message.error(data.message);
                    }
                })
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.tab_fn();
            },
            search_clk() {
                this.search_list.date_val[0] == null && (this.search_list.date_val[0] = '');
                this.search_list.date_val[1] == null && (this.search_list.date_val[1] = '');
                this.search_list.dateSuc_val[0] == null && (this.search_list.dateSuc_val[0] = '');
                this.search_list.dateSuc_val[1] == null && (this.search_list.dateSuc_val[1] = '');
                this.search_list.dateEnd_val[0] == null && (this.search_list.dateEnd_val[0] = '');
                this.search_list.dateEnd_val[1] == null && (this.search_list.dateEnd_val[1] = '');
                if (this.search_list.date_val[1] != '' && this.CompareDate(this.search_list.date_val[0], this.search_list.date_val[1])) {
                    this.$message.error('签单开始日期不能大于结束日期')
                    return false
                }
                if (this.CompareDate(this.search_list.date_val[0], this.GetDateStr(0))) {
                    this.$message.error('签单开始日期不能大于今天')
                    return false
                }
                if (this.CompareDate(this.search_list.date_val[1], this.GetDateStr(0))) {
                    this.$message.error('签单结束日期不能大于今天')
                    return false
                }
                if (this.search_list.dateSuc_val[1] != '' && this.CompareDate(this.search_list.dateSuc_val[0], this.search_list.dateSuc_val[1])) {
                    this.$message.error('发放发起开始日期不能大于结束日期')
                    return false
                }
                if (this.CompareDate(this.search_list.dateSuc_val[0], this.GetDateStr(0))) {
                    this.$message.error('发放发起开始日期不能大于今天')
                    return false
                }
                if (this.CompareDate(this.search_list.dateSuc_val[1], this.GetDateStr(0))) {
                    this.$message.error('发放发起结束日期不能大于今天')
                    return false
                }
                if (this.search_list.dateEnd_val[1] != '' && this.CompareDate(this.search_list.dateEnd_val[0], this.search_list.dateEnd_val[1])) {
                    this.$message.error('发放成功开始日期不能大于结束日期')
                    return false
                }
                if (this.CompareDate(this.search_list.dateEnd_val[0], this.GetDateStr(0))) {
                    this.$message.error('发放成功开始日期不能大于今天')
                    return false
                }
                if (this.CompareDate(this.search_list.dateEnd_val[1], this.GetDateStr(0))) {
                    this.$message.error('发放成功结束日期不能大于今天')
                    return false
                }
                this.currentPage = 1;
                this.tab_fn();
            },
            downExcel() {
                this.search_list.date_val[0] == null && (this.search_list.date_val[0] = '');
                this.search_list.date_val[1] == null && (this.search_list.date_val[1] = '');
                this.search_list.dateSuc_val[0] == null && (this.search_list.dateSuc_val[0] = '');
                this.search_list.dateSuc_val[1] == null && (this.search_list.dateSuc_val[1] = '');
                if (this.search_list.date_val[1] != '' && this.CompareDate(this.search_list.date_val[0], this.search_list.date_val[1])) {
                    this.$message.error('签单开始日期不能大于结束日期')
                    return false
                }
                if (this.CompareDate(this.search_list.date_val[0], this.GetDateStr(0))) {
                    this.$message.error('签单开始日期不能大于今天')
                    return false
                }
                if (this.CompareDate(this.search_list.date_val[1], this.GetDateStr(0))) {
                    this.$message.error('签单结束日期不能大于今天')
                    return false
                }
                if (this.search_list.dateSuc_val[1] != '' && this.CompareDate(this.search_list.dateSuc_val[0], this.search_list.dateSuc_val[1])) {
                    this.$message.error('发放发起开始日期不能大于结束日期')
                    return false
                }
                if (this.CompareDate(this.search_list.dateSuc_val[0], this.GetDateStr(0))) {
                    this.$message.error('发放发起开始日期不能大于今天')
                    return false
                }
                if (this.CompareDate(this.search_list.dateSuc_val[1], this.GetDateStr(0))) {
                    this.$message.error('发放发起结束日期不能大于今天')
                    return false
                }
                var url = '/fast-sys/api/refund/downloadDistRecords?startDate=' + this.search_list.date_val[0] + '&endDate=' + this.search_list.date_val[1] + '&createTimeStart=' + this.search_list.dateSuc_val[0] + '&createTimeEnd=' + this.search_list.dateSuc_val[1] + '&licenseNo=' + this.search_list.licenseNo + '&frameNo=' + this.search_list.frameNo + '&insuredName=' + this.search_list.insuredName + '&policyNo=' + this.search_list.policyNo + '&receiverName=' + this.search_list.receiverName + '&status=' + this.search_list.status + '&num=' + this.currentPage + '&size=15&distributedTimes=' + this.search_list.distributedTimes;
                location.href = encodeURI(encodeURI(url));
            },
            tab_fn() {
                this.loadingShow = true;
                var status = '';
                if (this.search_list.status == '发放状态') {
                    status = '全部'
                } else {
                    status = this.search_list.status;
                }
                MyPost('/fast-sys/api/refund/queryDistRecords', {
                    startDate: this.search_list.date_val[0],
                    endDate: this.search_list.date_val[1],
                    createTimeStart: this.search_list.dateSuc_val[0],
                    createTimeEnd: this.search_list.dateSuc_val[1],
                    successTimeStart: this.search_list.dateEnd_val[0],
                    successTimeEnd: this.search_list.dateEnd_val[1],
                    licenseNo: this.search_list.licenseNo,
                    frameNo: this.search_list.frameNo,
                    insuredName: this.search_list.insuredName,
                    policyNo: this.search_list.policyNo,
                    receiverName: this.search_list.receiverName,
                    status: status,
                    distributedTimes: this.search_list.distributedTimes,
                    num: this.currentPage,
                    size: 15
                }).then((data) => {
                    this.loadingShow = false;
                    if (data.code == '0') {
                        if (data.data.dataList) {
                            for (var k in data.data.dataList) {
                                data.data.dataList[k].changeVal = '';
                            }
                            this.tableData = data.data.dataList;
                            this.totalRecord = data.data.general.size;
                            this.distributingNum = data.data.general.distributingNum;
                            this.distributingAmount = data.data.general.distributingAmount;
                            this.distributedNum = data.data.general.distributedNum;
                            this.distributedAmount = data.data.general.distributedAmount;
                            this.search_show = true;
                            this.page_show = true;
                        } else {
                            this.tableData = [];
                            this.totalRecord = 0;
                            this.page_show = false;
                            this.search_show = false;
                        }
                        this.queryAllPaymentOptions();
                        this.queryAllDeliveryOptions();
                    } else {
                        this.$message.error(data.message);
                    }
                })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .costList
        .nav_tip
            background #fff
            border-bottom 1px solid #E8E8E8
            height 62px
            p
                color #000
                line-height 62px
                padding-left 32px
                font-weight bold
                font-size 18px
                span
                    font-size 16px
                    color #000
                    padding-left 30px
        .search_con
            border-radius 2px
            border-bottom 1px solid #E9E9E9
            background #fff
            overflow hidden
            .search_nav
                padding 12px 0 0 32px
                overflow hidden
                .search_date
                    float left
                    font-size 12px
                    line-height 32px
                .el-date-editor.el-input, .el-date-editor.el-input__inner
                    float left
                    width 120px
                    margin-right 8px
                    margin-bottom 12px
                    display inline
                    height 32px
                .el-input--suffix .el-input__inner
                    padding-right 0
                .w130
                    float left
                    display inline
                    margin-right 8px
                    width 114px
                    height 32px
                    margin-bottom 12px
                .w90
                    float left
                    display inline
                    margin-right 8px
                    width 90px
                    height 32px
                    margin-bottom 12px
                .w100
                    float left
                    display inline
                    margin-right 8px
                    margin-bottom 12px
                    width 120px
                .w110
                    float left
                    display inline
                    margin-right 8px
                    width 110px
                    height 32px
                    margin-bottom 12px
                .w150
                    float left
                    display inline
                    margin-right 8px
                    width 150px
                    height 32px
                    margin-bottom 12px
                .mb24
                    margin-bottom 12px
                &:nth-child(2)
                    padding-top 0
            .searcn_end_mod
                overflow hidden
                background #F7F7F7
                border-radius 4px 4px 0 0 4px
                margin 0 22px 12px 32px
                p
                    font-size 12px
                    color rgba(0, 0, 0, 0.85)
                    padding-left 8px
                    line-height 22px
                    float left
                    padding 10px 13px 10px 0
                    .iconBlue
                        color #1890FF
                        margin-left 8px
                        margin-right 8px
                .down_top
                    font-size 12px
                    line-height 42px
                    margin-right 40px
                    display inline
                    color #1890FF
                    cursor pointer
                    float left
                    width 10%
        .search_bom
            border-radius 2px
            background #fff
            overflow hidden
            .result_con
                margin 16px 32px 24px 32px
                .cost_icon
                    font-size 12px
                    width 14px
                    height 14px
                    text-align center
                    line-height 14px
                    border-radius 2px
                    margin-left 4px
                    font-style normal
                    display inline-block
                    background #E6F7FF
                .cost_not
                    font-size 12px
                    width 14px
                    height 14px
                    text-align center
                    line-height 14px
                    border-radius 2px
                    margin-left 4px
                    font-style normal
                    display inline-block
                    background #EDEDED
                .cost_sp
                    display block
                .change_sel
                    float left
                    width 130px
                .el-table thead tr
                    background #FAFAFA
                    font-size 12px
                    color rgba(0, 0, 0, 0.85)
                    border-radius 4px 4px 0 0
                    height 35px
                .el-table thead th > .cell
                    font-weight bold
                .el-table tbody tr
                    font-size 12px
                .el-table td, .el-table th
                    padding 3px 0
                .fail_state
                    color #FF0000
            .pagenum_mod
                overflow hidden
                padding-bottom 16px
                .pageination_css
                    margin-right 74px
                    display inline
                    float right
                .el-pagination.is-background .el-pager li, .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev
                    background #FFFFFF
                    border 1px solid #D9D9D9
                    border-radius 6px
                .el-pagination.is-background .el-pager li.active
                    border none
                    background #1890FF
        .el-dialog__header
            font-size 18px
            color #484848
            text-align center
        .el-dialog__body
            padding 0 70px 0 85px
        .el-dialog__footer
            padding 30px 70px 30px 30px
        .inf_content
            margin-top 30px
            overflow hidden
            .inf_cen_top
                padding-bottom 14px
                border-bottom 1px solid #F0F0F0
                .issueCon
                    overflow hidden
                    .issueBox
                        padding-top 14px
                        float left
                        span
                            font-size 14px
                            float left
                            margin-right 10px
                            display inline
                            color #484848
                            line-height 32px
                        .issue_ipt
                            float left
                            width 180px
                        p
                            font-size 12px
                            color #1890FF
                            text-align right
                            line-height 18px
                            padding-top 4px
                    .floatR
                        float right
            .inf_box
                overflow hidden
                span
                    font-size 14px
                    color #484848
                    line-height 20px
                    margin-right 48px
                    display inline
                    float left
                    &:nth-last-child(1)
                        float right
                        margin-right 0
            .inf_sy
                margin-top 14px
                overflow hidden
                h3
                    color #484848
                    font-weight bold
                    line-height 20px
                    margin-bottom 4px
                    font-size 14px
                .sybox
                    margin-bottom 4px
                    overflow hidden
                    span
                        color #484848
                        line-height 20px
                        font-size 14px
                    .sy_l
                        float left
                    .sy_y
                        float right
                    &:nth-last-child(1)
                        margin-bottom 0
            .all_sp
                overflow hidden
                margin-top 14px
                span
                    font-size 16px
                    color #484848
                    font-weight bold
                    line-height 22px
                    float right
            .cost_sp
                overflow hidden
                margin-top 14px
                span
                    font-size 14px
                    color #484848
                    font-weight bold
                    line-height 22px
                    float right
            .change_mod
                .changebox
                    margin-top 14px
                    overflow hidden
                    span
                        font-size 14px
                        color #484848
                        line-height 32px
                        width 108px
                        float left
                    .change_ipt
                        width 290px
                        float left
            .cost_text_mod
                .cost_textbox
                    margin-top 14px
                    overflow hidden
                    p
                        font-size 14px
                        color #484848
                        line-height 20px
                        margin-right 50px
                        float left
                        i
                            font-size 12px
                            width 14px
                            height 14px
                            text-align center
                            line-height 14px
                            border-radius 2px
                            margin-left 4px
                            font-style normal
                            display inline-block
                            &:nth-child(1)
                                margin-left 6px
                        .cost_icon
                            background #E6F7FF
                        .cost_not
                            background #EDEDED
                        &:nth-last-child(1)
                            margin-right 0
            .cost_tit
                background #FFFBE6
                border 1px solid #FFE58F
                border-radius 4px
                height 40px
                line-height 40px
                margin-bottom 14px
                overflow hidden
                p
                    font-size 14px
                    color rgba(0, 0, 0, 0.85)
                    font-weight bold
                    .cost_rellow
                        margin 0 10px 0 20px
                        color #FAAD14
            .mt14
                margin-top 20px
            .timemod
                width 290px
                height 32px
                border 1px solid rgba(0, 0, 0, 0.15)
                border-radius 4px
                overflow hidden
                span
                    float right
                    font-size 12px
                    color #363636
                    width 98px
                    height 24px
                    line-height 24px
                    text-align center
                    cursor pointer
                    margin-top 4px
                    margin-right 6px
                    display inline
                    background rgba(222, 222, 222, 0.65)
                    border-radius 5px
                .time_ipt
                    width 180px
                    height 32px
                    line-height 32px
                    font-family "Microsoft Yahei", "Arial"
                    font-size 14px
                    float left
                    .el-input__inner
                        border 0
            .batchImportCon
                overflow hidden
                .listbox
                    overflow hidden
                    margin-bottom 14px
                    height 40px
                .list_tit
                    font-size 14px
                    color #212121
                    width 100px
                    line-height 32px
                    float left
                .w164
                    float left
                    display inline
                    width 354px
                .listloadbox
                    overflow hidden
                    margin-bottom 14px
                    .list_tit
                        font-size 14px
                        color #212121
                        width 100px
                        line-height 40px
                        float left
                .areaBox
                    height 82px
                    .list_tit
                        font-size 14px
                        color #212121
                        width 100px
                        line-height 80px
                        float left
                    .area_ipt
                        width 354px
                        height 80px
                        float left
                    .el-textarea__inner
                        height 80px
                        font-size 13px
            .setUpCon
                overflow hidden
                p
                    line-height 30px
                    font-size 14px
                    span
                        display inline-block
                        width 50%
                .set_sel
                    width 150px
                    margin-left 20px
                    span
                        width auto
                .cost_icon
                    font-size 12px
                    width 14px
                    height 14px
                    text-align center
                    line-height 14px
                    border-radius 2px
                    margin-left 4px
                    font-style normal
                    display inline-block
                    background #E6F7FF
                .cost_not
                    font-size 12px
                    width 14px
                    height 14px
                    text-align center
                    line-height 14px
                    border-radius 2px
                    margin-left 4px
                    font-style normal
                    display inline-block
                    background #EDEDED
        .minW640 .el-dialog
            min-width 640px
</style>
