import React from 'react';
import {Row,Col,Form,Upload,Modal,Icon,Input,Button} from 'antd';
import './index.css';
import MenuTitle from "../../components/MenuTitle";

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
        url: 'http://img1.imgtn.bdimg.com/it/u=2492488577,388673270&fm=26&gp=0.jpg',
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
      let button = document.getElementById('changePasswordSubmit');
      button.setAttribute('class','ant-btn ant-btn-primary noAvatar');
    }else{
      let button = document.getElementById('changePasswordSubmit');
      button.setAttribute('class','ant-btn ant-btn-primary haveAvatar');
    }
  });

  closeDetails=()=>{
    this.props.closeDetails();
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
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
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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
          <Form.Item {...tailFormItemLayout}>
            <Button
              id='changePasswordSubmit'
              className='changeSubmit'
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