import React from 'react';
import { Upload, Icon, Modal, Input } from 'antd';
import './index.css';
import GoBackButton from "../../../components/GoBackButton";

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
      fileList: [
        // {
        //   uid: '-1',
        //   name: 'image.png',
        //   status: 'done',
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //   uid: '-2',
        //   name: 'image.png',
        //   status: 'done',
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //   uid: '-3',
        //   name: 'image.png',
        //   status: 'done',
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //   uid: '-4',
        //   name: 'image.png',
        //   status: 'done',
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //   uid: '-5',
        //   name: 'image.png',
        //   status: 'error',
        // },
      ]
    }
  }

  componentDidMount() {
    let type = sessionStorage.getItem('AddType')?sessionStorage.getItem('AddType'):'SC';
    this.setState({
      AddType:type
    })
  }

  //点击发布
  ComAddSubmit=()=>{

  };

  //返回
  gotoBack=()=>{
    this.props.history.push('/Community');
  }

  //点击文件链接或预览图标时的回调
  handlePreview = async file=> {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  }

  //上传文件改变时的状态，将新增的图片加入已上传文件列表
  handleChange=({ fileList })=>{
    this.setState({ fileList });
  };

  //关闭弹框
  handleCancel = () => this.setState({ previewVisible: false });

  render() {
    const { AddType, previewVisible, previewImage, fileList } = this.state;
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
          <div className='ComAdd-title'>
            <Input
              style={{width:'100%',height:'100%',border:'none'}}
              placeholder="标题"
              maxLength={20}
            />
          </div>
          <div className='ComAdd-content' contentEditable="true" placeholder='写点什么吧……'>

          </div>
          <div className='ComAdd-image'>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= (AddType==='JC'?8:1) ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default ComAdd;