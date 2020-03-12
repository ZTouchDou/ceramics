import React from 'react';
import { Pagination } from 'antd';
import InfoTab from "../../../components/InfoTab";
import TC from '../../../JSON/TC/TC.json';
import config from "../../../config";
import MyModal from "../../../components/MyModal";
import SysAddButton from "../SysAddButton";

const pageSize = config.pageSize;

class SysCeramicsShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      modalTitle: '',
      modalShow: false,
    }
  }

  //显示弹框
  showModal = (item, type) => {
    let {title, content} = this.state;
    if (type === '修改') {
      title = item.title;
      content = item.content;
    } else if (type === '新增') {
      title = '';
      content = '';
    }
    this.setState({
      modalTitle: type,
      title,
      content,
      modalShow: true,
    });
  };

  //点击确定
  handleOk = e => {
    this.setState({
      modalShow: false,
    });
  };

  //点击取消
  handleCancel = e => {
    this.setState({
      modalShow: false,
    });
  };

  //换页
  changePage=(page,pageSize)=>{
    console.log("page,pageSize:", page,pageSize);
  };

  render() {
    const resource = [
      {
        title: '标题',
        label: 'title',
        type: 'input',
        rules: config.reg.required,
        initialValue: this.state.title
      },
      {
        title: '内容',
        label: 'content',
        type: 'textarea',
        rules: config.reg.required,
        initialValue: this.state.content
      }
    ];

    return (
      <div style={{display:'flex',flexWrap:'wrap'}}>
        {
          TC.map((item, index) => {
            return (
              <InfoTab
                showModal={this.showModal.bind(this, item, '修改')}
                item={item}
                key={index}
              />
            )
          })
        }
        <MyModal
          modalTitle={this.state.modalTitle}
          visible={this.state.modalShow}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          resource={resource}
        />
        <SysAddButton color='#FA7F00' showModal={this.showModal.bind(this, '', '新增')}/>
        <div style={{height:'50px',marginLeft:'50%',transform:'translateX(-50%)'}}>
          <Pagination
            onChange={this.changePage}
            defaultCurrent={1}
            pageSize={pageSize}
            total={500}
          />
        </div>
      </div>
    );
  }
}

export default SysCeramicsShow;