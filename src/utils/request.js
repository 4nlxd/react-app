import {message} from 'antd';
// @ts-ignore
import {fetch} from 'whatwg-fetch';
// import { domain } from '../constant/config';
import loginInfo from './loginInfo';

function checkStatus(response) {
    const _status = response.status;

    if (_status >= 200 && _status < 300) {
        return response;
    }

    if(_status === 403){
        message.error('认证信息已失效, 请重新登录！');

        setTimeout(function(){
            window.location.hash = '/login';
        }, 1000);

        return;
    }else if(_status === 405){
        message.error('禁止登录！');

        setTimeout(function(){
            window.location.hash = '/login';
        }, 1000);

        return;
    }else if(_status === 411){
        message.error('AuthKey不正确！');
    }else if(_status === 412){
        message.error('AuthKey过期！');
    }

    const error = new Error(response.statusText);
    // @ts-ignore
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

export async function requestAsync(url, options){
    const userInfo = loginInfo.getInstance();
    let result = {success: false, status: '500', msg: '', body: {code:'500', data: {}, msg: ''}, headers: undefined, error: undefined};

    let nOptions = options || {}, headers = nOptions.headers || {};
    nOptions.headers = nOptions.headers = {
        ...headers,
        "MSP-AppKey": userInfo.appKey,
        "MSP-AuthKey": userInfo.authKey
    };

    let response = {};
    try{
        response = await fetch(url, nOptions);
        let r = checkStatus(response);
        if(r && r.status === 200){
            const body = await r.json();
            const headers = r.headers;
            result.status = r.status;
            result.success = true;
            result.body = body;
            result.msg = body.message || body.msg;
            result.headers = headers;
        }
        return result;
    }catch (e){
        console.error('requestAsync error');
        console.error(e);
        result.status = response.status || 500;
        result.msg = e.message;
        result.error = e;
    }
    return result;
}

