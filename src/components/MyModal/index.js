import React from 'react';
import {Modal, Form, Input, DatePicker,Upload,Icon} from 'antd';
import config from "../../config";

const {TextArea} = Input;
const uploadUrl = config.poxzy.uploadUrl+"/upload";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class MyModal extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      previewVisible: false,
      previewImage: '',
    }
  }

  //关闭图片详情框
  modalCancel = () => this.setState({ previewVisible: false });

  //查看图片
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
  handleChange = ({ fileList }) => {
    if(this.props.setFileList){
      this.props.setFileList(fileList);
    }
  };

  //提交
  handleOk = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.onOk(values);
      }
    });
  };

  //取消
  handleCancel = e => {
    this.props.onCancel();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let {visible, resource, modalTitle} = this.props;
    let {previewVisible, previewImage} = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    return (
      <Modal
        title={modalTitle}
        visible={visible}
        destroyOnClose={true}
        okText='确定'
        cancelText='取消'
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form onSubmit={this.handleOk}>
          {
            resource &&
              resource.map((item,index)=>(
                item.type==='input' ?
                <Form.Item label={item.title} key={index}>
                  {getFieldDecorator(item.label, {
                    rules: [item.rules?item.rules:''],
                    initialValue:item.initialValue?item.initialValue:''
                  })
                    (
                      <Input className='input'/>
                    )
                  }
                </Form.Item>:

                item.type==='textarea'?
                  <Form.Item label={item.title} key={index}>
                    {getFieldDecorator(item.label, {
                      rules: [item.rules?item.rules:''],
                      initialValue:item.initialValue?item.initialValue:''
                    })
                    (
                      <TextArea style={{height:'20vh'}}/>
                    )
                    }
                  </Form.Item>:

                item.type==='datePicker'?
                  <Form.Item label={item.title} key={index}>
                    {getFieldDecorator(item.label, {
                      rules: [item.rules?item.rules:''],
                      initialValue:item.initialValue?item.initialValue:''
                    })
                    (
                      <DatePicker/>
                    )
                    }
                  </Form.Item>:

                  item.type==='Upload'?
                    <Form.Item label={item.title} key={index}>
                      {getFieldDecorator(item.label, {
                        rules: [item.rules?item.rules:''],
                        initialValue:item.initialValue?item.initialValue:''
                      })
                      (
                        <div >
                          <Upload
                            action={uploadUrl}
                            listType="picture-card"
                            fileList={item.fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                          >
                            {item.fileList.length >= item.picNumber ? null : uploadButton}
                          </Upload>
                          <Modal visible={previewVisible} footer={null} onCancel={this.modalCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                          </Modal>
                        </div>
                      )
                      }
                    </Form.Item>:
                    ''
              ))
          }
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(MyModal);