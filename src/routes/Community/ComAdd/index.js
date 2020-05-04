import React from 'react';
import { Upload, Icon, Modal, Input, message } from 'antd';
import './index.css';
import GoBackButton from "../../../components/GoBackButton";
import request from "../../../utils/request";
import config from "../../../config";

const uploadUrl = config.poxzy.uploadUrl+"/upload";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class ComAdd extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      AddType:'',
      previewVisible: false,
      previewImage: '',
      fileList: [],
      gobackModal:false
    }
  }

  componentDidMount() {
    let type = sessionStorage.getItem('AddType')?sessionStorage.getItem('AddType'):'SC';
    this.setState({
      AddType:type
    },()=>{
      if(this.state.AddType==="JC"){
        let title=localStorage.getItem("myInvJCTitle");
        let content = localStorage.getItem("myInvJCText");
        document.getElementById("invTitle").value=title?title:'';
        document.getElementById("invText").innerHTML=content?content:'';
      }else{
        let content = localStorage.getItem("myInvSCText");
        document.getElementById("invText").innerHTML=content?content:'';
      }
    })
  }

  //点击发布
  ComAddSubmit=()=>{
    let {AddType,fileList} = this.state;
    let url='';
    let data={};
    let title="";
    if(AddType==="JC"){
      title=document.getElementById("invTitle").value;
    }else{
      title="1";
    }
    let content = document.getElementById("invText").innerText;
    if(title==="" || content === ""){
      message.warn("标题和发布内容不可为空哦");
      return;
    }
    if(AddType==="JC"){
      url="/insertInvitationJC";
      data.title=title;
      data.content=content;
      data.imgUrl1=fileList.length>0?fileList[0].response.filePath:"";
      data.imgUrl2=fileList.length>1?fileList[1].response.filePath:"";
      data.imgUrl3=fileList.length>2?fileList[2].response.filePath:"";
      data.imgUrl4=fileList.length>3?fileList[3].response.filePath:"";
      data.imgUrl5=fileList.length>4?fileList[4].response.filePath:"";
    }else{
      url="/insertInvitationSC";
      data.content=content;
      data.imgUrl=fileList.length>0?fileList[0].response.filePath:"";
    }
    data.userId=sessionStorage.getItem("userId");
    request({url:url,method:'POST',data:data}).then((res)=>{
      if(res && res.code){
        message.success("发布成功");
        if(this.state.AddType==="JC"){
          localStorage.removeItem("myInvJCTitle");
          localStorage.removeItem("myInvJCText");
        }else{
          localStorage.removeItem("myInvSCText");
        }
        this.props.history.push('/Community');
      }else{
        message.error("发布失败，可能网络不好哦");
      }
    })
  };

  //返回
  gotoBack=()=>{
    let title="";
    if(this.state.AddType==="JS"){
      title=document.getElementById("invTitle").value;
    }
    let content=document.getElementById("invText").innerHTML;
    if(title || content){
      this.setState({
        gobackModal:true
      })
    }else{
      this.props.history.push('/Community');
    }
  };

  //不保存
  noSave=()=>{
    this.setState({
      gobackModal:false
    },()=>{
      this.props.history.push('/Community');
    })
  };

  //保存编辑的内容
  saveText=()=>{
    let title="";
    let content="";
    if(this.state.AddType==="JC"){
      title=document.getElementById("invTitle").value;
      content=document.getElementById("invText").innerText;
      localStorage.setItem("myInvJCTitle",title);
      localStorage.setItem("myInvJCText",content);
    }else{
      content=document.getElementById("invText").innerHTML;
      localStorage.setItem("myInvSCText",content);
    }
    this.setState({
      gobackModal:false
    },()=>{
      this.props.history.push('/Community');
    })
  };

  //点击文件链接或预览图标时的回调
  handlePreview = async file=> {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  //上传文件改变时的状态，将新增的图片加入已上传文件列表
  handleChange=({ fileList })=>{
    this.setState({ fileList });
  };

  //关闭弹框
  handleCancel = () => this.setState({ previewVisible: false });

  render() {
    const { AddType, previewVisible, previewImage, fileList, gobackModal } = this.state;
    //上传按钮
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    return (
      <div className='ComAdd-box'>
        <div className='ComAdd-header' >
          <GoBackButton
            color='black'
            gotoBack={this.gotoBack}
          />
          <div className='ComAdd-headerL'/>
          <div className='ComAdd-headerC'>
            {
              AddType==='JC'?'鉴瓷':'赏瓷'
            }
          </div>
          <div className='ComAdd-submit' onClick={this.ComAddSubmit}>
             完成
          </div>
        </div>
        <div className='ComAdd-body'>
          {
            this.state.AddType==="JC" &&
            <div className='ComAdd-title'>
              <Input
                id="invTitle"
                style={{width:'100%',height:'100%',border:'none'}}
                placeholder="标题"
                maxLength={20}
              />
            </div>
          }
          <div id="invText" className='ComAdd-content' contentEditable="true" placeholder='写点什么吧……'>

          </div>
          <div className='ComAdd-image'>
            <Upload
              action={uploadUrl}
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= (AddType==='JC'?5:1) ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
            <Modal visible={gobackModal}
                   onCancel={this.noSave}
                   onOk={this.saveText}
                   closable={false}
                   cancelText="不了，我只是随便写写的"
                   okText="当然，我下次可不想重写"
            >
              <div>
                需要将本次目前编辑的内容作为草稿保存吗？
              </div>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default ComAdd;