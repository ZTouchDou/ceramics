import React from 'react';
import md5 from 'md5';
import Texty from 'rc-texty';
import Vcode from 'react-vcode';
import moment from 'moment';
import {Icon, message, Switch, Modal,Row,Col,Form, Input, Button, Checkbox} from 'antd';
import {setCookie, getCookie, deleteCookie} from './cookie';
import request from '../../utils/request';
import './index.css';

const codes = [ // 所有可能出现的字符
                // 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                // 'o', 'p', 'q', 'r', 's', 't', 'x', 'u', 'v', 'y', 'z', 'w', 'n',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
];
let positionX = 0;
let positionY = 0;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '', // 用户名
      password: '', // 密码
      code: '', // 验证码
      VcodeValue: '', // 图形验证码默认值
      remberPass: false, // 默认不记住密码
      loading: false, // loding默认不显示
      isChange: false, // 无修改
      S: null,
      Vkey: '',
      imgVisible: false,
      time:moment(),
      timer:''
    };
  }

  componentDidMount() {
    let timer = setInterval(()=>{
      this.setState({
        time:moment()
      })
    },1000);
    this.setState({
      timer
    })
  }

  componentWillMount() {
    const user = getCookie('username');
    const pass = getCookie('password');
    const rember = getCookie('remberPass');
    // 假如cookie中存有用户信息，默认有用户名和密码
    if (user && pass) {
      this.setState({
        userName: user,
        password: pass,
        remberPass: rember,
      });
    } else {
      this.setState({
        userName: '',
        password: '',
        remberPass: false,
      });
    }
    if(this.state.timer){
      clearTimeout(this.state.timer);
    }
  }

  /*
   * 获取验证码
   */
  getVcode = (v) => {
    this.setState({
      VcodeValue: v,
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
    console.log("values:", values);
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
    if(values.username==='admin' && values.password==='123456'){
      history.push('/SystemManagement');
    }else{
      return message.error('用户名或密码错误');
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
    // const data = new FormData();
    // data.append('username', userName);
    // data.append('password', password);
    // this.setState({
    //   loading: true, // 显示loading
    // });
    // // PublicService.fullScreen(document.documentElement);
    // const headers = new Headers({
    //   'Accept': '*/*',
    //   "Content-Type": "multipart/form-data",
    // });
    // request({url: '/hzz/authentication/login', method: 'POST', form: data, headers}).then((res) => {
    //   if (res.code === 1) {
    //     message.success('登录成功');
    //     // sessionStorage.setItem('navSettingsAll', JSON.stringify(res.ret.sub));
    //     // sessionStorage.setItem('navSettingsList', JSON.stringify(res.ret.sub.slice(1)));
    //     // sessionStorage.setItem('username', data.userName);
    //     this.setState({
    //       loading: false, // 隐藏loading
    //     });
    //     sessionStorage.setItem('isLogin', true);
    //     sessionStorage.setItem('areaId', res.data.areaId);
    //     console.log("res.data.id:", res.data.id);
    //     // PublicService.setCookie('userId', res.data.id);
    //     if (remberPass) { // 选中记住密码，过期时间设置为14天
    //       setCookie('username', userName, 14);
    //       setCookie('password', password, 14);
    //       setCookie('remberPass', remberPass, 14);
    //     } else { // 没选中记住密码
    //       const user = getCookie('username');
    //       pass = getCookie('password');
    //       const rember = getCookie('remberPass');
    //       deleteCookie('username', user);
    //       deleteCookie('password', pass);
    //       deleteCookie('remberPass', rember);
    //     }
    //     sessionStorage.setItem('username', userName);
    //     sessionStorage.setItem('token', res.data.token);
    //     sessionStorage.setItem('loginId', res.data.id);
    //     sessionStorage.setItem('dept',res.data.dept?JSON.stringify(res.data.dept):'');
    //     sessionStorage.setItem('areaId',res.data.areaId?res.data.areaId:0);
    //     sessionStorage.setItem('areaLevel',res.data.areaLevel?res.data.areaLevel:1);
    //     sessionStorage.setItem('resourcesDTO',res.data.resourcesDTO?JSON.stringify(res.data.resourcesDTO) : []);
    //     setCookie('token', res.data.token, 14);
    //     this.goToPath(res.data.resourcesDTO.zhswWeb);
    //     // if (res.ret.sub[0].hasAuthority) {
    //     // location.replace({ pathname: '/SystemTabs' });
    //     // if(res.data.areaLevel<=2){
    //     //   history.push({pathname: '/cockpit/overview'});
    //     // }else{
    //     //   history.push({pathname: '/cockpit/UserWindow'});
    //     // }
    //
    //     // } else {
    //     // for (let i = 1; i < res.ret.sub.length; i += 1) {
    //     // if (res.ret.sub[i].hasAuthority) {
    //     // history.replace({ pathname: `/${res.ret.sub[i].sub[0].url}` });
    //     // return false;
    //     // }
    //     // }
    //     // }
    //   } else {
    //     // document.exitFullscreen ? document.exitFullscreen() :
    //     //   document.mozCancelFullScreen ? document.mozCancelFullScreen() :
    //     //     document.webkitExitFullscreen ? document.webkitExitFullscreen() : '';
    //     // message.error(res.message);
    //     // this.setState({
    //     //   loading: false, // 隐藏loading
    //     // });
    //   }
    //   return false;
    // }).catch((err) => {
    //   this.render();
    //   message.error('用户名或密码错误！');
    //   this.setState({
    //     loading: false, // 隐藏loading
    //   });
    // });
  };

  goToPath = (item) => {
    const {history} = this.props;
    console.log(item,'111')
        let len = item.length;
          for(let i = 0;i<len;i++){
            if (item[i].sub.length == 0 && item[i].hasAuthority) {
              const path = item[i].url;
              history.push({pathname: path});
              break;
            }else if(item[i].sub.length > 0 && item[i].hasAuthority){
              this.goToPath(item[i].sub);
            }
          }

  }
  onMouseOver = (e) => {
    var x = e.clientX, y = e.clientY;
    if (positionX === 0 && positionY === 0) {
      positionX = x;
      positionY = y;
    }
    let S;
    if (x > positionX) {
      S = {
        transform: 'translateX(-15px) route(15deg)',
      }
    } else if (x < positionX) {
      S = {
        transform: 'translateX(15px) route(-15deg)',
      }
    }
    this.setState({
      S,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.login(values)
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {userName, password, remberPass, code, loading, S, Vkey, imgVisible,time} = this.state;
    return (
      <div className='loginBox' onMouseOver={this.onMouseOver}>
        <div className='loginTop'>
          <div className='login-info'>
            <Texty type='alpha' mode='smooth' duration='1000' interval='15'>
              计科1602
            </Texty>
            <Texty type='alpha' mode='smooth' duration='1000' interval='15'>
            1612190431——周豪庭
            </Texty>
            <Texty type='alpha' mode='smooth' duration='1000' interval='15'>
            毕业设计——釉色后台管理系统
            </Texty>
            <Texty type='alpha' mode='smooth' duration='1000' interval='15'>
              Version:1.0
            </Texty>
          </div>
        </div>
        <div className='loginCenter'>
          <Row style={{width:'100%',height:'100%'}}>
            <Col span={17} style={{height:'100%'}}>
              <div className='loginLeft'>

              </div>
            </Col>
            <Col span={7} style={{height:'100%'}}>
              <div className='login-right'>
                <div className='loginRight-mask'/>
                <div className='login-login'>
                  <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                      {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                      })(
                        <Input
                          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          placeholder="Username"
                        />,
                      )}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                      })(
                        <Input
                          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          type="password"
                          placeholder="Password"
                        />,
                      )}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator('Vcode', {
                        rules: [{ required: true, message: '请输入验证码' }],
                      })(
                        <span className="Vcode">
                          <Row style={{width:'100%',height:'100%'}}>
                            <Col span={12} style={{height:'100%'}}>
                              <Input
                                prefix={<Icon type="safety" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="Vcode"
                                placeholder="验证码"
                              />
                            </Col>
                            <Col span={12} style={{height:'100%'}}>
                              <Vcode
                                style={{marginLeft:'43px'}}
                                length={4}
                                width={100}
                                onChange={(v) => {
                                  this.getVcode(v);
                                }}
                                options={{codes}}
                                key={Vkey}
                              />
                            </Col>
                          </Row>
                        </span>
                      )}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                      })(<Checkbox onChange={this.changeSwitch} style={{color:'white'}}>记住密码</Checkbox>)}
                      <Button
                        type="primary"
                        htmlType="submit"
                        size='large'
                        className="login-form-button"
                        onClick={this.handleSubmit}
                      >
                        登陆
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className='loginBottom'>

        </div>
        <div className='loginBottom-time'>
          <Row >
            <Col span={12}>
              <div className='loginBottom-time-hour'>
                {time.format('H:mm:ss')}
              </div>
            </Col>
            <Col span={12}>
              <div className='loginBottom-time-year'>
                {time.format('MM/DD/YYYY')}
              </div>
            </Col>
          </Row>
          <div className='loginBottom-sign'>
            ———— 对酒当歌，人生几何。
          </div>
        </div>
        {/*<div className='loginMain fadeInDown'>*/}
        {/*  <div className='loginRight flex'>*/}
        {/*    <div className='loginForm'>*/}
        {/*      <h1>用户登录</h1>*/}
        {/*      <form autoComplete="on">*/}
        {/*        <span className='loginLabel'>*/}
        {/*          <span>*/}
        {/*            <Icon type="user" className='icon'/>*/}
        {/*            <input type="text" autoComplete="on" autoFocus="autofocus" placeholder="用户名"*/}
        {/*                   defaultValue={userName} onChange={(e) => {*/}
        {/*              this.changeInput(e, 'userName');*/}
        {/*            }}/>*/}
        {/*          </span>*/}
        {/*        </span>*/}
        {/*        <span className='loginLabel'>*/}
        {/*          <span>*/}
        {/*            <Icon type="lock" className='icon'/>*/}
        {/*            <input type="password" autoComplete="off" placeholder="密 码"*/}
        {/*                   defaultValue={password} onChange={(e) => {*/}
        {/*              this.changeInput(e, 'password');*/}
        {/*            }}/>*/}
        {/*          </span>*/}
        {/*        </span>*/}
        {/*        <span className='loginLabel disFlex'>*/}
        {/*          <span>*/}
        {/*            <Icon type="key" className='icon'/>*/}
        {/*            <input type="text" value={code} placeholder="验证码" onChange={(e) => {*/}
        {/*              this.changeInput(e, 'code');*/}
        {/*            }}/>*/}
        {/*          </span>*/}
        {/*          <span className="Vcode">*/}
        {/*            <Vcode*/}
        {/*              length={4}*/}
        {/*              width={100}*/}
        {/*              onChange={(v) => {*/}
        {/*                this.getVcode(v);*/}
        {/*              }}*/}
        {/*              options={{codes}}*/}
        {/*              key={Vkey}*/}
        {/*            />*/}
        {/*          </span>*/}
        {/*        </span>*/}
        {/*        <span className='loginLabel'>*/}
        {/*          <Switch className='remberPass' size="small" defaultChecked={Boolean(remberPass)}*/}
        {/*                  onChange={this.changeSwitch}/>*/}
        {/*          <span>记住密码</span>*/}
        {/*        </span>*/}
        {/*        <div className='loginLodingBox' style={{display: loading ? 'flex' : 'none'}}>*/}
        {/*          <div className='lineScalePulseOut'>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        <input type="submit" className='loginButton' style={{display: loading ? 'none' : 'block'}}*/}
        {/*               onClick={this.login} value="登录"/>*/}
        {/*      </form>*/}
        {/*      <div className='gyl-img' onClick={t.upLoadApp}>下载APP</div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    );
  }
}

export default Form.create()(Login);
