import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import React from 'react';
import './index.css';
import {setCookie, getCookie, deleteCookie} from './cookie';
import request from '../../utils/request';

class login extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      userName: '', // 用户名
      password: '', // 密码
      remberPass: false, // 默认不记住密码
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.login(values)
      }
    });
  };

  /*
   * 切换记住密码状态
   */
  changeSwitch = (e) => {
    this.setState({
      remberPass: e.target.checked,
    });
  };

  /*
   * 登录
   */
  login = (values) => {
    const {userName, password, code, VcodeValue, remberPass, isChange} = this.state;
    const {history} = this.props;
    let pass = getCookie('password');
    if (values.Vcode !== VcodeValue) { // 假如输入的验证码和图形验证数值不匹配，则返回错误提示
      this.setState({ // 清空验证码
        code: '',
        Vkey: VcodeValue
      });
      return message.error('验证码错误');
    }
    let p = '';

    /*
     * 判断cookie是否存有密码，没有md5加密传输
     * cookie要是有密码，再判断密码框是否修改isChange为true
     * 修改了的话md5加密，没有的话直接传输cookie里的密码
     */
    // if (pass) {
    //   if (isChange) {
    //     p = md5(password);
    //   } else {
    //     p = pass;
    //   }
    // } else {
    //   p = md5(password);
    // }
    const data = {
      account:values.username,
      password:values.password
    };
    // PublicService.fullScreen(document.documentElement);
    request({url: '/login', method: 'POST', data: data}).then((res) => {
      if (res && res.code) {
        if(res.data[0].status===0){
          message.error("限制登陆");
          return;
        }
        message.success('登录成功');
        // sessionStorage.setItem('navSettingsAll', JSON.stringify(res.ret.sub));
        // sessionStorage.setItem('navSettingsList', JSON.stringify(res.ret.sub.slice(1)));
        // sessionStorage.setItem('username', data.userName);
        // PublicService.setCookie('userId', res.data.id);
        if (remberPass) { // 选中记住密码，过期时间设置为14天
          setCookie('username', values.username, 14);
          setCookie('password', values.password, 14);
          setCookie('remberPass', remberPass, 14);
        } else { // 没选中记住密码
          const user = getCookie('username');
          pass = getCookie('password');
          const rember = getCookie('remberPass');
          deleteCookie('username', user);
          deleteCookie('password', pass);
          deleteCookie('remberPass', rember);
        }
        sessionStorage.setItem('username', values.username);
        sessionStorage.setItem('nickName',res.data[0].name);
        sessionStorage.setItem('userimg', res.data[0].imgUrl);
        sessionStorage.setItem('token', res.data[0].token);
        sessionStorage.setItem('isLogin', true);
        sessionStorage.setItem('userId', res.data[0].id);
        sessionStorage.setItem('resourceDTS',JSON.stringify(res.aclass));
        // sessionStorage.setItem('dept',res.data.dept?JSON.stringify(res.data.dept):'');
        // sessionStorage.setItem('areaId',res.data.areaId?res.data.areaId:0);
        // sessionStorage.setItem('areaLevel',res.data.areaLevel?res.data.areaLevel:1);
        // sessionStorage.setItem('resourcesDTO',res.data.resourcesDTO?JSON.stringify(res.data.resourcesDTO) : []);
        setCookie('token', res.data[0].token, 14);
        history.push('/CeramicsShow');
        // this.goToPath(res.data.resourcesDTO.zhswWeb);
        // if (res.ret.sub[0].hasAuthority) {
        // location.replace({ pathname: '/SystemTabs' });
        // if(res.data.areaLevel<=2){
        //   history.push({pathname: '/cockpit/overview'});
        // }else{
        //   history.push({pathname: '/cockpit/UserWindow'});
        // }

        // } else {
        // for (let i = 1; i < res.ret.sub.length; i += 1) {
        // if (res.ret.sub[i].hasAuthority) {
        // history.replace({ pathname: `/${res.ret.sub[i].sub[0].url}` });
        // return false;
        // }
        // }
        // }
      } else if(res){
        message.error(res.message);
        // document.exitFullscreen ? document.exitFullscreen() :
        //   document.mozCancelFullScreen ? document.mozCancelFullScreen() :
        //     document.webkitExitFullscreen ? document.webkitExitFullscreen() : '';
        // message.error(res.message);
        // this.setState({
        //   loading: false, // 隐藏loading
        // });
      }else{
        message.error("连接服务器出错")
      }
    })
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
                initialValue:getCookie('username')?getCookie('username'):""
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
                initialValue:getCookie('password')?getCookie('password'):""
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
                initialValue: getCookie('remberPass')?getCookie('remberPass'):this.state.remberPass,
              }) (<Checkbox onChange={this.changeSwitch}>记住密码</Checkbox>)}
              <Button
                onClick={this.handleSubmit}
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

export default Form.create()(login);
