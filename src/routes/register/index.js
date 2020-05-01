import {Form, Input, message, Select, Checkbox, Button, AutoComplete,} from 'antd';
import React from 'react';
import './index.css'
import request from "../../utils/request";
import GoBackButton from '../../components/GoBackButton';
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class register extends React.Component {
  constructor(props){
    super(props);
    this.state={
      confirmDirty: false,
      autoCompleteResult: [],
      agree:false
    }
  }
  gotoBack=()=>{
    this.props.history.push('/login');
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.registerSubmit(values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码不一样');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  changeAgreement=(e)=>{
    this.setState({
      agree:e.target.checked
    })
  };

  //注册
  registerSubmit=(values)=>{
    if(this.state.agree){
      let data={
        name:values.name,
        account:values.account,
        password:values.password
      };
      request({url:'/insertUser',method:'POST',data:data}).then((res)=>{
        if(res && res.code){
          message.success("注册成功");
          this.props.history.push("/login");
        }else if(res){
          message.error(res.message);
        }else{
          message.error("连接服务器出错");
        }
      })
    }else{
      message.error("请先勾选许可协议");
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );


    return (
      <div className='register-background'>
        <GoBackButton
           color='LightGrey'
          gotoBack={this.gotoBack}
        />
        <div className='register-body'>
          <Form {...formItemLayout} onSubmit={this.handleSubmit} className='register-form'>
            <Form.Item label="邮箱" >
              {getFieldDecorator('account', {
                rules: [
                  {
                    type: 'email',
                    message: '邮箱号无效！',
                  },
                  {
                    required: true,
                    message: '请输入邮箱号!',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="密码" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入密码!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password minLength={6} maxLength={20}/>)}
            </Form.Item>
            <Form.Item label="确认密码" hasFeedback>
              {getFieldDecorator('confirmPassword', {
                rules: [
                  {
                    required: true,
                    message: '请确认你的密码!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input.Password onBlur={this.handleConfirmBlur} minLength={6} maxLength={20}/>)}
            </Form.Item>
            <Form.Item
              label={
                <span>
              昵称
            </span>
              }
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入你的昵称!', whitespace: true }],
              })(<Input />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
                initialValue: this.state.agree,
              })(
                <Checkbox onChange={this.changeAgreement}>
                  我已经同意 <div style={{color:'#68C0FF',display:'inline'}}>许可协议</div>
                </Checkbox>,
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" className='register-button' onClick={this.handleSubmit}>
                注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(register);

export default Form.create()(register);