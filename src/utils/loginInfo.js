/**
 * Created by qinchao2 on 2019/6/26.
 */
const KEYMAP = {
    authKey: "auth-key",
    appKey: "appKey",
    appId: "appId",
    lastLoginAt: "lastLoginAt",
    loginId: "loginId",
    reflushToken: "reflushToken",
    token: "token",
    role: "role",
    shopName: "shopName",
    shopCode: "shopCode",
    terminal: "terminal",
    jobType:"jobType",
    rCode:"rCode",
    userId:'userId',
    isAuthKeyTimeout: 'isAuthKeyTimeout'
};

class LoginInfo{
    constructor(data) {
        this.info = {
            authKey: "",
            appKey: "",
            appId: "",
            lastLoginAt: "",
            loginId: "",
            reflushToken: "",
            token: "",
            role: "",
            shopName: "",
            shopCode: "",
            terminal: "",
            jobType: "",
            rCode: "",
            userId: ""
        };
    }

    static getInstance = () => {
        if(!window.loginInfo) {
            window.loginInfo = new LoginInfo();
        }
        return window.loginInfo;
    };

    get authKey(){
        if(this.info.authKey){
            return this.info.authKey;
        }else {
            this.info.authKey = localStorage.getItem(KEYMAP.authKey);
            return this.info.authKey || '';
        }
    }
    set authKey(authKey){
        this.info.authKey = authKey;
        localStorage.setItem(KEYMAP.authKey, authKey);
    }

    get appKey(){
        if(this.info.appKey){
            return this.info.appKey;
        }else {
            this.info.appKey = localStorage.getItem(KEYMAP.appKey);
            return this.info.appKey || '';
        }
    }
    set appKey(appKey){
        this.info.appKey = appKey;
        localStorage.setItem(KEYMAP.appKey, appKey);
    }

    get appId(){
        if(this.info.appId){
            return this.info.appId;
        }else {
            this.info.appId = localStorage.getItem(KEYMAP.appId);
            return this.info.appId || '';
        }
    }
    set appId(appId){
        this.info.appId = appId;
        localStorage.setItem(KEYMAP.appId, appId);
    }

    get lastLoginAt(){
        if(this.info.lastLoginAt){
            return this.info.lastLoginAt;
        }else {
            this.info.lastLoginAt = localStorage.getItem(KEYMAP.lastLoginAt);
            return this.info.lastLoginAt || '';
        }
    }
    set lastLoginAt(lastLoginAt){
        this.info.lastLoginAt = lastLoginAt;
        localStorage.setItem(KEYMAP.lastLoginAt, lastLoginAt);
    }

    get loginId(){
        if(this.info.loginId){
            return this.info.loginId;
        }else {
            this.info.loginId = localStorage.getItem(KEYMAP.loginId);
            return this.info.loginId || '';
        }
    }
    set loginId(loginId){
        this.info.loginId = loginId;
        localStorage.setItem(KEYMAP.loginId, loginId);
    }

    get reflushToken(){
        if(this.info.reflushToken){
            return this.info.reflushToken;
        }else {
            this.info.reflushToken = localStorage.getItem(KEYMAP.reflushToken);
            return this.info.reflushToken || '';
        }
    }
    set reflushToken(reflushToken){
        this.info.reflushToken = reflushToken;
        localStorage.setItem(KEYMAP.reflushToken, reflushToken);
    }

    get token(){
        if(this.info.token){
            return this.info.token;
        }else {
            this.info.token = localStorage.getItem(KEYMAP.token);
            return this.info.token || '';
        }
    }
    set token(token){
        this.info.token = token;
        localStorage.setItem(KEYMAP.token, token);
    }

    get role(){
        if(this.info.role){
            return this.info.role;
        }else {
            this.info.role = localStorage.getItem(KEYMAP.role);
            return this.info.role || '';
        }
    }
    set role(role){
        this.info.role = role;
        localStorage.setItem(KEYMAP.role, role);
    }

    get shopName(){
        if(this.info.shopName){
            return this.info.shopName;
        }else {
            this.info.shopName = localStorage.getItem(KEYMAP.shopName);
            return this.info.shopName || '';
        }
    }
    set shopName(shopName){
        this.info.shopName = shopName;
        localStorage.setItem(KEYMAP.shopName, shopName);
    }

    get shopCode(){
        if(this.info.shopCode){
            return this.info.shopCode;
        }else {
            this.info.shopCode = localStorage.getItem(KEYMAP.shopCode);
            return this.info.shopCode || '';
        }
    }
    set shopCode(shopCode){
        this.info.shopCode = shopCode;
        localStorage.setItem(KEYMAP.shopCode, shopCode);
    }

    get terminal(){
        if(this.info.terminal){
            return this.info.terminal;
        }else {
            this.info.terminal = localStorage.getItem(KEYMAP.terminal);
            return this.info.terminal || '';
        }
    }
    set terminal(terminal){
        this.info.terminal = terminal;
        localStorage.setItem(KEYMAP.terminal, terminal);
    }

    get jobType(){
        if(this.info.jobType){
            return this.info.jobType;
        }else {
            this.info.jobType = localStorage.getItem(KEYMAP.jobType);
            return this.info.jobType || '';
        }
    }
    set jobType(jobType){
        this.info.jobType = jobType;
        localStorage.setItem(KEYMAP.jobType, jobType);
    }
    get rCode(){
        if(this.info.rCode){
            return this.info.rCode;
        }else {
            this.info.rCode = localStorage.getItem(KEYMAP.rCode);
            return this.info.rCode || '';
        }
    }
    set rCode(rCode){
        this.info.rCode = rCode;
        localStorage.setItem(KEYMAP.rCode, rCode);
    }
    get userId(){
        if(this.info.userId){
            return this.info.userId;
        }else {
            this.info.userId = localStorage.getItem(KEYMAP.userId);
            return this.info.userId || '';
        }
    }
    set userId(userId){
        this.info.userId = userId;
        localStorage.setItem(KEYMAP.userId, userId);
    }

    get isAuthKeyTimeout(){
        return this.info.isAuthKeyTimeout;
    }
    set isAuthKeyTimeout(isAuthKeyTimeout){
        this.info.isAuthKeyTimeout = isAuthKeyTimeout;
    }

    clearInfo(){
        for(let key in KEYMAP){
            this.info[key] = null;
            localStorage.removeItem(KEYMAP[key]);
        }
    }
}

export default LoginInfo;
