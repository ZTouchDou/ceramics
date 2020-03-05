import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React from 'react';
import './index.css'

class login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleClick = ()=>{
    this.props.history.push('/register');
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className='login-background'>
        <div className='login-body'>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{required: true, message: '请输入邮箱或用户名!'}],
              })(
                <Input
                  prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                  placeholder="邮箱/用户名"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{required: true, message: '请输入密码!'}],
              })(
                <Input
                  prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              }) (<Checkbox>记住密码</Checkbox>)}
              <Button
                onClick={() => this.props.history.push("/CeramicsShow")}
                type="primary" htmlType="submit" className="login-form-button" >
                登录
              </Button>
              <div style={{color: 'rgba(255,255,255,1)'}}
                   onClick={this.handleClick}  >
                还没账号？现在去注册！
              </div>
            </Form.Item>
          </Form>
        </div>
        </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(login);

export default Form.create()(login);
