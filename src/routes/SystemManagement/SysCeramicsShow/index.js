import React from 'react';
import { Pagination,message } from 'antd';
import InfoTab from "../../../components/InfoTab";
import TC from '../../../JSON/TC/TC.json';
import config from "../../../config";
import request from "../../../utils/request";
import MyModal from "../../../components/MyModal";
import SysAddButton from "../SysAddButton";

const pageSize = config.pageSize;

class SysCeramicsShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      modalTitle: '',
      modalShow: false,
      fileList: [],
      qyData:[],
      editId:'',
      page:1,
      total:10,
    }
  }

  //获取起源数据
  getCeramicsData=(page)=>{
    let data = {};
    data.page = page;
    data.pageSize = pageSize;
    request({url:'/getCeramics',method:'GET',params:data}).then((res)=>{
      if(res && res.code){
        this.setState({
          qyData:res.data,
          total:res.total
        })
      }
    })
  };

  componentDidMount() {
    this.getCeramicsData(this.state.page);
  }

  //显示弹框
  showModal = (item, type) => {
    let {title, content,fileList,editId} = this.state;
    if (type === '修改') {
      editId=item.id;
      title = item.title;
      content = item.content;
    } else if (type === '新增') {
      editId='';
      title = '';
      content = '';
    }
    this.setState({
      modalTitle: type,
      editId,
      title,
      content,
      modalShow: true,
    });
  };

  //点击确定
  handleOk = values => {
    let {modalTitle,editId} = this.state;
    //如果是修改，调用修改的接口，否则调用新增接口
    let fileList = this.state.fileList;
    let ttfUrl='';
    let data={};
    data.title=values.title;
    data.content=values.content;
    data.ttfUrl=ttfUrl;
    if(modalTitle==='修改'){
      data.id = editId;
      request({url:'/updateCeramicsById',method:'GET',params:data}).then((res)=>{
        if(res && res.code){
          message.success("修改成功");
          this.getCeramicsData(this.state.page);
        }
      })
    }else{
      request({url:'/insertCeramics',method:'GET',params:data}).then((res)=>{
        if(res && res.code){
          message.success("新增成功");
          this.getCeramicsData(this.state.page);
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

  //删除操作
  deleteData=(id)=>{
    request({url:'/deleteCeramicsById/'+id,method:'GET'}).then((res)=>{
      if(res && res.code){
        message.success("删除成功");
        this.getCeramicsData(this.state.page);
      }else{
        message.error("删除失败");
      }
    })
  };

  //换页
  changePage=(page)=>{
    this.setState({
      page
    });
    this.getCeramicsData(page);
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
          this.state.qyData.map((item, index) => {
            return (
              <InfoTab
                showModal={this.showModal.bind(this, item, '修改')}
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
          onCancel={this.handleCancel}
          resource={resource}
        />
        <SysAddButton color='#FA7F00' showModal={this.showModal.bind(this, '', '新增')}/>
        <div style={{width:'100%',textAlign:'center',height:'50px',marginLeft:'50%',transform:'translateX(-50%)'}}>
          <Pagination
            onChange={this.changePage}
            defaultCurrent={1}
            pageSize={pageSize}
            total={this.state.total}
          />
        </div>
      </div>
    );
  }
}

export default SysCeramicsShow;