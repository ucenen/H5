import Router from 'vue-router'
import store from "../store/store";

const login = resolve => require(['components/login/login.vue'], resolve);//登录页
const home = resolve => require(['components/home/home.vue'], resolve);//首页
const jump = resolve => require(['components/jump/jump.vue'], resolve);//跳转页
const accountSet = resolve => require(['components/accountSet/accountSet.vue'], resolve);//账户设置
const homePage = resolve => require(['components/homePage/homePage.vue'], resolve);//账户设置

/*酒企*/
const enterpriseList = resolve => require(['components/enterpriseList/enterpriseList.vue'], resolve);//酒企列表
const enterpriseInfor = resolve => require(['components/enterpriseInfor/enterpriseInfor.vue'], resolve);//酒企信息
const addEnterprise = resolve => require(['components/addEnterprise/addEnterprise.vue'], resolve);//添加酒企
const enterpriseAccount = resolve => require(['components/enterpriseAccount/enterpriseAccount.vue'], resolve);//酒企账号
const ceshi = resolve => require(['components/ceshi/ceshi.vue'], resolve);
/*商品*/
// const commodityList = resolve => require(['components/commodityList/commodityList.vue'], resolve);//商品模板
const commodityList = resolve => require(['components/commodityListManage/commodityListManage.vue'], resolve);//商品模板
const skuList = resolve => require(['components/skuList/skuList.vue'], resolve);//sku列表
const skuExamine = resolve => require(['components/skuExamine/skuExamine.vue'], resolve);//sku审核
const skuRecovery = resolve => require(['components/skuRecovery/skuRecovery.vue'], resolve);//sku回收站
const categoryManagement = resolve => require(['components/categoryManagement/categoryManagement.vue'], resolve);//类目管理
const brandExamine = resolve => require(['components/brandExamine/brandExamine.vue'], resolve);//品牌管理
const parameterConfiguration = resolve => require(['components/parameterConfiguration/parameterConfiguration.vue'], resolve);//参数配置
const addParameter = resolve => require(['components/addParameter/addParameter.vue'], resolve);//添加参数
const pictureLibraryManagement = resolve => require(['components/pictureLibraryManagement/pictureLibraryManagement.vue'], resolve);//图片库管理
const pictureLibraryRecovery = resolve => require(['components/pictureLibraryRecovery/pictureLibraryRecovery.vue'], resolve);//图片回收站
const pictureInfor = resolve => require(['components/pictureInfor/pictureInfor.vue'], resolve);//相册详情
const addPicture = resolve => require(['components/addPicture/addPicture.vue'], resolve);//新增相册
const addCommodity = resolve => require(['components/addCommodity/addCommodity.vue'], resolve);//新增商品
const addCommodityManage = resolve => require(['components/addCommodityManage/addCommodityManage.vue'], resolve);//新增商品
const commodityPreview = resolve => require(['components/commodityPreview/commodityPreview.vue'], resolve);//商品预览
const addSku = resolve => require(['components/addSku/addSku.vue'], resolve);//新增sku
const addSkuDetail = resolve => require(['components/addSkuDetail/addSkuDetail.vue'], resolve);//新增sku
const addCommodityDetail = resolve => require(['components/addCommodityDetail/addCommodityDetail.vue'], resolve);//商品管理新增sku
const categoryManagementAttr = resolve => require(['components/categoryManagementAttr/categoryManagementAttr.vue'], resolve);//商品属性

/*采购管理*/
// const purchasingManagement = resolve => require(['components/purchasingManagement/purchasingManagement.vue'], resolve);//采购管理
const addPurchase = resolve => require(['components/addPurchase/addPurchase.vue'], resolve);//新增采购
const purchaseWarehousing = resolve => require(['components/purchaseWarehousing/purchaseWarehousing.vue'], resolve);//采购入库
const purchaseDeliverGoods = resolve => require(['components/purchaseDeliverGoods/purchaseDeliverGoods.vue'], resolve);//发货管理
const enterpriseDeliveryManagement = resolve => require(['components/enterpriseDeliveryManagement/enterpriseDeliveryManagement.vue'], resolve);//发货列表
const invoiceDetails = resolve => require(['components/invoiceDetails/invoiceDetails.vue'], resolve);//发货单详情
const codeInformation = resolve => require(['components/codeInformation/codeInformation.vue'], resolve);//码信息
const receivingManagement = resolve => require(['components/receivingManagement/receivingManagement.vue'], resolve);//收货管理
const receiptDetails = resolve => require(['components/receiptDetails/receiptDetails.vue'], resolve);//收货单详情

/*库存*/
const warehousingManagement = resolve => require(['components/warehousingManagement/warehousingManagement.vue'], resolve);//入库管理
// const warehouseConfigurationList = resolve => require(['components/warehouseConfigurationList/warehouseConfigurationList.vue'], resolve);//仓库配置
// const warehouseConfigurationSet = resolve => require(['components/warehouseConfigurationSet/warehouseConfigurationSet.vue'], resolve);//仓库编辑

/*门店*/

const storeAccount = resolve => require(['components/storeAccount/storeAccount.vue'], resolve);//门店账号
const storeRoleList = resolve => require(['components/storeRoleList/storeRoleList.vue'], resolve);//门店角色
const roleConfigure = resolve => require(['components/roleConfigure/roleConfigure.vue'], resolve);//权限配置
const storeMember = resolve => require(['components/storeMember/storeMember.vue'], resolve);//门店会员
const memberInfor = resolve => require(['components/memberInfor/memberInfor.vue'], resolve);//会员详情
const memberGrade = resolve => require(['components/memberGrade/memberGrade.vue'], resolve);//会员等级
const addGrade = resolve => require(['components/addGrade/addGrade.vue'], resolve);//添加等级
const growSet = resolve => require(['components/growSet/growSet.vue'], resolve);//成长值设置
const storeGoods = resolve => require(['components/storeGoods/storeGoods.vue'], resolve);//门店商品
const storeGoodsManage = resolve => require(['components/storeGoodsManage/storeGoodsManage.vue'], resolve);//门店商品管理
const storePurchase = resolve => require(['components/storePurchase/storePurchase.vue'], resolve);//门店采购
const purchaseOrderDetail = resolve => require(['components/purchaseOrderDetail/purchaseOrderDetail.vue'], resolve);//采购单详情
const orderReview = resolve => require(['components/orderReview/orderReview.vue'], resolve);//订单复核
const reviewDetail = resolve => require(['components/reviewDetail/reviewDetail.vue'], resolve);//复核详情
const distributionManage = resolve => require(['components/distributionManage/distributionManage.vue'], resolve);//配货管理
const distributionDetail = resolve => require(['components/distributionDetail/distributionDetail.vue'], resolve);//配货详情
const bulkShipment = resolve => require(['components/bulkShipment/bulkShipment.vue'], resolve);//批量发货
const shipmentSearch = resolve => require(['components/shipmentSearch/shipmentSearch.vue'], resolve);//发货查询
const storeReturns = resolve => require(['components/storeReturns/storeReturns.vue'], resolve);//门店退货
const returnOrderDetail = resolve => require(['components/returnOrderDetail/returnOrderDetail.vue'], resolve);//退货单详情
const retailOrder = resolve => require(['components/retailOrder/retailOrder.vue'], resolve);//门店零售
const retailOrderDetail = resolve => require(['components/retailOrderDetail/retailOrderDetail.vue'], resolve);//零售订单详情



const addRetailOrder = resolve => require(['components/addRetailOrder/addRetailOrder.vue'], resolve);//新增零售订单
const storeStaff = resolve => require(['components/storeStaff/storeStaff.vue'], resolve);//门店员工

/*系统*/
const platformInformationSet = resolve => require(['components/platformInformationSet/platformInformationSet.vue'], resolve);//平台信息设置
const logisticsCompanyList = resolve => require(['components/logisticsCompanyList/logisticsCompanyList.vue'], resolve);//物流公司
const logisticsCompanySet = resolve => require(['components/logisticsCompanySet/logisticsCompanySet.vue'], resolve);//物流公司设置
const carManageList = resolve => require(['components/carManageList/carManageList.vue'], resolve);//车辆管理
const carManageSet = resolve => require(['components/carManageSet/carManageSet.vue'], resolve);//车辆设置
const payManageList = resolve => require(['components/payManageList/payManageList.vue'], resolve);//支付设置
const payManageSet = resolve => require(['components/payManageSet/payManageSet.vue'], resolve);//支付设置
const dataDictionary = resolve => require(['components/dataDictionary/dataDictionary.vue'], resolve);//字典管理
const systemSet = resolve => require(['components/systemSet/systemSet.vue'], resolve);//系统设置



/*权限*/
const menuManageSet = resolve => require(['components/power/menuManageSet.vue'], resolve);//菜单维护
const rolePermissions = resolve => require(['components/rolePermissions/rolePermissions.vue'], resolve);//角色权限
const roleUserPermissions = resolve => require(['components/roleUserPermissions/roleUserPermissions.vue'], resolve);//用户管理
const costList = resolve => require(['components/costList/costList.vue'], resolve);//费用发放记录列表

/*waitfor*/
const plfh = resolve => require(['components/waitingFor/plfh.vue'], resolve);//

const ckgl = resolve => require(['components/waitingFor/ckgl.vue'], resolve);//
const kcpd = resolve => require(['components/waitingFor/kcpd.vue'], resolve);//
const mgl = resolve => require(['components/waitingFor/mgl.vue'], resolve);//
const mcx = resolve => require(['components/waitingFor/mcx.vue'], resolve);//
const mth = resolve => require(['components/waitingFor/mth.vue'], resolve);//
const jqdz = resolve => require(['components/waitingFor/jqdz.vue'], resolve);//
const mddz = resolve => require(['components/waitingFor/mddz.vue'], resolve);//
const mdgl = resolve => require(['components/waitingFor/mdgl.vue'], resolve);//
const mdjs = resolve => require(['components/waitingFor/mdjs.vue'], resolve);//
const mdyg = resolve => require(['components/waitingFor/mdyg.vue'], resolve);//


/*采购管理*/
const prochusingManagement = resolve => require(['../modules/pms/pms01f/prochusingManagement.vue'], resolve);//采购管理
const prochusingInfo = resolve => require(['../modules/pms/pms01f/prochusingInfo.vue'], resolve);//采购管理查看
const prochusingAdd = resolve => require(['../modules/pms/pms01f/prochusingAdd.vue'], resolve);//采购管理新增
    /*采购收货*/
const receivingManage = resolve => require(['../modules/pms/pms03f/receivingManage.vue'], resolve);//采购管理
const receivingManageAdd = resolve => require(['../modules/pms/pms03f/receivingManageAdd.vue'], resolve);//采购管理新增
const receivingManageInfo = resolve => require(['../modules/pms/pms03f/receivingManageInfo.vue'], resolve);//采购管理查看
   //供应商发货管理
const receivingDeliveryManage = resolve => require(['../modules/pms/pms02f/receivingDeliveryManage.vue'], resolve);
const receivingDeliveryManageAdd = resolve => require(['../modules/pms/pms02f/receivingDeliveryManageAdd.vue'], resolve);
const receivingDeliveryManageInfo = resolve => require(['../modules/pms/pms02f/receivingDeliveryManageInfo.vue'], resolve);

/*门店管理*/
const storeInventoryManagement = resolve => require(['../modules/sms/sms09f/storeInventoryManagement.vue'], resolve);//门店库存
const storeInformationAdd = resolve => require(['../modules/sms/sms01f/storeInformationAdd.vue'], resolve);//新增门店
const storeInformationManagement = resolve => require(['../modules/sms/sms01f/storeInformationManagement.vue'], resolve);//门店列表
const storeInformation = resolve => require(['../modules/sms/sms01f/storeInformation.vue'], resolve);//门店信息
/*01门店采购*/
const storeProchusingAdd = resolve => require(['../modules/sms/sms07f/storeProchusingAdd.vue'], resolve);
const storeProchusingInfo = resolve => require(['../modules/sms/sms07f/storeProchusingInfo.vue'], resolve);
const storeProchusingManagement = resolve => require(['../modules/sms/sms07f/storeProchusingManagement.vue'], resolve);

/* 教学 */
const schoolVideoList = resolve => require(['../modules/school/schoolVideoList.vue'], resolve);
// const schoolVideoAdd = resolve => require(['../modules/school/schoolVideoAdd.vue'], resolve);
const schoolCategory = resolve => require(['../modules/school/category.vue'], resolve);

/*入库管理*/
/*仓库管理All*/
/*01仓库配置*/
const warehouseInformationManagement = resolve => require(['../modules/ims/ims01f/warehouseInformationManagement.vue'], resolve);//
const warehouseInformationManagementAdd = resolve => require(['../modules/ims/ims01f/warehouseInformationManagementAdd.vue'], resolve);//
/*02入库管理*/
const stockInManagerment = resolve => require(['../modules/ims/ims02f/stockInManagerment.vue'], resolve);//
const stockInManagermentAdd = resolve => require(['../modules/ims/ims02f/stockInManagermentAdd.vue'], resolve);//
const stockInManagermentInfo = resolve => require(['../modules/ims/ims02f/stockInManagermentInfo.vue'], resolve);//
/*03出库管理*/
const stockOutManagerment = resolve => require(['../modules/ims/ims03f/stockOutManagerment.vue'], resolve);//
const huiyuanshezhi = resolve => require(['../modules/ims/ims03f/huiyuanshezhi.vue'], resolve);//
const huiyuanrenzheng = resolve => require(['../modules/ims/ims03f/huiyuanrenzheng.vue'], resolve);//
const stockOutManagermentAdd = resolve => require(['../modules/ims/ims03f/stockOutManagermentAdd.vue'], resolve);//
const stockOutManagermentInfo = resolve => require(['../modules/ims/ims03f/stockOutManagermentInfo.vue'], resolve);//
/*04库存盘点*/
const inventoryCheckManagement = resolve => require(['../modules/ims/ims04f/inventoryCheckManagement.vue'], resolve);//
const inventoryCheckManagementAdd = resolve => require(['../modules/ims/ims04f/inventoryCheckManagementAdd.vue'], resolve);//
const inventoryCheckManagementInfo = resolve => require(['../modules/ims/ims04f/inventoryCheckManagementInfo.vue'], resolve);//
/*05库存查询*/
const inventoryQuery = resolve => require(['../modules/ims/ims05f/inventoryQuery.vue'], resolve);
/*05库存流水*/
const inventoryFlow = resolve => require(['../modules/ims/ims06f/inventoryFlow.vue'], resolve);
const inventoryFlowInfo = resolve => require(['../modules/ims/ims06f/inventoryFlowInfo.vue'], resolve);

/*供应商管理*/
const supplierRelationshipManagement = resolve => require(['../modules/srm/supplierRelationshipManagement.vue'], resolve);//供应商管理
const supplierRelationshipAdd = resolve => require(['../modules/srm/supplierRelationshipAdd.vue'], resolve);//新增 编辑 供应商
const supplierRelationshipInformation = resolve => require(['../modules/srm/supplierRelationshipInformation.vue'], resolve);//供应商信息
/*const enterpriseInfor = resolve => require(['../modules/srm/inventoryFlow.vue'], resolve);//酒企信息
const addEnterprise = resolve => require(['../modules/srm/inventoryFlow.vue'], resolve);//添加酒企
const enterpriseAccount = resolve => require(['../modules/srm/inventoryFlow.vue'], resolve);//酒企账号*/


/*产品管理*/
const productManagement = resolve => require(['../modules/product/productManagement.vue'], resolve);//产品管理
const liveBroadcastAdd = resolve => require(['../modules/product/liveBroadcastAdd.vue'], resolve);//新增 编辑 产品
const productInformation = resolve => require(['../modules/product/productInformation.vue'], resolve);//产品信息
const bringGoodsVideoAdd = resolve => require(['../modules/product/bringGoodsVideoAdd.vue'], resolve);//新增 编辑 带货视频
const skuPriceList = resolve => require(['../modules/product/skuPriceList.vue'], resolve);//新增 编辑 带货视频

/*订单管理*/
const orderManagement = resolve => require(['../modules/order/orderManagement.vue'], resolve);//订单列表

/*广告管理*/
const advertisementManagement = resolve => require(['../modules/ad/advertisementManagement.vue'], resolve);//订单列表

/*同步管理*/
const synchroManagementNew = resolve => require(['../modules/synchro/synchroManagementNew.vue'], resolve);//同步管理

/*提现审核*/
const balanceChangeAudit = resolve => require(['../modules/balance/balanceChangeAudit.vue'], resolve);//提现审核

export default new Router({
    history: false,
    hashbang: true,
    base: __dirname,
    routes: [
        {
            path: '/',
            name: 'home',
            component: home,
            redirect: '/login',
            meta: {
                requireAuth: true
            },
            children: [
                {
                    path: '/balanceChangeAudit',
                    component: balanceChangeAudit,
                    name: 'balanceChangeAudit',
                    meta: {
                        title: '提现审核',
                        requireAuth: true
                    }
                },
                {
                    path: '/synchroManagementNew',
                    component: synchroManagementNew,
                    name: 'synchroManagementNew',
                    meta: {
                        title: '同步管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/advertisementManagement',
                    component: advertisementManagement,
                    name: 'advertisementManagement',
                    meta: {
                        title: '广告管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/orderManagement',
                    component: orderManagement,
                    name: 'orderManagement',
                    meta: {
                        title: '订单列表',
                        requireAuth: true
                    }
                },
                {
                    path: '/productManagement',
                    component: productManagement,
                    name: 'productManagement',
                    meta: {
                        title: '产品管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/liveBroadcastAdd',
                    component: liveBroadcastAdd,
                    name: 'liveBroadcastAdd',
                    meta: {
                        title: '直播带货',
                        requireAuth: true
                    }
                },
                {
                    path: '/skuPriceList',
                    component: skuPriceList,
                    name: 'skuPriceList',
                    meta: {
                        title: 'sku信息',
                        requireAuth: true
                    }
                },
                {
                    path: '/bringGoodsVideoAdd',
                    component: bringGoodsVideoAdd,
                    name: 'bringGoodsVideoAdd',
                    meta: {
                        title: '新增带货视频',
                        requireAuth: true
                    }
                },
                {
                    path: '/productInformation',
                    component: productInformation,
                    name: 'productInformation',
                    meta: {
                        title: '产品信息',
                        requireAuth: true
                    }
                },
                {
                    path: '/mdyg',
                    component: mdyg,
                    name: 'mdyg',
                    meta: {
                        title: '门店员工',
                        requireAuth: true
                    }
                },
                {
                    path: '/mdjs',
                    component: mdjs,
                    name: 'mdjs',
                    meta: {
                        title: '门店角色',
                        requireAuth: true
                    }
                },
                {
                    path: '/mdgl',
                    component: mdgl,
                    name: 'mdgl',
                    meta: {
                        title: '门店管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/mddz',
                    component: mddz,
                    name: 'mddz',
                    meta: {
                        title: '门店对账',
                        requireAuth: true
                    }
                },
                {
                    path: '/jqdz',
                    component: jqdz,
                    name: 'jqdz',
                    meta: {
                        title: '酒企对账',
                        requireAuth: true
                    }
                },
                {
                    path: '/mth',
                    component: mth,
                    name: 'mth',
                    meta: {
                        title: '码替换',
                        requireAuth: true
                    }
                },
                {
                    path: '/mcx',
                    component: mcx,
                    name: 'mcx',
                    meta: {
                        title: '码查询',
                        requireAuth: true
                    }
                },
                {
                    path: '/mgl',
                    component: mgl,
                    name: 'mgl',
                    meta: {
                        title: '码管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/inventoryCheckManagement',
                    component: inventoryCheckManagement,
                    name: 'inventoryCheckManagement',
                    meta: {
                        title: '库存盘点',
                        requireAuth: true
                    }
                },
                {
                    path: '/inventoryCheckManagementAdd',
                    component: inventoryCheckManagementAdd,
                    name: 'inventoryCheckManagementAdd',
                    meta: {
                        title: '新增库存盘点',
                        requireAuth: true
                    }
                },
                {
                    path: '/inventoryCheckManagementInfo',
                    component: inventoryCheckManagementInfo,
                    name: 'inventoryCheckManagementInfo',
                    meta: {
                        title: '库存盘点详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/schoolCategory',
                    component: schoolCategory,
                    name: 'schoolCategory',
                    meta: {
                        title: '教学分类',
                        requireAuth: true
                    }
                },
                {
                    path: '/schoolVideoList',
                    component: schoolVideoList,
                    name: 'schoolVideoList',
                    meta: {
                        title: '教学视频',
                        requireAuth: true
                    }
                },
                /*{
                    path: '/schoolVideoAdd',
                    component: schoolVideoAdd,
                    name: 'schoolVideoAdd',
                    meta: {
                        title: '新增教学视频',
                        requireAuth: true
                    }
                },*/
                {
                    path: '/warehouseInformationManagement',
                    component: warehouseInformationManagement,
                    name: 'warehouseInformationManagement',
                    meta: {
                        title: '仓库配置',
                        requireAuth: true
                    }
                },
                {
                    path: '/warehouseInformationManagementAdd',
                    component: warehouseInformationManagementAdd,
                    name: 'warehouseInformationManagementAdd',
                    meta: {
                        title: '新增仓库',
                        requireAuth: true
                    }
                },
                {
                    path: '/inventoryFlow',
                    component: inventoryFlow,
                    name: 'inventoryFlow',
                    meta: {
                        title: '库存流水',
                        requireAuth: true
                    }
                },
                {
                    path: '/inventoryFlowInfo',
                    component: inventoryFlowInfo,
                    name: 'inventoryFlowInfo',
                    meta: {
                        title: '库存流水',
                        requireAuth: true
                    }
                },{
                    path: '/inventoryQuery',
                    component: inventoryQuery,
                    name: 'inventoryQuery',
                    meta: {
                        title: '库存查询',
                        requireAuth: true
                    }
                },
                {
                    path: '/ckgl',
                    component: ckgl,
                    name: 'ckgl',
                    meta: {
                        title: '出库管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/plfh',
                    component: plfh,
                    name: 'plfh',
                    meta: {
                        title: '批量发货',
                        requireAuth: true
                    }
                },
                {
                    path: '/stockInManagerment',
                    component: stockInManagerment,
                    name: 'stockInManagerment',
                    meta: {
                        title: '入库管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/stockInManagermentAdd',
                    component: stockInManagermentAdd,
                    name: 'stockInManagermentAdd',
                    meta: {
                        title: '新增入库',
                        requireAuth: true
                    }
                },
                {
                    path: '/stockInManagermentInfo',
                    component: stockInManagermentInfo,
                    name: 'stockInManagermentInfo',
                    meta: {
                        title: '入库单详情',
                        requireAuth: true
                    }
                },
				{
				    path: '/huiyuanshezhi',
				    component: huiyuanshezhi,
				    name: 'huiyuanshezhi',
				    meta: {
				        title: '会员费用设置',
				        requireAuth: true
				    }
				},
				{
				    path: '/huiyuanrenzheng',
				    component: huiyuanrenzheng,
				    name: 'huiyuanrenzheng',
				    meta: {
				        title: '会员实名认证',
				        requireAuth: true
				    }
				},
                {
                    path: '/stockOutManagerment',
                    component: stockOutManagerment,
                    name: 'stockOutManagerment',
                    meta: {
                        title: '出库管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/stockOutManagermentAdd',
                    component: stockOutManagermentAdd,
                    name: 'stockOutManagermentAdd',
                    meta: {
                        title: '新增出库',
                        requireAuth: true
                    }
                },
                {
                    path: '/stockOutManagermentInfo',
                    component: stockOutManagermentInfo,
                    name: 'stockOutManagermentInfo',
                    meta: {
                        title: '出库单详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/jump',
                    component: jump,
                    name: 'jump',
                    meta: {
                        title: 'jump',
                        requireAuth: true
                    }
                },
               /* {
                    path: '/enterpriseList',
                    component: enterpriseList,
                    name: 'enterpriseList',
                    meta: {
                        title: '酒企管理',
                        requireAuth: true
                    }
                },*/
                {
                    path: '/supplierRelationshipManagement',
                    component: supplierRelationshipManagement,
                    name: 'supplierRelationshipManagement',
                    meta: {
                        title: '供应商管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/supplierRelationshipAdd',
                    component: supplierRelationshipAdd,
                    name: 'supplierRelationshipAdd',
                    meta: {
                        title: '新增供应商',
                        requireAuth: true
                    }
                },
                {
                    path: '/supplierRelationshipInformation',
                    component: supplierRelationshipInformation,
                    name: 'supplierRelationshipInformation',
                    meta: {
                        title: '供应商信息',
                        requireAuth: true
                    }
                },
                {
                    path: '/homePage',
                    component: homePage,
                    name: 'homePage',
                    meta: {
                        title: '系统首页',
                        requireAuth: true
                    }
                },
                {
                    path: '/enterpriseInfor',
                    component: enterpriseInfor,
                    name: 'enterpriseInfor',
                    meta: {
                        title: '酒企信息',
                        requireAuth: true
                    }
                },
                {
                    path: '/addEnterprise',
                    component: addEnterprise,
                    name: 'addEnterprise',
                    meta: {
                        title: '添加酒企',
                        requireAuth: true
                    }
                },
                {
                    path: '/commodityList',
                    component: commodityList,
                    name: 'commodityList',
                    meta: {
                        title: '商品管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/skuList',
                    component: skuList,
                    name: 'skuList',
                    meta: {
                        title: 'SKU管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/skuExamine',
                    component: skuExamine,
                    name: 'skuExamine',
                    meta: {
                        title: 'SKU审核',
                        requireAuth: true
                    }
                },
                {
                    path: '/skuRecovery',
                    component: skuRecovery,
                    name: 'skuRecovery',
                    meta: {
                        title: 'SKU回收站',
                        requireAuth: true
                    }
                },
                {
                    path: '/categoryManagement',
                    component: categoryManagement,
                    name: 'categoryManagement',
                    meta: {
                        title: '商品分类',
                        requireAuth: true
                    }
                },
                {
                    path: '/brandExamine',
                    component: brandExamine,
                    name: 'brandExamine',
                    meta: {
                        title: '商品品牌',
                        requireAuth: true
                    }
                },
                {
                    path: '/parameterConfiguration',
                    component: categoryManagementAttr,
                    name: 'parameterConfiguration',
                    meta: {
                        title: '商品属性',
                        requireAuth: true
                    }
                },
                {
                    path: '/pictureLibraryManagement',
                    component: pictureLibraryManagement,
                    name: 'pictureLibraryManagement',
                    meta: {
                        title: '图片库管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/pictureInfor',
                    component: pictureInfor,
                    name: 'pictureInfor',
                    meta: {
                        title: '相册详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/addPicture',
                    component: addPicture,
                    name: 'addPicture',
                    meta: {
                        title: '新增相册',
                        requireAuth: true
                    }
                },
                {
                    path: '/addCommodity',
                    component: addCommodity,
                    name: 'addCommodity',
                    meta: {
                        title: '商品管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/addCommodityDetail',
                    component: addCommodityDetail,
                    name: 'addCommodityDetail',
                    meta: {
                        title: '商品管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/addCommodityManage',
                    component: addCommodityManage,
                    name: 'addCommodityManage',
                    meta: {
                        title: '商品管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/commodityPreview',
                    component: commodityPreview,
                    name: 'commodityPreview',
                    meta: {
                        title: '商品预览',
                        requireAuth: true
                    }
                },
                {
                    path: '/addSku',
                    component: addSku,
                    name: 'addSku',
                    meta: {
                        title: 'SKU管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/addSkuDetail',
                    component: addSkuDetail,
                    name: 'addSkuDetail',
                    meta: {
                        title: 'SKU管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/accountSet',
                    component: accountSet,
                    name: 'accountSet',
                    meta: {
                        title: '账户设置',
                        requireAuth: true
                    }
                },
                // {
                //     path: '/purchasingManagement',
                //     component: purchasingManagement,
                //     name: 'purchasingManagement',
                //     meta: {
                //         title: '采购管理-盛'
                //     }
                // },

                {
                    path: '/receivingManage',
                    component: receivingManage,
                    name: 'receivingManage',
                    meta: {
                        title: '采购收货',
                        requireAuth: true
                    }
                },
                {
                    path: '/receivingManageAdd',
                    component: receivingManageAdd,
                    name: 'receivingManageAdd',
                    meta: {
                        title: '新增采购收货',
                        requireAuth: true
                    }
                },
                {
                    path: '/receivingManageInfo',
                    component: receivingManageInfo,
                    name: 'receivingManageInfo',
                    meta: {
                        title: '采购收货详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/receivingDeliveryManage',
                    component: receivingDeliveryManage,
                    name: 'receivingDeliveryManage',
                    meta: {
                        title: '供应商发货',
                        requireAuth: true
                    }
                },
                {
                    path: '/receivingDeliveryManageAdd',
                    component: receivingDeliveryManageAdd,
                    name: 'receivingDeliveryManageAdd',
                    meta: {
                        title: '新增供应商发货',
                        requireAuth: true
                    }
                },
                {
                    path: '/receivingDeliveryManageInfo',
                    component: receivingDeliveryManageInfo,
                    name: 'receivingDeliveryManageInfo',
                    meta: {
                        title: '供应商发货详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/prochusingManagement',
                    component: prochusingManagement,
                    name: 'prochusingManagement',
                    meta: {
                        title: '采购管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/prochusingInfo',
                    component: prochusingInfo,
                    name: 'prochusingInfo',
                    meta: {
                        title: '采购管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/prochusingAdd',
                    component: prochusingAdd,
                    name: 'prochusingAdd',
                    meta: {
                        title: '采购管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/purchaseWarehousing',
                    component: purchaseWarehousing,
                    name: 'purchaseWarehousing',
                    meta: {
                        title: '酒企发货',
                        requireAuth: true
                    }
                },
                {
                    path: '/purchaseDeliverGoods',
                    component: purchaseDeliverGoods,
                    name: 'purchaseDeliverGoods',
                    meta: {
                        title: '收货查询',
                        requireAuth: true
                    }
                },
                {
                    path: '/addPurchase',
                    component: addPurchase,
                    name: 'addPurchase',
                    meta: {
                        title: '商品模板',
                        requireAuth: true
                    }
                },
                {
                    path: '/enterpriseDeliveryManagement',
                    component: enterpriseDeliveryManagement,
                    name: 'enterpriseDeliveryManagement',
                    meta: {
                        title: '发货列表',
                        requireAuth: true
                    }
                },
                {
                    path: '/invoiceDetails',
                    component: invoiceDetails,
                    name: 'invoiceDetails',
                    meta: {
                        title: '发货单详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/codeInformation',
                    component: codeInformation,
                    name: 'codeInformation',
                    meta: {
                        title: '码信息',
                        requireAuth: true
                    }
                },
                {
                    path: '/receiptDetails',
                    component: receiptDetails,
                    name: 'receiptDetails',
                    meta: {
                        title: '收货单详情',
                        requireAuth: true
                    }
                },
                // {
                //     path: '/warehousingManagement',
                //     component: warehousingManagement,
                //     name: 'warehousingManagement',
                //     meta: {
                //         title: '入库管理'
                //     }
                // },
                {
                    path: '/pictureLibraryRecovery',
                    component: pictureLibraryRecovery,
                    name: 'pictureLibraryRecovery',
                    meta: {
                        title: '图片回收站',
                        requireAuth: true
                    }
                },
                {
                    path: '/storeGoods',
                    component: storeGoods,
                    name: 'storeGoods',
                    meta: {
                        title: '门店商品',
                        requireAuth: true
                    }
                },
                {
                    path: '/retailOrder',
                    component: retailOrder,
                    name: 'retailOrder',
                    meta: {
                        title: '门店零售',
                        requireAuth: true
                    }
                },
                {
                    path: '/addRetailOrder',
                    component: addRetailOrder,
                    name: 'addRetailOrder',
                    meta: {
                        title: '新增零售订单',
                        requireAuth: true
                    }
                },
                {
                    path: '/storeProchusingManagement',
                    component: storeProchusingManagement,
                    name: 'storeProchusingManagement',
                    meta: {
                        title: '门店采购',
                        requireAuth: true
                    }
                },
                {
                    path: '/storeProchusingInfo',
                    component: storeProchusingInfo,
                    name: 'storeProchusingInfo',
                    meta: {
                        title: '门店采购',
                        requireAuth: true
                    }
                },
                {
                    path: '/storeProchusingAdd',
                    component: storeProchusingAdd,
                    name: 'storeProchusingAdd',
                    meta: {
                        title: '门店采购',
                        requireAuth: true
                    }
                },
                {
                    path: '/storeInventoryManagement',
                    component: storeInventoryManagement,
                    name: 'storeInventoryManagement',
                    meta: {
                        title: '门店库存',
                        requireAuth: true
                    }
                },
                {
                    path: '/storeReturns',
                    component: storeReturns,
                    name: 'storeReturns',
                    meta: {
                        title: '门店退货',
                        requireAuth: true
                    }
                },
                {
                    path: '/storeMember',
                    component: storeMember,
                    name: 'storeMember',
                    meta: {
                        title: '门店会员',
                        requireAuth: true
                    }
                },
                {
                    path: '/storeStaff',
                    component: storeStaff,
                    name: 'storeStaff',
                    meta: {
                        title: '门店员工',
                        requireAuth: true
                    }
                },
                {
                    path: '/storeInformationManagement',
                    component: storeInformationManagement,
                    name: 'storeInformationManagement',
                    meta: {
                        title: '门店管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/retailOrderDetail',
                    component: retailOrderDetail,
                    name: 'retailOrderDetail',
                    meta: {
                        title: '零售订单详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/purchaseOrderDetail',
                    component: purchaseOrderDetail,
                    name: 'purchaseOrderDetail',
                    meta: {
                        title: '采购单详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/returnOrderDetail',
                    component: returnOrderDetail,
                    name: 'returnOrderDetail',
                    meta: {
                        title: '退货单详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/enterpriseAccount',
                    component: enterpriseAccount,
                    name: 'enterpriseAccount',
                    meta: {
                        title: '酒企账号',
                        requireAuth: true
                    }
                },
                {
                    path: '/storeAccount',
                    component: storeAccount,
                    name: 'storeAccount',
                    meta: {
                        title: '门店账号',
                        requireAuth: true
                    }
                },
                {
                    path: '/storeInformationAdd',
                    component: storeInformationAdd,
                    name: 'storeInformationAdd',
                    meta: {
                        title: '新增门店',
                        requireAuth: true
                    }
                },
                {
                    path: '/storeRoleList',
                    component: storeRoleList,
                    name: 'storeRoleList',
                    meta: {
                        title: '门店角色',
                        requireAuth: true
                    }
                },
                {
                    path: '/roleConfigure',
                    component: roleConfigure,
                    name: 'roleConfigure',
                    meta: {
                        title: '权限配置',
                        requireAuth: true
                    }
                },
                {
                    path: '/rolePermissions',
                    component: rolePermissions,
                    name: 'rolePermissions',
                    meta: {
                        title: '角色维护',
                        requireAuth: true
                    }
                },
                {
                    path: '/roleUserPermissions',
                    component: roleUserPermissions,
                    name: 'roleUserPermissions',
                    meta: {
                        title: '用户管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/menuManageSet',
                    component: menuManageSet,
                    name: 'menuManageSet',
                    meta: {
                        title: '菜单维护',
                        requireAuth: true
                    }
                },
                {
                    path: '/memberInfor',
                    component: memberInfor,
                    name: 'memberInfor',
                    meta: {
                        title: '会员详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/memberGrade',
                    component: memberGrade,
                    name: 'memberGrade',
                    meta: {
                        title: '会员等级',
                        requireAuth: true
                    }
                },
                {
                    path: '/addGrade',
                    component: addGrade,
                    name: 'addGrade',
                    meta: {
                        title: '添加等级',
                        requireAuth: true
                    }
                },
                {
                    path: '/growSet',
                    component: growSet,
                    name: 'growSet',
                    meta: {
                        title: '成长值设置',
                        requireAuth: true
                    }
                },
                {
                    path: '/storeGoodsManage',
                    component: storeGoodsManage,
                    name: 'storeGoodsManage',
                    meta: {
                        title: '门店商品管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/orderReview',
                    component: orderReview,
                    name: 'orderReview',
                    meta: {
                        title: '订单复核',
                        requireAuth: true
                    }
                },
                {
                    path: '/reviewDetail',
                    component: reviewDetail,
                    name: 'reviewDetail',
                    meta: {
                        title: '复核详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/distributionManage',
                    component: distributionManage,
                    name: 'distributionManage',
                    meta: {
                        title: '配货管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/distributionDetail',
                    component: distributionDetail,
                    name: 'distributionDetail',
                    meta: {
                        title: '配货详情',
                        requireAuth: true
                    }
                },
                {
                    path: '/bulkShipment',
                    component: bulkShipment,
                    name: 'bulkShipment',
                    meta: {
                        title: '批量发货',
                        requireAuth: true
                    }
                },
                {
                    path: '/shipmentSearch',
                    component: shipmentSearch,
                    name: 'shipmentSearch',
                    meta: {
                        title: '发货查询',
                        requireAuth: true
                    }
                },
                {
                    path: '/addParameter',
                    component: addParameter,
                    name: 'addParameter',
                    meta: {
                        title: '参数配置',
                        requireAuth: true
                    }
                },
                {
                    path: '/storeInformation',
                    component: storeInformation,
                    name: 'storeInformation',
                    meta: {
                        title: '门店信息',
                        requireAuth: true
                    }
                },
                {
                    path: '/platformInformationSet',
                    component: platformInformationSet,
                    name: 'platformInformationSet',
                    meta: {
                        title: '平台信息',
                        requireAuth: true
                    }
                },
                {
                    path: '/logisticsCompanyList',
                    component: logisticsCompanyList,
                    name: 'logisticsCompanyList',
                    meta: {
                        title: '物流公司',
                        requireAuth: true
                    }
                },
                {
                    path: '/logisticsCompanySet',
                    component: logisticsCompanySet,
                    name: 'logisticsCompanySet',
                    meta: {
                        title: '物流公司设置',
                        requireAuth: true
                    }
                },
                {
                    path: '/carManageList',
                    component: carManageList,
                    name: 'carManageList',
                    meta: {
                        title: '车辆管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/carManageSet',
                    component: carManageSet,
                    name: 'carManageSet',
                    meta: {
                        title: '车辆设置',
                        requireAuth: true
                    }
                },
                // {
                //     path: '/warehouseConfigurationSet',
                //     component: warehouseConfigurationSet,
                //     name: 'warehouseConfigurationSet',
                //     meta: {
                //         title: '基本信息',
                //         requireAuth: true
                //     }
                // },
                {
                    path: '/payManageList',
                    component: payManageList,
                    name: 'payManageList',
                    meta: {
                        title: '支付设置',
                        requireAuth: true
                    }
                },
                {
                    path: '/payManageSet',
                    component: payManageSet,
                    name: 'payManageSet',
                    meta: {
                        title: '支付设置',
                        requireAuth: true
                    }
                },
                {
                    path: '/dataDictionary',
                    component: dataDictionary,
                    name: 'dataDictionary',
                    meta: {
                        title: '字典管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/systemSet',
                    component: systemSet,
                    name: 'systemSet',
                    meta: {
                        title: '系统设置',
                        requireAuth: true
                    }
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: login,
            meta: {
                title: '登录'
            }
        },
        {
            path: '*',
            redirect: '/login'
        }
    ]
})

