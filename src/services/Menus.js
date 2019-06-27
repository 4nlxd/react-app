import { requestAsync } from '../utils/request';
import { API_Domain } from '../constant/config';
import loginInfo from '../utils/loginInfo';
import { handleResponse } from '../utils/helper';
import {message} from "antd";

const userInfo = loginInfo.getInstance();

export default {
    getMenus: async () => {
        let response = [];

        let res = await requestAsync(`${API_Domain.domain}new-access-role/roleService/v1/refreshRoles?userId=${userInfo.userId}&appKey=${userInfo.appKey}&system=1`, {
            method: 'GET',
        });

        handleResponse(res, {
            success: () => {
                response = res.body.data;
            },
            fail: ()=>{
                message.error(res.body.msg);
            },
            error: ()=>{
                message.error('菜单获取失败！');
            }
        });

        return response;
    }
}
