import React from 'react';
import { Pagination } from 'antd';
import InfoTab from "../../../components/InfoTab";
import GF from '../../../JSON/GF/GF.json';
import moment from 'moment';
import config from "../../../config";
import MyModal from "../../../components/MyModal";
import SysAddButton from "../SysAddButton";

const pageSize = config.pageSize;

class SysWorkshop extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      title:'',
      time:'',
      location:'',
      content:'',
      modalTitle:'',
      fileList:[],
      modalShow: false,
    }
  }

  //显示弹框
  showModal = (item,type)=>{
    let {title, time, location, content,fileList} = this.state;
    let newtime = moment(item.time);
    if(type==='修改'){
      title=item.title;
      time=newtime;
      location=item.location;
      content=item.content;
      fileList=[
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'http://img1.imgtn.bdimg.com/it/u=2233431505,2282541580&fm=26&gp=0.jpg',
        }
      ];
    }else if(type==='新增'){
      title='';
      time=moment();
      location='';
      content='';
      fileList=[];
    }
    this.setState({
      modalTitle:type,
      title,
      time,
      location,
      fileList,
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

  //更新图片列表
  setFileList=(fileList)=>{
    this.setState({
      fileList
    })
  };

  //换页
  changePage=(page,pageSize)=>{
    console.log("page,pageSize:", page,pageSize);
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
        title:'配图',
        label:'image',
        type:'Upload',
        rules: '',
        initialValue:'',
        fileList:this.state.fileList,
        picNumber:1
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
      <div style={{display:'flex',flexWrap:'wrap'}}>
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
          setFileList={this.setFileList}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          resource={resource}
        />
        <SysAddButton color='red' showModal={this.showModal.bind(this,'','新增')}/>
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

export default SysWorkshop;