import React from 'react';
import {Row,Col,Form,Upload,Modal,Icon,Input,Button,message} from 'antd';
import './index.css';
import MenuTitle from "../../components/MenuTitle";
import config from "../../config";
import request from "../../utils/request";

const uploadUrl = config.poxzy.imgUrl;
const uploadAction = config.poxzy.uploadUrl+"/upload";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class LoginSetting extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      previewVisible: false,
      previewImage: '',
      fileList:[{
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: uploadUrl+sessionStorage.getItem("userimg")
      }]
    }
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  //图片列表改变
  handleChange = ({ fileList }) => this.setState({ fileList },()=>{
    if(fileList.length===0){
      let button = document.getElementById('changeAvator');
      button.setAttribute('class','ant-btn ant-btn-danger noAvatar');
    }else{
      let button = document.getElementById('changeAvator');
      button.setAttribute('class','ant-btn ant-btn-primary haveAvatar');
    }
  });

  closeDetails=()=>{
    this.props.closeDetails();
  };

  //提交表单
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.changePassword(values);
      }
    });
  };

  //改变头像
  changeAvator=()=>{
    let id=sessionStorage.getItem("userId");
    let {fileList} = this.state;
    let imgUrl=fileList.length>0?fileList[0].url?("ceramics"+fileList[0].url.split("ceramics")[1]):fileList[0].response.filePath:'';
    request({url:"/changeAvator",method:'GET',params:{id:id,imgUrl:imgUrl}}).then((res)=>{
      if(res && res.code){
        message.success("头像更换成功");
        sessionStorage.setItem('userimg', imgUrl);
      }else{
        message.error("头像更换失败");
      }
    })
  };

  //更换密码
  changePassword=(values)=>{
    values.id=sessionStorage.getItem("userId");
    request({url:'/changeUserPassword',method:"POST",data:values}).then((res)=>{
      if(res && res.code){
        message.success("密码更换成功");
      }else if(res){
        message.error(res.message);
      }else{
        message.error("密码更换失败，服务器出错");
      }
    })
  };

  render() {
    let {fileList, previewVisible, previewImage} = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
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
          offset: 10,
        },
      },
    };
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    return (
      <div className='loginSetting-box'>
        <div style={{height:'40px'}}>
          <Row>
            <Col span={12}>
              <MenuTitle
                color='#FF9E00'
                content='修改密码'
              />
            </Col>
            <Col span={12}>
              <MenuTitle
                color='white'
                closeDetails={this.closeDetails}
                closeable={true}
              />
            </Col>
          </Row>
        </div>
        <div>
          <div className='Avatar-picture'>
            <Upload
              action={uploadAction}
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
            <Button
              id='changeAvator'
              type="primary"
              ghost
              onClick={this.changeAvator}
            >
              更换头像
            </Button>
          </div>
        </div>
        <div style={{height:'30px'}}/>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="旧密码" hasFeedback>
            {getFieldDecorator('oldPassword', {
              rules: [
                {
                  required: true,
                  message: '请输入旧密码!',
                }
              ],
            })(<Input.Password style={{width:'30%'}}/>)}
          </Form.Item>
          <Form.Item label="新密码" hasFeedback>
            {getFieldDecorator('newPassword', {
              rules: [
                {
                  required: true,
                  message: '请输入新密码!',
                }
              ],
            })(<Input.Password style={{width:'30%'}}/>)}
          </Form.Item>
          <Form.Item label="确认密码" hasFeedback>
            {getFieldDecorator('confirmPassword', {
              rules: [
                {
                  required: true,
                  message: '请再次输入密码!',
                }
              ],
            })(<Input.Password style={{width:'30%'}}/>)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button
              id='changePasswordSubmit'
              type="primary"
              htmlType="submit"
              onClick={this.handleSubmit}
            >
              确认
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(LoginSetting);