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
    let {title, content}=this.state;
    if(type==='修改'){
      title=item.title;
      content=item.content;
    }else if(type==='新增'){
      title='';
      content='';
    }
    this.setState({
      modalTitle:type,
      title,
      content,
      modalShow: true,
    })
  };

  //点击确定
  handleOk = e => {
    let {modalTitle} = this.state;
    //如果是修改，调用修改的接口，否则调用新增接口
    if(modalTitle==='修改'){
      console.log("这是修改");
    }else{
      console.log("这是新增");
    }
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
        <SysAddButton color='#1890FF' showModal={this.showModal.bind(this,'','新增')}/>
      </div>
    );
  }
}

export default SysOrigin;