import React from 'react';
import { Pagination } from 'antd';
import InfoTab from "../../../components/InfoTab";
import QY from '../../../JSON/QY/QY.json';
import config from "../../../config";
import MyModal from "../../../components/MyModal";
import SysAddButton from "../SysAddButton";

const pageSize = config.pageSize;

class SysOrigin extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      title:'',
      content:'',
      modalTitle:'',
      modalShow: false,
      fileList: []
    }
  }

  //显示弹框
  showModal = (item,type)=>{
    let {title, content,fileList}=this.state;
    if(type==='修改'){
      title=item.title;
      content=item.content;
      fileList=[
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-2',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-3',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }
      ]
    }else if(type==='新增'){
      title='';
      content='';
      fileList=[];
    }
    this.setState({
      modalTitle:type,
      title,
      content,
      fileList,
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

  //换页
  changePage=(page,pageSize)=>{
    console.log("page,pageSize:", page,pageSize);
  };

  //更新图片列表
  setFileList=(fileList)=>{
    this.setState({
      fileList
    })
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
        title:'配图',
        label:'image',
        type:'Upload',
        rules: '',
        initialValue:'',
        fileList:this.state.fileList,
        picNumber:3
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
          setFileList={this.setFileList}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          resource={resource}
        />
        <SysAddButton color='#1890FF' showModal={this.showModal.bind(this,'','新增')}/>
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

export default SysOrigin;