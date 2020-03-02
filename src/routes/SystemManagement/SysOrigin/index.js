import React from 'react';
import InfoTab from "../../../components/InfoTab";
import QY from '../../../JSON/QY/QY.json';
import config from "../../../config";
import MyModal from "../../../components/MyModal";
import SysAddButton from "../SysAddButton";

class SysOrigin extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      title:'',
      content:'',
      modalTitle:'',
      modalShow: false,
    }
  }

  //显示弹框
  showModal = (item,type)=>{
    if(type==='修改'){
      this.setState({
        modalTitle:type,
        title:item.title,
        content:item.content,
        modalShow: true,
      });
    }else if(type==='新增'){

    }
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
    const resource =[
      {
        title:'标题',
        label:'title',
        type:'input',
        rules: config.reg.required,
        initialValue:this.state.title
      },
      {
        title:'内容',
        label:'content',
        type:'textarea',
        rules: config.reg.required,
        initialValue:this.state.content
      }
    ];

    return (
      <div>
        {
          QY.map((item,index)=>{
            return (
              <InfoTab
                showModal={this.showModal.bind(this,item,'修改')}
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
        <SysAddButton/>
      </div>
    );
  }
}

export default SysOrigin;