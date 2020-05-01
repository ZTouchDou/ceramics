import React from 'react';
import {message} from 'antd';
import InfoTab from "../../../components/InfoTab";
import request from "../../../utils/request";
import QY from '../../../JSON/QY/QY.json';
import config from "../../../config";
import MyModal from "../../../components/MyModal";
import SysAddButton from "../SysAddButton";

const pageSize = config.pageSize;
const uploadUrl = config.poxzy.imgUrl;

class SysOrigin extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      title:'',
      content:'',
      modalTitle:'',
      modalShow: false,
      page:1,
      total:10,
      qyData:[],
      fileList: [],
      editId:''
    }
  }

  //获取起源数据
  getOriginData=(page)=>{
    let data = {};
    data.page = page;
    data.pageSize = pageSize;
    request({url:'/getOrigin',method:'GET',params:data}).then((res)=>{
      if(res && res.code){
        this.setState({
          qyData:res.data,
          total:res.total
        })
      }
    })
  };

  componentDidMount() {
    this.getOriginData(this.state.page);
  }

  //显示弹框
  showModal = (item,type)=>{
    let {title, content,editId,fileList}=this.state;
    if(type==='修改'){
      editId=item.id;
      title=item.title;
      content=item.content;
      let imgList = [];
      if(item.pic1){
        imgList.push({
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: uploadUrl+item.pic1,
        })
      }
      if(item.pic2){
        imgList.push({
          uid: '-2',
          name: 'image.png',
          status: 'done',
          url: uploadUrl+item.pic2,
        })
      }
      if(item.pic3){
        imgList.push({
          uid: '-3',
          name: 'image.png',
          status: 'done',
          url: uploadUrl+item.pic3,
        })
      }
      fileList=imgList;
    }else if(type==='新增'){
      title='';
      content='';
      fileList=[];
      editId='';
    }
    this.setState({
      modalTitle:type,
      title,
      content,
      fileList,
      editId,
      modalShow: true,
    })
  };

  //点击确定
  handleOk = values => {
    let {modalTitle,editId} = this.state;
    let fileList = this.state.fileList;
    console.log("fileList:", fileList);
    let pic1=fileList.length>0?fileList[0].url?("ceramics"+fileList[0].url.split("ceramics")[1]):fileList[0].response.filePath:'';
    let pic2=fileList.length>1?fileList[1].url?("ceramics"+fileList[1].url.split("ceramics")[1]):fileList[1].response.filePath:'';
    let pic3=fileList.length>2?fileList[2].url?("ceramics"+fileList[2].url.split("ceramics")[1]):fileList[2].response.filePath:'';
    let data={};
    data.title=values.title;
    data.content=values.content;
    data.pic1=pic1;
    data.pic2=pic2;
    data.pic3=pic3;
    //如果是修改，调用修改的接口，否则调用新增接口
    if(modalTitle==='修改'){
      data.id = editId;
      request({url:'/updateOriginById',method:'GET',params:data}).then((res)=>{
        if(res && res.code){
          message.success("修改成功");
          this.getOriginData(this.state.page);
        }
      })
    }else{
      request({url:'/insertOrigin',method:'GET',params:data}).then((res)=>{
        if(res && res.code){
          message.success("新增成功");
          this.getOriginData(this.state.page);
        }
      })
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

  //更新图片列表
  setFileList=(fileList)=>{
    this.setState({
      fileList
    })
  };

  //删除操作
  deleteData=(id)=>{
    request({url:'/deleteOriginById/'+id,method:'GET'}).then((res)=>{
      if(res && res.code){
        message.success("删除成功");
        this.getOriginData(this.state.page);
      }else{
        message.error("删除失败");
      }
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
      <div>
        {
          this.state.qyData.map((item,index)=>{
            return (
              <InfoTab
                showModal={this.showModal.bind(this,item,'修改')}
                item={item}
                key={index}
                deleteData={this.deleteData}
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
      </div>
    );
  }
}

export default SysOrigin;