const ENV = {
    "local": "localhost",
    "dev": "development",
    "uat": "uat",
    "production": "production"
};

const allDomain = {
    [ENV.local]: "https://api-dev.unifiedcloud.lenovo.com/",
    [ENV.dev]: "https://api-dev.unifiedcloud.lenovo.com/",
    [ENV.uat]: "https://api-uat.unifiedcloud.lenovo.com/",
    [ENV.production]: "https://api.unifiedcloud.lenovo.com/"
};

function getEnv(){
    let env = ENV.production;

    if(process.env.REACT_APP_ENV === ENV.production){
        env = ENV.production;
    }else if(process.env.REACT_APP_ENV === ENV.dev){
        env = ENV.dev;
    }else if(process.env.REACT_APP_ENV === ENV.uat){
        env = ENV.uat;
    }else{
        env = ENV.local;
    }

    return env;
}

const env = getEnv();

const API_Domain = {
    env: env,
    domain: allDomain[env]
};

const AppKey = '0CDAC4AFDEDB4A31B6E597B64D371F31';

export { AppKey, API_Domain };
