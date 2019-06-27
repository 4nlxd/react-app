import JSEncrypt from 'jsencrypt';
import { AppKey } from '../constant/config';
import LoginInfo from './loginInfo';
import { message } from 'antd';

const prefix = 'c07e21873169f92e@';
const b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const b64pad = "=";
const PublicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD1gojwVPIM/LbAOEhqWulBhOjpDTMugTjnqeszz5YGwGapBs/8f6ojor6xmzKeX9R6ykUiY2T4aiFN1l+cEdI5M1+QajzZzDWl19O6zXKji5TbrwF2aT4q9w0xpS5M/4BoyGVCRGdA3HnUWN547svOumZPBq5QfkCgmJKrhnCzGwIDAQAB';

export const getRSAString = (text) => {
    let result = '';
    try {
        const key = new JSEncrypt();
        key.setPublicKey(PublicKey);
        result = key.encrypt(text);
    } catch (e) {
        result = text;
        console.error('helper.getAuthKey error >>>', e);
    }
    return result;
};

export const getRSALongString = (text) => {
    let result = '';
    try {
        const key = new JSEncrypt();
        key.setPublicKey(PublicKey);
        result = key.encryptLong(text);
    } catch (e) {
        result = text;
        console.error('helper.getAuthKey error >>>', e);
    }
    return result;
};

export const getAuthKey = (token) => {
    const text = token + '::' + (new Date()).valueOf();
    return prefix + getRSALongString(text) + '::' + AppKey;
};

export const hex2b64 = (h) => {
    let i;
    let c;
    let ret = "";
    for (i = 0; i + 3 <= h.length; i += 3) {
        c = parseInt(h.substring(i, i + 3), 16);
        ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
    }
    if (i + 1 === h.length) {
        c = parseInt(h.substring(i, i + 1), 16);
        ret += b64map.charAt(c << 2);
    }
    else if (i + 2 === h.length) {
        c = parseInt(h.substring(i, i + 2), 16);
        ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
    }
    while ((ret.length & 3) > 0) {
        ret += b64pad;
    }
    return ret;
};

export const appKey = AppKey;

export const handleResponse = (response, callback) => {
    if(['400', '403', '405', '411', '412'].find(c=>c === response.status.toString())){
        const logInfo = LoginInfo.getInstance();
        if(!logInfo.isAuthKeyTimeout){
            LoginInfo.getInstance().isAuthKeyTimeout = true;
            message.error('登录超时，3秒后回到登录页面!');
            setTimeout(()=>{
                window.isAuthKeyTimeout = false;
                window.location.hash = '/login';
            }, 3000);

            return;
        }
    }
    else if(response.success && response.body && response.body.code === '200'){
        callback.success(response.body);
    }
    else if(response.success && response.body && response.body.code !== '200'){
        callback.fail && callback.fail((response.body && response.body.msg) || '');
    }
    else{
        if(callback.error){
            callback.error(response.error);
        }else{
            callback.fail && callback.fail((response.body && response.body.msg) || '');
        }
    }
};

(function () {
    JSEncrypt.prototype.encryptLong = function (text) {
        let k = this.getKey();
        try {
            let ct = "";
            // RSA每次加密117bytes，需要辅助方法判断字符串截取位置
            // 1.获取字符串截取点
            let bytes = [];
            bytes.push(0);
            let byteNo = 0;
            let len, c;
            len = text.length;
            let temp = 0;
            for (let i = 0; i < len; i++) {
                c = text.charCodeAt(i);
                if (c >= 0x010000 && c <= 0x10FFFF) {
                    byteNo += 4;
                } else if (c >= 0x000800 && c <= 0x00FFFF) {
                    byteNo += 3;
                } else if (c >= 0x000080 && c <= 0x0007FF) {
                    byteNo += 2;
                } else {
                    byteNo += 1;
                }
                if ((byteNo % 117) >= 114 || (byteNo % 117) === 0) {
                    if (byteNo - temp >= 114) {
                        bytes.push(i);
                        temp = byteNo;
                    }
                }
            }
            // 2.截取字符串并分段加密
            if (bytes.length > 1) {
                for (let i = 0; i < bytes.length - 1; i++) {
                    let str;
                    if (i === 0) {
                        str = text.substring(0, bytes[i + 1] + 1);
                    } else {
                        str = text.substring(bytes[i] + 1, bytes[i + 1] + 1);
                    }
                    let t1 = k.encrypt(str);
                    ct += t1;
                }
                if (bytes[bytes.length - 1] !== text.length - 1) {
                    let lastStr = text.substring(bytes[bytes.length - 1] + 1);
                    ct += k.encrypt(lastStr);
                }
                return hex2b64(ct);
            }
            let t = k.encrypt(text);
            let y = hex2b64(t);
            return y;
        } catch (ex) {
            return false;
        }
    };
})();
