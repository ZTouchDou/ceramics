import React from 'react';
import InfoTab from "../../../components/InfoTab";
import GY from '../../../JSON/GY/GY.json';
import config from "../../../config";
import MyModal from "../../../components/MyModal";
import SysAddButton from "../SysAddButton";

class SysTechnology extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      subtitle: '',
      content: '',
      modalTitle: '',
      modalShow: false,
    }
  }

  //显示弹框
  showModal = (item, type) => {
    let {title, subtitle, content} = this.state;
    if (type === '修改') {
      title = item.title;
      subtitle = item.subtitle;
      content = item.content;
    } else if (type === '新增') {
      title = '';
      subtitle = '';
      content = '';
    }
    this.setState({
      modalTitle: type,
      title,
      subtitle,
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
        title: '副标题',
        label: 'subtitle',
        type: 'input',
        rules: config.reg.required,
        initialValue: this.state.subtitle
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
      <div>
        {
          GY.map((item, index) => {
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
        <SysAddButton color='#7FBA00' showModal={this.showModal.bind(this, '', '新增')}/>
      </div>
    );
  }
}

export default SysTechnology;