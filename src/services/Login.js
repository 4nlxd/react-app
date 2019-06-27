import { requestAsync } from '../utils/request';
import { API_Domain, AppKey } from '../constant/config';
import { handleResponse } from '../utils/helper';
import { message } from 'antd';

export default {
    login: async({username='', pwd='', picKey}) => {
        let response = {};

        let res = await requestAsync(`${API_Domain.domain}new-access-login/loginService/v1/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            body: `loginId=${username}&password=${pwd}&appKey=${AppKey}&otpCode=${picKey}&system=3`
        });

        handleResponse(res, {
            success: () => {
                response = res.body.data;
            },
            fail: ()=>{
                message.error(res.body.msg);
            },
            error: ()=>{
                message.error('登录失败！');
            }
        });

        return response;
    }
}
