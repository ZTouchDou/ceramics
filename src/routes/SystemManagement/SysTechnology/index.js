import React from 'react';
import { Pagination,message } from 'antd';
import InfoTab from "../../../components/InfoTab";
import GY from '../../../JSON/GY/GY.json';
import config from "../../../config";
import request from "../../../utils/request";
import MyModal from "../../../components/MyModal";
import SysAddButton from "../SysAddButton";
import SearchTab from "../../../components/SearchTab";

const pageSize = config.pageSize;
const uploadUrl = config.poxzy.imgUrl;

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
      qyData:[],
      editId:'',
      page:1,
      total:10,

      searchId:'',
      searchTitle:''
    }
  }

  //获取工艺数据
  getTechnologyData=(page)=>{
    let data = {};
    data.page = page;
    data.pageSize = pageSize;
    data.id = this.state.searchId?this.state.searchId:null;
    data.title = this.state.searchTitle?this.state.searchTitle:null;
    request({url:'/getTechnology',method:'GET',params:data}).then((res)=>{
      if(res && res.code){
        this.setState({
          qyData:res.data,
          total:res.total
        })
      }
    })
  };

  componentDidMount() {
    this.getTechnologyData(this.state.page);
  }

  //搜索
  searchData=(values)=>{
    this.setState({
      searchId:values.id,
      searchTitle:values.title
    },()=>{
      this.getTechnologyData(this.state.page);
    })
  };

  //显示弹框
  showModal = (item, type) => {
    let {title, subtitle, content,fileList,editId} = this.state;
    if (type === '修改') {
      editId=item.id;
      title = item.title;
      subtitle = item.subtitle;
      content = item.content;
      fileList=item.imgUrl?[
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: uploadUrl+item.imgUrl,
        }
      ]:[];
    } else if (type === '新增') {
      editId='';
      title = '';
      subtitle = '';
      content = '';
      fileList=[];
    }
    this.setState({
      modalTitle: type,
      editId,
      title,
      subtitle,
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
    data.subtitle=values.subtitle;
    data.content=values.content;
    data.imgUrl=imgUrl;
    if(modalTitle==='修改'){
      data.id = editId;
      request({url:'/updateTechnologyById',method:'GET',params:data}).then((res)=>{
        if(res && res.code){
          message.success("修改成功");
          this.getTechnologyData(this.state.page);
        }
      })
    }else{
      request({url:'/insertTechnology',method:'GET',params:data}).then((res)=>{
        if(res && res.code){
          message.success("新增成功");
          this.getTechnologyData(this.state.page);
        }
      })
    }
    this.setState({
      modalShow: false,
    });
  };

  //删除操作
  deleteData=(id)=>{
    request({url:'/deleteTechnologyById/'+id,method:'GET'}).then((res)=>{
      if(res && res.code){
        message.success("删除成功");
        this.getTechnologyData(this.state.page);
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

  //换页
  changePage=(page)=>{
    this.setState({
      page
    });
    this.getTechnologyData(page);
  };

  render() {
    const searchMenu=[
      {
        title:'标题',
        label:'title',
        type:'input',
        rules: '',
        initialValue:''
      },
      {
        title:'ID',
        label:'id',
        type:'input',
        rules: '',
        initialValue:''
      }
    ];

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
        <SearchTab
          resource = {searchMenu}
          onOk={this.searchData}
        />
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
          setFileList={this.setFileList}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          resource={resource}
        />
        <SysAddButton color='#7FBA00' showModal={this.showModal.bind(this, '', '新增')}/>
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

export default SysTechnology;