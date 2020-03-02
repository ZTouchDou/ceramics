import React from 'react';
import {Modal, Form, Input, DatePicker} from 'antd';

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
    let {visible, resource, modalTitle} = this.props;
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
                  ''
              ))
          }
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(MyModal);