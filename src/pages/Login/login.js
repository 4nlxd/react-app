import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import * as helper from '../../utils/helper';
import loginInfo from '../../utils/loginInfo';
import Service from '../../services/Login';
import styles from './login.module.css';
import logo from '../../assets/images/logo.png';

class LoginForm extends Component{
    render(){
        const { getFieldDecorator } = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input size="large" placeholder="请输入用户名" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input size="large" type="password" placeholder="请输入密码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('vcode', {
                        rules: [{ required: true, message: '请输入OTP密码!' }],
                    })(
                        <Input size="large" placeholder="请输入OTP密码" />
                    )}
                </FormItem>

                <FormItem>
                    <Button size="large" type="primary" htmlType="submit" style={{ width: '100%' }}>登录</Button>
                </FormItem>
            </Form>
        )
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values)=>{
            if(!err){
                this.props.Ok(values);
            }
        });
    };
}

const LoginFormComponent = Form.create()(LoginForm);
const FormItem = Form.Item;

class Login extends Component{
    constructor(props){
        super(props);

        this.state = {

        }
    }

    render(){
        return (
            <div className={ styles.login }>
                <div className={ styles.loginBg }></div>
                <div className={ styles.loginContent }>
                    <div className={ styles.logo }><img src={ logo } alt="Lenovo"/></div>
                    <div className={ styles.loginForm }>
                        <h6>百应后台管理系统</h6>
                        <LoginFormComponent Ok={ this.loginHandler } />
                    </div>
                </div>
            </div>
        )
    }

    loginHandler = async (values) => {
        let userName = values.userName,
            password = helper.getRSAString(values.password),
            OTPCode = values.vcode;

        //do login
        let result = await Service.login({username: encodeURIComponent(userName), pwd: encodeURIComponent(password), picKey: OTPCode});

        let log = loginInfo.getInstance();

        log.authKey = helper.getAuthKey(result.token);
        log.appKey = helper.appKey;
        log.token = result.token;
        log.userId = result.userId;
        log.loginId = result.loginId;
        log.rCode = result.tenancyCode;

        this.props.history.push('/home');
    }
}

export default Login;
