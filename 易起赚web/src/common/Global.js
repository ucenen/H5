import Vue from 'vue'
import moment from 'moment'
import md5 from 'js-md5'

export default {}
import {
	MyGet,
	MyPost
} from 'common/js/request'

Vue.prototype.gRandomString = function(len) {
	len = len || 32 // 默认长度32
	let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
	var pwd = ''
	for (var i = 0; i < len; i++) {
		pwd += chars.charAt(Math.floor(Math.random() * chars.length))
	}
	return pwd
}
Vue.prototype.gUrlGo = function (value) {
    switch (value) {
        case '系统首页':
            return '/homePage'
        /*case '供应商档案':
            return '/supplierRelationshipManagement'*/
		case '提现审核':
			return '/balanceChangeAudit'
        case '同步管理':
            return '/synchroManagementNew'
        case '广告管理':
            return '/advertisementManagement'
        case '订单列表':
            return '/orderManagement'
        case '产品管理':
            return '/productManagement'
        case '供应商档案':
            return '/supplierRelationshipManagement'
        case '商品管理':
            return '/commodityList'
        case 'SKU管理':
            return '/skuList'
        case 'SKU审核':
            return '/skuExamine'
        case 'SKU回收站':
            return '/skuRecovery'
        case '商品分类':
            return '/categoryManagement'
        case '商品品牌':
            return '/brandExamine'
        case '商品属性':
            return '/parameterConfiguration'
        case '图片库管理':
            return '/pictureLibraryManagement'
        case '直播链接':
            return '/prochusingManagement'
        case '发货列表':
            return '/enterpriseDeliveryManagement'
        case '收货查询':
            return '/receivingManage'
        // case '收货管理':
        //     return '/receivingManagement'
        // case '入库管理':
        //     return '/warehousingManagement'
        case '酒企发货':
            return '/receivingDeliveryManage'
        case '门店商品':
            return '/storeGoods'
        case '门店零售':
            return '/retailOrder'
        case '门店采购':
            return '/storeProchusingManagement'
        case '门店库存':
            return '/storeInventoryManagement'
        case '门店退货':
            return '/storeReturns'
        // case '门店员工':
        //     return '/storeStaff'
        case '门店管理':
            return '/storeInformationManagement'
        // case '门店角色':
        //     return '/storeRoleList'
        case '门店会员':
            return '/storeMember'
        case '会员等级':
            return '/memberGrade'
        case '订单复核':
            return '/orderReview'
        case '配货管理':
            return '/distributionManage'
        // case '批量发货':
        //     return '/bulkShipment'
        case '平台信息':
            return '/platformInformationSet'
        case '物流公司':
            return '/logisticsCompanyList'
        case '车辆管理':
            return '/carManageList'

        case '支付设置':
            return '/payManageList'
        case '字典维护':
            return '/dataDictionary'
        case '菜单维护':
            return '/menuManageSet'
        case '角色维护':
            return '/rolePermissions'
        case '用户管理':
            return '/roleUserPermissions'
        case '系统设置':
            return '/systemSet'
        case '批量发货':
            return '/plfh'
        case '会员列表':
            return '/stockInManagerment'
        case '带货返佣设置':
            return '/stockOutManagerment'
		case '会员费用设置':
			return '/huiyuanshezhi'
		case '会员实名认证':
			return '/huiyuanrenzheng'	
        case '广告管理':
            return '/inventoryQuery'
        case '提现审核':
            return '/inventoryFlow'
        case '教学视频':
            return '/schoolVideoList'
        case '教学分类':
            return '/schoolCategory'
        case '教程级别':
            return '/mgl'
        case '码查询':
            return '/mcx'
        case '码替换':
            return '/mth'
        case '酒企对账':
            return '/jqdz'
        case '门店对账':
            return '/mddz'
        // case '门店管理':
        //     return '/mdgl'
        case '门店角色':
            return '/mdjs'
        case '门店员工':
            return '/mdyg'
    }
}

Vue.prototype.timeFormatFun = function(time) {
	if (time) {
		var d = new Date(time.replace(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2}).*$/, '$1 $2 GMT+0000').replace(/-/g, '/'))
		var year = d.getFullYear(); //年
		var month = d.getMonth() + 1; //月
		var day = d.getDate(); //日
		var hh = d.getHours(); //时
		var mm = d.getMinutes(); //分
		var ss = d.getSeconds(); //秒
		var clock = year + "-";
		if (month < 10)
			clock += "0";
		clock += month + "-";
		if (day < 10)
			clock += "0";
		clock += day + " ";
		if (hh < 10)
			clock += "0";

		clock += hh + ":";
		if (mm < 10) clock += '0';
		clock += mm + ":";

		if (ss < 10) clock += '0';
		clock += ss;
		return (clock);
	}
}
Vue.prototype.regexNumberAll = function(str) {
		var num = str + "";
		if (Number(num) <= 0 || num == undefined || num == null) {
			return '0.00';
		}
		if (!/^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]*)?$/.test(num)) {
			return '0.00';
		}
		if (num.indexOf(".") == -1) {
			return num = num + '.00';
		}
		var newStr = num.split('.');
		if (newStr[1].length <= 1) {
			//小数点后只有一位时
			num = num + '0';
		} else if (newStr[1].length > 1) {
			//小数点后两位以上时
			var decimals = newStr[1].substr(0, 2);

			num = newStr[0] + '.' + decimals;

		}

		return num;
	},
	Vue.prototype.timeFormatYYMMDD = function(time) {
		if (time == "" || time == null) {
			return
		}
		if (time) {
			var d = new Date(time)
			var year = d.getFullYear(); //年
			var month = d.getMonth() + 1; //月
			var day = d.getDate(); //日
			var hh = d.getHours(); //时
			var mm = d.getMinutes(); //分
			var ss = d.getSeconds(); //秒
			var clock = year + "-";
			if (month < 10)
				clock += "0";
			clock += month + "-";
			if (day < 10)
				clock += "0";
			clock += day + " ";

			// clock += hh + ":";
			// if (mm < 10) clock += '0';
			// clock += mm + ":";
			//
			// if (ss < 10) clock += '0';
			// clock += ss;
			return (clock);
		}
	}
Vue.prototype.timeFormatYY = function(time) {
	if (time) {
		var d = new Date(time)
		var year = d.getFullYear(); //年
		var month = d.getMonth() + 1; //月
		var day = d.getDate(); //日
		var hh = d.getHours(); //时
		var mm = d.getMinutes(); //分
		var ss = d.getSeconds(); //秒
		var clock = year;

		// clock += hh + ":";
		// if (mm < 10) clock += '0';
		// clock += mm + ":";
		//
		// if (ss < 10) clock += '0';
		// clock += ss;
		return (clock);
	}
}
Vue.prototype.checkPhone = function(str) {
	if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(str))) {
		return false;
	} else {
		return true
	}
}
Vue.prototype.consoleCommon = function(str) {
	if (typeof(str) === "object") {
		console.log("数据===" + JSON.stringify(str))
	} else {
		console.log("数据===" + str)
	}
}
Vue.prototype.clearDouble = function(arr, str) {
	// var formArr = arr.sort();
	var hash = [];
	for (var i = 0; i < arr.length; i++) {
		hash.push(arr[i].value)
	}
	if (hash.indexOf(str) > -1) {
		return true
	} else {
		return false
	}
	// return hash;
}

Vue.prototype.checkNull = function(str) {
	if (str == null || str == "" || str == undefined) {
		return true;
	} else {
		return false
	}
}
Vue.prototype.checkMail = function(v) {
	var reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/; //正则表达式
	if (!reg.test(v)) { //正则验证不通过，格式不对
		return false
	} else {
		return true
	}
}
Vue.prototype.checkMd5 = function(v) {
	var mdData = md5(v);
	return mdData;
}
Vue.prototype.checkPassword = function(v) {
	var reg = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{6,30}'); //正则表达式
	if (!reg.test(v)) { //正则验证不通过，格式不对
		return false
	} else {
		return true
	}
}
Vue.prototype.filterDateTime = function(value) {
	if (typeof value === 'undefined' || value == null) {
		return '1990-01-01 00:00:00'
	}
	var valueString
	if (typeof value === 'string') {
		return value.substring(0, 19)
	}
	if (typeof value === 'object') {
		valueString = moment(value).format('YYYY-MM-DD HH:mm:ss')
		return valueString
	}
	if (typeof value === 'number') {
		valueString = moment(new Date(value)).format('YYYY-MM-DD HH:mm:ss')
		return valueString
	}
	return value
}

Vue.filter('filterDateTimeString', function(value) {
	if (typeof value === 'undefined' || value == null) {
		return '1990-01-01 00:00:00'
	}
	var valueString
	if (typeof value === 'string') {
		return value.substring(0, 19)
	}
	if (typeof value === 'object') {
		valueString = moment(value).format('YYYY-MM-DD HH:mm:ss')
		return valueString
	}
	if (typeof value === 'number') {
		valueString = moment(new Date(value)).format('YYYY-MM-DD HH:mm:ss')
		return valueString
	}
	return value
})
Vue.prototype.checkTime = function(date) {
	const year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let hour = date.getHours();
	let minute = date.getMinutes();
	let second = date.getSeconds();
	month = month > 9 ? month : ('0' + month);
	day = day > 9 ? day : ('0' + day);
	hour = hour > 9 ? hour : ('0' + hour);
	minute = minute > 9 ? minute : ('0' + minute);
	second = second > 9 ? second : ('0' + second);
	const dateTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
	return dateTime;
}
Vue.prototype.getFunctionCode = function(that, code) {
	MyPost('/yl-ms-platform/roleApi/funAction', {
		code: code
	}).then((res) => {

		let {
			code,
			message,
			data
		} = res;
		if (code == '0') {
			let datas = data.map(function(item, index) {
				return item.actionCode
			});
			that.functionCodes = datas;
		} else {
			this.$message.error(message);
		}
	})

}
Vue.prototype.getViewportOffset = function() {
	if (window.innerWidth) {
		return {
			w: window.innerWidth,
			h: window.innerHeight
		}
	} else {
		if (document.compatMode() === 'CSS1Compat') {
			return {
				w: document.documentElement.clientWidth,
				h: document.documentElement.clientHeight
			}
		} else {
			return {
				w: document.body.clientWidth,
				h: document.body.clientHeight
			}
		}
	}
}

Vue.prototype.numAdd = function(num1, num2) {
	var baseNum, baseNum1, baseNum2;
	try {
		baseNum1 = num1.toString().split(".")[1].length;
	} catch (e) {
		baseNum1 = 0;
	}
	try {
		baseNum2 = num2.toString().split(".")[1].length;
	} catch (e) {
		baseNum2 = 0;
	}
	baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
	return (num1 * baseNum + num2 * baseNum) / baseNum;
}

Vue.prototype.numMulti = function(num1, num2) {
	var baseNum = 0;
	try {
		baseNum += num1.toString().split(".")[1].length;
	} catch (e) {}
	try {
		baseNum += num2.toString().split(".")[1].length;
	} catch (e) {}
	return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
}

Vue.prototype.GetDateStr = function(AddDayCount) {
	var dd = new Date()
	dd.setDate(dd.getDate() + AddDayCount) //获取AddDayCount天后的日期
	var y = dd.getFullYear()
	var m = dd.getMonth() + 1 //获取当前月份的日期
	var d = dd.getDate()
	if (m < 10) {
		m = '0' + m;
	}
	if (d < 10) {
		d = '0' + d;
	}
	return y + '-' + m + '-' + d
}

Vue.prototype.CompareDate = function(d1, d2) {
	return ((new Date(d1.replace(/-/g, '\/'))) > (new Date(d2.replace(/-/g, '\/'))))
}

Vue.prototype.IdentityCodeValid = function(code) {
	var city = {
		11: "北京",
		12: "天津",
		13: "河北",
		14: "山西",
		15: "内蒙古",
		21: "辽宁",
		22: "吉林",
		23: "黑龙江 ",
		31: "上海",
		32: "江苏",
		33: "浙江",
		34: "安徽",
		35: "福建",
		36: "江西",
		37: "山东",
		41: "河南",
		42: "湖北 ",
		43: "湖南",
		44: "广东",
		45: "广西",
		46: "海南",
		50: "重庆",
		51: "四川",
		52: "贵州",
		53: "云南",
		54: "西藏 ",
		61: "陕西",
		62: "甘肃",
		63: "青海",
		64: "宁夏",
		65: "新疆",
		71: "台湾",
		81: "香港",
		82: "澳门",
		91: "国外 "
	};
	var tip = "";
	var pass = true;
	if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
		tip = "身份证号格式错误";
		pass = false;
	} else if (!city[code.substr(0, 2)]) {
		tip = "地址编码错误";
		pass = false;
	} else {
		//18位身份证需要验证最后一位校验位
		if (code.length == 18) {
			code = code.split('');
			//∑(ai×Wi)(mod 11)
			//加权因子
			var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
			//校验位
			var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
			var sum = 0;
			var ai = 0;
			var wi = 0;
			for (var i = 0; i < 17; i++) {
				ai = code[i];
				wi = factor[i];
				sum += ai * wi;
			}
			var last = parity[sum % 11];
			if (parity[sum % 11] != code[17]) {
				tip = "请正确输入身份证号";
				pass = false;
			}
		}
	}
	return pass;
}

Vue.prototype.luhmCheck = function(bankno) {
	var lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhm进行比较）
	var first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
	var newArr = new Array();
	for (var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
		newArr.push(first15Num.substr(i, 1));
	}
	var arrJiShu = new Array(); //奇数位*2的积 <9
	var arrJiShu2 = new Array(); //奇数位*2的积 >9
	var arrOuShu = new Array(); //偶数位数组
	for (var j = 0; j < newArr.length; j++) {
		if ((j + 1) % 2 == 1) { //奇数位
			if (parseInt(newArr[j]) * 2 < 9)
				arrJiShu.push(parseInt(newArr[j]) * 2);
			else
				arrJiShu2.push(parseInt(newArr[j]) * 2);
		} else //偶数位
			arrOuShu.push(newArr[j]);
	}
	var jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
	var jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
	for (var h = 0; h < arrJiShu2.length; h++) {
		jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
		jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
	}
	var sumJiShu = 0; //奇数位*2 < 9 的数组之和
	var sumOuShu = 0; //偶数位数组之和
	var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
	var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
	var sumTotal = 0;
	for (var m = 0; m < arrJiShu.length; m++) {
		sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
	}
	for (var n = 0; n < arrOuShu.length; n++) {
		sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
	}
	for (var p = 0; p < jishu_child1.length; p++) {
		sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
		sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
	}
	//计算总和
	sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);
	//计算Luhm值
	var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
	var luhm = 10 - k;
	if (lastNum == luhm) {
		return true;
	} else {
		return false;
	}
}

Vue.prototype.copyFrom = function(obj) {
	return JSON.parse(JSON.stringify(obj));
}

Vue.prototype.deepClone = function(obj) {
	let newObj = Array.isArray(obj) ? [] : {}

	if (obj && typeof obj === "object") {
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				newObj[key] = (obj && typeof obj[key] === 'object') ? this.deepClone(obj[key]) : obj[key];
			}
		}
	}
	return newObj
}
