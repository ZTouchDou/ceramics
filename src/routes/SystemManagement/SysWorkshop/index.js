import React from 'react';
import {message} from "antd";
import InfoTab from "../../../components/InfoTab";
import request from "../../../utils/request";
import GF from '../../../JSON/GF/GF.json';
import moment from 'moment';
import config from "../../../config";
import MyModal from "../../../components/MyModal";
import SysAddButton from "../SysAddButton";

const pageSize = config.pageSize;
const uploadUrl = config.poxzy.imgUrl;

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

      fileList: [],
      qyData:[],
      editId:'',
      page:1,
      total:10,
    }
  }

  //获取工坊数据
  getWorkshopData=(page)=>{
    let data = {};
    data.page = page;
    data.pageSize = pageSize;
    console.log("data:", data);
    request({url:'/getWorkshop',method:'GET',params:data}).then((res)=>{
      if(res && res.code){
        this.setState({
          qyData:res.data,
          total:res.total
        })
      }
    })
  };

  componentDidMount() {
    this.getWorkshopData(this.state.page);
  }

  //显示弹框
  showModal = (item,type)=>{
    let {title, time, location, content,fileList,editId} = this.state;
    let newtime = moment(Number(item.time));
    if(type==='修改'){
      console.log("item:", item);
      editId=item.id;
      title=item.title;
      time=newtime;
      location=item.location;
      content=item.content;
      fileList=item.imgUrl?[
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: uploadUrl+item.imgUrl,
        }
      ]:[];
    }else if(type==='新增'){
      editId='';
      title='';
      time=moment();
      location='';
      content='';
      fileList=[];
    }
    this.setState({
      modalTitle:type,
      editId,
      title,
      time,
      location,
      content,
      fileList,
      modalShow: true,
    });
  };

  //点击确定
  handleOk = values => {
    let {modalTitle,editId} = this.state;
    //如果是修改，调用修改的接口，否则调用新增接口
    let fileList = this.state.fileList;
    let imgUrl=fileList.length>0?fileList[0].url?("ceramics"+fileList[0].url.split("ceramics")[1]):fileList[0].response.filePath:'';
    let data={};
    data.title=values.title;
    data.location=values.location;
    data.time=String(moment(values.time).unix()*1000);
    data.content=values.content;
    data.imgUrl=imgUrl;
    if(modalTitle==='修改'){
      data.id = editId;
      request({url:'/updateWorkshopById',method:'GET',params:data}).then((res)=>{
        if(res && res.code){
          message.success("修改成功");
          this.getWorkshopData(this.state.page);
        }
      })
    }else{
      request({url:'/insertWorkshop',method:'GET',params:data}).then((res)=>{
        if(res && res.code){
          message.success("新增成功");
          this.getWorkshopData(this.state.page);
        }
      })
    }
    this.setState({
      modalShow: false,
    });
  };

  //删除操作
  deleteData=(id)=>{
    request({url:'/deleteWorkshopById/'+id,method:'GET'}).then((res)=>{
      if(res && res.code){
        message.success("删除成功");
        this.getWorkshopData(this.state.page);
      }else{
        message.error("删除失败");
      }
    })
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
          onOk={this.handleOk}
          setFileList={this.setFileList}
          onCancel={this.handleCancel}
          resource={resource}
        />
        <SysAddButton color='red' showModal={this.showModal.bind(this,'','新增')}/>
      </div>
    );
  }
}

export default SysWorkshop;