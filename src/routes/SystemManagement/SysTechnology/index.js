import React from 'react';
import { Pagination } from 'antd';
import InfoTab from "../../../components/InfoTab";
import GY from '../../../JSON/GY/GY.json';
import config from "../../../config";
import MyModal from "../../../components/MyModal";
import SysAddButton from "../SysAddButton";

const pageSize = config.pageSize;

class SysTechnology extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      subtitle: '',
      content: '',
      modalTitle: '',
      fileList: [],
      modalShow: false,
    }
  }

  //显示弹框
  showModal = (item, type) => {
    let {title, subtitle, content,fileList} = this.state;
    if (type === '修改') {
      title = item.title;
      subtitle = item.subtitle;
      content = item.content;
      fileList=[
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'http://img1.imgtn.bdimg.com/it/u=3495633323,551723840&fm=26&gp=0.jpg',
        }
      ]
    } else if (type === '新增') {
      title = '';
      subtitle = '';
      content = '';
      fileList=[];
    }
    this.setState({
      modalTitle: type,
      title,
      subtitle,
      content,
      fileList,
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
        title:'配图',
        label:'image',
        type:'Upload',
        rules: '',
        initialValue:'',
        fileList:this.state.fileList,
        picNumber:1
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
      <div style={{display:'flex',flexWrap:'wrap'}}>
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
          setFileList={this.setFileList}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          resource={resource}
        />
        <SysAddButton color='#7FBA00' showModal={this.showModal.bind(this, '', '新增')}/>
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

export default SysTechnology;