import React from 'react';
import InfoTab from "../../../components/InfoTab";
import GF from '../../../JSON/GF/GF.json';
import moment from 'moment';
import config from "../../../config";
import MyModal from "../../../components/MyModal";
import SysAddButton from "../SysAddButton";

class SysWorkshop extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      title:'',
      time:'',
      location:'',
      content:'',
      modalTitle:'',
      modalShow: false,
    }
  }

  //显示弹框
  showModal = (item,type)=>{
    let {title, time, location, content} = this.state;
    let newtime = moment(item.time);
    if(type==='修改'){
      title=item.title;
      time=newtime;
      location=item.location;
      content=item.content;
    }else if(type==='新增'){
      title='';
      time=moment();
      location='';
      content='';
    }
    this.setState({
      modalTitle:type,
      title,
      time,
      location,
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
    const resource =[
      {
        title:'标题',
        label:'title',
        type:'input',
        rules: config.reg.required,
        initialValue:this.state.title
      },
      {
        title:'成立时间',
        label:'time',
        type:'datePicker',
        rules: config.reg.required,
        initialValue:this.state.time
      },
      {
        title:'地点',
        label:'location',
        type:'input',
        rules: config.reg.required,
        initialValue:this.state.location
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
          GF.map((item,index)=>{
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
        <SysAddButton color='red' showModal={this.showModal.bind(this,'','新增')}/>
      </div>
    );
  }
}

export default SysWorkshop;