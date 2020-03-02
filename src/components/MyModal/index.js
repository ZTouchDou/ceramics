import React from 'react';
import {Modal, Form, Input} from 'antd';

const {TextArea} = Input;

class MyModal extends React.Component{
  constructor(props) {
    super(props);
    this.state={

    }
  }

  //提交
  handleOk = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.onOk();
      }
    });
  };

  //取消
  handleCancel = e => {
    this.props.onCancel();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let {visible, resource} = this.props;
    return (
      <Modal
        visible={visible}
        okText='确定'
        cancelText='取消'
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form onSubmit={this.handleOk}>
          {
            resource &&
              resource.map((item,index)=>(
                <Form.Item label={item.title} key={index}>
                  {getFieldDecorator(item.label, {
                    rules: [item.rules?item.rules:'']
                  })
                    (
                      item.type==='input' ?
                      <Input className='input'/>:
                      item.type==='textarea'?
                      <TextArea style={{height:'20vh'}}/>:
                        ''
                    )
                  }
                </Form.Item>
              ))
          }
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(MyModal);