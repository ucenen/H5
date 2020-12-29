import axios from 'axios'
import qs from 'qs'
import {Message,MessageBox} from 'element-ui';
import store from 'si-store'

axios.defaults.timeout = 45000;
axios.defaults.withCredentials=true;
// axios.defaults.baseURL = "http://192.188.30.115:11000/";
// axios.defaults.baseURL = "http://192.188.30.168:10004/";
axios.interceptors.request.use(config => {
    // loading
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.resolve(error.response)
})

export function checkStatus(response, text) {
    // loading
    // 如果http状态码正常，则直接返回数据
    //console.log(response)
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
        return response.data
        // 如果不需要除了data之外的数据，可以直接 return response.data
    }
    // 异常状态下，把错误信息返回去
    return {
        status: response.status || 408,
        message: response.statusText || text
    }
}

export function checkCode(res) {
    // console.log(res)

    // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
    /*if (res.status == 404) {
     //alert(res.msg)
     Message.error({
     message: res.message,
     center: true
     });
     }*/
    if (res && res.code != '0') {
        if (res.code == '31' || res.code == '11'|| res.code == '500') {
            window.location.href = '#/login';
            if (window.event.preventDefault) window.event.preventDefault();
            window.event.returnValue = false;
            return
        }else if(res.code=='001000'){
            MessageBox.confirm('服务异常，操作中断，请联系管理员', '提示', {
                confirmButtonText: '确定',
                showCancelButton:false,
                type: 'error'
            }).then(() => {

            }).catch(() => {

            });
            return
        }else if(res.code=='401'){
            MessageBox.confirm('当前页面权限授权不完整，请联系管理员开放权限', '提示', {
                confirmButtonText: '确定',
                showCancelButton:false,
                type: 'error'
            }).then(() => {
              window.location.href = '#/login';
            }).catch(() => {
             window.location.href = '#/login';
            });
            return
            /*if(res.message){
             Message.error({
             message: res.message,
             center: true
             });
             }*/
        }
    }
    return res
}

export function MyPostJsonNoStatus(url, data) {
    return axios({
        method: 'post',
        url,
        data: data,
        timeout: 45000,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json; charset=UTF-8',
            'token': store.get('tokenVal')
        }
    }).then(
        (res) => {
            return checkCode(res)
        }
    )
}


export function MyPostJson(url, data) {
    return axios({
        method: 'post',
        url,
        data: data,
        timeout: 45000,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json; charset=UTF-8',
            'token': store.get('tokenVal')
        }
    }).then(
        (response) => {
            return checkStatus(response, '系统异常，请稍后重试')
        }
    ).then(
        (res) => {
            return checkCode(res)
        }
    )
}

export function MyBatchPost(url, data) {
    return axios({
        method: 'post',
        url,
        data: data,
        timeout: 45000,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }]
    }).then(
        (response) => {
            return checkStatus(response, '费用发放处理中，请稍后在历史记录查询发放结果')
        }
    ).then(
        (res) => {
            return checkCode(res)
        }
    )
}

export function MyPostImport2(url, data) {
    return axios({
        method: 'post',
        url,
        data: data,
        timeout: 45000,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }]
    }).then(
        (response) => {
            return checkStatus(response, '清单导入中，请稍后在承保清单查询导入结果')
        }
    ).then(
        (res) => {
            return checkCode(res)
        }
    )
}

export function MyPostImport(url, data) {
    return axios({
        method: 'post',
        url,
        data: data,
        timeout: 45000,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }]
    }).then(
        (response) => {
            return checkStatus(response, '信息导入中，请稍后在历史导入信息查询导入结果')
        }
    ).then(
        (res) => {
            return checkCode(res)
        }
    )
}

export function MyPostNoStatus(url, data) {
    return axios({
        method: 'post',
        url,
        data: data, //qs.stringify(data),
        timeout: 45000,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'token': store.get('tokenVal'),
            '_requestSource': 'web'
        },
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }]
        /*transformRequest: [function (data) {
            data = qs.stringify(data);
            return data;
        }]*/
    }).then(
        (res) => {
            return checkCode(res)
        }
    )
}

export function MyPost(url, data) {
    return axios({
        method: 'post',
        url,
        data: data, //qs.stringify(data),
        timeout: 45000,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'token': store.get('tokenVal'),
			'_requestSource': 'web'
        },
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }]
        /*transformRequest: [function (data) {
            data = qs.stringify(data);
            return data;
        }]*/
    }).then(
        (response) => {
            return checkStatus(response, '系统异常，请稍后重试')
        }
    ).then(
        (res) => {
            return checkCode(res)
        }
    )
}

export function MyPut(url, data) {
    return axios({
        method: 'put',
        //baseURL: 'https://cnodejs.org/api/v1',
        url,
        data: data,
        timeout: 65000,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }).then(
        (response) => {
            return checkStatus(response)
        }
    ).then(
        (res) => {
            return checkCode(res)
        }
    )
}

export function PayPost(url, data) {
    return axios({
        method: 'post',
        //baseURL: 'https://cnodejs.org/api/v1',
        url,
        data: JSON.stringify(data),
        timeout: 65000,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }).then(
        (response) => {
            return checkStatus(response)
        }
    ).then(
        (res) => {
            return checkCode(res)
        }
    )
}

export function QiniuUpload(url, data, head) {
    return axios({
        method: 'post',
        //baseURL: 'https://cnodejs.org/api/v1',
        url,
        data: data,
        timeout: 65000,
        headers: head
    }).then(
        (response) => {
            return checkStatus(response)
        }
    ).then(
        (res) => {
            return checkCode(res)
        }
    )
}

export function MyGetImport(url, params) {
    return axios({
        method: 'get',
        //baseURL: 'https://cnodejs.org/api/v1',
        url,
        params, // get 请求时带的参数
        timeout: 45000,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    }).then(
        (response) => {
            return checkStatus(response, '信息导入中，请稍后在历史导入信息查询导入结果')
        }
    ).then(
        (res) => {
            return checkCode(res)
        }
    )
}

export function MyGetNoStatus(url, params) {
    return axios({
        method: 'get',
        //baseURL: 'https://cnodejs.org/api/v1',
        url,
        params, // get 请求时带的参数
        timeout: 45000,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'token': store.get('tokenVal'),
            '_requestSource': 'web'
        }
    }).then(
    ).then(
        (res) => {
            return checkCode(res)
        }
    )
}

export function MyGet(url, params) {
    return axios({
        method: 'get',
        //baseURL: 'https://cnodejs.org/api/v1',
        url,
        params, // get 请求时带的参数
        timeout: 45000,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'token': store.get('tokenVal'),
			'_requestSource': 'web'
        }
    }).then(
        (response) => {
            return checkStatus(response, '系统异常，请稍后重试')
        }
    ).then(
        (res) => {
            return checkCode(res)
        }
    )
}

