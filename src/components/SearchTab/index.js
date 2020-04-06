import React from 'react';
import {Input,Row, Col, Form, DatePicker, Button} from "antd";
import "./index.css";

class SearchTab extends React.Component{
  constructor(props) {
    super(props);
    this.state={

    }
  }

  componentDidMount() {
    let width = document.getElementById("searchbox").offsetWidth;
    document.getElementById("spot").style.width=width+'px';
  }

  //提交
  handleOk = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onOk(values);
      }
    });
  };

  render() {
    const {  getFieldDecorator } = this.props.form;
    let {resource} = this.props;
    return (
      <div className='searchBox' id="searchbox">
        <div style={{width:'60px'}}>
          搜索
        </div>
        <div>
          <Form onSubmit={this.handleOk} layout="inline">
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
                      <Input className='searchInput'/>
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
                          <DatePicker className="searchDatePicker"/>
                        )
                        }
                      </Form.Item>:
                      ''
              ))
            }
            {
              resource && resource.length>0 &&
              <Form.Item>
                <Button type="primary" ghost onClick={this.handleOk}>
                  确定
                </Button>
              </Form.Item>
            }
          </Form>
        </div>
        <div className="spot" id="spot">

        </div>
      </div>
    );
  }
}

export default Form.create()(SearchTab);